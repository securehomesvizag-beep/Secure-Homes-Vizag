import { NextRequest, NextResponse } from 'next/server';
import { updateLeadForAdmin } from '@/lib/data';
import { LeadStatus } from '@/lib/types';

export async function PATCH(
  req: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await context.params;
    const body = await req.json();
    const { status, notes } = body;

    const updates: { status?: LeadStatus; notes?: string } = {};
    if (status) updates.status = status;
    if (typeof notes === 'string') updates.notes = notes;

    const lead = await updateLeadForAdmin(id, updates);
    return NextResponse.json({ success: true, lead });
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : 'Error updating lead';
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}
