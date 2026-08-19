import React from 'react';
import {
  Users,
  Sliders,
  Briefcase,
  Image,
  MessageSquare,
  TrendingUp,
  Clock,
  ArrowUpRight,
  Sparkles,
  Phone,
  Mail,
  ShieldCheck,
  Plus,
  FileText,
  Building2,
  CalendarCheck,
  Search,
  HelpCircle,
} from 'lucide-react';
import { useCms } from '../../context/CmsContext';

export const AdminDashboard: React.FC = () => {
  const {
    inquiries,
    slides,
    slideshowSettings,
    services,
    galleryProjects,
    testimonials,
    faqs,
    auditLogs,
    setActiveTab,
    updateInquiryStatus,
  } = useCms();

  const newLeadsCount = inquiries.filter(
    (i) => i.status === 'New Lead' || i.status === 'In Review'
  ).length;
  const wonLeadsCount = inquiries.filter(
    (i) => i.status === 'Won / Confirmed'
  ).length;
  const activeServicesCount = services.filter((s) => s.active !== false).length;
  const activeProjectsCount = galleryProjects.filter((p) => p.active !== false).length;

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Welcome Banner */}
      <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-blue-900 via-blue-800 to-blue-950 text-white shadow-xl relative overflow-hidden">
        <div className="absolute right-0 top-0 bottom-0 w-1/3 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-amber-400/10 via-transparent to-transparent pointer-events-none" />
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-700/60 border border-blue-600/60 text-amber-300 text-xs font-bold uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              PMS Command Center • Live System
            </div>
            <h1 className="text-2xl sm:text-3xl font-serif font-bold tracking-tight text-white">
              Welcome back to PMS Innovation CMS
            </h1>
            <p className="text-sm text-blue-100/90 leading-relaxed font-normal">
              Manage corporate event inquiries, update service packages, publish portfolio showcases, and generate instant client proposals.
            </p>
          </div>

          {/* Quick Action CTAs */}
          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={() => setActiveTab('ai-generator')}
              className="px-4 py-2.5 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold text-xs shadow-md transition-all flex items-center gap-2 cursor-pointer hover:scale-105"
            >
              <Sparkles className="w-4 h-4 text-slate-950" />
              <span>AI Proposal Bot</span>
            </button>
            <button
              onClick={() => setActiveTab('leads')}
              className="px-4 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 border border-white/20 text-white font-semibold text-xs transition-all flex items-center gap-2 cursor-pointer"
            >
              <Users className="w-4 h-4" />
              <span>View All Leads ({inquiries.length})</span>
            </button>
          </div>
        </div>
      </div>

      {/* KPI Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {/* Card 1: Total Leads */}
        <div
          onClick={() => setActiveTab('leads')}
          className="p-5 rounded-2xl bg-white border border-slate-200 shadow-sm hover:border-blue-300 hover:shadow-md transition-all cursor-pointer group"
        >
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
              Total Inquiries
            </span>
            <div className="w-10 h-10 rounded-xl bg-blue-50 border border-blue-100 flex items-center justify-center text-blue-600 group-hover:scale-110 transition-transform">
              <Users className="w-5 h-5" />
            </div>
          </div>
          <div className="flex items-baseline gap-2 mb-1">
            <span className="text-3xl font-extrabold text-slate-900">{inquiries.length}</span>
            {newLeadsCount > 0 && (
              <span className="text-xs font-bold text-amber-600 bg-amber-50 px-2 py-0.5 rounded-full border border-amber-200">
                {newLeadsCount} Action Needed
              </span>
            )}
          </div>
          <p className="text-xs text-slate-500 flex items-center gap-1">
            <span>{wonLeadsCount} projects confirmed</span>
            <ArrowUpRight className="w-3.5 h-3.5 text-blue-600 ml-auto" />
          </p>
        </div>

        {/* Card 2: Services Active */}
        <div
          onClick={() => setActiveTab('services')}
          className="p-5 rounded-2xl bg-white border border-slate-200 shadow-sm hover:border-blue-300 hover:shadow-md transition-all cursor-pointer group"
        >
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
              Active Disciplines
            </span>
            <div className="w-10 h-10 rounded-xl bg-emerald-50 border border-emerald-100 flex items-center justify-center text-emerald-600 group-hover:scale-110 transition-transform">
              <Briefcase className="w-5 h-5" />
            </div>
          </div>
          <div className="flex items-baseline gap-2 mb-1">
            <span className="text-3xl font-extrabold text-slate-900">{activeServicesCount}</span>
            <span className="text-xs font-medium text-emerald-600">360° Full Spectrum</span>
          </div>
          <p className="text-xs text-slate-500 flex items-center gap-1">
            <span>Events, MICE, Retail, Media</span>
            <ArrowUpRight className="w-3.5 h-3.5 text-blue-600 ml-auto" />
          </p>
        </div>

        {/* Card 3: Portfolio Projects */}
        <div
          onClick={() => setActiveTab('gallery')}
          className="p-5 rounded-2xl bg-white border border-slate-200 shadow-sm hover:border-blue-300 hover:shadow-md transition-all cursor-pointer group"
        >
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
              Showcase Gallery
            </span>
            <div className="w-10 h-10 rounded-xl bg-amber-50 border border-amber-100 flex items-center justify-center text-amber-500 group-hover:scale-110 transition-transform">
              <Image className="w-5 h-5" />
            </div>
          </div>
          <div className="flex items-baseline gap-2 mb-1">
            <span className="text-3xl font-extrabold text-slate-900">{activeProjectsCount}</span>
            <span className="text-xs font-medium text-slate-600">Executed Projects</span>
          </div>
          <p className="text-xs text-slate-500 flex items-center gap-1">
            <span>High-res event photos</span>
            <ArrowUpRight className="w-3.5 h-3.5 text-blue-600 ml-auto" />
          </p>
        </div>

        {/* Card 4: Client Endorsements */}
        <div
          onClick={() => setActiveTab('testimonials')}
          className="p-5 rounded-2xl bg-white border border-slate-200 shadow-sm hover:border-blue-300 hover:shadow-md transition-all cursor-pointer group"
        >
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
              Client Reviews
            </span>
            <div className="w-10 h-10 rounded-xl bg-purple-50 border border-purple-100 flex items-center justify-center text-purple-600 group-hover:scale-110 transition-transform">
              <MessageSquare className="w-5 h-5" />
            </div>
          </div>
          <div className="flex items-baseline gap-2 mb-1">
            <span className="text-3xl font-extrabold text-slate-900">{testimonials.length}</span>
            <span className="text-xs font-bold text-amber-500">4.9/5 Rating</span>
          </div>
          <p className="text-xs text-slate-500 flex items-center gap-1">
            <span>Corporate leadership reviews</span>
            <ArrowUpRight className="w-3.5 h-3.5 text-blue-600 ml-auto" />
          </p>
        </div>
      </div>

      {/* Main Split: Recent Inquiries + Quick Actions & Logs */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Column (8 cols): Recent Lead Pipeline */}
        <div className="lg:col-span-8 space-y-6">
          <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-sm">
            <div className="flex items-center justify-between mb-5">
              <div>
                <h3 className="text-base sm:text-lg font-bold text-slate-900 font-serif">
                  Recent Inquiries & CRM Leads
                </h3>
                <p className="text-xs text-slate-500">
                  Latest client requirements submitted via website contact & configurator.
                </p>
              </div>
              <button
                onClick={() => setActiveTab('leads')}
                className="text-xs font-bold text-blue-600 hover:text-blue-700 flex items-center gap-1 cursor-pointer"
              >
                <span>View CRM</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </button>
            </div>

            {inquiries.length === 0 ? (
              <div className="text-center py-10 text-slate-400 text-sm">
                No inquiries recorded yet.
              </div>
            ) : (
              <div className="space-y-3">
                {inquiries.slice(0, 5).map((inq) => (
                  <div
                    key={inq.id}
                    className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 hover:border-blue-200 transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-4"
                  >
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-slate-900 text-sm">{inq.name}</span>
                        <span className="text-[11px] font-mono font-semibold px-2 py-0.5 rounded bg-blue-100/70 text-blue-700">
                          {inq.id}
                        </span>
                        {inq.priority && (
                          <span
                            className={`text-[10px] font-bold uppercase px-1.5 py-0.5 rounded ${
                              inq.priority === 'High'
                                ? 'bg-rose-100 text-rose-700'
                                : inq.priority === 'Medium'
                                ? 'bg-amber-100 text-amber-700'
                                : 'bg-slate-200 text-slate-600'
                            }`}
                          >
                            {inq.priority}
                          </span>
                        )}
                      </div>
                      <p className="text-xs text-slate-600 line-clamp-1">
                        <span className="font-semibold text-slate-800">
                          {inq.serviceCategory || '360° Marketing'}:
                        </span>{' '}
                        {inq.eventDetails}
                      </p>
                      <div className="flex flex-wrap items-center gap-3 text-[11px] text-slate-500 pt-0.5">
                        <span className="flex items-center gap-1">
                          <Phone className="w-3 h-3 text-emerald-600" />
                          {inq.phone}
                        </span>
                        <span className="flex items-center gap-1">
                          <Mail className="w-3 h-3 text-blue-600" />
                          {inq.email}
                        </span>
                        <span className="flex items-center gap-1 text-slate-400">
                          <Clock className="w-3 h-3" />
                          {new Date(inq.createdAt).toLocaleDateString()}
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 self-end sm:self-center shrink-0">
                      <select
                        value={inq.status}
                        onChange={(e) => updateInquiryStatus(inq.id, e.target.value)}
                        className={`text-xs font-bold px-3 py-1.5 rounded-xl border outline-none cursor-pointer transition-colors ${
                          inq.status === 'Won / Confirmed'
                            ? 'bg-emerald-50 text-emerald-700 border-emerald-300'
                            : inq.status === 'Proposal Sent'
                            ? 'bg-blue-50 text-blue-700 border-blue-300'
                            : inq.status === 'In Review'
                            ? 'bg-amber-50 text-amber-700 border-amber-300'
                            : 'bg-white text-slate-700 border-slate-300'
                        }`}
                      >
                        <option value="New Lead">New Lead</option>
                        <option value="In Review">In Review</option>
                        <option value="Contacted">Contacted</option>
                        <option value="Proposal Sent">Proposal Sent</option>
                        <option value="Won / Confirmed">Won / Confirmed</option>
                        <option value="Closed / Archived">Closed / Archived</option>
                      </select>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Right Column (4 cols): Quick Tools & Audit Feed */}
        <div className="lg:col-span-4 space-y-6">
          {/* Quick Management Shortcuts */}
          <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-sm space-y-4">
            <h3 className="text-base font-bold text-slate-900 font-serif">
              Quick CMS Navigation
            </h3>
            <div className="grid grid-cols-2 gap-2.5">
              <button
                onClick={() => setActiveTab('slideshow')}
                className="col-span-2 p-3.5 rounded-2xl bg-blue-50/80 hover:bg-blue-100/80 border border-blue-200 text-left transition-all group cursor-pointer flex items-center justify-between"
              >
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-blue-600 text-white flex items-center justify-center shadow-sm group-hover:scale-105 transition-transform">
                    <Sliders className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-xs font-bold text-blue-900">Startup Slideshow CMS</div>
                    <div className="text-[10px] text-blue-700">
                      {slides.length} slides • {slideshowSettings.intervalSeconds}s rotation
                    </div>
                  </div>
                </div>
                <ArrowUpRight className="w-4 h-4 text-blue-600 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </button>

              <button
                onClick={() => setActiveTab('services')}
                className="p-3 rounded-2xl bg-slate-50 hover:bg-blue-50 border border-slate-200 hover:border-blue-200 text-left transition-all group cursor-pointer"
              >
                <Briefcase className="w-5 h-5 text-blue-600 mb-1.5 group-hover:scale-110 transition-transform" />
                <div className="text-xs font-bold text-slate-900">Edit Services</div>
                <div className="text-[10px] text-slate-500">{services.length} items</div>
              </button>

              <button
                onClick={() => setActiveTab('gallery')}
                className="p-3 rounded-2xl bg-slate-50 hover:bg-blue-50 border border-slate-200 hover:border-blue-200 text-left transition-all group cursor-pointer"
              >
                <Image className="w-5 h-5 text-amber-500 mb-1.5 group-hover:scale-110 transition-transform" />
                <div className="text-xs font-bold text-slate-900">Add Showcase</div>
                <div className="text-[10px] text-slate-500">{galleryProjects.length} items</div>
              </button>

              <button
                onClick={() => setActiveTab('testimonials')}
                className="p-3 rounded-2xl bg-slate-50 hover:bg-blue-50 border border-slate-200 hover:border-blue-200 text-left transition-all group cursor-pointer"
              >
                <MessageSquare className="w-5 h-5 text-purple-600 mb-1.5 group-hover:scale-110 transition-transform" />
                <div className="text-xs font-bold text-slate-900">Testimonials</div>
                <div className="text-[10px] text-slate-500">{testimonials.length} reviews</div>
              </button>

              <button
                onClick={() => setActiveTab('company')}
                className="p-3 rounded-2xl bg-slate-50 hover:bg-blue-50 border border-slate-200 hover:border-blue-200 text-left transition-all group cursor-pointer"
              >
                <Building2 className="w-5 h-5 text-emerald-600 mb-1.5 group-hover:scale-110 transition-transform" />
                <div className="text-xs font-bold text-slate-900">Company Info</div>
                <div className="text-[10px] text-slate-500">Phones & Address</div>
              </button>

              <button
                onClick={() => setActiveTab('faq')}
                className="col-span-2 p-3.5 rounded-2xl bg-indigo-50/80 hover:bg-indigo-100/80 border border-indigo-200 text-left transition-all group cursor-pointer flex items-center justify-between"
              >
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-indigo-600 text-white flex items-center justify-center shadow-xs group-hover:scale-105 transition-transform">
                    <HelpCircle className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-xs font-bold text-indigo-950">Homepage FAQ Manager CMS</div>
                    <div className="text-[10px] text-indigo-700">
                      {faqs.length} client questions • Synced to Google Schema SERP
                    </div>
                  </div>
                </div>
                <ArrowUpRight className="w-4 h-4 text-indigo-700 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </button>

              <button
                onClick={() => setActiveTab('seo')}
                className="col-span-2 p-3 rounded-2xl bg-emerald-50/80 hover:bg-emerald-100/80 border border-emerald-200 text-left transition-all group cursor-pointer flex items-center justify-between"
              >
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-xl bg-emerald-600 text-white flex items-center justify-center shadow-xs group-hover:scale-105 transition-transform">
                    <Search className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-xs font-bold text-emerald-950">SEO & Google Crawling Suite</div>
                    <div className="text-[10px] text-emerald-700">Meta tags, keywords, social cards, robots & sitemap</div>
                  </div>
                </div>
                <ArrowUpRight className="w-4 h-4 text-emerald-700 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </button>
            </div>
          </div>

          {/* Audit Logs */}
          <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-sm space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-bold text-slate-900 font-serif">
                Activity Audit Log
              </h3>
              <span className="text-[10px] font-mono text-slate-400">Real-time</span>
            </div>
            <div className="space-y-2.5 max-h-64 overflow-y-auto pr-1">
              {auditLogs.slice(0, 6).map((log) => (
                <div
                  key={log.id}
                  className="text-xs p-2.5 rounded-xl bg-slate-50 border border-slate-100 space-y-0.5"
                >
                  <div className="flex items-center justify-between font-semibold text-slate-800">
                    <span>{log.action}</span>
                    <span className="text-[9px] text-slate-400 font-mono">
                      {new Date(log.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-500 leading-snug">{log.details}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
