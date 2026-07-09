'use client'
import { useState } from 'react'
import { Phone, MessageSquare, X } from 'lucide-react'
import QuoteModal from './QuoteModal'

export default function FloatingCTA() {
  const [modalOpen, setModalOpen] = useState(false)

  return (
    <>
      <style>{`
        .floating-cta-wrap {
          position: fixed; bottom: 28px; right: 28px;
          z-index: 800; display: flex; flex-direction: column; gap: 10px; align-items: flex-end;
        }
        .fcta-btn {
          display: flex; align-items: center; gap: 10px;
          padding: 13px 20px; border-radius: 50px;
          font-weight: 700; font-size: 0.88rem;
          transition: var(--transition); cursor: pointer;
          border: none; box-shadow: var(--shadow-lg);
          text-decoration: none; white-space: nowrap;
          font-family: var(--font-body);
        }
        .fcta-quote {
          background: var(--accent); color: var(--primary);
          animation: pulse-accent 2.5s infinite;
        }
        .fcta-call { background: #16a34a; color: var(--white); }
        .fcta-btn:hover { transform: scale(1.05) translateY(-2px); }
        @media (max-width: 640px) {
          .floating-cta-wrap { bottom: 16px; right: 16px; }
          .fcta-btn span { display: none; }
          .fcta-btn { padding: 14px; width: 48px; height: 48px; justify-content: center; }
        }
      `}</style>

      <div className="floating-cta-wrap">
        <a href="tel:+14167108200" className="fcta-btn fcta-call"
          onClick={() => { if(typeof window !== 'undefined' && (window as any).gtag) (window as any).gtag('event', 'phone_click', { event_category: 'lead' }); }}>
          <Phone size={18} />
          <span>Call Now</span>
        </a>
        <button className="fcta-btn fcta-quote" onClick={() => setModalOpen(true)}>
          <MessageSquare size={18} />
          <span>Free Quote</span>
        </button>
      </div>

      {modalOpen && <QuoteModal onClose={() => setModalOpen(false)} />}
    </>
  )
}
