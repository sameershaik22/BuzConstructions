import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { Shield, CheckCircle, AlertTriangle, Award, FileText, HardHat } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Safety & Quality | Construction Safety Standards Ontario',
  description: 'BUZ Construction Group Inc. safety standards, WSIB compliance, insurance information, and quality control process. Zero incidents. Uncompromising quality.',
}
const safetyStandards = ['OHSA (Occupational Health & Safety Act) Compliance', 'MOL (Ministry of Labour) Compliance', 'Site-specific Safety Plans on every project', 'Daily toolbox talks and hazard assessments', 'Fall protection systems on all elevated work', 'Confined space entry procedures', 'WHMIS 2015 compliance', 'First aid & emergency response on every site']
const insurance = [
  { title: 'Commercial General Liability', value: '$5,000,000', desc: 'Per occurrence and aggregate coverage' },
  { title: 'Professional Liability (E&O)', value: '$2,000,000', desc: 'Design-build and PM services' },
  { title: 'Workers Compensation (WSIB)', value: 'Active Clearance', desc: 'Current WSIB Clearance Certificate' },
  { title: 'Commercial Auto', value: '$2,000,000', desc: 'All company vehicles and equipment' },
]
const qcSteps = [
  { step: '01', title: 'Pre-Construction Review', desc: 'Drawings, specs, and submittals reviewed before work begins.' },
  { step: '02', title: 'Material Inspection', desc: 'All materials inspected upon delivery against specifications.' },
  { step: '03', title: 'In-Progress Inspections', desc: 'Daily quality checks by site superintendents at key milestones.' },
  { step: '04', title: 'Third-Party Testing', desc: 'Concrete, soil, and structural elements independently tested and certified.' },
  { step: '05', title: 'Pre-Close Inspection', desc: 'Comprehensive punch list walk before systems are closed in.' },
  { step: '06', title: 'Final Certification', desc: 'All inspections passed, permits closed, and occupancy obtained.' },
]
export default function SafetyQualityPage() {
  return (
    <>
      <style>{`.page-hero{position:relative;min-height:50vh;display:flex;align-items:center;background:var(--primary);padding-top:var(--nav-height);overflow:hidden;}.page-hero-bg{position:absolute;inset:0;}.page-hero-bg img{width:100%;height:100%;object-fit:cover;opacity:0.25;}.page-hero-overlay{position:absolute;inset:0;background:linear-gradient(135deg,rgba(10,22,40,0.97)0%,rgba(10,22,40,0.65)100%);}.page-hero-content{position:relative;z-index:1;padding:80px 0 60px;}.safety-list{display:flex;flex-direction:column;gap:10px;}.safety-item{display:flex;align-items:center;gap:12px;padding:14px 16px;background:rgba(255,255,255,0.03);border:1px solid rgba(255,255,255,0.06);border-radius:var(--radius-md);font-size:0.9rem;color:var(--gray-light);}.ins-grid{display:grid;grid-template-columns:repeat(4,1fr);gap:20px;}.ins-card{background:var(--secondary);border:1px solid rgba(255,255,255,0.06);border-radius:var(--radius-lg);padding:24px;text-align:center;}.ins-value{font-family:var(--font-heading);font-size:1.5rem;font-weight:800;color:var(--accent);margin-bottom:6px;}.ins-title{font-weight:700;font-size:0.9rem;margin-bottom:6px;}.ins-desc{font-size:0.78rem;color:var(--gray-dark);}.qc-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:24px;}@media(max-width:1024px){.ins-grid{grid-template-columns:repeat(2,1fr);}.qc-grid{grid-template-columns:repeat(2,1fr);}}@media(max-width:640px){.ins-grid,.qc-grid{grid-template-columns:1fr;}}`}</style>
      <section className="page-hero">
        <div className="page-hero-bg"><Image src="/images/buz_safety_workers.png" alt="Construction safety" fill style={{objectFit:'cover'}}/></div>
        <div className="page-hero-overlay"/>
        <div className="container page-hero-content">
          <div style={{display:'flex',alignItems:'center',gap:8,fontSize:'0.8rem',color:'var(--gray-dark)',marginBottom:16}}><Link href="/" style={{color:'var(--accent)',textDecoration:'none'}}>Home</Link> / Safety & Quality</div>
          <span className="section-tag">Safety & Quality</span>
          <h1 style={{fontFamily:'var(--font-heading)',fontSize:'clamp(2.5rem,5vw,4.5rem)',fontWeight:900,marginTop:12,marginBottom:20}}>Zero Incidents. <span style={{color:'var(--accent)'}}>Uncompromising Quality.</span></h1>
          <p style={{color:'var(--gray-light)',fontSize:'1.1rem',maxWidth:560,lineHeight:1.7}}>At BUZ Construction, safety is not a priority — it's a value. Every project, every day, every worker goes home safely.</p>
        </div>
      </section>
      <section className="section bg-dark"><div className="container">
        <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:60,alignItems:'start'}}>
          <div>
            <span className="section-tag">Safety Standards</span>
            <h2 style={{fontFamily:'var(--font-heading)',fontSize:'clamp(1.8rem,3vw,2.5rem)',fontWeight:800,marginTop:12,marginBottom:24}}>Our Safety <span style={{color:'var(--accent)'}}>Commitment</span></h2>
            <div className="safety-list">{safetyStandards.map(s=>(<div key={s} className="safety-item"><CheckCircle size={16} style={{color:'var(--success)',flexShrink:0}}/>{s}</div>))}</div>
          </div>
          <div>
            <div style={{position:'relative',borderRadius:'var(--radius-xl)',overflow:'hidden',aspectRatio:'4/3'}}>
              <Image src="/images/safety_workers_1781694419859.png" alt="Safety on site" fill style={{objectFit:'cover'}}/>
            </div>
            <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:16,marginTop:20}}>
              {[['🦺','PPE Required','On every site'],['📋','Daily JHSA','Before work starts'],['🏥','First Aid','Certified on site'],['📞','Safety Hotline','24/7 reporting']].map(([icon,title,sub])=>(<div key={title} style={{background:'var(--secondary)',border:'1px solid rgba(255,255,255,0.06)',borderRadius:'var(--radius-md)',padding:'16px',display:'flex',alignItems:'center',gap:12}}><span style={{fontSize:'1.5rem'}}>{icon}</span><div><div style={{fontWeight:700,fontSize:'0.9rem'}}>{title}</div><div style={{fontSize:'0.75rem',color:'var(--gray-dark)'}}>{sub}</div></div></div>))}
            </div>
          </div>
        </div>
      </div></section>
      <section className="section" style={{background:'var(--secondary)'}}><div className="container">
        <div className="section-header"><span className="section-tag">Coverage</span><h2 className="section-title">Insurance & <span>Compliance</span></h2><div className="accent-line"/></div>
        <div className="ins-grid">{insurance.map(i=>(<div key={i.title} className="ins-card"><div style={{width:48,height:48,borderRadius:14,background:'rgba(245,166,35,0.15)',display:'flex',alignItems:'center',justifyContent:'center',margin:'0 auto 16px',color:'var(--accent)'}}><Shield size={22}/></div><div className="ins-value">{i.value}</div><div className="ins-title">{i.title}</div><div className="ins-desc">{i.desc}</div></div>))}</div>
      </div></section>
      <section className="section bg-dark"><div className="container">
        <div className="section-header"><span className="section-tag">Quality Control</span><h2 className="section-title">Our QC <span>Process</span></h2><p className="section-subtitle">Six steps that guarantee quality on every BUZ project.</p><div className="accent-line"/></div>
        <div className="qc-grid">{qcSteps.map(q=>(<div key={q.step} className="card"><div style={{fontFamily:'var(--font-heading)',fontSize:'2.5rem',fontWeight:900,color:'rgba(245,166,35,0.3)',lineHeight:1,marginBottom:12}}>{q.step}</div><h4 style={{fontFamily:'var(--font-heading)',marginBottom:10}}>{q.title}</h4><p style={{fontSize:'0.88rem',color:'var(--gray-mid)'}}>{q.desc}</p></div>))}</div>
      </div></section>
    </>
  )
}
