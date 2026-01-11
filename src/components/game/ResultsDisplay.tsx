import { Container } from '../ui/Container';
import { useGameStore } from '@/store';

export function ResultsDisplay() {
    const player1Answer = useGameStore((state) => state.player1Answer);
    const player2Answer = useGameStore((state) => state.player2Answer)

    return (
        <div className="w-full h-full grid grid-cols-1 md:grid-cols-2 gap-4">
            <Container>
                { player1Answer }
            </Container>
            <Container>
                { player2Answer }
            </Container>
        </div>
        
    );
}