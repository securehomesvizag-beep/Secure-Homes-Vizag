'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { WhatsappLogo } from '@phosphor-icons/react';
import { PropertyType } from '@/lib/types';

interface LeadCaptureFormProps {
  listingId?: string;
  listingTitle?: string;
  defaultInterest?: PropertyType;
  inDarkSection?: boolean;
}

export function LeadCaptureForm({
  listingId,
  listingTitle,
  defaultInterest = 'plots',
  inDarkSection = false,
}: LeadCaptureFormProps) {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [interest, setInterest] = useState<PropertyType>(defaultInterest);
  const [message, setMessage] = useState('');
  const [consent, setConsent] = useState(false);
  const [honeypot, setHoneypot] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    // Validate 10-digit Indian phone (stripping leading +91 or 0 if provided)
    let cleanPhone = phone.replace(/\D/g, '');
    if (cleanPhone.length === 12 && cleanPhone.startsWith('91')) {
      cleanPhone = cleanPhone.substring(2);
    } else if (cleanPhone.length === 11 && cleanPhone.startsWith('0')) {
      cleanPhone = cleanPhone.substring(1);
    }

    if (cleanPhone.length !== 10) {
      setErrorMessage('Please enter a valid 10-digit mobile number.');
      return;
    }

    if (!consent) {
      setErrorMessage('Please agree to be contacted regarding your property enquiry.');
      return;
    }

    setSubmitting(true);

    try {
      const res = await fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          source: 'form',
          name,
          phone: cleanPhone,
          interest,
          message,
          listing_id: listingId || null,
          listing_title: listingTitle || null,
          page_url: typeof window !== 'undefined' ? window.location.href : '',
          website_hp: honeypot, // Honeypot spam trap
        }),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || 'Failed to submit enquiry');
      }

      setSubmitted(true);
    } catch (err: unknown) {
      if (err instanceof Error) {
        setErrorMessage(err.message);
      } else {
        setErrorMessage('Something went wrong. Please call or message on WhatsApp.');
      }
    } finally {
      setSubmitting(false);
    }
  };

  const whatsappContinueUrl = `https://wa.me/918019928236?text=${encodeURIComponent(
    `Hi Rajesh, I just submitted an enquiry for ${interest.toUpperCase()}${listingTitle ? ` (${listingTitle})` : ''
    }. Name: ${name}, Phone: ${phone}. Please share details.`
  )}`;

  if (submitted) {
    return (
      <div className={`p-6 border rounded-[4px] ${inDarkSection
          ? 'bg-[#1e2f52] border-[#2f4370] text-[#FAF7F2]'
          : 'bg-[var(--surface)] border-[var(--line)] text-[var(--ink)]'
        }`}>
        <p className="font-heading text-xl font-semibold mb-2">
          Thank you. Your enquiry is received.
        </p>
        <p className="text-sm text-[var(--text)] mb-6 leading-relaxed">
          Rajesh Ponnada will review your request and call you shortly. You can also connect immediately on WhatsApp.
        </p>
        <a
          href={whatsappContinueUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center justify-center gap-2 w-full py-3 px-4 text-sm font-semibold text-[var(--surface)] bg-[var(--brand)] hover:bg-[var(--brand-hover)] rounded-[4px] min-h-[44px]"
        >
          <WhatsappLogo size={20} weight="regular" />
          <span>Continue on WhatsApp</span>
        </a>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {/* Hidden honeypot field */}
      <input
        type="text"
        name="website_hp"
        value={honeypot}
        onChange={(e) => setHoneypot(e.target.value)}
        className="hidden"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
      />

      {errorMessage && (
        <div className="p-3 text-sm border border-[var(--danger)] text-[var(--danger)] bg-[var(--surface)] rounded-[4px]">
          {errorMessage}
        </div>
      )}

      <div>
        <label
          htmlFor="enquiry-name"
          className={`block text-sm font-semibold mb-1.5 ${inDarkSection ? 'text-[#FAF7F2]' : 'text-[var(--ink)]'
            }`}
        >
          Your Name <span className="text-[var(--brand)]">*</span>
        </label>
        <input
          id="enquiry-name"
          type="text"
          required
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Rajesh Ponnada"
          className="w-full px-3.5 py-2.5 text-base bg-[var(--surface)] border border-[var(--line)] rounded-[4px] text-[var(--ink)] placeholder:text-[#888b94] min-h-[44px]"
        />
      </div>

      <div>
        <label
          htmlFor="enquiry-phone"
          className={`block text-sm font-semibold mb-1.5 ${inDarkSection ? 'text-[#FAF7F2]' : 'text-[var(--ink)]'
            }`}
        >
          Phone Number (10 digits) <span className="text-[var(--brand)]">*</span>
        </label>
        <div className="flex items-center">
          <span className="px-3 py-2.5 bg-[var(--line)] text-[var(--ink)] text-sm border border-r-0 border-[var(--line)] rounded-l-[4px] min-h-[44px] flex items-center">
            +91
          </span>
          <input
            id="enquiry-phone"
            type="tel"
            required
            maxLength={10}
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder="9848012345"
            className="w-full px-3.5 py-2.5 text-base bg-[var(--surface)] border border-[var(--line)] rounded-r-[4px] text-[var(--ink)] placeholder:text-[#888b94] min-h-[44px]"
          />
        </div>
      </div>

      <div>
        <label
          htmlFor="enquiry-interest"
          className={`block text-sm font-semibold mb-1.5 ${inDarkSection ? 'text-[#FAF7F2]' : 'text-[var(--ink)]'
            }`}
        >
          Property Interest
        </label>
        <select
          id="enquiry-interest"
          value={interest}
          onChange={(e) => setInterest(e.target.value as PropertyType)}
          className="w-full px-3.5 py-2.5 text-base bg-[var(--surface)] border border-[var(--line)] rounded-[4px] text-[var(--ink)] min-h-[44px]"
        >
          <option value="plots">Plot or Open Land</option>
          <option value="flats">Flat or Apartment</option>
          <option value="villas">Independent House or Villa</option>
          <option value="commercial">Commercial Property</option>
        </select>
      </div>

      <div>
        <label
          htmlFor="enquiry-message"
          className={`block text-sm font-semibold mb-1.5 ${inDarkSection ? 'text-[#FAF7F2]' : 'text-[var(--ink)]'
            }`}
        >
          Message (Optional)
        </label>
        <textarea
          id="enquiry-message"
          rows={3}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Preferred location, budget, or timeline..."
          className="w-full px-3.5 py-2.5 text-base bg-[var(--surface)] border border-[var(--line)] rounded-[4px] text-[var(--ink)] placeholder:text-[#888b94] resize-none"
        />
      </div>

      <div className="pt-1">
        <label className="flex items-start gap-2.5 cursor-pointer">
          <input
            type="checkbox"
            required
            checked={consent}
            onChange={(e) => setConsent(e.target.checked)}
            className="mt-1 h-4 w-4 rounded-[4px] border-[var(--line)] text-[var(--brand)] accent-[var(--brand)]"
          />
          <span className={`text-xs leading-relaxed ${inDarkSection ? 'text-[#E7E0D5]' : 'text-[var(--text)]'
            }`}>
            I authorize Secure Home Vizag to contact me via Call or WhatsApp regarding this enquiry. See our{' '}
            <Link href="/privacy" className="underline hover:text-[var(--brand)]">
              Privacy Policy
            </Link>.
          </span>
        </label>
      </div>

      <button
        type="submit"
        disabled={submitting}
        className="w-full py-3.5 px-4 text-base font-semibold text-[var(--surface)] bg-[var(--brand)] hover:bg-[var(--brand-hover)] rounded-[4px] disabled:opacity-50 min-h-[44px]"
      >
        {submitting ? 'Submitting...' : 'Send Property Enquiry'}
      </button>
    </form>
  );
}
