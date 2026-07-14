import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { Building2, CheckCircle, ArrowRight } from 'lucide-react'
import ConsultationForm from '@/components/ConsultationForm'

export const metadata: Metadata = {
  title: 'Commercial Construction | Office Buildings, Retail, Warehouses',
  description: 'BUZ Construction Group Inc. delivers premium commercial construction in Ontario. Office buildings, retail stores, restaurants, warehouses, and tenant improvements.',
}
const subServices = [
  { title: 'Office Buildings', desc: 'Class-A and Class-B commercial office buildings from 5,000 to 500,000+ sq ft.', items: ['Open-concept office layouts', 'LEED-certified builds', 'Parking structures', 'Full mechanical & electrical'] },
  { title: 'Retail Stores & Plazas', desc: 'Retail construction and fit-outs for national brands, franchises, and local businesses.', items: ['Storefront construction', 'Shopping plaza builds', 'Drive-thru facilities', 'Point-of-sale infrastructure'] },
  { title: 'Restaurants & Hospitality', desc: 'Full-service restaurant construction and hospitality builds — from QSR to fine dining.', items: ['Commercial kitchen construction', 'HVAC & ventilation', 'Custom millwork & finishes', 'Health code compliant'] },
  { title: 'Warehouses & Industrial', desc: 'Functional, efficient industrial buildings designed for modern logistics and manufacturing.', items: ['Clear-span design', 'Dock door installation', 'Mezzanine construction', 'Fire suppression systems'] },
  { title: 'Tenant Improvements', desc: 'Transform leased commercial space into a custom, functional, branded environment.', items: ['Demising walls & layouts', 'Flooring & ceilings', 'Mechanical coordination', 'Fast-track delivery'] },
]
export default function CommercialPage() {
  return (
    <>
      <style>{`
        .page-hero{position:relative;min-height:55vh;display:flex;align-items:center;background:var(--primary);padding-top:var(--nav-height);overflow:hidden;}
        .page-hero-bg{position:absolute;inset:0;} .page-hero-bg img{width:100%;height:100%;object-fit:cover;opacity:0.25;}
        .page-hero-overlay{position:absolute;inset:0;background:linear-gradient(135deg,rgba(10,22,40,0.97)0%,rgba(10,22,40,0.65)100%);}
        .page-hero-content{position:relative;z-index:1;padding:80px 0 60px;}
        .sub-services{display:flex;flex-direction:column;gap:40px;}
        .sub-card{display:grid;grid-template-columns:auto 1fr;gap:28px;background:var(--secondary);border:1px solid rgba(255,255,255,0.06);border-radius:var(--radius-lg);padding:32px;transition:var(--transition);}
        .sub-card:hover{border-color:rgba(245,166,35,0.3);}
        .sub-icon{width:56px;height:56px;border-radius:14px;background:rgba(59,130,246,0.15);display:flex;align-items:center;justify-content:center;color:#3B82F6;flex-shrink:0;}
        .sub-items{display:grid;grid-template-columns:1fr 1fr;gap:8px;margin-top:16px;}
        .sub-item-row{display:flex;align-items:center;gap:8px;font-size:0.85rem;color:var(--gray-light);}
        @media(max-width:640px){.sub-card{grid-template-columns:1fr;} .sub-items{grid-template-columns:1fr;}}
      `}</style>
      <section className="page-hero">
        <div className="page-hero-bg"><Image src="/images/buz_commercial_hero.jpg" alt="Commercial construction" fill style={{objectFit:'cover'}}/></div>
        <div className="page-hero-overlay"/>
        <div className="container page-hero-content">
          <div style={{display:'flex',alignItems:'center',gap:8,fontSize:'0.8rem',color:'var(--gray-dark)',marginBottom:16}}>
            <Link href="/" style={{color:'var(--accent)',textDecoration:'none'}}>Home</Link> / <Link href="/services" style={{color:'var(--accent)',textDecoration:'none'}}>Services</Link> / Commercial
          </div>
          <span className="section-tag">Commercial Construction</span>
          <h1 style={{fontFamily:'var(--font-heading)',fontSize:'clamp(2.5rem,5vw,4.5rem)',fontWeight:900,marginTop:12,marginBottom:20}}>
            Commercial <span style={{color:'var(--accent)'}}>Construction</span>
          </h1>
          <p style={{color:'var(--gray-light)',fontSize:'1.1rem',maxWidth:580,lineHeight:1.7}}>
            From office towers to retail plazas, BUZ Construction delivers commercial projects on time, on budget, and built to last.
          </p>
          <div style={{display:'flex',gap:16,marginTop:32,flexWrap:'wrap'}}>
            <Link href="/contact" className="btn btn-primary btn-lg">Get Free Quote <ArrowRight size={18}/></Link>
            <Link href="/portfolio" className="btn btn-outline btn-lg">View Projects <ArrowRight size={18}/></Link>
          </div>
        </div>
      </section>
      <section className="section bg-dark">
        <div className="container">
          <div className="section-header">
            <span className="section-tag">Our Expertise</span>
            <h2 className="section-title">Commercial <span>Services</span></h2>
            <div className="accent-line"/>
          </div>
          <div className="sub-services">
            {subServices.map(s=>(
              <div key={s.title} className="sub-card">
                <div className="sub-icon"><Building2 size={24}/></div>
                <div>
                  <h3 style={{fontFamily:'var(--font-heading)',fontSize:'1.4rem',marginBottom:8}}>{s.title}</h3>
                  <p style={{color:'var(--gray-mid)',fontSize:'0.9rem',marginBottom:0}}>{s.desc}</p>
                  <div className="sub-items">
                    {s.items.map(item=>(
                      <div key={item} className="sub-item-row"><CheckCircle size={14} style={{color:'var(--accent)',flexShrink:0}}/>{item}</div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      <section className="section" style={{background:'var(--secondary)'}}>
        <div className="container">
          <ConsultationForm serviceType="Commercial Construction" title="Start Your Commercial Project" subtitle="Tell us about your commercial construction needs and we'll provide a detailed consultation and quote."/>
        </div>
      </section>
    </>
  )
}
