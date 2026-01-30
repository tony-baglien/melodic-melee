import { create } from 'zustand'
import { devtools } from 'zustand/middleware'
import type { ChordQuality } from '@/constants/chords'
import { CHORD_QUALITIES } from '@/constants/chords'

export type GamePhase =
  | 'ready'
  | 'countdown'
  | 'listening'
  | 'answering'
  | 'results'
  | 'gameOver'

export type GameStore = {
  // Game Flow
  gamePhase: GamePhase
  currentRound: number
  isRunning: boolean;

  // Chords
  chordQualities: ChordQuality
  currentChord: ChordQuality | null
  correctAnswer: ChordQuality | null

  //Players
  player1Health: number
  player2Health: number
  player1Answer: ChordQuality | null
  player2Answer: ChordQuality | null

  // Timing
  countdownTimeRemaining: number
  answerTimeRemaining: number
  resultTimeRemaining: number


  // Dev Mode
  isDevMode?: boolean

  // Config (constants)
  COUNTDOWN_DURATION: number
  LISTEN_DURATION: number
  ANSWER_DURATION: number
  RESULTS_DURATION: number

  // Actions

  // Game Flow
  startGame: () => void
  startRound: () => void
  startAnswering: () => void
  resetRound: () => void
  nextRound: () => void
  endRound: () => void
  endGame: () => void
  playChord: () => void

  // Player Actions
  selectAnswer: (answer: ChordQuality) => void
  damagePlayer: (playerNumber: 1 | 2, amount: number) => void


  // Timing actions
  updateCountdownTime: (time: number) => void
  updateAnswerTime: (time: number) => void
  updateResultTime: (time: number) => void

  // Chord Actions
  getRandomQuality: () => ChordQuality
}

export const useGameStore = create<GameStore>()(
  devtools(
    (set, get) => ({
      // Game Flow
      gamePhase: 'countdown',
      currentRound: 0,
      isRunning: false,

      // Chords
      chordQualities: CHORD_QUALITIES,
      currentChord: null,
      correctAnser: null,

      // Players
      player1Health: 100,
      player2Health: 100,
      player1Answer: null,
      player2Answer: null,

      // Timing
      countdownTimeRemaining: 3,
      answerTimeRemaining: 3,
      resultTimeRemaining: 10,


      // Dev
      isDevMode: false,

      // Config (constants)
      COUNTDOWN_DURATION: 3,
      LISTEN_DURATION: 2,
      ANSWER_DURATION: 3,
      RESULTS_DURATION: 3,

      // ---- Actions ---- //

      startGame: () => {
        set({
          gamePhase: 'ready',
          currentChord: null,
          correctAnswer: null,
          player1Answer: null,
          player2Answer: null,
          player1Health: 100,
          player2Health: 100,
        })
      },
      startRound: () => {
        const newChord = get().getRandomQuality()
        set({
          gamePhase: 'countdown',
          currentChord: newChord,
          correctAnswer: newChord,
          player1Answer: null,
          player2Answer: null,
          countdownTimeRemaining: get().COUNTDOWN_DURATION,
        })
      },
      nextRound: () => {
        const newRound = get().currentRound + 1
        set({ currentRound: newRound })
        get().startRound()
      },
      startAnswering: () => {
        set({
          gamePhase: 'answering',
          answerTimeRemaining: get().ANSWER_DURATION,
        })
      },
      resetRound: () => {
        set({
          gamePhase: 'ready',
          player1Health: 100,
          player2Health: 100
        })
      },
      endRound: () => {
        const { player1Answer, player2Answer, correctAnswer } = get()

        // Compare answers and determine winner
        const player1Correct = player1Answer === correctAnswer
        const player2Correct = player2Answer === correctAnswer

        if (player1Correct && player2Correct) {
          // Both players answered correctly - no damage
        } else if (player1Correct) {
          get().damagePlayer(2, 25)
        } else if (player2Correct) {
          get().damagePlayer(1, 25)
        } else {
          get().damagePlayer(1, 10)
          get().damagePlayer(2, 10)
        }

        const updatedState = get()
        if (updatedState.player1Health <= 0 || updatedState.player2Health <= 0) {
          set({ gamePhase: 'gameOver' })
        } else {
          set({ gamePhase: 'results' })
          set({ resultTimeRemaining: get().RESULTS_DURATION })
        }
      },
      endGame: () => {
        set({ gamePhase: 'gameOver'})

      },
      playChord: () => {
        set({ gamePhase: 'listening' })
      },

      // Player Actions
      selectAnswer: (answer: ChordQuality) => {
        const state = get()
        if (state.gamePhase !== 'answering') return
        if (state.player1Answer) return // Return if already answered;

        set({ player1Answer: answer })

        // AI logic for player 2
        const correctAnswer = get().correctAnswer
        const random = Math.random()
        let aiAnswer: ChordQuality

        if (random < 0.5) {
          aiAnswer = correctAnswer!
        } else {
          aiAnswer = get().getRandomQuality()
        }

        set({ player2Answer: aiAnswer })

        const updatedState = get()
        if (updatedState.player1Answer && updatedState.player2Answer) {
          get().endRound()
        }
      },
      damagePlayer(playerNumber: 1 | 2, amount: number) {
        if (playerNumber == 1){
          const newHealth = get().player1Health - amount;
          set({player1Health: newHealth})
          console.log(get().player1Health)
        } else if (playerNumber == 2){
          const newHealth = get().player2Health - amount;
          set({player2Health: newHealth})
          console.log(get().player2Answer)
        }
      },
      // Timing Actions
      updateCountdownTime: (time: number) => {
        set({ countdownTimeRemaining: time })
        if (time <= 0 && !get().isDevMode) {
          get().playChord()
        }
      },
      updateAnswerTime: (time: number) => {
        set({ answerTimeRemaining: time })
        if (time <= 0 && !get().isDevMode) {
          get().endRound()
        }
      },
      updateResultTime: (time: number) => {
        set({ resultTimeRemaining: time })
        if (time <= 0 && !get().isDevMode) {
          get().nextRound()
        }
      },

      // ChordActions
      getRandomQuality: () => {
        const { chordQualities, currentChord } = get()
        let available = CHORD_QUALITIES
        if (currentChord && chordQualities.length > 1) {
          available = CHORD_QUALITIES.filter((c) => c !== currentChord)
        }
        const randomIndex = Math.floor(Math.random() * available.length)
        return available[randomIndex]
      },
    }),
    { name: 'GameStore' }
  )
)
