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
  title: 'Flats in Vizag | 2 & 3 BHK Apartments for Sale in Visakhapatnam | RERA Approved',
  description:
    'Explore verified 2 & 3 BHK flats for sale in Vizag. RERA and GVMC approved luxury apartments in Madhurawada, Rushikonda, Yendada & MVP Colony. Ready-to-move and under-construction units with transparent advisory from Rajesh Ponnada.',
  keywords: [
    'flats in vizag',
    'flats in visakhapatnam',
    'apartments in vizag',
    'apartments in visakhapatnam',
    '2 bhk flats in vizag',
    '3 bhk flats in visakhapatnam',
    'flats for sale in vizag',
    'rera approved flats vizag',
    'madhurawada flats',
    'rushikonda apartments',
    'yendada flats',
    'luxury apartments vizag',
    'ready to move flats in vizag',
    'gated community apartments vizag',
    'sea view apartments rushikonda',
    'mvp colony flats for sale',
    'pendurthi 2 bhk flats',
    'aprera registered flats vizag',
  ],
  alternates: {
    canonical: `${SITE_URL}/flats-in-vizag`,
  },
  openGraph: {
    title: 'Flats in Vizag | Verified 2 & 3 BHK RERA Approved Apartments for Sale',
    description:
      'Browse ready-to-move and luxury 2 & 3 BHK apartments across Madhurawada, Rushikonda, and Yendada. Direct legal verification by Rajesh Ponnada.',
    url: `${SITE_URL}/flats-in-vizag`,
    type: 'website',
    images: [{ url: '/Apartments.jpeg', width: 1200, height: 630, alt: 'Flats in Vizag' }],
  },
};

const FLAT_FAQS = [
  {
    question: 'What choices of 2 BHK and 3 BHK flats are available across Visakhapatnam?',
    answer:
      'In emerging residential belts like Pendurthi and Anandapuram, comfortable 2 BHK apartments are widely available. In prime central and IT hubs like Madhurawada, Yendada, and Rushikonda, buyers can choose from premium 2 BHK flats to expansive 3 BHK luxury gated community residences with clubhouse amenities. Contact Secure Home Vizag for verified options and pricing on request.',
  },
  {
    question: 'How do I verify if an apartment project in Vizag is RERA approved?',
    answer:
      'Every multi-unit residential project in Andhra Pradesh must possess a valid APRERA registration number (e.g., P0329001XXXX). Secure Home Vizag verifies the project listing on the official AP RERA portal, ensures the builder has registered the project escrow account, checks approved structural drawings, and confirms the Occupancy Certificate (OC) status.',
  },
  {
    question: 'What is Undivided Share of Land (UDS) and why is it important in Vizag apartments?',
    answer:
      'Undivided Share (UDS) is the portion of the plot owned by you as an apartment owner. In Vizag, a higher UDS guarantees stronger long-term asset value. Secure Home Vizag ensures that the registered UDS in your sale deed precisely matches the statutory proportion of your flat size relative to the total built-up area.',
  },
  {
    question: 'Which areas in Vizag have the highest rental demand for flats?',
    answer:
      'Madhurawada, Rushikonda, and PM Palem consistently experience the highest rental yields (3.5%–4.5%) in Visakhapatnam due to proximity to IT Hills (IT SEZ), Cognizant, Gitam University, and healthcare centers. Properties in these areas maintain near-zero vacancy rates.',
  },
];

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export default async function FlatsInVizagPage() {
  const [allListings, settings] = await Promise.all([getListings(), getSettings()]);
  const flatListings = allListings.filter((l) => l.property_type === 'flats');

  const breadcrumbs = getBreadcrumbJsonLd(SITE_URL, [
    { name: 'Home', url: '/' },
    { name: 'Real Estate in Vizag', url: '/real-estate-in-vizag' },
    { name: 'Flats in Vizag', url: '/flats-in-vizag' },
  ]);

  const faqSchema = getFaqJsonLd(FLAT_FAQS);
  const itemListSchema = getListingsItemListJsonLd(SITE_URL, 'Apartments and Flats', flatListings);

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
            <span>100% APRERA &amp; GVMC Sanctioned</span>
          </div>

          <h1 className="font-heading text-3xl sm:text-4xl md:text-5xl text-[var(--ink)] leading-tight max-w-4xl">
            Flats in Vizag: 2 &amp; 3 BHK Apartments for Sale in Visakhapatnam
          </h1>

          <p className="text-base sm:text-lg text-[var(--text)] leading-relaxed max-w-3xl">
            Find ready-to-move and under-construction 2 and 3 BHK apartments across Visakhapatnam’s prime residential neighborhoods. Secure Home Vizag inspects builder track records, verifies documented Occupancy Certificates (OC), and ensures transparent pricing with zero broker commission.
          </p>

          <div className="flex flex-wrap items-center gap-3 pt-2">
            <Link
              href="/flats-in-madhurawada"
              className="px-3.5 py-2 text-xs font-semibold bg-[var(--bg)] border border-[var(--line)] hover:border-[var(--brand)] text-[var(--ink)] rounded-[4px] transition-colors"
            >
              Flats in Madhurawada IT Corridor &rarr;
            </Link>
            <Link
              href="/villas-in-vizag"
              className="px-3.5 py-2 text-xs font-semibold bg-[var(--surface)] border border-[var(--line)] hover:border-[var(--brand)] text-[var(--ink)] rounded-[4px] transition-colors"
            >
              Explore Coastal Villas in Vizag
            </Link>
            <Link
              href="/plots-in-vizag"
              className="px-3.5 py-2 text-xs font-semibold bg-[var(--surface)] border border-[var(--line)] hover:border-[var(--brand)] text-[var(--ink)] rounded-[4px] transition-colors"
            >
              Residential Plots in Vizag
            </Link>
          </div>
        </div>
      </section>

      {/* Main Container */}
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 py-12 md:py-16 space-y-16">
        {/* Listings Section */}
        <section className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-[var(--line)] pb-4">
            <div>
              <h2 className="font-heading text-2xl md:text-3xl font-semibold text-[var(--ink)]">
                Available Verified Apartments in Visakhapatnam
              </h2>
              <p className="text-sm text-[var(--text)] mt-1">
                Showing {flatListings.length} verified apartments with transparent floor plans and parking allotments.
              </p>
            </div>
          </div>

          <div className="space-y-4">
            {flatListings.map((listing) => (
              <ListingRowCard key={listing.id} listing={listing} />
            ))}
          </div>
        </section>

        {/* Regulatory & Valuation Protocol */}
        <VizagPriceBenchmarkTable />
        <LegalVerificationGuide />

        {/* FAQs */}
        <section className="bg-[var(--surface)] border border-[var(--line)] rounded-[4px] p-6 space-y-6">
          <h2 className="font-heading text-2xl md:text-3xl font-semibold text-[var(--ink)]">
            Frequently Asked Questions: Buying a Flat in Visakhapatnam
          </h2>

          <div className="divide-y divide-[var(--line)] space-y-4">
            {FLAT_FAQS.map((faq, i) => (
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
              Enquire About Verified Apartments in Vizag
            </h2>
            <p className="text-sm text-[var(--text)]">
              Connect directly with Rajesh Ponnada to review approved floor plans, builder agreements, and coordinate private flat visits.
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
