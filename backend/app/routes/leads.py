from fastapi import APIRouter, Depends, HTTPException, BackgroundTasks
from sqlalchemy.orm import Session
from app.database.database import get_db
from app.models.models import LeadInquiry
from app.schemas.schemas import LeadCreate, LeadOut
from app.utils.email import notify_new_lead

router = APIRouter()


@router.post("", response_model=LeadOut)
def create_lead(lead: LeadCreate, background_tasks: BackgroundTasks, db: Session = Depends(get_db)):
    db_lead = LeadInquiry(**lead.dict())
    db.add(db_lead)
    db.commit()
    db.refresh(db_lead)
    background_tasks.add_task(
        notify_new_lead,
        lead.name, lead.email, lead.phone or "",
        lead.form_type, lead.service_type or ""
    )
    return db_lead


@router.get("", response_model=list[LeadOut])
def get_leads(db: Session = Depends(get_db)):
    return db.query(LeadInquiry).order_by(LeadInquiry.created_at.desc()).all()
