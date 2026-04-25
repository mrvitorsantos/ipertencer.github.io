import os
from supabase import create_client, Client
from dotenv import load_dotenv

load_dotenv()

url: str = os.getenv("SUPABASE_URL", "https://zwejekcpbphkkpdmpckx.supabase.co")
key: str = os.getenv("SUPABASE_KEY", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inp3ZWpla2NwYnBoa2twZG1wY2t4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzcwNjY0MjAsImV4cCI6MjA5MjY0MjQyMH0.HD9_EJ8GNM4wTTAylq1G_KjU5v-nl1AYsprPDT5-Ld4")

supabase: Client = create_client(url, key)
