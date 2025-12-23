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
        // === FONDO DEGRADADO ELEGANTE ===
        const gradient = ctx.createLinearGradient(0, 0, 0, canvas.height)
        gradient.addColorStop(0, '#1a1a2e')
        gradient.addColorStop(1, '#16213e')
        ctx.fillStyle = gradient
        ctx.fillRect(0, 0, canvas.width, canvas.height)
        
        // === MARCO DECORATIVO DORADO ===
        const borderWidth = 30
        const innerBorder = 10
        
        // Marco exterior dorado
        ctx.strokeStyle = '#daa520'
        ctx.lineWidth = borderWidth
        ctx.strokeRect(borderWidth / 2, borderWidth / 2, 
                       canvas.width - borderWidth, canvas.height - borderWidth)
        
        // Marco interior café oscuro
        ctx.strokeStyle = '#8b4513'
        ctx.lineWidth = 8
        ctx.strokeRect(borderWidth + innerBorder, borderWidth + innerBorder,
                       canvas.width - (borderWidth + innerBorder) * 2, 
                       canvas.height - (borderWidth + innerBorder) * 2)
        
        // === ORNAMENTOS EN LAS ESQUINAS ===
        const drawCornerOrnament = (x, y, rotation) => {
          ctx.save()
          ctx.translate(x, y)
          ctx.rotate(rotation * Math.PI / 180)
          ctx.strokeStyle = '#daa520'
          ctx.lineWidth = 3
          ctx.beginPath()
          ctx.arc(0, 0, 15, 0, Math.PI / 2)
          ctx.stroke()
          ctx.beginPath()
          ctx.arc(0, 0, 10, 0, Math.PI / 2)
          ctx.stroke()
          ctx.restore()
        }
        
        drawCornerOrnament(50, 50, 0)           // Superior izquierda
        drawCornerOrnament(canvas.width - 50, 50, 90)  // Superior derecha
        drawCornerOrnament(50, canvas.height - 50, 270) // Inferior izquierda
        drawCornerOrnament(canvas.width - 50, canvas.height - 50, 180) // Inferior derecha
        
        // === ÁREA DE IMAGEN CON MARCO ===
        const imageMargin = 80
        const imageAreaY = 120
        const imageAreaHeight = 600
        const imageAreaWidth = canvas.width - imageMargin * 2
        
        // Fondo para la imagen
        ctx.fillStyle = '#0f0f1e'
        ctx.fillRect(imageMargin, imageAreaY, imageAreaWidth, imageAreaHeight)
        
        // Marco dorado alrededor de la imagen
        ctx.strokeStyle = '#daa520'
        ctx.lineWidth = 4
        ctx.strokeRect(imageMargin, imageAreaY, imageAreaWidth, imageAreaHeight)
        
        // Dibujar imagen centrada y con clip
        ctx.save()
        ctx.beginPath()
        ctx.rect(imageMargin + 5, imageAreaY + 5, imageAreaWidth - 10, imageAreaHeight - 10)
        ctx.clip()
        
        const imgAspect = img.width / img.height
        const areaAspect = imageAreaWidth / imageAreaHeight
        let drawWidth, drawHeight, offsetX, offsetY
        
        if (imgAspect > areaAspect) {
          drawHeight = imageAreaHeight - 10
          drawWidth = drawHeight * imgAspect
          offsetX = imageMargin + (imageAreaWidth - drawWidth) / 2
          offsetY = imageAreaY + 5
        } else {
          drawWidth = imageAreaWidth - 10
          drawHeight = drawWidth / imgAspect
          offsetX = imageMargin + 5
          offsetY = imageAreaY + (imageAreaHeight - drawHeight) / 2
        }
        
        ctx.drawImage(img, offsetX, offsetY, drawWidth, drawHeight)
        ctx.restore()
        
        // === ICONO DEL TIPO ===
        const typeEmoji = {
          sender: '👤',
          wrapper: '🎁',
          ribbon: '🎀'
        }
        const typeLabels = {
          sender: 'JUGADOR',
          wrapper: 'ENVOLTORIO',
          ribbon: 'CINTA'
        }
        
        // Fondo para el icono
        ctx.fillStyle = '#daa520'
        ctx.beginPath()
        ctx.arc(canvas.width / 2, 770, 40, 0, Math.PI * 2)
        ctx.fill()
        
        // Borde del círculo
        ctx.strokeStyle = '#8b4513'
        ctx.lineWidth = 4
        ctx.stroke()
        
        // Emoji
        ctx.font = '50px Arial'
        ctx.textAlign = 'center'
        ctx.textBaseline = 'middle'
        ctx.fillStyle = '#1a1a2e'
        ctx.fillText(typeEmoji[card.type], canvas.width / 2, 770)
        
        // === ETIQUETA DE TIPO ===
        ctx.font = 'bold 24px "Playfair Display", serif'
        ctx.fillStyle = '#daa520'
        ctx.textAlign = 'center'
        ctx.fillText(typeLabels[card.type], canvas.width / 2, 850)
        
        // === TÍTULO DE LA CARTA ===
        ctx.font = 'bold 56px "Playfair Display", serif'
        ctx.fillStyle = '#f5deb3'
        ctx.textAlign = 'center'
        ctx.textBaseline = 'middle'
        
        // Sombra del texto
        ctx.shadowColor = 'rgba(0, 0, 0, 0.8)'
        ctx.shadowBlur = 10
        ctx.shadowOffsetX = 3
        ctx.shadowOffsetY = 3
        
        // Ajustar tamaño de fuente si el título es muy largo
        const maxWidth = canvas.width - 120
        let fontSize = 56
        ctx.font = `bold ${fontSize}px "Playfair Display", serif`
        while (ctx.measureText(card.title).width > maxWidth && fontSize > 30) {
          fontSize -= 2
          ctx.font = `bold ${fontSize}px "Playfair Display", serif`
        }
        
        ctx.fillText(card.title, canvas.width / 2, 930)
        
        // Línea decorativa bajo el título
        ctx.shadowColor = 'transparent'
        ctx.strokeStyle = '#daa520'
        ctx.lineWidth = 3
        ctx.beginPath()
        const lineWidth = 200
        ctx.moveTo(canvas.width / 2 - lineWidth / 2, 970)
        ctx.lineTo(canvas.width / 2 + lineWidth / 2, 970)
        ctx.stroke()
        
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
    // Normalizar nombre: sin tildes, espacios a guiones, minúsculas
    const normalizedName = card.title
      .toLowerCase()
      .normalize('NFD').replace(/[\u0300-\u036f]/g, '') // Remover tildes
      .replace(/\s+/g, '-') // Espacios a guiones
    link.download = `${normalizedName}.png`
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
