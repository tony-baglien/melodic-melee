import { Container } from '../ui/Container'
import { useGameStore } from '@/store'
import { motion } from 'motion/react'

export function ResultsDisplay() {
  const wrapperVariants = {
    start: { opacity: 0, y: 20 },
    end: {
      opacity: 1,
      y: 0,
    },
  }
  const itemVariants = {
    start: { width: 0 },
    end: { width: '100%' },
  }
  const player1Answer = useGameStore((state) => state.player1Answer)
  const player2Answer = useGameStore((state) => state.player2Answer)

  return (
    <div className="w-full h-full grid grid-cols-1 md:grid-cols-2 gap-4">
      <Container>
        <motion.span
          variants={wrapperVariants}
          initial="start"
          animate="end"
          className="text-2xl text-shadow-container relative"
        >
          {player1Answer ? player1Answer : 'no answer'}
          <motion.span
            variants={itemVariants}
            transition={{ type: 'spring', stiffness: 50, delay: 0.5 }}
            initial="start"
            animate="end"
            className="w-full h-0.5 bottom-0 left-0 absolute bg-primary"
          ></motion.span>
        </motion.span>
      </Container>
      <Container>
        <motion.span
          variants={wrapperVariants}
          initial="start"
          animate="end"
          className="text-2xl text-shadow-container relative"
        >
          {player2Answer ? player2Answer : 'No Answer'}
          <motion.span
            variants={itemVariants}
            transition={{ type: 'spring', stiffness: 50, delay: 0.5 }}
            initial="start"
            animate="end"
            className="w-full h-0.5 bottom-0 left-0 absolute bg-secondary"
          ></motion.span>
        </motion.span>
      </Container>
    </div>
  )
}
