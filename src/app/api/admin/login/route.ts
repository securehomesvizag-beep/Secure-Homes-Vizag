import { NextRequest, NextResponse } from 'next/server';
import { createServerClient } from '@supabase/ssr';

export async function POST(req: NextRequest) {
  try {
    const { email, password } = await req.json();

    const inputEmail = String(email || '').trim().toLowerCase();
    const inputPassword = String(password || '').trim();

    // Environment configured credentials with default fallback
    const validEmail = (process.env.ADMIN_EMAIL || 'admin@securehomevizag.com').trim().toLowerCase();
    const validPassword = process.env.ADMIN_PASSWORD || 'SecureHome@2026!';

    let isAuthenticated = false;

    // 1. Direct verify against admin credentials
    if (inputEmail === validEmail && inputPassword === validPassword) {
      isAuthenticated = true;
    }

    // 2. Also support Supabase Auth if credentials match a registered user
    if (!isAuthenticated) {
      const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
      const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

      if (
        supabaseUrl &&
        supabaseAnonKey &&
        !supabaseUrl.includes('your-project') &&
        !supabaseAnonKey.includes('your-anon-key')
      ) {
        try {
          const supabase = createServerClient(supabaseUrl, supabaseAnonKey, {
            cookies: {
              getAll() {
                return req.cookies.getAll();
              },
              setAll() {},
            },
          });

          const { data, error } = await supabase.auth.signInWithPassword({
            email: inputEmail,
            password: inputPassword,
          });

          if (!error && data?.user) {
            isAuthenticated = true;
          }
        } catch {
          // Fall through to failure
        }
      }
    }

    if (!isAuthenticated) {
      return NextResponse.json(
        { error: 'Invalid email address or password' },
        { status: 401 }
      );
    }

    // Create response with secure HTTP-only cookie
    const response = NextResponse.json({
      success: true,
      redirect: '/admin',
    });

    const isProduction = process.env.NODE_ENV === 'production';

    response.cookies.set('admin_session', 'authenticated', {
      httpOnly: true,
      secure: isProduction,
      sameSite: 'lax',
      path: '/',
      maxAge: 60 * 60 * 24 * 7, // 7 days
    });

    return response;
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : 'Authentication failed';
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}
