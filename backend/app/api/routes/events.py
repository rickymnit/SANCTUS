from fastapi import APIRouter, HTTPException, Depends
from typing import List
from datetime import datetime
from sqlalchemy.orm import Session
from app.core.database import get_db
from app.models.db_models import Event as EventModel
from app.models.event import Event

router = APIRouter()


@router.get("/", response_model=List[Event])
async def get_events(upcoming: bool = False, past: bool = False, db: Session = Depends(get_db)):
    """Get all events. Use 'upcoming=true' or 'past=true' to filter."""
    query = db.query(EventModel)
    
    if upcoming:
        query = query.filter(EventModel.is_past == False, EventModel.date >= datetime.now())
    elif past:
        query = query.filter((EventModel.is_past == True) | (EventModel.date < datetime.now()))
    
    events = query.order_by(EventModel.date.desc()).all()
    return [event.to_dict() for event in events]


@router.post("/admin/")
async def create_event(event_data: dict, db: Session = Depends(get_db)):
    """Create a new event (admin only)"""
    from datetime import datetime
    
    db_event = EventModel(
        title=event_data["title"],
        venue=event_data["venue"],
        date=datetime.fromisoformat(event_data["date"].replace('Z', '+00:00')),
        ticket_url=event_data.get("ticket_url"),
        image=event_data.get("image"),
        description=event_data.get("description"),
        is_past=event_data.get("is_past", False)
    )
    db.add(db_event)
    db.commit()
    db.refresh(db_event)
    return db_event.to_dict()


@router.delete("/admin/{event_id}")
async def delete_event(event_id: int, db: Session = Depends(get_db)):
    """Delete an event (admin only)"""
    event = db.query(EventModel).filter(EventModel.id == event_id).first()
    if not event:
        raise HTTPException(status_code=404, detail="Event not found")
    
    db.delete(event)
    db.commit()
    return {"message": "Event deleted successfully"}
