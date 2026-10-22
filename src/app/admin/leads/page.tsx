import React from 'react';
import { getLeadsForAdmin } from '@/lib/data';
import { LeadsTable } from './leads-table';

export default async function AdminLeadsPage() {
  const leads = await getLeadsForAdmin();

  return (
    <div className="space-y-6 fade-in">
      <div>
        <h1 className="font-heading text-2xl md:text-3xl text-[var(--ink)] mb-1">
          Lead Inquiries Management
        </h1>
        <p className="text-sm text-[var(--text)]">
          View and follow up with all captured inquiries from WhatsApp clicks, direct calls, and forms.
        </p>
      </div>

      <LeadsTable initialLeads={leads} />
    </div>
  );
}
