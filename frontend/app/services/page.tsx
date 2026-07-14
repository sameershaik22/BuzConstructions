import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { Building2, Home, Wrench, ClipboardList, Palette, ArrowRight, CheckCircle } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Construction Services | Commercial, Residential, Renovations, PM, Design-Build',
  description: 'BUZ Construction Group Inc. offers full-service construction: commercial construction, residential builds, renovations, project management, and design-build across Ontario.',
}

const services = [
  {
    icon: Building2,
    title: 'Commercial Construction',
    href: '/services/commercial',
    img: '/images/buz_commercial_office.jpg',
    color: '#3B82F6',
    desc: 'Full-scale commercial projects including office buildings, retail stores, restaurants, warehouses, and tenant improvements built to the highest industry standards.',
    items: ['Office Buildings', 'Retail Stores & Plazas', 'Restaurants & Hospitality', 'Warehouses & Industrial', 'Tenant Improvements'],
  },
  {
    icon: Home,
    title: 'Residential Construction',
    href: '/services/residential',
    img: '/images/buz_luxury_home.jpg',
    color: '#22C55E',
    desc: 'Custom homes and residential builds crafted with precision and care — from luxury estates to practical home additions and basement finishing.',
    items: ['Custom Luxury Homes', 'Home Additions', 'Basement Finishing', 'Garage Construction', 'Accessory Dwelling Units'],
  },
  {
    icon: Wrench,
    title: 'Renovations',
    href: '/services/renovations',
    img: '/images/buz_kitchen_reno.jpg',
    color: '#F59E0B',
    desc: 'Transform your existing space with expert renovation services. From kitchen and bathroom to whole-home and commercial renovations that wow.',
    items: ['Kitchen Renovations', 'Bathroom Renovations', 'Whole-Home Renovations', 'Commercial Renovations', 'Heritage Restorations'],
  },
  {
    icon: ClipboardList,
    title: 'Project Management',
    href: '/services/project-management',
    img: '/images/buz_project_manager.jpg',
    color: '#8B5CF6',
    desc: 'Expert construction project management from pre-construction planning through final closeout — on time, on budget, every single time.',
    items: ['Pre-Construction Planning', 'Schedule Management', 'Budget Control', 'Subcontractor Coordination', 'Progress Reporting'],
  },
  {
    icon: Palette,
    title: 'Design-Build',
    href: '/services/design-build',
    img: '/images/buz_design_build.jpg',
    color: '#EC4899',
    desc: 'Single-source design-build delivery combining architecture and construction — faster project delivery, cost certainty, and better outcomes.',
    items: ['Concept to Completion', 'Integrated Design Team', 'Single Contract', 'Faster Delivery', 'Cost Savings'],
  },
]

const process = [
  { step: '01', title: 'Initial Consultation', desc: 'We meet to understand your vision, requirements, and budget.' },
  { step: '02', title: 'Planning & Design', desc: 'Our team develops detailed plans, drawings, and specifications.' },
  { step: '03', title: 'Permitting', desc: 'We handle all municipal permits and approvals on your behalf.' },
  { step: '04', title: 'Construction', desc: 'Expert teams execute the build with rigorous quality control.' },
  { step: '05', title: 'Inspections', desc: 'All work is inspected and certified at key milestones.' },
  { step: '06', title: 'Handover', desc: 'Final walkthrough, documentation, and project closeout.' },
]

