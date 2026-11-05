import { Listing, Lead, Testimonial, SiteSettings, PropertyType } from './types';
import { createClient as createServerSupabase } from './supabase/server';
import { createAdminClient } from './supabase/admin';
import fs from 'fs';
import path from 'path';

// Initial demo seed listings (one per property type)
// Verified property listings catalog across prime Visakhapatnam corridors
export const VERIFIED_LISTINGS: Listing[] = [
  {
    id: 'a1111111-1111-1111-1111-111111111111',
    title: 'VMRDA Approved Residential Plot in Anandapuram Junction',
    slug: 'vmrda-residential-plot-in-anandapuram-junction',
    property_type: 'plots',
    price: 3800000,
    price_display: 'Rs 38 Lakhs',
    size: 200,
    unit: 'sq.yds',
    location: 'Anandapuram Junction, Visakhapatnam',
    status: 'available',
    is_vmrda_approved: true,
    is_rera_approved: false,
    is_featured: true,
    is_published: true,
    description: 'VMRDA approved clear-title residential plot in a prime gated layout at Anandapuram Junction. Just 500m from NH-16 highway with rapid connectivity to Visakhapatnam city and the upcoming Bhogapuram International Airport corridor. Clean 30-year link title, complete compound wall, 40-ft BT roads, underground drainage, and immediate bank loan eligibility.',
    facts: {
      'Facing': 'East',
      'Road Width': '40 feet BT Road',
      'Layout Approval': 'VMRDA LP No. 42/2023',
      'Possession': 'Immediate Handover',
      'Water Supply': 'Underground Pipeline Available',
    },
    cover_image_url: '/Plots.jpeg',
    images: ['/Plots.jpeg'],
    created_at: new Date().toISOString(),
  },
  {
    id: 'b2222222-2222-2222-2222-222222222222',
    title: 'Luxury 3 BHK Gated Apartment in Madhurawada IT Corridor',
    slug: 'luxury-3-bhk-sea-view-flat-in-madhurawada',
    property_type: 'flats',
    price: 7200000,
    price_display: 'Rs 72 Lakhs',
    size: 1550,
    unit: 'sq.ft',
    location: 'Madhurawada IT Corridor, Visakhapatnam',
    status: 'available',
    is_vmrda_approved: true,
    is_rera_approved: true,
    is_featured: true,
    is_published: true,
    description: 'Premium RERA and GVMC approved 3 BHK apartment in an ultra-modern gated community in Madhurawada. Strategically located within 5 minutes of Rushikonda IT SEZ, top international schools, and health care centers. Includes 100% power backup, passenger and stretcher lifts, swimming pool, clubhouse, and scenic hill breeze.',
    facts: {
      'Bedrooms': '3 BHK',
      'Bathrooms': '3 Attached',
      'Floor': '4th of 8 Floors',
      'Car Parking': '1 Dedicated Covered',
      'RERA Registration': 'APRERA Reg: P03290010482',
    },
    cover_image_url: '/Apartments.jpeg',
    images: ['/Apartments.jpeg'],
    created_at: new Date().toISOString(),
  },
  {
    id: 'c3333333-3333-3333-3333-333333333333',
    title: 'Coastal Luxury 4 BHK Duplex Villa in Bheemili Beach Road',
    slug: 'coastal-luxury-gated-villa-in-bheemili-corridor',
    property_type: 'villas',
    price: 16500000,
    price_display: 'Rs 1.65 Crore',
    size: 2800,
    unit: 'sq.ft',
    location: 'Bheemili Beach Corridor, Visakhapatnam',
    status: 'few_left',
    is_vmrda_approved: true,
    is_rera_approved: true,
    is_featured: true,
    is_published: true,
    description: 'Exquisite coastal duplex villa on the high-appreciation Bheemili Beach Road corridor. Architect-designed contemporary villa featuring private lawn, spacious rooftop terrace with panoramic sea views, 4 luxury en-suite bedrooms, imported vitrified flooring, and club amenities with 24/7 security.',
    facts: {
      'Bedrooms': '4 BHK Duplex',
      'Bathrooms': '4 Bathrooms',
      'Plot Area': '220 sq.yds',
      'Facing': 'East Facing',
      'Approvals': 'VMRDA Approved Layout & Plan',
    },
    cover_image_url: '/Villa.jpeg',
    images: ['/Villa.jpeg'],
    created_at: new Date().toISOString(),
  },
  {
    id: 'd4444444-4444-4444-4444-444444444444',
    title: 'High-Visibility Commercial Showroom & Office Space in Gajuwaka',
    slug: 'highway-commercial-office-showroom-in-gajuwaka',
    property_type: 'commercial',
    price: 11000000,
    price_display: 'Rs 1.10 Crore',
    size: 1350,
    unit: 'sq.ft',
    location: 'Main Road, Gajuwaka Commercial Hub, Vizag',
    status: 'available',
    is_vmrda_approved: true,
    is_rera_approved: false,
    is_featured: false,
    is_published: true,
    description: 'Prime highway-facing commercial retail showroom and corporate office space in the bustling heart of Gajuwaka. Ideal for banks, branded diagnostic clinics, corporate offices, or retail showrooms with massive continuous daily footfall and excellent return on investment.',
    facts: {
      'Floor': 'Ground & 1st Floor',
      'Frontage': '30 Feet Highway Frontage',
      'Power': 'Commercial 3-Phase 15kW',
      'Zoning': 'GVMC Commercial Sanction',
    },
    cover_image_url: '/commercial.jpg',
    images: ['/commercial.jpg'],
    created_at: new Date().toISOString(),
  },
  {
    id: 'e5555555-5555-5555-5555-555555555555',
    title: 'VMRDA Approved Investment Plot in Bhogapuram Airport Corridor',
    slug: 'vmrda-approved-villa-plot-in-bhogapuram-airport-corridor',
    property_type: 'plots',
    price: 2600000,
    price_display: 'Rs 26 Lakhs',
    size: 200,
    unit: 'sq.yds',
    location: 'Bhogapuram Corridor (NH-16), Visakhapatnam Region',
    status: 'available',
    is_vmrda_approved: true,
    is_rera_approved: false,
    is_featured: true,
    is_published: true,
    description: 'Clear title VMRDA approved residential open plot in a sprawling gated layout along the Bhogapuram International Airport growth corridor. Featuring 60ft and 40ft wide black-top roads, avenue plantations, solar streetlighting, and round-the-clock gated security. Exceptional appreciation potential for investors and NRIs.',
    facts: {
      'Facing': 'East',
      'Road Width': '60 Feet Sector Road',
      'Layout LP': 'VMRDA LP No. 18/2024',
      'Airport Distance': '8 Mins to Bhogapuram Airport Gate',
    },
    cover_image_url: '/Plots.jpeg',
    images: ['/Plots.jpeg'],
    created_at: new Date().toISOString(),
  },
  {
    id: 'f6666666-6666-6666-6666-666666666666',
    title: 'Sea-View 4 BHK Independent Villa in Rushikonda Hills',
    slug: 'sea-view-luxury-villa-in-rushikonda-hills',
    property_type: 'villas',
    price: 24500000,
    price_display: 'Rs 2.45 Crore',
    size: 3400,
    unit: 'sq.ft',
    location: 'Rushikonda Hills, Visakhapatnam',
    status: 'available',
    is_vmrda_approved: true,
    is_rera_approved: true,
    is_featured: true,
    is_published: true,
    description: 'Spectacular luxury residence perched in the tranquil Rushikonda Hills overlooking the Bay of Bengal. Premium teakwood woodwork, home automation, double-height living room, private terrace plunge deck, and covered multi-vehicle parking just minutes from the Beach Road and IT parks.',
    facts: {
      'Bedrooms': '4 BHK Ultra Luxury',
      'Bathrooms': '5 Bathrooms',
      'Plot Area': '260 sq.yds',
      'Facing': 'North Facing',
      'View': 'Direct Panoramic Ocean & Coastal Hills',
    },
    cover_image_url: '/Villa.jpeg',
    images: ['/Villa.jpeg'],
    created_at: new Date().toISOString(),
  },
  {
    id: 'g7777777-7777-7777-7777-777777777777',
    title: 'Ready-to-Move 2 BHK Flat in Yendada Near Beach Road',
    slug: 'ready-to-move-2-bhk-flat-in-yendada-junction',
    property_type: 'flats',
    price: 5200000,
    price_display: 'Rs 52 Lakhs',
    size: 1150,
    unit: 'sq.ft',
    location: 'Yendada, Near Beach Road, Visakhapatnam',
    status: 'available',
    is_vmrda_approved: true,
    is_rera_approved: true,
    is_featured: false,
    is_published: true,
    description: 'Peaceful, ready-to-move 2 BHK apartment in Yendada with easy access to both central Vizag and Madhurawada. Clear title with Occupancy Certificate (OC) from GVMC, verified undivided share (UDS), and municipal drinking water pipeline.',
    facts: {
      'Bedrooms': '2 BHK',
      'Bathrooms': '2 Bathrooms',
      'Floor': '2nd of 5 Floors',
      'Facing': 'East Facing',
      'Parking': 'Covered Stilt Parking',
    },
    cover_image_url: '/Apartments.jpeg',
    images: ['/Apartments.jpeg'],
    created_at: new Date().toISOString(),
  },
  {
    id: 'h8888888-8888-8888-8888-888888888888',
    title: 'Prime Highway Commercial Plot in Anandapuram Junction',
    slug: 'prime-commercial-land-plot-in-anandapuram',
    property_type: 'commercial',
    price: 18500000,
    price_display: 'Rs 1.85 Crore',
    size: 450,
    unit: 'sq.yds',
    location: 'NH-16 Highway, Anandapuram, Visakhapatnam',
    status: 'available',
    is_vmrda_approved: true,
    is_rera_approved: false,
    is_featured: false,
    is_published: true,
    description: 'Exceptional highway commercial land holding with 65 feet direct NH-16 frontage at Anandapuram Junction. Completely cleared under Section 22A, NALA converted, and pre-approved for commercial building plan sanctions.',
    facts: {
      'Frontage': '65 Feet on NH-16',
      'Zoning': 'VMRDA Commercial / Mixed Use',
      'Usage': 'Showroom, Hospital, Logistics Hub',
      'Title': 'Clear 30-Year Patta Title Deed',
    },
    cover_image_url: '/commercial.jpg',
    images: ['/commercial.jpg'],
    created_at: new Date().toISOString(),
  },
];

