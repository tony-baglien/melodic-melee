import { useState, useRef, useEffect } from 'react'
import type { ChordQuality } from '@/constants/chords'
import { useGameStore } from '@/store/gameStore'
import {
  playNote as playNoteLib,
  playChord as playChordLib,
} from '@/lib/audioEngine'

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
    playNoteLib(audioContextRef.current!, frequency)
  }

  const playChord = (frequency: number, chordQuality: ChordQuality) => {
    playChordLib(audioContextRef.current!, frequency, chordQuality)
  }
  const playRandomChord = (frequency: number) => {
    const randomQuality = useGameStore.getState().getRandomQuality()
    playChordLib(audioContextRef.current!, frequency, randomQuality)
  }

  return { initAudio, isInitialized, playNote, playChord, playRandomChord }
}
