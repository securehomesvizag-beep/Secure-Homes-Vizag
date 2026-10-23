'use client';

import React from 'react';
import { WhatsappLogo } from '@phosphor-icons/react';
import { SiteSettings } from '@/lib/types';
import { useResponsive } from '@/hooks/use-responsive';

interface DesktopWhatsAppButtonProps {
  settings?: SiteSettings;
}

export function DesktopWhatsAppButton({ settings }: DesktopWhatsAppButtonProps) {
  const { isMobile, isMounted } = useResponsive();
  const whatsappLink = settings?.whatsapp_link || `https://wa.me/91${settings?.whatsapp_number || '8019928236'}`;

  if (isMounted && isMobile) {
    return null;
  }

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

    const defaultUrl = `${whatsappLink}?text=${encodeURIComponent('Hi, I am interested in property in Visakhapatnam. Please share details.')}`;
    window.open(defaultUrl, '_blank', 'noopener,noreferrer');
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
