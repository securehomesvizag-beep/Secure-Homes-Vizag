import React from 'react';
import Link from 'next/link';
import { Metadata } from 'next';
import { getListings, getSettings } from '@/lib/data';
import { ListingRowCard } from '@/components/listing-row-card';
import { LeadCaptureForm } from '@/components/lead-capture-form';
import { LeadActionButtons } from '@/components/lead-action-buttons';
import { VizagPriceBenchmarkTable, LegalVerificationGuide, StampDutyMatrix } from '@/components/seo-regulatory-hub';
import { getBreadcrumbJsonLd, getFaqJsonLd, getHowToJsonLd, getSpeakableJsonLd } from '@/lib/jsonld';
import { ArrowUpRight, ShieldCheck, CheckCircle, MapPin } from '@phosphor-icons/react/dist/ssr';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.securehomevizag.com';

export const metadata: Metadata = {
  title: 'Real Estate in Vizag | #1 Visakhapatnam Property Guide (Plots, Flats & Villas)',
  description:
    'Comprehensive 2026 guide to real estate in Vizag. Buy verified VMRDA approved plots, luxury coastal villas, 2 & 3 BHK flats, and commercial properties. Direct property advisory from Rajesh Ponnada with 10+ years local experience in Visakhapatnam.',
  keywords: [
    'real estate in vizag',
    'real estate in visakhapatnam',
    'real estate vizag',
    'vizag real estate',
    'visakhapatnam real estate',
    'property in vizag',
    'buy property in visakhapatnam',
    'real estate consultant vizag',
    'property dealers in vizag',
    'best real estate company in vizag',
    'vmrda approved plots vizag',
    'villas in vizag',
    'flats in vizag',
    'commercial property vizag',
    'bhogapuram airport real estate',
    'anandapuram property growth',
    'madhurawada it sez corridor',
    'rushikonda sea view property',
    'bheemili beach road land',
    'ap rera verified projects vizag',
    'section 22a clearance andhra pradesh',
    'vizag property registration stamp duty',
    'nri property management visakhapatnam',
    'rajesh ponnada secure home vizag',
  ],
  alternates: {
    canonical: `${SITE_URL}/real-estate-in-vizag`,
  },
  openGraph: {
    title: 'Real Estate in Vizag | Complete Visakhapatnam Property Guide & Listings',
    description:
      'Verified VMRDA plots, luxury coastal villas, and modern apartments across Visakhapatnam. Ground valuation rates, legal checks, and advisory from Rajesh Ponnada.',
    url: `${SITE_URL}/real-estate-in-vizag`,
    type: 'article',
    images: [{ url: '/brand/og-image.jpg', width: 1200, height: 630, alt: 'Real Estate in Vizag' }],
  },
};

