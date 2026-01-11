import { useGameLoop } from '@/hooks/useGameLoop'
import { useGameStore } from '@/store/gameStore'

import { HealthBar } from '@/components/player/HealthBar'
import { Container } from '@/components/ui/Container'
import { Button } from '@/components/ui/Button'
import { CountdownDisplay } from '@/components/game/CountdownDisplay';
import { AnswerDisplay } from '@/components/game/AnswerDisplay'
import { TimeBar } from '@/components/game/TimeBar'
import { ResultsDisplay } from './ResultsDisplay'


export function GameBoard() {
  useGameLoop()
  const gamePhase = useGameStore((state) => state.gamePhase)
  const startRound = useGameStore((state) => state.startRound)
  const resetRound = useGameStore((state) => state.resetRound)
  const endRound = useGameStore((state) => state.endGame)
  const currentRound= useGameStore((state) => state.currentRound);

  const handleStartRound = () => {
    startRound()
  }
  const handleResetRound = () => {
    resetRound();
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
          <TimeBar />
          <Container variant="primary">
              {(gamePhase === 'ready') &&
                <Button onClick={handleStartRound} variant="primary" >Start Game</Button>
              }
              {gamePhase === 'countdown' && <CountdownDisplay />}
              {gamePhase === 'listening' && <div>This is playing</div>}
              {gamePhase === 'answering' && <AnswerDisplay />}
              {gamePhase === 'results' && <ResultsDisplay /> }
              {gamePhase == 'gameOver' && (
                <div>
                  <Button variant="primary" onClick={handleResetRound}>Next Round?</Button>
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
