import { KOI_CONFIG as C } from './config.js'

/* ───────────────────────── utilidades ───────────────────────── */
const TAU = Math.PI * 2
const clamp = (v, a, b) => Math.min(b, Math.max(a, v))
const lerp = (a, b, t) => a + (b - a) * t
const smooth = (v, a, b) => { const t = clamp((v - a) / (b - a), 0, 1); return t * t * (3 - 2 * t) }
const lerpAngle = (a, b, t) => { const d = ((b - a + Math.PI) % TAU + TAU) % TAU - Math.PI; return a + d * t }
const ease = (cur, target, dt, rate) => cur + (target - cur) * (1 - Math.exp(-dt * rate))

/* '#rrggbb' | 'rgb(...)' → 'rgba(r,g,b,a)' */
function rgba(color, a) {
  if (!color) return `rgba(0,0,0,${a})`
  if (color[0] === '#') {
    const h = color.length === 4 ? color.slice(1).split('').map(c => c + c).join('') : color.slice(1, 7)
    const n = parseInt(h, 16)
    return `rgba(${(n >> 16) & 255},${(n >> 8) & 255},${n & 255},${a})`
  }
  const m = color.match(/[\d.]+/g) || [0, 0, 0]
  return `rgba(${m[0]},${m[1]},${m[2]},${a})`
}

/* Lemniscata de Bernoulli centrada en 0, semiancho `a`. */
function lemniscate(a, t) {
  const s = Math.sin(t), c = Math.cos(t), d = 1 + s * s
  return { x: (a * c) / d, y: (a * s * c) / d }
}

const DEFAULT_PALETTE = {
  green: '#16C784', green2: '#0B8F5A', glow: '#39E6A1',
  white: '#F5F7F6', whiteShade: '#C9D1CD', gray: '#A8B3AF',
  ink: '#F5F7F6', outline: 'rgba(255,255,255,0.08)',
}

function makeFish(kind, sgn) {
  return { kind, sgn, x: 0, y: 0, px: 0, py: 0, heading: sgn > 0 ? 0 : Math.PI, undul: Math.random() * TAU, bank: 0, speed: 0, trail: [], emit: 0 }
}

/* ───────────────────────── motor ───────────────────────── */
export class KoiEngine {
  constructor(canvas) {
    this.canvas = canvas
    this.ctx = canvas.getContext('2d', { alpha: true })
    this.w = 0; this.h = 0; this.dpr = 1; this.mobile = false
    this.a = 200; this.cx = 0; this.cy = 0; this.L = 70; this.lane = 20

    this.time = 0
    this.theta = 0.6            // fase maestra sobre el infinito
    this.P = 0; this.Pt = 0      // progreso narrativo (suavizado / objetivo)
    this.R = 0                  // fracción del infinito revelada
    this.met = false; this.nearCenter = false; this.thetaMeet = Math.PI * 1.5
    this.burst = 0; this.pulse = 0
    this.logo = 0; this.logoTimer = 0; this.slow = 1
    this.capIdx = 0; this.capAlpha = 0
    this.waves = [0, 0.5]

    this.particles = []
    this.palette = { ...DEFAULT_PALETTE }
    this.texts = { captions: [], brand: 'Aikata', kanji: '相方', tagline: 'SIEMPRE CONTIGO' }
    this.reduced = false

    this.fish = [makeFish('green', -1), makeFish('white', 1)]
  }

  /* ── API pública ── */
  setPalette(p) { this.palette = { ...DEFAULT_PALETTE, ...Object.fromEntries(Object.entries(p).filter(([, v]) => v)) } }
  setTexts(t) { this.texts = { ...this.texts, ...t } }
  setScrollTarget(frac) { this.Pt = clamp(frac, 0, 1) }
  setReduced(v) { this.reduced = v }

