from fastapi import APIRouter, Depends, Query
from sqlalchemy.orm import Session
from typing import Optional
from app.database.database import get_db
from app.models.models import BlogPost
from app.schemas.schemas import BlogPostOut

router = APIRouter()


@router.get("", response_model=list[BlogPostOut])
def get_posts(category: Optional[str] = Query(None), db: Session = Depends(get_db)):
    q = db.query(BlogPost).filter(BlogPost.is_published == True)
    if category:
        q = q.filter(BlogPost.category == category)
    return q.order_by(BlogPost.created_at.desc()).all()


@router.get("/{slug}", response_model=BlogPostOut)
def get_post(slug: str, db: Session = Depends(get_db)):
    from fastapi import HTTPException
    post = db.query(BlogPost).filter(BlogPost.slug == slug, BlogPost.is_published == True).first()
    if not post:
        raise HTTPException(status_code=404, detail="Post not found")
    return post
