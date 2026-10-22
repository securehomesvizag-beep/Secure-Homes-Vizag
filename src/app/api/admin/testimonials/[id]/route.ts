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

    if (global.__testimonials_store) {
      const idx = global.__testimonials_store.findIndex((t) => t.id === id);
      if (idx !== -1) {
        global.__testimonials_store[idx] = {
          ...global.__testimonials_store[idx],
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

    if (global.__testimonials_store) {
      global.__testimonials_store = global.__testimonials_store.filter((t) => t.id !== id);
    }

    return NextResponse.json({ success: true });
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : 'Error deleting testimonial';
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}
