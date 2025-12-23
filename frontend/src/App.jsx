import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Board from './pages/Board'
import Player from './pages/Player'
import CardCreator from './pages/CardCreator'
import Setup from './pages/Setup'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/setup" element={<Setup />} />
        <Route path="/board/:gameCode" element={<Board />} />
        <Route path="/player/:gameCode" element={<Player />} />
        <Route path="/card-creator" element={<CardCreator />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
