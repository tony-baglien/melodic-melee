interface HealthBarProps {
    player: 'player1' | 'player2';
    playerName: string;
}
//TODO: Make the health dynamic based on player state
export function HealthBar({ player="player1", playerName}: HealthBarProps) {

  const healthBarBaseColor = player === 'player1' ? 'bg-primary' : 'bg-secondary';
    return (
    <div className="flex flex-col ">
      <div className="flex items-center justify-between">
        <span className="text-text mb-2">{playerName}</span>
      </div>
      <div className="relative h-2 bg-neutral-200 rounded-full">
        <div className={`absolute inset-y-0 left-0 ${healthBarBaseColor} rounded-full`} style={{ width: '100%' }}></div>
      </div>
      <span className="text-text">100</span>
  </div>
    )
}
