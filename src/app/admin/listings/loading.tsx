import React from 'react';

export default function AdminListingsLoading() {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div className="h-8 w-44 bg-[var(--line)] rounded-[4px]" />
        <div className="h-10 w-32 bg-[var(--line)] rounded-[4px]" />
      </div>

      {/* Listings table skeleton: flat --line blocks with no shimmer */}
      <div className="h-80 w-full bg-[var(--line)] rounded-[4px]" />
    </div>
  );
}
