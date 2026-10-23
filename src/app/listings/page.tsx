import React from 'react';
import Link from 'next/link';
import { Metadata } from 'next';
import { getListings } from '@/lib/data';
import { PropertyType, PROPERTY_TYPE_LABELS } from '@/lib/types';
import { ListingRowCard } from '@/components/listing-row-card';
import { WhatsappLogo } from '@phosphor-icons/react/dist/ssr';

export const metadata: Metadata = {
  title: 'Property Listings in Visakhapatnam',
  description:
    'Browse verified plots, flats, villas, and commercial spaces in Visakhapatnam. VMRDA and RERA approved options with direct broker guidance.',
};

const TAB_TYPES: PropertyType[] = ['plots', 'flats', 'villas', 'commercial'];

export const dynamic = 'force-dynamic';
export const revalidate = 0;

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

  return (
    <div className="fade-in max-w-[1200px] mx-auto px-4 sm:px-6 py-12 md:py-16">
      {/* Page Header */}
      <div className="mb-8">
        <h1 className="font-heading text-3xl md:text-5xl text-[var(--ink)] mb-3">
          Property Listings
        </h1>
        <p className="text-[var(--text)] text-base md:text-lg">
          Verified real estate options across Visakhapatnam. Select a property category below.
        </p>
      </div>

      {/* 4 Tabs: Only one property type shows at a time, stored in URL */}
      <div className="flex flex-wrap gap-2 border-b border-[var(--line)] pb-4 mb-8">
        {TAB_TYPES.map((type) => {
          const isActive = currentType === type;
          return (
            <Link
              key={type}
              href={`/listings?type=${type}`}
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
        <div className="space-y-6">
          {listings.map((listing) => (
            <ListingRowCard key={listing.id} listing={listing} />
          ))}
        </div>
      ) : (
        <div className="p-8 sm:p-12 text-center bg-[var(--surface)] border border-[var(--line)] rounded-[4px] space-y-4 max-w-xl mx-auto my-12">
          <p className="font-heading text-xl text-[var(--ink)]">
            No listings in this category right now. Message us on WhatsApp for upcoming options.
          </p>
          <p className="text-sm text-[var(--text)]">
            We are currently vetting fresh title documents in this segment. Message Rajesh Ponnada to get advance notifications.
          </p>
          <div className="pt-2">
            <a
              href="https://wa.me/918019928236?text=Hi%2C%20please%20share%20upcoming%20options%20for%20this%20category%20in%20Vizag."
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 px-6 py-3 text-sm font-semibold text-[var(--surface)] bg-[var(--brand)] hover:bg-[var(--brand-hover)] rounded-[4px] min-h-[44px]"
            >
              <WhatsappLogo size={20} weight="regular" />
              <span>Message on WhatsApp</span>
            </a>
          </div>
        </div>
      )}
    </div>
  );
}
