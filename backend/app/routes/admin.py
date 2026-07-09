from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.database.database import get_db
from app.models.models import (
    AdminUser, LeadInquiry, ContactMessage, JobApplication,
    ProjectGallery, BlogPost, TeamMember, JobPosting, GoogleReview
)
from app.schemas.schemas import (
    AdminLogin, Token, AdminStats,
    LeadOut, LeadStatusUpdate, ContactOut,
    ProjectCreate, ProjectOut,
    BlogPostCreate, BlogPostOut,
    TeamMemberCreate, TeamMemberOut,
    JobPostingCreate, JobPostingOut,
    JobApplicationOut,
    GoogleReviewCreate, GoogleReviewOut,
    TestimonialCreate, TestimonialOut
)
from app.utils.auth import verify_password, hash_password, create_access_token, verify_token
from app.models.models import Testimonial
import os
from dotenv import load_dotenv

load_dotenv()
router = APIRouter()


# ─── Auth ────────────────────────────────────────────────────────────────────

@router.post("/login", response_model=Token)
def admin_login(credentials: AdminLogin, db: Session = Depends(get_db)):
    # Check env-based admin credentials
    env_user = os.getenv("ADMIN_USERNAME", "admin")
    env_pass = os.getenv("ADMIN_PASSWORD", "BuzAdmin2024!")
    if credentials.username == env_user and credentials.password == env_pass:
        token = create_access_token({"sub": credentials.username})
        return {"access_token": token, "token_type": "bearer"}
    # Check DB admin
    user = db.query(AdminUser).filter(AdminUser.username == credentials.username).first()
    if not user or not verify_password(credentials.password, user.password_hash):
        raise HTTPException(status_code=401, detail="Invalid credentials")
    token = create_access_token({"sub": user.username})
    return {"access_token": token, "token_type": "bearer"}


# ─── Stats ───────────────────────────────────────────────────────────────────

@router.get("/stats", response_model=AdminStats)
def get_stats(db: Session = Depends(get_db), _: str = Depends(verify_token)):
    return AdminStats(
        total_leads=db.query(LeadInquiry).count(),
        new_leads=db.query(LeadInquiry).filter(LeadInquiry.status == "new").count(),
        total_contacts=db.query(ContactMessage).count(),
        unread_contacts=db.query(ContactMessage).filter(ContactMessage.is_read == False).count(),
        total_applications=db.query(JobApplication).count(),
        pending_applications=db.query(JobApplication).filter(JobApplication.status == "pending").count(),
        total_projects=db.query(ProjectGallery).count(),
        total_blog_posts=db.query(BlogPost).count(),
    )


# ─── Leads ───────────────────────────────────────────────────────────────────

@router.get("/leads", response_model=list[LeadOut])
def admin_get_leads(db: Session = Depends(get_db), _: str = Depends(verify_token)):
    return db.query(LeadInquiry).order_by(LeadInquiry.created_at.desc()).all()


@router.patch("/leads/{lead_id}", response_model=LeadOut)
def admin_update_lead(lead_id: int, update: LeadStatusUpdate, db: Session = Depends(get_db), _: str = Depends(verify_token)):
    lead = db.query(LeadInquiry).filter(LeadInquiry.id == lead_id).first()
    if not lead:
        raise HTTPException(status_code=404, detail="Lead not found")
    if update.status:
        lead.status = update.status
    if update.admin_notes is not None:
        lead.admin_notes = update.admin_notes
    db.commit()
    db.refresh(lead)
    return lead


# ─── Contacts ────────────────────────────────────────────────────────────────

@router.get("/contacts", response_model=list[ContactOut])
def admin_get_contacts(db: Session = Depends(get_db), _: str = Depends(verify_token)):
    return db.query(ContactMessage).order_by(ContactMessage.created_at.desc()).all()


@router.patch("/contacts/{msg_id}")
def admin_mark_contact_read(msg_id: int, db: Session = Depends(get_db), _: str = Depends(verify_token)):
    msg = db.query(ContactMessage).filter(ContactMessage.id == msg_id).first()
    if not msg:
        raise HTTPException(status_code=404, detail="Not found")
    msg.is_read = True
    db.commit()
    return {"message": "Marked as read"}


