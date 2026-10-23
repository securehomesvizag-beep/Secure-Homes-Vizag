import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Phone, WhatsappLogo } from '@phosphor-icons/react/dist/ssr';
import { SiteSettings } from '@/lib/types';

interface FooterProps {
  settings?: SiteSettings;
}

export function Footer({ settings }: FooterProps) {
  const phone = settings?.phone || '8019928236';
  const whatsappLink = settings?.whatsapp_link || `https://wa.me/91${settings?.whatsapp_number || '8019928236'}`;
  const address = settings?.office_address || 'Visakhapatnam, Andhra Pradesh';
  return (
    <footer className="bg-[var(--ink)] text-[#FAF7F2] border-t border-[var(--line)] pt-16 pb-24 md:pb-16">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 pb-12 border-b border-[#233355]">
          {/* Column 1: Brand and Promise */}
          <div className="space-y-4 md:col-span-1">
            <div className="bg-[var(--surface)] p-2 inline-block rounded-[4px]">
              <Image
                src="/brand/logo.svg"
                alt="Secure Home Vizag"
                width={160}
                height={40}
                className="h-9 w-auto"
              />
            </div>
            <p className="text-sm text-[#E7E0D5] leading-relaxed">
              Transparent and Reliable real estate consultancy in Visakhapatnam. 10+ years of local property advisory.
            </p>
            <p className="text-xs text-[#E7E0D5]">
              Proprietor: Rajesh Ponnada
            </p>
          </div>

          {/* Column 2: Quick Links */}
          <div className="space-y-3">
            <p className="text-sm font-semibold uppercase tracking-wider text-[#FAF7F2]">
              Properties
            </p>
            <ul className="space-y-2 text-sm text-[#E7E0D5]">
              <li>
                <Link href="/listings?type=plots" className="hover:text-[var(--brand)]">
                  Plots and Land
                </Link>
              </li>
              <li>
                <Link href="/listings?type=flats" className="hover:text-[var(--brand)]">
                  Flats and Apartments
                </Link>
              </li>
              <li>
                <Link href="/listings?type=villas" className="hover:text-[var(--brand)]">
                  Villas and Houses
                </Link>
              </li>
              <li>
                <Link href="/listings?type=commercial" className="hover:text-[var(--brand)]">
                  Commercial Properties
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Company */}
          <div className="space-y-3">
            <p className="text-sm font-semibold uppercase tracking-wider text-[#FAF7F2]">
              Company
            </p>
            <ul className="space-y-2 text-sm text-[#E7E0D5]">
              <li>
                <Link href="/about" className="hover:text-[var(--brand)]">
                  About Rajesh Ponnada
                </Link>
              </li>
              <li>
                <Link href="/social" className="hover:text-[var(--brand)]">
                  Instagram and YouTube
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-[var(--brand)]">
                  Contact Office
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="hover:text-[var(--brand)]">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/terms" className="hover:text-[var(--brand)]">
                  Terms of Service
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 4: Direct Contact */}
          <div className="space-y-3">
            <p className="text-sm font-semibold uppercase tracking-wider text-[#FAF7F2]">
              Direct Contact
            </p>
            <p className="text-sm text-[#E7E0D5]">
              {address}
            </p>
            <div className="pt-1 space-y-2">
              <a
                href={`tel:+91${phone}`}
                className="inline-flex items-center gap-2 text-sm text-[#FAF7F2] hover:text-[var(--brand)]"
              >
                <Phone size={20} weight="regular" />
                <span>+91 {phone}</span>
              </a>
              <br />
              <a
                href={whatsappLink}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-sm text-[#FAF7F2] hover:text-[var(--brand)]"
              >
                <WhatsappLogo size={20} weight="regular" />
                <span>Message on WhatsApp</span>
              </a>
            </div>
          </div>
        </div>

        {/* Bottom copyright and legal line */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between text-xs text-[#E7E0D5] gap-4">
          <p className="text-center sm:text-left">&copy; {new Date().getFullYear()} Secure Home Vizag. All rights reserved.</p>
          <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4">
            <Link href="/privacy" className="hover:text-[var(--brand)] underline">
              Privacy Policy
            </Link>
            <span>&bull;</span>
            <Link href="/terms" className="hover:text-[var(--brand)] underline">
              Terms of Service
            </Link>
            <span>&bull;</span>
            <Link href="/admin/login" className="hover:text-[var(--brand)]">
              Admin Login
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
