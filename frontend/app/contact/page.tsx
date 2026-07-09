'use client'
import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'
import { Send, CheckCircle, Phone, Mail, MapPin, Clock } from 'lucide-react'

const API = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000'

export default function ContactPage() {
  const [form, setForm] = useState({ name: '', email: '', phone: '', subject: '', message: '' })
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState('')

  const handle = (e: React.ChangeEvent<HTMLInputElement|HTMLTextAreaElement|HTMLSelectElement>) =>
    setForm(f => ({ ...f, [e.target.name]: e.target.value }))

  const submit = async (e: React.FormEvent) => {
    e.preventDefault(); setLoading(true); setError('')
    try {
      const res = await fetch(`${API}/api/contact`, { method: 'POST', headers: {'Content-Type':'application/json'}, body: JSON.stringify(form) })
      if (!res.ok) throw new Error()
      setSuccess(true)
      if (typeof window !== 'undefined' && (window as any).gtag) (window as any).gtag('event','contact_form_submit',{event_category:'lead'})
    } catch { setError('Something went wrong. Please call us directly at +1 (416) 710-8200.') }
    finally { setLoading(false) }
  }

  const contactInfo = [
    { icon: Phone, label: 'Phone', value: '+1 (416) 710-8200', href: 'tel:+14167108200', sub: 'Secondary: +1 (647) 581-7986' },
    { icon: Mail, label: 'Email', value: 'info@buzconstruction.ca', href: 'mailto:info@buzconstruction.ca', sub: 'Quotes: estimates@buzconstruction.ca' },
    { icon: MapPin, label: 'Office', value: '15 Queen St. S', href: '#map', sub: 'Mississauga, Ontario L5M 1K2' },
    { icon: Clock, label: 'Hours', value: 'Mon–Fri: 7:00 AM – 6:00 PM', href: '#', sub: 'Saturday: 8:00 AM – 2:00 PM' },
  ]

  return (
    <>
      <style>{`
        .page-hero{position:relative;min-height:45vh;display:flex;align-items:center;background:var(--off-white);padding-top:var(--nav-height);overflow:hidden;}
        .page-hero-bg{position:absolute;inset:0;}.page-hero-bg img{width:100%;height:100%;object-fit:cover;opacity:0.9;}
        .custom-hero-overlay{position:absolute;inset:0;background:linear-gradient(to right, rgba(240,235,225,0.95) 0%, rgba(240,235,225,0.8) 40%, transparent 100%); z-index:0;}
        .page-hero-content{position:relative;z-index:1;padding:80px 0 60px;}
        .contact-grid{display:grid;grid-template-columns:1fr 1.5fr;gap:60px;align-items:start;}
        .contact-info-list{display:flex;flex-direction:column;gap:16px;}
        .contact-info-card{display:flex;align-items:flex-start;gap:16px;background:var(--secondary);border:1px solid rgba(255,255,255,0.06);border-radius:var(--radius-lg);padding:20px;transition:var(--transition);text-decoration:none;color:inherit;}
        .contact-info-card:hover{border-color:rgba(245,166,35,0.3);}
        .contact-info-icon{width:44px;height:44px;border-radius:12px;background:rgba(245,166,35,0.1);display:flex;align-items:center;justify-content:center;color:var(--accent);flex-shrink:0;}
        .contact-info-label{font-size:0.72rem;font-weight:700;color:var(--accent);text-transform:uppercase;letter-spacing:0.1em;margin-bottom:3px;}
        .contact-info-value{font-weight:700;font-size:0.95rem;margin-bottom:2px;color:var(--white);}
        .contact-info-sub{font-size:0.78rem;color:var(--gray-light);}
        .map-container{border-radius:var(--radius-xl);overflow:hidden;margin-top:20px;border:1px solid rgba(255,255,255,0.08);}
        .contact-submit-btn {
          background: #C6A75E !important;
          color: #FCFAF7 !important;
          border: none !important;
          transition: all 0.3s ease;
        }
        .contact-submit-btn:hover {
          background: #E8CA7D !important;
          transform: translateY(-2px);
          box-shadow: 0 0 25px rgba(198, 167, 94, 0.75) !important;
        }
        @media (max-width: 768px) {
          .contact-grid { grid-template-columns: 1fr; gap: 32px; }
          .form-input, .form-select, .form-textarea, .contact-submit-btn {
            min-height: 44px;
            font-size: 16px;
            width: 100%;
          }
        }
      `}</style>

      <section className="page-hero">
        <div className="page-hero-bg"><Image src="/images/buz_contact_hero.png" alt="Contact BUZ Construction" fill style={{objectFit:'cover'}}/></div>
        <div className="custom-hero-overlay"/>
        <div className="container page-hero-content">
          <div style={{display:'flex',alignItems:'center',gap:8,fontSize:'0.8rem',color:'var(--gray-dark)',marginBottom:16}}><Link href="/" style={{color:'var(--accent)',textDecoration:'none'}}>Home</Link> / Contact</div>
          <span className="section-tag">Get In Touch</span>
          <h1 style={{fontFamily:'var(--font-heading)',fontSize:'clamp(2.5rem,5vw,4.5rem)',fontWeight:900,marginTop:12,marginBottom:20,color:'var(--secondary)'}}>Let's <span style={{color:'var(--accent)'}}>Talk</span></h1>
          <p style={{color:'var(--secondary)',fontSize:'1.1rem',maxWidth:520,lineHeight:1.7}}>Ready to start your project? Have a question? We'd love to hear from you. Our team responds within 24 hours.</p>
        </div>
      </section>

      <section className="section bg-dark"><div className="container">
        <div className="contact-grid">
          <div>
            <h2 style={{fontFamily:'var(--font-heading)',fontSize:'2rem',fontWeight:800,marginBottom:24}}>Contact <span style={{color:'var(--accent)'}}>Information</span></h2>
            <div className="contact-info-list">
              {contactInfo.map(c=>(
                <a key={c.label} href={c.href} className="contact-info-card">
                  <div className="contact-info-icon"><c.icon size={20}/></div>
                  <div><div className="contact-info-label">{c.label}</div><div className="contact-info-value">{c.value}</div><div className="contact-info-sub">{c.sub}</div></div>
                </a>
              ))}
            </div>
            <div id="map" className="map-container">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2885.4832736773636!2d-79.69999992392078!3d43.64785997110249!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x882b47f4e1dc3e3f%3A0x5c3e1e7e7f1e1e1e!2s100%20Matheson%20Blvd%20W%2C%20Mississauga%2C%20ON!5e0!3m2!1sen!2sca!4v1640000000000!5m2!1sen!2sca"
                width="100%" height="280" style={{border:0,display:'block'}} allowFullScreen loading="lazy"
                title="BUZ Construction Office Location"
              />
            </div>
          </div>

          <div style={{background:'var(--secondary)',border:'1px solid rgba(255,255,255,0.08)',borderRadius:'var(--radius-xl)',padding:'40px'}}>
            {success?(
              <div style={{textAlign:'center',padding:'40px 0',display:'flex',flexDirection:'column',alignItems:'center',gap:16}}>
                <CheckCircle size={56} style={{color:'var(--success)'}}/>
                <h3 style={{fontFamily:'var(--font-heading)',fontSize:'2rem'}}>Message Sent!</h3>
                <p style={{color:'var(--gray-mid)'}}>We've received your message and will respond within 24 hours.</p>
                <button className="btn btn-primary" onClick={()=>setSuccess(false)}>Send Another</button>
              </div>
            ):(
              <>
                <span className="section-tag" style={{display:'inline-block',marginBottom:16}}>Send a Message</span>
                <h2 style={{fontFamily:'var(--font-heading)',fontSize:'1.8rem',marginBottom:24,color:'var(--white)'}}>We'd Love to <span style={{color:'var(--accent)'}}>Hear From You</span></h2>
                <form onSubmit={submit} style={{display:'flex',flexDirection:'column',gap:16}}>
                  <div className="form-grid">
                    <div className="form-group"><label className="form-label">Full Name *</label><input name="name" className="form-input" required value={form.name} onChange={handle} placeholder="John Smith"/></div>
                    <div className="form-group"><label className="form-label">Phone</label><input name="phone" className="form-input" value={form.phone} onChange={handle} placeholder="+1 (905) 000-0000"/></div>
                  </div>
                  <div className="form-group"><label className="form-label">Email *</label><input name="email" type="email" className="form-input" required value={form.email} onChange={handle} placeholder="john@example.com"/></div>
                  <div className="form-group"><label className="form-label">Subject</label>
                    <select name="subject" className="form-select" value={form.subject} onChange={handle}>
                      <option value="">Select subject...</option>
                      <option>General Inquiry</option>
                      <option>Request for Proposal</option>
                      <option>Service Question</option>
                      <option>Partnership Inquiry</option>
                      <option>Other</option>
                    </select>
                  </div>
                  <div className="form-group"><label className="form-label">Message *</label><textarea name="message" className="form-textarea" rows={5} required value={form.message} onChange={handle} placeholder="Tell us about your project or question..."/></div>
                  {error&&<p style={{color:'var(--error)',fontSize:'0.85rem'}}>{error}</p>}
                  <button type="submit" className="btn contact-submit-btn btn-lg" disabled={loading} style={{width:'100%',justifyContent:'center'}}>{loading?'Sending...':<><Send size={16}/>Send Message</>}</button>
                </form>
              </>
            )}
          </div>
        </div>
      </div></section>
    </>
  )
}
