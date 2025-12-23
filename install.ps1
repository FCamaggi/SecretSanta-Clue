# Script de Instalación Rápida - Secret Santa Clue
# Ejecuta este script desde la raíz del proyecto

Write-Host "🎄 Instalando Secret Santa Clue..." -ForegroundColor Green
Write-Host ""

# Verificar Node.js
Write-Host "Verificando Node.js..." -ForegroundColor Yellow
$nodeVersion = node --version 2>$null
if ($LASTEXITCODE -ne 0) {
    Write-Host "❌ Node.js no está instalado. Por favor instala Node.js 18 o superior." -ForegroundColor Red
    Write-Host "Descarga desde: https://nodejs.org/" -ForegroundColor Cyan
    exit 1
}
Write-Host "✅ Node.js encontrado: $nodeVersion" -ForegroundColor Green
Write-Host ""

# Instalar Frontend
Write-Host "📦 Instalando dependencias del Frontend..." -ForegroundColor Yellow
Set-Location frontend
npm install
if ($LASTEXITCODE -ne 0) {
    Write-Host "❌ Error instalando frontend" -ForegroundColor Red
    exit 1
}
Write-Host "✅ Frontend instalado correctamente" -ForegroundColor Green
Set-Location ..
Write-Host ""

# Instalar Backend
Write-Host "📦 Instalando dependencias del Backend..." -ForegroundColor Yellow
Set-Location backend
npm install
if ($LASTEXITCODE -ne 0) {
    Write-Host "❌ Error instalando backend" -ForegroundColor Red
    exit 1
}
Write-Host "✅ Backend instalado correctamente" -ForegroundColor Green

# Crear archivo .env
if (-not (Test-Path ".env")) {
    Copy-Item ".env.example" ".env"
    Write-Host "✅ Archivo .env creado" -ForegroundColor Green
} else {
    Write-Host "⚠️  Archivo .env ya existe" -ForegroundColor Yellow
}
Set-Location ..
Write-Host ""

# Verificar imagen del tablero
Write-Host "🖼️  Verificando imagen del tablero..." -ForegroundColor Yellow
if (-not (Test-Path "frontend\public\tablero.jpg")) {
    Write-Host "⚠️  No se encontró la imagen del tablero" -ForegroundColor Yellow
    Write-Host "   Por favor coloca tu imagen 'tablero.jpg' en: frontend\public\" -ForegroundColor Cyan
} else {
    Write-Host "✅ Imagen del tablero encontrada" -ForegroundColor Green
}
Write-Host ""

# Resumen
Write-Host "=" * 60 -ForegroundColor Cyan
Write-Host "✨ ¡Instalación Completada!" -ForegroundColor Green
Write-Host "=" * 60 -ForegroundColor Cyan
Write-Host ""
Write-Host "📝 Próximos Pasos:" -ForegroundColor Yellow
Write-Host ""
Write-Host "1. Si no lo hiciste, coloca 'tablero.jpg' en: frontend\public\" -ForegroundColor White
Write-Host ""
Write-Host "2. Inicia el Backend (Terminal 1):" -ForegroundColor White
Write-Host "   cd backend" -ForegroundColor Cyan
Write-Host "   npm run dev" -ForegroundColor Cyan
Write-Host ""
Write-Host "3. Inicia el Frontend (Terminal 2):" -ForegroundColor White
Write-Host "   cd frontend" -ForegroundColor Cyan
Write-Host "   npm run dev" -ForegroundColor Cyan
Write-Host ""
Write-Host "4. Abre tu navegador en: http://localhost:3000" -ForegroundColor White
Write-Host ""
Write-Host "🎁 ¡Feliz Navidad y que disfrutes el juego!" -ForegroundColor Green
Write-Host ""
