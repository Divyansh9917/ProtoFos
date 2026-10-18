// =============================================================================
// ProtoFos 2026 · Events & Competitions Engine
// Infinite Zoom Tunnel + 3D Card Scrub + Honeycomb Competitions Grid + Shared Drawer
// =============================================================================

// SINGLE CENTRAL CONFIG ARRAY (used by both Section A and Section B)
const EVENTS = [
  {
    id: 1,
    code: 'RL',
    name: 'SYNAPSE ARENA',
    category: 'Software & AI',
    catIndex: '01',
    tagline: 'Train a fighter. Win the arena.',
    clubs: 'VECTOR (Game Dev) × AIC (AI Club)',
    incharge: 'Md. Maaz Ali Haider',
    format: 'Multi-week remote RL training, then a live 10-hour on-ground tournament on shared infrastructure.',
    teamSize: '1–3',
    duration: '10 hrs (Finals)',
    footfall: '~150',
    fee: 'Rs. 100 per person',
    desc: 'Participants train their own reinforcement learning (PPO) fighter for a 2D combat arena under identical rules (same environment, algorithm and compute budget); reward function and model architecture are the only controls.',
    rules: [
      'Fixed env-step budget for all participants.',
      'Judged on tournament result, reward design creativity and trade-off clarity (model capacity vs inference latency).'
    ],
    prizes: ['₹9,000', '₹6,000', '₹4,000']
  },
  {
    id: 2,
    code: 'CF',
    name: 'PYC CODING CONTEST',
    category: 'Software & AI',
    catIndex: '01',
    tagline: 'Codeforces, offline, knockouts.',
    clubs: 'PyC',
    incharge: 'Harsh Sankhla',
    format: 'Round 1 online 5–7 days (resume shortlist outside; CP contest inside); Round 2 offline at IIIT Bhagalpur, ~5 hrs (top 100 inside + top 50 outside); top 4 knockouts.',
    teamSize: 'Individual only',
    duration: '5 hrs (Offline Round)',
    footfall: '150',
    fee: 'Rs. 100 per person',
    desc: 'Intense competitive programming arena on Codeforces featuring multi-day qualifier stages followed by a high-stakes offline knockout tournament at IIIT Bhagalpur.',
    rules: [
      'Platform: Codeforces.',
      'Round 1: 5–7 days online qualifiers.',
      'Round 2: Top 100 college + top 50 outside qualify for offline finals; top 4 play knockouts.'
    ],
    prizes: ['₹6,000', '₹5,000', '₹4,000']
  },
  {
    id: 3,
    code: 'Q',
    name: 'QUANTA’26 CAMPUS MARKET',
    category: 'Markets',
    catIndex: '03',
    tagline: 'Trade the length of the campus.',
    clubs: 'Krypsis (Quant Club)',
    incharge: 'Sarthak Chhabra',
    format: 'Equal virtual capital, trade positions on the exact longest length of the campus in meters; settle after true length is revealed.',
    teamSize: 'Individual',
    duration: 'Live Festival Session',
    footfall: '~100',
    fee: 'Rs. 100 per person',
    desc: 'Quantitative trading and market-making simulation: trade positions on the exact longest length of the campus in meters. Highest final portfolio wealth wins.',
    rules: [
      'Record all trades in the official ledger.',
      'No collusion or multiple registrations.',
      'Virtual money has no real cash value.',
      'Organizers’ settlement is final.'
    ],
    prizes: ['₹3,000', '₹2,000', '₹1,000']
  },
  {
    id: 4,
    code: 'FPV',
    name: 'DRONE RACING',
    category: 'Robotics',
    catIndex: '02',
    tagline: 'Power draw meets pilot reflex.',
    clubs: 'Robotics and Electronics Club (REC)',
    incharge: 'Keshav Kishore Deo',
    format: 'High-speed pilot laps through a physical obstacle and safety-barriered arena.',
    teamSize: '1–2',
    duration: '3–4 hrs',
    footfall: '~50',
    fee: 'Rs. 100 per person',
    desc: 'FPV drone pilots navigate custom high-voltage quadcopters through an illuminated obstacle course pushing aerodynamics and reaction speeds to the absolute limit.',
    rules: [
      'Safety-barriered track compliance mandatory.',
      'Timed trials with published obstacle penalty metrics.',
      'Technical panel inspection before race clearance.'
    ],
    prizes: ['₹10,000', '₹6,000', '₹4,000']
  },
  {
    id: 5,
    code: 'BOT',
    name: 'ROBOSOCCER + ROBORACE',
    category: 'Robotics',
    catIndex: '02',
    tagline: 'Kick. Race. Outwit.',
    clubs: 'Robotics and Electronics Club (REC)',
    incharge: 'Keshav Kishore Deo',
    format: 'Dual mechanical challenge: high-torque obstacle racing followed by head-to-head robot soccer tournament.',
    teamSize: '2–4',
    duration: '3–4 hrs',
    footfall: '~50',
    fee: 'Rs. 100 per person',
    desc: 'Custom-built ground robots clash in two grueling phases: navigating high-friction raceways and competing in an aggressive, tactical robotic soccer arena.',
    rules: [
      'Chassis dimensions and battery voltage limits enforced.',
      'Safety barrier compliance and technical volunteer check.',
      'Round-robin stages leading to single elimination finals.'
    ],
    prizes: ['₹8,000', '₹6,000', '₹4,000']
  },
  {
    id: 6,
    code: 'SEC',
    name: 'SECURATHON',
    category: 'Software & AI',
    catIndex: '01',
    tagline: 'Build it secure by design.',
    clubs: 'DevC × Hackelite',
    incharge: 'Nishant Mishra',
    format: '24-hour on-campus cryptography and cybersecurity hackathon (+2–4 hrs buffer).',
    teamSize: '2–4',
    duration: '24 hrs (+buffer)',
    footfall: '~150',
    fee: 'Rs. 100 per person',
    desc: 'An intense 24-hour offensive and defensive security hackathon. Build secure architectures, exploit vulnerability vectors, and implement zero-trust protocols.',
    rules: [
      'Use suitable modern cryptographic algorithms.',
      'Adhere to OWASP Top 10 secure coding guidelines.',
      'Judged on cryptographic soundness, execution speed, and overall security posture.'
    ],
    prizes: ['₹10,000', '₹8,000', '₹4,000']
  }
];

