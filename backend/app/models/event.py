from pydantic import BaseModel
from datetime import datetime
from typing import Optional


class Event(BaseModel):
    id: str
    title: str
    venue: str
    date: datetime
    ticket_url: Optional[str] = None
    image: Optional[str] = None
    description: Optional[str] = None
    is_past: bool = False
