from pydantic_settings import BaseSettings, SettingsConfigDict
from typing import Optional
import os

class Settings(BaseSettings):
    # Use existing MONGODB_URI env var
    MONGODB_URI: Optional[str] = os.getenv("MONGODB_URI") 
    MONGO_URI: Optional[str] = os.getenv("MONGODB_URI") # Alias for compatibility
    
    # AI Keys
    AI_API_KEYS: Optional[str] = os.getenv("AI_API_KEYS")
    
    # PeerJS Configuration
    PEERJS_HOST: str = "0.peerjs.com"
    PEERJS_PORT: int = 443
    PEERJS_PATH: str = "/"
    PEERJS_SECURE: bool = True

    model_config = SettingsConfigDict(env_file=".env", extra="ignore")

settings = Settings()
