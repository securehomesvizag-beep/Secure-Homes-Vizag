'use client';

import { useState, useEffect } from 'react';

export type Breakpoint = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl';

export interface ResponsiveState {
  isMobile: boolean; // < 768px
  isTablet: boolean; // >= 768px && < 1024px
  isDesktop: boolean; // >= 1024px
  isSmallMobile: boolean; // < 480px
  isTouch: boolean;
  width: number;
  height: number;
  breakpoint: Breakpoint;
  isMounted: boolean;
  isAtLeast: (bp: Breakpoint) => boolean;
  isAtMost: (bp: Breakpoint) => boolean;
}

const BREAKPOINT_WIDTHS: Record<Breakpoint, number> = {
  xs: 0,
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
  '2xl': 1536,
};

function getBreakpoint(width: number): Breakpoint {
  if (width >= BREAKPOINT_WIDTHS['2xl']) return '2xl';
  if (width >= BREAKPOINT_WIDTHS.xl) return 'xl';
  if (width >= BREAKPOINT_WIDTHS.lg) return 'lg';
  if (width >= BREAKPOINT_WIDTHS.md) return 'md';
  if (width >= BREAKPOINT_WIDTHS.sm) return 'sm';
  return 'xs';
}

export function useResponsive(): ResponsiveState {
  const [state, setState] = useState<{
    width: number;
    height: number;
    isMounted: boolean;
    isTouch: boolean;
  }>({
    width: 1200, // Safe SSR default
    height: 800,
    isMounted: false,
    isTouch: false,
  });

  useEffect(() => {
    const updateDimensions = () => {
      const width = window.innerWidth;
      const height = window.innerHeight;
      const isTouch =
        'ontouchstart' in window ||
        navigator.maxTouchPoints > 0 ||
        window.matchMedia('(pointer: coarse)').matches;

      setState({
        width,
        height,
        isMounted: true,
        isTouch,
      });
    };

    updateDimensions();

    let timeoutId: ReturnType<typeof setTimeout> | null = null;
    const handleResize = () => {
      if (timeoutId) clearTimeout(timeoutId);
      timeoutId = setTimeout(updateDimensions, 66); // ~15fps debounce for buttery performance
    };

    window.addEventListener('resize', handleResize, { passive: true });
    window.addEventListener('orientationchange', updateDimensions, { passive: true });

    return () => {
      if (timeoutId) clearTimeout(timeoutId);
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('orientationchange', updateDimensions);
    };
  }, []);

  const width = state.width;
  const height = state.height;
  const breakpoint = getBreakpoint(width);

  const isMobile = width < BREAKPOINT_WIDTHS.md;
  const isTablet = width >= BREAKPOINT_WIDTHS.md && width < BREAKPOINT_WIDTHS.lg;
  const isDesktop = width >= BREAKPOINT_WIDTHS.lg;
  const isSmallMobile = width < 480;

  const isAtLeast = (bp: Breakpoint) => width >= BREAKPOINT_WIDTHS[bp];
  const isAtMost = (bp: Breakpoint) => width < (BREAKPOINT_WIDTHS[bp] || Infinity);

  return {
    isMobile,
    isTablet,
    isDesktop,
    isSmallMobile,
    isTouch: state.isTouch,
    width,
    height,
    breakpoint,
    isMounted: state.isMounted,
    isAtLeast,
    isAtMost,
  };
}
