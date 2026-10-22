import React from 'react';

export default function AdminDashboardLoading() {
  return (
    <div className="space-y-8">
      <div className="h-8 w-48 bg-[var(--line)] rounded-[4px]" />

      {/* Metrics Cards Skeleton */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="h-28 bg-[var(--line)] rounded-[4px]" />
        <div className="h-28 bg-[var(--line)] rounded-[4px]" />
        <div className="h-28 bg-[var(--line)] rounded-[4px]" />
      </div>

      {/* Source Breakdown Skeleton */}
      <div className="h-32 bg-[var(--line)] rounded-[4px]" />

      {/* Recent Leads Table Skeleton */}
      <div className="space-y-3">
        <div className="h-6 w-36 bg-[var(--line)] rounded-[4px]" />
        <div className="h-64 bg-[var(--line)] rounded-[4px]" />
      </div>
    </div>
  );
}
