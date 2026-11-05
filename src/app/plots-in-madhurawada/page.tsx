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
  title: 'Plots in Madhurawada Vizag | VMRDA Approved Land Near IT Corridor',
  description:
    'Buy verified VMRDA approved residential plots in Madhurawada, Visakhapatnam. Ready for immediate house construction near IT SEZ, Kommadi & PM Palem. Clear titles and bank loan support from Rajesh Ponnada.',
  keywords: [
    'plots in madhurawada',
    'madhurawada plots vizag',
    'vmrda plots in madhurawada',
    'residential plots madhurawada',
    'land for sale in madhurawada',
    'madhurawada real estate',
    'kommadi plots vizag',
    'pm palem plots visakhapatnam',
    'open plots near madhurawada it sez',
    'cricket stadium madhurawada land',
    'clear title house plots madhurawada',
  ],
  alternates: {
    canonical: `${SITE_URL}/plots-in-madhurawada`,
  },
  openGraph: {
    title: 'Plots in Madhurawada Vizag | VMRDA Approved Land Near IT Corridor',
    description:
      'Verified VMRDA approved residential plots in Madhurawada IT corridor. Immediate possession, clear 30-year titles, and direct advisory by Rajesh Ponnada.',
    url: `${SITE_URL}/plots-in-madhurawada`,
    type: 'website',
    images: [{ url: '/Plots.jpeg', width: 1200, height: 630, alt: 'Plots in Madhurawada Vizag' }],
  },
};

const MADHURAWADA_PLOT_FAQS = [
  {
    question: 'Why buy a residential plot in Madhurawada?',
    answer:
      'Madhurawada is the core IT and urban residential hub of Visakhapatnam. Proximity to the Rushikonda IT SEZ, top-tier CBSE schools, super-specialty hospitals, and shopping centers makes plots here highly coveted for constructing personalized independent duplex homes and enjoying steady rental income.',
  },
  {
    question: 'What types of residential plots are available in Madhurawada?',
    answer:
      'Plots in Madhurawada are available in well-planned localities like PM Palem, Kommadi, and near the main NH-16 highway belt, ideal for constructing independent duplex homes or high-yield rental properties. Contact Secure Home Vizag for verified options and pricing on request.',
  },
];

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export default async function PlotsInMadhurawadaPage() {
  const [allListings, settings] = await Promise.all([getListings(), getSettings()]);
  const madhurawadaListings = allListings.filter(
    (l) => l.location.toLowerCase().includes('madhurawada') || l.property_type === 'plots'
  );

  const breadcrumbs = getBreadcrumbJsonLd(SITE_URL, [
    { name: 'Home', url: '/' },
    { name: 'Plots in Vizag', url: '/plots-in-vizag' },
    { name: 'Plots in Madhurawada', url: '/plots-in-madhurawada' },
  ]);

  const faqSchema = getFaqJsonLd(MADHURAWADA_PLOT_FAQS);
  const itemListSchema = getListingsItemListJsonLd(SITE_URL, 'Plots in Madhurawada', madhurawadaListings);

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
            <span>Ready for House Construction | IT Corridor</span>
          </div>

          <h1 className="font-heading text-3xl sm:text-4xl md:text-5xl text-[var(--ink)] leading-tight max-w-4xl">
            Plots in Madhurawada Vizag: VMRDA Approved Land Near IT Corridor
          </h1>

          <p className="text-base sm:text-lg text-[var(--text)] leading-relaxed max-w-3xl">
            Construct your dream home in Visakhapatnam’s prime IT growth corridor. Secure Home Vizag provides verified clear-title plots in Madhurawada with ready electricity, municipal water access, VMRDA sanctions, and complete document transparency.
          </p>

          <div className="flex flex-wrap items-center gap-3 pt-2">
            <Link
              href="/flats-in-madhurawada"
              className="px-3.5 py-2 text-xs font-semibold bg-[var(--bg)] border border-[var(--line)] hover:border-[var(--brand)] text-[var(--ink)] rounded-[4px] transition-colors"
            >
              Flats in Madhurawada &rarr;
            </Link>
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
        <section className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-[var(--line)] pb-4">
            <div>
              <h2 className="font-heading text-2xl md:text-3xl font-semibold text-[var(--ink)]">
                Available Plots in Madhurawada &amp; Surrounds
              </h2>
              <p className="text-sm text-[var(--text)] mt-1">
                Verified layout permissions with immediate sub-registrar registration availability.
              </p>
            </div>
          </div>

          <div className="space-y-4">
            {madhurawadaListings.slice(0, 4).map((listing) => (
              <ListingRowCard key={listing.id} listing={listing} />
            ))}
          </div>
        </section>

        <VizagPriceBenchmarkTable />
        <LegalVerificationGuide />

        {/* FAQs */}
        <section className="bg-[var(--surface)] border border-[var(--line)] rounded-[4px] p-6 space-y-6">
          <h2 className="font-heading text-2xl md:text-3xl font-semibold text-[var(--ink)]">
            Frequently Asked Questions: Plots in Madhurawada
          </h2>

          <div className="divide-y divide-[var(--line)] space-y-4">
            {MADHURAWADA_PLOT_FAQS.map((faq, i) => (
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
              Inspect Madhurawada Plots with Rajesh Ponnada
            </h2>
            <p className="text-sm text-[var(--text)]">
              Get direct layout verification, boundary stone checks, and transparent documentation before you buy.
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
