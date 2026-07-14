'use client'
import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'
import { ArrowRight, ExternalLink } from 'lucide-react'

const categories = ['All', 'Commercial', 'Residential', 'Renovation', 'Project Management', 'Design-Build']

const projects = [
  { id: 1, title: 'Oakville Corporate Centre', category: 'Commercial', img: '/images/buz_oakville_office.jpg', location: 'Oakville, ON', year: 2023, sqft: '120,000', desc: '6-storey Class-A office building. Completed on time and 5% under budget.' },
  { id: 2, title: 'The Meridian Luxury Estate', category: 'Residential', img: '/images/portfolio_residential_1781694457475.jpg', location: 'Mississauga, ON', year: 2023, sqft: '8,500', desc: 'Custom luxury estate with 6 bedrooms, home theatre, and resort-style pool.' },
  { id: 3, title: 'Ember & Oak Restaurant', category: 'Renovation', img: '/images/buz_restaurant.jpg', location: 'Toronto, ON', year: 2024, sqft: '4,200', desc: 'Complete restaurant fit-out including custom millwork and commercial kitchen.' },
  { id: 4, title: 'Westbrook Industrial Park', category: 'Commercial', img: '/images/buz_warehouse.jpg', location: 'Brampton, ON', year: 2022, sqft: '200,000', desc: '200,000 sq ft industrial warehouse and distribution centre.' },
  { id: 5, title: 'Hillcrest Custom Home', category: 'Residential', img: '/images/buz_townhomes.jpg', location: 'Burlington, ON', year: 2024, sqft: '5,200', desc: 'Modern farmhouse-style custom home with chef\'s kitchen and 3-car garage.' },
  { id: 6, title: 'Hamilton City Hall Renovation', category: 'Project Management', img: '/images/buz_project_manager.jpg', location: 'Hamilton, ON', year: 2023, sqft: '40,000', desc: 'Full PM services for heritage building renovation. Zero safety incidents.' },
  { id: 7, title: 'GreenSpace Medical Clinic', category: 'Design-Build', img: '/images/design_build_1781694386091.jpg', location: 'Vaughan, ON', year: 2024, sqft: '12,000', desc: 'Design-build delivery from concept to occupancy in just 8 months.' },
  { id: 8, title: 'Premier Kitchen & Bath Reno', category: 'Renovation', img: '/images/buz_bathroom_reno.jpg', location: 'Oakville, ON', year: 2024, sqft: '1,800', desc: 'Full kitchen and master bathroom renovation with custom cabinetry.' },
  { id: 9, title: 'Nexus Office Campus', category: 'Commercial', img: '/images/portfolio_commercial_1781694443603.jpg', location: 'North York, ON', year: 2022, sqft: '85,000', desc: 'Multi-building tech campus with LEED Gold certification.' },
]

