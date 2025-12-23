# 🎄 EMPIEZA AQUÍ - Secret Santa Clue 🎁

## 👋 ¡Bienvenido!

Has creado exitosamente el proyecto **Secret Santa Clue**, un juego de deducción navideño para tu evento familiar.

---

## ⚡ INICIO RÁPIDO (3 Pasos)

### 1️⃣ Instala las Dependencias

**Opción A - Automático (Recomendado):**

```powershell
.\install.ps1
```

**Opción B - Manual:**

```powershell
cd frontend
npm install

cd ..\backend
npm install
copy .env.example .env
```

### 2️⃣ Agrega la Imagen del Tablero

⚠️ **MUY IMPORTANTE:**

Copia tu imagen `Tablero.png` (o `tablero.jpg`) a:

```
frontend\public\tablero.jpg
```

**El archivo DEBE llamarse exactamente:** `tablero.jpg`

### 3️⃣ Ejecuta el Proyecto

**Terminal 1 - Backend:**

```powershell
cd backend
npm run dev
```

✅ Deberías ver: `🎄 Servidor Secret Santa Clue corriendo en puerto 3001`

**Terminal 2 - Frontend:**

```powershell
cd frontend
npm run dev
```

✅ Abre automáticamente: `http://localhost:3000`

---

## 🎮 ¡Ya Estás Listo!

Ahora puedes:

1. Crear una partida
2. Unir jugadores con el código
3. ¡Jugar!

---

## 📚 Documentación Completa

### 📖 LEE ESTOS DOCUMENTOS EN ORDEN:

1. **[RESUMEN_PROYECTO.md](./RESUMEN_PROYECTO.md)**

   - 📋 Vista general completa del proyecto
   - ✨ Todas las características
   - 📁 Estructura de archivos

2. **[docs/INSTALACION.md](./docs/INSTALACION.md)**

   - 🚀 Guía detallada de instalación
   - 🔧 Configuración paso a paso
   - ✅ Checklist de verificación

3. **[docs/GUIA_EVENTO.md](./docs/GUIA_EVENTO.md)**

   - 📅 Preparación del día del evento
   - 🎯 Flujo completo del juego
   - 👥 Instrucciones para el host

4. **[docs/TROUBLESHOOTING.md](./docs/TROUBLESHOOTING.md)**

   - 🔧 Solución de problemas comunes
   - 🆘 Qué hacer si algo falla
   - 💡 Tips y comandos útiles

5. **[docs/HOJA_DEDUCCION.md](./docs/HOJA_DEDUCCION.md)**

   - 📝 Imprime una por jugador
   - ✍️ Para anotar deducciones durante el juego

---

## 🎯 Checklist Pre-Evento

### Una Semana Antes:

- [ ] Ejecutar `.\install.ps1`
- [ ] Agregar `tablero.jpg` en `frontend/public/`
- [ ] Probar el juego con 2-3 dispositivos
- [ ] Leer **GUIA_EVENTO.md** completo

### El Día Del Evento:

- [ ] Verificar WiFi del lugar
- [ ] Tener regalos físicos listos (6 envoltorios diferentes)
- [ ] Tener cintas reales guardadas (6 colores)
- [ ] Imprimir hojas de deducción (6 copias)
- [ ] Iniciar backend y frontend 30 min antes
- [ ] Probar conexión con un móvil

---

## 📱 Conexión Durante el Evento

### Servidor Principal (Tu Computadora):

```
http://localhost:3000
```

- Crea la partida aquí
- Muestra el tablero en pantalla grande

### Jugadores (Móviles/Tablets):

1. Obtén tu IP:

   ```powershell
   ipconfig
   ```

   Busca **IPv4** (ejemplo: 192.168.1.10)

2. Los jugadores acceden:

   ```
   http://TU-IP:3000
   ```

   (Reemplaza TU-IP con tu IPv4)

---

## 🎨 Estructura del Proyecto

