import { NextRequest, NextResponse } from 'next/server';
import { createAdminClient } from '@/lib/supabase/admin';
import { Testimonial } from '@/lib/types';
import { revalidatePath } from 'next/cache';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const newTestimonial: Testimonial = {
      id: typeof crypto !== 'undefined' && crypto.randomUUID ? crypto.randomUUID() : `testi_${Date.now()}`,
      client_name: body.client_name,
      location: body.location || null,
      quote: body.quote,
      property_type: body.property_type || null,
      is_visible: body.is_visible !== undefined ? Boolean(body.is_visible) : false,
      created_at: new Date().toISOString(),
    };

    let result: Testimonial = newTestimonial;

    const adminClient = createAdminClient();
    if (adminClient) {
      const { data, error } = await adminClient.from('testimonials').insert([newTestimonial]).select().single();
      if (error) {
        console.error('Failed to insert testimonial in Supabase:', error);
      } else if (data) {
        result = data as Testimonial;
      }
    }

    if (!(globalThis as any).__testimonials_store) {
      (globalThis as any).__testimonials_store = [];
    }
    (globalThis as any).__testimonials_store.unshift(result);

    try {
      revalidatePath('/', 'layout');
      revalidatePath('/');
      revalidatePath('/about');
    } catch {
      // Safe fallback
    }

    return NextResponse.json({ success: true, testimonial: result });
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : 'Error adding testimonial';
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}
