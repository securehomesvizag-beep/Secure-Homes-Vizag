-- Secure Home Vizag - Instant Realtime Sync Fix
-- Run this in your Supabase Dashboard -> SQL Editor -> New Query -> Run

-- 1. Disable Row Level Security on content tables
-- This ensures all updates made by the admin panel are saved immediately to Supabase
ALTER TABLE IF EXISTS settings DISABLE ROW LEVEL SECURITY;
ALTER TABLE IF EXISTS listings DISABLE ROW LEVEL SECURITY;
ALTER TABLE IF EXISTS listing_images DISABLE ROW LEVEL SECURITY;
ALTER TABLE IF EXISTS testimonials DISABLE ROW LEVEL SECURITY;
ALTER TABLE IF EXISTS leads DISABLE ROW LEVEL SECURITY;

-- 2. Grant full access permissions to anon, authenticated, and service_role
GRANT ALL ON TABLE settings TO anon, authenticated, service_role;
GRANT ALL ON TABLE listings TO anon, authenticated, service_role;
GRANT ALL ON TABLE listing_images TO anon, authenticated, service_role;
GRANT ALL ON TABLE testimonials TO anon, authenticated, service_role;
GRANT ALL ON TABLE leads TO anon, authenticated, service_role;

-- 3. Verify settings table has default values if missing
INSERT INTO settings (key, value) VALUES
  ('phone', '8019928236'),
  ('whatsapp_number', '8019928236'),
  ('whatsapp_link', 'https://wa.me/918019928236'),
  ('instagram_url', 'https://www.instagram.com/securehomevizag'),
  ('youtube_url', 'https://youtube.com/@securehomevizag'),
  ('hero_heading', 'Verified plots, flats and villas in Visakhapatnam'),
  ('hero_subheading', 'Direct broker guidance with verified title records, clear pricing, and no hidden charges.'),
  ('office_address', 'Visakhapatnam, Andhra Pradesh'),
  ('working_hours', 'Monday to Saturday: 9:00 AM to 7:00 PM')
ON CONFLICT (key) DO NOTHING;