export default function PortfolioPage() {
  const [active, setActive] = useState('All')
  const [selected, setSelected] = useState<typeof projects[0] | null>(null)
  const filtered = active === 'All' ? projects : projects.filter(p => p.category === active)

  return (
    <>
      <style>{`
        .page-hero{position:relative;min-height:45vh;display:flex;align-items:center;background:var(--primary);padding-top:var(--nav-height);overflow:hidden;}
        .page-hero-bg{position:absolute;inset:0;}.page-hero-bg img{width:100%;height:100%;object-fit:cover;opacity:0.9;}
        .page-hero-overlay{position:absolute;inset:0;background:linear-gradient(90deg, rgba(245,242,235,1) 0%, rgba(245,242,235,0.85) 45%, rgba(245,242,235,0) 100%) !important;}
        .page-hero-content{position:relative;z-index:1;padding:80px 0 60px;}
        .filter-tabs{display:flex;flex-wrap:wrap;gap:8px;justify-content:center;margin-bottom:40px;}
        .filter-tab{padding:8px 20px;border-radius:50px;font-size:0.85rem;font-weight:700;border:1px solid rgba(21,30,49,0.15);background:transparent;color:var(--gray-dark);cursor:pointer;transition:var(--transition);}
        .filter-tab.active,.filter-tab:hover{background:var(--accent);color:var(--primary);border-color:var(--accent);}
        .portfolio-masonry{display:grid;grid-template-columns:repeat(3,1fr);gap:20px;}
        .p-card{border-radius:var(--radius-lg);overflow:hidden;position:relative;cursor:pointer;transition:var(--transition);aspect-ratio:4/3;}
        .p-card:hover{transform:translateY(-4px);box-shadow:var(--shadow-lg);}
        .p-card img{width:100%;height:100%;object-fit:cover;transition:transform 0.5s ease;}
        .p-card:hover img{transform:scale(1.06);}
        .p-card-overlay{position:absolute;inset:0;background:linear-gradient(to top,rgba(10,22,40,0.95)0%,rgba(10,22,40,0.2)60%,transparent 100%);transition:var(--transition);}
        .p-card:hover .p-card-overlay{background:linear-gradient(to top,rgba(10,22,40,0.98)0%,rgba(10,22,40,0.5)70%,transparent 100%);}
        .p-card-content{position:absolute;bottom:0;left:0;right:0;padding:20px;z-index:1;}
        .p-card-tag {
          position: absolute; top: 16px; left: 16px; z-index: 2;
          background: var(--secondary); color: var(--accent); padding: 6px 14px; font-size: 0.75rem;
          font-weight: 800; text-transform: uppercase; letter-spacing: 0.1em;
          border-radius: 50px; border: 1px solid rgba(198,167,94,0.35);
          box-shadow: var(--shadow-sm);
        }
        .p-title{font-family:var(--font-heading);font-size:1.1rem;font-weight:800;margin-bottom:4px;color:var(--white);}
        .p-meta{font-size:0.78rem;color:var(--gray-light);}
        .p-desc{font-size:0.82rem;color:var(--gray-light);line-height:1.5;margin-top:8px;opacity:0;transform:translateY(8px);transition:var(--transition);}
        .p-card:hover .p-desc{opacity:1;transform:translateY(0);}
        .modal-backdrop{position:fixed;inset:0;background:rgba(0,0,0,0.8);backdrop-filter:blur(8px);z-index:2000;display:flex;align-items:center;justify-content:center;padding:20px;}
        .modal-project{background:var(--secondary);border-radius:var(--radius-xl);max-width:700px;width:100%;overflow:hidden;animation:scaleIn 0.25s ease;}
        .modal-img{position:relative;aspect-ratio:16/9;}
        .modal-img img{width:100%;height:100%;object-fit:cover;}
        .modal-body{padding:32px;}
        .modal-tag {
          display: inline-block; background: rgba(21,30,49,0.95);
          color: var(--accent); padding: 6px 14px; font-size: 0.75rem;
          font-weight: 700; text-transform: uppercase; letter-spacing: 0.1em;
          border-radius: 50px; border: 1px solid rgba(198,167,94,0.35);
          margin-bottom: 16px; box-shadow: var(--shadow-sm);
        }
        .modal-close-btn{position:absolute;top:16px;right:16px;z-index:1;background:rgba(0,0,0,0.5);border:none;color:white;width:36px;height:36px;border-radius:8px;display:flex;align-items:center;justify-content:center;cursor:pointer;font-size:1.2rem;}
        @media(max-width:1024px){.portfolio-masonry{grid-template-columns:repeat(2,1fr);}}
        @media(max-width:640px){.portfolio-masonry{grid-template-columns:1fr;}}
      `}</style>

      <section className="page-hero">
        <div className="page-hero-bg"><Image src="/images/buz_aerial_site.jpg" alt="BUZ Construction portfolio" fill style={{objectFit:'cover'}}/></div>
        <div className="page-hero-overlay"/>
        <div className="container page-hero-content">
          <div style={{display:'flex',alignItems:'center',gap:8,fontSize:'0.8rem',color:'var(--gray-dark)',marginBottom:16}}><Link href="/" style={{color:'var(--accent)',textDecoration:'none'}}>Home</Link> / Portfolio</div>
          <span className="section-tag">Our Work</span>
          <h1 style={{fontFamily:'var(--font-heading)',fontSize:'clamp(2.5rem,5vw,4.5rem)',fontWeight:900,marginTop:12,marginBottom:20}}>Featured <span style={{color:'var(--accent)'}}>Projects</span></h1>
          <p style={{color:'var(--secondary)',fontSize:'1.1rem',maxWidth:560,lineHeight:1.7}}>Browse our portfolio of completed commercial, residential, renovation, and design-build projects across Ontario.</p>
        </div>
      </section>

      <section className="section bg-dark">
        <div className="container">
          <div className="filter-tabs">
            {categories.map(c=>(<button key={c} className={`filter-tab ${active===c?'active':''}`} onClick={()=>setActive(c)}>{c}</button>))}
          </div>
          <div className="portfolio-masonry">
            {filtered.map(p=>(
              <div key={p.id} className="p-card" onClick={()=>setSelected(p)}>
                <Image src={p.img} alt={p.title} fill style={{objectFit:'cover'}}/>
                <div className="p-card-overlay"/>
                <span className="p-card-tag">{p.category}</span>
                <div className="p-card-content">
                  <div className="p-title">{p.title}</div>
                  <div className="p-meta">{p.location} · {p.year}</div>
                  <div className="p-desc">{p.desc}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Project Modal */}
      {selected && (
        <div className="modal-backdrop" onClick={()=>setSelected(null)}>
          <div className="modal-project" onClick={e=>e.stopPropagation()}>
            <div className="modal-img">
              <Image src={selected.img} alt={selected.title} fill style={{objectFit:'cover'}}/>
              <button className="modal-close-btn" onClick={()=>setSelected(null)}>✕</button>
            </div>
            <div className="modal-body">
              <span className="modal-tag">{selected.category}</span>
              <h2 style={{fontFamily:'var(--font-heading)',fontSize:'1.8rem',margin:'8px 0'}}>{selected.title}</h2>
              <div style={{display:'flex',gap:20,flexWrap:'wrap',margin:'12px 0',fontSize:'0.85rem',color:'var(--gray-mid)'}}>
                <span>📍 {selected.location}</span>
                <span>📅 {selected.year}</span>
                <span>📐 {selected.sqft} sq ft</span>
              </div>
              <p style={{color:'var(--gray-light)',lineHeight:1.7,marginBottom:24}}>{selected.desc}</p>
              <Link href="/contact" className="btn btn-primary">Discuss a Similar Project <ArrowRight size={16}/></Link>
            </div>
          </div>
        </div>
      )}

      <section className="section" style={{background:'var(--secondary)',textAlign:'center'}}>
        <div className="container">
          <span className="section-tag">Start Your Project</span>
          <h2 className="section-title" style={{marginTop:12, color: 'var(--white)'}}>Ready to <span style={{color: 'var(--accent)'}}>Build?</span></h2>
          <p style={{color:'var(--gray-mid)',marginBottom:36,maxWidth:480,margin:'16px auto 36px'}}>Join our growing portfolio of satisfied clients across Ontario.</p>
          <Link href="/contact" className="btn btn-accent btn-lg">Get Free Quote <ArrowRight size={18}/></Link>
        </div>
      </section>
    </>
  )
}
