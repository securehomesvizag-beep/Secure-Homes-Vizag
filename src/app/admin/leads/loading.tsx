import React from 'react';

export default function AdminLeadsLoading() {
  return (
    <div className="space-y-6">
      <div className="h-8 w-44 bg-[var(--line)] rounded-[4px]" />

      {/* Filter toolbar skeleton */}
      <div className="flex gap-3">
        <div className="h-10 w-36 bg-[var(--line)] rounded-[4px]" />
        <div className="h-10 w-36 bg-[var(--line)] rounded-[4px]" />
        <div className="h-10 w-28 bg-[var(--line)] rounded-[4px]" />
      </div>

      {/* Leads table skeleton: flat --line blocks with no shimmer */}
      <div className="h-96 w-full bg-[var(--line)] rounded-[4px]" />
    </div>
  );
}
