'use client'
import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useRef, useState } from 'react'
import { ArrowRight, Building2, Home, Wrench, ClipboardList, Palette, ShieldCheck, Clock, Users, Award, Star, ChevronRight, Quote, Phone } from 'lucide-react'
import ConsultationForm from '@/components/ConsultationForm'
import BeforeAfterSlider from '@/components/BeforeAfterSlider'

const API = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000'

const stats = [
  { value: 15, suffix: '+', label: 'Years Experience' },
  { value: 500, suffix: '+', label: 'Projects Completed' },
  { value: 200, suffix: '+', label: 'Happy Clients' },
  { value: 98, suffix: '%', label: 'Client Satisfaction' },
]

const services = [
  { icon: Building2, title: 'Commercial Construction', desc: 'Office buildings, retail stores, warehouses, restaurants, and tenant improvements built to the highest standards.', href: '/services/commercial', img: '/images/buz_commercial_card.jpg' },
  { icon: Home, title: 'Residential Construction', desc: 'Custom luxury homes, additions, and basement finishing crafted with precision and care.', href: '/services/residential', img: '/images/buz_luxury_home.jpg' },
  { icon: Wrench, title: 'Renovations', desc: 'Kitchen, bathroom, whole-home, and commercial renovations that transform spaces.', href: '/services/renovations', img: '/images/buz_kitchen_reno.jpg' },
  { icon: ClipboardList, title: 'Project Management', desc: 'Full-service PM from planning through closeout — on time, on budget, every time.', href: '/services/project-management', img: '/images/buz_project_manager.jpg' },
  { icon: Palette, title: 'Design-Build', desc: 'Single-source delivery combining design and construction for faster, cost-efficient results.', href: '/services/design-build', img: '/images/buz_design_build.jpg' },
]

const whyBuz = [
  { icon: ShieldCheck, title: 'Fully Licensed & Insured', desc: 'Ontario licensed general contractor with comprehensive liability and WSIB coverage.' },
  { icon: Award, title: 'Award-Winning Quality', desc: 'Recognized for craftsmanship and design excellence across Ontario.' },
  { icon: Clock, title: 'On-Time Delivery', desc: '98% of our projects finish on schedule. We respect your time and investment.' },
  { icon: Users, title: 'Dedicated Teams', desc: 'Our crews are employed and trained directly — no quality compromises.' },
]

const portfolioItems = [
  { title: 'Oakville Corporate Centre', cat: 'Commercial', img: '/images/buz_oakville_office.jpg', year: 2023, location: 'Oakville, ON' },
  { title: 'The Meridian Luxury Estate', cat: 'Residential', img: '/images/portfolio_residential_1781694457475.jpg', year: 2023, location: 'Mississauga, ON' },
  { title: 'Ember & Oak Restaurant', cat: 'Renovation', img: '/images/portfolio_restaurant_1781694478723.jpg', year: 2024, location: 'Toronto, ON' },
]

const testimonials = [
  { name: 'Michael Chen', title: 'CEO, Nexus Properties Group', rating: 5, text: 'BUZ Construction delivered our office complex 2 weeks ahead of schedule and $300K under budget. Their professionalism and craftsmanship are unmatched in the GTA.', type: 'Commercial' },
  { name: 'Sarah & David Thompson', title: 'Homeowners', rating: 5, text: 'From the first design meeting to the final walkthrough, BUZ exceeded every expectation. Our dream home is everything we imagined and more.', type: 'Residential' },
  { name: 'Amanda Reyes', title: 'Owner, Ember & Oak', rating: 5, text: 'The BUZ team transformed our restaurant vision into reality. The craftsmanship is stunning — our guests compliment the space every single night.', type: 'Renovation' },
]

const googleReviews = [
  { name: 'Marcus D.', rating: 5, text: 'Used BUZ for a full kitchen and bathroom renovation. Incredibly professional, clean, and communicative. The result is absolutely stunning.', date: 'Nov 2024' },
  { name: 'Priya S.', rating: 5, text: 'BUZ built our custom home in Burlington. Guided us through every decision with patience and expertise. Finished on time, on budget. 10/10!', date: 'Oct 2024' },
  { name: 'Tom W.', rating: 5, text: 'We hired BUZ for a major commercial fit-out. Outstanding PM, superior quality. They will be our contractor for all future builds.', date: 'Sep 2024' },
  { name: 'Laura K.', rating: 5, text: 'Extremely happy with our basement renovation. The crew was respectful and the finished product looks incredible. Fair pricing, great communication.', date: 'Aug 2024' },
  { name: 'Brian O.', rating: 5, text: 'BUZ managed our Vaughan warehouse project from start to finish. Delivered on every promise. Trustworthy, skilled, and professional.', date: 'Jul 2024' },
]

const blogPosts = [
  { title: 'Top 5 Construction Trends in Ontario for 2024', cat: 'Industry News', img: '/images/buz_aerial_site.jpg', slug: 'construction-trends-ontario-2024', author: 'Bilal Khan' },
  { title: 'How Design-Build Saves Time and Money', cat: 'Services', img: '/images/design_build_1781694386091.jpg', slug: 'design-build-saves-time-money', author: 'Ubaid Khan' },
  { title: 'Kitchen Renovation Guide: Budget & Planning', cat: 'Renovations', img: '/images/kitchen_renovation_1781694354275.jpg', slug: 'kitchen-renovation-guide-budget', author: 'Zaidan Anees' },
]

function AnimatedCounter({ end, suffix }: { end: number; suffix: string }) {
  const [count, setCount] = useState(0)
  const ref = useRef<HTMLSpanElement>(null)
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) {
        let start = 0
        const step = Math.ceil(end / 50)
        const timer = setInterval(() => {
          start += step
          if (start >= end) { setCount(end); clearInterval(timer) }
          else setCount(start)
        }, 30)
      }
    }, { threshold: 0.5 })
    if (ref.current) obs.observe(ref.current)
    return () => obs.disconnect()
  }, [end])
  return <span ref={ref}>{count}{suffix}</span>
}

