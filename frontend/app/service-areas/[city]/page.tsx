import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight, ArrowLeft, MapPin, CheckCircle, Phone, Star, Building2, Home, Wrench, ClipboardList, Palette } from 'lucide-react'

const cityData: Record<string, {
  name: string
  region: string
  heroImg: string
  population: string
  tagline: string
  about: string
  services: string[]
  projects: { title: string; type: string; year: number; size: string }[]
  stats: { label: string; value: string }[]
  mapSrc: string
}> = {
  toronto: {
    name: 'Toronto',
    region: 'City of Toronto, ON',
    heroImg: '/images/commercial_office_1781694315339.jpg',
    population: '2.9M+',
    tagline: '#1 General Contractor in the GTA',
    about: 'BUZ Construction has been transforming Toronto\'s built environment with superior craftsmanship and reliability. From landmark commercial towers in the Financial District to luxury custom homes in Rosedale and Forest Hill, we know Toronto\'s neighbourhoods, permit offices, and subcontractor network better than anyone.',
    services: ['Commercial Office Buildings', 'Retail & Restaurant Fit-outs', 'Luxury Custom Homes', 'Condo & High-Rise Renovations', 'Heritage Building Restorations', 'Tenant Improvements', 'Project Management Services', 'Design-Build Delivery'],
    projects: [
      { title: 'Nexus Office Campus', type: 'Commercial', year: 2022, size: '85,000 sq ft' },
      { title: 'Queen West Restaurant Row', type: 'Renovation', year: 2023, size: '12,000 sq ft' },
      { title: 'Forest Hill Luxury Estate', type: 'Residential', year: 2024, size: '7,200 sq ft' },
    ],
    stats: [{ label: 'Projects in Toronto', value: '145+' }, { label: 'Years Serving Toronto', value: '15+' }, { label: 'Toronto Clients', value: '90+' }, { label: 'Satisfaction Rate', value: '99%' }],
    mapSrc: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d184552.57577257246!2d-79.54286!3d43.71802!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89d4cb90d7c63ba5%3A0x323555502ab4c477!2sToronto%2C%20ON!5e0!3m2!1sen!2sca!4v1640000000000',
  },
  mississauga: {
    name: 'Mississauga',
    region: 'Peel Region, ON',
    heroImg: '/images/design_build_1781694386091.jpg',
    population: '750K+',
    tagline: 'Mississauga\'s Leading General Contractor',
    about: 'As our home base, BUZ Construction knows Mississauga inside and out. From Port Credit\'s waterfront redevelopment to Streetsville\'s heritage renovations to the commercial corridors of Hurontario — we have built it all.',
    services: ['Office & Commercial Buildings', 'Industrial & Warehouse', 'Custom Homes & Estates', 'Kitchen & Bathroom Renovations', 'Commercial Tenant Improvements', 'Design-Build Projects', 'Project Management', 'Heritage Restorations'],
    projects: [
      { title: 'Cooksville Medical Centre', type: 'Design-Build', year: 2023, size: '18,000 sq ft' },
      { title: 'Port Credit Waterfront Condos', type: 'Residential', year: 2024, size: '48 units' },
      { title: 'Hurontario Corporate Park', type: 'Commercial', year: 2022, size: '120,000 sq ft' },
    ],
    stats: [{ label: 'Mississauga Projects', value: '120+' }, { label: 'Our HQ Location', value: 'Mississauga' }, { label: 'Local Partners', value: '50+' }, { label: 'Satisfaction Rate', value: '100%' }],
    mapSrc: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d92640.3!2d-79.65!3d43.59!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x882b47d43d375c7b%3A0x9b17b36e3a7c58ea!2sMississauga%2C%20ON!5e0!3m2!1sen!2sca!4v1640000000000',
  },
  brampton: {
    name: 'Brampton',
    region: 'Peel Region, ON',
    heroImg: '/images/portfolio_commercial_1781694443603.jpg',
    population: '660K+',
    tagline: 'Building Brampton\'s Future',
    about: 'Brampton is one of the fastest-growing cities in Canada and BUZ Construction is proud to be part of that growth. From new commercial developments along Queen Street to residential builds in Credit Valley and Springdale, we deliver exceptional results.',
    services: ['Commercial & Retail Construction', 'Industrial Warehouse Builds', 'Custom New Home Construction', 'Basement Apartment Conversions', 'Commercial Renovations', 'Medical & Dental Clinic Builds', 'Project Management', 'Design-Build Services'],
    projects: [
      { title: 'Westbrook Industrial Park', type: 'Commercial', year: 2022, size: '200,000 sq ft' },
      { title: 'Springdale Custom Homes', type: 'Residential', year: 2023, size: '3 homes' },
      { title: 'Queen St Retail Plaza', type: 'Renovation', year: 2024, size: '25,000 sq ft' },
    ],
    stats: [{ label: 'Brampton Projects', value: '78+' }, { label: 'Commercial Builds', value: '35+' }, { label: 'Local Trades', value: '40+' }, { label: 'Satisfaction Rate', value: '98%' }],
    mapSrc: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d92562.7!2d-79.76!3d43.73!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x882b3f89c26e46cb%3A0x6d4218aff3d3bdb0!2sBrampton%2C%20ON!5e0!3m2!1sen!2sca!4v1640000000000',
  },
  oakville: {
    name: 'Oakville',
    region: 'Halton Region, ON',
    heroImg: '/images/portfolio_residential_1781694457475.jpg',
    population: '215K+',
    tagline: 'Premium Construction for Oakville\'s Finest',
    about: 'Oakville is synonymous with premium living, and BUZ Construction delivers the premium quality to match. From Old Oakville\'s heritage renovations to luxury custom estates in Morrison and Eastlake to commercial builds along Trafalgar Road.',
    services: ['Luxury Custom Home Construction', 'Premium Kitchen & Bath Renovations', 'Heritage Property Renovations', 'Home Additions & Extensions', 'Commercial & Retail Builds', 'Backyard & Outdoor Living Spaces', 'Design-Build for Luxury Homes', 'Project Management'],
    projects: [
      { title: 'Oakville Corporate Centre', type: 'Commercial', year: 2023, size: '120,000 sq ft' },
      { title: 'Morrison Luxury Estate', type: 'Residential', year: 2024, size: '9,500 sq ft' },
      { title: 'Old Oakville Heritage Reno', type: 'Renovation', year: 2023, size: '4,500 sq ft' },
    ],
    stats: [{ label: 'Oakville Projects', value: '65+' }, { label: 'Luxury Homes Built', value: '28+' }, { label: 'Avg Project Value', value: '$1.2M+' }, { label: 'Satisfaction Rate', value: '100%' }],
    mapSrc: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d46303.6!2d-79.68!3d43.45!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x882b61e5d80f37df%3A0xb9f8e9b7b2c9d0bb!2sOakville%2C%20ON!5e0!3m2!1sen!2sca!4v1640000000000',
  },
  hamilton: {
    name: 'Hamilton',
    region: 'City of Hamilton, ON',
    heroImg: '/images/project_management_1781694373963.jpg',
    population: '580K+',
    tagline: 'Industrial & Commercial Excellence in Hamilton',
    about: 'Hamilton\'s renaissance is real and BUZ Construction is part of it. From industrial builds in the Harbour West Industrial Park to the restoration of heritage buildings downtown to custom homes in Ancaster and Dundas, we bring big-city expertise to Hamilton.',
    services: ['Industrial & Manufacturing Facilities', 'Commercial & Retail Construction', 'Heritage Building Restorations', 'Custom Home Construction', 'Municipal & Institutional Projects', 'Warehouse & Logistics Builds', 'Commercial Renovations', 'Project Management (Owner\'s Rep)'],
    projects: [
      { title: 'Hamilton City Hall Renovation', type: 'Project Management', year: 2023, size: '40,000 sq ft' },
      { title: 'Bayfront Industrial Centre', type: 'Commercial', year: 2022, size: '85,000 sq ft' },
      { title: 'Ancaster Custom Estate', type: 'Residential', year: 2024, size: '6,800 sq ft' },
    ],
    stats: [{ label: 'Hamilton Projects', value: '42+' }, { label: 'Industrial Builds', value: '18+' }, { label: 'Municipal Projects', value: '8+' }, { label: 'Satisfaction Rate', value: '98%' }],
    mapSrc: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d92699.3!2d-79.87!3d43.26!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x882c9b2e2e5d4b59%3A0x3e3f11c7b7b3b7b3!2sHamilton%2C%20ON!5e0!3m2!1sen!2sca!4v1640000000000',
  },
}

