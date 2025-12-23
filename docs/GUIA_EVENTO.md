# 🎄 Guía del Día del Evento - Secret Santa Clue 🎁

## ✅ Checklist Pre-Evento (1-2 días antes)

- [ ] Instalar todas las dependencias (`npm install` en frontend y backend)
- [ ] Verificar que la imagen del tablero esté en `frontend/public/tablero.jpg`
- [ ] Probar el juego completo con al menos 2 dispositivos
- [ ] Verificar la conexión WiFi del lugar del evento
- [ ] Tener regalos físicos envueltos (sin cintas visibles aún)
- [ ] Imprimir o tener las cintas físicas reales preparadas

## 📋 Preparación del Día

### 1. Configuración Técnica (30 min antes)

#### Servidor Principal (Computadora/Laptop)

```powershell
# Terminal 1 - Backend
cd backend
npm run dev

# Terminal 2 - Frontend  
cd frontend
npm run dev
```

#### Obtener IP Local
```powershell
ipconfig
```
Busca tu IPv4 (ejemplo: 192.168.1.10)

#### Conectar Otros Dispositivos
Los demás dispositivos deben acceder a:
```
http://TU-IP:3000
```
(Reemplaza TU-IP con tu IPv4)

### 2. Preparación Física del Juego

#### Materiales Necesarios:
- [ ] 6 Regalos envueltos (identificables por color de papel)
- [ ] 6 Cintas reales (colores: Roja, Verde, Azul, Dorada, Plateada, Blanca)
- [ ] Pantalla grande para el tablero (TV/Proyector)
- [ ] 6 Dispositivos móviles (uno por jugador)
- [ ] WiFi estable

#### Setup del Tablero Físico:
1. Conecta la pantalla grande al servidor principal
2. Abre el navegador en modo pantalla completa (F11)
3. Ve a la página del tablero del juego

## 🎮 Flujo del Evento

### Fase 1: Inicio (5-10 min)

1. **Crear Partida**
   - En el servidor principal, haz clic en "Crear Nueva Partida"
   - Aparecerá un código de 6 caracteres (ej: ABC123)

2. **Compartir Código**
   - Dicta el código a todos los jugadores
   - Muéstralo en pantalla grande

3. **Unión de Jugadores**
   - Cada jugador en su móvil:
     * Accede a `http://TU-IP:3000`
     * Ingresa el código
     * Selecciona su personaje

### Fase 2: Armado de Sobres (10-15 min)

**IMPORTANTE: Esta fase es SECRETA**

1. Cada jugador en su móvil verá:
   - Selector de Amigo Secreto
   - Selector de Envoltorio (color del papel)
   - Selector de Cinta

2. Indicaciones a dar:
   - "Seleccionen QUIÉN es su Amigo Secreto"
   - "Seleccionen el COLOR del papel con el que envolvieron el regalo"
   - "Seleccionen el COLOR de la cinta que pondrán"

3. Cuando todos confirmen:
   - Los sobres se reparten automáticamente
   - NADIE recibe su propio sobre
   - El juego comienza

### Fase 3: Juego Principal (30-60 min)

#### Mecánica:
1. **Turnos**
   - Se muestra en pantalla quién tiene el turno
   - Esa persona lanza el dado (clic en el dado en pantalla)
   - Mueve su ficha manualmente arrastrándola

2. **Hacer Sospecha**
   - El jugador dice en VOZ ALTA su sospecha:
     * "Sugiero que MI amigo secreto es [PERSONA]"
     * "El envoltorio es [COLOR]"
     * "La cinta es [COLOR]"

3. **Responder Sospechas**
   - Los demás jugadores, por ORDEN (izquierda del sospechoso):
     * Reciben notificación en su móvil
     * Eligen: "Armar Sospecha" u "Ocultar Verdad"
     * Muestran 3 cartas al sospechoso

4. **Interpretación**
   - Si ven una carta de DATOS → Esa opción es FALSA
   - Si ven 3 INCÓGNITAS → Sin información
   - Anotar en papel las deducciones

### Fase 4: Acusación y Revelación

#### Cuando alguien crea saber su solución:

1. **Hacer Acusación**
   - El jugador dice: "¡Hago mi acusación!"
   - Anuncia las 3 cartas en voz alta

2. **Verificación**
   - El sistema verifica automáticamente
   - Se revela el sobre en pantalla

3. **Si ACIERTA:**
   - Se muestra el sobre completo
   - Se identifica el regalo por el color del papel
   - El REMITENTE saca la cinta real de su bolsillo
   - La coloca en el regalo frente a todos
   - ¡Abre el regalo! 🎁

4. **Si FALLA:**
   - Sigue jugando pero ya no puede ganar
   - Debe seguir mostrando cartas a otros

## 🎯 Consejos para el Host

### Durante el Juego:
- Mantén la pantalla del tablero visible todo el tiempo
- Ayuda con la tecnología si alguien se desconecta
- Recuerda a los jugadores usar sus hojas de notas
- Mantén el ritmo, evita pausas largas

### Resolución de Problemas:

**Jugador se desconecta:**
- Que recargue la página
- Vuelve a unirse con el mismo código
- Selecciona el mismo personaje

**Backend se cae:**
- Reinicia el servidor
- El juego se perderá, hay que empezar nuevo

**No pueden conectarse:**
- Verifica que estén en la misma red WiFi
- Confirma la IP con `ipconfig`
- Verifica que no haya firewall bloqueando

## 🎁 Reglas Importantes a Recordar

1. **Para Sospechar:**
   - DEBES ir a la habitación del sospechoso
   - Ejemplo: Para sospechar de "Mamá", ve a su habitación

2. **Cartas Únicas:**
   - Solo hay 1 carta de cada elemento en todo el juego
   - Si alguien te muestra "Cinta Azul", NO es tu cinta

3. **Estrategia de Deducción:**
   - Si NADIE te muestra una carta después de preguntar a TODOS
   - Esa carta probablemente está en TU sobre

4. **Secreto del Remitente:**
   - Las cintas NO deben estar en los regalos al inicio
   - Solo se colocan cuando alguien adivina correctamente

## 📱 Enlaces Útiles Durante el Evento

- **Tablero Principal:** `http://localhost:3000/board/CODIGO`
- **Jugadores:** `http://TU-IP:3000/player/CODIGO`
- **Crear Cartas:** `http://localhost:3000/card-creator` (por si acaso)

## 🎄 ¡Disfruten el Juego!

Recuerda: Lo importante es pasar un buen rato en familia. No te preocupes por las reglas perfectas, adáptalas si es necesario.

**¡Felices Fiestas! 🎅🎁**
