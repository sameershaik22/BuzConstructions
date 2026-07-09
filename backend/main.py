from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
import os

from app.database.database import engine, Base
from app.routes import leads, contact, projects, testimonials, google_reviews, team, jobs, blog, newsletter, admin

# Create all database tables
Base.metadata.create_all(bind=engine)

app = FastAPI(
    title="BUZ Construction Group Inc. API",
    description="Backend API for BUZ Construction Group Inc. website",
    version="1.0.0"
)

# CORS — allow frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000", "https://buzconstruction.ca"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Static files for resume uploads
os.makedirs("uploads", exist_ok=True)
app.mount("/uploads", StaticFiles(directory="uploads"), name="uploads")

# Include all routers
app.include_router(leads.router,          prefix="/api/leads",          tags=["Leads"])
app.include_router(contact.router,        prefix="/api/contact",        tags=["Contact"])
app.include_router(projects.router,       prefix="/api/projects",       tags=["Projects"])
app.include_router(testimonials.router,   prefix="/api/testimonials",   tags=["Testimonials"])
app.include_router(google_reviews.router, prefix="/api/google-reviews", tags=["Google Reviews"])
app.include_router(team.router,           prefix="/api/team",           tags=["Team"])
app.include_router(jobs.router,           prefix="/api/jobs",           tags=["Jobs"])
app.include_router(blog.router,           prefix="/api/blog",           tags=["Blog"])
app.include_router(newsletter.router,     prefix="/api/newsletter",     tags=["Newsletter"])
app.include_router(admin.router,          prefix="/api/admin",          tags=["Admin"])


@app.get("/")
def root():
    return {
        "company": "BUZ Construction Group Inc.",
        "api": "v1.0",
        "docs": "/docs",
        "status": "running"
    }
