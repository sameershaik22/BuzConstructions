from fastapi import APIRouter, Depends, BackgroundTasks
from sqlalchemy.orm import Session
from app.database.database import get_db
from app.models.models import ContactMessage
from app.schemas.schemas import ContactCreate, ContactOut
from app.utils.email import notify_new_contact

router = APIRouter()


@router.post("", response_model=ContactOut)
def create_contact(contact: ContactCreate, background_tasks: BackgroundTasks, db: Session = Depends(get_db)):
    db_contact = ContactMessage(**contact.dict())
    db.add(db_contact)
    db.commit()
    db.refresh(db_contact)
    background_tasks.add_task(
        notify_new_contact,
        contact.name, contact.email, contact.subject or "", contact.message
    )
    return db_contact


@router.get("", response_model=list[ContactOut])
def get_contacts(db: Session = Depends(get_db)):
    return db.query(ContactMessage).order_by(ContactMessage.created_at.desc()).all()
