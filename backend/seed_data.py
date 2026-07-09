"""
Seed script — populates BUZ Construction database with sample data.
Run: python seed_data.py
"""
import sys, os
sys.path.append(os.path.dirname(__file__))

from app.database.database import SessionLocal, engine, Base
from app.models.models import (
    ProjectGallery, Testimonial, GoogleReview, TeamMember,
    JobPosting, BlogPost
)

Base.metadata.create_all(bind=engine)
db = SessionLocal()

# ─── Projects ────────────────────────────────────────────────────────────────
projects = [
    ProjectGallery(title="Oakville Corporate Centre", category="commercial",
        description="6-storey Class-A office building with 120,000 sq ft of premium commercial space. Completed on time and 5% under budget.",
        location="Oakville, ON", year_completed=2023,
        image_url="/images/portfolio_commercial_1781694443603.png", is_featured=True),
    ProjectGallery(title="The Meridian Luxury Estate", category="residential",
        description="Custom 8,500 sq ft luxury estate with 6 bedrooms, home theatre, wine cellar, and resort-style pool.",
        location="Mississauga, ON", year_completed=2023,
        image_url="/images/portfolio_residential_1781694457475.png", is_featured=True),
    ProjectGallery(title="Ember & Oak Restaurant", category="renovation",
        description="Complete restaurant fit-out including custom millwork, commercial kitchen, HVAC, and luxury dining room.",
        location="Toronto, ON", year_completed=2024,
        image_url="/images/portfolio_restaurant_1781694478723.png", is_featured=True),
    ProjectGallery(title="Westbrook Industrial Park", category="commercial",
        description="200,000 sq ft industrial warehouse and distribution centre with dock doors, mezzanine, and office buildout.",
        location="Brampton, ON", year_completed=2022,
        image_url="/images/commercial_office_1781694315339.png", is_featured=False),
    ProjectGallery(title="Hillcrest Custom Home", category="residential",
        description="Modern farmhouse-style custom home, 5,200 sq ft, open-concept, chef's kitchen, and 3-car garage.",
        location="Burlington, ON", year_completed=2024,
        image_url="/images/residential_luxury_home_1781694338229.png", is_featured=False),
    ProjectGallery(title="Hamilton City Hall Renovation", category="project-management",
        description="Full PM services for 40,000 sq ft heritage building renovation. On-time delivery with zero safety incidents.",
        location="Hamilton, ON", year_completed=2023,
        image_url="/images/project_management_1781694373963.png", is_featured=False),
    ProjectGallery(title="GreenSpace Medical Clinic", category="design-build",
        description="Design-build delivery of 12,000 sq ft medical clinic from concept to occupancy in 8 months.",
        location="Vaughan, ON", year_completed=2024,
        image_url="/images/design_build_1781694386091.png", is_featured=False),
]
for p in projects:
    db.add(p)

# ─── Testimonials ─────────────────────────────────────────────────────────────
testimonials = [
    Testimonial(client_name="Michael Chen", client_title="CEO", company="Nexus Properties Group",
        rating=5, review_text="BUZ Construction delivered our office complex 2 weeks ahead of schedule and $300K under budget. Their professionalism and craftsmanship are unmatched in the GTA.", project_type="commercial"),
    Testimonial(client_name="Sarah & David Thompson", client_title="Homeowners",
        rating=5, review_text="From the first design meeting to the final walkthrough, BUZ exceeded every expectation. Our dream home is everything we imagined and more.", project_type="residential"),
    Testimonial(client_name="James Okafor", client_title="Director of Facilities", company="RetailFirst Canada",
        rating=5, review_text="We've hired BUZ for 3 tenant improvement projects. They're our go-to contractor — always reliable, transparent, and they deliver quality every time.", project_type="commercial"),
    Testimonial(client_name="Amanda Reyes", client_title="Owner", company="Ember & Oak Restaurant",
        rating=5, review_text="The BUZ team transformed our restaurant vision into reality. The craftsmanship is stunning — our guests compliment the space every single night.", project_type="renovation"),
    Testimonial(client_name="Robert & Linda Park", client_title="Homeowners",
        rating=5, review_text="BUZ completed our full basement renovation and kitchen remodel. The quality of work is exceptional. They're honest, clean, and professional.", project_type="renovation"),
    Testimonial(client_name="Patricia Williams", client_title="VP Operations", company="Greenfield Development Corp",
        rating=5, review_text="The design-build approach BUZ used for our clinic saved us 15% on costs and 3 months on timeline. Exceptional team, exceptional results.", project_type="design-build"),
]
for t in testimonials:
    db.add(t)

# ─── Google Reviews ───────────────────────────────────────────────────────────
google_reviews = [
    GoogleReview(reviewer_name="Marcus D.", rating=5,
        review_text="Used BUZ for a full kitchen and bathroom renovation. The team was incredibly professional, clean, and communicative throughout. The result is absolutely stunning.",
        review_date="November 2024"),
    GoogleReview(reviewer_name="Priya S.", rating=5,
        review_text="BUZ built our custom home in Burlington. They guided us through every decision with patience and expertise. Finished on time, on budget. 10/10 would recommend.",
        review_date="October 2024"),
    GoogleReview(reviewer_name="Tom W.", rating=5,
        review_text="We hired BUZ for a major commercial fit-out. Outstanding project management, superior quality of work. They will be our contractor for all future builds.",
        review_date="September 2024"),
    GoogleReview(reviewer_name="Laura K.", rating=5,
        review_text="Extremely happy with our basement renovation. The crew was respectful of our home and the finished product looks incredible. Fair pricing and great communication.",
        review_date="August 2024"),
    GoogleReview(reviewer_name="Brian O.", rating=5,
        review_text="BUZ Construction managed our Vaughan warehouse project from start to finish. They delivered on every promise. Trustworthy, skilled, and professional.",
        review_date="July 2024"),
]
for r in google_reviews:
    db.add(r)

