/* ScrollDescent: smooth canvas image-sequence scrubber with snap-to-frame precision.
   Imported and modularized for React + Vite. */
export class ScrollDescent {
  constructor({ section, canvas, frameCount, path, onProgress, onLoad, damping = 16, maxDpr = 2 }) {
    Object.assign(this, { section, canvas, frameCount, path, onProgress, onLoad, damping, maxDpr });
    this.ctx = canvas.getContext('2d', { alpha: false });
    this.frames = new Array(frameCount);
    this.loaded = 0;
    this.target = 0; 
    this.current = 0;
    this.active = false; 
    this.raf = 0; 
    this.last = 0;
    this.scrollTimeout = null;
    this.reduce = typeof window !== 'undefined' && window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    this.onScroll = this.onScroll.bind(this);
    this.tick = this.tick.bind(this);
    window.addEventListener('scroll', this.onScroll, { passive: true });
    
    let rt; 
    this.onResize = () => { 
      clearTimeout(rt); 
      rt = setTimeout(() => { 
        this.resize(); 
        this.onScroll(); 
      }, 120); 
    };
    window.addEventListener('resize', this.onResize);

    // Only animate while the section is on (or near) screen
    this.observer = new IntersectionObserver(([e]) => { 
      this.active = e.isIntersecting; 
      if (this.active) this.kick(); 
    }, { rootMargin: '30% 0px 30% 0px' });
    this.observer.observe(section);

    this.resize();
    this.preload();
    this.onScroll(); 
    this.current = this.target;
  }

  destroy() {
    clearTimeout(this.scrollTimeout);
    window.removeEventListener('scroll', this.onScroll);
    window.removeEventListener('resize', this.onResize);
    if (this.observer) this.observer.disconnect();
    if (this.raf) cancelAnimationFrame(this.raf);
  }

  progress() {
    const r = this.section.getBoundingClientRect();
    const max = r.height - window.innerHeight;
    return max <= 0 ? 0 : Math.min(1, Math.max(0, -r.top / max));
  }

  onScroll() {
    const p = this.progress();
    this.target = p * (this.frameCount - 1);
    if (this.onProgress) this.onProgress(p); // UI (counter, chapters) follows real scroll instantly
    this.kick();

    // Snap to exact crisp integer frame when scrolling stops (eliminates blur completely)
    clearTimeout(this.scrollTimeout);
    this.scrollTimeout = setTimeout(() => {
      this.target = Math.round(this.target);
      this.current = this.target;
      this.draw(this.target);
    }, 40);
  }

  kick() { 
    if (!this.raf && this.active) { 
      this.last = performance.now(); 
      this.raf = requestAnimationFrame(this.tick); 
    } 
  }

  tick(now) {
    this.raf = 0;
    const dt = Math.min(0.05, (now - this.last) / 1000); 
    this.last = now;
    const diff = this.target - this.current;
    
    // When difference is small, snap directly to integer frame so it never settles on a blurry blend
    if (this.reduce || Math.abs(diff) < 0.08) {
      this.current = Math.round(this.target);
    } else {
      this.current = this.current + diff * (1 - Math.exp(-dt * this.damping));
    }
    
    this.draw(this.current);
    if (Math.abs(this.target - this.current) > 0.001 && this.active) {
      this.raf = requestAnimationFrame(this.tick);
    }
  }

  nearest(i) { // Best loaded frame at/around i
    if (this.frames[i]) return this.frames[i];
    for (let d = 1; d < this.frameCount; d++) { 
      const f = this.frames[i - d] || this.frames[i + d]; 
      if (f) return f; 
    }
    return null;
  }

  draw(pos) {
    // Snap to nearest integer frame — eliminates ghosting / blur from blending two frames
    const a = Math.max(0, Math.min(this.frameCount - 1, Math.round(pos)));
    const key = a + ':' + this.cw + ':' + this.ch;
    if (key === this.lastKey) return;
    this.lastKey = key;
    const A = this.nearest(a);
    if (!A) return;
    this.paint(A);
  }

  paint(img) {
    const { ctx, cw, ch } = this;
    const iw = img.naturalWidth || img.width;
    const ih = img.naturalHeight || img.height;
    if (!iw || !ih) return;

    // Centered cover scale, native aspect ratio without artificial stretch/crop
    const s = Math.max(cw / iw, ch / ih);
    const w = iw * s;
    const h = ih * s;
    const x = (cw - w) / 2;
    const y = (ch - h) / 2;

    ctx.globalAlpha = 1; 
    ctx.drawImage(img, x, y, w, h); 
  }

  resize() {
    const dpr = Math.min(window.devicePixelRatio || 1, this.maxDpr);
    this.cw = this.canvas.width = Math.round(this.canvas.clientWidth * dpr);
    this.ch = this.canvas.height = Math.round(this.canvas.clientHeight * dpr);
    this.ctx.imageSmoothingQuality = 'high';
    this.lastKey = '';
    this.draw(this.current);
  }

  load(i) {
    return new Promise(res => {
      const img = new Image(); 
      img.decoding = 'async'; 
      img.src = this.path(i);
      const done = () => { 
        this.frames[i] = img; 
        this.loaded++; 
        if (this.onLoad) this.onLoad(this.loaded / this.frameCount); 
        res(); 
      };
      (img.decode ? img.decode() : Promise.resolve()).then(done, done);
    });
  }

  async preload() {
    await this.load(0); 
    this.draw(0);
    const order = [], seen = new Set();
    for (const step of [12, 6, 3, 1]) {
      for (let i = 0; i < this.frameCount; i += step) {
        if (!seen.has(i)) { 
          seen.add(i); 
          order.push(i); 
        }
      }
    }
    let c = 0;
    const worker = async () => { 
      while (c < order.length) await this.load(order[c++]); 
    };
    const start = () => Promise.all(Array.from({ length: 6 }, worker)).then(() => this.draw(this.current));
    ('requestIdleCallback' in window) ? requestIdleCallback(start, { timeout: 800 }) : setTimeout(start, 200);
  }
}
