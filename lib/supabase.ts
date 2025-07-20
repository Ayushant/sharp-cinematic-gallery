
import { createClient } from '@supabase/supabase-js'

// Supabase configuration - using correct project details
const supabaseUrl = 'https://wjbgxpkazsdldknulrhk.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6IndqYmd4cGthenNkbGRrbnVscmhrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTI3NTUyMzAsImV4cCI6MjA2ODMzMTIzMH0.SU2CeYPbprat5tKe7VhV4mLERcavy4nOMKMeuXXFASI'

// Create Supabase client
export const supabase = createClient(supabaseUrl, supabaseKey)

export type Category = {
  id: string
  name: string
  slug: string
  description: string | null
  display_order: number
  is_active: boolean
  created_at: string
  updated_at: string
  photo_count?: number
}

export type Photo = {
  id: string
  category_id: string
  title: string | null
  description: string | null
  image_url: string
  thumbnail_url: string | null
  alt_text: string | null
  display_order: number
  is_featured: boolean
  is_home_featured: boolean
  home_display_section: string | null
  file_size: number | null
  dimensions: { width: number; height: number } | null
  metadata: any
  is_active: boolean
  created_at: string
  updated_at: string
  category_name?: string
}
