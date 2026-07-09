from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from app.database.database import get_db
from app.models.models import TeamMember
from app.schemas.schemas import TeamMemberOut

router = APIRouter()


@router.get("", response_model=list[TeamMemberOut])
def get_team(db: Session = Depends(get_db)):
    return db.query(TeamMember).filter(TeamMember.is_active == True).order_by(TeamMember.sort_order).all()
