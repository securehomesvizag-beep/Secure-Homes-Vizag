import React from 'react';
import Link from 'next/link';
import { Metadata } from 'next';
import { getListings, getSettings } from '@/lib/data';
import { ListingRowCard } from '@/components/listing-row-card';
import { LeadCaptureForm } from '@/components/lead-capture-form';
import { LeadActionButtons } from '@/components/lead-action-buttons';
import { VizagPriceBenchmarkTable, LegalVerificationGuide } from '@/components/seo-regulatory-hub';
import { getBreadcrumbJsonLd, getFaqJsonLd, getListingsItemListJsonLd } from '@/lib/jsonld';
import { ArrowUpRight, ShieldCheck, MapPin } from '@phosphor-icons/react/dist/ssr';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.securehomevizag.com';

export const metadata: Metadata = {
  title: 'Flats in Madhurawada Vizag | 2 & 3 BHK Apartments for Sale in IT Corridor',
  description:
    'Buy verified 2 & 3 BHK flats in Madhurawada, Visakhapatnam. RERA and GVMC approved luxury gated community apartments near Rushikonda IT SEZ, Kommadi & PM Palem. Direct transparent advisory by Rajesh Ponnada.',
  keywords: [
    'flats in madhurawada',
    'madhurawada flats vizag',
    'apartments in madhurawada',
    '2 bhk flats in madhurawada',
    '3 bhk flats in madhurawada',
    'madhurawada gated community flats',
    'rera flats madhurawada vizag',
    'flats near rushikonda it sez',
    'ready to move flats in madhurawada',
    'luxury clubhouse apartments madhurawada',
    'pm palem apartments for sale',
    'kommadi 2 bhk flats vizag',
  ],
  alternates: {
    canonical: `${SITE_URL}/flats-in-madhurawada`,
  },
  openGraph: {
    title: 'Flats in Madhurawada Vizag | 2 & 3 BHK Apartments for Sale in IT Corridor',
    description:
      'Verified RERA approved 2 and 3 BHK apartments in prime Madhurawada IT corridor. Clear titles and direct guidance from Rajesh Ponnada.',
    url: `${SITE_URL}/flats-in-madhurawada`,
    type: 'website',
    images: [{ url: '/Apartments.jpeg', width: 1200, height: 630, alt: 'Flats in Madhurawada Vizag' }],
  },
};

