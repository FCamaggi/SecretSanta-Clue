import { useState } from 'react'
import { DndProvider, useDrag } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'
import './Setup.css'

const PLAYERS = ['Mamá', 'Papá', 'Fay', 'Fio', 'Tato', 'Raffa']
const PLAYER_COLORS = {
  'Mamá': '#8b4513',    // Saddle Brown - elegante y vintage
  'Papá': '#191970',    // Midnight Blue - sofisticado
  'Fay': '#800080',     // Purple - misterioso
  'Fio': '#dc143c',     // Crimson - intenso
  'Tato': '#228b22',    // Forest Green - clásico
  'Raffa': '#ff8c00'    // Dark Orange - cálido
}

function DraggableSetupToken({ player, onPositionChange }) {
  const [position, setPosition] = useState({ x: 50, y: 50 })
  
  const handleDragStart = (e) => {
    e.dataTransfer.effectAllowed = 'move'
  }

  const handleDrag = (e) => {
    if (e.clientX === 0 && e.clientY === 0) return
    
    const boardRect = document.querySelector('.setup-board').getBoundingClientRect()
    const x = ((e.clientX - boardRect.left) / boardRect.width) * 100
    const y = ((e.clientY - boardRect.top) / boardRect.height) * 100
    
    setPosition({ x, y })
    onPositionChange(player, { x, y })
  }

  return (
    <div
      draggable
      onDragStart={handleDragStart}
      onDrag={handleDrag}
      className="setup-token"
      style={{
        backgroundColor: PLAYER_COLORS[player],
        left: `${position.x}%`,
        top: `${position.y}%`,
      }}
    >
      {player}
    </div>
  )
}

function DraggableSetupDice({ onPositionChange }) {
  const [position, setPosition] = useState({ x: 50, y: 20 })
  
  const handleDrag = (e) => {
    if (e.clientX === 0 && e.clientY === 0) return
    
    const boardRect = document.querySelector('.setup-board').getBoundingClientRect()
    const x = ((e.clientX - boardRect.left) / boardRect.width) * 100
    const y = ((e.clientY - boardRect.top) / boardRect.height) * 100
    
    setPosition({ x, y })
    onPositionChange({ x, y })
  }

  return (
    <div
      draggable
      onDrag={handleDrag}
      className="setup-dice"
      style={{
        left: `${position.x}%`,
        top: `${position.y}%`,
      }}
    >
      🎲
    </div>
  )
}

function Setup() {
  const [positions, setPositions] = useState({
    tokens: {},
    dice: { x: 50, y: 20 }
  })

  const handleTokenPosition = (player, pos) => {
    setPositions(prev => ({
      ...prev,
      tokens: {
        ...prev.tokens,
        [player]: pos
      }
    }))
  }

  const handleDicePosition = (pos) => {
    setPositions(prev => ({
      ...prev,
      dice: pos
    }))
  }

  const handleExport = () => {
    const dataStr = JSON.stringify(positions, null, 2)
    const dataBlob = new Blob([dataStr], { type: 'application/json' })
    const url = URL.createObjectURL(dataBlob)
    
    const link = document.createElement('a')
    link.href = url
    link.download = 'setup-positions.json'
    link.click()
    
    alert('¡Configuración exportada! Guarda este archivo para usarlo en el juego.')
  }

  return (
    <div className="setup-page">
      <div className="container">
        <div className="card setup-header">
          <h1>⚙️ Setup Inicial del Tablero</h1>
          <p>Arrastra las fichas y el dado a sus posiciones iniciales en el tablero</p>
        </div>

        <div className="setup-content">
          <div className="setup-board-container card">
            <div className="setup-board">
              <img 
                src="/tablero.jpg" 
                alt="Tablero" 
                className="board-background"
                draggable={false}
              />
              
              {PLAYERS.map(player => (
                <DraggableSetupToken
                  key={player}
                  player={player}
                  onPositionChange={handleTokenPosition}
                />
              ))}
              
              <DraggableSetupDice onPositionChange={handleDicePosition} />
            </div>
          </div>

          <div className="setup-sidebar card">
            <h3>📍 Posiciones Actuales</h3>
            
            <div className="positions-list">
              <h4>Fichas:</h4>
              {PLAYERS.map(player => (
                <div key={player} className="position-item">
                  <span 
                    className="color-dot"
                    style={{ backgroundColor: PLAYER_COLORS[player] }}
                  />
                  <span className="player-name">{player}:</span>
                  <span className="coords">
                    {positions.tokens[player] 
                      ? `(${positions.tokens[player].x.toFixed(1)}%, ${positions.tokens[player].y.toFixed(1)}%)`
                      : '(no posicionado)'
                    }
                  </span>
                </div>
              ))}
              
              <div className="position-item">
                <span className="dice-icon">🎲</span>
                <span className="player-name">Dado:</span>
                <span className="coords">
                  ({positions.dice.x.toFixed(1)}%, {positions.dice.y.toFixed(1)}%)
                </span>
              </div>
            </div>

            <button onClick={handleExport} className="btn-large">
              💾 Exportar Configuración
            </button>

            <div className="setup-instructions">
              <h4>📝 Instrucciones:</h4>
              <ul>
                <li>Arrastra cada ficha a su posición inicial</li>
                <li>Coloca el dado en su zona designada</li>
                <li>Exporta la configuración cuando termines</li>
                <li>Usa el archivo JSON en tu aplicación</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Setup
