'use client'
import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'
import { Send, CheckCircle, ChevronDown, ChevronUp, MapPin, Clock, DollarSign, Briefcase } from 'lucide-react'

const API = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000'

const jobs = [
  { id: 1, title: 'Construction Labourer', dept: 'Field Operations', location: 'Greater Toronto Area', type: 'Full-Time', salary: 'Competitive Hourly Rate', desc: 'Assist with commercial and residential construction projects while maintaining quality and strict safety standards.', req: 'Construction experience preferred. Working at Heights Certificate, Valid Driver’s License, and Reliable transportation required.' },
  { id: 2, title: 'Senior Project Manager', dept: 'Operations', location: 'Mississauga, ON', type: 'Full-Time', salary: '$90,000 – $120,000', desc: 'Lead commercial construction projects from preconstruction through closeout. Manage teams, budgets, schedules, and client relationships.', req: '5+ years construction PM. PMP preferred. Experience with commercial projects $5M+.' },
  { id: 3, title: 'Site Superintendent', dept: 'Field Operations', location: 'GTA Area', type: 'Full-Time', salary: '$80,000 – $105,000', desc: 'Oversee day-to-day site operations, coordinate subcontractors, and ensure safety compliance on active construction sites.', req: '7+ years field experience. Gold Seal preferred. Strong leadership skills.' },
  { id: 4, title: 'Estimator / Preconstruction Manager', dept: 'Estimating', location: 'Mississauga, ON', type: 'Full-Time', salary: '$75,000 – $95,000', desc: 'Prepare detailed cost estimates for commercial and residential projects. Manage tender processes and vendor relationships.', req: '3+ years estimating. Proficiency in estimation software.' },
  { id: 5, title: 'Carpenter / Millwork Specialist', dept: 'Trades', location: 'GTA Area', type: 'Full-Time', salary: '$28 – $38/hour', desc: 'Perform rough and finish carpentry, custom millwork, and cabinetry installation on residential and commercial projects.', req: 'Red Seal Carpenter preferred. 3+ years experience.' },
  { id: 6, title: 'Project Coordinator', dept: 'Operations', location: 'Mississauga, ON', type: 'Full-Time', salary: '$55,000 – $70,000', desc: 'Support PMs with scheduling, documentation, RFIs, submittals, and subcontractor coordination.', req: '1–3 years construction coordination. Procore experience preferred.' },
]