  resize(w, h, dpr) {
    this.w = w; this.h = h; this.dpr = dpr
    this.canvas.width = Math.round(w * dpr)
    this.canvas.height = Math.round(h * dpr)
    this.canvas.style.width = `${w}px`
    this.canvas.style.height = `${h}px`
    this.ctx.setTransform(dpr, 0, 0, dpr, 0, 0)

    this.mobile = w < 760
    const S = C.size
    this.a = this.mobile ? w * S.mobileA : Math.min(w * S.desktopA, S.maxA)
    this.cx = w * (this.mobile ? S.mobileCenterX : S.centerX)
    this.cy = h * (this.mobile ? S.mobileCenterY : S.centerY)
    this.L = this.a * S.fishLength
    this.lane = this.L * S.lane

    /* Puntos del trazo (centro, sin carril) */
    const N = 320
    this.path = Array.from({ length: N + 1 }, (_, i) => {
      const t = (i / N) * TAU
      const p = lemniscate(this.a, t)
      return { t, x: this.cx + p.x, y: this.cy + p.y }
    })
    this.nodes = Array.from({ length: 6 }, (_, k) => {
      const t = Math.PI / 2 + (k * TAU) / 6
      const p = lemniscate(this.a, t)
      return { t, x: this.cx + p.x, y: this.cy + p.y }
    })
  }

  /* Render estático para prefers-reduced-motion */
  renderStatic() {
    this.P = 1; this.Pt = 1; this.R = 1; this.met = true; this.logo = 1
    this.theta = 0.35
    this.fish.forEach(f => this.placeFish(f, 1, 0))
    this.fish.forEach(f => { f.heading = f.sgn > 0 ? this.pathHeading(this.theta) : this.pathHeading(this.theta) + Math.PI; f.trail = [] })
    this.particles = []
    this.render()
  }

  /* ── Geometría de los peces ── */
  pathHeading(theta) {
    const p1 = lemniscate(this.a, theta), p2 = lemniscate(this.a, theta + 0.002)
    return Math.atan2(p2.y - p1.y, p2.x - p1.x)
  }

  /** Posición del pez f para la fase actual, mezcla m entre "libre" y "sobre el infinito". */
  placeFish(f, m, dt) {
    const { a, cx, cy, lane, theta } = this
    const base = lemniscate(a, theta)
    const nxt = lemniscate(a, theta + 0.002)
    let tx = nxt.x - base.x, ty = nxt.y - base.y
    const tl = Math.hypot(tx, ty) || 1; tx /= tl; ty /= tl
    /* carril: desplazamiento sobre la normal → se cruzan sin chocar */
    let ox = base.x - ty * lane, oy = base.y + tx * lane
    /* el koi verde es la reflexión puntual del blanco: complementario, cuando uno sube el otro baja */
    if (f.sgn < 0) { ox = -ox; oy = -oy }

    /* posición libre (etapa inicial): cada uno en su orilla, en la franja alta
       del viewport (zona libre del hero), con leve vaivén */
    const hx = -1.08 * a * f.sgn, hy = -0.72 * a + 0.06 * a * f.sgn
    const wx = hx + 0.06 * a * Math.sin(theta * 0.55 + f.sgn), wy = hy + 0.045 * a * Math.sin(theta * 0.9 + 1.3 * f.sgn)

    f.px = f.x; f.py = f.y
    f.x = cx + lerp(wx, ox, m)
    f.y = cy + lerp(wy, oy, m)

    if (dt > 0) {
      const dx = f.x - f.px, dy = f.y - f.py
      const dist = Math.hypot(dx, dy)
      const motionH = dist > 0.05 ? Math.atan2(dy, dx) : f.heading
      const idleH = Math.atan2(cy - (cy + wy), cx - (cx + wx)) + 0.16 * Math.sin(theta * 1.3 + f.sgn)
      const target = lerpAngle(idleH, motionH, smooth(m, 0.12, 0.6))
      f.heading = lerpAngle(f.heading, target, 1 - Math.exp(-dt * 7))
      f.speed = dist / dt
      f.undul += (dist / this.L) * TAU * 0.85 + dt * 1.7
      f.bank = ease(f.bank, clamp(dy / (dt * this.L * 5), -1, 1), dt, 4)

      const maxTrail = this.mobile ? C.trail.mobileLength : C.trail.length
      f.trail.push({ x: f.x, y: f.y })
      if (f.trail.length > maxTrail) f.trail.shift()

      /* emisión de partículas desde la cola */
      const cap = this.mobile ? C.particles.mobile : C.particles.desktop
      const rate = (0.25 + 0.75 * m) * (this.mobile ? 6 : 16) * clamp(f.speed / (this.L * 1.6), 0.2, 1.6)
      f.emit += rate * dt
      while (f.emit >= 1 && this.particles.length < cap) {
        f.emit -= 1
        const tailX = f.x - Math.cos(f.heading) * this.L * 0.72
        const tailY = f.y - Math.sin(f.heading) * this.L * 0.72
        this.spawn(tailX, tailY, f.kind === 'green' ? 'green' : 'white', 0.5)
      }
      f.emit = Math.min(f.emit, 1)
    }
  }

