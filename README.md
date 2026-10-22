# Secure Home Vizag Real Estate Website

Production-ready web application for Secure Home Vizag, an established real estate consultancy in Visakhapatnam (Vizag), India, owned by Rajesh Ponnada.

## Tech Stack
- Next.js (App Router, TypeScript)
- Tailwind CSS (v4 with strict design tokens)
- Supabase (PostgreSQL, Authentication, Row Level Security, Storage)
- Next Font: Fraunces (Headings) and Public Sans (Body)
- Icons: Phosphor Icons (@phosphor-icons/react, regular weight)

## Design System Tokens
- Page Background: `#FAF7F2` (Warm off-white)
- Card & Surface: `#FFFEFB`
- Deep Navy (Ink): `#14213D`
- Body Text: `#4B4F58`
- Line / Divider: `#E7E0D5`
- Primary Brand Accent: `#C2410C` (Burnt Orange)
- Brand Hover: `#9A3412`
- Border Radius: Fixed at 4px. Flat solid color surfaces only.

## Statutory Approval Policy
No RERA or VMRDA registration numbers are stored, collected, or displayed anywhere. Listings feature two simple boolean switches in the admin console: "VMRDA approved" and "RERA approved". When active, a plain text badge is displayed on the listing card and detail page.

---

## Setup and Deployment Guide

### 1. Local Development Setup
1. Clone the repository and navigate into the folder:
   ```bash
   cd "Secure Homes Vizag"
   ```
2. Install dependencies:
   ```bash
   npm install --legacy-peer-deps
   ```
3. Copy environment variables:
   ```bash
   cp .env.example .env.local
   ```
4. Start the development server:
   ```bash
   npm run dev
   ```
5. Open http://localhost:3000 in your browser.

### 2. Supabase Setup
1. Create a new project at [supabase.com](https://supabase.com).
2. Open the SQL Editor in your Supabase dashboard and run the entire script found in `supabase/schema.sql`.
   - This creates all required tables (admins, listings, listing_images, leads, testimonials, settings).
   - This configures Row Level Security (RLS) policies.
   - This creates the public storage bucket `listing-images`.
   - This populates demo seed data for four property types.
3. In Authentication > Users, create your admin user with your email and a secure password.
4. In Table Editor > admins, insert a row with your auth user UUID and email to grant admin privileges.
5. In Project Settings > API, copy:
   - Project URL -> `NEXT_PUBLIC_SUPABASE_URL`
   - Project API keys (anon public) -> `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - Project API keys (service_role secret) -> `SUPABASE_SERVICE_ROLE_KEY`
6. Add these keys to your `.env.local` file and your Vercel project environment variables.

### 3. Vercel Deployment
1. Push this repository to GitHub or GitLab.
2. Log in to [vercel.com](https://vercel.com) and import the repository.
3. In the "Environment Variables" section, add:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - `SUPABASE_SERVICE_ROLE_KEY`
   - `NEXT_PUBLIC_SITE_URL` (e.g. https://www.securehomevizag.com)
4. Click Deploy.

### 4. Custom Domain Setup
1. In Vercel, navigate to Project Settings > Domains.
2. Enter your domain (e.g., `securehomevizag.com`).
3. Follow the DNS instructions to add the CNAME and A records at your domain registrar (GoDaddy, Namecheap, etc.).

---

## How the Client Uses the Admin Panel

The admin panel is accessible at `/admin` (or `/admin/login`).

### 1. Managing Leads and Inquiries
- Go to `/admin/leads` to view all inquiries.
- Every click on "WhatsApp" or "Call" logs an entry showing the property viewed and the time.
- Every completed form submission displays the customer name, 10-digit mobile number, property category, and message.
- Tap the "Call" or "WhatsApp" button on any lead row to directly contact the client.
- Update lead status as you progress: New, Contacted, Site visit planned, Closed, or Not interested.
- Click "Export CSV" anytime to download all leads into Excel or Google Sheets.

### 2. Adding and Managing Property Listings
- Go to `/admin/listings` to see all current properties.
- Click "Add New Listing" to add a new plot, flat, villa, or commercial space.
- Enter the title, location, expected price, and area size.
- Approvals: Simply flip the switch for "VMRDA Approved" or "RERA Approved" if verified.
- Upload photos directly or use the solid placeholder.
- Toggle "Published" to show or hide a listing from the public website immediately.
- Toggle "Featured" to highlight up to 3 listings on the homepage.

### 3. Updating Business Contact and Settings
- Go to `/admin/settings` to update your phone number, WhatsApp number, Instagram link, YouTube link, or office hours.
- Changes apply across the entire website instantly.

### 4. Client Testimonials
- Go to `/admin/testimonials` to add verified quotes from real customers after successful registrations.
- Testimonials remain completely hidden from the public site until you toggle "Visible" on.
