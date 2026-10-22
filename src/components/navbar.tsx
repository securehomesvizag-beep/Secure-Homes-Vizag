'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { List, X } from '@phosphor-icons/react';
import { LeadActionButtons } from './lead-action-buttons';

export function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  const links = [
    { label: 'Home', href: '/' },
    { label: 'Listings', href: '/listings' },
    { label: 'About', href: '/about' },
    { label: 'Social', href: '/social' },
    { label: 'Contact', href: '/contact' },
  ];

  return (
    <header className="sticky top-0 z-40 bg-[var(--bg)] border-b border-[var(--line)]">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 h-18 flex items-center justify-between">
        {/* Brand Logo */}
        <Link href="/" className="flex items-center gap-2" aria-label="Secure Home Vizag Home">
          <Image
            src="/brand/logo.svg"
            alt="Secure Home Vizag"
            width={180}
            height={45}
            priority
            className="h-10 sm:h-11 w-auto"
          />
        </Link>

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex items-center gap-6" aria-label="Main Navigation">
          {links.map((link) => {
            const isActive = pathname === link.href || (link.href !== '/' && pathname.startsWith(link.href));
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`text-sm font-semibold transition-colors ${
                  isActive
                    ? 'text-[var(--brand)]'
                    : 'text-[var(--ink)] hover:text-[var(--brand)]'
                }`}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        {/* Desktop Actions */}
        <div className="hidden md:flex items-center gap-3">
          <LeadActionButtons variant="navbar" />
        </div>

        {/* Mobile Menu Toggle Button */}
        <button
          type="button"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden p-2 text-[var(--ink)] border border-[var(--line)] bg-[var(--surface)] rounded-[4px] min-h-[44px] min-w-[44px] flex items-center justify-center"
          aria-label={mobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
          aria-expanded={mobileMenuOpen}
        >
          {mobileMenuOpen ? <X size={24} weight="regular" /> : <List size={24} weight="regular" />}
        </button>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[var(--surface)] border-b border-[var(--line)] px-4 py-4 space-y-3">
          <nav className="flex flex-col space-y-2" aria-label="Mobile Navigation">
            {links.map((link) => {
              const isActive = pathname === link.href || (link.href !== '/' && pathname.startsWith(link.href));
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`px-3 py-2 text-base font-semibold rounded-[4px] min-h-[44px] flex items-center ${
                    isActive
                      ? 'bg-[var(--line)] text-[var(--brand)]'
                      : 'text-[var(--ink)] hover:bg-[var(--line)]'
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>
          <div className="pt-2 border-t border-[var(--line)]">
            <LeadActionButtons variant="navbar" className="w-full justify-between" />
          </div>
        </div>
      )}
    </header>
  );
}