  spawn(x, y, kind, energy = 1) {
    const ang = Math.random() * TAU
    const sp = (6 + Math.random() * 22) * energy
    this.particles.push({
      x: x + (Math.random() - 0.5) * 6, y: y + (Math.random() - 0.5) * 6,
      vx: Math.cos(ang) * sp, vy: Math.sin(ang) * sp - 4 * energy,
      life: 0, max: 1.1 + Math.random() * 1.6,
      size: 0.7 + Math.random() * (kind === 'green' ? 1.6 : 1.1),
      kind,
    })
  }

  /* ── Actualización ── */
  update(rawDt) {
    const dt = Math.min(rawDt, 0.05)
    this.time += dt

    this.P = ease(this.P, this.Pt, dt, C.scroll.smoothing)
    const st = C.scroll.stages
    const m = smooth(this.P, st.approachStart, st.onPath)

    /* momento del logo (solo con el infinito completo) */
    let logoTarget = 0
    if (this.P > 0.97) {
      this.logoTimer += dt
      const ph = this.logoTimer % C.logoMoment.every
      logoTarget = ph > C.logoMoment.delay && ph < C.logoMoment.delay + C.logoMoment.duration ? 1 : 0
    } else this.logoTimer = 0
    this.logo = ease(this.logo, logoTarget, dt, 1.4)
    this.slow = lerp(1, C.speed.logo, this.logo)

    const speed = lerp(C.speed.base, C.speed.max, smooth(this.P, 0.45, 1))
    this.theta += dt * speed * this.slow * (1 + C.speed.wobble * Math.sin(this.time * 1.7))

    this.fish.forEach(f => this.placeFish(f, m, dt))

    /* encuentro en el centro */
    const w = this.fish[1]
    const dW = Math.hypot(w.x - this.cx, w.y - this.cy)
    if (m > 0.95) {
      if (dW < this.lane * 2.6 && !this.nearCenter) {
        this.nearCenter = true
        if (!this.met) {
          this.met = true
          const k = Math.round((this.theta - Math.PI / 2) / Math.PI)
          this.thetaMeet = Math.PI / 2 + k * Math.PI
          this.burst = 1
          const n = this.mobile ? C.particles.burst / 2 : C.particles.burst
          for (let i = 0; i < n; i++) this.spawn(this.cx, this.cy, i % 3 ? 'green' : 'white', 1.4)
        } else this.pulse = 1
      }
      if (dW > this.lane * 5) this.nearCenter = false
    }
    this.burst = Math.max(0, this.burst - dt * 0.7)
    this.pulse = Math.max(0, this.pulse - dt * 1.1)

    /* revelado del trazo */
    let Rt = this.met ? smooth(this.P, st.revealStart, st.revealEnd) : 0
    if (this.P > 0.97) Rt = 1
    this.R = ease(this.R, Rt, dt, 0.9)

    /* partículas */
    for (let i = this.particles.length - 1; i >= 0; i--) {
      const p = this.particles[i]
      p.life += dt
      if (p.life >= p.max) { this.particles.splice(i, 1); continue }
      p.vx *= 1 - dt * 1.4; p.vy = p.vy * (1 - dt * 1.4) - 3 * dt
      p.x += p.vx * dt; p.y += p.vy * dt
    }

    /* ondas */
    this.waves = this.waves.map(v => (v + dt * 0.07) % 1)

    /* leyendas por etapa */
    const idx = this.P < st.approachStart ? 0 : this.P < st.onPath - 0.06 ? 1 : this.P < 0.62 ? 2 : this.P < 0.82 ? 3 : 4
    if (idx !== this.capIdx) {
      this.capAlpha = Math.max(0, this.capAlpha - dt * 2.2)
      if (this.capAlpha === 0) this.capIdx = idx
    } else this.capAlpha = Math.min(1, this.capAlpha + dt * 1.2)
  }

