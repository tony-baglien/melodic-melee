import { useEffect } from 'react'
import { useGameStore } from '@/store/gameStore'
import { useAudioEngine } from '@/hooks/useAudioEngine'

export function useGameLoop() {
  // Game Flow
  const gamePhase = useGameStore((state) => state.gamePhase)
  const startAnswering = useGameStore((state) => state.startAnswering)
  const nextRound = useGameStore((state) => state.nextRound)

  // Timing
  const countdownTimeRemaining = useGameStore(
    (state) => state.countdownTimeRemaining
  )
  const answerTimeRemaining = useGameStore((state) => state.answerTimeRemaining)
  const resultTimeRemaining = useGameStore((state) => state.resultTimeRemaining)
  const updateCountdownTime = useGameStore((state) => state.updateCountdownTime)
  const updateAnswerTime = useGameStore((state) => state.updateAnswerTime)
  const updateResultTime = useGameStore((state) => state.updateResultTime)

  // Chords
  const { playRandomChord } = useAudioEngine()

  const isDevMode = useGameStore((state) => state.isDevMode)

  // Durations
  const LISTENING_DURATION = useGameStore((state) => state.LISTEN_DURATION)

  // --- Countdown Phase --- //
  useEffect(() => {
    if (gamePhase !== 'countdown') return

    const interval = setInterval(() => {
      const newTime = countdownTimeRemaining - 1
      updateCountdownTime(newTime)
    }, 1000)
    return () => clearInterval(interval)
  }, [gamePhase, countdownTimeRemaining, updateCountdownTime])

  // --- Listening Phase --- //
  useEffect(() => {
    if (gamePhase !== 'listening') return
    playRandomChord(440)

    if (isDevMode) return // don't auto-advance in dev mode

    const timeout = setTimeout(() => {
      console.log('TODO add answering buss')
      startAnswering()
    }, LISTENING_DURATION * 1000)
    return () => clearTimeout(timeout)
  }, [gamePhase, LISTENING_DURATION, startAnswering, playRandomChord])

  // --- Answering Phase --- //
  useEffect(() => {
    if (gamePhase !== 'answering') return

    const interval = setInterval(() => {
      const newTime = answerTimeRemaining - 1
      updateAnswerTime(newTime)
    }, 1000)
    return () => clearInterval(interval)
  }, [gamePhase, answerTimeRemaining, updateAnswerTime, isDevMode])

  // --- Results Phase --- //
  useEffect(() => {
    if (gamePhase !== 'results') return

    const interval = setInterval(() => {
      console.log(resultTimeRemaining)
      const newTime = resultTimeRemaining - 1
      updateResultTime(newTime)
    }, 1000)
    return () => clearInterval(interval)
  }, [gamePhase, updateResultTime, resultTimeRemaining, nextRound])
}
