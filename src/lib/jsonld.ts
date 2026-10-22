import { Listing, SiteSettings } from './types';

export function getRealEstateAgentJsonLd(settings: SiteSettings, siteUrl: string) {
  return {
    '@context': 'https://schema.org',
    '@type': 'RealEstateAgent',
    name: 'Secure Home Vizag',
    image: `${siteUrl}/brand/logo.svg`,
    description: 'Verified plots, flats and villas in Visakhapatnam. Transparent and reliable real estate brokerage with 10+ years of local experience.',
    url: siteUrl,
    telephone: `+91${settings.phone}`,
    priceRange: 'INR 25,00,000 to INR 3,00,00,000',
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Visakhapatnam',
      addressRegion: 'Andhra Pradesh',
      addressCountry: 'IN',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: '17.6868',
      longitude: '83.2185',
    },
    sameAs: [
      settings.instagram_url,
      settings.youtube_url,
    ],
  };
}

export function getListingJsonLd(listing: Listing, siteUrl: string) {
  return {
    '@context': 'https://schema.org',
    '@type': 'RealEstateListing',
    name: listing.title,
    description: listing.description,
    url: `${siteUrl}/listings/${listing.slug}`,
    image: `${siteUrl}${listing.cover_image_url}`,
    datePosted: listing.created_at,
    offers: {
      '@type': 'Offer',
      price: listing.price,
      priceCurrency: 'INR',
      availability: listing.status === 'sold' ? 'https://schema.org/SoldOut' : 'https://schema.org/InStock',
    },
    spatialCoverage: {
      '@type': 'Place',
      name: listing.location,
      address: {
        '@type': 'PostalAddress',
        addressLocality: 'Visakhapatnam',
        addressRegion: 'Andhra Pradesh',
        addressCountry: 'IN',
      },
    },
  };
}