export default function CareersPage() {
  const [expandedJob, setExpandedJob] = useState<number | null>(null)
  const [form, setForm] = useState({ name: '', email: '', phone: '', position_applied: '', cover_letter: '' })
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState('')

  const handle = (e: React.ChangeEvent<HTMLInputElement|HTMLTextAreaElement|HTMLSelectElement>) =>
    setForm(f => ({ ...f, [e.target.name]: e.target.value }))

  const submit = async (e: React.FormEvent) => {
    e.preventDefault(); setLoading(true); setError('')
    try {
      const fd = new FormData()
      Object.entries(form).forEach(([k, v]) => fd.append(k, v))
      const res = await fetch(`${API}/api/jobs/0/apply`, { method: 'POST', body: fd })
      if (!res.ok) throw new Error()
      setSuccess(true)
      if (typeof window !== 'undefined' && (window as any).gtag) (window as any).gtag('event', 'job_apply_click', { event_category: 'careers' })
    } catch { setError('Something went wrong. Please email careers@buzconstruction.ca') }
    finally { setLoading(false) }
  }

  return (
    <>
      <style>{`
        .page-hero{position:relative;min-height:50vh;display:flex;align-items:center;background:var(--off-white);padding-top:var(--nav-height);overflow:hidden;}
        .page-hero-bg{position:absolute;inset:0;}.page-hero-bg img{width:100%;height:100%;object-fit:cover;opacity:0.9;}
        .custom-hero-overlay{position:absolute;inset:0;background:linear-gradient(to right, rgba(240,235,225,0.95) 0%, rgba(240,235,225,0.8) 40%, transparent 100%); z-index:0;}
        .page-hero-content{position:relative;z-index:1;padding:80px 0 60px;}
        .job-list{display:flex;flex-direction:column;gap:16px;}
        .job-card{background:var(--white);border:1px solid rgba(21,30,49,0.1);border-left:4px solid var(--accent);border-radius:var(--radius-lg);overflow:hidden;transition:all 0.3s ease;}
        .job-card.open,.job-card:hover{border-color:rgba(198,167,94,0.5);border-left-color:var(--accent);box-shadow:var(--shadow-lg);transform:translateY(-4px);}
        .job-header{display:flex;align-items:center;justify-content:space-between;padding:24px 28px;cursor:pointer;gap:16px;flex-wrap:wrap;}
        .job-meta{display:flex;align-items:center;gap:12px;flex-wrap:wrap;margin-top:12px;}
        .job-meta-item{display:flex;align-items:center;gap:6px;font-size:0.75rem;font-weight:700;text-transform:uppercase;letter-spacing:0.05em;color:var(--primary);background:rgba(21,30,49,0.05);padding:4px 12px;border-radius:50px;border:1px solid rgba(21,30,49,0.08);}
        .job-body{padding:0 28px 28px;}
        .job-desc{color:var(--secondary);font-size:0.9rem;line-height:1.7;margin-bottom:12px;}
        .job-req{background:rgba(21,30,49,0.03);border-left:3px solid var(--accent);padding:12px 16px;border-radius:0 var(--radius-md) var(--radius-md) 0;font-size:0.85rem;color:var(--secondary);}

        .careers-form { background:var(--secondary); border:1px solid rgba(198,167,94,0.3); box-shadow:var(--shadow-lg); border-radius:var(--radius-xl); padding:48px; display:flex; flex-direction:column; gap:20px; }
        .careers-form .form-label { color: var(--white); font-weight: 600; margin-bottom: 8px; display: block; }
        .careers-form .form-input, .careers-form .form-select, .careers-form .form-textarea { background: rgba(255,255,255,0.05); border: 1px solid rgba(255,255,255,0.1); color: var(--white); width: 100%; border-radius: 8px; padding: 14px 16px; font-family: var(--font-body); transition: var(--transition); }
        .careers-form .form-input:focus, .careers-form .form-select:focus, .careers-form .form-textarea:focus { border-color: var(--accent); background: rgba(198,167,94,0.05); outline: none; }
        .careers-success { text-align:center; padding:48px; background:var(--secondary); border-radius:var(--radius-xl); border:1px solid rgba(198,167,94,0.3); box-shadow:var(--shadow-lg); }

        .why-buz-split { display: grid; grid-template-columns: 1fr 1fr; gap: 60px; align-items: center; }
        .why-buz-img { position: relative; aspect-ratio: 4/5; border-radius: var(--radius-xl); overflow: hidden; box-shadow: var(--shadow-lg); border: 1px solid rgba(21,30,49,0.08); }
        .why-buz-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 24px; }
        @media(max-width: 992px) { .why-buz-split { grid-template-columns: 1fr; gap: 40px; } .why-buz-img { aspect-ratio: 16/9; } }
        @media(max-width: 768px) {
          .careers-form { padding: 24px; }
          .careers-form .form-input, .careers-form .form-select, .careers-form .form-textarea, .careers-submit-btn {
            min-height: 44px;
            font-size: 16px;
          }
          .why-buz-grid { grid-template-columns: 1fr; }
        }
      `}</style>

      <section className="page-hero">
        <div className="page-hero-bg"><Image src="/images/buz_careers_hero.jpg" alt="BUZ Construction careers" fill style={{objectFit:'cover'}}/></div>
        <div className="custom-hero-overlay"/>
        <div className="container page-hero-content">
          <div style={{display:'flex',alignItems:'center',gap:8,fontSize:'0.8rem',color:'var(--gray-dark)',marginBottom:16}}><Link href="/" style={{color:'var(--accent)',textDecoration:'none'}}>Home</Link> / Careers</div>
          <span className="section-tag">Join Our Team</span>
          <h1 style={{fontFamily:'var(--font-heading)',fontSize:'clamp(2.5rem,5vw,4.5rem)',fontWeight:900,marginTop:12,marginBottom:20,color:'var(--secondary)'}}>Build Your <span style={{color:'var(--accent)'}}>Career</span> with BUZ</h1>
          <p style={{color:'var(--secondary)',fontSize:'1.1rem',maxWidth:560,lineHeight:1.7}}>Join a team of passionate professionals building Ontario's future. Competitive pay, great benefits, and a culture that values every person on the crew.</p>
        </div>
      </section>

      {/* Why Work Here */}
      <section className="section" style={{background: 'var(--off-white)'}}><div className="container">
        <div className="section-header"><span className="section-tag">Why BUZ?</span><h2 className="section-title">Why Work <span>With Us?</span></h2><div className="accent-line"/></div>
        <div className="why-buz-split">
          <div className="why-buz-img">
            <Image src="/images/buz_interview_office.jpg" alt="BUZ Construction Interview" fill style={{objectFit: 'cover'}} />
          </div>
          <div className="why-buz-grid">
            {[['💰','Top-Tier Compensation','Industry-leading salary structures paired with performance bonuses and comprehensive profit sharing.'],['🏥','Comprehensive Benefits','Premium health, dental, and vision coverage alongside extensive wellness and retirement programs.'],['📈','Accelerated Growth','Structured career progression with continuous training, certifications, and leadership development.'],['🤝','Corporate Excellence','An inclusive, high-performance environment built rigidly on mutual respect, site safety, and execution.']].map(([icon,title,desc])=>(
              <div key={title} className="card" style={{background:'var(--white)', border:'1px solid rgba(21,30,49,0.08)', padding: '32px 24px', borderRadius: 'var(--radius-lg)', transition: 'var(--transition)'}}>
                <div style={{fontSize:'2.5rem',marginBottom:16}}>{icon}</div>
                <h4 style={{fontFamily:'var(--font-heading)',marginBottom:10, color:'var(--primary)', fontSize: '1.1rem'}}>{title}</h4>
                <p style={{fontSize:'0.88rem',color:'var(--secondary)', lineHeight: 1.6}}>{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div></section>

      {/* Job Listings */}
      <section className="section" style={{background:'var(--off-white)'}}><div className="container">
        <div className="section-header"><span className="section-tag">Open Positions</span><h2 className="section-title">Current <span>Openings</span></h2><div className="accent-line"/></div>
        <div className="job-list">
          {jobs.map(j=>(
            <div key={j.id} className={`job-card ${expandedJob===j.id?'open':''}`}>
              <div className="job-header" onClick={()=>setExpandedJob(expandedJob===j.id?null:j.id)}>
                <div>
                  <h3 style={{fontFamily:'var(--font-heading)',fontSize:'1.2rem'}}>{j.title}</h3>
                  <div className="job-meta">
                    <span className="job-meta-item"><MapPin size={13}/>{j.location}</span>
                    <span className="job-meta-item"><Briefcase size={13}/>{j.dept}</span>
                    <span className="job-meta-item"><Clock size={13}/>{j.type}</span>
                    <span className="job-meta-item"><DollarSign size={13}/>{j.salary}</span>
                  </div>
                </div>
                <div style={{display:'flex',alignItems:'center',gap:12}}>
                  <span className="badge badge-accent">{j.type}</span>
                  {expandedJob===j.id?<ChevronUp size={20} style={{color:'var(--accent)',flexShrink:0}}/>:<ChevronDown size={20} style={{color:'var(--gray-mid)',flexShrink:0}}/>}
                </div>
              </div>
              {expandedJob===j.id&&(
                <div className="job-body">
                  <p className="job-desc">{j.desc}</p>
                  <div className="job-req"><strong style={{color:'var(--accent)'}}>Requirements:</strong> {j.req}</div>
                  <button className="btn btn-primary" style={{marginTop:20}} onClick={()=>setForm(f=>({...f,position_applied:j.title}))}>
                    Apply for This Role
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
      </div></section>

      {/* Application Form */}
      <section className="section" style={{background: 'var(--off-white)'}} id="apply"><div className="container">
        <div style={{maxWidth:640,margin:'0 auto'}}>
          <div className="section-header">
            <span className="section-tag">Apply Now</span>
            <h2 className="section-title">Submit Your <span>Application</span></h2>
            <div className="accent-line"/>
          </div>
          {success?(
            <div className="careers-success">
              <CheckCircle size={52} style={{color:'var(--success)',margin:'0 auto 16px'}}/>
              <h3 style={{fontFamily:'var(--font-heading)',fontSize:'1.8rem',marginBottom:12, color:'var(--white)'}}>Application Submitted!</h3>
              <p style={{color:'var(--gray-light)'}}>We'll review your application and contact you within 5–7 business days.</p>
            </div>
          ):(
            <form onSubmit={submit} className="careers-form">
              <div className="form-grid"><div className="form-group"><label className="form-label">Full Name *</label><input name="name" className="form-input" required value={form.name} onChange={handle} placeholder="John Smith"/></div><div className="form-group"><label className="form-label">Email *</label><input name="email" type="email" className="form-input" required value={form.email} onChange={handle} placeholder="john@example.com"/></div></div>
              <div className="form-grid"><div className="form-group"><label className="form-label">Phone</label><input name="phone" className="form-input" value={form.phone} onChange={handle} placeholder="+1 (905) 000-0000"/></div><div className="form-group"><label className="form-label">Position Applying For</label><select name="position_applied" className="form-select" value={form.position_applied} onChange={handle}><option value="">Select position...</option>{jobs.map(j=><option key={j.id}>{j.title}</option>)}</select></div></div>
              <div className="form-group"><label className="form-label">Cover Letter</label><textarea name="cover_letter" className="form-textarea" rows={5} value={form.cover_letter} onChange={handle} placeholder="Tell us why you'd be a great fit for BUZ Construction..."/></div>
              {error&&<p style={{color:'var(--error)',fontSize:'0.85rem'}}>{error}</p>}
              <button type="submit" className="btn btn-accent btn-lg" disabled={loading} style={{width:'100%',justifyContent:'center', marginTop: 12}}>{loading?'Submitting...':<><Send size={16}/>Submit Application</>}</button>
            </form>
          )}
        </div>
      </div></section>
    </>
  )
}