const MADHURAWADA_FLAT_FAQS = [
  {
    question: 'Why is Madhurawada the most popular area for apartment buyers in Vizag?',
    answer:
      'Madhurawada is the focal point of Visakhapatnam\'s IT industry, housing prominent tech companies, IT SEZ hills, and the upcoming Adani AI data center campus. It provides premier educational institutions, well-planned residential layouts, cricket stadium proximity, and rapid connectivity to both Beach Road and central Vizag.',
  },
  {
    question: 'What types of 2 BHK and 3 BHK flats are available in Madhurawada?',
    answer:
      'Madhurawada features well-planned 2 BHK and spacious 3 BHK luxury gated community apartments with modern clubhouse amenities, dedicated parking, and round-the-clock security. Contact Secure Home Vizag for available verified units and pricing on request.',
  },
];

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export default async function FlatsInMadhurawadaPage() {
  const [allListings, settings] = await Promise.all([getListings(), getSettings()]);
  const madhurawadaFlatListings = allListings.filter(
    (l) => l.location.toLowerCase().includes('madhurawada') || l.property_type === 'flats'
  );

  const breadcrumbs = getBreadcrumbJsonLd(SITE_URL, [
    { name: 'Home', url: '/' },
    { name: 'Flats in Vizag', url: '/flats-in-vizag' },
    { name: 'Flats in Madhurawada', url: '/flats-in-madhurawada' },
  ]);

  const faqSchema = getFaqJsonLd(MADHURAWADA_FLAT_FAQS);
  const itemListSchema = getListingsItemListJsonLd(SITE_URL, 'Flats in Madhurawada', madhurawadaFlatListings);

  return (
    <div className="fade-in">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbs) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListSchema) }} />

      {/* Hero Header */}
      <section className="bg-[var(--surface)] border-b border-[var(--line)] py-12 md:py-20">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 space-y-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#eaf4ef] text-[var(--success)] text-xs font-semibold rounded-[4px]">
            <ShieldCheck size={16} weight="bold" />
            <span>RERA Registered &amp; GVMC Approved | IT Corridor</span>
          </div>

          <h1 className="font-heading text-3xl sm:text-4xl md:text-5xl text-[var(--ink)] leading-tight max-w-4xl">
            Flats in Madhurawada Vizag: 2 &amp; 3 BHK Apartments for Sale in IT Corridor
          </h1>

          <p className="text-base sm:text-lg text-[var(--text)] leading-relaxed max-w-3xl">
            Live within 5 minutes of Vizag’s premier IT hubs, international schools, and coastal breezes. Secure Home Vizag presents vetted 2 and 3 BHK apartments in Madhurawada with documented Occupancy Certificates, clear undivided share of land (UDS), and transparent builder agreements.
          </p>

          <div className="flex flex-wrap items-center gap-3 pt-2">
            <Link
              href="/plots-in-madhurawada"
              className="px-3.5 py-2 text-xs font-semibold bg-[var(--bg)] border border-[var(--line)] hover:border-[var(--brand)] text-[var(--ink)] rounded-[4px] transition-colors"
            >
              Plots in Madhurawada &rarr;
            </Link>
            <Link
              href="/flats-in-vizag"
              className="px-3.5 py-2 text-xs font-semibold bg-[var(--surface)] border border-[var(--line)] hover:border-[var(--brand)] text-[var(--ink)] rounded-[4px] transition-colors"
            >
              All Flats in Vizag
            </Link>
          </div>
        </div>
      </section>

      {/* Main Container */}
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 py-12 md:py-16 space-y-16">
        <section className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-[var(--line)] pb-4">
            <div>
              <h2 className="font-heading text-2xl md:text-3xl font-semibold text-[var(--ink)]">
                Available Apartments in Madhurawada
              </h2>
              <p className="text-sm text-[var(--text)] mt-1">
                Verified RERA compliance, lift access, power backup, and dedicated parking.
              </p>
            </div>
          </div>

          <div className="space-y-4">
            {madhurawadaFlatListings.slice(0, 4).map((listing) => (
              <ListingRowCard key={listing.id} listing={listing} />
            ))}
          </div>
        </section>

        <VizagPriceBenchmarkTable />
        <LegalVerificationGuide />

        {/* FAQs */}
        <section className="bg-[var(--surface)] border border-[var(--line)] rounded-[4px] p-6 space-y-6">
          <h2 className="font-heading text-2xl md:text-3xl font-semibold text-[var(--ink)]">
            Frequently Asked Questions: Flats in Madhurawada
          </h2>

          <div className="divide-y divide-[var(--line)] space-y-4">
            {MADHURAWADA_FLAT_FAQS.map((faq, i) => (
              <div key={i} className="pt-4 first:pt-0 space-y-2">
                <h3 className="font-semibold text-base text-[var(--ink)] flex items-start gap-2">
                  <span className="text-[var(--brand)] font-bold">Q{i + 1}:</span>
                  <span>{faq.question}</span>
                </h3>
                <p className="text-sm text-[var(--text)] leading-relaxed pl-6">
                  {faq.answer}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Lead Capture */}
        <section className="bg-[var(--surface)] border border-[var(--line)] rounded-[4px] p-8 space-y-6">
          <div className="max-w-2xl mx-auto text-center space-y-3">
            <h2 className="font-heading text-2xl md:text-3xl font-semibold text-[var(--ink)]">
              Consult with Rajesh Ponnada on Madhurawada Flats
            </h2>
            <p className="text-sm text-[var(--text)]">
              Review builder-buyer agreements, verify approved floor plans, and coordinate site visits.
            </p>
            <div className="flex justify-center pt-2">
              <LeadActionButtons phone={settings.phone} whatsappNumber={settings.whatsapp_number} />
            </div>
          </div>
          <div className="max-w-xl mx-auto pt-6 border-t border-[var(--line)]">
            <LeadCaptureForm defaultInterest="flats" />
          </div>
        </section>
      </div>
    </div>
  );
}
