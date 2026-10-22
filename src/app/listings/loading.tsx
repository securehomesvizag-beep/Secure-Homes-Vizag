import React from 'react';

export default function ListingsLoading() {
  return (
    <div className="max-w-[1200px] mx-auto px-4 sm:px-6 py-12 md:py-16 space-y-8">
      {/* Page Title skeleton */}
      <div className="space-y-3">
        <div className="h-10 w-64 bg-[var(--line)] rounded-[4px]" />
        <div className="h-5 w-96 bg-[var(--line)] rounded-[4px]" />
      </div>

      {/* Tabs skeleton */}
      <div className="flex gap-2 border-b border-[var(--line)] pb-4">
        <div className="h-10 w-24 bg-[var(--line)] rounded-[4px]" />
        <div className="h-10 w-24 bg-[var(--line)] rounded-[4px]" />
        <div className="h-10 w-24 bg-[var(--line)] rounded-[4px]" />
        <div className="h-10 w-28 bg-[var(--line)] rounded-[4px]" />
      </div>

      {/* Row card skeletons: flat --line blocks with no shimmer */}
      <div className="space-y-4">
        <div className="h-52 w-full bg-[var(--line)] rounded-[4px]" />
        <div className="h-52 w-full bg-[var(--line)] rounded-[4px]" />
        <div className="h-52 w-full bg-[var(--line)] rounded-[4px]" />
      </div>
    </div>
  );
}
