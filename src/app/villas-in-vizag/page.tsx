import React from 'react';
import Link from 'next/link';
import { Metadata } from 'next';
import { getListings, getSettings } from '@/lib/data';
import { ListingRowCard } from '@/components/listing-row-card';
import { LeadCaptureForm } from '@/components/lead-capture-form';
import { LeadActionButtons } from '@/components/lead-action-buttons';
import { VizagPriceBenchmarkTable, LegalVerificationGuide } from '@/components/seo-regulatory-hub';
import { getBreadcrumbJsonLd, getFaqJsonLd, getHowToJsonLd, getListingsItemListJsonLd } from '@/lib/jsonld';
import { ArrowUpRight, ShieldCheck, MapPin } from '@phosphor-icons/react/dist/ssr';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.securehomevizag.com';

export const metadata: Metadata = {
  title: 'Villas in Vizag | Luxury Gated Community Houses & Duplexes for Sale in Visakhapatnam',
  description:
    'Discover luxury villas in Vizag. Independent duplex houses, sea-facing coastal villas, and gated community residences for sale in Rushikonda, Bheemili Beach Road, Madhurawada & Anandapuram. Verified titles & direct advisory from Rajesh Ponnada.',
  keywords: [
    'villas in vizag',
    'villas in visakhapatnam',
    'villas for sale in vizag',
    'luxury villas in vizag',
    'gated community villas vizag',
    'rushikonda villas',
    'bheemili villas',
    'sea view villas vizag',
    'independent house in vizag',
    'duplex house visakhapatnam',
    'beach villas in vizag',
    'coastal villas visakhapatnam',
    'bheemunipatnam gated community villas',
    'sea facing duplex homes rushikonda',
    'anandapuram luxury villas',
    'rera approved villas vizag',
    'premium residential houses visakhapatnam',
  ],
  alternates: {
    canonical: `${SITE_URL}/villas-in-vizag`,
  },
  openGraph: {
    title: 'Villas in Vizag | Luxury Gated Community Duplex Houses & Coastal Villas',
    description:
      'Buy verified independent houses and gated community villas in Visakhapatnam. Ocean-view Rushikonda and Bheemili estates curated by Rajesh Ponnada.',
    url: `${SITE_URL}/villas-in-vizag`,
    type: 'website',
    images: [{ url: '/Villa.jpeg', width: 1200, height: 630, alt: 'Villas in Vizag' }],
  },
};

