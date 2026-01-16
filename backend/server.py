from fastapi import FastAPI, APIRouter, HTTPException, Depends, status
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
from dotenv import load_dotenv
from starlette.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
import os
import logging
from pathlib import Path
from pydantic import BaseModel, Field, ConfigDict
from typing import List, Optional
import uuid
from datetime import datetime, timezone, timedelta
import jwt
import bcrypt

ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

# MongoDB connection
mongo_url = os.environ['MONGO_URL']
client = AsyncIOMotorClient(mongo_url)
db = client[os.environ['DB_NAME']]

# JWT Secret
JWT_SECRET = os.environ.get('JWT_SECRET', 'your-secret-key-change-in-production')
JWT_ALGORITHM = "HS256"
JWT_EXPIRATION_HOURS = 24

# Security
security = HTTPBearer()

# Create the main app without a prefix
app = FastAPI()

# Create a router with the /api prefix
api_router = APIRouter(prefix="/api")

# ==================== MODELS ====================

class AdminLogin(BaseModel):
    username: str
    password: str

class AdminCredentials(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    username: str
    password_hash: str

class HeroSection(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    name: str
    title: str
    tagline: str
    image_url: str
    resume_url: Optional[str] = None

class AboutSection(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    text_en: str
    text_bn: str

class Skill(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    name: str
    category: str  # Frontend, Backend, DevOps, Mobile, etc.
    icon: Optional[str] = None

class Project(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    title: str
    description_en: str
    description_bn: str
    tech_stack: List[str]
    image_url: Optional[str] = None
    project_url: Optional[str] = None
    github_url: Optional[str] = None
    order: int = 0

class ContactInfo(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    email: str
    phone: Optional[str] = None
    location: str
    github: Optional[str] = None
    linkedin: Optional[str] = None
    twitter: Optional[str] = None

# ==================== AUTH HELPERS ====================

def create_jwt_token(username: str) -> str:
    payload = {
        "sub": username,
        "exp": datetime.now(timezone.utc) + timedelta(hours=JWT_EXPIRATION_HOURS)
    }
    return jwt.encode(payload, JWT_SECRET, algorithm=JWT_ALGORITHM)

async def verify_token(credentials: HTTPAuthorizationCredentials = Depends(security)):
    try:
        payload = jwt.decode(credentials.credentials, JWT_SECRET, algorithms=[JWT_ALGORITHM])
        return payload["sub"]
    except jwt.ExpiredSignatureError:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Token expired")
    except jwt.InvalidTokenError:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Invalid token")

# ==================== ADMIN ROUTES ====================

@api_router.post("/admin/setup")
async def setup_admin(admin: AdminLogin):
    """Setup initial admin - only works if no admin exists"""
    existing = await db.admin.find_one({})
    if existing:
        raise HTTPException(status_code=400, detail="Admin already exists")
    
    password_hash = bcrypt.hashpw(admin.password.encode('utf-8'), bcrypt.gensalt()).decode('utf-8')
    admin_doc = AdminCredentials(
        username=admin.username,
        password_hash=password_hash
    ).model_dump()
    
    await db.admin.insert_one(admin_doc)
    return {"message": "Admin created successfully"}

@api_router.post("/admin/login")
async def admin_login(admin: AdminLogin):
    admin_doc = await db.admin.find_one({"username": admin.username})
    if not admin_doc:
        raise HTTPException(status_code=401, detail="Invalid credentials")
    
    if not bcrypt.checkpw(admin.password.encode('utf-8'), admin_doc['password_hash'].encode('utf-8')):
        raise HTTPException(status_code=401, detail="Invalid credentials")
    
    token = create_jwt_token(admin.username)
    return {"token": token, "message": "Login successful"}

# ==================== HERO SECTION ====================

@api_router.get("/portfolio/hero")
async def get_hero():
    hero = await db.hero.find_one({}, {"_id": 0})
    return hero or {}

@api_router.put("/portfolio/hero")
async def update_hero(hero: HeroSection, username: str = Depends(verify_token)):
    await db.hero.delete_many({})
    await db.hero.insert_one(hero.model_dump())
    return {"message": "Hero section updated"}

# ==================== ABOUT SECTION ====================

@api_router.get("/portfolio/about")
async def get_about():
    about = await db.about.find_one({}, {"_id": 0})
    return about or {}

@api_router.put("/portfolio/about")
async def update_about(about: AboutSection, username: str = Depends(verify_token)):
    await db.about.delete_many({})
    await db.about.insert_one(about.model_dump())
    return {"message": "About section updated"}

# ==================== SKILLS ====================

@api_router.get("/portfolio/skills")
async def get_skills():
    skills = await db.skills.find({}, {"_id": 0}).to_list(100)
    return skills

@api_router.post("/portfolio/skills")
async def add_skill(skill: Skill, username: str = Depends(verify_token)):
    await db.skills.insert_one(skill.model_dump())
    return {"message": "Skill added", "id": skill.id}

@api_router.put("/portfolio/skills/{skill_id}")
async def update_skill(skill_id: str, skill: Skill, username: str = Depends(verify_token)):
    await db.skills.update_one({"id": skill_id}, {"$set": skill.model_dump()})
    return {"message": "Skill updated"}

@api_router.delete("/portfolio/skills/{skill_id}")
async def delete_skill(skill_id: str, username: str = Depends(verify_token)):
    await db.skills.delete_one({"id": skill_id})
    return {"message": "Skill deleted"}

# ==================== PROJECTS ====================

@api_router.get("/portfolio/projects")
async def get_projects():
    projects = await db.projects.find({}, {"_id": 0}).sort("order", 1).to_list(100)
    return projects

@api_router.post("/portfolio/projects")
async def add_project(project: Project, username: str = Depends(verify_token)):
    await db.projects.insert_one(project.model_dump())
    return {"message": "Project added", "id": project.id}

@api_router.put("/portfolio/projects/{project_id}")
async def update_project(project_id: str, project: Project, username: str = Depends(verify_token)):
    await db.projects.update_one({"id": project_id}, {"$set": project.model_dump()})
    return {"message": "Project updated"}

@api_router.delete("/portfolio/projects/{project_id}")
async def delete_project(project_id: str, username: str = Depends(verify_token)):
    await db.projects.delete_one({"id": project_id})
    return {"message": "Project deleted"}

# ==================== CONTACT ====================

@api_router.get("/portfolio/contact")
async def get_contact():
    contact = await db.contact.find_one({}, {"_id": 0})
    return contact or {}

@api_router.put("/portfolio/contact")
async def update_contact(contact: ContactInfo, username: str = Depends(verify_token)):
    await db.contact.delete_many({})
    await db.contact.insert_one(contact.model_dump())
    return {"message": "Contact info updated"}

# Include the router in the main app
app.include_router(api_router)

app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=os.environ.get('CORS_ORIGINS', '*').split(','),
    allow_methods=["*"],
    allow_headers=["*"],
)

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)

@app.on_event("shutdown")
async def shutdown_db_client():
    client.close()