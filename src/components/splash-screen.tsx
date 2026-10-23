'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';

export function SplashScreen() {
  const [mounted, setMounted] = useState(false);
  const [progress, setProgress] = useState(0);
  const [statusText, setStatusText] = useState('Initializing Sanctuary...');
  const [isExiting, setIsExiting] = useState(false);
  const [isFinished, setIsFinished] = useState(false);

  useEffect(() => {
    // Check if splash was already shown in this tab session
    const hasShown = sessionStorage.getItem('shv_splash_shown');
    const isForceSplash = typeof window !== 'undefined' && window.location.search.includes('splash=1');

    if (hasShown && !isForceSplash) {
      setIsFinished(true);
      return;
    }

    setMounted(true);
    // Lock scroll while splash is active
    document.body.style.overflow = 'hidden';

    // Status message stages
    const stages = [
      { at: 20, text: 'Curating Coastal Sanctuaries...' },
      { at: 55, text: 'Verifying 100% Legal Clearances...' },
      { at: 85, text: 'Connecting Visakhapatnam Real Estate...' },
      { at: 100, text: 'Welcome to Secure Home Vizag' },
    ];

    // Smooth progress counter simulation
    const startTime = Date.now();
    const duration = 2100; // 2.1 seconds optimal splash duration

    const interval = setInterval(() => {
      const elapsed = Date.now() - startTime;
      const rawProgress = Math.min(100, Math.floor((elapsed / duration) * 100));

      // Non-linear easing for natural luxury feel
      const easedProgress = Math.min(
        100,
        Math.floor(Math.sin((rawProgress / 100) * (Math.PI / 2)) * 100)
      );

      setProgress(easedProgress);

      const currentStage = [...stages].reverse().find((s) => easedProgress >= s.at);
      if (currentStage) {
        setStatusText(currentStage.text);
      }

      if (rawProgress >= 100) {
        clearInterval(interval);
        setTimeout(() => {
          triggerExit();
        }, 300);
      }
    }, 28);

    const triggerExit = () => {
      setIsExiting(true);
      sessionStorage.setItem('shv_splash_shown', 'true');
      document.body.style.overflow = '';
      setTimeout(() => {
        setIsFinished(true);
      }, 750); // Match curtain exit animation duration
    };

    return () => {
      clearInterval(interval);
      document.body.style.overflow = '';
    };
  }, []);

  const handleSkip = () => {
    setIsExiting(true);
    sessionStorage.setItem('shv_splash_shown', 'true');
    document.body.style.overflow = '';
    setTimeout(() => {
      setIsFinished(true);
    }, 450);
  };

  if (!mounted || isFinished) return null;

  return (
    <div
      id="splash-screen"
      role="dialog"
      aria-modal="true"
      aria-label="Secure Home Vizag Loading Screen"
      className={`fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-[#070B14] select-none transition-all duration-700 ease-[cubic-bezier(0.77,0,0.175,1)] ${
        isExiting ? '-translate-y-full opacity-90' : 'translate-y-0 opacity-100'
      }`}
    >
      {/* Ambient Radial Luxury Glows */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[550px] h-[550px] rounded-full pointer-events-none opacity-40 blur-[120px] transition-opacity duration-1000"
        style={{
          background: 'radial-gradient(circle, rgba(14,138,148,0.4) 0%, rgba(20,33,84,0.3) 50%, transparent 70%)',
        }}
      />
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[350px] h-[350px] rounded-full pointer-events-none opacity-30 blur-[90px]"
        style={{
          background: 'radial-gradient(circle, rgba(194,65,12,0.35) 0%, rgba(76,168,43,0.2) 60%, transparent 80%)',
        }}
      />

      {/* Subtle Architectural Fine Line Grid */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.035]"
        style={{
          backgroundImage:
            'linear-gradient(to right, #ffffff 1px, transparent 1px), linear-gradient(to bottom, #ffffff 1px, transparent 1px)',
          backgroundSize: '48px 48px',
        }}
      />

      {/* Decorative Luxury Corner Accents */}
      <div className="absolute top-6 left-6 w-8 h-8 border-t border-l border-white/20 pointer-events-none" />
      <div className="absolute top-6 right-6 w-8 h-8 border-t border-r border-white/20 pointer-events-none" />
      <div className="absolute bottom-6 left-6 w-8 h-8 border-b border-l border-white/20 pointer-events-none" />
      <div className="absolute bottom-6 right-6 w-8 h-8 border-b border-r border-white/20 pointer-events-none" />

      {/* Skip Button */}
      <button
        type="button"
        onClick={handleSkip}
        className="absolute top-6 right-6 z-20 text-[11px] tracking-[0.2em] uppercase text-white/50 hover:text-white border border-white/10 hover:border-white/30 rounded-full px-4 py-1.5 transition-all duration-200 cursor-pointer backdrop-blur-sm"
        aria-label="Skip splash introduction"
      >
        Skip
      </button>

      {/* Main Brand Presentation Container */}
      <div
        className={`relative z-10 flex flex-col items-center max-w-md px-6 text-center transition-all duration-500 transform ${
          isExiting ? 'scale-95 opacity-0' : 'scale-100 opacity-100'
        }`}
      >
        {/* Luminous Emblem Showcase */}
        <div className="relative mb-6 group">
          {/* Pulsing Backlight Halo */}
          <div className="absolute -inset-4 bg-gradient-to-r from-emerald-500/20 via-cyan-500/20 to-orange-500/20 rounded-full blur-xl animate-pulse" />

          {/* Golden/Teal Fine Circular Orbit Ring */}
          <div
            className="absolute -inset-3 rounded-full border border-white/10 animate-[spin_12s_linear_infinite] pointer-events-none"
            style={{ borderTopColor: 'rgba(20,184,166,0.6)', borderBottomColor: 'rgba(194,65,12,0.4)' }}
          />

          {/* SVG Shield Emblem */}
          <div className="relative w-24 h-24 sm:w-28 sm:h-28 flex items-center justify-center p-2 rounded-2xl bg-[#0D1527]/80 border border-white/10 shadow-2xl backdrop-blur-md">
            <Image
              src="/brand/favicon.svg"
              alt="Secure Home Vizag Emblem"
              width={80}
              height={80}
              priority
              className="w-16 h-16 sm:w-20 sm:h-20 drop-shadow-[0_8px_16px_rgba(0,0,0,0.5)] transition-transform duration-700 ease-out hover:scale-105"
            />
          </div>
        </div>

        {/* Brand Name Typography */}
        <div className="space-y-1 mb-2">
          <h1 className="font-heading text-2xl sm:text-3xl text-white tracking-tight flex items-center justify-center gap-1.5">
            <span className="font-bold text-transparent bg-clip-text bg-gradient-to-r from-white via-slate-100 to-slate-300">
              Secure
            </span>
            <span className="font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#4CA82B] via-[#68BA31] to-[#84CC16]">
              Home
            </span>
          </h1>

          {/* Tracked Visakhapatnam Crest Badge */}
          <div className="flex items-center justify-center gap-3 pt-1">
            <span className="h-[1px] w-6 sm:w-10 bg-gradient-to-r from-transparent to-white/30" />
            <p className="text-[11px] sm:text-xs font-semibold tracking-[0.35em] uppercase text-white/70">
              Visakhapatnam
            </p>
            <span className="h-[1px] w-6 sm:w-10 bg-gradient-to-l from-transparent to-white/30" />
          </div>
        </div>

        {/* Curated Subtitle */}
        <p className="text-xs sm:text-[13px] text-white/50 tracking-wider font-light mt-1 mb-7 max-w-xs">
          Premium Real Estate • Verified Clearances
        </p>

        {/* High-End Minimalist Loading Bar */}
        <div className="w-64 sm:w-72 flex flex-col items-center gap-2.5">
          {/* Progress Track */}
          <div className="w-full h-[3px] bg-white/10 rounded-full overflow-hidden p-[0.5px] backdrop-blur-sm relative">
            <div
              className="h-full rounded-full transition-all duration-150 ease-out bg-gradient-to-r from-[#14B8A6] via-[#4CA82B] to-[#C2410C]"
              style={{ width: `${progress}%` }}
            />
            {/* Shimmer Light Lead */}
            <div
              className="absolute top-0 bottom-0 w-6 bg-gradient-to-r from-transparent via-white/80 to-transparent blur-[1px] transition-all duration-150"
              style={{ left: `calc(${progress}% - 12px)` }}
            />
          </div>

          {/* Stage Status & Dynamic Percentage */}
          <div className="w-full flex items-center justify-between text-[11px] font-mono text-white/40 tracking-wider px-0.5">
            <span className="text-white/60 truncate max-w-[180px] sm:max-w-[210px] text-left animate-pulse">
              {statusText}
            </span>
            <span className="font-semibold text-white/80">{progress}%</span>
          </div>
        </div>
      </div>

      {/* Footer Discreet Credential */}
      <div className="absolute bottom-5 text-center text-[10px] tracking-[0.25em] uppercase text-white/25">
        Secure Homes Vizag • Coastal Living Sanctum
      </div>
    </div>
  );
}
