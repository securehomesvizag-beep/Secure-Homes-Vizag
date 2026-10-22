import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowUpRight, InstagramLogo, YoutubeLogo } from '@phosphor-icons/react/dist/ssr';
import { getFeaturedListings, getSettings, getTestimonials } from '@/lib/data';
import { LeadActionButtons } from '@/components/lead-action-buttons';
import { ListingRowCard } from '@/components/listing-row-card';
import { LeadCaptureForm } from '@/components/lead-capture-form';

export default async function HomePage() {
  const featuredListings = await getFeaturedListings();
  const settings = await getSettings();
  const testimonials = await getTestimonials();

  const propertyTypes = [
    {
      title: 'Plots and Land',
      type: 'plots',
      description: 'Clear title residential plots in expanding corridors',
      image: '/placeholders/plots.svg',
      heightClass: 'h-64 sm:h-72',
    },
    {
      title: 'Flats and Apartments',
      type: 'flats',
      description: '2 and 3 BHK homes in prime residential colonies',
      image: '/placeholders/flats.svg',
      heightClass: 'h-80 sm:h-96',
    },
    {
      title: 'Villas and Houses',
      type: 'villas',
      description: 'Independent duplexes and gated community houses',
      image: '/placeholders/villas.svg',
      heightClass: 'h-80 sm:h-96',
    },
    {
      title: 'Commercial Properties',
      type: 'commercial',
      description: 'Shops, office floors, and main road commercial plots',
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
      title: 'Fixed prices shared in writing',
      body: 'No inflated starting quotes. We provide clear per-square-yard or per-square-foot breakdown in writing before you visit any property.',
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
      <section className="border-b border-[var(--line)] py-16 md:py-24">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-10 items-center">
            {/* Hero Left Column */}
            <div className="md:col-span-7 space-y-6">
              <h1 className="font-heading text-4xl sm:text-5xl md:text-[60px] tracking-tight leading-[1.15] text-[var(--ink)]">
                Verified plots, flats and villas in Visakhapatnam
              </h1>
              <p className="text-lg md:text-xl text-[var(--text)] leading-relaxed max-w-xl">
                Direct broker guidance from Rajesh Ponnada with 10+ years of local property advisory and clear paperwork.
              </p>
              <LeadActionButtons variant="hero" />
            </div>

            {/* Hero Right Column: Replaceable Photo Block */}
            <div className="md:col-span-5">
              <div className="relative w-full h-[320px] sm:h-[400px] border border-[var(--line)] rounded-[4px] overflow-hidden bg-[var(--surface)]">
                <Image
                  src="/placeholders/hero.svg"
                  alt="Visakhapatnam Real Estate Overview"
                  fill
                  priority
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
            10+ years in Vizag real estate. VMRDA and RERA approved options. Prices shared in writing.
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
                Direct advisory from an established local broker. Clear paperwork, verified approvals, and upfront pricing.
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
                  src="/placeholders/rajesh-ponnada.svg"
                  alt="Rajesh Ponnada, Founder of Secure Home Vizag"
                  fill
                  className="object-cover"
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
                Over the past 10+ years, I have worked with homebuyers, families, and NRIs seeking transparent property transactions in Visakhapatnam. My approach is straightforward: verify title records, provide pricing in writing, and guide you through registration without intermediaries.
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

      {/* 8. Social Strip: Two plain rows linking to Instagram and YouTube */}
      <section className="py-12 border-b border-[var(--line)]">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <a
              href={settings.instagram_url}
              target="_blank"
              rel="noopener noreferrer"
              className="p-5 border border-[var(--line)] bg-[var(--surface)] rounded-[4px] flex items-center justify-between hover:border-[var(--brand)] transition-colors"
            >
              <div className="flex items-center gap-3">
                <InstagramLogo size={24} weight="regular" className="text-[var(--ink)]" />
                <div>
                  <p className="font-semibold text-base text-[var(--ink)]">Instagram</p>
                  <p className="text-sm text-[var(--text)]">@securehomevizag</p>
                </div>
              </div>
              <span className="text-sm font-semibold text-[var(--brand)] underline flex items-center gap-1">
                <span>Open Instagram</span>
                <ArrowUpRight size={18} weight="regular" />
              </span>
            </a>

            <a
              href={settings.youtube_url}
              target="_blank"
              rel="noopener noreferrer"
              className="p-5 border border-[var(--line)] bg-[var(--surface)] rounded-[4px] flex items-center justify-between hover:border-[var(--brand)] transition-colors"
            >
              <div className="flex items-center gap-3">
                <YoutubeLogo size={24} weight="regular" className="text-[var(--ink)]" />
                <div>
                  <p className="font-semibold text-base text-[var(--ink)]">YouTube</p>
                  <p className="text-sm text-[var(--text)]">@securehomevizag</p>
                </div>
              </div>
              <span className="text-sm font-semibold text-[var(--brand)] underline flex items-center gap-1">
                <span>Open YouTube</span>
                <ArrowUpRight size={18} weight="regular" />
              </span>
            </a>
          </div>
        </div>
      </section>

      {/* 9. Enquiry form section (Navy background, flat) */}
      <section className="bg-[var(--ink)] text-[#FAF7F2] py-16 md:py-24">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6">
          <div className="max-w-2xl mx-auto">
            <div className="text-center mb-10">
              <h2 className="font-heading text-3xl md:text-4xl text-[#FAF7F2] mb-3">
                Send an Enquiry
              </h2>
              <p className="text-sm md:text-base text-[#E7E0D5]">
                Leave your details below. Rajesh Ponnada will respond with verified property options and pricing.
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
