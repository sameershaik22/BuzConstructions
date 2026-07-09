from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from app.database.database import get_db
from app.models.models import GoogleReview
from app.schemas.schemas import GoogleReviewOut

router = APIRouter()


@router.get("", response_model=list[GoogleReviewOut])
def get_google_reviews(db: Session = Depends(get_db)):
    return db.query(GoogleReview).filter(GoogleReview.is_active == True).order_by(GoogleReview.id.desc()).all()