  /* ── Render ── */
  render() {
    const { ctx, w, h } = this
    ctx.clearRect(0, 0, w, h)
    this.drawWaves()
    this.drawPath()
    this.drawParticles()
    this.fish.forEach(f => this.drawTrail(f))
    this.fish.forEach(f => this.drawFish(f))
    this.drawText()
  }

  drawWaves() {
    if (this.P < 0.4) return
    const { ctx, cx, cy, a } = this
    const k = smooth(this.P, 0.4, 0.8)
    ctx.lineWidth = 1
    for (const v of this.waves) {
      const r = a * (0.55 + 1.7 * v)
      ctx.beginPath()
      ctx.ellipse(cx, cy, r, r * 0.62, 0, 0, TAU)
      ctx.strokeStyle = rgba(this.palette.green, 0.05 * (1 - v) * k)
      ctx.stroke()
    }
  }

  drawPath() {
    if (this.R <= 0.003) return
    const { ctx, path, palette: P } = this
    const span = this.R * Math.PI
    const t0 = this.thetaMeet - span, t1 = this.thetaMeet + span

    /* subconjunto de puntos dentro del rango revelado (con wrap) */
    const pts = []
    const steps = Math.max(8, Math.floor(path.length * this.R))
    for (let i = 0; i <= steps; i++) {
      const t = t0 + ((t1 - t0) * i) / steps
      const p = lemniscate(this.a, t)
      pts.push({ x: this.cx + p.x, y: this.cy + p.y, t })
    }
    const trace = (lw, color) => {
      ctx.beginPath()
      pts.forEach((p, i) => (i ? ctx.lineTo(p.x, p.y) : ctx.moveTo(p.x, p.y)))
      ctx.lineWidth = lw; ctx.strokeStyle = color; ctx.lineCap = 'round'; ctx.lineJoin = 'round'
      ctx.stroke()
    }
    /* halo suave */
    trace(this.mobile ? 5 : 9, rgba(P.green, 0.06 + 0.08 * this.burst + 0.04 * this.logo))
    /* núcleo fino */
    trace(1.2, rgba(P.glow, 0.34 + 0.18 * this.pulse + 0.2 * this.logo))

    /* extremos del trazo en crecimiento: puntos luminosos */
    if (this.R < 0.98) {
      for (const p of [pts[0], pts[pts.length - 1]]) {
        ctx.beginPath(); ctx.arc(p.x, p.y, 2.2, 0, TAU); ctx.fillStyle = rgba(P.glow, 0.9); ctx.fill()
        ctx.beginPath(); ctx.arc(p.x, p.y, 7, 0, TAU); ctx.fillStyle = rgba(P.glow, 0.14); ctx.fill()
      }
    }

    /* trazos que aparecen y desaparecen recorriendo el símbolo */
    const dashes = this.mobile ? 2 : 3
    for (let k = 0; k < dashes; k++) {
      const u = (this.time * 0.11 + k / dashes) % 1
      const start = t0 + u * (t1 - t0)
      const len = 0.05 * TAU * this.R
      const fade = Math.sin(u * Math.PI)
      ctx.beginPath()
      for (let i = 0; i <= 10; i++) {
        const t = start + (len * i) / 10
        if (t > t1) break
        const p = lemniscate(this.a, t)
        i ? ctx.lineTo(this.cx + p.x, this.cy + p.y) : ctx.moveTo(this.cx + p.x, this.cy + p.y)
      }
      ctx.lineWidth = 1.6; ctx.strokeStyle = rgba(P.glow, 0.55 * fade * this.R); ctx.stroke()
    }

    /* nodos */
    for (let k = 0; k < this.nodes.length; k++) {
      const n = this.nodes[k]
      const d = Math.abs((((n.t - this.thetaMeet) % TAU) + TAU + Math.PI) % TAU - Math.PI)
      if (d > span) continue
      const puls = 0.5 + 0.5 * Math.sin(this.time * 1.8 + k * 1.1)
      ctx.beginPath(); ctx.arc(n.x, n.y, 6, 0, TAU); ctx.fillStyle = rgba(P.green, 0.06 + 0.08 * puls); ctx.fill()
      ctx.beginPath(); ctx.arc(n.x, n.y, 1.7, 0, TAU); ctx.fillStyle = rgba(P.glow, 0.5 + 0.35 * puls); ctx.fill()
    }
  }

