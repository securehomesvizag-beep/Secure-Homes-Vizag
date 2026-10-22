import { NextRequest, NextResponse } from 'next/server';
import { createAdminClient } from '@/lib/supabase/admin';
import { revalidatePath } from 'next/cache';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

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

    const currentSettings = (globalThis as any).__settings_store;
    if (currentSettings) {
      (globalThis as any).__settings_store = {
        ...currentSettings,
        ...body,
      };
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
