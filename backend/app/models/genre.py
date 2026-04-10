from pydantic import BaseModel
from typing import Optional


class Genre(BaseModel):
    id: str
    name: str
    description: str
    hero_image: str
    color: str
    tagline: str
