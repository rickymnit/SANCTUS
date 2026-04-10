from sqlalchemy import Column, Integer, String, DateTime, Text, Boolean, Float
from sqlalchemy.sql import func
from app.core.database import Base


class GalleryImage(Base):
    __tablename__ = "gallery_images"
    
    id = Column(Integer, primary_key=True, index=True)
    url = Column(String(500), nullable=False)
    category = Column(String(100), nullable=False, index=True)
    title = Column(String(200), nullable=True)
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    
    def to_dict(self):
        return {
            "id": str(self.id),
            "url": self.url,
            "category": self.category,
            "title": self.title,
            "created_at": self.created_at.isoformat() if self.created_at else None,
        }


class Event(Base):
    __tablename__ = "events"
    
    id = Column(Integer, primary_key=True, index=True)
    title = Column(String(200), nullable=False)
    venue = Column(String(300), nullable=False)
    date = Column(DateTime(timezone=True), nullable=False)
    ticket_url = Column(String(500), nullable=True)
    image = Column(String(500), nullable=True)
    description = Column(Text, nullable=True)
    is_past = Column(Boolean, default=False)
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    
    def to_dict(self):
        return {
            "id": str(self.id),
            "title": self.title,
            "venue": self.venue,
            "date": self.date.isoformat() if self.date else None,
            "ticket_url": self.ticket_url,
            "image": self.image,
            "description": self.description,
            "is_past": self.is_past,
        }


class ContactSubmission(Base):
    __tablename__ = "contact_submissions"
    
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String(200), nullable=False)
    email = Column(String(300), nullable=False, index=True)
    phone = Column(String(50), nullable=True)
    event_type = Column(String(100), nullable=False)
    message = Column(Text, nullable=False)
    status = Column(String(50), default="new")  # new, read, replied
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    
    def to_dict(self):
        return {
            "id": str(self.id),
            "name": self.name,
            "email": self.email,
            "phone": self.phone,
            "event_type": self.event_type,
            "message": self.message,
            "status": self.status,
            "submitted_at": self.created_at.isoformat() if self.created_at else None,
        }


class Mix(Base):
    __tablename__ = "mixes"
    
    id = Column(Integer, primary_key=True, index=True)
    title = Column(String(200), nullable=False)
    description = Column(Text, nullable=True)
    duration = Column(String(50), nullable=True)
    image = Column(String(500), nullable=True)
    url = Column(String(500), nullable=False)
    color = Column(String(50), default="#00d4ff")
    order = Column(Integer, default=0)
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    
    def to_dict(self):
        return {
            "id": str(self.id),
            "title": self.title,
            "description": self.description,
            "duration": self.duration,
            "image": self.image,
            "url": self.url,
            "color": self.color,
        }
