
import { ChordSelectionContainer } from "../ui/ChordSelectionContainer";

export function AnswerDisplay() {
    // AnswerDisplay now only renders the two panels. TimeBar is rendered
    // by the parent `GameBoard` to avoid re-rendering these panels on every tick.
    return (
        <div className="w-full h-full grid grid-cols-1 md:grid-cols-2 gap-4">
                <ChordSelectionContainer/>
                <ChordSelectionContainer/>
        </div>
    )

}