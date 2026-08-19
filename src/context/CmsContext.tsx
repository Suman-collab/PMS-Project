import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  PmsService,
  PmsGalleryProject,
  PmsTestimonial,
  PmsCompanyInfo,
  StoredPmsInquiry,
  CmsAdminTab,
  CmsAuditLog,
  PmsInquiryFormData,
  PmsSlide,
  PmsSlideshowSettings,
  PmsSeoSettings,
  PmsFaqItem,
} from '../types';
import {
  PMS_SERVICES as INITIAL_SERVICES,
  PMS_GALLERY_PROJECTS as INITIAL_PROJECTS,
  PMS_TESTIMONIALS as INITIAL_TESTIMONIALS,
  PMS_COMPANY_INFO as INITIAL_COMPANY_INFO,
  PMS_INITIAL_SLIDES as INITIAL_SLIDES,
  PMS_INITIAL_SLIDESHOW_SETTINGS as INITIAL_SLIDESHOW_SETTINGS,
  PMS_INITIAL_SEO_SETTINGS as INITIAL_SEO_SETTINGS,
  PMS_INITIAL_FAQS as INITIAL_FAQS,
} from '../data/pmsData';

interface CmsContextType {
  // Data
  slides: PmsSlide[];
  slideshowSettings: PmsSlideshowSettings;
  services: PmsService[];
  galleryProjects: PmsGalleryProject[];
  testimonials: PmsTestimonial[];
  faqs: PmsFaqItem[];
  companyInfo: PmsCompanyInfo;
  seoSettings: PmsSeoSettings;
  inquiries: StoredPmsInquiry[];
  auditLogs: CmsAuditLog[];

  // Admin View & Auth
  isAdminOpen: boolean;
  setIsAdminOpen: (open: boolean) => void;
  isAuthenticated: boolean;
  activeTab: CmsAdminTab;
  setActiveTab: (tab: CmsAdminTab) => void;
  loginAdmin: (passcode: string) => boolean;
  logoutAdmin: () => void;

  // CRUD for Slideshow
  addSlide: (slide: Omit<PmsSlide, 'id' | 'order'>) => void;
  updateSlide: (id: string, updates: Partial<PmsSlide>) => void;
  deleteSlide: (id: string) => void;
  reorderSlide: (id: string, direction: 'up' | 'down') => void;
  toggleSlideActive: (id: string) => void;
  updateSlideshowSettings: (settings: Partial<PmsSlideshowSettings>) => void;

  // CRUD for Inquiries (CRM Leads)
  addInquiry: (data: PmsInquiryFormData) => Promise<{ success: boolean; id?: string }>;
  updateInquiryStatus: (id: string, status: string) => void;
  updateInquiryDetails: (id: string, updates: Partial<StoredPmsInquiry>) => void;
  deleteInquiry: (id: string) => void;
  addInquiryNote: (id: string, note: string) => void;

  // CRUD for Services
  addService: (service: Omit<PmsService, 'id'>) => void;
  updateService: (id: string, updates: Partial<PmsService>) => void;
  deleteService: (id: string) => void;
  toggleServiceActive: (id: string) => void;

  // CRUD for Gallery Projects
  addProject: (project: Omit<PmsGalleryProject, 'id'>) => void;
  updateProject: (id: string, updates: Partial<PmsGalleryProject>) => void;
  deleteProject: (id: string) => void;
  toggleProjectActive: (id: string) => void;

  // CRUD for Testimonials
  addTestimonial: (testimonial: Omit<PmsTestimonial, 'id'>) => void;
  updateTestimonial: (id: string, updates: Partial<PmsTestimonial>) => void;
  deleteTestimonial: (id: string) => void;
  toggleTestimonialActive: (id: string) => void;

  // CRUD for FAQs
  addFaq: (faq: Omit<PmsFaqItem, 'id' | 'order'>) => void;
  updateFaq: (id: string, updates: Partial<PmsFaqItem>) => void;
  deleteFaq: (id: string) => void;
  reorderFaq: (id: string, direction: 'up' | 'down') => void;
  toggleFaqActive: (id: string) => void;

