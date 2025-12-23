import { useAudioEngine } from '@/hooks/useAudioEngine'
import './App.css'

function App() {
  const { initAudio, isInitialized, playRandomChord } = useAudioEngine()
  return (
    <>
      {!isInitialized ? (
        <button onClick={initAudio}>Start Game</button>
      ) : (
        <button onClick={() => playRandomChord(440)}>Play a 440</button>
      )}
    </>
  )
}

export default App
