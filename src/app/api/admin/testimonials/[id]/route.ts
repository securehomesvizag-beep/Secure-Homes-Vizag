import { NextRequest, NextResponse } from 'next/server';
import { createAdminClient } from '@/lib/supabase/admin';

export async function PATCH(
  req: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await context.params;
    const body = await req.json();

    const adminClient = createAdminClient();
    if (adminClient) {
      await adminClient.from('testimonials').update(body).eq('id', id);
    }

    const store = (globalThis as any).__testimonials_store;
    if (store && Array.isArray(store)) {
      const idx = store.findIndex((t: any) => t.id === id);
      if (idx !== -1) {
        store[idx] = {
          ...store[idx],
          ...body,
        };
      }
    }

    return NextResponse.json({ success: true });
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : 'Error updating testimonial';
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}

export async function DELETE(
  _req: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await context.params;

    const adminClient = createAdminClient();
    if (adminClient) {
      await adminClient.from('testimonials').delete().eq('id', id);
    }

    const store = (globalThis as any).__testimonials_store;
    if (store && Array.isArray(store)) {
      (globalThis as any).__testimonials_store = store.filter((t: any) => t.id !== id);
    }

    return NextResponse.json({ success: true });
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : 'Error deleting testimonial';
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}
