import type { ChordQuality } from "@/constants/chords"
import { CHORD_QUALITIES } from "@/constants/chords"
import { ChordSelectionButton } from "./ChordSelectionButton";
import { motion, AnimatePresence, easeInOut } from 'motion/react';
import { stagger } from "motion/react";

const parentVariants = {
    close: { opacity: 0},
    open: { opacity: 1, 
            transition: {
                delayChildren: stagger(0.1)
            }
        }
}
const childVariants = {
    close: { opacity: 0,filter: "blur(2px)"},
    open: { 
        opacity: 1,
        filter: "none",
        transition: {
            ease: easeInOut
        }
    }
}
export function ChordSelectionContainer() {
    return (
        <div className="flex items-center justify-center">
            <motion.ul 
                className="grid grid-cols-2 grid-auto gap-4"
                variants={parentVariants}
                initial="close"
                animate="open"
            >
                <AnimatePresence>
                {CHORD_QUALITIES.map((chordType: ChordQuality) => (
                    <motion.div
                        key={chordType}
                        variants={childVariants}
                    >
                    <ChordSelectionButton chordType={chordType} />
                    </motion.div>
                ))}
                </AnimatePresence>
            </motion.ul>
        </div>

    )
}