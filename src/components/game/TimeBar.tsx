import { useGameStore } from "@/store"
import type { JSX } from "react";
import { AiFillSound } from "react-icons/ai"

//TODO: Add logic for a standard view when no time is provided (to preserve height)
//TOD: Make this a bar like the health bar (Add Color)
//TODO: Add seconds and miliseconds <-- this might be fun to do as a challenge

interface TimeBarProps {
  time?: number
  label?: string
}

export function TimeBar({ time, label }: TimeBarProps) {
  const countdown = useGameStore((s) => s.countdownTimeRemaining);
  const answer = useGameStore((s) => s.answerTimeRemaining);
  const result = useGameStore((s) => s.resultTimeRemaining);
  const phase = useGameStore((s) => s.gamePhase);

  const phaseMap: Record<string, number > = {
    countdown: countdown,
    answering: answer,
    results: result,
  }

  const displayTime = time ?? phaseMap[phase] ?? 0;

  return (
    <div className="w-full">
      <div className="w-full flex items-center justify-center text-text text-center text-5xl font-bold py-6">
        {phase === 'listening' ? <AiFillSound /> 
        : (<span>{label ? `${label} ${displayTime}` : `${displayTime}:00`}</span>)}
      </div>
    </div>
  )
}
