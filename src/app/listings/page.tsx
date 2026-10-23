import React from 'react';
import Link from 'next/link';
import { Metadata } from 'next';
import { getListings } from '@/lib/data';
import { PropertyType, PROPERTY_TYPE_LABELS } from '@/lib/types';
import { ListingRowCard } from '@/components/listing-row-card';
import { WhatsappLogo, ArrowUpRight, ShieldCheck, MapPin, CheckCircle } from '@phosphor-icons/react/dist/ssr';
import { getBreadcrumbJsonLd, getListingsItemListJsonLd, getFaqJsonLd } from '@/lib/jsonld';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.securehomevizag.com';

const TYPE_META: Record<PropertyType, {
  title: string;
  description: string;
  h1: string;
  keywords: string[];
  subheading: string;
  overviewTitle: string;
  overviewText: string;
  topLocalities: Array<{ name: string; why: string }>;
  faqs: Array<{ question: string; answer: string }>;
}> = {
  plots: {
    title: 'Plots in Vizag | VMRDA Approved Residential Land for Sale in Visakhapatnam',
    description:
      'Buy verified residential plots in Vizag. VMRDA approved layouts with clear 30-year link titles in Anandapuram, Bheemili corridor, Madhurawada & Pendurthi. Transparent advisory from Rajesh Ponnada.',
    h1: 'Residential Plots for Sale in Vizag & Visakhapatnam',
    keywords: [
      'plots in Vizag',
      'plots in Visakhapatnam',
      'residential plots Vizag',
      'VMRDA approved plots Vizag',
      'land for sale in Vizag',
      'Anandapuram plots',
      'Bheemili plots',
      'Madhurawada plots',
      'Pendurthi plots',
      'plots near me Vizag',
    ],
    subheading:
      'Verified residential plots and plotted developments with clear 30-year title verification, VMRDA sanctions, and direct broker assistance in Visakhapatnam.',
    overviewTitle: 'Buying Plots in Visakhapatnam: What You Need to Know',
    overviewText:
      'Visakhapatnam is witnessing rapid real estate infrastructure expansion, with prime plotted land investments focused along the Anandapuram-Srikakulam national highway corridor, Bheemunipatnam beach road, and Madhurawada hills. Secure Home Vizag validates link documents for 30 years, verifies encumbrance certificates (EC), checks local VMRDA layout approval orders (LP numbers), and marks survey boundaries physically before offering any plot.',
    topLocalities: [
      { name: 'Anandapuram Junction', why: 'Premier growth corridor with fast appreciation, wide highway connections, and extensive VMRDA approved residential layouts.' },
      { name: 'Bheemili Beach Corridor', why: 'High-value coastal plots ideal for holiday homes, villas, and long-term capital appreciation along the Bay of Bengal.' },
      { name: 'Madhurawada', why: 'Prime IT corridor location with close proximity to IT SEZ, top international schools, and health care centers.' },
      { name: 'Pendurthi & Sujatha Nagar', why: 'Affordable plotted developments with rapid civic development, railway connectivity, and fast-growing suburban communities.' },
    ],
    faqs: [
      {
        question: 'What is a VMRDA approved plot in Visakhapatnam?',
        answer:
          'A VMRDA (Visakhapatnam Metropolitan Region Development Authority) approved plot is part of a layout that complies with urban development standards, including minimum road widths (33ft, 40ft, 60ft), mandatory open spaces, drainage systems, streetlights, and legitimate conversion of land from agricultural to residential use. It provides legal security against demolition and qualifies easily for home and mortgage loans.',
      },
      {
        question: 'Which areas have the best plots for sale in Vizag for investment?',
        answer:
          'For maximum capital growth, Anandapuram Junction and the Bheemili coastal highway corridor are top choices due to proposed highway expansions and tourist infrastructure. For immediate home construction, Madhurawada, Yendada, and Pendurthi are preferred because of ready water, power, and transport facilities.',
      },
      {
        question: 'How do I verify the title of a plot in Visakhapatnam before buying?',
        answer:
          'Secure Home Vizag verifies the complete 30-year title chain, encumbrance certificate (EC) from the Registration and Stamps Department, layout LP number from VMRDA, revenue 1B/Adangal records, and checks that the plot is not on the 22A prohibited property list. Rajesh Ponnada assists clients with end-to-end legal title verification.',
      },
    ],
  },
  flats: {
    title: 'Flats in Vizag | 2 & 3 BHK Apartments for Sale in Visakhapatnam | RERA Approved',
    description:
      'Explore verified 2 BHK & 3 BHK flats in Vizag. RERA approved luxury apartments in Madhurawada, Rushikonda, Yendada, and MVP Colony with direct broker guidance from Rajesh Ponnada.',
    h1: 'Flats & Apartments for Sale in Vizag & Visakhapatnam',
    keywords: [
      'flats in Vizag',
      'flats in Visakhapatnam',
      'apartments in Vizag',
      'apartments in Visakhapatnam',
      '2 BHK flats Vizag',
      '3 BHK flats Visakhapatnam',
      'RERA approved apartments Vizag',
      'Madhurawada flats',
      'Rushikonda apartments',
      'Yendada flats',
      'luxury flats Vizag',
    ],
    subheading:
      'Verified 2 and 3 BHK apartments, ready-to-move flats, and luxury gated community homes with RERA compliance across Visakhapatnam.',
    overviewTitle: 'Buying an Apartment or Flat in Visakhapatnam',
    overviewText:
      'Whether you are looking for an affordable 2 BHK flat near IT hubs or a sea-view 3 BHK apartment in Rushikonda or Yendada, Secure Home Vizag provides pre-inspected residential flats with documented occupancy certificates (OC), clear undivided share of land (UDS), and RERA AP approvals. Every listing includes verified floor specifications, amenity lists, and transparent builder quotes.',
    topLocalities: [
      { name: 'Madhurawada IT Corridor', why: 'Highest rental demand and modern gated communities right next to tech parks, making it ideal for IT professionals and families.' },
      { name: 'Rushikonda', why: 'Premium sea-view luxury apartments, clean coastal air, and close proximity to Gitam University and the scenic Beach Road.' },
      { name: 'Yendada', why: 'Strategically located between central Vizag and Madhurawada, offering peaceful living with rapid city accessibility.' },
      { name: 'MVP Colony & Waltair', why: 'Prestigious established residential neighborhood with premier schools, parks, hospitals, and central retail markets.' },
    ],
    faqs: [
      {
        question: 'What is the average price of 2 BHK and 3 BHK flats in Vizag?',
        answer:
          'A 2 BHK flat in Visakhapatnam generally ranges from ₹40 lakhs to ₹65 lakhs depending on the locality (such as Pendurthi or Madhurawada). Premium 3 BHK flats in prime areas like Rushikonda, Yendada, and MVP Colony range from ₹75 lakhs to ₹1.5+ crores for sea-view or luxury gated community developments.',
      },
      {
        question: 'Are all flats listed on Secure Home Vizag RERA approved?',
        answer:
          'Yes, upcoming and under-construction apartment projects listed by Secure Home Vizag are verified for registration with the Andhra Pradesh Real Estate Regulatory Authority (APRERA). Completed properties are verified for Occupancy Certificate (OC) and building plan approvals from GVMC.',
      },
      {
        question: 'Can NRIs buy flats in Visakhapatnam through Secure Home Vizag?',
        answer:
          'Yes. Rajesh Ponnada regularly manages apartment purchases for Non-Resident Indians (NRIs), including virtual site walk-throughs, legal scrutiny of builder-buyer agreements, bank loan coordination, and execution of power of attorney where necessary.',
      },
    ],
  },
  villas: {
    title: 'Villas in Vizag | Luxury Gated Community Houses & Duplexes for Sale in Visakhapatnam',
    description:
      'Discover luxury villas in Vizag. Independent duplex houses, sea-view coastal villas, and gated community properties for sale in Bheemili, Rushikonda, Madhurawada & MVP Colony.',
    h1: 'Villas & Independent Houses for Sale in Vizag',
    keywords: [
      'villas in Vizag',
      'villas in Visakhapatnam',
      'villas for sale Vizag',
      'luxury villas Vizag',
      'independent house in Vizag',
      'duplex house Visakhapatnam',
      'gated community villas Vizag',
      'Bheemili villas',
      'coastal villas Vizag',
      'Rushikonda villas',
    ],
    subheading:
      'Premium independent villas, coastal duplex residences, and gated community houses with private gardens, security, and verified clear land titles in Visakhapatnam.',
    overviewTitle: 'Luxury Villas & Independent Houses in Visakhapatnam',
    overviewText:
      'Visakhapatnam’s unique geography—flanked by the Eastern Ghats and the Bay of Bengal—makes it one of India’s most attractive destinations for luxury villa living. From contemporary coastal villas on the scenic Bheemili Beach corridor to peaceful duplex homes in Madhurawada and Anandapuram, Secure Home Vizag curates only verified independent homes with documented layout sanctions, private approach roads, and clear title deeds.',
    topLocalities: [
      { name: 'Bheemili Beach Road', why: 'Vizag’s premier luxury villa destination, offering serene ocean breezes, wide beachfront stretches, and elite lifestyle.' },
      { name: 'Rushikonda Hills', why: 'Elevated vantage points with panoramic Bay of Bengal views and close proximity to central executive hubs.' },
      { name: 'Kommadi & Madhurawada', why: 'Gated community villa enclaves with clubhouses, 24/7 security, landscaped gardens, and wide internal bitumen roads.' },
      { name: 'Kapuluppada', why: 'Scenic foothill area with rapid villa development, clean groundwater, and calm residential surroundings.' },
    ],
    faqs: [
      {
        question: 'Where can I find coastal and sea-view villas in Vizag?',
        answer:
          'The Bheemili Beach Road corridor and Rushikonda are the primary zones for sea-view and coastal villas in Visakhapatnam. These areas offer independent houses with unobstructed ocean vistas, private gardens, and proximity to luxury coastal resorts.',
      },
      {
        question: 'What are the amenities included in gated community villas in Vizag?',
        answer:
          'Most modern villa projects in Vizag include 24/7 gated security with CCTV, clubhouse, swimming pool, underground electrical cabling, treated water supply, landscaped parks, children’s play areas, and dedicated car parking for multiple vehicles.',
      },
      {
        question: 'How do I arrange a private site visit for a villa in Visakhapatnam?',
        answer:
          'Contact Rajesh Ponnada directly via phone or WhatsApp at +91 8019928236. We schedule private, personalized site visits to match your timetable, allowing you to thoroughly inspect the construction quality, neighborhood, and documentation.',
      },
    ],
  },
  commercial: {
    title: 'Commercial Property in Vizag | Shops, Offices & Land for Sale in Visakhapatnam',
    description:
      'Buy verified commercial properties in Vizag. Retail shops, office spaces, and commercial plots for sale in Gajuwaka, Madhurawada, and highway corridors. Clear titles guaranteed.',
    h1: 'Commercial Properties for Sale in Vizag & Visakhapatnam',
    keywords: [
      'commercial property Vizag',
      'commercial property Visakhapatnam',
      'shops for sale in Vizag',
      'commercial land Vizag',
      'office space Visakhapatnam',
      'Gajuwaka commercial',
      'Madhurawada commercial plots',
      'commercial real estate Vizag',
    ],
    subheading:
      'Prime retail shops, highway commercial plots, and grade-A office spaces with high footfall potential and clear documentation across Visakhapatnam.',
    overviewTitle: 'Commercial Real Estate Investments in Visakhapatnam',
    overviewText:
      'As the executive hub of Andhra Pradesh and a major industrial seaport, Visakhapatnam offers solid rental yields and capital appreciation for commercial investments. Secure Home Vizag lists commercial plots on national highways, retail shop spaces in burgeoning residential sectors, and office facilities in Gajuwaka, Madhurawada, and city central corridors.',
    topLocalities: [
      { name: 'Gajuwaka Industrial Corridor', why: 'Commercial capital of Vizag with unmatched footfall, vibrant retail markets, and heavy commercial vehicle connectivity.' },
      { name: 'Madhurawada Highway Belt', why: 'Massive residential density driving tremendous demand for clinics, banks, retail showrooms, and office complexes.' },
      { name: 'Dwaraka Nagar & Asilmetta', why: 'Central business district ideal for high-yield retail shops, corporate offices, and institutional banking spaces.' },
      { name: 'Anandapuram Highway Junction', why: 'Strategic junction for logistics parks, warehousing, fuel stations, and commercial highway plazas.' },
    ],
    faqs: [
      {
        question: 'What is the rental yield for commercial properties in Visakhapatnam?',
        answer:
          'Commercial properties in high-density areas of Visakhapatnam like Gajuwaka, Madhurawada, and Dwaraka Nagar typically yield between 6% to 9% annually, significantly outpacing traditional residential rental yields.',
      },
      {
        question: 'Are highway commercial plots available with VMRDA commercial zoning?',
        answer:
          'Yes, Secure Home Vizag verifies that highway commercial properties have approved commercial land use zoning, direct access approvals from the National Highways Authority (NHAI) or municipal bodies, and clear survey boundaries.',
      },
      {
        question: 'Can Secure Home Vizag help find commercial tenants after purchase?',
        answer:
          'Yes, Rajesh Ponnada assists investors in identifying reputable retail brands, banks, and corporate tenants to secure stable lease agreements and maximize rental yields.',
      },
    ],
  },
};

