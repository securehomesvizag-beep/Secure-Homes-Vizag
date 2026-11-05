import React from 'react';
import Link from 'next/link';
import { Metadata } from 'next';
import { getListings, getSettings } from '@/lib/data';
import { ListingRowCard } from '@/components/listing-row-card';
import { LeadCaptureForm } from '@/components/lead-capture-form';
import { LeadActionButtons } from '@/components/lead-action-buttons';
import { VizagPriceBenchmarkTable, LegalVerificationGuide } from '@/components/seo-regulatory-hub';
import { getBreadcrumbJsonLd, getFaqJsonLd, getHowToJsonLd, getSpeakableJsonLd, getListingsItemListJsonLd } from '@/lib/jsonld';
import { ArrowUpRight, ShieldCheck, MapPin } from '@phosphor-icons/react/dist/ssr';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.securehomevizag.com';

export const metadata: Metadata = {
  title: 'Plots in Vizag | VMRDA Approved Residential Land for Sale in Visakhapatnam',
  description:
    'Buy verified VMRDA approved plots in Vizag. Residential open plots for sale in Anandapuram, Bhogapuram airport corridor, Madhurawada & Bheemili. Clear 30-year link titles, 40-60ft BT roads, bank loan assistance from Rajesh Ponnada.',
  keywords: [
    'plots in vizag',
    'plots in visakhapatnam',
    'plots for sale in vizag',
    'residential plots vizag',
    'vmrda approved plots vizag',
    'vuda approved plots vizag',
    'open plots in vizag',
    'anandapuram plots',
    'bhogapuram plots',
    'madhurawada plots',
    'bheemili plots',
    'land for sale in vizag',
    'buy plot in visakhapatnam',
    'clear title plots vizag',
    'vmrda layout lp number verification',
    'gated community plots visakhapatnam',
    'highway facing plots nh 16 vizag',
    'residential land for sale vizag',
    'bank loan approved plots vizag',
  ],
  alternates: {
    canonical: `${SITE_URL}/plots-in-vizag`,
  },
  openGraph: {
    title: 'Plots in Vizag | Verified VMRDA Approved Residential Land for Sale',
    description:
      'Explore clear title VMRDA approved residential plots in Visakhapatnam. Anandapuram, Bhogapuram, Madhurawada corridors with direct advisory from Rajesh Ponnada.',
    url: `${SITE_URL}/plots-in-vizag`,
    type: 'website',
    images: [{ url: '/Plots.jpeg', width: 1200, height: 630, alt: 'Plots in Vizag' }],
  },
};