function Stars({ rating }: { rating: number }) {
  return <div className="stars">{[...Array(5)].map((_, i) => <span key={i} className={i < rating ? 'star' : 'star-empty'}>★</span>)}</div>
}

export default function HomePage() {
  const [activeTestimonial, setActiveTestimonial] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => setActiveTestimonial(p => (p + 1) % testimonials.length), 5000)
    return () => clearInterval(timer)
  }, [])

  return (
    <>
      <style>{`
        /* Removed transparent navbar overrides */

        /* ── Outlined Pill Buttons for Editorial Style ── */
        .btn {
          border-radius: var(--radius-full) !important;
          border: 1px solid transparent;
        }
        .hero .btn-primary {
          background: var(--primary) !important;
          color: var(--accent-light) !important;
          border: 1.5px solid var(--primary) !important;
        }
        .hero .btn-primary:hover {
          background: transparent !important;
          color: var(--primary) !important;
        }
        .hero .btn-outline {
          border: 1.5px solid var(--primary) !important;
          color: var(--primary) !important;
          background: transparent !important;
        }
        .hero .btn-outline:hover {
          background: var(--primary) !important;
          color: var(--accent-light) !important;
        }

        /* ── Hero Redesign (Bespoke/Luxury Split-screen) ── */
        .hero {
          position: relative; min-height: 100vh;
          display: flex; align-items: center;
          overflow: hidden; background: var(--accent-light);
          padding-top: var(--nav-height);
        }
        .hero-grid {
          display: grid;
          grid-template-columns: 1.1fr 0.9fr;
          gap: 60px;
          align-items: center;
          width: 100%;
          position: relative;
          z-index: 10;
        }
        .hero-right {
          position: relative;
          height: 520px;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .hero-tag {
          display: inline-flex; align-items: center; gap: 8px;
          background: rgba(var(--primary-rgb), 0.05); border: 1px solid rgba(var(--primary-rgb), 0.15);
          border-radius: 50px; padding: 6px 16px; margin-bottom: 24px;
          font-size: 0.78rem; font-weight: 700; letter-spacing: 0.15em; text-transform: uppercase; color: var(--primary);
          animation: fadeInUp 0.7s ease both;
        }
        .hero-tag-dot { width: 6px; height: 6px; border-radius: 50%; background: var(--accent); animation: pulse-accent 2s infinite; }
        .hero-title {
          font-family: var(--font-heading); font-size: clamp(2.8rem, 5vw, 4.8rem);
          font-weight: 800; line-height: 1.05; margin-bottom: 24px;
          animation: fadeInUp 0.7s ease 0.1s both;
          color: var(--primary);
          text-transform: none;
        }
        .hero-title .accent { color: var(--accent-dark); }
        .hero-subtitle {
          font-size: 1.05rem; color: rgba(var(--primary-rgb), 0.75); max-width: 580px;
          line-height: 1.7; margin-bottom: 40px;
          animation: fadeInUp 0.7s ease 0.2s both;
        }
        .hero-btns {
          display: flex; gap: 16px; flex-wrap: wrap;
          animation: fadeInUp 0.7s ease 0.3s both;
        }
        .hero-trust {
          display: flex; align-items: center; gap: 20px; margin-top: 48px;
          animation: fadeInUp 0.7s ease 0.4s both; flex-wrap: wrap;
        }
        .hero-trust-item { display: flex; align-items: center; gap: 8px; }
        .hero-trust-icon { color: var(--accent); }
        .hero-trust-text { font-size: 0.85rem; color: var(--gray-mid); font-weight: 500; }

        /* Floating Layers for Hero Gallery */
        .hero-gallery {
          position: relative;
          width: 100%;
          height: 100%;
        }
        .gallery-frame {
          position: absolute;
          border-radius: var(--radius-lg);
          overflow: hidden;
          box-shadow: var(--shadow-lg);
          border: 2px solid var(--primary);
          transition: transform 0.5s cubic-bezier(0.4, 0, 0.2, 1);
        }
        .frame-1 {
          width: 320px;
          height: 380px;
          top: 20px;
          left: 20px;
          z-index: 3;
          animation: float 6s ease-in-out infinite;
        }
        .frame-2 {
          width: 260px;
          height: 300px;
          bottom: 20px;
          right: 10px;
          z-index: 2;
          animation: float 6s ease-in-out infinite 2s;
          border-color: var(--primary-light);
        }
        .frame-3 {
          width: 180px;
          height: 180px;
          top: 60px;
          right: 30px;
          z-index: 1;
          opacity: 0.85;
          animation: float 6s ease-in-out infinite 4s;
          border-color: rgba(var(--primary-rgb), 0.4);
        }
        .gallery-frame img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.5s ease;
        }
        .gallery-frame:hover img {
          transform: scale(1.06);
        }

        /* ── Stats Bar ── */
        .stats-bar {
          background: var(--primary-light); padding: 50px 0;
          border-top: 1px solid rgba(255,255,255,0.06);
          border-bottom: 1px solid rgba(255,255,255,0.06);
        }
        .stats-grid {
          display: grid; grid-template-columns: repeat(4,1fr); gap: 0;
        }
        .stat-item {
          text-align: center; padding: 0 24px;
          border-right: 1px solid rgba(255,255,255,0.12);
        }
        .stat-item:last-child { border-right: none; }
        .stat-num {
          font-family: var(--font-heading); font-size: 3.5rem; font-weight: 800;
          color: var(--accent); line-height: 1;
        }
        .stat-label { font-size: 0.88rem; font-weight: 700; color: var(--accent-light); margin-top: 4px; text-transform: uppercase; letter-spacing: 0.06em; }

        /* ── Services Bento Grid Redesign ── */
        .services-grid {
          display: grid; grid-template-columns: repeat(3,1fr); gap: 28px;
        }
        .service-card {
          position: relative; border-radius: var(--radius-lg); overflow: hidden;
          cursor: pointer; min-height: 340px; border: 1px solid rgba(var(--accent-rgb), 0.12);
          transition: var(--transition); display: flex; flex-direction: column; justify-content: flex-end;
          background: var(--primary-light);
        }
        .service-card.bento-large {
          grid-column: span 2;
        }
        .service-card img { width: 100%; height: 100%; object-fit: cover; transition: transform 0.6s cubic-bezier(0.4, 0, 0.2, 1); opacity: 0.65; }
        .service-card:hover img { transform: scale(1.04); opacity: 0.85; }
        .service-card-overlay {
          position: absolute; inset: 0;
          background: linear-gradient(to top, rgba(var(--primary-rgb), 0.95) 0%, rgba(var(--primary-rgb), 0.5) 50%, rgba(var(--primary-rgb), 0.2) 100%);
          transition: var(--transition);
        }
        .service-card:hover .service-card-overlay { background: linear-gradient(to top, rgba(var(--primary-rgb), 0.98) 0%, rgba(var(--primary-rgb), 0.65) 60%, rgba(var(--primary-rgb), 0.3) 100%); }
        .service-card:hover { border-color: var(--accent); box-shadow: var(--shadow-glow); transform: translateY(-4px); }
        .service-card-content {
          position: absolute; bottom: 0; left: 0; right: 0; padding: 32px; z-index: 2;
          display: flex; flex-direction: column; align-items: flex-start;
        }
        .service-card-icon {
          width: 48px; height: 48px; border-radius: 12px; background: rgba(var(--accent-rgb), 0.15);
          border: 1px solid rgba(var(--accent-rgb), 0.4); display: flex; align-items: center; justify-content: center; color: var(--accent);
          margin-bottom: 16px; transition: var(--transition);
        }
        .service-card:hover .service-card-icon { background: var(--accent); color: var(--primary); transform: scale(1.1); }
        .service-card-title { font-family: var(--font-heading); font-size: 1.6rem; font-weight: 800; margin-bottom: 8px; color: var(--white); letter-spacing: 0.02em; text-transform: uppercase; }
        .service-card-desc { font-size: 0.88rem; color: var(--gray-light); line-height: 1.6; opacity: 0.8; margin-bottom: 16px; }
        .service-card-link { display: flex; align-items: center; gap: 6px; color: var(--accent); font-size: 0.88rem; font-weight: 700; text-decoration: none; transition: var(--transition); }
        .service-card:hover .service-card-link { color: var(--white); }

        /* Scope title override strictly to homepage sections */
        .section:not(.bg-dark):not([style*="background: var(--secondary)"]) .section-title {
          color: var(--primary);
        }

        /* ── Why BUZ ── */
        .why-grid { display: grid; grid-template-columns: repeat(4,1fr); gap: 24px; }
        .why-card {
          background: var(--white); border: 1px solid rgba(var(--primary-rgb), 0.08);
          border-radius: var(--radius-lg); padding: 32px; text-align: center;
          transition: var(--transition);
          color: var(--primary);
        }
        .why-card:hover { border-color: rgba(var(--accent-rgb),0.3); transform: translateY(-4px); box-shadow: var(--shadow-md); }
        .why-icon {
          width: 64px; height: 64px; border-radius: 16px;
          background: rgba(var(--primary-rgb), 0.04); border: 1px solid rgba(var(--primary-rgb), 0.1);
          display: flex; align-items: center; justify-content: center;
          margin: 0 auto 20px; color: var(--accent);
        }
        .why-title { font-family: var(--font-heading); font-size: 1.2rem; margin-bottom: 12px; color: var(--primary); }
        .why-card p { color: var(--gray-dark) !important; }

        /* ── Portfolio ── */
        .portfolio-grid { display: grid; grid-template-columns: repeat(3,1fr); gap: 24px; }
        .project-card {
          border-radius: var(--radius-lg); overflow: hidden;
          position: relative; transition: var(--transition); cursor: pointer;
        }
        .project-card:hover { transform: translateY(-6px); box-shadow: var(--shadow-lg); }
        .project-img { position: relative; aspect-ratio: 4/3; }
        .project-img img { width: 100%; height: 100%; object-fit: cover; transition: transform 0.5s ease; }
        .project-card:hover .project-img img { transform: scale(1.05); }
        .project-img::after { content: ''; position: absolute; inset: 0; background: linear-gradient(to top, rgba(var(--primary-rgb),0.9) 0%, transparent 60%); }
        .project-badge {
          position: absolute; top: 16px; left: 16px; z-index: 1;
          background: rgba(var(--primary-rgb), 0.9);
          color: var(--white) !important;
          font-weight: 800 !important;
          padding: 6px 14px;
          border-radius: 50px;
          font-size: 0.75rem;
          text-transform: uppercase;
          letter-spacing: 0.12em;
          border: 1px solid rgba(255,255,255,0.15);
          backdrop-filter: blur(4px);
        }
        .project-info { position: absolute; bottom: 0; left: 0; right: 0; padding: 20px; z-index: 1; }
        .project-title { font-family: var(--font-heading); font-size: 1.2rem; font-weight: 700; color: var(--white); }
        .project-meta { font-size: 0.8rem; color: var(--gray-light); margin-top: 4px; }

        /* ── Testimonials ── */
        .testimonial-carousel { position: relative; }
        .testimonial-card {
          background: var(--white); border: 1px solid rgba(var(--primary-rgb), 0.08);
          border-radius: var(--radius-xl); padding: 48px;
          color: var(--primary);
        }
        .testimonial-quote { color: var(--accent); margin-bottom: 20px; opacity: 0.5; }
        .testimonial-text { font-size: 1.1rem; line-height: 1.7; color: var(--primary); margin-bottom: 28px; font-style: italic; }
        .testimonial-author { display: flex; align-items: center; gap: 16px; }
        .testimonial-avatar {
          width: 52px; height: 52px; border-radius: 50%;
          background: var(--accent); display: flex; align-items: center; justify-content: center;
          font-family: var(--font-heading); font-size: 1.3rem; font-weight: 800; color: var(--primary);
          flex-shrink: 0;
        }
        .testimonial-name { font-weight: 700; color: var(--primary); }
        .testimonial-title { font-size: 0.85rem; color: var(--gray-mid); margin-top: 2px; }
        .testimonial-type { font-size: 0.75rem; color: var(--accent); font-weight: 700; text-transform: uppercase; letter-spacing: 0.1em; margin-top: 4px; }
        .testimonial-dots { display: flex; justify-content: center; gap: 8px; margin-top: 28px; }
        .testimonial-dot { width: 8px; height: 8px; border-radius: 50%; background: rgba(var(--primary-rgb), 0.2); transition: var(--transition); border: none; cursor: pointer; }
        .testimonial-dot.active { background: var(--accent); width: 24px; border-radius: 4px; }

        /* ── Google Reviews ── */
        .gr-header { display: flex; align-items: center; gap: 16px; margin-bottom: 32px; flex-wrap: wrap; }
        .gr-logo { background: white; border-radius: 10px; padding: 8px 12px; display: flex; align-items: center; gap: 8px; }
        .gr-logo-text { font-weight: 800; font-size: 1rem; }
        .gr-logo-text .g-blue { color: #4285F4; } .g-red { color: #EA4335; } .g-yellow { color: #FBBC04; } .g-green { color: #34A853; }
        .gr-score { font-family: var(--font-heading); font-size: 3rem; font-weight: 900; color: var(--accent); }
        .gr-score-sub { color: var(--gray-mid); font-size: 0.85rem; }
        .gr-grid { display: grid; grid-template-columns: repeat(5,1fr); gap: 16px; }
        .gr-card {
          background: var(--white); border: 1px solid rgba(var(--primary-rgb), 0.08);
          border-radius: var(--radius-lg); padding: 20px; transition: var(--transition);
          color: var(--primary);
        }
        .gr-card:hover { border-color: rgba(var(--accent-rgb),0.3); transform: translateY(-3px); }
        .gr-reviewer { display: flex; align-items: center; gap: 10px; margin-bottom: 12px; }
        .gr-avatar {
          width: 36px; height: 36px; border-radius: 50%;
          background: var(--accent); display: flex; align-items: center; justify-content: center;
          font-weight: 800; font-size: 0.9rem; color: var(--primary); flex-shrink: 0;
        }
        .gr-name { font-weight: 700; font-size: 0.9rem; color: var(--primary); }
        .gr-date { font-size: 0.75rem; color: var(--gray-dark); }
        .gr-text { font-size: 0.82rem; color: var(--gray-dark); line-height: 1.5; }

        /* ── Blog ── */
        .blog-grid { display: grid; grid-template-columns: repeat(3,1fr); gap: 24px; }
        .blog-card { border-radius: var(--radius-lg); overflow: hidden; background: var(--white); border: 1px solid rgba(var(--primary-rgb), 0.08); transition: border-color 0.3s ease, box-shadow 0.3s ease, transform 0.3s ease; }
        .blog-card:hover { border-color: rgba(var(--accent-rgb),0.3); box-shadow: 0 0 0 1px rgba(var(--accent-rgb),0.12), 0 8px 32px rgba(0,0,0,0.3); transform: translateY(-3px); }
        .blog-img { aspect-ratio: 16/9; overflow: hidden; position: relative; }
        .blog-img img { width: 100%; height: 100%; object-fit: cover; }
        .blog-body { padding: 24px; }
        .blog-cat { font-size: 0.72rem; font-weight: 700; text-transform: uppercase; letter-spacing: 0.1em; color: var(--accent); margin-bottom: 8px; }
        .blog-title { font-family: var(--font-heading); font-size: 1.15rem; font-weight: 700; margin-bottom: 12px; line-height: 1.3; color: var(--primary); }
        .blog-author { font-size: 0.8rem; color: var(--gray-dark); }
        .blog-author { font-size: 0.8rem; color: var(--gray-dark); }
        .blog-link { display: flex; align-items: center; gap: 6px; color: var(--accent); font-size: 0.85rem; font-weight: 700; margin-top: 16px; text-decoration: none; }

        /* ── CTA Banner ── */
        .cta-banner {
          background: linear-gradient(135deg, var(--primary) 0%, var(--primary-light) 100%);
          padding: 160px 0; text-align: center; position: relative; overflow: hidden;
          border-top: 1px solid rgba(255,255,255,0.06);
        }
        .cta-banner::before {
          content: ''; position: absolute; inset: 0;
          background: url('/images/buz_cta_banner.jpg') center / cover no-repeat;
          opacity: 0.15;
        }
        .cta-banner-content { position: relative; z-index: 1; }
        .cta-banner-title { font-family: var(--font-heading); font-size: clamp(2rem,5vw,3.5rem); font-weight: 800; color: var(--white); margin-bottom: 16px; }
        .cta-banner-sub { color: var(--gray-light); font-size: 1.1rem; margin-bottom: 36px; }

        /* ── Process Section ── */
        .process-section {
          position: relative;
          background: transparent;
          padding: 100px 0;
        }
        .process-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 30px;
          margin-bottom: 60px;
        }
        .process-card {
          display: flex;
          flex-direction: column;
          background: var(--white);
          border: 1px solid rgba(var(--primary-rgb), 0.08);
          border-radius: var(--radius-lg);
          overflow: hidden;
          transition: transform 0.3s ease, border-color 0.3s ease;
          color: var(--primary);
        }
        .process-card:hover {
          transform: translateY(-5px);
          border-color: rgba(var(--accent-rgb), 0.2);
        }
        .process-card-image-wrapper {
          position: relative;
          width: 100%;
          aspect-ratio: 16 / 9;
          overflow: hidden;
        }
        .process-card-image {
          object-fit: cover;
          transition: transform 0.5s ease;
        }
        .process-card:hover .process-card-image {
          transform: scale(1.05);
        }
        .process-card-content {
          padding: 24px;
          display: flex;
          flex-direction: column;
          flex-grow: 1;
        }
        .process-card-badge {
          display: inline-block;
          font-size: 0.7rem;
          font-weight: 800;
          text-transform: uppercase;
          letter-spacing: 0.15em;
          color: var(--accent);
          margin-bottom: 10px;
        }
        .process-card-title {
          font-family: var(--font-heading);
          font-size: 1.25rem;
          font-weight: 800;
          color: var(--primary);
          margin-bottom: 10px;
        }
        .process-card-desc {
          font-size: 0.88rem;
          color: var(--gray-dark);
          line-height: 1.6;
        }
        
        /* ── Process Showcase ── */
        .process-showcase {
          background: var(--white);
          border: 1px solid rgba(var(--primary-rgb), 0.08);
          border-radius: var(--radius-xl);
          padding: 40px;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 30px;
          margin-top: 50px;
          color: var(--primary);
        }
        .process-showcase-slider-wrapper {
          width: 100%;
          max-width: 900px;
        }
        .process-showcase-content {
          text-align: center;
          display: flex;
          flex-direction: column;
          align-items: center;
          max-width: 600px;
        }
        .process-showcase-badge {
          font-size: 0.75rem;
          font-weight: 800;
          text-transform: uppercase;
          letter-spacing: 0.2em;
          color: var(--accent);
          margin-bottom: 10px;
        }
        .process-showcase-title {
          font-family: var(--font-heading);
          font-size: 2rem;
          font-weight: 800;
          color: var(--primary);
          margin-bottom: 10px;
        }
        .process-showcase-desc {
          font-size: 0.95rem;
          color: var(--gray-dark);
          line-height: 1.6;
          margin-bottom: 20px;
        }
        .process-showcase-ctas {
          display: flex;
          gap: 16px;
        }

        /* ── Responsive media overrides ── */
        @media (max-width: 1024px) {
          .services-grid { grid-template-columns: repeat(2, 1fr); }
          .why-grid { grid-template-columns: repeat(2, 1fr); }
          .gr-grid { grid-template-columns: repeat(3, 1fr); }
          .process-grid { grid-template-columns: repeat(2, 1fr); gap: 24px; }
        }
        @media (max-width: 991px) {
          .hero-grid { grid-template-columns: 1fr; gap: 40px; text-align: center; }
          .hero-left { align-items: center; }
          .hero-right { height: 400px; margin-top: 20px; }
          .hero-trust { justify-content: center; }
          .frame-1 { width: 240px; height: 290px; top: 10px; left: 30px; }
          .frame-2 { width: 200px; height: 240px; bottom: 10px; right: 30px; }
          .frame-3 { width: 130px; height: 130px; top: 20px; right: 20px; }
          /* Consultation section collapses to single column on tablet */
          .consultation-grid { grid-template-columns: 1fr !important; }
        }
        @media (max-width: 768px) {
          .stats-grid { grid-template-columns: repeat(2, 1fr); gap: 0; }
          .stat-item {
            border-right: none;
            border-bottom: 1px solid rgba(255,255,255,0.12);
            padding: 20px 12px;
          }
          .stat-item:nth-child(odd) { border-right: 1px solid rgba(255,255,255,0.12); }
          .stat-item:nth-last-child(-n+2) { border-bottom: none; }
          .stat-num { font-size: 2.6rem; }
          .services-grid { grid-template-columns: 1fr; }
          .portfolio-grid { grid-template-columns: 1fr; }
          .blog-grid { grid-template-columns: 1fr; }
          .service-card.bento-large { grid-column: span 1; }
          .service-card { min-height: 280px; }
          .why-grid { grid-template-columns: 1fr 1fr; }
          .gr-grid { grid-template-columns: repeat(2, 1fr); }
          .testimonial-card { padding: 24px 20px; }
          .testimonial-text { font-size: 0.95rem; }
          .testimonial-author { flex-direction: column; align-items: flex-start; gap: 10px; }
          .hero-btns { flex-direction: column; width: 100%; align-items: stretch; }
          .process-grid { grid-template-columns: 1fr; gap: 20px; }
          .process-showcase { padding: 20px; gap: 20px; }
          .process-showcase-title { font-size: 1.4rem; }
          .process-showcase-ctas { flex-direction: column; align-items: stretch; }
          .process-showcase-ctas .btn { justify-content: center; }
          /* Consultation grid: 1 column on mobile */
          .consultation-grid { grid-template-columns: 1fr !important; }
          .cta-banner { padding: 80px 0; }
          .cta-banner-title { font-size: clamp(1.6rem, 6vw, 2.4rem); }
          .cta-banner-sub { font-size: 0.95rem; }
        }
        @media (max-width: 480px) {
          .why-grid { grid-template-columns: 1fr; }
          .gr-grid { grid-template-columns: 1fr; }
          .hero-right { height: 280px; }
          .frame-1 { width: 165px; height: 200px; top: 5px; left: 10px; }
          .frame-2 { width: 140px; height: 168px; bottom: 5px; right: 10px; }
          .frame-3 { display: none; }
          .hero-title { font-size: clamp(2.2rem, 9vw, 3.2rem); }
          .hero-subtitle { font-size: 0.95rem; }
          .hero-tag { font-size: 0.7rem; }
          .stat-num { font-size: 2.2rem; }
          .stat-label { font-size: 0.75rem; }
          .section-header { margin-bottom: 32px; }
          .section { padding: 64px 0; }
          .gr-grid { grid-template-columns: 1fr; }
          .cta-banner { padding: 60px 0; }
        }
      `}</style>

      {/* ── HERO ─────────────────────────────────────────────────────────── */}
      <section className="hero">
        <div className="container" style={{ position: 'relative', zIndex: 5 }}>
          <div className="hero-grid">
            <div className="hero-left">
              <div className="hero-tag">
                <span className="hero-tag-dot" />
                Ontario's Premier General Contractor
              </div>
              <h1 className="hero-title">
                Build. Unite.<br /><span className="accent">Zeal.</span>
              </h1>
              <p className="hero-subtitle">
                BUZ Construction Group Inc. delivers world-class commercial, residential, and renovation projects across Ontario. Quality craftsmanship. Zero compromise.
              </p>
              <div className="hero-btns">
                <Link href="/contact" className="btn btn-primary btn-lg"
                  onClick={() => (window as any).gtag?.('event','cta_click',{event_category:'lead',cta_text:'Get Free Quote'})}>
                  Get Free Quote <ArrowRight size={18} />
                </Link>
                <Link href="/portfolio" className="btn btn-outline btn-lg">
                  View Our Work <ArrowRight size={18} />
                </Link>
              </div>
              <div className="hero-trust">
                <div className="hero-trust-item"><ShieldCheck size={18} className="hero-trust-icon" /><span className="hero-trust-text">Licensed & Insured</span></div>
                <div className="hero-trust-item"><Award size={18} className="hero-trust-icon" /><span className="hero-trust-text">Award-Winning Quality</span></div>
                <div className="hero-trust-item"><Star size={18} className="hero-trust-icon" /><span className="hero-trust-text">4.9★ Google Rating</span></div>
              </div>
            </div>
            <div className="hero-right">
              <div className="hero-gallery">
                <div className="gallery-frame frame-1" style={{ position: 'absolute' }}>
                  <Image src="/images/buz_hero_site_banner.jpg" alt="Commercial Build" fill sizes="400px" priority />
                </div>
                <div className="gallery-frame frame-2" style={{ position: 'absolute' }}>
                  <Image src="/images/buz_luxury_home.jpg" alt="Luxury Residential" fill sizes="300px" />
                </div>
                <div className="gallery-frame frame-3" style={{ position: 'absolute' }}>
                  <Image src="/images/buz_kitchen_after.jpg" alt="Premium Kitchen Remodeling" fill sizes="200px" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── STATS BAR ─────────────────────────────────────────────────────── */}
      <div className="stats-bar">
        <div className="container">
          <div className="stats-grid">
            {stats.map(s => (
              <div key={s.label} className="stat-item">
                <div className="stat-num"><AnimatedCounter end={s.value} suffix={s.suffix} /></div>
                <div className="stat-label">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── SERVICES ──────────────────────────────────────────────────────── */}
      <section className="section">
        <div className="container">
          <div className="section-header">
            <span className="section-tag">What We Build</span>
            <h2 className="section-title">Our <span>Services</span></h2>
            <p className="section-subtitle">From concept to completion — we deliver excellence across every construction discipline.</p>
            <div className="accent-line" />
          </div>
          <div className="services-grid">
            {services.map((s, idx) => (
              <Link 
                key={s.title} 
                href={s.href} 
                className={`service-card ${idx === 0 ? 'bento-large' : ''}`}
                style={{ textDecoration: 'none', color: 'inherit' }}
              >
                <Image src={s.img} alt={s.title} fill style={{ objectFit: 'cover' }} />
                <div className="service-card-overlay" />
                <div className="service-card-content">
                  <div className="service-card-icon"><s.icon size={22} /></div>
                  <h3 className="service-card-title">{s.title}</h3>
                  <p className="service-card-desc">{s.desc}</p>
                  <div className="service-card-link">Learn More <ChevronRight size={14} /></div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── WHY BUZ ───────────────────────────────────────────────────────── */}
      <section className="section">
        <div className="container">
          <div className="section-header">
            <span className="section-tag">Why Choose Us</span>
            <h2 className="section-title">The <span>BUZ Difference</span></h2>
            <div className="accent-line" />
          </div>
          <div className="why-grid">
            {whyBuz.map(w => (
              <div key={w.title} className="why-card">
                <div className="why-icon"><w.icon size={28} /></div>
                <h4 className="why-title">{w.title}</h4>
                <p style={{ fontSize: '0.88rem', color: 'var(--gray-mid)' }}>{w.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── PROCESS SECTION ────────────────────────────────────────────────── */}
      <ProcessSection />

      {/* ── FEATURED PROJECTS ─────────────────────────────────────────────── */}
      <section className="section">
        <div className="container">
          <div className="section-header">
            <span className="section-tag">Our Work</span>
            <h2 className="section-title">Featured <span>Projects</span></h2>
            <p className="section-subtitle">A glimpse of the craftsmanship we bring to every project.</p>
            <div className="accent-line" />
          </div>
          <div className="portfolio-grid">
            {portfolioItems.map(p => (
              <Link key={p.title} href="/portfolio" className="project-card" style={{ textDecoration: 'none', display: 'block' }}>
                <div className="project-img">
                  <Image src={p.img} alt={p.title} fill style={{ objectFit: 'cover' }} />
                  <span className="project-badge badge badge-accent">{p.cat}</span>
                </div>
                <div className="project-info">
                  <h3 className="project-title">{p.title}</h3>
                  <p className="project-meta">{p.location} · {p.year}</p>
                </div>
              </Link>
            ))}
          </div>
          <div style={{ textAlign: 'center', marginTop: '40px' }}>
            <Link href="/portfolio" className="btn btn-outline btn-lg">View All Projects <ArrowRight size={18} /></Link>
          </div>
        </div>
      </section>

      {/* ── TESTIMONIALS ──────────────────────────────────────────────────── */}
      <section className="section">
        <div className="container">
          <div className="section-header">
            <span className="section-tag">Client Stories</span>
            <h2 className="section-title">What Our <span>Clients Say</span></h2>
            <div className="accent-line" />
          </div>
          <div className="testimonial-carousel">
            <div className="testimonial-card">
              <Quote size={36} className="testimonial-quote" />
              <p className="testimonial-text">"{testimonials[activeTestimonial].text}"</p>
              <div className="testimonial-author">
                <div className="testimonial-avatar">{testimonials[activeTestimonial].name[0]}</div>
                <div>
                  <Stars rating={testimonials[activeTestimonial].rating} />
                  <div className="testimonial-name">{testimonials[activeTestimonial].name}</div>
                  <div className="testimonial-title">{testimonials[activeTestimonial].title}</div>
                  <div className="testimonial-type">{testimonials[activeTestimonial].type}</div>
                </div>
              </div>
            </div>
            <div className="testimonial-dots">
              {testimonials.map((_, i) => (
                <button key={i} className={`testimonial-dot ${i === activeTestimonial ? 'active' : ''}`} onClick={() => setActiveTestimonial(i)} aria-label={`Testimonial ${i + 1}`} />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── GOOGLE REVIEWS ────────────────────────────────────────────────── */}
      <section className="section">
        <div className="container">
          <div className="gr-header">
            <div className="gr-logo">
              <span className="gr-logo-text">
                <span className="g-blue">G</span><span className="g-red">o</span><span className="g-yellow">o</span><span className="g-blue">g</span><span className="g-green">l</span><span className="g-red">e</span>
              </span>
              <span style={{ color: '#888', fontSize: '0.85rem' }}>Reviews</span>
            </div>
            <div>
              <div className="gr-score">4.9 <span style={{ fontSize: '1rem', color: 'var(--gray-mid)' }}>/ 5</span></div>
              <Stars rating={5} />
              <div className="gr-score-sub">Based on 120+ Google Reviews</div>
            </div>
            <div style={{ marginLeft: 'auto' }}>
              <a href="https://g.page/buzconstruction/review" target="_blank" rel="noopener noreferrer" className="btn btn-outline btn-sm">Leave a Review</a>
            </div>
          </div>
          <div className="gr-grid">
            {googleReviews.map(r => (
              <div key={r.name} className="gr-card">
                <div className="gr-reviewer">
                  <div className="gr-avatar">{r.name[0]}</div>
                  <div>
                    <div className="gr-name">{r.name}</div>
                    <div className="gr-date">{r.date}</div>
                  </div>
                </div>
                <Stars rating={r.rating} />
                <p className="gr-text" style={{ marginTop: '10px' }}>"{r.text}"</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CONSULTATION FORM ─────────────────────────────────────────────── */}
      <section className="section" style={{ padding: '60px 0' }}>
        <div className="container">
          <div className="consultation-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '32px', alignItems: 'stretch' }}>
            <div style={{ background: 'var(--secondary)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 'var(--radius-xl)', padding: '24px', color: 'var(--white)', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
              <span className="section-tag" style={{ background: 'rgba(255,255,255,0.1)', borderColor: 'rgba(255,255,255,0.2)', color: 'var(--white)', padding: '4px 12px', fontSize: '0.75rem', alignSelf: 'flex-start' }}>Get Started</span>
              <h2 style={{ textAlign: 'left', marginTop: '12px', color: '#FCFAF7', fontFamily: 'var(--font-heading)', fontSize: '2rem', fontWeight: 800, lineHeight: 1.2 }}>
                Start Your<br /><span style={{ color: 'var(--accent)' }}>Project Today</span>
              </h2>
              <div className="accent-line accent-line-left" style={{ margin: '12px 0' }} />
              <p style={{ color: 'var(--off-white)', margin: '12px 0 20px 0', lineHeight: '1.5', fontSize: '0.9rem' }}>
                Ready to bring your construction vision to life? Our experts are standing by to provide a free, no-obligation consultation and quote.
              </p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                {[['📞', 'Call Us', '+1 (416) 710-8200', 'tel:+14167108200'],
                  ['✉️', 'Email Us', 'info@buzconstruction.ca', 'mailto:info@buzconstruction.ca'],
                  ['📍', 'Visit Us', '15 Queen St. S, Mississauga ON', '/contact']].map(([icon, label, value, href]) => (
                  <a key={label} href={href} style={{ display: 'flex', alignItems: 'center', gap: '14px', padding: '12px 16px', background: 'rgba(255,255,255,0.04)', borderRadius: 'var(--radius-md)', border: '1px solid rgba(255,255,255,0.06)', textDecoration: 'none', color: 'inherit', transition: 'var(--transition)' }}
                    onMouseOver={e => (e.currentTarget.style.borderColor = 'rgba(var(--accent-rgb),0.3)')}
                    onMouseOut={e => (e.currentTarget.style.borderColor = 'rgba(255,255,255,0.06)')}>
                    <span style={{ fontSize: '1.2rem' }}>{icon}</span>
                    <div><div style={{ fontSize: '0.7rem', color: 'var(--gray-light)', textTransform: 'uppercase', letterSpacing: '0.08em', fontWeight: 700 }}>{label}</div><div style={{ fontWeight: 600, fontSize: '0.9rem' }}>{value}</div></div>
                  </a>
                ))}
              </div>
            </div>
            <ConsultationForm />
          </div>
        </div>
      </section>

      {/* ── BLOG PREVIEW ──────────────────────────────────────────────────── */}
      <section className="section">
        <div className="container">
          <div className="section-header">
            <span className="section-tag">Latest News</span>
            <h2 className="section-title">From Our <span>Blog</span></h2>
            <div className="accent-line" />
          </div>
          <div className="blog-grid">
            {blogPosts.map(b => (
              <article key={b.title} className="blog-card">
                <div className="blog-img">
                  <Image src={b.img} alt={b.title} fill style={{ objectFit: 'cover' }} />
                </div>
                <div className="blog-body">
                  <div className="blog-cat">{b.cat}</div>
                  <h3 className="blog-title">{b.title}</h3>
                  <div className="blog-author">By {b.author}</div>
                  <Link href={`/blog/${b.slug}`} className="blog-link">Read Article <ArrowRight size={14} /></Link>
                </div>
              </article>
            ))}
          </div>
          <div style={{ textAlign: 'center', marginTop: '40px' }}>
            <Link href="/blog" className="btn btn-outline btn-lg">View All Articles <ArrowRight size={18} /></Link>
          </div>
        </div>
      </section>

      {/* ── CTA BANNER ────────────────────────────────────────────────────── */}
      <section className="cta-banner">
        <div className="container cta-banner-content">
          <h2 className="cta-banner-title">Ready to Build Something Exceptional?</h2>
          <p className="cta-banner-sub">Join 200+ satisfied clients who trusted BUZ Construction with their most important projects.</p>
          <div style={{ display: 'flex', gap: '16px', justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link href="/contact" className="btn btn-lg" style={{ background: 'var(--accent)', color: 'var(--primary)' }}>
              Get Free Quote <ArrowRight size={18} />
            </Link>
            <a href="tel:+14167108200" className="btn btn-lg" style={{ background: 'transparent', border: '2px solid rgba(255,255,255,0.3)', color: 'var(--white)' }}>
              <Phone size={18} /> +1 (416) 710-8200
            </a>
          </div>
        </div>
      </section>
    </>
  )
}

const processSteps = [
  {
    number: '01',
    title: 'Your Vision',
    desc: 'We meet to discuss your goals, budget, and project roadmap.',
    img: '/images/buz_design_build.jpg',
    badge: '01 / Consultation',
    deliverables: []
  },
  {
    number: '02',
    title: 'Site Visit',
    desc: 'Our team maps the site details and plans the logistics.',
    img: '/images/buz_aerial_site.jpg',
    badge: '02 / Survey',
    deliverables: []
  },
  {
    number: '03',
    title: 'Design & Permits',
    desc: 'We finalize structural engineering and secure city approvals.',
    img: '/images/buz_project_manager.jpg',
    badge: '03 / Planning',
    deliverables: []
  },
  {
    number: '04',
    title: 'Active Construction',
    desc: 'Our expert crews break ground and assemble the core structure.',
    img: '/images/buz_safety_workers.jpg',
    badge: '04 / Structural',
    deliverables: []
  },
  {
    number: '05',
    title: 'Detail & Quality',
    desc: 'Our carpenters and trades verify every detail to ensure perfection.',
    img: '/images/buz_careers_carpenter.jpg',
    badge: '05 / Finishes',
    deliverables: []
  },
  {
    number: '06',
    title: 'Key Handover',
    desc: 'We complete the final walkthrough and deliver your keys.',
    img: '/images/buz_client_handshake.jpg',
    badge: '06 / Handover',
    deliverables: []
  },
  {
    number: '07',
    title: 'The Result',
    desc: 'A premium space, built around your vision.',
    beforeImg: '/images/buz_kitchen_before.jpg',
    afterImg: '/images/buz_kitchen_after.jpg',
    badge: '07 / Completed',
    deliverables: []
  }
]

function ProcessSection() {
  const stepsGrid = processSteps.slice(0, 6)
  const resultStep = processSteps[6]

  return (
    <section className="process-section" id="our-process">
      <div className="container">
        
        {/* Section Header */}
        <div className="section-header">
          <span className="section-tag">How We Build</span>
          <h2 className="section-title">Our <span>Process</span></h2>
          <div className="accent-line" />
        </div>

        {/* Steps 1-6 Grid */}
        <div className="process-grid">
          {stepsGrid.map((step) => (
            <div key={step.number} className="process-card">
              <div className="process-card-image-wrapper">
                <Image 
                  src={step.img || ''} 
                  alt={step.title} 
                  fill 
                  className="process-card-image"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
              </div>
              <div className="process-card-content">
                <span className="process-card-badge">{step.badge}</span>
                <h3 className="process-card-title">{step.title}</h3>
                <p className="process-card-desc">{step.desc}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Step 7 Full-Width Showcase (Before / After Interactive Slider) */}
        <div className="process-showcase">
          <div className="process-showcase-slider-wrapper" style={{ width: '100%' }}>
            <BeforeAfterSlider 
              beforeImage={resultStep.beforeImg || ''}
              afterImage={resultStep.afterImg || ''}
              beforeLabel="Before"
              afterLabel="After"
              height="clamp(260px, 50vw, 480px)"
            />
          </div>
          <div className="process-showcase-content">
            <span className="process-showcase-badge">{resultStep.badge}</span>
            <h2 className="process-showcase-title">{resultStep.title}</h2>
            <p className="process-showcase-desc">{resultStep.desc}</p>
            
            <div className="process-showcase-ctas">
              <Link href="/contact" className="btn btn-primary">
                Get Free Quote <ArrowRight size={18} />
              </Link>
              <Link href="/portfolio" className="btn btn-outline">
                View Our Projects <ArrowRight size={18} />
              </Link>
            </div>
          </div>
        </div>

      </div>
    </section>
  )
}
