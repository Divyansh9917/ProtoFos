// Web Audio API Ambient Cyber Soundscape Synthesizer
let audioCtx = null;
let masterGain = null;
let osc1 = null;
let osc2 = null;
let filter = null;
let noiseNode = null;
let isPlaying = false;

export const toggleCyberAudio = () => {
  if (isPlaying) {
    stopCyberAudio();
    return false;
  } else {
    startCyberAudio();
    return true;
  }
};

export const startCyberAudio = () => {
  try {
    const AudioContext = window.AudioContext || window.webkitAudioContext;
    if (!AudioContext) return false;

    if (!audioCtx) {
      audioCtx = new AudioContext();
    }

    if (audioCtx.state === 'suspended') {
      audioCtx.resume();
    }

    masterGain = audioCtx.createGain();
    masterGain.gain.setValueAtTime(0.01, audioCtx.currentTime);
    masterGain.gain.exponentialRampToValueAtTime(0.08, audioCtx.currentTime + 3);
    masterGain.connect(audioCtx.destination);

    // Deep sub-bass sci-fi drone (55Hz / A1)
    osc1 = audioCtx.createOscillator();
    osc1.type = 'sawtooth';
    osc1.frequency.setValueAtTime(55, audioCtx.currentTime);

    // Subtle 5th harmonic (82.4Hz / E2)
    osc2 = audioCtx.createOscillator();
    osc2.type = 'sine';
    osc2.frequency.setValueAtTime(82.4, audioCtx.currentTime);

    // Lowpass filter for smooth cinematic warmth
    filter = audioCtx.createBiquadFilter();
    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(240, audioCtx.currentTime);
    filter.Q.setValueAtTime(3, audioCtx.currentTime);

    // Connect oscillators to filter
    osc1.connect(filter);
    osc2.connect(filter);
    filter.connect(masterGain);

    osc1.start();
    osc2.start();

    // Subtle pink noise for rain/atmospheric wind
    const bufferSize = audioCtx.sampleRate * 2;
    const noiseBuffer = audioCtx.createBuffer(1, bufferSize, audioCtx.sampleRate);
    const output = noiseBuffer.getChannelData(0);
    let b0 = 0, b1 = 0, b2 = 0;
    for (let i = 0; i < bufferSize; i++) {
      const white = Math.random() * 2 - 1;
      b0 = 0.99886 * b0 + white * 0.0555179;
      b1 = 0.99332 * b1 + white * 0.0750759;
      b2 = 0.96900 * b2 + white * 0.1538520;
      output[i] = (b0 + b1 + b2) * 0.02;
    }

    noiseNode = audioCtx.createBufferSource();
    noiseNode.buffer = noiseBuffer;
    noiseNode.loop = true;

    const noiseFilter = audioCtx.createBiquadFilter();
    noiseFilter.type = 'bandpass';
    noiseFilter.frequency.setValueAtTime(800, audioCtx.currentTime);
    noiseFilter.Q.setValueAtTime(1, audioCtx.currentTime);

    const noiseGain = audioCtx.createGain();
    noiseGain.gain.setValueAtTime(0.04, audioCtx.currentTime);

    noiseNode.connect(noiseFilter);
    noiseFilter.connect(noiseGain);
    noiseGain.connect(masterGain);

    noiseNode.start();
    isPlaying = true;
    return true;
  } catch (e) {
    console.warn("Cyber Audio synth could not initialize:", e);
    return false;
  }
};

export const stopCyberAudio = () => {
  if (masterGain && audioCtx) {
    masterGain.gain.exponentialRampToValueAtTime(0.0001, audioCtx.currentTime + 1.5);
    setTimeout(() => {
      try {
        if (osc1) { osc1.stop(); osc1.disconnect(); }
        if (osc2) { osc2.stop(); osc2.disconnect(); }
        if (noiseNode) { noiseNode.stop(); noiseNode.disconnect(); }
      } catch (e) {}
      isPlaying = false;
    }, 1500);
  } else {
    isPlaying = false;
  }
};