  // Company & SEO Settings
  updateCompanyInfo: (updates: Partial<PmsCompanyInfo>) => void;
  updateSeoSettings: (updates: Partial<PmsSeoSettings>) => void;
  resetSeoSettings: () => void;

  // System & Export
  resetToDefaults: () => void;
  exportDataJSON: () => void;
  importDataJSON: (jsonStr: string) => boolean;
}

const CmsContext = createContext<CmsContextType | null>(null);

const STORAGE_KEYS = {
  SLIDES: 'pms_cms_slides_v2',
  SLIDESHOW_SETTINGS: 'pms_cms_slideshow_settings_v2',
  SERVICES: 'pms_cms_services_v2',
  PROJECTS: 'pms_cms_projects_v3',
  TESTIMONIALS: 'pms_cms_testimonials_v3',
  FAQS: 'pms_cms_faqs_v2',
  COMPANY: 'pms_cms_company_v3',
  SEO: 'pms_cms_seo_v3',
  INQUIRIES: 'pms_cms_inquiries_v2',
  AUTH: 'pms_cms_auth_v2',
  LOGS: 'pms_cms_logs_v2',
};

const INITIAL_INQUIRIES: StoredPmsInquiry[] = [
  {
    id: 'PMS-INQ-101',
    name: 'Rajesh Banerjee',
    phone: '+91 98316 30072',
    email: 'r.banerjee@eastindiatech.com',
    eventDetails: 'Annual National Leadership MICE Conference & Dealer Meet in Kolkata for 450 delegates with 3D LED stage and hotel management.',
    serviceCategory: 'Corporate Events & MICE',
    scale: '300-800 Guests / Large',
    duration: 'Full Day Event (8 Hours)',
    status: 'Proposal Sent',
    createdAt: new Date(Date.now() - 3600000 * 18).toISOString(),
    priority: 'High',
    estimatedValue: '₹ 8,50,000',
    notes: ['Shared 3D stage mockups and technical rider with client.'],
  },
  {
    id: 'PMS-INQ-102',
    name: 'Priyanka Sen',
    phone: '+91 80175 30072',
    email: 'priyanka@royalfoods.in',
    eventDetails: 'Experiential Mall Activation across South City & City Centre Kolkata with sampling stalls, promoter staff, and LED interactive wheel.',
    serviceCategory: 'Brand Activation & Experiential',
    scale: 'Multi-Day Weekend Activation',
    duration: '3 Consecutive Days',
    status: 'Won / Confirmed',
    createdAt: new Date(Date.now() - 3600000 * 42).toISOString(),
    priority: 'High',
    estimatedValue: '₹ 4,20,000',
    notes: ['Advance token received. Fabrication underway in Madurdaha workshop.'],
  },
  {
    id: 'PMS-INQ-103',
    name: 'Amitabh Roy',
    phone: '+91 98300 12345',
    email: 'marketing@bengalinfra.co',
    eventDetails: 'High-visibility Outdoor Hoardings along EM Bypass, Park Circus connector, and Airport VIP Road for luxury real estate launch.',
    serviceCategory: 'Hoarding & Outdoor Advertising',
    scale: '12 Premier Billboard Sites',
    duration: '45 Days Campaign',
    status: 'In Review',
    createdAt: new Date(Date.now() - 3600000 * 8).toISOString(),
    priority: 'Medium',
    estimatedValue: '₹ 12,00,000',
    notes: ['Traffic counts and location availability chart provided.'],
  }
];

