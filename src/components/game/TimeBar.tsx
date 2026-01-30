import { useGameStore } from "@/store"
import { AiFillSound } from "react-icons/ai"

//TODO: Add seconds and miliseconds <-- this might be fun to do as a challenge

interface TimeBarProps {
  time?: number
}

export function TimeBar({ time}: TimeBarProps) {
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

  let display;
  if (phase === "countdown"){
    display = <span>-:--</span>
  } else if (phase === 'listening'){
    display = <AiFillSound />
  } else {
    display = <span>{`${displayTime}:00`}</span>
  }

  return (
    <div className="w-full">
      <div className="w-full flex items-center justify-center text-text text-center text-5xl font-bold py-6">
        {display}
      </div>
    </div>
  )
}
