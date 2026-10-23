import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Metadata } from 'next';
import { ArrowUpRight, MapPin, CaretDown } from '@phosphor-icons/react/dist/ssr';
import { LeadActionButtons } from '@/components/lead-action-buttons';
import { getSettings } from '@/lib/data';
import { getPersonJsonLd, getBreadcrumbJsonLd, getFaqJsonLd } from '@/lib/jsonld';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.securehomevizag.com';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export const metadata: Metadata = {
  title: 'About Rajesh Ponnada | Real Estate Broker in Visakhapatnam | Secure Home Vizag',
  description:
    'Meet Rajesh Ponnada — founder of Secure Home Vizag and an experienced property broker in Visakhapatnam with 10+ years of transparent real estate advisory for homebuyers, families, and NRI clients across Andhra Pradesh.',
  alternates: {
    canonical: `${SITE_URL}/about`,
  },
  openGraph: {
    title: 'About Rajesh Ponnada | Real Estate Broker in Visakhapatnam',
    description:
      'Rajesh Ponnada, founder of Secure Home Vizag, brings 10+ years of transparent real estate advisory across Visakhapatnam. Learn about the advisory process, top localities, and property verification.',
    url: `${SITE_URL}/about`,
    type: 'profile',
    images: [
      {
        url: '/Rajesh%20ponnada.jpeg',
        width: 800,
        height: 600,
        alt: 'Rajesh Ponnada — Founder of Secure Home Vizag, Real Estate Broker in Visakhapatnam',
      },
    ],
  },
};

const ABOUT_FAQS = [
  {
    question: 'Does Secure Home Vizag verify property titles before listing?',
    answer:
      'Yes. Every property listed on Secure Home Vizag undergoes a comprehensive 30-year link document check, encumbrance certificate verification, layout approval confirmation, and survey number cross-verification before being recommended to buyers in Visakhapatnam. This ensures buyers receive only clear-title properties.',
  },
  {
    question: 'What types of properties are available through Secure Home Vizag in Visakhapatnam?',
    answer:
      'Secure Home Vizag offers verified residential plots and land in VMRDA approved layouts, 2 BHK and 3 BHK flats and apartments with RERA approval, independent villas and duplex houses in gated communities, and commercial properties including retail shops and office spaces — all across Visakhapatnam (Vizag).',
  },
  {
    question: 'Are properties on Secure Home Vizag VMRDA or RERA approved?',
    answer:
      'Where applicable, all properties are verified for VMRDA (Visakhapatnam Metropolitan Region Development Authority) or RERA (Real Estate Regulatory Authority of Andhra Pradesh) approval status. Each listing clearly displays its approval badges and documentation. VMRDA approved plots are available in Anandapuram, Bheemili, Madhurawada, and Pendurthi areas.',
  },
  {
    question: 'Can NRI buyers purchase properties through Secure Home Vizag?',
    answer:
      'Yes. Rajesh Ponnada has extensive experience assisting Non-Resident Indian (NRI) clients in purchasing plots, flats, and villas in Visakhapatnam. All documentation, site visit coordination, title verification, and registration paperwork can be handled remotely with written agreements, making it safe and convenient for NRIs to invest in Vizag real estate.',
  },
  {
    question: 'What areas of Visakhapatnam does Secure Home Vizag cover?',
    answer:
      'Secure Home Vizag operates across all major areas of Visakhapatnam including Madhurawada, Rushikonda, Anandapuram Junction, Bheemili corridor and Beach Road, Yendada, MVP Colony, Gajuwaka, Pendurthi, Sujatha Nagar, and all surrounding VMRDA growth zones. Whether you are looking for plots near Anandapuram or coastal villas near Bheemili, Secure Home Vizag provides verified options.',
  },
  {
    question: 'How do I contact Rajesh Ponnada for a property enquiry?',
    answer:
      'You can contact Rajesh Ponnada directly via phone call or WhatsApp at +91 8019928236. Alternatively, submit an enquiry through the website and you will receive a direct response with verified property options matching your budget and requirements. Rajesh Ponnada is available Monday to Saturday from 9 AM to 7 PM.',
  },
  {
    question: 'What is the current real estate market like in Visakhapatnam?',
    answer:
      'Visakhapatnam (Vizag) is one of the fastest-growing real estate markets in Andhra Pradesh. Key growth corridors include the Anandapuram-Bheemunipatnam highway belt, Madhurawada IT corridor, and Bheemili Beach Road. Property prices have appreciated significantly in VMRDA zones. Residential plots, 2 and 3 BHK flats, and coastal villas are in high demand from both local buyers and NRI investors.',
  },
  {
    question: 'How do I buy a plot in Visakhapatnam?',
    answer:
      'To buy a plot in Visakhapatnam, follow these steps: (1) Identify your preferred area and budget, (2) Contact Secure Home Vizag for verified VMRDA-approved plot listings, (3) Verify the 30-year title chain, encumbrance certificate, and layout sanction order, (4) Visit the site with Rajesh Ponnada, (5) Sign a written sale agreement, and (6) Complete registration at the sub-registrar office. Secure Home Vizag assists through every step.',
  },
  {
    question: 'What is the price range for flats in Visakhapatnam?',
    answer:
      'Flat prices in Visakhapatnam range from approximately ₹40 lakhs for a 2 BHK apartment in developing areas like Pendurthi and Anandapuram, to ₹1 crore or more for premium 3 BHK RERA-approved apartments in Madhurawada, Rushikonda, and Yendada. Contact Secure Home Vizag for the most current verified listings and pricing across Vizag.',
  },
];

