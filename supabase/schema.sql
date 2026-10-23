-- Secure Home Vizag Database Schema
-- Supabase PostgreSQL configuration with Row Level Security (RLS)

-- Enums
CREATE TYPE property_type AS ENUM ('plots', 'flats', 'villas', 'commercial');
CREATE TYPE listing_status AS ENUM ('available', 'few_left', 'sold');
CREATE TYPE size_unit AS ENUM ('sq.yds', 'sq.ft', 'acres');
CREATE TYPE lead_source AS ENUM ('whatsapp_click', 'call_click', 'form');
CREATE TYPE lead_status AS ENUM ('new', 'contacted', 'site_visit_planned', 'closed', 'not_interested');

-- 1. Admins Table
CREATE TABLE IF NOT EXISTS admins (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT NOT NULL UNIQUE,
  full_name TEXT,
  created_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 2. Listings Table
CREATE TABLE IF NOT EXISTS listings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  property_type property_type NOT NULL,
  price NUMERIC NOT NULL,
  price_display TEXT NOT NULL,
  size NUMERIC NOT NULL,
  unit size_unit NOT NULL DEFAULT 'sq.yds',
  location TEXT NOT NULL,
  status listing_status NOT NULL DEFAULT 'available',
  is_vmrda_approved BOOLEAN NOT NULL DEFAULT false,
  is_rera_approved BOOLEAN NOT NULL DEFAULT false,
  is_featured BOOLEAN NOT NULL DEFAULT false,
  is_published BOOLEAN NOT NULL DEFAULT true,
  description TEXT NOT NULL,
  facts JSONB DEFAULT '{}'::jsonb,
  cover_image_url TEXT NOT NULL DEFAULT '/placeholders/property-placeholder.svg',
  created_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now()) NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 3. Listing Images Table
