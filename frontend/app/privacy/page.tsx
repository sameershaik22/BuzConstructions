import type { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import { Shield, Lock, Eye, FileText, CheckCircle } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Privacy Policy | BUZ Construction Group Inc.',
  description: 'Learn how BUZ Construction Group Inc. collects, protects, and manages your personal information and data.',
}

export default function PrivacyPage() {
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
          <Image src="/images/buz_about_hero.png" alt="Privacy Policy" fill style={{ objectFit: 'cover' }} />
        </div>
        <div className="custom-hero-overlay" />
        <div className="container page-hero-content">
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: '0.8rem', color: 'var(--gray-dark)', marginBottom: 16 }}>
            <Link href="/" style={{ color: 'var(--accent)', textDecoration: 'none', fontWeight: 600 }}>Home</Link> / Privacy Policy
          </div>
          <span className="last-updated">Last Updated: June 2026</span>
          <h1 style={{ fontFamily: 'var(--font-heading)', fontSize: '3rem', fontWeight: 900, color: 'var(--secondary)', lineHeight: 1.1, marginBottom: 16 }}>
            Privacy <span style={{ color: 'var(--accent)' }}>Policy</span>
          </h1>
          <p style={{ color: 'var(--gray-dark)', fontSize: '1.1rem', maxWidth: 600, lineHeight: 1.6 }}>
            Your privacy is our priority. We are committed to maintaining transparent, secure, and respectful data practices.
          </p>
        </div>
      </section>

      <section className="legal-content-wrapper">
        <div className="container">
          <div className="legal-grid">
            
            <div className="legal-card">
              <h2><Shield size={24} style={{ color: 'var(--accent)' }} /> 1. Introduction & Overview</h2>
              <p>
                BUZ Construction Group Inc. ("BUZ Construction", "we", "our", or "us") respects your privacy and is dedicated to protecting the personal information you share with us. This Privacy Policy outlines our guidelines for collecting, using, securing, and disclosing information when you visit our website or interact with our construction contracting services across Ontario.
              </p>
              <p>
                By accessing our website or submitting project inquiry forms, you consent to the data practices described in this policy.
              </p>
            </div>

            <div className="legal-card">
              <h2><Eye size={24} style={{ color: 'var(--accent)' }} /> 2. Information We Collect</h2>
              <p>We collect information that helps us deliver high-quality general contracting and renovation services:</p>
              <ul>
                <li><strong>Personal Identification Data:</strong> Full name, email address, phone number, and physical property address provided via our consultation or estimate request forms.</li>
                <li><strong>Project Specifications:</strong> Details regarding your proposed construction project, architectural plans, estimated budgets, and desired timelines.</li>
                <li><strong>Technical Usage Data:</strong> IP addresses, browser types, device identifiers, and site interaction metrics collected automatically via standard analytics tools to improve user experience.</li>
              </ul>
            </div>

            <div className="legal-card">
              <h2><Lock size={24} style={{ color: 'var(--accent)' }} /> 3. How We Use Your Information</h2>
              <p>Any personal information collected by BUZ Construction is used strictly for legitimate business purposes:</p>
              <ul>
                <li>To evaluate project feasibility, prepare accurate cost estimations, and schedule site consultations.</li>
                <li>To communicate with you regarding project milestones, contractual proposals, and service inquiries.</li>
                <li>To comply with Ontario building codes, municipal permitting authorities, and legal safety regulations when executing contracted work.</li>
                <li>To send occasional relevant newsletters or project showcases (which you can opt out of at any time).</li>
              </ul>
            </div>

            <div className="legal-card">
              <h2><FileText size={24} style={{ color: 'var(--accent)' }} /> 4. Data Sharing & Disclosure</h2>
              <p>
                We do <strong>not</strong> sell, rent, or trade your personal data to third-party marketing agencies. We only share information under necessary and controlled circumstances:
              </p>
              <ul>
                <li><strong>Vetted Subcontractors & Engineers:</strong> Relevant architectural or structural details may be shared with licensed engineering partners and trades professionals involved directly in executing your project.</li>
                <li><strong>Legal & Municipal Authorities:</strong> When required for municipal zoning approvals, building permits, or to comply with applicable Canadian laws and court orders.</li>
              </ul>
            </div>

            <div className="legal-card">
              <h2><CheckCircle size={24} style={{ color: 'var(--accent)' }} /> 5. Data Security & Retention</h2>
              <p>
                We implement robust administrative, technical, and physical security safeguards designed to protect your personal information against unauthorized access, disclosure, alteration, or destruction. Project files and client records are retained only for as long as required to fulfill contractual warranties and comply with statutory financial and legal retention periods.
              </p>
            </div>

            <div className="legal-card" style={{ background: 'var(--secondary)', color: 'var(--white)', borderColor: 'var(--accent)' }}>
              <h2 style={{ color: 'var(--white)' }}>Contact Our Privacy Officer</h2>
              <p style={{ color: 'var(--gray-light)' }}>
                If you have questions, concerns, or requests regarding the access or deletion of your personal data stored with BUZ Construction Group Inc., please reach out directly:
              </p>
              <p style={{ color: 'var(--white)', margin: 0 }}>
                <strong>Email:</strong> <a href="mailto:info@buzconstruction.ca" style={{ color: 'var(--accent)', textDecoration: 'none' }}>info@buzconstruction.ca</a><br />
                <strong>Address:</strong> 15 Queen St. S, Mississauga, Ontario L5M 1K2<br />
                <strong>Phone:</strong> +1 (416) 710-8200
              </p>
            </div>

          </div>
        </div>
      </section>
    </>
  )
}
