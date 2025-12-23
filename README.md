# Secret Santa Clue 🎄🎁

Un juego de deducción navideño tipo Clue donde los jugadores deben descubrir quién es su Amigo Secreto, qué envoltorio tiene su regalo y qué cinta le pusieron.

## 🎮 Características

- **Tablero Interactivo**: Drag & drop para mover fichas y dados
- **Sistema Multiplayer**: Hasta 6 jugadores simultáneos
- **Tiempo Real**: Sincronización con Socket.io
- **Modo Sospecha**: Muestra cartas o oculta la verdad
- **Creador de Cartas**: Personaliza tus propias cartas con fotos
- **Setup Inicial**: Configura las posiciones del tablero

## 🚀 Instalación

### Frontend

```bash
cd frontend
npm install
npm run dev
```

El frontend se ejecutará en `http://localhost:3000`

### Backend

```bash
cd backend
npm install

# Copia el archivo de configuración
copy .env.example .env

npm run dev
```

El backend se ejecutará en `http://localhost:3001`

## 📁 Estructura del Proyecto

```
Secret Santa Clue/
├── frontend/               # Aplicación React
│   ├── src/
│   │   ├── pages/         # Páginas principales
│   │   │   ├── Home.jsx   # Pantalla inicial
│   │   │   ├── Board.jsx  # Tablero del juego
│   │   │   ├── Player.jsx # Interfaz de jugador
│   │   │   ├── CardCreator.jsx # Creador de cartas
│   │   │   └── Setup.jsx  # Configuración inicial
│   │   ├── App.jsx
│   │   └── main.jsx
│   ├── package.json
│   └── vite.config.js
├── backend/               # Servidor Node.js
│   ├── server.js         # Servidor principal
│   ├── gameManager.js    # Gestor de juegos
│   ├── utils.js          # Utilidades
│   └── package.json
├── tablero.jpg           # Imagen del tablero (debes añadirla)
├── netlify.toml          # Configuración de Netlify
└── README.md
```

## 🎯 Cómo Jugar

### 1. Crear Partida
- Entra a la página principal
- Haz clic en "Crear Nueva Partida"
- Se generará un código de 6 caracteres

### 2. Unirse al Juego
- Los jugadores entran con el código de partida
- Cada uno selecciona su personaje (Mamá, Papá, Fay, Fio, Tato, Raffa)
- Cuando los 6 jugadores se unen, el juego asigna automáticamente una cinta de regalo a cada uno

### 3. Armar Sobres
- Cada jugador arma el sobre de su amigo secreto (ya conocido de antemano)
- Selecciona: de quién es el sobre, su carta de remitente y su carta de envoltorio
- Se le asigna automáticamente una cinta única
- Confirma cuando esté listo
- El juego espera a que todos los jugadores creen sus sobres

### 4. Jugar
- Se reparten los sobres automáticamente (nunca recibirás tu propio sobre)
- Usa el tablero para moverte por las habitaciones
- Haz sospechas para descubrir tu trío de cartas
- Cuando alguien sospecha, activa el modo sospecha en tu móvil

### 5. Modo Sospecha
- **Armar Sospecha**: Muestra cartas que coinciden con la sospecha
- **Ocultar Verdad**: Muestra solo incógnitas (si es tu sobre o no tienes pruebas)

### 6. Ganar
- Haz una acusación cuando creas saber las 3 cartas
- ¡Abre tu regalo si aciertas!

## 🛠️ Tecnologías Utilizadas

### Frontend
- React 18
- React Router DOM
- React DnD (Drag and Drop)
- Socket.io Client
- Vite

### Backend
- Node.js
- Express
- Socket.io
- CORS

## 🌐 Deployment

### Frontend (Netlify)

1. Conecta tu repositorio con Netlify
2. Configura:
   - Build command: `npm run build`
   - Publish directory: `frontend/dist`
   - Base directory: `frontend`

O usando Netlify CLI:
```bash
cd frontend
npm run build
netlify deploy --prod
```

### Backend (Render)

1. Crea un nuevo Web Service en Render
2. Conecta tu repositorio
3. Configura:
   - Build Command: `cd backend && npm install`
   - Start Command: `cd backend && npm start`
   - Environment Variables: Añade `PORT=3001`

O despliega manualmente:
```bash
cd backend
# Sube a Render, Railway, Heroku, etc.
```

## 🎨 Crear Cartas Personalizadas

1. Ve a la sección "Crear Cartas Personalizadas"
2. Sube fotos para cada tipo de carta
3. Asigna títulos descriptivos
4. Exporta el JSON
5. Importa las cartas en tu juego

## 📝 Requisitos

- Node.js 18 o superior
- Navegador moderno con soporte para ES6+
- Imagen del tablero (`tablero.jpg` en la carpeta `frontend/public/`)

## 🎄 Notas Importantes

- La imagen del tablero (`tablero.jpg`) debe estar en `frontend/public/`
- Todos los jugadores deben estar en la misma red o usar el mismo código
- El juego funciona mejor con exactamente 6 jugadores
- Asegúrate de que el backend esté corriendo antes de iniciar el frontend

## 🤝 Contribuir

Este es un proyecto personal para el evento navideño de la familia. ¡Siéntete libre de hacer un fork y adaptarlo!

## 📄 Licencia

Uso personal y familiar.

## 👨‍💻 Autor

Creado con ❤️ para el evento navideño de la familia.

---

¡Felices Fiestas! 🎄🎅🎁