const PLOT_FAQS = [
  {
    question: 'What types of residential plots are available in Vizag across different corridors?',
    answer:
      'Plot choices in Visakhapatnam span high-growth airport corridors like Anandapuram Junction and Bhogapuram, established suburban IT hubs like Madhurawada, and scenic coastal stretches like Bheemili Beach Road. Contact Secure Home Vizag for verified layout availability and pricing on request.',
  },
  {
    question: 'How do I check if a plot in Vizag has a genuine VMRDA approval?',
    answer:
      'Every legitimate VMRDA layout has a designated LP (Layout Permission) Number, e.g., LP No. XX/YYYY. Secure Home Vizag verifies the LP order copy from the VMRDA office, inspects the approved layout drawing, confirms the 10% mortgage release endorsement, and ensures the approach road meets minimum width guidelines (at least 33 to 40 feet).',
  },
  {
    question: 'Can I get a bank home construction loan on VMRDA approved plots?',
    answer:
      'Yes. Nationalized and private banks (including SBI, HDFC, ICICI, and Bank of Baroda) offer composite plot-plus-construction loans for VMRDA approved layouts with clear 30-year link titles and non-agricultural (NALA) conversion certificates. Secure Home Vizag assists buyers with complete bank documentation.',
  },
  {
    question: 'Which areas have the best plots for investment in Visakhapatnam?',
    answer:
      'The highest capital appreciation corridor is the northern expansion belt along NH-16: Anandapuram Junction, Tagarapuvalasa, and the Bhogapuram International Airport zone. For residential end-use within 1–2 years, Madhurawada and Pendurthi/Sujatha Nagar are optimal choices due to ready water, power, and schools.',
  },
];

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export default async function PlotsInVizagPage() {
  const [allListings, settings] = await Promise.all([getListings(), getSettings()]);
  const plotListings = allListings.filter((l) => l.property_type === 'plots');

  const breadcrumbs = getBreadcrumbJsonLd(SITE_URL, [
    { name: 'Home', url: '/' },
    { name: 'Real Estate in Vizag', url: '/real-estate-in-vizag' },
    { name: 'Plots in Vizag', url: '/plots-in-vizag' },
  ]);

  const faqSchema = getFaqJsonLd(PLOT_FAQS);
  const itemListSchema = getListingsItemListJsonLd(SITE_URL, 'Residential Plots', plotListings);
  const howToSchema = getHowToJsonLd(
    SITE_URL,
    'How to Buy a VMRDA Approved Plot in Vizag',
    'Step-by-step verification and registration guide for purchasing residential plots in Visakhapatnam.',
    [
      { name: 'Verify VMRDA LP Sanction', text: 'Obtain the official Layout Permission number and verify developer compliance on the VMRDA portal.' },
      { name: 'Inspect 30-Year Title Chain & EC', text: 'Scrutinize link documents for uninterrupted ownership and verify non-inclusion in Section 22A prohibited lists.' },
      { name: 'Physical Boundary Verification', text: 'Inspect site stones, road widths (min 33-40ft), electricity lines, and underground drainage.' },
      { name: 'Execute Sub-Registrar Deed Handover', text: 'Complete registration at the relevant Sub-Registrar Office with 7.5% government stamp duty and taxes.' },
    ]
  );

  return (
    <div className="fade-in">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbs) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }} />

      {/* Hero Section */}
      <section className="bg-[var(--surface)] border-b border-[var(--line)] py-12 md:py-20">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 space-y-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#eaf4ef] text-[var(--success)] text-xs font-semibold rounded-[4px]">
            <ShieldCheck size={16} weight="bold" />
            <span>100% VMRDA &amp; Clear Title Sanctioned</span>
          </div>

          <h1 className="font-heading text-3xl sm:text-4xl md:text-5xl text-[var(--ink)] leading-tight max-w-4xl">
            Plots in Vizag: VMRDA Approved Residential Land for Sale in Visakhapatnam
          </h1>

          <p className="text-base sm:text-lg text-[var(--text)] leading-relaxed max-w-3xl">
            Explore pre-verified residential plots and open land developments in Visakhapatnam’s highest-appreciating corridors. Every plot offered by Secure Home Vizag features verified 30-year link titles, VMRDA layout permissions, demarcated boundaries, and direct guidance from Rajesh Ponnada.
          </p>

          <div className="flex flex-wrap items-center gap-3 pt-2">
            <Link
              href="/plots-in-anandapuram"
              className="px-3.5 py-2 text-xs font-semibold bg-[var(--bg)] border border-[var(--line)] hover:border-[var(--brand)] text-[var(--ink)] rounded-[4px] transition-colors"
            >
              Plots in Anandapuram &rarr;
            </Link>
            <Link
              href="/plots-in-bhogapuram"
              className="px-3.5 py-2 text-xs font-semibold bg-[var(--bg)] border border-[var(--line)] hover:border-[var(--brand)] text-[var(--ink)] rounded-[4px] transition-colors"
            >
              Plots in Bhogapuram Airport Corridor &rarr;
            </Link>
            <Link
              href="/plots-in-madhurawada"
              className="px-3.5 py-2 text-xs font-semibold bg-[var(--bg)] border border-[var(--line)] hover:border-[var(--brand)] text-[var(--ink)] rounded-[4px] transition-colors"
            >
              Plots in Madhurawada &rarr;
            </Link>
            <Link
              href="/plots-in-bheemili"
              className="px-3.5 py-2 text-xs font-semibold bg-[var(--bg)] border border-[var(--line)] hover:border-[var(--brand)] text-[var(--ink)] rounded-[4px] transition-colors"
            >
              Plots in Bheemili &rarr;
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
                Available Residential Plots in Visakhapatnam
              </h2>
              <p className="text-sm text-[var(--text)] mt-1">
                Showing {plotListings.length} verified plotted opportunities with immediate registration readiness.
              </p>
            </div>
          </div>

          <div className="space-y-4">
            {plotListings.map((listing) => (
              <ListingRowCard key={listing.id} listing={listing} />
            ))}
          </div>
        </section>

        {/* Locality Silo Cross-Links */}
        <section className="bg-[var(--surface)] border border-[var(--line)] rounded-[4px] p-6 space-y-4">
          <h3 className="font-heading text-xl font-semibold text-[var(--ink)]">
            Explore Plots by Specific High-Growth Micro-Corridors
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 pt-2">
            <Link
              href="/plots-in-anandapuram"
              className="p-4 bg-[var(--bg)] border border-[var(--line)] rounded-[4px] hover:border-[var(--brand)] transition-colors group space-y-1.5"
            >
              <h4 className="font-semibold text-sm text-[var(--ink)] group-hover:text-[var(--brand)]">
                Anandapuram Plots
              </h4>
              <p className="text-xs text-[var(--text)]">Fastest appreciating NH-16 junction plots with wide BT roads.</p>
            </Link>

            <Link
              href="/plots-in-bhogapuram"
              className="p-4 bg-[var(--bg)] border border-[var(--line)] rounded-[4px] hover:border-[var(--brand)] transition-colors group space-y-1.5"
            >
              <h4 className="font-semibold text-sm text-[var(--ink)] group-hover:text-[var(--brand)]">
                Bhogapuram Airport Plots
              </h4>
              <p className="text-xs text-[var(--text)]">Prime airport Aerocity corridor for high ROI land banking.</p>
            </Link>

            <Link
              href="/plots-in-madhurawada"
              className="p-4 bg-[var(--bg)] border border-[var(--line)] rounded-[4px] hover:border-[var(--brand)] transition-colors group space-y-1.5"
            >
              <h4 className="font-semibold text-sm text-[var(--ink)] group-hover:text-[var(--brand)]">
                Madhurawada Plots
              </h4>
              <p className="text-xs text-[var(--text)]">IT SEZ residential plots ready for immediate villa construction.</p>
            </Link>

            <Link
              href="/plots-in-bheemili"
              className="p-4 bg-[var(--bg)] border border-[var(--line)] rounded-[4px] hover:border-[var(--brand)] transition-colors group space-y-1.5"
            >
              <h4 className="font-semibold text-sm text-[var(--ink)] group-hover:text-[var(--brand)]">
                Bheemili Beach Plots
              </h4>
              <p className="text-xs text-[var(--text)]">Scenic coastal plots ideal for beachfront holiday retreats.</p>
            </Link>
          </div>
        </section>

        {/* Regulatory & Valuation Protocol */}
        <VizagPriceBenchmarkTable />
        <LegalVerificationGuide />

        {/* FAQs */}
        <section className="bg-[var(--surface)] border border-[var(--line)] rounded-[4px] p-6 space-y-6">
          <h2 className="font-heading text-2xl md:text-3xl font-semibold text-[var(--ink)]">
            Frequently Asked Questions: Plots for Sale in Vizag
          </h2>

          <div className="divide-y divide-[var(--line)] space-y-4">
            {PLOT_FAQS.map((faq, i) => (
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

        {/* Direct Enquiry Box */}
        <section className="bg-[var(--surface)] border border-[var(--line)] rounded-[4px] p-8 space-y-6">
          <div className="max-w-2xl mx-auto text-center space-y-3">
            <h2 className="font-heading text-2xl md:text-3xl font-semibold text-[var(--ink)]">
              Schedule a Direct Site Inspection with Rajesh Ponnada
            </h2>
            <p className="text-sm text-[var(--text)]">
              Inspect physical boundary survey stones, examine VMRDA LP files in person, and receive transparent paperwork before you purchase.
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
