import React from 'react';
import Image from 'next/image';
import { Metadata } from 'next';
import { LeadActionButtons } from '@/components/lead-action-buttons';

export const metadata: Metadata = {
  title: 'About Rajesh Ponnada | Secure Home Vizag',
  description:
    'Meet Rajesh Ponnada, founder of Secure Home Vizag with 10+ years of transparent real estate advisory across Visakhapatnam.',
};

export default function AboutPage() {
  const steps = [
    {
      step: '01',
      title: 'Requirement Alignment',
      description:
        'We discuss your preferred property type, budget, and purpose (own residence, land investment, or commercial use) without aggressive sales pressure.',
    },
    {
      step: '02',
      title: 'Paperwork and Title Verification',
      description:
        'We verify link documents for 30 years, check for encumbrance certificates, verify layout status (VMRDA or local body permissions), and confirm survey boundaries.',
    },
    {
      step: '03',
      title: 'Physical Site Inspection',
      description:
        'We arrange an on-ground site visit in Visakhapatnam to inspect approach roads, water availability, electricity infrastructure, and neighboring plots.',
    },
    {
      step: '04',
      title: 'Direct Price Agreement in Writing',
      description:
        'All pricing is agreed directly with clear payment milestones written down. No surprise broker fees or concealed commissions.',
    },
    {
      step: '05',
      title: 'Registration and Mutation Support',
      description:
        'We assist in preparing the deed with legal professionals, coordinating sub-registrar appointments, and ensuring smooth revenue record mutation.',
    },
  ];

  const serviceAreas = [
    { name: 'Beach Corridor & Bheemili', note: 'Scenic coastal layouts, luxury villas, and long-term land' },
    { name: 'Madhurawada & Rushikonda', note: 'IT hub proximity, gated apartments, and family residences' },
    { name: 'Anandapuram Junction', note: 'Rapidly expanding highway growth corridor for residential plots' },
    { name: 'Yendada & MVP Colony', note: 'Prime established city zones with close access to urban amenities' },
    { name: 'Gajuwaka & Steel Plant Area', note: 'Industrial belt commercial spaces, independent houses, and flats' },
    { name: 'Pendurthi & Sujatha Nagar', note: 'Active residential belts with affordable housing and plots' },
  ];

  return (
    <div className="fade-in max-w-[1200px] mx-auto px-4 sm:px-6 py-12 md:py-16 space-y-16">
      {/* Intro Split Section */}
      <section className="grid grid-cols-1 md:grid-cols-12 gap-10 items-center">
        <div className="md:col-span-5">
          <div className="relative w-full h-[420px] bg-[var(--line)] border border-[var(--line)] rounded-[4px] overflow-hidden">
            <Image
              src="/placeholders/rajesh-ponnada.svg"
              alt="Rajesh Ponnada, Founder of Secure Home Vizag"
              fill
              priority
              className="object-cover"
            />
          </div>
        </div>
        <div className="md:col-span-7 space-y-5">
          <span className="text-xs font-semibold uppercase tracking-wider text-[var(--brand)]">
            Founder & Property Consultant
          </span>
          <h1 className="font-heading text-3xl sm:text-4xl md:text-5xl text-[var(--ink)]">
            Rajesh Ponnada
          </h1>
          <p className="text-lg text-[var(--ink)] font-semibold">
            Brand Promise: &quot;Transparent and Reliable&quot;
          </p>
          <p className="text-base text-[var(--text)] leading-relaxed">
            I founded Secure Home Vizag with a simple commitment: providing buyers and property owners in Visakhapatnam with factual, reliable property advisory. Over 10+ years in the local market, I have focused on plots, flats, independent villas, and commercial spaces with verifiable titles.
          </p>
          <p className="text-base text-[var(--text)] leading-relaxed">
            Real estate decisions are substantial life commitments. Whether you are buying your first home plot, building a villa near the coast, or investing from overseas as an NRI, you receive direct communication, written quotes, and verified documentation.
          </p>
          <LeadActionButtons variant="hero" />
        </div>
      </section>

      {/* How the Process Works (Numbered List) */}
      <section className="border-t border-[var(--line)] pt-14 space-y-8">
        <div>
          <h2 className="font-heading text-2xl md:text-3xl text-[var(--ink)] mb-2">
            How the Advisory Process Works
          </h2>
          <p className="text-[var(--text)] text-base">
            A step-by-step approach ensuring legal safety and financial transparency for every deal.
          </p>
        </div>

        <div className="divide-y divide-[var(--line)] border border-[var(--line)] bg-[var(--surface)] rounded-[4px]">
          {steps.map((s) => (
            <div key={s.step} className="p-6 sm:p-8 flex items-start gap-6">
              <span className="font-heading text-3xl font-semibold text-[var(--brand)] flex-shrink-0">
                {s.step}
              </span>
              <div className="space-y-1">
                <h3 className="font-heading text-lg sm:text-xl text-[var(--ink)]">
                  {s.title}
                </h3>
                <p className="text-sm sm:text-base text-[var(--text)] leading-relaxed">
                  {s.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Service Areas in Visakhapatnam */}
      <section className="border-t border-[var(--line)] pt-14 space-y-8">
        <div>
          <h2 className="font-heading text-2xl md:text-3xl text-[var(--ink)] mb-2">
            Service Areas in Visakhapatnam
          </h2>
          <p className="text-[var(--text)] text-base">
            Active brokerage and legal verification across core municipal and VMRDA growth sectors.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {serviceAreas.map((area) => (
            <div
              key={area.name}
              className="p-5 border border-[var(--line)] bg-[var(--surface)] rounded-[4px] space-y-1.5"
            >
              <h3 className="font-heading text-lg text-[var(--ink)]">
                {area.name}
              </h3>
              <p className="text-sm text-[var(--text)] leading-relaxed">
                {area.note}
              </p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
