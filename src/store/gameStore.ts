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
  nextRound: () => void
  endRound: () => void
  endGame: () => void
  playChord: () => void

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
      gamePhase: 'ready',
      currentRound: 0,

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
      answerTimeRemaining: 8,
      resultTimeRemaining: 10,

      // Config (constants)
      COUNTDOWN_DURATION: 3,
      LISTEN_DURATION: 2,
      ANSWER_DURATION: 8,
      RESULTS_DURATION: 10,

      // ---- Actions ---- //

      startGame: () => {
        set({
          gamePhase: 'ready',
          currentChord: null,
          correctAnswer: null,
          player1Answer: null,
          player2Answer: null,
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
      endRound: () => {
        // const { player1Answer, player2Answer, correctAnswer } = get()

        //TODO: add health dmamage function
        const newState = get()
        if (newState.player1Health <= 0 && newState.player2Health <= 0) {
          set({ gamePhase: 'gameOver' })
        } else {
          set({ gamePhase: 'results' })
        }
      },
      endGame: () => {
        set({ gamePhase: 'gameOver' })
      },
      playChord: () => {
        set({ gamePhase: 'listening' })
      },

      // Timing Actions
      updateCountdownTime: (time: number) => {
        set({ countdownTimeRemaining: time })
        if (time <= 0) {
          get().playChord()
        }
      },
      updateAnswerTime: (time: number) => {
        set({ answerTimeRemaining: time })
        if (time <= 0) {
          get().endRound()
        }
      },
      updateResultTime: (time: number) => {
        set({ resultTimeRemaining: time })
        if (time <= 0) {
          get().nextRound()
        }
      },

      // ChordActions
      getRandomQuality: () => {
        const { chordQualities, currentChord } = get()
        console.log('chordQualities', chordQualities)
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
