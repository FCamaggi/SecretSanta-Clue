# 🔧 Solución de Problemas - Secret Santa Clue

## Problemas de Instalación

### ❌ "npm no se reconoce como comando"

**Problema:** Node.js no está instalado o no está en el PATH.

**Solución:**
1. Descarga Node.js desde: https://nodejs.org/
2. Instala la versión LTS (18 o superior)
3. Reinicia tu terminal
4. Verifica: `node --version`

### ❌ Error al ejecutar `npm install`

**Problema:** Permisos o caché corrupto.

**Solución:**
```powershell
# Limpiar caché
npm cache clean --force

# Eliminar node_modules
Remove-Item -Recurse -Force node_modules
Remove-Item package-lock.json

# Reinstalar
npm install
```

## Problemas de Conexión

### ❌ "Cannot GET /" en el navegador

**Problema:** El frontend no está corriendo o puerto incorrecto.

**Solución:**
1. Verifica que el frontend esté corriendo: `cd frontend && npm run dev`
2. Usa el puerto correcto: `http://localhost:3000` (no 3001)

### ❌ "Connection refused" en Socket.io

**Problema:** El backend no está corriendo.

**Solución:**
1. Abre una terminal separada
2. `cd backend && npm run dev`
3. Verifica que veas: "🎄 Servidor Secret Santa Clue corriendo en puerto 3001"
4. Recarga la página del frontend

### ❌ Los dispositivos móviles no se conectan

**Problema:** No están en la misma red o IP incorrecta.

**Solución:**
1. Verifica que todos estén en la misma WiFi
2. Obtén tu IP: `ipconfig` → Busca IPv4
3. Usa: `http://TU-IP:3000` (no localhost)
4. Desactiva temporalmente el firewall si persiste

### ❌ "ERR_CONNECTION_REFUSED" en móviles

**Problema:** Firewall bloqueando conexiones.

**Solución en Windows:**
```powershell
# Ejecutar como Administrador
New-NetFirewallRule -DisplayName "Secret Santa Dev" -Direction Inbound -LocalPort 3000,3001 -Protocol TCP -Action Allow
```

O manualmente:
1. Panel de Control → Sistema y Seguridad → Firewall de Windows
2. Configuración avanzada → Reglas de entrada
3. Nueva regla → Puerto → TCP → 3000, 3001
4. Permitir la conexión

## Problemas Durante el Juego

### ❌ No se ve la imagen del tablero

**Problema:** Imagen no está en la ubicación correcta.

**Solución:**
1. Verifica que `tablero.jpg` esté en `frontend/public/`
2. El nombre debe ser exactamente `tablero.jpg` (minúsculas)
3. Recarga con Ctrl+F5 (forzar recarga)

### ❌ Las fichas no se mueven

**Problema:** Drag and drop no funciona.

**Solución:**
1. Usa un navegador moderno (Chrome, Edge, Firefox)
2. Verifica que no haya errores en consola (F12)
3. Recarga la página
4. Intenta con otro dispositivo

### ❌ Un jugador se desconectó

**Problema:** Perdió conexión WiFi o cerró la página.

**Solución:**
1. Que recargue la página: `http://TU-IP:3000`
2. Ingrese el mismo código de partida
3. Seleccione el MISMO jugador
4. Continúa donde quedó

### ❌ El sobre no se creó

**Problema:** No se completaron todos los campos.

**Solución:**
1. Verifica que seleccionaste:
   - Amigo Secreto
   - Envoltorio
   - Cinta
2. Haz clic en "Confirmar Sobre"
3. Espera la confirmación

### ❌ No recibo notificaciones de sospecha

**Problema:** Socket.io desconectado.

**Solución:**
1. Verifica que el backend esté corriendo
2. Recarga la página del jugador
3. Vuelve a unirte al juego
4. Revisa consola (F12) por errores

## Problemas de Rendimiento

### ❌ El juego va lento

**Solución:**
1. Cierra otras aplicaciones pesadas
2. Usa conexión WiFi 5GHz si es posible
3. Acerca los dispositivos al router
4. Reduce la calidad de la imagen del tablero

### ❌ El navegador se congela

**Solución:**
1. Usa Chrome o Edge (mejor rendimiento)
2. Cierra pestañas innecesarias
3. Actualiza el navegador a última versión
4. Reinicia el navegador

## Problemas de Lógica del Juego

### ❌ Recibí mi propio sobre

**Problema:** Bug en la distribución.

**Solución:**
- Esto NO debería pasar (hay validación)
- Si ocurre, reinicia el juego
- Reporta el bug (anota las circunstancias)

### ❌ Dos jugadores tienen el mismo sobre

**Problema:** Error en el reparto.

**Solución:**
- Reinicia el juego
- Asegúrate de que cada jugador seleccionó un personaje DIFERENTE

### ❌ No puedo hacer acusación

**Problema:** No es tu turno o ya acusaste.

**Solución:**
- Solo puedes acusar en tu turno
- Si ya fallaste una acusación, no puedes volver a acusar
- Pero sigues mostrando cartas a otros

## Comandos Útiles de Emergencia

### Reiniciar Backend
```powershell
# Ctrl+C en la terminal del backend, luego:
cd backend
npm run dev
```

### Reiniciar Frontend
```powershell
# Ctrl+C en la terminal del frontend, luego:
cd frontend
npm run dev
```

### Limpiar Todo y Empezar de Nuevo
```powershell
# En la raíz del proyecto
cd frontend
Remove-Item -Recurse -Force node_modules
npm install

cd ../backend
Remove-Item -Recurse -Force node_modules
npm install
```

### Ver Logs del Servidor
```powershell
# En la terminal del backend, verás:
# - Conexiones de clientes
# - Eventos del juego
# - Errores si los hay
```

## Verificación Pre-Evento

Lista de verificación 30 minutos antes:

```powershell
# 1. Verificar Node.js
node --version
# Debe mostrar v18.x.x o superior

# 2. Verificar instalación Frontend
cd frontend
npm list --depth=0
# Debe mostrar todas las dependencias

# 3. Verificar instalación Backend
cd ../backend
npm list --depth=0
# Debe mostrar todas las dependencias

# 4. Probar Backend
npm run dev
# Debe mostrar: "🎄 Servidor Secret Santa Clue corriendo en puerto 3001"

# 5. Probar Frontend (nueva terminal)
cd ../frontend
npm run dev
# Debe abrir en http://localhost:3000

# 6. Probar conexión móvil
ipconfig
# Usa la IP mostrada en IPv4
# Prueba desde móvil: http://TU-IP:3000
```

## Contacto de Soporte

Si nada funciona:

1. Revisa la consola del navegador (F12)
2. Revisa la terminal del backend (errores en rojo)
3. Anota el error exacto
4. Revisa este documento nuevamente
5. Como último recurso, reinicia la computadora

## Tips Finales

✅ **SIEMPRE** inicia el backend ANTES que el frontend
✅ Prueba ANTES del evento con 2-3 dispositivos
✅ Ten un plan B (juego manual con cartas físicas)
✅ Mantén las terminales visibles para ver errores
✅ Ten paciencia, es tecnología 😊

¡Buena suerte con tu evento! 🎄🎁
