import Image from 'next/image'
import Link from 'next/link'
import Script from 'next/script'
import { notFound } from 'next/navigation'
import { ArrowLeft, Clock, User, Tag } from 'lucide-react'

const articles: Record<string, {
  title: string
  author: string
  date: string
  readTime: string
  category: string
  img: string
  actionImg: string
  intro: string
  sections: { heading: string; body: string }[]
  tips?: string[]
  conclusion: string
}> = {
  'construction-trends-ontario-2024': {
    title: 'Top 5 Construction Trends in Ontario for 2024',
    author: 'Bilal Khan',
    date: 'October 15, 2026',
    readTime: '6 min read',
    category: 'Industry News',
    img: '/images/buz_aerial_site.jpg',
    actionImg: '/images/buz_crew_action.jpg',
    intro: 'The Ontario construction industry is evolving faster than ever. From sustainable building practices to smart technology integration, 2024 is shaping up to be a transformative year for developers, contractors, and property owners alike. Here are the top five trends driving the industry forward.',
    sections: [
      {
        heading: '1. Mass Timber & Sustainable Construction',
        body: 'Ontario builders are increasingly turning to mass timber — engineered wood products like cross-laminated timber (CLT) — as a greener alternative to concrete and steel. Mass timber sequesters carbon, reduces construction timelines, and produces buildings with striking aesthetic appeal. Recent changes to the Ontario Building Code now permit mass timber structures up to 12 storeys, opening the door to a wave of mid-rise residential and commercial projects across the province.'
      },
      {
        heading: '2. Modular & Prefabricated Construction',
        body: 'Labour shortages and rising material costs are pushing Ontario contractors toward modular and prefabricated construction. By manufacturing building components off-site in controlled factory environments, builders can reduce waste by up to 30%, cut construction timelines significantly, and maintain consistent quality. In 2024, we are seeing modular construction move well beyond affordable housing into commercial offices, healthcare facilities, and luxury residential projects.'
      },
      {
        heading: '3. Smart Building Technology Integration',
        body: 'Modern buildings in Ontario are now expected to come equipped with smart systems from day one. This includes IoT-connected HVAC controls, automated lighting, integrated security systems, and energy management dashboards that give building owners real-time visibility into consumption. For commercial tenants and condo buyers, smart building features are no longer a luxury — they are a baseline expectation that directly impacts property values and lease rates.'
      },
      {
        heading: '4. Net-Zero Ready Design',
        body: "Ontario's updated energy codes are pushing developers to build to net-zero ready standards, meaning buildings must be highly energy efficient and capable of achieving net-zero performance with minimal future upgrades. This trend is driving strong demand for high-performance insulation, triple-pane glazing, heat recovery ventilation (HRV) systems, and rooftop solar readiness in both residential and commercial projects."
      },
      {
        heading: '5. Skilled Trades Shortage & Workforce Innovation',
        body: "Ontario faces a projected shortage of over 100,000 skilled trades workers by 2030. In response, forward-thinking contractors are investing heavily in apprenticeship programs, forming partnerships with trade schools, and exploring the use of construction robotics and AI-assisted scheduling tools to maximize the productivity of existing crews. At BUZ Construction, we have responded to this challenge by building our own in-house training program to develop the next generation of skilled tradespeople."
      }
    ],
    tips: [
      'Request your contractor\'s sustainability certifications before signing any contract',
      'Ask if your project can incorporate prefabricated elements to save time and cost',
      'Ensure your building spec includes smart-system conduit and wiring, even if you install systems later',
      'Review Ontario\'s 2024 Building Code updates with your architect before design starts'
    ],
    conclusion: 'The Ontario construction landscape in 2024 demands that owners, developers, and contractors stay ahead of these trends. At BUZ Construction Group Inc., we integrate the latest sustainable practices, technology, and workforce strategies into every project we deliver across the GTA and beyond.'
  },

  'design-build-saves-time-money': {
    title: 'How Design-Build Saves Time and Money',
    author: 'Sarah Kim',
    date: 'September 28, 2026',
    readTime: '5 min read',
    category: 'Services',
    img: '/images/buz_design_build.jpg',
    actionImg: '/images/buz_crew_action.jpg',
    intro: 'When it comes to delivering construction projects efficiently, the design-build delivery method has become one of the most popular choices for developers and property owners across Ontario. By combining architecture, design, and construction under a single contract and team, design-build reduces friction, eliminates gaps, and brings projects to completion faster and more cost-effectively than traditional methods.',
    sections: [
      {
        heading: 'What Is Design-Build?',
        body: "In a traditional design-bid-build project, an owner hires an architect separately, receives drawings, then puts the project out to general contractor bids. This process creates a natural adversarial relationship between the designer and builder — each protecting their own scope. Design-build eliminates this entirely by placing the architect/designer and the construction team under one unified contract. The owner has a single point of accountability for the entire project."
      },
      {
        heading: 'How It Saves Time',
        body: 'The biggest time savings in design-build come from overlapping phases. While the structural drawings are being finalized, the contractor can simultaneously begin site preparation, procure long-lead materials, and schedule trades. This phased, concurrent approach — called "fast-tracking" — can reduce overall project schedules by 20–30% compared to traditional sequential methods. For commercial tenants or homeowners eager to occupy their space, this time saving translates directly into revenue or reduced carrying costs.'
      },
      {
        heading: 'How It Saves Money',
        body: 'Design-build saves money in several important ways. First, the contractor\'s input during the design phase helps catch constructability issues and value engineering opportunities before they become expensive field changes. Second, because one team is responsible for both design and construction, there are far fewer costly change orders driven by design-builder conflicts. Studies consistently show design-build projects experience 6–10% lower overall costs than design-bid-build projects of comparable scope.'
      },
      {
        heading: 'Better Communication, Better Outcomes',
        body: 'With a single team managing design and construction, communication is dramatically streamlined. Owners attend fewer meetings, review fewer separate reports, and make decisions faster because the design and construction leads are already aligned. This unified communication structure also means problems get solved proactively rather than escalating into formal disputes between separate firms.'
      },
      {
        heading: 'Is Design-Build Right for Your Project?',
        body: 'Design-build works exceptionally well for commercial fit-outs, restaurant builds, medical clinics, warehouse conversions, and residential custom home construction. It is especially beneficial when schedule is a priority, when the owner wants a clear single point of contact, or when the project scope has elements that benefit from contractor input early in the design process.'
      }
    ],
    tips: [
      'Choose a design-build firm with in-house or closely integrated architectural resources',
      'Establish a clear project brief before starting — design-build moves fast and scope changes are costly',
      'Ask for references from past design-build clients specifically, not just general construction clients',
      'Review the design-build contract carefully — ensure it covers both design liability and construction warranty'
    ],
    conclusion: 'At BUZ Construction Group Inc., our Design-Build service has helped dozens of Ontario clients open their doors faster and under budget. If you have an upcoming project and want to explore whether design-build is the right fit, contact our team for a free consultation.'
  },

  'kitchen-renovation-guide-budget': {
    title: 'Kitchen Renovation Guide: Budget & Planning',
    author: 'Elena Rodriguez',
    date: 'August 20, 2026',
    readTime: '7 min read',
    category: 'Renovations',
    img: '/images/buz_kitchen_reno.jpg',
    actionImg: '/images/buz_action_kitchen.jpg',
    intro: "A kitchen renovation is one of the most impactful investments a homeowner can make — both for daily quality of life and for long-term property value. Ontario homeowners consistently see strong returns on kitchen upgrades, with mid-range renovations recovering 70–80% of their cost at resale. But without careful planning and budgeting, kitchen renos can quickly spiral beyond expectations. Here is a comprehensive guide to help you plan your kitchen renovation the right way.",
    sections: [
      {
        heading: 'Step 1: Define Your Budget',
        body: "In the Greater Toronto Area, kitchen renovation costs vary significantly based on scope and finish level. A basic refresh (new cabinet doors, countertops, hardware, and appliances) typically runs $25,000–$45,000. A mid-range renovation with new semi-custom cabinetry, quartz countertops, and updated plumbing and electrical runs $50,000–$90,000. A full luxury renovation with custom millwork, high-end appliances, and structural changes can exceed $120,000. Be realistic about your budget from day one — a good contractor will help you prioritize where to spend and where to save."
      },
      {
        heading: 'Step 2: Decide on Layout Early',
        body: 'The most expensive change in any kitchen renovation is moving plumbing. If you can maintain your existing sink, dishwasher, and refrigerator locations, you will save significant labour and material costs. However, if opening up the kitchen to adjacent living or dining spaces is a priority, budget carefully for load-bearing wall removal, new beams, and updated plumbing rough-ins. Discuss all layout changes with your contractor before finalizing your design.'
      },
      {
        heading: 'Step 3: Choose Your Cabinetry Wisely',
        body: "Cabinetry typically represents 30–40% of a kitchen renovation budget. Stock cabinets (pre-made, limited sizes) are the most affordable option. Semi-custom cabinets offer more size flexibility and finish options at a mid-range price point. Fully custom cabinetry — built to exact specifications by a local millwork shop — delivers the best quality and fit but commands the highest price. For most Ontario homeowners, semi-custom cabinetry from a reputable supplier represents the best balance of quality, customization, and value."
      },
      {
        heading: 'Step 4: Select Countertops for Durability and Style',
        body: 'Quartz is by far the most popular countertop choice in Ontario kitchens today — and for good reason. Engineered quartz is non-porous, highly resistant to stains and scratches, and comes in hundreds of styles that mimic natural stone. Natural quartzite and marble are stunning but require more sealing and maintenance. Porcelain slabs are an emerging option offering large format, ultra-durable surfaces. Budget $80–$150 per square foot installed for quality quartz countertops in the GTA.'
      },
      {
        heading: 'Step 5: Plan Your Appliance Package',
        body: "Appliances are often underbudgeted in kitchen renovations. A quality suite of kitchen appliances — refrigerator, range or cooktop with wall oven, dishwasher, and range hood — from reputable brands like Bosch, KitchenAid, or Miele can range from $8,000 to $30,000+. Factor in delivery, installation, and any electrical panel upgrades required to support new appliances (induction cooktops and double wall ovens often require dedicated 240V circuits)."
      },
      {
        heading: 'Step 6: Don\'t Underestimate Finishing Details',
        body: "Hardware, backsplash tile, lighting, and faucets are where a kitchen renovation truly comes to life — and where costs can quietly add up. Budget $2,000–$8,000 for a well-curated selection of hardware and fixtures. Lighting in particular is often overlooked: under-cabinet LED strips, pendant lights over an island, and good general lighting transform the feel of a kitchen and should be planned from the start with your electrician."
      }
    ],
    tips: [
      'Always get at least 3 written quotes from licensed contractors before committing',
      'Set aside a 15% contingency buffer for unexpected costs — especially in older homes',
      'Order cabinetry and appliances early — lead times in Ontario can be 8–16 weeks',
      'Confirm your contractor holds a valid Ontario contractor licence and WSIB coverage',
      'Visit a kitchen showroom to see materials in person before making final selections'
    ],
    conclusion: 'A well-planned kitchen renovation can dramatically improve both your daily life and your property value. At BUZ Construction Group Inc., our renovation team has completed hundreds of kitchen transformations across the GTA — from classic updates to full luxury overhauls. Contact us today for a free in-home consultation and detailed quote.'
  },

  'leed-certification-commercial': {
    title: 'Understanding LEED Certification for Commercial Buildings',
    author: 'James Osei',
    date: 'September 10, 2026',
    readTime: '7 min read',
    category: 'Commercial',
    img: '/images/buz_oakville_office.jpg',
    actionImg: '/images/buz_action_leed.jpg',
    intro: 'LEED (Leadership in Energy and Environmental Design) certification has become one of the most recognized standards for sustainable commercial building design in North America. For Ontario developers and tenants alike, LEED status signals environmental responsibility, operational efficiency, and long-term value. But what does LEED actually involve, and what does it cost to achieve?',
    sections: [
      {
        heading: 'What Is LEED Certification?',
        body: 'LEED is a third-party certification program administered by the Canada Green Building Council (CaGBC). Buildings are assessed across categories including energy efficiency, water use, materials, indoor air quality, and site selection. Points are accumulated and buildings are rated as Certified (40–49 points), Silver (50–59), Gold (60–79), or Platinum (80+). The vast majority of commercially significant LEED projects in Ontario target Gold certification.'
      },
      {
        heading: 'Why Ontario Tenants and Investors Care',
        body: 'LEED Gold and Platinum buildings in the GTA command lease rate premiums of 5–15% over comparable non-certified buildings. Major corporate tenants — especially in financial services, technology, and professional services — now routinely include LEED certification as a requirement in their real estate RFPs. For developers, LEED certification also opens access to green financing products with favorable interest rates from major Canadian lenders.'
      },
      {
        heading: 'Key Areas That Earn Points',
        body: 'Energy efficiency is typically the largest category, rewarding buildings for high-performance envelopes, efficient mechanical systems, and renewable energy integration. Water efficiency rewards low-flow fixtures and stormwater management. Materials credits reward recycled content, regional sourcing, and low-VOC products. Indoor environmental quality addresses ventilation rates, daylighting, and occupant comfort — all of which directly affect productivity and tenant retention.'
      },
      {
        heading: 'The Cost of LEED',
        body: 'A common misconception is that LEED certification dramatically increases construction costs. In reality, when LEED strategies are integrated into the design from the start — rather than bolted on at the end — the cost premium typically ranges from just 1–4% over conventional construction. The operational savings in energy and water costs, combined with the lease premium and financing benefits, almost always deliver a strong return on that additional investment within 5–7 years.'
      },
      {
        heading: 'Working With a LEED-Experienced Contractor',
        body: "Achieving LEED certification requires careful documentation throughout the construction process — tracking material sourcing, waste diversion rates, and indoor air quality management. Working with a general contractor who has direct LEED project experience is critical. At BUZ Construction, our project management team includes LEED-accredited professionals who maintain the documentation, coordinate commissioning, and interface with the CaGBC on your behalf."
      }
    ],
    tips: [
      'Engage your LEED consultant at schematic design stage — not after design is complete',
      'Prioritize energy modelling early to identify the most cost-effective efficiency measures',
      'Track all material submittals for recycled content and regional sourcing from day one',
      'Plan for enhanced commissioning — it is required for LEED and dramatically improves building performance'
    ],
    conclusion: 'LEED certification is no longer a niche consideration — it is increasingly a baseline expectation in Ontario commercial real estate. BUZ Construction Group Inc. has delivered LEED Gold projects across the GTA and is equipped to guide your project from design through certification.'
  },

  'custom-home-building-guide': {
    title: 'Custom Home Building: From Lot Purchase to Move-In',
    author: 'Bilal Khan',
    date: 'August 20, 2026',
    readTime: '10 min read',
    category: 'Residential',
    img: '/images/buz_luxury_home.jpg',
    actionImg: '/images/buz_action_customhome.jpg',
    intro: 'Building a custom home is the most personal construction project most people will ever undertake. Unlike buying a production home where you choose from pre-set floor plans and finishes, a custom home is designed and built specifically for you — your family, your lifestyle, your lot. In Ontario, the custom home building process involves multiple stages, numerous professionals, and critical decisions at every turn. This guide walks you through the entire journey.',
    sections: [
      {
        heading: 'Step 1: Secure Your Lot',
        body: "Before you can build, you need land. In the GTA, serviced lots in established neighbourhoods are rare and expensive — often $600,000 to over $1.5 million depending on location and size. When evaluating a lot, engage a lawyer to review the title, check zoning bylaws carefully, and confirm that municipal services (water, sewer, hydro, gas) are available. A preliminary soil test and survey are also strongly recommended before purchase. The lot's orientation, topography, and tree coverage will all influence your home design."
      },
      {
        heading: 'Step 2: Assemble Your Team',
        body: "A custom home project requires several key professionals: an architect or residential designer to create your drawings, a structural engineer to approve the structure, and a general contractor to build it. You may also want an interior designer for finishes and a landscape architect for your exterior. On design-build projects, BUZ Construction coordinates all of these disciplines under one contract, which streamlines communication and accountability significantly."
      },
      {
        heading: 'Step 3: Design Your Home',
        body: 'The design phase typically takes 3–6 months and involves schematic design (overall layout and massing), design development (refining floor plans, elevations, and key details), and construction documents (full drawings for permit and construction). Plan your budget carefully during this phase — changes made at the design stage cost almost nothing; the same change made during construction can cost thousands. Invest time in getting the design right before breaking ground.'
      },
      {
        heading: 'Step 4: Permits and Approvals',
        body: "In Ontario, a building permit is required for all new home construction. Your contractor or architect submits the permit application to the local municipality with a full set of drawings. Permit timelines vary: in the City of Toronto, expect 6–12 weeks; in surrounding municipalities, 4–8 weeks is more typical. If your project involves a minor variance (e.g., building closer to the lot line than zoning allows), plan for an additional 2–4 months for the Committee of Adjustment process."
      },
      {
        heading: 'Step 5: Construction',
        body: "Construction of a custom home in Ontario typically takes 12–18 months from groundbreaking to occupancy, depending on size and complexity. Key milestones include foundation and framing, rough-in of mechanical/electrical/plumbing, insulation and drywall, and finish trades (flooring, cabinetry, tile, painting, trim). Your contractor should provide a detailed construction schedule with clear milestones and regular site meetings to keep you informed and on track."
      },
      {
        heading: 'Step 6: Tarion Warranty',
        body: 'In Ontario, all new homes built by a registered builder must be enrolled with Tarion, the province\'s new home warranty program. Tarion provides statutory warranty coverage: 1 year for workmanship and materials defects, 2 years for mechanical systems, and 7 years for major structural defects. Ensure your builder is a registered Tarion builder before signing any contract.'
      }
    ],
    tips: [
      'Budget a realistic 15–20% contingency for a custom home — surprises always happen',
      'Visit the construction site weekly and document everything with photos',
      'Make all finish selections before construction starts to avoid costly delays',
      'Verify your builder\'s Tarion registration at ontario.ca/tarion before signing',
      'Understand the difference between a fixed-price and cost-plus contract before committing'
    ],
    conclusion: 'Building a custom home is a significant undertaking, but with the right team and thorough planning, it is one of the most rewarding investments you can make. BUZ Construction Group Inc. has guided dozens of Ontario families through the custom home building process — from initial lot evaluation to move-in day. Contact us to begin your journey.'
  },

  'construction-site-safety': {
    title: 'Construction Site Safety: Our Zero-Incident Commitment',
    author: 'Elena Rodriguez',
    date: 'July 28, 2026',
    readTime: '5 min read',
    category: 'Safety',
    img: '/images/buz_project_manager.jpg',
    actionImg: '/images/buz_crew_action.jpg',
    intro: "At BUZ Construction Group Inc., we operate with one non-negotiable principle: every worker who comes to our sites goes home safely. This is not a slogan — it is a cultural commitment that shapes every decision we make, from how we hire and train our crews to how we plan and execute every phase of construction. Here is an inside look at our comprehensive approach to construction site safety.",
    sections: [
      {
        heading: 'Our Safety Culture Starts at the Top',
        body: "Safety culture cannot be mandated from a policy manual — it must be modeled by leadership every single day. At BUZ Construction, our senior management team conducts regular unannounced site visits with a focus on safety observations. When leadership visibly prioritizes safety, it sends a clear signal to every worker and subcontractor on site that cutting corners is not acceptable, regardless of schedule pressure."
      },
      {
        heading: 'Pre-Construction Hazard Assessment',
        body: 'Before any BUZ Construction project breaks ground, our health and safety team conducts a thorough pre-construction hazard assessment. This process identifies site-specific risks — from soil contamination to underground utilities, traffic management challenges, and adjacent property considerations — and develops specific control measures for each. The output is a Site-Specific Safety Plan that is reviewed with every worker and subcontractor before they step on site.'
      },
      {
        heading: 'Daily Toolbox Talks',
        body: "Every morning on every BUZ Construction site begins with a toolbox talk — a 10–15 minute safety briefing led by the site superintendent. These brief meetings cover the day's work activities, associated hazards, required PPE, and any special procedures. They also provide an opportunity for workers to raise safety concerns in a comfortable, peer setting. Toolbox talk records are documented and retained as part of our project safety file."
      },
      {
        heading: 'Subcontractor Safety Qualification',
        body: 'BUZ Construction holds every subcontractor to the same safety standards we apply to our own crews. Before any new subcontractor is approved to work on our sites, they must submit their safety program for review, provide proof of current WSIB coverage and liability insurance, and demonstrate that their supervisors have completed the mandatory Ontario supervisor health and safety awareness training. We conduct regular subcontractor safety performance reviews throughout each project.'
      },
      {
        heading: 'Incident Reporting and Continuous Improvement',
        body: "We take a progressive approach to incident reporting. Near-misses and minor incidents are investigated with the same rigour as serious injuries — because near-misses are the warning signs of future serious incidents. Root cause analysis is completed for every incident, corrective actions are tracked to completion, and lessons learned are shared across all active project sites. This continuous improvement cycle is what drives our excellent safety record."
      }
    ],
    tips: [
      'Ask any contractor you hire for their WSIB clearance certificate and EMR (experience modification rate)',
      'Verify that your contractor has current liability insurance of at least $5 million',
      'Confirm that all workers on site have completed WHMIS 2015 and OHSA awareness training',
      'Ensure a site-specific emergency response plan is posted visibly on site before work begins'
    ],
    conclusion: 'Construction safety is not a cost — it is an investment that protects workers, owners, and projects. At BUZ Construction Group Inc., our zero-incident culture has delivered an outstanding safety record across hundreds of projects and millions of hours worked in Ontario. When you choose BUZ, you are choosing a contractor for whom safety is never a compromise.'
  }
}

