import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import './Home.css'

function Home() {
  const navigate = useNavigate()
  const [gameCode, setGameCode] = useState('')

  const createGame = async () => {
    try {
      const backendUrl = import.meta.env.VITE_BACKEND_URL || 'http://localhost:3001'
      const response = await fetch(`${backendUrl}/api/game/create`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' }
      })
      const data = await response.json()
      navigate(`/board/${data.gameCode}`)
    } catch (error) {
      console.error('Error creando juego:', error)
    }
  }

  const joinGame = () => {
    if (gameCode.trim()) {
      navigate(`/player/${gameCode}`)
    }
  }

  return (
    <div className="home">
      <div className="snowflakes">
        {[...Array(20)].map((_, i) => (
          <div key={i} className="snowflake" style={{
            left: `${Math.random() * 100}%`,
            animationDuration: `${3 + Math.random() * 5}s`,
            animationDelay: `${Math.random() * 5}s`,
            opacity: Math.random()
          }}>❄</div>
        ))}
      </div>

      <div className="container home-container">
        <div className="card home-card">
          <h1 className="home-title">🎄 Secret Santa Clue 🎁</h1>
          <h2 className="home-subtitle">El Misterio del Regalo</h2>
          
          <div className="home-buttons">
            <button className="btn-large btn-primary" onClick={createGame}>
              🎮 Crear Nueva Partida
            </button>
            
            <div className="divider">
              <span>o</span>
            </div>

            <div className="join-game">
              <input
                type="text"
                placeholder="Código de partida"
                value={gameCode}
                onChange={(e) => setGameCode(e.target.value.toUpperCase())}
                maxLength={6}
              />
              <button className="btn-large btn-secondary" onClick={joinGame}>
                👥 Unirse a Partida
              </button>
            </div>

            <div className="divider">
              <span>o</span>
            </div>

            <button 
              className="btn-large btn-tertiary" 
              onClick={() => navigate('/card-creator')}
            >
              🎨 Crear Cartas Personalizadas
            </button>

            <button 
              className="btn-large btn-tertiary" 
              onClick={() => navigate('/setup')}
            >
              ⚙️ Setup Inicial del Tablero
            </button>
          </div>
        </div>

        <div className="rules-preview card">
          <h3>📜 Resumen del Juego</h3>
          <p>
            Un juego de deducción tipo Clue donde cada jugador debe descubrir quién es su Amigo Secreto,
            qué envoltorio tiene su regalo y qué cinta le pusieron.
          </p>
          <ul>
            <li>👥 6 Jugadores</li>
            <li>🏠 Muévete por las habitaciones</li>
            <li>🔍 Haz sospechas y deduce la verdad</li>
            <li>🎁 ¡Descubre tu regalo navideño!</li>
          </ul>
        </div>
      </div>
    </div>
  )
}

export default Home
