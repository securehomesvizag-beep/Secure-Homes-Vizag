import { NextResponse } from 'next/server';
import { getLeadsForAdmin } from '@/lib/data';

export async function GET() {
  try {
    const leads = await getLeadsForAdmin();

    const headers = [
      'Date',
      'Source',
      'Name',
      'Phone',
      'Interest',
      'Listing Title',
      'Status',
      'Notes',
      'Page URL',
    ];

    const rows = leads.map((l) => [
      `"${new Date(l.created_at).toLocaleString()}"`,
      `"${l.source}"`,
      `"${l.name || ''}"`,
      `"${l.phone || ''}"`,
      `"${l.interest || ''}"`,
      `"${(l.listing_title || '').replace(/"/g, '""')}"`,
      `"${l.status}"`,
      `"${(l.notes || '').replace(/"/g, '""')}"`,
      `"${(l.page_url || '').replace(/"/g, '""')}"`,
    ]);

    const csvContent = [headers.join(','), ...rows.map((r) => r.join(','))].join('\n');

    return new NextResponse(csvContent, {
      status: 200,
      headers: {
        'Content-Type': 'text/csv; charset=utf-8',
        'Content-Disposition': `attachment; filename="leads_${new Date().toISOString().slice(0, 10)}.csv"`,
      },
    });
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : 'CSV generation failed';
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}
