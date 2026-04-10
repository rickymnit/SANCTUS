import json
import os
import uuid
from datetime import datetime
from typing import List, Optional
from app.models.gallery import GalleryImage, GalleryCategory
from app.core.config import get_settings

settings = get_settings()

DATA_FILE = os.path.join(settings.DATA_DIR, "gallery.json")

# Ensure data directory exists
os.makedirs(settings.DATA_DIR, exist_ok=True)

# Default gallery categories
DEFAULT_CATEGORIES = [
    {"id": "live-shows", "name": "Live Shows", "description": "Performance photos from live events"},
    {"id": "crowd", "name": "Crowd", "description": "Energy from the dance floor"},
    {"id": "studio", "name": "Studio", "description": "Behind the scenes in the studio"},
]

# Default gallery images based on existing assets
DEFAULT_IMAGES = [
    {"id": "1", "url": "/assets/1.jpeg", "category": "live-shows", "title": "Live Performance", "created_at": datetime.now().isoformat()},
    {"id": "2", "url": "/assets/2.jpeg", "category": "crowd", "title": "Crowd Energy", "created_at": datetime.now().isoformat()},
    {"id": "3", "url": "/assets/3.jpeg", "category": "studio", "title": "Studio Session", "created_at": datetime.now().isoformat()},
    {"id": "4", "url": "/assets/4.jpeg", "category": "live-shows", "title": "Event Night", "created_at": datetime.now().isoformat()},
]


def _load_data():
    """Load gallery data from JSON file"""
    if not os.path.exists(DATA_FILE):
        return {"categories": DEFAULT_CATEGORIES, "images": DEFAULT_IMAGES}
    with open(DATA_FILE, 'r') as f:
        return json.load(f)


def _save_data(data):
    """Save gallery data to JSON file"""
    with open(DATA_FILE, 'w') as f:
        json.dump(data, f, indent=2)


def get_all_images(category: Optional[str] = None) -> List[GalleryImage]:
    """Get all gallery images, optionally filtered by category"""
    data = _load_data()
    images = data.get("images", [])
    
    if category:
        images = [img for img in images if img["category"] == category]
    
    return [GalleryImage(**img) for img in images]


def get_categories() -> List[GalleryCategory]:
    """Get all gallery categories"""
    data = _load_data()
    categories = data.get("categories", DEFAULT_CATEGORIES)
    return [GalleryCategory(**cat) for cat in categories]


def add_image(image_data: dict) -> GalleryImage:
    """Add a new gallery image"""
    data = _load_data()
    
    new_image = {
        "id": str(uuid.uuid4()),
        "url": image_data["url"],
        "category": image_data["category"],
        "title": image_data.get("title"),
        "created_at": datetime.now().isoformat()
    }
    
    data["images"].append(new_image)
    _save_data(data)
    
    return GalleryImage(**new_image)


def delete_image(image_id: str) -> bool:
    """Delete a gallery image"""
    data = _load_data()
    original_count = len(data["images"])
    data["images"] = [img for img in data["images"] if img["id"] != image_id]
    
    if len(data["images"]) < original_count:
        _save_data(data)
        return True
    return False
