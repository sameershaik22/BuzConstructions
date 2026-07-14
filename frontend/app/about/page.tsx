import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight, Target, Eye, Heart, Shield, Users, Star, Award, CheckCircle } from 'lucide-react'
import ConsultationForm from '@/components/ConsultationForm'

export const metadata: Metadata = {
  title: 'About BUZ Construction Group Inc.',
  description: 'Learn about BUZ Construction Group Inc. — Ontario\'s trusted general contractor with 15+ years of experience. Our story, mission, values, and team.',
}

const values = [
  { icon: Shield, title: 'Integrity', desc: 'We do what we say. Honest pricing, honest timelines, and transparent communication throughout every project.' },
  { icon: Star, title: 'Craftsmanship', desc: 'We take pride in every nail, beam, and finish. Quality is not negotiable — it\'s our standard.' },
  { icon: Users, title: 'Teamwork', desc: 'Our strength is our people. We unite skilled trades, project managers, and clients for seamless delivery.' },
  { icon: Heart, title: 'Customer First', desc: 'Your project is our priority. We listen, adapt, and deliver to exceed your expectations every time.' },
]

const team = [
  { name: 'Bilal Khan', title: 'Founder & President', bio: 'Bilal has extensive experience managing commercial and residential construction projects throughout Ontario. His expertise includes project planning, construction management, budgeting, and client relations.', initial: 'BK' },
  { name: 'Zaidan Anees', title: 'Operations Manager', bio: 'Zaid oversees day-to-day site operations, ensuring projects are completed safely, efficiently, and according to schedule while maintaining high quality standards.', initial: 'ZA' },
  { name: 'Ubaid Khan', title: 'Director of Preconstruction & Projects', bio: 'Ubaid leads our preconstruction planning, cost estimating, and project scheduling teams. He coordinates closely with engineers, architects, and clients to ensure every project launches with financial precision and operational clarity.', initial: 'UK' },
]

const certifications = [
  { name: 'Ontario General Contractor', code: 'OGC-2026-001' },
  { name: 'WSIB Clearance Certificate', code: 'Active' },
  { name: 'Commercial General Liability', code: 'Insured & Bonded' },
  { name: 'Health & Safety Certified', code: 'COR / MOL Compliant' },
  { name: 'WHMIS & Working at Heights', code: '100% On Staff' },
  { name: 'First Aid & CPR Certified', code: 'Site Compliant' },
]

const timeline = [
  { year: '2015', event: 'Leadership team begins delivering major commercial fit-outs and residential builds across Greater Toronto' },
  { year: '2018', event: 'Expanded multi-family and custom residential construction portfolio across Mississauga and Oakville' },
  { year: '2021', event: 'Executed complex design-build and industrial warehouse fit-outs with zero safety incidents' },
  { year: '2024', event: 'Achieved over 150+ completed collaborative projects across commercial and residential sectors' },
  { year: '2026', event: 'BUZ Construction Group Inc. officially founded by Bilal Khan in Mississauga, ON as an integrated enterprise firm' },
]

