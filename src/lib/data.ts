import { Listing, Lead, Testimonial, SiteSettings, PropertyType } from './types';
import { createClient as createServerSupabase } from './supabase/server';
import { createAdminClient } from './supabase/admin';
import fs from 'fs';
import path from 'path';

// Initial demo seed listings (one per property type)
export const DEMO_LISTINGS: Listing[] = [
  {
    id: 'a1111111-1111-1111-1111-111111111111',
    title: 'DEMO: Residential Plot in Anandapuram',
    slug: 'demo-residential-plot-in-anandapuram',
    property_type: 'plots',
    price: 3500000,
    price_display: 'Rs 35 Lakhs',
    size: 200,
    unit: 'sq.yds',
    location: 'Anandapuram Junction, Vizag',
    status: 'available',
    is_vmrda_approved: false,
    is_rera_approved: false,
    is_featured: true,
    is_published: true,
    description: 'Clear title residential plot located close to Anandapuram highway junction. Wide approach road, electricity connection available at site, ready for immediate house construction.',
    facts: {
      'Facing': 'East',
      'Road Width': '40 feet',
      'Possession': 'Immediate',
    },
    cover_image_url: '/Plots.jpeg',
    images: ['/Plots.jpeg'],
    created_at: new Date().toISOString(),
  },
  {
    id: 'b2222222-2222-2222-2222-222222222222',
    title: 'DEMO: 3 BHK Apartment in Madhurawada',
    slug: 'demo-3-bhk-apartment-in-madhurawada',
    property_type: 'flats',
    price: 6800000,
    price_display: 'Rs 68 Lakhs',
    size: 1450,
    unit: 'sq.ft',
    location: 'Madhurawada, Vizag',
    status: 'available',
    is_vmrda_approved: false,
    is_rera_approved: false,
    is_featured: true,
    is_published: true,
    description: 'Spacious 3 BHK apartment in prime Madhurawada. Well ventilated unit with lift, car parking, power backup, and round the clock security. Close to schools and IT SEZ.',
    facts: {
      'Bedrooms': '3',
      'Bathrooms': '3',
      'Floor': '3rd of 5',
      'Car Parking': '1 Covered',
    },
    cover_image_url: '/Apartments.jpeg',
    images: ['/Apartments.jpeg'],
    created_at: new Date().toISOString(),
  },
  {
    id: 'c3333333-3333-3333-3333-333333333333',
    title: 'DEMO: Gated Villa in Bheemili Corridor',
    slug: 'demo-gated-villa-in-bheemili-corridor',
    property_type: 'villas',
    price: 12500000,
    price_display: 'Rs 1.25 Crore',
    size: 2400,
    unit: 'sq.ft',
    location: 'Bheemili Road, Vizag',
    status: 'few_left',
    is_vmrda_approved: false,
    is_rera_approved: false,
    is_featured: true,
    is_published: true,
    description: 'Independent duplex villa in a planned community near the scenic beach corridor. Quality construction with private terrace, bore water, municipal connection, and landscaped avenue.',
    facts: {
      'Bedrooms': '4',
      'Bathrooms': '4',
      'Plot Area': '180 sq.yds',
      'Facing': 'North',
    },
    cover_image_url: '/Villa.jpeg',
    images: ['/Villa.jpeg'],
    created_at: new Date().toISOString(),
  },
  {
    id: 'd4444444-4444-4444-4444-444444444444',
    title: 'DEMO: Commercial Office Space in Gajuwaka',
    slug: 'demo-commercial-office-space-in-gajuwaka',
    property_type: 'commercial',
    price: 9500000,
    price_display: 'Rs 95 Lakhs',
    size: 1100,
    unit: 'sq.ft',
    location: 'Main Road, Gajuwaka, Vizag',
    status: 'available',
    is_vmrda_approved: false,
    is_rera_approved: false,
    is_featured: false,
    is_published: true,
    description: 'Main road facing commercial unit suitable for branch office, clinic, or consulting firm. Ample customer parking in front, high footfall commercial zone.',
    facts: {
      'Floor': '2nd',
      'Furnishing': 'Unfurnished',
      'Power': 'Commercial 3-Phase',
    },
    cover_image_url: '/commercial.jpg',
    images: ['/commercial.jpg'],
    created_at: new Date().toISOString(),
  },
];

export const DEFAULT_SETTINGS: SiteSettings = {
  phone: '8019928236',
  whatsapp_number: '8019928236',
  whatsapp_link: 'https://wa.me/918019928236',
  instagram_url: 'https://www.instagram.com/securehomevizag',
  youtube_url: 'https://youtube.com/@securehomevizag',
  hero_heading: 'Verified plots, flats and villas in Visakhapatnam',
  hero_subheading: 'Direct guidance with verified title records, transparent documentation, and no hidden charges.',
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
