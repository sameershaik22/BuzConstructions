'use client'
import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { X, ChevronDown, ChevronRight, ArrowRight } from 'lucide-react'

const services = [
  { name: 'Commercial Construction', href: '/services/commercial' },
  { name: 'Residential Construction', href: '/services/residential' },
  { name: 'Renovations', href: '/services/renovations' },
  { name: 'Project Management', href: '/services/project-management' },
  { name: 'Design-Build', href: '/services/design-build' },
]

const navLinks = [
  { name: 'Home', href: '/' },
  { name: 'About', href: '/about' },
  { name: 'Services', href: '/services', children: services },
  { name: 'Portfolio', href: '/portfolio' },
  { name: 'Areas', href: '/service-areas' },
  { name: 'FAQ', href: '/faq' },
  { name: 'Blog', href: '/blog' },
  { name: 'Careers', href: '/careers' },
  { name: 'Contact', href: '/contact' },
]

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [servicesOpen, setServicesOpen] = useState(false)
  const [mobileServices, setMobileServices] = useState(false)
  const pathname = usePathname()
  // Delay timer ref — prevents gap between button and dropdown from closing it
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null)

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handler)
    return () => window.removeEventListener('scroll', handler)
  }, [])

  useEffect(() => { setOpen(false) }, [pathname])

  useEffect(() => {
    if (open) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => { document.body.style.overflow = '' }
  }, [open])

  const isActive = (href: string) =>
    href === '/' ? pathname === '/' : pathname.startsWith(href)

  const handleMouseEnter = () => {
    if (closeTimer.current) clearTimeout(closeTimer.current)
    setServicesOpen(true)
  }

  // 150ms grace period — enough to cross the gap without accidentally closing
  const handleMouseLeave = () => {
    closeTimer.current = setTimeout(() => setServicesOpen(false), 150)
  }

  return (
    <>
      <style>{`
        .navbar {
          position: fixed; top: 0; left: 0; right: 0; z-index: 900;
          height: var(--nav-height);
          display: flex; align-items: center;
          background: var(--primary);
          border-bottom: 1px solid rgba(255,255,255,0.07);
          transition: box-shadow 0.3s ease;
        }
        .navbar.scrolled {
          box-shadow: 0 4px 40px rgba(0,0,0,0.35);
        }
        .nav-inner {
          display: grid;
          grid-template-columns: 1fr auto 1fr;
          align-items: center;
          width: 100%;
          gap: 32px;
        }
        /* Logo */
        .nav-logo {
          display: flex; align-items: center; gap: 12px;
          text-decoration: none; flex-shrink: 0;
          justify-self: start;
        }
        .nav-logo-icon {
          width: 44px; height: 44px;
          background: var(--accent);
          border-radius: 10px;
          display: flex; align-items: center; justify-content: center;
          font-family: var(--font-heading);
          font-weight: 900; font-size: 1.15rem;
          color: var(--primary);
        }
        .nav-logo-text { display: flex; flex-direction: column; line-height: 1.15; }
        .nav-logo-name {
          font-family: var(--font-heading);
          font-weight: 800; font-size: 1.05rem; color: var(--white);
          letter-spacing: 0.06em;
        }
        .nav-logo-sub {
          font-size: 0.6rem; color: var(--accent);
          letter-spacing: 0.18em; text-transform: uppercase; font-weight: 600;
        }
        /* Centre links */
        .nav-links {
          display: flex; align-items: center;
          justify-content: center;
          gap: 2px; list-style: none;
          margin: 0; padding: 0;
        }
        .nav-link {
          font-size: 0.875rem; font-weight: 600;
          color: rgba(255,255,255,0.85);
          padding: 8px 14px;
          border-radius: 8px;
          transition: color 0.2s ease, background 0.2s ease;
          position: relative; text-decoration: none;
          display: flex; align-items: center; gap: 5px;
          cursor: pointer; white-space: nowrap;
          background: none; border: none; font-family: var(--font-body);
        }
        .nav-link:hover { color: var(--white); background: rgba(255,255,255,0.06); }
        .nav-link.active { color: var(--accent); }
        .nav-link.active::after {
          content: ''; position: absolute; bottom: 2px; left: 50%;
          transform: translateX(-50%);
          width: 18px; height: 2px; background: var(--accent); border-radius: 2px;
        }

        /* ── Dropdown wrapper ── */
        .nav-dropdown-wrap { position: relative; }

        /*
         * KEY FIX: The dropdown sits flush against the button (top: 100%)
         * and has padding-top: 12px as an invisible "bridge" so the mouse
         * never crosses dead air and never triggers onMouseLeave.
         */
        .nav-dropdown-outer {
          position: absolute;
          top: 100%;
          left: 50%;
          transform: translateX(-50%);
          padding-top: 10px;        /* ← invisible bridge */
          z-index: 1000;
        }
        .nav-dropdown {
          background: var(--primary-light);
          border: 1px solid rgba(255,255,255,0.1);
          border-radius: 14px;
          padding: 8px;
          min-width: 265px;
          box-shadow: 0 24px 60px rgba(0,0,0,0.55);
          animation: ddFadeIn 0.15s ease;
        }
        @keyframes ddFadeIn {
          from { opacity: 0; transform: translateY(-6px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .nav-dropdown-item {
          display: flex; align-items: center; justify-content: space-between;
          padding: 11px 16px;
          border-radius: 8px;
          color: rgba(255,255,255,0.78);
          font-size: 0.875rem; font-weight: 500;
          transition: background 0.15s ease, color 0.15s ease, padding-left 0.15s ease;
          text-decoration: none;
          cursor: pointer;
        }
        .nav-dropdown-item:hover {
          background: rgba(var(--accent-rgb), 0.13);
          color: var(--accent);
          padding-left: 20px;
        }
        .chevron-icon { opacity: 0.4; transition: opacity 0.15s; }
        .nav-dropdown-item:hover .chevron-icon { opacity: 1; }

        /* Right CTA */
        .nav-cta { display: flex; align-items: center; gap: 10px; flex-shrink: 0; justify-self: end; }
        .nav-estimate-btn {
          background: #C6A75E !important;
          color: #FCFAF7 !important;
          padding: 10px 22px;
          font-size: 0.88rem;
          font-weight: 600;
          border-radius: var(--radius-md);
          display: inline-flex;
          align-items: center;
          gap: 8px;
          text-decoration: none;
          transition: all 0.3s ease;
          border: none;
          white-space: nowrap;
        }
        .nav-estimate-btn:hover {
          background: #E8CA7D !important;
          transform: translateY(-2px);
          box-shadow: 0 0 25px rgba(198, 167, 94, 0.75) !important;
        }

        /* Hamburger */
        .hamburger {
          display: none; flex-direction: column; justify-content: center; align-items: center; gap: 5px;
          background: rgba(255,255,255,0.08); border: 1px solid rgba(255,255,255,0.1);
          cursor: pointer; min-width: 44px; min-height: 44px; padding: 8px 10px; border-radius: 8px;
          transition: background 0.2s;
        }
        .hamburger:hover { background: rgba(255,255,255,0.14); }
        .ham-line { width: 20px; height: 2px; background: var(--white); border-radius: 2px; }

        /* Mobile menu */
        .mobile-menu {
          display: none; position: fixed;
          top: var(--nav-height); left: 0; right: 0; bottom: 0;
          background: var(--primary);
          border-top: 1px solid rgba(255,255,255,0.07);
          overflow-y: auto; z-index: 899;
          padding: 20px 24px 40px;
        }
        .mobile-menu.show { display: block; }
        .mobile-nav-link {
          display: flex; align-items: center; justify-content: space-between;
          padding: 15px 0; min-height: 44px;
          border-bottom: 1px solid rgba(255,255,255,0.06);
          color: var(--white); font-size: 1rem; font-weight: 600;
          text-decoration: none; cursor: pointer;
          background: none; border-right: none; border-left: none; border-top: none;
          font-family: var(--font-body); width: 100%;
          transition: color 0.2s;
        }
        .mobile-nav-link:hover, .mobile-nav-link.m-active { color: var(--accent); }
        .mobile-sub-links { padding: 6px 0 6px 16px; }
        .mobile-sub-link {
          display: flex; align-items: center; gap: 8px;
          padding: 10px 0; min-height: 44px;
          color: rgba(255,255,255,0.58); font-size: 0.92rem;
          text-decoration: none; transition: color 0.2s;
          border-bottom: 1px solid rgba(255,255,255,0.04);
        }
        .mobile-sub-link:last-child { border-bottom: none; }
        .mobile-sub-link:hover { color: var(--accent); }
        .mobile-sub-dot { width: 5px; height: 5px; border-radius: 50%; background: var(--accent); flex-shrink: 0; }
        .mobile-cta { margin-top: 28px; display: flex; flex-direction: column; gap: 12px; }

        @media (max-width: 1100px) {
          .nav-links   { display: none; }
          .hamburger   { display: flex; }
          .nav-cta .btn, .nav-cta .nav-estimate-btn { display: none; }
          /* BUZ logo: far LEFT — hamburger: far RIGHT */
          .nav-inner {
            display: flex !important;
            flex-direction: row !important;
            justify-content: space-between !important;
            align-items: center !important;
            width: 100% !important;
            gap: 0 !important;
          }
          .nav-logo  { flex-shrink: 0; }
          .nav-cta   { flex-shrink: 0; margin-left: auto; }
        }
        @media (max-width: 480px) {
          .nav-logo-text { display: none; }
          .nav-logo-icon { width: 40px; height: 40px; font-size: 1rem; }
        }
      `}</style>

      <nav className={`navbar ${scrolled ? 'scrolled' : ''}`}>
        <div className="container">
          <div className="nav-inner">

            {/* Logo */}
            <Link href="/" className="nav-logo">
              <div className="nav-logo-icon">BUZ</div>
              <div className="nav-logo-text">
                <span className="nav-logo-name">BUZ CONSTRUCTION</span>
                <span className="nav-logo-sub">Build · Unite · Zeal</span>
              </div>
            </Link>

            {/* Desktop nav — centred */}
            <ul className="nav-links">
              {navLinks.map((link) =>
                link.children ? (
                  <li
                    key={link.name}
                    className="nav-dropdown-wrap"
                    onMouseEnter={handleMouseEnter}
                    onMouseLeave={handleMouseLeave}
                  >
                    <button className={`nav-link ${isActive(link.href) ? 'active' : ''}`}>
                      {link.name}
                      <ChevronDown
                        size={13}
                        style={{ transition: 'transform 0.2s', transform: servicesOpen ? 'rotate(180deg)' : 'none' }}
                      />
                    </button>

                    {servicesOpen && (
                      <div className="nav-dropdown-outer">
                        <div className="nav-dropdown">
                          {link.children.map(s => (
                            <Link
                              key={s.name}
                              href={s.href}
                              className="nav-dropdown-item"
                              onClick={() => setServicesOpen(false)}
                            >
                              {s.name}
                              <ChevronRight size={13} className="chevron-icon" />
                            </Link>
                          ))}
                        </div>
                      </div>
                    )}
                  </li>
                ) : (
                  <li key={link.name}>
                    <Link
                      href={link.href}
                      className={`nav-link ${isActive(link.href) ? 'active' : ''}`}
                    >
                      {link.name}
                    </Link>
                  </li>
                )
              )}
            </ul>

            {/* Right: CTA + hamburger */}
            <div className="nav-cta">
              <Link href="/estimate" className="nav-estimate-btn">
                Free Estimate <ArrowRight size={14} />
              </Link>
              <button
                className="hamburger"
                onClick={() => setOpen(!open)}
                aria-label="Toggle menu"
              >
                {open
                  ? <X size={20} color="white" />
                  : <>
                    <span className="ham-line" />
                    <span className="ham-line" />
                    <span className="ham-line" />
                  </>
                }
              </button>
            </div>

          </div>
        </div>
      </nav>

      {/* Mobile menu */}
      <div className={`mobile-menu ${open ? 'show' : ''}`}>
        {navLinks.map(link =>
          link.children ? (
            <div key={link.name}>
              <button
                className="mobile-nav-link"
                onClick={() => setMobileServices(!mobileServices)}
              >
                {link.name}
                <ChevronDown
                  size={16}
                  style={{
                    transform: mobileServices ? 'rotate(180deg)' : 'none',
                    transition: 'transform 0.25s ease',
                  }}
                />
              </button>
              {mobileServices && (
                <div className="mobile-sub-links">
                  {link.children.map(s => (
                    <Link
                      key={s.name}
                      href={s.href}
                      className="mobile-sub-link"
                      onClick={() => setOpen(false)}
                    >
                      <span className="mobile-sub-dot" /> {s.name}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          ) : (
            <Link
              key={link.name}
              href={link.href}
              className={`mobile-nav-link ${isActive(link.href) ? 'm-active' : ''}`}
              style={{ display: 'flex' }}
              onClick={() => setOpen(false)}
            >
              {link.name}
            </Link>
          )
        )}
        <div className="mobile-cta">
          <Link
            href="/contact"
            className="btn btn-primary"
            style={{ textAlign: 'center', justifyContent: 'center' }}
            onClick={() => setOpen(false)}
          >
            Get Free Quote <ArrowRight size={16} />
          </Link>
          <a
            href="tel:+14167108200"
            className="btn btn-outline"
            style={{ textAlign: 'center', justifyContent: 'center' }}
          >
            Call +1 (416) 710-8200
          </a>
        </div>
      </div>
    </>
  )
}
