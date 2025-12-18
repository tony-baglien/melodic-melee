export const playNote = (audioContext: AudioContext, frequency: number) => {
  const now = audioContext.currentTime
  const osc = audioContext.createOscillator()
  const gainNode = audioContext.createGain()
  gainNode.gain.setValueAtTime(0, now)
  gainNode.gain.linearRampToValueAtTime(0.3, now + 0.05)
  gainNode.gain.linearRampToValueAtTime(0.2, now + 0.5)
  gainNode.gain.linearRampToValueAtTime(0, now + 0.7)

  osc.frequency.setValueAtTime(frequency, now)
  osc.connect(gainNode)
  gainNode.connect(audioContext.destination)

  return osc
}
//TODO: Math to make a chord.
