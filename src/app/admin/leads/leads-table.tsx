'use client';

import React, { useState, useEffect } from 'react';
import { Lead, LeadSource, LeadStatus, LEAD_SOURCE_LABELS, LEAD_STATUS_LABELS } from '@/lib/types';
import { Phone, WhatsappLogo, DownloadSimple } from '@phosphor-icons/react';

interface LeadsTableProps {
  initialLeads: Lead[];
}

export function LeadsTable({ initialLeads }: LeadsTableProps) {
  const [leads, setLeads] = useState<Lead[]>(initialLeads);
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [sourceFilter, setSourceFilter] = useState<string>('all');
  const [updatingId, setUpdatingId] = useState<string | null>(null);
  const [editingNotesId, setEditingNotesId] = useState<string | null>(null);
  const [notesDraft, setNotesDraft] = useState<string>('');
  const [isRefreshing, setIsRefreshing] = useState(false);

  useEffect(() => {
    setLeads(initialLeads);
  }, [initialLeads]);

  const handleRefresh = async () => {
    setIsRefreshing(true);
    try {
      const res = await fetch('/api/admin/leads', { cache: 'no-store' });
      if (res.ok) {
        const data = await res.json();
        if (Array.isArray(data)) {
          setLeads(data);
        }
      }
    } catch {
      // Ignore
    } finally {
      setIsRefreshing(false);
    }
  };

  const filteredLeads = leads.filter((lead) => {
    if (statusFilter !== 'all' && lead.status !== statusFilter) return false;
    if (sourceFilter !== 'all' && lead.source !== sourceFilter) return false;
    return true;
  });

  const handleStatusChange = async (leadId: string, newStatus: LeadStatus) => {
    setUpdatingId(leadId);
    try {
      const res = await fetch(`/api/leads/${leadId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus }),
      });
      if (res.ok) {
        setLeads((prev) =>
          prev.map((l) => (l.id === leadId ? { ...l, status: newStatus } : l))
        );
      }
    } catch {
      // Failed to update
    } finally {
      setUpdatingId(null);
    }
  };

  const handleSaveNotes = async (leadId: string) => {
    setUpdatingId(leadId);
    try {
      const res = await fetch(`/api/leads/${leadId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ notes: notesDraft }),
      });
      if (res.ok) {
        setLeads((prev) =>
          prev.map((l) => (l.id === leadId ? { ...l, notes: notesDraft } : l))
        );
        setEditingNotesId(null);
      }
    } catch {
      // Failed to update
    } finally {
      setUpdatingId(null);
    }
  };

  return (
    <div className="space-y-6">
      {/* Controls: Filters and CSV Export */}
      <div className="flex flex-wrap items-center justify-between gap-4 p-4 border border-[var(--line)] bg-[var(--surface)] rounded-[4px]">
        <div className="flex flex-wrap items-center gap-3">
          {/* Status Filter */}
          <div>
            <label htmlFor="filter-status" className="block text-xs uppercase font-semibold text-[var(--text)] mb-1">
              Filter by Status
            </label>
            <select
              id="filter-status"
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="px-3 py-2 text-sm bg-[var(--surface)] border border-[var(--line)] rounded-[4px] text-[var(--ink)] min-h-[44px]"
            >
              <option value="all">All Statuses</option>
              <option value="new">New</option>
              <option value="contacted">Contacted</option>
              <option value="site_visit_planned">Site visit planned</option>
              <option value="closed">Closed</option>
              <option value="not_interested">Not interested</option>
            </select>
          </div>

          {/* Source Filter */}
          <div>
            <label htmlFor="filter-source" className="block text-xs uppercase font-semibold text-[var(--text)] mb-1">
              Filter by Source
            </label>
            <select
              id="filter-source"
              value={sourceFilter}
              onChange={(e) => setSourceFilter(e.target.value)}
              className="px-3 py-2 text-sm bg-[var(--surface)] border border-[var(--line)] rounded-[4px] text-[var(--ink)] min-h-[44px]"
            >
              <option value="all">All Sources</option>
              <option value="whatsapp_click">WhatsApp tap</option>
              <option value="call_click">Call tap</option>
              <option value="form">Enquiry form</option>
            </select>
          </div>
        </div>

        {/* Action Buttons: Refresh & CSV Export */}
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={handleRefresh}
            disabled={isRefreshing}
            className="inline-flex items-center gap-1.5 px-3.5 py-2.5 text-sm font-semibold text-[var(--ink)] bg-[var(--surface)] border border-[var(--line)] rounded-[4px] hover:border-[var(--brand)] hover:text-[var(--brand)] min-h-[44px] cursor-pointer transition-colors"
            title="Refresh Leads"
          >
            <svg
              className={`w-4 h-4 ${isRefreshing ? 'animate-spin' : ''}`}
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <path d="M21 12a9 9 0 0 0-9-9 9.75 9.75 0 0 0-6.74 2.74L3 8" />
              <path d="M3 3v5h5" />
              <path d="M3 12a9 9 0 0 0 9 9 9.75 9.75 0 0 0 6.74-2.74L21 16" />
              <path d="M16 21h5v-5" />
            </svg>
            <span>{isRefreshing ? 'Refreshing...' : 'Refresh'}</span>
          </button>
          <a
            href="/api/admin/csv"
            download
            className="inline-flex items-center gap-2 px-4 py-2.5 text-sm font-semibold text-[var(--ink)] bg-[var(--bg)] border border-[var(--line)] rounded-[4px] hover:border-[var(--brand)] min-h-[44px]"
          >
            <DownloadSimple size={18} weight="regular" />
            <span>Export CSV</span>
          </a>
        </div>
      </div>

      {/* Table */}
      <div className="border border-[var(--line)] bg-[var(--surface)] rounded-[4px] overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-[var(--bg)] border-b border-[var(--line)] text-xs uppercase tracking-wider text-[var(--ink)]">
              <tr>
                <th className="px-4 py-3 font-semibold">Date</th>
                <th className="px-4 py-3 font-semibold">Name & Phone</th>
                <th className="px-4 py-3 font-semibold">Source</th>
                <th className="px-4 py-3 font-semibold">Listing / Interest</th>
                <th className="px-4 py-3 font-semibold">Status</th>
                <th className="px-4 py-3 font-semibold">Notes</th>
                <th className="px-4 py-3 font-semibold text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[var(--line)] text-[var(--text)]">
              {filteredLeads.length > 0 ? (
                filteredLeads.map((lead) => (
                  <tr key={lead.id} className="hover:bg-[var(--bg)]">
                    <td className="px-4 py-3 whitespace-nowrap text-xs">
                      {new Date(lead.created_at).toLocaleString('en-IN', {
                        month: 'short',
                        day: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit',
                      })}
                    </td>
                    <td className="px-4 py-3">
                      <div className="font-semibold text-[var(--ink)]">
                        {lead.name || 'Anonymous visitor'}
                      </div>
                      {lead.phone && (
                        <div className="text-xs text-[var(--brand)] font-medium">
                          {lead.phone}
                        </div>
                      )}
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap text-xs font-medium text-[var(--ink)]">
                      {LEAD_SOURCE_LABELS[lead.source] || lead.source}
                    </td>
                    <td className="px-4 py-3 text-xs max-w-[200px]">
                      <div className="font-medium text-[var(--ink)] truncate">
                        {lead.listing_title || 'General Site Lead'}
                      </div>
                      {lead.interest && (
                        <div className="text-[var(--text)]">
                          Category: {lead.interest}
                        </div>
                      )}
                      {lead.message && (
                        <div className="text-[11px] text-[var(--text)] italic truncate" title={lead.message}>
                          &quot;{lead.message}&quot;
                        </div>
                      )}
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap">
                      <select
                        value={lead.status}
                        disabled={updatingId === lead.id}
                        onChange={(e) => handleStatusChange(lead.id, e.target.value as LeadStatus)}
                        className="text-xs font-semibold px-2 py-1.5 border border-[var(--line)] rounded-[4px] bg-[var(--surface)] text-[var(--ink)]"
                      >
                        <option value="new">New</option>
                        <option value="contacted">Contacted</option>
                        <option value="site_visit_planned">Site visit planned</option>
                        <option value="closed">Closed</option>
                        <option value="not_interested">Not interested</option>
                      </select>
                    </td>
                    <td className="px-4 py-3 text-xs max-w-[180px]">
                      {editingNotesId === lead.id ? (
                        <div className="space-y-1">
                          <input
                            type="text"
                            value={notesDraft}
                            onChange={(e) => setNotesDraft(e.target.value)}
                            className="w-full px-2 py-1 text-xs border border-[var(--line)] rounded-[4px] bg-[var(--surface)] text-[var(--ink)]"
                            placeholder="Add notes..."
                          />
                          <div className="flex gap-1">
                            <button
                              type="button"
                              onClick={() => handleSaveNotes(lead.id)}
                              className="px-2 py-0.5 text-[10px] font-semibold bg-[var(--brand)] text-[var(--surface)] rounded-[4px]"
                            >
                              Save
                            </button>
                            <button
                              type="button"
                              onClick={() => setEditingNotesId(null)}
                              className="px-2 py-0.5 text-[10px] text-[var(--ink)] border border-[var(--line)] rounded-[4px]"
                            >
                              Cancel
                            </button>
                          </div>
                        </div>
                      ) : (
                        <div
                          onClick={() => {
                            setEditingNotesId(lead.id);
                            setNotesDraft(lead.notes || '');
                          }}
                          className="cursor-pointer hover:underline text-[var(--text)]"
                          title="Click to edit notes"
                        >
                          {lead.notes || <span className="text-[#a4a7af] italic">Click to add note</span>}
                        </div>
                      )}
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap text-right">
                      <div className="flex items-center justify-end gap-1.5">
                        {lead.phone ? (
                          <>
                            <a
                              href={`tel:+91${lead.phone}`}
                              className="p-2 border border-[var(--line)] bg-[var(--surface)] rounded-[4px] text-[var(--ink)] hover:border-[var(--brand)] min-h-[44px] min-w-[44px] inline-flex items-center justify-center"
                              title="Call Lead"
                              aria-label={`Call ${lead.name || lead.phone}`}
                            >
                              <Phone size={18} weight="regular" />
                            </a>
                            <a
                              href={`https://wa.me/91${lead.phone}?text=${encodeURIComponent(
                                `Hi ${lead.name || ''}, this is Rajesh Ponnada from Secure Home Vizag regarding your enquiry.`
                              )}`}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="p-2 border border-[var(--line)] bg-[var(--surface)] rounded-[4px] text-[var(--brand)] hover:border-[var(--brand)] min-h-[44px] min-w-[44px] inline-flex items-center justify-center"
                              title="Message Lead on WhatsApp"
                              aria-label={`WhatsApp ${lead.name || lead.phone}`}
                            >
                              <WhatsappLogo size={18} weight="regular" />
                            </a>
                          </>
                        ) : (
                          <span className="text-xs text-[#a4a7af]">No phone</span>
                        )}
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={7} className="px-4 py-12 text-center text-sm text-[var(--text)]">
                    No leads matching the current filter.
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
