import { create } from 'zustand'
import { devtools } from 'zustand/middleware'
import type { ChordQuality } from '@/constants/chords'
import { CHORD_QUALITIES } from '@/constants/chords'

export type GameStore = {
  // round
  gamePhase: 'ready' | 'countdown' | 'listening' | 'answering' | 'gameOver'
  currentRound: number

  // Chord
  chordQualities: ChordQuality
  currentChord: ChordQuality | null
  correctAnswer: ChordQuality | null

  //Player Answers
  player1Answer: ChordQuality | null
  player2Answer: ChordQuality | null

  // Timing
  countdownTime: number
  answerTimeRemaining: number

  // Durations
  COUNTDOWN_DURATION: number
  LISTEN_DURATION: number
  ANSWER_DURATION: number
  RESULTS_DURATION: number

  // Actions
  playChord: () => void
  startRound: () => void
  startGame: () => void
  endRound: () => void
  incrementRound: () => void
  getRandomQuality: () => ChordQuality
  updateCountdownTime: (time: number) => void
  updateAnswerTime: (time: number) => void
}

export const useGameStore = create<GameStore>()(
  devtools(
    (set, get) => ({
      currentRound: 1,
      chordQualiities: CHORD_QUALITIES,
      currentChord: null,

      countdownTime: 3,
      answerTimeReamining: 15,

      COUNTDOWN_DURATION: 3,
      LISTEN_DURATION: 2,
      ANSWER_DURATION: 15,
      RESULTS_DURATION: 10,
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
          countdownTime: get().COUNTDOWN_DURATION,
        })
      },
      incrememntRound: () =>
        set((state) => ({ currentRound: state.currentRound + 1 })),
      getRandomQuality: () => {
        const { chordQualities, currentChord } = get()
        let available = CHORD_QUALITIES
        if (currentChord && chordQualities.length > 1) {
          available = CHORD_QUALITIES.filter((c) => c !== currentChord)
        }
        const randomIndex = Math.floor(Math.random() * available.length)
        return available[randomIndex]
      },
      updateCountdownTime: (time: number) => {
        set({ countdownTime: time })
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
      playChord: () => {
        set({ gamePhase: 'listening' })
      },
      endRound: () => {
        set({ gamePhase: 'gameOver' })
      },
    }),
    { name: 'GameStore' }
  )
)
