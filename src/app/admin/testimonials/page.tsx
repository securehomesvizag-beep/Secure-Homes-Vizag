import React from 'react';
import { getAllTestimonialsForAdmin } from '@/lib/data';
import { TestimonialsManager } from './testimonials-manager';

export default async function AdminTestimonialsPage() {
  const testimonials = await getAllTestimonialsForAdmin();

  return (
    <div className="space-y-6 fade-in">
      <div>
        <h1 className="font-heading text-2xl md:text-3xl text-[var(--ink)] mb-1">
          Client Testimonials
        </h1>
        <p className="text-sm text-[var(--text)]">
          Manage real customer reviews. Visible entries will be shown in the homepage feedback section.
        </p>
      </div>

      <TestimonialsManager initialTestimonials={testimonials} />
    </div>
  );
}
