from fastapi import APIRouter, Depends, Query
from sqlalchemy.orm import Session
from typing import Optional
from app.database.database import get_db
from app.models.models import ProjectGallery
from app.schemas.schemas import ProjectCreate, ProjectOut

router = APIRouter()


@router.get("", response_model=list[ProjectOut])
def get_projects(category: Optional[str] = Query(None), featured: Optional[bool] = Query(None), db: Session = Depends(get_db)):
    q = db.query(ProjectGallery)
    if category:
        q = q.filter(ProjectGallery.category == category)
    if featured is not None:
        q = q.filter(ProjectGallery.is_featured == featured)
    return q.order_by(ProjectGallery.created_at.desc()).all()


@router.get("/{project_id}", response_model=ProjectOut)
def get_project(project_id: int, db: Session = Depends(get_db)):
    project = db.query(ProjectGallery).filter(ProjectGallery.id == project_id).first()
    if not project:
        from fastapi import HTTPException
        raise HTTPException(status_code=404, detail="Project not found")
    return project
