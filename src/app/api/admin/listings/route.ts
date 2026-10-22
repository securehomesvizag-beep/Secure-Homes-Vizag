import { NextRequest, NextResponse } from 'next/server';
import { createAdminClient } from '@/lib/supabase/admin';
import { Listing } from '@/lib/types';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const newListing: Listing = {
      id: typeof crypto !== 'undefined' && crypto.randomUUID ? crypto.randomUUID() : `list_${Date.now()}`,
      title: body.title,
      slug: body.slug || body.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, ''),
      property_type: body.property_type,
      price: Number(body.price) || 0,
      price_display: body.price_display || `Rs ${body.price}`,
      size: Number(body.size) || 0,
      unit: body.unit || 'sq.yds',
      location: body.location,
      status: body.status || 'available',
      is_vmrda_approved: Boolean(body.is_vmrda_approved),
      is_rera_approved: Boolean(body.is_rera_approved),
      is_featured: Boolean(body.is_featured),
      is_published: body.is_published !== undefined ? Boolean(body.is_published) : true,
      description: body.description || '',
      facts: body.facts || {},
      cover_image_url: body.cover_image_url || '/placeholders/property-placeholder.svg',
      images: body.images || [body.cover_image_url || '/placeholders/property-placeholder.svg'],
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };

    const adminClient = createAdminClient();
    if (adminClient) {
      const { data, error } = await adminClient.from('listings').insert([newListing]).select().single();
      if (!error && data) {
        return NextResponse.json({ success: true, listing: data });
      }
    }

    // In-memory fallback
    if (!(globalThis as any).__listings_store) {
      (globalThis as any).__listings_store = [];
    }
    (globalThis as any).__listings_store.unshift(newListing);

    return NextResponse.json({ success: true, listing: newListing });
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : 'Error creating listing';
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}
