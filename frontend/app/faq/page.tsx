'use client'
import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'
import { ChevronDown, Search, ArrowRight } from 'lucide-react'

const faqData = [
  {
    category: 'General Questions',
    emoji: '🏗️',
    questions: [
      { q: 'What areas does BUZ Construction serve?', a: 'BUZ Construction Group Inc. serves the entire Greater Toronto Area including Toronto, Mississauga, Brampton, Oakville, Burlington, Hamilton, Vaughan, Markham, Richmond Hill, and surrounding Ontario communities.' },
      { q: 'Is BUZ Construction licensed and insured?', a: 'Yes. We hold an Ontario General Contractor license (OCL-2024-001), maintain $5,000,000 Commercial General Liability insurance, Professional Liability (E&O) coverage, and an active WSIB Clearance Certificate. Certificates are available upon request.' },
      { q: 'How long has BUZ Construction been in business?', a: 'BUZ Construction Group Inc. was founded in 2026 by Bilal Khan. Our leadership team brings decades of combined experience delivering commercial, residential, and renovation projects across Ontario.' },
      { q: 'What does BUZ stand for?', a: 'BUZ stands for Build, Unite, and Zeal — the three core principles that guide everything we do. Build: exceptional craftsmanship. Unite: collaborative teamwork. Zeal: passionate commitment to every client.' },
      { q: 'How do I get started with BUZ Construction?', a: 'Simply fill out our Free Quote form, call us at +1 (416) 710-8200, or email info@buzconstruction.ca. We respond within 24 hours and will schedule a free, no-obligation consultation at your convenience.' },
    ]
  },
  {
    category: 'Commercial Construction',
    emoji: '🏢',
    questions: [
      { q: 'What types of commercial projects do you build?', a: 'We build office buildings, retail plazas, restaurants, warehouses, industrial facilities, medical clinics, schools, and perform all types of tenant improvements and commercial fit-outs.' },
      { q: 'Do you handle LEED-certified commercial construction?', a: 'Yes. We have LEED AP certified team members and have completed multiple LEED Gold and Silver certified commercial projects. We can guide you through the entire certification process.' },
      { q: 'Can you manage a commercial project while my business stays open?', a: 'Absolutely. We specialize in phased construction and renovation planning that keeps your business operational. We schedule noisy or disruptive work during off-hours when required.' },
      { q: 'What is the typical timeline for a commercial build?', a: 'Timelines vary by project scope. A tenant improvement of 5,000 sq ft typically takes 8–16 weeks. A mid-rise office building may take 18–36 months. We provide a detailed schedule at the start of every project.' },
    ]
  },
  {
    category: 'Residential Construction',
    emoji: '🏠',
    questions: [
      { q: 'Can you build a fully custom home from scratch?', a: 'Yes — custom home construction is one of our specialties. We work with your architect or can refer you to our trusted design partners. We manage everything from permits to the final walk-through.' },
      { q: 'Do you build home additions and secondary suites?', a: 'Yes. We build second-storey additions, side additions, basement apartments (ADUs), laneway houses, and garden suites — all fully permitted and to Ontario Building Code standards.' },
      { q: 'How long does it take to build a custom home?', a: 'A custom home typically takes 12–18 months from permit approval to occupancy. Luxury custom builds with complex features can take 18–24 months. We provide a milestone schedule before construction begins.' },
      { q: 'Do you help with interior design selections?', a: 'Yes. Our design-build team assists with all finishes, fixtures, flooring, and cabinetry selections. We have preferred supplier relationships that offer quality materials at better pricing.' },
    ]
  },
  {
    category: 'Renovations',
    emoji: '🔨',
    questions: [
      { q: 'How much does a kitchen renovation cost in Ontario?', a: 'Kitchen renovation costs in Ontario range from $25,000–$45,000 for a standard refresh, $45,000–$80,000 for a mid-range renovation with custom cabinetry, and $80,000–$150,000+ for a full luxury kitchen. Costs depend on size, materials, and scope.' },
      { q: 'How long does a bathroom renovation take?', a: 'A standard bathroom renovation takes 3–5 weeks from demo to completion. A master ensuite with custom tile and specialty fixtures may take 6–8 weeks. We provide a detailed schedule before starting.' },
      { q: 'Do you handle the permits for renovations?', a: 'Yes. We manage all required building permits for your renovation, including structural, electrical, plumbing, and mechanical permits. You never have to deal with the city directly.' },
      { q: 'Can I stay in my home during a renovation?', a: 'It depends on the scope. For kitchen and bathroom renovations, most clients stay home. For whole-home or major structural renovations, we may recommend temporary accommodation for safety and comfort.' },
      { q: 'Do you offer heritage building renovations?', a: 'Yes. We have experience with heritage and designated properties in Ontario. We understand the approval requirements and work with conservation architects when required.' },
    ]
  },
  {
    category: 'Process & Project Management',
    emoji: '📋',
    questions: [
      { q: 'What does your project process look like from start to finish?', a: 'Our 6-step process: (1) Free Consultation, (2) Planning & Design, (3) Permitting, (4) Construction, (5) Inspections & Quality Control, (6) Final Walkthrough & Handover. You have a dedicated PM at every step.' },
      { q: 'Will I have a single point of contact during my project?', a: 'Yes. Every BUZ project has a dedicated Project Manager who is your single point of contact from start to finish. You will have their direct cell phone and email, and receive weekly progress reports.' },
      { q: 'How do you handle unexpected changes or issues mid-project?', a: 'All changes are documented with a formal Change Order before any work proceeds. You see the scope and cost impact in writing before we proceed. No surprises.' },
      { q: 'What software do you use to manage projects?', a: 'We use Procore for project management, scheduling, and RFI/submittal tracking. Clients receive access to a Procore portal where they can view progress photos, documents, and schedules in real time.' },
      { q: 'Do you offer project management as a standalone service?', a: 'Yes. We offer Owner\'s Representative and Construction Management services where we manage your project on your behalf — coordinating all trades, permits, and reporting without BUZ acting as the general contractor.' },
    ]
  },
  {
    category: 'Pricing & Payment',
    emoji: '💰',
    questions: [
      { q: 'How do you price your projects?', a: 'We offer Lump Sum (fixed price), Cost-Plus (transparent cost + fee), and Guaranteed Maximum Price (GMP) contracts depending on the project type and client preference. We discuss the best approach during your consultation.' },
      { q: 'Do you require a deposit to start?', a: 'Yes. Standard residential projects require a 10–15% deposit to mobilize. Commercial projects follow a monthly progress billing schedule tied to project milestones. Full details are in your contract.' },
      { q: 'Can you work within a fixed budget?', a: 'Absolutely. We are expert at value engineering — finding ways to achieve your design goals within your budget. We will always tell you upfront if a scope is not feasible within the budget rather than cutting corners.' },
      { q: 'Do you offer any financing options?', a: 'We partner with select financing providers for qualified residential renovation projects. Ask your Project Manager about available options during your consultation.' },
      { q: 'What is not included in your quotes?', a: 'Our quotes clearly list exclusions. Typically excluded: permit fees (passed through at cost), HST, owner-furnished materials, design/engineering fees (unless design-build), and items specifically listed as exclusions in the contract.' },
    ]
  },
]

