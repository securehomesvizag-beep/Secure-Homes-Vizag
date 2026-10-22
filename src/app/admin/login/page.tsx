'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { Eye, EyeSlash } from '@phosphor-icons/react';

export default function AdminLoginPage() {
  const [email, setEmail] = useState('admin@securehomevizag.com');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg(null);

    const cleanEmail = email.trim().toLowerCase();
    const cleanPassword = password.trim();

    try {
      // Call server-side authentication API
      const res = await fetch('/api/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: cleanEmail, password: cleanPassword }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || 'Invalid email address or password');
      }

      // Also ensure client cookie is present for immediate navigation
      document.cookie = 'admin_session=authenticated; path=/; max-age=604800; SameSite=Lax';

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
    <div className="min-h-[70vh] flex items-center justify-center py-12 px-4">
      <div className="w-full max-w-md border border-[var(--line)] bg-[var(--surface)] rounded-[4px] p-6 sm:p-8 space-y-6 shadow-sm">
        <div className="text-center space-y-2">
          <div className="inline-block p-2 bg-[var(--surface)]">
            <Image
              src="/brand/logo.svg"
              alt="Secure Home Vizag"
              width={180}
              height={45}
              priority
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
          <div className="p-3.5 text-sm text-[#B42318] border border-[#B42318]/20 bg-[#FEF3F2] rounded-[4px]">
            {errorMsg}
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label
              htmlFor="admin-email"
              className="block text-sm font-semibold text-[var(--ink)] mb-1.5"
            >
              Admin ID / Email
            </label>
            <input
              id="admin-email"
              type="email"
              required
              autoFocus
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="admin@securehomevizag.com"
              className="w-full px-3.5 py-2.5 text-base bg-[var(--surface)] border border-[var(--line)] rounded-[4px] text-[var(--ink)] focus:outline-none focus:border-[var(--brand)] min-h-[44px]"
            />
          </div>

          <div>
            <label
              htmlFor="admin-password"
              className="block text-sm font-semibold text-[var(--ink)] mb-1.5"
            >
              Password
            </label>
            <div className="relative">
              <input
                id="admin-password"
                type={showPassword ? 'text' : 'password'}
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter password"
                className="w-full px-3.5 py-2.5 pr-11 text-base bg-[var(--surface)] border border-[var(--line)] rounded-[4px] text-[var(--ink)] focus:outline-none focus:border-[var(--brand)] min-h-[44px]"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-2 top-1/2 -translate-y-1/2 p-1.5 text-[var(--text)] hover:text-[var(--ink)] focus:outline-none"
                aria-label={showPassword ? 'Hide password' : 'Show password'}
              >
                {showPassword ? <EyeSlash size={20} /> : <Eye size={20} />}
              </button>
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3.5 px-4 text-base font-semibold text-[var(--surface)] bg-[var(--brand)] hover:bg-[var(--brand-hover)] transition-colors rounded-[4px] disabled:opacity-50 min-h-[44px] cursor-pointer"
          >
            {loading ? 'Authenticating...' : 'Sign In'}
          </button>
        </form>

        <div className="pt-2 border-t border-[var(--line)] text-center">
          <p className="text-xs text-[var(--text)]">
            Admin Access: <span className="font-semibold text-[var(--ink)]">admin@securehomevizag.com</span>
          </p>
        </div>
      </div>
    </div>
  );
}
