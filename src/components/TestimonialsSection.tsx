import React, { useState } from 'react';
import {
  Star,
  Quote,
  CheckCircle2,
  Building2,
  MapPin,
  ChevronLeft,
  ChevronRight,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  Award,
  Users,
  CalendarCheck,
} from 'lucide-react';
import { useCms } from '../context/CmsContext';
import { PmsTestimonial } from '../types';

interface TestimonialsSectionProps {
  onInquireProject?: (projectContext: string) => void;
}

export const TestimonialsSection: React.FC<TestimonialsSectionProps> = ({
  onInquireProject,
}) => {
  const { testimonials, companyInfo } = useCms();
  const [selectedTag, setSelectedTag] = useState<string>('All');
  const [activeSlideIndex, setActiveSlideIndex] = useState<number>(0);

  const tags = [
    'All',
    'Corporate Events',
    'MICE Services',
    'Retail Branding',
    'Brand Activation',
    'Outdoor & Digital',
    'Merchandising',
  ];

  const filteredTestimonials =
    selectedTag === 'All'
      ? testimonials
      : testimonials.filter((t) => t.tag === selectedTag);

  const spotlightList = testimonials.length > 0 ? testimonials : [];
  const spotlight =
    spotlightList.length > 0
      ? spotlightList[activeSlideIndex % spotlightList.length]
      : null;

  const handlePrevSlide = () => {
    if (spotlightList.length === 0) return;
    setActiveSlideIndex((prev) =>
      prev === 0 ? spotlightList.length - 1 : prev - 1
    );
  };

  const handleNextSlide = () => {
    if (spotlightList.length === 0) return;
    setActiveSlideIndex((prev) => (prev + 1) % spotlightList.length);
  };


  return (
    <section
      id="testimonials"
      className="relative py-24 bg-slate-50 border-t border-b border-slate-200/80 overflow-hidden text-slate-900"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-100/80 border border-blue-200 text-blue-700 text-xs font-bold uppercase tracking-widest mb-4">
            <Sparkles className="w-3.5 h-3.5 text-amber-500" />
            Client Endorsements & Corporate Trust
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-slate-900 tracking-tight mb-4">
            What Leaders Say About{' '}
            <span className="text-blue-600">
              PMS Execution
            </span>
          </h2>
          <p className="text-base sm:text-lg text-slate-600 leading-relaxed font-normal">
            Real feedback from brand custodians, marketing heads, and corporate executives across Kolkata and Pan-India who trust PMS Innovation Solutions for end-to-end reliability.
          </p>
        </div>

        {/* Trust Metrics Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 mb-16">
          <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-sm text-center group hover:border-blue-300 transition-colors">
            <div className="w-10 h-10 mx-auto mb-3 rounded-xl bg-amber-50 border border-amber-200 flex items-center justify-center text-amber-500 group-hover:scale-110 transition-transform">
              <Star className="w-5 h-5 fill-amber-400 text-amber-400" />
            </div>
            <div className="text-2xl sm:text-3xl font-extrabold text-slate-900 mb-1">4.9 / 5.0</div>
            <div className="text-xs text-slate-500 uppercase tracking-wider font-semibold">Average Client Rating</div>
          </div>

          <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-sm text-center group hover:border-blue-300 transition-colors">
            <div className="w-10 h-10 mx-auto mb-3 rounded-xl bg-blue-50 border border-blue-200 flex items-center justify-center text-blue-600 group-hover:scale-110 transition-transform">
              <CalendarCheck className="w-5 h-5 text-blue-600" />
            </div>
            <div className="text-2xl sm:text-3xl font-extrabold text-slate-900 mb-1">500+</div>
            <div className="text-xs text-slate-500 uppercase tracking-wider font-semibold">Corporate Events & Meets</div>
          </div>

          <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-sm text-center group hover:border-blue-300 transition-colors">
            <div className="w-10 h-10 mx-auto mb-3 rounded-xl bg-blue-50 border border-blue-200 flex items-center justify-center text-blue-600 group-hover:scale-110 transition-transform">
              <ShieldCheck className="w-5 h-5 text-blue-600" />
            </div>
            <div className="text-2xl sm:text-3xl font-extrabold text-slate-900 mb-1">100%</div>
            <div className="text-xs text-slate-500 uppercase tracking-wider font-semibold">On-Ground SLA Delivery</div>
          </div>

          <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-sm text-center group hover:border-blue-300 transition-colors">
            <div className="w-10 h-10 mx-auto mb-3 rounded-xl bg-amber-50 border border-amber-200 flex items-center justify-center text-amber-500 group-hover:scale-110 transition-transform">
              <Users className="w-5 h-5 text-amber-500" />
            </div>
            <div className="text-2xl sm:text-3xl font-extrabold text-slate-900 mb-1">45+ Brands</div>
            <div className="text-xs text-slate-500 uppercase tracking-wider font-semibold">Retained Enterprise Clients</div>
          </div>
        </div>

        {/* Featured Spotlight Card */}
        {spotlight && (
          <div className="relative mb-16">
            <div className="relative rounded-3xl bg-gradient-to-br from-blue-900 via-blue-950 to-blue-900 border border-blue-800 p-6 sm:p-10 shadow-xl overflow-hidden text-white">
              {/* Top right decorative watermark quote */}
              <Quote className="absolute -top-4 -right-4 w-36 h-36 text-white/5 rotate-12 pointer-events-none" />
              
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
                {/* Left Column: Spotlight details */}
                <div className="lg:col-span-8 space-y-6">
                  <div className="flex flex-wrap items-center gap-3">
                    <span className="px-3 py-1 rounded-full bg-blue-800/90 border border-blue-700 text-amber-300 text-xs font-bold uppercase tracking-wider">
                      {spotlight.tag} Spotlight
                    </span>
                    <span className="inline-flex items-center gap-1.5 text-xs text-emerald-300 font-medium">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                      Verified Corporate Client
                    </span>
                  </div>

                {/* Star rating */}
                <div className="flex items-center gap-1">
                  {[...Array(spotlight.rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-amber-400 text-amber-400" />
                  ))}
                </div>

                {/* Quote review */}
                <blockquote className="text-lg sm:text-xl md:text-2xl text-blue-50 font-medium leading-relaxed italic">
                  "{spotlight.review}"
                </blockquote>

                {/* Project Highlight */}
                <div className="p-3.5 rounded-xl bg-blue-950/70 border border-blue-800/80 flex items-center gap-3">
                  <Award className="w-5 h-5 text-amber-400 shrink-0" />
                  <div className="text-xs sm:text-sm text-blue-100">
                    <span className="text-amber-300 font-bold">Delivered Scope:</span> {spotlight.projectHighlight}
                  </div>
                </div>

                {/* Client Profile */}
                <div className="flex items-center gap-4 pt-2">
                  <img
                    src={spotlight.avatar}
                    alt={spotlight.clientName}
                    className="w-14 h-14 rounded-full object-cover border-2 border-amber-400 shadow-md"
                    referrerPolicy="no-referrer"
                  />
                  <div>
                    <div className="text-base sm:text-lg font-bold text-white">{spotlight.clientName}</div>
                    <div className="text-xs sm:text-sm text-blue-200">{spotlight.role}</div>
                    <div className="flex items-center gap-3 text-xs text-amber-300 font-medium mt-0.5">
                      <span className="flex items-center gap-1">
                        <Building2 className="w-3 h-3" />
                        {spotlight.company}
                      </span>
                      <span>•</span>
                      <span className="flex items-center gap-1 text-blue-200">
                        <MapPin className="w-3 h-3" />
                        {spotlight.location}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Column: Interactive Quick Trigger */}
              <div className="lg:col-span-4 flex flex-col justify-between h-full bg-blue-950/90 border border-blue-800/80 rounded-2xl p-6 text-center space-y-6">
                <div>
                  <div className="w-12 h-12 mx-auto rounded-2xl bg-amber-400/20 border border-amber-400/30 flex items-center justify-center text-amber-300 mb-3">
                    <Sparkles className="w-6 h-6" />
                  </div>
                  <h4 className="text-base font-bold text-white mb-1">Planning a Similar Event?</h4>
                  <p className="text-xs text-blue-200 leading-relaxed">
                    Let PMS Innovation Solutions engineer a seamless experience for your brand with full turnkey support.
                  </p>
                </div>

                <button
                  id="btn-spotlight-inquire"
                  onClick={() =>
                    onInquireProject?.(
                      `Inspired by ${spotlight.clientName}'s review for ${spotlight.projectHighlight}`
                    )
                  }
                  className="w-full py-3 px-4 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold text-sm transition-all shadow-md flex items-center justify-center gap-2 group cursor-pointer"
                >
                  <span>Request Similar Scope</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>

                {/* Slider Controls */}
                <div className="flex items-center justify-between pt-4 border-t border-blue-800/80">
                  <span className="text-xs text-blue-300">
                    Story {activeSlideIndex + 1} of {spotlightList.length}
                  </span>
                  <div className="flex items-center gap-2">
                    <button
                      id="btn-prev-testimonial"
                      onClick={handlePrevSlide}
                      aria-label="Previous testimonial"
                      className="p-2 rounded-lg bg-blue-900 hover:bg-blue-800 text-white transition-colors border border-blue-700 cursor-pointer"
                    >
                      <ChevronLeft className="w-4 h-4" />
                    </button>
                    <button
                      id="btn-next-testimonial"
                      onClick={handleNextSlide}
                      aria-label="Next testimonial"
                      className="p-2 rounded-lg bg-blue-900 hover:bg-blue-800 text-white transition-colors border border-blue-700 cursor-pointer"
                    >
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
)}

        {/* Filter Pills */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-10">
          {tags.map((tag) => (
            <button
              key={tag}
              id={`filter-testimonial-${tag.toLowerCase().replace(/\s+/g, '-')}`}
              onClick={() => setSelectedTag(tag)}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
                selectedTag === tag
                  ? 'bg-blue-600 text-white shadow-sm'
                  : 'bg-white hover:bg-slate-100 text-slate-700 border border-slate-200'
              }`}
            >
              {tag}
            </button>
          ))}
        </div>

        {/* Testimonials Masonry Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {filteredTestimonials.map((item) => (
            <div
              key={item.id}
              id={`card-testimonial-${item.id}`}
              className="rounded-2xl bg-white border border-slate-200 hover:border-blue-300 p-6 sm:p-7 flex flex-col justify-between transition-all duration-300 hover:-translate-y-1 hover:shadow-lg group shadow-sm"
            >
              <div className="space-y-4">
                {/* Top bar: Rating + Category Tag */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1">
                    {[...Array(item.rating)].map((_, i) => (
                      <Star
                        key={i}
                        className="w-4 h-4 fill-amber-400 text-amber-400"
                      />
                    ))}
                  </div>
                  <span className="px-2.5 py-0.5 rounded-md bg-blue-50 text-blue-700 text-[11px] font-bold border border-blue-200">
                    {item.tag}
                  </span>
                </div>

                {/* Review Text */}
                <p className="text-sm text-slate-700 leading-relaxed">
                  "{item.review}"
                </p>

                {/* Highlight Badge */}
                <div className="p-2.5 rounded-lg bg-slate-50 border border-slate-200 text-xs text-slate-600 flex items-start gap-2">
                  <Sparkles className="w-3.5 h-3.5 text-amber-500 mt-0.5 shrink-0" />
                  <div>
                    <span className="text-blue-700 font-semibold">Highlight:</span>{' '}
                    {item.projectHighlight}
                  </div>
                </div>
              </div>

              {/* Client Bio Footer */}
              <div className="pt-6 mt-6 border-t border-slate-100 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <img
                    src={item.avatar}
                    alt={item.clientName}
                    className="w-11 h-11 rounded-full object-cover border border-blue-200"
                    referrerPolicy="no-referrer"
                  />
                  <div>
                    <div className="text-sm font-bold text-slate-900 flex items-center gap-1.5">
                      {item.clientName}
                      {item.verified && (
                        <CheckCircle2 className="w-3.5 h-3.5 text-blue-600" />
                      )}
                    </div>
                    <div className="text-xs text-slate-500 line-clamp-1">{item.role}</div>
                    <div className="text-[11px] text-blue-700 font-semibold line-clamp-1">
                      {item.company}
                    </div>
                  </div>
                </div>

                <button
                  id={`btn-inquire-testi-${item.id}`}
                  onClick={() =>
                    onInquireProject?.(
                      `Inquiring regarding ${item.tag} inspired by ${item.clientName} (${item.company})`
                    )
                  }
                  title="Inquire about this service"
                  className="p-2 rounded-lg bg-slate-100 hover:bg-blue-600 hover:text-white text-slate-700 transition-colors border border-slate-200 cursor-pointer"
                >
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Banner / Callout */}
        <div className="rounded-3xl bg-gradient-to-r from-blue-900 via-blue-950 to-blue-900 border border-blue-800 p-8 sm:p-10 text-center relative overflow-hidden text-white shadow-xl">
          <div className="max-w-3xl mx-auto space-y-4 relative z-10">
            <h3 className="text-2xl sm:text-3xl font-serif font-bold text-white">
              Ready to Craft Your Brand's Next Milestone?
            </h3>
            <p className="text-sm sm:text-base text-blue-100 font-light">
              Directly consult with our project directors in Kolkata. Get transparent timelines, 3D venue layout plans, and custom quotations within 24 hours.
            </p>
            <div className="pt-2 flex flex-wrap items-center justify-center gap-4">
              <a
                href={`tel:${companyInfo.phone1Raw}`}
                className="px-6 py-3 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold text-sm transition-colors shadow-md"
              >
                Call Hotline: {companyInfo.phone1}
              </a>
              <button
                id="btn-testimonials-contact-cta"
                onClick={() => onInquireProject?.('Schedule an executive briefing')}
                className="px-6 py-3 rounded-xl bg-blue-800 hover:bg-blue-700 text-white font-bold text-sm border border-blue-600 transition-colors cursor-pointer"
              >
                Send Event Brief
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
