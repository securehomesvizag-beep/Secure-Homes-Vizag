'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ChartLine, Users, HouseLine, ChatText, Gear, SignOut } from '@phosphor-icons/react';
import { createClient } from '@/lib/supabase/client';

export function AdminNav() {
  const pathname = usePathname();

  const handleSignOut = async () => {
    try {
      const supabase = createClient();
      await supabase.auth.signOut();
    } catch {
      // Ignored
    }
    window.location.href = '/admin/login';
  };

  const navItems = [
    { label: 'Dashboard', href: '/admin', icon: ChartLine },
    { label: 'Leads', href: '/admin/leads', icon: Users },
    { label: 'Listings', href: '/admin/listings', icon: HouseLine },
    { label: 'Testimonials', href: '/admin/testimonials', icon: ChatText },
    { label: 'Settings', href: '/admin/settings', icon: Gear },
  ];

  return (
    <nav className="flex flex-wrap items-center justify-between gap-2 p-3 bg-[var(--surface)] border border-[var(--line)] rounded-[4px] mb-8">
      <div className="flex flex-wrap items-center gap-1.5">
        {navItems.map((item) => {
          const isActive = pathname === item.href;
          const Icon = item.icon;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`inline-flex items-center gap-1.5 px-3.5 py-2 text-sm font-semibold rounded-[4px] min-h-[44px] border ${
                isActive
                  ? 'bg-[var(--brand)] text-[var(--surface)] border-[var(--brand)]'
                  : 'bg-[var(--surface)] text-[var(--ink)] border-[var(--line)] hover:border-[var(--brand)]'
              }`}
            >
              <Icon size={18} weight="regular" />
              <span>{item.label}</span>
            </Link>
          );
        })}
      </div>

      <div className="flex items-center gap-2">
        <Link
          href="/"
          target="_blank"
          className="text-xs text-[var(--ink)] hover:text-[var(--brand)] underline px-2 py-1"
        >
          View Public Site
        </Link>
        <button
          type="button"
          onClick={handleSignOut}
          className="inline-flex items-center gap-1 px-3 py-2 text-xs font-semibold text-[var(--ink)] bg-[var(--bg)] border border-[var(--line)] rounded-[4px] hover:border-[var(--danger)] min-h-[44px]"
          aria-label="Sign out"
        >
          <SignOut size={16} weight="regular" />
          <span>Logout</span>
        </button>
      </div>
    </nav>
  );
}
