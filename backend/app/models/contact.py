from pydantic import BaseModel, EmailStr
from datetime import datetime
from typing import Optional


class ContactForm(BaseModel):
    id: Optional[str] = None
    name: str
    email: EmailStr
    phone: Optional[str] = None
    event_type: str
    message: str
    submitted_at: Optional[datetime] = None
    status: str = "new"  # new, read, replied
