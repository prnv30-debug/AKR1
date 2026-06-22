"""
Vercel serverless entry point — Kumaran M.A. / AKR Trust API
Also used for local development via: uvicorn api.index:app --reload
"""
import asyncio
import os
import time
import uuid
from datetime import datetime, timezone
from pathlib import Path
from typing import List, Optional

from dotenv import load_dotenv
from fastapi import FastAPI, APIRouter, Request
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
from motor.motor_asyncio import AsyncIOMotorClient
from pydantic import BaseModel, Field, ConfigDict, EmailStr
from pymongo.errors import PyMongoError
from starlette.middleware.base import BaseHTTPMiddleware
from html import escape
from slowapi import Limiter, _rate_limit_exceeded_handler
from slowapi.util import get_remote_address
from slowapi.errors import RateLimitExceeded

from api.logging_config import setup_logging

# ---------- Environment ----------
ROOT_DIR = Path(__file__).resolve().parent
load_dotenv(ROOT_DIR / ".env")
load_dotenv(ROOT_DIR.parent / ".env")

access_logger, error_logger = setup_logging()
logger = __import__("logging").getLogger("akr.api")

MONGO_URL = os.environ.get("MONGO_URL", "")
DB_NAME = os.environ.get("DB_NAME", "akr_trust")

if not MONGO_URL:
    logger.error(
        "MONGO_URL is not set. Copy api/.env.example to api/.env and set your MongoDB URI."
    )
    raise RuntimeError(
        "MONGO_URL env var is required. Copy api/.env.example to api/.env for local dev, "
        "or set it in Vercel project settings."
    )

# ---------- DB ----------
client = None
db = None

# ---------- App ----------
app = FastAPI(title="Kumaran M.A. · AKR Trust API")
api_router = APIRouter(prefix="/api")


# ---------- Logging middleware ----------
class AccessLogMiddleware(BaseHTTPMiddleware):
    async def dispatch(self, request: Request, call_next):
        start = time.perf_counter()
        client_host = request.client.host if request.client else "unknown"
        method = request.method
        path = request.url.path
        status_code = 500
        try:
            response = await call_next(request)
            status_code = response.status_code
            return response
        except Exception as exc:
            duration_ms = (time.perf_counter() - start) * 1000
            error_logger.exception(
                "Unhandled exception | %s %s | client=%s | %.1fms | %s",
                method,
                path,
                client_host,
                duration_ms,
                exc,
            )
            raise
        finally:
            duration_ms = (time.perf_counter() - start) * 1000
            access_logger.info(
                "%s %s | status=%s | client=%s | %.1fms",
                method,
                path,
                status_code,
                client_host,
                duration_ms,
            )
            if status_code >= 400:
                error_logger.error(
                    "Failed request | %s %s | status=%s | client=%s | %.1fms",
                    method,
                    path,
                    status_code,
                    client_host,
                    duration_ms,
                )


app.add_middleware(AccessLogMiddleware)

origins = os.environ.get("CORS_ORIGINS", "*").split(",")
if os.environ.get("VERCEL_URL"):
    origins.append(f"https://{os.environ.get('VERCEL_URL')}")

app.add_middleware(
    CORSMiddleware,
    allow_credentials=False if "*" in origins else True,
    allow_origins=origins,
    allow_methods=["*"],
    allow_headers=["*"],
)

limiter = Limiter(key_func=get_remote_address)
app.state.limiter = limiter
app.add_exception_handler(RateLimitExceeded, _rate_limit_exceeded_handler)


@app.exception_handler(PyMongoError)
async def mongodb_exception_handler(_request: Request, exc: PyMongoError):
    error_logger.exception("MongoDB error: %s", exc)
    return JSONResponse(
        status_code=503,
        content={"detail": "Database temporarily unavailable. Please try again."},
    )


@app.exception_handler(Exception)
async def general_exception_handler(_request: Request, exc: Exception):
    error_logger.exception("Unhandled API error: %s", exc)
    return JSONResponse(
        status_code=500,
        content={"detail": "An unexpected error occurred."},
    )


@app.on_event("startup")
async def on_startup():
    global client, db
    logger.info("AKR Trust API starting — db=%s", DB_NAME)
    try:
        client = AsyncIOMotorClient(MONGO_URL)
        db = client[DB_NAME]
        await asyncio.wait_for(client.admin.command("ping"), timeout=5.0)
        logger.info("MongoDB connection verified")
    except (PyMongoError, asyncio.TimeoutError, OSError) as exc:
        error_logger.error("MongoDB ping failed on startup: %s", exc)
        logger.warning(
            "API started but MongoDB is unreachable. Form submissions will fail until connected."
        )


