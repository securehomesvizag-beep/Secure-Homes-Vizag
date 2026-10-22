import React from 'react';

export default function ListingDetailLoading() {
  return (
    <div className="max-w-[1200px] mx-auto px-4 sm:px-6 py-10 md:py-14 space-y-8">
      {/* Back link skeleton */}
      <div className="h-6 w-32 bg-[var(--line)] rounded-[4px]" />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        {/* Main Content skeleton */}
        <div className="lg:col-span-8 space-y-6">
          <div className="h-96 w-full bg-[var(--line)] rounded-[4px]" />
          <div className="h-10 w-3/4 bg-[var(--line)] rounded-[4px]" />
          <div className="h-8 w-40 bg-[var(--line)] rounded-[4px]" />
          <div className="h-44 w-full bg-[var(--line)] rounded-[4px]" />
          <div className="h-32 w-full bg-[var(--line)] rounded-[4px]" />
        </div>

        {/* Sidebar skeleton */}
        <div className="lg:col-span-4 space-y-4">
          <div className="h-80 w-full bg-[var(--line)] rounded-[4px]" />
        </div>
      </div>
    </div>
  );
}
