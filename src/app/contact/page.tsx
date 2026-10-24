import React from 'react';
import { Metadata } from 'next';
import Link from 'next/link';
import { Phone, WhatsappLogo, Clock, MapPin } from '@phosphor-icons/react/dist/ssr';
import { getSettings } from '@/lib/data';
import { LeadCaptureForm } from '@/components/lead-capture-form';
import { getBreadcrumbJsonLd } from '@/lib/jsonld';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.securehomevizag.com';

export const metadata: Metadata = {
  title: 'Contact Rajesh Ponnada | Property Enquiry in Visakhapatnam | Secure Home Vizag',
  description:
    'Contact Rajesh Ponnada at Secure Home Vizag directly via Phone or WhatsApp for verified property enquiries, site visits, and title checks in Visakhapatnam. Available Monday to Saturday, 9 AM to 7 PM.',
  alternates: {
    canonical: `${SITE_URL}/contact`,
  },
  openGraph: {
    title: 'Contact Rajesh Ponnada | Property Enquiry in Visakhapatnam',
    description:
      'Reach Rajesh Ponnada directly for property enquiries, site visits, and title checks across Visakhapatnam. Call, WhatsApp, or submit an online enquiry.',
    url: `${SITE_URL}/contact`,
    type: 'website',
    images: [{ url: '/brand/og-image.jpg', width: 1200, height: 630, alt: 'Contact Secure Home Vizag' }],
  },
};

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export default async function ContactPage() {
  const settings = await getSettings();

  const breadcrumbJsonLd = getBreadcrumbJsonLd(SITE_URL, [
    { name: 'Home', url: '/' },
    { name: 'Contact', url: '/contact' },
  ]);

  // ContactPage schema
  const contactPageJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'ContactPage',
    '@id': `${SITE_URL}/contact`,
    name: 'Contact Secure Home Vizag',
    url: `${SITE_URL}/contact`,
    description: 'Contact page for Secure Home Vizag. Reach Rajesh Ponnada for property enquiries in Visakhapatnam.',
    mainEntity: {
      '@type': 'RealEstateAgent',
      name: 'Secure Home Vizag',
      telephone: `+91${settings.phone}`,
      address: {
        '@type': 'PostalAddress',
        streetAddress: settings.office_address || 'Visakhapatnam',
        addressLocality: 'Visakhapatnam',
        addressRegion: 'Andhra Pradesh',
        addressCountry: 'IN',
      },
      openingHours: 'Mo-Sa 09:00-19:00',
    },
  };

  return (
    <div className="fade-in max-w-[1200px] mx-auto px-4 sm:px-6 py-12 md:py-16">
      {/* Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(contactPageJsonLd) }}
      />

      {/* Breadcrumb Navigation */}
      <nav aria-label="Breadcrumb" className="text-sm text-[var(--text)] mb-8">
        <ol className="flex items-center gap-1.5 flex-wrap">
          <li>
            <Link href="/" className="hover:text-[var(--brand)] hover:underline">Home</Link>
          </li>
          <li aria-hidden="true" className="text-[var(--line)]">/</li>
          <li aria-current="page" className="text-[var(--ink)] font-semibold">Contact</li>
        </ol>
      </nav>

      <div className="max-w-2xl mb-12">
        <h1 className="font-heading text-3xl md:text-5xl text-[var(--ink)] mb-3">
          Contact Secure Home Vizag
        </h1>
        <p className="text-[var(--text)] text-base md:text-lg leading-relaxed">
          Reach Rajesh Ponnada directly for property enquiries, title verification checks, or to arrange site visits across Visakhapatnam. No automated responses — direct personal communication.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        {/* Contact Information (5 cols) */}
        <div className="lg:col-span-5 space-y-6">
          <div className="border border-[var(--line)] bg-[var(--surface)] rounded-[4px] p-6 space-y-6">
            <div>
              <h2 className="font-heading text-xl text-[var(--ink)] mb-4">
                Direct Contact
              </h2>
              <div className="space-y-4">
                <a
                  href={`tel:+91${settings.phone}`}
                  className="flex items-center gap-3 p-3 border border-[var(--line)] rounded-[4px] hover:border-[var(--brand)] transition-colors text-[var(--ink)]"
                  aria-label={`Call Rajesh Ponnada at +91 ${settings.phone}`}
                >
                  <Phone size={24} weight="regular" className="text-[var(--brand)]" />
                  <div>
                    <span className="block text-xs uppercase tracking-wider text-[var(--text)]">
                      Phone Call
                    </span>
                    <span className="font-semibold text-base">+91 {settings.phone}</span>
                  </div>
                </a>

                <a
                  href={settings.whatsapp_link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 p-3 border border-[var(--line)] rounded-[4px] hover:border-[var(--brand)] transition-colors text-[var(--ink)]"
                  aria-label={`WhatsApp Rajesh Ponnada at +91 ${settings.whatsapp_number}`}
                >
                  <WhatsappLogo size={24} weight="regular" className="text-[var(--brand)]" />
                  <div>
                    <span className="block text-xs uppercase tracking-wider text-[var(--text)]">
                      WhatsApp Chat
                    </span>
                    <span className="font-semibold text-base">+91 {settings.whatsapp_number}</span>
                  </div>
                </a>
              </div>
            </div>

            {/* Working Hours */}
            <div className="pt-4 border-t border-[var(--line)] space-y-2">
              <div className="flex items-center gap-2 text-sm font-semibold text-[var(--ink)]">
                <Clock size={20} weight="regular" className="text-[var(--ink)]" />
                <span>Working Hours</span>
              </div>
              <p className="text-sm text-[var(--text)] pl-7">
                {settings.working_hours}
              </p>
            </div>

            {/* Office Address */}
            {settings.office_address && (
              <div className="pt-4 border-t border-[var(--line)] space-y-2">
                <div className="flex items-center gap-2 text-sm font-semibold text-[var(--ink)]">
                  <MapPin size={20} weight="regular" className="text-[var(--ink)]" />
                  <span>Service Location</span>
                </div>
                <p className="text-sm text-[var(--text)] pl-7">
                  {settings.office_address}
                </p>
                <p className="text-xs text-[var(--text)] pl-7">
                  Serving all major areas of Visakhapatnam including Madhurawada, Bheemili, Anandapuram, and Gajuwaka.
                </p>
              </div>
            )}

            {/* Quick Links */}
            <div className="pt-4 border-t border-[var(--line)] space-y-2">
              <p className="text-xs font-semibold uppercase tracking-wider text-[var(--text)]">
                Explore Properties
              </p>
              <ul className="space-y-1 text-sm">
                <li>
                  <Link href="/listings?type=plots" className="text-[var(--brand)] hover:underline">
                    Plots in Visakhapatnam
                  </Link>
                </li>
                <li>
                  <Link href="/listings?type=flats" className="text-[var(--brand)] hover:underline">
                    Flats &amp; Apartments
                  </Link>
                </li>
                <li>
                  <Link href="/listings?type=villas" className="text-[var(--brand)] hover:underline">
                    Villas &amp; Houses
                  </Link>
                </li>
                <li>
                  <Link href="/listings?type=commercial" className="text-[var(--brand)] hover:underline">
                    Commercial Properties
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Contact Form (7 cols) */}
        <div className="lg:col-span-7">
          <div className="border border-[var(--line)] bg-[var(--surface)] rounded-[4px] p-6 sm:p-8">
            <h2 className="font-heading text-2xl text-[var(--ink)] mb-2">
              Send a Direct Enquiry
            </h2>
            <p className="text-sm text-[var(--text)] mb-6">
              Fill out your details below and Rajesh Ponnada will contact you directly with verified property options matching your requirements.
            </p>
            <LeadCaptureForm inDarkSection={false} />
          </div>
        </div>
      </div>
    </div>
  );
}
