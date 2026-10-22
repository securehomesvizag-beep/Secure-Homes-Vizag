import { NextRequest, NextResponse } from 'next/server';
import { createAdminClient } from '@/lib/supabase/admin';
import { LeadStatus } from '@/lib/types';

export async function PATCH(
  req: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await context.params;
    const body = await req.json();
    const { status, notes } = body;

    const adminClient = createAdminClient();
    if (adminClient) {
      const updateData: { status?: LeadStatus; notes?: string } = {};
      if (status) updateData.status = status;
      if (typeof notes === 'string') updateData.notes = notes;

      const { data, error } = await adminClient
        .from('leads')
        .update(updateData)
        .eq('id', id)
        .select()
        .single();

      if (!error && data) {
        return NextResponse.json({ success: true, lead: data });
      }
    }

    // In-memory update fallback
    const store = (globalThis as any).__leads_store;
    if (store && Array.isArray(store)) {
      const target = store.find((l: any) => l.id === id);
      if (target) {
        if (status) target.status = status;
        if (typeof notes === 'string') target.notes = notes;
        return NextResponse.json({ success: true, lead: target });
      }
    }

    return NextResponse.json({ success: true });
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : 'Error updating lead';
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}
