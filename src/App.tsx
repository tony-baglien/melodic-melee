import { useAudioEngine } from '@/hooks/useAudioEngine'
import './App.css'

function App() {
  const { initAudio, isInitialized, playChord } = useAudioEngine()
  return (
    <>
      {!isInitialized ? (
        <button onClick={initAudio}>Start Game</button>
      ) : (
        <button onClick={() => playChord(440, 'diminished')}>Play a 440</button>
      )}
    </>
  )
}

export default App