export default async function AboutPage() {
  const settings = await getSettings();
  const personJsonLd = getPersonJsonLd(SITE_URL);
  const breadcrumbJsonLd = getBreadcrumbJsonLd(SITE_URL, [
    { name: 'Home', url: '/' },
    { name: 'About Rajesh Ponnada', url: '/about' },
  ]);
  const faqJsonLd = getFaqJsonLd(ABOUT_FAQS);

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
      title: 'Direct Agreement in Writing',
      description:
        'All agreements are documented directly with clear milestone terms written down. No surprise broker fees or concealed commissions.',
    },
    {
      step: '05',
      title: 'Registration and Mutation Support',
      description:
        'We assist in preparing the deed with legal professionals, coordinating sub-registrar appointments, and ensuring smooth revenue record mutation.',
    },
  ];

  return (
    <div className="fade-in max-w-[1200px] mx-auto px-4 sm:px-6 py-12 md:py-16 space-y-16">
      {/* Structured Data: Person, Breadcrumb, and FAQPage */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />

      {/* Breadcrumb Navigation */}
      <nav aria-label="Breadcrumb" className="text-sm text-[var(--text)]">
        <ol className="flex items-center gap-1.5 flex-wrap">
          <li>
            <Link href="/" className="hover:text-[var(--brand)] hover:underline">Home</Link>
          </li>
          <li aria-hidden="true" className="text-[var(--line)]">/</li>
          <li aria-current="page" className="text-[var(--ink)] font-semibold">About</li>
        </ol>
      </nav>

      {/* Intro Split Section */}
      <section className="grid grid-cols-1 md:grid-cols-12 gap-10 items-center" aria-labelledby="about-heading">
        <div className="md:col-span-5">
          <div className="relative w-full h-[420px] bg-[var(--line)] border border-[var(--line)] rounded-[4px] overflow-hidden">
            <Image
              src="/Rajesh ponnada.jpeg"
              alt="Rajesh Ponnada, Founder and Property Consultant at Secure Home Vizag, Visakhapatnam"
              fill
              priority
              sizes="(max-width: 768px) 100vw, 40vw"
              className="object-cover object-top"
            />
          </div>
        </div>
        <div className="md:col-span-7 space-y-5">
          <span className="text-xs font-semibold uppercase tracking-wider text-[var(--brand)]">
            Founder &amp; Property Consultant — Visakhapatnam
          </span>
          <h1 id="about-heading" className="font-heading text-3xl sm:text-4xl md:text-5xl text-[var(--ink)]">
            Rajesh Ponnada
          </h1>
          <p className="text-lg text-[var(--ink)] font-semibold">
            Brand Promise: &quot;Transparent and Reliable&quot;
          </p>
          <p className="text-base text-[var(--text)] leading-relaxed">
            I founded Secure Home Vizag with a simple commitment: providing buyers and property owners in Visakhapatnam with factual, reliable property advisory. Over 10+ years in the local market, I have focused on plots, flats, independent villas, and commercial spaces with verifiable titles.
          </p>
          <p className="text-base text-[var(--text)] leading-relaxed">
            Real estate decisions are substantial life commitments. Whether you are buying your first home plot, building a villa near the Bheemili coast, or investing from overseas as an NRI, you receive direct communication, written quotes, and verified documentation — no hidden charges, no artificial urgency.
          </p>
          <LeadActionButtons
            variant="hero"
            phoneNumber={settings.phone}
            whatsappNumber={settings.whatsapp_number}
          />
        </div>
      </section>

      {/* How the Process Works (Numbered List) */}
      <section className="border-t border-[var(--line)] pt-14 space-y-8" aria-labelledby="process-heading">
        <div>
          <h2 id="process-heading" className="font-heading text-2xl md:text-3xl text-[var(--ink)] mb-2">
            How the Advisory Process Works
          </h2>
          <p className="text-[var(--text)] text-base">
            A five-step approach ensuring legal safety and financial transparency for every property transaction in Visakhapatnam.
          </p>
        </div>

        <div className="divide-y divide-[var(--line)] border border-[var(--line)] bg-[var(--surface)] rounded-[4px]">
          {steps.map((s) => (
            <div key={s.step} className="p-6 sm:p-8 flex items-start gap-6">
              <span className="font-heading text-3xl font-semibold text-[var(--brand)] flex-shrink-0" aria-hidden="true">
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

      {/* Top Real Estate Localities in Visakhapatnam (Vizag) */}
      <section className="border-t border-[var(--line)] pt-14 space-y-8" aria-labelledby="localities-heading">
        <div>
          <span className="text-xs font-semibold uppercase tracking-wider text-[var(--brand)]">
            Geographic Coverage &bull; Visakhapatnam &amp; VMRDA Region
          </span>
          <h2 id="localities-heading" className="font-heading text-2xl md:text-3xl text-[var(--ink)] mt-1 mb-2">
            Top Real Estate Localities in Visakhapatnam (Vizag)
          </h2>
          <p className="text-[var(--text)] text-base max-w-3xl leading-relaxed">
            Active brokerage, on-ground title verification, and property advisory across core municipal and VMRDA growth sectors of Visakhapatnam.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="p-6 border border-[var(--line)] bg-[var(--surface)] rounded-[4px] space-y-3 hover:border-[var(--brand)] transition-colors flex flex-col justify-between">
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-[var(--brand)] font-semibold text-base">
                <MapPin size={20} weight="fill" />
                <h3 className="font-heading text-lg text-[var(--ink)]">Madhurawada</h3>
              </div>
              <p className="text-sm text-[var(--text)] leading-relaxed">
                IT corridor epicenter, premier gated communities, 2 &amp; 3 BHK apartments, and family residences close to tech SEZ and schools.
              </p>
            </div>
            <Link href="/listings?type=flats" className="text-xs font-semibold text-[var(--brand)] hover:underline inline-flex items-center gap-1 pt-2">
              <span>View Flats in Madhurawada</span>
              <ArrowUpRight size={14} weight="bold" />
            </Link>
          </div>

          <div className="p-6 border border-[var(--line)] bg-[var(--surface)] rounded-[4px] space-y-3 hover:border-[var(--brand)] transition-colors flex flex-col justify-between">
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-[var(--brand)] font-semibold text-base">
                <MapPin size={20} weight="fill" />
                <h3 className="font-heading text-lg text-[var(--ink)]">Anandapuram Junction</h3>
              </div>
              <p className="text-sm text-[var(--text)] leading-relaxed">
                Rapidly appreciating highway growth corridor with high-yield VMRDA approved residential plots and plotted layout developments.
              </p>
            </div>
            <Link href="/listings?type=plots" className="text-xs font-semibold text-[var(--brand)] hover:underline inline-flex items-center gap-1 pt-2">
              <span>View Plots in Anandapuram</span>
              <ArrowUpRight size={14} weight="bold" />
            </Link>
          </div>

          <div className="p-6 border border-[var(--line)] bg-[var(--surface)] rounded-[4px] space-y-3 hover:border-[var(--brand)] transition-colors flex flex-col justify-between">
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-[var(--brand)] font-semibold text-base">
                <MapPin size={20} weight="fill" />
                <h3 className="font-heading text-lg text-[var(--ink)]">Bheemili Beach Road</h3>
              </div>
              <p className="text-sm text-[var(--text)] leading-relaxed">
                Elite coastal zone featuring sea-view luxury villas, independent duplex homes, and long-term land investments near Bay of Bengal.
              </p>
            </div>
            <Link href="/listings?type=villas" className="text-xs font-semibold text-[var(--brand)] hover:underline inline-flex items-center gap-1 pt-2">
              <span>View Villas in Bheemili</span>
              <ArrowUpRight size={14} weight="bold" />
            </Link>
          </div>

          <div className="p-6 border border-[var(--line)] bg-[var(--surface)] rounded-[4px] space-y-3 hover:border-[var(--brand)] transition-colors flex flex-col justify-between">
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-[var(--brand)] font-semibold text-base">
                <MapPin size={20} weight="fill" />
                <h3 className="font-heading text-lg text-[var(--ink)]">Rushikonda</h3>
              </div>
              <p className="text-sm text-[var(--text)] leading-relaxed">
                Panoramic hillside and ocean views, modern sea-facing luxury apartments, and proximity to Gitam University and IT parks.
              </p>
            </div>
            <Link href="/listings?type=flats" className="text-xs font-semibold text-[var(--brand)] hover:underline inline-flex items-center gap-1 pt-2">
              <span>View Apartments in Rushikonda</span>
              <ArrowUpRight size={14} weight="bold" />
            </Link>
          </div>

          <div className="p-6 border border-[var(--line)] bg-[var(--surface)] rounded-[4px] space-y-3 hover:border-[var(--brand)] transition-colors flex flex-col justify-between">
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-[var(--brand)] font-semibold text-base">
                <MapPin size={20} weight="fill" />
                <h3 className="font-heading text-lg text-[var(--ink)]">Yendada</h3>
              </div>
              <p className="text-sm text-[var(--text)] leading-relaxed">
                Tranquil living nestled between urban Vizag and the IT corridor, offering high-end gated apartments and independent houses.
              </p>
            </div>
            <Link href="/listings?type=flats" className="text-xs font-semibold text-[var(--brand)] hover:underline inline-flex items-center gap-1 pt-2">
              <span>View Properties in Yendada</span>
              <ArrowUpRight size={14} weight="bold" />
            </Link>
          </div>

          <div className="p-6 border border-[var(--line)] bg-[var(--surface)] rounded-[4px] space-y-3 hover:border-[var(--brand)] transition-colors flex flex-col justify-between">
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-[var(--brand)] font-semibold text-base">
                <MapPin size={20} weight="fill" />
                <h3 className="font-heading text-lg text-[var(--ink)]">MVP Colony</h3>
              </div>
              <p className="text-sm text-[var(--text)] leading-relaxed">
                Premier established neighborhood of Visakhapatnam with central retail markets, parks, multi-specialty hospitals, and top schools.
              </p>
            </div>
            <Link href="/listings?type=flats" className="text-xs font-semibold text-[var(--brand)] hover:underline inline-flex items-center gap-1 pt-2">
              <span>View Flats in MVP Colony</span>
              <ArrowUpRight size={14} weight="bold" />
            </Link>
          </div>

          <div className="p-6 border border-[var(--line)] bg-[var(--surface)] rounded-[4px] space-y-3 hover:border-[var(--brand)] transition-colors flex flex-col justify-between">
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-[var(--brand)] font-semibold text-base">
                <MapPin size={20} weight="fill" />
                <h3 className="font-heading text-lg text-[var(--ink)]">Gajuwaka</h3>
              </div>
              <p className="text-sm text-[var(--text)] leading-relaxed">
                High-footfall commercial powerhouse and industrial belt offering prime retail shops, commercial plots, and affordable homes.
              </p>
            </div>
            <Link href="/listings?type=commercial" className="text-xs font-semibold text-[var(--brand)] hover:underline inline-flex items-center gap-1 pt-2">
              <span>View Commercial in Gajuwaka</span>
              <ArrowUpRight size={14} weight="bold" />
            </Link>
          </div>

          <div className="p-6 border border-[var(--line)] bg-[var(--surface)] rounded-[4px] space-y-3 hover:border-[var(--brand)] transition-colors flex flex-col justify-between">
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-[var(--brand)] font-semibold text-base">
                <MapPin size={20} weight="fill" />
                <h3 className="font-heading text-lg text-[var(--ink)]">Pendurthi &amp; Sujatha Nagar</h3>
              </div>
              <p className="text-sm text-[var(--text)] leading-relaxed">
                Fast-growing residential hub featuring affordable VMRDA residential plots, newly built houses, and suburban train connectivity.
              </p>
            </div>
            <Link href="/listings?type=plots" className="text-xs font-semibold text-[var(--brand)] hover:underline inline-flex items-center gap-1 pt-2">
              <span>View Plots in Pendurthi</span>
              <ArrowUpRight size={14} weight="bold" />
            </Link>
          </div>
        </div>
      </section>

      {/* Frequently Asked Questions (Interactive Accordion) */}
      <section className="border-t border-[var(--line)] pt-14 space-y-8" aria-labelledby="about-faqs" itemScope itemType="https://schema.org/FAQPage">
        <div>
          <span className="text-xs font-semibold uppercase tracking-wider text-[var(--brand)]">
            Clear Answers &bull; Buyer Guidance
          </span>
          <h2 id="about-faqs" className="font-heading text-2xl md:text-3xl text-[var(--ink)] mt-1 mb-2">
            Frequently Asked Questions
          </h2>
          <p className="text-[var(--text)] text-base max-w-3xl leading-relaxed">
            Common questions about buying property, title checks, VMRDA/RERA approvals, and advisory services in Visakhapatnam. Click any question to view the detailed answer.
          </p>
        </div>

        <div className="divide-y divide-[var(--line)] border border-[var(--line)] rounded-[4px] bg-[var(--surface)] shadow-xs">
          {ABOUT_FAQS.map((faq, idx) => (
            <details
              key={idx}
              className="group p-5 sm:p-6 transition-colors hover:bg-[var(--line)]/20 select-none"
              itemScope
              itemType="https://schema.org/Question"
            >
              <summary className="flex items-center justify-between gap-4 font-heading text-base sm:text-lg text-[var(--ink)] cursor-pointer list-none [&::-webkit-details-marker]:hidden font-medium">
                <span itemProp="name" className="leading-snug">{faq.question}</span>
                <span className="flex-shrink-0 text-[var(--brand)] transition-transform duration-200 group-open:rotate-180" aria-hidden="true">
                  <CaretDown size={20} weight="bold" />
                </span>
              </summary>
              <div
                itemScope
                itemType="https://schema.org/Answer"
                itemProp="acceptedAnswer"
                className="pt-3 pr-4 sm:pr-8 text-sm sm:text-base text-[var(--text)] leading-relaxed cursor-text"
              >
                <p itemProp="text">{faq.answer}</p>
              </div>
            </details>
          ))}
        </div>
      </section>

      {/* Bottom CTA Links */}
      <section className="border-t border-[var(--line)] pt-10 flex flex-wrap gap-4 items-center justify-between">
        <div className="space-y-1">
          <h3 className="font-heading text-xl text-[var(--ink)]">
            Ready to find your next property in Visakhapatnam?
          </h3>
          <p className="text-sm text-[var(--text)]">
            Browse verified listings or get direct guidance from Rajesh Ponnada.
          </p>
        </div>
        <div className="flex flex-wrap gap-3">
          <Link
            href="/listings"
            className="inline-flex items-center gap-1.5 px-5 py-2.5 text-sm font-semibold text-[var(--surface)] bg-[var(--brand)] hover:bg-[var(--brand-hover)] rounded-[4px] min-h-[44px]"
          >
            <span>Browse Listings</span>
            <ArrowUpRight size={16} weight="regular" />
          </Link>
          <Link
            href="/contact"
            className="inline-flex items-center gap-1.5 px-5 py-2.5 text-sm font-semibold text-[var(--ink)] border border-[var(--line)] hover:border-[var(--brand)] rounded-[4px] min-h-[44px]"
          >
            <span>Contact Rajesh Ponnada</span>
            <ArrowUpRight size={16} weight="regular" />
          </Link>
        </div>
      </section>
    </div>
  );
}