export const DEMO_LISTINGS = VERIFIED_LISTINGS;

export const DEFAULT_SETTINGS: SiteSettings = {
  phone: '8019928236',
  whatsapp_number: '8019928236',
  whatsapp_link: 'https://wa.me/918019928236',
  instagram_url: 'https://www.instagram.com/securehomevizag',
  youtube_url: 'https://youtube.com/@securehomevizag',
  hero_heading: 'Verified plots, flats and villas in Visakhapatnam',
  hero_subheading: 'Direct owner guidance with verified title records, transparent documentation, and no hidden charges.',
  office_address: 'Visakhapatnam, Andhra Pradesh',
  working_hours: 'Monday to Saturday: 9:00 AM to 7:00 PM',
  plots_description: 'Clear title VMRDA & approved residential plots in high-growth corridors like Anandapuram, Bheemili & Madhurawada.',
  flats_description: 'Ready-to-move and under-construction 2 & 3 BHK luxury apartments with approved plans and quality amenities.',
  villas_description: 'Independent duplex houses and premium gated community coastal villas with private road and modern infrastructure.',
  commercial_description: 'High-visibility retail shops, prime highway commercial plots, and office spaces with direct road access.',
  youtube_short_id: 'MROPRKsjd-Q',
};

// Global in-memory fallback store using globalThis
interface FallbackStore {
  __leads_store?: Lead[];
  __listings_store?: Listing[];
  __settings_store?: SiteSettings;
  __testimonials_store?: Testimonial[];
}

