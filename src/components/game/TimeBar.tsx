import { useGameStore } from "@/store"

interface TimeBarProps {
  time?: number
  label?: string
}

export function TimeBar({ time, label }: TimeBarProps) {
  const countdown = useGameStore((s) => s.countdownTimeRemaining)
  const answer = useGameStore((s) => s.answerTimeRemaining)
  const result = useGameStore((s) => s.resultTimeRemaining)
  const phase = useGameStore((s) => s.gamePhase)

  const displayTime =
    time ??
    (phase === 'countdown' ? countdown : phase === 'answering' ? answer : phase === 'results' ? result : null)

  return (
    <div className="w-full">
      <div className="w-full bg-tertiary text-text text-center text-5xl font-bold py-6">
        {label ? `${label} ${displayTime}` : displayTime}
      </div>
    </div>
  )
}
