import type { Metadata } from 'next';
import { Fraunces, Public_Sans } from 'next/font/google';
import './globals.css';
import { Navbar } from '@/components/navbar';
import { Footer } from '@/components/footer';
import { MobileBottomBar } from '@/components/mobile-bottom-bar';
import { DesktopWhatsAppButton } from '@/components/desktop-whatsapp-button';
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

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'),
  title: {
    default: 'Secure Home Vizag | Verified Plots, Flats and Villas in Visakhapatnam',
    template: '%s | Secure Home Vizag',
  },
  description:
    'Transparent and reliable real estate brokerage in Visakhapatnam. 10+ years local experience in plots, apartments, villas, and commercial properties. Direct pricing in writing.',
  keywords: [
    'Vizag real estate',
    'plots in Visakhapatnam',
    'flats in Madhurawada',
    'villas in Bheemili',
    'VMRDA approved plots',
    'Rajesh Ponnada',
    'Secure Home Vizag',
  ],
  authors: [{ name: 'Rajesh Ponnada' }],
  openGraph: {
    title: 'Secure Home Vizag | Verified Plots, Flats and Villas in Visakhapatnam',
    description:
      'Transparent and reliable real estate brokerage in Visakhapatnam with 10+ years experience. Direct pricing in writing.',
    url: '/',
    siteName: 'Secure Home Vizag',
    locale: 'en_IN',
    type: 'website',
  },
  robots: {
    index: true,
    follow: true,
  },
  icons: {
    icon: [
      { url: '/icon.svg', type: 'image/svg+xml' },
      { url: '/brand/favicon.svg', type: 'image/svg+xml' },
    ],
    apple: [
      { url: '/icon.svg', type: 'image/svg+xml' },
    ],
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
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';
  const jsonLd = getRealEstateAgentJsonLd(settings, siteUrl);

  return (
    <html
      lang="en"
      className={`${fraunces.variable} ${publicSans.variable}`}
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="min-h-screen flex flex-col bg-[var(--bg)] text-[var(--text)] antialiased">
        <Navbar settings={settings} />
        <main className="flex-1">
          {children}
        </main>
        <Footer settings={settings} />
        <MobileBottomBar settings={settings} />
        <DesktopWhatsAppButton settings={settings} />
      </body>
    </html>
  );
}
