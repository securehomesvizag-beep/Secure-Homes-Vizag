import { NextRequest, NextResponse } from 'next/server';
import { createAdminClient } from '@/lib/supabase/admin';
import { saveLocalSettings } from '@/lib/data';
import { revalidatePath } from 'next/cache';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    // 1. Save locally to disk and memory
    saveLocalSettings(body);

    // 2. Also sync to Supabase
    const adminClient = createAdminClient();
    if (adminClient) {
      for (const [key, value] of Object.entries(body)) {
        const { error } = await adminClient
          .from('settings')
          .upsert(
            { key, value: String(value), updated_at: new Date().toISOString() },
            { onConflict: 'key' }
          );
        if (error) {
          console.error(`Failed to update setting [${key}]:`, error);
        }
      }
    }

    // Immediately revalidate all public pages displaying brand settings
    try {
      revalidatePath('/', 'layout');
      revalidatePath('/');
      revalidatePath('/about');
      revalidatePath('/contact');
      revalidatePath('/social');
      revalidatePath('/listings');
    } catch {
      // Safe fallback
    }

    return NextResponse.json({ success: true });
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : 'Error updating settings';
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}
