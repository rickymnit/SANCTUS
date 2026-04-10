from pydantic import BaseModel
from datetime import datetime
from typing import Optional


class GalleryImage(BaseModel):
    id: str
    url: str
    category: str
    title: Optional[str] = None
    created_at: datetime


class GalleryCategory(BaseModel):
    id: str
    name: str
    description: str