# ─── Applications ────────────────────────────────────────────────────────────

@router.get("/applications", response_model=list[JobApplicationOut])
def admin_get_applications(db: Session = Depends(get_db), _: str = Depends(verify_token)):
    return db.query(JobApplication).order_by(JobApplication.created_at.desc()).all()


@router.patch("/applications/{app_id}")
def admin_update_application(app_id: int, status: str, db: Session = Depends(get_db), _: str = Depends(verify_token)):
    app = db.query(JobApplication).filter(JobApplication.id == app_id).first()
    if not app:
        raise HTTPException(status_code=404, detail="Not found")
    app.status = status
    db.commit()
    return {"message": "Updated"}


# ─── Projects CRUD ───────────────────────────────────────────────────────────

@router.get("/projects", response_model=list[ProjectOut])
def admin_get_projects(db: Session = Depends(get_db), _: str = Depends(verify_token)):
    return db.query(ProjectGallery).order_by(ProjectGallery.created_at.desc()).all()


@router.post("/projects", response_model=ProjectOut)
def admin_create_project(project: ProjectCreate, db: Session = Depends(get_db), _: str = Depends(verify_token)):
    db_proj = ProjectGallery(**project.dict())
    db.add(db_proj)
    db.commit()
    db.refresh(db_proj)
    return db_proj


@router.patch("/projects/{project_id}", response_model=ProjectOut)
def admin_update_project(project_id: int, project: ProjectCreate, db: Session = Depends(get_db), _: str = Depends(verify_token)):
    db_proj = db.query(ProjectGallery).filter(ProjectGallery.id == project_id).first()
    if not db_proj:
        raise HTTPException(status_code=404, detail="Not found")
    for k, v in project.dict().items():
        setattr(db_proj, k, v)
    db.commit()
    db.refresh(db_proj)
    return db_proj


@router.delete("/projects/{project_id}")
def admin_delete_project(project_id: int, db: Session = Depends(get_db), _: str = Depends(verify_token)):
    db_proj = db.query(ProjectGallery).filter(ProjectGallery.id == project_id).first()
    if not db_proj:
        raise HTTPException(status_code=404, detail="Not found")
    db.delete(db_proj)
    db.commit()
    return {"message": "Deleted"}


# ─── Blog CRUD ───────────────────────────────────────────────────────────────

@router.get("/blog", response_model=list[BlogPostOut])
def admin_get_blog(db: Session = Depends(get_db), _: str = Depends(verify_token)):
    return db.query(BlogPost).order_by(BlogPost.created_at.desc()).all()


@router.post("/blog", response_model=BlogPostOut)
def admin_create_post(post: BlogPostCreate, db: Session = Depends(get_db), _: str = Depends(verify_token)):
    db_post = BlogPost(**post.dict())
    db.add(db_post)
    db.commit()
    db.refresh(db_post)
    return db_post


@router.patch("/blog/{post_id}", response_model=BlogPostOut)
def admin_update_post(post_id: int, post: BlogPostCreate, db: Session = Depends(get_db), _: str = Depends(verify_token)):
    db_post = db.query(BlogPost).filter(BlogPost.id == post_id).first()
    if not db_post:
        raise HTTPException(status_code=404, detail="Not found")
    for k, v in post.dict().items():
        setattr(db_post, k, v)
    db.commit()
    db.refresh(db_post)
    return db_post


@router.delete("/blog/{post_id}")
def admin_delete_post(post_id: int, db: Session = Depends(get_db), _: str = Depends(verify_token)):
    db_post = db.query(BlogPost).filter(BlogPost.id == post_id).first()
    if not db_post:
        raise HTTPException(status_code=404, detail="Not found")
    db.delete(db_post)
    db.commit()
    return {"message": "Deleted"}


# ─── Google Reviews CRUD ─────────────────────────────────────────────────────

