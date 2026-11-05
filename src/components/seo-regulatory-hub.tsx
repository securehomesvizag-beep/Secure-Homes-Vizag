import React from 'react';
import Link from 'next/link';
import { ShieldCheck } from '@phosphor-icons/react/dist/ssr';

export const VIZAG_PRICE_BENCHMARKS = [
  {
    locality: 'Anandapuram Junction',
    category: 'High-Growth Plotted Hub',
    propertyTypes: 'VMRDA Approved Plots',
    pricingGuidance: 'Price on Request',
    appreciation: '18% – 25% p.a.',
    growthTrigger: 'NH-16 Expansion & Bhogapuram Airport Corridor',
  },
  {
    locality: 'Bhogapuram Airport Corridor',
    category: 'Airport Land Banking',
    propertyTypes: 'Gated Township Plots',
    pricingGuidance: 'Price on Request',
    appreciation: '22% – 30% p.a.',
    growthTrigger: 'Upcoming International Airport & GMR Aerocity',
  },
  {
    locality: 'Madhurawada IT Corridor',
    category: 'Prime Residential & Rental',
    propertyTypes: '2 & 3 BHK Flats, Plots',
    pricingGuidance: 'Price on Request',
    appreciation: '12% – 16% p.a.',
    growthTrigger: 'IT SEZ, Cognizant, Adani Data Center & Top Schools',
  },
  {
    locality: 'Rushikonda & Beach Road',
    category: 'Luxury Ocean-View Corridor',
    propertyTypes: 'Luxury Villas & Sea-View Flats',
    pricingGuidance: 'Price on Request',
    appreciation: '15% – 20% p.a.',
    growthTrigger: 'Coastal Tourism, Gitam University & Executive Villas',
  },
  {
    locality: 'Bheemili Beach Corridor',
    category: 'Coastal Villas & Holiday Plots',
    propertyTypes: 'Beach Villas & Approved Plots',
    pricingGuidance: 'Price on Request',
    appreciation: '16% – 22% p.a.',
    growthTrigger: 'Beach Road Widening, Resorts & Gated Villa Estates',
  },
  {
    locality: 'Yendada',
    category: 'Mid-to-Luxury Urban Living',
    propertyTypes: 'Modern Gated Apartments',
    pricingGuidance: 'Price on Request',
    appreciation: '12% – 15% p.a.',
    growthTrigger: 'Close to City Center, Beach Proximity & Peaceful Belt',
  },
  {
    locality: 'Gajuwaka Commercial Hub',
    category: 'Commercial & High Footfall Retail',
    propertyTypes: 'Commercial Spaces & Plots',
    pricingGuidance: 'Price on Request',
    appreciation: '10% – 14% p.a.',
    growthTrigger: 'Steel Plant, Seaport Logistics & Highway Commerce',
  },
  {
    locality: 'Pendurthi & Sujatha Nagar',
    category: 'Affordable Residential Corridor',
    propertyTypes: 'Residential Plots & 2 BHK Flats',
    pricingGuidance: 'Price on Request',
    appreciation: '12% – 15% p.a.',
    growthTrigger: 'BRTS Corridor, Railway Station & Suburban Expansion',
  },
];

