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
  title: 'Commercial Property in Vizag | Shops, Offices & Highway Land in Visakhapatnam',
  description:
    'Buy verified commercial properties in Vizag. Retail showroom spaces, grade-A corporate offices, and highway commercial plots for sale in Gajuwaka, Anandapuram NH-16, and Madhurawada. High ROI opportunities curated by Rajesh Ponnada.',
  keywords: [
    'commercial property in vizag',
    'commercial property visakhapatnam',
    'commercial plots in vizag',
    'shops for sale in vizag',
    'office space in visakhapatnam',
    'commercial land vizag',
    'gajuwaka commercial property',
    'commercial real estate vizag',
    'highway commercial land anandapuram',
    'nh 16 commercial plots vizag',
    'retail showroom space for sale vizag',
    'commercial land near bhogapuram airport',
  ],
  alternates: {
    canonical: `${SITE_URL}/commercial-property-in-vizag`,
  },
  openGraph: {
    title: 'Commercial Property in Vizag | Prime Shops, Offices & Highway Land',
    description:
      'Verified commercial retail shops, corporate offices, and highway commercial land in Visakhapatnam. Direct advisory from Rajesh Ponnada.',
    url: `${SITE_URL}/commercial-property-in-vizag`,
    type: 'website',
    images: [{ url: '/commercial.jpg', width: 1200, height: 630, alt: 'Commercial Property in Vizag' }],
  },
};

const COMMERCIAL_FAQS = [
  {
    question: 'What are the best locations for commercial property investments in Vizag?',
    answer:
      'Gajuwaka is the commercial and retail capital of Visakhapatnam, offering highest daily footfalls and strong retail rental yields (6%–9%). Anandapuram Junction along NH-16 is the premier hub for commercial highway land, warehousing, and logistics, while Madhurawada offers exceptional growth for clinics, banks, and branch offices.',
  },
  {
    question: 'What approvals are required for commercial land in Visakhapatnam?',
    answer:
      'Commercial plots require: (1) VMRDA commercial or mixed-use land zoning approval, (2) Non-Agricultural Land Assessment (NALA) commercial conversion, (3) direct access clearance from the National Highways Authority of India (NHAI) or municipal road department, and (4) fire safety and GVMC building sanctions.',
  },
];

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export default async function CommercialPropertyInVizagPage() {
  const [allListings, settings] = await Promise.all([getListings(), getSettings()]);
  const commercialListings = allListings.filter((l) => l.property_type === 'commercial');

  const breadcrumbs = getBreadcrumbJsonLd(SITE_URL, [
    { name: 'Home', url: '/' },
    { name: 'Real Estate in Vizag', url: '/real-estate-in-vizag' },
    { name: 'Commercial Property in Vizag', url: '/commercial-property-in-vizag' },
  ]);

  const faqSchema = getFaqJsonLd(COMMERCIAL_FAQS);
  const itemListSchema = getListingsItemListJsonLd(SITE_URL, 'Commercial Properties', commercialListings);

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
            <span>High-Yield Commercial Real Estate</span>
          </div>

          <h1 className="font-heading text-3xl sm:text-4xl md:text-5xl text-[var(--ink)] leading-tight max-w-4xl">
            Commercial Property in Vizag: Prime Shops, Offices &amp; Highway Land
          </h1>

          <p className="text-base sm:text-lg text-[var(--text)] leading-relaxed max-w-3xl">
            Invest in high-footfall retail showrooms, grade-A corporate offices, and strategic highway commercial plots across Visakhapatnam. Secure Home Vizag provides verified clear titles, commercial zoning confirmation, and lease advisory to maximize rental yields.
          </p>

          <div className="flex flex-wrap items-center gap-3 pt-2">
            <Link
              href="/plots-in-anandapuram"
              className="px-3.5 py-2 text-xs font-semibold bg-[var(--bg)] border border-[var(--line)] hover:border-[var(--brand)] text-[var(--ink)] rounded-[4px] transition-colors"
            >
              Highway Land in Anandapuram &rarr;
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
                Verified Commercial Properties in Visakhapatnam
              </h2>
              <p className="text-sm text-[var(--text)] mt-1">
                Showing {commercialListings.length} verified commercial assets with verified frontage and zoning.
              </p>
            </div>
          </div>

          <div className="space-y-4">
            {commercialListings.map((listing) => (
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
            Frequently Asked Questions: Commercial Real Estate in Vizag
          </h2>

          <div className="divide-y divide-[var(--line)] space-y-4">
            {COMMERCIAL_FAQS.map((faq, i) => (
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
              Enquire About Commercial Real Estate with Rajesh Ponnada
            </h2>
            <p className="text-sm text-[var(--text)]">
              Receive verified commercial survey drawings, footfall data, and municipal zoning documentation.
            </p>
            <div className="flex justify-center pt-2">
              <LeadActionButtons phone={settings.phone} whatsappNumber={settings.whatsapp_number} />
            </div>
          </div>
          <div className="max-w-xl mx-auto pt-6 border-t border-[var(--line)]">
            <LeadCaptureForm defaultInterest="commercial" />
          </div>
        </section>
      </div>
    </div>
  );
}
