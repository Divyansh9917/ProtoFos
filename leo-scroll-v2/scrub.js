/* ScrollDescent: smooth canvas image-sequence scrubber.
   Usage: new ScrollDescent({ section, canvas, frameCount:240, path:i=>`frames/f_${String(i+1).padStart(4,'0')}.webp`, onProgress(p){} }) */
class ScrollDescent {
  constructor({ section, canvas, frameCount, path, onProgress, onLoad, damping = 9, maxDpr = 2 }) {
    Object.assign(this, { section, canvas, frameCount, path, onProgress, onLoad, damping, maxDpr });
    this.ctx = canvas.getContext('2d', { alpha: false });
    this.frames = new Array(frameCount);
    this.loaded = 0;
    this.target = 0; this.current = 0;
    this.active = false; this.raf = 0; this.last = 0;
    this.reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;

    this.onScroll = this.onScroll.bind(this);
    this.tick = this.tick.bind(this);
    addEventListener('scroll', this.onScroll, { passive: true });
    let rt; addEventListener('resize', () => { clearTimeout(rt); rt = setTimeout(() => { this.resize(); this.onScroll(); }, 120); });
    // only animate while the section is on (or near) screen
    new IntersectionObserver(([e]) => { this.active = e.isIntersecting; if (this.active) this.kick(); },
      { rootMargin: '30% 0px 30% 0px' }).observe(section);

    this.resize();
    this.preload();
    this.onScroll(); this.current = this.target;
  }

  progress() {
    const r = this.section.getBoundingClientRect();
    const max = r.height - innerHeight;
    return Math.min(1, Math.max(0, -r.top / max));
  }

  onScroll() {
    const p = this.progress();
    this.target = p * (this.frameCount - 1);
    this.onProgress && this.onProgress(p);       // UI (counter, chapters) follows the real scroll instantly
    this.kick();
  }

  kick() { if (!this.raf && this.active) { this.last = performance.now(); this.raf = requestAnimationFrame(this.tick); } }

  tick(now) {
    this.raf = 0;
    const dt = Math.min(0.05, (now - this.last) / 1000); this.last = now;
    const diff = this.target - this.current;
    // frame-rate independent damping: same feel at 60 / 120 / 144 Hz
    this.current = this.reduce || Math.abs(diff) < 0.003 ? this.target : this.current + diff * (1 - Math.exp(-dt * this.damping));
    this.draw(this.current);
    if (Math.abs(this.target - this.current) > 0.003 && this.active) this.raf = requestAnimationFrame(this.tick);
  }

  nearest(i) {                                    // best loaded frame at/around i
    if (this.frames[i]) return this.frames[i];
    for (let d = 1; d < this.frameCount; d++) { const f = this.frames[i - d] || this.frames[i + d]; if (f) return f; }
    return null;
  }

  draw(pos) {
    const a = Math.max(0, Math.min(this.frameCount - 1, Math.floor(pos)));
    // blend only while easing slowly (fast flings don't need it); quantised so we never redraw identical pixels
    const slow = Math.abs(this.target - pos) < 3;
    const f = slow ? Math.round((pos - a) * 8) / 8 : 0;
    const key = a + ':' + f + ':' + this.cw;
    if (key === this.lastKey) return;
    this.lastKey = key;
    const A = this.nearest(a);
    if (!A) return;
    this.paint(A, 1);
    if (f > 0 && a + 1 < this.frameCount) { const B = this.nearest(a + 1); if (B && B !== A) this.paint(B, f); }
  }

  paint(img, alpha) {
    const { ctx, cw, ch } = this, iw = img.naturalWidth, ih = img.naturalHeight;
    const s = Math.max(cw / iw, ch / ih), w = iw * s, h = ih * s;
    ctx.globalAlpha = alpha; ctx.drawImage(img, (cw - w) / 2, (ch - h) / 2, w, h); ctx.globalAlpha = 1;
  }

  resize() {
    const dpr = Math.min(devicePixelRatio || 1, this.maxDpr);
    this.cw = this.canvas.width = Math.round(this.canvas.clientWidth * dpr);
    this.ch = this.canvas.height = Math.round(this.canvas.clientHeight * dpr);
    this.ctx.imageSmoothingQuality = 'high';
    this.lastKey = '';
    this.draw(this.current);
  }

  load(i) {
    return new Promise(res => {
      const img = new Image(); img.decoding = 'async'; img.src = this.path(i);
      const done = () => { this.frames[i] = img; this.loaded++; this.onLoad && this.onLoad(this.loaded / this.frameCount); res(); };
      (img.decode ? img.decode() : Promise.resolve()).then(done, done);
    });
  }

  async preload() {
    await this.load(0); this.draw(0);
    const order = [], seen = new Set();
    for (const step of [12, 6, 3, 1]) for (let i = 0; i < this.frameCount; i += step) if (!seen.has(i)) { seen.add(i); order.push(i); }
    let c = 0;
    const worker = async () => { while (c < order.length) await this.load(order[c++]); };
    const start = () => Promise.all(Array.from({ length: 6 }, worker)).then(() => this.draw(this.current));
    ('requestIdleCallback' in window) ? requestIdleCallback(start, { timeout: 800 }) : setTimeout(start, 200);
  }
}
