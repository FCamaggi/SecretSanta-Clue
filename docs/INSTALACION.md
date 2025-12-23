# Guía de Instalación y Ejecución Rápida

## 🚀 Inicio Rápido

### Paso 1: Instalar Dependencias

#### Frontend
```powershell
cd frontend
npm install
```

#### Backend
```powershell
cd backend
npm install
```

### Paso 2: Configurar Backend

```powershell
cd backend
copy .env.example .env
```

Edita `.env` si necesitas cambiar el puerto o agregar MongoDB.

### Paso 3: Agregar Imagen del Tablero

Coloca tu imagen `tablero.jpg` (la que adjuntaste) en:
```
frontend/public/tablero.jpg
```

### Paso 4: Ejecutar el Proyecto

#### Terminal 1 - Backend
```powershell
cd backend
npm run dev
```

Deberías ver: `🎄 Servidor Secret Santa Clue corriendo en puerto 3001`

#### Terminal 2 - Frontend
```powershell
cd frontend
npm run dev
```

Abre tu navegador en: `http://localhost:3000`

## 🎮 Uso

1. **Crear Partida**: Haz clic en "Crear Nueva Partida" en la pantalla principal
2. **Unir Jugadores**: Los demás jugadores usan el código de 6 caracteres para unirse
3. **Armar Sobres**: Cada jugador crea su sobre secreto
4. **¡Jugar!**: Mueve las fichas, haz sospechas y descubre tu regalo

## 🛠️ Comandos Útiles

### Desarrollo
```powershell
# Frontend
cd frontend
npm run dev

# Backend
cd backend
npm run dev
```

### Producción
```powershell
# Compilar frontend
cd frontend
npm run build

# Iniciar backend
cd backend
npm start
```

## 📱 Acceso desde Otros Dispositivos

Para que otros dispositivos se conecten:

1. Obtén tu IP local: `ipconfig` (busca IPv4)
2. En `frontend/vite.config.js`, actualiza el proxy con tu IP
3. Los jugadores acceden desde: `http://TU-IP:3000`

## ⚠️ Solución de Problemas

### No se conecta el backend
- Verifica que el puerto 3001 esté libre
- Asegúrate de que ambos servidores estén corriendo

### No se ve la imagen del tablero
- Confirma que `tablero.jpg` esté en `frontend/public/`
- Recarga la página con Ctrl+F5

### Error de Socket.io
- Verifica que el backend esté corriendo primero
- Revisa la consola del navegador para ver errores

## 🎄 ¡Listo para tu Evento Navideño!

Ya tienes todo configurado. Prueba primero con un par de dispositivos antes del evento real.
