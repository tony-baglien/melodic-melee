import type { ChordQuality } from "@/constants/chords"
import { CHORD_QUALITIES } from "@/constants/chords"
import { ChordSelectionButton } from "./ChordSelectionButton";

export function ChordSelectionContainer() {
    return (
        <div className="flex items-center justify-center">
            <ul className = "grid grid-cols-2 grid-auto gap-4">
                {CHORD_QUALITIES.map((chordType: ChordQuality) => (
                    <ChordSelectionButton key={chordType} chordType={chordType} />
                ))}
            </ul>
        </div>

    )
}