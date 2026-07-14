import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight, Calendar, User } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Blog & Construction News | Ontario Construction Insights',
  description: 'BUZ Construction Group Inc. blog — construction news, industry trends, renovation tips, and expert insights from Ontario\'s leading general contractor.',
}

const posts = [
  { title: 'Top 5 Construction Trends in Ontario for 2024', slug: 'construction-trends-ontario-2024', cat: 'Industry News', img: '/images/buz_aerial_site.jpg', excerpt: 'From mass timber to net-zero construction, Ontario\'s building industry is evolving rapidly. Here\'s what to watch in 2024 and beyond.', author: 'Bilal Khan', date: 'November 15, 2024', readTime: '5 min read' },
  { title: 'How Design-Build Saves Time and Money on Your Project', slug: 'design-build-saves-time-money', cat: 'Services', img: '/images/design_build_1781694386091.jpg', excerpt: 'The design-build delivery method is changing how Ontario developers approach commercial and residential construction. Here\'s why.', author: 'Ubaid Khan', date: 'October 22, 2024', readTime: '6 min read' },
  { title: 'Kitchen Renovation Guide: What to Expect and How to Budget', slug: 'kitchen-renovation-guide-budget', cat: 'Renovations', img: '/images/kitchen_renovation_1781694354275.jpg', excerpt: 'Thinking about renovating your kitchen? Here\'s your complete guide to planning, budgeting, and executing a successful kitchen renovation.', author: 'Zaidan Anees', date: 'September 30, 2024', readTime: '8 min read' },
  { title: 'Understanding LEED Certification for Commercial Buildings', slug: 'leed-certification-commercial', cat: 'Commercial', img: '/images/commercial_office_1781694315339.jpg', excerpt: 'LEED certification is becoming a standard expectation in Ontario commercial construction. What does it mean, and what does it cost?', author: 'Ubaid Khan', date: 'September 10, 2024', readTime: '7 min read' },
  { title: 'Custom Home Building: From Lot Purchase to Move-In', slug: 'custom-home-building-guide', cat: 'Residential', img: '/images/residential_luxury_home_1781694338229.jpg', excerpt: 'Building a custom home is a complex journey. Our step-by-step guide walks you through everything — from finding your lot to getting your occupancy permit.', author: 'Bilal Khan', date: 'August 20, 2024', readTime: '10 min read' },
  { title: 'Construction Site Safety: Our Zero-Incident Commitment', slug: 'construction-site-safety', cat: 'Safety', img: '/images/safety_workers_1781694419859.jpg', excerpt: 'At BUZ Construction, we believe every worker deserves to go home safely. Learn how our comprehensive safety program protects every person on every site.', author: 'Zaidan Anees', date: 'July 28, 2024', readTime: '5 min read' },
]

const catColors: Record<string,string> = { 'Industry News': '#3B82F6', Services: '#8B5CF6', Renovations: '#F59E0B', Commercial: '#22C55E', Residential: '#EC4899', Safety: '#EF4444' }

