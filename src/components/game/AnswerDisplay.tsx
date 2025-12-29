
import { Container } from "@/components/ui/Container";

export function AnswerDisplay() {
    // AnswerDisplay now only renders the two panels. TimeBar is rendered
    // by the parent `GameBoard` to avoid re-rendering these panels on every tick.
    return (
        <div className="w-full h-full grid grid-cols-1 md:grid-cols-2 gap-4">
            <Container variant="secondary">Chord Section One</Container>
            <Container variant="secondary">Chord Section Two</Container>
        </div>
    )

}