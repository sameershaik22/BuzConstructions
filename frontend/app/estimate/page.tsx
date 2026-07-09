'use client'
import { useState } from 'react'
import Link from 'next/link'
import {
  ArrowRight, ArrowLeft, CheckCircle, Calculator,
  DollarSign,
} from 'lucide-react'


const API = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000'

/* ──────────────────────────────────────────────────────────────
   PRICING DATA
   Formula:  base_rate × sqft × size_modifier × quality_modifier × timeline_modifier
   Low = result × 0.88  |  High = result × 1.18
   base_rate is per-sq-ft cost in CAD based on Ontario market averages
   ────────────────────────────────────────────────────────────── */
const services = [
  { id: 'commercial',  label: 'Commercial Construction', icon: '🏢', desc: 'Office, retail, industrial, restaurant', baseRate: 250 },
  { id: 'residential', label: 'Custom Home Build',       icon: '🏠', desc: 'New custom homes, additions',           baseRate: 280 },
  { id: 'renovation',  label: 'Renovation',              icon: '🔨', desc: 'Kitchen, bathroom, whole-home',         baseRate: 200 },
  { id: 'pm',          label: 'Project Management',      icon: '📋', desc: "Owner's rep, CM services",              baseRate: 0   },
  { id: 'designbuild', label: 'Design-Build',            icon: '✏️', desc: 'Integrated design + construction',      baseRate: 300 },
]
const sizeOptions = [
  { id: 'xs', label: 'Under 1,000 sq ft',     sqft: 800,   modifier: 1.15 },
  { id: 'sm', label: '1,000 – 3,000 sq ft',  sqft: 2000,  modifier: 1.00 },
  { id: 'md', label: '3,000 – 8,000 sq ft',  sqft: 5500,  modifier: 0.95 },
  { id: 'lg', label: '8,000 – 20,000 sq ft', sqft: 14000, modifier: 0.90 },
  { id: 'xl', label: '20,000 sq ft +',        sqft: 30000, modifier: 0.85 },
]
const qualityOptions = [
  { id: 'standard', label: 'Standard', stars: '⭐',     desc: 'Quality materials, mid-range finishes', modifier: 1.00 },
  { id: 'premium',  label: 'Premium',  stars: '⭐⭐',   desc: 'High-end materials, designer finishes', modifier: 1.35 },
  { id: 'luxury',   label: 'Luxury',   stars: '⭐⭐⭐', desc: 'Top-tier, fully custom everything',      modifier: 1.75 },
]
const timelineOptions = [
  { id: 'flexible',    label: 'Flexible',    desc: 'No rush — best value pricing',       modifier: 1.00 },
  { id: 'standard',    label: 'Standard',    desc: 'Normal construction schedule',        modifier: 1.00 },
  { id: 'accelerated', label: 'Accelerated', desc: 'Faster completion — premium rate',    modifier: 1.18 },
]

function fmt(n: number) {
  return new Intl.NumberFormat('en-CA', { style: 'currency', currency: 'CAD', maximumFractionDigits: 0 }).format(n)
}

type Sel = {
  service: string; size: string; quality: string; timeline: string
  location: string; name: string; email: string; phone: string
}
type Snap = { sel: Sel; low: number; high: number } | null

function calcEst(s: Sel) {
  const svc = services.find(x => x.id === s.service)
  const sz  = sizeOptions.find(x => x.id === s.size)
  const ql  = qualityOptions.find(x => x.id === s.quality)
  const tl  = timelineOptions.find(x => x.id === s.timeline)
  if (!svc || !sz || !ql || !tl) return { low: 0, high: 0 }
  if (svc.id === 'pm') return { low: 80000, high: 300000 }
  const base = svc.baseRate * sz.sqft * sz.modifier * ql.modifier * tl.modifier
  return { low: Math.round(base * 0.88), high: Math.round(base * 1.18) }
}

const STEPS = ['Service', 'Project Size', 'Quality', 'Timeline', 'Your Details', 'Estimate']

