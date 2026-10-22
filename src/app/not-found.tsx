import React from 'react';
import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="max-w-[1200px] mx-auto px-4 sm:px-6 py-20 text-center space-y-6">
      <h1 className="font-heading text-4xl sm:text-5xl text-[var(--ink)]">
        Page Not Found
      </h1>
      <p className="text-base text-[var(--text)] max-w-md mx-auto">
        The requested property or page could not be located. It may have been updated or removed.
      </p>
      <div>
        <Link
          href="/"
          className="inline-flex items-center justify-center px-6 py-3 text-sm font-semibold text-[var(--surface)] bg-[var(--brand)] hover:bg-[var(--brand-hover)] rounded-[4px] min-h-[44px]"
        >
          Return to Homepage
        </Link>
      </div>
    </div>
  );
}
