'use client'
import { useState } from 'react'
import { Send, CheckCircle } from 'lucide-react'

const API = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000'

interface Props {
  formType?: 'quote' | 'consultation'
  serviceType?: string
  title?: string
  subtitle?: string
}

export default function ConsultationForm({ formType = 'consultation', serviceType = '', title = 'Request a Project Consultation', subtitle = 'Tell us about your project and we\'ll schedule a free consultation.' }: Props) {
  const [form, setForm] = useState({
    form_type: formType, name: '', email: '', phone: '', service_type: serviceType,
    project_description: '', budget_range: '', timeline: '',
    preferred_contact_date: '', preferred_contact_method: 'email'
  })
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState('')

  const handle = (e: React.ChangeEvent<HTMLInputElement|HTMLTextAreaElement|HTMLSelectElement>) =>
    setForm(f => ({ ...f, [e.target.name]: e.target.value }))

  const submit = async (e: React.FormEvent) => {
    e.preventDefault(); setLoading(true); setError('')
    try {
      const res = await fetch(`${API}/api/leads`, {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form)
      })
      if (!res.ok) throw new Error('Failed')
      setSuccess(true)
      if (typeof window !== 'undefined' && (window as any).gtag)
        (window as any).gtag('event', 'consultation_form_submit', { event_category: 'lead', service_type: form.service_type })
    } catch { setError('Something went wrong. Please try again or call us directly.') }
    finally { setLoading(false) }
  }

  return (
    <div className="consultation-form-wrapper" style={{ background: 'var(--secondary)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 'var(--radius-xl)', padding: '24px', color: 'var(--white)' }}>
      <style>{`
        .consultation-success {
          text-align: center; padding: 32px 0;
          display: flex; flex-direction: column; align-items: center; gap: 12px;
        }
        .consultation-form-wrapper .form-label {
          color: var(--white);
          font-size: 0.75rem;
          margin-bottom: 2px;
        }
        .consultation-submit-btn {
          background: #C6A75E !important;
          color: #FCFAF7 !important;
          border: none !important;
          transition: all 0.3s ease;
        }
        .consultation-submit-btn:hover {
          background: #E8CA7D !important;
          transform: translateY(-2px);
          box-shadow: 0 0 25px rgba(198, 167, 94, 0.75) !important;
        }
        .consultation-form-wrapper .form-input,
        .consultation-form-wrapper .form-select,
        .consultation-form-wrapper .form-textarea {
          padding: 8px 12px;
          font-size: 0.85rem;
        }
        @media (max-width: 768px) {
          .consultation-form-wrapper .form-input,
          .consultation-form-wrapper .form-select,
          .consultation-form-wrapper .form-textarea,
          .consultation-form-wrapper button {
            min-height: 44px;
            font-size: 16px;
            width: 100%;
          }
          .consultation-form-wrapper {
            padding: 16px !important;
          }
        }
        .consultation-form-wrapper .section-tag {
          background: rgba(255,255,255,0.1);
          border-color: rgba(255,255,255,0.2);
          color: var(--white);
        }
        .consultation-form-wrapper .btn-primary {
          background: var(--white) !important;
          color: var(--primary) !important;
          border-color: var(--white) !important;
          padding: 10px 20px !important;
        }
        .consultation-form-wrapper .btn-primary:hover {
          background: transparent !important;
          color: var(--white) !important;
        }
      `}</style>
      {success ? (
        <div className="consultation-success">
          <CheckCircle size={52} style={{ color: 'var(--success)' }} />
          <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.8rem' }}>Consultation Requested!</h3>
          <p style={{ color: 'var(--gray-mid)' }}>We'll reach out within 24 hours to schedule your free consultation.</p>
        </div>
      ) : (
        <>
          <div style={{ marginBottom: '20px' }}>
            <span className="section-tag" style={{ padding: '4px 10px', fontSize: '0.75rem' }}>Free Consultation</span>
            <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.6rem', marginTop: '6px', marginBottom: '4px', color: 'var(--white)' }}>{title}</h3>
            <p style={{ color: 'var(--off-white)', fontSize: '0.85rem' }}>{subtitle}</p>
          </div>
          <form onSubmit={submit} style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            <div className="form-grid">
              <div className="form-group">
                <label className="form-label">Full Name *</label>
                <input name="name" className="form-input" placeholder="John Smith" required value={form.name} onChange={handle} />
              </div>
              <div className="form-group">
                <label className="form-label">Phone *</label>
                <input name="phone" className="form-input" placeholder="+1 (905) 000-0000" required value={form.phone} onChange={handle} />
              </div>
            </div>
            <div className="form-group">
              <label className="form-label">Email Address *</label>
              <input name="email" type="email" className="form-input" placeholder="john@example.com" required value={form.email} onChange={handle} />
            </div>
            <div className="form-grid">
              <div className="form-group">
                <label className="form-label">Service Type</label>
                <select name="service_type" className="form-select" value={form.service_type} onChange={handle}>
                  <option value="">Select service...</option>
                  <option>Commercial Construction</option>
                  <option>Residential Construction</option>
                  <option>Renovations</option>
                  <option>Project Management</option>
                  <option>Design-Build</option>
                </select>
              </div>
              <div className="form-group">
                <label className="form-label">Estimated Budget</label>
                <select name="budget_range" className="form-select" value={form.budget_range} onChange={handle}>
                  <option value="">Select budget...</option>
                  <option>Under $50,000</option>
                  <option>$50,000 – $100,000</option>
                  <option>$100,000 – $500,000</option>
                  <option>$500,000 – $2,000,000</option>
                  <option>$2,000,000+</option>
                </select>
              </div>
            </div>
            <div className="form-grid">
              <div className="form-group">
                <label className="form-label">Preferred Start</label>
                <select name="timeline" className="form-select" value={form.timeline} onChange={handle}>
                  <option value="">Select timeline...</option>
                  <option>Immediately</option>
                  <option>Within 1–3 months</option>
                  <option>3–6 months</option>
                  <option>6+ months</option>
                </select>
              </div>
              <div className="form-group">
                <label className="form-label">Preferred Contact</label>
                <select name="preferred_contact_method" className="form-select" value={form.preferred_contact_method} onChange={handle}>
                  <option value="email">Email</option>
                  <option value="phone">Phone Call</option>
                </select>
              </div>
            </div>
            <div className="form-group">
              <label className="form-label">Project Description *</label>
              <textarea name="project_description" className="form-textarea" required rows={4}
                placeholder="Describe your project — location, size, scope, and any special requirements..."
                value={form.project_description} onChange={handle} />
            </div>
            {error && <p style={{ color: 'var(--error)', fontSize: '0.85rem' }}>{error}</p>}
            <button type="submit" className="btn consultation-submit-btn btn-lg" disabled={loading} style={{ width: '100%', justifyContent: 'center' }}>
              {loading ? 'Submitting...' : <><Send size={16} /> Schedule Free Consultation</>}
            </button>
          </form>
        </>
      )}
    </div>
  )
}
