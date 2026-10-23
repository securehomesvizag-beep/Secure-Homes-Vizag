export type PropertyType = 'plots' | 'flats' | 'villas' | 'commercial';

export type ListingStatus = 'available' | 'few_left' | 'sold';

export type SizeUnit = 'sq.yds' | 'sq.ft' | 'acres';

export type LeadSource = 'whatsapp_click' | 'call_click' | 'form';

export type LeadStatus = 'new' | 'contacted' | 'site_visit_planned' | 'closed' | 'not_interested';

export interface Listing {
  id: string;
  title: string;
  slug: string;
  property_type: PropertyType;
  price: number;
  price_display: string;
  size: number;
  unit: SizeUnit;
  location: string;
  status: ListingStatus;
  is_vmrda_approved: boolean;
  is_rera_approved: boolean;
  is_featured: boolean;
  is_published: boolean;
  description: string;
  facts?: Record<string, string>;
  cover_image_url: string;
  images?: string[];
  created_at: string;
  updated_at?: string;
}

export interface ListingImage {
  id: string;
  listing_id: string;
  image_url: string;
  sort_order: number;
  created_at: string;
}

export interface Lead {
  id: string;
  source: LeadSource;
  name?: string | null;
  phone?: string | null;
  interest?: PropertyType | null;
  message?: string | null;
  listing_id?: string | null;
  listing_title?: string | null;
  page_url?: string | null;
  status: LeadStatus;
  notes?: string | null;
  ip_address?: string | null;
  created_at: string;
}

export interface Testimonial {
  id: string;
  client_name: string;
  location?: string | null;
  quote: string;
  property_type?: string | null;
  is_visible: boolean;
  created_at: string;
}

export interface SiteSettings {
  phone: string;
  whatsapp_number: string;
  whatsapp_link: string;
  instagram_url: string;
  youtube_url: string;
  hero_heading: string;
  hero_subheading: string;
  office_address: string;
  working_hours: string;
  plots_description?: string;
  flats_description?: string;
  villas_description?: string;
  commercial_description?: string;
  youtube_short_id?: string;
}

export const PROPERTY_TYPE_LABELS: Record<PropertyType, string> = {
  plots: 'Plots',
  flats: 'Flats',
  villas: 'Villas',
  commercial: 'Commercial',
};

export const LISTING_STATUS_LABELS: Record<ListingStatus, string> = {
  available: 'Available',
  few_left: 'Few left',
  sold: 'Sold',
};

export const LEAD_SOURCE_LABELS: Record<LeadSource, string> = {
  whatsapp_click: 'WhatsApp tap',
  call_click: 'Call tap',
  form: 'Enquiry form',
};

export const LEAD_STATUS_LABELS: Record<LeadStatus, string> = {
  new: 'New',
  contacted: 'Contacted',
  site_visit_planned: 'Site visit planned',
  closed: 'Closed',
  not_interested: 'Not interested',
};
