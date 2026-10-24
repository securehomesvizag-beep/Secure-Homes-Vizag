import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Metadata } from 'next';
import { ArrowUpRight } from '@phosphor-icons/react/dist/ssr';
import { getFeaturedListings, getSettings, getTestimonials } from '@/lib/data';
import { LeadActionButtons } from '@/components/lead-action-buttons';
import { ListingRowCard } from '@/components/listing-row-card';
import { LeadCaptureForm } from '@/components/lead-capture-form';
import { SocialVideoSection } from '@/components/social-video-section';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.securehomevizag.com';

export const metadata: Metadata = {
  title: 'Real Estate in Vizag | Verified Plots, Flats & Villas in Visakhapatnam | Secure Home Vizag',
  description:
    'Buy verified VMRDA & RERA approved plots, 2 & 3 BHK flats, coastal villas, and commercial properties in Visakhapatnam. Secure Home Vizag — trusted real estate consultant in Vizag with 10+ years of transparent advisory. Serving Madhurawada, Bheemili, Anandapuram, Rushikonda, Yendada, MVP Colony, Gajuwaka & all of Vizag.',
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
    'property consultant Vizag',
    'property advisor Vizag',
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
      'Visakhapatnam\'s trusted real estate consultancy. Browse VMRDA & RERA approved plots, flats, villas and commercial properties across Vizag. 10+ years of transparent advisory from Rajesh Ponnada.',
    url: `${SITE_URL}/`,
    type: 'website',
    images: [{ url: '/brand/og-image.jpg', width: 1200, height: 630, alt: 'Secure Home Vizag — Verified Properties in Visakhapatnam' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Real Estate in Vizag | Secure Home Vizag',
    description: 'Find VMRDA & RERA approved plots, flats, villas in Visakhapatnam. Trusted property advisor with 10+ years of experience.',
    images: ['/brand/og-image.jpg'],
  },
};



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
      image: '/commercial.jpg',
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

  return (
    <div className="fade-in">

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
                {settings.hero_subheading || 'Direct guidance from Rajesh Ponnada with 10+ years of local property advisory and clear paperwork.'}
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
            10+ years in Vizag real estate. VMRDA and RERA approved options. Direct Owner Guidance.
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
                Direct advisory from an established local property expert. Clear paperwork, verified approvals, and direct guidance.
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

      {/* 9. Enquiry form section (Navy background, flat) */}
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
