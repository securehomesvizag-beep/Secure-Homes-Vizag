import { Listing, Lead, Testimonial, SiteSettings, PropertyType } from './types';
import { createClient as createServerSupabase } from './supabase/server';
import { createAdminClient } from './supabase/admin';

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
    cover_image_url: '/placeholders/commercial.svg',
    images: ['/placeholders/commercial.svg'],
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
  hero_subheading: 'Direct broker guidance with verified title records, clear pricing, and no hidden charges.',
  office_address: 'Visakhapatnam, Andhra Pradesh',
  working_hours: 'Monday to Saturday: 9:00 AM to 7:00 PM',
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

export async function getSettings(): Promise<SiteSettings> {
  const adminClient = createAdminClient();
  if (adminClient) {
    try {
      const { data, error } = await adminClient.from('settings').select('*');
      if (!error && data && data.length > 0) {
        const settingsMap: Record<string, string> = {};
        data.forEach((row: { key: string; value: string }) => {
          settingsMap[row.key] = row.value;
        });
        return {
          phone: settingsMap.phone || DEFAULT_SETTINGS.phone,
          whatsapp_number: settingsMap.whatsapp_number || DEFAULT_SETTINGS.whatsapp_number,
          whatsapp_link: settingsMap.whatsapp_link || DEFAULT_SETTINGS.whatsapp_link,
          instagram_url: settingsMap.instagram_url || DEFAULT_SETTINGS.instagram_url,
          youtube_url: settingsMap.youtube_url || DEFAULT_SETTINGS.youtube_url,
          hero_heading: settingsMap.hero_heading || DEFAULT_SETTINGS.hero_heading,
          hero_subheading: settingsMap.hero_subheading || DEFAULT_SETTINGS.hero_subheading,
          office_address: settingsMap.office_address || DEFAULT_SETTINGS.office_address,
          working_hours: settingsMap.working_hours || DEFAULT_SETTINGS.working_hours,
        };
      }
    } catch {
      // Fallback
    }
  }
  return store.__settings_store || DEFAULT_SETTINGS;
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

export async function insertLead(lead: Omit<Lead, 'id' | 'created_at' | 'status'>): Promise<Lead> {
  const newLead: Lead = {
    ...lead,
    id: typeof crypto !== 'undefined' && crypto.randomUUID ? crypto.randomUUID() : `lead_${Date.now()}`,
    status: 'new',
    created_at: new Date().toISOString(),
  };

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

  if (!store.__leads_store) {
    store.__leads_store = [];
  }
  store.__leads_store.unshift(newLead);
  return newLead;
}

export async function getLeadsForAdmin(): Promise<Lead[]> {
  const adminClient = createAdminClient();
  if (adminClient) {
    try {
      const { data, error } = await adminClient.from('leads').select('*').order('created_at', { ascending: false });
      if (!error && data) {
        return data as Lead[];
      }
    } catch {
      // Fallback
    }
  }

  return store.__leads_store || [];
}
