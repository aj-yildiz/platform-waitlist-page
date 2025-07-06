import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

// Create a single supabase client for interacting with your database
export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Database types
export interface WaitlistEntry {
  id: string
  email: string
  timestamp: string
  source: string
  created_at: string
  updated_at: string
  form_type: 'waitlist' | 'space_suggestion'
  user_type?: 'Patient' | 'Practitioner' | 'Gym'
  location?: string
}

export interface Database {
  public: {
    Tables: {
      waitlist: {
        Row: WaitlistEntry
        Insert: Omit<WaitlistEntry, 'id' | 'created_at' | 'updated_at'>
        Update: Partial<WaitlistEntry>
      }
    }
  }
} 