export default function BlogPage() {
  return (
    <>
      <style>{`
        .page-hero{position:relative;min-height:45vh;display:flex;align-items:center;background:var(--primary);padding-top:var(--nav-height);overflow:hidden;}
        .page-hero-bg{position:absolute;inset:0;}.page-hero-bg img{width:100%;height:100%;object-fit:cover;opacity:0.9;}
        .page-hero-overlay{position:absolute;inset:0;background:linear-gradient(90deg, rgba(245,242,235,1) 0%, rgba(245,242,235,0.85) 45%, rgba(245,242,235,0) 100%) !important;}
        .page-hero-content{position:relative;z-index:1;padding:80px 0 60px;}
        .blog-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:28px;}
        .blog-card{background:var(--secondary);border:1px solid rgba(255,255,255,0.06);border-radius:var(--radius-xl);overflow:hidden;transition:var(--transition);}
        .blog-card:hover{transform:translateY(-4px);border-color:rgba(245,166,35,0.2);box-shadow:var(--shadow-lg);}
        .blog-img{aspect-ratio:16/9;overflow:hidden;position:relative;}
        .blog-img img{width:100%;height:100%;object-fit:cover;transition:transform 0.4s ease;}
        .blog-card:hover .blog-img img{transform:scale(1.04);}
        .blog-body{padding:28px;}
        .blog-cat{display:inline-block;font-size:0.7rem;font-weight:700;text-transform:uppercase;letter-spacing:0.12em;padding:3px 10px;border-radius:50px;margin-bottom:12px;}
        .blog-title{font-family:var(--font-heading);font-size:1.25rem;font-weight:700;margin-bottom:12px;line-height:1.3;color:var(--white);}
        .blog-excerpt{font-size:0.88rem;color:var(--gray-light);line-height:1.6;margin-bottom:16px;}
        .blog-meta{display:flex;align-items:center;gap:16px;font-size:0.78rem;color:var(--gray-mid);flex-wrap:wrap;}
        .blog-meta-item{display:flex;align-items:center;gap:5px;}
        .blog-link{display:flex;align-items:center;gap:6px;color:var(--accent);font-size:0.85rem;font-weight:700;margin-top:16px;text-decoration:none;transition:var(--transition);}
        .blog-link:hover{gap:10px;}
        @media(max-width:1024px){.blog-grid{grid-template-columns:repeat(2,1fr);}}
        @media(max-width:640px){.blog-grid{grid-template-columns:1fr;}}
      `}</style>

      <section className="page-hero">
        <div className="page-hero-bg"><Image src="/images/buz_blog_hero.jpg" alt="BUZ Construction blog" fill style={{objectFit:'cover'}}/></div>
        <div className="page-hero-overlay"/>
        <div className="container page-hero-content">
          <div style={{display:'flex',alignItems:'center',gap:8,fontSize:'0.8rem',color:'var(--gray-dark)',marginBottom:16}}><Link href="/" style={{color:'var(--accent)',textDecoration:'none'}}>Home</Link> / Blog</div>
          <span className="section-tag">Insights & News</span>
          <h1 style={{fontFamily:'var(--font-heading)',fontSize:'clamp(2.5rem,5vw,4.5rem)',fontWeight:900,marginTop:12,marginBottom:20}}>Construction <span style={{color:'var(--accent)'}}>Insights</span></h1>
          <p style={{color:'var(--secondary)',fontSize:'1.1rem',maxWidth:520,lineHeight:1.7}}>Expert construction knowledge, industry news, and project inspiration from the BUZ Construction team.</p>
        </div>
      </section>

      <section className="section bg-dark"><div className="container">
        <div className="blog-grid">
          {posts.map(p=>(
            <article key={p.slug} className="blog-card">
              <div className="blog-img"><Image src={p.img} alt={p.title} fill style={{objectFit:'cover'}}/></div>
              <div className="blog-body">
                <span className="blog-cat" style={{background:`${catColors[p.cat]}20`,color:catColors[p.cat]}}>{p.cat}</span>
                <h2 className="blog-title">{p.title}</h2>
                <p className="blog-excerpt">{p.excerpt}</p>
                <div className="blog-meta">
                  <span className="blog-meta-item"><User size={12}/>{p.author}</span>
                  <span className="blog-meta-item"><Calendar size={12}/>{p.date}</span>
                  <span>{p.readTime}</span>
                </div>
                <Link href={`/blog/${p.slug}`} className="blog-link">Read Full Article <ArrowRight size={14}/></Link>
              </div>
            </article>
          ))}
        </div>
      </div></section>

      <section className="section" style={{background:'var(--secondary)',textAlign:'center'}}><div className="container">
        <h2 className="section-title" style={{color: 'var(--white)'}}>Subscribe to Our <span style={{color:'var(--accent)'}}>Newsletter</span></h2>
        <p style={{color:'var(--gray-light)',marginBottom:32,maxWidth:450,margin:'16px auto 32px'}}>Get construction insights, industry news, and BUZ project updates delivered to your inbox.</p>
        <div style={{display:'flex',gap:12,maxWidth:480,margin:'0 auto',flexWrap:'wrap',justifyContent:'center'}}>
          <input type="email" className="form-input" placeholder="Enter your email" style={{flex:1,minWidth:240}}/>
          <button className="btn btn-accent">Subscribe <ArrowRight size={16}/></button>
        </div>
      </div></section>
    </>
  )
}
