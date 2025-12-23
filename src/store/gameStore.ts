import { create } from 'zustand'
import { devtools } from 'zustand/middleware'
import type { ChordQuality } from '@/constants/chords'
import { CHORD_QUALITIES } from '@/constants/chords'

export type GameStore = {
  // round
  gamePhase: 'ready' | 'countdown' | 'playing' | 'gameOver'
  currentRound: number
  chordQualities: ChordQuality
  currentChord: ChordQuality

  incrementRound: () => void
  getRandomQuality: () => ChordQuality
}

export const useGameStore = create<GameStore>()(
  devtools(
    (set, get) => ({
      currentRound: 1,
      chordQualiities: CHORD_QUALITIES,
      currentChord: null,
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
    }),
    { name: 'GameStore' }
  )
)
