import json
import os
import uuid
from datetime import datetime
from typing import List
from app.models.contact import ContactForm
from app.core.config import get_settings

settings = get_settings()

DATA_FILE = os.path.join(settings.DATA_DIR, "contacts.json")

# Ensure data directory exists
os.makedirs(settings.DATA_DIR, exist_ok=True)


def _load_data():
    """Load contact submissions from JSON file"""
    if not os.path.exists(DATA_FILE):
        return {"submissions": []}
    with open(DATA_FILE, 'r') as f:
        return json.load(f)


def _save_data(data):
    """Save contact submissions to JSON file"""
    with open(DATA_FILE, 'w') as f:
        json.dump(data, f, indent=2)


def get_all_submissions() -> List[ContactForm]:
    """Get all contact form submissions"""
    data = _load_data()
    submissions = data.get("submissions", [])
    # Sort by date, newest first
    submissions.sort(key=lambda x: x.get("submitted_at", ""), reverse=True)
    return [ContactForm(**sub) for sub in submissions]


def create_submission(submission_data: dict) -> ContactForm:
    """Create a new contact form submission"""
    data = _load_data()
    
    new_submission = {
        "id": str(uuid.uuid4()),
        "name": submission_data["name"],
        "email": submission_data["email"],
        "phone": submission_data.get("phone"),
        "event_type": submission_data["event_type"],
        "message": submission_data["message"],
        "submitted_at": datetime.now().isoformat(),
        "status": "new"
    }
    
    data["submissions"].append(new_submission)
    _save_data(data)
    
    return ContactForm(**new_submission)


def update_submission_status(submission_id: str, status: str) -> bool:
    """Update submission status"""
    data = _load_data()
    
    for sub in data["submissions"]:
        if sub["id"] == submission_id:
            sub["status"] = status
            _save_data(data)
            return True
    return False


def delete_submission(submission_id: str) -> bool:
    """Delete a submission"""
    data = _load_data()
    original_count = len(data["submissions"])
    data["submissions"] = [s for s in data["submissions"] if s["id"] != submission_id]
    
    if len(data["submissions"]) < original_count:
        _save_data(data)
        return True
    return False
