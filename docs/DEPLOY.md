# Secret Santa Clue - Guía de Deploy

## 🚀 Deploy en Netlify + Render

### 1️⃣ Backend en Render

1. Ve a [Render.com](https://render.com) y crea una cuenta
2. Conecta tu repositorio de GitHub
3. Crear nuevo **Web Service**
4. Configuración:
   - **Name**: `secret-santa-backend`
   - **Region**: Oregon (Free)
   - **Branch**: `main`
   - **Root Directory**: `backend`
   - **Build Command**: `npm install`
   - **Start Command**: `node server.js`
   - **Plan**: Free

5. **Variables de entorno** en Render:
   ```
   NODE_ENV=production
   PORT=10000
   FRONTEND_URL=https://tu-app.netlify.app
   ```

6. Copia la URL del backend (ej: `https://secret-santa-backend.onrender.com`)

### 2️⃣ Frontend en Netlify

1. Ve a [Netlify.com](https://netlify.com) y crea una cuenta
2. **New site from Git** → Conecta GitHub
3. Selecciona el repositorio `SecretSanta-Clue`
4. Configuración automática (lee `netlify.toml`)
5. **Environment Variables**:
   ```
   BACKEND_URL=https://secret-santa-backend.onrender.com
   ```

6. Deploy!

### 3️⃣ Actualizar CORS

Una vez tengas la URL de Netlify, actualiza en Render:
```
FRONTEND_URL=https://tu-app.netlify.app
```

---

## 📝 Variables de Entorno

### Backend (Render)
- `NODE_ENV`: production
- `PORT`: 10000 (automático en Render)
- `FRONTEND_URL`: URL de Netlify

### Frontend (Netlify)
- `BACKEND_URL`: URL de Render
- `NODE_VERSION`: 18 (en netlify.toml)

---

## 🔄 Redeploy

### Actualizar backend:
```bash
git add .
git commit -m "Update backend"
git push origin main
```
Render detecta cambios automáticamente.

### Actualizar frontend:
```bash
git add .
git commit -m "Update frontend"
git push origin main
```
Netlify detecta cambios automáticamente.

---

## 🐛 Troubleshooting

### Error: WebSocket connection failed
- Verifica que `BACKEND_URL` en Netlify sea correcto
- Asegúrate que Render esté activo (free tier duerme tras inactividad)

### Error: CORS
- Verifica que `FRONTEND_URL` en Render coincida con URL de Netlify
- Incluye `https://` en las URLs

### Backend dormido (Free Tier)
- El backend en Render se duerme tras 15 min de inactividad
- Primera conexión toma ~30 segundos en despertar
- Considera ping automático o upgrade a plan pagado

---

## 🎮 URLs de Producción

- **Frontend**: https://[tu-sitio].netlify.app
- **Backend**: https://secret-santa-backend.onrender.com
- **Board**: https://[tu-sitio].netlify.app/board
- **Player**: https://[tu-sitio].netlify.app/player
