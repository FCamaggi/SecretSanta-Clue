import express from 'express'
import { createServer } from 'http'
import { Server } from 'socket.io'
import cors from 'cors'
import dotenv from 'dotenv'
import { generateGameCode, shuffleArray } from './utils.js'
import { GameManager } from './gameManager.js'

dotenv.config()

const app = express()
const httpServer = createServer(app)
const io = new Server(httpServer, {
  cors: {
    origin: process.env.FRONTEND_URL || 'http://localhost:3000',
    methods: ['GET', 'POST']
  }
})

app.use(cors())
app.use(express.json())

const gameManager = new GameManager()

// REST API Endpoints
app.post('/api/game/create', (req, res) => {
  const gameCode = generateGameCode()
  const game = gameManager.createGame(gameCode)
  res.json({ gameCode, game })
})

app.get('/api/game/:gameCode', (req, res) => {
  const { gameCode } = req.params
  const game = gameManager.getGame(gameCode)

  if (!game) {
    return res.status(404).json({ error: 'Juego no encontrado' })
  }

  res.json(game)
})

// Socket.io Events
io.on('connection', (socket) => {
  console.log('Cliente conectado:', socket.id)

  // Unirse como tablero
  socket.on('join-board', (gameCode) => {
    socket.join(`board-${gameCode}`)
    const game = gameManager.getGame(gameCode)
    if (game) {
      socket.emit('game-state', game)
    }
  })

  // Unirse como jugador
  socket.on('join-player', (gameCode) => {
    socket.join(`game-${gameCode}`)
    const game = gameManager.getGame(gameCode)
    if (game) {
      socket.emit('game-state', game)
    }
  })

  // Seleccionar jugador
  socket.on('select-player', ({ gameCode, playerName }) => {
    const game = gameManager.getGame(gameCode)
    if (!game) return

    // Verificar que el jugador no esté ya seleccionado
    const playerExists = game.players.find(p => p.name === playerName)
    if (playerExists) {
      socket.emit('error', { message: 'Este jugador ya fue seleccionado' })
      return
    }

    game.players.push({
      id: socket.id,
      name: playerName,
      ready: false
    })

    // Si ya hay 6 jugadores, sortear cintas y pasar a fase setup
    if (game.players.length === 6) {
      game.phase = 'setup'
      game.ribbonAssignments = assignRibbons(game.players.map(p => p.name))
    }

    gameManager.updateGame(gameCode, game)
    io.to(`game-${gameCode}`).emit('game-state', game)
    io.to(`board-${gameCode}`).emit('game-state', game)
  })

  // Crear sobre
  socket.on('create-envelope', ({ gameCode, creator, recipient, sender, wrapper, ribbon }) => {
    const game = gameManager.getGame(gameCode)
    if (!game) return

    // Crear el sobre con las 6 cartas
    const envelope = {
      recipient,
      creator,
      cards: {
        sender,
        wrapper,
        ribbon,
        unknown1: 'unknown',
        unknown2: 'unknown',
        unknown3: 'unknown'
      },
      holder: null // Se asignará después del reparto
    }

    game.envelopes = game.envelopes || []
    game.envelopes.push(envelope)

    // Marcar jugador como listo
    const player = game.players.find(p => p.name === creator)
    if (player) {
      player.ready = true
    }

    // Si todos están listos, repartir sobres
    if (game.players.length === 6 && game.players.every(p => p.ready)) {
      game.phase = 'distributing'
      game.envelopes = distributeEnvelopes(game.envelopes, game.players)
      game.phase = 'playing'
      game.currentTurn = game.players[0].name
    }

    gameManager.updateGame(gameCode, game)
    io.to(`game-${gameCode}`).emit('game-state', game)
    io.to(`board-${gameCode}`).emit('game-state', game)
  })

  // Iniciar sospecha
  socket.on('start-suspicion', ({ gameCode, player, sender, wrapper, ribbon }) => {
    const game = gameManager.getGame(gameCode)
    if (!game) return

    const suspicion = {
      player,
      sender,
      wrapper,
      ribbon,
      currentResponder: 0
    }

    game.lastSuspicion = suspicion

    gameManager.updateGame(gameCode, game)
    io.to(`game-${gameCode}`).emit('game-state', game)
    io.to(`board-${gameCode}`).emit('game-state', game)

    // Notificar al primer respondedor
    const responders = game.players.filter(p => p.name !== player)
    if (responders.length > 0) {
      const firstResponder = responders[0].name
      io.to(`game-${gameCode}`).emit('suspicion-started', {
        ...suspicion,
        responder: firstResponder
      })
    }
  })

  // Revelar cartas
  socket.on('reveal-cards', ({ gameCode, cards, responder }) => {
    const game = gameManager.getGame(gameCode)
    if (!game) return

    io.to(`game-${gameCode}`).emit('cards-revealed', {
      cards,
      responder
    })
    io.to(`board-${gameCode}`).emit('cards-revealed', {
      cards,
      responder
    })

    // Continuar con el siguiente respondedor o terminar la ronda
    const suspicion = game.lastSuspicion
    if (suspicion) {
      const hasEvidence = cards.some(c => c.type !== 'unknown')

      if (!hasEvidence) {
        // Pasar al siguiente respondedor
        suspicion.currentResponder++
        const responders = game.players.filter(p => p.name !== suspicion.player)

        if (suspicion.currentResponder < responders.length) {
          const nextResponder = responders[suspicion.currentResponder].name
          io.to(`game-${gameCode}`).emit('suspicion-started', {
            ...suspicion,
            responder: nextResponder
          })
        } else {
          // No hay más respondedores, termina la sospecha
          game.lastSuspicion = null
          io.to(`game-${gameCode}`).emit('suspicion-ended', { result: 'no-evidence' })
          io.to(`board-${gameCode}`).emit('suspicion-ended', { result: 'no-evidence' })
        }
      } else {
        // Se mostró evidencia, termina la sospecha
        game.lastSuspicion = null
        io.to(`game-${gameCode}`).emit('suspicion-ended', { result: 'evidence-shown' })
        io.to(`board-${gameCode}`).emit('suspicion-ended', { result: 'evidence-shown' })
      }

      gameManager.updateGame(gameCode, game)
    }
  })

  // Hacer acusación
  socket.on('make-accusation', ({ gameCode, player, sender, wrapper, ribbon }) => {
    const game = gameManager.getGame(gameCode)
    if (!game) return

    // Buscar el sobre del jugador
    const playerEnvelope = game.envelopes.find(env => env.recipient === player)

    if (!playerEnvelope) {
      socket.emit('accusation-result', { success: false, message: 'Sobre no encontrado' })
      return
    }

    // Verificar si la acusación es correcta
    const isCorrect =
      playerEnvelope.cards.sender === sender &&
      playerEnvelope.cards.wrapper === wrapper &&
      playerEnvelope.cards.ribbon === ribbon

    if (isCorrect) {
      game.winners = game.winners || []
      game.winners.push(player)

      io.to(`game-${gameCode}`).emit('accusation-result', {
        success: true,
        player,
        envelope: playerEnvelope
      })
      io.to(`board-${gameCode}`).emit('accusation-result', {
        success: true,
        player,
        envelope: playerEnvelope
      })

      // Si todos adivinaron, termina el juego
      if (game.winners.length === 6) {
        game.phase = 'finished'
      }
    } else {
      socket.emit('accusation-result', {
        success: false,
        message: 'Acusación incorrecta'
      })

      // El jugador pierde pero sigue mostrando cartas
      const playerObj = game.players.find(p => p.name === player)
      if (playerObj) {
        playerObj.eliminated = true
      }
    }

    gameManager.updateGame(gameCode, game)
    io.to(`game-${gameCode}`).emit('game-state', game)
    io.to(`board-${gameCode}`).emit('game-state', game)
  })

  socket.on('disconnect', () => {
    console.log('Cliente desconectado:', socket.id)
  })
})

