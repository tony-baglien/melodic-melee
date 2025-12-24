import './App.css'
import { useGameLoop } from '@/hooks/useGameLoop'
import { useGameStore } from '@/store/gameStore'

function App() {
  useGameLoop()
  const gamePhase = useGameStore((state) => state.gamePhase)
  const startRound = useGameStore((state) => state.startRound)
  const endRound = useGameStore((state) => state.endGame)
  const countdownTimeRemaining = useGameStore(
    (state) => state.countdownTimeRemaining
  )
  const answerTimeRemaining = useGameStore((state) => state.answerTimeRemaining)
  const resultTimeRemaining = useGameStore((state) => state.resultTimeRemaining)
  return (
    <>
      {gamePhase === 'ready' && <button onClick={startRound}>Start</button>}
      {gamePhase === 'countdown' && (
        <div>
          Get Ready<span>{countdownTimeRemaining}</span>
        </div>
      )}
      {gamePhase === 'listening' && <div>This is playing</div>}
      {gamePhase === 'answering' && (
        <div>
          Answer now! <span>{answerTimeRemaining}</span>
        </div>
      )}
      {gamePhase === 'results' && (
        <div>
          Here are the results{' '}
          {resultTimeRemaining < 5 && <span>{resultTimeRemaining}</span>}
        </div>
      )}
      {gamePhase === 'gameOver' && <button onClick={startRound}>Start</button>}

      {gamePhase !== 'ready' && gamePhase !== 'gameOver' && (
        <button className="border-solid border-2" onClick={endRound}>
          End this maddness
        </button>
      )}
    </>
  )
}

export default App
