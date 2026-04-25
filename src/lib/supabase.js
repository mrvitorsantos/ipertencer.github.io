import { createClient } from '@supabase/supabase-js'

// Usando variáveis de ambiente do Vite (prefixo VITE_)
const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL || 'https://zwejekcpbphkkpdmpckx.supabase.co'
const SUPABASE_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY || 'sb_publishable_mPx3NzPo-UxOfImwkBbQQw_ICpfmwnS'

export const supabase = createClient(SUPABASE_URL, SUPABASE_KEY)