type Props = { params: Promise<{ city: string }> }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { city: citySlug } = await params
  const city = cityData[citySlug]
  if (!city) return {}
  return {
    title: `${city.name} General Contractor | Construction Company ${city.name} ON`,
    description: `BUZ Construction Group Inc. — ${city.name}'s trusted general contractor. Commercial, residential, and renovation construction services in ${city.name}, Ontario. Free quotes.`,
  }
}

export async function generateStaticParams() {
  return Object.keys(cityData).map(city => ({ city }))
}

export default async function CityPage({ params }: Props) {
  const { city: citySlug } = await params
  const city = cityData[citySlug]
  if (!city) notFound()

  return (
    <>
      <style>{`
        .city-hero { position:relative; min-height:55vh; display:flex; align-items:center; background:var(--primary); padding-top:var(--nav-height); overflow:hidden; }
        .city-hero-bg { position:absolute; inset:0; }
        .city-hero-bg img { width:100%; height:100%; object-fit:cover; opacity:0.9; }
        .city-hero-overlay { position:absolute; inset:0; background:linear-gradient(90deg, rgba(245,242,235,1) 0%, rgba(245,242,235,0.85) 45%, rgba(245,242,235,0) 100%) !important; }
        .city-hero-content { position:relative; z-index:1; padding:80px 0 60px; }
        .city-stats-bar { display:grid; grid-template-columns:repeat(4,1fr); gap:16px; margin-top:40px; }
        .city-stat { background:rgba(255,255,255,0.06); border:1px solid rgba(255,255,255,0.1); border-radius:var(--radius-lg); padding:16px 20px; text-align:center; }
        .city-stat-val { font-family:var(--font-heading); font-size:1.8rem; font-weight:900; color:var(--accent); }
        .city-stat-lbl { font-size:0.75rem; color:var(--gray-dark); margin-top:3px; }
        .city-layout { display:grid; grid-template-columns:1fr 380px; gap:48px; align-items:start; }
        .city-sidebar { position:sticky; top:calc(var(--nav-height) + 24px); }
        .sidebar-card { background:var(--secondary); border:1px solid rgba(255,255,255,0.07); border-radius:var(--radius-xl); padding:28px; margin-bottom:20px; }
        .project-row { display:flex; justify-content:space-between; align-items:center; padding:12px 0; border-bottom:1px solid rgba(255,255,255,0.05); }
        .project-row:last-child { border-bottom:none; }
        .back-btn { display:inline-flex; align-items:center; gap:8px; color:var(--primary); text-decoration:none; font-size:0.85rem; font-weight:700; padding:8px 16px; background:rgba(21,30,49,0.05); border-radius:50px; border:1px solid rgba(21,30,49,0.15); transition:var(--transition); position:absolute; top:calc(var(--nav-height) + 32px); left:40px; z-index:10; }
        .back-btn:hover { background:rgba(21,30,49,0.1); border-color:var(--accent); transform:translateX(-4px); }
        @media(max-width:1024px){ .city-layout{grid-template-columns:1fr;} .city-sidebar{position:static;} .city-stats-bar{grid-template-columns:repeat(2,1fr);} }
        @media(max-width:640px){ .city-stats-bar{grid-template-columns:repeat(2,1fr);} }
      `}</style>

      {/* Hero */}
      <section className="city-hero">
        <div className="city-hero-bg">
          <Image src={city.heroImg} alt={city.name} fill style={{ objectFit: 'cover' }} />
        </div>
        <div className="city-hero-overlay" />
        <Link href="/service-areas" className="back-btn">
          <ArrowLeft size={14} /> Back to Service Areas
        </Link>
        <div className="container city-hero-content">
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: '0.8rem', color: 'var(--gray-dark)', marginBottom: 16 }}>
            <Link href="/" style={{ color: 'var(--accent)', textDecoration: 'none' }}>Home</Link>
            <span>/</span>
            <Link href="/service-areas" style={{ color: 'var(--accent)', textDecoration: 'none' }}>Service Areas</Link>
            <span>/</span>
            <span>{city.name}</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 12 }}>
            <MapPin size={16} style={{ color: 'var(--accent)' }} />
            <span style={{ fontSize: '0.85rem', color: 'var(--accent)', fontWeight: 700 }}>{city.region}</span>
          </div>
          <span className="section-tag">{city.tagline}</span>
          <h1 style={{ fontFamily: 'var(--font-heading)', fontSize: 'clamp(2.8rem,6vw,5rem)', fontWeight: 900, marginTop: 12, marginBottom: 16 }}>
            Construction in <span style={{ color: 'var(--accent)' }}>{city.name}</span>
          </h1>
          <p style={{ color: 'var(--secondary)', fontSize: '1.05rem', maxWidth: 600, lineHeight: 1.75 }}>{city.about}</p>
          <div className="city-stats-bar">
            {city.stats.map(s => (
              <div key={s.label} className="city-stat">
                <div className="city-stat-val">{s.value}</div>
                <div className="city-stat-lbl">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Body */}
      <section className="section bg-dark">
        <div className="container">
          <div className="city-layout">
            {/* Main content */}
            <div>
              <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: '2.2rem', fontWeight: 800, marginBottom: 24 }}>
                Our Services in <span style={{ color: 'var(--accent)' }}>{city.name}</span>
              </h2>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginBottom: 40 }}>
                {city.services.map(s => (
                  <div key={s} style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '12px 16px', background: 'var(--secondary)', border: '1px solid rgba(255,255,255,0.06)', borderRadius: 'var(--radius-md)', fontSize: '0.88rem', color: 'var(--gray-light)' }}>
                    <CheckCircle size={15} style={{ color: 'var(--accent)', flexShrink: 0 }} /> {s}
                  </div>
                ))}
              </div>

              <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.8rem', marginBottom: 20 }}>
                Recent <span style={{ color: 'var(--accent)' }}>{city.name}</span> Projects
              </h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginBottom: 40 }}>
                {city.projects.map(p => (
                  <div key={p.title} style={{ background: 'var(--secondary)', border: '1px solid rgba(255,255,255,0.07)', borderRadius: 'var(--radius-lg)', padding: '20px 24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 12 }}>
                    <div>
                      <div style={{ fontFamily: 'var(--font-heading)', fontWeight: 700, fontSize: '1.1rem', marginBottom: 4, color: 'var(--white)' }}>{p.title}</div>
                      <div style={{ fontSize: '0.8rem', color: 'var(--gray-light)' }}>{p.type} · {p.size} · {p.year}</div>
                    </div>
                    <span className="badge badge-accent">{p.type}</span>
                  </div>
                ))}
              </div>

              <div style={{ borderRadius: 'var(--radius-xl)', overflow: 'hidden', border: '1px solid rgba(255,255,255,0.08)' }}>
                <iframe src={city.mapSrc} width="100%" height="320" style={{ border: 0, display: 'block' }} allowFullScreen loading="lazy" title={`BUZ Construction ${city.name}`} />
              </div>
            </div>

            {/* Sidebar */}
            <div className="city-sidebar">
              <div className="sidebar-card" style={{ border: '1px solid rgba(245,166,35,0.25)', background: 'linear-gradient(135deg, rgba(245,166,35,0.08) 0%, var(--secondary) 100%)' }}>
                <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.4rem', marginBottom: 8 }}>Get a Free Quote in {city.name}</h3>
                <p style={{ fontSize: '0.85rem', color: 'var(--gray-mid)', marginBottom: 20, lineHeight: 1.65 }}>Serving {city.name} with local expertise. We respond within 24 hours.</p>
                <Link href="/contact" className="btn btn-accent" style={{ width: '100%', justifyContent: 'center', fontWeight: 700 }}>
                  Request Free Quote <ArrowRight size={16} />
                </Link>
                <a href="tel:+14167108200" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, marginTop: 12, color: 'var(--gray-mid)', fontSize: '0.88rem', textDecoration: 'none' }}>
                  <Phone size={14} /> +1 (416) 710-8200
                </a>
              </div>

              <div className="sidebar-card">
                <h4 style={{ fontFamily: 'var(--font-heading)', marginBottom: 16 }}>Why Choose BUZ in {city.name}?</h4>
                {['Local subcontractor network', `Familiar with ${city.name} permit offices`, 'On-site superintendent daily', 'Weekly client progress reports', 'WSIB & fully insured'].map(item => (
                  <div key={item} style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '8px 0', borderBottom: '1px solid rgba(21,30,49,0.08)', fontSize: '0.85rem', color: 'var(--gray-dark)' }}>
                    <CheckCircle size={13} style={{ color: 'var(--success)', flexShrink: 0 }} /> {item}
                  </div>
                ))}
              </div>

              <div className="sidebar-card">
                <h4 style={{ fontFamily: 'var(--font-heading)', marginBottom: 14 }}>Explore Our Services</h4>
                {[['Commercial', '/services/commercial'], ['Residential', '/services/residential'], ['Renovations', '/services/renovations'], ['Project Management', '/services/project-management'], ['Design-Build', '/services/design-build']].map(([name, href]) => (
                  <Link key={name} href={href} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '10px 0', borderBottom: '1px solid rgba(21,30,49,0.08)', fontSize: '0.88rem', color: 'var(--gray-dark)', textDecoration: 'none', transition: 'color 0.2s' }}>
                    {name} <ArrowRight size={13} style={{ color: 'var(--accent)' }} />
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
