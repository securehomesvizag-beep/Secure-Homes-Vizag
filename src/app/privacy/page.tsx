import React from 'react';
import { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Privacy Policy | Secure Home Vizag',
  description:
    'Privacy Policy for Secure Home Vizag outlining what data is collected, how it is used for property enquiries, data retention, and your rights.',
};

export default function PrivacyPolicyPage() {
  return (
    <div className="fade-in max-w-[900px] mx-auto px-4 sm:px-6 py-12 md:py-16 space-y-8">
      <div>
        <h1 className="font-heading text-3xl md:text-5xl text-[var(--ink)] mb-3">
          Privacy Policy
        </h1>
        <p className="text-sm text-[var(--text)]">
          Last updated: October 2026. Applicable to visitors and clients of Secure Home Vizag.
        </p>
      </div>

      <div className="space-y-6 text-base text-[var(--text)] leading-relaxed border-t border-[var(--line)] pt-6">
        <section className="space-y-3">
          <h2 className="font-heading text-xl text-[var(--ink)]">
            1. Purpose and Scope
          </h2>
          <p>
            Secure Home Vizag, operated by Rajesh Ponnada in Visakhapatnam, Andhra Pradesh, respects your personal privacy. This Privacy Policy informs you about how we handle information collected when you browse our website, tap to contact via WhatsApp or phone, or submit an enquiry form.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="font-heading text-xl text-[var(--ink)]">
            2. What Data We Collect
          </h2>
          <p>We collect only the information necessary to fulfill real estate consultations and site visits:</p>
          <ul className="list-disc pl-6 space-y-2">
            <li>
              <strong>Enquiry Form Data:</strong> Your name, 10-digit mobile number, property type of interest (Plots, Flats, Villas, Commercial), and optional message notes.
            </li>
            <li>
              <strong>Action Click Records:</strong> When you tap &quot;Call&quot; or &quot;WhatsApp&quot;, our server logs the interaction source, the listing title or page viewed, and the timestamp.
            </li>
            <li>
              <strong>Technical Telemetry:</strong> Standard IP address logs used solely for spam prevention and rate limiting to protect our web forms.
            </li>
          </ul>
        </section>

        <section className="space-y-3">
          <h2 className="font-heading text-xl text-[var(--ink)]">
            3. Why We Collect This Data
          </h2>
          <p>The information is used strictly to:</p>
          <ul className="list-disc pl-6 space-y-2">
            <li>Connect you directly with Rajesh Ponnada regarding the specific property you inquired about.</li>
            <li>Provide clear link documents, pricing details, and arrange verified on-ground site inspections in Visakhapatnam.</li>
            <li>Maintain an internal log of buyer requirements to suggest suitable new layout launches.</li>
          </ul>
          <p>We do not sell, rent, or lease your contact information to third-party telemarketers or advertisers.</p>
        </section>

        <section className="space-y-3">
          <h2 className="font-heading text-xl text-[var(--ink)]">
            4. Data Storage and Retention
          </h2>
          <p>
            Lead entries are stored securely within protected databases accessible only by authorized administrators. We retain active enquiry details for up to 12 months, or until the transaction is closed or you request deletion.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="font-heading text-xl text-[var(--ink)]">
            5. How to Request Data Deletion
          </h2>
          <p>
            You have the right to request the deletion or correction of your contact records at any time. Simply send an email or WhatsApp message to +91 8019928236 with your phone number and request deletion. We will permanently delete your records within 3 business days.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="font-heading text-xl text-[var(--ink)]">
            6. Contact for Privacy Matters
          </h2>
          <p>
            For any questions regarding this policy or your personal data, reach out to Rajesh Ponnada at +91 8019928236 or via our{' '}
            <Link href="/contact" className="text-[var(--brand)] underline">
              Contact Page
            </Link>.
          </p>
        </section>
      </div>
    </div>
  );
}
