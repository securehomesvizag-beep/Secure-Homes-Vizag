import { MetadataRoute } from 'next';
import { getListings } from '@/lib/data';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';
  const listings = await getListings();

  const staticPages = [
    '',
    '/listings',
    '/about',
    '/social',
    '/contact',
    '/privacy',
    '/terms',
  ].map((route) => ({
    url: `${siteUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: route === '' ? 1.0 : 0.8,
  }));

  const listingPages = listings.map((l) => ({
    url: `${siteUrl}/listings/${l.slug}`,
    lastModified: new Date(l.updated_at || l.created_at),
    changeFrequency: 'daily' as const,
    priority: 0.9,
  }));

  return [...staticPages, ...listingPages];
}