# ─── Team Members ─────────────────────────────────────────────────────────────
team = [
    TeamMember(name="Marcus Bouzari", title="President & CEO", sort_order=1,
        bio="25+ years of experience in commercial and residential construction across Ontario. Marcus founded BUZ with a vision to Build, Unite, and Zeal.",
        image_url="/images/team_crew_1781694406323.png"),
    TeamMember(name="Elena Rodriguez", title="VP of Operations", sort_order=2,
        bio="Elena oversees all project delivery, safety compliance, and subcontractor relationships. 18 years of construction management experience.",
        image_url="/images/team_crew_1781694406323.png"),
    TeamMember(name="James Osei", title="Chief Estimator", sort_order=3,
        bio="James leads our estimating and preconstruction services, delivering accurate, competitive bids for commercial and residential projects.",
        image_url="/images/team_crew_1781694406323.png"),
    TeamMember(name="Sarah Kim", title="Lead Architect & Design-Build Director", sort_order=4,
        bio="Sarah heads our design-build division, bridging the gap between architectural vision and construction execution.",
        image_url="/images/team_crew_1781694406323.png"),
]
for m in team:
    db.add(m)

# ─── Job Postings ─────────────────────────────────────────────────────────────
jobs = [
    JobPosting(title="Senior Project Manager", department="Operations", location="Mississauga, ON",
        job_type="Full-Time",
        description="Lead commercial construction projects from preconstruction through closeout. Manage teams, budgets, schedules, and client relationships.",
        requirements="5+ years construction PM experience. PMP designation preferred. Experience with commercial projects $5M+.",
        salary_range="$90,000 – $120,000"),
    JobPosting(title="Site Superintendent", department="Field Operations", location="GTA Area",
        job_type="Full-Time",
        description="Oversee day-to-day site operations, coordinate subcontractors, and ensure safety compliance on active construction sites.",
        requirements="7+ years field experience. Gold Seal Certification preferred. Strong leadership and communication skills.",
        salary_range="$80,000 – $105,000"),
    JobPosting(title="Estimator / Preconstruction Manager", department="Estimating", location="Mississauga, ON",
        job_type="Full-Time",
        description="Prepare detailed cost estimates for commercial and residential projects. Manage tender processes and vendor relationships.",
        requirements="3+ years estimating experience in construction. Proficiency in estimation software.",
        salary_range="$75,000 – $95,000"),
    JobPosting(title="Carpenter / Millwork Specialist", department="Trades", location="GTA Area",
        job_type="Full-Time",
        description="Perform rough and finish carpentry, custom millwork, and cabinetry installation on residential and commercial projects.",
        requirements="Red Seal Carpenter certification preferred. 3+ years experience.",
        salary_range="$28 – $38/hour"),
    JobPosting(title="Project Coordinator", department="Operations", location="Mississauga, ON",
        job_type="Full-Time",
        description="Support project managers with scheduling, documentation, RFIs, submittals, and subcontractor coordination.",
        requirements="1-3 years construction coordination experience. Procore or similar PM software experience.",
        salary_range="$55,000 – $70,000"),
]
for j in jobs:
    db.add(j)

# ─── Blog Posts ───────────────────────────────────────────────────────────────
posts = [
    BlogPost(title="Top 5 Construction Trends in Ontario for 2024",
        slug="construction-trends-ontario-2024",
        category="Industry News",
        excerpt="From mass timber to net-zero construction, Ontario's building industry is evolving rapidly. Here's what to watch in 2024.",
        content="The Ontario construction industry is experiencing unprecedented growth and innovation...",
        author="Marcus Bouzari",
        image_url="/images/hero_construction_1781694281260.png",
        is_published=True),
    BlogPost(title="How Design-Build Saves Time and Money on Your Project",
        slug="design-build-saves-time-money",
        category="Services",
        excerpt="The design-build delivery method is changing how Ontario developers approach commercial and residential construction.",
        content="Traditional design-bid-build projects often suffer from miscommunication between architects and contractors...",
        author="Sarah Kim",
        image_url="/images/design_build_1781694386091.png",
        is_published=True),
    BlogPost(title="Kitchen Renovation Guide: What to Expect and How to Budget",
        slug="kitchen-renovation-guide-budget",
        category="Renovations",
        excerpt="Thinking about renovating your kitchen? Here's your complete guide to planning, budgeting, and executing a successful kitchen renovation.",
        content="A kitchen renovation is one of the most impactful home improvements you can make...",
        author="Elena Rodriguez",
        image_url="/images/kitchen_renovation_1781694354275.png",
        is_published=True),
]
for p in posts:
    db.add(p)

db.commit()
db.close()
print("SUCCESS: Database seeded successfully!")
print("   Projects: 7 | Testimonials: 6 | Google Reviews: 5 | Team: 4 | Jobs: 5 | Blog: 3")
