import { useRef, useEffect } from 'react'
import type { ChordQuality } from '@/constants/chords'
import { useGameStore } from '@/store/gameStore'
import {
  playNote as playNoteLib,
  playChord as playChordLib,
} from '@/lib/audioEngine'

export const useAudioEngine = () => {
  const audioContextRef = useRef<AudioContext | null>(null)

  const ensureAudioContext = () => {
    if (!audioContextRef.current) {
      audioContextRef.current = new AudioContext()
      console.log('AudioContext created')
    }
    if (audioContextRef.current.state === 'suspended') {
      audioContextRef.current.resume()
    }
    return audioContextRef.current
  }

  useEffect(() => {
    return () => {
      if (audioContextRef.current) {
        audioContextRef.current.close()
      }
    }
  }, [])

  const playNote = (frequency: number) => {
    const ctx = ensureAudioContext()
    playNoteLib(ctx, frequency)
  }

  const playChord = (frequency: number, chordQuality: ChordQuality) => {
    const ctx = ensureAudioContext()
    playChordLib(ctx, frequency, chordQuality)
  }
  const playRandomChord = (frequency: number) => {
    const ctx = ensureAudioContext()
    const randomQuality = useGameStore.getState().getRandomQuality()
    playChordLib(ctx, frequency, randomQuality)
  }

  return { playNote, playChord, playRandomChord }
}