const COORDINATORS = {
  coordinator: 'Divyansh Mishra (Technical Board Nominee)',
  coCoordinator: 'Anushka Srivastava (Technical Board Nominee)',
  dates: '31 Oct – 01 Nov 2026',
  venue: 'IIIT Bhagalpur Campus (TBA)'
};

// =============================================================================
// SECTION A: SCROLL-SCRUBBED INFINITE ZOOM TUNNEL & 3D FLOATING CARDS
// =============================================================================

const N = 9;          // 9 keyframes
const LOOPS = 3;      // 3 zoom loops over 700vh
const R = Math.pow(3, 1 / N); // scale multiplier per frame (~1.1298)

const $ = (s, p = document) => p.querySelector(s);
const $$ = (s, p = document) => [...p.querySelectorAll(s)];

const cv = $('#bg');
const cx = cv ? cv.getContext('2d') : null;
const secEvents = $('#events');
const cardsContainer = $('#cards');
const pnEl = $('#pn');
const ptEl = $('#pt');

// Check prefers-reduced-motion
const isReducedMotion = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

// Preload the 9 tunnel frames
const tunnelImgs = [...Array(N)].map((_, i) => {
  const img = new Image();
  img.src = `frames/f_${String(i + 1).padStart(4, '0')}.webp`;
  return img;
});

// Canvas resizing with devicePixelRatio
function resizeCanvas() {
  if (!cv) return;
  const dpr = Math.min(2, window.devicePixelRatio || 1);
  cv.width = window.innerWidth * dpr;
  cv.height = window.innerHeight * dpr;
}
window.addEventListener('resize', resizeCanvas);
resizeCanvas();