export default function FAQPage() {
  const [openItem, setOpenItem] = useState<string | null>(null)
  const [activeCategory, setActiveCategory] = useState<string>('All')
  const [searchTerm, setSearchTerm] = useState('')

  const toggle = (key: string) => setOpenItem(openItem === key ? null : key)

  const filtered = faqData
    .map(cat => ({
      ...cat,
      questions: cat.questions.filter(q =>
        (activeCategory === 'All' || cat.category === activeCategory) &&
        (searchTerm === '' ||
          q.q.toLowerCase().includes(searchTerm.toLowerCase()) ||
          q.a.toLowerCase().includes(searchTerm.toLowerCase()))
      )
    }))
    .filter(cat => cat.questions.length > 0)

  return (
    <>
      <style>{`
        .faq-hero {
          position: relative; min-height: 46vh;
          display: flex; align-items: center;
          background: var(--primary); padding-top: var(--nav-height); overflow: hidden;
        }
        .faq-hero-bg { position: absolute; inset: 0; }
        .faq-hero-bg img { width: 100%; height: 100%; object-fit: cover; opacity: 0.15; }
        .faq-hero-overlay { position: absolute; inset: 0; background: linear-gradient(135deg, rgba(10,22,40,0.97) 0%, rgba(10,22,40,0.75) 100%); }
        .faq-hero-content { position: relative; z-index: 1; padding: 80px 0 60px; }

        .faq-search-wrap {
          position: relative; max-width: 560px; margin-top: 28px;
        }
        .faq-search {
          width: 100%; padding: 14px 20px 14px 50px;
          border-radius: 50px; font-size: 0.95rem;
          background: rgba(255,255,255,0.07);
          border: 1px solid rgba(255,255,255,0.15);
          color: var(--white); outline: none; transition: var(--transition);
          font-family: var(--font-body);
        }
        .faq-search::placeholder { color: var(--gray-dark); }
        .faq-search:focus { border-color: var(--accent); background: rgba(245,166,35,0.05); }
        .faq-search-icon { position: absolute; left: 18px; top: 50%; transform: translateY(-50%); color: var(--gray-dark); }

        .faq-cats {
          display: flex; gap: 8px; flex-wrap: wrap; margin-bottom: 48px;
        }
        .faq-cat-btn {
          padding: 8px 18px; border-radius: 50px;
          font-size: 0.82rem; font-weight: 700;
          border: 1px solid rgba(21,30,49,0.15);
          background: transparent; color: var(--primary);
          cursor: pointer; transition: var(--transition); font-family: var(--font-body);
          display: flex; align-items: center; gap: 6px;
        }
        .faq-cat-btn:hover, .faq-cat-btn.active {
          background: var(--accent); color: var(--primary); border-color: var(--accent);
        }

        .faq-section { margin-bottom: 48px; }
        .faq-section-header {
          display: flex; align-items: center; gap: 12px;
          margin-bottom: 20px; padding-bottom: 12px;
          border-bottom: 1px solid rgba(21,30,49,0.1);
          color: var(--primary);
        }
        .faq-section-emoji { font-size: 1.5rem; }
        .faq-section-title { font-family: var(--font-heading); font-size: 1.5rem; font-weight: 700; }
        .faq-count { font-size: 0.75rem; font-weight: 700; color: var(--accent-dark); background: rgba(198,167,94,0.15); padding: 2px 10px; border-radius: 50px; margin-left: auto; }

        .faq-item {
          border: 1px solid rgba(21,30,49,0.1);
          background: var(--white);
          border-radius: var(--radius-md);
          overflow: hidden; margin-bottom: 12px;
          transition: border-color 0.2s ease, box-shadow 0.2s ease;
        }
        .faq-item:hover { box-shadow: var(--shadow-sm); }
        .faq-item.open { border-color: rgba(198,167,94,0.5); }
        .faq-question {
          display: flex; align-items: center; justify-content: space-between;
          padding: 18px 20px;
          cursor: pointer; background: transparent;
          transition: background 0.2s ease;
          width: 100%; text-align: left; border: none; font-family: var(--font-body);
          gap: 16px;
        }
        .faq-question:hover { background: rgba(21,30,49,0.02); }
        .faq-item.open .faq-question { background: rgba(198,167,94,0.05); }
        .faq-q-text { font-weight: 600; font-size: 1.05rem; color: var(--primary); line-height: 1.4; }
        .faq-chevron {
          flex-shrink: 0; color: var(--primary);
          transition: transform 0.25s ease, color 0.2s;
        }
        .faq-item.open .faq-chevron { transform: rotate(180deg); color: var(--accent-dark); }
        .faq-answer {
          padding: 0 20px;
          max-height: 0; overflow: hidden;
          transition: max-height 0.35s ease, padding 0.25s ease;
        }
        .faq-answer.open {
          max-height: 400px; padding: 0 20px 20px;
        }
        .faq-answer p { color: var(--secondary); font-size: 1rem; line-height: 1.75; }

        .faq-cta {
          background: var(--white);
          border: 1px solid rgba(198,167,94,0.3);
          box-shadow: var(--shadow-sm);
          border-radius: var(--radius-xl); padding: 48px;
          text-align: center; margin-top: 60px;
          color: var(--primary);
        }
        .no-results { text-align: center; padding: 48px; color: var(--gray-dark); }

        @media(max-width: 768px) {
          .faq-question { padding: 14px 16px; }
          .faq-q-text { font-size: 0.88rem; }
        }
      `}</style>

      {/* Hero */}
      <section className="faq-hero">
        <div className="faq-hero-bg">
          <Image src="/images/buz_faq_hero.jpg" alt="FAQ" fill style={{ objectFit: 'cover' }} />
        </div>
        <div className="faq-hero-overlay" />
        <div className="container faq-hero-content">
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: '0.8rem', color: 'var(--gray-dark)', marginBottom: 16 }}>
            <Link href="/" style={{ color: 'var(--accent)', textDecoration: 'none' }}>Home</Link>
            <span>/</span>
            <span>FAQ</span>
          </div>
          <span className="section-tag">Got Questions?</span>
          <h1 style={{ fontFamily: 'var(--font-heading)', fontSize: 'clamp(2.8rem,6vw,5rem)', fontWeight: 900, marginTop: 12, marginBottom: 12, color: 'var(--white)' }}>
            Frequently Asked <span style={{ color: 'var(--accent)' }}>Questions</span>
          </h1>
          <p style={{ color: 'var(--gray-light)', fontSize: '1.05rem', maxWidth: 520, lineHeight: 1.75 }}>
            Everything you need to know about working with BUZ Construction. Can't find an answer? Call us directly.
          </p>
          <div className="faq-search-wrap">
            <Search size={18} className="faq-search-icon" />
            <input
              type="text"
              className="faq-search"
              placeholder="Search questions..."
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
            />
          </div>
        </div>
      </section>

      {/* FAQ Body */}
      <section className="section" style={{ background: 'var(--off-white)', paddingBottom: '100px' }}>
        <div className="container">
          <div style={{ maxWidth: 860, margin: '0 auto' }}>

            {/* Category filter */}
            <div className="faq-cats">
              {['All', ...faqData.map(c => c.category)].map(cat => (
                <button key={cat} className={`faq-cat-btn ${activeCategory === cat ? 'active' : ''}`}
                  onClick={() => setActiveCategory(cat)}>
                  {faqData.find(c => c.category === cat)?.emoji} {cat}
                </button>
              ))}
            </div>

            {/* Results */}
            {filtered.length === 0 ? (
              <div className="no-results">
                <div style={{ fontSize: '3rem', marginBottom: 12 }}>🔍</div>
                <h3 style={{ fontFamily: 'var(--font-heading)', marginBottom: 8 }}>No results found</h3>
                <p>Try a different search term or <Link href="/contact" style={{ color: 'var(--accent)' }}>contact us directly</Link>.</p>
              </div>
            ) : (
              filtered.map(cat => (
                <div key={cat.category} className="faq-section">
                  <div className="faq-section-header">
                    <span className="faq-section-emoji">{cat.emoji}</span>
                    <span className="faq-section-title">{cat.category}</span>
                    <span className="faq-count">{cat.questions.length} answers</span>
                  </div>
                  {cat.questions.map((item, qi) => {
                    const key = `${cat.category}-${qi}`
                    const isOpen = openItem === key
                    return (
                      <div key={key} className={`faq-item ${isOpen ? 'open' : ''}`}>
                        <button className="faq-question" onClick={() => toggle(key)}>
                          <span className="faq-q-text">{item.q}</span>
                          <ChevronDown size={18} className="faq-chevron" />
                        </button>
                        <div className={`faq-answer ${isOpen ? 'open' : ''}`}>
                          <p>{item.a}</p>
                        </div>
                      </div>
                    )
                  })}
                </div>
              ))
            )}

            {/* CTA */}
            <div className="faq-cta">
              <div style={{ fontSize: '2.5rem', marginBottom: 12 }}>💬</div>
              <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '2rem', marginBottom: 10 }}>Still have questions?</h3>
              <p style={{ color: 'var(--secondary)', marginBottom: 28, lineHeight: 1.75 }}>
                Our team is available Monday to Friday 7am–6pm and Saturday 8am–2pm.<br />
                We respond to all inquiries within 24 hours.
              </p>
              <div style={{ display: 'flex', gap: 14, justifyContent: 'center', flexWrap: 'wrap' }}>
                <Link href="/contact" className="btn btn-primary btn-lg">Contact Us <ArrowRight size={18} /></Link>
                <a href="tel:+14167108200" className="btn btn-outline btn-lg">Call +1 (416) 710-8200</a>
              </div>
            </div>

          </div>
        </div>
      </section>
    </>
  )
}
