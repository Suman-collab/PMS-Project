export type PmsServiceCode =
  | 'event'
  | 'mice'
  | 'activation'
  | 'branding'
  | 'hoarding'
  | 'digital'
  | 'merchandising';

export interface PmsService {
  id: string;
  code: PmsServiceCode;
  title: string;
  subtitle: string;
  tagline: string;
  description: string;
  coreHighlights: string[];
  detailedInclusions: string[];
  image: string;
  badge: string;
  active?: boolean;
}

export interface PmsGalleryProject {
  id: string;
  title: string;
  category: PmsServiceCode;
  categoryLabel: string;
  client: string;
  year: string;
  description: string;
  image: string;
  images?: string[];
  location?: string;
  highlights?: string[];
  active?: boolean;
}

export interface PmsTestimonial {
  id: string;
  clientName: string;
  role: string;
  company: string;
  serviceCategory: string;
  rating: number;
  review: string;
  projectHighlight: string;
  location: string;
  avatar?: string;
  tag: string;
  verified: boolean;
  active?: boolean;
}

export interface ConfiguratorState {
  serviceCategory: string;
  scale: string;
  duration: string;
  addOns: string[];
}

export interface PmsInquiryFormData {
  name: string;
  phone: string;
  email: string;
  eventDetails: string;
  serviceCategory?: string;
  scale?: string;
  duration?: string;
}

export type InquiryStatus =
  | 'New Lead'
  | 'In Review'
  | 'Contacted'
  | 'Proposal Sent'
  | 'Won / Confirmed'
  | 'Closed / Archived';

export interface StoredPmsInquiry extends PmsInquiryFormData {
  id: string;
  status: InquiryStatus | string;
  createdAt: string;
  notes?: string[];
  priority?: 'High' | 'Medium' | 'Low';
  estimatedValue?: string;
}

export interface PmsCompanyInfo {
  name: string;
  shortName: string;
  subtitle: string;
  tagline: string;
  heroDescription: string;
  mission: string;
  vision: string;
  aboutWhoWeAre: string;
  aboutWhatWeDo: string;
  phone1: string;
  phone2: string;
  phone1Raw: string;
  phone2Raw: string;
  email1: string;
  email2: string;
  address: string;
  mapUrl: string;
  workingHours: string;
  logoUrl?: string;
  logoWhiteUrl?: string;
  logoHeightPx?: number;
  stats: Array<{ label: string; value: string }>;
}

export interface PmsSlide {
  id: string;
  desktopImage: string;
  mobileImage?: string;
  title?: string;
  subtitle?: string;
  badge?: string;
  buttonText?: string;
  buttonLink?: string;
  order: number;
  active?: boolean;
}

export interface PmsSlideshowSettings {
  enabled: boolean;
  autoplay: boolean;
  intervalSeconds: number;
  transitionEffect: 'fade' | 'slide';
  showDots: boolean;
  showArrows: boolean;
  showCaptions: boolean;
  heightDesktop: 'standard' | 'tall' | 'compact';
}

export interface PmsSeoSettings {
  metaTitle: string;
  metaDescription: string;
  metaKeywords: string;
  author: string;
  canonicalUrl: string;
  robotsIndexing: string;
  ogTitle: string;
  ogDescription: string;
  ogImage: string;
  ogSiteName: string;
  ogType: string;
  twitterCardType: string;
  twitterTitle: string;
  twitterDescription: string;
  twitterImage: string;
  googleSiteVerification: string;
  googleAnalyticsId: string;
  structuredDataEnabled: boolean;
  businessType: string;
  businessName: string;
  geoRegion: string;
  geoPlacename: string;
  primaryCity: string;
  priceRange: string;
}

export interface PmsFaqItem {
  id: string;
  question: string;
  answer: string;
  category: string;
  order?: number;
  active?: boolean;
}

export type CmsAdminTab =
  | 'dashboard'
  | 'logo'
  | 'slideshow'
  | 'leads'
  | 'services'
  | 'gallery'
  | 'testimonials'
  | 'faq'
  | 'company'
  | 'seo'
  | 'ai-generator'
  | 'settings';

export interface CmsAuditLog {
  id: string;
  action: string;
  entity: string;
  details: string;
  timestamp: string;
  user: string;
}

