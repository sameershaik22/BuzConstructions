'use client'
import { useState } from 'react'
import { X, Send, CheckCircle } from 'lucide-react'

const API = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000'

interface Props { onClose: () => void }

export default function QuoteModal({ onClose }: Props) {
  const [form, setForm] = useState({ name: '', email: '', phone: '', service_type: '', project_description: '', budget_range: '', form_type: 'quote' })
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState('')

  const handle = (e: React.ChangeEvent<HTMLInputElement|HTMLTextAreaElement|HTMLSelectElement>) =>
    setForm(f => ({ ...f, [e.target.name]: e.target.value }))

  const submit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true); setError('')
    try {
      const res = await fetch(`${API}/api/leads`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(form) })
      if (!res.ok) throw new Error('Failed')
      setSuccess(true)
      if (typeof window !== 'undefined' && (window as any).gtag) (window as any).gtag('event', 'quote_form_submit', { event_category: 'lead', service_type: form.service_type })
    } catch { setError('Something went wrong. Please call us directly.') }
    finally { setLoading(false) }
  }

  return (
    <div style={{ position: 'fixed', inset: 0, zIndex: 2000, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px' }}>
      <style>{`
        .modal-backdrop { position: fixed; inset: 0; background: rgba(0,0,0,0.75); backdrop-filter: blur(6px); }
        .modal-box {
          position: relative; z-index: 1;
          background: var(--secondary); border: 1px solid rgba(255,255,255,0.1);
          border-radius: var(--radius-xl); padding: 40px;
          width: 100%; max-width: 540px; max-height: 90vh; overflow-y: auto;
          animation: scaleIn 0.25s ease;
        }
        .modal-close {
          position: absolute; top: 16px; right: 16px;
          background: rgba(255,255,255,0.08); border: none; border-radius: 8px;
          width: 36px; height: 36px; display: flex; align-items: center; justify-content: center;
          cursor: pointer; color: var(--gray-mid); transition: var(--transition);
        }
        .modal-close:hover { background: rgba(255,255,255,0.15); color: var(--white); }
        .modal-tag { color: var(--accent); font-size: 0.75rem; font-weight: 700; letter-spacing: 0.15em; text-transform: uppercase; margin-bottom: 8px; }
        .modal-title { font-family: var(--font-heading); font-size: 2rem; font-weight: 800; margin-bottom: 6px; }
        .modal-sub { color: var(--gray-mid); font-size: 0.9rem; margin-bottom: 28px; }
        .modal-form { display: flex; flex-direction: column; gap: 14px; }
        .success-box {
          text-align: center; padding: 40px 20px;
          display: flex; flex-direction: column; align-items: center; gap: 16px;
        }
        .success-icon { color: var(--success); }
        .success-title { font-family: var(--font-heading); font-size: 1.8rem; }
        .success-text { color: var(--gray-mid); }
      `}</style>
      <div className="modal-backdrop" onClick={onClose} />
      <div className="modal-box">
        <button className="modal-close" onClick={onClose}><X size={16} /></button>
        {success ? (
          <div className="success-box">
            <CheckCircle size={56} className="success-icon" />
            <h3 className="success-title">Quote Request Sent!</h3>
            <p className="success-text">We'll contact you within 24 hours. Check your email for a confirmation.</p>
            <button className="btn btn-primary" onClick={onClose}>Close</button>
          </div>
        ) : (
          <>
            <div className="modal-tag">Free Quote</div>
            <h2 className="modal-title">Get Your <span className="gradient-text">Free Quote</span></h2>
            <p className="modal-sub">Tell us about your project and we'll get back to you within 24 hours.</p>
            <form className="modal-form" onSubmit={submit}>
              <div className="form-grid">
                <div className="form-group">
                  <label className="form-label">Full Name *</label>
                  <input name="name" className="form-input" placeholder="John Smith" required value={form.name} onChange={handle} />
                </div>
                <div className="form-group">
                  <label className="form-label">Phone</label>
                  <input name="phone" className="form-input" placeholder="+1 (905) 000-0000" value={form.phone} onChange={handle} />
                </div>
              </div>
              <div className="form-group">
                <label className="form-label">Email *</label>
                <input name="email" type="email" className="form-input" placeholder="john@example.com" required value={form.email} onChange={handle} />
              </div>
              <div className="form-group">
                <label className="form-label">Service Type</label>
                <select name="service_type" className="form-select" value={form.service_type} onChange={handle}>
                  <option value="">Select a service...</option>
                  <option>Commercial Construction</option>
                  <option>Residential Construction</option>
                  <option>Renovations</option>
                  <option>Project Management</option>
                  <option>Design-Build</option>
                </select>
              </div>
              <div className="form-group">
                <label className="form-label">Budget Range</label>
                <select name="budget_range" className="form-select" value={form.budget_range} onChange={handle}>
                  <option value="">Select budget...</option>
                  <option>Under $50,000</option>
                  <option>$50,000 – $100,000</option>
                  <option>$100,000 – $500,000</option>
                  <option>$500,000 – $2,000,000</option>
                  <option>$2,000,000+</option>
                </select>
              </div>
              <div className="form-group">
                <label className="form-label">Project Description</label>
                <textarea name="project_description" className="form-textarea" placeholder="Tell us about your project..." rows={3} value={form.project_description} onChange={handle} />
              </div>
              {error && <p style={{ color: 'var(--error)', fontSize: '0.85rem' }}>{error}</p>}
              <button type="submit" className="btn btn-primary btn-lg" disabled={loading} style={{ width: '100%', justifyContent: 'center' }}>
                {loading ? 'Sending...' : <><Send size={16} /> Submit Quote Request</>}
              </button>
            </form>
          </>
        )}
      </div>
    </div>
  )
}
