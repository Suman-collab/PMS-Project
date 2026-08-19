import React, { useState } from 'react';
import { useCms } from '../context/CmsContext';
import { PmsService, PmsServiceCode } from '../types';
import { Sparkles, Search, ArrowRight, CheckCircle2, Info, Send, Layers } from 'lucide-react';

interface ServicesSectionProps {
  onSelectServiceDetails: (service: PmsService) => void;
  onInquireService: (serviceTitle: string, code: PmsServiceCode) => void;
}

export const ServicesSection: React.FC<ServicesSectionProps> = ({
  onSelectServiceDetails,
  onInquireService,
}) => {
  const { services } = useCms();
  const [selectedFilter, setSelectedFilter] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');

  const filterTabs = [
    { label: 'All Services', value: 'all' },
    { label: 'Corporate Events', value: 'event' },
    { label: 'MICE Services', value: 'mice' },
    { label: 'Brand Activation', value: 'activation' },
    { label: 'Retail Branding', value: 'branding' },
    { label: 'Outdoor Hoardings', value: 'hoarding' },
    { label: 'Digital Marketing', value: 'digital' },
    { label: 'Gifting & Merchandising', value: 'merchandising' },
  ];

  const activeServices = services.filter((srv) => srv.active !== false);

  const filteredServices = activeServices.filter((srv) => {
    const matchesFilter = selectedFilter === 'all' || srv.code === selectedFilter;
    const matchesSearch =
      searchQuery.trim() === '' ||
      srv.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      srv.subtitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
      srv.tagline.toLowerCase().includes(searchQuery.toLowerCase()) ||
      srv.code.toLowerCase().includes(searchQuery.toLowerCase()) ||
      srv.coreHighlights.some((h) => h.toLowerCase().includes(searchQuery.toLowerCase()));

    return matchesFilter && matchesSearch;
  });


  return (
    <section id="services" className="py-20 bg-white text-slate-900 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-3">
          <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-widest text-blue-700 bg-blue-100/70 px-3 py-1 rounded-full border border-blue-200">
            <Layers className="w-3.5 h-3.5 text-amber-500" />
            360° Capability Directory
          </div>
          <h2 className="text-3xl sm:text-4xl font-serif font-bold text-slate-900 tracking-tight">
            OUR SERVICES & SOLUTIONS
          </h2>
          <p className="text-slate-600 text-sm sm:text-base font-normal">
            Whether you are looking to build, grow, or reinvent your brand, we deliver bold ideas backed by data and brought to life with precision.
          </p>
        </div>

        {/* Filter Pills & Search Bar */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-10">
          {/* Category Filter Pills */}
          <div className="flex flex-wrap gap-1.5 p-1 bg-slate-100 rounded-xl border border-slate-200 w-full md:w-auto">
            {filterTabs.map((tab) => (
              <button
                key={tab.value}
                onClick={() => setSelectedFilter(tab.value)}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                  selectedFilter === tab.value
                    ? 'bg-blue-600 text-white shadow-sm'
                    : 'text-slate-600 hover:text-blue-600 hover:bg-slate-200/70'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Search Input */}
          <div className="relative w-full md:w-80">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search services (e.g. event, MICE, branding, hoarding)..."
              className="w-full pl-10 pr-4 py-2 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-900 placeholder-slate-400 focus:border-blue-600 focus:bg-white focus:outline-none shadow-2xs"
            />
          </div>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7">
          {filteredServices.map((srv) => (
            <div
              key={srv.id}
              className="bg-white rounded-2xl overflow-hidden border border-slate-200 hover:border-blue-300 transition-all duration-300 flex flex-col justify-between group shadow-md hover:shadow-xl"
            >
              {/* Image Banner */}
              <div className="relative h-48 overflow-hidden">
                <img
                  src={srv.image}
                  alt={srv.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-slate-950/20 to-transparent" />

                {/* Service Code Badge */}
                <div className="absolute top-3 left-3 flex gap-2">
                  <span className="px-2.5 py-0.5 rounded-full bg-blue-900/90 backdrop-blur-md text-amber-300 border border-blue-500/30 text-[10px] font-mono font-bold uppercase tracking-wider">
                    Code: {srv.code}
                  </span>
                  <span className="px-2.5 py-0.5 rounded-full bg-white/90 backdrop-blur-md text-slate-800 text-[10px] font-semibold">
                    {srv.badge}
                  </span>
                </div>
              </div>

              {/* Service Info Content */}
              <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                <div className="space-y-1.5">
                  <h3 className="text-xl font-serif font-bold text-slate-900 group-hover:text-blue-600 transition-colors">
                    {srv.title}
                  </h3>
                  <div className="text-xs font-semibold text-blue-700">
                    {srv.subtitle}
                  </div>
                  <p className="text-xs text-slate-600 font-normal leading-relaxed">
                    {srv.tagline}
                  </p>
                </div>

                {/* 3 Core Highlights */}
                <div className="space-y-2 pt-2 border-t border-slate-100">
                  {srv.coreHighlights.map((highlight, idx) => (
                    <div key={idx} className="flex items-center gap-2 text-xs text-slate-700">
                      <CheckCircle2 className="w-3.5 h-3.5 text-blue-600 shrink-0" />
                      <span className="font-medium">{highlight}</span>
                    </div>
                  ))}
                </div>

                {/* Action Buttons: Details & Inquire */}
                <div className="grid grid-cols-2 gap-2 pt-3">
                  <button
                    onClick={() => onSelectServiceDetails(srv)}
                    className="w-full py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
                  >
                    <Info className="w-3.5 h-3.5 text-blue-600" />
                    <span>Details</span>
                  </button>

                  <button
                    onClick={() => onInquireService(srv.title, srv.code)}
                    className="w-full py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold transition-all shadow-sm flex items-center justify-center gap-1.5 cursor-pointer"
                  >
                    <Send className="w-3.5 h-3.5 text-amber-300" />
                    <span>Inquire</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredServices.length === 0 && (
          <div className="text-center py-12 bg-slate-50 rounded-2xl border border-slate-200">
            <p className="text-sm text-slate-600">
              No services matched your query &ldquo;{searchQuery}&rdquo;. Try another term or view all services.
            </p>
            <button
              onClick={() => {
                setSearchQuery('');
                setSelectedFilter('all');
              }}
              className="mt-3 px-4 py-1.5 rounded-lg bg-blue-600 text-xs text-white font-semibold cursor-pointer"
            >
              Reset Filters
            </button>
          </div>
        )}
      </div>
    </section>
  );
};
