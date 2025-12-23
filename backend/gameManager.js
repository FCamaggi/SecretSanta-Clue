export class GameManager {
  constructor() {
    this.games = new Map()
  }

  createGame(gameCode) {
    const game = {
      code: gameCode,
      phase: 'waiting', // waiting, setup, distributing, playing, finished
      players: [],
      envelopes: [],
      currentTurn: null,
      lastSuspicion: null,
      winners: [],
      createdAt: new Date()
    }
    
    this.games.set(gameCode, game)
    return game
  }

  getGame(gameCode) {
    return this.games.get(gameCode)
  }

  updateGame(gameCode, gameData) {
    this.games.set(gameCode, gameData)
    return gameData
  }

  deleteGame(gameCode) {
    return this.games.delete(gameCode)
  }

  getAllGames() {
    return Array.from(this.games.values())
  }

  // Limpiar juegos antiguos (más de 24 horas)
  cleanOldGames() {
    const now = new Date()
    const oneDayAgo = new Date(now - 24 * 60 * 60 * 1000)
    
    for (const [code, game] of this.games.entries()) {
      if (game.createdAt < oneDayAgo) {
        this.games.delete(code)
        console.log(`Juego ${code} eliminado por antigüedad`)
      }
    }
  }
}
