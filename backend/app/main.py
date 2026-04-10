from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
from contextlib import asynccontextmanager
import os

from app.api.routes import genres, gallery, events, contact
from app.core.config import get_settings
from app.core.database import engine, Base

settings = get_settings()

# Create database tables on startup
@asynccontextmanager
async def lifespan(app: FastAPI):
    # Startup: create tables
    Base.metadata.create_all(bind=engine)
    yield
    # Shutdown: cleanup if needed

app = FastAPI(
    title=settings.APP_NAME,
    description="SANCTÜS DJ Portfolio API - Dynamic content management",
    version="1.0.0",
    docs_url="/api/docs",
    redoc_url="/api/redoc",
    lifespan=lifespan
)

# CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.CORS_ORIGINS,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include routers
app.include_router(genres.router, prefix="/api/genres", tags=["genres"])
app.include_router(gallery.router, prefix="/api/gallery", tags=["gallery"])
app.include_router(events.router, prefix="/api/events", tags=["events"])
app.include_router(contact.router, prefix="/api/contact", tags=["contact"])

# Static files for uploads
os.makedirs(settings.UPLOAD_DIR, exist_ok=True)
app.mount("/uploads", StaticFiles(directory=settings.UPLOAD_DIR), name="uploads")

# Mount assets from parent directory for development
assets_path = os.path.join(os.path.dirname(__file__), "..", "..", "assets")
if os.path.exists(assets_path):
    app.mount("/assets", StaticFiles(directory=assets_path), name="assets")


@app.get("/")
async def root():
    return {
        "message": "Welcome to SANCTÜS DJ Portfolio API",
        "docs": "/api/docs",
        "version": "1.0.0"
    }


@app.get("/api/health")
async def health_check():
    return {"status": "healthy", "service": settings.APP_NAME}
