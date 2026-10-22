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

    if (global.__listings_store) {
      const index = global.__listings_store.findIndex((l) => l.id === id);
      if (index !== -1) {
        global.__listings_store[index] = {
          ...global.__listings_store[index],
          ...body,
          updated_at: new Date().toISOString(),
        };
        return NextResponse.json({ success: true, listing: global.__listings_store[index] });
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

    if (global.__listings_store) {
      global.__listings_store = global.__listings_store.filter((l) => l.id !== id);
    }

    return NextResponse.json({ success: true });
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : 'Error deleting listing';
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}
