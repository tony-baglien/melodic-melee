import type { ChordQuality } from '../../constants/chords'
import { Button } from './Button'
import { useGameStore } from '@/store/gameStore';

interface ChordSelectionButtonProps {
    chordType: ChordQuality
}


export function ChordSelectionButton({ chordType }: ChordSelectionButtonProps)  {
    const selectAnswer = useGameStore((state) => state.selectAnswer);
    //TODO: Add logic for player two answer (with the keyboard controls later)
    const handleOnClick = (quality: ChordQuality) => {
       selectAnswer(quality) 
}
    return (
        <Button variant="primary" className="w-full" onClick={() =>handleOnClick(chordType)}>
            {chordType.charAt(0).toUpperCase() + chordType.slice(1)}
        </Button>
    )
}