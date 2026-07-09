from pydantic import BaseModel, EmailStr
from typing import Optional
from datetime import datetime


# ─── Lead / Quote / Consultation ────────────────────────────────────────────

class LeadCreate(BaseModel):
    form_type: str = "quote"  # "quote" | "consultation"
    name: str
    email: EmailStr
    phone: Optional[str] = None
    service_type: Optional[str] = None
    project_description: Optional[str] = None
    budget_range: Optional[str] = None
    timeline: Optional[str] = None
    preferred_contact_date: Optional[str] = None
    preferred_contact_method: Optional[str] = None

class LeadOut(LeadCreate):
    id: int
    status: str
    admin_notes: Optional[str] = None
    created_at: datetime
    class Config:
        from_attributes = True

class LeadStatusUpdate(BaseModel):
    status: Optional[str] = None
    admin_notes: Optional[str] = None


# ─── Contact Message ────────────────────────────────────────────────────────

class ContactCreate(BaseModel):
    name: str
    email: EmailStr
    phone: Optional[str] = None
    subject: Optional[str] = None
    message: str

class ContactOut(ContactCreate):
    id: int
    is_read: bool
    created_at: datetime
    class Config:
        from_attributes = True


# ─── Project Gallery ────────────────────────────────────────────────────────

class ProjectCreate(BaseModel):
    title: str
    category: str
    description: Optional[str] = None
    location: Optional[str] = None
    year_completed: Optional[int] = None
    image_url: Optional[str] = None
    before_image_url: Optional[str] = None
    after_image_url: Optional[str] = None
    is_featured: bool = False

class ProjectOut(ProjectCreate):
    id: int
    created_at: datetime
    class Config:
        from_attributes = True


# ─── Testimonial ─────────────────────────────────────────────────────────────

class TestimonialCreate(BaseModel):
    client_name: str
    client_title: Optional[str] = None
    company: Optional[str] = None
    rating: int = 5
    review_text: str
    project_type: Optional[str] = None
    is_active: bool = True

class TestimonialOut(TestimonialCreate):
    id: int
    created_at: datetime
    class Config:
        from_attributes = True


# ─── Google Review ───────────────────────────────────────────────────────────

class GoogleReviewCreate(BaseModel):
    reviewer_name: str
    reviewer_avatar_url: Optional[str] = None
    rating: int = 5
    review_text: str
    review_date: Optional[str] = None
    google_review_id: Optional[str] = None
    is_active: bool = True

class GoogleReviewOut(GoogleReviewCreate):
    id: int
    created_at: datetime
    class Config:
        from_attributes = True


# ─── Team Member ────────────────────────────────────────────────────────────

class TeamMemberCreate(BaseModel):
    name: str
    title: str
    bio: Optional[str] = None
    image_url: Optional[str] = None
    linkedin_url: Optional[str] = None
    sort_order: int = 0
    is_active: bool = True

class TeamMemberOut(TeamMemberCreate):
    id: int
    created_at: datetime
    class Config:
        from_attributes = True


# ─── Job Posting ─────────────────────────────────────────────────────────────

class JobPostingCreate(BaseModel):
    title: str
    department: Optional[str] = None
    location: Optional[str] = None
    job_type: Optional[str] = None
    description: Optional[str] = None
    requirements: Optional[str] = None
    salary_range: Optional[str] = None
    is_active: bool = True

class JobPostingOut(JobPostingCreate):
    id: int
    created_at: datetime
    class Config:
        from_attributes = True


# ─── Job Application ─────────────────────────────────────────────────────────

class JobApplicationCreate(BaseModel):
    job_id: Optional[int] = None
    name: str
    email: EmailStr
    phone: Optional[str] = None
    position_applied: Optional[str] = None
    cover_letter: Optional[str] = None

class JobApplicationOut(JobApplicationCreate):
    id: int
    resume_filename: Optional[str] = None
    status: str
    created_at: datetime
    class Config:
        from_attributes = True


# ─── Blog Post ───────────────────────────────────────────────────────────────

class BlogPostCreate(BaseModel):
    title: str
    slug: str
    category: Optional[str] = None
    excerpt: Optional[str] = None
    content: Optional[str] = None
    author: Optional[str] = None
    image_url: Optional[str] = None
    is_published: bool = True

class BlogPostOut(BlogPostCreate):
    id: int
    created_at: datetime
    class Config:
        from_attributes = True


# ─── Newsletter ───────────────────────────────────────────────────────────────

class NewsletterCreate(BaseModel):
    email: EmailStr
    name: Optional[str] = None


# ─── Admin Auth ───────────────────────────────────────────────────────────────

class AdminLogin(BaseModel):
    username: str
    password: str

class Token(BaseModel):
    access_token: str
    token_type: str

class AdminStats(BaseModel):
    total_leads: int
    new_leads: int
    total_contacts: int
    unread_contacts: int
    total_applications: int
    pending_applications: int
    total_projects: int
    total_blog_posts: int