// Draw infinite zoom loop
function drawTunnel(p) {
  if (!cx || !cv) return;
  const W = cv.width;
  const H = cv.height;

  if (isReducedMotion) {
    const staticImg = tunnelImgs[0];
    if (staticImg && staticImg.complete) {
      cx.clearRect(0, 0, W, H);
      const k = Math.max(W / (staticImg.naturalWidth || staticImg.width), H / (staticImg.naturalHeight || staticImg.height));
      const w = (staticImg.naturalWidth || staticImg.width) * k;
      const h = (staticImg.naturalHeight || staticImg.height) * k;
      cx.drawImage(staticImg, (W - w) / 2, (H - h) / 2, w, h);
    }
    return;
  }

  const f = p * LOOPS * N;
  const i = Math.floor(f);
  const t = f - i;
  const imgA = tunnelImgs[i % N];
  const imgB = tunnelImgs[(i + 1) % N];

  if (!imgA || !imgB || !imgA.complete || !imgB.complete) return;

  cx.clearRect(0, 0, W, H);

  // Cover fit centered based on real natural dimensions
  const drawLayer = (im, scale, alpha) => {
    const iw = im.naturalWidth || im.width;
    const ih = im.naturalHeight || im.height;
    if (!iw || !ih) return;
    const k = Math.max(W / iw, H / ih) * scale;
    const w = iw * k;
    const h = ih * k;
    cx.globalAlpha = alpha;
    cx.drawImage(im, (W - w) / 2, (H - h) / 2, w, h);
  };

  // Base frame at (1 + (R-1)*t) with alpha 1
  drawLayer(imgA, 1 + (R - 1) * t, 1);
  // Next looping frame at (1 + (R-1)*t) / R with alpha t
  drawLayer(imgB, (1 + (R - 1) * t) / R, t);
  cx.globalAlpha = 1;
}

// Generate the 6 portrait cards
let eventCards = [];
if (cardsContainer) {
  cardsContainer.innerHTML = '';
  eventCards = EVENTS.map((ev, i) => {
    const card = document.createElement('div');
    card.className = 'ec';
    card.tabIndex = 0;
    card.setAttribute('role', 'button');
    card.setAttribute('aria-label', `View details for ${ev.name}`);

    card.innerHTML = `
      <div class="top">
        <span>EVT // 0${i + 1}</span>
        <span class="y">ARENA</span>
      </div>
      <div class="art">
        <span>${ev.code}</span>
      </div>
      <h3>${ev.name}</h3>
      <p>${ev.tagline}</p>
      <div class="ft">
        <span>WHEN: TBA</span>
        <span>WHERE: TBA</span>
      </div>
    `;

    card.addEventListener('click', () => openDrawer(i));
    card.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        openDrawer(i);
      }
    });

    cardsContainer.appendChild(card);
    return card;
  });
}

// Animation loop with inertia
let curProgress = 0;
function tick() {
  if (secEvents && !isReducedMotion) {
    const rect = secEvents.getBoundingClientRect();
    const totalDist = secEvents.offsetHeight - window.innerHeight;
    const targetProgress = totalDist > 0 ? Math.min(0.999, Math.max(0, -rect.top / totalDist)) : 0;

    // Smooth inertia
    curProgress += (targetProgress - curProgress) * 0.12;
    drawTunnel(curProgress);

    // Position floating cards in 3D perspective
    const pos = curProgress * (EVENTS.length - 1);
    const baseX = Math.min(250, window.innerWidth * 0.22);
    let activeIdx = 0;

    eventCards.forEach((card, idx) => {
      const d = idx - pos;
      const side = idx % 2 === 1 ? 1 : -1;
      const opacity = d < 0 ? Math.max(0, 1 + d * 1.6) : Math.max(0, 1 - d * 0.2);
      const blur = Math.max(0, d) * 0.9;

      card.style.transform = `translate3d(calc(-50% + ${side * baseX}px), -46%, ${-d * 420}px)`;
      card.style.opacity = opacity.toFixed(3);
      card.style.filter = blur > 0.05 ? `blur(${blur.toFixed(1)}px)` : 'none';
      card.style.zIndex = 100 - Math.round(d * 10);
      card.style.pointerEvents = Math.abs(d) < 0.6 ? 'auto' : 'none';

      const isActive = Math.abs(d) < 0.5;
      card.classList.toggle('on', isActive);
      if (isActive) {
        activeIdx = idx;
      }
    });

    if (pnEl) pnEl.textContent = `0${activeIdx + 1} / 0${EVENTS.length}`;
    if (ptEl && EVENTS[activeIdx]) ptEl.textContent = EVENTS[activeIdx].name;
  }

  requestAnimationFrame(tick);
}

