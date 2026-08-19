import React from 'react';
import { PMS_COMPANY_INFO } from '../data/pmsData';
import { Sparkles, Target, Eye, Compass, Layers, ShieldCheck, ArrowRight, CheckCircle2 } from 'lucide-react';

interface AboutSectionProps {
  onStartProject: () => void;
  onExploreServices: () => void;
}

export const AboutSection: React.FC<AboutSectionProps> = ({
  onStartProject,
  onExploreServices,
}) => {
  return (
    <section id="about" className="py-20 bg-slate-50 text-slate-900 relative border-b border-slate-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-widest text-blue-700 bg-blue-100/70 px-3 py-1 rounded-full border border-blue-200">
            <Sparkles className="w-3.5 h-3.5 text-amber-500" />
            About PMS Innovation Solutions
          </div>
          <h2 className="text-3xl sm:text-4xl font-serif font-bold text-slate-900 tracking-tight">
            WHO WE ARE & WHAT WE STAND FOR
          </h2>
          <p className="text-slate-600 text-sm sm:text-base font-normal">
            A full-service, 360-degree marketing and corporate event management agency connecting brands with people across every touchpoint.
          </p>
        </div>

        {/* 2-Column Core Identity (Who We Are & What We Do) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          {/* Who We Are Card */}
          <div className="bg-white border border-slate-200 rounded-2xl p-7 sm:p-8 space-y-4 shadow-md hover:shadow-lg hover:border-blue-300 transition-all relative overflow-hidden">
            <div className="w-10 h-10 rounded-xl bg-blue-50 border border-blue-200 flex items-center justify-center text-blue-600">
              <Compass className="w-5 h-5" />
            </div>
            <h3 className="text-xl sm:text-2xl font-serif font-bold text-slate-900">
              WHO WE ARE
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 font-normal leading-relaxed">
              {PMS_COMPANY_INFO.aboutWhoWeAre}
            </p>
            <div className="pt-3 border-t border-slate-100 flex items-center gap-2 text-xs font-semibold text-blue-700">
              <span>Full-Service Agency • Strategy • Creative • Experiential</span>
            </div>
          </div>

          {/* What We Do Card */}
          <div className="bg-white border border-slate-200 rounded-2xl p-7 sm:p-8 space-y-4 shadow-md hover:shadow-lg hover:border-blue-300 transition-all relative overflow-hidden">
            <div className="w-10 h-10 rounded-xl bg-amber-50 border border-amber-200 flex items-center justify-center text-amber-600">
              <Layers className="w-5 h-5" />
            </div>
            <h3 className="text-xl sm:text-2xl font-serif font-bold text-slate-900">
              WHAT WE DO
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 font-normal leading-relaxed">
              {PMS_COMPANY_INFO.aboutWhatWeDo}
            </p>
            <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
              <span className="text-xs font-semibold text-blue-700">
                Startups to Established Enterprises
              </span>
              <button
                onClick={onExploreServices}
                className="text-xs font-bold text-blue-600 hover:text-blue-800 flex items-center gap-1 transition-colors cursor-pointer"
              >
                <span>View All Services</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>

        {/* Mission & Vision Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          {/* Mission */}
          <div className="bg-white border-l-4 border-blue-600 rounded-r-2xl p-6 sm:p-7 border border-slate-200 space-y-3 shadow-sm">
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-blue-700">
              <Target className="w-4 h-4 text-blue-600" />
              OUR MISSION
            </div>
            <p className="text-xs sm:text-sm text-slate-700 font-normal leading-relaxed">
              {PMS_COMPANY_INFO.mission}
            </p>
          </div>

          {/* Vision */}
          <div className="bg-white border-l-4 border-amber-400 rounded-r-2xl p-6 sm:p-7 border border-slate-200 space-y-3 shadow-sm">
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-amber-600">
              <Eye className="w-4 h-4 text-amber-500" />
              OUR VISION
            </div>
            <p className="text-xs sm:text-sm text-slate-700 font-normal leading-relaxed">
              {PMS_COMPANY_INFO.vision}
            </p>
          </div>
        </div>

        {/* Partner CTA Banner */}
        <div className="bg-gradient-to-r from-blue-900 via-blue-950 to-blue-900 text-white border border-blue-800 rounded-2xl p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-6 shadow-xl">
          <div className="space-y-1 text-center sm:text-left">
            <div className="text-sm sm:text-base font-serif font-bold text-white">
              Partner with PMS Innovation Solutions for your next campaign or corporate event.
            </div>
            <div className="text-xs text-blue-200">
              Connect with our Kolkata headquarters for immediate turnaround and turnkey pan-India execution.
            </div>
          </div>

          <button
            onClick={onStartProject}
            className="px-6 py-3 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold text-xs sm:text-sm transition-all shadow-lg shadow-amber-500/20 flex items-center gap-2 shrink-0 cursor-pointer"
          >
            <span>Start Your Project</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </section>
  );
};
