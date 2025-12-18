import { useState, useRef, useEffect } from 'react'
import { playNote as playNoteLib } from '@/lib/audoEngine.ts'

export const useAudioEngine = () => {
  const audioContextRef = useRef<AudioContext | null>(null)
  const [isInitialized, setIsIntialized] = useState(false)

  const initAudio = () => {
    if (!audioContextRef.current) {
      audioContextRef.current = new AudioContext()
      setIsIntialized(true)
    }

    if (audioContextRef.current.state === 'suspended') {
      audioContextRef.current.resume()
    }
  }
  useEffect(() => {
    return () => {
      if (audioContextRef.current) {
        audioContextRef.current.close()
      }
    }
  }, [])

  const playNote = (frequency: number) => {
    const now = audioContextRef.current!.currentTime
    const note = playNoteLib(audioContextRef.current!, frequency)
    note.start(now)
    note.stop(now + 0.7)
  }
  return { initAudio, isInitialized, playNote }
}
