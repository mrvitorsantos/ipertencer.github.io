import os
import sys
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

# Garante que o diretório 'api' e a raiz do projeto estão no PATH de busca
current_dir = os.path.dirname(os.path.abspath(__file__))
project_root = os.path.dirname(current_dir)

if current_dir not in sys.path:
    sys.path.insert(0, current_dir)
if project_root not in sys.path:
    sys.path.insert(0, project_root)

from routes.auth import router as auth_router

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
