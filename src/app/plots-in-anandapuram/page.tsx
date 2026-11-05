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
  title: 'Plots in Anandapuram Vizag | VMRDA Approved Land for Sale in Anandapuram Junction',
  description:
    'Buy verified VMRDA approved residential plots in Anandapuram Junction, Vizag. Gated layouts, 40ft & 60ft blacktop roads, clear 30-year link titles on NH-16 highway. Direct guidance from Rajesh Ponnada.',
  keywords: [
    'plots in anandapuram',
    'anandapuram plots vizag',
    'plots in anandapuram visakhapatnam',
    'vmrda plots in anandapuram',
    'land for sale in anandapuram',
    'residential plots anandapuram',
    'anandapuram junction real estate',
    'open plots anandapuram vizag',
    'nh 16 anandapuram plots',
    'clear title plots anandapuram',
    'bank loan approved plots anandapuram',
    'gambhiram anandapuram land for sale',
  ],
  alternates: {
    canonical: `${SITE_URL}/plots-in-anandapuram`,
  },
  openGraph: {
    title: 'Plots in Anandapuram Vizag | Verified VMRDA Approved Land for Sale',
    description:
      'Verified VMRDA approved plots at Anandapuram Junction with clear titles, wide BT roads, and rapid connectivity to Vizag city and Bhogapuram airport.',
    url: `${SITE_URL}/plots-in-anandapuram`,
    type: 'website',
    images: [{ url: '/Plots.jpeg', width: 1200, height: 630, alt: 'Plots in Anandapuram Vizag' }],
  },
};

const ANANDAPURAM_FAQS = [
  {
    question: 'Why is Anandapuram considered Vizag\'s premier corridor for plot investments?',
    answer:
      'Anandapuram Junction serves as the central transit junction connecting NH-16 (Chennai-Kolkata), Vizianagaram, Srikakulam, and the coastal Bheemili corridor. With educational institutions (over 10 colleges), expanding commercial hubs, and direct 20-minute access to both central Vizag and the upcoming Bhogapuram International Airport, land values in Anandapuram have appreciated 18%–25% year-on-year.',
  },
  {
    question: 'What types of VMRDA approved plots are available in Anandapuram Junction?',
    answer:
      'Verified VMRDA approved plots in Anandapuram are available in multiple configurations (167 to 500+ sq.yds) with wide blacktop approach roads (40ft to 60ft), underground drainage, and clear 30-year link titles. Contact Rajesh Ponnada for pricing and layout plans on request.',
  },
  {
    question: 'Are bank loans available for plots in Anandapuram?',
    answer:
      'Yes. Nationalized banks including SBI, Union Bank, and leading housing finance corporations sanction home construction and plot purchase loans for VMRDA approved layouts with clear 30-year link documents. Secure Home Vizag manages complete loan verification.',
  },
];

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export default async function PlotsInAnandapuramPage() {
  const [allListings, settings] = await Promise.all([getListings(), getSettings()]);
  const anandapuramListings = allListings.filter(
    (l) => l.location.toLowerCase().includes('anandapuram') || l.property_type === 'plots'
  );

  const breadcrumbs = getBreadcrumbJsonLd(SITE_URL, [
    { name: 'Home', url: '/' },
    { name: 'Plots in Vizag', url: '/plots-in-vizag' },
    { name: 'Plots in Anandapuram', url: '/plots-in-anandapuram' },
  ]);

  const faqSchema = getFaqJsonLd(ANANDAPURAM_FAQS);
  const itemListSchema = getListingsItemListJsonLd(SITE_URL, 'Plots in Anandapuram', anandapuramListings);

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
            <span>VMRDA Sanctioned Layouts | Anandapuram Junction</span>
          </div>

          <h1 className="font-heading text-3xl sm:text-4xl md:text-5xl text-[var(--ink)] leading-tight max-w-4xl">
            Plots in Anandapuram Vizag: VMRDA Approved Land for Sale
          </h1>

          <p className="text-base sm:text-lg text-[var(--text)] leading-relaxed max-w-3xl">
            Anandapuram Junction is the epicenter of Northern Visakhapatnam’s rapid infrastructure boom. Secure Home Vizag provides verified residential and commercial plots with 30-year link titles, VMRDA sanctions, 40-60ft blacktop roads, and direct access from NH-16.
          </p>

          <div className="flex flex-wrap items-center gap-3 pt-2">
            <Link
              href="/plots-in-bhogapuram"
              className="px-3.5 py-2 text-xs font-semibold bg-[var(--bg)] border border-[var(--line)] hover:border-[var(--brand)] text-[var(--ink)] rounded-[4px] transition-colors"
            >
              Bhogapuram Airport Plots &rarr;
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
                Available Plots in Anandapuram &amp; Surrounding Corridor
              </h2>
              <p className="text-sm text-[var(--text)] mt-1">
                Showing pre-inspected properties with verified survey boundaries and clear titles.
              </p>
            </div>
          </div>

          <div className="space-y-4">
            {anandapuramListings.slice(0, 4).map((listing) => (
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
            Frequently Asked Questions: Plots in Anandapuram
          </h2>

          <div className="divide-y divide-[var(--line)] space-y-4">
            {ANANDAPURAM_FAQS.map((faq, i) => (
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
              Inspect Anandapuram Plots with Rajesh Ponnada
            </h2>
            <p className="text-sm text-[var(--text)]">
              Schedule a personalized site visit to inspect VMRDA layout drawings, boundary markings, and approach roads.
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