export function VizagPriceBenchmarkTable() {
  return (
    <div className="bg-[var(--surface)] border border-[var(--line)] rounded-[4px] p-6 space-y-4">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-[var(--line)] pb-4">
        <div>
          <h3 className="font-heading text-xl md:text-2xl font-semibold text-[var(--ink)]">
            Visakhapatnam Real Estate Growth &amp; Corridor Intelligence Index (2026)
          </h3>
          <p className="text-sm text-[var(--text)] mt-1">
            Authoritative, ground-verified property corridor insights, growth catalysts, and appreciation trends across Vizag.
          </p>
        </div>
        <span className="self-start sm:self-auto px-3 py-1 text-xs font-semibold bg-[#eaf4ef] text-[var(--success)] border border-[#bcdbc9] rounded-[4px]">
          Updated Q4 2026
        </span>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse text-sm">
          <thead>
            <tr className="bg-[var(--bg)] border-b border-[var(--line)] text-[var(--ink)] font-semibold">
              <th className="py-3 px-4">Locality / Corridor</th>
              <th className="py-3 px-4">Segment</th>
              <th className="py-3 px-4">Key Offerings</th>
              <th className="py-3 px-4">Pricing</th>
              <th className="py-3 px-4">Appreciation (CAGR)</th>
              <th className="py-3 px-4">Key Growth Driver</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[var(--line)] text-[var(--text)]">
            {VIZAG_PRICE_BENCHMARKS.map((row) => (
              <tr key={row.locality} className="hover:bg-[var(--bg)] transition-colors">
                <td className="py-3.5 px-4 font-semibold text-[var(--ink)] whitespace-nowrap">
                  {row.locality}
                </td>
                <td className="py-3.5 px-4 whitespace-nowrap">{row.category}</td>
                <td className="py-3.5 px-4 font-medium text-[var(--ink)] whitespace-nowrap">
                  {row.propertyTypes}
                </td>
                <td className="py-3.5 px-4 whitespace-nowrap">
                  <span className="inline-flex items-center px-2 py-0.5 text-xs font-semibold rounded bg-[#f4ebe6] text-[var(--brand)]">
                    {row.pricingGuidance}
                  </span>
                </td>
                <td className="py-3.5 px-4 text-[var(--success)] font-semibold whitespace-nowrap">
                  {row.appreciation}
                </td>
                <td className="py-3.5 px-4 text-xs leading-relaxed max-w-xs">
                  {row.growthTrigger}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <p className="text-xs text-[var(--text)] italic pt-2">
        * Market metrics and development intelligence compiled from VMRDA verified records, AP RERA registrations, and ground advisory by Secure Home Vizag.
      </p>
    </div>
  );
}

export function LegalVerificationGuide() {
  const steps = [
    {
      num: '01',
      title: '30-Year Encumbrance Certificate (EC) & Link Documents',
      desc: 'Verify uninterrupted title ownership for at least 30 continuous years through the AP Registration and Stamps Department (IGR AP). Ensures zero legal encumbrances, prior mortgages, or court injunctions.',
    },
    {
      num: '02',
      title: 'VMRDA / VUDA Layout Sanction (LP Number) & 10% Mortgage Release',
      desc: 'Confirm valid LP (Layout Permission) order from Visakhapatnam Metropolitan Region Development Authority. Crucially verify that the layout developer has received the final 10% open space & mortgaged plot release order upon civic amenity completion.',
    },
    {
      num: '03',
      title: 'AP Section 22A Prohibited Property Clearance',
      desc: 'Screen the survey number against the Andhra Pradesh Registration Act Section 22A prohibited property register. Guarantees the plot is not classified as endowment, wakf, government poramboke, or assigned (D-Patta) land.',
    },
    {
      num: '04',
      title: 'Webland 1B / Adangal & Conversion (NALA) Verification',
      desc: 'Cross-reference digital land records on Meebhoomi / Webland to verify Pattadar Passbook, Khata Number, and Non-Agricultural Land Assessment (NALA) legal conversion from agricultural to residential use.',
    },
    {
      num: '05',
      title: 'AP RERA Compliance & Approved Building Sanction Plans',
      desc: 'For flats and villas, confirm valid registration with Andhra Pradesh RERA (APRERA) and GVMC (Greater Visakhapatnam Municipal Corporation) building plan sanctions with Occupancy Certificate (OC).',
    },
  ];

  return (
    <div className="bg-[var(--surface)] border border-[var(--line)] rounded-[4px] p-6 space-y-6">
      <div>
        <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#f4ebe6] text-[var(--brand)] text-xs font-semibold rounded-[4px] mb-2">
          <ShieldCheck size={16} weight="bold" />
          <span>Buyer Protection Standard</span>
        </div>
        <h3 className="font-heading text-xl md:text-2xl font-semibold text-[var(--ink)]">
          The 5-Step Vizag Property Legal Verification Protocol
        </h3>
        <p className="text-sm text-[var(--text)] mt-1">
          Every listing recommended by Rajesh Ponnada undergoes this rigorous 5-step documentation scrutiny before buyers commit a single rupee.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {steps.map((s) => (
          <div key={s.num} className="p-4 bg-[var(--bg)] border border-[var(--line)] rounded-[4px] space-y-2">
            <div className="flex items-center gap-2">
              <span className="font-heading text-sm font-semibold text-[var(--brand)] bg-[var(--surface)] px-2 py-0.5 border border-[var(--line)] rounded-[4px]">
                STEP {s.num}
              </span>
              <h4 className="font-semibold text-sm text-[var(--ink)]">{s.title}</h4>
            </div>
            <p className="text-xs text-[var(--text)] leading-relaxed">{s.desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export function StampDutyMatrix() {
  return (
    <div className="bg-[var(--surface)] border border-[var(--line)] rounded-[4px] p-6 space-y-4">
      <h3 className="font-heading text-xl md:text-2xl font-semibold text-[var(--ink)]">
        Andhra Pradesh Property Registration & Stamp Duty Breakdown (2026)
      </h3>
      <p className="text-sm text-[var(--text)]">
        Official government fee schedule applicable when registering plots, flats, and villas at Visakhapatnam Sub-Registrar Offices:
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
        <div className="p-4 bg-[var(--bg)] border border-[var(--line)] rounded-[4px] text-center">
          <p className="text-xs uppercase font-semibold tracking-wider text-[var(--text)]">Stamp Duty</p>
          <p className="font-heading text-3xl font-semibold text-[var(--ink)] mt-1">5.0%</p>
          <p className="text-xs text-[var(--text)] mt-1">Payable on Market/Guideline Value</p>
        </div>
        <div className="p-4 bg-[var(--bg)] border border-[var(--line)] rounded-[4px] text-center">
          <p className="text-xs uppercase font-semibold tracking-wider text-[var(--text)]">Transfer Duty (TD)</p>
          <p className="font-heading text-3xl font-semibold text-[var(--brand)] mt-1">1.5%</p>
          <p className="text-xs text-[var(--text)] mt-1">Municipal / Local Body Transfer</p>
        </div>
        <div className="p-4 bg-[var(--bg)] border border-[var(--line)] rounded-[4px] text-center">
          <p className="text-xs uppercase font-semibold tracking-wider text-[var(--text)]">Registration Fee</p>
          <p className="font-heading text-3xl font-semibold text-[var(--ink)] mt-1">1.0%</p>
          <p className="text-xs text-[var(--text)] mt-1">Sub-Registrar Processing Charge</p>
        </div>
      </div>

      <div className="p-3 bg-[#fdfaf6] border border-[#f3dfce] rounded-[4px] text-xs text-[var(--text)] leading-relaxed">
        <span className="font-semibold text-[var(--brand)]">Total Government Transfer Fee: 7.5%</span> of the registered sale consideration or guideline value (whichever is higher), plus nominal standard government processing and e-challan fees.
      </div>
    </div>
  );
}