const TAB_TYPES: PropertyType[] = ['plots', 'flats', 'villas', 'commercial'];

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export async function generateMetadata({
  searchParams,
}: {
  searchParams: Promise<{ type?: string }>;
}): Promise<Metadata> {
  const resolvedParams = await searchParams;
  const currentType = (TAB_TYPES.includes(resolvedParams.type as PropertyType)
    ? resolvedParams.type
    : 'plots') as PropertyType;

  const meta = TYPE_META[currentType];
  const canonicalUrl = `${SITE_URL}/listings?type=${currentType}`;

  return {
    title: meta.title,
    description: meta.description,
    keywords: meta.keywords,
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      title: meta.title,
      description: meta.description,
      url: canonicalUrl,
      type: 'website',
      images: [
        {
          url: '/brand/og-image.jpg',
          width: 1200,
          height: 630,
          alt: `${meta.h1} — Secure Home Vizag`,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: meta.title,
      description: meta.description,
      images: ['/brand/og-image.jpg'],
    },
    robots: {
      index: true,
      follow: true,
    },
  };
}

export default async function ListingsPage({
  searchParams,
}: {
  searchParams: Promise<{ type?: string }>;
}) {
  const resolvedParams = await searchParams;
  const currentType = (TAB_TYPES.includes(resolvedParams.type as PropertyType)
    ? resolvedParams.type
    : 'plots') as PropertyType;

  const listings = await getListings(currentType);
  const meta = TYPE_META[currentType];

  const breadcrumbJsonLd = getBreadcrumbJsonLd(SITE_URL, [
    { name: 'Home', url: '/' },
    { name: 'Listings', url: '/listings' },
    { name: PROPERTY_TYPE_LABELS[currentType], url: `/listings?type=${currentType}` },
  ]);

  const itemListJsonLd = getListingsItemListJsonLd(
    SITE_URL,
    PROPERTY_TYPE_LABELS[currentType],
    listings.map((l) => ({
      title: l.title,
      slug: l.slug,
      location: l.location,
      price_display: l.price_display,
    }))
  );

  const faqJsonLd = getFaqJsonLd(meta.faqs);

  return (
    <div className="fade-in max-w-[1200px] mx-auto px-4 sm:px-6 py-12 md:py-16 space-y-12">
      {/* Structured Data: Breadcrumb, ItemList (AEO), and FAQPage */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />

      {/* Breadcrumb Navigation */}
      <nav aria-label="Breadcrumb" className="text-sm text-[var(--text)]">
        <ol className="flex items-center gap-1.5 flex-wrap">
          <li>
            <Link href="/" className="hover:text-[var(--brand)] hover:underline">Home</Link>
          </li>
          <li aria-hidden="true" className="text-[var(--line)]">/</li>
          <li>
            <Link href="/listings" className="hover:text-[var(--brand)] hover:underline">Listings</Link>
          </li>
          <li aria-hidden="true" className="text-[var(--line)]">/</li>
          <li aria-current="page" className="text-[var(--ink)] font-semibold">
            {PROPERTY_TYPE_LABELS[currentType]}
          </li>
        </ol>
      </nav>

      {/* Page Header with High-Ranking Keywords */}
      <header className="space-y-4">
        <span className="text-xs font-semibold uppercase tracking-wider text-[var(--brand)]">
          Visakhapatnam Real Estate Marketplace • Verified Titles
        </span>
        <h1 className="font-heading text-3xl sm:text-4xl md:text-5xl text-[var(--ink)] tracking-tight">
          {meta.h1}
        </h1>
        <p className="text-[var(--text)] text-base md:text-lg max-w-3xl leading-relaxed">
          {meta.subheading}
        </p>
      </header>

      {/* 4 Category Filter Tabs */}
      <div className="flex flex-wrap gap-2 border-b border-[var(--line)] pb-4" role="tablist" aria-label="Property type filter">
        {TAB_TYPES.map((type) => {
          const isActive = currentType === type;
          return (
            <Link
              key={type}
              href={`/listings?type=${type}`}
              role="tab"
              aria-selected={isActive}
              className={`px-5 py-2.5 text-sm font-semibold rounded-[4px] border transition-colors min-h-[44px] flex items-center ${
                isActive
                  ? 'bg-[var(--brand)] text-[var(--surface)] border-[var(--brand)]'
                  : 'bg-[var(--surface)] text-[var(--ink)] border-[var(--line)] hover:border-[var(--brand)]'
              }`}
            >
              {PROPERTY_TYPE_LABELS[type]}
            </Link>
          );
        })}
      </div>

      {/* Listings List or Empty State */}
      {listings.length > 0 ? (
        <section aria-label={`${PROPERTY_TYPE_LABELS[currentType]} listings in Visakhapatnam`} className="space-y-6">
          <div className="flex items-center justify-between text-sm text-[var(--text)]">
            <p>
              Showing <span className="font-semibold text-[var(--ink)]">{listings.length}</span> verified {PROPERTY_TYPE_LABELS[currentType].toLowerCase()} in Visakhapatnam
            </p>
            <span className="inline-flex items-center gap-1 text-[var(--success)] font-medium text-xs sm:text-sm">
              <ShieldCheck size={18} weight="bold" />
              <span>100% Pre-Verified Titles</span>
            </span>
          </div>

          <div className="space-y-6">
            {listings.map((listing) => (
              <ListingRowCard key={listing.id} listing={listing} />
            ))}
          </div>
        </section>
      ) : (
        <div className="p-8 sm:p-12 text-center bg-[var(--surface)] border border-[var(--line)] rounded-[4px] space-y-4 max-w-xl mx-auto my-8">
          <p className="font-heading text-xl text-[var(--ink)]">
            No listings in this category right now. Message us on WhatsApp for upcoming options.
          </p>
          <p className="text-sm text-[var(--text)]">
            We are currently vetting fresh title documents in this segment. Message Rajesh Ponnada to get advance notifications about new {PROPERTY_TYPE_LABELS[currentType].toLowerCase()} in Visakhapatnam.
          </p>
          <div className="pt-2">
            <a
              href="https://wa.me/918019928236?text=Hi%2C%20please%20share%20upcoming%20options%20for%20this%20category%20in%20Vizag."
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 px-6 py-3 text-sm font-semibold text-[var(--surface)] bg-[var(--brand)] hover:bg-[var(--brand-hover)] rounded-[4px] min-h-[44px]"
              aria-label="Chat with Rajesh Ponnada on WhatsApp about upcoming properties"
            >
              <WhatsappLogo size={20} weight="regular" />
              <span>Message on WhatsApp</span>
            </a>
          </div>
        </div>
      )}

      {/* SEO & AEO Locality Deep-Dive Section */}
      <section className="border-t border-[var(--line)] pt-12 space-y-8" aria-labelledby="category-guide">
        <div className="max-w-3xl space-y-3">
          <h2 id="category-guide" className="font-heading text-2xl md:text-3xl text-[var(--ink)]">
            {meta.overviewTitle}
          </h2>
          <p className="text-base text-[var(--text)] leading-relaxed">
            {meta.overviewText}
          </p>
        </div>

        <div>
          <h3 className="font-heading text-xl text-[var(--ink)] mb-4">
            Top Prime Localities for {PROPERTY_TYPE_LABELS[currentType]} in Vizag
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {meta.topLocalities.map((loc) => (
              <div
                key={loc.name}
                className="p-5 border border-[var(--line)] bg-[var(--surface)] rounded-[4px] space-y-2 hover:border-[var(--brand)] transition-colors"
              >
                <div className="flex items-center gap-2 text-[var(--brand)] font-semibold text-sm">
                  <MapPin size={18} weight="fill" />
                  <span>{loc.name}</span>
                </div>
                <p className="text-xs sm:text-sm text-[var(--text)] leading-relaxed">
                  {loc.why}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Category-Specific FAQs (AEO & Featured Snippet Drivers) */}
      <section className="border-t border-[var(--line)] pt-12 space-y-6" aria-labelledby="category-faqs">
        <div className="max-w-3xl">
          <h2 id="category-faqs" className="font-heading text-2xl md:text-3xl text-[var(--ink)] mb-2">
            Frequently Asked Questions: {PROPERTY_TYPE_LABELS[currentType]} in Vizag
          </h2>
          <p className="text-sm md:text-base text-[var(--text)]">
            Key insights, legal requirements, and market advice from local broker Rajesh Ponnada.
          </p>
        </div>

        <div className="divide-y divide-[var(--line)] border border-[var(--line)] rounded-[4px] bg-[var(--surface)]">
          {meta.faqs.map((faq, idx) => (
            <div key={idx} className="p-6 space-y-2">
              <h3 className="font-heading text-lg text-[var(--ink)]">
                {faq.question}
              </h3>
              <p className="text-sm sm:text-base text-[var(--text)] leading-relaxed">
                {faq.answer}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Bottom Advisory Contact Banner */}
      <section className="border border-[var(--line)] bg-[var(--surface)] rounded-[4px] p-6 sm:p-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="space-y-1 max-w-xl">
          <h3 className="font-heading text-xl text-[var(--ink)]">
            Looking for a specific {PROPERTY_TYPE_LABELS[currentType].toLowerCase()} in Visakhapatnam?
          </h3>
          <p className="text-sm text-[var(--text)]">
            Share your budget, desired locality, and size requirements. Rajesh Ponnada will provide curated, verified options directly.
          </p>
        </div>
        <div className="flex flex-wrap gap-3">
          <a
            href="https://wa.me/918019928236?text=Hi%20Rajesh%20garu%2C%20I%20am%20looking%20for%20property%20options%20in%20Vizag."
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-5 py-2.5 text-sm font-semibold text-[var(--surface)] bg-[var(--brand)] hover:bg-[var(--brand-hover)] rounded-[4px] min-h-[44px]"
          >
            <WhatsappLogo size={18} weight="regular" />
            <span>Chat on WhatsApp</span>
          </a>
          <Link
            href="/contact"
            className="inline-flex items-center gap-1.5 px-5 py-2.5 text-sm font-semibold text-[var(--ink)] border border-[var(--line)] hover:border-[var(--brand)] rounded-[4px] min-h-[44px]"
          >
            <span>Book Site Visit</span>
            <ArrowUpRight size={16} weight="regular" />
          </Link>
        </div>
      </section>
    </div>
  );
}
