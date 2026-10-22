import React from 'react';
import { Metadata } from 'next';
import { AdminNav } from '@/components/admin-nav';

export const metadata: Metadata = {
  title: 'Admin Console | Secure Home Vizag',
  robots: {
    index: false,
    follow: false,
  },
};

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="max-w-[1200px] mx-auto px-4 sm:px-6 py-8 md:py-12">
      <AdminNav />
      {children}
    </div>
  );
}
