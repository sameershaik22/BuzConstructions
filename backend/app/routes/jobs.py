from fastapi import APIRouter, Depends, BackgroundTasks, UploadFile, File, Form
from sqlalchemy.orm import Session
from typing import Optional
import aiofiles, os
from app.database.database import get_db
from app.models.models import JobPosting, JobApplication
from app.schemas.schemas import JobPostingOut, JobApplicationOut
from app.utils.email import notify_new_application

router = APIRouter()

UPLOAD_DIR = "uploads/resumes"
os.makedirs(UPLOAD_DIR, exist_ok=True)


@router.get("", response_model=list[JobPostingOut])
def get_jobs(db: Session = Depends(get_db)):
    return db.query(JobPosting).filter(JobPosting.is_active == True).order_by(JobPosting.created_at.desc()).all()


@router.get("/{job_id}", response_model=JobPostingOut)
def get_job(job_id: int, db: Session = Depends(get_db)):
    from fastapi import HTTPException
    job = db.query(JobPosting).filter(JobPosting.id == job_id).first()
    if not job:
        raise HTTPException(status_code=404, detail="Job not found")
    return job


@router.post("/{job_id}/apply")
async def apply_for_job(
    job_id: int,
    background_tasks: BackgroundTasks,
    name: str = Form(...),
    email: str = Form(...),
    phone: Optional[str] = Form(None),
    position_applied: Optional[str] = Form(None),
    cover_letter: Optional[str] = Form(None),
    resume: Optional[UploadFile] = File(None),
    db: Session = Depends(get_db)
):
    resume_filename = None
    if resume and resume.filename:
        resume_filename = f"{name.replace(' ','_')}_{resume.filename}"
        async with aiofiles.open(os.path.join(UPLOAD_DIR, resume_filename), "wb") as f:
            await f.write(await resume.read())

    application = JobApplication(
        job_id=job_id if job_id > 0 else None,
        name=name, email=email, phone=phone,
        position_applied=position_applied, cover_letter=cover_letter,
        resume_filename=resume_filename
    )
    db.add(application)
    db.commit()
    background_tasks.add_task(notify_new_application, name, email, position_applied or "General Application")
    return {"message": "Application submitted successfully", "id": application.id}
