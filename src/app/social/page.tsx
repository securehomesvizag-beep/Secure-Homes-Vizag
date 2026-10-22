import React from 'react';
import { Metadata } from 'next';
import { InstagramLogo, YoutubeLogo, ArrowUpRight } from '@phosphor-icons/react/dist/ssr';
import { getSettings } from '@/lib/data';

export const metadata: Metadata = {
  title: 'Social Channels | Secure Home Vizag',
  description:
    'Follow Secure Home Vizag on Instagram and YouTube for walk-through videos, site updates, and local real estate news in Visakhapatnam.',
};

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export default async function SocialPage() {
  const settings = await getSettings();

  return (
    <div className="fade-in max-w-[1200px] mx-auto px-4 sm:px-6 py-12 md:py-16 space-y-12">
      <div className="max-w-2xl">
        <h1 className="font-heading text-3xl md:text-5xl text-[var(--ink)] mb-3">
          Follow Our Video & Site Updates
        </h1>
        <p className="text-[var(--text)] text-base md:text-lg leading-relaxed">
          Watch real footage of residential plots, upcoming apartment projects, and coastal layouts across Visakhapatnam. We post direct site walk-throughs without artificial edits.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Instagram Section */}
        <section className="p-8 border border-[var(--line)] bg-[var(--surface)] rounded-[4px] flex flex-col justify-between space-y-6">
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-[var(--bg)] border border-[var(--line)] rounded-[4px]">
                <InstagramLogo size={32} weight="regular" className="text-[var(--ink)]" />
              </div>
              <div>
                <h2 className="font-heading text-2xl text-[var(--ink)]">Instagram</h2>
                <p className="text-sm font-semibold text-[var(--brand)]">@securehomevizag</p>
              </div>
            </div>
            <p className="text-base text-[var(--text)] leading-relaxed">
              Short reels, photo updates from ongoing layout developments, highway junction progress, and location snapshots in Visakhapatnam.
            </p>
          </div>

          <div className="pt-4 border-t border-[var(--line)]">
            <a
              href={settings.instagram_url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 w-full py-3.5 px-6 text-base font-semibold text-[var(--surface)] bg-[var(--brand)] hover:bg-[var(--brand-hover)] rounded-[4px] min-h-[44px]"
            >
              <span>Open Instagram</span>
              <ArrowUpRight size={20} weight="regular" />
            </a>
          </div>
        </section>

        {/* YouTube Section */}
        <section className="p-8 border border-[var(--line)] bg-[var(--surface)] rounded-[4px] flex flex-col justify-between space-y-6">
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-[var(--bg)] border border-[var(--line)] rounded-[4px]">
                <YoutubeLogo size={32} weight="regular" className="text-[var(--ink)]" />
              </div>
              <div>
                <h2 className="font-heading text-2xl text-[var(--ink)]">YouTube</h2>
                <p className="text-sm font-semibold text-[var(--brand)]">@securehomevizag</p>
              </div>
            </div>
            <p className="text-base text-[var(--text)] leading-relaxed">
              Full-length site walk-throughs, approach road analysis, drone layout boundaries, and direct explanations of title documentation by Rajesh Ponnada.
            </p>
          </div>

          <div className="pt-4 border-t border-[var(--line)]">
            <a
              href={settings.youtube_url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 w-full py-3.5 px-6 text-base font-semibold text-[var(--surface)] bg-[var(--brand)] hover:bg-[var(--brand-hover)] rounded-[4px] min-h-[44px]"
            >
              <span>Open YouTube</span>
              <ArrowUpRight size={20} weight="regular" />
            </a>
          </div>
        </section>
      </div>
    </div>
  );
}
