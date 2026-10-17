// Web Audio API ambient cyberpunk synthesizer
// Creates rain sound, deep sci-fi drone, and subtle cyber click UI feedback
class CyberAudioEngine {
  constructor() {
    this.ctx = null;
    this.isPlaying = false;
    this.rainGain = null;
    this.droneGain = null;
    this.droneOsc = null;
    this.noiseNode = null;
  }

  init() {
    if (this.ctx) return;
    const AudioContext = window.AudioContext || window.webkitAudioContext;
    if (!AudioContext) return;
    this.ctx = new AudioContext();
  }

  toggle() {
    this.init();
    if (!this.ctx) return false;

    if (this.ctx.state === 'suspended') {
      this.ctx.resume();
    }

    if (this.isPlaying) {
      this.stop();
      return false;
    } else {
      this.start();
      return true;
    }
  }

  start() {
    if (!this.ctx) return;
    this.isPlaying = true;

    // 1. Cyber Rain generator using pink noise buffer
    const bufferSize = this.ctx.sampleRate * 2;
    const noiseBuffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
    const output = noiseBuffer.getChannelData(0);
    let b0 = 0, b1 = 0, b2 = 0, b3 = 0, b4 = 0, b5 = 0, b6 = 0;
    for (let i = 0; i < bufferSize; i++) {
      const white = Math.random() * 2 - 1;
      b0 = 0.99886 * b0 + white * 0.0555179;
      b1 = 0.99332 * b1 + white * 0.0750759;
      b2 = 0.96900 * b2 + white * 0.1538520;
      b3 = 0.86650 * b3 + white * 0.3104856;
      b4 = 0.55000 * b4 + white * 0.5329522;
      b5 = -0.7616 * b5 - white * 0.0168980;
      output[i] = b0 + b1 + b2 + b3 + b4 + b5 + b6 + white * 0.5362;
      output[i] *= 0.08;
      b6 = white * 0.115926;
    }

    this.noiseNode = this.ctx.createBufferSource();
    this.noiseNode.buffer = noiseBuffer;
    this.noiseNode.loop = true;

    // Bandpass filter for cyberpunk downpour
    const rainFilter = this.ctx.createBiquadFilter();
    rainFilter.type = 'lowpass';
    rainFilter.frequency.setValueAtTime(1200, this.ctx.currentTime);

    this.rainGain = this.ctx.createGain();
    this.rainGain.gain.setValueAtTime(0.06, this.ctx.currentTime);

    this.noiseNode.connect(rainFilter);
    rainFilter.connect(this.rainGain);
    this.rainGain.connect(this.ctx.destination);
    this.noiseNode.start();

    // 2. Cinematic Megacity Sub Drone (55Hz A1)
    this.droneOsc = this.ctx.createOscillator();
    this.droneOsc.type = 'sawtooth';
    this.droneOsc.frequency.setValueAtTime(55, this.ctx.currentTime);

    const droneFilter = this.ctx.createBiquadFilter();
    droneFilter.type = 'lowpass';
    droneFilter.frequency.setValueAtTime(140, this.ctx.currentTime);

    this.droneGain = this.ctx.createGain();
    this.droneGain.gain.setValueAtTime(0.04, this.ctx.currentTime);

    this.droneOsc.connect(droneFilter);
    droneFilter.connect(this.droneGain);
    this.droneGain.connect(this.ctx.destination);
    this.droneOsc.start();
  }

  stop() {
    if (!this.ctx) return;
    this.isPlaying = false;
    try {
      if (this.noiseNode) {
        this.noiseNode.stop();
        this.noiseNode.disconnect();
      }
      if (this.droneOsc) {
        this.droneOsc.stop();
        this.droneOsc.disconnect();
      }
    } catch {
      // Ignored
    }
  }

  playCyberBeep() {
    if (!this.ctx || this.ctx.state !== 'running') return;
    try {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(1800, this.ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(800, this.ctx.currentTime + 0.08);

      gain.gain.setValueAtTime(0.04, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.08);

      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start();
      osc.stop(this.ctx.currentTime + 0.08);
    } catch {
      // Ignored
    }
  }
}

export const cyberAudio = new CyberAudioEngine();
