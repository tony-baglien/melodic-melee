import { describe, it, expect } from 'vitest'
import { getChordIntervals } from './audioEngine'

describe('getChordInterval', () => {
  it('returns correct intervals for a major chord', () => {
    expect(getChordIntervals('major')).toEqual([0, 4, 7])
  })
  it('returns correct intervals for a minor chord', () => {
    expect(getChordIntervals('minor')).toEqual([0, 3, 7])
  })
  it('returns correct intervals for an augmented chord', () => {
    expect(getChordIntervals('augmented')).toEqual([0, 4, 8])
  })
  it('returns correct intervals for a diminished chord', () => {
    expect(getChordIntervals('diminished')).toEqual([0, 3, 6])
  })
})