const FAQS = [
  {
    question: 'Why is real estate in Vizag experiencing rapid growth in 2026?',
    answer:
      'Visakhapatnam is expanding rapidly due to monumental infrastructure developments: the operationalization and commercial ecosystem of the Bhogapuram International Airport, expansion of the 6-lane NH-16 highway, tech expansions in Kapuluppada and Rushikonda (Adani AI Data Center, Cognizant campus), and its strategic position as Andhra Pradesh\'s premier coastal metropolis.',
  },
  {
    question: 'What is the difference between VMRDA and Panchayat approved plots in Vizag?',
    answer:
      'VMRDA (formerly VUDA) layouts conform to strict statutory master plans, providing minimum 33-ft to 60-ft blacktop roads, mandatory open spaces and parks (10% reservation), underground drainage, electricity, and official conversion from agricultural to non-agricultural use (NALA). Gram Panchayat layouts outside approved master plans often lack basic utility sanctions and carry high legal risks of future demolition or unapproved status.',
  },
  {
    question: 'Which areas in Visakhapatnam offer the best return on real estate investment?',
    answer:
      'For long-term capital appreciation (plots), Anandapuram Junction and the Bhogapuram Airport corridor lead with 18%–30% annual appreciation. For high rental yields and immediate occupancy, Madhurawada and Rushikonda are prime due to the IT SEZ and educational institutions. For ultra-luxury living and sea views, Bheemili Beach Road and Rushikonda Hills are the premier choices.',
  },
  {
    question: 'How can NRIs safely buy real estate in Visakhapatnam without visiting in person?',
    answer:
      'Secure Home Vizag provides specialized end-to-end NRI advisory: live high-definition video inspections, 30-year digital title verification, certified survey boundary demarcation, power of attorney (POA) advisory, and direct remote registration assistance with zero middlemen or inflated quotes.',
  },
];

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export default async function RealEstateInVizagPage() {
  const [listings, settings] = await Promise.all([getListings(), getSettings()]);

  const breadcrumbs = getBreadcrumbJsonLd(SITE_URL, [
    { name: 'Home', url: '/' },
    { name: 'Real Estate in Vizag', url: '/real-estate-in-vizag' },
  ]);

  const faqSchema = getFaqJsonLd(FAQS);
  const speakableSchema = getSpeakableJsonLd(SITE_URL, '/real-estate-in-vizag', ['h1', '.hero-lead', '.faq-section']);
  const howToSchema = getHowToJsonLd(
    SITE_URL,
    'How to Buy Verified Real Estate in Visakhapatnam',
    'A step-by-step verified legal and transaction protocol for purchasing property in Vizag.',
    [
      { name: 'Define Locality and Asset Class', text: 'Determine budget and target corridor: Anandapuram/Bhogapuram for plots, Madhurawada for flats, or Bheemili/Rushikonda for luxury villas.' },
      { name: 'Conduct 30-Year Link Title Search', text: 'Inspect Encumbrance Certificate (EC) from AP Registration department and verify survey numbers against the Section 22A prohibited property register.' },
      { name: 'Validate VMRDA / RERA Approvals', text: 'Confirm the layout LP number and ensure the final 10% mortgage release order has been executed by VMRDA authorities.' },
      { name: 'Execute Registered Sale Agreement', text: 'Sign a formal written agreement with transparent terms and proceed to final registration at the local Sub-Registrar Office with 7.5% government duties.' },
    ]
  );

  return (
    <div className="fade-in">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbs) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(speakableSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }} />

      {/* Hero Header */}
      <section className="bg-[var(--surface)] border-b border-[var(--line)] py-12 md:py-20">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 space-y-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#f4ebe6] text-[var(--brand)] text-xs font-semibold rounded-[4px]">
            <MapPin size={16} weight="bold" />
            <span>Visakhapatnam Property Master Hub (2026 Edition)</span>
          </div>

          <h1 className="font-heading text-3xl sm:text-4xl md:text-5xl text-[var(--ink)] leading-tight max-w-4xl">
            Real Estate in Vizag: Verified Plots, Luxury Villas &amp; Flats in Visakhapatnam
          </h1>

          <p className="hero-lead text-base sm:text-lg text-[var(--text)] leading-relaxed max-w-3xl">
            Visakhapatnam is Andhra Pradesh’s economic engine and most desirable coastal city. Secure Home Vizag provides transparent property consultancy led by Rajesh Ponnada, ensuring clear 30-year link titles, official VMRDA and RERA approvals, and direct access to high-growth investment corridors.
          </p>

          <div className="flex flex-wrap items-center gap-4 pt-2">
            <Link
              href="/plots-in-vizag"
              className="px-4 py-2.5 text-xs sm:text-sm font-semibold bg-[var(--brand)] text-white hover:bg-[var(--brand-hover)] rounded-[4px] transition-colors inline-flex items-center gap-1.5"
            >
              <span>Explore Plots in Vizag</span>
              <ArrowUpRight size={16} />
            </Link>
            <Link
              href="/villas-in-vizag"
              className="px-4 py-2.5 text-xs sm:text-sm font-semibold bg-[var(--surface)] border border-[var(--line)] text-[var(--ink)] hover:border-[var(--brand)] rounded-[4px] transition-colors"
            >
              Villas in Vizag
            </Link>
            <Link
              href="/flats-in-vizag"
              className="px-4 py-2.5 text-xs sm:text-sm font-semibold bg-[var(--surface)] border border-[var(--line)] text-[var(--ink)] hover:border-[var(--brand)] rounded-[4px] transition-colors"
            >
              Flats in Vizag
            </Link>
          </div>
        </div>
      </section>

      {/* Main Content Grid */}
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 py-12 md:py-16 space-y-16">
        {/* Core Category Navigation Cards */}
        <section className="space-y-6">
          <div className="space-y-2">
            <h2 className="font-heading text-2xl md:text-3xl font-semibold text-[var(--ink)]">
              Primary Real Estate Categories in Visakhapatnam
            </h2>
            <p className="text-sm text-[var(--text)]">
              Choose your property class to browse pre-verified opportunities and deep corridor intelligence:
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <Link
              href="/plots-in-vizag"
              className="p-6 bg-[var(--surface)] border border-[var(--line)] rounded-[4px] hover:border-[var(--brand)] transition-colors group space-y-3"
            >
              <span className="text-xs uppercase font-semibold text-[var(--brand)]">Plotted Land</span>
              <h3 className="font-heading text-lg font-semibold text-[var(--ink)] group-hover:text-[var(--brand)]">
                Plots in Vizag &rarr;
              </h3>
              <p className="text-xs text-[var(--text)] leading-relaxed">
                VMRDA approved open plots in Anandapuram, Bhogapuram, Madhurawada, and Bheemili with clear 30-year titles.
              </p>
            </Link>

            <Link
              href="/villas-in-vizag"
              className="p-6 bg-[var(--surface)] border border-[var(--line)] rounded-[4px] hover:border-[var(--brand)] transition-colors group space-y-3"
            >
              <span className="text-xs uppercase font-semibold text-[var(--brand)]">Luxury Living</span>
              <h3 className="font-heading text-lg font-semibold text-[var(--ink)] group-hover:text-[var(--brand)]">
                Villas in Vizag &rarr;
              </h3>
              <p className="text-xs text-[var(--text)] leading-relaxed">
                Coastal gated communities and hill-view independent duplex houses in Rushikonda, Bheemili, and Madhurawada.
              </p>
            </Link>

            <Link
              href="/flats-in-vizag"
              className="p-6 bg-[var(--surface)] border border-[var(--line)] rounded-[4px] hover:border-[var(--brand)] transition-colors group space-y-3"
            >
              <span className="text-xs uppercase font-semibold text-[var(--brand)]">Apartments</span>
              <h3 className="font-heading text-lg font-semibold text-[var(--ink)] group-hover:text-[var(--brand)]">
                Flats in Vizag &rarr;
              </h3>
              <p className="text-xs text-[var(--text)] leading-relaxed">
                Ready-to-move and under-construction 2 &amp; 3 BHK apartments with RERA &amp; GVMC approvals near IT hubs.
              </p>
            </Link>

            <Link
              href="/commercial-property-in-vizag"
              className="p-6 bg-[var(--surface)] border border-[var(--line)] rounded-[4px] hover:border-[var(--brand)] transition-colors group space-y-3"
            >
              <span className="text-xs uppercase font-semibold text-[var(--brand)]">High-Yield Assets</span>
              <h3 className="font-heading text-lg font-semibold text-[var(--ink)] group-hover:text-[var(--brand)]">
                Commercial in Vizag &rarr;
              </h3>
              <p className="text-xs text-[var(--text)] leading-relaxed">
                High-visibility highway plots, retail showroom spaces, and grade-A corporate offices in Gajuwaka and Anandapuram.
              </p>
            </Link>
          </div>
        </section>

        {/* Price Benchmark Table Component */}
        <VizagPriceBenchmarkTable />

        {/* Featured Listings Section */}
        <section className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-[var(--line)] pb-4">
            <div>
              <h2 className="font-heading text-2xl md:text-3xl font-semibold text-[var(--ink)]">
                Verified Real Estate Listings in Visakhapatnam
              </h2>
              <p className="text-sm text-[var(--text)] mt-1">
                Inspected by Rajesh Ponnada with complete link document verification and boundary marking.
              </p>
            </div>
            <Link
              href="/listings"
              className="text-xs sm:text-sm font-semibold text-[var(--brand)] hover:underline inline-flex items-center gap-1"
            >
              <span>View All Properties</span>
              <ArrowUpRight size={16} />
            </Link>
          </div>

          <div className="space-y-4">
            {listings.slice(0, 4).map((listing) => (
              <ListingRowCard key={listing.id} listing={listing} />
            ))}
          </div>
        </section>

        {/* Legal Verification Protocol */}
        <LegalVerificationGuide />

        {/* Stamp Duty Matrix */}
        <StampDutyMatrix />

        {/* FAQ Accordion Section */}
        <section className="faq-section bg-[var(--surface)] border border-[var(--line)] rounded-[4px] p-6 space-y-6">
          <h2 className="font-heading text-2xl md:text-3xl font-semibold text-[var(--ink)]">
            Frequently Asked Questions: Real Estate in Visakhapatnam
          </h2>

          <div className="divide-y divide-[var(--line)] space-y-4">
            {FAQS.map((faq, i) => (
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

        {/* Direct Advisory Lead Capture */}
        <section className="bg-[var(--surface)] border border-[var(--line)] rounded-[4px] p-8 space-y-6">
          <div className="max-w-2xl mx-auto text-center space-y-3">
            <h2 className="font-heading text-2xl md:text-3xl font-semibold text-[var(--ink)]">
              Speak Directly with Rajesh Ponnada
            </h2>
            <p className="text-sm text-[var(--text)] leading-relaxed">
              Skip intermediate brokers and unverified portals. Get direct, transparent property guidance, layout inspections, and legal title scrutiny across Visakhapatnam.
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