  drawParticles() {
    const { ctx, palette: P } = this
    for (const p of this.particles) {
      const k = p.life / p.max
      const alpha = Math.sin(k * Math.PI) * (p.kind === 'green' ? 0.75 : 0.5)
      ctx.beginPath()
      ctx.arc(p.x, p.y, p.size * (1 - 0.4 * k), 0, TAU)
      ctx.fillStyle = rgba(p.kind === 'green' ? P.glow : P.white, alpha)
      ctx.fill()
    }
  }

  drawTrail(f) {
    const tr = f.trail
    if (tr.length < 3) return
    const { ctx, palette: P } = this
    const color = f.kind === 'green' ? P.glow : P.white
    const n = tr.length
    ctx.lineCap = 'round'
    for (let i = 1; i < n; i++) {
      const k = i / n
      ctx.beginPath()
      ctx.moveTo(tr[i - 1].x, tr[i - 1].y)
      ctx.lineTo(tr[i].x, tr[i].y)
      ctx.lineWidth = 0.4 + 2.2 * k
      ctx.strokeStyle = rgba(color, k * k * (f.kind === 'green' ? 0.30 : 0.16))
      ctx.stroke()
    }
  }

  drawFish(f) {
    const { ctx, L, palette: P } = this
    const green = f.kind === 'green'
    ctx.save()
    ctx.translate(f.x, f.y)
    ctx.rotate(f.heading)
    ctx.scale(1, 1 - 0.16 * Math.abs(f.bank)) // inclinación al subir/bajar

    /* resplandor bajo el cuerpo */
    const g = ctx.createRadialGradient(-0.3 * L, 0, 0, -0.3 * L, 0, 0.75 * L)
    g.addColorStop(0, rgba(green ? P.glow : P.white, green ? 0.13 : 0.07))
    g.addColorStop(1, rgba(green ? P.glow : P.white, 0))
    ctx.fillStyle = g
    ctx.beginPath(); ctx.ellipse(-0.3 * L, 0, 0.8 * L, 0.42 * L, 0, 0, TAU); ctx.fill()

    /* columna: ondulación creciente hacia la cola */
    const N = 18
    const spine = []
    for (let i = 0; i <= N; i++) {
      const s = i / N
      const x = 0.05 * L - s * L * 0.72
      const amp = L * 0.075 * Math.pow(s, 1.7)
      const y = amp * Math.sin(f.undul - s * 4.4)
      let wdt = L * 0.185 * Math.pow(Math.sin(Math.PI * (0.06 + 0.94 * Math.pow(s, 0.9))), 0.62) * (1 - 0.48 * s)
      wdt = Math.max(wdt, L * 0.03)
      spine.push({ x, y, w: wdt })
    }
    const tail = spine[N]
    const wag = Math.sin(f.undul - 4.4 - 0.7)

    /* aletas pectorales */
    const pf = spine[5]
    const finAng = 0.95 + 0.14 * Math.sin(f.undul * 1.2)
    ctx.fillStyle = rgba(green ? P.green : P.whiteShade, 0.62)
    for (const side of [-1, 1]) {
      ctx.save()
      ctx.translate(pf.x, pf.y + side * pf.w * 0.95)
      ctx.rotate(side * finAng)
      ctx.beginPath(); ctx.ellipse(-L * 0.06, 0, L * 0.10, L * 0.035, 0, 0, TAU); ctx.fill()
      ctx.restore()
    }

    /* cola bilobulada */
    ctx.beginPath()
    ctx.moveTo(tail.x, tail.y - tail.w)
    ctx.quadraticCurveTo(tail.x - 0.16 * L, tail.y - 0.14 * L + wag * 0.06 * L, tail.x - 0.33 * L, tail.y - 0.19 * L + wag * 0.1 * L)
    ctx.quadraticCurveTo(tail.x - 0.20 * L, tail.y + wag * 0.05 * L, tail.x - 0.14 * L, tail.y + wag * 0.06 * L)
    ctx.quadraticCurveTo(tail.x - 0.20 * L, tail.y + wag * 0.05 * L, tail.x - 0.33 * L, tail.y + 0.19 * L + wag * 0.1 * L)
    ctx.quadraticCurveTo(tail.x - 0.16 * L, tail.y + 0.14 * L + wag * 0.06 * L, tail.x, tail.y + tail.w)
    ctx.closePath()
    ctx.fillStyle = rgba(green ? P.green : P.whiteShade, 0.72)
    ctx.fill()

    /* cuerpo */
    const body = new Path2D()
    body.moveTo(0.08 * L, 0)
    spine.forEach(p => body.lineTo(p.x, p.y - p.w))
    for (let i = N; i >= 0; i--) body.lineTo(spine[i].x, spine[i].y + spine[i].w)
    body.closePath()
    const bg = ctx.createLinearGradient(0, -0.2 * L, 0, 0.2 * L)
    if (green) { bg.addColorStop(0, P.glow); bg.addColorStop(0.45, P.green); bg.addColorStop(1, P.green2) }
    else { bg.addColorStop(0, P.white); bg.addColorStop(0.55, P.white); bg.addColorStop(1, P.whiteShade) }
    ctx.fillStyle = bg
    ctx.fill(body)
    ctx.lineWidth = 1
    ctx.strokeStyle = P.outline
    ctx.stroke(body)

    /* marcas y reflejos (recortados al cuerpo) */
    ctx.save()
    ctx.clip(body)
    if (green) {
      ctx.fillStyle = rgba(P.green2, 0.55)
      ctx.beginPath(); ctx.ellipse(-0.38 * L, 0.03 * L, 0.17 * L, 0.055 * L, 0.1, 0, TAU); ctx.fill()
      ctx.strokeStyle = rgba('#ffffff', 0.32); ctx.lineWidth = 1.1
      ctx.beginPath()
      for (let i = 2; i <= 10; i++) { const p = spine[i]; i === 2 ? ctx.moveTo(p.x, p.y - p.w * 0.45) : ctx.lineTo(p.x, p.y - p.w * 0.45) }
      ctx.stroke()
      ctx.fillStyle = rgba('#ffffff', 0.6)
      ctx.beginPath(); ctx.arc(-0.09 * L, -0.06 * L, L * 0.017, 0, TAU); ctx.fill()
    } else {
      ctx.fillStyle = rgba(P.gray, 0.42)
      ctx.beginPath(); ctx.ellipse(-0.30 * L, 0.025 * L, 0.15 * L, 0.06 * L, -0.08, 0, TAU); ctx.fill()
      ctx.fillStyle = 'rgba(52,62,58,0.55)'
      ctx.beginPath(); ctx.ellipse(-0.10 * L, -0.055 * L, 0.045 * L, 0.03 * L, 0.3, 0, TAU); ctx.fill()
      ctx.fillStyle = 'rgba(52,62,58,0.45)'
      ctx.beginPath(); ctx.ellipse(-0.52 * L, -0.02 * L, 0.05 * L, 0.028 * L, 0, 0, TAU); ctx.fill()
      ctx.strokeStyle = rgba('#ffffff', 0.5); ctx.lineWidth = 1
      ctx.beginPath()
      for (let i = 1; i <= 8; i++) { const p = spine[i]; i === 1 ? ctx.moveTo(p.x, p.y - p.w * 0.5) : ctx.lineTo(p.x, p.y - p.w * 0.5) }
      ctx.stroke()
    }
    /* línea dorsal */
    ctx.strokeStyle = 'rgba(0,0,0,0.14)'; ctx.lineWidth = 0.9
    ctx.beginPath()
    for (let i = 4; i <= 13; i++) { const p = spine[i]; i === 4 ? ctx.moveTo(p.x, p.y) : ctx.lineTo(p.x, p.y) }
    ctx.stroke()
    ctx.restore()

    /* ojos */
    const eye = spine[2]
    ctx.fillStyle = 'rgba(8,16,13,0.9)'
    for (const side of [-1, 1]) { ctx.beginPath(); ctx.arc(eye.x + 0.02 * L, eye.y + side * eye.w * 0.55, L * 0.014, 0, TAU); ctx.fill() }

    ctx.restore()
  }

