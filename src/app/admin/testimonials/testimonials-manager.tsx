'use client';

import React, { useState } from 'react';
import { Testimonial } from '@/lib/types';
import { Plus, Trash, Eye, EyeSlash } from '@phosphor-icons/react';

interface TestimonialsManagerProps {
  initialTestimonials: Testimonial[];
}

export function TestimonialsManager({ initialTestimonials }: TestimonialsManagerProps) {
  const [testimonials, setTestimonials] = useState<Testimonial[]>(initialTestimonials);
  const [showAddForm, setShowAddForm] = useState(false);
  const [clientName, setClientName] = useState('');
  const [location, setLocation] = useState('');
  const [quote, setQuote] = useState('');
  const [propertyType, setPropertyType] = useState('Plots');
  const [submitting, setSubmitting] = useState(false);
  const [updatingId, setUpdatingId] = useState<string | null>(null);

  const handleToggleVisibility = async (id: string, current: boolean) => {
    setUpdatingId(id);
    try {
      const res = await fetch(`/api/admin/testimonials/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ is_visible: !current }),
      });
      if (res.ok) {
        setTestimonials((prev) =>
          prev.map((t) => (t.id === id ? { ...t, is_visible: !current } : t))
        );
      }
    } catch {
      // Failed to toggle
    } finally {
      setUpdatingId(null);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this testimonial?')) return;
    setUpdatingId(id);
    try {
      const res = await fetch(`/api/admin/testimonials/${id}`, {
        method: 'DELETE',
      });
      if (res.ok) {
        setTestimonials((prev) => prev.filter((t) => t.id !== id));
      }
    } catch {
      // Failed to delete
    } finally {
      setUpdatingId(null);
    }
  };

  const handleAdd = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      const res = await fetch('/api/admin/testimonials', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          client_name: clientName,
          location,
          quote,
          property_type: propertyType,
          is_visible: true,
        }),
      });
      const data = await res.json();
      if (res.ok && data.testimonial) {
        setTestimonials((prev) => [data.testimonial, ...prev]);
        setShowAddForm(false);
        setClientName('');
        setLocation('');
        setQuote('');
      }
    } catch {
      // Failed to add
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Policy reminder */}
      <div className="p-4 bg-[var(--surface)] border border-[var(--line)] rounded-[4px] text-xs text-[var(--text)]">
        <strong>Integrity Policy:</strong> The public site displays client feedback only when real, verified testimonials are entered and marked visible here with explicit customer consent. No fake testimonials are shown.
      </div>

      <div className="flex flex-wrap items-center justify-between gap-4 p-4 border border-[var(--line)] bg-[var(--surface)] rounded-[4px]">
        <div>
          <span className="font-semibold text-sm text-[var(--ink)]">
            Total Testimonials: {testimonials.length} (
            {testimonials.filter((t) => t.is_visible).length} visible)
          </span>
        </div>
        <button
          type="button"
          onClick={() => setShowAddForm(!showAddForm)}
          className="inline-flex items-center gap-1.5 px-4 py-2.5 text-sm font-semibold text-[var(--surface)] bg-[var(--brand)] hover:bg-[var(--brand-hover)] rounded-[4px] min-h-[44px]"
        >
          <Plus size={18} weight="regular" />
          <span>{showAddForm ? 'Cancel' : 'Add Testimonial'}</span>
        </button>
      </div>

      {/* Add Form */}
      {showAddForm && (
        <form onSubmit={handleAdd} className="p-6 border border-[var(--line)] bg-[var(--surface)] rounded-[4px] space-y-4 max-w-xl">
          <h2 className="font-heading text-lg text-[var(--ink)]">Add Genuine Customer Feedback</h2>
          <div>
            <label className="block text-xs font-semibold text-[var(--ink)] mb-1">Client Full Name *</label>
            <input
              type="text"
              required
              value={clientName}
              onChange={(e) => setClientName(e.target.value)}
              placeholder="e.g. S. Ramakrishna"
              className="w-full px-3 py-2 text-sm bg-[var(--surface)] border border-[var(--line)] rounded-[4px] text-[var(--ink)] min-h-[44px]"
            />
          </div>
          <div>
            <label className="block text-xs font-semibold text-[var(--ink)] mb-1">Location / Colony (Optional)</label>
            <input
              type="text"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              placeholder="e.g. Madhurawada, Vizag"
              className="w-full px-3 py-2 text-sm bg-[var(--surface)] border border-[var(--line)] rounded-[4px] text-[var(--ink)] min-h-[44px]"
            />
          </div>
          <div>
            <label className="block text-xs font-semibold text-[var(--ink)] mb-1">Property Type</label>
            <input
              type="text"
              value={propertyType}
              onChange={(e) => setPropertyType(e.target.value)}
              placeholder="e.g. Residential Plot or Flat"
              className="w-full px-3 py-2 text-sm bg-[var(--surface)] border border-[var(--line)] rounded-[4px] text-[var(--ink)] min-h-[44px]"
            />
          </div>
          <div>
            <label className="block text-xs font-semibold text-[var(--ink)] mb-1">Feedback Quote *</label>
            <textarea
              rows={3}
              required
              value={quote}
              onChange={(e) => setQuote(e.target.value)}
              placeholder="Write the customer's verbatim comments about their property purchase..."
              className="w-full px-3 py-2 text-sm bg-[var(--surface)] border border-[var(--line)] rounded-[4px] text-[var(--ink)] resize-none"
            />
          </div>
          <button
            type="submit"
            disabled={submitting}
            className="w-full py-2.5 text-sm font-semibold text-[var(--surface)] bg-[var(--brand)] hover:bg-[var(--brand-hover)] rounded-[4px] min-h-[44px]"
          >
            {submitting ? 'Adding...' : 'Save and Publish'}
          </button>
        </form>
      )}

      {/* List */}
      <div className="space-y-3">
        {testimonials.length > 0 ? (
          testimonials.map((t) => (
            <div
              key={t.id}
              className="p-5 border border-[var(--line)] bg-[var(--surface)] rounded-[4px] flex flex-col sm:flex-row sm:items-center justify-between gap-4"
            >
              <div className="space-y-1">
                <p className="text-sm text-[var(--ink)] italic leading-relaxed">
                  &quot;{t.quote}&quot;
                </p>
                <p className="text-xs font-semibold text-[var(--ink)]">
                  {t.client_name} {t.location ? `(${t.location})` : ''}
                </p>
              </div>

              <div className="flex items-center gap-2 flex-shrink-0">
                <button
                  type="button"
                  disabled={updatingId === t.id}
                  onClick={() => handleToggleVisibility(t.id, t.is_visible)}
                  className={`inline-flex items-center gap-1 px-3 py-2 text-xs font-semibold rounded-[4px] border min-h-[44px] ${
                    t.is_visible
                      ? 'bg-[#eaf4ef] border-[#bcdbc9] text-[var(--success)]'
                      : 'bg-[var(--bg)] border-[var(--line)] text-[var(--text)]'
                  }`}
                >
                  {t.is_visible ? <Eye size={16} weight="regular" /> : <EyeSlash size={16} weight="regular" />}
                  <span>{t.is_visible ? 'Visible' : 'Hidden'}</span>
                </button>

                <button
                  type="button"
                  disabled={updatingId === t.id}
                  onClick={() => handleDelete(t.id)}
                  className="p-2 border border-[var(--line)] rounded-[4px] text-[var(--danger)] hover:border-[var(--danger)] min-h-[44px] min-w-[44px] inline-flex items-center justify-center"
                  aria-label="Delete testimonial"
                >
                  <Trash size={18} weight="regular" />
                </button>
              </div>
            </div>
          ))
        ) : (
          <div className="p-12 text-center border border-[var(--line)] bg-[var(--surface)] rounded-[4px] text-sm text-[var(--text)]">
            No testimonials recorded yet. They will appear on the homepage only after you add real ones with client consent.
          </div>
        )}
      </div>
    </div>
  );
}
