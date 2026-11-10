'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { List, X, MapPin, ArrowUpRight } from '@phosphor-icons/react';
import { LeadActionButtons } from './lead-action-buttons';
import { SiteSettings } from '@/lib/types';

interface NavbarProps {
  settings?: SiteSettings;
}

export function Navbar({ settings }: NavbarProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const pathname = usePathname();

  // Close sidebar when pressing ESC
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setSidebarOpen(false);
      }
    };
    if (sidebarOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [sidebarOpen]);

  // Close sidebar on route change
  useEffect(() => {
    setSidebarOpen(false);
  }, [pathname]);

  // Desktop top header links: Exclude Plots, Villas, Flats (they are in the sidebar)
  const desktopTopLinks = [
    { label: 'All Listings', href: '/listings' },
    { label: 'Real Estate Guide', href: '/real-estate-in-vizag' },
    { label: 'About', href: '/about' },
    { label: 'Contact', href: '/contact' },
  ];

  // Property categories shown inside the sidebar
  const propertyCategories = [
    {
      title: 'Plots in Vizag',
      href: '/plots-in-vizag',
      tag: 'VMRDA Approved',
      desc: 'Residential & open gated layouts in prime growth belts',
    },
    {
      title: 'Villas in Vizag',
      href: '/villas-in-vizag',
      tag: 'Luxury & Coastal',
      desc: 'Independent duplexes & gated beach road enclaves',
    },
    {
      title: 'Flats in Vizag',
      href: '/flats-in-vizag',
      tag: 'RERA Approved',
      desc: 'Modern 2 & 3 BHK apartments near IT hubs & city center',
    },
    {
      title: 'Commercial Property',
      href: '/commercial-property-in-vizag',
      tag: 'High Footfall',
      desc: 'Prime highway retail spaces, showrooms & land parcels',
    },
  ];

  // Key corridor micro-market links inside sidebar
  const corridorLinks = [
    { label: 'Plots in Anandapuram', href: '/plots-in-anandapuram' },
    { label: 'Plots in Bheemili', href: '/plots-in-bheemili' },
    { label: 'Plots in Bhogapuram', href: '/plots-in-bhogapuram' },
    { label: 'Plots in Madhurawada', href: '/plots-in-madhurawada' },
    { label: 'Villas in Rushikonda', href: '/villas-in-rushikonda' },
    { label: 'Villas in Bheemili', href: '/villas-in-bheemili' },
    { label: 'Flats in Madhurawada', href: '/flats-in-madhurawada' },
  ];

  return (
    <>
      <header className="sticky top-0 z-40 bg-[var(--bg)] border-b border-[var(--line)]">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 h-18 flex items-center justify-between gap-4">
          {/* Brand Logo */}
          <Link href="/" className="flex items-center gap-2 flex-shrink-0 py-1" aria-label="Secure Home Vizag Home">
            <Image
              src="/brand/logo-header-v2.png"
              alt="Secure Home Vizag"
              width={200}
              height={55}
              priority
              loading="eager"
              className="h-10 sm:h-11 md:h-12 w-auto object-contain"
            />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-6 lg:gap-8" aria-label="Main Navigation">
            {/* Desktop Navigation Links (Plots, Villas, Flats are hidden from here) */}
            {desktopTopLinks.map((link) => {
              const isActive = pathname === link.href || (link.href !== '/' && pathname.startsWith(link.href));
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`group relative py-2 text-sm font-semibold transition-colors duration-200 inline-flex items-center ${
                    isActive
                      ? 'text-[var(--brand)]'
                      : 'text-[var(--ink)] hover:text-[var(--brand)]'
                  }`}
                >
                  <span>{link.label}</span>
                  <span
                    className={`absolute bottom-0 left-0 h-[2.5px] bg-[var(--brand)] rounded-full transition-all duration-300 ease-out ${
                      isActive ? 'w-full' : 'w-0 group-hover:w-full'
                    }`}
                    aria-hidden="true"
                  />
                </Link>
              );
            })}
          </nav>

          {/* Desktop Actions */}
          <div className="hidden md:flex items-center gap-3">
            <LeadActionButtons
              variant="navbar"
              phoneNumber={settings?.phone}
              whatsappNumber={settings?.whatsapp_number}
            />
            {/* Sidebar Hamburger toggle for desktop */}
            <button
              type="button"
              onClick={() => setSidebarOpen(true)}
              className="p-2 text-[var(--ink)] hover:text-[var(--brand)] border border-[var(--line)] bg-[var(--surface)] hover:bg-[var(--line)] rounded-[4px] min-h-[42px] min-w-[42px] flex items-center justify-center transition-colors cursor-pointer"
              aria-label="Open sidebar menu"
              title="Open Property Categories & Corridors"
            >
              <List size={22} weight="bold" />
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button
            type="button"
            onClick={() => setSidebarOpen(true)}
            className="md:hidden p-2 text-[var(--ink)] border border-[var(--line)] bg-[var(--surface)] rounded-[4px] min-h-[44px] min-w-[44px] flex items-center justify-center cursor-pointer"
            aria-label="Open navigation sidebar"
          >
            <List size={24} weight="regular" />
          </button>
        </div>
      </header>

      {/* Slide-out Sidebar Drawer (Works for both Desktop and Mobile) */}
      {sidebarOpen && (
        <div className="fixed inset-0 z-50 flex justify-end">
          {/* Dimmed Backdrop */}
          <div
            className="fixed inset-0 bg-black/60 backdrop-blur-xs transition-opacity duration-300"
            onClick={() => setSidebarOpen(false)}
            aria-hidden="true"
          />

          {/* Sidebar Panel */}
          <aside
            className="relative w-full max-w-md bg-[var(--surface)] h-full shadow-2xl flex flex-col z-10 border-l border-[var(--line)] overflow-hidden animate-in slide-in-from-right duration-300"
            role="dialog"
            aria-modal="true"
            aria-label="Property Categories & Corridors Sidebar"
          >
            {/* Sidebar Header */}
            <div className="p-4 sm:p-5 border-b border-[var(--line)] flex items-center justify-between bg-[var(--bg)]">
              <div>
                <p className="text-xs uppercase font-bold tracking-wider text-[var(--brand)]">
                  Explore Vizag Real Estate
                </p>
                <h2 className="font-heading text-lg font-semibold text-[var(--ink)]">
                  Property Categories &amp; Areas
                </h2>
              </div>
              <button
                type="button"
                onClick={() => setSidebarOpen(false)}
                className="p-2 text-[var(--ink)] hover:text-[var(--brand)] bg-[var(--surface)] border border-[var(--line)] rounded-[4px] min-h-[40px] min-w-[40px] flex items-center justify-center transition-colors cursor-pointer"
                aria-label="Close sidebar"
              >
                <X size={20} weight="bold" />
              </button>
            </div>

            {/* Scrollable Content */}
            <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-6">
              {/* Primary Property Types Section */}
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs uppercase font-bold tracking-wider text-[var(--text)]">
                    Property Categories
                  </span>
                  <span className="text-[11px] font-semibold text-[var(--success)] bg-[#eaf4ef] border border-[#bcdbc9] px-2 py-0.5 rounded">
                    100% Title Verified
                  </span>
                </div>

                <div className="space-y-2">
                  {propertyCategories.map((cat) => {
                    const isActive = pathname === cat.href;
                    return (
                      <Link
                        key={cat.href}
                        href={cat.href}
                        onClick={() => setSidebarOpen(false)}
                        className={`block p-3.5 rounded-[4px] border transition-all duration-200 ${
                          isActive
                            ? 'bg-[#f4ebe6] border-[var(--brand)] text-[var(--brand)]'
                            : 'bg-[var(--bg)] border-[var(--line)] hover:border-[var(--brand)] hover:bg-[#fbf7f4]'
                        }`}
                      >
                        <div className="flex items-center justify-between mb-1">
                          <span className="font-heading font-semibold text-base text-[var(--ink)]">
                            {cat.title}
                          </span>
                          <span className="text-[11px] font-semibold text-[var(--brand)] bg-[var(--surface)] border border-[var(--line)] px-2 py-0.5 rounded">
                            {cat.tag}
                          </span>
                        </div>
                        <p className="text-xs text-[var(--text)] leading-relaxed">
                          {cat.desc}
                        </p>
                      </Link>
                    );
                  })}
                </div>
              </div>

              {/* Key Corridors & Micro-Markets */}
              <div className="pt-2 border-t border-[var(--line)]">
                <span className="text-xs uppercase font-bold tracking-wider text-[var(--text)] block mb-3">
                  Popular Micro-Markets &amp; Corridors
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {corridorLinks.map((link) => {
                    const isActive = pathname === link.href;
                    return (
                      <Link
                        key={link.href}
                        href={link.href}
                        onClick={() => setSidebarOpen(false)}
                        className={`flex items-center justify-between px-3 py-2 text-xs font-semibold rounded-[4px] border transition-colors ${
                          isActive
                            ? 'bg-[var(--brand)] text-[var(--surface)] border-[var(--brand)]'
                            : 'bg-[var(--bg)] text-[var(--ink)] border-[var(--line)] hover:border-[var(--brand)] hover:text-[var(--brand)]'
                        }`}
                      >
                        <span className="truncate">{link.label}</span>
                        <svg className="w-3.5 h-3.5 flex-shrink-0 ml-1 opacity-70" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M9 5l7 7-7 7" />
                        </svg>
                      </Link>
                    );
                  })}
                </div>
              </div>

              {/* General Site Links */}
              <div className="pt-2 border-t border-[var(--line)]">
                <span className="text-xs uppercase font-bold tracking-wider text-[var(--text)] block mb-3">
                  Quick Navigation
                </span>
                <div className="space-y-1">
                  {desktopTopLinks.map((link) => {
                    const isActive = pathname === link.href;
                    return (
                      <Link
                        key={link.href}
                        href={link.href}
                        onClick={() => setSidebarOpen(false)}
                        className={`flex items-center justify-between px-3 py-2 text-sm font-semibold rounded-[4px] transition-colors ${
                          isActive
                            ? 'text-[var(--brand)] bg-[var(--bg)]'
                            : 'text-[var(--ink)] hover:text-[var(--brand)] hover:bg-[var(--bg)]'
                        }`}
                      >
                        <span>{link.label}</span>
                        <ArrowUpRight size={16} className="opacity-60" />
                      </Link>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Sidebar Footer Contact CTAs */}
            <div className="p-4 sm:p-5 border-t border-[var(--line)] bg-[var(--bg)] space-y-3">
              <div className="flex items-center gap-2 text-xs text-[var(--text)]">
                <MapPin size={16} weight="fill" className="text-[var(--brand)] flex-shrink-0" />
                <span>Direct Advisory with Rajesh Ponnada • Visakhapatnam</span>
              </div>
              <LeadActionButtons
                variant="navbar"
                phoneNumber={settings?.phone}
                whatsappNumber={settings?.whatsapp_number}
                className="w-full justify-between"
              />
            </div>
          </aside>
        </div>
      )}
    </>
  );
}
