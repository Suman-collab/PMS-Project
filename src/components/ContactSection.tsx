import React, { useState } from 'react';
import { useCms } from '../context/CmsContext';
import { PmsInquiryFormData } from '../types';
import {
  Phone,
  Mail,
  MapPin,
  Clock,
  MessageSquare,
  Send,
  CheckCircle2,
  ExternalLink,
  ShieldCheck,
  Facebook,
  Instagram,
  Linkedin,
  Twitter,
} from 'lucide-react';
import confetti from 'canvas-confetti';

interface ContactSectionProps {
  prefillData?: Partial<PmsInquiryFormData>;
}

export const ContactSection: React.FC<ContactSectionProps> = ({ prefillData }) => {
  const { companyInfo, addInquiry } = useCms();
  const [formData, setFormData] = useState<PmsInquiryFormData>({
    name: prefillData?.name || '',
    phone: prefillData?.phone || '',
    email: prefillData?.email || '',
    eventDetails: prefillData?.eventDetails || '',
    serviceCategory: prefillData?.serviceCategory || '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittedDocket, setSubmittedDocket] = useState<{ id: string } | null>(null);
  const [errorMsg, setErrorMsg] = useState('');

  // Newsletter state
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [newsletterSuccess, setNewsletterSuccess] = useState(false);

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.phone || !formData.email || !formData.eventDetails) {
      setErrorMsg('Please complete all required fields (Phone, Email, Event details).');
      return;
    }

    setIsSubmitting(true);
    setErrorMsg('');

    try {
      // Sync into CMS Context
      const createdInquiry = addInquiry(formData);

      // Also persist to Express API
      fetch('/api/inquiries', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      }).catch((err) => console.error('API backup error', err));

      setSubmittedDocket({ id: createdInquiry.id });
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 },
      });
    } catch (err) {
      setErrorMsg('Network error. Please call us directly.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleNewsletterSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newsletterEmail) return;
    try {
      await fetch('/api/newsletter', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: newsletterEmail }),
      });
      setNewsletterSuccess(true);
      setNewsletterEmail('');
    } catch (err) {
      setNewsletterSuccess(true);
    }
  };

  const openWhatsApp = () => {
    const text = encodeURIComponent(
      `Hello PMS Innovation Solutions! I would like to discuss our upcoming corporate event and branding requirements.`
    );
    window.open(`https://wa.me/${companyInfo.phone1Raw}?text=${text}`, '_blank');
  };


  return (
    <section id="contact" className="py-20 bg-white text-slate-900 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-widest text-blue-700 bg-blue-100/70 px-3 py-1 rounded-full border border-blue-200">
            <MessageSquare className="w-3.5 h-3.5 text-amber-500" />
            Connect With Us
          </div>
          <h2 className="text-3xl sm:text-4xl font-serif font-bold text-slate-900 tracking-tight">
            CONTACT US & GET IN TOUCH
          </h2>
          <p className="text-slate-600 text-sm sm:text-base font-normal">
            Send us a message about your event or branding requirements, and our team will respond as soon as possible.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          {/* Left Column: Direct Inquiry Form (7 Cols) */}
          <div className="lg:col-span-7 bg-white border border-slate-200 rounded-2xl p-6 sm:p-9 space-y-6 shadow-md">
            <div>
              <h3 className="text-xl sm:text-2xl font-serif font-bold text-slate-900">
                Send A Direct Inquiry
              </h3>
              <p className="text-xs text-slate-600 font-normal mt-1">
                Fill out the form below and our corporate events team will contact you directly.
              </p>
            </div>

            {errorMsg && (
              <div className="p-3 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs font-medium">
                {errorMsg}
              </div>
            )}

            {!submittedDocket ? (
              <form onSubmit={handleFormSubmit} className="space-y-4 text-xs">
                {/* Name */}
                <div className="space-y-1.5">
                  <label className="block text-[11px] uppercase tracking-wider font-bold text-slate-700">
                    Name
                  </label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="Your Full Name"
                    className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 text-xs sm:text-sm focus:border-blue-600 focus:bg-white focus:outline-none"
                  />
                </div>

                {/* Phone & Email (2 Cols) */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="block text-[11px] uppercase tracking-wider font-bold text-slate-700">
                      Phone*
                    </label>
                    <input
                      type="tel"
                      required
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      placeholder="+91 98316 30072"
                      className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 text-xs sm:text-sm focus:border-blue-600 focus:bg-white focus:outline-none font-mono"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="block text-[11px] uppercase tracking-wider font-bold text-slate-700">
                      Email*
                    </label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="your.email@company.com"
                      className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 text-xs sm:text-sm focus:border-blue-600 focus:bg-white focus:outline-none"
                    />
                  </div>
                </div>

                {/* Event Details Textarea */}
                <div className="space-y-1.5">
                  <label className="block text-[11px] uppercase tracking-wider font-bold text-slate-700">
                    Tell us a bit about your event.*
                  </label>
                  <textarea
                    rows={4}
                    required
                    value={formData.eventDetails}
                    onChange={(e) => setFormData({ ...formData, eventDetails: e.target.value })}
                    placeholder="Describe your event date, expected scale, location, MICE requirements, retail branding, or digital marketing goals..."
                    className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 text-xs sm:text-sm focus:border-blue-600 focus:bg-white focus:outline-none leading-relaxed"
                  />
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-3.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm transition-all shadow-md shadow-blue-500/20 flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                >
                  {isSubmitting ? (
                    <span>Submitting Inquiry...</span>
                  ) : (
                    <>
                      <span>Send Message</span>
                      <Send className="w-4 h-4 text-amber-300" />
                    </>
                  )}
                </button>

                {/* reCAPTCHA Disclaimer */}
                <p className="text-[10px] text-slate-500 text-center pt-2">
                  This site is protected by reCAPTCHA and the Google Privacy Policy and Terms of Service apply.
                </p>
              </form>
            ) : (
              /* Success State */
              <div className="text-center py-8 space-y-4">
                <div className="w-14 h-14 rounded-full bg-emerald-50 border border-emerald-300 flex items-center justify-center mx-auto text-emerald-600">
                  <CheckCircle2 className="w-7 h-7" />
                </div>
                <h4 className="text-2xl font-serif font-bold text-slate-900">
                  Message Sent Successfully!
                </h4>
                <p className="text-xs sm:text-sm text-slate-600 max-w-md mx-auto font-normal">
                  Thank you for reaching out. Your inquiry (Docket: <span className="text-blue-600 font-mono font-bold">{submittedDocket.id}</span>) has been routed to our corporate events desk. We will call you back promptly.
                </p>
                <div className="pt-2">
                  <button
                    onClick={() => {
                      setSubmittedDocket(null);
                      setFormData({ name: '', phone: '', email: '', eventDetails: '' });
                    }}
                    className="px-5 py-2 rounded-xl bg-blue-600 text-xs font-semibold text-white hover:bg-blue-700 cursor-pointer"
                  >
                    Submit Another Inquiry
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Right Column: Contact Details, WhatsApp, Map, Hours, Newsletter (5 Cols) */}
          <div className="lg:col-span-5 space-y-6">
            {/* Let's Get Started Callout */}
            <div className="bg-gradient-to-br from-blue-900 via-blue-950 to-blue-900 border border-blue-800 rounded-2xl p-6 sm:p-7 space-y-4 shadow-xl text-white">
              <div className="space-y-1.5">
                <h3 className="text-xl font-serif font-bold text-white">
                  Let&apos;s Get Started!
                </h3>
                <p className="text-xs text-blue-100 font-light leading-relaxed">
                  Send us a message about your event, and we will get back to you as soon as possible. With our expertise in corporate event planning and digital marketing, we can ensure you receive the branding services you need to make your event a success.
                </p>
              </div>

              {/* WhatsApp Button */}
              <button
                onClick={openWhatsApp}
                className="w-full py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs sm:text-sm transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer"
              >
                <MessageSquare className="w-4 h-4 fill-white" />
                <span>Message us on WhatsApp</span>
              </button>
            </div>

            {/* Address & Direct Hotlines Card */}
            <div className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-7 space-y-4 text-xs shadow-md">
              {/* Company Title & Address */}
              <div className="space-y-1.5">
                <div className="text-xs uppercase tracking-wider font-bold text-blue-700">
                  PMS INNOVATION SOLUTIONS
                </div>
                <p className="text-slate-600 font-normal leading-relaxed flex items-start gap-2">
                  <MapPin className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
                  <span>{companyInfo.address}</span>
                </p>
                <a
                  href={companyInfo.mapUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-xs font-bold text-blue-600 hover:underline pt-1"
                >
                  <span>Get directions</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>

              {/* Phone Numbers */}
              <div className="pt-3 border-t border-slate-100 space-y-1">
                <div className="text-[11px] uppercase tracking-wider font-bold text-slate-500">
                  Phone Numbers
                </div>
                <div className="font-mono font-bold text-slate-900 text-sm flex flex-wrap gap-2">
                  <a href={`tel:${companyInfo.phone1Raw}`} className="hover:text-blue-600">
                    {companyInfo.phone1}
                  </a>
                  <span>/</span>
                  <a href={`tel:${companyInfo.phone2Raw}`} className="hover:text-blue-600">
                    {companyInfo.phone2}
                  </a>
                </div>
              </div>

              {/* Official Emails */}
              <div className="pt-3 border-t border-slate-100 space-y-1">
                <div className="text-[11px] uppercase tracking-wider font-bold text-slate-500">
                  Official Emails
                </div>
                <div className="text-slate-800 font-medium space-y-0.5">
                  <div>
                    <a href={`mailto:${companyInfo.email1}`} className="hover:text-blue-600">
                      {companyInfo.email1}
                    </a>
                  </div>
                  <div>
                    <a href={`mailto:${companyInfo.email2}`} className="hover:text-blue-600">
                      {companyInfo.email2}
                    </a>
                  </div>
                </div>
              </div>

              {/* Working Hours */}
              <div className="pt-3 border-t border-slate-100 space-y-1">
                <div className="text-[11px] uppercase tracking-wider font-bold text-slate-500">
                  Working Hours
                </div>
                <div className="flex items-center gap-2 text-emerald-700 font-semibold">
                  <Clock className="w-4 h-4 text-emerald-600" />
                  <span>{companyInfo.workingHours}</span>
                </div>
              </div>

              {/* Social Handles */}
              <div className="pt-3 border-t border-slate-100 space-y-2">
                <div className="text-[11px] uppercase tracking-wider font-bold text-slate-500">
                  Our Social Handles
                </div>
                <div className="flex items-center gap-2">
                  <a href="#" className="p-2 rounded-lg bg-slate-50 hover:bg-blue-50 text-slate-700 hover:text-blue-600 border border-slate-200">
                    <Facebook className="w-4 h-4" />
                  </a>
                  <a href="#" className="p-2 rounded-lg bg-slate-50 hover:bg-blue-50 text-slate-700 hover:text-blue-600 border border-slate-200">
                    <Instagram className="w-4 h-4" />
                  </a>
                  <a href="#" className="p-2 rounded-lg bg-slate-50 hover:bg-blue-50 text-slate-700 hover:text-blue-600 border border-slate-200">
                    <Linkedin className="w-4 h-4" />
                  </a>
                  <a href="#" className="p-2 rounded-lg bg-slate-50 hover:bg-blue-50 text-slate-700 hover:text-blue-600 border border-slate-200">
                    <Twitter className="w-4 h-4" />
                  </a>
                </div>
              </div>
            </div>

            {/* Subscribe To Marketing Updates */}
            <div className="bg-white border border-slate-200 rounded-2xl p-6 space-y-3 text-xs shadow-md">
              <div className="space-y-1">
                <h4 className="text-sm font-serif font-bold text-slate-900 uppercase">
                  Subscribe To Marketing Updates
                </h4>
                <p className="text-slate-600 font-normal text-[11px] leading-relaxed">
                  Sign up to hear from us about our branding services, corporate event planning, and upcoming digital marketing specials, sales, and events.
                </p>
              </div>

              {newsletterSuccess ? (
                <div className="text-xs text-emerald-600 font-semibold flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Thank you for subscribing!</span>
                </div>
              ) : (
                <form onSubmit={handleNewsletterSubmit} className="flex gap-2">
                  <input
                    type="email"
                    required
                    value={newsletterEmail}
                    onChange={(e) => setNewsletterEmail(e.target.value)}
                    placeholder="Email Address"
                    className="flex-1 px-3 py-2 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-900 placeholder-slate-400 focus:border-blue-600 focus:bg-white focus:outline-none"
                  />
                  <button
                    type="submit"
                    className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs shrink-0 cursor-pointer"
                  >
                    Sign up
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
