import React from 'react';
import Link from 'next/link';
import { getLeadsForAdmin } from '@/lib/data';
import { LEAD_SOURCE_LABELS, LEAD_STATUS_LABELS } from '@/lib/types';
import { ArrowUpRight } from '@phosphor-icons/react/dist/ssr';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export default async function AdminDashboardPage() {
  const leads = await getLeadsForAdmin();

  const now = new Date();
  const startOfToday = new Date(now.getFullYear(), now.getMonth(), now.getDate()).getTime();
  const sevenDaysAgo = now.getTime() - 7 * 24 * 60 * 60 * 1000;

  const todayCount = leads.filter((l) => new Date(l.created_at).getTime() >= startOfToday).length;
  const sevenDaysCount = leads.filter((l) => new Date(l.created_at).getTime() >= sevenDaysAgo).length;
  const totalCount = leads.length;

  const sourceCounts = {
    whatsapp_click: leads.filter((l) => l.source === 'whatsapp_click').length,
    call_click: leads.filter((l) => l.source === 'call_click').length,
    form: leads.filter((l) => l.source === 'form').length,
  };

  const latestLeads = leads.slice(0, 10);

  return (
    <div className="space-y-8 fade-in">
      <div>
        <h1 className="font-heading text-2xl md:text-3xl text-[var(--ink)] mb-1">
          Enquiry & Lead Dashboard
        </h1>
        <p className="text-sm text-[var(--text)]">
          Real-time summary of lead captures across WhatsApp taps, telephone calls, and enquiry forms.
        </p>
      </div>

      {/* Honest UI disclosure banner */}
      <div className="p-4 bg-[var(--surface)] border border-[var(--line)] rounded-[4px] text-xs text-[var(--text)]">
        <strong>Tracking Note:</strong> A WhatsApp tap indicates that the visitor tapped the WhatsApp enquiry button on that listing or page. A Call tap indicates that the visitor tapped to open the telephone dialer. An Enquiry form entry represents a verified form submission with client contact details.
      </div>

      {/* 3 Metric Summary Boxes */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="p-5 border border-[var(--line)] bg-[var(--surface)] rounded-[4px] space-y-1">
          <span className="text-xs uppercase tracking-wider text-[var(--text)] font-semibold">
            Today
          </span>
          <p className="font-heading text-3xl font-semibold text-[var(--ink)]">
            {todayCount}
          </p>
          <p className="text-xs text-[var(--text)]">Leads & clicks recorded</p>
        </div>

        <div className="p-5 border border-[var(--line)] bg-[var(--surface)] rounded-[4px] space-y-1">
          <span className="text-xs uppercase tracking-wider text-[var(--text)] font-semibold">
            Last 7 Days
          </span>
          <p className="font-heading text-3xl font-semibold text-[var(--ink)]">
            {sevenDaysCount}
          </p>
          <p className="text-xs text-[var(--text)]">Past week activity</p>
        </div>

        <div className="p-5 border border-[var(--line)] bg-[var(--surface)] rounded-[4px] space-y-1">
          <span className="text-xs uppercase tracking-wider text-[var(--text)] font-semibold">
            Total All Time
          </span>
          <p className="font-heading text-3xl font-semibold text-[var(--brand)]">
            {totalCount}
          </p>
          <p className="text-xs text-[var(--text)]">All recorded inquiries</p>
        </div>
      </div>

      {/* Source Breakdown */}
      <div className="p-5 border border-[var(--line)] bg-[var(--surface)] rounded-[4px] space-y-3">
        <h2 className="font-heading text-lg text-[var(--ink)]">
          Inquiries by Source
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-sm">
          <div className="p-3 bg-[var(--bg)] border border-[var(--line)] rounded-[4px] flex justify-between items-center">
            <span className="text-[var(--ink)]">WhatsApp Taps</span>
            <span className="font-semibold text-base text-[var(--ink)]">{sourceCounts.whatsapp_click}</span>
          </div>
          <div className="p-3 bg-[var(--bg)] border border-[var(--line)] rounded-[4px] flex justify-between items-center">
            <span className="text-[var(--ink)]">Phone Call Taps</span>
            <span className="font-semibold text-base text-[var(--ink)]">{sourceCounts.call_click}</span>
          </div>
          <div className="p-3 bg-[var(--bg)] border border-[var(--line)] rounded-[4px] flex justify-between items-center">
            <span className="text-[var(--ink)]">Enquiry Form Submissions</span>
            <span className="font-semibold text-base text-[var(--ink)]">{sourceCounts.form}</span>
          </div>
        </div>
      </div>

      {/* Latest 10 Leads Table */}
      <div className="border border-[var(--line)] bg-[var(--surface)] rounded-[4px] overflow-hidden">
        <div className="p-5 border-b border-[var(--line)] flex items-center justify-between">
          <h2 className="font-heading text-lg text-[var(--ink)]">
            Latest 10 Inquiries
          </h2>
          <Link
            href="/admin/leads"
            className="text-xs font-semibold text-[var(--brand)] hover:underline inline-flex items-center gap-1"
          >
            <span>Manage all leads</span>
            <ArrowUpRight size={14} weight="regular" />
          </Link>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-[var(--bg)] border-b border-[var(--line)] text-xs uppercase tracking-wider text-[var(--ink)]">
              <tr>
                <th className="px-4 py-3 font-semibold">Date & Time</th>
                <th className="px-4 py-3 font-semibold">Source</th>
                <th className="px-4 py-3 font-semibold">Contact / Name</th>
                <th className="px-4 py-3 font-semibold">Listing / Interest</th>
                <th className="px-4 py-3 font-semibold">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[var(--line)] text-[var(--text)]">
              {latestLeads.length > 0 ? (
                latestLeads.map((l) => (
                  <tr key={l.id} className="hover:bg-[var(--bg)]">
                    <td className="px-4 py-3 whitespace-nowrap text-xs">
                      {new Date(l.created_at).toLocaleString('en-IN', {
                        month: 'short',
                        day: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit',
                      })}
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap font-medium text-[var(--ink)]">
                      {LEAD_SOURCE_LABELS[l.source] || l.source}
                    </td>
                    <td className="px-4 py-3">
                      <div className="font-semibold text-[var(--ink)]">{l.name || 'Anonymous visitor'}</div>
                      {l.phone && <div className="text-xs">{l.phone}</div>}
                    </td>
                    <td className="px-4 py-3 text-xs">
                      {l.listing_title || (l.interest ? `Category: ${l.interest}` : 'General Enquiry')}
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap">
                      <span className="px-2 py-0.5 text-xs font-semibold rounded-[4px] border border-[var(--line)] bg-[var(--surface)] text-[var(--ink)]">
                        {LEAD_STATUS_LABELS[l.status] || l.status}
                      </span>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={5} className="px-4 py-8 text-center text-sm text-[var(--text)]">
                    No leads recorded yet.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
