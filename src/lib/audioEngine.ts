import { ADSR_PRESETS } from '../data/adsrPresets.ts'
import type { ChordType } from '@/types/chordTypes.ts'
import type { ADSRParams } from '@/types/adsr.ts'

const CHORD_INTERVALS: Record<ChordType, number[]> = {
  major: [0, 4, 7],
  minor: [0, 3, 7],
  augmented: [0, 4, 8],
  diminished: [0, 3, 6],
}
export const getChordIntervals = (chordType: ChordType): number[] => {
  return CHORD_INTERVALS[chordType]
}
const getChordFrequencies = (root: number, chordType: ChordType): number[] => {
  const chordIntervals = getChordIntervals(chordType)
  return chordIntervals.map((interval) => root * Math.pow(2, interval / 12))
}

/** Takes a GainNode and applies ADSR envelope to it.
 * @param gainNode - The GainNode to apply the ADSR envelope to.
 * @param audioContext - The AudioContext instance.
 * @param params - The ADSR parameters.
 * @param startTime - The time to start the envelope (default is current time).
 * @param volumeScale - A multiplier to scale the overall volume (default is 1).
 * @returns The GainNode with the applied ADSR envelope.
 * */
export const applyADSR = (
  gainNode: GainNode,
  audioContext: AudioContext,
  params: ADSRParams,
  startTime: number = audioContext.currentTime,
  volumeScale: number = 1
) => {
  const { attack, decay, sustain, release } = params
  const peakGain = 0.8 * volumeScale
  const sustainDuration = 0.5

  gainNode.gain.setValueAtTime(0, startTime)

  //attack
  gainNode.gain.linearRampToValueAtTime(peakGain, startTime + attack)
  //Decay
  gainNode.gain.linearRampToValueAtTime(
    sustain * peakGain,
    startTime + attack + decay
  )
  // Sustain for 0.5 seconds
  gainNode.gain.setValueAtTime(
    sustain * peakGain,
    startTime + attack + decay + sustainDuration
  )
  //Release
  gainNode.gain.linearRampToValueAtTime(
    0,
    startTime + attack + decay + sustainDuration + release
  )

  return gainNode
}

/** Plays a single note with ADSR envelope.
 * @param audioContext - The AudioContext instance.
 * @param frequency - The frequency of the note to play.
 * @param volumeScale - A multiplier to scale the overall volume (default is 1).
 * @param startTime - The time to start the note (default is current time).
 *  @returns The OscillatorNode playing the note.
 * */
export const playNote = (
  audioContext: AudioContext,
  frequency: number,
  volumeScale: number = 1,
  startTime: number = audioContext.currentTime
) => {
  const osc = audioContext.createOscillator()
  const gainNode = audioContext.createGain()

  const adsrParams = {
    attack: ADSR_PRESETS.default.attack,
    decay: ADSR_PRESETS.default.decay,
    sustain: ADSR_PRESETS.default.sustain,
    release: ADSR_PRESETS.default.release,
    sustainDuration: 0.5,
  }

  const adsrGain = applyADSR(
    gainNode,
    audioContext,
    adsrParams,
    startTime,
    volumeScale
  )

  osc.frequency.setValueAtTime(frequency, startTime)
  osc.connect(adsrGain)
  adsrGain.connect(audioContext.destination)

  osc.start(startTime)

  return osc
}

export const playChord = (
  audioContext: AudioContext,
  frequency: number,
  chordType: ChordType = 'major'
): OscillatorNode[] => {
  const chordFrequencies = getChordFrequencies(frequency, chordType)

  return chordFrequencies.map((freq) => {
    return playNote(audioContext, freq, 1 / chordFrequencies.length)
  })
}
