import { useState } from 'react'
import { useGameStore } from '@/store/gameStore'
import type { GamePhase } from '@/store/gameStore'
import type { ChordQuality } from '@/constants/chords'
import { CHORD_QUALITIES } from '@/constants/chords'

export function DevDashboard() {
  const [isOpen, setIsOpen] = useState(false)

  // Game State
  const gamePhase = useGameStore((state) => state.gamePhase)
  const currentRound = useGameStore((state) => state.currentRound)
  const player1Health = useGameStore((state) => state.player1Health)
  const player2Health = useGameStore((state) => state.player2Health)
  const currentChord = useGameStore((state) => state.currentChord)
  const correctAnswer = useGameStore((state) => state.correctAnswer)
  const player1Answer = useGameStore((state) => state.player1Answer)
  const player2Answer = useGameStore((state) => state.player2Answer)
  const isDevMode = useGameStore((state) => state.isDevMode)

  // Timing
  const countdownTimeRemaining = useGameStore(
    (state) => state.countdownTimeRemaining
  )
  const answerTimeRemaining = useGameStore((state) => state.answerTimeRemaining)
  const resultTimeRemaining = useGameStore((state) => state.resultTimeRemaining)

  // Config
  const COUNTDOWN_DURATION = useGameStore((state) => state.COUNTDOWN_DURATION)
  const LISTEN_DURATION = useGameStore((state) => state.LISTEN_DURATION)
  const ANSWER_DURATION = useGameStore((state) => state.ANSWER_DURATION)
  const RESULTS_DURATION = useGameStore((state) => state.RESULTS_DURATION)

  if (!isOpen) {
    return (
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-4 right-4 bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg shadow-lg font-mono text-sm z-50"
      >
        🛠️ Dev Dashboard
      </button>
    )
  }

  return (
    <div className="fixed bottom-4 right-4 bg-gray-900 text-white p-6 rounded-lg shadow-2xl max-h-[90vh] overflow-y-auto z-50 w-[400px] font-mono text-xs border-2 border-purple-500">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-bold text-purple-400">Dev Dashboard</h2>
        <button
          onClick={() => setIsOpen(false)}
          className="text-gray-400 hover:text-white text-xl"
        >
          ×
        </button>
      </div>

      {/* Dev Mode Toggle */}
      <div className="mb-6 p-3 bg-gray-800 rounded">
        <label className="flex items-center justify-between cursor-pointer">
          <span className="font-semibold text-yellow-400">Dev Mode</span>
          <input
            type="checkbox"
            checked={isDevMode}
            onChange={(e) =>
              useGameStore.setState({ isDevMode: e.target.checked })
            }
            className="w-5 h-5"
          />
        </label>
        <p className="text-gray-400 text-xs mt-1">
          Prevents auto-phase transitions
        </p>
      </div>

      {/* Game Phase Control */}
      <div className="mb-6">
        <h3 className="font-semibold mb-2 text-purple-300">Game Phase</h3>
        <div className="p-3 bg-gray-800 rounded mb-2">
          <span className="text-green-400">Current: {gamePhase}</span>
        </div>
        <div className="grid grid-cols-2 gap-2">
          {(
            [
              'ready',
              'countdown',
              'listening',
              'answering',
              'results',
              'gameOver',
            ] as GamePhase[]
          ).map((phase) => (
            <button
              key={phase}
              onClick={() => useGameStore.setState({ gamePhase: phase })}
              className={`px-3 py-2 rounded ${
                gamePhase === phase
                  ? 'bg-purple-600 text-white'
                  : 'bg-gray-700 hover:bg-gray-600'
              }`}
            >
              {phase}
            </button>
          ))}
        </div>
      </div>

      {/* Round Control */}
      <div className="mb-6">
        <h3 className="font-semibold mb-2 text-purple-300">Round</h3>
        <div className="flex items-center gap-2">
          <button
            onClick={() =>
              useGameStore.setState({
                currentRound: Math.max(0, currentRound - 1),
              })
            }
            className="bg-gray-700 hover:bg-gray-600 px-3 py-2 rounded"
          >
            -
          </button>
          <input
            type="number"
            value={currentRound}
            onChange={(e) =>
              useGameStore.setState({
                currentRound: parseInt(e.target.value) || 0,
              })
            }
            className="bg-gray-800 text-white px-3 py-2 rounded flex-1 text-center"
          />
          <button
            onClick={() =>
              useGameStore.setState({ currentRound: currentRound + 1 })
            }
            className="bg-gray-700 hover:bg-gray-600 px-3 py-2 rounded"
          >
            +
          </button>
        </div>
      </div>

      {/* Player Health */}
      <div className="mb-6">
        <h3 className="font-semibold mb-2 text-purple-300">Player Health</h3>

        <div className="mb-3">
          <label className="block text-xs text-gray-400 mb-1">Player 1</label>
          <input
            type="range"
            min="0"
            max="100"
            value={player1Health}
            onChange={(e) =>
              useGameStore.setState({ player1Health: parseInt(e.target.value) })
            }
            className="w-full"
          />
          <div className="flex justify-between items-center mt-1">
            <span className="text-green-400">{player1Health} HP</span>
            <input
              type="number"
              value={player1Health}
              onChange={(e) =>
                useGameStore.setState({
                  player1Health: parseInt(e.target.value) || 0,
                })
              }
              className="bg-gray-800 text-white px-2 py-1 rounded w-16 text-center"
            />
          </div>
        </div>

        <div>
          <label className="block text-xs text-gray-400 mb-1">Player 2</label>
          <input
            type="range"
            min="0"
            max="100"
            value={player2Health}
            onChange={(e) =>
              useGameStore.setState({ player2Health: parseInt(e.target.value) })
            }
            className="w-full"
          />
          <div className="flex justify-between items-center mt-1">
            <span className="text-green-400">{player2Health} HP</span>
            <input
              type="number"
              value={player2Health}
              onChange={(e) =>
                useGameStore.setState({
                  player2Health: parseInt(e.target.value) || 0,
                })
              }
              className="bg-gray-800 text-white px-2 py-1 rounded w-16 text-center"
            />
          </div>
        </div>
      </div>

      {/* Chord Control */}
      <div className="mb-6">
        <h3 className="font-semibold mb-2 text-purple-300">Chords</h3>
        <div className="space-y-2">
          <div>
            <label className="block text-xs text-gray-400 mb-1">
              Current Chord
            </label>
            <select
              value={currentChord || ''}
              onChange={(e) =>
                useGameStore.setState({
                  currentChord: (e.target.value as ChordQuality) || null,
                })
              }
              className="bg-gray-800 text-white px-3 py-2 rounded w-full"
            >
              <option value="">None</option>
              {CHORD_QUALITIES.map((chord) => (
                <option key={chord} value={chord}>
                  {chord}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-xs text-gray-400 mb-1">
              Correct Answer
            </label>
            <select
              value={correctAnswer || ''}
              onChange={(e) =>
                useGameStore.setState({
                  correctAnswer: (e.target.value as ChordQuality) || null,
                })
              }
              className="bg-gray-800 text-white px-3 py-2 rounded w-full"
            >
              <option value="">None</option>
              {CHORD_QUALITIES.map((chord) => (
                <option key={chord} value={chord}>
                  {chord}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-xs text-gray-400 mb-1">
              Player 1 Answer
            </label>
            <select
              value={player1Answer || ''}
              onChange={(e) =>
                useGameStore.setState({
                  player1Answer: (e.target.value as ChordQuality) || null,
                })
              }
              className="bg-gray-800 text-white px-3 py-2 rounded w-full"
            >
              <option value="">None</option>
              {CHORD_QUALITIES.map((chord) => (
                <option key={chord} value={chord}>
                  {chord}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-xs text-gray-400 mb-1">
              Player 2 Answer
            </label>
            <select
              value={player2Answer || ''}
              onChange={(e) =>
                useGameStore.setState({
                  player2Answer: (e.target.value as ChordQuality) || null,
                })
              }
              className="bg-gray-800 text-white px-3 py-2 rounded w-full"
            >
              <option value="">None</option>
              {CHORD_QUALITIES.map((chord) => (
                <option key={chord} value={chord}>
                  {chord}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Timing Controls */}
      <div className="mb-6">
        <h3 className="font-semibold mb-2 text-purple-300">Timers (seconds)</h3>
        <div className="space-y-2">
          <div>
            <label className="block text-xs text-gray-400 mb-1">
              Countdown Time
            </label>
            <input
              type="number"
              value={countdownTimeRemaining}
              onChange={(e) =>
                useGameStore
                  .getState()
                  .updateCountdownTime(parseInt(e.target.value) || 0)
              }
              className="bg-gray-800 text-white px-3 py-2 rounded w-full"
            />
          </div>

          <div>
            <label className="block text-xs text-gray-400 mb-1">
              Answer Time
            </label>
            <input
              type="number"
              value={answerTimeRemaining}
              onChange={(e) =>
                useGameStore
                  .getState()
                  .updateAnswerTime(parseInt(e.target.value) || 0)
              }
              className="bg-gray-800 text-white px-3 py-2 rounded w-full"
            />
          </div>

          <div>
            <label className="block text-xs text-gray-400 mb-1">
              Result Time
            </label>
            <input
              type="number"
              value={resultTimeRemaining}
              onChange={(e) =>
                useGameStore
                  .getState()
                  .updateResultTime(parseInt(e.target.value) || 0)
              }
              className="bg-gray-800 text-white px-3 py-2 rounded w-full"
            />
          </div>
        </div>
      </div>

      {/* Duration Config */}
      <div className="mb-6">
        <h3 className="font-semibold mb-2 text-purple-300">
          Phase Durations (config)
        </h3>
        <div className="space-y-2">
          <div>
            <label className="block text-xs text-gray-400 mb-1">
              Countdown Duration
            </label>
            <input
              type="number"
              value={COUNTDOWN_DURATION}
              onChange={(e) =>
                useGameStore.setState({
                  COUNTDOWN_DURATION: parseInt(e.target.value) || 1,
                })
              }
              className="bg-gray-800 text-white px-3 py-2 rounded w-full"
            />
          </div>

          <div>
            <label className="block text-xs text-gray-400 mb-1">
              Listen Duration
            </label>
            <input
              type="number"
              value={LISTEN_DURATION}
              onChange={(e) =>
                useGameStore.setState({
                  LISTEN_DURATION: parseInt(e.target.value) || 1,
                })
              }
              className="bg-gray-800 text-white px-3 py-2 rounded w-full"
            />
          </div>

          <div>
            <label className="block text-xs text-gray-400 mb-1">
              Answer Duration
            </label>
            <input
              type="number"
              value={ANSWER_DURATION}
              onChange={(e) =>
                useGameStore.setState({
                  ANSWER_DURATION: parseInt(e.target.value) || 1,
                })
              }
              className="bg-gray-800 text-white px-3 py-2 rounded w-full"
            />
          </div>

          <div>
            <label className="block text-xs text-gray-400 mb-1">
              Results Duration
            </label>
            <input
              type="number"
              value={RESULTS_DURATION}
              onChange={(e) =>
                useGameStore.setState({
                  RESULTS_DURATION: parseInt(e.target.value) || 1,
                })
              }
              className="bg-gray-800 text-white px-3 py-2 rounded w-full"
            />
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="mb-4">
        <h3 className="font-semibold mb-2 text-purple-300">Actions</h3>
        <div className="grid grid-cols-2 gap-2">
          <button
            onClick={() => useGameStore.getState().startGame()}
            className="bg-green-600 hover:bg-green-700 px-3 py-2 rounded"
          >
            Start Game
          </button>
          <button
            onClick={() => useGameStore.getState().startRound()}
            className="bg-blue-600 hover:bg-blue-700 px-3 py-2 rounded"
          >
            Start Round
          </button>
          <button
            onClick={() => useGameStore.getState().nextRound()}
            className="bg-blue-600 hover:bg-blue-700 px-3 py-2 rounded"
          >
            Next Round
          </button>
          <button
            onClick={() => useGameStore.getState().endRound()}
            className="bg-orange-600 hover:bg-orange-700 px-3 py-2 rounded"
          >
            End Round
          </button>
          <button
            onClick={() => useGameStore.getState().resetRound()}
            className="bg-yellow-600 hover:bg-yellow-700 px-3 py-2 rounded"
          >
            Reset Round
          </button>
          <button
            onClick={() => useGameStore.getState().endGame()}
            className="bg-red-600 hover:bg-red-700 px-3 py-2 rounded"
          >
            End Game
          </button>
        </div>
      </div>
    </div>
  )
}
