import { useGameStore } from '@/store/gameStore';
interface ResultsDisplayProps {
    time?: number;
}
export function ResultsDisplay({ time }: ResultsDisplayProps) {
    const answerTimeRemaining = useGameStore((state) => state.answerTimeRemaining)
    const displayTime = time ?? answerTimeRemaining;


    return (
        <div className="">
            Here are the results{' '}
            <div className="text-9xl font-bold">
                {displayTime <= 3 && <span>{displayTime}</span>}
            </div>
        </div>
    );
}