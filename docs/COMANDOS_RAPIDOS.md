# ⚡ Comandos Rápidos - Secret Santa Clue

## 🚀 Iniciar Proyecto

### Desarrollo (2 terminales)

```powershell
# Terminal 1 - Backend
cd backend
npm run dev

# Terminal 2 - Frontend
cd frontend
npm run dev
```

### Desde la Raíz (requiere instalar concurrently)

```powershell
npm run dev
```

## 📦 Instalación

### Primera Vez

```powershell
# Frontend
cd frontend
npm install

# Backend
cd backend
npm install
copy .env.example .env
```

### Reinstalar Todo

```powershell
# Frontend
cd frontend
Remove-Item -Recurse -Force node_modules
Remove-Item package-lock.json
npm install

# Backend
cd backend
Remove-Item -Recurse -Force node_modules
Remove-Item package-lock.json
npm install
```

## 🔍 Verificación

### Ver IP Local

```powershell
ipconfig
# Busca IPv4 Address
```

### Verificar Puertos

```powershell
# Ver qué está usando el puerto 3000
netstat -ano | findstr :3000

# Ver qué está usando el puerto 3001
netstat -ano | findstr :3001
```

### Verificar Node.js

```powershell
node --version
# Debe ser v18 o superior
```

## 🛑 Detener Servidores

### Método 1: Ctrl+C en cada terminal

### Método 2: Matar procesos

```powershell
# Matar proceso en puerto 3000
Get-Process -Id (Get-NetTCPConnection -LocalPort 3000).OwningProcess | Stop-Process

# Matar proceso en puerto 3001
Get-Process -Id (Get-NetTCPConnection -LocalPort 3001).OwningProcess | Stop-Process
```

## 🔧 Mantenimiento

### Limpiar Caché npm

```powershell
npm cache clean --force
```

### Actualizar Dependencias

```powershell
# Frontend
cd frontend
npm update

# Backend
cd backend
npm update
```

## 📁 Navegar Proyecto

### Abrir en VS Code

```powershell
code "c:\Users\Fabrizio Camaggi\OneDrive\Documentos\Desarrollo\Secret Santa Clue"
```

### Abrir Carpetas

```powershell
# Raíz
cd "c:\Users\Fabrizio Camaggi\OneDrive\Documentos\Desarrollo\Secret Santa Clue"

# Frontend
cd frontend

# Backend
cd backend

# Docs
cd docs
```

## 🌐 URLs del Proyecto

### Desarrollo Local

- **Frontend:** http://localhost:3000
- **Backend API:** http://localhost:3001
- **Socket.io:** ws://localhost:3001

### Red Local (otros dispositivos)

- **Frontend:** http://[TU-IP]:3000
- Obtén IP con: `ipconfig`

## 🎮 URLs de las Páginas

### Principal

- Home: `http://localhost:3000`

### Juego

- Tablero: `http://localhost:3000/board/[CODIGO]`
- Jugador: `http://localhost:3000/player/[CODIGO]`

### Herramientas

- Crear Cartas: `http://localhost:3000/card-creator`
- Setup: `http://localhost:3000/setup`

## 🔥 Firewall (Windows)

### Permitir Puertos

```powershell
# Ejecutar como Administrador
New-NetFirewallRule -DisplayName "Secret Santa Dev" -Direction Inbound -LocalPort 3000,3001 -Protocol TCP -Action Allow
```

### Ver Reglas

```powershell
Get-NetFirewallRule | Where-Object {$_.DisplayName -like "*Secret Santa*"}
```

### Eliminar Regla

```powershell
Remove-NetFirewallRule -DisplayName "Secret Santa Dev"
```

## 📝 Logs y Debugging

### Ver Consola del Navegador

- Presiona `F12`
- Pestaña "Console"

### Ver Logs del Backend

- Ya aparecen en la terminal donde corre `npm run dev`

### Ver Conexiones Socket.io

- En consola del navegador ejecuta:

```javascript
// Ver estado de conexión
socket.connected;

// Ver eventos
socket.onAny((event, ...args) => {
  console.log('Socket event:', event, args);
});
```

## 🔄 Git (Opcional)

### Inicializar Repositorio

```powershell
git init
git add .
git commit -m "Initial commit: Secret Santa Clue game"
```

### Ignorar Archivos

Ya existe `.gitignore` que excluye:

- node_modules
- .env
- dist
- \*.log

## 📦 Build para Producción

### Frontend

```powershell
cd frontend
npm run build
# Genera carpeta: dist/
```

### Previsualizar Build

```powershell
cd frontend
npm run preview
```

## 🎯 Atajos Útiles

### Abrir Todo de Una Vez

```powershell
# Crear este script: start-all.ps1
Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd backend; npm run dev"
Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd frontend; npm run dev"
Start-Process "http://localhost:3000"
```

### Limpiar Todo

```powershell
# Crear este script: clean-all.ps1
cd frontend
Remove-Item -Recurse -Force node_modules, dist, package-lock.json -ErrorAction SilentlyContinue

cd ../backend
Remove-Item -Recurse -Force node_modules, package-lock.json -ErrorAction SilentlyContinue

Write-Host "Limpieza completada. Ejecuta npm install en cada carpeta."
```

## 🆘 Emergencia - Reinicio Total

```powershell
# 1. Detener todos los procesos Node.js
Get-Process node | Stop-Process

# 2. Limpiar todo
cd frontend
Remove-Item -Recurse -Force node_modules
cd ../backend
Remove-Item -Recurse -Force node_modules

# 3. Reinstalar
cd ../frontend
npm install
cd ../backend
npm install

# 4. Reiniciar
cd backend
npm run dev
# Nueva terminal
cd frontend
npm run dev
```

---

## 📚 Más Información

- **Guía Completa:** START_HERE.md
- **Instalación:** docs/INSTALACION.md
- **Problemas:** docs/TROUBLESHOOTING.md
- **Evento:** docs/GUIA_EVENTO.md

---

**💡 Tip:** Guarda este archivo para referencia rápida durante el desarrollo y evento.
