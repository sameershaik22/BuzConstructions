import type { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import { ArrowRight, MapPin, Building2, Home, Wrench, CheckCircle, Phone } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Service Areas | GTA Construction Company Ontario',
  description: 'BUZ Construction Group Inc. serves the entire Greater Toronto Area including Toronto, Mississauga, Brampton, Oakville, Hamilton, Vaughan, Burlington and surrounding Ontario cities.',
}

const areas = [
  {
    name: 'Toronto',
    slug: 'toronto',
    desc: 'Toronto\'s most trusted general contractor for commercial, residential, and renovation projects across all 44 wards.',
    img: '/images/buz_commercial_service_area.jpg',
    projects: 145,
    highlight: 'Downtown Core & East York',
  },
  {
    name: 'Mississauga',
    slug: 'mississauga',
    desc: 'Full-service construction in Mississauga — our home base. Commercial builds, custom homes, and complete renovations.',
    img: '/images/buz_luxury_home.jpg',
    projects: 120,
    highlight: 'Port Credit & Streetsville',
  },
  {
    name: 'Brampton',
    slug: 'brampton',
    desc: 'Commercial construction and residential builds for Brampton\'s fastest-growing communities and business districts.',
    img: '/images/buz_warehouse.jpg',
    projects: 78,
    highlight: 'Downtown Brampton & Springdale',
  },
  {
    name: 'Oakville',
    slug: 'oakville',
    desc: 'Premium residential construction, luxury renovations, and commercial builds across Oakville\'s prestigious communities.',
    img: '/images/buz_townhomes.jpg',
    projects: 65,
    highlight: 'Old Oakville & Bronte',
  },
  {
    name: 'Hamilton',
    slug: 'hamilton',
    desc: 'Industrial, commercial, and residential construction serving Hamilton and the surrounding Golden Horseshoe.',
    img: '/images/buz_careers_carpenter.jpg',
    projects: 42,
    highlight: 'Hamilton Downtown & Ancaster',
  },
]

const services = ['Commercial Construction', 'Residential Construction', 'Renovations', 'Project Management', 'Design-Build']

