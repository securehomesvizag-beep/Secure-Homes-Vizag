'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { Listing, PropertyType, ListingStatus, SizeUnit } from '@/lib/types';
import { createClient } from '@/lib/supabase/client';

interface ListingFormProps {
  initialData?: Listing;
}

export function ListingForm({ initialData }: ListingFormProps) {
  const router = useRouter();
  const isEditing = Boolean(initialData);

  const [propertyType, setPropertyType] = useState<PropertyType>(initialData?.property_type || 'plots');
  const [title, setTitle] = useState(initialData?.title || '');
  const [slug, setSlug] = useState(initialData?.slug || '');
  const [location, setLocation] = useState(initialData?.location || '');
  const [price, setPrice] = useState<number | string>(initialData?.price || '');
  const [priceDisplay, setPriceDisplay] = useState(initialData?.price_display || '');
  const [size, setSize] = useState<number | string>(initialData?.size || '');
  const [unit, setUnit] = useState<SizeUnit>(initialData?.unit || 'sq.yds');
  const [status, setStatus] = useState<ListingStatus>(initialData?.status || 'available');
  const [isVmrdaApproved, setIsVmrdaApproved] = useState(initialData?.is_vmrda_approved || false);
  const [isReraApproved, setIsReraApproved] = useState(initialData?.is_rera_approved || false);
  const [isFeatured, setIsFeatured] = useState(initialData?.is_featured || false);
  const [isPublished, setIsPublished] = useState(initialData ? initialData.is_published : true);
  const [description, setDescription] = useState(initialData?.description || '');
  const [coverImageUrl, setCoverImageUrl] = useState(initialData?.cover_image_url || '/placeholders/property-placeholder.svg');

  // Key/value facts
  const [factKey1, setFactKey1] = useState(Object.keys(initialData?.facts || {})[0] || 'Facing');
  const [factVal1, setFactVal1] = useState(Object.values(initialData?.facts || {})[0] || '');
  const [factKey2, setFactKey2] = useState(Object.keys(initialData?.facts || {})[1] || 'Road Width');
  const [factVal2, setFactVal2] = useState(Object.values(initialData?.facts || {})[1] || '');

  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const handleTitleChange = (val: string) => {
    setTitle(val);
    if (!isEditing) {
      setSlug(
        val
          .toLowerCase()
          .replace(/[^a-z0-9]+/g, '-')
          .replace(/(^-|-$)/g, '')
      );
    }
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    setErrorMsg(null);

    try {
      const supabase = createClient();
      const fileExt = file.name.split('.').pop();
      const fileName = `${Date.now()}-${Math.random().toString(36).substring(2)}.${fileExt}`;
      const filePath = `listings/${fileName}`;

      const { error: uploadError } = await supabase.storage
        .from('listing-images')
        .upload(filePath, file);

      if (uploadError) {
        throw uploadError;
      }

      const { data } = supabase.storage.from('listing-images').getPublicUrl(filePath);
      if (data?.publicUrl) {
        setCoverImageUrl(data.publicUrl);
      }
    } catch {
      // In local dev without live storage bucket, preview local file
      const localUrl = URL.createObjectURL(file);
      setCoverImageUrl(localUrl);
    } finally {
      setUploading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setErrorMsg(null);

    const facts: Record<string, string> = {};
    if (factKey1 && factVal1) facts[factKey1] = factVal1;
    if (factKey2 && factVal2) facts[factKey2] = factVal2;

    const payload = {
      property_type: propertyType,
      title,
      slug,
      location,
      price: Number(price) || 0,
      price_display: priceDisplay || `Rs ${price}`,
      size: Number(size) || 0,
      unit,
      status,
      is_vmrda_approved: isVmrdaApproved,
      is_rera_approved: isReraApproved,
      is_featured: isFeatured,
      is_published: isPublished,
      description,
      facts,
      cover_image_url: coverImageUrl,
    };

    try {
      const url = isEditing
        ? `/api/admin/listings/${initialData?.id}`
        : '/api/admin/listings';
      const method = isEditing ? 'PATCH' : 'POST';

      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || 'Failed to save listing');
      }

      router.push('/admin/listings');
      router.refresh();
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Error saving listing';
      setErrorMsg(msg);
    } finally {
      setSaving(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-2xl mx-auto space-y-6">
      {errorMsg && (
        <div className="p-3 text-sm text-[var(--danger)] border border-[var(--danger)] bg-[var(--surface)] rounded-[4px]">
          {errorMsg}
        </div>
      )}

      {/* Property Type */}
      <div>
        <label htmlFor="listing-type" className="block text-sm font-semibold text-[var(--ink)] mb-1">
          Property Type <span className="text-[var(--brand)]">*</span>
        </label>
        <select
          id="listing-type"
          value={propertyType}
          onChange={(e) => setPropertyType(e.target.value as PropertyType)}
          className="w-full px-3.5 py-2.5 text-base bg-[var(--surface)] border border-[var(--line)] rounded-[4px] text-[var(--ink)] min-h-[44px]"
        >
          <option value="plots">Plot or Open Land</option>
          <option value="flats">Flat or Apartment</option>
          <option value="villas">Independent House or Villa</option>
          <option value="commercial">Commercial Property</option>
        </select>
      </div>

      {/* Title */}
      <div>
        <label htmlFor="listing-title" className="block text-sm font-semibold text-[var(--ink)] mb-1">
          Listing Title <span className="text-[var(--brand)]">*</span>
        </label>
        <input
          id="listing-title"
          type="text"
          required
          value={title}
          onChange={(e) => handleTitleChange(e.target.value)}
          placeholder="e.g. 200 Sq Yds Residential Plot near Anandapuram"
          className="w-full px-3.5 py-2.5 text-base bg-[var(--surface)] border border-[var(--line)] rounded-[4px] text-[var(--ink)] min-h-[44px]"
        />
      </div>

      {/* URL Slug */}
      <div>
        <label htmlFor="listing-slug" className="block text-sm font-semibold text-[var(--ink)] mb-1">
          URL Slug <span className="text-[var(--brand)]">*</span>
        </label>
        <input
          id="listing-slug"
          type="text"
          required
          value={slug}
          onChange={(e) => setSlug(e.target.value)}
          placeholder="200-sq-yds-residential-plot-anandapuram"
          className="w-full px-3.5 py-2.5 text-base bg-[var(--surface)] border border-[var(--line)] rounded-[4px] text-[var(--ink)] min-h-[44px]"
        />
      </div>

      {/* Location */}
      <div>
        <label htmlFor="listing-location" className="block text-sm font-semibold text-[var(--ink)] mb-1">
          Location Text <span className="text-[var(--brand)]">*</span>
        </label>
        <input
          id="listing-location"
          type="text"
          required
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          placeholder="e.g. Anandapuram Highway Junction, Vizag"
          className="w-full px-3.5 py-2.5 text-base bg-[var(--surface)] border border-[var(--line)] rounded-[4px] text-[var(--ink)] min-h-[44px]"
        />
      </div>

      {/* Price and Price Display */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label htmlFor="listing-price" className="block text-sm font-semibold text-[var(--ink)] mb-1">
            Numeric Price (INR) <span className="text-[var(--brand)]">*</span>
          </label>
          <input
            id="listing-price"
            type="number"
            required
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            placeholder="3500000"
            className="w-full px-3.5 py-2.5 text-base bg-[var(--surface)] border border-[var(--line)] rounded-[4px] text-[var(--ink)] min-h-[44px]"
          />
        </div>

        <div>
          <label htmlFor="listing-price-display" className="block text-sm font-semibold text-[var(--ink)] mb-1">
            Display Price <span className="text-[var(--brand)]">*</span>
          </label>
          <input
            id="listing-price-display"
            type="text"
            required
            value={priceDisplay}
            onChange={(e) => setPriceDisplay(e.target.value)}
            placeholder="e.g. Rs 35 Lakhs or Rs 1.25 Crore"
            className="w-full px-3.5 py-2.5 text-base bg-[var(--surface)] border border-[var(--line)] rounded-[4px] text-[var(--ink)] min-h-[44px]"
          />
        </div>
      </div>

      {/* Size and Unit */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label htmlFor="listing-size" className="block text-sm font-semibold text-[var(--ink)] mb-1">
            Size Number <span className="text-[var(--brand)]">*</span>
          </label>
          <input
            id="listing-size"
            type="number"
            required
            value={size}
            onChange={(e) => setSize(e.target.value)}
            placeholder="200"
            className="w-full px-3.5 py-2.5 text-base bg-[var(--surface)] border border-[var(--line)] rounded-[4px] text-[var(--ink)] min-h-[44px]"
          />
        </div>

        <div>
          <label htmlFor="listing-unit" className="block text-sm font-semibold text-[var(--ink)] mb-1">
            Size Unit
          </label>
          <select
            id="listing-unit"
            value={unit}
            onChange={(e) => setUnit(e.target.value as SizeUnit)}
            className="w-full px-3.5 py-2.5 text-base bg-[var(--surface)] border border-[var(--line)] rounded-[4px] text-[var(--ink)] min-h-[44px]"
          >
            <option value="sq.yds">sq.yds (Square Yards)</option>
            <option value="sq.ft">sq.ft (Square Feet)</option>
            <option value="acres">acres</option>
          </select>
        </div>
      </div>

      {/* Availability Status */}
      <div>
        <label htmlFor="listing-status" className="block text-sm font-semibold text-[var(--ink)] mb-1">
          Availability Status
        </label>
        <select
          id="listing-status"
          value={status}
          onChange={(e) => setStatus(e.target.value as ListingStatus)}
          className="w-full px-3.5 py-2.5 text-base bg-[var(--surface)] border border-[var(--line)] rounded-[4px] text-[var(--ink)] min-h-[44px]"
        >
          <option value="available">Available</option>
          <option value="few_left">Few left</option>
          <option value="sold">Sold</option>
        </select>
      </div>

      {/* APPROVAL SWITCHES (Plain yes/no switches, NO numbers or doc uploads) */}
      <div className="p-4 border border-[var(--line)] bg-[var(--surface)] rounded-[4px] space-y-4">
        <div>
          <p className="text-sm font-semibold text-[var(--ink)] mb-1">
            Statutory Approval Switches
          </p>
          <p className="text-xs text-[var(--text)]">
            Toggle on if verified. When on, shows plain text badge &quot;VMRDA Approved&quot; or &quot;RERA Approved&quot; on public pages.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-6">
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              checked={isVmrdaApproved}
              onChange={(e) => setIsVmrdaApproved(e.target.checked)}
              className="h-4 w-4 accent-[var(--brand)] rounded-[4px]"
            />
            <span className="text-sm font-semibold text-[var(--ink)]">
              VMRDA Approved
            </span>
          </label>

          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              checked={isReraApproved}
              onChange={(e) => setIsReraApproved(e.target.checked)}
              className="h-4 w-4 accent-[var(--brand)] rounded-[4px]"
            />
            <span className="text-sm font-semibold text-[var(--ink)]">
              RERA Approved
            </span>
          </label>
        </div>
      </div>

      {/* Visibility Toggles */}
      <div className="p-4 border border-[var(--line)] bg-[var(--surface)] rounded-[4px] space-y-4">
        <div>
          <p className="text-sm font-semibold text-[var(--ink)] mb-1">
            Display Settings
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-6">
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              checked={isPublished}
              onChange={(e) => setIsPublished(e.target.checked)}
              className="h-4 w-4 accent-[var(--brand)] rounded-[4px]"
            />
            <span className="text-sm font-semibold text-[var(--ink)]">
              Published on Public Site
            </span>
          </label>

          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              checked={isFeatured}
              onChange={(e) => setIsFeatured(e.target.checked)}
              className="h-4 w-4 accent-[var(--brand)] rounded-[4px]"
            />
            <span className="text-sm font-semibold text-[var(--ink)]">
              Featured on Home Page (Top 3)
            </span>
          </label>
        </div>
      </div>

      {/* Photo and Image Upload */}
      <div className="p-4 border border-[var(--line)] bg-[var(--surface)] rounded-[4px] space-y-3">
        <label className="block text-sm font-semibold text-[var(--ink)]">
          Property Cover Photo
        </label>
        <div className="flex items-center gap-4">
          <div className="relative w-24 h-20 bg-[var(--line)] rounded-[4px] overflow-hidden border border-[var(--line)] flex-shrink-0">
            <Image
              src={coverImageUrl}
              alt="Listing cover preview"
              fill
              className="object-cover"
            />
          </div>
          <div className="flex-1 space-y-2">
            <input
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              disabled={uploading}
              className="block w-full text-xs text-[var(--text)] file:mr-3 file:py-2 file:px-3 file:rounded-[4px] file:border-0 file:text-xs file:font-semibold file:bg-[var(--bg)] file:text-[var(--ink)] hover:file:bg-[var(--line)] cursor-pointer"
            />
            <p className="text-xs text-[var(--text)]">
              {uploading ? 'Uploading to storage...' : 'Uploads to Supabase Storage bucket listing-images.'}
            </p>
          </div>
        </div>
      </div>

      {/* Description */}
      <div>
        <label htmlFor="listing-description" className="block text-sm font-semibold text-[var(--ink)] mb-1">
          Detailed Description <span className="text-[var(--brand)]">*</span>
        </label>
        <textarea
          id="listing-description"
          rows={5}
          required
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="State factual details: approach road width, proximity to landmarks, utility availability, layout boundaries."
          className="w-full px-3.5 py-2.5 text-base bg-[var(--surface)] border border-[var(--line)] rounded-[4px] text-[var(--ink)] resize-none"
        />
      </div>

      {/* Specifications / Facts */}
      <div className="p-4 border border-[var(--line)] bg-[var(--surface)] rounded-[4px] space-y-3">
        <label className="block text-sm font-semibold text-[var(--ink)]">
          Specifications & Facts
        </label>
        <div className="grid grid-cols-2 gap-3">
          <input
            type="text"
            value={factKey1}
            onChange={(e) => setFactKey1(e.target.value)}
            placeholder="Field 1 Name (e.g. Facing)"
            className="px-3 py-2 text-sm bg-[var(--surface)] border border-[var(--line)] rounded-[4px] text-[var(--ink)]"
          />
          <input
            type="text"
            value={factVal1}
            onChange={(e) => setFactVal1(e.target.value)}
            placeholder="Field 1 Value (e.g. East)"
            className="px-3 py-2 text-sm bg-[var(--surface)] border border-[var(--line)] rounded-[4px] text-[var(--ink)]"
          />
        </div>
        <div className="grid grid-cols-2 gap-3">
          <input
            type="text"
            value={factKey2}
            onChange={(e) => setFactKey2(e.target.value)}
            placeholder="Field 2 Name (e.g. Road Width)"
            className="px-3 py-2 text-sm bg-[var(--surface)] border border-[var(--line)] rounded-[4px] text-[var(--ink)]"
          />
          <input
            type="text"
            value={factVal2}
            onChange={(e) => setFactVal2(e.target.value)}
            placeholder="Field 2 Value (e.g. 40 feet)"
            className="px-3 py-2 text-sm bg-[var(--surface)] border border-[var(--line)] rounded-[4px] text-[var(--ink)]"
          />
        </div>
      </div>

      {/* Submit Button */}
      <div className="pt-4">
        <button
          type="submit"
          disabled={saving || uploading}
          className="w-full py-3.5 px-4 text-base font-semibold text-[var(--surface)] bg-[var(--brand)] hover:bg-[var(--brand-hover)] rounded-[4px] disabled:opacity-50 min-h-[44px]"
        >
          {saving ? 'Saving...' : isEditing ? 'Update Property Listing' : 'Create Property Listing'}
        </button>
      </div>
    </form>
  );
}
