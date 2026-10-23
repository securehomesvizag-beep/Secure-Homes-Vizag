import { MetadataRoute } from 'next';
import { getListings } from '@/lib/data';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.securehomevizag.com';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const listings = await getListings();

  // Static pages with tailored priorities and update frequencies
  const staticPages: MetadataRoute.Sitemap = [
    {
      url: `${SITE_URL}/`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1.0,
    },
    {
      url: `${SITE_URL}/listings`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.95,
    },
    {
      url: `${SITE_URL}/about`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${SITE_URL}/contact`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${SITE_URL}/social`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.6,
    },
    // Legal pages: low priority, infrequent changes
    {
      url: `${SITE_URL}/privacy`,
      lastModified: new Date('2026-10-01'),
      changeFrequency: 'yearly',
      priority: 0.3,
    },
    {
      url: `${SITE_URL}/terms`,
      lastModified: new Date('2026-10-01'),
      changeFrequency: 'yearly',
      priority: 0.3,
    },
    // Core high-value search intent categories for Google & Bing
    {
      url: `${SITE_URL}/listings?type=plots`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.95,
    },
    {
      url: `${SITE_URL}/listings?type=flats`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.95,
    },
    {
      url: `${SITE_URL}/listings?type=villas`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.95,
    },
    {
      url: `${SITE_URL}/listings?type=commercial`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.9,
    },
  ];

  // Dynamic listing pages — priority 0.9 (high-value property detail pages)
  const listingPages: MetadataRoute.Sitemap = listings
    .filter((l) => l.is_published && l.slug)
    .map((l) => ({
      url: `${SITE_URL}/listings/${l.slug}`,
      lastModified: new Date(l.updated_at || l.created_at),
      changeFrequency: 'weekly' as const,
      priority: 0.9,
    }));

  return [...staticPages, ...listingPages];
}
