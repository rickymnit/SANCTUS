from fastapi import APIRouter
from typing import List
from app.models.genre import Genre

router = APIRouter()

# Genre data with hero images and descriptions
GENRES = [
    Genre(
        id="drum-bass",
        name="Drum & Bass",
        description="High-energy breaks and deep basslines that drive the dancefloor",
        hero_image="/assets/onedeck.jpeg",
        color="#ff6b35",
        tagline="Feel the breakbeat energy"
    ),
    Genre(
        id="house",
        name="House",
        description="Four-on-the-floor grooves with soulful melodies and infectious rhythms",
        hero_image="/assets/1.jpeg",
        color="#f59e0b",
        tagline="Where the groove never stops"
    ),
    Genre(
        id="afro",
        name="Afro",
        description="Infectious African rhythms blended with modern electronic production",
        hero_image="/assets/2.jpeg",
        color="#10b981",
        tagline="Rhythms from the motherland"
    ),
    Genre(
        id="trance",
        name="Trance",
        description="Euphoric melodies and driving beats that take you on a journey",
        hero_image="/assets/3.jpeg",
        color="#8b5cf6",
        tagline="Lose yourself in the sound"
    ),
    Genre(
        id="techno",
        name="Techno",
        description="Raw, industrial, and hypnotic beats for the underground",
        hero_image="/assets/4.jpeg",
        color="#06b6d4",
        tagline="The pulse of the underground"
    ),
]


@router.get("/", response_model=List[Genre])
async def get_genres():
    """Get all genres with hero images and descriptions"""
    return GENRES


@router.get("/{genre_id}", response_model=Genre)
async def get_genre(genre_id: str):
    """Get a specific genre by ID"""
    for genre in GENRES:
        if genre.id == genre_id:
            return genre
    raise HTTPException(status_code=404, detail="Genre not found")
