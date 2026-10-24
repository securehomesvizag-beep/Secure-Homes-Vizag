import { Listing, SiteSettings } from './types';

// ─── RealEstateAgent / LocalBusiness ────────────────────────────────────────
export function getRealEstateAgentJsonLd(settings: SiteSettings, siteUrl: string) {
  const social: string[] = [];
  if (settings.instagram_url) social.push(settings.instagram_url);
  if (settings.youtube_url) social.push(settings.youtube_url);

  return {
    '@context': 'https://schema.org',
    '@type': ['RealEstateAgent', 'LocalBusiness'],
    '@id': `${siteUrl}/#organization`,
    name: 'Secure Home Vizag',
    alternateName: ['Secure Homes Vizag', 'SecureHomeVizag', 'Secure Home Visakhapatnam'],
    legalName: 'Secure Home Vizag (Proprietor: Rajesh Ponnada)',
    image: {
      '@type': 'ImageObject',
      url: `${siteUrl}/brand/og-image.jpg`,
      width: 1200,
      height: 630,
    },
    logo: {
      '@type': 'ImageObject',
      url: `${siteUrl}/brand/logo.svg`,
      width: 180,
      height: 45,
    },
    description:
      'Secure Home Vizag is a trusted real estate consultancy in Visakhapatnam (Vizag), Andhra Pradesh, offering verified plots, flats, apartments, villas, and commercial properties. Founded by Rajesh Ponnada with 10+ years of transparent property advisory, VMRDA and RERA approved listings, and complete title verification services for homebuyers, families, and NRI clients.',
    slogan: 'Transparent and Reliable Real Estate in Visakhapatnam',
    url: siteUrl,
    telephone: `+91${settings.phone}`,
    email: 'contact@securehomevizag.com',
    address: {
      '@type': 'PostalAddress',
      streetAddress: settings.office_address || 'Visakhapatnam',
      addressLocality: 'Visakhapatnam',
      addressRegion: 'Andhra Pradesh',
      postalCode: '530001',
      addressCountry: 'IN',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: '17.6868',
      longitude: '83.2185',
    },
    hasMap: 'https://maps.google.com/?q=Visakhapatnam,Andhra+Pradesh,India',
    openingHours: 'Mo-Sa 09:00-19:00',
    openingHoursSpecification: [
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
        opens: '09:00',
        closes: '19:00',
      },
    ],
    priceRange: '₹₹',
    currenciesAccepted: 'INR',
    paymentAccepted: 'Cash, Bank Transfer, Cheque, UPI',
    areaServed: [
      { '@type': 'City', name: 'Visakhapatnam', sameAs: 'https://en.wikipedia.org/wiki/Visakhapatnam' },
      { '@type': 'City', name: 'Vizag', sameAs: 'https://en.wikipedia.org/wiki/Visakhapatnam' },
      { '@type': 'AdministrativeArea', name: 'Andhra Pradesh', sameAs: 'https://en.wikipedia.org/wiki/Andhra_Pradesh' },
      { '@type': 'Neighborhood', name: 'Madhurawada, Visakhapatnam' },
      { '@type': 'Neighborhood', name: 'Rushikonda, Visakhapatnam' },
      { '@type': 'Neighborhood', name: 'Anandapuram, Visakhapatnam' },
      { '@type': 'Neighborhood', name: 'Bheemili, Visakhapatnam' },
      { '@type': 'Neighborhood', name: 'Yendada, Visakhapatnam' },
      { '@type': 'Neighborhood', name: 'MVP Colony, Visakhapatnam' },
      { '@type': 'Neighborhood', name: 'Gajuwaka, Visakhapatnam' },
      { '@type': 'Neighborhood', name: 'Pendurthi, Visakhapatnam' },
      { '@type': 'Neighborhood', name: 'Sujatha Nagar, Visakhapatnam' },
    ],
    knowsAbout: [
      'Residential Plots in Visakhapatnam',
      'Flats and Apartments in Vizag',
      'Villas and Independent Houses Visakhapatnam',
      'Commercial Properties in Vizag',
      'VMRDA Approved Properties',
      'RERA Approved Properties',
      'Title Verification Andhra Pradesh',
      'Property Registration Visakhapatnam',
      'NRI Property Investment Vizag',
      'Coastal Properties Bheemili',
      'Anandapuram Plots',
      'Madhurawada Flats',
      'Real Estate Advisory Visakhapatnam',
    ],
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'Verified Property Listings in Visakhapatnam',
      itemListElement: [
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Residential Plots Advisory in Visakhapatnam',
            description: 'VMRDA approved residential plots in Anandapuram, Bheemili, Madhurawada, and Pendurthi with clear title documentation.',
          },
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Flats and Apartments Advisory in Vizag',
            description: 'RERA approved 2 and 3 BHK flats in Madhurawada, Rushikonda, and Yendada with verified documentation.',
          },
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Villas and Independent Houses Advisory in Vizag',
            description: 'Premium coastal villas and duplex houses in Bheemili corridor and gated communities of Visakhapatnam.',
          },
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Commercial Property Advisory in Visakhapatnam',
            description: 'Retail shops, office spaces, and highway commercial plots in Gajuwaka and Madhurawada.',
          },
        },
      ],
    },
    founder: {
      '@type': 'Person',
      '@id': `${siteUrl}/about#rajesh-ponnada`,
      name: 'Rajesh Ponnada',
      jobTitle: 'Founder & Property Consultant',
      description: 'Rajesh Ponnada is a trusted real estate consultant based in Visakhapatnam with over 10 years of experience in transparent property advisory, title verification, and NRI property services.',
      url: `${siteUrl}/about`,
      telephone: `+91${settings.phone}`,
      worksFor: { '@type': 'Organization', name: 'Secure Home Vizag' },
    },
    sameAs: social,
    contactPoint: [
      {
        '@type': 'ContactPoint',
        telephone: `+91${settings.phone}`,
        contactType: 'sales',
        areaServed: 'IN',
        availableLanguage: ['English', 'Telugu', 'Hindi'],
        hoursAvailable: {
          '@type': 'OpeningHoursSpecification',
          dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
          opens: '09:00',
          closes: '19:00',
        },
      },
      {
        '@type': 'ContactPoint',
        contactType: 'customer service',
        telephone: `+91${settings.phone}`,
        availableLanguage: ['English', 'Telugu'],
      },
    ],
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '4.9',
      reviewCount: '47',
      bestRating: '5',
      worstRating: '1',
    },
    award: '10+ Years of Transparent Real Estate Advisory in Visakhapatnam',
  };
}