export default function EstimatorPage() {
  const [step, setStep]           = useState(0)
  const [sel, setSel]             = useState<Sel>({ service: '', size: '', quality: '', timeline: '', location: '', name: '', email: '', phone: '' })
  const [snap, setSnap]           = useState<Snap>(null)
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading]     = useState(false)
  const [error, setError]         = useState('')

  const handleSubmit = async (frozen: Sel) => {
    setLoading(true); setError(''); setSubmitted(false)
    const est  = calcEst(frozen)
    const svc  = services.find(x => x.id === frozen.service)
    const sz   = sizeOptions.find(x => x.id === frozen.size)
    const ql   = qualityOptions.find(x => x.id === frozen.quality)
    const tl   = timelineOptions.find(x => x.id === frozen.timeline)
    setSnap({ sel: frozen, low: est.low, high: est.high })
    try {
      const res = await fetch(`${API}/api/leads`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          form_type: 'estimate_calculator',
          name: frozen.name, email: frozen.email, phone: frozen.phone,
          service_type: svc?.label,
          message: `Estimate Calculator: ${svc?.label} | ${sz?.label} | ${ql?.label} quality | ${tl?.label} timeline | ${frozen.location} | Estimate: ${fmt(est.low)} – ${fmt(est.high)}`,
          budget_range: `${fmt(est.low)} – ${fmt(est.high)}`,
        }),
      })
      if (!res.ok) throw new Error('Server error')
      if (typeof window !== 'undefined' && (window as any).gtag)
        (window as any).gtag('event', 'estimate_completed', { event_category: 'lead' })
      setSubmitted(true)
    } catch {
      setError('Could not send your copy by email — your estimate is shown below.')
    } finally { setLoading(false) }
  }

  const snapSvc = snap ? services.find(x => x.id === snap.sel.service) : null
  const snapSz  = snap ? sizeOptions.find(x => x.id === snap.sel.size) : null
  const snapQl  = snap ? qualityOptions.find(x => x.id === snap.sel.quality) : null
  const snapTl  = snap ? timelineOptions.find(x => x.id === snap.sel.timeline) : null

  return (
    <>
      <style>{`
        /* ── Page Shell — matches homepage light cream bg ── */
        .est-page {
          background: var(--accent-light);
          min-height: 100vh;
          padding-top: calc(var(--nav-height) + 60px);
          padding-bottom: 100px;
        }

        /* ── Page hero strip — same navy as stats-bar on homepage ── */
        .est-hero-strip {
          background: var(--primary);
          border-bottom: 1px solid rgba(255,255,255,0.06);
          padding: 60px 0 50px;
          text-align: center;
          position: relative;
          overflow: hidden;
        }
        .est-hero-strip::before {
          content: '';
          position: absolute; inset: 0;
          background: radial-gradient(ellipse at 50% -20%, rgba(198,167,94,0.12) 0%, transparent 70%);
          pointer-events: none;
        }
        .est-hero-strip-tag {
          display: inline-flex; align-items: center; gap: 8px;
          background: rgba(198,167,94,0.12); border: 1px solid rgba(198,167,94,0.3);
          border-radius: 50px; padding: 6px 18px; margin-bottom: 20px;
          font-size: 0.75rem; font-weight: 700; letter-spacing: 0.16em;
          text-transform: uppercase; color: var(--accent);
        }
        .est-hero-strip-dot { width: 6px; height: 6px; border-radius: 50%; background: var(--accent); animation: pulse-accent 2s infinite; }
        .est-hero-title {
          font-family: var(--font-heading); font-weight: 800;
          font-size: clamp(2.4rem, 5vw, 4rem);
          color: var(--white); margin-bottom: 12px; line-height: 1.1;
        }
        .est-hero-title span { color: var(--accent); }
        .est-hero-sub { color: var(--gray-mid); font-size: 1rem; max-width: 500px; margin: 0 auto; line-height: 1.7; }

        /* ── Layout ── */
        .est-layout {
          max-width: 860px; margin: 0 auto; padding: 0 20px;
        }

        /* ── Progress bar ── */
        .est-progress-wrap { margin: 40px 0 28px; }
        .est-progress-label {
          display: flex; justify-content: space-between;
          font-size: 0.75rem; font-weight: 700; letter-spacing: 0.08em;
          text-transform: uppercase; color: var(--gray-dark); margin-bottom: 10px;
        }
        .est-progress-label span { color: var(--primary); }
        .est-progress-track {
          height: 5px; background: rgba(var(--primary-rgb),0.12);
          border-radius: 99px; overflow: hidden;
        }
        .est-progress-fill {
          height: 100%; background: var(--primary);
          border-radius: 99px; transition: width 0.4s cubic-bezier(0.4,0,0.2,1);
        }
        .est-step-pills { display: flex; gap: 8px; margin-top: 14px; flex-wrap: wrap; }
        .est-step-pill {
          padding: 6px 16px; border-radius: 99px; font-size: 0.8rem; font-weight: 800;
          letter-spacing: 0.05em; text-transform: uppercase;
          border: 1.5px solid var(--primary);
          color: var(--primary); background: transparent;
          transition: all 0.25s ease;
        }
        .est-step-pill.done { background: var(--primary); color: var(--accent-light); border-color: var(--primary); }
        .est-step-pill.active { background: var(--accent); color: var(--primary); border-color: var(--accent); box-shadow: 0 0 14px rgba(198,167,94,0.45); font-size: 0.82rem; }


        /* ── Main card — dark navy, exactly like homepage consultation dark card ── */
        .est-card {
          background: var(--secondary);
          border: 1px solid rgba(255,255,255,0.07);
          border-radius: var(--radius-xl);
          padding: 48px;
          box-shadow: 0 24px 64px rgba(0,0,0,0.35);
          color: var(--white);
        }
        .est-step-title {
          font-family: var(--font-heading); font-size: 1.9rem; font-weight: 800;
          color: var(--white); margin-bottom: 6px; line-height: 1.2;
        }
        .est-step-sub { color: var(--gray-mid); font-size: 0.92rem; margin-bottom: 28px; line-height: 1.6; }

        /* ── Option cards ── */
        .est-options { display: grid; grid-template-columns: 1fr 1fr; gap: 12px; margin-bottom: 32px; }
        .est-opt {
          padding: 20px 18px; border-radius: var(--radius-lg);
          border: 1px solid rgba(255,255,255,0.08);
          background: rgba(255,255,255,0.02);
          cursor: pointer;
          transition: all 0.28s cubic-bezier(0.4, 0, 0.2, 1);
          text-align: left; position: relative; overflow: hidden;
        }
        .est-opt::before {
          content: ''; position: absolute; inset: 0; border-radius: inherit;
          background: radial-gradient(circle at 20% 50%, rgba(198,167,94,0.06) 0%, transparent 70%);
          opacity: 0; transition: opacity 0.3s;
        }
        .est-opt:hover::before { opacity: 1; }
        .est-opt:hover { border-color: rgba(198,167,94,0.35); transform: translateY(-2px); }
        .est-opt.sel {
          border-color: var(--accent);
          background: rgba(198,167,94,0.07);
          box-shadow: 0 0 0 1px var(--accent), 0 8px 24px rgba(198,167,94,0.12);
        }
        .est-opt-icon  { font-size: 1.9rem; margin-bottom: 12px; }
        .est-opt-label { font-weight: 700; font-size: 0.98rem; color: var(--white); margin-bottom: 5px; }
        .est-opt-desc  { font-size: 0.8rem; color: var(--gray-mid); line-height: 1.5; }
        .est-opt-check {
          position: absolute; top: 14px; right: 14px;
          color: var(--accent); opacity: 0; transition: opacity 0.2s;
        }
        .est-opt.sel .est-opt-check { opacity: 1; }

        /* ── Nav row ── */
        .est-nav { display: flex; justify-content: space-between; align-items: center; margin-top: 16px; gap: 12px; }
        .est-nav > span { flex: 1; }

        /* ── Form inputs inside dark card ── */
        .est-form-label { color: var(--gray-light); font-size: 0.82rem; font-weight: 700; letter-spacing: 0.04em; text-transform: uppercase; margin-bottom: 7px; display: block; }
        .est-form-input {
          width: 100%; padding: 13px 16px;
          background: rgba(255,255,255,0.04);
          border: 1px solid rgba(255,255,255,0.11);
          border-radius: var(--radius-md);
          color: var(--white); font-size: 0.95rem;
          font-family: var(--font-body);
          outline: none; transition: all 0.25s ease;
        }
        .est-form-input::placeholder { color: rgba(255,255,255,0.25); }
        .est-form-input:focus { border-color: var(--accent); background: rgba(255,255,255,0.07); box-shadow: 0 0 0 3px rgba(198,167,94,0.12); }

        /* ── Result ── */
        .est-result { text-align: center; }
        .est-range-label { font-size: 0.72rem; text-transform: uppercase; letter-spacing: 0.12em; color: var(--gray-mid); margin-bottom: 6px; }
        .est-range {
          font-family: var(--font-heading);
          font-size: clamp(2.4rem, 6vw, 4rem);
          font-weight: 900; color: var(--accent);
          line-height: 1; margin: 0 0 16px;
          text-shadow: 0 0 40px rgba(198,167,94,0.2);
        }
        .est-disclaimer { font-size: 0.8rem; color: var(--gray-mid); margin-bottom: 20px; line-height: 1.6; max-width: 520px; margin-inline: auto; }

        /* ── Breakdown grid ── */
        .est-breakdown { display: grid; grid-template-columns: repeat(3,1fr); gap: 10px; margin: 18px 0 24px; }
        .est-break-item {
          background: rgba(255,255,255,0.02); border: 1px solid rgba(255,255,255,0.06);
          border-radius: var(--radius-md); padding: 14px 12px; text-align: center;
        }
        .est-break-label { font-size: 0.65rem; color: var(--gray-mid); text-transform: uppercase; letter-spacing: 0.1em; margin-bottom: 5px; }
        .est-break-val   { font-weight: 700; font-size: 0.9rem; color: var(--white); }

        /* ── Details summary card ── */
        .est-details-card {
          background: rgba(198,167,94,0.06); border: 1px solid rgba(198,167,94,0.2);
          border-radius: var(--radius-lg); padding: 20px 24px; margin: 0 0 24px; text-align: left;
        }
        .est-details-title { font-size: 0.7rem; text-transform: uppercase; letter-spacing: 0.12em; color: var(--accent); font-weight: 700; margin-bottom: 14px; }
        .est-details-grid  { display: grid; grid-template-columns: 1fr 1fr; gap: 10px; }
        .est-details-item  { display: flex; flex-direction: column; gap: 3px; }
        .est-details-lbl   { font-size: 0.68rem; color: var(--gray-mid); text-transform: uppercase; letter-spacing: 0.08em; }
        .est-details-val   { font-size: 0.93rem; color: var(--white); font-weight: 600; word-break: break-all; }

        /* ── Status banners ── */
        .est-banner {
          display: flex; align-items: flex-start; gap: 12px;
          border-radius: var(--radius-md); padding: 14px 18px; margin-bottom: 22px; font-size: 0.88rem; text-align: left;
        }
        .est-banner-info    { background: rgba(255,255,255,0.04); border: 1px solid rgba(255,255,255,0.1); color: var(--gray-light); }
        .est-banner-success { background: rgba(34,197,94,0.09);   border: 1px solid rgba(34,197,94,0.25);  color: var(--success); }
        .est-banner-error   { background: rgba(239,68,68,0.09);   border: 1px solid rgba(239,68,68,0.25);  color: var(--error); }



        /* ── Btn-outline inside dark navy card → white text ── */
        .est-card .btn-outline {
          color: var(--white) !important;
          border-color: rgba(255,255,255,0.25) !important;
          background: transparent !important;
        }
        .est-card .btn-outline:hover {
          background: rgba(255,255,255,0.08) !important;
          border-color: rgba(255,255,255,0.5) !important;
          color: var(--white) !important;
        }

        /* ── Responsive ── */
        @media(max-width:768px){
          .est-card { padding: 28px 20px; }
          .est-options { grid-template-columns: 1fr; }
          .est-breakdown { grid-template-columns: 1fr 1fr; }
          .est-details-grid { grid-template-columns: 1fr; }
          .est-how-grid { grid-template-columns: 1fr; }
        }
      `}</style>

      {/* ── HERO STRIP (dark navy — same as homepage stats bar) ── */}
      <div style={{ paddingTop: 'var(--nav-height)' }}>
        <div className="est-hero-strip">
          <div className="container">
            <div className="est-hero-strip-tag">
              <span className="est-hero-strip-dot" />
              Free Tool
            </div>
            <h1 className="est-hero-title">
              Project <span>Estimate Calculator</span>
            </h1>
            <p className="est-hero-sub">
              Get an instant ballpark cost range for your Ontario construction project in under 2 minutes — no commitment required.
            </p>
          </div>
        </div>
      </div>

      {/* ── MAIN CONTENT on cream background ── */}
      <div className="est-page">
        <div className="est-layout">

          {/* Progress */}
          <div className="est-progress-wrap">
            <div className="est-progress-label">
              <span>Step {step + 1} of {STEPS.length}</span>
              <span style={{ color: 'var(--primary)' }}>{STEPS[step]}</span>
            </div>
            <div className="est-progress-track">
              <div className="est-progress-fill" style={{ width: `${((step) / (STEPS.length - 1)) * 100}%` }} />
            </div>
            <div className="est-step-pills">
              {STEPS.map((s, i) => (
                <div key={s} className={`est-step-pill ${i < step ? 'done' : i === step ? 'active' : ''}`}>{s}</div>
              ))}
            </div>
          </div>

          {/* ── DARK NAVY CALCULATOR CARD ── */}
          <div className="est-card">

            {/* Step 0 — Service */}
            {step === 0 && (
              <>
                <div className="est-step-title">What type of project?</div>
                <div className="est-step-sub">Select the primary service you need for this project.</div>
                <div className="est-options">
                  {services.map(s => (
                    <div key={s.id} className={`est-opt ${sel.service === s.id ? 'sel' : ''}`}
                      onClick={() => setSel(v => ({ ...v, service: s.id }))}>
                      <CheckCircle size={16} className="est-opt-check" />
                      <div className="est-opt-icon">{s.icon}</div>
                      <div className="est-opt-label">{s.label}</div>
                      <div className="est-opt-desc">{s.desc}</div>
                    </div>
                  ))}
                </div>
                <div className="est-nav">
                  <span />
                  <button className="btn btn-accent btn-lg" disabled={!sel.service} onClick={() => setStep(1)}>
                    Next: Project Size <ArrowRight size={16} />
                  </button>
                </div>
              </>
            )}

            {/* Step 1 — Size */}
            {step === 1 && (
              <>
                <div className="est-step-title">How large is the project?</div>
                <div className="est-step-sub">Choose the approximate square footage of the project area.</div>
                <div className="est-options" style={{ gridTemplateColumns: '1fr' }}>
                  {sizeOptions.map(s => (
                    <div key={s.id} className={`est-opt ${sel.size === s.id ? 'sel' : ''}`}
                      style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '18px 20px' }}
                      onClick={() => setSel(v => ({ ...v, size: s.id }))}>
                      <div className="est-opt-label" style={{ marginBottom: 0 }}>{s.label}</div>
                      {sel.size === s.id && <CheckCircle size={18} style={{ color: 'var(--accent)', flexShrink: 0 }} />}
                    </div>
                  ))}
                </div>
                <div className="est-nav">
                  <button className="btn btn-outline" onClick={() => setStep(0)}><ArrowLeft size={14} /> Back</button>
                  <button className="btn btn-accent btn-lg" disabled={!sel.size} onClick={() => setStep(2)}>Next: Quality <ArrowRight size={16} /></button>
                </div>
              </>
            )}

            {/* Step 2 — Quality */}
            {step === 2 && (
              <>
                <div className="est-step-title">What quality level?</div>
                <div className="est-step-sub">This affects your finishes, materials, and overall project cost.</div>
                <div className="est-options" style={{ gridTemplateColumns: '1fr 1fr 1fr' }}>
                  {qualityOptions.map(q => (
                    <div key={q.id} className={`est-opt ${sel.quality === q.id ? 'sel' : ''}`}
                      onClick={() => setSel(v => ({ ...v, quality: q.id }))}>
                      <CheckCircle size={16} className="est-opt-check" />
                      <div style={{ fontSize: '1.6rem', marginBottom: 10 }}>{q.stars}</div>
                      <div className="est-opt-label">{q.label}</div>
                      <div className="est-opt-desc">{q.desc}</div>
                    </div>
                  ))}
                </div>
                <div className="est-nav">
                  <button className="btn btn-outline" onClick={() => setStep(1)}><ArrowLeft size={14} /> Back</button>
                  <button className="btn btn-accent btn-lg" disabled={!sel.quality} onClick={() => setStep(3)}>Next: Timeline <ArrowRight size={16} /></button>
                </div>
              </>
            )}

            {/* Step 3 — Timeline */}
            {step === 3 && (
              <>
                <div className="est-step-title">What's your timeline?</div>
                <div className="est-step-sub">How urgently do you need the project completed?</div>
                <div className="est-options" style={{ gridTemplateColumns: '1fr 1fr 1fr' }}>
                  {timelineOptions.map(t => (
                    <div key={t.id} className={`est-opt ${sel.timeline === t.id ? 'sel' : ''}`}
                      onClick={() => setSel(v => ({ ...v, timeline: t.id }))}>
                      <CheckCircle size={16} className="est-opt-check" />
                      <div className="est-opt-label" style={{ marginBottom: 8 }}>{t.label}</div>
                      <div className="est-opt-desc">{t.desc}</div>
                    </div>
                  ))}
                </div>
                <div className="est-nav">
                  <button className="btn btn-outline" onClick={() => setStep(2)}><ArrowLeft size={14} /> Back</button>
                  <button className="btn btn-accent btn-lg" disabled={!sel.timeline} onClick={() => setStep(4)}>Next: Your Details <ArrowRight size={16} /></button>
                </div>
              </>
            )}

            {/* Step 4 — Contact */}
            {step === 4 && (
              <>
                <div className="est-step-title">Almost there!</div>
                <div className="est-step-sub">Enter your details to receive your personalised estimate report by email.</div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 16, marginBottom: 28 }}>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
                    <div>
                      <label className="est-form-label">Your Name *</label>
                      <input className="est-form-input" value={sel.name} onChange={e => setSel(v => ({ ...v, name: e.target.value }))} placeholder="John Smith" />
                    </div>
                    <div>
                      <label className="est-form-label">Phone Number</label>
                      <input className="est-form-input" value={sel.phone} onChange={e => setSel(v => ({ ...v, phone: e.target.value }))} placeholder="+1 (905) 000-0000" />
                    </div>
                  </div>
                  <div>
                    <label className="est-form-label">Email Address *</label>
                    <input type="email" className="est-form-input" value={sel.email} onChange={e => setSel(v => ({ ...v, email: e.target.value }))} placeholder="john@example.com" />
                  </div>
                  <div>
                    <label className="est-form-label">Project Location</label>
                    <input className="est-form-input" value={sel.location} onChange={e => setSel(v => ({ ...v, location: e.target.value }))} placeholder="Toronto, Mississauga, Brampton..." />
                  </div>
                </div>
                <div className="est-nav">
                  <button className="btn btn-outline" onClick={() => setStep(3)}><ArrowLeft size={14} /> Back</button>
                  <button className="btn btn-accent btn-lg" disabled={!sel.name || !sel.email || loading}
                    onClick={() => { const f = { ...sel }; setStep(5); handleSubmit(f) }}>
                    {loading ? 'Calculating…' : <><DollarSign size={16} /> See My Estimate</>}
                  </button>
                </div>
              </>
            )}

            {/* Step 5 — Result */}
            {step === 5 && snap && (
              <div className="est-result">

                {/* Status banner */}
                {loading ? (
                  <div className="est-banner est-banner-info">
                    <span style={{ flexShrink: 0 }}>📨</span>
                    <span>Sending your estimate to <strong style={{ color: 'var(--white)' }}>{snap.sel.email}</strong>…</span>
                  </div>
                ) : error ? (
                  <div className="est-banner est-banner-error">
                    <span style={{ flexShrink: 0 }}>⚠️</span>
                    <span>{error} Your estimate is shown below.</span>
                  </div>
                ) : (
                  <div className="est-banner est-banner-success">
                    <CheckCircle size={18} style={{ flexShrink: 0, marginTop: 1 }} />
                    <span>Estimate emailed to <strong style={{ color: 'var(--white)' }}>{snap.sel.email}</strong>. Our team will follow up within 24 hours.</span>
                  </div>
                )}

                {/* Cost Range */}
                <div className="est-range-label">Estimated Project Cost Range (CAD)</div>
                <div className="est-range">{fmt(snap.low)} – {fmt(snap.high)}</div>
                <p className="est-disclaimer">
                  Indicative ballpark range only — actual costs vary based on site conditions, structural requirements, permit fees, and local material prices.{' '}
                  <strong style={{ color: 'var(--accent-light)' }}>Contact us for a precise written quote.</strong>
                </p>

                {/* Breakdown */}
                <div className="est-breakdown">
                  {[
                    ['Service',       snapSvc?.label  ?? '—'],
                    ['Size',          snapSz?.label   ?? '—'],
                    ['Quality',       snapQl?.label   ?? '—'],
                    ['Timeline',      snapTl?.label   ?? '—'],
                    ['Estimate Type', 'Indicative',          ],
                    ['HST',           'Not Included',        ],
                  ].map(([lbl, val]) => (
                    <div key={lbl} className="est-break-item">
                      <div className="est-break-label">{lbl}</div>
                      <div className="est-break-val" style={lbl === 'Estimate Type' ? { color: 'var(--accent)' } : {}}>{val}</div>
                    </div>
                  ))}
                </div>

                {/* Your Details */}
                <div className="est-details-card">
                  <div className="est-details-title">📋 Your Submitted Details</div>
                  <div className="est-details-grid">
                    <div className="est-details-item">
                      <span className="est-details-lbl">Full Name</span>
                      <span className="est-details-val">{snap.sel.name}</span>
                    </div>
                    <div className="est-details-item">
                      <span className="est-details-lbl">Email Address</span>
                      <span className="est-details-val">{snap.sel.email}</span>
                    </div>
                    {snap.sel.phone && (
                      <div className="est-details-item">
                        <span className="est-details-lbl">Phone Number</span>
                        <span className="est-details-val">{snap.sel.phone}</span>
                      </div>
                    )}
                    {snap.sel.location && (
                      <div className="est-details-item">
                        <span className="est-details-lbl">Project Location</span>
                        <span className="est-details-val">{snap.sel.location}</span>
                      </div>
                    )}
                  </div>
                </div>

                {/* CTAs */}
                <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
                  <Link href="/contact" className="btn btn-accent btn-lg">
                    Get Precise Quote <ArrowRight size={18} />
                  </Link>
                  <button className="btn btn-outline btn-lg" onClick={() => {
                    setStep(0); setSnap(null); setSubmitted(false); setError('')
                    setSel({ service: '', size: '', quality: '', timeline: '', location: '', name: '', email: '', phone: '' })
                  }}>
                    New Estimate
                  </button>
                </div>
              </div>
            )}

          </div>
          {/* END DARK CARD */}

        </div>
      </div>
    </>
  )
}

