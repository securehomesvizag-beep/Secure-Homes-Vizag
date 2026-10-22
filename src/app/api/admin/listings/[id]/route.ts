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
      const { data, error } = await adminClient
        .from('listings')
        .update({
          ...body,
          updated_at: new Date().toISOString(),
        })
        .eq('id', id)
        .select()
        .single();

      if (!error && data) {
        return NextResponse.json({ success: true, listing: data });
      }
    }

    const listingsStore = (globalThis as any).__listings_store;
    if (listingsStore && Array.isArray(listingsStore)) {
      const index = listingsStore.findIndex((l: any) => l.id === id);
      if (index !== -1) {
        listingsStore[index] = {
          ...listingsStore[index],
          ...body,
          updated_at: new Date().toISOString(),
        };
        return NextResponse.json({ success: true, listing: listingsStore[index] });
      }
    }

    return NextResponse.json({ success: true });
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : 'Error updating listing';
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
      await adminClient.from('listings').delete().eq('id', id);
    }

    const store = (globalThis as any).__listings_store;
    if (store && Array.isArray(store)) {
      (globalThis as any).__listings_store = store.filter((l: any) => l.id !== id);
    }

    return NextResponse.json({ success: true });
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : 'Error deleting listing';
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}