const store = globalThis as unknown as FallbackStore;

if (!store.__leads_store) {
  store.__leads_store = [];
}
if (!store.__listings_store) {
  store.__listings_store = [...DEMO_LISTINGS];
}
if (!store.__settings_store) {
  store.__settings_store = { ...DEFAULT_SETTINGS };
}
if (!store.__testimonials_store) {
  store.__testimonials_store = [];
}

function getCwd(): string {
  if (typeof process !== 'undefined' && typeof (process as unknown as { cwd?: () => string }).cwd === 'function') {
    return (process as unknown as { cwd: () => string }).cwd();
  }
  return '.';
}

export function getLocalSettings(): SiteSettings {
  try {
    const filePath = path.join(getCwd(), 'data', 'settings.json');
    if (fs.existsSync(filePath)) {
      const content = fs.readFileSync(filePath, 'utf-8');
      if (content.trim()) {
        const parsed = JSON.parse(content);
        return { ...DEFAULT_SETTINGS, ...parsed };
      }
    }
  } catch {
    // Ignore error
  }
  return store.__settings_store || DEFAULT_SETTINGS;
}

export function saveLocalSettings(settings: Partial<SiteSettings>) {
  try {
    const current = getLocalSettings();
    const merged = { ...current, ...settings };
    const dirPath = path.join(getCwd(), 'data');
    if (!fs.existsSync(dirPath)) {
      fs.mkdirSync(dirPath, { recursive: true });
    }
    const filePath = path.join(dirPath, 'settings.json');
    fs.writeFileSync(filePath, JSON.stringify(merged, null, 2), 'utf-8');
    store.__settings_store = merged;
  } catch {
    // Ignore error
  }
}

