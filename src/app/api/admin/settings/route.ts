import { NextRequest, NextResponse } from 'next/server';
import { createAdminClient } from '@/lib/supabase/admin';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const adminClient = createAdminClient();
    if (adminClient) {
      for (const [key, value] of Object.entries(body)) {
        await adminClient
          .from('settings')
          .upsert({ key, value: String(value), updated_at: new Date().toISOString() });
      }
    }

    if (global.__settings_store) {
      global.__settings_store = {
        ...global.__settings_store,
        ...body,
      };
    }

    return NextResponse.json({ success: true });
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : 'Error updating settings';
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}
