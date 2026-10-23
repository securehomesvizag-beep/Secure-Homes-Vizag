'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { SiteSettings } from '@/lib/types';
import {
  InstagramLogo,
  YoutubeLogo,
  ArrowUpRight,
  WhatsappLogo,
} from '@phosphor-icons/react';

interface SocialVideoSectionProps {
  settings: SiteSettings;
}

// Curated list of popular site tour shorts to let visitors explore multiple properties
const FEATURED_SHORTS = [
  {
    id: 'MROPRKsjd-Q',
    title: 'Featured Property Tour Short',
    category: 'Latest Short',
    location: 'Visakhapatnam Corridors',
  },
  {
    id: 'f7o9y0uP0pA',
    title: 'VMRDA Approved Plots Inspection',
    category: 'Site Inspection',
    location: 'Anandapuram Junction',
  },
  {
    id: 'Wv-K6XjH8C8',
    title: 'Luxury 3 BHK Flat Tour',
    category: 'Apartment Tour',
    location: 'Madhurawada',
  },
];

export function SocialVideoSection({ settings }: SocialVideoSectionProps) {
  const defaultShortId = settings.youtube_short_id || 'MROPRKsjd-Q';
  const [activeVideoId, setActiveVideoId] = useState<string>(defaultShortId);

  // Fallback to activeVideoId if settings updated
  const currentEmbedId = activeVideoId || defaultShortId;
  const embedUrl = `https://www.youtube-nocookie.com/embed/${currentEmbedId}?autoplay=1&mute=1&loop=1&playlist=${currentEmbedId}&controls=1&modestbranding=1&rel=0&playsinline=1`;

  const youtubeChannelUrl = settings.youtube_url || 'https://youtube.com/@securehomevizag';
  const instagramChannelUrl = settings.instagram_url || 'https://www.instagram.com/securehomevizag';
  const whatsappUrl = `https://wa.me/91${settings.whatsapp_number || settings.phone || '8019928236'}?text=${encodeURIComponent(
    'Hello Rajesh garu, I saw your YouTube shorts and website. Could you please share a video walkthrough of available properties in Visakhapatnam?'
  )}`;

  return (
    <section className="py-16 md:py-24 border-b border-[var(--line)] bg-[var(--surface)]">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <div className="max-w-2xl mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#fee2e2] text-[#b91c1c] text-xs font-bold uppercase tracking-wider mb-3">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-red-600"></span>
            </span>
            Live Video Showcase & Shorts
          </div>
          <h2 className="font-heading text-3xl md:text-4xl text-[var(--ink)] mb-3">
            Watch On-Ground Property Tours
          </h2>
          <p className="text-[var(--text)] text-base md:text-lg leading-relaxed">
            Experience real-time site inspections, aerial drone views, road connectivity, and neighborhood development straight from our official YouTube handle.
          </p>
        </div>

        {/* Main Grid: Video Player + Social Channels */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Live YouTube Embed Container (7 cols) */}
          <div className="lg:col-span-7 space-y-4">
            <div className="bg-[var(--ink)] text-[#FAF7F2] rounded-[8px] overflow-hidden border border-[#233355] shadow-xl">
              {/* Top Bar simulating a sleek media player header */}
              <div className="px-4 py-3 bg-[#0d1629] flex items-center justify-between border-b border-[#233355]">
                <div className="flex items-center gap-2.5">
                  <div className="w-7 h-7 rounded-full bg-[#FF0000] flex items-center justify-center text-white">
                    <YoutubeLogo size={16} weight="fill" />
                  </div>
                  <div>
                    <span className="font-semibold text-xs text-white block leading-tight">
                      Secure Home Vizag
                    </span>
                    <span className="text-[10px] text-[#A2A9B8]">
                      @securehomevizag &bull; Official Handle
                    </span>
                  </div>
                </div>

                <a
                  href={`https://youtube.com/shorts/${currentEmbedId}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 px-2.5 py-1 rounded bg-[#233355] hover:bg-[#32456f] text-white text-xs font-medium transition-colors"
                >
                  <span>Open Short</span>
                  <ArrowUpRight size={13} weight="bold" />
                </a>
              </div>

              {/* Embedded Video Iframe with autoplay and 9:16 or cinematic responsive aspect */}
              <div className="relative w-full aspect-[9/16] sm:aspect-[16/10] max-h-[580px] bg-black">
                <iframe
                  src={embedUrl}
                  title="Secure Home Vizag Property Tour Short"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                  className="absolute inset-0 w-full h-full border-0"
                />
              </div>

              {/* Bottom Info & Audio Hint Bar */}
              <div className="p-4 bg-[#111c34] flex flex-wrap items-center justify-between gap-3 text-xs text-[#A2A9B8] border-t border-[#233355]">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-[#10b981]" />
                  <span className="text-white font-medium">Auto-playing Live Preview</span>
                  <span className="hidden sm:inline">&bull; Sound muted for preview</span>
                </div>
                <a
                  href={youtubeChannelUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#f87171] hover:text-[#fca5a5] font-semibold underline flex items-center gap-1"
                >
                  <span>View All Shorts on YouTube</span>
                  <ArrowUpRight size={14} weight="bold" />
                </a>
              </div>
            </div>

            {/* Quick Property Tour Shorts Switcher */}
            <div className="bg-[var(--bg)] p-3.5 border border-[var(--line)] rounded-[6px]">
              <div className="text-xs font-semibold text-[var(--ink)] mb-2 flex items-center gap-1.5">
                <svg className="w-3.5 h-3.5 text-[var(--brand)] fill-current" viewBox="0 0 24 24">
                  <path d="M8 5v14l11-7z" />
                </svg>
                <span>Select a video tour to preview:</span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                {FEATURED_SHORTS.map((short) => {
                  const isActive = currentEmbedId === short.id;
                  return (
                    <button
                      key={short.id}
                      type="button"
                      onClick={() => setActiveVideoId(short.id)}
                      className={`text-left p-2.5 rounded-[4px] border transition-all text-xs ${
                        isActive
                          ? 'border-[var(--brand)] bg-[var(--surface)] shadow-sm'
                          : 'border-[var(--line)] bg-[var(--surface)] hover:border-[var(--ink)]'
                      }`}
                    >
                      <span className="block font-semibold text-[var(--ink)] truncate">
                        {short.title}
                      </span>
                      <span className="block text-[11px] text-[var(--muted)] truncate">
                        {short.location}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Right Column: Channels Showcase & WhatsApp Tour Request (5 cols) */}
          <div className="lg:col-span-5 space-y-4">
            {/* YouTube Card */}
            <div className="p-6 border border-[var(--line)] bg-[var(--bg)] rounded-[8px] space-y-4 hover:border-[#FF0000]/50 transition-colors">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-[8px] bg-[#FF0000] text-white flex items-center justify-center shadow-md">
                    <YoutubeLogo size={30} weight="fill" />
                  </div>
                  <div>
                    <h3 className="font-heading text-lg font-bold text-[var(--ink)]">
                      YouTube Channel
                    </h3>
                    <p className="text-xs text-[var(--text)] font-medium">
                      @securehomevizag
                    </p>
                  </div>
                </div>
                <span className="px-2.5 py-1 text-[11px] font-bold uppercase rounded bg-[#fee2e2] text-[#b91c1c]">
                  Official
                </span>
              </div>

              <p className="text-sm text-[var(--text)] leading-relaxed">
                Watch full 4K drone layouts, road width measurements, and direct ground surveys of residential plots and luxury apartments in Visakhapatnam.
              </p>

              <div className="space-y-1.5 pt-1 text-xs text-[var(--ink)] font-medium">
                <div className="flex items-center gap-2">
                  <svg className="w-3.5 h-3.5 text-[#2F6B4F] flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span>Uncut property walkthrough videos</span>
                </div>
                <div className="flex items-center gap-2">
                  <svg className="w-3.5 h-3.5 text-[#2F6B4F] flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span>VMRDA approval and title guidance by Rajesh Ponnada</span>
                </div>
                <div className="flex items-center gap-2">
                  <svg className="w-3.5 h-3.5 text-[#2F6B4F] flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span>High-frequency shorts covering new layout launches</span>
                </div>
              </div>

              <div className="pt-2">
                <a
                  href={youtubeChannelUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 w-full py-3 px-4 rounded-[4px] bg-[#FF0000] hover:bg-[#CC0000] text-white font-semibold text-sm transition-colors shadow-sm"
                >
                  <YoutubeLogo size={20} weight="fill" />
                  <span>Subscribe & Watch On YouTube</span>
                  <ArrowUpRight size={16} weight="bold" />
                </a>
              </div>
            </div>

            {/* Instagram Card */}
            <div className="p-6 border border-[var(--line)] bg-[var(--bg)] rounded-[8px] space-y-4 hover:border-[#E1306C]/50 transition-colors">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-[8px] bg-gradient-to-tr from-[#f09433] via-[#dc2743] to-[#bc1888] text-white flex items-center justify-center shadow-md">
                    <InstagramLogo size={30} weight="bold" />
                  </div>
                  <div>
                    <h3 className="font-heading text-lg font-bold text-[var(--ink)]">
                      Instagram Handle
                    </h3>
                    <p className="text-xs text-[var(--text)] font-medium">
                      @securehomevizag
                    </p>
                  </div>
                </div>
                <span className="px-2.5 py-1 text-[11px] font-bold uppercase rounded bg-[#fce7f3] text-[#9d174d]">
                  Stories
                </span>
              </div>

              <p className="text-sm text-[var(--text)] leading-relaxed">
                Daily ground stories, immediate new plot drop alerts, and customer key handover moments across Vizag.
              </p>

              <div className="pt-2">
                <a
                  href={instagramChannelUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 w-full py-3 px-4 rounded-[4px] bg-gradient-to-r from-[#833ab4] via-[#fd1d1d] to-[#fcb045] hover:opacity-95 text-white font-semibold text-sm transition-opacity shadow-sm"
                >
                  <InstagramLogo size={20} weight="bold" />
                  <span>Follow on Instagram</span>
                  <ArrowUpRight size={16} weight="bold" />
                </a>
              </div>
            </div>

            {/* Direct Video Request Strip */}
            <div className="p-4 border border-[#bcdbc9] bg-[#eaf4ef] rounded-[6px] flex items-center justify-between gap-3">
              <div>
                <p className="text-xs font-bold text-[#1e5138]">
                  Want a custom video of a specific plot?
                </p>
                <p className="text-[11px] text-[#2b6848]">
                  WhatsApp Rajesh Ponnada for an on-demand video inspection.
                </p>
              </div>
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-3 py-2 rounded-[4px] bg-[#25D366] hover:bg-[#1fb855] text-white font-bold text-xs flex-shrink-0 shadow-sm transition-colors"
              >
                <WhatsappLogo size={16} weight="fill" />
                <span>WhatsApp</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
