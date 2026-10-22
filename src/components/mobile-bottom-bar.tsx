'use client';

import React from 'react';
import { Phone, WhatsappLogo } from '@phosphor-icons/react';

export function MobileBottomBar() {
  const logClick = async (source: 'whatsapp_click' | 'call_click') => {
    try {
      await fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          source,
          page_url: typeof window !== 'undefined' ? window.location.href : '',
        }),
      });
    } catch {
      // Continue even if logging fails
    }
  };

  const handleWhatsApp = async (e: React.MouseEvent) => {
    e.preventDefault();
    await logClick('whatsapp_click');
    window.open('https://wa.me/918019928236?text=Hi%2C%20I%20am%20interested%20in%20property%20in%20Visakhapatnam.%20Please%20share%20details.', '_blank', 'noopener,noreferrer');
  };

  const handleCall = async (e: React.MouseEvent) => {
    e.preventDefault();
    await logClick('call_click');
    window.location.href = 'tel:+918019928236';
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 bg-[var(--surface)] border-t border-[var(--line)] p-2 md:hidden">
      <div className="grid grid-cols-2 gap-2">
        <a
          href="tel:+918019928236"
          onClick={handleCall}
          className="flex items-center justify-center gap-2 py-3 px-2 text-sm font-semibold text-[var(--ink)] bg-[var(--bg)] border border-[var(--line)] rounded-[4px] min-h-[44px]"
          aria-label="Call broker directly"
        >
          <Phone size={20} weight="regular" />
          <span>Call</span>
        </a>
        <a
          href="https://wa.me/918019928236"
          onClick={handleWhatsApp}
          className="flex items-center justify-center gap-2 py-3 px-2 text-sm font-semibold text-[var(--surface)] bg-[var(--brand)] hover:bg-[var(--brand-hover)] rounded-[4px] min-h-[44px]"
          aria-label="Message broker on WhatsApp"
        >
          <WhatsappLogo size={20} weight="regular" />
          <span>WhatsApp</span>
        </a>
      </div>
    </div>
  );
}
