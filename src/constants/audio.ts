export interface ADSRParams {
  attack: number
  decay: number
  sustain: number
  release: number
}
export interface ADSRPreset {
  name: string
  attack: number
  decay: number
  sustain: number
  release: number
}
export interface ADSRPresetsData {
  [key: string]: ADSRPreset
}
