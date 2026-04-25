import os
from supabase import create_client, Client
from dotenv import load_dotenv

load_dotenv()

url: str = os.getenv("SUPABASE_URL", "https://SUA_URL_DO_SUPABASE_AQUI.supabase.co")
key: str = os.getenv("SUPABASE_KEY", "")

supabase: Client = create_client(url, key)
