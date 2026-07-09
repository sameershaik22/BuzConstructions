from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from app.database.database import get_db
from app.models.models import Testimonial
from app.schemas.schemas import TestimonialCreate, TestimonialOut

router = APIRouter()


@router.get("", response_model=list[TestimonialOut])
def get_testimonials(db: Session = Depends(get_db)):
    return db.query(Testimonial).filter(Testimonial.is_active == True).order_by(Testimonial.id.desc()).all()
