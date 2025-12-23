import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { DndProvider, useDrag, useDrop } from 'react-dnd'
import { HTML5Backend, getEmptyImage } from 'react-dnd-html5-backend'
import io from 'socket.io-client'
import './Board.css'
import initialPositions from '../../../setup-positions.json'

const PLAYERS = ['Mamá', 'Papá', 'Fay', 'Fio', 'Tato', 'Raffa']
const PLAYER_COLORS = {
  'Mamá': '#8b4513',    // Saddle Brown - elegante y vintage
  'Papá': '#191970',    // Midnight Blue - sofisticado
  'Fay': '#800080',     // Purple - misterioso
  'Fio': '#dc143c',     // Crimson - intenso
  'Tato': '#228b22',    // Forest Green - clásico
  'Raffa': '#ff8c00'    // Dark Orange - cálido
}

function DraggableToken({ player, position }) {
  const [{ isDragging }, drag, preview] = useDrag(() => ({
    type: 'token',
    item: { player },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  }))

  // Ocultar la imagen de preview del drag
  useEffect(() => {
    preview(getEmptyImage(), { captureDraggingState: true })
  }, [])

  return (
    <div
      ref={drag}
      className="token"
      style={{
        backgroundColor: PLAYER_COLORS[player],
        opacity: isDragging ? 0.5 : 1,
        left: `${position?.x || 0}%`,
        top: `${position?.y || 0}%`,
      }}
    >
      {player}
    </div>
  )
}

function DraggableDice({ position }) {
  const [value, setValue] = useState(1)
  const [isRolling, setIsRolling] = useState(false)

  const rollDice = () => {
    if (isRolling) return // Evitar múltiples clicks durante animación
    
    setIsRolling(true)
    const finalValue = Math.floor(Math.random() * 6) + 1
    
    // Animación: ciclar números rápidamente
    let cycles = 0
    const maxCycles = 10
    const interval = setInterval(() => {
      setValue(Math.floor(Math.random() * 6) + 1)
      cycles++
      
      if (cycles >= maxCycles) {
        clearInterval(interval)
        setValue(finalValue)
        setIsRolling(false)
      }
    }, 100) // Cambiar número cada 100ms
  }

  // Renderizar puntos del dado según el valor
  const renderDots = () => {
    const dotPositions = {
      1: [[50, 50]],
      2: [[25, 25], [75, 75]],
      3: [[25, 25], [50, 50], [75, 75]],
      4: [[25, 25], [75, 25], [25, 75], [75, 75]],
      5: [[25, 25], [75, 25], [50, 50], [25, 75], [75, 75]],
      6: [[25, 20], [75, 20], [25, 50], [75, 50], [25, 80], [75, 80]]
    }

    return dotPositions[value].map((pos, i) => (
      <div
        key={i}
        style={{
          position: 'absolute',
          width: '12px',
          height: '12px',
          borderRadius: '50%',
          backgroundColor: '#2c2c2c',
          left: `${pos[0]}%`,
          top: `${pos[1]}%`,
          transform: 'translate(-50%, -50%)',
          boxShadow: 'inset 0 2px 3px rgba(0, 0, 0, 0.3)'
        }}
      />
    ))
  }

  return (
    <div
      className={`dice ${isRolling ? 'rolling' : ''}`}
      onClick={rollDice}
      style={{
        left: `${position?.x || 0}%`,
        top: `${position?.y || 0}%`
      }}
    >
      {renderDots()}
    </div>
  )
}

function BoardDropZone({ children, onDrop, className }) {
  const [, drop] = useDrop(() => ({
    accept: ['token', 'dice'],
    drop: (item, monitor) => {
      const offset = monitor.getClientOffset()
      const boardRect = document.querySelector('.board-wrapper').getBoundingClientRect()
      const x = ((offset.x - boardRect.left) / boardRect.width) * 100
      const y = ((offset.y - boardRect.top) / boardRect.height) * 100
      
      if (onDrop) {
        onDrop(item, { x, y })
      }
    },
  }))

  return (
    <div ref={drop} className={className}>
      {children}
    </div>
  )
}

function Board() {
  const { gameCode } = useParams()
  const [socket, setSocket] = useState(null)
  const [gameState, setGameState] = useState(null)
  const [positions, setPositions] = useState(initialPositions)

  useEffect(() => {
    const newSocket = io('http://localhost:3001')
    setSocket(newSocket)

    newSocket.emit('join-board', gameCode)

    newSocket.on('game-state', (state) => {
      setGameState(state)
    })

    newSocket.on('positions-updated', (newPositions) => {
      setPositions(newPositions)
    })

    return () => newSocket.close()
  }, [gameCode])

  const handleDrop = (item, position) => {
    if (item.type === 'dice') {
      setPositions(prev => ({
        ...prev,
        dice: position
      }))
    } else if (item.player) {
      setPositions(prev => ({
        ...prev,
        tokens: {
          ...prev.tokens,
          [item.player]: position
        }
      }))
    }
  }

  if (!gameState) {
    return (
      <div className="container">
        <div className="card">
          <h2>Cargando partida...</h2>
        </div>
      </div>
    )
  }

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="board-page">
        <div className="container">
          <div className="card board-header">
            <h1>🎄 Secret Santa Clue 🎁</h1>
            <div className="game-info">
              <div className="game-code">
                <span>Código de Partida:</span>
                <strong>{gameCode}</strong>
              </div>
              <div className="players-connected">
                <span>Jugadores: {gameState.players?.length || 0}/6</span>
              </div>
              <div className="game-phase">
                <span>Fase: {gameState.phase || 'Esperando jugadores'}</span>
              </div>
            </div>
          </div>

          <div className="board-content">
            <div className="board-container card">
              <BoardDropZone onDrop={handleDrop} className="board-wrapper">
                <img 
                  src="/tablero.jpg" 
                  alt="Tablero del juego" 
                  className="board-image"
                  draggable={false}
                />
                
                {PLAYERS.map(player => (
                  <DraggableToken 
                    key={player}
                    player={player}
                    position={positions.tokens?.[player]}
                  />
                ))}

                <DraggableDice position={positions.dice} />
              </BoardDropZone>
            </div>

            <div className="board-sidebar card">
              <h3>📋 Estado del Juego</h3>
              
              <div className="players-list">
                <h4>Jugadores Conectados:</h4>
                {gameState.players?.map(player => (
                  <div key={player.id} className="player-item">
                    <span 
                      className="player-color-indicator"
                      style={{ backgroundColor: PLAYER_COLORS[player.name] }}
                    />
                    {player.name}
                    {player.ready && ' ✓'}
                  </div>
                ))}
              </div>

            {gameState.lastSuspicion && (
              <div className="last-suspicion">
                <h4>Última Sospecha:</h4>
                <p><strong>{gameState.lastSuspicion.player}</strong> sospecha de:</p>
                <ul>
                  <li>Remitente: {gameState.lastSuspicion.sender}</li>
                  <li>Envoltorio: {gameState.lastSuspicion.wrapper}</li>
                  <li>Cinta: {gameState.lastSuspicion.ribbon}</li>
                </ul>
              </div>
            )}
            </div>
          </div>
        </div>
      </div>
    </DndProvider>
  )
}

export default Board
