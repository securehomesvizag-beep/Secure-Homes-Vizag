import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Metadata } from 'next';
import { ArrowUpRight, MapPin } from '@phosphor-icons/react/dist/ssr';
import { getFeaturedListings, getSettings, getTestimonials } from '@/lib/data';
import { LeadActionButtons } from '@/components/lead-action-buttons';
import { ListingRowCard } from '@/components/listing-row-card';
import { LeadCaptureForm } from '@/components/lead-capture-form';
import { SocialVideoSection } from '@/components/social-video-section';
import { getFaqJsonLd } from '@/lib/jsonld';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.securehomevizag.com';

export const metadata: Metadata = {
  title: 'Real Estate in Vizag | Verified Plots, Flats & Villas in Visakhapatnam | Secure Home Vizag',
  description:
    'Buy verified VMRDA & RERA approved plots, 2 & 3 BHK flats, coastal villas, and commercial properties in Visakhapatnam. Secure Home Vizag — trusted real estate broker in Vizag with 10+ years of transparent advisory. Serving Madhurawada, Bheemili, Anandapuram, Rushikonda, Yendada, MVP Colony, Gajuwaka & all of Vizag.',
  keywords: [
    'real estate in Vizag',
    'real estate Vizag',
    'Vizag real estate',
    'real estate in Visakhapatnam',
    'property for sale in Vizag',
    'buy property in Vizag',
    'plots for sale in Vizag',
    'flats for sale in Visakhapatnam',
    'villas for sale in Vizag',
    'apartments for sale Visakhapatnam',
    'VMRDA approved plots Vizag',
    'RERA approved flats Visakhapatnam',
    'nearby real estate Vizag',
    'property near Visakhapatnam',
    'NRI property Vizag',
    'property broker Vizag',
    'Rajesh Ponnada real estate',
    'Secure Home Vizag',
    'Anandapuram plots',
    'Bheemili villas',
    'Madhurawada flats',
    'Rushikonda apartments',
  ],
  alternates: {
    canonical: `${SITE_URL}/`,
  },
  openGraph: {
    title: 'Real Estate in Vizag | Verified Plots, Flats & Villas in Visakhapatnam',
    description:
      'Visakhapatnam\'s trusted real estate broker. Browse VMRDA & RERA approved plots, flats, villas and commercial properties across Vizag. 10+ years of transparent advisory from Rajesh Ponnada.',
    url: `${SITE_URL}/`,
    type: 'website',
    images: [{ url: '/brand/og-image.jpg', width: 1200, height: 630, alt: 'Secure Home Vizag — Verified Properties in Visakhapatnam' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Real Estate in Vizag | Secure Home Vizag',
    description: 'Find VMRDA & RERA approved plots, flats, villas in Visakhapatnam. Trusted broker with 10+ years of experience.',
    images: ['/brand/og-image.jpg'],
  },
};


const HOME_FAQS = [
  {
    question: 'Does Secure Home Vizag verify property titles before listing?',
    answer:
      'Yes. Every property listed on Secure Home Vizag undergoes a comprehensive 30-year link document check, encumbrance certificate verification, layout approval confirmation, and survey number cross-verification before being recommended to buyers in Visakhapatnam. This ensures buyers receive only clear-title properties.',
  },
  {
    question: 'What types of properties are available through Secure Home Vizag in Visakhapatnam?',
    answer:
      'Secure Home Vizag offers verified residential plots and land in VMRDA approved layouts, 2 BHK and 3 BHK flats and apartments with RERA approval, independent villas and duplex houses in gated communities, and commercial properties including retail shops and office spaces — all across Visakhapatnam (Vizag).',
  },
  {
    question: 'Are properties on Secure Home Vizag VMRDA or RERA approved?',
    answer:
      'Where applicable, all properties are verified for VMRDA (Visakhapatnam Metropolitan Region Development Authority) or RERA (Real Estate Regulatory Authority of Andhra Pradesh) approval status. Each listing clearly displays its approval badges and documentation. VMRDA approved plots are available in Anandapuram, Bheemili, Madhurawada, and Pendurthi areas.',
  },
  {
    question: 'Can NRI buyers purchase properties through Secure Home Vizag?',
    answer:
      'Yes. Rajesh Ponnada has extensive experience assisting Non-Resident Indian (NRI) clients in purchasing plots, flats, and villas in Visakhapatnam. All documentation, site visit coordination, title verification, and registration paperwork can be handled remotely with written agreements, making it safe and convenient for NRIs to invest in Vizag real estate.',
  },
  {
    question: 'What areas of Visakhapatnam does Secure Home Vizag cover?',
    answer:
      'Secure Home Vizag operates across all major areas of Visakhapatnam including Madhurawada, Rushikonda, Anandapuram Junction, Bheemili corridor and Beach Road, Yendada, MVP Colony, Gajuwaka, Pendurthi, Sujatha Nagar, and all surrounding VMRDA growth zones. Whether you are looking for plots near Anandapuram or coastal villas near Bheemili, Secure Home Vizag provides verified options.',
  },
  {
    question: 'How do I contact Rajesh Ponnada for a property enquiry?',
    answer:
      'You can contact Rajesh Ponnada directly via phone call or WhatsApp at +91 8019928236. Alternatively, submit an enquiry through the website and you will receive a direct response with verified property options matching your budget and requirements. Rajesh Ponnada is available Monday to Saturday from 9 AM to 7 PM.',
  },
  {
    question: 'What is the current real estate market like in Visakhapatnam?',
    answer:
      'Visakhapatnam (Vizag) is one of the fastest-growing real estate markets in Andhra Pradesh. Key growth corridors include the Anandapuram-Bheemunipatnam highway belt, Madhurawada IT corridor, and Bheemili Beach Road. Property prices have appreciated significantly in VMRDA zones. Residential plots, 2 and 3 BHK flats, and coastal villas are in high demand from both local buyers and NRI investors.',
  },
  {
    question: 'How do I buy a plot in Visakhapatnam?',
    answer:
      'To buy a plot in Visakhapatnam, follow these steps: (1) Identify your preferred area and budget, (2) Contact Secure Home Vizag for verified VMRDA-approved plot listings, (3) Verify the 30-year title chain, encumbrance certificate, and layout sanction order, (4) Visit the site with Rajesh Ponnada, (5) Sign a written sale agreement, and (6) Complete registration at the sub-registrar office. Secure Home Vizag assists through every step.',
  },
  {
    question: 'What is the price range for flats in Visakhapatnam?',
    answer:
      'Flat prices in Visakhapatnam range from approximately ₹40 lakhs for a 2 BHK apartment in developing areas like Pendurthi and Anandapuram, to ₹1 crore or more for premium 3 BHK RERA-approved apartments in Madhurawada, Rushikonda, and Yendada. Contact Secure Home Vizag for the most current verified listings and pricing across Vizag.',
  },
];


export const dynamic = 'force-dynamic';
export const revalidate = 0;

export default async function HomePage() {
  const featuredListings = await getFeaturedListings();
  const settings = await getSettings();
  const testimonials = await getTestimonials();

  const propertyTypes = [
    {
      title: 'Plots and Land',
      type: 'plots',
      description: settings.plots_description || 'Clear title VMRDA & approved residential plots in high-growth corridors like Anandapuram, Bheemili & Madhurawada.',
      image: '/Plots.jpeg',
      heightClass: 'h-64 sm:h-72',
    },
    {
      title: 'Flats and Apartments',
      type: 'flats',
      description: settings.flats_description || 'Ready-to-move and under-construction 2 & 3 BHK luxury apartments with approved plans and quality amenities.',
      image: '/Apartments.jpeg',
      heightClass: 'h-80 sm:h-96',
    },
    {
      title: 'Villas and Houses',
      type: 'villas',
      description: settings.villas_description || 'Independent duplex houses and premium gated community coastal villas with private road access and modern infrastructure.',
      image: '/Villa.jpeg',
      heightClass: 'h-80 sm:h-96',
    },
    {
      title: 'Commercial Properties',
      type: 'commercial',
      description: settings.commercial_description || 'High-visibility retail shops, prime highway commercial plots, and office spaces with direct road access.',
      image: '/placeholders/commercial.svg',
      heightClass: 'h-64 sm:h-72',
    },
  ];

  const whyChooseUs = [
    {
      num: '01',
      title: 'Direct title verification before site inspection',
      body: 'Every listing undergoes link document and title check before we recommend it. We verify survey numbers and layout approvals directly from official records.',
    },
    {
      num: '02',
      title: 'Direct transparency in writing',
      body: 'No inflated claims or surprises. We provide complete document checklists and layout verification in writing before you visit any property.',
    },
    {
      num: '03',
      title: 'Local presence across Visakhapatnam for 10+ years',
      body: 'Rajesh Ponnada has assisted families, local investors, and non-resident Indians across Madhurawada, Anandapuram, Bheemili corridor, and Gajuwaka.',
    },
    {
      num: '04',
      title: 'Complete assistance until registered deed handover',
      body: 'We coordinate mutation, sub-registrar documentation, boundary marking, and physical handover with complete transparency.',
    },
  ];

  const faqJsonLd = getFaqJsonLd(HOME_FAQS);

  return (
    <div className="fade-in">
      {/* FAQ Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />

      {/* 1. Hero Section */}
      <section className="border-b border-[var(--line)] py-16 md:py-24" aria-label="Hero">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-10 items-center">
            {/* Hero Left Column */}
            <div className="md:col-span-7 space-y-6">
              <h1 className="font-heading text-4xl sm:text-5xl md:text-[60px] tracking-tight leading-[1.15] text-[var(--ink)]">
                {settings.hero_heading || 'Verified plots, flats and villas in Visakhapatnam'}
              </h1>
              <p className="text-lg md:text-xl text-[var(--text)] leading-relaxed max-w-xl">
                {settings.hero_subheading || 'Direct broker guidance from Rajesh Ponnada with 10+ years of local property advisory and clear paperwork.'}
              </p>
              <LeadActionButtons
                variant="hero"
                phoneNumber={settings.phone}
                whatsappNumber={settings.whatsapp_number}
              />
            </div>

            {/* Hero Right Column: Brand Banner Block */}
            <div className="md:col-span-5">
              <div className="relative w-full h-[340px] sm:h-[420px] border border-[var(--line)] rounded-[8px] overflow-hidden bg-[var(--surface)] shadow-lg hover:shadow-xl transition-shadow">
                <Image
                  src="/hero.jpg"
                  alt="Visakhapatnam residential property — verified plots, flats and villas listed by Secure Home Vizag"
                  fill
                  priority
                  fetchPriority="high"
                  sizes="(max-width: 768px) 100vw, 42vw"
                  className="object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. One-line trust strip */}
      <section className="bg-[var(--surface)] border-b border-[var(--line)] py-4">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 text-center">
          <p className="text-sm md:text-base font-semibold text-[var(--ink)]">
            10+ years in Vizag real estate. VMRDA and RERA approved options. Direct broker guidance.
          </p>
        </div>
      </section>

      {/* 3. Property Types: 2x2 grid of unequal-height photo panels */}
      <section className="py-16 md:py-24 border-b border-[var(--line)]">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6">
          <div className="max-w-2xl mb-12">
            <h2 className="font-heading text-3xl md:text-4xl text-[var(--ink)] mb-3">
              Browse by Property Type
            </h2>
            <p className="text-[var(--text)] text-base md:text-lg">
              Explore available properties segmented by verified categories in Visakhapatnam.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
            {propertyTypes.map((item) => (
              <Link
                key={item.type}
                href={`/listings?type=${item.type}`}
                className="group block border border-[var(--line)] bg-[var(--surface)] rounded-[4px] overflow-hidden hover:border-[var(--brand)] transition-colors"
              >
                <div className={`relative w-full ${item.heightClass} bg-[var(--line)]`}>
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw"
                    className="object-cover"
                  />
                </div>
                <div className="p-5 border-t border-[var(--line)] flex items-center justify-between">
                  <div>
                    <h3 className="font-heading text-xl text-[var(--ink)] group-hover:text-[var(--brand)]">
                      {item.title}
                    </h3>
                    <p className="text-sm text-[var(--text)] mt-1">
                      {item.description}
                    </p>
                  </div>
                  <span className="text-[var(--brand)] font-semibold text-sm underline flex items-center gap-1">
                    <span>View</span>
                    <ArrowUpRight size={18} weight="regular" />
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* 4. Featured Listings: Horizontal list (Image left, details right) */}
      <section className="py-16 md:py-24 border-b border-[var(--line)] bg-[var(--surface)]">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-10 gap-4">
            <div>
              <h2 className="font-heading text-3xl md:text-4xl text-[var(--ink)] mb-2">
                Featured Properties
              </h2>
              <p className="text-[var(--text)] text-base">
                Selected options verified for immediate site visit and registration.
              </p>
            </div>
            <Link
              href="/listings"
              className="text-sm font-semibold text-[var(--brand)] hover:underline inline-flex items-center gap-1"
            >
              <span>See all listings</span>
              <ArrowUpRight size={18} weight="regular" />
            </Link>
          </div>

          <div className="space-y-6">
            {featuredListings.map((listing) => (
              <ListingRowCard key={listing.id} listing={listing} />
            ))}
          </div>
        </div>
      </section>

      {/* 5. Why Secure Home Vizag: Vertical Numbered List */}
      <section className="py-16 md:py-24 border-b border-[var(--line)]">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-10">
            <div className="md:col-span-5">
              <h2 className="font-heading text-3xl md:text-4xl text-[var(--ink)] mb-4">
                Why Choose Secure Home Vizag
              </h2>
              <p className="text-[var(--text)] text-base md:text-lg leading-relaxed">
                Direct advisory from an established local broker. Clear paperwork, verified approvals, and direct guidance.
              </p>
            </div>

            <div className="md:col-span-7 divide-y divide-[var(--line)]">
              {whyChooseUs.map((item) => (
                <div key={item.num} className="py-6 first:pt-0 last:pb-0 flex items-start gap-6">
                  <span className="font-heading text-3xl md:text-4xl font-semibold text-[var(--brand)] flex-shrink-0">
                    {item.num}
                  </span>
                  <div>
                    <h3 className="font-heading text-xl text-[var(--ink)] mb-2">
                      {item.title}
                    </h3>
                    <p className="text-sm md:text-base text-[var(--text)] leading-relaxed">
                      {item.body}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 6. About Preview: Split Layout */}
      <section className="py-16 md:py-24 border-b border-[var(--line)] bg-[var(--surface)]">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-10 items-center">
            <div className="md:col-span-5">
              <div className="relative w-full h-[380px] border border-[var(--line)] rounded-[4px] overflow-hidden bg-[var(--line)]">
                <Image
                  src="/Rajesh ponnada.jpeg"
                  alt="Rajesh Ponnada, Founder of Secure Home Vizag"
                  fill
                  sizes="(max-width: 768px) 100vw, 40vw"
                  className="object-cover object-top"
                />
              </div>
            </div>
            <div className="md:col-span-7 space-y-5">
              <span className="text-xs font-semibold uppercase tracking-wider text-[var(--text)]">
                Local Property Advisor
              </span>
              <h2 className="font-heading text-3xl md:text-4xl text-[var(--ink)]">
                Rajesh Ponnada
              </h2>
              <p className="text-base md:text-lg text-[var(--text)] leading-relaxed">
                Over the past 10+ years, I have worked with homebuyers, families, and NRIs seeking transparent property transactions in Visakhapatnam. My approach is straightforward: verify title records, provide verified details in writing, and guide you through registration without intermediaries.
              </p>
              <div className="pt-2">
                <Link
                  href="/about"
                  className="inline-flex items-center gap-1.5 text-sm font-semibold text-[var(--ink)] hover:text-[var(--brand)] underline"
                >
                  <span>Read full profile and service process</span>
                  <ArrowUpRight size={18} weight="regular" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 6B. Top Real Estate Localities in Vizag (GEO & High-Intent Search Anchor) */}
      <section className="py-16 md:py-24 border-b border-[var(--line)]" aria-labelledby="localities-heading">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6">
          <div className="max-w-3xl mb-12">
            <span className="text-xs font-semibold uppercase tracking-wider text-[var(--brand)]">
              Prime Geographic Coverage • Visakhapatnam &amp; VMRDA Region
            </span>
            <h2 id="localities-heading" className="font-heading text-3xl md:text-4xl text-[var(--ink)] mt-1 mb-3">
              Top Real Estate Localities in Visakhapatnam (Vizag)
            </h2>
            <p className="text-[var(--text)] text-base md:text-lg leading-relaxed">
              Find verified plots, flats, and villas across prime growth corridors, IT sectors, and coastal highway belts in Vizag. Direct guidance and on-ground title verification across all areas.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="p-6 border border-[var(--line)] bg-[var(--surface)] rounded-[4px] space-y-3 hover:border-[var(--brand)] transition-colors flex flex-col justify-between">
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-[var(--brand)] font-semibold text-base">
                  <MapPin size={20} weight="fill" />
                  <h3>Madhurawada</h3>
                </div>
                <p className="text-sm text-[var(--text)] leading-relaxed">
                  IT corridor epicenter, premier gated communities, 2 &amp; 3 BHK apartments, and family residences close to tech SEZ and schools.
                </p>
              </div>
              <Link href="/listings?type=flats" className="text-xs font-semibold text-[var(--brand)] hover:underline inline-flex items-center gap-1 pt-2">
                <span>View Flats in Madhurawada</span>
                <ArrowUpRight size={14} weight="bold" />
              </Link>
            </div>

            <div className="p-6 border border-[var(--line)] bg-[var(--surface)] rounded-[4px] space-y-3 hover:border-[var(--brand)] transition-colors flex flex-col justify-between">
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-[var(--brand)] font-semibold text-base">
                  <MapPin size={20} weight="fill" />
                  <h3>Anandapuram Junction</h3>
                </div>
                <p className="text-sm text-[var(--text)] leading-relaxed">
                  Rapidly appreciating highway growth corridor with high-yield VMRDA approved residential plots and plotted layout developments.
                </p>
              </div>
              <Link href="/listings?type=plots" className="text-xs font-semibold text-[var(--brand)] hover:underline inline-flex items-center gap-1 pt-2">
                <span>View Plots in Anandapuram</span>
                <ArrowUpRight size={14} weight="bold" />
              </Link>
            </div>

            <div className="p-6 border border-[var(--line)] bg-[var(--surface)] rounded-[4px] space-y-3 hover:border-[var(--brand)] transition-colors flex flex-col justify-between">
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-[var(--brand)] font-semibold text-base">
                  <MapPin size={20} weight="fill" />
                  <h3>Bheemili Beach Road</h3>
                </div>
                <p className="text-sm text-[var(--text)] leading-relaxed">
                  Elite coastal zone featuring sea-view luxury villas, independent duplex homes, and long-term land investments near Bay of Bengal.
                </p>
              </div>
              <Link href="/listings?type=villas" className="text-xs font-semibold text-[var(--brand)] hover:underline inline-flex items-center gap-1 pt-2">
                <span>View Villas in Bheemili</span>
                <ArrowUpRight size={14} weight="bold" />
              </Link>
            </div>

            <div className="p-6 border border-[var(--line)] bg-[var(--surface)] rounded-[4px] space-y-3 hover:border-[var(--brand)] transition-colors flex flex-col justify-between">
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-[var(--brand)] font-semibold text-base">
                  <MapPin size={20} weight="fill" />
                  <h3>Rushikonda</h3>
                </div>
                <p className="text-sm text-[var(--text)] leading-relaxed">
                  Panoramic hillside and ocean views, modern sea-facing luxury apartments, and proximity to Gitam University and IT parks.
                </p>
              </div>
              <Link href="/listings?type=flats" className="text-xs font-semibold text-[var(--brand)] hover:underline inline-flex items-center gap-1 pt-2">
                <span>View Apartments in Rushikonda</span>
                <ArrowUpRight size={14} weight="bold" />
              </Link>
            </div>

            <div className="p-6 border border-[var(--line)] bg-[var(--surface)] rounded-[4px] space-y-3 hover:border-[var(--brand)] transition-colors flex flex-col justify-between">
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-[var(--brand)] font-semibold text-base">
                  <MapPin size={20} weight="fill" />
                  <h3>Yendada</h3>
                </div>
                <p className="text-sm text-[var(--text)] leading-relaxed">
                  Tranquil living nestled between urban Vizag and the IT corridor, offering high-end gated apartments and independent houses.
                </p>
              </div>
              <Link href="/listings?type=flats" className="text-xs font-semibold text-[var(--brand)] hover:underline inline-flex items-center gap-1 pt-2">
                <span>View Properties in Yendada</span>
                <ArrowUpRight size={14} weight="bold" />
              </Link>
            </div>

            <div className="p-6 border border-[var(--line)] bg-[var(--surface)] rounded-[4px] space-y-3 hover:border-[var(--brand)] transition-colors flex flex-col justify-between">
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-[var(--brand)] font-semibold text-base">
                  <MapPin size={20} weight="fill" />
                  <h3>MVP Colony</h3>
                </div>
                <p className="text-sm text-[var(--text)] leading-relaxed">
                  Premier established neighborhood of Visakhapatnam with central retail markets, parks, multi-specialty hospitals, and top schools.
                </p>
              </div>
              <Link href="/listings?type=flats" className="text-xs font-semibold text-[var(--brand)] hover:underline inline-flex items-center gap-1 pt-2">
                <span>View Flats in MVP Colony</span>
                <ArrowUpRight size={14} weight="bold" />
              </Link>
            </div>

            <div className="p-6 border border-[var(--line)] bg-[var(--surface)] rounded-[4px] space-y-3 hover:border-[var(--brand)] transition-colors flex flex-col justify-between">
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-[var(--brand)] font-semibold text-base">
                  <MapPin size={20} weight="fill" />
                  <h3>Gajuwaka</h3>
                </div>
                <p className="text-sm text-[var(--text)] leading-relaxed">
                  High-footfall commercial powerhouse and industrial belt offering prime retail shops, commercial plots, and affordable homes.
                </p>
              </div>
              <Link href="/listings?type=commercial" className="text-xs font-semibold text-[var(--brand)] hover:underline inline-flex items-center gap-1 pt-2">
                <span>View Commercial in Gajuwaka</span>
                <ArrowUpRight size={14} weight="bold" />
              </Link>
            </div>

            <div className="p-6 border border-[var(--line)] bg-[var(--surface)] rounded-[4px] space-y-3 hover:border-[var(--brand)] transition-colors flex flex-col justify-between">
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-[var(--brand)] font-semibold text-base">
                  <MapPin size={20} weight="fill" />
                  <h3>Pendurthi &amp; Sujatha Nagar</h3>
                </div>
                <p className="text-sm text-[var(--text)] leading-relaxed">
                  Fast-growing residential hub featuring affordable VMRDA residential plots, newly built houses, and suburban train connectivity.
                </p>
              </div>
              <Link href="/listings?type=plots" className="text-xs font-semibold text-[var(--brand)] hover:underline inline-flex items-center gap-1 pt-2">
                <span>View Plots in Pendurthi</span>
                <ArrowUpRight size={14} weight="bold" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 7. Testimonials (built but hidden unless real ones added via admin) */}
      {testimonials.length > 0 && (
        <section className="py-16 md:py-24 border-b border-[var(--line)]">
          <div className="max-w-[1200px] mx-auto px-4 sm:px-6">
            <h2 className="font-heading text-3xl md:text-4xl text-[var(--ink)] mb-8">
              Client Feedback
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {testimonials.map((t) => (
                <div
                  key={t.id}
                  className="p-6 bg-[var(--surface)] border border-[var(--line)] rounded-[4px] space-y-3"
                >
                  <p className="text-base text-[var(--text)] leading-relaxed italic">
                    &quot;{t.quote}&quot;
                  </p>
                  <div>
                    <p className="font-semibold text-sm text-[var(--ink)]">{t.client_name}</p>
                    {t.location && <p className="text-xs text-[var(--text)]">{t.location}</p>}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* 8. Optimized Social Video & Channel Showcase */}
      <SocialVideoSection settings={settings} />

      {/* 9. FAQ Section (drives Featured Snippet + PAA + AI Overview eligibility) */}
      <section className="py-16 md:py-24 border-b border-[var(--line)]" aria-label="Frequently Asked Questions" itemScope itemType="https://schema.org/FAQPage">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6">
          <div className="max-w-2xl mb-12">
            <h2 className="font-heading text-3xl md:text-4xl text-[var(--ink)] mb-3">
              Frequently Asked Questions
            </h2>
            <p className="text-[var(--text)] text-base">
              Common questions about property buying, verification, and the advisory process in Visakhapatnam.
            </p>
          </div>
          <div className="divide-y divide-[var(--line)] border border-[var(--line)] rounded-[4px] bg-[var(--surface)]">
            {HOME_FAQS.map((faq, idx) => (
              <div key={idx} className="p-6 sm:p-8 space-y-2" itemScope itemType="https://schema.org/Question">
                <h3 className="font-heading text-lg text-[var(--ink)]" itemProp="name">
                  {faq.question}
                </h3>
                <div itemScope itemType="https://schema.org/Answer" itemProp="acceptedAnswer">
                  <p className="text-sm md:text-base text-[var(--text)] leading-relaxed" itemProp="text">
                    {faq.answer}
                  </p>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-8 text-center">
            <Link
              href="/contact"
              className="inline-flex items-center gap-1.5 text-sm font-semibold text-[var(--brand)] hover:underline"
            >
              <span>Have more questions? Contact Rajesh Ponnada directly</span>
              <ArrowUpRight size={16} weight="regular" />
            </Link>
          </div>
        </div>
      </section>

      {/* 10. Enquiry form section (Navy background, flat) */}
      <section className="bg-[var(--ink)] text-[#FAF7F2] py-16 md:py-24" aria-label="Contact Enquiry Form" id="enquiry">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6">
          <div className="max-w-2xl mx-auto">
            <div className="text-center mb-10">
              <h2 className="font-heading text-3xl md:text-4xl text-[#FAF7F2] mb-3">
                Send a Property Enquiry
              </h2>
              <p className="text-sm md:text-base text-[#E7E0D5]">
                Leave your details below. Rajesh Ponnada will respond directly with verified property options and documentation relevant to your needs.
              </p>
            </div>
            <div className="bg-[#172544] p-6 sm:p-8 border border-[#233355] rounded-[4px]">
              <LeadCaptureForm inDarkSection={true} />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