if (!isReducedMotion) {
  requestAnimationFrame(tick);
} else {
  drawTunnel(0);
}

// =============================================================================
// SECTION B: COMPETITIONS HONEYCOMB GRID & CATEGORY FILTERING
// =============================================================================

const CATEGORIES = [
  { id: 'ALL', label: '00 ALL', filter: () => true },
  { id: 'SOFTWARE', label: '01 SOFTWARE & AI', filter: (e) => e.category === 'Software & AI' },
  { id: 'ROBOTICS', label: '02 ROBOTICS', filter: (e) => e.category === 'Robotics' },
  { id: 'MARKETS', label: '03 MARKETS', filter: (e) => e.category === 'Markets' }
];

let activeCategory = 'ALL';

function renderCompetitions() {
  const sidebarEl = $('#comp-sidebar-list');
  const honeycombEl = $('#comp-honeycomb');
  const titleEl = $('#comp-active-title');
  const countEl = $('#comp-arenas-count');

  if (!sidebarEl || !honeycombEl) return;

  // Render Sidebar filter buttons with live counts
  sidebarEl.innerHTML = '';
  CATEGORIES.forEach((cat) => {
    const count = EVENTS.filter(cat.filter).length;
    const btn = document.createElement('button');
    btn.className = `comp-filter-btn ${activeCategory === cat.id ? 'active' : ''}`;
    btn.type = 'button';
    btn.setAttribute('aria-pressed', activeCategory === cat.id ? 'true' : 'false');
    btn.innerHTML = `<span>${cat.label}</span> <span class="badge">(${count})</span>`;

    btn.addEventListener('click', () => {
      if (activeCategory === cat.id) return;
      activeCategory = cat.id;
      renderCompetitions();
    });

    sidebarEl.appendChild(btn);
  });

  // Filtered Events
  const currentCatObj = CATEGORIES.find((c) => c.id === activeCategory);
  const filteredEvents = EVENTS.filter(currentCatObj ? currentCatObj.filter : () => true);

  // Update Section Header
  if (titleEl) {
    titleEl.textContent = activeCategory === 'ALL' ? 'ALL COMPETITIONS' : (currentCatObj ? currentCatObj.label.slice(3) : 'COMPETITIONS');
  }
  if (countEl) {
    countEl.textContent = `0${filteredEvents.length} ARENAS`;
  }

  // Group events into honeycomb rows: alternating 3, 2, 3, 2...
  honeycombEl.innerHTML = '';
  const rows = [];
  let currRow = [];
  let targetRowSize = 3;

  filteredEvents.forEach((ev) => {
    currRow.push(ev);
    if (currRow.length === targetRowSize) {
      rows.push(currRow);
      currRow = [];
      targetRowSize = targetRowSize === 3 ? 2 : 3;
    }
  });
  if (currRow.length > 0) {
    rows.push(currRow);
  }

  // Render Honeycomb rows with staggered pop animation
  let tileIndex = 0;
  rows.forEach((rowEvents, rIdx) => {
    const rowEl = document.createElement('div');
    rowEl.className = `hex-row ${rIdx > 0 ? 'hex-overlap' : ''}`;

    rowEvents.forEach((ev) => {
      const tileWrap = document.createElement('div');
      tileWrap.className = 'hex-tile-wrap pop-in';
      tileWrap.style.animationDelay = `${tileIndex * 70}ms`;
      tileWrap.tabIndex = 0;
      tileWrap.setAttribute('role', 'button');
      tileWrap.setAttribute('aria-label', `View details for ${ev.name}`);

      tileWrap.innerHTML = `
        <div class="hex-border">
          <div class="hex-inner">
            <span class="hex-code">${ev.code}</span>
            <h3 class="hex-title">${ev.name}</h3>
            <span class="hex-cat">${ev.category}</span>
          </div>
        </div>
      `;

      const evOriginalIndex = EVENTS.findIndex((x) => x.id === ev.id);
      tileWrap.addEventListener('click', () => openDrawer(evOriginalIndex));
      tileWrap.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          openDrawer(evOriginalIndex);
        }
      });

      rowEl.appendChild(tileWrap);
      tileIndex++;
    });

    honeycombEl.appendChild(rowEl);
  });
}

