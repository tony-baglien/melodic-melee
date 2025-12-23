import './App.css'
import { useGameLoop } from '@/hooks/useGameLoop'
import { useGameStore } from '@/store/gameStore'

function App() {
  useGameLoop()
  const startRound = useGameStore((state) => state.startRound)
  const gamePhase = useGameStore((state) => state.gamePhase)
  return (
    <>
      <button onClick={startRound}>Start</button>
      {gamePhase === 'listening' && <div>This is playing</div>}
    </>
  )
}

export default App
