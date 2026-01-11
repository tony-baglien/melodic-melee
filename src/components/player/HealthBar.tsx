import { useGameStore } from "@/store";

interface HealthBarProps {
    player: 'player1' | 'player2';
    playerName: string;
}
export function HealthBar({ player="player1", playerName}: HealthBarProps) {
  const player1Health = useGameStore((state) => state.player1Health);
  const player2Health = useGameStore((state) => state.player2Health);
  const maxHealth = 100;
  
  const currentHealth = player === 'player1' ? player1Health : player2Health;
  const healthPercentage = (currentHealth / maxHealth) * 100;
  const healthBarBaseColor = player === 'player1' ? 'bg-primary' : 'bg-secondary';

    return (
    <div className="flex flex-col ">
      <div className="flex items-center justify-between">
        <span className="text-text mb-2">{playerName}</span>
      </div>
      <div className="relative h-2 bg-neutral-200 rounded-full">
        <div className={`absolute inset-y-0 left-0 ${healthBarBaseColor} rounded-full transition-all duration-300`} style={{ width: `${healthPercentage}%` }}></div>
      </div>
      <span className="text-text">{currentHealth}</span>
  </div>
    )
}
