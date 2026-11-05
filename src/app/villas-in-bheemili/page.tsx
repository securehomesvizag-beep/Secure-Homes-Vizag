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
  title: 'Villas in Bheemili Vizag | Beach Road Coastal Gated Community Duplex Houses',
  description:
    'Buy luxury coastal villas in Bheemili (Bheemunipatnam), Visakhapatnam. Gated community 3 & 4 BHK duplex houses on Beach Road with private lawns, clubhouses, and verified clear titles. Direct guidance from Rajesh Ponnada.',
  keywords: [
    'villas in bheemili',
    'bheemili villas vizag',
    'bheemili beach road villas',
    'luxury coastal villas vizag',
    'gated community villas bheemili',
    'duplex house in bheemunipatnam',
    'beach villas vizag',
    'beachfront luxury residences bheemili',
    'resort style villas visakhapatnam',
    'coastal enclave villas vizag',
  ],
  alternates: {
    canonical: `${SITE_URL}/villas-in-bheemili`,
  },
  openGraph: {
    title: 'Villas in Bheemili Vizag | Beach Road Coastal Gated Community Duplex Houses',
    description:
      'Explore verified coastal luxury villas along the scenic Bheemili Beach Road corridor. Transparent advisory by Rajesh Ponnada.',
    url: `${SITE_URL}/villas-in-bheemili`,
    type: 'website',
    images: [{ url: '/Villa.jpeg', width: 1200, height: 630, alt: 'Villas in Bheemili Vizag' }],
  },
};

const BHEEMILI_FAQS = [
  {
    question: 'Why is Bheemili Beach Road the premier corridor for gated villa communities?',
    answer:
      'Bheemunipatnam (Bheemili) combines historic coastal heritage with pristine beaches, clean unpolluted air, and rapid highway expansion toward the upcoming Bhogapuram International Airport. It has become Visakhapatnam\'s top destination for sprawling gated villa townships offering resort-style living.',
  },
  {
    question: 'What types of villas are available in Bheemili Beach Road?',
    answer:
      'Gated community coastal villas in Bheemili offer premium options including 3 BHK duplexes and expansive 4/5 BHK beachfront luxury residences with private gardens, modern clubhouse facilities, and panoramic sea views. Contact Secure Home Vizag for customized options and pricing on request.',
  },
];

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export default async function VillasInBheemiliPage() {
  const [allListings, settings] = await Promise.all([getListings(), getSettings()]);
  const bheemiliListings = allListings.filter(
    (l) => l.location.toLowerCase().includes('bheemili') || l.property_type === 'villas'
  );

  const breadcrumbs = getBreadcrumbJsonLd(SITE_URL, [
    { name: 'Home', url: '/' },
    { name: 'Villas in Vizag', url: '/villas-in-vizag' },
    { name: 'Villas in Bheemili', url: '/villas-in-bheemili' },
  ]);

  const faqSchema = getFaqJsonLd(BHEEMILI_FAQS);
  const itemListSchema = getListingsItemListJsonLd(SITE_URL, 'Villas in Bheemili', bheemiliListings);

  return (
    <div className="fade-in">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbs) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListSchema) }} />

      {/* Hero Header */}
      <section className="bg-[var(--surface)] border-b border-[var(--line)] py-12 md:py-20">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 space-y-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#f4ebe6] text-[var(--brand)] text-xs font-semibold rounded-[4px]">
            <MapPin size={16} weight="bold" />
            <span>Scenic Bheemili Beach Road Corridor</span>
          </div>

          <h1 className="font-heading text-3xl sm:text-4xl md:text-5xl text-[var(--ink)] leading-tight max-w-4xl">
            Villas in Bheemili Vizag: Beach Road Coastal Gated Community Duplex Houses
          </h1>

          <p className="text-base sm:text-lg text-[var(--text)] leading-relaxed max-w-3xl">
            Discover resort-inspired coastal luxury on the Bheemunipatnam (Bheemili) Beach corridor. Secure Home Vizag offers verified gated community duplex villas with private gardens, wide internal asphalt roads, clubhouse amenities, and clear 30-year titles.
          </p>

          <div className="flex flex-wrap items-center gap-3 pt-2">
            <Link
              href="/villas-in-rushikonda"
              className="px-3.5 py-2 text-xs font-semibold bg-[var(--bg)] border border-[var(--line)] hover:border-[var(--brand)] text-[var(--ink)] rounded-[4px] transition-colors"
            >
              Villas in Rushikonda Hills &rarr;
            </Link>
            <Link
              href="/plots-in-bheemili"
              className="px-3.5 py-2 text-xs font-semibold bg-[var(--bg)] border border-[var(--line)] hover:border-[var(--brand)] text-[var(--ink)] rounded-[4px] transition-colors"
            >
              Beach Plots in Bheemili &rarr;
            </Link>
            <Link
              href="/villas-in-vizag"
              className="px-3.5 py-2 text-xs font-semibold bg-[var(--surface)] border border-[var(--line)] hover:border-[var(--brand)] text-[var(--ink)] rounded-[4px] transition-colors"
            >
              All Villas in Vizag
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
                Featured Bheemili Coastal Villas
              </h2>
              <p className="text-sm text-[var(--text)] mt-1">
                Verified gated community listings with clear layout sanctions and title deeds.
              </p>
            </div>
          </div>

          <div className="space-y-4">
            {bheemiliListings.slice(0, 4).map((listing) => (
              <ListingRowCard key={listing.id} listing={listing} />
            ))}
          </div>
        </section>

        <VizagPriceBenchmarkTable />
        <LegalVerificationGuide />

        {/* FAQs */}
        <section className="bg-[var(--surface)] border border-[var(--line)] rounded-[4px] p-6 space-y-6">
          <h2 className="font-heading text-2xl md:text-3xl font-semibold text-[var(--ink)]">
            Frequently Asked Questions: Villas in Bheemili
          </h2>

          <div className="divide-y divide-[var(--line)] space-y-4">
            {BHEEMILI_FAQS.map((faq, i) => (
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
              Consult with Rajesh Ponnada on Bheemili Villas
            </h2>
            <p className="text-sm text-[var(--text)]">
              Get genuine local insights into beach road developments, CRZ compliance, and layout verification.
            </p>
            <div className="flex justify-center pt-2">
              <LeadActionButtons phone={settings.phone} whatsappNumber={settings.whatsapp_number} />
            </div>
          </div>
          <div className="max-w-xl mx-auto pt-6 border-t border-[var(--line)]">
            <LeadCaptureForm defaultInterest="villas" />
          </div>
        </section>
      </div>
    </div>
  );
}
