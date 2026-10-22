import React from 'react';
import { getSettings } from '@/lib/data';
import { SettingsForm } from './settings-form';

export default async function AdminSettingsPage() {
  const settings = await getSettings();

  return (
    <div className="space-y-6 fade-in">
      <div>
        <h1 className="font-heading text-2xl md:text-3xl text-[var(--ink)] mb-1">
          Website Settings
        </h1>
        <p className="text-sm text-[var(--text)]">
          Update public contact numbers, social media links, headline copy, and office operating details.
        </p>
      </div>

      <div className="border border-[var(--line)] bg-[var(--surface)] rounded-[4px] p-6 sm:p-8">
        <SettingsForm initialSettings={settings} />
      </div>
    </div>
  );
}
