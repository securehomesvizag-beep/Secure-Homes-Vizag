# Master Implementation Plan: Secure Home Vizag

## 1. Design Tokens and Visual System
- Background (`--bg`): `#FAF7F2` (warm off-white, used across all page backgrounds)
- Surface (`--surface`): `#FFFEFB` (opaque card surfaces, form inputs only)
- Ink (`--ink`): `#14213D` (deep navy for headings, navbar brand, dark sections, footer)
- Text (`--text`): `#4B4F58` (body copy)
- Line / Divider (`--line`): `#E7E0D5` (1px borders, separators, flat skeleton blocks)
- Brand Accent (`--brand`): `#C2410C` (burnt orange for primary CTA buttons, links, key numbers)
- Brand Hover (`--brand-hover`): `#9A3412`
- Admin Status: Success `#2F6B4F`, Warning `#A16207`, Danger `#B42318`
- Border Radius: Fixed `4px` across all buttons, cards, images, inputs. Maximum `6px`.
- Fonts: Google Fonts `Fraunces` (600, headings) and `Public Sans` (400, 600, body). Strict typography policy.
- Icons: Phosphor regular (`@phosphor-icons/react`), 20px / 24px, strictly semantic. Only Phosphor Icons regular weight. No decorative sparkles or looped arrows.

## 2. Database Tables (supabase/schema.sql)
1. `admins`: id (UUID, references auth.users), email (text), full_name (text), created_at (timestamptz)
2. `listings`: id (UUID pk), title (text), slug (text unique), property_type (enum: 'plots', 'flats', 'villas', 'commercial'), price (numeric), price_display (text), size (numeric), unit (enum: 'sq.yds', 'sq.ft', 'acres'), location (text), status (enum: 'available', 'few_left', 'sold'), is_vmrda_approved (boolean default false), is_rera_approved (boolean default false), is_featured (boolean default false), is_published (boolean default true), description (text), facts (jsonb), cover_image_url (text), created_at (timestamptz), updated_at (timestamptz)
3. `listing_images`: id (UUID pk), listing_id (UUID references listings on delete cascade), image_url (text), sort_order (integer default 0), created_at (timestamptz)
4. `leads`: id (UUID pk), source (enum: 'whatsapp_click', 'call_click', 'form'), name (text nullable), phone (text nullable), interest (enum: 'plots', 'flats', 'villas', 'commercial' nullable), message (text nullable), listing_id (UUID references listings on delete set null nullable), listing_title (text nullable), page_url (text nullable), status (enum: 'new', 'contacted', 'site_visit_planned', 'closed', 'not_interested' default 'new'), notes (text nullable), ip_address (text nullable), created_at (timestamptz)
5. `testimonials`: id (UUID pk), client_name (text), location (text nullable), quote (text), property_type (text nullable), is_visible (boolean default false), created_at (timestamptz)
6. `settings`: key (text pk), value (text), updated_at (timestamptz)

Storage Bucket:
- `listing-images` (public read, authenticated admin write)

## 3. Page List
Public Pages:
- `/` - Home page (Hero, 1-line trust strip, 2x2 property types grid, 3 featured listings horizontal cards, 4-step why choose us, Rajesh Ponnada about preview, social strip, navy enquiry form, footer)
- `/listings` - Listings catalog (4 tab navigation: Plots, Flats, Villas, Commercial via `?type=`, bordered row cards, skeleton loader, empty state)
- `/listings/[slug]` - Listing detail page (Image gallery, title, price, 2-column facts table, description, sticky side desktop enquiry panel, mobile bottom bar)
- `/about` - About Rajesh Ponnada, 10+ years experience, how the process works (numbered list), service areas in Vizag
- `/social` - Social hub (Instagram section, YouTube section, verified links)
- `/contact` - Direct contact details, phone, WhatsApp, enquiry form, office address placeholder, working hours placeholder
- `/privacy` - Privacy policy covering data collection, lead tracking, retention, deletion
- `/terms` - Terms of service for property inquiries and site usage
- Global components:
  - Header/Navbar with desktop navigation and mobile drawer
  - Mobile bottom bar (equal Call and WhatsApp buttons) on every public page
  - Desktop fixed bottom-right WhatsApp button (rectangular, 4px radius, text label)
  - Navy footer with contact details, links, copyright

