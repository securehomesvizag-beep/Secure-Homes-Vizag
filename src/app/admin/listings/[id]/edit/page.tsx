import React from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getAllListingsForAdmin } from '@/lib/data';
import { ListingForm } from '../../listing-form';
import { ArrowLeft } from '@phosphor-icons/react/dist/ssr';

interface EditListingPageProps {
  params: Promise<{ id: string }>;
}

export default async function EditListingPage({ params }: EditListingPageProps) {
  const { id } = await params;
  const listings = await getAllListingsForAdmin();
  const listing = listings.find((l) => l.id === id);

  if (!listing) {
    notFound();
  }

  return (
    <div className="space-y-6 fade-in">
      <div className="flex items-center gap-2">
        <Link
          href="/admin/listings"
          className="inline-flex items-center gap-1 text-sm font-semibold text-[var(--ink)] hover:text-[var(--brand)]"
        >
          <ArrowLeft size={16} weight="regular" />
          <span>Back to Listings</span>
        </Link>
      </div>

      <div>
        <h1 className="font-heading text-2xl md:text-3xl text-[var(--ink)] mb-1">
          Edit Listing: {listing.title}
        </h1>
        <p className="text-sm text-[var(--text)]">
          Update pricing, approval switches, photos, or availability.
        </p>
      </div>

      <div className="border border-[var(--line)] bg-[var(--surface)] rounded-[4px] p-6 sm:p-8">
        <ListingForm initialData={listing} />
      </div>
    </div>
  );
}
