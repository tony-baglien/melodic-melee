import { motion } from "motion/react"
import { useGameStore } from "@/store"

export function CountdownDisplay(){
    const countdown = useGameStore((s) => s.countdownTimeRemaining); 
    return (
        <div className="flex flex-col items-center justify-center">
            <motion.div
                key={countdown}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                transition={{ duration: 0.4, ease: "easeOut" }}
                className="text-9xl font-bold text-tertiary"
            >
                {countdown}
            </motion.div>
        </div>
    )
}