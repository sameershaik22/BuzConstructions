import type { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import { Scale, FileCheck, AlertTriangle, CreditCard, HardHat, Award } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Terms of Service | BUZ Construction Group Inc.',
  description: 'Read the Terms of Service and contractual contracting guidelines for BUZ Construction Group Inc.',
}

export default function TermsPage() {
  return (
    <>
      <style>{`
        .page-hero { position: relative; min-height: 45vh; display: flex; align-items: center; background: var(--off-white); padding-top: var(--nav-height); overflow: hidden; }
        .page-hero-bg { position: absolute; inset: 0; }
        .page-hero-bg img { width: 100%; height: 100%; object-fit: cover; opacity: 0.85; }
        .custom-hero-overlay { position: absolute; inset: 0; background: linear-gradient(to right, rgba(240,235,225,0.95) 0%, rgba(240,235,225,0.85) 45%, transparent 100%); z-index: 0; }
        .page-hero-content { position: relative; z-index: 1; padding: 80px 0 60px; }
        
        .legal-content-wrapper { padding: 80px 0; background: var(--off-white); }
        .legal-grid { display: grid; grid-template-columns: 1fr; max-width: 900px; margin: 0 auto; gap: 32px; }
        .legal-card { background: var(--white); border: 1px solid rgba(21,30,49,0.08); border-radius: var(--radius-xl); padding: 40px; box-shadow: var(--shadow-sm); }
        .legal-card h2 { font-family: var(--font-heading); font-size: 1.5rem; color: var(--secondary); margin-bottom: 16px; display: flex; align-items: center; gap: 12px; }
        .legal-card p { color: var(--gray-dark); font-size: 0.95rem; line-height: 1.8; margin-bottom: 16px; }
        .legal-card ul { padding-left: 20px; margin-bottom: 16px; color: var(--gray-dark); font-size: 0.95rem; line-height: 1.8; }
        .legal-card li { margin-bottom: 8px; }
        .legal-card strong { color: var(--secondary); }
        
        .last-updated { font-size: 0.85rem; font-weight: 600; color: var(--accent); text-transform: uppercase; letter-spacing: 0.08em; margin-bottom: 8px; display: block; }
      `}</style>

      <section className="page-hero">
        <div className="page-hero-bg">
          <Image src="/images/buz_portfolio_hero.jpg" alt="Terms of Service" fill style={{ objectFit: 'cover' }} />
        </div>
        <div className="custom-hero-overlay" />
        <div className="container page-hero-content">
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: '0.8rem', color: 'var(--gray-dark)', marginBottom: 16 }}>
            <Link href="/" style={{ color: 'var(--accent)', textDecoration: 'none', fontWeight: 600 }}>Home</Link> / Terms of Service
          </div>
          <span className="last-updated">Last Updated: June 2026</span>
          <h1 style={{ fontFamily: 'var(--font-heading)', fontSize: '3rem', fontWeight: 900, color: 'var(--secondary)', lineHeight: 1.1, marginBottom: 16 }}>
            Terms of <span style={{ color: 'var(--accent)' }}>Service</span>
          </h1>
          <p style={{ color: 'var(--gray-dark)', fontSize: '1.1rem', maxWidth: 600, lineHeight: 1.6 }}>
            Standard contracting conditions, operational guidelines, and legal terms governing our construction partnerships.
          </p>
        </div>
      </section>

      <section className="legal-content-wrapper">
        <div className="container">
          <div className="legal-grid">
            
            <div className="legal-card">
              <h2><Scale size={24} style={{ color: 'var(--accent)' }} /> 1. Agreement & Acceptance of Terms</h2>
              <p>
                These Terms of Service ("Terms") govern your use of the website operated by BUZ Construction Group Inc. ("BUZ Construction") and apply to all formal estimates, consultation proposals, and general contracting agreements entered into with our company.
              </p>
              <p>
                By retaining our services or utilizing this web portal, you agree to comply with all federal, provincial, and municipal laws applicable to construction practices in the Province of Ontario.
              </p>
            </div>

            <div className="legal-card">
              <h2><FileCheck size={24} style={{ color: 'var(--accent)' }} /> 2. Project Estimates & Contractual Scope</h2>
              <p>Preliminary estimates provided via online calculators or verbal consultations are non-binding valuations intended for general budgeting:</p>
              <ul>
                <li><strong>Formal Contracts:</strong> All physical construction, renovation, or project management work requires a executed written contract specifying exact architectural scope, materials, labor rates, and milestone schedules.</li>
                <li><strong>Change Orders:</strong> Any modifications requested after physical site work commences—including material substitutions or structural alterations—will be processed via formal written Change Orders adjusting project costs and delivery timelines accordingly.</li>
              </ul>
            </div>

            <div className="legal-card">
              <h2><CreditCard size={24} style={{ color: 'var(--accent)' }} /> 3. Payment Schedules & Financial Terms</h2>
              <p>Payment terms are strictly governed by the individual construction contract executed between BUZ Construction and the client:</p>
              <ul>
                <li>Standard contracting schedules involve an initial mobilization deposit upon contract signing, followed by progressive milestone draws tied to verified work completion.</li>
                <li>In accordance with the Ontario Construction Act, applicable statutory holdbacks will be maintained and released upon certified substantial performance of the project.</li>
              </ul>
            </div>

            <div className="legal-card">
              <h2><HardHat size={24} style={{ color: 'var(--accent)' }} /> 4. Jobsite Access & Safety Regulations</h2>
              <p>
                Safety is paramount across all BUZ Construction worksites. Active construction zones pose inherent physical hazards:
              </p>
              <ul>
                <li>Clients, property owners, and unauthorized visitors are prohibited from entering active construction work areas without authorized BUZ supervision and proper Personal Protective Equipment (PPE).</li>
                <li>BUZ Construction maintains comprehensive WSIB worker coverage and commercial general liability insurance across all active operational sites.</li>
              </ul>
            </div>

            <div className="legal-card">
              <h2><AlertTriangle size={24} style={{ color: 'var(--accent)' }} /> 5. Warranties & Limitation of Liability</h2>
              <p>
                We stand behind our craftsmanship with industry-standard structural and workmanship warranties as detailed in your specific project contract. However, BUZ Construction is not liable for project delays caused by force majeure events, municipal permitting backlogs, extreme weather conditions, or unforeseen pre-existing structural defects hidden within existing properties.
              </p>
            </div>

            <div className="legal-card" style={{ background: 'var(--secondary)', color: 'var(--white)', borderColor: 'var(--accent)' }}>
              <h2 style={{ color: 'var(--white)' }}><Award size={24} style={{ color: 'var(--accent)' }} /> Legal Inquiries</h2>
              <p style={{ color: 'var(--gray-light)' }}>
                For questions regarding formal construction contracts, licensing verification, or general legal policies, please contact our administrative office:
              </p>
              <p style={{ color: 'var(--white)', margin: 0 }}>
                <strong>BUZ Construction Group Inc.</strong><br />
                15 Queen St. S, Mississauga, Ontario L5M 1K2<br />
                <strong>Email:</strong> <a href="mailto:info@buzconstruction.ca" style={{ color: 'var(--accent)', textDecoration: 'none' }}>info@buzconstruction.ca</a><br />
                <strong>License:</strong> Ontario General Contractor License #OCL-2026-001
              </p>
            </div>

          </div>
        </div>
      </section>
    </>
  )
}
