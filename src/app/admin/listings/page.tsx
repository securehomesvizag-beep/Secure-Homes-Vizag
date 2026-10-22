import React from 'react';
import { getAllListingsForAdmin } from '@/lib/data';
import { ListingsManager } from './listings-manager';

export default async function AdminListingsPage() {
  const listings = await getAllListingsForAdmin();

  return (
    <div className="space-y-6 fade-in">
      <div>
        <h1 className="font-heading text-2xl md:text-3xl text-[var(--ink)] mb-1">
          Manage Properties
        </h1>
        <p className="text-sm text-[var(--text)]">
          Create, edit, toggle publishing, and manage approval switches for all property listings.
        </p>
      </div>

      <ListingsManager initialListings={listings} />
    </div>
  );
}
