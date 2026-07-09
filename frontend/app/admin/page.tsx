'use client'
import { useState, useEffect } from 'react'
import { Users, Mail, Briefcase, LayoutGrid, LogIn, LogOut, RefreshCw, Eye, CheckCircle, Clock, AlertCircle } from 'lucide-react'

const API = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000'

interface Stats { total_leads:number; new_leads:number; total_contacts:number; unread_contacts:number; total_applications:number; pending_applications:number; total_projects:number; total_blog_posts:number; }
interface Lead { id:number; form_type:string; name:string; email:string; phone:string; service_type:string; budget_range:string; status:string; created_at:string; }
interface Contact { id:number; name:string; email:string; subject:string; message:string; is_read:boolean; created_at:string; }
interface Application { id:number; name:string; email:string; position_applied:string; status:string; created_at:string; }

export default function AdminPage() {
  const [token, setToken] = useState<string|null>(null)
  const [creds, setCreds] = useState({ username: '', password: '' })
  const [loginErr, setLoginErr] = useState('')
  const [activeTab, setActiveTab] = useState('dashboard')
  const [stats, setStats] = useState<Stats|null>(null)
  const [leads, setLeads] = useState<Lead[]>([])
  const [contacts, setContacts] = useState<Contact[]>([])
  const [applications, setApplications] = useState<Application[]>([])
  const [loading, setLoading] = useState(false)

  useEffect(() => { const t = localStorage.getItem('buz_admin_token'); if(t) setToken(t) }, [])

  const login = async (e: React.FormEvent) => {
    e.preventDefault(); setLoginErr('')
    try {
      const res = await fetch(`${API}/api/admin/login`, { method:'POST', headers:{'Content-Type':'application/json'}, body:JSON.stringify(creds) })
      if (!res.ok) throw new Error()
      const data = await res.json()
      localStorage.setItem('buz_admin_token', data.access_token)
      setToken(data.access_token)
      fetchAll(data.access_token)
    } catch { setLoginErr('Invalid credentials') }
  }

  const fetchAll = async (t: string) => {
    setLoading(true)
    const headers = { Authorization: `Bearer ${t}` }
    try {
      const [s,l,c,a] = await Promise.all([
        fetch(`${API}/api/admin/stats`,{headers}).then(r=>r.json()),
        fetch(`${API}/api/admin/leads`,{headers}).then(r=>r.json()),
        fetch(`${API}/api/admin/contacts`,{headers}).then(r=>r.json()),
        fetch(`${API}/api/admin/applications`,{headers}).then(r=>r.json()),
      ])
      setStats(s); setLeads(l); setContacts(c); setApplications(a)
    } catch {} finally { setLoading(false) }
  }

  const updateLeadStatus = async (id:number, status:string) => {
    if(!token) return
    await fetch(`${API}/api/admin/leads/${id}`, { method:'PATCH', headers:{'Content-Type':'application/json', Authorization:`Bearer ${token}`}, body:JSON.stringify({status}) })
    fetchAll(token)
  }

  const markRead = async (id:number) => {
    if(!token) return
    await fetch(`${API}/api/admin/contacts/${id}`, { method:'PATCH', headers:{Authorization:`Bearer ${token}`} })
    fetchAll(token)
  }

  const logout = () => { localStorage.removeItem('buz_admin_token'); setToken(null); setStats(null) }

  useEffect(() => { if(token) fetchAll(token) }, [token])

  const statusColor = (s:string) => s==='new'?'#818cf8':s==='contacted'?'#F59E0B':s==='converted'?'#22C55E':'var(--gray-mid)'
  const fmtDate = (d:string) => new Date(d).toLocaleDateString('en-CA',{month:'short',day:'numeric',year:'numeric'})

  if (!token) return (
    <div className="login-container">
      <style>{`
        .login-container {
          min-height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          background: var(--primary);
          padding: calc(var(--nav-height) + 24px) 24px 48px;
          position: relative;
          overflow: hidden;
        }
        .login-bg-glow-1 {
          position: absolute;
          top: 15%;
          left: 20%;
          width: 400px;
          height: 400px;
          background: radial-gradient(circle, rgba(198, 167, 94, 0.12) 0%, transparent 70%);
          filter: blur(60px);
          pointer-events: none;
          z-index: 0;
        }
        .login-bg-glow-2 {
          position: absolute;
          bottom: 15%;
          right: 20%;
          width: 500px;
          height: 500px;
          background: radial-gradient(circle, rgba(31, 42, 68, 0.5) 0%, transparent 70%);
          filter: blur(80px);
          pointer-events: none;
          z-index: 0;
        }
        .login-card {
          background: rgba(23, 32, 51, 0.65);
          backdrop-filter: blur(20px);
          -webkit-backdrop-filter: blur(20px);
          border: 1px solid rgba(198, 167, 94, 0.25);
          border-radius: var(--radius-xl);
          padding: 48px 40px;
          width: 100%;
          max-width: 440px;
          box-shadow: var(--shadow-lg), 0 0 50px rgba(198, 167, 94, 0.05);
          position: relative;
          z-index: 1;
          animation: scaleIn 0.5s cubic-bezier(0.4, 0, 0.2, 1) forwards;
        }
        .login-logo {
          text-align: center;
          margin-bottom: 36px;
        }
        .login-logo-icon {
          width: 64px;
          height: 64px;
          background: linear-gradient(135deg, var(--accent), var(--accent-light));
          border-radius: 16px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-family: var(--font-heading);
          font-size: 1.5rem;
          font-weight: 900;
          color: var(--primary);
          margin: 0 auto 16px;
          box-shadow: 0 8px 24px rgba(198, 167, 94, 0.3);
          transition: transform 0.3s ease;
        }
        .login-card:hover .login-logo-icon {
          transform: scale(1.05) rotate(2deg);
        }
        .login-title {
          font-family: var(--font-heading);
          font-size: 1.8rem;
          font-weight: 600;
          margin-bottom: 6px;
          background: linear-gradient(135deg, var(--white), var(--off-white));
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }
        .admin-input-group {
          display: flex;
          flex-direction: column;
          gap: 8px;
        }
        .admin-input-label {
          font-size: 0.72rem;
          font-weight: 700;
          color: var(--gray-light);
          text-transform: uppercase;
          letter-spacing: 0.10em;
        }
        .admin-input {
          background: rgba(18, 25, 41, 0.55);
          border: 1px solid rgba(255, 255, 255, 0.08);
          border-radius: var(--radius-md);
          padding: 14px 16px;
          color: var(--white);
          font-size: 0.95rem;
          transition: var(--transition);
          outline: none;
          font-family: var(--font-body);
        }
        .admin-input:focus {
          border-color: var(--accent);
          background: rgba(18, 25, 41, 0.85);
          box-shadow: 0 0 0 3px rgba(198, 167, 94, 0.15);
        }
        .admin-login-btn {
          background: var(--accent) !important;
          color: var(--primary) !important;
          font-weight: 700;
          font-size: 0.95rem;
          letter-spacing: 0.04em;
          padding: 14px;
          border-radius: var(--radius-md);
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 10px;
          border: none;
          cursor: pointer;
          transition: var(--transition);
          position: relative;
          overflow: hidden;
          margin-top: 8px;
          box-shadow: 0 4px 15px rgba(198, 167, 94, 0.2);
        }
        .admin-login-btn:hover {
          background: #E8CA7D !important;
          transform: translateY(-2px);
          box-shadow: 0 8px 25px rgba(198, 167, 94, 0.45);
        }
        .admin-login-btn::after {
          content: '';
          position: absolute;
          top: 0;
          left: -100%;
          width: 50%;
          height: 100%;
          background: linear-gradient(to right, rgba(255, 255, 255, 0) 0%, rgba(255, 255, 255, 0.3) 50%, rgba(255, 255, 255, 0) 100%);
          transform: skewX(-25deg);
          transition: all 0.7s ease;
          pointer-events: none;
        }
        .admin-login-btn:hover::after {
          left: 200%;
        }
        @keyframes scaleIn {
          from { opacity: 0; transform: scale(0.95); }
          to { opacity: 1; transform: scale(1); }
        }
      `}</style>
      <div className="login-bg-glow-1"></div>
      <div className="login-bg-glow-2"></div>
      <div className="login-card">
        <div className="login-logo">
          <div className="login-logo-icon">BUZ</div>
          <h2 className="login-title">Admin Panel</h2>
          <p style={{color:'var(--gray-mid)',fontSize:'0.85rem',fontWeight:500}}>BUZ Construction Group Inc.</p>
        </div>
        <form onSubmit={login} style={{display:'flex',flexDirection:'column',gap:20}}>
          <div className="admin-input-group">
            <label className="admin-input-label">Username</label>
            <input className="admin-input" value={creds.username} onChange={e=>setCreds(c=>({...c,username:e.target.value}))} placeholder="admin" required/>
          </div>
          <div className="admin-input-group">
            <label className="admin-input-label">Password</label>
            <input type="password" className="admin-input" value={creds.password} onChange={e=>setCreds(c=>({...c,password:e.target.value}))} placeholder="••••••••" required/>
          </div>
          {loginErr&&<p style={{color:'var(--error)',fontSize:'0.85rem',textAlign:'center',fontWeight:500}}>{loginErr}</p>}
          <button type="submit" className="admin-login-btn"><LogIn size={16}/>Sign In</button>
        </form>
        <p style={{color:'var(--gray-dark)',fontSize:'0.75rem',textAlign:'center',marginTop:24,fontWeight:500}}>Default: admin / BuzAdmin2024!</p>
      </div>
    </div>
  )

  return (
    <div style={{minHeight:'100vh',background:'var(--primary)',paddingTop:'var(--nav-height)'}}>
      <style>{`
        .admin-custom-scroll::-webkit-scrollbar {
          width: 6px;
          height: 6px;
        }
        .admin-custom-scroll::-webkit-scrollbar-track {
          background: transparent;
        }
        .admin-custom-scroll::-webkit-scrollbar-thumb {
          background: rgba(198, 167, 94, 0.15);
          border-radius: var(--radius-full);
        }
        .admin-custom-scroll::-webkit-scrollbar-thumb:hover {
          background: rgba(198, 167, 94, 0.35);
        }

        .admin-layout {
          display: grid;
          grid-template-columns: 260px 1fr;
          min-height: calc(100vh - var(--nav-height));
          position: relative;
        }
        
        .admin-sidebar {
          background: rgba(23, 32, 51, 0.8);
          backdrop-filter: blur(16px);
          -webkit-backdrop-filter: blur(16px);
          border-right: 1px solid rgba(198, 167, 94, 0.12);
          padding: 32px 20px;
          position: sticky;
          top: var(--nav-height);
          height: calc(100vh - var(--nav-height));
          overflow-y: auto;
          z-index: 10;
          display: flex;
          flex-direction: column;
        }
        .admin-sidebar::-webkit-scrollbar {
          width: 3px;
        }
        .admin-sidebar::-webkit-scrollbar-track {
          background: transparent;
        }
        .admin-sidebar::-webkit-scrollbar-thumb {
          background: rgba(198, 167, 94, 0.1);
          border-radius: 99px;
        }

        .sidebar-brand {
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 0 8px;
          margin-bottom: 36px;
        }
        .sidebar-logo {
          width: 38px;
          height: 38px;
          background: linear-gradient(135deg, var(--accent), var(--accent-light));
          border-radius: 10px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-family: var(--font-heading);
          font-weight: 900;
          font-size: 1.1rem;
          color: var(--primary);
          box-shadow: 0 4px 12px rgba(198, 167, 94, 0.25);
        }
        .sidebar-title {
          font-family: var(--font-heading);
          font-size: 1.15rem;
          font-weight: 700;
          color: var(--white);
          letter-spacing: 0.02em;
        }
        .nav-section {
          font-size: 0.65rem;
          font-weight: 700;
          color: var(--gray-mid);
          text-transform: uppercase;
          letter-spacing: 0.18em;
          margin: 28px 12px 10px;
          opacity: 0.8;
        }
        .sidebar-btn {
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 12px 16px;
          border-radius: var(--radius-md);
          font-size: 0.88rem;
          font-weight: 600;
          color: var(--gray-light);
          cursor: pointer;
          transition: var(--transition);
          width: 100%;
          background: none;
          border: none;
          font-family: var(--font-body);
          text-align: left;
          position: relative;
          overflow: hidden;
        }
        .sidebar-btn::before {
          content: '';
          position: absolute;
          left: 0;
          top: 0;
          bottom: 0;
          width: 3px;
          background: var(--accent);
          opacity: 0;
          transition: var(--transition);
        }
        .sidebar-btn:hover {
          background: rgba(255, 255, 255, 0.03);
          color: var(--white);
        }
        .sidebar-btn.active {
          background: rgba(198, 167, 94, 0.08);
          color: var(--accent);
        }
        .sidebar-btn.active::before {
          opacity: 1;
        }
        .sidebar-badge {
          margin-left: auto;
          font-size: 0.7rem;
          font-weight: 800;
          border-radius: 99px;
          padding: 2px 8px;
        }

        .admin-main {
          padding: 40px 48px;
          position: relative;
          z-index: 1;
          background: var(--primary);
        }
        .admin-main-glow {
          position: absolute;
          top: 0;
          right: 0;
          width: 600px;
          height: 600px;
          background: radial-gradient(circle, rgba(198, 167, 94, 0.03) 0%, transparent 70%);
          filter: blur(60px);
          pointer-events: none;
          z-index: 0;
        }

        .admin-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 36px;
          position: relative;
          z-index: 1;
        }
        .admin-title {
          font-family: var(--font-heading);
          font-size: 2.2rem;
          font-weight: 700;
          letter-spacing: -0.01em;
          color: var(--white);
        }
        .admin-title span {
          background: linear-gradient(135deg, var(--accent), var(--accent-light));
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        .stats-cards {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 24px;
          margin-bottom: 40px;
          position: relative;
          z-index: 1;
        }
        .stat-card {
          background: rgba(23, 32, 51, 0.45);
          backdrop-filter: blur(8px);
          -webkit-backdrop-filter: blur(8px);
          border: 1px solid rgba(198, 167, 94, 0.1);
          border-radius: var(--radius-lg);
          padding: 28px 24px;
          transition: var(--transition);
          position: relative;
          overflow: hidden;
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
        }
        .stat-card::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: 2px;
          background: linear-gradient(90deg, var(--accent), transparent);
          opacity: 0;
          transition: var(--transition);
        }
        .stat-card:hover {
          transform: translateY(-4px);
          border-color: rgba(198, 167, 94, 0.25);
          box-shadow: 0 12px 30px rgba(0, 0, 0, 0.25), 0 0 20px rgba(198, 167, 94, 0.05);
        }
        .stat-card:hover::before {
          opacity: 1;
        }
        .stat-card-num {
          font-family: var(--font-heading);
          font-size: 2.6rem;
          font-weight: 800;
          line-height: 1;
          margin-top: 10px;
        }
        .stat-card-label {
          font-size: 0.72rem;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.12em;
          color: var(--gray-mid);
        }
        .stat-card-sub {
          font-size: 0.76rem;
          color: var(--gray-light);
          margin-top: 6px;
          opacity: 0.8;
        }

        .table-wrap {
          background: rgba(23, 32, 51, 0.45);
          backdrop-filter: blur(8px);
          -webkit-backdrop-filter: blur(8px);
          border: 1px solid rgba(198, 167, 94, 0.1);
          border-radius: var(--radius-lg);
          overflow: hidden;
          box-shadow: 0 4px 25px rgba(0, 0, 0, 0.2);
          position: relative;
          z-index: 1;
        }
        .table-header-bar {
          padding: 24px;
          border-bottom: 1px solid rgba(255, 255, 255, 0.05);
          display: flex;
          align-items: center;
          justify-content: space-between;
        }
        .table-header-title {
          font-family: var(--font-heading);
          font-size: 1.25rem;
          font-weight: 600;
          color: var(--white);
        }

        .data-table {
          width: 100%;
          border-collapse: collapse;
        }
        .data-table th {
          text-align: left;
          font-size: 0.72rem;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.12em;
          color: var(--gray-light);
          padding: 16px 24px;
          border-bottom: 1px solid rgba(255, 255, 255, 0.05);
          background: rgba(18, 25, 41, 0.3);
        }
        .data-table td {
          padding: 18px 24px;
          border-bottom: 1px solid rgba(255, 255, 255, 0.03);
          font-size: 0.88rem;
          color: rgba(252, 250, 247, 0.85);
          vertical-align: middle;
        }
        .data-table tr:last-child td {
          border-bottom: none;
        }
        .data-table tr:hover td {
          background: rgba(255, 255, 255, 0.02);
        }

        .status-badge {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          padding: 4px 12px;
          border-radius: 50px;
          font-size: 0.72rem;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.06em;
        }
        .status-select {
          background: rgba(18, 25, 41, 0.6);
          border: 1px solid rgba(198, 167, 94, 0.25);
          border-radius: var(--radius-md);
          padding: 6px 12px;
          color: var(--white);
          font-size: 0.78rem;
          font-weight: 600;
          cursor: pointer;
          outline: none;
          transition: var(--transition);
        }
        .status-select:focus {
          border-color: var(--accent);
          box-shadow: 0 0 0 2px rgba(198, 167, 94, 0.15);
        }

        .btn-sm-action {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          padding: 8px 14px;
          border-radius: var(--radius-md);
          font-size: 0.78rem;
          font-weight: 600;
          transition: var(--transition);
          cursor: pointer;
          border: none;
        }
        .btn-sm-action-success {
          background: rgba(34, 197, 94, 0.12);
          border: 1px solid rgba(34, 197, 94, 0.25);
          color: #4ade80;
        }
        .btn-sm-action-success:hover {
          background: rgba(34, 197, 94, 0.22);
          box-shadow: 0 0 12px rgba(34, 197, 94, 0.2);
        }

        .dashboard-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 24px;
        }

        @media(max-width: 1100px) {
          .admin-layout {
            grid-template-columns: 1fr;
          }
          .admin-sidebar {
            position: static;
            height: auto;
            border-right: none;
            border-bottom: 1px solid rgba(198, 167, 94, 0.12);
          }
          .stats-cards {
            grid-template-columns: repeat(2, 1fr);
          }
          .dashboard-grid {
            grid-template-columns: 1fr;
          }
        }
        @media(max-width: 640px) {
          .stats-cards {
            grid-template-columns: 1fr;
          }
          .admin-main {
            padding: 28px 20px;
          }
        }
      `}</style>
      <div className="admin-layout">
        <aside className="admin-sidebar">
          <div className="sidebar-brand">
            <div className="sidebar-logo">BUZ</div>
            <div className="sidebar-title">Admin Panel</div>
          </div>
          <div className="nav-section">Overview</div>
          {([['dashboard','Dashboard',LayoutGrid],] as [string, string, any][]).map(([id,label,Icon])=>(<button key={id} className={`sidebar-btn ${activeTab===id?'active':''}`} onClick={()=>setActiveTab(id)}><Icon size={16}/>{label}</button>))}
          <div className="nav-section">Lead Management</div>
          {([['leads','All Leads',Users],['contacts','Contact Messages',Mail],['applications','Job Applications',Briefcase]] as [string, string, any][]).map(([id,label,Icon])=>(<button key={id} className={`sidebar-btn ${activeTab===id?'active':''}`} onClick={()=>setActiveTab(id)}><Icon size={16}/>{label}{id==='leads'&&stats?.new_leads?<span className="sidebar-badge" style={{background:'var(--accent)',color:'var(--primary)'}}>{stats.new_leads}</span>:null}{id==='contacts'&&stats?.unread_contacts?<span className="sidebar-badge" style={{background:'#EF4444',color:'#fff'}}>{stats.unread_contacts}</span>:null}</button>))}
          <div className="nav-section">Account</div>
          <button className="sidebar-btn" onClick={()=>fetchAll(token!)} style={{color:'var(--gray-mid)'}}><RefreshCw size={16}/>Refresh Data</button>
          <button className="sidebar-btn" onClick={logout} style={{color:'#EF4444'}}><LogOut size={16}/>Sign Out</button>
        </aside>

        <main className="admin-main">
          <div className="admin-main-glow"></div>
          {activeTab==='dashboard'&&(
            <div className="animate-fade-up">
              <div className="admin-header">
                <h1 className="admin-title"><span>Dashboard</span></h1>
                <span style={{fontSize:'0.82rem',color:'var(--gray-mid)',fontWeight:600,letterSpacing:'0.05em',textTransform:'uppercase'}}>BUZ Construction Group Inc.</span>
              </div>
              <div className="stats-cards">
                {([['Total Leads',stats?.total_leads,stats?.new_leads+' new','var(--accent)'],['Contact Messages',stats?.total_contacts,stats?.unread_contacts+' unread','#818cf8'],['Job Applications',stats?.total_applications,stats?.pending_applications+' pending','#22C55E'],['Portfolio Projects',stats?.total_projects,stats?.total_blog_posts+' blog posts','#F59E0B']] as [string, any, string, string][]).map(([label,num,sub,color])=>(
                  <div key={label} className="stat-card">
                    <div className="stat-card-label">{label}</div>
                    <div className="stat-card-num" style={{color}}>{num??'—'}</div>
                    <div className="stat-card-sub">{sub}</div>
                  </div>
                ))}
              </div>
              <div className="dashboard-grid">
                <div className="table-wrap">
                  <div className="table-header-bar">
                    <h3 className="table-header-title">Recent Leads</h3>
                  </div>
                  <div className="admin-custom-scroll" style={{overflowX:'auto'}}>
                    <table className="data-table">
                      <thead>
                        <tr>
                          <th>Name</th>
                          <th>Service</th>
                          <th>Status</th>
                        </tr>
                      </thead>
                      <tbody>
                        {leads.slice(0,6).map(l=>(
                          <tr key={l.id}>
                            <td>
                              <div style={{fontWeight:700,color:'var(--white)'}}>{l.name}</div>
                              <div style={{fontSize:'0.75rem',color:'var(--gray-mid)'}}>{l.email}</div>
                            </td>
                            <td>{l.service_type||'General'}</td>
                            <td>
                              <span className="status-badge" style={{background:`${statusColor(l.status)}15`,color:statusColor(l.status)}}>
                                {l.status}
                              </span>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
                <div className="table-wrap">
                  <div className="table-header-bar">
                    <h3 className="table-header-title">Recent Messages</h3>
                  </div>
                  <div className="admin-custom-scroll" style={{overflowX:'auto'}}>
                    <table className="data-table">
                      <thead>
                        <tr>
                          <th>From</th>
                          <th>Subject</th>
                          <th>Status</th>
                        </tr>
                      </thead>
                      <tbody>
                        {contacts.slice(0,6).map(c=>(
                          <tr key={c.id}>
                            <td>
                              <div style={{fontWeight:700,color:'var(--white)'}}>{c.name}</div>
                              <div style={{fontSize:'0.75rem',color:'var(--gray-mid)'}}>{fmtDate(c.created_at)}</div>
                            </td>
                            <td style={{maxWidth:160,overflow:'hidden',textOverflow:'ellipsis',whiteSpace:'nowrap'}}>{c.subject||'—'}</td>
                            <td>
                              {c.is_read ? (
                                <span style={{color:'var(--gray-mid)',fontSize:'0.78rem',fontWeight:600}}>Read</span>
                              ) : (
                                <span className="badge badge-new" style={{fontSize:'0.7rem'}}>Unread</span>
                              )}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab==='leads'&&(
            <div className="animate-fade-up">
              <div className="admin-header">
                <h1 className="admin-title"><span>Leads & Inquiries</span></h1>
                <span className="badge badge-accent" style={{fontWeight:700}}>{leads.length} total</span>
              </div>
              <div className="table-wrap">
                <div className="admin-custom-scroll" style={{overflowX:'auto'}}>
                  <table className="data-table">
                    <thead>
                      <tr>
                        <th>Name</th>
                        <th>Contact</th>
                        <th>Type</th>
                        <th>Service</th>
                        <th>Budget</th>
                        <th>Date</th>
                        <th>Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {leads.map(l=>(
                        <tr key={l.id}>
                          <td><div style={{fontWeight:700,color:'var(--white)'}}>{l.name}</div></td>
                          <td>
                            <div style={{fontWeight:500}}>{l.email}</div>
                            <div style={{fontSize:'0.75rem',color:'var(--gray-mid)'}}>{l.phone}</div>
                          </td>
                          <td>
                            <span className="status-badge" style={{background:'rgba(129,140,248,0.12)',color:'#818cf8',textTransform:'capitalize'}}>
                              {l.form_type}
                            </span>
                          </td>
                          <td>{l.service_type||'—'}</td>
                          <td style={{fontSize:'0.82rem',color:'var(--accent)'}}>{l.budget_range||'—'}</td>
                          <td style={{fontSize:'0.78rem',color:'var(--gray-mid)'}}>{fmtDate(l.created_at)}</td>
                          <td>
                            <select className="status-select" value={l.status} onChange={e=>updateLeadStatus(l.id,e.target.value)}>
                              <option value="new">New</option>
                              <option value="contacted">Contacted</option>
                              <option value="converted">Converted</option>
                            </select>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {activeTab==='contacts'&&(
            <div className="animate-fade-up">
              <div className="admin-header">
                <h1 className="admin-title"><span>Contact Messages</span></h1>
                <span className="badge badge-accent" style={{fontWeight:700}}>{contacts.filter(c=>!c.is_read).length} unread</span>
              </div>
              <div className="table-wrap">
                <div className="admin-custom-scroll" style={{overflowX:'auto'}}>
                  <table className="data-table">
                    <thead>
                      <tr>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Subject</th>
                        <th>Message</th>
                        <th>Date</th>
                        <th>Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {contacts.map(c=>(
                        <tr key={c.id} style={{opacity:c.is_read?0.6:1, transition:'opacity 0.2s'}}>
                          <td style={{fontWeight:700,color:'var(--white)'}}>{c.name}</td>
                          <td>{c.email}</td>
                          <td>{c.subject||'—'}</td>
                          <td style={{maxWidth:240,fontSize:'0.82rem',lineHeight:1.5,overflow:'hidden',textOverflow:'ellipsis',whiteSpace:'normal'}}>{c.message}</td>
                          <td style={{fontSize:'0.78rem',color:'var(--gray-mid)',whiteSpace:'nowrap'}}>{fmtDate(c.created_at)}</td>
                          <td>
                            {!c.is_read && (
                              <button className="btn-sm-action btn-sm-action-success" onClick={()=>markRead(c.id)}>
                                <CheckCircle size={13}/>Mark Read
                              </button>
                            )}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {activeTab==='applications'&&(
            <div className="animate-fade-up">
              <div className="admin-header">
                <h1 className="admin-title"><span>Job Applications</span></h1>
                <span className="badge badge-accent" style={{fontWeight:700}}>{applications.length} total</span>
              </div>
              <div className="table-wrap">
                <div className="admin-custom-scroll" style={{overflowX:'auto'}}>
                  <table className="data-table">
                    <thead>
                      <tr>
                        <th>Applicant</th>
                        <th>Position</th>
                        <th>Email</th>
                        <th>Date</th>
                        <th>Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {applications.map(a=>(
                        <tr key={a.id}>
                          <td style={{fontWeight:700,color:'var(--white)'}}>{a.name}</td>
                          <td>{a.position_applied||'General'}</td>
                          <td>{a.email}</td>
                          <td style={{fontSize:'0.78rem',color:'var(--gray-mid)'}}>{fmtDate(a.created_at)}</td>
                          <td>
                            <span className="status-badge" style={{
                              background:a.status==='pending'?'rgba(245,158,11,0.12)':a.status==='hired'?'rgba(34,197,94,0.12)':'rgba(139,92,246,0.12)',
                              color:a.status==='pending'?'#F59E0B':a.status==='hired'?'#22C55E':'#8B5CF6'
                            }}>
                              {a.status}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  )
}
