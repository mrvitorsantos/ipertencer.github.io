import os
import sys
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

# Hack para garantir que os módulos dentro de 'api/' sejam encontrados
current_dir = os.path.dirname(os.path.abspath(__file__))
if current_dir not in sys.path:
    sys.path.insert(0, current_dir)

from routes.auth import router as auth_router

app = FastAPI(title="Igreja Pertencer API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# API Routes
app.include_router(auth_router, prefix="/api/auth", tags=["auth"])