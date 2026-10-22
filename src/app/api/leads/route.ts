import { NextRequest, NextResponse } from 'next/server';
import { checkRateLimit } from '@/lib/rate-limit';
import { insertLead } from '@/lib/data';
import { LeadSource, PropertyType } from '@/lib/types';

export async function POST(req: NextRequest) {
  try {
    const ip = req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() || '127.0.0.1';

    // Rate limiting: max 30 actions per minute per IP
    const limit = checkRateLimit(ip, 30, 60 * 1000);
    if (!limit.success) {
      return NextResponse.json(
        { error: 'Too many requests. Please try again in a few moments.' },
        { status: 429 }
      );
    }

    const body = await req.json();

    // Spam honeypot trap: bots fill this hidden field
    if (body.website_hp) {
      return NextResponse.json({ success: true, message: 'Received' });
    }

    const { source, name, phone, interest, message, listing_id, listing_title, page_url } = body;

    const validSources: LeadSource[] = ['whatsapp_click', 'call_click', 'form'];
    if (!source || !validSources.includes(source)) {
      return NextResponse.json({ error: 'Invalid lead source' }, { status: 400 });
    }

    const lead = await insertLead({
      source,
      name: name || null,
      phone: phone || null,
      interest: (interest as PropertyType) || null,
      message: message || null,
      listing_id: listing_id || null,
      listing_title: listing_title || null,
      page_url: page_url || null,
      notes: null,
      ip_address: ip,
    });

    return NextResponse.json({ success: true, id: lead.id });
  } catch (err: unknown) {
    const errorMsg = err instanceof Error ? err.message : 'Internal Server Error';
    return NextResponse.json({ error: errorMsg }, { status: 500 });
  }
}