export default function ServiceAreasPage() {
  return (
    <>
      <style>{`
        .page-hero {
          position: relative; min-height: 48vh;
          display: flex; align-items: center;
          background: var(--primary); padding-top: var(--nav-height); overflow: hidden;
        }
        .page-hero-bg { position: absolute; inset: 0; }
        .page-hero-bg img { width: 100%; height: 100%; object-fit: cover; opacity: 0.9; }
        .page-hero-overlay { position: absolute; inset: 0; background: linear-gradient(90deg, rgba(245,242,235,1) 0%, rgba(245,242,235,0.85) 45%, rgba(245,242,235,0) 100%) !important; }
        .page-hero-content { position: relative; z-index: 1; padding: 80px 0 60px; }
        .areas-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 24px; }
        .area-card {
          border-radius: var(--radius-xl); overflow: hidden;
          background: var(--secondary); border: 1px solid rgba(255,255,255,0.07);
          transition: var(--transition); text-decoration: none; color: inherit; display: block;
        }
        .area-card:hover { transform: translateY(-6px); border-color: rgba(245,166,35,0.3); box-shadow: var(--shadow-lg); }
        .area-img { position: relative; aspect-ratio: 16/9; overflow: hidden; }
        .area-img img { width: 100%; height: 100%; object-fit: cover; transition: transform 0.5s ease; }
        .area-card:hover .area-img img { transform: scale(1.05); }
        .area-img::after { content: ''; position: absolute; inset: 0; background: linear-gradient(to top, rgba(10,22,40,0.9) 0%, transparent 60%); }
        .area-img-badge { position: absolute; bottom: 14px; left: 14px; z-index: 1; display: flex; align-items: center; gap: 6px; background: var(--accent); color: var(--primary); padding: 4px 12px; border-radius: 50px; font-size: 0.75rem; font-weight: 800; }
        .area-body { padding: 24px; }
        .area-name { font-family: var(--font-heading); font-size: 1.6rem; font-weight: 800; margin-bottom: 6px; color: var(--white); }
        .area-highlight { font-size: 0.78rem; color: var(--accent); font-weight: 700; text-transform: uppercase; letter-spacing: 0.1em; margin-bottom: 10px; }
        .area-desc { color: var(--gray-mid); font-size: 0.88rem; line-height: 1.65; margin-bottom: 16px; }
        .area-link { display: flex; align-items: center; gap: 6px; color: var(--accent); font-size: 0.85rem; font-weight: 700; }
        .coverage-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 48px; align-items: center; }
        .coverage-map { background: var(--secondary); border: 1px solid rgba(255,255,255,0.07); border-radius: var(--radius-xl); overflow: hidden; }
        .call-us-btn { display: flex; align-items: center; gap: 8px; color: var(--white); border: 1.5px solid rgba(255,255,255,0.2); padding: 0 24px; border-radius: 50px; font-weight: 700; transition: var(--transition); text-decoration: none; font-size: 0.95rem; height: 48px; }
        .call-us-btn:hover { background: rgba(255,255,255,0.1); border-color: rgba(255,255,255,0.4); }
        @media(max-width:1024px){ .areas-grid{grid-template-columns:repeat(2,1fr);} .coverage-grid{grid-template-columns:1fr;} }
        @media(max-width:640px){ .areas-grid{grid-template-columns:1fr;} }
      `}</style>

      <section className="page-hero">
        <div className="page-hero-bg">
          <Image src="/images/buz_service_areas_hero.jpg" alt="Service areas" fill style={{ objectFit: 'cover' }} />
        </div>
        <div className="page-hero-overlay" />
        <div className="container page-hero-content">
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: '0.8rem', color: 'var(--gray-dark)', marginBottom: 16 }}>
            <Link href="/" style={{ color: 'var(--accent)', textDecoration: 'none' }}>Home</Link>
            <span>/</span><span>Service Areas</span>
          </div>
          <span className="section-tag">Where We Build</span>
          <h1 style={{ fontFamily: 'var(--font-heading)', fontSize: 'clamp(2.8rem,6vw,5rem)', fontWeight: 900, marginTop: 12, marginBottom: 16 }}>
            Serving <span style={{ color: 'var(--accent)' }}>Greater Toronto</span> & Beyond
          </h1>
          <p style={{ color: 'var(--gray-light)', fontSize: '1.05rem', maxWidth: 560, lineHeight: 1.75 }}>
            BUZ Construction delivers premium commercial, residential, and renovation services across the GTA — 500+ completed projects, 200+ satisfied clients.
          </p>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginTop: 24, flexWrap: 'wrap' }}>
            {areas.map(a => (
              <Link key={a.slug} href={`/service-areas/${a.slug}`}
                style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '8px 16px', borderRadius: '50px', background: 'var(--white)', border: '1.5px solid var(--accent)', fontSize: '0.85rem', fontWeight: 800, color: 'var(--primary)', textDecoration: 'none', boxShadow: 'var(--shadow-sm)' }}>
                <MapPin size={14} style={{ color: 'var(--accent)' }} /> {a.name}
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Areas Grid */}
      <section className="section bg-dark">
        <div className="container">
          <div className="section-header">
            <span className="section-tag">Service Areas</span>
            <h2 className="section-title">Cities We <span>Serve</span></h2>
            <p className="section-subtitle">Click any city to see local projects, services, and contact details.</p>
            <div className="accent-line" />
          </div>
          <div className="areas-grid">
            {areas.map(a => (
              <Link key={a.slug} href={`/service-areas/${a.slug}`} className="area-card">
                <div className="area-img">
                  <Image src={a.img} alt={a.name} fill style={{ objectFit: 'cover' }} />
                  <div className="area-img-badge"><MapPin size={11} /> {a.projects}+ Projects</div>
                </div>
                <div className="area-body">
                  <div className="area-name">{a.name}</div>
                  <div className="area-highlight">{a.highlight}</div>
                  <div className="area-desc">{a.desc}</div>
                  <div className="area-link">View {a.name} Services <ArrowRight size={14} /></div>
                </div>
              </Link>
            ))}
            {/* CTA card */}
            <div style={{ borderRadius: 'var(--radius-xl)', background: 'linear-gradient(135deg, rgba(245,166,35,0.15) 0%, rgba(245,166,35,0.05) 100%)', border: '1px solid rgba(245,166,35,0.25)', padding: '32px', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', textAlign: 'center', gap: 16 }}>
              <div style={{ fontSize: '2.5rem' }}>📍</div>
              <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.5rem' }}>Serving all of Ontario</h3>
              <p style={{ fontSize: '0.88rem', color: 'var(--gray-mid)', lineHeight: 1.65 }}>We also serve Burlington, Vaughan, Markham, Richmond Hill, Scarborough, Etobicoke, and more.</p>
              <Link href="/contact" className="btn btn-primary">Get a Quote <ArrowRight size={16} /></Link>
            </div>
          </div>
        </div>
      </section>

      {/* Map + Coverage */}
      <section className="section" style={{ background: 'var(--secondary)' }}>
        <div className="container">
          <div className="coverage-grid">
            <div>
              <span className="section-tag">Full Coverage</span>
              <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: 'clamp(2rem,4vw,3rem)', fontWeight: 800, marginTop: 12, marginBottom: 20, color: 'var(--white)' }}>
                Anywhere in <span style={{ color: 'var(--accent)' }}>Ontario</span>
              </h2>
              <p style={{ color: 'var(--gray-mid)', lineHeight: 1.75, marginBottom: 28 }}>
                While our primary service area is the Greater Toronto Area, BUZ Construction takes on projects throughout Ontario. We have completed projects in Kitchener-Waterloo, London, Kingston, Ottawa, and Sudbury.
              </p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginBottom: 32 }}>
                {services.map(s => (
                  <div key={s} style={{ display: 'flex', alignItems: 'center', gap: 10, fontSize: '0.92rem', color: 'var(--gray-light)' }}>
                    <CheckCircle size={16} style={{ color: 'var(--accent)', flexShrink: 0 }} /> {s} — all GTA cities
                  </div>
                ))}
              </div>
              <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
                <Link href="/contact" className="btn btn-accent" style={{ height: 48, display: 'flex', alignItems: 'center', padding: '0 24px', fontWeight: 700 }}>Get a Local Quote <ArrowRight size={16} /></Link>
                <a href="tel:+14167108200" className="call-us-btn"><Phone size={16} /> Call +1 (416) 710-8200</a>
              </div>
            </div>
            <div className="coverage-map">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d370019.5!2d-79.7!3d43.7!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sen!2sca!4v1640000000000!5m2!1sen!2sca"
                width="100%" height="420" style={{ border: 0, display: 'block' }}
                allowFullScreen loading="lazy" title="BUZ Construction Service Area Map"
              />
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
