import os
import sys
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

# Adiciona a raiz do projeto ao PATH para que o Python encontre o pacote 'api'
sys.path.append(os.path.join(os.path.dirname(__file__), ".."))

from api.routes.auth import router as auth_router

app = FastAPI(title="Igreja Pertencer API")

# Configuração de CORS para permitir requisições de outros domínios
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# API Routes
app.include_router(auth_router, prefix="/api/auth", tags=["auth"])