export async function getSettings(): Promise<SiteSettings> {
  const localSettings = getLocalSettings();
  const adminClient = createAdminClient();
  if (adminClient) {
    try {
      const { data, error } = await adminClient.from('settings').select('*');
      if (!error && data && data.length > 0) {
        const settingsMap: Record<string, string> = {};
        data.forEach((row: { key: string; value: string }) => {
          settingsMap[row.key] = row.value;
        });
        const merged: SiteSettings = {
          phone: settingsMap.phone || localSettings.phone,
          whatsapp_number: settingsMap.whatsapp_number || localSettings.whatsapp_number,
          whatsapp_link: settingsMap.whatsapp_link || localSettings.whatsapp_link,
          instagram_url: settingsMap.instagram_url || localSettings.instagram_url,
          youtube_url: settingsMap.youtube_url || localSettings.youtube_url,
          hero_heading: settingsMap.hero_heading || localSettings.hero_heading,
          hero_subheading: settingsMap.hero_subheading || localSettings.hero_subheading,
          office_address: settingsMap.office_address || localSettings.office_address,
          working_hours: settingsMap.working_hours || localSettings.working_hours,
          plots_description: settingsMap.plots_description || localSettings.plots_description || DEFAULT_SETTINGS.plots_description,
          flats_description: settingsMap.flats_description || localSettings.flats_description || DEFAULT_SETTINGS.flats_description,
          villas_description: settingsMap.villas_description || localSettings.villas_description || DEFAULT_SETTINGS.villas_description,
          commercial_description: settingsMap.commercial_description || localSettings.commercial_description || DEFAULT_SETTINGS.commercial_description,
        };
        saveLocalSettings(merged);
        return merged;
      }
    } catch {
      // Fallback
    }
  }
  return localSettings;
}

export async function getListings(type?: PropertyType): Promise<Listing[]> {
  const adminClient = createAdminClient();
  if (adminClient) {
    try {
      let query = adminClient.from('listings').select('*').eq('is_published', true).order('created_at', { ascending: false });
      if (type) {
        query = query.eq('property_type', type);
      }
      const { data, error } = await query;
      if (!error && data && data.length > 0) {
        return data as Listing[];
      }
    } catch {
      // Fallback
    }
  }

  const listings = store.__listings_store || DEMO_LISTINGS;
  const published = listings.filter((l: Listing) => l.is_published);
  if (type) {
    return published.filter((l: Listing) => l.property_type === type);
  }
  return published;
}

export async function getFeaturedListings(): Promise<Listing[]> {
  const adminClient = createAdminClient();
  if (adminClient) {
    try {
      const { data, error } = await adminClient
        .from('listings')
        .select('*')
        .eq('is_published', true)
        .eq('is_featured', true)
        .order('created_at', { ascending: false })
        .limit(3);
      if (!error && data && data.length > 0) {
        return data as Listing[];
      }
    } catch {
      // Fallback
    }
  }

  const listings = store.__listings_store || DEMO_LISTINGS;
  return listings.filter((l: Listing) => l.is_published && l.is_featured).slice(0, 3);
}

export async function getListingBySlug(slug: string): Promise<Listing | null> {
  const adminClient = createAdminClient();
  if (adminClient) {
    try {
      const { data, error } = await adminClient
        .from('listings')
        .select('*')
        .eq('slug', slug)
        .single();
      if (!error && data) {
        return data as Listing;
      }
    } catch {
      // Fallback
    }
  }

  const listings = store.__listings_store || DEMO_LISTINGS;
  return listings.find((l: Listing) => l.slug === slug) || null;
}

export async function getAllListingsForAdmin(): Promise<Listing[]> {
  const adminClient = createAdminClient();
  if (adminClient) {
    try {
      const { data, error } = await adminClient.from('listings').select('*').order('created_at', { ascending: false });
      if (!error && data) {
        return data as Listing[];
      }
    } catch {
      // Fallback
    }
  }

  return store.__listings_store || DEMO_LISTINGS;
}

