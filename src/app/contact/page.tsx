import React from 'react';
import { Metadata } from 'next';
import { Phone, WhatsappLogo, Clock, MapPin } from '@phosphor-icons/react/dist/ssr';
import { getSettings } from '@/lib/data';
import { LeadCaptureForm } from '@/components/lead-capture-form';

export const metadata: Metadata = {
  title: 'Contact Secure Home Vizag | Rajesh Ponnada',
  description:
    'Contact Rajesh Ponnada at Secure Home Vizag directly via Phone, WhatsApp, or online enquiry for verified property options in Visakhapatnam.',
};

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export default async function ContactPage() {
  const settings = await getSettings();

  return (
    <div className="fade-in max-w-[1200px] mx-auto px-4 sm:px-6 py-12 md:py-16">
      <div className="max-w-2xl mb-12">
        <h1 className="font-heading text-3xl md:text-5xl text-[var(--ink)] mb-3">
          Contact Secure Home Vizag
        </h1>
        <p className="text-[var(--text)] text-base md:text-lg leading-relaxed">
          Reach Rajesh Ponnada directly for property inquiries, title checks, or site visits across Visakhapatnam.
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

            {/* Office Address (Placeholder entered in admin) */}
            {settings.office_address && (
              <div className="pt-4 border-t border-[var(--line)] space-y-2">
                <div className="flex items-center gap-2 text-sm font-semibold text-[var(--ink)]">
                  <MapPin size={20} weight="regular" className="text-[var(--ink)]" />
                  <span>Office Location</span>
                </div>
                <p className="text-sm text-[var(--text)] pl-7">
                  {settings.office_address}
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Contact Form (7 cols) */}
        <div className="lg:col-span-7">
          <div className="border border-[var(--line)] bg-[var(--surface)] rounded-[4px] p-6 sm:p-8">
            <h2 className="font-heading text-2xl text-[var(--ink)] mb-2">
              Send a Direct Message
            </h2>
            <p className="text-sm text-[var(--text)] mb-6">
              Fill out your details below and Rajesh Ponnada will contact you shortly with verified options.
            </p>
            <LeadCaptureForm inDarkSection={false} />
          </div>
        </div>
      </div>
    </div>
  );
}
