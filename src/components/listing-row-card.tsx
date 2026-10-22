'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { MapPin, ArrowsOutSimple } from '@phosphor-icons/react';
import { Listing, LISTING_STATUS_LABELS } from '@/lib/types';
import { LeadActionButtons } from './lead-action-buttons';

interface ListingRowCardProps {
  listing: Listing;
  key?: string;
}

export function ListingRowCard({ listing }: ListingRowCardProps) {
  return (
    <article className="bg-[var(--surface)] border border-[var(--line)] rounded-[4px] p-4 sm:p-5 flex flex-col md:flex-row gap-5 items-stretch transition-colors hover:border-[var(--brand)]">
      {/* Listing Photo */}
      <Link
        href={`/listings/${listing.slug}`}
        className="relative w-full md:w-64 h-48 flex-shrink-0 bg-[var(--line)] rounded-[4px] overflow-hidden block"
        aria-label={`View details for ${listing.title}`}
      >
        <Image
          src={listing.cover_image_url || '/placeholders/property-placeholder.svg'}
          alt={listing.title}
          fill
          sizes="(max-width: 768px) 100vw, 256px"
          className="object-cover"
        />
        {/* Status Badge */}
        <span className="absolute top-2.5 left-2.5 px-2.5 py-1 text-xs font-semibold bg-[var(--surface)] text-[var(--ink)] border border-[var(--line)] rounded-[4px]">
          {LISTING_STATUS_LABELS[listing.status] || listing.status}
        </span>
      </Link>

      {/* Listing Details */}
      <div className="flex-1 flex flex-col justify-between">
        <div>
          {/* Approval Badges (Plain text badges if switched on) */}
          <div className="flex flex-wrap items-center gap-2 mb-2">
            {listing.is_vmrda_approved && (
              <span className="inline-block px-2 py-0.5 text-xs font-semibold text-[var(--success)] bg-[#eaf4ef] border border-[#bcdbc9] rounded-[4px]">
                VMRDA Approved
              </span>
            )}
            {listing.is_rera_approved && (
              <span className="inline-block px-2 py-0.5 text-xs font-semibold text-[var(--success)] bg-[#eaf4ef] border border-[#bcdbc9] rounded-[4px]">
                RERA Approved
              </span>
            )}
          </div>

          {/* Title */}
          <h3 className="font-heading text-xl font-semibold mb-2">
            <Link
              href={`/listings/${listing.slug}`}
              className="text-[var(--ink)] hover:text-[var(--brand)]"
            >
              {listing.title}
            </Link>
          </h3>

          {/* Location and Size */}
          <div className="flex flex-wrap items-center gap-4 text-sm text-[var(--text)] mb-3">
            <span className="inline-flex items-center gap-1">
              <MapPin size={20} weight="regular" className="text-[var(--ink)]" />
              <span>{listing.location}</span>
            </span>
            <span className="inline-flex items-center gap-1">
              <ArrowsOutSimple size={20} weight="regular" className="text-[var(--ink)]" />
              <span>
                {listing.size} {listing.unit}
              </span>
            </span>
          </div>

          {/* Description snippet */}
          <p className="text-sm text-[var(--text)] line-clamp-2 leading-relaxed mb-4">
            {listing.description}
          </p>
        </div>

        {/* Footer: Price and CTA buttons */}
        <div className="pt-3 border-t border-[var(--line)] flex flex-wrap items-center justify-between gap-3">
          <div>
            <span className="block text-xs uppercase tracking-wider text-[var(--text)]">
              Expected Price
            </span>
            <span className="font-heading text-2xl font-semibold text-[var(--brand)]">
              {listing.price_display}
            </span>
          </div>

          <LeadActionButtons
            listingId={listing.id}
            listingTitle={listing.title}
            variant="row"
          />
        </div>
      </div>
    </article>
  );
}