// Initial Competitions render
renderCompetitions();

// =============================================================================
// SHARED DETAIL DRAWER (Both Section A and Section B)
// =============================================================================

const drawerEl = $('#dr');
const overlayEl = $('#ov');

function openDrawer(index) {
  const ev = EVENTS[index];
  if (!ev || !drawerEl) return;

  const rulesListHtml = ev.rules.map((r) => `<li><span class="bullet">◆</span><span>${r}</span></li>`).join('');

  drawerEl.innerHTML = `
    <div class="dr-header">
      <button type="button" class="dr-close-btn" id="dr-close-btn" aria-label="Close drawer">
        CLOSE ✕
      </button>
    </div>

    <div class="dr-body">
      <div class="dr-eyebrow">▍${ev.category.toUpperCase()} // EVT 0${ev.id}</div>
      <h2 class="dr-title">${ev.name}</h2>
      <p class="dr-tagline">“${ev.tagline}”</p>
      
      <p class="dr-desc">${ev.desc}</p>

      <div class="dr-section-label">ARENA PARAMETERS</div>
      <dl class="dr-dl">
        <dt>CLUB</dt>
        <dd>${ev.clubs}</dd>
        <dt>INCHARGE</dt>
        <dd>${ev.incharge}</dd>
        <dt>FORMAT</dt>
        <dd>${ev.format}</dd>
        <dt>TEAM SIZE</dt>
        <dd>${ev.teamSize}</dd>
        <dt>DURATION</dt>
        <dd>${ev.duration}</dd>
        <dt>FOOTFALL</dt>
        <dd>${ev.footfall}</dd>
        <dt>REG. FEE</dt>
        <dd class="y-bold">${ev.fee}</dd>
      </dl>

      <div class="dr-section-label">BOUNTIES & PRIZES</div>
      <div class="dr-prizes">
        <div class="prize-card gold">
          <span class="prize-rank">1ST PLACE</span>
          <b class="prize-amt">${ev.prizes[0]}</b>
        </div>
        <div class="prize-card silver">
          <span class="prize-rank">2ND PLACE</span>
          <b class="prize-amt">${ev.prizes[1]}</b>
        </div>
        <div class="prize-card bronze">
          <span class="prize-rank">3RD PLACE</span>
          <b class="prize-amt">${ev.prizes[2]}</b>
        </div>
      </div>

      <div class="dr-section-label">PROTOCOLS & DIRECTIVES</div>
      <ul class="dr-rules">
        ${rulesListHtml}
      </ul>

      <div class="dr-coordinators">
        <div><b>COORDINATOR:</b> ${COORDINATORS.coordinator}</div>
        <div><b>CO-COORDINATOR:</b> ${COORDINATORS.coCoordinator}</div>
      </div>

      <div class="dr-cta-row">
        <button type="button" class="dr-reg-btn" onclick="alert('Registration for ${ev.name} will open shortly. Dates: 31 Oct - 01 Nov 2026.')">
          REGISTER NOW — ${ev.fee}
        </button>
      </div>
    </div>
  `;

  // Focus trap & accessible close
  const closeBtn = $('#dr-close-btn', drawerEl);
  if (closeBtn) closeBtn.addEventListener('click', closeDrawer);

  document.body.classList.add('drawer-open');
  if (overlayEl) overlayEl.setAttribute('aria-hidden', 'false');
  drawerEl.setAttribute('aria-hidden', 'false');
}

function closeDrawer() {
  document.body.classList.remove('drawer-open');
  if (overlayEl) overlayEl.setAttribute('aria-hidden', 'true');
  if (drawerEl) drawerEl.setAttribute('aria-hidden', 'true');
}

if (overlayEl) {
  overlayEl.addEventListener('click', closeDrawer);
}

document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && document.body.classList.contains('drawer-open')) {
    closeDrawer();
  }
});
