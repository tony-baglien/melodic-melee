import type { ADSRPresetsData } from '@/types/adsr'
export const ADSR_PRESETS: ADSRPresetsData = {
  default: {
    name: 'Default',
    attack: 0.01,
    decay: 0.1,
    sustain: 0.7,
    release: 0.2,
  },
}
