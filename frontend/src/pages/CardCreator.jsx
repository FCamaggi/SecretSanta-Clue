import { useState, useRef } from 'react'
import './CardCreator.css'

function CardCreator() {
  const [cardType, setCardType] = useState('sender') // sender, wrapper, ribbon
  const [cardTitle, setCardTitle] = useState('')
  const [cardImage, setCardImage] = useState(null)
  const [previewUrl, setPreviewUrl] = useState('')
  const [createdCards, setCreatedCards] = useState([])
  const canvasRef = useRef(null)

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
        image: previewUrl,
        imageFile: cardImage // Guardar el archivo original
      }
      
      setCreatedCards([...createdCards, newCard])
      
      // Limpiar formulario
      setCardTitle('')
      setCardImage(null)
      setPreviewUrl('')
    }
  }

  const createCardImage = (card) => {
    return new Promise((resolve) => {
      const canvas = document.createElement('canvas')
      const ctx = canvas.getContext('2d')
      
      // Tamaño de carta estándar (poker size: 2.5" x 3.5" a 300dpi)
      canvas.width = 750
      canvas.height = 1050
      
      const img = new Image()
      img.onload = () => {
        // Fondo blanco
        ctx.fillStyle = '#ffffff'
        ctx.fillRect(0, 0, canvas.width, canvas.height)
        
        // Dibujar imagen centrada
        const imgAspect = img.width / img.height
        const canvasAspect = canvas.width / canvas.height
        let drawWidth, drawHeight, offsetX, offsetY
        
        if (imgAspect > canvasAspect) {
          drawWidth = canvas.width
          drawHeight = canvas.width / imgAspect
          offsetX = 0
          offsetY = (canvas.height - drawHeight) / 2
        } else {
          drawHeight = canvas.height * 0.7
          drawWidth = drawHeight * imgAspect
          offsetX = (canvas.width - drawWidth) / 2
          offsetY = 50
        }
        
        ctx.drawImage(img, offsetX, offsetY, drawWidth, drawHeight)
        
        // Texto del título
        ctx.fillStyle = '#1a1a2e'
        ctx.font = 'bold 48px "Playfair Display", serif'
        ctx.textAlign = 'center'
        ctx.fillText(card.title, canvas.width / 2, canvas.height - 100)
        
        // Badge del tipo
        const typeEmoji = {
          sender: '👤',
          wrapper: '🎁',
          ribbon: '🎀'
        }
        ctx.font = '60px Arial'
        ctx.fillText(typeEmoji[card.type], canvas.width / 2, canvas.height - 30)
        
        canvas.toBlob((blob) => {
          resolve(blob)
        }, 'image/png')
      }
      img.src = card.image
    })
  }

  const handleDownloadCard = async (card) => {
    const blob = await createCardImage(card)
    const url = URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = url
    link.download = `carta-${card.title.replace(/\s+/g, '-').toLowerCase()}.png`
    link.click()
    URL.revokeObjectURL(url)
  }

  const handleDownloadAll = async () => {
    if (createdCards.length === 0) return
    
    // Si solo hay una carta, descargarla directamente
    if (createdCards.length === 1) {
      handleDownloadCard(createdCards[0])
      return
    }
    
    // Para múltiples cartas, descargarlas una por una
    for (const card of createdCards) {
      await handleDownloadCard(card)
      // Pequeño delay entre descargas para evitar que el navegador las bloquee
      await new Promise(resolve => setTimeout(resolve, 300))
    }
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
              <button onClick={handleDownloadAll} className="btn-export">
                💾 Descargar Todas ({createdCards.length} PNG)
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
                  <button 
                    className="download-btn"
                    onClick={() => handleDownloadCard(card)}
                    title="Descargar esta carta"
                  >
                    ⬇️
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
            <li>Descarga cada carta como PNG o todas a la vez</li>
            <li>Imprime las cartas para usar en tu juego físico</li>
          </ul>
          
          <div className="tips">
            <h4>💡 Recomendaciones:</h4>
            <ul>
              <li>Usa fotos claras y bien iluminadas</li>
              <li>Las imágenes cuadradas se ven mejor</li>
              <li>Para jugadores: fotos de rostros</li>
              <li>Para envoltorios: fotos de papeles de regalo</li>
              <li>Para cintas: fotos de cintas reales o colores</li>
              <li><strong>Las cartas se descargan como PNG de 750x1050px</strong></li>
              <li><strong>Puedes descargar cada carta individual o todas a la vez</strong></li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CardCreator
