import React from 'react';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { Metadata } from 'next';
import { getListingBySlug, getListings } from '@/lib/data';
import { PROPERTY_TYPE_LABELS, LISTING_STATUS_LABELS } from '@/lib/types';
import { LeadActionButtons } from '@/components/lead-action-buttons';
import { LeadCaptureForm } from '@/components/lead-capture-form';
import { getListingJsonLd } from '@/lib/jsonld';
import { ArrowLeft } from '@phosphor-icons/react/dist/ssr';

interface ListingPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: ListingPageProps): Promise<Metadata> {
  const { slug } = await params;
  const listing = await getListingBySlug(slug);

  if (!listing) {
    return {
      title: 'Listing Not Found',
    };
  }

  return {
    title: `${listing.title} | Secure Home Vizag`,
    description: `${listing.title} located at ${listing.location}. Size: ${listing.size} ${listing.unit}. Price: ${listing.price_display}. Verified by Secure Home Vizag.`,
    openGraph: {
      title: listing.title,
      description: listing.description,
      images: [listing.cover_image_url],
    },
  };
}

export async function generateStaticParams() {
  const listings = await getListings();
  return listings.map((l) => ({ slug: l.slug }));
}

export default async function ListingDetailPage({ params }: ListingPageProps) {
  const { slug } = await params;
  const listing = await getListingBySlug(slug);

  if (!listing) {
    notFound();
  }

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';
  const jsonLd = getListingJsonLd(listing, siteUrl);

  const images = listing.images && listing.images.length > 0
    ? listing.images
    : [listing.cover_image_url || '/placeholders/property-placeholder.svg'];

  return (
    <div className="fade-in max-w-[1200px] mx-auto px-4 sm:px-6 py-10 md:py-14">
      {/* JSON-LD Listing Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Back Link */}
      <div className="mb-6">
        <Link
          href={`/listings?type=${listing.property_type}`}
          className="inline-flex items-center gap-1.5 text-sm font-semibold text-[var(--ink)] hover:text-[var(--brand)]"
        >
          <ArrowLeft size={18} weight="regular" />
          <span>Back to {PROPERTY_TYPE_LABELS[listing.property_type]}</span>
        </Link>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
        {/* Main Details (8 cols) */}
        <div className="lg:col-span-8 space-y-8">
          {/* Main Photo Gallery */}
          <div className="space-y-3">
            <div className="relative w-full h-[320px] sm:h-[450px] bg-[var(--line)] border border-[var(--line)] rounded-[4px] overflow-hidden">
              <Image
                src={images[0]}
                alt={listing.title}
                fill
                priority
                className="object-cover"
              />
            </div>
            {images.length > 1 && (
              <div className="grid grid-cols-3 gap-3">
                {images.slice(1).map((img, idx) => (
                  <div
                    key={idx}
                    className="relative h-24 bg-[var(--line)] border border-[var(--line)] rounded-[4px] overflow-hidden"
                  >
                    <Image
                      src={img}
                      alt={`${listing.title} preview ${idx + 2}`}
                      fill
                      className="object-cover"
                    />
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Title and Badges */}
          <div>
            <div className="flex flex-wrap items-center gap-2 mb-3">
              <span className="px-2.5 py-1 text-xs font-semibold bg-[var(--surface)] text-[var(--ink)] border border-[var(--line)] rounded-[4px]">
                {LISTING_STATUS_LABELS[listing.status] || listing.status}
              </span>
              {listing.is_vmrda_approved && (
                <span className="px-2.5 py-1 text-xs font-semibold text-[var(--success)] bg-[#eaf4ef] border border-[#bcdbc9] rounded-[4px]">
                  VMRDA Approved
                </span>
              )}
              {listing.is_rera_approved && (
                <span className="px-2.5 py-1 text-xs font-semibold text-[var(--success)] bg-[#eaf4ef] border border-[#bcdbc9] rounded-[4px]">
                  RERA Approved
                </span>
              )}
            </div>

            <h1 className="font-heading text-3xl sm:text-4xl text-[var(--ink)] mb-3">
              {listing.title}
            </h1>

            <div className="flex items-baseline gap-2 pt-1">
              <span className="text-sm uppercase tracking-wider text-[var(--text)]">Price:</span>
              <span className="font-heading text-3xl font-semibold text-[var(--brand)]">
                {listing.price_display}
              </span>
            </div>
          </div>

          {/* Two-Column Facts Table */}
          <div className="border border-[var(--line)] bg-[var(--surface)] rounded-[4px] p-6">
            <h2 className="font-heading text-xl text-[var(--ink)] mb-4">
              Property Specifications
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-3 gap-x-8 text-sm">
              <div className="flex justify-between py-2 border-b border-[var(--line)]">
                <span className="text-[var(--text)]">Property Type</span>
                <span className="font-semibold text-[var(--ink)]">
                  {PROPERTY_TYPE_LABELS[listing.property_type]}
                </span>
              </div>
              <div className="flex justify-between py-2 border-b border-[var(--line)]">
                <span className="text-[var(--text)]">Location</span>
                <span className="font-semibold text-[var(--ink)]">{listing.location}</span>
              </div>
              <div className="flex justify-between py-2 border-b border-[var(--line)]">
                <span className="text-[var(--text)]">Area Size</span>
                <span className="font-semibold text-[var(--ink)]">
                  {listing.size} {listing.unit}
                </span>
              </div>
              <div className="flex justify-between py-2 border-b border-[var(--line)]">
                <span className="text-[var(--text)]">Availability</span>
                <span className="font-semibold text-[var(--ink)]">
                  {LISTING_STATUS_LABELS[listing.status]}
                </span>
              </div>
              <div className="flex justify-between py-2 border-b border-[var(--line)]">
                <span className="text-[var(--text)]">Approvals</span>
                <span className="font-semibold text-[var(--ink)]">
                  {listing.is_vmrda_approved && listing.is_rera_approved
                    ? 'VMRDA and RERA'
                    : listing.is_vmrda_approved
                    ? 'VMRDA Approved'
                    : listing.is_rera_approved
                    ? 'RERA Approved'
                    : 'Clear Title Verified'}
                </span>
              </div>
              {listing.facts &&
                Object.entries(listing.facts).map(([key, val]) => (
                  <div key={key} className="flex justify-between py-2 border-b border-[var(--line)]">
                    <span className="text-[var(--text)]">{key}</span>
                    <span className="font-semibold text-[var(--ink)]">{val}</span>
                  </div>
                ))}
            </div>
          </div>

          {/* Description */}
          <div className="border border-[var(--line)] bg-[var(--surface)] rounded-[4px] p-6 space-y-3">
            <h2 className="font-heading text-xl text-[var(--ink)]">
              Overview and Description
            </h2>
            <p className="text-base text-[var(--text)] leading-relaxed whitespace-pre-line">
              {listing.description}
            </p>
          </div>
        </div>

        {/* Desktop Sticky Side Panel (4 cols) */}
        <aside className="lg:col-span-4 sticky top-24 space-y-6">
          <div className="border border-[var(--line)] bg-[var(--surface)] rounded-[4px] p-6 space-y-6">
            <div>
              <p className="text-xs uppercase tracking-wider text-[var(--text)] mb-1">
                Direct Consultation
              </p>
              <h3 className="font-heading text-xl text-[var(--ink)] mb-4">
                Connect with Rajesh Ponnada
              </h3>
              <p className="text-sm text-[var(--text)] leading-relaxed mb-4">
                Schedule a site inspection or receive document copies directly via Call or WhatsApp.
              </p>
              <LeadActionButtons
                listingId={listing.id}
                listingTitle={listing.title}
                variant="row"
                className="w-full flex-col items-stretch"
              />
            </div>

            <div className="pt-6 border-t border-[var(--line)]">
              <h4 className="font-heading text-base text-[var(--ink)] mb-3">
                Send an Enquiry for this Property
              </h4>
              <LeadCaptureForm
                listingId={listing.id}
                listingTitle={listing.title}
                defaultInterest={listing.property_type}
              />
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}
