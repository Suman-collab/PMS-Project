import React, { useState, useEffect } from 'react';
import { CmsProvider, useCms } from './context/CmsContext';
import { TopHeader } from './components/TopHeader';
import { Navbar } from './components/Navbar';
import { StartupSlideshow } from './components/StartupSlideshow';
import { HeroSection } from './components/HeroSection';
import { AboutSection } from './components/AboutSection';
import { ServicesSection } from './components/ServicesSection';
import { RequirementConfigurator } from './components/RequirementConfigurator';
import { GallerySection } from './components/GallerySection';
import { TestimonialsSection } from './components/TestimonialsSection';
import { PmsFaqSection } from './components/PmsFaqSection';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';
import { CookieBanner } from './components/CookieBanner';
import { WhatsAppFloatingBtn } from './components/WhatsAppFloatingBtn';
import { ServiceDetailModal } from './components/ServiceDetailModal';
import { InquiryModal } from './components/InquiryModal';
import { AdminLayout } from './components/admin/AdminLayout';
import { AdminAuthModal } from './components/admin/AdminAuthModal';
import { PmsService, PmsServiceCode, PmsInquiryFormData } from './types';

function MainWebsite() {
  const [activeServiceDetail, setActiveServiceDetail] = useState<PmsService | null>(null);
  const [isInquiryModalOpen, setIsInquiryModalOpen] = useState(false);
  const [inquiryPrefill, setInquiryPrefill] = useState<Partial<PmsInquiryFormData>>({});

  const scrollToSection = (sectionId: string) => {
    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleOpenContact = (prefillNote?: string) => {
    if (prefillNote) {
      setInquiryPrefill({ eventDetails: prefillNote });
      setIsInquiryModalOpen(true);
    } else {
      scrollToSection('contact');
    }
  };

  const handleSelectServiceDetails = (service: PmsService) => {
    setActiveServiceDetail(service);
  };

  const handleInquireService = (serviceTitle: string, code: PmsServiceCode) => {
    setInquiryPrefill({
      serviceCategory: serviceTitle,
      eventDetails: `Inquiring specifically for "${serviceTitle}" (Code: ${code}). Please provide a customized scope and quotation.`,
    });
    setIsInquiryModalOpen(true);
  };

  const handleSendConfiguratorSpec = (spec: {
    serviceCategory: string;
    scale: string;
    duration: string;
    addOns: string[];
    tierName: string;
  }) => {
    setInquiryPrefill({
      serviceCategory: spec.serviceCategory,
      scale: spec.scale,
      duration: spec.duration,
      eventDetails: `Configurator Spec: ${spec.tierName}\n• Category: ${spec.serviceCategory}\n• Scale: ${spec.scale}\n• Duration: ${spec.duration}\n• Add-Ons: ${spec.addOns.join(', ')}`,
    });
    setIsInquiryModalOpen(true);
  };

  const handleGalleryProjectInquiry = (projectTitle?: string) => {
    if (projectTitle) {
      setInquiryPrefill({
        eventDetails: `Inspired by the executed project "${projectTitle}". Looking to implement a similar scope for our upcoming brand event/campaign.`,
      });
      setIsInquiryModalOpen(true);
    } else {
      scrollToSection('contact');
    }
  };

  return (
    <div className="min-h-screen bg-white text-slate-900 selection:bg-blue-600 selection:text-white font-sans">
      {/* Top Header Bar */}
      <TopHeader />

      {/* Main Navbar */}
      <Navbar
        onOpenContact={handleOpenContact}
        onOpenConfigurator={() => scrollToSection('configurator')}
      />

      {/* Main Sections */}
      <main>
        {/* Startup Slideshow Banner (Controlled from CMS) */}
        <StartupSlideshow
          onOpenContact={handleOpenContact}
          onExploreServices={() => scrollToSection('services')}
        />

        {/* Hero Section */}
        <HeroSection
          onOpenContact={() => handleOpenContact()}
          onExploreServices={() => scrollToSection('services')}
        />

        {/* Who We Are & What We Stand For */}
        <AboutSection
          onStartProject={() => handleOpenContact()}
          onExploreServices={() => scrollToSection('services')}
        />

        {/* 360° Capability Directory / Our Services & Solutions */}
        <ServicesSection
          onSelectServiceDetails={handleSelectServiceDetails}
          onInquireService={handleInquireService}
        />

        {/* Instant Requirement Configurator / Plan Your Event & Marketing Scope */}
        <RequirementConfigurator
          onSendSpecToTeam={handleSendConfiguratorSpec}
        />

        {/* Executed Client Portfolio & Gallery */}
        <GallerySection
          onRequestProposal={handleGalleryProjectInquiry}
        />

        {/* Client Testimonials & Corporate Trust */}
        <TestimonialsSection
          onInquireProject={(ctx) => handleGalleryProjectInquiry(ctx)}
        />

        {/* Frequently Asked Questions (FAQ) Section */}
        <PmsFaqSection />

        {/* Contact Us & Get In Touch Section */}
        <ContactSection />
      </main>

      {/* Full Footer */}
      <Footer />

      {/* Cookie Consent Banner */}
      <CookieBanner />

      {/* Floating WhatsApp Action Button */}
      <WhatsAppFloatingBtn />

      {/* Service Detail Modal */}
      <ServiceDetailModal
        service={activeServiceDetail}
        onClose={() => setActiveServiceDetail(null)}
        onInquire={(title) => {
          setActiveServiceDetail(null);
          handleOpenContact(`Inquiring about ${title} service package.`);
        }}
      />

      {/* Quick Inquiry Modal */}
      <InquiryModal
        isOpen={isInquiryModalOpen}
        onClose={() => setIsInquiryModalOpen(false)}
        initialData={inquiryPrefill}
      />
    </div>
  );
}

function AppRouter() {
  const {
    isAdminOpen,
    isAuthenticated,
    setIsAdminOpen,
    loginAdmin,
  } = useCms();

  const [isDesktop, setIsDesktop] = useState<boolean>(() => {
    return typeof window !== 'undefined' ? window.innerWidth >= 768 : true;
  });

  useEffect(() => {
    const handleResize = () => {
      const desktop = window.innerWidth >= 768;
      setIsDesktop(desktop);
      if (!desktop && isAdminOpen) {
        setIsAdminOpen(false);
      }
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [isAdminOpen, setIsAdminOpen]);

  // Admin panel strictly desktop only and strictly triggered by desktop top-right logo
  if (isAdminOpen && isDesktop) {
    if (isAuthenticated) {
      return <AdminLayout />;
    }
    return (
      <>
        <MainWebsite />
        <AdminAuthModal
          isOpen={true}
          onClose={() => setIsAdminOpen(false)}
          onLogin={(pass) => loginAdmin(pass)}
        />
      </>
    );
  }

  return <MainWebsite />;
}

export default function App() {
  return (
    <CmsProvider>
      <AppRouter />
    </CmsProvider>
  );
}
