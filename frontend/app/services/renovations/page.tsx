import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { Wrench, CheckCircle, ArrowRight } from 'lucide-react'
import ConsultationForm from '@/components/ConsultationForm'

export const metadata: Metadata = {
  title: 'Renovations | Kitchen, Bathroom, Whole-Home & Commercial Renovations',
  description: 'BUZ Construction delivers stunning renovations across Ontario — kitchen renovations, bathroom renovations, whole-home renovations, and commercial renovations.',
}
const subServices = [
  { title: 'Kitchen Renovations', desc: 'Transform your kitchen into the heart of your home with custom cabinetry, premium countertops, and expert craftsmanship.', items: ['Custom cabinet design', 'Quartz & marble countertops', 'Appliance integration', 'Electrical & plumbing updates'] },
  { title: 'Bathroom Renovations', desc: 'Create your personal spa retreat with luxury bathroom renovations that blend beauty and function.', items: ['Custom tile & stonework', 'Walk-in showers & soaker tubs', 'Vanity & fixture installation', 'Heated flooring systems'] },
  { title: 'Whole-Home Renovations', desc: 'A complete home transformation from top to bottom — new floors, ceilings, walls, and everything in between.', items: ['Open-concept conversions', 'Flooring replacement', 'Interior painting & finishing', 'Lighting & electrical upgrades'] },
  { title: 'Commercial Renovations', desc: 'Keep your business operational while we renovate your commercial space to meet modern standards.', items: ['Phased renovation planning', 'Office & retail fit-outs', 'Accessibility upgrades', 'Heritage building renovations'] },
]
export default function RenovationsPage() {
  return (
    <>
      <style>{`.page-hero{position:relative;min-height:55vh;display:flex;align-items:center;background:var(--primary);padding-top:var(--nav-height);overflow:hidden;}.page-hero-bg{position:absolute;inset:0;}.page-hero-bg img{width:100%;height:100%;object-fit:cover;opacity:0.25;}.page-hero-overlay{position:absolute;inset:0;background:linear-gradient(135deg,rgba(10,22,40,0.97)0%,rgba(10,22,40,0.65)100%);}.page-hero-content{position:relative;z-index:1;padding:80px 0 60px;}.sub-card{display:grid;grid-template-columns:auto 1fr;gap:28px;background:var(--secondary);border:1px solid rgba(255,255,255,0.06);border-radius:var(--radius-lg);padding:32px;transition:var(--transition);margin-bottom:24px;}.sub-card:hover{border-color:rgba(245,158,11,0.3);}.sub-icon{width:56px;height:56px;border-radius:14px;background:rgba(245,158,11,0.15);display:flex;align-items:center;justify-content:center;color:#F59E0B;flex-shrink:0;}.sub-items{display:grid;grid-template-columns:1fr 1fr;gap:8px;margin-top:16px;}.sub-item-row{display:flex;align-items:center;gap:8px;font-size:0.85rem;color:var(--gray-light);}@media(max-width:640px){.sub-card{grid-template-columns:1fr;}.sub-items{grid-template-columns:1fr;}}`}</style>
      <section className="page-hero">
        <div className="page-hero-bg"><Image src="/images/kitchen_renovation_1781694354275.png" alt="Renovations" fill style={{objectFit:'cover'}}/></div>
        <div className="page-hero-overlay"/>
        <div className="container page-hero-content">
          <div style={{display:'flex',alignItems:'center',gap:8,fontSize:'0.8rem',color:'var(--gray-dark)',marginBottom:16}}><Link href="/" style={{color:'var(--accent)',textDecoration:'none'}}>Home</Link> / <Link href="/services" style={{color:'var(--accent)',textDecoration:'none'}}>Services</Link> / Renovations</div>
          <span className="section-tag">Renovations</span>
          <h1 style={{fontFamily:'var(--font-heading)',fontSize:'clamp(2.5rem,5vw,4.5rem)',fontWeight:900,marginTop:12,marginBottom:20}}>Renovation <span style={{color:'var(--accent)'}}>Excellence</span></h1>
          <p style={{color:'var(--gray-light)',fontSize:'1.1rem',maxWidth:560,lineHeight:1.7}}>We don't just renovate spaces — we transform them. Every BUZ renovation is planned to perfection and executed with care.</p>
          <div style={{display:'flex',gap:16,marginTop:32,flexWrap:'wrap'}}><Link href="/contact" className="btn btn-primary btn-lg">Get Free Quote <ArrowRight size={18}/></Link><Link href="/portfolio" className="btn btn-outline btn-lg">View Projects <ArrowRight size={18}/></Link></div>
        </div>
      </section>
      <section className="section bg-dark"><div className="container"><div className="section-header"><span className="section-tag">Renovation Services</span><h2 className="section-title">What We <span>Renovate</span></h2><div className="accent-line"/></div>
        {subServices.map(s=>(<div key={s.title} className="sub-card"><div className="sub-icon"><Wrench size={24}/></div><div><h3 style={{fontFamily:'var(--font-heading)',fontSize:'1.4rem',marginBottom:8}}>{s.title}</h3><p style={{color:'var(--gray-mid)',fontSize:'0.9rem'}}>{s.desc}</p><div className="sub-items">{s.items.map(item=>(<div key={item} className="sub-item-row"><CheckCircle size={14} style={{color:'#F59E0B',flexShrink:0}}/>{item}</div>))}</div></div></div>))}
      </div></section>
      <section className="section" style={{background:'var(--secondary)'}}><div className="container"><ConsultationForm serviceType="Renovations" title="Plan Your Renovation" subtitle="Tell us about the space you want to transform and we'll create a plan."/></div></section>
    </>
  )
}
