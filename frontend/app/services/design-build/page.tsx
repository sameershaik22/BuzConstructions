import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { Palette, CheckCircle, ArrowRight } from 'lucide-react'
import ConsultationForm from '@/components/ConsultationForm'

export const metadata: Metadata = {
  title: 'Design-Build Services | Single-Source Construction Ontario',
  description: 'BUZ Construction offers design-build services in Ontario — single contract, faster delivery, integrated design and construction for commercial and residential projects.',
}
const steps = [
  { step: '01', title: 'Discovery & Concept', desc: 'We meet your team, understand your goals, vision, budget, and timeline requirements.', icon: '🔍' },
  { step: '02', title: 'Design Development', desc: 'Our integrated design team develops schematic drawings, specifications, and 3D renderings.', icon: '✏️' },
  { step: '03', title: 'Permits & Approvals', desc: 'We handle all municipal permit applications and regulatory approvals on your behalf.', icon: '📋' },
  { step: '04', title: 'Construction', desc: 'Our trades execute the build with daily coordination between design and construction teams.', icon: '🏗️' },
  { step: '05', title: 'Commissioning', desc: 'Systems are tested, inspected, and certified before final handover to ownership.', icon: '⚙️' },
  { step: '06', title: 'Handover', desc: 'Keys, warranty documents, O&M manuals, and post-occupancy support provided.', icon: '🔑' },
]
const advantages = [
  { title: 'Single Point of Accountability', desc: 'One contract. One team. One point of contact. No finger-pointing between designer and contractor.' },
  { title: 'Faster Project Delivery', desc: 'Design and construction overlap saves 15–30% in project schedule compared to traditional delivery.' },
  { title: 'Cost Certainty', desc: 'Guaranteed maximum price established early. Budget surprises become a thing of the past.' },
  { title: 'Better Communication', desc: 'Integrated teams collaborate daily — eliminating the gaps that cause delays and cost overruns.' },
  { title: 'Innovation & Value Engineering', desc: 'Our design-build team identifies cost-saving opportunities that traditional methods miss.' },
  { title: 'Sustainable Design', desc: 'We integrate green building practices and energy efficiency from concept to completion.' },
]
export default function DesignBuildPage() {
  return (
    <>
      <style>{`.page-hero{position:relative;min-height:55vh;display:flex;align-items:center;background:var(--primary);padding-top:var(--nav-height);overflow:hidden;}.page-hero-bg{position:absolute;inset:0;}.page-hero-bg img{width:100%;height:100%;object-fit:cover;opacity:0.25;}.page-hero-overlay{position:absolute;inset:0;background:linear-gradient(135deg,rgba(10,22,40,0.97)0%,rgba(10,22,40,0.65)100%);}.page-hero-content{position:relative;z-index:1;padding:80px 0 60px;}.db-steps{display:grid;grid-template-columns:repeat(3,1fr);gap:24px;}.db-step{background:var(--secondary);border:1px solid rgba(255,255,255,0.06);border-radius:var(--radius-lg);padding:28px;text-align:center;transition:var(--transition);}.db-step:hover{border-color:rgba(236,72,153,0.3);transform:translateY(-4px);}.db-step-num{font-family:var(--font-heading);font-size:0.75rem;font-weight:700;color:var(--accent);text-transform:uppercase;letter-spacing:0.15em;margin-bottom:8px;}.db-step-icon{font-size:2rem;margin-bottom:12px;}.db-step-title{font-family:var(--font-heading);font-size:1.2rem;margin-bottom:10px;}.db-step-desc{font-size:0.85rem;color:var(--gray-mid);line-height:1.6;}.adv-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:24px;}@media(max-width:1024px){.db-steps,.adv-grid{grid-template-columns:repeat(2,1fr);}}@media(max-width:640px){.db-steps,.adv-grid{grid-template-columns:1fr;}}`}</style>
      <section className="page-hero">
        <div className="page-hero-bg"><Image src="/images/design_build_1781694386091.jpg" alt="Design-Build" fill style={{objectFit:'cover'}}/></div>
        <div className="page-hero-overlay"/>
        <div className="container page-hero-content">
          <div style={{display:'flex',alignItems:'center',gap:8,fontSize:'0.8rem',color:'var(--gray-dark)',marginBottom:16}}><Link href="/" style={{color:'var(--accent)',textDecoration:'none'}}>Home</Link> / <Link href="/services" style={{color:'var(--accent)',textDecoration:'none'}}>Services</Link> / Design-Build</div>
          <span className="section-tag">Design-Build Services</span>
          <h1 style={{fontFamily:'var(--font-heading)',fontSize:'clamp(2.5rem,5vw,4.5rem)',fontWeight:900,marginTop:12,marginBottom:20}}>Design-Build <span style={{color:'var(--accent)'}}>Delivery</span></h1>
          <p style={{color:'var(--gray-light)',fontSize:'1.1rem',maxWidth:580,lineHeight:1.7}}>One team. One contract. Faster delivery. BUZ Construction's design-build approach eliminates the gaps between design and construction for better results at lower cost.</p>
          <div style={{display:'flex',gap:16,marginTop:32,flexWrap:'wrap'}}><Link href="/contact" className="btn btn-primary btn-lg">Start Design-Build <ArrowRight size={18}/></Link></div>
        </div>
      </section>
      <section className="section bg-dark"><div className="container">
        <div className="section-header"><span className="section-tag">The Process</span><h2 className="section-title">Design-Build <span>Process</span></h2><p className="section-subtitle">From concept to keys — our 6-step design-build process is built for speed and certainty.</p><div className="accent-line"/></div>
        <div className="db-steps">{steps.map(s=>(<div key={s.step} className="db-step"><div className="db-step-num">{s.step}</div><div className="db-step-icon">{s.icon}</div><div className="db-step-title">{s.title}</div><div className="db-step-desc">{s.desc}</div></div>))}</div>
      </div></section>
      <section className="section" style={{background:'var(--secondary)'}}><div className="container">
        <div className="section-header"><span className="section-tag">Why Design-Build</span><h2 className="section-title">The <span>Advantages</span></h2><div className="accent-line"/></div>
        <div className="adv-grid">{advantages.map(a=>(<div key={a.title} className="card"><div style={{width:44,height:44,borderRadius:12,background:'rgba(236,72,153,0.15)',display:'flex',alignItems:'center',justifyContent:'center',marginBottom:16,color:'#EC4899'}}><CheckCircle size={22}/></div><h4 style={{fontFamily:'var(--font-heading)',marginBottom:10}}>{a.title}</h4><p style={{fontSize:'0.88rem',color:'var(--gray-mid)'}}>{a.desc}</p></div>))}</div>
      </div></section>
      <section className="section bg-dark"><div className="container"><ConsultationForm serviceType="Design-Build" title="Start Your Design-Build Project" subtitle="Tell us your vision and we'll show you how design-build can save you time and money."/></div></section>
    </>
  )
}
