from sqlalchemy import Column, Integer, String, Float, ForeignKey, DateTime, Text, Boolean
from sqlalchemy.sql import func
from sqlalchemy.orm import relationship
from app.database.database import Base


class LeadInquiry(Base):
    __tablename__ = "lead_inquiries"

    id = Column(Integer, primary_key=True, index=True)
    form_type = Column(String, default="quote")  # "quote" | "consultation"
    name = Column(String, nullable=False)
    email = Column(String, nullable=False, index=True)
    phone = Column(String, nullable=True)
    service_type = Column(String, nullable=True)  # commercial/residential/renovation/pm/design-build
    project_description = Column(Text, nullable=True)
    budget_range = Column(String, nullable=True)
    timeline = Column(String, nullable=True)
    preferred_contact_date = Column(String, nullable=True)
    preferred_contact_method = Column(String, nullable=True)  # phone | email
    status = Column(String, default="new")  # new | contacted | converted
    admin_notes = Column(Text, nullable=True)
    created_at = Column(DateTime(timezone=True), server_default=func.now())


class ContactMessage(Base):
    __tablename__ = "contact_messages"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, nullable=False)
    email = Column(String, nullable=False)
    phone = Column(String, nullable=True)
    subject = Column(String, nullable=True)
    message = Column(Text, nullable=False)
    is_read = Column(Boolean, default=False)
    created_at = Column(DateTime(timezone=True), server_default=func.now())


class ProjectGallery(Base):
    __tablename__ = "project_gallery"

    id = Column(Integer, primary_key=True, index=True)
    title = Column(String, nullable=False)
    category = Column(String, nullable=False)  # commercial | residential | renovation | project-management | design-build
    description = Column(Text, nullable=True)
    location = Column(String, nullable=True)
    year_completed = Column(Integer, nullable=True)
    image_url = Column(String, nullable=True)
    before_image_url = Column(String, nullable=True)
    after_image_url = Column(String, nullable=True)
    is_featured = Column(Boolean, default=False)
    created_at = Column(DateTime(timezone=True), server_default=func.now())


class Testimonial(Base):
    __tablename__ = "testimonials"

    id = Column(Integer, primary_key=True, index=True)
    client_name = Column(String, nullable=False)
    client_title = Column(String, nullable=True)
    company = Column(String, nullable=True)
    rating = Column(Integer, default=5)
    review_text = Column(Text, nullable=False)
    project_type = Column(String, nullable=True)
    is_active = Column(Boolean, default=True)
    created_at = Column(DateTime(timezone=True), server_default=func.now())


class GoogleReview(Base):
    __tablename__ = "google_reviews"

    id = Column(Integer, primary_key=True, index=True)
    reviewer_name = Column(String, nullable=False)
    reviewer_avatar_url = Column(String, nullable=True)
    rating = Column(Integer, default=5)
    review_text = Column(Text, nullable=False)
    review_date = Column(String, nullable=True)
    google_review_id = Column(String, nullable=True)
    is_active = Column(Boolean, default=True)
    created_at = Column(DateTime(timezone=True), server_default=func.now())


class TeamMember(Base):
    __tablename__ = "team_members"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, nullable=False)
    title = Column(String, nullable=False)
    bio = Column(Text, nullable=True)
    image_url = Column(String, nullable=True)
    linkedin_url = Column(String, nullable=True)
    sort_order = Column(Integer, default=0)
    is_active = Column(Boolean, default=True)
    created_at = Column(DateTime(timezone=True), server_default=func.now())


class JobPosting(Base):
    __tablename__ = "job_postings"

    id = Column(Integer, primary_key=True, index=True)
    title = Column(String, nullable=False)
    department = Column(String, nullable=True)
    location = Column(String, nullable=True)
    job_type = Column(String, nullable=True)  # full-time | part-time | contract
    description = Column(Text, nullable=True)
    requirements = Column(Text, nullable=True)
    salary_range = Column(String, nullable=True)
    is_active = Column(Boolean, default=True)
    created_at = Column(DateTime(timezone=True), server_default=func.now())

    applications = relationship("JobApplication", back_populates="job")


class JobApplication(Base):
    __tablename__ = "job_applications"

    id = Column(Integer, primary_key=True, index=True)
    job_id = Column(Integer, ForeignKey("job_postings.id"), nullable=True)
    name = Column(String, nullable=False)
    email = Column(String, nullable=False)
    phone = Column(String, nullable=True)
    position_applied = Column(String, nullable=True)
    cover_letter = Column(Text, nullable=True)
    resume_filename = Column(String, nullable=True)
    status = Column(String, default="pending")  # pending | reviewed | hired | rejected
    created_at = Column(DateTime(timezone=True), server_default=func.now())

    job = relationship("JobPosting", back_populates="applications")


class BlogPost(Base):
    __tablename__ = "blog_posts"

    id = Column(Integer, primary_key=True, index=True)
    title = Column(String, nullable=False)
    slug = Column(String, unique=True, index=True)
    category = Column(String, nullable=True)
    excerpt = Column(Text, nullable=True)
    content = Column(Text, nullable=True)
    author = Column(String, nullable=True)
    image_url = Column(String, nullable=True)
    is_published = Column(Boolean, default=True)
    created_at = Column(DateTime(timezone=True), server_default=func.now())


class NewsletterSubscriber(Base):
    __tablename__ = "newsletter_subscribers"

    id = Column(Integer, primary_key=True, index=True)
    email = Column(String, unique=True, index=True, nullable=False)
    name = Column(String, nullable=True)
    is_active = Column(Boolean, default=True)
    created_at = Column(DateTime(timezone=True), server_default=func.now())


class AdminUser(Base):
    __tablename__ = "admin_users"

    id = Column(Integer, primary_key=True, index=True)
    username = Column(String, unique=True, index=True)
    email = Column(String, unique=True, index=True)
    password_hash = Column(String, nullable=False)
    is_active = Column(Boolean, default=True)
    created_at = Column(DateTime(timezone=True), server_default=func.now())
