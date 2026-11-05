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
  title: 'Plots in Bheemili Vizag | Beach Road Coastal Land & Holiday Home Plots',
  description:
    'Buy verified coastal plots in Bheemili (Bheemunipatnam), Visakhapatnam. VMRDA approved residential open plots on Beach Road for beach villas, holiday homes & long-term appreciation. Direct advisory from Rajesh Ponnada.',
  keywords: [
    'plots in bheemili',
    'bheemili plots vizag',
    'beach road plots vizag',
    'coastal plots in visakhapatnam',
    'bheemunipatnam land for sale',
    'vmrda plots bheemili',
    'holiday home plots vizag',
    'sea facing plots bheemili',
    'gated layout plots bheemili beach corridor',
    'resort villa plots visakhapatnam',
  ],
  alternates: {
    canonical: `${SITE_URL}/plots-in-bheemili`,
  },
  openGraph: {
    title: 'Plots in Bheemili Vizag | Beach Road Coastal Land & Holiday Home Plots',
    description:
      'Verified coastal residential plots along the Bheemili Beach Road corridor. High capital appreciation and clear 30-year titles with Rajesh Ponnada.',
    url: `${SITE_URL}/plots-in-bheemili`,
    type: 'website',
    images: [{ url: '/Plots.jpeg', width: 1200, height: 630, alt: 'Plots in Bheemili Vizag' }],
  },
};

const BHEEMILI_PLOT_FAQS = [
  {
    question: 'Why invest in coastal plots in Bheemili Beach Road?',
    answer:
      'Bheemunipatnam (Bheemili) offers unmatched natural coastal beauty, clean sea air, and strategic positioning along the proposed 6-lane Beach Road corridor extending toward Bhogapuram International Airport. Coastal plots here provide superior appreciation for holiday retreats and luxury custom villas.',
  },
  {
    question: 'What types of residential plots are available in Bheemili?',
    answer:
      'VMRDA approved residential plots in Bheemili are available in gated layouts offering coastal proximity, scenic views, wide internal blacktop roads, and complete legal verification. Contact Secure Home Vizag for customized plots and pricing on request.',
  },
];

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export default async function PlotsInBheemiliPage() {
  const [allListings, settings] = await Promise.all([getListings(), getSettings()]);
  const bheemiliListings = allListings.filter(
    (l) => l.location.toLowerCase().includes('bheemili') || l.property_type === 'plots'
  );

  const breadcrumbs = getBreadcrumbJsonLd(SITE_URL, [
    { name: 'Home', url: '/' },
    { name: 'Plots in Vizag', url: '/plots-in-vizag' },
    { name: 'Plots in Bheemili', url: '/plots-in-bheemili' },
  ]);

  const faqSchema = getFaqJsonLd(BHEEMILI_PLOT_FAQS);
  const itemListSchema = getListingsItemListJsonLd(SITE_URL, 'Plots in Bheemili', bheemiliListings);

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
            <span>Coastal Corridor &amp; Holiday Home Land</span>
          </div>

          <h1 className="font-heading text-3xl sm:text-4xl md:text-5xl text-[var(--ink)] leading-tight max-w-4xl">
            Plots in Bheemili Vizag: Beach Road Coastal Land &amp; Holiday Home Plots
          </h1>

          <p className="text-base sm:text-lg text-[var(--text)] leading-relaxed max-w-3xl">
            Own high-value coastal land along the Bay of Bengal. Secure Home Vizag curates verified open plots in Bheemunipatnam (Bheemili) with VMRDA sanctions, verified CRZ clearances, 40ft blacktop roads, and complete title transparency.
          </p>

          <div className="flex flex-wrap items-center gap-3 pt-2">
            <Link
              href="/villas-in-bheemili"
              className="px-3.5 py-2 text-xs font-semibold bg-[var(--bg)] border border-[var(--line)] hover:border-[var(--brand)] text-[var(--ink)] rounded-[4px] transition-colors"
            >
              Villas in Bheemili &rarr;
            </Link>
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
        <section className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-[var(--line)] pb-4">
            <div>
              <h2 className="font-heading text-2xl md:text-3xl font-semibold text-[var(--ink)]">
                Available Bheemili Coastal Plots
              </h2>
              <p className="text-sm text-[var(--text)] mt-1">
                Verified layout permissions with immediate registration readiness.
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
            Frequently Asked Questions: Plots in Bheemili
          </h2>

          <div className="divide-y divide-[var(--line)] space-y-4">
            {BHEEMILI_PLOT_FAQS.map((faq, i) => (
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
              Consult with Rajesh Ponnada on Bheemili Land
            </h2>
            <p className="text-sm text-[var(--text)]">
              Inspect physical coastal boundary survey stones and verify layout sanction documents directly.
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
