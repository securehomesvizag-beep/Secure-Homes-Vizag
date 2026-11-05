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
  title: 'Villas in Rushikonda Vizag | Luxury Ocean-View Coastal Independent Houses',
  description:
    'Buy luxury sea-view villas in Rushikonda Hills, Visakhapatnam. Independent 4 BHK duplex houses with panoramic Bay of Bengal views, private decks, and verified clear titles. Direct advisory from Rajesh Ponnada.',
  keywords: [
    'villas in rushikonda',
    'rushikonda villas vizag',
    'luxury villas rushikonda',
    'sea view villas in vizag',
    'rushikonda independent house',
    'duplex villa rushikonda',
    'beach road villas vizag',
    'bay of bengal view villas vizag',
    'gitam university area villas',
    'gated community ocean villas rushikonda',
    'luxury beachfront houses visakhapatnam',
  ],
  alternates: {
    canonical: `${SITE_URL}/villas-in-rushikonda`,
  },
  openGraph: {
    title: 'Villas in Rushikonda Vizag | Luxury Ocean-View Coastal Independent Houses',
    description:
      'Verified luxury sea-facing villas on Rushikonda Hills overlooking the Bay of Bengal. Direct advisory from Rajesh Ponnada.',
    url: `${SITE_URL}/villas-in-rushikonda`,
    type: 'website',
    images: [{ url: '/Villa.jpeg', width: 1200, height: 630, alt: 'Villas in Rushikonda' }],
  },
};

const RUSHIKONDA_FAQS = [
  {
    question: 'Why are villas in Rushikonda considered Vizag\'s most prestigious addresses?',
    answer:
      'Rushikonda uniquely combines elevated hill topography with direct panoramic vistas of the Bay of Bengal. Surrounded by premier institutions like Gitam University, executive IT tech parks, luxury coastal resorts, and the scenic Beach Road, Rushikonda is the first choice for industrialists, top IT executives, and NRIs.',
  },
  {
    question: 'What types of independent villas are available in Rushikonda?',
    answer:
      'Luxury independent and gated community villas in Rushikonda feature generous plot sizes (250 to 500+ sq.yds), world-class architecture, private terraces, and panoramic sea views overlooking the Bay of Bengal. Contact Secure Home Vizag for available private listings and pricing on request.',
  },
];

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export default async function VillasInRushikondaPage() {
  const [allListings, settings] = await Promise.all([getListings(), getSettings()]);
  const rushikondaListings = allListings.filter(
    (l) => l.location.toLowerCase().includes('rushikonda') || l.property_type === 'villas'
  );

  const breadcrumbs = getBreadcrumbJsonLd(SITE_URL, [
    { name: 'Home', url: '/' },
    { name: 'Villas in Vizag', url: '/villas-in-vizag' },
    { name: 'Villas in Rushikonda', url: '/villas-in-rushikonda' },
  ]);

  const faqSchema = getFaqJsonLd(RUSHIKONDA_FAQS);
  const itemListSchema = getListingsItemListJsonLd(SITE_URL, 'Villas in Rushikonda', rushikondaListings);

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
            <span>Rushikonda Hills &amp; Bay of Bengal Panoramic Enclaves</span>
          </div>

          <h1 className="font-heading text-3xl sm:text-4xl md:text-5xl text-[var(--ink)] leading-tight max-w-4xl">
            Villas in Rushikonda Vizag: Luxury Ocean-View Coastal Independent Houses
          </h1>

          <p className="text-base sm:text-lg text-[var(--text)] leading-relaxed max-w-3xl">
            Experience ultra-luxury coastal living in Rushikonda Hills. Secure Home Vizag presents vetted independent sea-view villas featuring contemporary architecture, teakwood interiors, private plunge terraces, and clear legal documentation.
          </p>

          <div className="flex flex-wrap items-center gap-3 pt-2">
            <Link
              href="/villas-in-bheemili"
              className="px-3.5 py-2 text-xs font-semibold bg-[var(--bg)] border border-[var(--line)] hover:border-[var(--brand)] text-[var(--ink)] rounded-[4px] transition-colors"
            >
              Villas in Bheemili Beach Road &rarr;
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
                Featured Rushikonda &amp; Coastal Villas
              </h2>
              <p className="text-sm text-[var(--text)] mt-1">
                Pre-screened luxury homes with verified layout and building sanctions.
              </p>
            </div>
          </div>

          <div className="space-y-4">
            {rushikondaListings.slice(0, 4).map((listing) => (
              <ListingRowCard key={listing.id} listing={listing} />
            ))}
          </div>
        </section>

        <VizagPriceBenchmarkTable />
        <LegalVerificationGuide />

        {/* FAQs */}
        <section className="bg-[var(--surface)] border border-[var(--line)] rounded-[4px] p-6 space-y-6">
          <h2 className="font-heading text-2xl md:text-3xl font-semibold text-[var(--ink)]">
            Frequently Asked Questions: Rushikonda Villas
          </h2>

          <div className="divide-y divide-[var(--line)] space-y-4">
            {RUSHIKONDA_FAQS.map((faq, i) => (
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
              Schedule a Private Rushikonda Villa Tour
            </h2>
            <p className="text-sm text-[var(--text)]">
              Direct consultation with Rajesh Ponnada. Inspect panoramic sea views, architectural finishes, and documentation.
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
