from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.database.database import get_db
from app.models.models import NewsletterSubscriber
from app.schemas.schemas import NewsletterCreate

router = APIRouter()


@router.post("")
def subscribe(data: NewsletterCreate, db: Session = Depends(get_db)):
    existing = db.query(NewsletterSubscriber).filter(NewsletterSubscriber.email == data.email).first()
    if existing:
        return {"message": "Already subscribed!"}
    sub = NewsletterSubscriber(email=data.email, name=data.name)
    db.add(sub)
    db.commit()
    return {"message": "Successfully subscribed to our newsletter!"}
