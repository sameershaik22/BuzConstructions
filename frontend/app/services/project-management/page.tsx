import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { ClipboardList, CheckCircle, ArrowRight, TrendingUp, DollarSign, Clock, Shield } from 'lucide-react'
import ConsultationForm from '@/components/ConsultationForm'

export const metadata: Metadata = {
  title: 'Project Management | Construction PM Services Ontario',
  description: 'BUZ Construction Group Inc. provides expert construction project management services across Ontario — planning, scheduling, budgeting, coordination, and reporting.',
}
const services = [
  { title: 'Pre-Construction Planning', desc: 'Detailed project planning, scope definition, and feasibility analysis before a single shovel hits the ground.', items: ['Project scope definition', 'Preliminary scheduling', 'Budget development', 'Risk assessment'] },
  { title: 'Schedule Management', desc: 'We build and maintain detailed project schedules using industry-standard PM software.', items: ['MS Project / Procore scheduling', 'Critical path analysis', 'Milestone tracking', 'Look-ahead planning'] },
  { title: 'Budget & Cost Control', desc: 'Rigorous cost management to keep your project on budget throughout every phase.', items: ['Monthly cost reports', 'Change order management', 'Cash flow forecasting', 'Budget variance tracking'] },
  { title: 'Subcontractor Coordination', desc: 'We manage all trades and subcontractors — RFIs, submittals, and daily coordination.', items: ['RFI management', 'Submittal review', 'Trade coordination meetings', 'Performance tracking'] },
  { title: 'Reporting & Communication', desc: 'Regular reporting keeps ownership and stakeholders fully informed at every stage.', items: ['Weekly progress reports', 'Photo documentation', 'Executive dashboards', 'Owner meetings'] },
]
const benefits = [
  { icon: TrendingUp, title: 'On-Time Delivery', desc: '98% of BUZ-managed projects finish on schedule.' },
  { icon: DollarSign, title: 'Cost Control', desc: 'Average 7% under-budget performance on managed projects.' },
  { icon: Shield, title: 'Zero Surprises', desc: 'Transparent communication eliminates costly surprises.' },
  { icon: Clock, title: 'Faster Delivery', desc: 'Optimized scheduling reduces project timelines by up to 15%.' },
]
export default function ProjectManagementPage() {
  return (
    <>
      <style>{`.page-hero{position:relative;min-height:55vh;display:flex;align-items:center;background:var(--primary);padding-top:var(--nav-height);overflow:hidden;}.page-hero-bg{position:absolute;inset:0;}.page-hero-bg img{width:100%;height:100%;object-fit:cover;opacity:0.25;}.page-hero-overlay{position:absolute;inset:0;background:linear-gradient(135deg,rgba(10,22,40,0.97)0%,rgba(10,22,40,0.65)100%);}.page-hero-content{position:relative;z-index:1;padding:80px 0 60px;}.pm-services{display:flex;flex-direction:column;gap:24px;}.pm-card{display:grid;grid-template-columns:auto 1fr;gap:28px;background:var(--secondary);border:1px solid rgba(255,255,255,0.06);border-radius:var(--radius-lg);padding:32px;transition:var(--transition);}.pm-card:hover{border-color:rgba(139,92,246,0.3);}.pm-icon{width:56px;height:56px;border-radius:14px;background:rgba(139,92,246,0.15);display:flex;align-items:center;justify-content:center;color:#8B5CF6;flex-shrink:0;}.pm-items{display:grid;grid-template-columns:1fr 1fr;gap:8px;margin-top:16px;}.pm-item-row{display:flex;align-items:center;gap:8px;font-size:0.85rem;color:var(--gray-light);}.benefits-grid{display:grid;grid-template-columns:repeat(4,1fr);gap:24px;}@media(max-width:1024px){.benefits-grid{grid-template-columns:repeat(2,1fr);}}@media(max-width:640px){.pm-card{grid-template-columns:1fr;}.pm-items{grid-template-columns:1fr;}.benefits-grid{grid-template-columns:1fr;}}` }</style>
      <section className="page-hero">
        <div className="page-hero-bg"><Image src="/images/project_management_1781694373963.jpg" alt="Project Management" fill style={{objectFit:'cover'}}/></div>
        <div className="page-hero-overlay"/>
        <div className="container page-hero-content">
          <div style={{display:'flex',alignItems:'center',gap:8,fontSize:'0.8rem',color:'var(--gray-dark)',marginBottom:16}}><Link href="/" style={{color:'var(--accent)',textDecoration:'none'}}>Home</Link> / <Link href="/services" style={{color:'var(--accent)',textDecoration:'none'}}>Services</Link> / Project Management</div>
          <span className="section-tag">Project Management</span>
          <h1 style={{fontFamily:'var(--font-heading)',fontSize:'clamp(2.5rem,5vw,4.5rem)',fontWeight:900,marginTop:12,marginBottom:20}}>Expert Construction <span style={{color:'var(--accent)'}}>Project Management</span></h1>
          <p style={{color:'var(--gray-light)',fontSize:'1.1rem',maxWidth:580,lineHeight:1.7}}>Your project, managed by experts. BUZ Construction's PM team delivers on-time, on-budget results through rigorous planning, communication, and execution.</p>
          <div style={{display:'flex',gap:16,marginTop:32,flexWrap:'wrap'}}><Link href="/contact" className="btn btn-primary btn-lg">Get PM Services <ArrowRight size={18}/></Link></div>
        </div>
      </section>
      <section className="section bg-dark"><div className="container">
        <div className="section-header"><span className="section-tag">Benefits</span><h2 className="section-title">The PM <span>Advantage</span></h2><div className="accent-line"/></div>
        <div className="benefits-grid">{benefits.map(b=>(<div key={b.title} className="card" style={{textAlign:'center'}}><div style={{width:64,height:64,borderRadius:16,background:'rgba(139,92,246,0.15)',display:'flex',alignItems:'center',justifyContent:'center',margin:'0 auto 16px',color:'#8B5CF6'}}><b.icon size={28}/></div><h4 style={{fontFamily:'var(--font-heading)',marginBottom:10}}>{b.title}</h4><p style={{fontSize:'0.88rem',color:'var(--gray-mid)'}}>{b.desc}</p></div>))}</div>
      </div></section>
      <section className="section" style={{background:'var(--secondary)'}}><div className="container">
        <div className="section-header"><span className="section-tag">PM Services</span><h2 className="section-title">What We <span>Manage</span></h2><div className="accent-line"/></div>
        <div className="pm-services">{services.map(s=>(<div key={s.title} className="pm-card"><div className="pm-icon"><ClipboardList size={24}/></div><div><h3 style={{fontFamily:'var(--font-heading)',fontSize:'1.4rem',marginBottom:8}}>{s.title}</h3><p style={{color:'var(--gray-mid)',fontSize:'0.9rem'}}>{s.desc}</p><div className="pm-items">{s.items.map(item=>(<div key={item} className="pm-item-row"><CheckCircle size={14} style={{color:'#8B5CF6',flexShrink:0}}/>{item}</div>))}</div></div></div>))}</div>
      </div></section>
      <section className="section bg-dark"><div className="container"><ConsultationForm serviceType="Project Management" title="Talk to Our PM Team" subtitle="Tell us about your project and we'll show you how BUZ PM services can save you time and money."/></div></section>
    </>
  )
}
