'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Listing, PROPERTY_TYPE_LABELS, LISTING_STATUS_LABELS } from '@/lib/types';
import { Plus, Trash, PencilSimple } from '@phosphor-icons/react';

interface ListingsManagerProps {
  initialListings: Listing[];
}

export function ListingsManager({ initialListings }: ListingsManagerProps) {
  const [listings, setListings] = useState<Listing[]>(initialListings);
  const [updatingId, setUpdatingId] = useState<string | null>(null);

  const togglePublished = async (id: string, current: boolean) => {
    setUpdatingId(id);
    try {
      const res = await fetch(`/api/admin/listings/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ is_published: !current }),
      });
      if (res.ok) {
        setListings((prev) =>
          prev.map((l) => (l.id === id ? { ...l, is_published: !current } : l))
        );
      }
    } catch {
      // Failed to toggle
    } finally {
      setUpdatingId(null);
    }
  };

  const toggleFeatured = async (id: string, current: boolean) => {
    setUpdatingId(id);
    try {
      const res = await fetch(`/api/admin/listings/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ is_featured: !current }),
      });
      if (res.ok) {
        setListings((prev) =>
          prev.map((l) => (l.id === id ? { ...l, is_featured: !current } : l))
        );
      }
    } catch {
      // Failed to toggle
    } finally {
      setUpdatingId(null);
    }
  };

  const handleDelete = async (id: string, title: string) => {
    if (!confirm(`Are you sure you want to delete "${title}"?`)) return;

    setUpdatingId(id);
    try {
      const res = await fetch(`/api/admin/listings/${id}`, {
        method: 'DELETE',
      });
      if (res.ok) {
        setListings((prev) => prev.filter((l) => l.id !== id));
      }
    } catch {
      // Failed to delete
    } finally {
      setUpdatingId(null);
    }
  };

  return (
    <div className="space-y-6">
      {/* Top action bar */}
      <div className="flex flex-wrap items-center justify-between gap-4 p-4 border border-[var(--line)] bg-[var(--surface)] rounded-[4px]">
        <div>
          <span className="font-semibold text-sm text-[var(--ink)]">
            Total Listings: {listings.length}
          </span>
        </div>
        <Link
          href="/admin/listings/new"
          className="inline-flex items-center gap-1.5 px-4 py-2.5 text-sm font-semibold text-[var(--surface)] bg-[var(--brand)] hover:bg-[var(--brand-hover)] rounded-[4px] min-h-[44px]"
        >
          <Plus size={18} weight="regular" />
          <span>Add New Listing</span>
        </Link>
      </div>

      {/* Listings Table */}
      <div className="border border-[var(--line)] bg-[var(--surface)] rounded-[4px] overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-[var(--bg)] border-b border-[var(--line)] text-xs uppercase tracking-wider text-[var(--ink)]">
              <tr>
                <th className="px-4 py-3 font-semibold">Property</th>
                <th className="px-4 py-3 font-semibold">Type</th>
                <th className="px-4 py-3 font-semibold">Location</th>
                <th className="px-4 py-3 font-semibold">Price</th>
                <th className="px-4 py-3 font-semibold">Approvals</th>
                <th className="px-4 py-3 font-semibold text-center">Published</th>
                <th className="px-4 py-3 font-semibold text-center">Featured</th>
                <th className="px-4 py-3 font-semibold text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[var(--line)] text-[var(--text)]">
              {listings.map((l) => (
                <tr key={l.id} className="hover:bg-[var(--bg)]">
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-3">
                      <div className="relative w-12 h-10 bg-[var(--line)] rounded-[4px] overflow-hidden flex-shrink-0">
                        <Image
                          src={l.cover_image_url || '/placeholders/property-placeholder.svg'}
                          alt={l.title}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div>
                        <div className="font-semibold text-[var(--ink)] line-clamp-1">
                          {l.title}
                        </div>
                        <div className="text-xs text-[var(--text)]">
                          {l.size} {l.unit} &bull; {LISTING_STATUS_LABELS[l.status] || l.status}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap text-xs">
                    {PROPERTY_TYPE_LABELS[l.property_type]}
                  </td>
                  <td className="px-4 py-3 text-xs whitespace-nowrap">
                    {l.location}
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap font-medium text-[var(--ink)]">
                    {l.price_display}
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap text-xs">
                    <div className="flex flex-col gap-1">
                      {l.is_vmrda_approved && (
                        <span className="text-[var(--success)] font-semibold">
                          VMRDA Approved
                        </span>
                      )}
                      {l.is_rera_approved && (
                        <span className="text-[var(--success)] font-semibold">
                          RERA Approved
                        </span>
                      )}
                      {!l.is_vmrda_approved && !l.is_rera_approved && (
                        <span className="text-[#a4a7af]">None</span>
                      )}
                    </div>
                  </td>
                  <td className="px-4 py-3 text-center whitespace-nowrap">
                    <button
                      type="button"
                      disabled={updatingId === l.id}
                      onClick={() => togglePublished(l.id, l.is_published)}
                      className={`px-2.5 py-1 text-xs font-semibold rounded-[4px] border min-h-[36px] ${
                        l.is_published
                          ? 'bg-[#eaf4ef] border-[#bcdbc9] text-[var(--success)]'
                          : 'bg-[var(--line)] border-[var(--line)] text-[var(--text)]'
                      }`}
                    >
                      {l.is_published ? 'Yes' : 'No'}
                    </button>
                  </td>
                  <td className="px-4 py-3 text-center whitespace-nowrap">
                    <button
                      type="button"
                      disabled={updatingId === l.id}
                      onClick={() => toggleFeatured(l.id, l.is_featured)}
                      className={`px-2.5 py-1 text-xs font-semibold rounded-[4px] border min-h-[36px] ${
                        l.is_featured
                          ? 'bg-[#fef3c7] border-[#fde68a] text-[var(--warning)]'
                          : 'bg-[var(--line)] border-[var(--line)] text-[var(--text)]'
                      }`}
                    >
                      {l.is_featured ? 'Yes' : 'No'}
                    </button>
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap text-right">
                    <div className="flex items-center justify-end gap-2">
                      <Link
                        href={`/admin/listings/${l.id}/edit`}
                        className="p-2 border border-[var(--line)] rounded-[4px] text-[var(--ink)] hover:border-[var(--brand)] min-h-[44px] min-w-[44px] inline-flex items-center justify-center"
                        title="Edit Listing"
                        aria-label={`Edit ${l.title}`}
                      >
                        <PencilSimple size={18} weight="regular" />
                      </Link>
                      <button
                        type="button"
                        onClick={() => handleDelete(l.id, l.title)}
                        className="p-2 border border-[var(--line)] rounded-[4px] text-[var(--danger)] hover:border-[var(--danger)] min-h-[44px] min-w-[44px] inline-flex items-center justify-center"
                        title="Delete Listing"
                        aria-label={`Delete ${l.title}`}
                      >
                        <Trash size={18} weight="regular" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
