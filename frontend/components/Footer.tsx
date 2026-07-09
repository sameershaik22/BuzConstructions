import Link from 'next/link'
import { Phone, Mail, MapPin, ArrowRight } from 'lucide-react'

const FacebookIcon = () => <svg width="16" height="16" fill="currentColor" viewBox="0 0 24 24"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>
const InstagramIcon = () => <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></svg>
const LinkedinIcon = () => <svg width="16" height="16" fill="currentColor" viewBox="0 0 24 24"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect x="2" y="9" width="4" height="12"/><circle cx="4" cy="4" r="2"/></svg>
const TwitterIcon = () => <svg width="16" height="16" fill="currentColor" viewBox="0 0 24 24"><path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z"/></svg>

const services = [
  { name: 'Commercial Construction', href: '/services/commercial' },
  { name: 'Residential Construction', href: '/services/residential' },
  { name: 'Renovations', href: '/services/renovations' },
  { name: 'Project Management', href: '/services/project-management' },
  { name: 'Design-Build Services', href: '/services/design-build' },
]

const quickLinks = [
  { name: 'About Us', href: '/about' },
  { name: 'Portfolio', href: '/portfolio' },
  { name: 'Service Areas', href: '/service-areas' },
  { name: 'Free Estimate', href: '/estimate' },
  { name: 'FAQ', href: '/faq' },
  { name: 'Safety & Quality', href: '/safety-quality' },
  { name: 'Careers', href: '/careers' },
  { name: 'Blog', href: '/blog' },
  { name: 'Contact Us', href: '/contact' },
]

