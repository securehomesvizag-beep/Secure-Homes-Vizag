import React from 'react';
import Link from 'next/link';
import { ListingForm } from '../listing-form';
import { ArrowLeft } from '@phosphor-icons/react/dist/ssr';

export default function NewListingPage() {
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
          Add New Listing
        </h1>
        <p className="text-sm text-[var(--text)]">
          Fill in factual property details. VMRDA and RERA approvals are set via yes/no switches.
        </p>
      </div>

      <div className="border border-[var(--line)] bg-[var(--surface)] rounded-[4px] p-6 sm:p-8">
        <ListingForm />
      </div>
    </div>
  );
}
