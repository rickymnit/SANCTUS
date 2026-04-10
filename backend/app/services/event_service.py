import json
import os
import uuid
from datetime import datetime
from typing import List
from app.models.event import Event
from app.core.config import get_settings

settings = get_settings()

DATA_FILE = os.path.join(settings.DATA_DIR, "events.json")

# Ensure data directory exists
os.makedirs(settings.DATA_DIR, exist_ok=True)

# Default events data
DEFAULT_EVENTS = [
    {
        "id": "1",
        "title": "Neon Nights Festival",
        "venue": "Jaipur Club",
        "date": "2024-12-31T22:00:00",
        "ticket_url": "#",
        "image": "/assets/onedeck.jpeg",
        "description": "New Year's Eve special with Drum & Bass and House music",
        "is_past": False
    },
    {
        "id": "2",
        "title": "Underground Sessions",
        "venue": "The Warehouse",
        "date": "2024-11-15T21:00:00",
        "ticket_url": "#",
        "image": "/assets/1.jpeg",
        "description": "Deep House and Techno all night long",
        "is_past": True
    },
]


def _load_data():
    """Load events data from JSON file"""
    if not os.path.exists(DATA_FILE):
        return {"events": DEFAULT_EVENTS}
    with open(DATA_FILE, 'r') as f:
        return json.load(f)


def _save_data(data):
    """Save events data to JSON file"""
    with open(DATA_FILE, 'w') as f:
        json.dump(data, f, indent=2)


def get_all_events() -> List[Event]:
    """Get all events sorted by date"""
    data = _load_data()
    events = data.get("events", [])
    # Sort by date, newest first
    events.sort(key=lambda x: x["date"], reverse=True)
    return [Event(**event) for event in events]


def get_upcoming_events() -> List[Event]:
    """Get upcoming events"""
    events = get_all_events()
    now = datetime.now()
    return [e for e in events if not e.is_past and e.date > now]


def get_past_events() -> List[Event]:
    """Get past events"""
    events = get_all_events()
    now = datetime.now()
    return [e for e in events if e.is_past or e.date < now]


def create_event(event_data: dict) -> Event:
    """Create a new event"""
    data = _load_data()
    
    new_event = {
        "id": str(uuid.uuid4()),
        "title": event_data["title"],
        "venue": event_data["venue"],
        "date": event_data["date"],
        "ticket_url": event_data.get("ticket_url"),
        "image": event_data.get("image"),
        "description": event_data.get("description"),
        "is_past": event_data.get("is_past", False)
    }
    
    data["events"].append(new_event)
    _save_data(data)
    
    return Event(**new_event)


def delete_event(event_id: str) -> bool:
    """Delete an event"""
    data = _load_data()
    original_count = len(data["events"])
    data["events"] = [e for e in data["events"] if e["id"] != event_id]
    
    if len(data["events"]) < original_count:
        _save_data(data)
        return True
    return False