export default function AboutPage() {
  return (
    <>
      <style>{`
        .page-hero {
          background: var(--primary);
          margin-top: var(--nav-height);
          padding: 80px 0;
          overflow: hidden;
        }
        .page-hero-container {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 60px;
          align-items: center;
        }
        .page-hero-image {
          position: relative;
          height: 540px;
          border-radius: var(--radius-lg);
          overflow: hidden;
          box-shadow: var(--shadow-lg);
          border: 1px solid rgba(255,255,255,0.08);
        }
        .page-hero-content {
          padding-right: 40px;
        }
        @media (max-width: 960px) {
          .page-hero-container { grid-template-columns: 1fr; }
          .page-hero-content { padding-right: 0; padding-top: 0px; }
          .page-hero-image { height: 400px; grid-row: 2; } /* Image moves to bottom on mobile */
        }
        
        .page-hero-breadcrumb { display:flex; align-items:center; gap:8px; font-size:0.8rem; color:var(--gray-dark); margin-bottom:16px; font-weight: 600; }
        .page-hero-breadcrumb a { color:var(--accent); text-decoration:none; }
        .timeline { position:relative; padding-left:40px; }
        .timeline::before { content:''; position:absolute; left:12px; top:0; bottom:0; width:2px; background:linear-gradient(to bottom,var(--accent),transparent); }
        .timeline-item { position:relative; margin-bottom:32px; }
        .timeline-dot { position:absolute; left:-34px; top:4px; width:12px; height:12px; border-radius:50%; background:var(--accent); border:2px solid var(--primary); }
        .timeline-year { font-size:0.75rem; font-weight:700; color:var(--accent); text-transform:uppercase; letter-spacing:0.1em; margin-bottom:4px; }
        .timeline-event { color:var(--gray-light); font-size:0.92rem; }
        .team-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 28px; }
        .team-card-clean {
          background: var(--secondary);
          border: 1px solid rgba(198, 167, 94, 0.25);
          border-radius: var(--radius-xl);
          padding: 36px 32px;
          transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
          box-shadow: var(--shadow-md);
          display: flex;
          flex-direction: column;
          position: relative;
          overflow: hidden;
        }
        .team-card-clean::before {
          content: '';
          position: absolute;
          top: 0; left: 0; right: 0; height: 3px;
          background: linear-gradient(90deg, var(--accent), transparent);
        }
        .team-card-clean:hover {
          transform: translateY(-6px);
          border-color: var(--accent);
          box-shadow: 0 15px 40px rgba(198, 167, 94, 0.18);
          background: #1B263B;
        }
        .team-card-top {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 20px;
        }
        .team-initial-badge {
          width: 54px;
          height: 54px;
          border-radius: 14px;
          background: linear-gradient(135deg, rgba(198, 167, 94, 0.25), rgba(198, 167, 94, 0.05));
          border: 1px solid rgba(198, 167, 94, 0.4);
          color: var(--accent);
          font-family: var(--font-heading);
          font-weight: 800;
          font-size: 1.4rem;
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: 0 4px 12px rgba(0,0,0,0.2);
        }
        .team-role-tag {
          font-size: 0.78rem;
          font-weight: 700;
          color: var(--accent);
          text-transform: uppercase;
          letter-spacing: 0.1em;
          background: rgba(198, 167, 94, 0.12);
          padding: 6px 14px;
          border-radius: 50px;
          border: 1px solid rgba(198, 167, 94, 0.3);
        }
        .team-name-clean {
          font-family: var(--font-heading);
          font-size: 1.6rem;
          font-weight: 800;
          color: var(--white);
          margin-bottom: 16px;
        }
        .team-divider {
          width: 40px;
          height: 2px;
          background: var(--accent);
          margin-bottom: 16px;
          opacity: 0.6;
        }
        .team-bio-clean {
          font-size: 0.98rem;
          color: var(--gray-light);
          line-height: 1.75;
        }
        @media (max-width: 768px) {
          .team-grid { grid-template-columns: 1fr; gap: 20px; }
          .team-card-clean { padding: 28px 24px; }
        }
        .cert-grid { display:grid; grid-template-columns:repeat(3,1fr); gap:16px; }
        .cert-card { background:var(--secondary); border:1px solid rgba(255,255,255,0.06); border-radius:var(--radius-md); padding:20px; display:flex; align-items:center; gap:14px; }
        .cert-icon { width:40px; height:40px; border-radius:10px; background:rgba(245,166,35,0.1); display:flex; align-items:center; justify-content:center; flex-shrink:0; color:var(--accent); }
        .cert-name { font-weight:800; font-size:0.95rem; color:var(--accent); letter-spacing:0.02em; margin-bottom:2px; }
        .cert-code { font-size:0.8rem; color:var(--gray-light); }
        .team-intro-container { display: grid; grid-template-columns: 1.2fr 1fr; gap: 48px; align-items: center; margin-bottom: 60px; }
        @media(max-width:1024px){ .team-grid{grid-template-columns:repeat(2,1fr);} .cert-grid{grid-template-columns:repeat(2,1fr);} }
        @media(max-width:960px){ .team-intro-container { grid-template-columns: 1fr; gap: 32px; } }
        @media(max-width:640px){ .team-grid{grid-template-columns:1fr;} .cert-grid{grid-template-columns:1fr;} }
      `}</style>

      {/* Hero Redesign (Split Layout) */}
      <section className="page-hero" style={{ background: 'var(--off-white)' }}>
        <div className="container page-hero-container">
          <div className="page-hero-image">
            <Image src="/images/buz_about_split_hero.jpg" alt="BUZ Construction office" fill style={{ objectFit: 'cover' }} priority sizes="(max-width: 768px) 100vw, 50vw" />
          </div>
          <div className="page-hero-content">
            <div className="page-hero-breadcrumb" style={{ marginBottom: '24px', fontSize: '0.95rem', fontWeight: 700, color: 'var(--primary)' }}><Link href="/" style={{ color: 'var(--accent)', textDecoration: 'none' }}>Home</Link> <span style={{ opacity: 0.8 }}>/ About Us</span></div>
            <span className="section-tag" style={{ background: 'rgba(198, 167, 94, 0.15)', color: 'var(--accent-dark)', border: '1px solid rgba(198, 167, 94, 0.3)' }}>Our Story</span>
            <h1 style={{ fontFamily: 'var(--font-heading)', fontSize: 'clamp(2.5rem,5vw,4rem)', fontWeight: 900, marginTop: '20px', marginBottom: '24px', color: 'var(--primary)', lineHeight: 1.1 }}>
              About <br/><span style={{ color: 'var(--accent)' }}>BUZ Construction</span>
            </h1>
            <p style={{ color: 'var(--secondary)', fontSize: '1.15rem', lineHeight: '1.7', fontWeight: 500 }}>
              Building Excellence. Creating Trust. We specialize in commercial and residential construction projects across Ontario—delivering high-quality workmanship while maintaining strict safety standards and dependable schedules.
            </p>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="section bg-dark">
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '24px' }}>
            {[
              { icon: Target, color: 'var(--accent)', title: 'Our Mission', text: 'To deliver exceptional construction services through quality craftsmanship, integrity, safety, and customer satisfaction while creating lasting value for our clients and communities.' },
              { icon: Eye, color: '#818cf8', title: 'Our Vision', text: 'To become one of Canada\'s most trusted construction companies, recognized for excellence, innovation, and dependable project delivery.' },
              { icon: Heart, color: 'var(--success)', title: 'Our Values', text: 'Integrity in every decision. Excellence in every project. Safety for every worker. Transparent communication and long-term client relationships define how we build.' },
            ].map(item => (
              <div key={item.title} className="card" style={{ textAlign: 'center' }}>
                <div style={{ width: 64, height: 64, borderRadius: 16, background: `${item.color}20`, display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 20px', color: item.color }}>
                  <item.icon size={28} />
                </div>
                <h3 style={{ fontFamily: 'var(--font-heading)', marginBottom: 12 }}>{item.title}</h3>
                <p style={{ fontSize: '0.9rem', color: 'var(--gray-mid)' }}>{item.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Company Story */}
      <section className="section" style={{ background: 'var(--secondary)' }}>
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '60px', alignItems: 'start' }}>
            <div>
              <span className="section-tag">Our History</span>
              <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: 'clamp(2rem,4vw,3rem)', fontWeight: 800, marginTop: 12, marginBottom: 20 }}>
                Building Excellence. <span style={{ color: 'var(--accent)' }}>Creating Trust.</span>
              </h2>
              <p style={{ color: 'var(--gray-mid)', marginBottom: 16, lineHeight: 1.8 }}>
                BUZ Construction Group Inc. was founded in 2026 by Bilal Khan with a clear dedication to superior Ontario construction practices. Whether constructing commercial buildings, retail spaces, restaurants, offices, custom homes, or residential developments, we are committed to exceeding client expectations.
              </p>
              <p style={{ color: 'var(--gray-mid)', marginBottom: 32, lineHeight: 1.8 }}>
                Our experienced team provides complete construction solutions—from planning and project management to renovation and new building construction—maintaining strict safety standards and transparent communication every step of the way.
              </p>
              <Link href="/portfolio" className="btn btn-primary btn-lg">See Our Portfolio <ArrowRight size={18} /></Link>
            </div>
            <div className="timeline">
              {timeline.map(t => (
                <div key={t.year} className="timeline-item">
                  <div className="timeline-dot" />
                  <div className="timeline-year">{t.year}</div>
                  <div className="timeline-event">{t.event}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className="section bg-dark">
        <div className="container">
          <div className="section-header">
            <span className="section-tag">Who We Are</span>
            <h2 className="section-title">Our Core <span>Values</span></h2>
            <div className="accent-line" />
          </div>
          <div className="grid-4">
            {values.map(v => (
              <div key={v.title} className="card" style={{ textAlign: 'center' }}>
                <div style={{ width: 64, height: 64, borderRadius: 16, background: 'rgba(245,166,35,0.1)', border: '1px solid rgba(245,166,35,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 20px', color: 'var(--accent)' }}>
                  <v.icon size={28} />
                </div>
                <h4 style={{ fontFamily: 'var(--font-heading)', marginBottom: 12 }}>{v.title}</h4>
                <p style={{ fontSize: '0.88rem', color: 'var(--gray-mid)' }}>{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="section" style={{ background: 'var(--secondary)' }}>
        <div className="container">
          <div className="section-header">
            <span className="section-tag">Meet the Team</span>
            <h2 className="section-title" style={{ color: 'var(--white)' }}>The People Behind <span>BUZ</span></h2>
            <div className="accent-line" />
          </div>
          <div className="team-intro-container">
            <div style={{ position: 'relative', borderRadius: 'var(--radius-lg)', overflow: 'hidden', aspectRatio: '1.6', border: '1px solid rgba(255,255,255,0.06)', minHeight: '260px' }}>
              <Image src="/images/buz_team_branded.jpg" alt="BUZ Construction Branded Team" fill style={{ objectFit: 'cover' }} />
            </div>
            <div>
              <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.8rem', fontWeight: 800, marginBottom: '16px', color: 'var(--white)' }}>
                United under one banner: <span style={{ color: 'var(--accent)' }}>Build, Unite, Zeal</span>
              </h3>
              <p style={{ color: 'var(--gray-mid)', lineHeight: '1.8', marginBottom: '16px', fontSize: '0.95rem' }}>
                At BUZ Construction Group Inc., our crew members represent the best in the industry. From our red-seal carpenters and site superintendents to our project managers and estimators, every single member of the team wears the BUZ Construction uniform with pride.
              </p>
              <p style={{ color: 'var(--gray-mid)', lineHeight: '1.8', fontSize: '0.95rem' }}>
                Dressed in our high-visibility safety shirts and branded gear, our teams maintain a zero-incident safety record while delivering master-class execution on commercial and residential sites across Ontario.
              </p>
            </div>
          </div>

          <div style={{ textAlign: 'center', maxWidth: '800px', margin: '40px auto 48px' }}>
            <span className="section-tag" style={{ background: 'rgba(198, 167, 94, 0.15)', color: 'var(--accent)', border: '1px solid rgba(198, 167, 94, 0.3)' }}>Executive Leadership</span>
            <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '2.4rem', fontWeight: 800, marginTop: '12px', marginBottom: '16px', color: 'var(--white)' }}>
              Guided by Experienced <span style={{ color: 'var(--accent)' }}>Industry Veterans</span>
            </h3>
            <p style={{ color: 'var(--gray-light)', fontSize: '1.05rem', lineHeight: '1.8' }}>
              We pride ourselves on having over 85+ talented professionals across engineering, architectural design, project management, and site execution. Our leadership team brings decades of combined Ontario construction excellence, uniting vision with precision on every jobsite.
            </p>
          </div>

          <div className="team-grid">
            {team.map(m => (
              <div key={m.name} className="team-card-clean">
                <div className="team-card-top">
                  <div className="team-initial-badge">{m.initial}</div>
                  <div className="team-role-tag">{m.title}</div>
                </div>
                <h4 className="team-name-clean">{m.name}</h4>
                <div className="team-divider" />
                <p className="team-bio-clean">{m.bio}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Certifications */}
      <section className="section bg-dark">
        <div className="container">
          <div className="section-header">
            <span className="section-tag">Credentials</span>
            <h2 className="section-title">Certifications & <span>Qualifications</span></h2>
            <div className="accent-line" />
          </div>
          <div className="cert-grid">
            {certifications.map(c => (
              <div key={c.name} className="cert-card">
                <div className="cert-icon"><CheckCircle size={20} /></div>
                <div>
                  <div className="cert-name">{c.name}</div>
                  <div className="cert-code">{c.code}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Consultation CTA */}
      <section className="section" style={{ background: 'var(--secondary)' }}>
        <div className="container">
          <ConsultationForm title="Work With Our Team" subtitle="Ready to start your project? Let's talk about what we can build together." />
        </div>
      </section>
    </>
  )
}