  drawText() {
    const { ctx, cx, cy, a, palette: P } = this
    const baseY = cy + a * 0.36 + (this.mobile ? 34 : 46)
    ctx.textAlign = 'center'
    ctx.textBaseline = 'middle'
    const spaced = (txt, size, weight, family, color, y, spacing) => {
      ctx.font = `${weight} ${size}px ${family}`
      ctx.fillStyle = color
      if ('letterSpacing' in ctx) { ctx.letterSpacing = spacing; ctx.fillText(txt, cx, y); ctx.letterSpacing = '0px' }
      else ctx.fillText(txt.split('').join(' '), cx, y)
    }

    /* leyendas de etapa */
    if (C.captions && this.P < 0.97 && this.texts.captions.length) {
      const alpha = this.capAlpha * (1 - smooth(this.P, 0.9, 0.97)) * 0.6
      if (alpha > 0.01) {
        const txt = (this.texts.captions[this.capIdx] || '').toUpperCase()
        spaced(txt, this.mobile ? 9.5 : 11, 500, "'Geist Mono', ui-monospace, monospace", rgba(P.gray, alpha), baseY, '0.26em')
      }
    }

    /* momento del logo */
    if (this.logo > 0.01) {
      const al = this.logo * 0.9
      ctx.font = `700 ${this.mobile ? 24 : 30}px Geist, system-ui, sans-serif`
      ctx.fillStyle = rgba(P.ink, al)
      ctx.fillText(this.texts.brand, cx, baseY - 6)
      ctx.font = `500 ${this.mobile ? 11 : 13}px 'Noto Sans JP', 'Yu Gothic', sans-serif`
      ctx.fillStyle = rgba(P.gray, al * 0.9)
      ctx.fillText(this.texts.kanji, cx, baseY + (this.mobile ? 16 : 20))
      spaced(this.texts.tagline, this.mobile ? 9 : 10, 500, "'Geist Mono', ui-monospace, monospace", rgba(P.green, al), baseY + (this.mobile ? 36 : 44), '0.32em')
    }
  }
}
