import './App.css'
import { GameBoard } from '@/components/game/GameBoard'
import { DevDashboard } from '@/components/DevDashboard'

function App() {
  return (
    <>
      <GameBoard />
      {import.meta.env.DEV && <DevDashboard />}
    </>
  )
}

export default App