```
Secret Santa Clue/
├── 📄 START_HERE.md          ← ¡Estás aquí!
├── 📄 RESUMEN_PROYECTO.md    ← Lee esto después
├── 📄 README.md              ← Documentación general
│
├── 📁 docs/                  ← Toda la documentación
│   ├── INSTALACION.md
│   ├── GUIA_EVENTO.md
│   ├── TROUBLESHOOTING.md
│   ├── HOJA_DEDUCCION.md
│   ├── DOCUMENTO DE DISEÑO TÉCNICO.md
│   └── Proyecto.md
│
├── 📁 frontend/              ← Aplicación React
│   ├── src/
│   │   └── pages/           ← 5 páginas principales
│   ├── public/
│   │   └── [tablero.jpg]    ← ⚠️ AGREGA ESTA IMAGEN
│   └── package.json
│
├── 📁 backend/               ← Servidor Node.js
│   ├── server.js
│   ├── gameManager.js
│   └── package.json
│
└── 🛠️ Scripts
    ├── install.ps1           ← Instalación automática
    └── package.json          ← Scripts de ejecución
```

---

## ❓ ¿Necesitas Ayuda?

### Si algo no funciona:

1. **Lee primero:** [docs/TROUBLESHOOTING.md](./docs/TROUBLESHOOTING.md)
2. **Verifica:**

   - ¿Está corriendo el backend? (debe mostrar el mensaje de puerto 3001)
   - ¿Está corriendo el frontend? (debe abrir en 3000)
   - ¿La imagen está en `frontend/public/tablero.jpg`?

3. **Consola del Navegador:**

   - Presiona F12
   - Ve a la pestaña "Console"
   - Busca errores en rojo

4. **Reinicia Todo:**

   ```powershell
   # Ctrl+C en ambas terminales, luego:
   cd backend && npm run dev
   cd frontend && npm run dev
   ```

---

## 🎄 Materiales Físicos Necesarios

Para el evento necesitarás:

✅ **6 Regalos** envueltos (colores diferentes)
✅ **6 Cintas** reales (colores: roja, verde, azul, dorada, plateada, blanca)
✅ **1 Computadora** (servidor)
✅ **1 Pantalla Grande** (TV o proyector)
✅ **6 Dispositivos móviles** (uno por jugador)
✅ **WiFi estable**
✅ **6 Hojas impresas** de deducción

---

## 🚀 Próximos Pasos

### Ahora Mismo:

1. ✅ Ejecuta `.\install.ps1`
2. ✅ Copia `tablero.jpg` a `frontend/public/`
3. ✅ Inicia backend y frontend
4. ✅ Prueba crear una partida

### Antes del Evento:

1. 📖 Lee **[GUIA_EVENTO.md](./docs/GUIA_EVENTO.md)**
2. 🧪 Prueba con familiares/amigos
3. 📝 Imprime hojas de deducción
4. 🎁 Prepara regalos y cintas

### El Día Del Evento:

1. 🎯 Sigue la guía paso a paso en GUIA_EVENTO.md
2. 🎉 ¡Disfruta el juego!

---

## 🎁 ¡Eso es Todo!

Tienes un juego completo y funcional para tu evento navideño.

### Recursos Rápidos:

- 📚 **Documentación Completa:** `docs/`
- 🎨 **Código Frontend:** `frontend/src/`
- ⚙️ **Código Backend:** `backend/`
- 🛠️ **Solución de Problemas:** `docs/TROUBLESHOOTING.md`

---

## 🎅 Mensaje Final

¡Que tengas un evento navideño increíble!

Este juego fue hecho especialmente para tu familia. Espero que todos se diviertan descubriendo sus Amigos Secretos y abriendo sus regalos.

**¡Felices Fiestas! 🎄✨🎁**

---

_Si tienes dudas, revisa [RESUMEN_PROYECTO.md](./RESUMEN_PROYECTO.md) para más detalles._
