import { MetadataRoute } from 'next';
import { getListings } from '@/lib/data';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.securehomevizag.com';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const listings = await getListings();

  // Master Cornerstone Canonical Hubs (Top Priority)
  const masterPages: MetadataRoute.Sitemap = [
    {
      url: `${SITE_URL}/`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1.0,
    },
    {
      url: `${SITE_URL}/real-estate-in-vizag`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1.0,
    },
    {
      url: `${SITE_URL}/plots-in-vizag`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.98,
    },
    {
      url: `${SITE_URL}/villas-in-vizag`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.98,
    },
    {
      url: `${SITE_URL}/flats-in-vizag`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.98,
    },
    {
      url: `${SITE_URL}/commercial-property-in-vizag`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.95,
    },
    {
      url: `${SITE_URL}/listings`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.95,
    },
  ];

  // High-Growth Strategic Micro-Market Corridors (High Priority for Local GEO & AEO)
  const microMarketPages: MetadataRoute.Sitemap = [
    {
      url: `${SITE_URL}/plots-in-anandapuram`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.92,
    },
    {
      url: `${SITE_URL}/plots-in-bhogapuram`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.92,
    },
    {
      url: `${SITE_URL}/plots-in-madhurawada`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.92,
    },
    {
      url: `${SITE_URL}/plots-in-bheemili`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.92,
    },
    {
      url: `${SITE_URL}/villas-in-rushikonda`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.92,
    },
    {
      url: `${SITE_URL}/villas-in-bheemili`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.92,
    },
    {
      url: `${SITE_URL}/flats-in-madhurawada`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.92,
    },
  ];

  // Core Trust, Authority & E-E-A-T Pages
  const companyPages: MetadataRoute.Sitemap = [
    {
      url: `${SITE_URL}/about`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.85,
    },
    {
      url: `${SITE_URL}/contact`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.85,
    },
    {
      url: `${SITE_URL}/social`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.70,
    },
    {
      url: `${SITE_URL}/privacy`,
      lastModified: new Date('2026-10-01'),
      changeFrequency: 'yearly',
      priority: 0.30,
    },
    {
      url: `${SITE_URL}/terms`,
      lastModified: new Date('2026-10-01'),
      changeFrequency: 'yearly',
      priority: 0.30,
    },
  ];

  // Dynamic Verified Individual Property Listings
  const listingPages: MetadataRoute.Sitemap = listings
    .filter((l) => l.is_published && l.slug)
    .map((l) => ({
      url: `${SITE_URL}/listings/${l.slug}`,
      lastModified: new Date(l.updated_at || l.created_at),
      changeFrequency: 'weekly' as const,
      priority: 0.88,
    }));

  return [...masterPages, ...microMarketPages, ...companyPages, ...listingPages];
}
