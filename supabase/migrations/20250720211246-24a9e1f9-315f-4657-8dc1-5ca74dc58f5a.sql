
-- Update storage policies to allow authenticated users to upload to photos bucket
DROP POLICY IF EXISTS "Storage admin upload" ON storage.objects;

-- Create a more permissive upload policy for authenticated users
CREATE POLICY "Authenticated users can upload to photos" 
ON storage.objects 
FOR INSERT 
WITH CHECK (bucket_id = 'photos' AND auth.role() = 'authenticated');

-- Allow authenticated users to update their uploads
CREATE POLICY "Authenticated users can update photos" 
ON storage.objects 
FOR UPDATE 
USING (bucket_id = 'photos' AND auth.role() = 'authenticated');

-- Allow authenticated users to delete their uploads
CREATE POLICY "Authenticated users can delete photos" 
ON storage.objects 
FOR DELETE 
USING (bucket_id = 'photos' AND auth.role() = 'authenticated');

-- Create videos table for YouTube video management
CREATE TABLE IF NOT EXISTS public.videos (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  category_id UUID REFERENCES categories(id),
  title VARCHAR NOT NULL,
  description TEXT,
  youtube_url TEXT NOT NULL,
  youtube_id TEXT NOT NULL,
  custom_thumbnail_url TEXT,
  duration TEXT,
  display_order INTEGER DEFAULT 0,
  is_featured BOOLEAN DEFAULT false,
  is_home_featured BOOLEAN DEFAULT false,
  home_display_section TEXT CHECK (home_display_section IN ('hero', 'top', 'bottom')),
  view_count INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Enable RLS on videos table
ALTER TABLE videos ENABLE ROW LEVEL SECURITY;

-- Create policies for videos table
CREATE POLICY "Videos viewable by everyone" ON videos 
FOR SELECT USING (true);

CREATE POLICY "Admin full access to videos" ON videos 
FOR ALL USING (auth.role() = 'authenticated');
