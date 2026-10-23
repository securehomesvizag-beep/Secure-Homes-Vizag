import React from 'react';
import Link from 'next/link';
import { Metadata } from 'next';
import { ArrowUpRight } from '@phosphor-icons/react/dist/ssr';

export const metadata: Metadata = {
  title: 'Page Not Found | Secure Home Vizag',
  description: 'The page you are looking for could not be found. Browse verified property listings in Visakhapatnam or contact Rajesh Ponnada directly.',
  robots: {
    index: false,
    follow: true,
  },
};

export default function NotFound() {
  return (
    <div className="max-w-[1200px] mx-auto px-4 sm:px-6 py-20 text-center space-y-8">
      <div className="space-y-4">
        <p className="font-heading text-7xl md:text-8xl text-[var(--brand)] font-semibold">404</p>
        <h1 className="font-heading text-3xl sm:text-4xl text-[var(--ink)]">
          Page Not Found
        </h1>
        <p className="text-base text-[var(--text)] max-w-md mx-auto leading-relaxed">
          The property listing or page you requested could not be located. It may have been sold, updated, or removed. Browse our current verified listings in Visakhapatnam.
        </p>
      </div>

      <div className="flex flex-wrap items-center justify-center gap-4">
        <Link
          href="/listings"
          className="inline-flex items-center justify-center gap-2 px-6 py-3 text-sm font-semibold text-[var(--surface)] bg-[var(--brand)] hover:bg-[var(--brand-hover)] rounded-[4px] min-h-[44px]"
        >
          <span>Browse Property Listings</span>
          <ArrowUpRight size={18} weight="regular" />
        </Link>
        <Link
          href="/"
          className="inline-flex items-center justify-center gap-2 px-6 py-3 text-sm font-semibold text-[var(--ink)] bg-[var(--surface)] border border-[var(--line)] hover:border-[var(--brand)] rounded-[4px] min-h-[44px]"
        >
          Return to Homepage
        </Link>
      </div>

      <nav className="text-sm text-[var(--text)]" aria-label="Helpful links">
        <p className="mb-3 font-semibold text-[var(--ink)]">Quick Links</p>
        <div className="flex flex-wrap justify-center gap-x-6 gap-y-2">
          <Link href="/listings?type=plots" className="text-[var(--brand)] hover:underline">Plots in Visakhapatnam</Link>
          <Link href="/listings?type=flats" className="text-[var(--brand)] hover:underline">Flats &amp; Apartments</Link>
          <Link href="/listings?type=villas" className="text-[var(--brand)] hover:underline">Villas &amp; Houses</Link>
          <Link href="/contact" className="text-[var(--brand)] hover:underline">Contact Rajesh Ponnada</Link>
        </div>
      </nav>
    </div>
  );
}
