'use client';

import React, { useState } from 'react';
import { SiteSettings } from '@/lib/types';

interface SettingsFormProps {
  initialSettings: SiteSettings;
}

export function SettingsForm({ initialSettings }: SettingsFormProps) {
  const [phone, setPhone] = useState(initialSettings.phone || '8019928236');
  const [whatsappNumber, setWhatsappNumber] = useState(initialSettings.whatsapp_number || '8019928236');
  const [instagramUrl, setInstagramUrl] = useState(initialSettings.instagram_url || 'https://www.instagram.com/securehomevizag');
  const [youtubeUrl, setYoutubeUrl] = useState(initialSettings.youtube_url || 'https://youtube.com/@securehomevizag');
  const [heroHeading, setHeroHeading] = useState(initialSettings.hero_heading || 'Verified plots, flats and villas in Visakhapatnam');
  const [heroSubheading, setHeroSubheading] = useState(initialSettings.hero_subheading || 'Direct guidance with verified title records, transparent documentation, and no hidden charges.');
  const [officeAddress, setOfficeAddress] = useState(initialSettings.office_address || '');
  const [workingHours, setWorkingHours] = useState(initialSettings.working_hours || 'Monday to Saturday: 9:00 AM to 7:00 PM');
  const [plotsDescription, setPlotsDescription] = useState(
    initialSettings.plots_description || 'Clear title VMRDA & approved residential plots in high-growth corridors like Anandapuram, Bheemili & Madhurawada.'
  );
  const [flatsDescription, setFlatsDescription] = useState(
    initialSettings.flats_description || 'Ready-to-move and under-construction 2 & 3 BHK luxury apartments with approved plans and quality amenities.'
  );
  const [villasDescription, setVillasDescription] = useState(
    initialSettings.villas_description || 'Independent duplex houses and premium gated community coastal villas with private road access and modern infrastructure.'
  );
  const [commercialDescription, setCommercialDescription] = useState(
    initialSettings.commercial_description || 'High-visibility retail shops, prime highway commercial plots, and office spaces with direct road access.'
  );
  const [youtubeShortId, setYoutubeShortId] = useState(
    initialSettings.youtube_short_id || 'MROPRKsjd-Q'
  );

  const [saving, setSaving] = useState(false);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setSuccessMsg(null);
    setErrorMsg(null);

    try {
      // Helper to extract clean youtube ID if user pasted full URL
      let cleanVideoId = youtubeShortId.trim();
      const shortsMatch = cleanVideoId.match(/\/shorts\/([a-zA-Z0-9_-]+)/);
      const watchMatch = cleanVideoId.match(/[?&]v=([a-zA-Z0-9_-]+)/);
      const beMatch = cleanVideoId.match(/youtu\.be\/([a-zA-Z0-9_-]+)/);
      if (shortsMatch) cleanVideoId = shortsMatch[1];
      else if (watchMatch) cleanVideoId = watchMatch[1];
      else if (beMatch) cleanVideoId = beMatch[1];

      const res = await fetch('/api/admin/settings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          phone,
          whatsapp_number: whatsappNumber,
          whatsapp_link: `https://wa.me/91${whatsappNumber}`,
          instagram_url: instagramUrl,
          youtube_url: youtubeUrl,
          youtube_short_id: cleanVideoId,
          hero_heading: heroHeading,
          hero_subheading: heroSubheading,
          office_address: officeAddress,
          working_hours: workingHours,
          plots_description: plotsDescription,
          flats_description: flatsDescription,
          villas_description: villasDescription,
          commercial_description: commercialDescription,
        }),
      });

      if (!res.ok) {
        throw new Error('Failed to update settings');
      }

      setSuccessMsg('Settings saved successfully.');
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Error saving settings';
      setErrorMsg(msg);
    } finally {
      setSaving(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-2xl space-y-6">
      {successMsg && (
        <div className="p-3 text-sm text-[var(--success)] border border-[#bcdbc9] bg-[#eaf4ef] rounded-[4px]">
          {successMsg}
        </div>
      )}

      {errorMsg && (
        <div className="p-3 text-sm text-[var(--danger)] border border-[var(--danger)] bg-[var(--surface)] rounded-[4px]">
          {errorMsg}
        </div>
      )}

      {/* Phone Number */}
      <div>
        <label htmlFor="setting-phone" className="block text-sm font-semibold text-[var(--ink)] mb-1">
          Direct Phone Number (10 digits) *
        </label>
        <div className="flex items-center">
          <span className="px-3 py-2.5 bg-[var(--line)] text-[var(--ink)] text-sm border border-r-0 border-[var(--line)] rounded-l-[4px] min-h-[44px] flex items-center">
            +91
          </span>
          <input
            id="setting-phone"
            type="text"
            required
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="w-full px-3.5 py-2.5 text-base bg-[var(--surface)] border border-[var(--line)] rounded-r-[4px] text-[var(--ink)] min-h-[44px]"
          />
        </div>
      </div>

      {/* WhatsApp Number */}
      <div>
        <label htmlFor="setting-whatsapp" className="block text-sm font-semibold text-[var(--ink)] mb-1">
          WhatsApp Number (10 digits) *
        </label>
        <div className="flex items-center">
          <span className="px-3 py-2.5 bg-[var(--line)] text-[var(--ink)] text-sm border border-r-0 border-[var(--line)] rounded-l-[4px] min-h-[44px] flex items-center">
            +91
          </span>
          <input
            id="setting-whatsapp"
            type="text"
            required
            value={whatsappNumber}
            onChange={(e) => setWhatsappNumber(e.target.value)}
            className="w-full px-3.5 py-2.5 text-base bg-[var(--surface)] border border-[var(--line)] rounded-r-[4px] text-[var(--ink)] min-h-[44px]"
          />
        </div>
      </div>

      {/* Instagram URL */}
      <div>
        <label htmlFor="setting-instagram" className="block text-sm font-semibold text-[var(--ink)] mb-1">
          Instagram Channel URL *
        </label>
        <input
          id="setting-instagram"
          type="url"
          required
          value={instagramUrl}
          onChange={(e) => setInstagramUrl(e.target.value)}
          className="w-full px-3.5 py-2.5 text-base bg-[var(--surface)] border border-[var(--line)] rounded-[4px] text-[var(--ink)] min-h-[44px]"
        />
      </div>

      {/* YouTube URL */}
      <div>
        <label htmlFor="setting-youtube" className="block text-sm font-semibold text-[var(--ink)] mb-1">
          YouTube Channel URL *
        </label>
        <input
          id="setting-youtube"
          type="url"
          required
          value={youtubeUrl}
          onChange={(e) => setYoutubeUrl(e.target.value)}
          className="w-full px-3.5 py-2.5 text-base bg-[var(--surface)] border border-[var(--line)] rounded-[4px] text-[var(--ink)] min-h-[44px]"
        />
      </div>

      {/* Featured YouTube Short / Video Embed */}
      <div>
        <label htmlFor="setting-youtube-short" className="block text-sm font-semibold text-[var(--ink)] mb-1">
          Featured YouTube Short or Video (ID or Full URL)
        </label>
        <p className="text-xs text-[var(--muted)] mb-1.5">
          Paste a YouTube Shorts link (e.g. https://youtube.com/shorts/VIDEO_ID), watch link, or just the video ID. This will automatically play live in the home screen social media section.
        </p>
        <input
          id="setting-youtube-short"
          type="text"
          value={youtubeShortId}
          onChange={(e) => setYoutubeShortId(e.target.value)}
          placeholder="e.g. QO6Q7W0nO3Y or https://youtube.com/shorts/..."
          className="w-full px-3.5 py-2.5 text-base bg-[var(--surface)] border border-[var(--line)] rounded-[4px] text-[var(--ink)] min-h-[44px]"
        />
      </div>

      {/* Hero Headline */}
      <div>
        <label htmlFor="setting-hero-heading" className="block text-sm font-semibold text-[var(--ink)] mb-1">
          Hero Headline *
        </label>
        <input
          id="setting-hero-heading"
          type="text"
          required
          value={heroHeading}
          onChange={(e) => setHeroHeading(e.target.value)}
          className="w-full px-3.5 py-2.5 text-base bg-[var(--surface)] border border-[var(--line)] rounded-[4px] text-[var(--ink)] min-h-[44px]"
        />
      </div>

      {/* Hero Subheading */}
      <div>
        <label htmlFor="setting-hero-subheading" className="block text-sm font-semibold text-[var(--ink)] mb-1">
          Hero Supporting Text *
        </label>
        <textarea
          id="setting-hero-subheading"
          rows={2}
          required
          value={heroSubheading}
          onChange={(e) => setHeroSubheading(e.target.value)}
          className="w-full px-3.5 py-2.5 text-base bg-[var(--surface)] border border-[var(--line)] rounded-[4px] text-[var(--ink)] resize-none"
        />
      </div>

      {/* Office Physical Address (placeholder) */}
      <div>
        <label htmlFor="setting-office-address" className="block text-sm font-semibold text-[var(--ink)] mb-1">
          Physical Office Address (Visakhapatnam)
        </label>
        <textarea
          id="setting-office-address"
          rows={2}
          value={officeAddress}
          onChange={(e) => setOfficeAddress(e.target.value)}
          placeholder="e.g. Dwaraka Nagar, Visakhapatnam 530016"
          className="w-full px-3.5 py-2.5 text-base bg-[var(--surface)] border border-[var(--line)] rounded-[4px] text-[var(--ink)] resize-none"
        />
      </div>

      {/* Working Hours */}
      <div>
        <label htmlFor="setting-working-hours" className="block text-sm font-semibold text-[var(--ink)] mb-1">
          Working Hours *
        </label>
        <input
          id="setting-working-hours"
          type="text"
          required
          value={workingHours}
          onChange={(e) => setWorkingHours(e.target.value)}
          className="w-full px-3.5 py-2.5 text-base bg-[var(--surface)] border border-[var(--line)] rounded-[4px] text-[var(--ink)] min-h-[44px]"
        />
      </div>

      {/* Property Category Short Descriptions (Home Screen) */}
      <div className="pt-4 border-t border-[var(--line)] space-y-4">
        <div>
          <h3 className="text-base font-bold text-[var(--ink)]">Property Category Short Descriptions (Home Screen)</h3>
          <p className="text-xs text-[var(--muted)] mt-0.5">
            These descriptions appear directly beneath each property card on the home screen property section.
          </p>
        </div>

        <div>
          <label htmlFor="setting-plots-desc" className="block text-sm font-semibold text-[var(--ink)] mb-1">
            Plots & Land Short Description
          </label>
          <textarea
            id="setting-plots-desc"
            rows={2}
            value={plotsDescription}
            onChange={(e) => setPlotsDescription(e.target.value)}
            className="w-full px-3.5 py-2.5 text-base bg-[var(--surface)] border border-[var(--line)] rounded-[4px] text-[var(--ink)] resize-none"
            placeholder="e.g. Clear title VMRDA & approved residential plots in high-growth corridors..."
          />
        </div>

        <div>
          <label htmlFor="setting-flats-desc" className="block text-sm font-semibold text-[var(--ink)] mb-1">
            Flats & Apartments Short Description
          </label>
          <textarea
            id="setting-flats-desc"
            rows={2}
            value={flatsDescription}
            onChange={(e) => setFlatsDescription(e.target.value)}
            className="w-full px-3.5 py-2.5 text-base bg-[var(--surface)] border border-[var(--line)] rounded-[4px] text-[var(--ink)] resize-none"
            placeholder="e.g. Ready-to-move and under-construction 2 & 3 BHK luxury apartments..."
          />
        </div>

        <div>
          <label htmlFor="setting-villas-desc" className="block text-sm font-semibold text-[var(--ink)] mb-1">
            Villas & Houses Short Description
          </label>
          <textarea
            id="setting-villas-desc"
            rows={2}
            value={villasDescription}
            onChange={(e) => setVillasDescription(e.target.value)}
            className="w-full px-3.5 py-2.5 text-base bg-[var(--surface)] border border-[var(--line)] rounded-[4px] text-[var(--ink)] resize-none"
            placeholder="e.g. Independent duplex houses and premium gated community coastal villas..."
          />
        </div>

        <div>
          <label htmlFor="setting-commercial-desc" className="block text-sm font-semibold text-[var(--ink)] mb-1">
            Commercial Properties Short Description
          </label>
          <textarea
            id="setting-commercial-desc"
            rows={2}
            value={commercialDescription}
            onChange={(e) => setCommercialDescription(e.target.value)}
            className="w-full px-3.5 py-2.5 text-base bg-[var(--surface)] border border-[var(--line)] rounded-[4px] text-[var(--ink)] resize-none"
            placeholder="e.g. High-visibility retail shops, prime highway commercial plots, and office spaces..."
          />
        </div>
      </div>

      <div className="pt-2">
        <button
          type="submit"
          disabled={saving}
          className="w-full py-3.5 px-4 text-base font-semibold text-[var(--surface)] bg-[var(--brand)] hover:bg-[var(--brand-hover)] rounded-[4px] disabled:opacity-50 min-h-[44px]"
        >
          {saving ? 'Saving...' : 'Save Settings'}
        </button>
      </div>
    </form>
  );
}