CREATE TABLE IF NOT EXISTS listing_images (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  listing_id UUID NOT NULL REFERENCES listings(id) ON DELETE CASCADE,
  image_url TEXT NOT NULL,
  sort_order INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 4. Leads Table
CREATE TABLE IF NOT EXISTS leads (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  source lead_source NOT NULL,
  name TEXT,
  phone TEXT,
  interest property_type,
  message TEXT,
  listing_id UUID REFERENCES listings(id) ON DELETE SET NULL,
  listing_title TEXT,
  page_url TEXT,
  status lead_status NOT NULL DEFAULT 'new',
  notes TEXT,
  ip_address TEXT,
  created_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 5. Testimonials Table (hidden by default)
CREATE TABLE IF NOT EXISTS testimonials (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  client_name TEXT NOT NULL,
  location TEXT,
  quote TEXT NOT NULL,
  property_type TEXT,
  is_visible BOOLEAN NOT NULL DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 6. Settings Table
CREATE TABLE IF NOT EXISTS settings (
  key TEXT PRIMARY KEY,
  value TEXT NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Default Settings Seed
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

-- Seed Data: 4 Demo Listings (one per property type, all approval switches off, DEMO: prefix)
INSERT INTO listings (
  id, title, slug, property_type, price, price_display, size, unit, location, status,
  is_vmrda_approved, is_rera_approved, is_featured, is_published, description, facts, cover_image_url
) VALUES
(
  'a1111111-1111-1111-1111-111111111111',
  'DEMO: Residential Plot in Anandapuram',
  'demo-residential-plot-in-anandapuram',
  'plots',
  3500000,
  'Rs 35 Lakhs',
  200,
  'sq.yds',
  'Anandapuram Junction, Vizag',
  'available',
  false,
  false,
  true,
  true,
  'Clear title residential plot located close to Anandapuram highway junction. Wide approach road, electricity connection available at site, ready for immediate house construction.',
  '{"Facing": "East", "Road Width": "40 feet", "Possession": "Immediate"}',
  '/placeholders/plots.svg'
),
(
  'b2222222-2222-2222-2222-222222222222',
  'DEMO: 3 BHK Apartment in Madhurawada',
  'demo-3-bhk-apartment-in-madhurawada',
  'flats',
  6800000,
  'Rs 68 Lakhs',
  1450,
  'sq.ft',
  'Madhurawada, Vizag',
  'available',
  false,
  false,
  true,
  true,
  'Spacious 3 BHK apartment in prime Madhurawada. Well ventilated unit with lift, car parking, power backup, and round the clock security. Close to schools and IT SEZ.',
  '{"Bedrooms": "3", "Bathrooms": "3", "Floor": "3rd of 5", "Car Parking": "1 Covered"}',
  '/placeholders/flats.svg'
),
(
  'c3333333-3333-3333-3333-333333333333',
  'DEMO: Gated Villa in Bheemili Corridor',
  'demo-gated-villa-in-bheemili-corridor',
  'villas',
  12500000,
  'Rs 1.25 Crore',
  2400,
  'sq.ft',
  'Bheemili Road, Vizag',
  'few_left',
  false,
  false,
  true,
  true,
  'Independent duplex villa in a planned community near the scenic beach corridor. Quality construction with private terrace, bore water, municipal connection, and landscaped avenue.',
  '{"Bedrooms": "4", "Bathrooms": "4", "Plot Area": "180 sq.yds", "Facing": "North"}',
  '/placeholders/villas.svg'
),
(
  'd4444444-4444-4444-4444-444444444444',
  'DEMO: Commercial Office Space in Gajuwaka',
  'demo-commercial-office-space-in-gajuwaka',
  'commercial',
  9500000,
  'Rs 95 Lakhs',
  1100,
  'sq.ft',
  'Main Road, Gajuwaka, Vizag',
  'available',
  false,
  false,
  false,
  true,
  'Main road facing commercial unit suitable for branch office, clinic, or consulting firm. Ample customer parking in front, high footfall commercial zone.',
  '{"Floor": "2nd", "Furnishing": "Unfurnished", "Power": "Commercial 3-Phase"}',
  '/commercial.jpg'
)
ON CONFLICT (slug) DO NOTHING;

-- ROW LEVEL SECURITY (RLS) POLICIES

ALTER TABLE admins ENABLE ROW LEVEL SECURITY;
ALTER TABLE listings ENABLE ROW LEVEL SECURITY;
ALTER TABLE listing_images ENABLE ROW LEVEL SECURITY;
ALTER TABLE leads ENABLE ROW LEVEL SECURITY;
ALTER TABLE testimonials ENABLE ROW LEVEL SECURITY;
ALTER TABLE settings ENABLE ROW LEVEL SECURITY;

-- Helper to check if caller is admin
CREATE OR REPLACE FUNCTION is_admin(user_id UUID)
RETURNS BOOLEAN AS $$
BEGIN
  RETURN EXISTS (
    SELECT 1 FROM admins WHERE id = user_id
  );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Admins table RLS: only authenticated admins can read
CREATE POLICY "Admins can view admins" ON admins
  FOR SELECT TO authenticated
  USING (is_admin(auth.uid()));

-- Listings table RLS:
-- Public can read published listings
CREATE POLICY "Public read published listings" ON listings
  FOR SELECT TO public
  USING (is_published = true);

-- Admins can read all listings
CREATE POLICY "Admins view all listings" ON listings
  FOR SELECT TO authenticated
  USING (is_admin(auth.uid()));

-- Admins can insert/update/delete listings
CREATE POLICY "Admins manage listings" ON listings
  FOR ALL TO authenticated
  USING (is_admin(auth.uid()))
  WITH CHECK (is_admin(auth.uid()));

-- Listing Images table RLS:
CREATE POLICY "Public read listing images" ON listing_images
  FOR SELECT TO public
  USING (true);

CREATE POLICY "Admins manage listing images" ON listing_images
  FOR ALL TO authenticated
  USING (is_admin(auth.uid()))
  WITH CHECK (is_admin(auth.uid()));

-- Leads table RLS:
-- Public insert handled via server API route using service role
-- Authenticated admins can view, update, delete leads
CREATE POLICY "Admins view leads" ON leads
  FOR SELECT TO authenticated
  USING (is_admin(auth.uid()));

CREATE POLICY "Admins update leads" ON leads
  FOR UPDATE TO authenticated
  USING (is_admin(auth.uid()))
  WITH CHECK (is_admin(auth.uid()));

CREATE POLICY "Admins delete leads" ON leads
  FOR DELETE TO authenticated
  USING (is_admin(auth.uid()));

-- Testimonials table RLS:
CREATE POLICY "Public read visible testimonials" ON testimonials
  FOR SELECT TO public
  USING (is_visible = true);

CREATE POLICY "Admins manage testimonials" ON testimonials
  FOR ALL TO authenticated
  USING (is_admin(auth.uid()))
  WITH CHECK (is_admin(auth.uid()));

-- Settings table RLS:
CREATE POLICY "Public read settings" ON settings
  FOR SELECT TO public
  USING (true);

CREATE POLICY "Admins update settings" ON settings
  FOR ALL TO authenticated
  USING (is_admin(auth.uid()))
  WITH CHECK (is_admin(auth.uid()));

-- Storage Bucket setup
INSERT INTO storage.buckets (id, name, public)
VALUES ('listing-images', 'listing-images', true)
ON CONFLICT (id) DO NOTHING;

-- Storage RLS: Public read, admin upload
CREATE POLICY "Public read listing-images bucket" ON storage.objects
  FOR SELECT TO public
  USING (bucket_id = 'listing-images');

CREATE POLICY "Admins upload to listing-images bucket" ON storage.objects
  FOR INSERT TO authenticated
  WITH CHECK (bucket_id = 'listing-images' AND is_admin(auth.uid()));

CREATE POLICY "Admins manage objects in listing-images bucket" ON storage.objects
  FOR ALL TO authenticated
  USING (bucket_id = 'listing-images' AND is_admin(auth.uid()));
