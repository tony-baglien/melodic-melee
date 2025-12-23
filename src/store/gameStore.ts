import { create } from 'zustand'
import { devtools } from 'zustand/middleware'

type gameStore = {
  // round
  gamePhase: 'ready' | 'countdown' | 'playing' | 'gameOver'
  currentRound: number
  incrementRound: () => void
}

export const useGameStore = create<gameStore>()(
  devtools(
    (set) => ({
      currentRound: 1,
      incrememntRound: () =>
        set((state) => ({ currentRound: state.currentRound + 1 })),
    }),
    { name: 'GameStore' }
  )
)