// Función para asignar amigos secretos (evitando auto-asignación)
function assignRibbons(players) {
  const ribbons = ['Roja', 'Verde', 'Azul', 'Dorada', 'Plateada', 'Rosa']
  const shuffledRibbons = shuffleArray([...ribbons])

  const assignments = {}
  for (let i = 0; i < players.length; i++) {
    assignments[players[i]] = shuffledRibbons[i]
  }

  return assignments
}

// Función para repartir sobres (evitando auto-asignación)
function distributeEnvelopes(envelopes, players) {
  const playerNames = players.map(p => p.name)
  let holders = [...playerNames]
  let attempts = 0
  const maxAttempts = 100

  // Barajar hasta que ningún sobre coincida con su destinatario
  while (attempts < maxAttempts) {
    holders = shuffleArray([...playerNames])

    const isValid = envelopes.every((env, index) => {
      return env.recipient !== holders[index]
    })

    if (isValid) {
      break
    }
    attempts++
  }

  console.log('📦 Distribución de sobres:')
  // Asignar holders
  return envelopes.map((env, index) => {
    const updatedEnv = {
      ...env,
      holder: holders[index]
    }
    console.log(`  - Sobre de ${env.recipient} → custodiado por ${holders[index]}`)
    return updatedEnv
  })
}

const PORT = process.env.PORT || 3001
httpServer.listen(PORT, () => {
  console.log(`🎄 Servidor Secret Santa Clue corriendo en puerto ${PORT}`)
})
