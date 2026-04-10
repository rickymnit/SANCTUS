from fastapi import APIRouter, HTTPException, UploadFile, File, Form, Depends
from typing import List, Optional
from sqlalchemy.orm import Session
from app.core.database import get_db
from app.models.db_models import GalleryImage as GalleryImageModel
from app.models.gallery import GalleryImage, GalleryCategory

router = APIRouter()

# Default categories
DEFAULT_CATEGORIES = [
    GalleryCategory(id="live-shows", name="Live Shows", description="Performance photos from live events"),
    GalleryCategory(id="crowd", name="Crowd", description="Energy from the dance floor"),
    GalleryCategory(id="studio", name="Studio", description="Behind the scenes in the studio"),
]


@router.get("/", response_model=List[GalleryImage])
async def get_gallery(category: Optional[str] = None, db: Session = Depends(get_db)):
    """Get all gallery images, optionally filtered by category"""
    query = db.query(GalleryImageModel)
    if category:
        query = query.filter(GalleryImageModel.category == category)
    images = query.order_by(GalleryImageModel.created_at.desc()).all()
    return [img.to_dict() for img in images]


@router.get("/categories", response_model=List[GalleryCategory])
async def get_categories():
    """Get all gallery categories"""
    return DEFAULT_CATEGORIES


@router.post("/admin/upload")
async def upload_image(
    file: UploadFile = File(...),
    category: str = Form(...),
    title: Optional[str] = Form(None),
    db: Session = Depends(get_db)
):
    """Upload a new gallery image (admin only)"""
    import os
    import shutil
    from app.core.config import get_settings
    
    settings = get_settings()
    os.makedirs(settings.UPLOAD_DIR, exist_ok=True)
    
    file_path = os.path.join(settings.UPLOAD_DIR, file.filename)
    with open(file_path, "wb") as buffer:
        shutil.copyfileobj(file.file, buffer)
    
    # Add to database
    db_image = GalleryImageModel(
        url=f"/uploads/{file.filename}",
        category=category,
        title=title or file.filename
    )
    db.add(db_image)
    db.commit()
    db.refresh(db_image)
    
    return db_image.to_dict()


@router.delete("/admin/{image_id}")
async def delete_image(image_id: int, db: Session = Depends(get_db)):
    """Delete a gallery image (admin only)"""
    image = db.query(GalleryImageModel).filter(GalleryImageModel.id == image_id).first()
    if not image:
        raise HTTPException(status_code=404, detail="Image not found")
    
    db.delete(image)
    db.commit()
    return {"message": "Image deleted successfully"}
