import React from 'react';
import { Metadata } from 'next';
import Link from 'next/link';
import { InstagramLogo, YoutubeLogo, ArrowUpRight } from '@phosphor-icons/react/dist/ssr';
import { getSettings } from '@/lib/data';
import { getBreadcrumbJsonLd } from '@/lib/jsonld';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.securehomevizag.com';

export const metadata: Metadata = {
  title: 'Social Media & Property Videos | Secure Home Vizag on Instagram & YouTube',
  description:
    'Follow Secure Home Vizag on Instagram and YouTube for real site walk-through videos, drone footage, layout updates, and local real estate insights from Visakhapatnam.',
  alternates: {
    canonical: `${SITE_URL}/social`,
  },
  openGraph: {
    title: 'Secure Home Vizag — Property Videos on Instagram & YouTube',
    description:
      'Watch unedited site walk-throughs, coastal layout drone views, and direct property commentary from Rajesh Ponnada in Visakhapatnam.',
    url: `${SITE_URL}/social`,
    type: 'website',
    images: [{ url: '/brand/og-image.jpg', width: 1200, height: 630 }],
  },
  // Social media discovery pages — index but not high priority
  robots: { index: true, follow: true },
};

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export default async function SocialPage() {
  const settings = await getSettings();

  const breadcrumbJsonLd = getBreadcrumbJsonLd(SITE_URL, [
    { name: 'Home', url: '/' },
    { name: 'Social Media', url: '/social' },
  ]);

  return (
    <div className="fade-in max-w-[1200px] mx-auto px-4 sm:px-6 py-12 md:py-16 space-y-12">
      {/* Breadcrumb Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />

      {/* Breadcrumb Navigation */}
      <nav aria-label="Breadcrumb" className="text-sm text-[var(--text)]">
        <ol className="flex items-center gap-1.5 flex-wrap">
          <li>
            <Link href="/" className="hover:text-[var(--brand)] hover:underline">Home</Link>
          </li>
          <li aria-hidden="true" className="text-[var(--line)]">/</li>
          <li aria-current="page" className="text-[var(--ink)] font-semibold">Social Media</li>
        </ol>
      </nav>

      <div className="max-w-2xl">
        <h1 className="font-heading text-3xl md:text-5xl text-[var(--ink)] mb-3">
          Property Videos &amp; Site Updates
        </h1>
        <p className="text-[var(--text)] text-base md:text-lg leading-relaxed">
          Watch real footage of residential plots, apartment projects, coastal villas, and ongoing layouts across Visakhapatnam. Secure Home Vizag posts direct site walk-throughs — no artificial edits, no scripted pitches.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Instagram Section */}
        <section
          className="p-8 border border-[var(--line)] bg-[var(--surface)] rounded-[4px] flex flex-col justify-between space-y-6"
          aria-labelledby="instagram-heading"
        >
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-[var(--bg)] border border-[var(--line)] rounded-[4px]">
                <InstagramLogo size={32} weight="regular" className="text-[var(--ink)]" aria-hidden="true" />
              </div>
              <div>
                <h2 id="instagram-heading" className="font-heading text-2xl text-[var(--ink)]">Instagram</h2>
                <p className="text-sm font-semibold text-[var(--brand)]">@securehomevizag</p>
              </div>
            </div>
            <p className="text-base text-[var(--text)] leading-relaxed">
              Short reels and photo updates from ongoing layout developments, highway junction progress, coastal frontage views, and property highlights across Visakhapatnam.
            </p>
          </div>

          <div className="pt-4 border-t border-[var(--line)]">
            <a
              href={settings.instagram_url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 w-full py-3.5 px-6 text-base font-semibold text-[var(--surface)] bg-[var(--brand)] hover:bg-[var(--brand-hover)] rounded-[4px] min-h-[44px]"
              aria-label="Follow Secure Home Vizag on Instagram"
            >
              <span>Follow on Instagram</span>
              <ArrowUpRight size={20} weight="regular" />
            </a>
          </div>
        </section>

        {/* YouTube Section */}
        <section
          className="p-8 border border-[var(--line)] bg-[var(--surface)] rounded-[4px] flex flex-col justify-between space-y-6"
          aria-labelledby="youtube-heading"
        >
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-[var(--bg)] border border-[var(--line)] rounded-[4px]">
                <YoutubeLogo size={32} weight="regular" className="text-[var(--ink)]" aria-hidden="true" />
              </div>
              <div>
                <h2 id="youtube-heading" className="font-heading text-2xl text-[var(--ink)]">YouTube</h2>
                <p className="text-sm font-semibold text-[var(--brand)]">@securehomevizag</p>
              </div>
            </div>
            <p className="text-base text-[var(--text)] leading-relaxed">
              Full-length site walk-throughs, approach road analysis, drone footage of layout boundaries, and direct explanations of title documentation and property approvals by Rajesh Ponnada.
            </p>
          </div>

          <div className="pt-4 border-t border-[var(--line)]">
            <a
              href={settings.youtube_url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 w-full py-3.5 px-6 text-base font-semibold text-[var(--surface)] bg-[var(--brand)] hover:bg-[var(--brand-hover)] rounded-[4px] min-h-[44px]"
              aria-label="Subscribe to Secure Home Vizag on YouTube"
            >
              <span>Subscribe on YouTube</span>
              <ArrowUpRight size={20} weight="regular" />
            </a>
          </div>
        </section>
      </div>

      {/* Internal Links */}
      <div className="border-t border-[var(--line)] pt-8 flex flex-wrap gap-6 text-sm">
        <Link href="/listings" className="font-semibold text-[var(--brand)] hover:underline inline-flex items-center gap-1">
          Browse property listings <ArrowUpRight size={16} weight="regular" />
        </Link>
        <Link href="/about" className="font-semibold text-[var(--ink)] hover:text-[var(--brand)] hover:underline inline-flex items-center gap-1">
          About Rajesh Ponnada <ArrowUpRight size={16} weight="regular" />
        </Link>
        <Link href="/contact" className="font-semibold text-[var(--ink)] hover:text-[var(--brand)] hover:underline inline-flex items-center gap-1">
          Contact for property enquiry <ArrowUpRight size={16} weight="regular" />
        </Link>
      </div>
    </div>
  );
}
