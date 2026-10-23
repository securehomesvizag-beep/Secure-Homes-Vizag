'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';

export function SplashScreen() {
  const [mounted, setMounted] = useState(false);
  const [progress, setProgress] = useState(0);
  const [statusText, setStatusText] = useState('Initializing Secure Home Vizag...');
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

    // Status milestones for genuine real estate credibility
    const stages = [
      { at: 15, text: 'Connecting Visakhapatnam Properties...' },
      { at: 45, text: 'Verifying 100% Legal Clearances...' },
      { at: 75, text: 'Preparing Verified Plots, Flats & Villas...' },
      { at: 95, text: 'Welcome to Secure Home Vizag' },
    ];

    const startTime = Date.now();
    const duration = 1900; // 1.9s fast, snappy, professional

    const interval = setInterval(() => {
      const elapsed = Date.now() - startTime;
      const rawProgress = Math.min(100, Math.floor((elapsed / duration) * 100));

      // Gentle ease-out for natural progress feel
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
        }, 220);
      }
    }, 25);

    const triggerExit = () => {
      setIsExiting(true);
      sessionStorage.setItem('shv_splash_shown', 'true');
      document.body.style.overflow = '';
      setTimeout(() => {
        setIsFinished(true);
      }, 550);
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
    }, 350);
  };

  if (!mounted || isFinished) return null;

  return (
    <div
      id="splash-screen"
      role="dialog"
      aria-modal="true"
      aria-label="Secure Home Vizag Loading Screen"
      className={`fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-[#FAF7F2] select-none transition-all duration-600 ease-out ${
        isExiting ? 'opacity-0 scale-[0.98] pointer-events-none' : 'opacity-100 scale-100'
      }`}
    >
      {/* Clean Architectural Subtle Grid Lines */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.4]"
        style={{
          backgroundImage:
            'linear-gradient(to right, #E7E0D5 1px, transparent 1px), linear-gradient(to bottom, #E7E0D5 1px, transparent 1px)',
          backgroundSize: '40px 40px',
        }}
      />

      {/* Discrete Skip Button */}
      <button
        type="button"
        onClick={handleSkip}
        className="absolute top-6 right-6 z-20 text-[11px] font-semibold tracking-[0.15em] uppercase text-[#4B4F58] hover:text-[#14213D] bg-[#FFFEFB] hover:bg-white border border-[#E7E0D5] hover:border-[#C2410C] rounded-full px-4 py-1.5 shadow-xs transition-all duration-200 cursor-pointer"
        aria-label="Skip splash screen"
      >
        Skip
      </button>

      {/* Centerpiece Showcase Card */}
      <div className="relative z-10 flex flex-col items-center max-w-sm px-8 py-10 bg-[#FFFEFB] border border-[#E7E0D5] rounded-xl shadow-[0_12px_36px_rgba(20,33,61,0.06)] text-center mx-4">
        {/* Official Brand Logo */}
        <div className="relative mb-6 flex items-center justify-center">
          <Image
            src="/brand/logo-stacked.svg"
            alt="Secure Home Vizag"
            width={220}
            height={170}
            priority
            className="w-44 sm:w-48 h-auto object-contain transition-transform duration-500 hover:scale-105"
          />
        </div>

        {/* Tagline */}
        <p className="text-xs sm:text-[13px] font-medium text-[#4B4F58] tracking-wide mb-6">
          Verified Real Estate Advisory • Visakhapatnam
        </p>

        {/* Minimalist Professional Loading Bar */}
        <div className="w-full space-y-2.5">
          {/* Progress Bar Track */}
          <div className="w-full h-1.5 bg-[#E7E0D5] rounded-full overflow-hidden relative">
            <div
              className="h-full bg-[#C2410C] rounded-full transition-all duration-150 ease-out"
              style={{ width: `${progress}%` }}
            />
          </div>

          {/* Status Text & Numerical Percentage */}
          <div className="w-full flex items-center justify-between text-[11px] text-[#4B4F58] font-medium">
            <span className="truncate max-w-[190px] text-left text-[11px] text-[#4B4F58]">
              {statusText}
            </span>
            <span className="font-semibold text-[#14213D] font-mono">{progress}%</span>
          </div>
        </div>

        {/* Quality Badges */}
        <div className="mt-6 pt-5 border-t border-[#E7E0D5] w-full flex items-center justify-center gap-4 text-[10px] font-semibold tracking-wider uppercase text-[#14213D]/70">
          <span className="flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-[#2F6B4F]" />
            100% VMRDA & RERA
          </span>
          <span className="text-[#E7E0D5]">•</span>
          <span className="flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-[#C2410C]" />
            Verified Titles
          </span>
        </div>
      </div>

      {/* Footer Legal & Local Stamp */}
      <div className="absolute bottom-6 text-center text-[11px] tracking-wider text-[#4B4F58]/70">
        10+ Years Local Real Estate Experience in Visakhapatnam
      </div>
    </div>
  );
}
