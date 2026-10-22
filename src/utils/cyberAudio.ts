// Procedural Web Audio API Cyber Ambient Synthesizer
// Zero external assets required, 100% reliable in modern browsers

class CyberAudioSystem {
  private ctx: AudioContext | null = null;
  private isPlaying = false;
  private masterGain: GainNode | null = null;
  private droneOsc1: OscillatorNode | null = null;
  private droneOsc2: OscillatorNode | null = null;
  private filter: BiquadFilterNode | null = null;

  public init() {
    if (this.ctx) return;
    const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
    if (!AudioContextClass) return;
    this.ctx = new AudioContextClass();

    this.masterGain = this.ctx.createGain();
    this.masterGain.gain.setValueAtTime(0.12, this.ctx.currentTime);
    this.masterGain.connect(this.ctx.destination);

    // Warm Low-Pass Filter
    this.filter = this.ctx.createBiquadFilter();
    this.filter.type = 'lowpass';
    this.filter.frequency.setValueAtTime(280, this.ctx.currentTime);
    this.filter.Q.setValueAtTime(3.5, this.ctx.currentTime);
    this.filter.connect(this.masterGain);

    // Deep sub-bass sci-fi drone (55Hz / A1)
    this.droneOsc1 = this.ctx.createOscillator();
    this.droneOsc1.type = 'sawtooth';
    this.droneOsc1.frequency.setValueAtTime(55, this.ctx.currentTime);
    this.droneOsc1.connect(this.filter);

    // Detuned second oscillator for beating warmth (55.4Hz)
    this.droneOsc2 = this.ctx.createOscillator();
    this.droneOsc2.type = 'sine';
    this.droneOsc2.frequency.setValueAtTime(55.4, this.ctx.currentTime);
    this.droneOsc2.connect(this.filter);
  }

  public toggle(): boolean {
    if (!this.ctx) {
      this.init();
    }
    if (!this.ctx) return false;

    if (this.ctx.state === 'suspended') {
      this.ctx.resume();
    }

    if (!this.isPlaying) {
      try {
        this.droneOsc1?.start();
        this.droneOsc2?.start();
      } catch (e) {
        // Already started
      }
      if (this.masterGain) {
        this.masterGain.gain.setTargetAtTime(0.12, this.ctx.currentTime, 0.4);
      }
      this.isPlaying = true;
    } else {
      if (this.masterGain) {
        this.masterGain.gain.setTargetAtTime(0, this.ctx.currentTime, 0.2);
      }
      this.isPlaying = false;
    }
    return this.isPlaying;
  }

  public playFootstep() {
    if (!this.ctx || !this.isPlaying) return;
    try {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(140, this.ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(35, this.ctx.currentTime + 0.08);

      gain.gain.setValueAtTime(0.04, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.08);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start();
      osc.stop(this.ctx.currentTime + 0.09);
    } catch (e) {
      // Audio context might be restricted
    }
  }

  public setFilterFreq(progress: number) {
    if (!this.ctx || !this.filter) return;
    // As Spider-Man nears the horizon, the cyber hum opens up
    const targetFreq = 220 + progress * 400;
    this.filter.frequency.setTargetAtTime(targetFreq, this.ctx.currentTime, 0.2);
  }

  public getStatus(): boolean {
    return this.isPlaying;
  }
}

export const cyberAudio = new CyberAudioSystem();
