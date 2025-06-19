export async function initAudio() {
  const synth = new Tone.PolySynth(Tone.Synth, {
    oscillator: {
      type: "sine",
    },
    envelope: {
      attack: 0.01,
      decay: 1.2,
      sustain: 0.1,
      release: 2,
    },
    volume: -8,
  }).toDestination();

  return {
    synth,
  };
}
