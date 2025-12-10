import { createClient } from '@supabase/supabase-js'

// Ajuste para Vite: usa import.meta.env em vez de process.env
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseAnonKey) {
    console.warn('Variáveis de ambiente do Supabase em falta. Verifique o ficheiro .env')
}

export const supabase = createClient(supabaseUrl || '', supabaseAnonKey || '')