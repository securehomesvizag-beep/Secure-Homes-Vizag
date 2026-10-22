'use client';

import React from 'react';
import { WhatsappLogo } from '@phosphor-icons/react';

export function DesktopWhatsAppButton() {
  const handleClick = async (e: React.MouseEvent) => {
    e.preventDefault();
    try {
      await fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          source: 'whatsapp_click',
          page_url: typeof window !== 'undefined' ? window.location.href : '',
        }),
      });
    } catch {
      // Continue even if logging fails
    }

    window.open('https://wa.me/918019928236?text=Hi%2C%20I%20am%20interested%20in%20property%20in%20Visakhapatnam.%20Please%20share%20details.', '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="hidden md:block fixed bottom-6 right-6 z-40">
      <button
        type="button"
        onClick={handleClick}
        className="flex items-center gap-2 px-4 py-3 bg-[var(--brand)] hover:bg-[var(--brand-hover)] text-[var(--surface)] text-sm font-semibold rounded-[4px] border border-[var(--brand)] min-h-[44px]"
        aria-label="Direct WhatsApp Enquiry"
      >
        <WhatsappLogo size={20} weight="regular" />
        <span>Chat on WhatsApp</span>
      </button>
    </div>
  );
}
