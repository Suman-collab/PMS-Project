import React from 'react';
import { PMS_COMPANY_INFO } from '../data/pmsData';
import { Phone, MessageSquare, ArrowRight, Sparkles, CheckCircle2, ShieldCheck, MapPin, Building2, Layers } from 'lucide-react';

interface HeroSectionProps {
  onOpenContact: (note?: string) => void;
  onExploreServices: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  onOpenContact,
  onExploreServices,
}) => {
  const openWhatsApp = () => {
    const message = encodeURIComponent(
      `Hello PMS Innovation Solutions! I would like to inquire about your 360° Marketing and Corporate Event Management services.`
    );
    window.open(`https://wa.me/${PMS_COMPANY_INFO.phone1Raw}?text=${message}`, '_blank');
  };

  return (
    <section id="home" className="relative bg-gradient-to-b from-blue-50/60 via-white to-white text-slate-900 overflow-hidden pt-12 pb-20 sm:pt-16 sm:pb-24 border-b border-slate-200/80">
      {/* Subtle Background Glows */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-96 bg-gradient-to-b from-blue-500/10 via-amber-500/5 to-transparent blur-3xl pointer-events-none" />
      <div className="absolute top-1/3 right-0 w-80 h-80 bg-blue-500/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Main Hero Content (7 Cols) */}
          <div className="lg:col-span-7 space-y-6">
            {/* Top Badges */}
            <div className="flex flex-wrap items-center gap-2.5">
              <span className="px-3.5 py-1 rounded-full bg-blue-50 text-blue-700 border border-blue-200 text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 shadow-sm">
                <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                {PMS_COMPANY_INFO.subtitle}
              </span>
              <span className="px-3 py-1 rounded-full bg-slate-100 text-slate-700 border border-slate-200 text-xs font-mono font-semibold">
                Kolkata & Pan-India
              </span>
            </div>

            {/* Main Headline */}
            <div className="space-y-2">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-serif font-black tracking-tight text-slate-900 leading-tight">
                BUILT FOR <span className="text-blue-600">THE NOW.</span>
              </h1>
              <p className="text-sm sm:text-base text-slate-600 font-normal leading-relaxed max-w-2xl">
                {PMS_COMPANY_INFO.heroDescription}
              </p>
            </div>

            {/* Core Mission Callout */}
            <div className="bg-blue-50/80 border-l-4 border-amber-400 p-4 rounded-r-xl border border-blue-100/80 space-y-1 shadow-sm">
              <div className="text-xs uppercase tracking-widest font-bold text-blue-700 flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
                Our Core Mission
              </div>
              <p className="text-xs sm:text-sm text-slate-800 font-medium">
                &ldquo;{PMS_COMPANY_INFO.mission}&rdquo;
              </p>
            </div>

            {/* Direct Hotline / Inquiry Box */}
            <div className="p-4 sm:p-5 rounded-2xl bg-white border border-blue-200 space-y-3 shadow-lg shadow-blue-500/5">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-blue-900 flex items-center gap-1.5">
                  <Phone className="w-4 h-4 text-blue-600" />
                  Direct Hotline / Inquiry
                </span>
                <span className="text-[11px] text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200 font-mono font-semibold">
                  Quick Response Guaranteed
                </span>
              </div>

              <div className="flex flex-wrap items-center gap-3 font-mono font-bold text-sm sm:text-base text-slate-900">
                <a
                  href={`tel:${PMS_COMPANY_INFO.phone1Raw}`}
                  className="hover:text-blue-600 transition-colors flex items-center gap-1 bg-slate-50 hover:bg-blue-50 px-3 py-1.5 rounded-lg border border-slate-200 hover:border-blue-300"
                >
                  <span>{PMS_COMPANY_INFO.phone1}</span>
                </a>
                <span className="text-slate-300 font-light">|</span>
                <a
                  href={`tel:${PMS_COMPANY_INFO.phone2Raw}`}
                  className="hover:text-blue-600 transition-colors flex items-center gap-1 bg-slate-50 hover:bg-blue-50 px-3 py-1.5 rounded-lg border border-slate-200 hover:border-blue-300"
                >
                  <span>{PMS_COMPANY_INFO.phone2}</span>
                </a>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <button
                onClick={openWhatsApp}
                className="px-5 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs sm:text-sm transition-all shadow-md shadow-emerald-600/20 flex items-center gap-2 cursor-pointer"
              >
                <MessageSquare className="w-4 h-4 fill-white" />
                <span>WhatsApp Us</span>
              </button>

              <button
                onClick={() => onOpenContact()}
                className="px-6 py-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs sm:text-sm transition-all shadow-md shadow-blue-500/20 flex items-center gap-2 cursor-pointer hover:shadow-lg"
              >
                <span>Get In Touch</span>
                <ArrowRight className="w-4 h-4 text-amber-300" />
              </button>

              <button
                onClick={onExploreServices}
                className="px-5 py-3 rounded-xl bg-white hover:bg-slate-50 text-slate-700 hover:text-blue-700 border border-slate-300 font-bold text-xs sm:text-sm transition-colors cursor-pointer shadow-sm"
              >
                Explore Services
              </button>
            </div>

            {/* Core Capability Tags */}
            <div className="flex flex-wrap items-center gap-2 pt-2 text-xs text-slate-600">
              <span className="px-3 py-1 rounded-lg bg-white border border-slate-200 text-slate-700 font-medium shadow-2xs">
                Corporate Events & MICE
              </span>
              <span className="px-3 py-1 rounded-lg bg-white border border-slate-200 text-slate-700 font-medium shadow-2xs">
                Retail Shop Branding
              </span>
              <span className="px-3 py-1 rounded-lg bg-white border border-slate-200 text-slate-700 font-medium shadow-2xs">
                Digital & Outdoor Media
              </span>
            </div>
          </div>

          {/* Right Visual Card (5 Cols) */}
          <div className="lg:col-span-5 space-y-4">
            <div className="relative rounded-2xl overflow-hidden border border-slate-200 bg-white shadow-xl group">
              <img
                src="https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&w=1200&q=80"
                alt="PMS Innovation Solutions Corporate Event Showcase"
                className="w-full h-80 sm:h-96 object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/20 to-transparent" />

              <div className="absolute top-4 left-4 right-4 flex items-center justify-between">
                <span className="px-3 py-1 rounded-full bg-blue-900/90 backdrop-blur-md text-amber-300 border border-blue-500/30 text-xs font-bold font-mono uppercase">
                  Active Execution
                </span>
                <span className="px-3 py-1 rounded-full bg-white/90 backdrop-blur-md text-blue-900 border border-slate-200 text-xs font-bold font-mono">
                  360° Marketing
                </span>
              </div>

              <div className="absolute bottom-4 left-4 right-4 space-y-1.5 bg-slate-950/90 backdrop-blur-md p-4 rounded-xl border border-slate-800 text-white">
                <div className="text-xs uppercase tracking-wider font-bold text-amber-400">
                  PMS INNOVATION SOLUTIONS
                </div>
                <div className="text-sm sm:text-base font-serif font-bold text-white">
                  End-to-End Corporate Events, MICE & Experiential Brand Activations
                </div>
                <div className="flex items-center gap-2 text-xs text-slate-300 pt-1">
                  <MapPin className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                  <span>Headquarters: Kolkata, West Bengal • Pan-India</span>
                </div>
              </div>
            </div>

            {/* Quick Stats Grid */}
            <div className="grid grid-cols-2 gap-3">
              {PMS_COMPANY_INFO.stats.map((stat, idx) => (
                <div
                  key={idx}
                  className="bg-white border border-slate-200 p-3.5 rounded-xl text-left space-y-0.5 shadow-sm"
                >
                  <div className="text-xl sm:text-2xl font-black font-serif text-blue-600">
                    {stat.value}
                  </div>
                  <div className="text-[11px] text-slate-600 font-medium leading-tight">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