export default function Footer() {
  return (
    <footer style={{ background: 'var(--primary)', borderTop: '1px solid rgba(255,255,255,0.06)' }}>
      <style>{`
        .footer-main {
          padding: 80px 0 48px;
        }
        .footer-grid {
          display: grid;
          grid-template-columns: 2fr 1fr 1fr 1.5fr;
          gap: 48px;
        }
        .footer-brand { }
        .footer-logo {
          display: flex; align-items: center; gap: 10px; margin-bottom: 20px;
        }
        .footer-logo-icon {
          width: 44px; height: 44px; background: var(--accent);
          border-radius: 8px; display: flex; align-items: center; justify-content: center;
          font-family: var(--font-heading); font-weight: 900; font-size: 1.2rem; color: var(--primary);
        }
        .footer-logo-name { font-family: var(--font-heading); font-weight: 800; font-size: 1.1rem; color: var(--white); letter-spacing: 0.05em; }
        .footer-logo-sub  { font-size: 0.6rem; color: var(--accent); letter-spacing: 0.15em; text-transform: uppercase; }
        .footer-desc { color: var(--gray-mid); font-size: 0.9rem; line-height: 1.7; margin-bottom: 24px; }
        .footer-socials { display: flex; gap: 12px; }
        .social-btn {
          width: 38px; height: 38px; border-radius: 8px;
          background: rgba(255,255,255,0.07);
          display: flex; align-items: center; justify-content: center;
          color: var(--gray-mid); transition: var(--transition);
          text-decoration: none;
        }
        .social-btn:hover { background: var(--accent); color: var(--primary); transform: translateY(-2px); }
        .footer-col-title {
          font-family: var(--font-heading); font-size: 1.1rem; font-weight: 700;
          color: var(--white); margin-bottom: 20px; letter-spacing: 0.05em;
        }
        .footer-links { display: flex; flex-direction: column; gap: 10px; }
        .footer-link {
          color: var(--gray-mid); font-size: 0.88rem; text-decoration: none;
          transition: var(--transition); display: flex; align-items: center; gap: 6px;
        }
        .footer-link:hover { color: var(--accent); transform: translateX(4px); }
        .footer-contact-items { display: flex; flex-direction: column; gap: 14px; }
        .footer-contact-item {
          display: flex; align-items: flex-start; gap: 12px;
          color: var(--gray-mid); font-size: 0.88rem;
        }
        .footer-contact-icon {
          width: 32px; height: 32px; border-radius: 8px;
          background: rgba(var(--accent-rgb), 0.1);
          display: flex; align-items: center; justify-content: center;
          flex-shrink: 0; color: var(--accent);
        }
        .footer-contact-item a { color: var(--gray-mid); text-decoration: none; transition: var(--transition); }
        .footer-contact-item a:hover { color: var(--accent); }
        .footer-newsletter { margin-top: 24px; }
        .footer-newsletter-form { display: flex; gap: 8px; margin-top: 12px; }
        .footer-newsletter-input {
          flex: 1; padding: 10px 14px; border-radius: var(--radius-md);
          background: rgba(255,255,255,0.06); border: 1px solid rgba(255,255,255,0.1);
          color: var(--white); font-size: 0.85rem; outline: none;
          transition: var(--transition);
        }
        .footer-newsletter-input::placeholder { color: var(--gray-dark); }
        .footer-newsletter-input:focus { border-color: var(--accent); }
        .footer-newsletter-btn {
          background: #C6A75E !important;
          color: #FCFAF7 !important;
          border: none !important;
          transition: all 0.3s ease;
        }
        .footer-newsletter-btn:hover {
          background: #E8CA7D !important;
          transform: translateY(-2px);
          box-shadow: 0 0 15px rgba(198, 167, 94, 0.75) !important;
        }
        .footer-bottom {
          padding: 20px 0;
          border-top: 1px solid rgba(255,255,255,0.06);
          display: flex; align-items: center; justify-content: space-between;
          flex-wrap: wrap; gap: 12px;
        }
        .footer-bottom-text { color: var(--gray-dark); font-size: 0.8rem; }
        .footer-bottom-links { display: flex; gap: 20px; }
        .footer-bottom-link { color: var(--gray-dark); font-size: 0.8rem; text-decoration: none; transition: var(--transition); }
        .footer-bottom-link:hover { color: var(--accent); }
        @media (max-width: 1024px) {
          .footer-grid { grid-template-columns: 1fr 1fr; }
        }
        @media (max-width: 640px) {
          .footer-grid { grid-template-columns: 1fr; }
          .footer-bottom { flex-direction: column; text-align: center; }
        }
      `}</style>

      <div className="footer-main">
        <div className="container">
          <div className="footer-grid">
            {/* Brand */}
            <div className="footer-brand">
              <div className="footer-logo">
                <div className="footer-logo-icon">BUZ</div>
                <div>
                  <div className="footer-logo-name">BUZ CONSTRUCTION</div>
                  <div className="footer-logo-sub">Building Excellence · Creating Trust</div>
                </div>
              </div>
              <p className="footer-desc">
                BUZ Construction Group Inc. is a Canadian construction company specializing in commercial and residential construction projects across Ontario. Building Excellence. Creating Trust.
              </p>
              <div className="footer-socials">
                <a href="https://facebook.com/buzconstruction" target="_blank" rel="noopener noreferrer" className="social-btn" aria-label="Facebook"><FacebookIcon /></a>
                <a href="https://instagram.com/buzconstruction" target="_blank" rel="noopener noreferrer" className="social-btn" aria-label="Instagram"><InstagramIcon /></a>
                <a href="https://linkedin.com/company/buz-construction" target="_blank" rel="noopener noreferrer" className="social-btn" aria-label="LinkedIn"><LinkedinIcon /></a>
                <a href="https://twitter.com/buzconstruction" target="_blank" rel="noopener noreferrer" className="social-btn" aria-label="Twitter/X"><TwitterIcon /></a>
              </div>
            </div>

            {/* Services */}
            <div>
              <h4 className="footer-col-title">Our Services</h4>
              <nav className="footer-links" aria-label="Services">
                {services.map(s => (
                  <Link key={s.name} href={s.href} className="footer-link">
                    <ArrowRight size={12} /> {s.name}
                  </Link>
                ))}
              </nav>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="footer-col-title">Quick Links</h4>
              <nav className="footer-links" aria-label="Quick links">
                {quickLinks.map(l => (
                  <Link key={l.name} href={l.href} className="footer-link">
                    <ArrowRight size={12} /> {l.name}
                  </Link>
                ))}
              </nav>
            </div>

            {/* Contact */}
            <div>
              <h4 className="footer-col-title">Contact Us</h4>
              <div className="footer-contact-items">
                <div className="footer-contact-item">
                  <div className="footer-contact-icon"><Phone size={14} /></div>
                  <div><a href="tel:+14167108200">+1 (416) 710-8200</a> / <a href="tel:+16475817986">+1 (647) 581-7986</a><br /><span style={{ fontSize: '0.78rem', color: 'var(--gray-dark)' }}>Mon–Fri 7am–6pm, Sat 8am–2pm</span></div>
                </div>
                <div className="footer-contact-item">
                  <div className="footer-contact-icon"><Mail size={14} /></div>
                  <div><a href="mailto:info@buzconstruction.ca">info@buzconstruction.ca</a><br /><span style={{ fontSize: '0.78rem', color: 'var(--gray-dark)' }}>Estimates: estimates@buzconstruction.ca</span></div>
                </div>
                <div className="footer-contact-item">
                  <div className="footer-contact-icon"><MapPin size={14} /></div>
                  <div>15 Queen St. S<br />Mississauga, Ontario L5M 1K2</div>
                </div>
              </div>
              {/* Newsletter */}
              <div className="footer-newsletter">
                <p style={{ color: 'var(--gray-mid)', fontSize: '0.82rem', marginBottom: '8px' }}>Subscribe to our newsletter</p>
                <div className="footer-newsletter-form">
                  <input type="email" placeholder="Your email" className="footer-newsletter-input" />
                  <button className="btn footer-newsletter-btn btn-sm" style={{ padding: '10px 14px' }}>
                    <ArrowRight size={16} />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="container">
        <div className="footer-bottom">
          <p className="footer-bottom-text">
            © {new Date().getFullYear()} BUZ Construction Group Inc. All rights reserved. | Ontario General Contractor License #OCL-2024-001
          </p>
          <div className="footer-bottom-links">
            <Link href="/privacy" className="footer-bottom-link">Privacy Policy</Link>
            <Link href="/terms" className="footer-bottom-link">Terms of Service</Link>
            <a href="#" className="footer-bottom-link">Accessibility</a>
          </div>
        </div>
      </div>
    </footer>
  )
}
