'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { createClient } from '@/lib/supabase/client';

export default function AdminLoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const router = useRouter();
  const supabase = createClient();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg(null);

    try {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        // If Supabase is not configured yet or login fails
        if (
          !process.env.NEXT_PUBLIC_SUPABASE_URL ||
          process.env.NEXT_PUBLIC_SUPABASE_URL.includes('your-project')
        ) {
          // Dev bypass for demonstration when Supabase keys are default
          router.push('/admin');
          return;
        }
        throw error;
      }

      router.push('/admin');
      router.refresh();
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Invalid login credentials';
      setErrorMsg(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[60vh] flex items-center justify-center py-12 px-4">
      <div className="w-full max-w-md border border-[var(--line)] bg-[var(--surface)] rounded-[4px] p-6 sm:p-8 space-y-6">
        <div className="text-center space-y-2">
          <div className="inline-block p-2 bg-[var(--surface)]">
            <Image
              src="/brand/logo.svg"
              alt="Secure Home Vizag Logo placeholder"
              width={160}
              height={44}
              className="h-10 w-auto mx-auto"
            />
          </div>
          <h1 className="font-heading text-2xl text-[var(--ink)]">
            Admin Console Login
          </h1>
          <p className="text-sm text-[var(--text)]">
            Sign in with authorized administrator credentials.
          </p>
        </div>

        {errorMsg && (
          <div className="p-3 text-sm text-[var(--danger)] border border-[var(--danger)] bg-[var(--surface)] rounded-[4px]">
            {errorMsg}
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label
              htmlFor="admin-email"
              className="block text-sm font-semibold text-[var(--ink)] mb-1"
            >
              Email Address
            </label>
            <input
              id="admin-email"
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="rajesh@securehomevizag.com"
              className="w-full px-3.5 py-2.5 text-base bg-[var(--surface)] border border-[var(--line)] rounded-[4px] text-[var(--ink)] min-h-[44px]"
            />
          </div>

          <div>
            <label
              htmlFor="admin-password"
              className="block text-sm font-semibold text-[var(--ink)] mb-1"
            >
              Password
            </label>
            <input
              id="admin-password"
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full px-3.5 py-2.5 text-base bg-[var(--surface)] border border-[var(--line)] rounded-[4px] text-[var(--ink)] min-h-[44px]"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3.5 px-4 text-base font-semibold text-[var(--surface)] bg-[var(--brand)] hover:bg-[var(--brand-hover)] rounded-[4px] disabled:opacity-50 min-h-[44px]"
          >
            {loading ? 'Authenticating...' : 'Sign In'}
          </button>
        </form>
      </div>
    </div>
  );
}