export default function ServicesPage() {
  return (
    <>
      <style>{`
        .page-hero {
          position: relative; min-height: 52vh;
          display: flex; align-items: center;
          background: var(--primary);
          padding-top: var(--nav-height);
          overflow: hidden;
        }
        .page-hero-bg { position: absolute; inset: 0; }
        .page-hero-bg img { width: 100%; height: 100%; object-fit: cover; opacity: 0.2; }
        .page-hero-overlay {
          position: absolute; inset: 0;
          background: linear-gradient(135deg, rgba(10,22,40,0.97) 0%, rgba(10,22,40,0.7) 100%);
        }
        .page-hero-content { position: relative; z-index: 1; padding: 80px 0 60px; }
        .breadcrumb { display: flex; align-items: center; gap: 8px; font-size: 0.8rem; color: var(--gray-dark); margin-bottom: 16px; }
        .breadcrumb a { color: var(--accent); text-decoration: none; }

        /* ── Service rows ── */
        .services-list { display: flex; flex-direction: column; gap: 100px; }

        .service-row {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 70px;
          align-items: center;
        }
        /* Reverse every even row using column ordering — NO rtl trick */
        .service-row.even .service-row-img  { order: 2; }
        .service-row.even .service-row-body { order: 1; }

        .service-row-img {
          position: relative;
          border-radius: var(--radius-xl);
          overflow: hidden;
          aspect-ratio: 4 / 3;
          box-shadow: 0 24px 60px rgba(0,0,0,0.4);
        }
        .service-row-img img {
          width: 100%; height: 100%;
          object-fit: cover;
          transition: transform 0.6s ease;
        }
        .service-row-img:hover img { transform: scale(1.04); }

        /* coloured corner accent */
        .service-row-img::before {
          content: '';
          position: absolute;
          inset: 0;
          background: linear-gradient(to top right, rgba(0,0,0,0.35) 0%, transparent 60%);
          z-index: 1;
          pointer-events: none;
        }

        .service-row-body {}

        .service-icon-wrap {
          width: 60px; height: 60px;
          border-radius: 16px;
          display: flex; align-items: center; justify-content: center;
          margin-bottom: 20px;
        }
        .service-eyebrow {
          font-size: 0.72rem; font-weight: 700;
          text-transform: uppercase; letter-spacing: 0.18em;
          margin-bottom: 10px;
        }
        .service-title {
          font-family: var(--font-heading);
          font-size: clamp(1.9rem, 3vw, 2.8rem);
          font-weight: 800;
          margin-bottom: 16px;
          line-height: 1.05;
        }
        .service-desc {
          color: var(--gray-mid);
          line-height: 1.75;
          margin-bottom: 24px;
          font-size: 0.97rem;
        }
        .service-checklist {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 10px 16px;
          margin-bottom: 32px;
        }
        .service-check-item {
          display: flex; align-items: center; gap: 9px;
          color: var(--gray-light); font-size: 0.88rem; font-weight: 500;
        }

        /* ── Process ── */
        .process-grid {
          display: grid;
          grid-template-columns: repeat(6, 1fr);
          gap: 0;
          position: relative;
        }
        .process-step { text-align: center; padding: 0 8px; position: relative; }
        .process-step:not(:last-child)::after {
          content: '';
          position: absolute;
          top: 24px;
          left: calc(50% + 28px);
          right: calc(-50% + 28px);
          height: 1px;
          background: rgba(245,166,35,0.25);
        }
        .process-num {
          width: 48px; height: 48px;
          border-radius: 50%;
          background: rgba(245,166,35,0.12);
          border: 1px solid rgba(245,166,35,0.3);
          display: flex; align-items: center; justify-content: center;
          margin: 0 auto 16px;
          font-family: var(--font-heading);
          font-size: 1.05rem; font-weight: 900; color: var(--accent);
          transition: var(--transition);
        }
        .process-step:hover .process-num {
          background: var(--accent); color: var(--primary);
          box-shadow: var(--shadow-accent);
        }
        .process-title { font-weight: 700; font-size: 0.88rem; margin-bottom: 8px; }
        .process-desc  { font-size: 0.76rem; color: var(--gray-mid); line-height: 1.5; }

        @media (max-width: 1024px) {
          .service-row { grid-template-columns: 1fr; gap: 36px; }
          .service-row.even .service-row-img  { order: 0; }
          .service-row.even .service-row-body { order: 0; }
          .service-checklist { grid-template-columns: 1fr; }
          .process-grid { grid-template-columns: repeat(3, 1fr); gap: 24px; }
          .process-step:not(:last-child)::after { display: none; }
        }
        @media (max-width: 640px) {
          .process-grid { grid-template-columns: repeat(2, 1fr); }
          .services-list { gap: 60px; }
        }
        .quick-jump-btn {
          display: flex; align-items: center; gap: 6px; padding: 8px 16px; border-radius: 50px;
          background: rgba(255,255,255,0.07); border: 1px solid rgba(255,255,255,0.12);
          font-size: 0.82rem; font-weight: 600; color: var(--gray-light); text-decoration: none;
          transition: var(--transition);
        }
        .quick-jump-btn:hover {
          background: var(--hover-bg) !important;
          border-color: var(--hover-border) !important;
          color: var(--hover-text) !important;
        }
      `}</style>

      {/* ── Hero ── */}
      <section className="page-hero">
        <div className="page-hero-bg">
          <Image src="/images/buz_services_hero.jpg" alt="BUZ Construction services" fill style={{ objectFit: 'cover' }} />
        </div>
        <div className="page-hero-overlay" />
        <div className="container page-hero-content">
          <div className="breadcrumb">
            <Link href="/">Home</Link>
            <span>/</span>
            <span>Services</span>
          </div>
          <span className="section-tag">What We Build</span>
          <h1 style={{ fontFamily: 'var(--font-heading)', fontSize: 'clamp(2.8rem,6vw,5rem)', fontWeight: 900, marginTop: 12, marginBottom: 20 }}>
            Our <span style={{ color: 'var(--accent)' }}>Services</span>
          </h1>
          <p style={{ color: 'var(--gray-light)', fontSize: '1.1rem', maxWidth: 580, lineHeight: 1.75 }}>
            Five core disciplines. One trusted contractor. Full-service construction solutions for every project type and scale across Ontario.
          </p>

          {/* Quick jump links */}
          <div style={{ display: 'flex', gap: 10, marginTop: 32, flexWrap: 'wrap' }}>
            {services.map(s => (
              <a key={s.title} href={s.href}
                className="quick-jump-btn"
                style={{
                  '--hover-bg': `${s.color}22`,
                  '--hover-border': `${s.color}66`,
                  '--hover-text': s.color
                } as React.CSSProperties}>
                <s.icon size={13} /> {s.title}
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* ── Service Rows ── */}
      <section className="section bg-dark">
        <div className="container">
          <div className="services-list">
            {services.map((s, i) => (
              <div key={s.title} className={`service-row ${i % 2 === 1 ? 'even' : ''}`}>

                {/* Image */}
                <div className="service-row-img">
                  <Image src={s.img} alt={s.title} fill style={{ objectFit: 'cover' }} />
                </div>

                {/* Body */}
                <div className="service-row-body">
                  <div className="service-icon-wrap" style={{ background: `${s.color}18`, color: s.color }}>
                    <s.icon size={28} />
                  </div>
                  <div className="service-eyebrow" style={{ color: s.color }}>Service {String(i + 1).padStart(2, '0')}</div>
                  <h2 className="service-title">{s.title}</h2>
                  <p className="service-desc">{s.desc}</p>
                  <div className="service-checklist">
                    {s.items.map(item => (
                      <div key={item} className="service-check-item">
                        <CheckCircle size={15} style={{ color: s.color, flexShrink: 0 }} />
                        {item}
                      </div>
                    ))}
                  </div>
                  <Link href={s.href} className="btn btn-primary">
                    Explore {s.title} <ArrowRight size={16} />
                  </Link>
                </div>

              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Process ── */}
      <section className="section" style={{ background: 'var(--secondary)' }}>
        <div className="container">
          <div className="section-header">
            <span className="section-tag">How We Work</span>
            <h2 className="section-title">Our 6-Step <span>Process</span></h2>
            <p className="section-subtitle">A proven process that delivers results on every project, every time.</p>
            <div className="accent-line" />
          </div>
          <div className="process-grid">
            {process.map(p => (
              <div key={p.step} className="process-step">
                <div className="process-num">{p.step}</div>
                <div className="process-title">{p.title}</div>
                <div className="process-desc">{p.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Final CTA ── */}
      <section className="section bg-dark">
        <div className="container" style={{ textAlign: 'center' }}>
          <span className="section-tag">Get Started Today</span>
          <h2 className="section-title" style={{ marginTop: 12 }}>Ready to <span>Begin?</span></h2>
          <p style={{ color: 'var(--gray-mid)', maxWidth: 500, margin: '16px auto 36px', lineHeight: 1.75 }}>
            Contact us today for a free, no-obligation consultation and detailed quote on your construction project.
          </p>
          <div style={{ display: 'flex', gap: 16, justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link href="/contact" className="btn btn-primary btn-lg">Get Free Quote <ArrowRight size={18} /></Link>
            <Link href="/portfolio" className="btn btn-outline btn-lg">View Our Portfolio <ArrowRight size={18} /></Link>
          </div>
        </div>
      </section>
    </>
  )
}
