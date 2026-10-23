# GOOGLE_SEARCH_CONSOLE_SETUP.md
# Google Search Console Setup Guide — Secure Home Vizag

---

## Website Details

| Item | Value |
|------|-------|
| **Production URL** | `https://www.securehomevizag.com/` |
| **Sitemap URL** | `https://www.securehomevizag.com/sitemap.xml` |
| **Robots.txt URL** | `https://www.securehomevizag.com/robots.txt` |
| **Preferred Canonical Domain** | `https://www.securehomevizag.com` |
| **Recommended Property Type** | Domain property (covers all subdomains + HTTP/HTTPS variants) |

---

## Step 1: Open Google Search Console

Go to: https://search.google.com/search-console

Sign in with the Google account that will manage this website.

---

## Step 2: Add a New Property

1. Click "+ Add property" in the top left dropdown
2. Select "Domain" property type (recommended)
3. Enter: `securehomevizag.com` (without www)
4. Click Continue

If DNS verification is not available, use "URL prefix" with `https://www.securehomevizag.com/` instead.

---

## Step 3: Verify Domain Ownership

### Option A — DNS Verification (Recommended)
1. Google provides a TXT record value: `google-site-verification=XXXXXXXXXXXXXXX`
2. Log in to your domain registrar (GoDaddy, Namecheap, BigRock, etc.)
3. Go to DNS Management, add a TXT Record
4. Host: `@` | Value: the verification code | TTL: 3600
5. Wait 10–60 minutes for DNS propagation
6. Return to Search Console and click Verify

### Option B — HTML Meta Tag Verification
1. Google provides a meta tag with a verification code
2. Open `src/app/layout.tsx` and update the verification object:

```typescript
verification: {
  google: 'YOUR_GOOGLE_SEARCH_CONSOLE_VERIFICATION_CODE',
},
```

3. Deploy the code, then click Verify in Search Console

### Option C — HTML File Upload
1. Download the verification HTML file from Google
2. Place it in the `/public` directory of this project
3. Deploy, then click Verify

---

## Step 4: Submit the Sitemap

1. In Search Console sidebar, click Sitemaps
2. Enter: `sitemap.xml` in the "Add a new sitemap" field
3. Click Submit

Sitemap URL: `https://www.securehomevizag.com/sitemap.xml`

The sitemap includes:
- Homepage (priority 1.0)
- Listings index (priority 0.95)
- Individual listing detail pages (priority 0.9)
- About, Contact, Social (priority 0.6–0.8)
- Privacy, Terms (priority 0.3)

---

## Step 5: Inspect Important URLs

Use the URL Inspection tool (search bar at the top of Search Console).

Key URLs to inspect:
- `https://www.securehomevizag.com/`
- `https://www.securehomevizag.com/listings`
- `https://www.securehomevizag.com/about`
- `https://www.securehomevizag.com/contact`

For each URL, check "URL is on Google" status.

---

## Step 6: Request Indexing

If a URL shows "URL is not on Google":
1. Click "Request Indexing"
2. Google queues the URL for crawling (typically 1–7 days)

Priority indexing order:
1. Homepage
2. /listings
3. /about
4. /contact
5. Individual listing detail pages

NOTE: Submitting indexing requests does NOT guarantee indexing or ranking.

---

## Step 7: Monitor Indexing Status

Check weekly for the first month under Pages > Coverage:

- Valid indexed pages: homepage, listings, listing details, about, contact
- Expected excluded pages (correct by design):
  - /admin/* — noindex set in code
  - /api/* — blocked in robots.txt and via X-Robots-Tag header

---

## Step 8: Monitor Core Web Vitals

In sidebar: Experience > Core Web Vitals

Targets:
- LCP (Largest Contentful Paint): under 2.5 seconds
- INP (Interaction to Next Paint): under 200ms
- CLS (Cumulative Layout Shift): under 0.1

Hero images on homepage and listing detail pages have `priority` and `fetchPriority="high"` already implemented for LCP optimization.

---

## Step 9: Monitor Enhancement/Schema Reports

In sidebar: Enhancements section

Expected schema reports to appear:
- FAQPage — from homepage FAQ section
- BreadcrumbList — all public pages
- LocalBusiness / RealEstateAgent — sitewide from layout
- RealEstateListing — individual listing detail pages

Validate schema at: https://search.google.com/test/rich-results

---

## Step 10: Monitor Crawl and Indexing Issues

- Settings > Crawl Stats: check crawl frequency and errors
- Security and Manual Actions: verify no penalties
- Links > Internal Links: confirm important pages are well-linked

---

## Post-Deployment Checklist

| Task | Tool | Status |
|------|------|--------|
| Verify site on GSC | Google Search Console | Pending |
| Submit sitemap.xml | GSC > Sitemaps | Pending |
| Request indexing for key pages | GSC > URL Inspection | Pending |
| Test structured data validity | Rich Results Test | Pending |
| Test Open Graph preview | Facebook Sharing Debugger | Pending |
| Test Twitter Card preview | Twitter Card Validator | Pending |
| Set up Google Business Profile | business.google.com | Pending (external) |
| Verify robots.txt is live | Visit /robots.txt in browser | Pending |
| Verify sitemap.xml is live | Visit /sitemap.xml in browser | Pending |
| Monitor Core Web Vitals | GSC > Experience | Ongoing |

---

## External Actions (Cannot Be Completed via Code)

The following require action outside the codebase:

1. **Google Search Console verification** — requires DNS access or deployment
2. **Google Business Profile** — create/claim at business.google.com for local SEO
3. **Backlink acquisition** — directory listings, local business citations
4. **Google Analytics setup** — install GA4 tracking if desired
5. **External directory submissions** — JustDial, Sulekha, 99acres, MagicBricks

---

*Document generated for: Secure Home Vizag — https://www.securehomevizag.com*