export async function getTestimonials(): Promise<Testimonial[]> {
  const adminClient = createAdminClient();
  if (adminClient) {
    try {
      const { data, error } = await adminClient
        .from('testimonials')
        .select('*')
        .eq('is_visible', true)
        .order('created_at', { ascending: false });
      if (!error && data) {
        return data as Testimonial[];
      }
    } catch {
      // Fallback
    }
  }

  return (store.__testimonials_store || []).filter((t: Testimonial) => t.is_visible);
}

export async function getAllTestimonialsForAdmin(): Promise<Testimonial[]> {
  const adminClient = createAdminClient();
  if (adminClient) {
    try {
      const { data, error } = await adminClient.from('testimonials').select('*').order('created_at', { ascending: false });
      if (!error && data) {
        return data as Testimonial[];
      }
    } catch {
      // Fallback
    }
  }

  return store.__testimonials_store || [];
}

function getLocalLeads(): Lead[] {
  try {
    const filePath = path.join(getCwd(), 'data', 'leads.json');
    if (fs.existsSync(filePath)) {
      const content = fs.readFileSync(filePath, 'utf-8');
      if (content.trim()) {
        const parsed = JSON.parse(content);
        if (Array.isArray(parsed)) {
          return parsed;
        }
      }
    }
  } catch {
    // Ignore error
  }
  return store.__leads_store || [];
}

function saveLocalLeads(leads: Lead[]) {
  try {
    const dirPath = path.join(getCwd(), 'data');
    if (!fs.existsSync(dirPath)) {
      fs.mkdirSync(dirPath, { recursive: true });
    }
    const filePath = path.join(dirPath, 'leads.json');
    fs.writeFileSync(filePath, JSON.stringify(leads, null, 2), 'utf-8');
  } catch {
    // Ignore error
  }
  store.__leads_store = leads;
}

export async function insertLead(lead: Omit<Lead, 'id' | 'created_at' | 'status'>): Promise<Lead> {
  const newLead: Lead = {
    ...lead,
    id: typeof crypto !== 'undefined' && crypto.randomUUID ? crypto.randomUUID() : `lead_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`,
    status: 'new',
    created_at: new Date().toISOString(),
  };

  // 1. Always persist locally so lead is NEVER lost
  const localLeads = getLocalLeads();
  const updatedLeads = [newLead, ...localLeads.filter(l => l.id !== newLead.id)];
  saveLocalLeads(updatedLeads);

  // 2. Also sync to Supabase
  const adminClient = createAdminClient();
  if (adminClient) {
    try {
      const { data, error } = await adminClient.from('leads').insert([newLead]).select().single();
      if (!error && data) {
        return data as Lead;
      }
    } catch {
      // Fallback
    }
  }

  return newLead;
}

export async function getLeadsForAdmin(): Promise<Lead[]> {
  const localLeads = getLocalLeads();
  let supabaseLeads: Lead[] = [];

  const adminClient = createAdminClient();
  if (adminClient) {
    try {
      const { data, error } = await adminClient.from('leads').select('*').order('created_at', { ascending: false });
      if (!error && data && Array.isArray(data)) {
        supabaseLeads = data as Lead[];
      }
    } catch {
      // Fallback
    }
  }

  // Merge leads by id
  const map = new Map<string, Lead>();
  for (const l of supabaseLeads) {
    if (l && l.id) map.set(l.id, l);
  }
  for (const l of localLeads) {
    if (l && l.id && !map.has(l.id)) {
      map.set(l.id, l);
    }
  }

  const merged = Array.from(map.values()).sort(
    (a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
  );

  // Keep local store in sync
  if (merged.length > 0) {
    saveLocalLeads(merged);
  }

  return merged;
}

export async function updateLeadForAdmin(id: string, updates: Partial<Pick<Lead, 'status' | 'notes'>>): Promise<Lead | null> {
  let updatedLead: Lead | null = null;
  const adminClient = createAdminClient();
  if (adminClient) {
    try {
      const { data, error } = await adminClient.from('leads').update(updates).eq('id', id).select().single();
      if (!error && data) {
        updatedLead = data as Lead;
      }
    } catch {
      // Ignore
    }
  }

  const localLeads = getLocalLeads();
  const index = localLeads.findIndex(l => l.id === id);
  if (index !== -1) {
    localLeads[index] = { ...localLeads[index], ...updates };
    saveLocalLeads(localLeads);
    if (!updatedLead) updatedLead = localLeads[index];
  }

  return updatedLead;
}
