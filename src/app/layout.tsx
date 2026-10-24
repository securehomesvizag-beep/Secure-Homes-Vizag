import type { Metadata } from 'next';
import { Fraunces, Public_Sans } from 'next/font/google';
import './globals.css';
import { Navbar } from '@/components/navbar';
import { Footer } from '@/components/footer';
import { MobileBottomBar } from '@/components/mobile-bottom-bar';
import { DesktopWhatsAppButton } from '@/components/desktop-whatsapp-button';
import { SplashScreen } from '@/components/splash-screen';
import { getSettings } from '@/lib/data';
import { getRealEstateAgentJsonLd } from '@/lib/jsonld';

const fraunces = Fraunces({
  variable: '--font-fraunces',
  subsets: ['latin'],
  weight: ['600'],
  display: 'swap',
});

const publicSans = Public_Sans({
  variable: '--font-public-sans',
  subsets: ['latin'],
  weight: ['400', '600'],
  display: 'swap',
});

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.securehomevizag.com';

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: 'Secure Home Vizag | #1 Real Estate Consultant — Verified Plots, Flats & Villas in Visakhapatnam',
    template: '%s | Secure Home Vizag — Visakhapatnam Real Estate',
  },
  description:
    'Secure Home Vizag — Visakhapatnam\'s trusted real estate consultancy. Find VMRDA & RERA approved plots, 2 & 3 BHK flats, coastal villas, and commercial properties across Vizag. Direct guidance from Rajesh Ponnada — 10+ years of transparent property advisory, clear title verification, and NRI property services in Andhra Pradesh.',
  keywords: [
    // Primary high-intent Vizag real estate keywords
    'real estate in Vizag',
    'real estate in Visakhapatnam',
    'real estate Vizag',
    'Vizag real estate',
    'Visakhapatnam real estate',
    'property in Vizag',
    'property in Visakhapatnam',
    'plots in Vizag',
    'plots in Visakhapatnam',
    'plots for sale in Vizag',
    'residential plots Vizag',
    'VMRDA approved plots Vizag',
    'VMRDA approved plots Visakhapatnam',
    'flats in Vizag',
    'flats in Visakhapatnam',
    'apartments in Vizag',
    'apartments in Visakhapatnam',
    '2 BHK flats Vizag',
    '3 BHK flats Visakhapatnam',
    'RERA approved apartments Visakhapatnam',
    'villas in Vizag',
    'villas in Visakhapatnam',
    'villas for sale Vizag',
    'coastal villas Visakhapatnam',
    'Bheemili villas',
    'independent houses Vizag',
    'duplex houses Visakhapatnam',
    'commercial property Vizag',
    'commercial property Visakhapatnam',
    'commercial plots Gajuwaka',
    // Advisor and consultant keywords
    'real estate consultant Vizag',
    'property advisor Visakhapatnam',
    'property consultant Vizag',
    'Rajesh Ponnada real estate',
    'Secure Home Vizag',
    'Secure Homes Vizag',
    'property dealer Vizag',
    'property agent Visakhapatnam',
    // Location-specific keywords
    'Madhurawada flats',
    'Rushikonda apartments',
    'Anandapuram plots',
    'Yendada property',
    'MVP Colony flats',
    'Pendurthi plots',
    'Gajuwaka commercial',
    'Bheemili Beach property',
    'Beach Road Vizag property',
    // NRI and investor keywords
    'NRI property Vizag',
    'NRI property Visakhapatnam',
    'property investment Vizag',
    'buy property Vizag',
    'buy flat Visakhapatnam',
    'buy plot Vizag',
    // Nearby and geo keywords
    'nearby real estate Vizag',
    'property near Visakhapatnam',
    'property near me Vizag',
    'Vizag property market',
    'Andhra Pradesh real estate',
  ],
  authors: [{ name: 'Rajesh Ponnada', url: `${SITE_URL}/about` }],
  creator: 'Rajesh Ponnada',
  publisher: 'Secure Home Vizag',
  category: 'Real Estate',
  classification: 'Real Estate, Property, Housing',
  alternates: {
    canonical: SITE_URL,
  },
  openGraph: {
    title: 'Secure Home Vizag | Verified Plots, Flats & Villas in Visakhapatnam',
    description:
      'Visakhapatnam\'s trusted real estate consultancy — verified VMRDA & RERA approved plots, 2 & 3 BHK flats, coastal villas. Direct guidance from Rajesh Ponnada with 10+ years of local expertise. Serving Madhurawada, Bheemili, Anandapuram, Rushikonda & all of Vizag.',
    url: SITE_URL,
    siteName: 'Secure Home Vizag',
    locale: 'en_IN',
    type: 'website',
    images: [
      {
        url: '/brand/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Secure Home Vizag — Verified Plots, Flats & Villas in Visakhapatnam',
        type: 'image/jpeg',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Secure Home Vizag | Verified Property in Visakhapatnam',
    description:
      'Browse VMRDA & RERA approved plots, flats, villas and commercial properties in Vizag. Direct guidance from Rajesh Ponnada — 10+ years of transparent real estate advisory.',
    images: ['/brand/og-image.jpg'],
    creator: '@securehomevizag',
    site: '@securehomevizag',
  },
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: false,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: 'any' },
      { url: '/icon.png', type: 'image/png', sizes: '48x48' },
      { url: '/favicon-32x32.png', type: 'image/png', sizes: '32x32' },
      { url: '/favicon-16x16.png', type: 'image/png', sizes: '16x16' },
      { url: '/icon-192.png', type: 'image/png', sizes: '192x192' },
      { url: '/icon-512.png', type: 'image/png', sizes: '512x512' },
    ],
    apple: [
      { url: '/apple-icon.png', sizes: '180x180', type: 'image/png' },
      { url: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png' },
    ],
  },
  verification: {
    // google: 'YOUR_GOOGLE_SEARCH_CONSOLE_VERIFICATION_CODE',
  },
  // GEO targeting metadata
  other: {
    'geo.region': 'IN-AP',
    'geo.placename': 'Visakhapatnam, Andhra Pradesh',
    'geo.position': '17.6868;83.2185',
    'ICBM': '17.6868, 83.2185',
    'og:locale:alternate': 'te_IN',
    'og:locale:alternate:2': 'hi_IN',
    'DC.title': 'Secure Home Vizag — Real Estate in Visakhapatnam',
    'DC.subject': 'Real Estate, Property, Visakhapatnam, Vizag, Plots, Flats, Villas',
    'DC.description': 'Verified plots, flats, villas and commercial properties in Visakhapatnam with transparent property advisory.',
    'DC.creator': 'Rajesh Ponnada',
    'DC.publisher': 'Secure Home Vizag',
    'DC.language': 'en-IN',
    'DC.coverage': 'Visakhapatnam, Andhra Pradesh, India',
    'rating': 'general',
    'revisit-after': '3 days',
    'language': 'English',
    'distribution': 'global',
    'target': 'all',
    'HandheldFriendly': 'True',
    'MobileOptimized': '320',
  },
};

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const settings = await getSettings();
  const jsonLd = getRealEstateAgentJsonLd(settings, SITE_URL);

  // WebSite schema with SearchAction for sitelinks search box eligibility
  const websiteJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': `${SITE_URL}/#website`,
    name: 'Secure Home Vizag',
    alternateName: ['Secure Homes Vizag', 'Secure Home Visakhapatnam'],
    url: SITE_URL,
    description: 'Verified plots, flats, villas and commercial properties in Visakhapatnam with direct guidance from Rajesh Ponnada. VMRDA and RERA approved listings across all major areas of Vizag.',
    inLanguage: ['en-IN', 'te-IN'],
    isPartOf: {
      '@type': 'WebSite',
      url: SITE_URL,
    },
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: `${SITE_URL}/listings?type={search_term_string}`,
      },
      'query-input': 'required name=search_term_string',
    },
    publisher: {
      '@type': ['Organization', 'RealEstateAgent'],
      '@id': `${SITE_URL}/#organization`,
      name: 'Secure Home Vizag',
      url: SITE_URL,
      logo: {
        '@type': 'ImageObject',
        url: `${SITE_URL}/brand/logo.svg`,
        width: 180,
        height: 45,
      },
    },
    about: {
      '@type': 'Thing',
      name: 'Real Estate in Visakhapatnam',
      description: 'Verified residential and commercial property listings in Vizag with transparent property advisory.',
    },
    keywords: 'real estate Vizag, property Visakhapatnam, plots Vizag, flats Visakhapatnam, villas Vizag, VMRDA approved, RERA approved, NRI property',
  };

  // Organization schema for Knowledge Panel
  const organizationJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    '@id': `${SITE_URL}/#org-entity`,
    name: 'Secure Home Vizag',
    legalName: 'Secure Home Vizag',
    url: SITE_URL,
    logo: `${SITE_URL}/brand/logo.svg`,
    foundingDate: '2014',
    founders: [
      {
        '@type': 'Person',
        name: 'Rajesh Ponnada',
        url: `${SITE_URL}/about`,
      },
    ],
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Visakhapatnam',
      addressRegion: 'Andhra Pradesh',
      postalCode: '530001',
      addressCountry: 'IN',
    },
    contactPoint: {
      '@type': 'ContactPoint',
      telephone: `+91${settings.phone}`,
      contactType: 'customer service',
      availableLanguage: ['English', 'Telugu'],
    },
    sameAs: [
      settings.instagram_url,
      settings.youtube_url,
    ].filter(Boolean),
  };

  return (
    <html
      lang="en-IN"
      className={`${fraunces.variable} ${publicSans.variable}`}
    >
      <head>
        <meta name="theme-color" content="#1A3A5C" />
        <meta name="msapplication-TileColor" content="#1A3A5C" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
        />
      </head>
      <body className="min-h-screen flex flex-col bg-[var(--bg)] text-[var(--text)] antialiased">
        <SplashScreen />
        <Navbar settings={settings} />
        <main className="flex-1" id="main-content">
          {children}
        </main>
        <Footer settings={settings} />
        <MobileBottomBar settings={settings} />
        <DesktopWhatsAppButton settings={settings} />
      </body>
    </html>
  );
}

