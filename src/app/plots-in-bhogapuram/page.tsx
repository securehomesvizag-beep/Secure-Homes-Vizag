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
  title: 'Plots in Bhogapuram | VMRDA Approved Land Near International Airport Vizag',
  description:
    'Invest in VMRDA approved plots in Bhogapuram Airport Corridor. High-ROI open residential plots, 60ft master plan roads, clear 30-year titles near GMR Aerocity. Direct advisory from Rajesh Ponnada.',
  keywords: [
    'plots in bhogapuram',
    'bhogapuram plots vizag',
    'bhogapuram airport plots',
    'vmrda approved plots in bhogapuram',
    'land for sale in bhogapuram',
    'bhogapuram real estate',
    'gmr aerocity bhogapuram plots',
    'plots near bhogapuram international airport',
    'land banking bhogapuram vizag',
    'commercial plots near bhogapuram airport',
    'beach corridor plots bhogapuram',
    'open plots near vizag greenfield airport',
  ],
  alternates: {
    canonical: `${SITE_URL}/plots-in-bhogapuram`,
  },
  openGraph: {
    title: 'Plots in Bhogapuram | VMRDA Approved Land Near International Airport Vizag',
    description:
      'Verified VMRDA approved residential plots in the Bhogapuram International Airport corridor. High-appreciation land banking curated by Rajesh Ponnada.',
    url: `${SITE_URL}/plots-in-bhogapuram`,
    type: 'website',
    images: [{ url: '/Plots.jpeg', width: 1200, height: 630, alt: 'Plots in Bhogapuram' }],
  },
};

const BHOGAPURAM_FAQS = [
  {
    question: 'Why is Bhogapuram the highest appreciation real estate zone in the Vizag region?',
    answer:
      'The GMR Bhogapuram International Airport and adjoining Aerocity, multi-modal logistics hubs, and aviation universities make Bhogapuram the epicenter of regional capital appreciation. Plots purchased in approved layouts are experiencing annual appreciation rates of 22%–30%.',
  },
  {
    question: 'What types of VMRDA plots are available in Bhogapuram?',
    answer:
      'VMRDA approved open plots within 5 to 15 minutes of the airport terminal and master plan sector roads are available in varied sizes with clear titles and bank loan approvals. Contact Secure Home Vizag for available plots and pricing on request.',
  },
];

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export default async function PlotsInBhogapuramPage() {
  const [allListings, settings] = await Promise.all([getListings(), getSettings()]);
  const bhogapuramListings = allListings.filter(
    (l) => l.location.toLowerCase().includes('bhogapuram') || l.property_type === 'plots'
  );

  const breadcrumbs = getBreadcrumbJsonLd(SITE_URL, [
    { name: 'Home', url: '/' },
    { name: 'Plots in Vizag', url: '/plots-in-vizag' },
    { name: 'Plots in Bhogapuram', url: '/plots-in-bhogapuram' },
  ]);

  const faqSchema = getFaqJsonLd(BHOGAPURAM_FAQS);
  const itemListSchema = getListingsItemListJsonLd(SITE_URL, 'Plots in Bhogapuram', bhogapuramListings);

  return (
    <div className="fade-in">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbs) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListSchema) }} />

      {/* Hero Header */}
      <section className="bg-[var(--surface)] border-b border-[var(--line)] py-12 md:py-20">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 space-y-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#eaf4ef] text-[var(--success)] text-xs font-semibold rounded-[4px]">
            <svg className="w-4 h-4 text-[var(--success)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
            </svg>
            <span>International Airport Corridor &amp; GMR Aerocity</span>
          </div>

          <h1 className="font-heading text-3xl sm:text-4xl md:text-5xl text-[var(--ink)] leading-tight max-w-4xl">
            Plots in Bhogapuram: VMRDA Approved Land Near Vizag International Airport
          </h1>

          <p className="text-base sm:text-lg text-[var(--text)] leading-relaxed max-w-3xl">
            Secure prime plotted land assets in the Bhogapuram International Airport corridor. Secure Home Vizag offers pre-verified VMRDA approved ventures featuring 60-ft and 40-ft sector roads, underground amenities, clear 30-year titles, and high-growth land banking opportunities.
          </p>

          <div className="flex flex-wrap items-center gap-3 pt-2">
            <Link
              href="/plots-in-anandapuram"
              className="px-3.5 py-2 text-xs font-semibold bg-[var(--bg)] border border-[var(--line)] hover:border-[var(--brand)] text-[var(--ink)] rounded-[4px] transition-colors"
            >
              Plots in Anandapuram &rarr;
            </Link>
            <Link
              href="/plots-in-vizag"
              className="px-3.5 py-2 text-xs font-semibold bg-[var(--surface)] border border-[var(--line)] hover:border-[var(--brand)] text-[var(--ink)] rounded-[4px] transition-colors"
            >
              All Plots in Vizag
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
                Featured Airport Corridor Plots
              </h2>
              <p className="text-sm text-[var(--text)] mt-1">
                Verified layout permissions with immediate sub-registrar registration availability.
              </p>
            </div>
          </div>

          <div className="space-y-4">
            {bhogapuramListings.slice(0, 4).map((listing) => (
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
            Frequently Asked Questions: Plots in Bhogapuram
          </h2>

          <div className="divide-y divide-[var(--line)] space-y-4">
            {BHOGAPURAM_FAQS.map((faq, i) => (
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
              Consult with Rajesh Ponnada on Bhogapuram Investments
            </h2>
            <p className="text-sm text-[var(--text)]">
              Get authentic ground-level guidance on airport approach roads, VMRDA LP files, and projected land appreciation.
            </p>
            <div className="flex justify-center pt-2">
              <LeadActionButtons phone={settings.phone} whatsappNumber={settings.whatsapp_number} />
            </div>
          </div>
          <div className="max-w-xl mx-auto pt-6 border-t border-[var(--line)]">
            <LeadCaptureForm defaultInterest="plots" />
          </div>
        </section>
      </div>
    </div>
  );
}