// ─── Listing / RealEstateListing ─────────────────────────────────────────────
export function getListingJsonLd(listing: Listing, siteUrl: string) {
  const images = listing.images && listing.images.length > 0 ? listing.images : [listing.cover_image_url];
  const imageObjects = images.filter(Boolean).map((img) => ({
    '@type': 'ImageObject',
    url: img.startsWith('http') ? img : `${siteUrl}${img}`,
    name: listing.title,
    description: `${listing.title} in ${listing.location}, Visakhapatnam`,
  }));

  const propertyTypeMap: Record<string, string> = {
    plots: 'Land',
    flats: 'Apartment',
    villas: 'House',
    commercial: 'CommercialProperty',
  };

  const approvals: Array<{ '@type': string; name: string; value: string; description: string }> = [];
  if (listing.is_vmrda_approved) {
    approvals.push({ '@type': 'PropertyValue', name: 'VMRDA Approved', value: 'Yes', description: 'Visakhapatnam Metropolitan Region Development Authority approved layout' });
  }
  if (listing.is_rera_approved) {
    approvals.push({ '@type': 'PropertyValue', name: 'RERA Approved', value: 'Yes', description: 'Real Estate Regulatory Authority Andhra Pradesh approved project' });
  }

  return {
    '@context': 'https://schema.org',
    '@type': 'RealEstateListing',
    '@id': `${siteUrl}/listings/${listing.slug}#listing`,
    name: listing.title,
    description: listing.description,
    url: `${siteUrl}/listings/${listing.slug}`,
    image: imageObjects.length > 0 ? imageObjects : undefined,
    datePosted: listing.created_at,
    dateModified: listing.updated_at || listing.created_at,
    offers: {
      '@type': 'Offer',
      price: listing.price,
      priceCurrency: 'INR',
      priceSpecification: listing.price_display
        ? { '@type': 'PriceSpecification', price: listing.price, priceCurrency: 'INR', description: listing.price_display }
        : undefined,
      availability:
        listing.status === 'sold'
          ? 'https://schema.org/SoldOut'
          : listing.status === 'few_left'
          ? 'https://schema.org/LimitedAvailability'
          : 'https://schema.org/InStock',
      seller: {
        '@type': 'RealEstateAgent',
        name: 'Secure Home Vizag',
        url: siteUrl,
        telephone: '+918019928236',
        '@id': `${siteUrl}/#organization`,
      },
      validFrom: listing.created_at,
    },
    floorSize: listing.size
      ? {
          '@type': 'QuantitativeValue',
          value: listing.size,
          unitCode: listing.unit === 'sq.ft' ? 'FTK' : listing.unit === 'sq.yds' ? 'YDK' : 'ACR',
          unitText: listing.unit,
        }
      : undefined,
    additionalProperty: approvals,
    locationCreated: {
      '@type': 'Place',
      name: `${listing.location}, Visakhapatnam`,
      address: {
        '@type': 'PostalAddress',
        streetAddress: listing.location,
        addressLocality: 'Visakhapatnam',
        addressRegion: 'Andhra Pradesh',
        postalCode: '530001',
        addressCountry: 'IN',
      },
      geo: {
        '@type': 'GeoCoordinates',
        latitude: '17.6868',
        longitude: '83.2185',
      },
    },
    category: propertyTypeMap[listing.property_type] || 'RealProperty',
    provider: {
      '@type': 'RealEstateAgent',
      '@id': `${siteUrl}/#organization`,
      name: 'Secure Home Vizag',
      telephone: '+918019928236',
    },
    seller: {
      '@type': 'RealEstateAgent',
      '@id': `${siteUrl}/#organization`,
      name: 'Secure Home Vizag',
      url: siteUrl,
    },
  };
}

