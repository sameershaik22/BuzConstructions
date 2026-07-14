import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { Home, CheckCircle, ArrowRight } from 'lucide-react'
import ConsultationForm from '@/components/ConsultationForm'

export const metadata: Metadata = {
  title: 'Residential Construction | Custom Homes, Additions, Basements',
  description: 'BUZ Construction builds luxury custom homes, home additions, basement finishing, and residential construction across Ontario.',
}
const subServices = [
  { title: 'Custom Luxury Homes', desc: 'Fully custom homes built from your unique vision. We manage every detail from foundation to rooftop.', items: ['Architectural design coordination', 'Premium finishes & materials', 'Smart home integration', 'Landscaping coordination'] },
  { title: 'Home Additions', desc: 'Expand your living space seamlessly with professionally designed and built home additions.', items: ['Second-storey additions', 'Side additions', 'Sunroom & mudroom', 'Structural engineering'] },
  { title: 'Basement Finishing', desc: 'Transform your unfinished basement into beautiful, functional living space.', items: ['Full interior finishing', 'Legal basement suites', 'Home theatre & gyms', 'Egress windows'] },
  { title: 'Luxury Home Construction', desc: 'For discerning clients who demand the absolute finest in materials, craftsmanship, and finishes.', items: ['Imported materials sourcing', 'Custom millwork', 'Wine cellars & spa bathrooms', 'Pool & outdoor integration'] },
]
export default function ResidentialPage() {
  return (
    <>
      <style>{`
        .page-hero{position:relative;min-height:55vh;display:flex;align-items:center;background:var(--primary);padding-top:var(--nav-height);overflow:hidden;}
        .page-hero-bg{position:absolute;inset:0;} .page-hero-bg img{width:100%;height:100%;object-fit:cover;opacity:0.25;}
        .page-hero-overlay{position:absolute;inset:0;background:linear-gradient(135deg,rgba(10,22,40,0.97)0%,rgba(10,22,40,0.65)100%);}
        .page-hero-content{position:relative;z-index:1;padding:80px 0 60px;}
        .sub-card{display:grid;grid-template-columns:auto 1fr;gap:28px;background:var(--secondary);border:1px solid rgba(255,255,255,0.06);border-radius:var(--radius-lg);padding:32px;transition:var(--transition);margin-bottom:24px;}
        .sub-card:hover{border-color:rgba(34,197,94,0.3);}
        .sub-icon{width:56px;height:56px;border-radius:14px;background:rgba(34,197,94,0.15);display:flex;align-items:center;justify-content:center;color:#22C55E;flex-shrink:0;}
        .sub-items{display:grid;grid-template-columns:1fr 1fr;gap:8px;margin-top:16px;}
        .sub-item-row{display:flex;align-items:center;gap:8px;font-size:0.85rem;color:var(--gray-light);}
        @media(max-width:640px){.sub-card{grid-template-columns:1fr;}.sub-items{grid-template-columns:1fr;}}
      `}</style>
      <section className="page-hero">
        <div className="page-hero-bg"><Image src="/images/residential_luxury_home_1781694338229.jpg" alt="Residential construction" fill style={{objectFit:'cover'}}/></div>
        <div className="page-hero-overlay"/>
        <div className="container page-hero-content">
          <div style={{display:'flex',alignItems:'center',gap:8,fontSize:'0.8rem',color:'var(--gray-dark)',marginBottom:16}}>
            <Link href="/" style={{color:'var(--accent)',textDecoration:'none'}}>Home</Link> / <Link href="/services" style={{color:'var(--accent)',textDecoration:'none'}}>Services</Link> / Residential
          </div>
          <span className="section-tag">Residential Construction</span>
          <h1 style={{fontFamily:'var(--font-heading)',fontSize:'clamp(2.5rem,5vw,4.5rem)',fontWeight:900,marginTop:12,marginBottom:20}}>
            Residential <span style={{color:'var(--accent)'}}>Construction</span>
          </h1>
          <p style={{color:'var(--gray-light)',fontSize:'1.1rem',maxWidth:560,lineHeight:1.7}}>Your dream home deserves a builder who cares as much as you do. BUZ Construction brings your vision to life with unmatched craftsmanship.</p>
          <div style={{display:'flex',gap:16,marginTop:32,flexWrap:'wrap'}}>
            <Link href="/contact" className="btn btn-primary btn-lg">Get Free Quote <ArrowRight size={18}/></Link>
            <Link href="/portfolio" className="btn btn-outline btn-lg">View Homes <ArrowRight size={18}/></Link>
          </div>
        </div>
      </section>
      <section className="section bg-dark">
        <div className="container">
          <div className="section-header"><span className="section-tag">Residential Services</span><h2 className="section-title">What We <span>Build</span></h2><div className="accent-line"/></div>
          {subServices.map(s=>(
            <div key={s.title} className="sub-card">
              <div className="sub-icon"><Home size={24}/></div>
              <div>
                <h3 style={{fontFamily:'var(--font-heading)',fontSize:'1.4rem',marginBottom:8}}>{s.title}</h3>
                <p style={{color:'var(--gray-mid)',fontSize:'0.9rem'}}>{s.desc}</p>
                <div className="sub-items">{s.items.map(item=>(<div key={item} className="sub-item-row"><CheckCircle size={14} style={{color:'#22C55E',flexShrink:0}}/>{item}</div>))}</div>
              </div>
            </div>
          ))}
        </div>
      </section>
      <section className="section" style={{background:'var(--secondary)'}}><div className="container"><ConsultationForm serviceType="Residential Construction" title="Build Your Dream Home" subtitle="Tell us about your vision and we'll schedule a free consultation to bring it to life."/></div></section>
    </>
  )
}
