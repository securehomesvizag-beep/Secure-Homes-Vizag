# Secure Home Vizag - Assumptions and Placeholders

This file records all assumptions and placeholder values used in the project in accordance with the project brief.

## 1. Legal and Compliance
- Privacy Policy (/privacy) and Terms of Service (/terms) are drafted for an Indian real estate lead generation website.
- Reviewed draft, have a lawyer confirm before launch.

## 2. Branding and Media
- Logo: The official shield-and-house emblem in navy, teal, and green has been integrated across the website header, footer, admin console, and browser favicon (`/public/brand/logo.svg`, `/public/brand/logo-stacked.svg`, `/src/app/icon.svg`, `/public/favicon.svg`).
- Founder Photo: The official portrait of founder Rajesh Ponnada is placed at `/public/Rajesh ponnada.jpeg` and integrated on the Home Page and About Page.
- Listing Images: Placeholder images use a neutral solid background with the text "Photo to be added".

## 3. Business Details and Defaults
- Owner: Rajesh Ponnada
- Phone / WhatsApp: +91 8019928236
- Brand Promise: "Transparent and Reliable"
- Experience: 10+ years
- Service Areas: Visakhapatnam (Vizag) including Beach Corridor, Madhurawada, Yendada, Rushikonda, Gajuwaka, Anandapuram, Bheemili, and surrounding VMRDA limits.
- Office Address: Placeholder set in admin settings (hidden until client enters real physical office address). Default placeholder: "Dwaraka Nagar, Visakhapatnam, Andhra Pradesh 530016 (To be updated in Admin Settings)".
- Working Hours: Placeholder set in admin settings. Default placeholder: "Monday to Saturday: 9:00 AM to 7:00 PM. Sunday: By prior appointment."
- Instagram: https://www.instagram.com/securehomevizag
- YouTube: https://youtube.com/@securehomevizag

## 4. Approval Rule
- No RERA numbers, VMRDA numbers, or government license numbers are stored, referenced, or displayed anywhere in the code, database, or UI.
- Only boolean switches (`vmrda_approved`, `rera_approved`) are stored and displayed as plain text badges ("VMRDA Approved", "RERA Approved").

## 5. Administration
- Admin Login URL: `/admin/login`
- Admin ID / Email: `admin@securehomevizag.com`
- Admin Password: `SecureHome@2026!`
- Configurable via `ADMIN_EMAIL` and `ADMIN_PASSWORD` environment variables.

