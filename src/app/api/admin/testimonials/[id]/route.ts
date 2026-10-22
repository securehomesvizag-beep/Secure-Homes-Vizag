import { NextRequest, NextResponse } from 'next/server';
import { createAdminClient } from '@/lib/supabase/admin';
import { revalidatePath } from 'next/cache';

export async function PATCH(
  req: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await context.params;
    const body = await req.json();

    const adminClient = createAdminClient();
    if (adminClient) {
      const { error } = await adminClient.from('testimonials').update(body).eq('id', id);
      if (error) {
        console.error(`Failed to update testimonial [${id}] in Supabase:`, error);
      }
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

    try {
      revalidatePath('/', 'layout');
      revalidatePath('/');
      revalidatePath('/about');
    } catch {
      // Safe fallback
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
      const { error } = await adminClient.from('testimonials').delete().eq('id', id);
      if (error) {
        console.error(`Failed to delete testimonial [${id}] in Supabase:`, error);
      }
    }

    const store = (globalThis as any).__testimonials_store;
    if (store && Array.isArray(store)) {
      (globalThis as any).__testimonials_store = store.filter((t: any) => t.id !== id);
    }

    try {
      revalidatePath('/', 'layout');
      revalidatePath('/');
      revalidatePath('/about');
    } catch {
      // Safe fallback
    }

    return NextResponse.json({ success: true });
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : 'Error deleting testimonial';
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}