@app.on_event("shutdown")
async def on_shutdown():
    logger.info("AKR Trust API shutting down")
    client.close()
    logger.info("MongoDB client closed")


# ---------- Models ----------
class StatusCheck(BaseModel):
    model_config = ConfigDict(extra="ignore")
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    client_name: str
    timestamp: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))


class StatusCheckCreate(BaseModel):
    client_name: str


class VolunteerCreate(BaseModel):
    name: str = Field(min_length=2, max_length=100)
    email: EmailStr
    phone: str = Field(min_length=6, max_length=20)
    city: str = Field(min_length=2, max_length=80)
    interest: str = Field(min_length=2, max_length=120)
    message: Optional[str] = Field(default="", max_length=1000)


class Volunteer(VolunteerCreate):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    created_at: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))


class ContactCreate(BaseModel):
    name: str = Field(min_length=2, max_length=100)
    email: EmailStr
    subject: str = Field(min_length=2, max_length=160)
    message: str = Field(min_length=5, max_length=2000)


class Contact(ContactCreate):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    created_at: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))


# ---------- Routes ----------
@api_router.get("/")
async def root():
    return {"message": "AKR Trust API is running"}


@api_router.post("/status", response_model=StatusCheck)
async def create_status_check(payload: StatusCheckCreate):
    obj = StatusCheck(**payload.model_dump())
    doc = obj.model_dump()
    doc["timestamp"] = doc["timestamp"].isoformat()
    try:
        await db.status_checks.insert_one(doc)
    except PyMongoError as exc:
        error_logger.exception("Failed to insert status check: %s", exc)
        raise
    return obj


@api_router.get("/status", response_model=List[StatusCheck])
async def get_status_checks():
    try:
        items = await db.status_checks.find({}, {"_id": 0}).to_list(1000)
    except PyMongoError as exc:
        error_logger.exception("Failed to list status checks: %s", exc)
        raise
    for it in items:
        if isinstance(it["timestamp"], str):
            it["timestamp"] = datetime.fromisoformat(it["timestamp"])
    return items


@api_router.post("/volunteers", response_model=Volunteer)
@limiter.limit("5/minute")
async def create_volunteer(request: Request, payload: VolunteerCreate):
    payload.name = escape(payload.name)
    if payload.message:
        payload.message = escape(payload.message)
    obj = Volunteer(**payload.model_dump())
    doc = obj.model_dump()
    doc["created_at"] = doc["created_at"].isoformat()
    try:
        await db.volunteers.insert_one(doc)
    except PyMongoError as exc:
        error_logger.exception("Failed to insert volunteer: %s", exc)
        raise
    access_logger.info("Volunteer submission saved | email=%s", payload.email)
    return obj


@api_router.get("/volunteers", response_model=List[Volunteer])
async def list_volunteers():
    try:
        items = await db.volunteers.find({}, {"_id": 0}).sort("created_at", -1).to_list(500)
    except PyMongoError as exc:
        error_logger.exception("Failed to list volunteers: %s", exc)
        raise
    for it in items:
        if isinstance(it.get("created_at"), str):
            it["created_at"] = datetime.fromisoformat(it["created_at"])
    return items


@api_router.post("/contacts", response_model=Contact)
@limiter.limit("5/minute")
async def create_contact(request: Request, payload: ContactCreate):
    payload.name = escape(payload.name)
    payload.subject = escape(payload.subject)
    payload.message = escape(payload.message)
    obj = Contact(**payload.model_dump())
    doc = obj.model_dump()
    doc["created_at"] = doc["created_at"].isoformat()
    try:
        await db.contacts.insert_one(doc)
    except PyMongoError as exc:
        error_logger.exception("Failed to insert contact: %s", exc)
        raise
    access_logger.info("Contact submission saved | email=%s", payload.email)
    return obj


@api_router.get("/contacts", response_model=List[Contact])
async def list_contacts():
    try:
        items = await db.contacts.find({}, {"_id": 0}).sort("created_at", -1).to_list(500)
    except PyMongoError as exc:
        error_logger.exception("Failed to list contacts: %s", exc)
        raise
    for it in items:
        if isinstance(it.get("created_at"), str):
            it["created_at"] = datetime.fromisoformat(it["created_at"])
    return items


@api_router.get("/stats")
async def get_stats():
    try:
        volunteers_count = await db.volunteers.count_documents({})
        contacts_count = await db.contacts.count_documents({})
    except PyMongoError as exc:
        error_logger.exception("Failed to fetch stats: %s", exc)
        raise
    return {
        "volunteers": volunteers_count,
        "contacts": contacts_count,
        "lives_impacted": 2000 + volunteers_count,
        "families_daily": 650,
        "months_running": 106,
    }


app.include_router(api_router)

# Vercel expects a module-level callable named `app`
handler = app