export async function generateStaticParams() {
  return Object.keys(articles).map(slug => ({ slug }))
}

export default async function BlogArticlePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const article = articles[slug]
  if (!article) notFound()
  const relatedPosts = Object.entries(articles).filter(([key]) => key !== slug).slice(0, 2);

  return (
    <>
      <div className="progress-bar-container"><div id="progress-bar" className="progress-bar"></div></div>
      <Script id="progress-bar-script" strategy="lazyOnload">
        {`
          window.addEventListener('scroll', () => {
            const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
            const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
            const bar = document.getElementById('progress-bar');
            if (bar) bar.style.width = (winScroll / height) * 100 + '%';
          });
        `}
      </Script>
      <style>{`
        .article-hero { position: relative; height: 420px; background: var(--primary); padding-top: var(--nav-height); overflow: hidden; }
        .article-hero-img { position: absolute; inset: 0; }
        .article-hero-img img { width: 100%; height: 100%; object-fit: cover; opacity: 0.25; }
        .article-hero-overlay { position: absolute; inset: 0; background: linear-gradient(to top, rgba(10,22,40,1) 0%, rgba(10,22,40,0.6) 60%, transparent 100%); }
        .article-hero-content { position: absolute; bottom: 0; left: 0; right: 0; padding: 48px 0; }
        .article-meta { display: flex; align-items: center; gap: 20px; flex-wrap: wrap; margin-bottom: 16px; }
        .article-meta-item { display: flex; align-items: center; gap: 6px; font-size: 0.82rem; color: var(--gray-mid); }
        .article-title { font-family: var(--font-heading); font-size: clamp(2rem, 4vw, 3.2rem); font-weight: 900; line-height: 1.1; max-width: 820px; color: var(--white); }
        .article-body { max-width: 800px; margin: 0 auto; }
        .article-intro { font-size: 1.15rem; line-height: 1.8; color: var(--gray-dark); border-left: 4px solid var(--accent); padding-left: 24px; margin-bottom: 48px; }
        .article-section { margin-bottom: 40px; }
        .article-section h2 { font-family: var(--font-heading); font-size: 1.6rem; font-weight: 800; margin-bottom: 16px; color: var(--secondary); }
        .article-section p { font-size: 1rem; line-height: 1.8; color: var(--gray-dark); }
        .article-tips { background: var(--secondary); border: 1px solid rgba(245,166,35,0.2); border-radius: var(--radius-lg); padding: 28px 32px; margin: 40px 0; }
        .article-tips h3 { font-family: var(--font-heading); font-size: 1.3rem; color: var(--accent); margin-bottom: 16px; }
        .article-tips ul { display: flex; flex-direction: column; gap: 10px; }
        .article-tips li { display: flex; align-items: flex-start; gap: 10px; font-size: 0.95rem; color: var(--gray-light); line-height: 1.6; }
        .article-tips li::before { content: '✓'; color: var(--accent); font-weight: 700; flex-shrink: 0; margin-top: 2px; }
        .article-conclusion { background: linear-gradient(135deg, var(--secondary), var(--tertiary)); border-radius: var(--radius-lg); padding: 32px; margin-top: 48px; font-size: 1rem; line-height: 1.8; color: var(--gray-light); }
        .article-conclusion strong { color: var(--white); }
        .article-cta { background: var(--accent); border-radius: var(--radius-lg); padding: 40px; text-align: center; margin-top: 48px; }
        .article-cta h3 { font-family: var(--font-heading); font-size: 1.8rem; color: var(--primary); margin-bottom: 12px; }
        .article-cta p { color: rgba(10,22,40,0.75); margin-bottom: 24px; }
        .back-link { display: inline-flex; align-items: center; gap: 8px; color: var(--accent); font-size: 0.88rem; font-weight: 600; text-decoration: none; margin-bottom: 24px; transition: gap 0.2s ease; }
        .back-link:hover { gap: 12px; }
        .progress-bar-container { position: fixed; top: 0; left: 0; width: 100%; height: 4px; z-index: 9999; background: transparent; }
        .progress-bar { height: 100%; background: var(--accent); width: 0%; transition: width 0.1s ease; }
        .author-box { display: flex; align-items: center; gap: 20px; background: var(--white); border: 1px solid rgba(21,30,49,0.1); border-radius: var(--radius-lg); padding: 24px; margin-top: 48px; }
        .author-avatar { width: 60px; height: 60px; border-radius: 50%; background: rgba(245,166,35,0.1); display: flex; align-items: center; justify-content: center; flex-shrink: 0; }
        .author-name { font-family: var(--font-heading); font-size: 1.2rem; font-weight: 700; color: var(--secondary); margin-bottom: 4px; }
        .author-bio { font-size: 0.9rem; color: var(--gray-dark); line-height: 1.5; }
        .social-share { display: flex; align-items: center; gap: 16px; margin-top: 32px; padding-top: 32px; border-top: 1px solid rgba(21,30,49,0.1); }
        .share-label { font-size: 0.8rem; font-weight: 800; color: var(--gray-mid); text-transform: uppercase; letter-spacing: 0.1em; }
        .share-btn { display: flex; align-items: center; gap: 8px; font-size: 0.85rem; font-weight: 700; color: var(--secondary); background: rgba(21,30,49,0.05); border: 1px solid rgba(21,30,49,0.1); border-radius: 50px; padding: 6px 16px; cursor: pointer; transition: var(--transition); }
        .share-btn:hover { background: var(--accent); border-color: var(--accent); color: var(--primary); }
        .related-articles { margin-top: 60px; padding-top: 40px; border-top: 1px solid rgba(21,30,49,0.1); }
        .related-title { font-family: var(--font-heading); font-size: 1.8rem; font-weight: 800; color: var(--secondary); margin-bottom: 24px; }
        .related-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 24px; }
        .r-card { display: flex; flex-direction: column; background: var(--secondary); border-radius: var(--radius-md); overflow: hidden; text-decoration: none; transition: transform 0.2s; border: 1px solid rgba(255,255,255,0.05); }
        .r-card:hover { transform: translateY(-4px); border-color: rgba(245,166,35,0.3); }
        .r-img { height: 160px; position: relative; }
        .r-body { padding: 20px; }
        .r-cat { font-size: 0.7rem; font-weight: 700; color: var(--accent); text-transform: uppercase; letter-spacing: 0.1em; margin-bottom: 8px; display: block; }
        .r-title { font-family: var(--font-heading); font-size: 1.1rem; font-weight: 700; color: var(--white); line-height: 1.3; }
        @media(max-width: 640px) { .related-grid { grid-template-columns: 1fr; } .author-box { flex-direction: column; text-align: center; } }
        .article-toc { background: var(--white); border: 1px solid rgba(21,30,49,0.1); border-radius: var(--radius-md); padding: 24px; margin-bottom: 40px; box-shadow: var(--shadow-sm); }
        .toc-title { font-family: var(--font-heading); font-size: 1.1rem; font-weight: 800; color: var(--secondary); margin-bottom: 12px; text-transform: uppercase; letter-spacing: 0.05em; }
        .toc-list { list-style: none; padding: 0; margin: 0; display: flex; flex-direction: column; gap: 10px; }
        .toc-list a { color: var(--accent-dark); text-decoration: none; font-weight: 600; font-size: 0.95rem; transition: var(--transition); display: inline-block; }
        .toc-list a:hover { color: var(--primary); transform: translateX(4px); }
        .pull-quote { font-family: var(--font-heading); font-size: 1.6rem; font-weight: 700; color: var(--secondary); line-height: 1.5; padding: 32px 40px; margin: 48px 0; border-left: 6px solid var(--accent); background: rgba(245,166,35,0.05); position: relative; }
        .pull-quote::before { content: '"'; position: absolute; top: 10px; left: 16px; font-size: 4rem; color: rgba(245,166,35,0.2); font-family: serif; line-height: 1; }
        .inline-img { margin: 48px 0; }
        .img-caption { font-size: 0.85rem; color: var(--gray-mid); text-align: center; margin-top: 12px; font-style: italic; }
        .text-link { color: var(--accent-dark); font-weight: 700; text-decoration: underline; text-decoration-color: rgba(198,167,94,0.4); text-underline-offset: 4px; transition: var(--transition); }
        .text-link:hover { color: var(--primary); text-decoration-color: var(--primary); }
        .play-btn { position: absolute; top: calc(50% - 12px); left: 50%; transform: translate(-50%, -50%); width: 76px; height: 76px; background: var(--accent); border-radius: 50%; display: flex; align-items: center; justify-content: center; box-shadow: 0 8px 30px rgba(0,0,0,0.4); transition: transform 0.2s; }
        .inline-video-wrapper:hover .play-btn { transform: translate(-50%, -50%) scale(1.1); }
      `}</style>

      {/* Hero */}
      <header className="article-hero">
        <div className="article-hero-img">
          <Image src={article.img} alt={article.title} fill style={{ objectFit: 'cover' }} priority />
        </div>
        <div className="article-hero-overlay" />
        <div className="container article-hero-content">
          <span className="badge badge-accent" style={{ marginBottom: 16 }}>{article.category}</span>
          <h1 className="article-title">{article.title}</h1>
          <div className="article-meta" style={{ marginTop: 16 }}>
            <span className="article-meta-item"><User size={14} /> {article.author}</span>
            <span className="article-meta-item"><Clock size={14} /> {article.readTime}</span>
            <span className="article-meta-item"><Tag size={14} /> {article.date}</span>
          </div>
        </div>
      </header>

      {/* Body */}
      <section className="section bg-dark">
        <div className="container">
          <Link href="/blog" className="back-link"><ArrowLeft size={16} /> Back to Blog</Link>
          <article className="article-body">
            <p className="article-intro">{article.intro}</p>

            <div className="article-toc">
              <div className="toc-title">In This Article:</div>
              <ul className="toc-list">
                {article.sections.map((s, i) => (
                  <li key={i}><a href={`#section-${i}`}>{s.heading}</a></li>
                ))}
              </ul>
            </div>

            {article.sections.map((s, i) => {
              const bodyHtml = s.body
                .replace(/Ontario/g, '<span class="text-link">Ontario</span>')
                .replace(/GTA/g, '<span class="text-link">GTA</span>')
                .replace(/custom home/gi, '<a href="/services/residential" class="text-link">$&</a>')
                .replace(/commercial/gi, '<a href="/services/commercial" class="text-link">$&</a>')
                .replace(/renovation/gi, '<a href="/services/renovations" class="text-link">$&</a>');

              return (
                <div key={i} id={`section-${i}`} className="article-section">
                  <h2>{s.heading}</h2>
                  
                  {i === 1 && (
                    <blockquote className="pull-quote">
                      {s.body.split('.')[0]}.
                    </blockquote>
                  )}
                  
                  <p dangerouslySetInnerHTML={{ __html: bodyHtml }}></p>
                  
                  {i === 0 && (
                    <div className="inline-img">
                      <Image src={article.actionImg} alt="BUZ team on site" width={800} height={400} style={{ width: '100%', height: '400px', borderRadius: '8px', objectFit: 'cover', boxShadow: 'var(--shadow-md)' }} />
                      <div className="img-caption">Figure: The BUZ team actively bringing the project to life.</div>
                    </div>
                  )}

                  {i === 3 && (
                    <div className="inline-img">
                      <Image src={article.img} alt="Completed project" width={800} height={400} style={{ width: '100%', height: '400px', borderRadius: '8px', objectFit: 'cover', boxShadow: 'var(--shadow-md)' }} />
                      <div className="img-caption">Figure: Delivering world-class quality at every stage of the build.</div>
                    </div>
                  )}
                </div>
              );
            })}

            {article.tips && (
              <div className="article-tips">
                <h3>💡 Key Takeaways</h3>
                <ul>
                  {article.tips.map((tip, i) => (
                    <li key={i}>{tip}</li>
                  ))}
                </ul>
              </div>
            )}

            <div className="article-conclusion">
              {article.conclusion}
            </div>

            <div className="author-box">
              <div className="author-avatar"><User size={24} style={{ color: 'var(--accent)' }} /></div>
              <div className="author-info">
                <div className="author-name">Written by {article.author}</div>
                <div className="author-bio">Senior project manager and industry expert at BUZ Construction Group Inc., sharing insights on Ontario's evolving construction landscape.</div>
              </div>
            </div>

            <div className="social-share">
              <span className="share-label">Share Article:</span>
              <button className="share-btn">LinkedIn</button>
              <button className="share-btn">Twitter</button>
              <button className="share-btn">Facebook</button>
            </div>

            <div className="related-articles">
              <h3 className="related-title">More Insights</h3>
              <div className="related-grid">
                {relatedPosts.map(([key, post]) => (
                  <Link href={`/blog/${key}`} key={key} className="r-card">
                    <div className="r-img"><Image src={post.img} alt={post.title} fill style={{ objectFit: 'cover' }} /></div>
                    <div className="r-body">
                      <span className="r-cat">{post.category}</span>
                      <h4 className="r-title">{post.title}</h4>
                    </div>
                  </Link>
                ))}
              </div>
            </div>

            <div className="article-cta">
              <h3>Ready to Start Your Project?</h3>
              <p>Get a free, no-obligation consultation from Ontario's trusted general contractor.</p>
              <Link href="/contact" className="btn btn-lg" style={{ background: 'var(--primary)', color: 'var(--white)' }}>
                Get Free Quote →
              </Link>
            </div>
          </article>
        </div>
      </section>
    </>
  )
}
