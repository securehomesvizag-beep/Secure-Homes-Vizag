import React from 'react';

export default function Loading() {
  return (
    <div className="max-w-[1200px] mx-auto px-4 sm:px-6 py-12 md:py-20 space-y-8">
      {/* Flat --line colored skeleton header with no shimmer animation */}
      <div className="h-10 w-2/3 max-w-md bg-[var(--line)] rounded-[4px]" />
      <div className="h-5 w-full max-w-xl bg-[var(--line)] rounded-[4px]" />

      <div className="space-y-4 pt-6">
        <div className="h-44 w-full bg-[var(--line)] rounded-[4px]" />
        <div className="h-44 w-full bg-[var(--line)] rounded-[4px]" />
        <div className="h-44 w-full bg-[var(--line)] rounded-[4px]" />
      </div>
    </div>
  );
}