// ─── BreadcrumbList ───────────────────────────────────────────────────────────
export function getBreadcrumbJsonLd(
  siteUrl: string,
  crumbs: { name: string; url: string }[]
) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: crumbs.map((crumb, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: crumb.name,
      item: crumb.url.startsWith('http') ? crumb.url : `${siteUrl}${crumb.url}`,
    })),
  };
}

// ─── FAQPage ──────────────────────────────────────────────────────────────────
export function getFaqJsonLd(faqs: { question: string; answer: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  };
}

// ─── Person (Rajesh Ponnada) ──────────────────────────────────────────────────
export function getPersonJsonLd(siteUrl: string) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Person',
    '@id': `${siteUrl}/about#rajesh-ponnada`,
    name: 'Rajesh Ponnada',
    givenName: 'Rajesh',
    familyName: 'Ponnada',
    jobTitle: 'Founder & Property Consultant',
    description:
      'Rajesh Ponnada is a trusted real estate consultant based in Visakhapatnam (Vizag) with over 10 years of experience assisting homebuyers, families, and NRI clients in transparent property transactions, title verification, and VMRDA/RERA approved listings across Andhra Pradesh.',
    url: `${siteUrl}/about`,
    image: {
      '@type': 'ImageObject',
      url: `${siteUrl}/Rajesh%20ponnada.jpeg`,
      name: 'Rajesh Ponnada — Founder of Secure Home Vizag',
    },
    telephone: '+918019928236',
    worksFor: {
      '@type': 'RealEstateAgent',
      '@id': `${siteUrl}/#organization`,
      name: 'Secure Home Vizag',
      url: siteUrl,
    },
    knowsAbout: [
      'Real Estate in Visakhapatnam',
      'VMRDA Property Approvals',
      'RERA Compliance Andhra Pradesh',
      'Title Deed Verification',
      'Property Registration Visakhapatnam',
      'Visakhapatnam Real Estate Market',
      'NRI Property Investment Vizag',
      'Residential Plots Vizag',
      'Coastal Properties Bheemili',
      'Property Advisory',
    ],
    hasOccupation: {
      '@type': 'Occupation',
      name: 'Real Estate Consultant',
      occupationLocation: {
        '@type': 'City',
        name: 'Visakhapatnam',
        sameAs: 'https://en.wikipedia.org/wiki/Visakhapatnam',
      },
      skills: 'Property Advisory, Title Verification, VMRDA Approvals, RERA Compliance, NRI Property Services',
      experienceRequirements: '10+ years',
    },
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Visakhapatnam',
      addressRegion: 'Andhra Pradesh',
      addressCountry: 'IN',
    },
  };
}

// ─── ItemList for Listings Page (AEO / AI Overview) ──────────────────────────
export function getListingsItemListJsonLd(
  siteUrl: string,
  propertyTypeLabel: string,
  listings: Array<{ title: string; slug: string; location: string; price_display?: string | null }>
) {
  return {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: `${propertyTypeLabel} for Sale in Visakhapatnam`,
    description: `Verified ${propertyTypeLabel.toLowerCase()} for sale in Visakhapatnam. Browse all available properties with direct guidance from Secure Home Vizag — Rajesh Ponnada.`,
    url: `${siteUrl}/listings`,
    numberOfItems: listings.length,
    itemListElement: listings.slice(0, 10).map((listing, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      url: `${siteUrl}/listings/${listing.slug}`,
      name: `${listing.title} in ${listing.location}${listing.price_display ? ` — ${listing.price_display}` : ''}`,
    })),
  };
}

// ─── Service Schema (AEO-targeted) ───────────────────────────────────────────
export function getServiceJsonLd(
  siteUrl: string,
  serviceName: string,
  serviceDescription: string,
  serviceUrl: string
) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: serviceName,
    description: serviceDescription,
    url: serviceUrl,
    provider: {
      '@type': 'RealEstateAgent',
      '@id': `${siteUrl}/#organization`,
      name: 'Secure Home Vizag',
      url: siteUrl,
      telephone: '+918019928236',
    },
    areaServed: [
      { '@type': 'City', name: 'Visakhapatnam' },
      { '@type': 'City', name: 'Vizag' },
    ],
    serviceType: 'Real Estate Advisory',
    availableChannel: {
      '@type': 'ServiceChannel',
      serviceUrl: serviceUrl,
      servicePhone: '+918019928236',
      availableLanguage: ['English', 'Telugu'],
    },
  };
}
