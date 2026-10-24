'use client';

import React, { useState } from 'react';
import { Phone, WhatsappLogo } from '@phosphor-icons/react';

interface LeadActionButtonsProps {
  listingId?: string;
  listingTitle?: string;
  variant?: 'row' | 'hero' | 'sticky' | 'card' | 'navbar';
  phoneNumber?: string;
  whatsappNumber?: string;
  className?: string;
}

export function LeadActionButtons({
  listingId,
  listingTitle,
  variant = 'row',
  phoneNumber = '8019928236',
  whatsappNumber = '918019928236',
  className = '',
}: LeadActionButtonsProps) {
  const [loading, setLoading] = useState<string | null>(null);

  const logClick = async (source: 'whatsapp_click' | 'call_click') => {
    try {
      await fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          source,
          listing_id: listingId || null,
          listing_title: listingTitle || null,
          page_url: typeof window !== 'undefined' ? window.location.href : '',
        }),
      });
    } catch {
      // If logging fails, user navigation still continues
    }
  };

  const handleWhatsApp = async (e: React.MouseEvent) => {
    e.preventDefault();
    setLoading('whatsapp');
    await logClick('whatsapp_click');
    setLoading(null);

    const message = listingTitle
      ? `Hi, I am interested in ${listingTitle}. Please share details.`
      : 'Hi, I am interested in property in Visakhapatnam. Please share details.';
    const url = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  const handleCall = async (e: React.MouseEvent) => {
    e.preventDefault();
    setLoading('call');
    await logClick('call_click');
    setLoading(null);

    window.location.href = `tel:+91${phoneNumber}`;
  };

  if (variant === 'navbar') {
    return (
      <div className={`flex items-center gap-2 ${className}`}>
        <a
          href={`tel:+91${phoneNumber}`}
          onClick={handleCall}
          className="inline-flex items-center gap-1.5 px-3 py-2 text-sm font-semibold text-[var(--ink)] hover:text-[var(--brand)] border border-[var(--line)] bg-[var(--surface)] rounded-[4px] min-h-[44px]"
          aria-label="Call Secure Home Vizag"
        >
          <Phone size={20} weight="regular" />
          <span>Call</span>
        </a>
        <a
          href={`https://wa.me/${whatsappNumber}`}
          onClick={handleWhatsApp}
          className="inline-flex items-center gap-1.5 px-3.5 py-2 text-sm font-semibold text-[var(--surface)] bg-[var(--brand)] hover:bg-[var(--brand-hover)] rounded-[4px] min-h-[44px]"
          aria-label="WhatsApp Secure Home Vizag"
        >
          <WhatsappLogo size={20} weight="regular" />
          <span>WhatsApp</span>
        </a>
      </div>
    );
  }

  if (variant === 'hero') {
    return (
      <div className={`flex flex-wrap items-center gap-3 pt-2 ${className}`}>
        <button
          type="button"
          onClick={handleWhatsApp}
          className="inline-flex items-center justify-center gap-2 px-6 py-3.5 text-base font-semibold text-[var(--surface)] bg-[var(--brand)] hover:bg-[var(--brand-hover)] rounded-[4px] min-h-[44px]"
          aria-label="Message on WhatsApp"
        >
          <WhatsappLogo size={20} weight="regular" />
          <span>Message on WhatsApp</span>
        </button>
        <button
          type="button"
          onClick={handleCall}
          className="inline-flex items-center justify-center gap-2 px-6 py-3.5 text-base font-semibold text-[var(--ink)] bg-[var(--surface)] hover:bg-[var(--line)] border border-[var(--line)] rounded-[4px] min-h-[44px]"
          aria-label="Call 8019928236"
        >
          <Phone size={20} weight="regular" />
          <span>Call 8019928236</span>
        </button>
      </div>
    );
  }

  return (
    <div className={`flex flex-wrap items-center gap-2 ${className}`}>
      <button
        type="button"
        onClick={handleWhatsApp}
        className="inline-flex items-center justify-center gap-2 px-4 py-2 text-sm font-semibold text-[var(--surface)] bg-[var(--brand)] hover:bg-[var(--brand-hover)] rounded-[4px] min-h-[44px]"
        aria-label="Enquire on WhatsApp"
      >
        <WhatsappLogo size={20} weight="regular" />
        <span>Enquire on WhatsApp</span>
      </button>
      <button
        type="button"
        onClick={handleCall}
        className="inline-flex items-center justify-center gap-1.5 px-3.5 py-2 text-sm font-semibold text-[var(--ink)] bg-[var(--surface)] hover:bg-[var(--line)] border border-[var(--line)] rounded-[4px] min-h-[44px]"
        aria-label="Call directly"
      >
        <Phone size={20} weight="regular" />
        <span>Call</span>
      </button>
    </div>
  );
}
