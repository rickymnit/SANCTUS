"""
Seed script to populate the database with initial data.
Run this after the database is set up.
"""
from datetime import datetime, timedelta
from app.core.database import SessionLocal
from app.models.db_models import GalleryImage, Event, Mix

def seed_database():
    db = SessionLocal()
    
    try:
        # Check if data already exists
        if db.query(GalleryImage).count() > 0:
            print("Database already seeded. Skipping...")
            return
        
        print("Seeding database...")
        
        # Seed gallery images
        gallery_images = [
            GalleryImage(url="/assets/1.jpeg", category="live-shows", title="Live Performance 1"),
            GalleryImage(url="/assets/2.jpeg", category="live-shows", title="Live Performance 2"),
            GalleryImage(url="/assets/3.jpeg", category="crowd", title="Crowd Energy"),
            GalleryImage(url="/assets/4.jpeg", category="studio", title="Studio Session"),
            GalleryImage(url="/assets/thumbnail1.jpeg", category="live-shows", title="Festival Stage"),
            GalleryImage(url="/assets/thumbnail2.jpeg", category="crowd", title="Nightclub Vibes"),
            GalleryImage(url="/assets/thumbnail3.jpeg", category="studio", title="Production Time"),
        ]
        db.add_all(gallery_images)
        
        # Seed events
        events = [
            Event(
                title="Neon Nights Festival",
                venue="Warehouse District, Berlin",
                date=datetime.now() + timedelta(days=30),
                ticket_url="https://example.com/tickets",
                image="/assets/onedeck.jpeg",
                description="An unforgettable night of Drum & Bass and Techno",
                is_past=False
            ),
            Event(
                title="Underground Sessions",
                venue="The Bunker, London",
                date=datetime.now() + timedelta(days=60),
                ticket_url="https://example.com/tickets",
                image="/assets/2.jpeg",
                description="Deep House and Afro House all night long",
                is_past=False
            ),
            Event(
                title="Summer Solstice Rave",
                venue="Beach Club, Barcelona",
                date=datetime.now() - timedelta(days=90),
                ticket_url=None,
                image="/assets/3.jpeg",
                description="Sunset vibes with Trance and Progressive",
                is_past=True
            ),
        ]
        db.add_all(events)
        
        # Seed mixes
        mixes = [
            Mix(
                title="Midnight Energy",
                description="Deep house journey through the night",
                duration="1:23:45",
                image="/assets/thumbnail1.jpeg",
                url="https://soundcloud.com",
                color="#00d4ff",
                order=1
            ),
            Mix(
                title="Warehouse Sessions Vol. 3",
                description="Raw techno for underground spaces",
                duration="2:15:30",
                image="/assets/thumbnail2.jpeg",
                url="https://soundcloud.com",
                color="#8b5cf6",
                order=2
            ),
            Mix(
                title="Sunrise Grooves",
                description="Afro house rhythms at dawn",
                duration="1:45:00",
                image="/assets/thumbnail3.jpeg",
                url="https://soundcloud.com",
                color="#a3e635",
                order=3
            ),
            Mix(
                title="Neon Dreams",
                description="Trance anthems for the dance floor",
                duration="1:58:22",
                image="/assets/1.jpeg",
                url="https://soundcloud.com",
                color="#ec4899",
                order=4
            ),
        ]
        db.add_all(mixes)
        
        db.commit()
        print("✓ Database seeded successfully!")
        
    except Exception as e:
        print(f"Error seeding database: {e}")
        db.rollback()
    finally:
        db.close()

if __name__ == "__main__":
    seed_database()
