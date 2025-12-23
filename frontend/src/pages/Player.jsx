import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import io from 'socket.io-client'
import './Player.css'

const PLAYERS = ['Mamá', 'Papá', 'Fay', 'Fio', 'Tato', 'Raffa']
const WRAPPERS = ['Regalo 1', 'Regalo 2', 'Regalo 3', 'Regalo 4', 'Regalo 5', 'Regalo 6']
const RIBBONS = ['Roja', 'Verde', 'Azul', 'Dorada', 'Plateada', 'Blanca']

// Helper para obtener la ruta de la imagen de una carta
const getCardImage = (type, value) => {
  const normalizedValue = value.toLowerCase()
    .normalize('NFD').replace(/[\u0300-\u036f]/g, '') // Remover tildes
    .replace(/\s+/g, '-') // Reemplazar espacios con guiones
  
  const typeFolder = {
    player: 'players',
    wrapper: 'wrappers',
    ribbon: 'ribbons'
  }[type]
  
  return `/cards/${typeFolder}/${normalizedValue}.png`
}

function Player() {
  const { gameCode } = useParams()
  const [socket, setSocket] = useState(null)
  const [gameState, setGameState] = useState(null)
  
  // Fase de selección
  const [selectedPlayer, setSelectedPlayer] = useState('')
  const [playerJoined, setPlayerJoined] = useState(false)
  
  // Fase de armado de sobre
  const [envelopePhase, setEnvelopePhase] = useState(false)
  const [recipient, setRecipient] = useState('')
  const [wrapperCard, setWrapperCard] = useState('')
  const [envelopeCreated, setEnvelopeCreated] = useState(false)
  
  // Fase de juego
  const [myEnvelope, setMyEnvelope] = useState(null)
  const [suspicionMode, setSuspicionMode] = useState(false)
  const [suspicionType, setSuspicionType] = useState('') // 'build' o 'hide'
  const [selectedCards, setSelectedCards] = useState([]) // Cartas seleccionadas para armar sospecha
  const [showingCards, setShowingCards] = useState(false) // Mostrar preview de cartas
  const [cardsToShow, setCardsToShow] = useState([]) // Cartas que se mostrarán
  const [currentSuspicion, setCurrentSuspicion] = useState(null)

  useEffect(() => {
    const newSocket = io(import.meta.env.VITE_BACKEND_URL || 'http://localhost:3001')
    setSocket(newSocket)

    newSocket.emit('join-player', gameCode)

    newSocket.on('game-state', (state) => {
      setGameState(state)
      
      if (state.phase === 'setup') {
        setEnvelopePhase(true)
      }
      
      if (state.phase === 'playing' && state.envelopes) {
        // Buscar mi sobre
        const myEnv = state.envelopes.find(env => env.holder === selectedPlayer)
        setMyEnvelope(myEnv)
      }
    })

    newSocket.on('suspicion-started', (suspicion) => {
      setCurrentSuspicion(suspicion)
      if (suspicion.responder === selectedPlayer) {
        setSuspicionMode(true)
      }
    })

    newSocket.on('cards-revealed', (data) => {
      // Mostrar las cartas que se revelaron
      console.log('Cartas reveladas:', data)
    })

    return () => newSocket.close()
  }, [gameCode, selectedPlayer])

  const handleJoinGame = () => {
    if (selectedPlayer && socket) {
      socket.emit('select-player', { gameCode, playerName: selectedPlayer })
      setPlayerJoined(true)
    }
  }

  const handleCreateEnvelope = () => {
    // La cinta está asignada por el servidor
    // La carta de remitente siempre es el jugador actual
    const assignedRibbon = gameState?.ribbonAssignments?.[selectedPlayer]
    
    if (recipient && wrapperCard && assignedRibbon && socket) {
      socket.emit('create-envelope', {
        gameCode,
        creator: selectedPlayer,
        recipient: recipient,
        sender: selectedPlayer,  // Siempre es el jugador actual
        wrapper: wrapperCard,
        ribbon: assignedRibbon
      })
      setEnvelopeCreated(true)
    }
  }

  const toggleCardSelection = (cardType, cardValue) => {
    const isSelected = selectedCards.some(c => c.type === cardType)
    
    if (isSelected) {
      setSelectedCards(selectedCards.filter(c => c.type !== cardType))
    } else {
      setSelectedCards([...selectedCards, { type: cardType, value: cardValue }])
    }
  }

  const handleSuspicionResponse = () => {
    let cardsForDisplay = []
    
    if (suspicionType === 'build') {
      // Mostrar las cartas seleccionadas + completar con incógnitas hasta 3
      cardsForDisplay = [...selectedCards]
      while (cardsForDisplay.length < 3) {
        cardsForDisplay.push({ type: 'unknown' })
      }
    } else if (suspicionType === 'hide') {
      // Ocultar verdad: siempre mostrar 3 incógnitas
      cardsForDisplay = [{ type: 'unknown' }, { type: 'unknown' }, { type: 'unknown' }]
    }
    
    setCardsToShow(cardsForDisplay)
    setShowingCards(true)
  }

  const confirmShowCards = () => {
    // No se envía nada - solo se muestran las cartas en pantalla
    // El otro jugador se acerca físicamente a ver el celular
    // Las cartas ya están visibles en showingCards = true
  }

  const closeCardsDisplay = () => {
    // Cerrar la visualización y volver a la pantalla principal
    setSuspicionMode(false)
    setSuspicionType('')
    setSelectedCards([])
    setShowingCards(false)
    setCardsToShow([])
  }

  // Pantalla de selección de jugador
  if (!playerJoined) {
    return (
      <div className="player-page">
        <div className="container">
          <div className="card player-card">
            <h1>🎄 Secret Santa Clue 🎁</h1>
            <h2>Código: {gameCode}</h2>
            
            <div className="player-selection">
              <h3>¿Quién eres?</h3>
              <select 
                value={selectedPlayer} 
                onChange={(e) => setSelectedPlayer(e.target.value)}
              >
                <option value="">Selecciona tu personaje</option>
                {PLAYERS.map(player => (
                  <option key={player} value={player}>{player}</option>
                ))}
              </select>
              
              <button 
                onClick={handleJoinGame}
                disabled={!selectedPlayer}
              >
                Unirse al Juego
              </button>
            </div>
          </div>
        </div>
      </div>
    )
  }

  // Pantalla de espera - esperando a que se unan los 6 jugadores
  if (playerJoined && gameState?.phase === 'waiting') {
    const playersCount = gameState?.players?.length || 0
    return (
      <div className="player-page">
        <div className="container">
          <div className="card player-card">
            <h1>🎄 Esperando Jugadores...</h1>
            <h3>Jugador: {selectedPlayer}</h3>
            
            <div className="waiting-info">
              <p>Jugadores unidos: <strong>{playersCount} / 6</strong></p>
              <div className="players-list">
                {gameState.players.map((p, i) => (
                  <div key={i} className="player-badge">
                    ✓ {p.name}
                  </div>
                ))}
              </div>
              <p className="waiting-message">Esperando a que todos los jugadores se unan...</p>
              <div className="spinner"></div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  // Pantalla de armado de sobre
  if (envelopePhase && !envelopeCreated) {
    // La cinta está asignada por el servidor
    const assignedRibbon = gameState?.ribbonAssignments?.[selectedPlayer] || ''
    const availableRecipients = PLAYERS.filter(p => p !== selectedPlayer)
    
    return (
      <div className="player-page">
        <div className="container">
          <div className="card player-card">
            <h1>🎁 Arma tu Sobre</h1>
            <h3>Jugador: {selectedPlayer}</h3>
            
            <div className="envelope-form">
              <div className="form-section">
                <h4>¿De quién es el sobre?</h4>
                <div className="card-grid">
                  {availableRecipients.map(player => (
                    <div 
                      key={player}
                      className={`card-option ${recipient === player ? 'selected' : ''}`}
                      onClick={() => setRecipient(player)}
                    >
                      <div className="card-image-wrapper">
                        <img 
                          src={getCardImage('player', player)} 
                          alt={player}
                          className="card-img"
                          onError={(e) => {
                            e.target.style.display = 'none'
                            e.target.nextSibling.style.display = 'flex'
                          }}
                        />
                        <div className="card-image" style={{display: 'none'}}>
                          <span>👤</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="form-section">
                <h4>Tu carta de remitente:</h4>
                <div className="secret-friend-display">
                  <div className="card-option selected">
                    <div className="card-image-wrapper">
                      <img 
                        src={getCardImage('player', selectedPlayer)} 
                        alt={selectedPlayer}
                        className="card-img"
                        onError={(e) => {
                          e.target.style.display = 'none'
                          e.target.nextSibling.style.display = 'flex'
                        }}
                      />
                      <div className="card-image" style={{display: 'none'}}>
                        <span>📝</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="form-section">
                <h4>Tu carta de regalo:</h4>
                <div className="card-grid">
                  {WRAPPERS.map(w => (
                    <div 
                      key={w}
                      className={`card-option ${wrapperCard === w ? 'selected' : ''}`}
                      onClick={() => setWrapperCard(w)}
                    >
                      <div className="card-image-wrapper">
                        <img 
                          src={getCardImage('wrapper', w)} 
                          alt={w}
                          className="card-img"
                          onError={(e) => {
                            e.target.style.display = 'none'
                            e.target.nextSibling.style.display = 'flex'
                          }}
                        />
                        <div className="card-image" style={{ 
                          display: 'none'
                        }}>
                          <span>🎁</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="form-section">
                <h4>Tu cinta asignada:</h4>
                <div className="secret-friend-display">
                  <div className="card-option selected">
                    <div className="card-image-wrapper">
                      <img 
                        src={getCardImage('ribbon', assignedRibbon)} 
                        alt={assignedRibbon}
                        className="card-img"
                        onError={(e) => {
                          e.target.style.display = 'none'
                          e.target.nextSibling.style.display = 'flex'
                        }}
                      />
                      <div className="card-image" style={{display: 'none'}}>
                        <div style={{
                          width: '80%',
                          height: '8px',
                          background: assignedRibbon.toLowerCase(),
                          borderRadius: '4px'
                        }}></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <button 
                onClick={handleCreateEnvelope}
                disabled={!recipient || !wrapperCard || !assignedRibbon}
                className="btn-large"
              >
                Confirmar Sobre
              </button>
            </div>
          </div>
        </div>
      </div>
    )
  }

  // Pantalla de espera
  if (envelopeCreated && gameState?.phase !== 'playing') {
    return (
      <div className="player-page">
        <div className="container">
          <div className="card player-card">
            <h2>✅ Sobre Creado</h2>
            <p>Esperando a que todos los jugadores creen sus sobres...</p>
            <div className="spinner"></div>
          </div>
        </div>
      </div>
    )
  }

  // Pantalla de mostrar cartas (preview antes de confirmar)
  if (showingCards) {
    return (
      <div className="player-page">
        <div className="container">
          <div className="card player-card">
            <h1>📋 Muestra estas cartas</h1>
            <p className="show-instruction">El otro jugador puede ver tu pantalla ahora</p>
            
            <div className="cards-display-grid">
              {cardsToShow.map((card, index) => (
                <div key={index} className="display-card">
                  {card.type === 'unknown' ? (
                    <div className="card-display unknown">
                      <div className="card-display-content">
                        <span className="card-icon">❓</span>
                        <p>Incógnita</p>
                      </div>
                    </div>
                  ) : (
                    <div className="card-display">
                      <img 
                        src={getCardImage(
                          card.type === 'sender' ? 'player' : card.type,
                          card.value
                        )} 
                        alt={card.value}
                        className="card-display-img"
                        onError={(e) => {
                          e.target.style.display = 'none'
                          e.target.nextSibling.style.display = 'flex'
                        }}
                      />
                      <div className="card-display-fallback" style={{display: 'none'}}>
                        {card.type === 'sender' ? (
                          <div className="card-display-content">
                            <span className="card-icon">📝</span>
                            <p className="card-type">Remitente</p>
                            <p className="card-value">{card.value}</p>
                          </div>
                        ) : card.type === 'wrapper' ? (
                          <div className="card-display-content">
                            <span className="card-icon">🎁</span>
                            <p className="card-type">Regalo</p>
                            <p className="card-value">{card.value}</p>
                          </div>
                        ) : card.type === 'ribbon' ? (
                          <div className="card-display-content">
                            <div style={{
                              width: '80%',
                              height: '12px',
                              background: card.value.toLowerCase(),
                              borderRadius: '6px',
                              margin: '10px auto'
                            }}></div>
                            <p className="card-type">Cinta</p>
                            <p className="card-value">{card.value}</p>
                          </div>
                        ) : null}
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>

            <div className="confirmation-buttons">
              <button onClick={closeCardsDisplay} className="btn-large btn-close">
                ✅ Listo - Ya mostré las cartas
              </button>
              <button onClick={() => {
                setShowingCards(false)
                setSuspicionType('')
                setSelectedCards([])
              }} className="btn-large btn-secondary">
                ⬅️ Volver a Elegir
              </button>
            </div>
          </div>
        </div>
      </div>
    )
  }

  // Modo sospecha activo
  if (suspicionMode) {
    return (
      <div className="player-page">
        <div className="container">
          <div className="card player-card">
            <h1>🔍 Modo Sospecha</h1>
            <h3>Jugador: {selectedPlayer}</h3>
            
            <div className="suspicion-info">
              <p>Alguien te está preguntando sobre tu sobre custodiado</p>
            </div>

            {!suspicionType && (
              <div className="suspicion-choice">
                <h4>¿Qué deseas hacer?</h4>
                <button onClick={() => setSuspicionType('build')}>
                  🃏 Armar Sospecha
                  <small>Selecciona las cartas que coinciden</small>
                </button>
                <button onClick={() => setSuspicionType('hide')}>
                  🤫 Ocultar Verdad
                  <small>Muestra 3 cartas incógnitas</small>
                </button>
                <button onClick={() => setSuspicionMode(false)} className="btn-secondary">
                  ❌ Cancelar
                </button>
              </div>
            )}

            {suspicionType === 'build' && myEnvelope && (
              <div className="cards-selection">
                <h4>Selecciona las cartas que coinciden:</h4>
                <p className="hint-text">Toca las cartas que quieres mostrar</p>
                <div className="card-grid suspicion-card-grid">
                  <div 
                    className={`card-option ${selectedCards.some(c => c.type === 'sender') ? 'selected' : ''}`}
                    onClick={() => toggleCardSelection('sender', myEnvelope.cards.sender)}
                  >
                    <div className="card-image-wrapper">
                      <img 
                        src={getCardImage('player', myEnvelope.cards.sender)} 
                        alt={myEnvelope.cards.sender}
                        className="card-img"
                        onError={(e) => {
                          e.target.style.display = 'none'
                          e.target.nextSibling.style.display = 'flex'
                        }}
                      />
                      <div className="card-image" style={{display: 'none'}}>
                        <span>📝</span>
                      </div>
                    </div>
                    <p>Remitente</p>
                    <small>{myEnvelope.cards.sender}</small>
                  </div>

                  <div 
                    className={`card-option ${selectedCards.some(c => c.type === 'wrapper') ? 'selected' : ''}`}
                    onClick={() => toggleCardSelection('wrapper', myEnvelope.cards.wrapper)}
                  >
                    <div className="card-image-wrapper">
                      <img 
                        src={getCardImage('wrapper', myEnvelope.cards.wrapper)} 
                        alt={myEnvelope.cards.wrapper}
                        className="card-img"
                        onError={(e) => {
                          e.target.style.display = 'none'
                          e.target.nextSibling.style.display = 'flex'
                        }}
                      />
                      <div className="card-image" style={{display: 'none'}}>
                        <span>🎁</span>
                      </div>
                    </div>
                    <p>Regalo</p>
                    <small>{myEnvelope.cards.wrapper}</small>
                  </div>

                  <div 
                    className={`card-option ${selectedCards.some(c => c.type === 'ribbon') ? 'selected' : ''}`}
                    onClick={() => toggleCardSelection('ribbon', myEnvelope.cards.ribbon)}
                  >
                    <div className="card-image-wrapper">
                      <img 
                        src={getCardImage('ribbon', myEnvelope.cards.ribbon)} 
                        alt={myEnvelope.cards.ribbon}
                        className="card-img"
                        onError={(e) => {
                          e.target.style.display = 'none'
                          e.target.nextSibling.style.display = 'flex'
                        }}
                      />
                      <div className="card-image" style={{display: 'none'}}>
                        <div style={{
                          width: '80%',
                          height: '8px',
                          background: myEnvelope.cards.ribbon.toLowerCase(),
                          borderRadius: '4px'
                        }}></div>
                      </div>
                    </div>
                    <p>Cinta</p>
                    <small>{myEnvelope.cards.ribbon}</small>
                  </div>
                </div>

                <div className="cards-preview">
                  <h5>Se mostrarán: {selectedCards.length} carta{selectedCards.length !== 1 ? 's' : ''} + {3 - selectedCards.length} incógnita{3 - selectedCards.length !== 1 ? 's' : ''}</h5>
                </div>

                <button onClick={handleSuspicionResponse} className="btn-large">
                  Mostrar Cartas
                </button>
              </div>
            )}

            {suspicionType === 'hide' && (
              <div className="cards-selection">
                <h4>Se mostrarán 3 cartas incógnitas</h4>
                <div className="cards-preview">
                  {[0, 1, 2].map(i => (
                    <div key={i} className="card-preview">
                      <div className="card-image">
                        ❓
                      </div>
                    </div>
                  ))}
                </div>
                <button onClick={handleSuspicionResponse} className="btn-large">
                  Ocultar Verdad
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    )
  }

  // Pantalla principal de juego
  return (
    <div className="player-page">
      <div className="container">
        <div className="card player-card">
          <h1>🎮 Secret Santa Clue</h1>
          <h3>Jugador: {selectedPlayer}</h3>

          {myEnvelope && (
            <div className="my-envelope">
              <h4>Tu Sobre (Custodiando):</h4>
              <p className="envelope-label">Sobre de: <strong>{myEnvelope.recipient}</strong></p>
              <div className="envelope-cards">
                <p>Contiene {myEnvelope.cards ? '3 cartas de datos + 3 incógnitas' : '6 cartas'}</p>
              </div>
            </div>
          )}

          <div className="suspicion-trigger">
            <h4>🔍 Modo Responder Sospecha</h4>
            <p>Activa este modo cuando alguien te pregunte sobre tu sobre</p>
            <button 
              onClick={() => setSuspicionMode(true)}
              className="btn-large"
            >
              Activar Modo Sospecha
            </button>
          </div>

          <div className="instructions">
            <h4>📝 Instrucciones:</h4>
            <ul>
              <li>Observa el tablero en la pantalla principal</li>
              <li>Cuando alguien te pregunte, presiona "Activar Modo Sospecha"</li>
              <li>Elige si mostrar cartas coincidentes u ocultar la verdad</li>
              <li>¡Deduce quién es tu Amigo Secreto!</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Player
