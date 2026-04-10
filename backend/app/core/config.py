from pydantic_settings import BaseSettings
from functools import lru_cache


class Settings(BaseSettings):
    APP_NAME: str = "SANCTÜS DJ Portfolio API"
    DEBUG: bool = True
    
    # CORS
    CORS_ORIGINS: list = ["http://localhost:5173", "http://localhost:3000"]
    
    # File paths
    DATA_DIR: str = "data"
    UPLOAD_DIR: str = "app/static/uploads"
    
    # Admin
    ADMIN_PASSWORD: str = "admin123"  # Change in production
    
    # Database
    DATABASE_URL: str = "postgresql://postgres:postgres@localhost:5432/sanctus_db"
    
    class Config:
        env_file = ".env"


@lru_cache()
def get_settings():
    return Settings()