export const CmsProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Load saved state or default
  const [slides, setSlides] = useState<PmsSlide[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.SLIDES);
    if (saved) {
      try { return JSON.parse(saved); } catch (e) { /* ignore */ }
    }
    return INITIAL_SLIDES;
  });

  const [slideshowSettings, setSlideshowSettings] = useState<PmsSlideshowSettings>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.SLIDESHOW_SETTINGS);
    if (saved) {
      try { return JSON.parse(saved); } catch (e) { /* ignore */ }
    }
    return INITIAL_SLIDESHOW_SETTINGS;
  });

  const [services, setServices] = useState<PmsService[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.SERVICES);
    if (saved) {
      try { return JSON.parse(saved); } catch (e) { /* ignore */ }
    }
    return INITIAL_SERVICES;
  });

  const [galleryProjects, setGalleryProjects] = useState<PmsGalleryProject[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.PROJECTS);
    if (saved) {
      try {
        const parsed: PmsGalleryProject[] = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) {
          return parsed.map((p) => {
            const initialMatch = INITIAL_PROJECTS.find((ip) => ip.id === p.id);
            const validImages =
              Array.isArray(p.images) && p.images.length > 0
                ? p.images
                : (initialMatch?.images || [p.image]);
            return {
              ...p,
              image: p.image || validImages[0],
              images: validImages,
            };
          });
        }
      } catch (e) {
        /* ignore */
      }
    }
    return INITIAL_PROJECTS;
  });

  const [testimonials, setTestimonials] = useState<PmsTestimonial[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.TESTIMONIALS);
    if (saved) {
      try { return JSON.parse(saved); } catch (e) { /* ignore */ }
    }
    return INITIAL_TESTIMONIALS;
  });

  const [faqs, setFaqs] = useState<PmsFaqItem[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.FAQS);
    if (saved) {
      try { return JSON.parse(saved); } catch (e) { /* ignore */ }
    }
    return INITIAL_FAQS;
  });

  const [companyInfo, setCompanyInfo] = useState<PmsCompanyInfo>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.COMPANY);
    if (saved) {
      try { return JSON.parse(saved); } catch (e) { /* ignore */ }
    }
    return INITIAL_COMPANY_INFO;
  });

  const [seoSettings, setSeoSettings] = useState<PmsSeoSettings>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.SEO);
    if (saved) {
      try { return JSON.parse(saved); } catch (e) { /* ignore */ }
    }
    return INITIAL_SEO_SETTINGS;
  });

  const [inquiries, setInquiries] = useState<StoredPmsInquiry[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.INQUIRIES);
    if (saved) {
      try { return JSON.parse(saved); } catch (e) { /* ignore */ }
    }
    return INITIAL_INQUIRIES;
  });

  const [auditLogs, setAuditLogs] = useState<CmsAuditLog[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.LOGS);
    if (saved) {
      try { return JSON.parse(saved); } catch (e) { /* ignore */ }
    }
    return [
      {
        id: 'log-1',
        action: 'System Initialized',
        entity: 'CMS Core',
        details: 'PMS Innovation Solutions Advanced CMS Portal Ready',
        timestamp: new Date().toISOString(),
        user: 'Admin (Kolkata HQ)',
      },
    ];
  });

  // Admin UI State
  const [isAdminOpen, setIsAdminOpen] = useState<boolean>(false);

  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
    return localStorage.getItem(STORAGE_KEYS.AUTH) === 'true';
  });

  const [activeTab, setActiveTab] = useState<CmsAdminTab>('dashboard');

  // Persistence hooks
  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.SLIDES, JSON.stringify(slides));
  }, [slides]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.SLIDESHOW_SETTINGS, JSON.stringify(slideshowSettings));
  }, [slideshowSettings]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.SERVICES, JSON.stringify(services));
  }, [services]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.PROJECTS, JSON.stringify(galleryProjects));
  }, [galleryProjects]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.TESTIMONIALS, JSON.stringify(testimonials));
  }, [testimonials]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.FAQS, JSON.stringify(faqs));
  }, [faqs]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.COMPANY, JSON.stringify(companyInfo));
  }, [companyInfo]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.SEO, JSON.stringify(seoSettings));
  }, [seoSettings]);

  // Live SEO & Metadata synchronizer directly modifying document head
  useEffect(() => {
    if (typeof document === 'undefined') return;

    // 1. Update Document Title
    if (seoSettings.metaTitle) {
      document.title = seoSettings.metaTitle;
    }

    // Helper to safely create or update meta tags
    const setMetaTag = (attr: 'name' | 'property', key: string, content: string) => {
      if (!content && content !== '') return;
      let el = document.querySelector(`meta[${attr}="${key}"]`);
      if (!el) {
        el = document.createElement('meta');
        el.setAttribute(attr, key);
        document.head.appendChild(el);
      }
      el.setAttribute('content', content);
    };

    // 2. Standard Meta Tags
    setMetaTag('name', 'description', seoSettings.metaDescription);
    setMetaTag('name', 'keywords', seoSettings.metaKeywords);
    setMetaTag('name', 'author', seoSettings.author);
    setMetaTag('name', 'robots', seoSettings.robotsIndexing);
    setMetaTag('name', 'geo.region', seoSettings.geoRegion);
    setMetaTag('name', 'geo.placename', seoSettings.geoPlacename);

    if (seoSettings.googleSiteVerification) {
      setMetaTag('name', 'google-site-verification', seoSettings.googleSiteVerification);
    }

    // 3. Open Graph Social Tags
    setMetaTag('property', 'og:title', seoSettings.ogTitle || seoSettings.metaTitle);
    setMetaTag('property', 'og:description', seoSettings.ogDescription || seoSettings.metaDescription);
    setMetaTag('property', 'og:image', seoSettings.ogImage);
    setMetaTag('property', 'og:site_name', seoSettings.ogSiteName);
    setMetaTag('property', 'og:type', seoSettings.ogType || 'website');

    // 4. Twitter Card Tags
    setMetaTag('name', 'twitter:card', seoSettings.twitterCardType || 'summary_large_image');
    setMetaTag('name', 'twitter:title', seoSettings.twitterTitle || seoSettings.ogTitle || seoSettings.metaTitle);
    setMetaTag('name', 'twitter:description', seoSettings.twitterDescription || seoSettings.ogDescription || seoSettings.metaDescription);
    setMetaTag('name', 'twitter:image', seoSettings.twitterImage || seoSettings.ogImage);

    // 5. Canonical Link
    if (seoSettings.canonicalUrl) {
      let canonicalEl = document.querySelector('link[rel="canonical"]');
      if (!canonicalEl) {
        canonicalEl = document.createElement('link');
        canonicalEl.setAttribute('rel', 'canonical');
        document.head.appendChild(canonicalEl);
      }
      canonicalEl.setAttribute('href', seoSettings.canonicalUrl);
    }

    // 6. JSON-LD Structured Data Schema for Google Crawlers (LocalBusiness & FAQPage)
    if (seoSettings.structuredDataEnabled) {
      let scriptEl = document.querySelector('script[data-pms-schema="true"]');
      if (!scriptEl) {
        scriptEl = document.createElement('script');
        scriptEl.setAttribute('type', 'application/ld+json');
        scriptEl.setAttribute('data-pms-schema', 'true');
        document.head.appendChild(scriptEl);
      }

      const activeFaqList = faqs.filter((f) => f.active !== false);

      const businessSchema = {
        '@type': seoSettings.businessType || 'LocalBusiness',
        '@id': `${seoSettings.canonicalUrl || 'https://pmsinnovations.com'}#business`,
        name: seoSettings.businessName || companyInfo.name,
        description: seoSettings.metaDescription,
        url: seoSettings.canonicalUrl || 'https://pmsinnovations.com',
        image: seoSettings.ogImage,
        telephone: companyInfo.phone1,
        email: companyInfo.email1,
        address: {
          '@type': 'PostalAddress',
          streetAddress: companyInfo.address,
          addressLocality: 'Kolkata',
          addressRegion: 'West Bengal',
          postalCode: '700107',
          addressCountry: 'IN',
        },
        openingHoursSpecification: {
          '@type': 'OpeningHoursSpecification',
          dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
          opens: '10:00',
          closes: '19:00',
        },
        priceRange: seoSettings.priceRange || '$$',
        geo: {
          '@type': 'GeoCoordinates',
          latitude: 22.5126,
          longitude: 88.4042,
        },
      };

      const faqSchema = {
        '@type': 'FAQPage',
        '@id': `${seoSettings.canonicalUrl || 'https://pmsinnovations.com'}#faq`,
        mainEntity: activeFaqList.map((f) => ({
          '@type': 'Question',
          name: f.question,
          acceptedAnswer: {
            '@type': 'Answer',
            text: f.answer,
          },
        })),
      };

      const schemaData = {
        '@context': 'https://schema.org',
        '@graph': [businessSchema, faqSchema],
      };

      scriptEl.textContent = JSON.stringify(schemaData, null, 2);
    }
  }, [seoSettings, companyInfo, faqs]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.INQUIRIES, JSON.stringify(inquiries));
  }, [inquiries]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.LOGS, JSON.stringify(auditLogs));
  }, [auditLogs]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.AUTH, isAuthenticated ? 'true' : 'false');
  }, [isAuthenticated]);

  // Log action helper
  const addLog = (action: string, entity: string, details: string) => {
    const newLog: CmsAuditLog = {
      id: `log-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
      action,
      entity,
      details,
      timestamp: new Date().toISOString(),
      user: 'Administrator',
    };
    setAuditLogs((prev) => [newLog, ...prev.slice(0, 49)]);
  };

  // Auth - Passcode strictly subham@2005
  const loginAdmin = (passcode: string) => {
    if (passcode.trim() === 'subham@2005') {
      setIsAuthenticated(true);
      addLog('Admin Login', 'Security', 'Authorized CMS session started');
      return true;
    }
    return false;
  };

  const logoutAdmin = () => {
    setIsAuthenticated(false);
    addLog('Admin Logout', 'Security', 'User logged out');
  };

  // Slideshow CRUD
  const addSlide = (slideData: Omit<PmsSlide, 'id' | 'order'>) => {
    const newSlide: PmsSlide = {
      ...slideData,
      id: `slide-${Date.now()}`,
      order: slides.length + 1,
      active: true,
    };
    setSlides((prev) => [...prev, newSlide]);
    addLog('Slide Added', 'Slideshow CMS', `Added slide "${slideData.title || 'Banner Slide'}"`);
  };

  const updateSlide = (id: string, updates: Partial<PmsSlide>) => {
    setSlides((prev) =>
      prev.map((s) => (s.id === id ? { ...s, ...updates } : s))
    );
    addLog('Slide Updated', 'Slideshow CMS', `Updated slide ${id}`);
  };

  const deleteSlide = (id: string) => {
    const target = slides.find((s) => s.id === id);
    setSlides((prev) => prev.filter((s) => s.id !== id));
    addLog('Slide Deleted', 'Slideshow CMS', `Removed slide "${target?.title || id}"`);
  };

  const reorderSlide = (id: string, direction: 'up' | 'down') => {
    setSlides((prev) => {
      const idx = prev.findIndex((s) => s.id === id);
      if (idx === -1) return prev;
      if (direction === 'up' && idx === 0) return prev;
      if (direction === 'down' && idx === prev.length - 1) return prev;

      const targetIdx = direction === 'up' ? idx - 1 : idx + 1;
      const copy = [...prev];
      const [item] = copy.splice(idx, 1);
      copy.splice(targetIdx, 0, item);
      return copy.map((s, index) => ({ ...s, order: index + 1 }));
    });
  };

  const toggleSlideActive = (id: string) => {
    setSlides((prev) =>
      prev.map((s) => (s.id === id ? { ...s, active: s.active === false ? true : false } : s))
    );
  };

  const updateSlideshowSettings = (updates: Partial<PmsSlideshowSettings>) => {
    setSlideshowSettings((prev) => ({ ...prev, ...updates }));
    addLog('Slideshow Settings Updated', 'Slideshow CMS', `Rotation/Autoplay settings adjusted`);
  };

  // Inquiries CRUD
  const addInquiry = async (data: PmsInquiryFormData): Promise<{ success: boolean; id?: string }> => {
    const newInquiry: StoredPmsInquiry = {
      id: `PMS-INQ-${Math.floor(100 + Math.random() * 900)}`,
      ...data,
      status: 'New Lead',
      createdAt: new Date().toISOString(),
      priority: 'Medium',
      notes: [],
    };

    setInquiries((prev) => [newInquiry, ...prev]);
    addLog('New Lead Received', 'Inquiries CRM', `${newInquiry.name} (${newInquiry.phone}) - ${newInquiry.serviceCategory || 'General Inquiry'}`);

    // Try posting to backend server if active
    try {
      await fetch('/api/inquiries', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
    } catch (e) {
      // Local fallback already succeeded
    }

    return { success: true, id: newInquiry.id };
  };

  const updateInquiryStatus = (id: string, status: string) => {
    setInquiries((prev) =>
      prev.map((item) => (item.id === id ? { ...item, status } : item))
    );
    addLog('Status Updated', 'Inquiries CRM', `Inquiry ${id} status set to "${status}"`);
  };

  const updateInquiryDetails = (id: string, updates: Partial<StoredPmsInquiry>) => {
    setInquiries((prev) =>
      prev.map((item) => (item.id === id ? { ...item, ...updates } : item))
    );
    addLog('Lead Details Updated', 'Inquiries CRM', `Updated inquiry details for ${id}`);
  };

  const deleteInquiry = (id: string) => {
    setInquiries((prev) => prev.filter((item) => item.id !== id));
    addLog('Lead Removed', 'Inquiries CRM', `Deleted inquiry ${id}`);
  };

  const addInquiryNote = (id: string, note: string) => {
    if (!note.trim()) return;
    setInquiries((prev) =>
      prev.map((item) => {
        if (item.id === id) {
          const notes = item.notes || [];
          return {
            ...item,
            notes: [`[${new Date().toLocaleDateString()}] ${note.trim()}`, ...notes],
          };
        }
        return item;
      })
    );
    addLog('Note Added', 'Inquiries CRM', `Added note to lead ${id}`);
  };

  // Services CRUD
  const addService = (service: Omit<PmsService, 'id'>) => {
    const newService: PmsService = {
      ...service,
      id: `pms-srv-${Date.now()}`,
      active: true,
    };
    setServices((prev) => [...prev, newService]);
    addLog('Service Created', 'Services CMS', `Added service: "${service.title}"`);
  };

  const updateService = (id: string, updates: Partial<PmsService>) => {
    setServices((prev) =>
      prev.map((s) => (s.id === id ? { ...s, ...updates } : s))
    );
    addLog('Service Updated', 'Services CMS', `Updated service details for: ${id}`);
  };

  const deleteService = (id: string) => {
    const target = services.find((s) => s.id === id);
    setServices((prev) => prev.filter((s) => s.id !== id));
    addLog('Service Deleted', 'Services CMS', `Removed service: "${target?.title || id}"`);
  };

  const toggleServiceActive = (id: string) => {
    setServices((prev) =>
      prev.map((s) => (s.id === id ? { ...s, active: s.active === false ? true : false } : s))
    );
  };

  // Projects CRUD
  const addProject = (project: Omit<PmsGalleryProject, 'id'>) => {
    const newProj: PmsGalleryProject = {
      ...project,
      id: `proj-${Date.now()}`,
      active: true,
    };
    setGalleryProjects((prev) => [newProj, ...prev]);
    addLog('Showcase Project Added', 'Gallery CMS', `Added project: "${project.title}" for ${project.client}`);
  };

  const updateProject = (id: string, updates: Partial<PmsGalleryProject>) => {
    setGalleryProjects((prev) =>
      prev.map((p) => (p.id === id ? { ...p, ...updates } : p))
    );
    addLog('Project Updated', 'Gallery CMS', `Updated showcase project: ${id}`);
  };

  const deleteProject = (id: string) => {
    const target = galleryProjects.find((p) => p.id === id);
    setGalleryProjects((prev) => prev.filter((p) => p.id !== id));
    addLog('Project Deleted', 'Gallery CMS', `Removed showcase item: "${target?.title || id}"`);
  };

  const toggleProjectActive = (id: string) => {
    setGalleryProjects((prev) =>
      prev.map((p) => (p.id === id ? { ...p, active: p.active === false ? true : false } : p))
    );
  };

  // Testimonials CRUD
  const addTestimonial = (testimonial: Omit<PmsTestimonial, 'id'>) => {
    const newTestimonial: PmsTestimonial = {
      ...testimonial,
      id: `test-${Date.now()}`,
      active: true,
    };
    setTestimonials((prev) => [newTestimonial, ...prev]);
    addLog('Testimonial Added', 'Testimonials CMS', `Added endorsement from ${testimonial.clientName} (${testimonial.company})`);
  };

  const updateTestimonial = (id: string, updates: Partial<PmsTestimonial>) => {
    setTestimonials((prev) =>
      prev.map((t) => (t.id === id ? { ...t, ...updates } : t))
    );
    addLog('Testimonial Updated', 'Testimonials CMS', `Updated review for: ${id}`);
  };

  const deleteTestimonial = (id: string) => {
    const target = testimonials.find((t) => t.id === id);
    setTestimonials((prev) => prev.filter((t) => t.id !== id));
    addLog('Testimonial Deleted', 'Testimonials CMS', `Removed endorsement by "${target?.clientName || id}"`);
  };

  const toggleTestimonialActive = (id: string) => {
    setTestimonials((prev) =>
      prev.map((t) => (t.id === id ? { ...t, active: t.active === false ? true : false } : t))
    );
  };

  // CRUD for FAQs
  const addFaq = (faq: Omit<PmsFaqItem, 'id' | 'order'>) => {
    const newFaq: PmsFaqItem = {
      ...faq,
      id: `faq-${Date.now()}`,
      order: faqs.length + 1,
      active: true,
    };
    setFaqs((prev) => [...prev, newFaq]);
    addLog('FAQ Created', 'FAQ CMS', `Created new FAQ: "${faq.question.slice(0, 40)}..."`);
  };

  const updateFaq = (id: string, updates: Partial<PmsFaqItem>) => {
    setFaqs((prev) =>
      prev.map((f) => (f.id === id ? { ...f, ...updates } : f))
    );
    addLog('FAQ Updated', 'FAQ CMS', `Updated FAQ with ID: ${id}`);
  };

  const deleteFaq = (id: string) => {
    const target = faqs.find((f) => f.id === id);
    setFaqs((prev) => prev.filter((f) => f.id !== id));
    addLog('FAQ Deleted', 'FAQ CMS', `Removed FAQ: "${target?.question.slice(0, 40) || id}"`);
  };

  const reorderFaq = (id: string, direction: 'up' | 'down') => {
    setFaqs((prev) => {
      const index = prev.findIndex((f) => f.id === id);
      if (index === -1) return prev;
      if (direction === 'up' && index === 0) return prev;
      if (direction === 'down' && index === prev.length - 1) return prev;

      const targetIndex = direction === 'up' ? index - 1 : index + 1;
      const copy = [...prev];
      const temp = copy[index];
      copy[index] = copy[targetIndex];
      copy[targetIndex] = temp;
      return copy.map((f, i) => ({ ...f, order: i + 1 }));
    });
    addLog('FAQ Reordered', 'FAQ CMS', `Moved FAQ ${direction}`);
  };

  const toggleFaqActive = (id: string) => {
    setFaqs((prev) =>
      prev.map((f) => (f.id === id ? { ...f, active: f.active === false ? true : false } : f))
    );
  };

  // Company & SEO Info
  const updateCompanyInfo = (updates: Partial<PmsCompanyInfo>) => {
    setCompanyInfo((prev) => ({ ...prev, ...updates }));
    addLog('Company Profile Updated', 'Settings CMS', 'Updated contact numbers, address, or branding text');
  };

  const updateSeoSettings = (updates: Partial<PmsSeoSettings>) => {
    setSeoSettings((prev) => ({ ...prev, ...updates }));
    addLog('SEO Settings Updated', 'SEO & Metadata CMS', 'Updated Google crawler tags, meta keywords, or social preview cards');
  };

  const resetSeoSettings = () => {
    setSeoSettings(INITIAL_SEO_SETTINGS);
    localStorage.removeItem(STORAGE_KEYS.SEO);
    addLog('SEO Reset', 'SEO & Metadata CMS', 'Restored default SEO & Google crawler configuration');
  };

  // Reset to Defaults
  const resetToDefaults = () => {
    setSlides(INITIAL_SLIDES);
    setSlideshowSettings(INITIAL_SLIDESHOW_SETTINGS);
    setServices(INITIAL_SERVICES);
    setGalleryProjects(INITIAL_PROJECTS);
    setTestimonials(INITIAL_TESTIMONIALS);
    setFaqs(INITIAL_FAQS);
    setCompanyInfo(INITIAL_COMPANY_INFO);
    setSeoSettings(INITIAL_SEO_SETTINGS);
    setInquiries(INITIAL_INQUIRIES);
    localStorage.removeItem(STORAGE_KEYS.SLIDES);
    localStorage.removeItem(STORAGE_KEYS.SLIDESHOW_SETTINGS);
    localStorage.removeItem(STORAGE_KEYS.SERVICES);
    localStorage.removeItem(STORAGE_KEYS.PROJECTS);
    localStorage.removeItem(STORAGE_KEYS.TESTIMONIALS);
    localStorage.removeItem(STORAGE_KEYS.FAQS);
    localStorage.removeItem(STORAGE_KEYS.COMPANY);
    localStorage.removeItem(STORAGE_KEYS.SEO);
    localStorage.removeItem(STORAGE_KEYS.INQUIRIES);
    addLog('System Reset', 'CMS Core', 'Restored original default PMS Innovation showcase data');
  };

  // Export JSON
  const exportDataJSON = () => {
    const data = {
      slides,
      slideshowSettings,
      services,
      galleryProjects,
      testimonials,
      faqs,
      companyInfo,
      seoSettings,
      inquiries,
      exportedAt: new Date().toISOString(),
      version: '3.5-pms-cms-faq',
    };
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `pms-innovation-cms-backup-${new Date().toISOString().slice(0, 10)}.json`;
    a.click();
    URL.revokeObjectURL(url);
    addLog('Backup Exported', 'Data Management', 'Exported complete website CMS, FAQ & SEO state to JSON');
  };

  // Import JSON
  const importDataJSON = (jsonStr: string): boolean => {
    try {
      const parsed = JSON.parse(jsonStr);
      if (parsed.slides) setSlides(parsed.slides);
      if (parsed.slideshowSettings) setSlideshowSettings(parsed.slideshowSettings);
      if (parsed.services) setServices(parsed.services);
      if (parsed.galleryProjects) setGalleryProjects(parsed.galleryProjects);
      if (parsed.testimonials) setTestimonials(parsed.testimonials);
      if (parsed.faqs) setFaqs(parsed.faqs);
      if (parsed.companyInfo) setCompanyInfo(parsed.companyInfo);
      if (parsed.seoSettings) setSeoSettings(parsed.seoSettings);
      if (parsed.inquiries) setInquiries(parsed.inquiries);
      addLog('Backup Restored', 'Data Management', 'Successfully imported CMS state from JSON file');
      return true;
    } catch (e) {
      return false;
    }
  };

  return (
    <CmsContext.Provider
      value={{
        slides,
        slideshowSettings,
        services,
        galleryProjects,
        testimonials,
        faqs,
        companyInfo,
        seoSettings,
        inquiries,
        auditLogs,
        isAdminOpen,
        setIsAdminOpen,
        isAuthenticated,
        activeTab,
        setActiveTab,
        loginAdmin,
        logoutAdmin,
        addSlide,
        updateSlide,
        deleteSlide,
        reorderSlide,
        toggleSlideActive,
        updateSlideshowSettings,
        addInquiry,
        updateInquiryStatus,
        updateInquiryDetails,
        deleteInquiry,
        addInquiryNote,
        addService,
        updateService,
        deleteService,
        toggleServiceActive,
        addProject,
        updateProject,
        deleteProject,
        toggleProjectActive,
        addTestimonial,
        updateTestimonial,
        deleteTestimonial,
        toggleTestimonialActive,
        addFaq,
        updateFaq,
        deleteFaq,
        reorderFaq,
        toggleFaqActive,
        updateCompanyInfo,
        updateSeoSettings,
        resetSeoSettings,
        resetToDefaults,
        exportDataJSON,
        importDataJSON,
      }}
    >
      {children}
    </CmsContext.Provider>
  );
};

export const useCms = () => {
  const context = useContext(CmsContext);
  if (!context) {
    throw new Error('useCms must be used within a CmsProvider');
  }
  return context;
};