const VILLA_FAQS = [
  {
    question: 'Where can I find sea-view and coastal luxury villas in Visakhapatnam?',
    answer:
      'The prime zones for coastal luxury villas in Vizag are Rushikonda Hills and the scenic Bheemili Beach Road corridor. Rushikonda offers elevated vantage points with panoramic views of the Bay of Bengal, while Bheemili features serene, expansive beachfront estates and gated communities with private beach access.',
  },
  {
    question: 'What types of gated community villas are available in Vizag?',
    answer:
      'Options range from well-designed 3 and 4 BHK villas in growing suburban corridors like Anandapuram, Gambhiram, and Pendurthi to exclusive sea-view and luxury gated enclave villas in Madhurawada, Rushikonda, and Bheemili Beach Road. Contact Secure Home Vizag for verified villa listings and pricing on request.',
  },
  {
    question: 'What approvals should I check before purchasing an independent villa in Vizag?',
    answer:
      'Verify: (1) VMRDA approved layout sanction order, (2) GVMC building plan sanction and structural stability approval, (3) Occupancy Certificate (OC) or completion certificate, (4) coastal regulation zone (CRZ) clearance if within coastal buffer areas, and (5) undivided share of land (UDS) and individual patta deed verification.',
  },
  {
    question: 'What typical amenities are included in gated villa communities in Visakhapatnam?',
    answer:
      'Reputed villa townships in Vizag feature 24/7 security with RFID gate access, private landscaped lawns, underground cabling (zero overhead wires), clubhouses with swimming pools, fitness centers, children\'s parks, and dedicated dual car parking spaces.',
  },
];

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export default async function VillasInVizagPage() {
  const [allListings, settings] = await Promise.all([getListings(), getSettings()]);
  const villaListings = allListings.filter((l) => l.property_type === 'villas');

  const breadcrumbs = getBreadcrumbJsonLd(SITE_URL, [
    { name: 'Home', url: '/' },
    { name: 'Real Estate in Vizag', url: '/real-estate-in-vizag' },
    { name: 'Villas in Vizag', url: '/villas-in-vizag' },
  ]);

  const faqSchema = getFaqJsonLd(VILLA_FAQS);
  const itemListSchema = getListingsItemListJsonLd(SITE_URL, 'Luxury Villas', villaListings);
  const howToSchema = getHowToJsonLd(
    SITE_URL,
    'How to Buy a Luxury Villa in Visakhapatnam',
    'Comprehensive step-by-step advisory protocol for purchasing independent villas and duplexes in Vizag.',
    [
      { name: 'Select Desired Lifestyle Corridor', text: 'Choose coastal sea-view (Rushikonda/Bheemili) or executive suburb (Madhurawada/Anandapuram).' },
      { name: 'Legal Verification of Land Patta & Plan Sanction', text: 'Confirm layout LP number, GVMC building plan approval, and 30-year link ownership.' },
      { name: 'Inspect Construction Quality & Amenities', text: 'Verify RCC structure, plumbing, electrical underground conduits, and clubhouse infrastructure.' },
      { name: 'Execute Registered Deed & Mutation Handover', text: 'Finalize registry at the local Sub-Registrar Office with complete property boundary demarcation.' },
    ]
  );

  return (
    <div className="fade-in">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbs) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }} />

      {/* Hero Header */}
      <section className="bg-[var(--surface)] border-b border-[var(--line)] py-12 md:py-20">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 space-y-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#f4ebe6] text-[var(--brand)] text-xs font-semibold rounded-[4px]">
            <MapPin size={16} weight="bold" />
            <span>Coastal Estates &amp; Gated Duplex Residences</span>
          </div>

          <h1 className="font-heading text-3xl sm:text-4xl md:text-5xl text-[var(--ink)] leading-tight max-w-4xl">
            Villas in Vizag: Luxury Gated Community Houses &amp; Duplexes for Sale in Visakhapatnam
          </h1>

          <p className="text-base sm:text-lg text-[var(--text)] leading-relaxed max-w-3xl">
            Visakhapatnam’s blend of the Eastern Ghats and the Bay of Bengal makes it India’s premier coastal living destination. Secure Home Vizag presents vetted luxury villas, independent duplexes, and beachfront gated community estates with clear documentation, private gardens, and panoramic ocean vistas.
          </p>

          <div className="flex flex-wrap items-center gap-3 pt-2">
            <Link
              href="/villas-in-rushikonda"
              className="px-3.5 py-2 text-xs font-semibold bg-[var(--bg)] border border-[var(--line)] hover:border-[var(--brand)] text-[var(--ink)] rounded-[4px] transition-colors"
            >
              Villas in Rushikonda Hills &rarr;
            </Link>
            <Link
              href="/villas-in-bheemili"
              className="px-3.5 py-2 text-xs font-semibold bg-[var(--bg)] border border-[var(--line)] hover:border-[var(--brand)] text-[var(--ink)] rounded-[4px] transition-colors"
            >
              Coastal Villas in Bheemili &rarr;
            </Link>
            <Link
              href="/plots-in-vizag"
              className="px-3.5 py-2 text-xs font-semibold bg-[var(--surface)] border border-[var(--line)] hover:border-[var(--brand)] text-[var(--ink)] rounded-[4px] transition-colors"
            >
              Custom Villa Plots in Vizag
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
                Featured Luxury Villas &amp; Independent Houses
              </h2>
              <p className="text-sm text-[var(--text)] mt-1">
                Showing {villaListings.length} verified villa listings with clear titles and quality architectural designs.
              </p>
            </div>
          </div>

          <div className="space-y-4">
            {villaListings.map((listing) => (
              <ListingRowCard key={listing.id} listing={listing} />
            ))}
          </div>
        </section>

        {/* Locality Silo Cross-Links */}
        <section className="bg-[var(--surface)] border border-[var(--line)] rounded-[4px] p-6 space-y-4">
          <h3 className="font-heading text-xl font-semibold text-[var(--ink)]">
            Explore Prime Villa Destinations in Visakhapatnam
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 pt-2">
            <Link
              href="/villas-in-rushikonda"
              className="p-5 bg-[var(--bg)] border border-[var(--line)] rounded-[4px] hover:border-[var(--brand)] transition-colors group space-y-2"
            >
              <h4 className="font-semibold text-base text-[var(--ink)] group-hover:text-[var(--brand)]">
                Rushikonda Hills Villas &rarr;
              </h4>
              <p className="text-xs text-[var(--text)] leading-relaxed">
                Elite ocean-view independent villas on scenic slopes close to Gitam University and IT parks.
              </p>
            </Link>

            <Link
              href="/villas-in-bheemili"
              className="p-5 bg-[var(--bg)] border border-[var(--line)] rounded-[4px] hover:border-[var(--brand)] transition-colors group space-y-2"
            >
              <h4 className="font-semibold text-base text-[var(--ink)] group-hover:text-[var(--brand)]">
                Bheemili Coastal Villas &rarr;
              </h4>
              <p className="text-xs text-[var(--text)] leading-relaxed">
                Spacious gated community beach villas along the Bay of Bengal with private clubs and lawns.
              </p>
            </Link>

            <Link
              href="/plots-in-madhurawada"
              className="p-5 bg-[var(--bg)] border border-[var(--line)] rounded-[4px] hover:border-[var(--brand)] transition-colors group space-y-2"
            >
              <h4 className="font-semibold text-base text-[var(--ink)] group-hover:text-[var(--brand)]">
                Madhurawada Villa Plots &rarr;
              </h4>
              <p className="text-xs text-[var(--text)] leading-relaxed">
                VMRDA approved open plots to design and build your personalized custom duplex villa.
              </p>
            </Link>
          </div>
        </section>

        {/* Regulatory & Valuation Protocol */}
        <VizagPriceBenchmarkTable />
        <LegalVerificationGuide />

        {/* FAQs */}
        <section className="bg-[var(--surface)] border border-[var(--line)] rounded-[4px] p-6 space-y-6">
          <h2 className="font-heading text-2xl md:text-3xl font-semibold text-[var(--ink)]">
            Frequently Asked Questions: Villas in Vizag
          </h2>

          <div className="divide-y divide-[var(--line)] space-y-4">
            {VILLA_FAQS.map((faq, i) => (
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
              Arrange a Private Villa Walkthrough with Rajesh Ponnada
            </h2>
            <p className="text-sm text-[var(--text)]">
              Experience the craftsmanship, scenic coastal breezes, and neighborhood serenity firsthand before making a decision.
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
