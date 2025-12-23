# 📍 Uso del Setup de Posiciones del Tablero

## ✅ Ya está configurado!

El archivo `setup-positions.json` que creaste **ya está siendo usado** por el juego automáticamente.

## 🎯 Cómo Funciona

### 1. Archivo de Posiciones
Tu archivo `setup-positions.json` contiene las coordenadas exactas donde colocaste cada ficha y el dado:

```json
{
  "tokens": {
    "Raffa": { "x": 70.27, "y": 46.98 },
    "Tato": { "x": 70.37, "y": 56.62 },
    "Fio": { "x": 70.27, "y": 68.36 },
    "Fay": { "x": 83.56, "y": 46.53 },
    "Papá": { "x": 83.46, "y": 56.55 },
    "Mamá": { "x": 83.78, "y": 68.23 }
  },
  "dice": { "x": 76.97, "y": 31.98 }
}
```

### 2. Integración Automática
El componente `Board.jsx` ahora:
- ✅ Importa automáticamente tu archivo de posiciones
- ✅ Coloca cada ficha en su posición inicial correcta
- ✅ Coloca el dado en la posición que configuraste
- ✅ Los jugadores pueden mover las fichas durante el juego

## 🎮 Cómo Verlo en Acción

### 1. Inicia el juego:

**Terminal 1 - Backend:**
```powershell
cd backend
npm run dev
```

**Terminal 2 - Frontend:**
```powershell
cd frontend
npm run dev
```

### 2. Crea una partida:
- Ve a `http://localhost:3000`
- Haz clic en "Crear Nueva Partida"
- Verás el tablero con las fichas en las posiciones exactas que configuraste

### 3. Durante el juego:
- Las fichas inician en las posiciones de tu archivo
- Los jugadores pueden arrastrarlas a otras posiciones
- El dado está donde lo colocaste

## 📝 Si Quieres Cambiar las Posiciones

### Opción 1: Editar el archivo manualmente
Edita `setup-positions.json` directamente con las nuevas coordenadas.

### Opción 2: Usar la página de Setup
1. Ve a `http://localhost:3000/setup`
2. Arrastra las fichas a nuevas posiciones
3. Haz clic en "Exportar Configuración"
4. Reemplaza el archivo `setup-positions.json` con el nuevo

## 🔄 Aplicar Cambios

Después de modificar `setup-positions.json`:
1. Guarda el archivo
2. Recarga la página del tablero (F5)
3. Las nuevas posiciones se aplicarán automáticamente

## 📍 Ubicación de los Archivos

```
Secret Santa Clue/
├── setup-positions.json        ← Tu archivo de posiciones
└── frontend/
    └── src/
        └── pages/
            └── Board.jsx       ← Lo usa automáticamente
```

## 🎯 Ventajas de Este Sistema

✅ **Posiciones exactas:** Las fichas aparecen donde las configuraste
✅ **Fácil de modificar:** Solo edita un archivo JSON
✅ **Versionable:** Puedes guardar diferentes configuraciones
✅ **Sin código:** No necesitas tocar el código para cambiar posiciones

## 🎨 Ejemplo: Cambiar Solo la Posición de Mamá

Edita `setup-positions.json`:
```json
{
  "tokens": {
    "Mamá": { "x": 50.0, "y": 50.0 },  ← Cambia estos valores
    "Papá": { "x": 83.46, "y": 56.55 },
    // ... resto sin cambios
  }
}
```

Guarda y recarga el navegador. ¡Listo!

## ⚠️ Notas Importantes

- Las coordenadas son porcentajes (0-100)
- `x`: Posición horizontal (0 = izquierda, 100 = derecha)
- `y`: Posición vertical (0 = arriba, 100 = abajo)
- Las fichas se posicionan relativo al tablero

## 🎉 ¡Ya Está Funcionando!

No necesitas hacer nada más. El archivo que exportaste desde la página de Setup ya está siendo usado por el juego. Cada vez que inicies una partida, las fichas aparecerán en esas posiciones.

**¡Tu setup está listo para el evento! 🎄🎁**