Admin Pages (`/admin`):
- `/admin/login` - Clean login with Supabase email and password
- `/admin` (Dashboard) - Metrics (leads today, 7 days, total, by source) and latest 10 leads
- `/admin/leads` - Full leads table, status dropdown updates, notes editing, direct Call/WhatsApp action buttons, source/status filters, CSV export
- `/admin/listings` - Listings management list, publish toggle, featured toggle, delete action
- `/admin/listings/new` - Single-column listing creation form, VMRDA/RERA boolean switches, photo upload
- `/admin/listings/[id]/edit` - Single-column listing edit form with image management
- `/admin/testimonials` - Testimonials manager (empty by default, hidden unless toggled visible)
- `/admin/settings` - Phone, WhatsApp, Instagram, YouTube, Hero text, Office address, Working hours

API Routes:
- `/api/leads` - Lead capture endpoint with rate limiting per IP and honeypot field verification
- `/api/leads/[id]` - Admin lead status/notes updater
- `/api/admin/csv` - CSV export endpoint for leads

## 4. File Structure
- `src/app/globals.css` - Design tokens, strict color variables, 4px border radius, no box shadow
- `src/app/layout.tsx` - Fraunces and Public Sans font setup, metadata, global styles
- `src/app/loading.tsx` - Root skeleton loader
- `src/app/page.tsx` - Home page
- `src/app/listings/page.tsx` - Property catalog with tabs
- `src/app/listings/loading.tsx` - Listings catalog skeleton
- `src/app/listings/[slug]/page.tsx` - Detail page
- `src/app/listings/[slug]/loading.tsx` - Listing detail skeleton
- `src/app/about/page.tsx` - About page
- `src/app/social/page.tsx` - Social page
- `src/app/contact/page.tsx` - Contact page
- `src/app/privacy/page.tsx` - Privacy policy
- `src/app/terms/page.tsx` - Terms of service
- `src/app/sitemap.ts` & `src/app/robots.ts` - SEO sitemap and robot directives
- `src/app/admin/layout.tsx` - Admin layout shell and navigation
- `src/app/admin/page.tsx` - Dashboard
- `src/app/admin/loading.tsx` - Dashboard skeleton
- `src/app/admin/login/page.tsx` - Login page
- `src/app/admin/leads/page.tsx` - Leads table
- `src/app/admin/leads/loading.tsx` - Leads skeleton
- `src/app/admin/listings/page.tsx` - Listings list
- `src/app/admin/listings/loading.tsx` - Listings skeleton
- `src/app/admin/listings/new/page.tsx` - Create listing
- `src/app/admin/listings/[id]/edit/page.tsx` - Edit listing
- `src/app/admin/testimonials/page.tsx` - Testimonials
- `src/app/admin/settings/page.tsx` - Business settings
- `src/app/api/leads/route.ts` - Lead capture API with rate limit and honeypot
- `src/app/api/leads/[id]/route.ts` - Lead update API
- `src/components/navbar.tsx` - Public navigation bar
- `src/components/footer.tsx` - Public footer
- `src/components/mobile-bottom-bar.tsx` - Sticky mobile Call and WhatsApp bar
- `src/components/desktop-whatsapp-button.tsx` - Sticky desktop WhatsApp button
- `src/components/lead-capture-form.tsx` - Reusable enquiry form
- `src/components/lead-action-buttons.tsx` - Call and WhatsApp action buttons with click tracking
- `src/components/listing-row-card.tsx` - Listing row card
- `src/components/admin-nav.tsx` - Admin navigation
- `src/lib/supabase/client.ts` - Supabase browser client
- `src/lib/supabase/server.ts` - Supabase server client
- `src/lib/supabase/admin.ts` - Supabase service role client
- `src/lib/types.ts` - Core TypeScript types and interfaces
- `src/lib/data.ts` - Data access layer with fallback demo data
- `src/lib/rate-limit.ts` - Server-side in-memory IP rate limiter
- `src/lib/jsonld.ts` - Schema.org JSON-LD generators
- `supabase/schema.sql` - Complete Postgres schema, RLS, storage, triggers, and demo seed data

## 5. Execution Phases
- Phase 1: Setup, design tokens, fonts, layout shell, navbar, footer, sticky bars, logo placeholder.
- Phase 2: Supabase schema, seed data, data access layer.
- Phase 3: All public pages with skeleton loaders.
- Phase 4: Lead capture routes, rate limiting, logging.
- Phase 5: Admin panel.
- Phase 6: SEO, accessibility, performance, README and user guide, verification checklist.
