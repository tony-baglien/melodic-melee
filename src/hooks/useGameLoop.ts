import { useEffect } from 'react'
import { useGameStore } from '@/store/gameStore'

export function useGameLoop() {
  const gamePhase = useGameStore((state) => state.gamePhase)
  const countdownTime = useGameStore((state) => state.countdownTime)
  const updateCountdownTime = useGameStore((state) => state.updateCountdownTime)

  const LISTENING_DURATION = useGameStore((state) => state.LISTEN_DURATION)
  useEffect(() => {
    if (gamePhase !== 'countdown') return
    const interval = setInterval(() => {
      const newTime = countdownTime - 1
      console.log('countdown time', newTime)
      updateCountdownTime(newTime)
    }, 1000)
    return () => clearInterval(interval)
  }, [gamePhase, countdownTime, updateCountdownTime])

  useEffect(() => {
    if (gamePhase !== 'listening') return
    const timeout = setTimeout(() => {
      console.log('TODO add answering buss')
    }, LISTENING_DURATION * 1000)
    return () => clearTimeout(timeout)
  }, [gamePhase, LISTENING_DURATION])
}
