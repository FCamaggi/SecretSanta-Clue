import { useState } from 'react'
import './CardCreator.css'

function CardCreator() {
  const [cardType, setCardType] = useState('sender') // sender, wrapper, ribbon
  const [cardTitle, setCardTitle] = useState('')
  const [cardImage, setCardImage] = useState(null)
  const [previewUrl, setPreviewUrl] = useState('')
  const [createdCards, setCreatedCards] = useState([])

  const handleImageUpload = (e) => {
    const file = e.target.files[0]
    if (file) {
      setCardImage(file)
      const url = URL.createObjectURL(file)
      setPreviewUrl(url)
    }
  }

  const handleCreateCard = () => {
    if (cardTitle && previewUrl) {
      const newCard = {
        id: Date.now(),
        type: cardType,
        title: cardTitle,
        image: previewUrl
      }
      
      setCreatedCards([...createdCards, newCard])
      
      // Limpiar formulario
      setCardTitle('')
      setCardImage(null)
      setPreviewUrl('')
    }
  }

  const handleExportCards = () => {
    // Crear un JSON con todas las cartas creadas
    const dataStr = JSON.stringify(createdCards, null, 2)
    const dataBlob = new Blob([dataStr], { type: 'application/json' })
    const url = URL.createObjectURL(dataBlob)
    
    const link = document.createElement('a')
    link.href = url
    link.download = 'cartas-secret-santa.json'
    link.click()
  }

  const deleteCard = (id) => {
    setCreatedCards(createdCards.filter(card => card.id !== id))
  }

  return (
    <div className="card-creator-page">
      <div className="container">
        <div className="card creator-card">
          <h1>🎨 Creador de Cartas Personalizadas</h1>
          <p className="subtitle">
            Crea tus propias cartas con fotos y títulos personalizados
          </p>

          <div className="creator-form">
            <div className="form-group">
              <label>Tipo de Carta:</label>
              <select value={cardType} onChange={(e) => setCardType(e.target.value)}>
                <option value="sender">👤 Remitente (Jugador)</option>
                <option value="wrapper">🎁 Envoltorio</option>
                <option value="ribbon">🎀 Cinta</option>
              </select>
            </div>

            <div className="form-group">
              <label>Título de la Carta:</label>
              <input
                type="text"
                placeholder="Ej: Mamá, Rojo Navideño, Cinta Dorada..."
                value={cardTitle}
                onChange={(e) => setCardTitle(e.target.value)}
              />
            </div>

            <div className="form-group">
              <label>Imagen de la Carta:</label>
              <div className="file-upload">
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  id="file-input"
                />
                <label htmlFor="file-input" className="file-label">
                  📁 Seleccionar Imagen
                </label>
              </div>
            </div>

            {previewUrl && (
              <div className="preview-section">
                <h3>Vista Previa:</h3>
                <div className="card-preview-large">
                  <img src={previewUrl} alt="Preview" />
                  <div className="card-title-overlay">{cardTitle}</div>
                </div>
              </div>
            )}

            <button 
              onClick={handleCreateCard}
              disabled={!cardTitle || !previewUrl}
              className="btn-large"
            >
              ➕ Crear Carta
            </button>
          </div>
        </div>

        {createdCards.length > 0 && (
          <div className="card created-cards">
            <div className="cards-header">
              <h2>🃏 Cartas Creadas ({createdCards.length})</h2>
              <button onClick={handleExportCards} className="btn-export">
                💾 Exportar JSON
              </button>
            </div>

            <div className="cards-grid">
              {createdCards.map(card => (
                <div key={card.id} className="created-card-item">
                  <button 
                    className="delete-btn"
                    onClick={() => deleteCard(card.id)}
                  >
                    ✕
                  </button>
                  <div className="card-type-badge">
                    {card.type === 'sender' && '👤'}
                    {card.type === 'wrapper' && '🎁'}
                    {card.type === 'ribbon' && '🎀'}
                  </div>
                  <img src={card.image} alt={card.title} />
                  <p>{card.title}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="card instructions-card">
          <h3>📝 Instrucciones</h3>
          <ul>
            <li>Selecciona el tipo de carta que deseas crear</li>
            <li>Asigna un título descriptivo</li>
            <li>Sube una foto desde tu dispositivo</li>
            <li>Crea tantas cartas como necesites</li>
            <li>Exporta el archivo JSON para importarlo al juego</li>
          </ul>
          
          <div className="tips">
            <h4>💡 Recomendaciones:</h4>
            <ul>
              <li>Usa fotos claras y bien iluminadas</li>
              <li>Las imágenes cuadradas se ven mejor</li>
              <li>Para jugadores: fotos de rostros</li>
              <li>Para envoltorios: fotos de papeles de regalo</li>
              <li>Para cintas: fotos de cintas reales o colores</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CardCreator
