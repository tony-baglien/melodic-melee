import { useGameLoop } from '@/hooks/useGameLoop'
import { useGameStore } from '@/store/gameStore'

import { HealthBar } from '@/components/player/HealthBar'
import { Container } from '@/components/ui/Container'
import { Button } from '@/components/ui/Button'
import { CountdownDisplay } from '@/components/game/CountdownDisplay';
import { AnswerDisplay } from '@/components/game/AnswerDisplay'
import { TimeBar } from '@/components/game/TimeBar'


export function GameBoard() {
  useGameLoop()
  const gamePhase = useGameStore((state) => state.gamePhase)
  const startRound = useGameStore((state) => state.startRound)
  const endRound = useGameStore((state) => state.endGame)
  const currentRound= useGameStore((state) => state.currentRound);

  const resultTimeRemaining = useGameStore((state) => state.resultTimeRemaining)

  const handleStartGame = () => {
    console.log("hello")
    startRound()
  }
  return (
    <div className="min-h-screen bg-tertiary">
      <div className="container mx-auto px-4 py-8">
        <header className="mb-8">
          <h1 className="text-4xl font-bold text-center text-text mb-2">Aural Battler</h1>
          <p className="text-center text-text">Current Round: {currentRound} </p>
        </header>
        {/* -- Health Bars -- */}
        <div className="grid grid-cols-1 items-center md:grid-cols-2 gap-8">
          <HealthBar player="player1" playerName="Player One" /> 
          <HealthBar player="player2" playerName="Player Two" />
        </div>

        <main>
          {(gamePhase === 'countdown' || gamePhase === 'answering' || gamePhase === 'results') && (
            <TimeBar />
          )}
          <Container variant="primary">
              {(gamePhase === 'ready' || gamePhase === 'gameOver') &&
                <Button onClick={handleStartGame} variant="primary" >Start Game</Button>
              }
              {gamePhase === 'countdown' && <CountdownDisplay />}
              {gamePhase === 'listening' && <div>This is playing</div>}
              {gamePhase === 'answering' && <AnswerDisplay />}
              {gamePhase === 'results' && (
                <div>
                  Here are the results{' '}
                  {resultTimeRemaining < 5 && <span>{resultTimeRemaining}</span>}
                </div>
              )}

          </Container>


              {gamePhase !== 'ready' && gamePhase !== 'gameOver' && (
                <button className="border-solid border-2" onClick={endRound}>
                  End this maddness
                </button>
              )}
              </main>
          </div>
      </div>
  )
}
