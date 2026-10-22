declare namespace NodeJS {
  interface ProcessEnv {
    NEXT_PUBLIC_SUPABASE_URL?: string;
    NEXT_PUBLIC_SUPABASE_ANON_KEY?: string;
    NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY?: string;
    SUPABASE_SERVICE_ROLE_KEY?: string;
    NEXT_PUBLIC_SITE_URL?: string;
    ADMIN_EMAIL?: string;
    ADMIN_PASSWORD?: string;
    [key: string]: string | undefined;
  }
}

declare const process: {
  env: NodeJS.ProcessEnv;
};

interface CookieItem {
  name: string;
  value: string;
  options?: Record<string, unknown>;
}

declare global {
  var __listings_store: any;
  var __settings_store: any;
  var __testimonials_store: any;
  var __leads_store: any;
}

// Global Next.js ambient module declaration
declare module 'next' {
  export interface Metadata {
    title?: string | { default: string; template?: string };
    description?: string;
    keywords?: string | string[];
    authors?: Array<{ name: string; url?: string }>;
    openGraph?: Record<string, unknown>;
    robots?: Record<string, unknown>;
    icons?: Record<string, unknown>;
    metadataBase?: URL;
    [key: string]: unknown;
  }

  export namespace MetadataRoute {
    export interface SitemapItem {
      url: string;
      lastModified?: string | Date;
      changeFrequency?: 'always' | 'hourly' | 'daily' | 'weekly' | 'monthly' | 'yearly' | 'never';
      priority?: number;
    }
    export type Sitemap = SitemapItem[];

    export interface Robots {
      rules: {
        userAgent?: string | string[];
        allow?: string | string[];
        disallow?: string | string[];
        crawlDelay?: number;
      } | Array<{
        userAgent: string | string[];
        allow?: string | string[];
        disallow?: string | string[];
        crawlDelay?: number;
      }>;
      sitemap?: string | string[];
      host?: string;
    }
  }

  export type NextPage<P = Record<string, unknown>, IP = P> = import('react').ComponentType<P> & {
    getInitialProps?(context: unknown): IP | Promise<IP>;
  };
}

// Fallback ambient module definitions to resolve TypeScript IDE errors while node_modules syncs
declare module 'next/navigation' {
  export function useRouter(): {
    push(url: string): void;
    replace(url: string): void;
    refresh(): void;
    back(): void;
    forward(): void;
    prefetch(url: string): void;
  };
  export function usePathname(): string;
  export function useSearchParams(): URLSearchParams;
  export function useParams<T = Record<string, string | string[]>>(): T;
  export function redirect(url: string): never;
  export function notFound(): never;
}

declare module 'next/image' {
  import * as React from 'react';
  export interface ImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
    src: string | unknown;
    alt: string;
    width?: number | string;
    height?: number | string;
    fill?: boolean;
    priority?: boolean;
    quality?: number;
    unoptimized?: boolean;
    sizes?: string;
    className?: string;
  }
  const Image: React.FC<ImageProps>;
  export default Image;
}

declare module 'next/link' {
  import * as React from 'react';
  export interface LinkProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
    href: string;
    replace?: boolean;
    scroll?: boolean;
    prefetch?: boolean;
    className?: string;
    children?: React.ReactNode;
  }
  const Link: React.FC<LinkProps>;
  export default Link;
}

declare module '@phosphor-icons/react' {
  import * as React from 'react';
  export interface IconProps extends React.SVGProps<SVGSVGElement> {
    size?: number | string;
    color?: string;
    weight?: 'thin' | 'light' | 'regular' | 'bold' | 'fill' | 'duotone';
    mirrored?: boolean;
    className?: string;
  }
  export type Icon = React.FC<IconProps>;
  export const List: Icon;
  export const X: Icon;
  export const Phone: Icon;
  export const WhatsappLogo: Icon;
  export const InstagramLogo: Icon;
  export const YoutubeLogo: Icon;
  export const Clock: Icon;
  export const ArrowsOutSimple: Icon;
  export const ChartLine: Icon;
  export const Users: Icon;
  export const HouseLine: Icon;
  export const ChatText: Icon;
  export const Gear: Icon;
  export const SignOut: Icon;
  export const ArrowUpRight: Icon;
  export const Check: Icon;
  export const Trash: Icon;
  export const PencilSimple: Icon;
  export const Plus: Icon;
  export const Eye: Icon;
  export const EyeSlash: Icon;
  export const DownloadSimple: Icon;
  export const Funnel: Icon;
  export const MagnifyingGlass: Icon;
  export const ShieldCheck: Icon;
  export const Buildings: Icon;
  export const MapPin: Icon;
  export const Calendar: Icon;
  export const CaretDown: Icon;
  export const CaretUp: Icon;
  export const ArrowRight: Icon;
  export const ArrowLeft: Icon;
}

declare module '@phosphor-icons/react/dist/ssr' {
  export * from '@phosphor-icons/react';
}