@router.get("/google-reviews", response_model=list[GoogleReviewOut])
def admin_get_reviews(db: Session = Depends(get_db), _: str = Depends(verify_token)):
    return db.query(GoogleReview).order_by(GoogleReview.created_at.desc()).all()


@router.post("/google-reviews", response_model=GoogleReviewOut)
def admin_create_review(review: GoogleReviewCreate, db: Session = Depends(get_db), _: str = Depends(verify_token)):
    db_review = GoogleReview(**review.dict())
    db.add(db_review)
    db.commit()
    db.refresh(db_review)
    return db_review


@router.delete("/google-reviews/{review_id}")
def admin_delete_review(review_id: int, db: Session = Depends(get_db), _: str = Depends(verify_token)):
    r = db.query(GoogleReview).filter(GoogleReview.id == review_id).first()
    if not r:
        raise HTTPException(status_code=404, detail="Not found")
    db.delete(r)
    db.commit()
    return {"message": "Deleted"}


# ─── Jobs CRUD ───────────────────────────────────────────────────────────────

@router.get("/jobs", response_model=list[JobPostingOut])
def admin_get_jobs(db: Session = Depends(get_db), _: str = Depends(verify_token)):
    return db.query(JobPosting).order_by(JobPosting.created_at.desc()).all()


@router.post("/jobs", response_model=JobPostingOut)
def admin_create_job(job: JobPostingCreate, db: Session = Depends(get_db), _: str = Depends(verify_token)):
    db_job = JobPosting(**job.dict())
    db.add(db_job)
    db.commit()
    db.refresh(db_job)
    return db_job


@router.patch("/jobs/{job_id}", response_model=JobPostingOut)
def admin_update_job(job_id: int, job: JobPostingCreate, db: Session = Depends(get_db), _: str = Depends(verify_token)):
    db_job = db.query(JobPosting).filter(JobPosting.id == job_id).first()
    if not db_job:
        raise HTTPException(status_code=404, detail="Not found")
    for k, v in job.dict().items():
        setattr(db_job, k, v)
    db.commit()
    db.refresh(db_job)
    return db_job


@router.delete("/jobs/{job_id}")
def admin_delete_job(job_id: int, db: Session = Depends(get_db), _: str = Depends(verify_token)):
    db_job = db.query(JobPosting).filter(JobPosting.id == job_id).first()
    if not db_job:
        raise HTTPException(status_code=404, detail="Not found")
    db.delete(db_job)
    db.commit()
    return {"message": "Deleted"}


# ─── Team CRUD ───────────────────────────────────────────────────────────────

@router.get("/team", response_model=list[TeamMemberOut])
def admin_get_team(db: Session = Depends(get_db), _: str = Depends(verify_token)):
    return db.query(TeamMember).order_by(TeamMember.sort_order).all()


@router.post("/team", response_model=TeamMemberOut)
def admin_create_team(member: TeamMemberCreate, db: Session = Depends(get_db), _: str = Depends(verify_token)):
    db_member = TeamMember(**member.dict())
    db.add(db_member)
    db.commit()
    db.refresh(db_member)
    return db_member


@router.delete("/team/{member_id}")
def admin_delete_team(member_id: int, db: Session = Depends(get_db), _: str = Depends(verify_token)):
    m = db.query(TeamMember).filter(TeamMember.id == member_id).first()
    if not m:
        raise HTTPException(status_code=404, detail="Not found")
    db.delete(m)
    db.commit()
    return {"message": "Deleted"}


# ─── Testimonials CRUD ───────────────────────────────────────────────────────

@router.get("/testimonials", response_model=list[TestimonialOut])
def admin_get_testimonials(db: Session = Depends(get_db), _: str = Depends(verify_token)):
    return db.query(Testimonial).order_by(Testimonial.created_at.desc()).all()


@router.post("/testimonials", response_model=TestimonialOut)
def admin_create_testimonial(t: TestimonialCreate, db: Session = Depends(get_db), _: str = Depends(verify_token)):
    db_t = Testimonial(**t.dict())
    db.add(db_t)
    db.commit()
    db.refresh(db_t)
    return db_t
