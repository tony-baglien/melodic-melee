import { useState, useRef, useEffect } from 'react'
import type { ChordType } from '@/types/chordTypes'
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
    const note = playNoteLib(audioContextRef.current!, frequency)
    console.log(note)
  }

  const playChord = (frequency: number, chordType: ChordType) => {
    const chord = playChordLib(audioContextRef.current!, frequency, chordType)
    console.log(chord)
  }
  return { initAudio, isInitialized, playNote, playChord }
}
