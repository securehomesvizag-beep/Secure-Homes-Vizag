import React from 'react';
import { Metadata } from 'next';
import Link from 'next/link';
import { getBreadcrumbJsonLd } from '@/lib/jsonld';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.securehomevizag.com';

export const metadata: Metadata = {
  title: 'Terms of Service | Secure Home Vizag — Real Estate Advisory in Visakhapatnam',
  description:
    'Terms of Service governing property advisory, website use, listing accuracy, site visits, and buyer responsibilities for Secure Home Vizag, operated by Rajesh Ponnada in Visakhapatnam, Andhra Pradesh.',
  alternates: {
    canonical: `${SITE_URL}/terms`,
  },
  robots: { index: true, follow: true },
};

export default function TermsPage() {
  const breadcrumbJsonLd = getBreadcrumbJsonLd(SITE_URL, [
    { name: 'Home', url: '/' },
    { name: 'Terms of Service', url: '/terms' },
  ]);

  return (
    <div className="fade-in max-w-[900px] mx-auto px-4 sm:px-6 py-12 md:py-16 space-y-8">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />

      {/* Breadcrumb */}
      <nav aria-label="Breadcrumb" className="text-sm text-[var(--text)]">
        <ol className="flex items-center gap-1.5 flex-wrap">
          <li><Link href="/" className="hover:text-[var(--brand)] hover:underline">Home</Link></li>
          <li aria-hidden="true" className="text-[var(--line)]">/</li>
          <li aria-current="page" className="text-[var(--ink)] font-semibold">Terms of Service</li>
        </ol>
      </nav>
      <div>
        <h1 className="font-heading text-3xl md:text-5xl text-[var(--ink)] mb-3">
          Terms of Service
        </h1>
        <p className="text-sm text-[var(--text)]">
          Last updated: October 2026. Governing real estate advisory and inquiries via Secure Home Vizag.
        </p>
      </div>

      <div className="space-y-6 text-base text-[var(--text)] leading-relaxed border-t border-[var(--line)] pt-6">
        <section className="space-y-3">
          <h2 className="font-heading text-xl text-[var(--ink)]">
            1. Nature of Services
          </h2>
          <p>
            Secure Home Vizag, headed by Rajesh Ponnada, operates as an independent property consultancy and facilitation service based in Visakhapatnam, Andhra Pradesh. We connect prospective purchasers, tenants, and investors with property owners, layout promoters, and builders.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="font-heading text-xl text-[var(--ink)]">
            2. Property Listings and Approval Status
          </h2>
          <p>
            All listings on this website represent genuine properties available in Visakhapatnam. When a property is indicated as VMRDA Approved or RERA Approved, this reflects the development layout sanctions verified through developer documentation.
          </p>
          <p>
            Prospective buyers are always encouraged and assisted to carry out independent legal verification of title deeds, encumbrance certificates, and physical boundaries prior to entering into a registered purchase deed.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="font-heading text-xl text-[var(--ink)]">
            3. Transparency and Written Documentation
          </h2>
          <p>
            Property details and layout approvals communicated by Rajesh Ponnada are shared transparently and in writing. Statutory registration duties, stamp duties, and legal documentation fees are mutually confirmed prior to signing.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="font-heading text-xl text-[var(--ink)]">
            4. Site Visits and Communications
          </h2>
          <p>
            By submitting an enquiry form or initiating contact via WhatsApp or telephone, you agree to receive communications from Secure Home Vizag regarding the specific property or related options. Site visits are arranged by appointment.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="font-heading text-xl text-[var(--ink)]">
            5. Limitation of Liability
          </h2>
          <p>
            While Secure Home Vizag conducts title and layout checks, all real estate transactions are subject to final contract and registration between the seller and the buyer. Secure Home Vizag is not liable for municipal planning changes, legislative changes, or third-party disputes arising outside our advisory scope.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="font-heading text-xl text-[var(--ink)]">
            6. Governing Jurisdiction
          </h2>
          <p>
            These terms are governed by the laws of India. Any legal dispute or interpretation relating to property transactions facilitated through Secure Home Vizag is subject to the exclusive jurisdiction of the competent courts in Visakhapatnam, Andhra Pradesh.
          </p>
          <p>
            Questions regarding these terms may be directed through our{' '}
            <Link href="/contact" className="text-[var(--brand)] underline">
              Contact Page
            </Link>.
          </p>
        </section>
      </div>
    </div>
  );
}
