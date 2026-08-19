import React, { useState } from 'react';
import {
  LayoutDashboard,
  Sliders,
  Users,
  Briefcase,
  Image as ImageIcon,
  MessageSquare,
  Building2,
  Sparkles,
  Settings,
  LogOut,
  ExternalLink,
  Menu,
  X,
  ShieldCheck,
  Bell,
  ChevronRight,
  Search,
  Globe,
  HelpCircle,
  Palette,
} from 'lucide-react';
import { useCms } from '../../context/CmsContext';
import { CmsAdminTab } from '../../types';
import { PmsLogo } from '../PmsLogo';

// Tab Subcomponents
import { AdminDashboard } from './AdminDashboard';
import { AdminLogoManager } from './AdminLogoManager';
import { AdminSlideshowManager } from './AdminSlideshowManager';
import { AdminLeadsManager } from './AdminLeadsManager';
import { AdminServicesManager } from './AdminServicesManager';
import { AdminGalleryManager } from './AdminGalleryManager';
import { AdminTestimonialsManager } from './AdminTestimonialsManager';
import { AdminFaqManager } from './AdminFaqManager';
import { AdminCompanySettings } from './AdminCompanySettings';
import { AdminSeoManager } from './AdminSeoManager';
import { AdminAiProposalGenerator } from './AdminAiProposalGenerator';

export const AdminLayout: React.FC = () => {
  const {
    activeTab,
    setActiveTab,
    setIsAdminOpen,
    logoutAdmin,
    inquiries,
    slides,
    faqs,
  } = useCms();

  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);

  const newLeadsCount = inquiries.filter(
    (i) => i.status === 'New Lead' || i.status === 'In Review'
  ).length;

  const navItems: Array<{
    id: CmsAdminTab;
    label: string;
    icon: React.FC<{ className?: string }>;
    badge?: number;
    highlight?: boolean;
  }> = [
    { id: 'dashboard', label: 'Dashboard & Analytics', icon: LayoutDashboard },
    { id: 'logo', label: 'Company Logo & Branding', icon: Palette, highlight: true },
    { id: 'slideshow', label: 'Startup Slideshow CMS', icon: Sliders, badge: slides.length },
    { id: 'leads', label: 'Inquiries & CRM Leads', icon: Users, badge: newLeadsCount },
    { id: 'services', label: '360° Services CMS', icon: Briefcase },
    { id: 'gallery', label: 'Portfolio Showcase', icon: ImageIcon },
    { id: 'testimonials', label: 'Client Testimonials', icon: MessageSquare },
    { id: 'faq', label: 'FAQ Manager CMS', icon: HelpCircle, badge: faqs.length },
    { id: 'company', label: 'Company Profile & Info', icon: Building2 },
    { id: 'seo', label: 'SEO & Google Crawling', icon: Search },
    { id: 'ai-generator', label: 'AI Proposal Strategist', icon: Sparkles },
    { id: 'settings', label: 'Data Backup & Reset', icon: Settings },
  ];

  const renderActiveTab = () => {
    switch (activeTab) {
      case 'dashboard':
        return <AdminDashboard />;
      case 'logo':
        return <AdminLogoManager />;
      case 'slideshow':
        return <AdminSlideshowManager />;
      case 'leads':
        return <AdminLeadsManager />;
      case 'services':
        return <AdminServicesManager />;
      case 'gallery':
        return <AdminGalleryManager />;
      case 'testimonials':
        return <AdminTestimonialsManager />;
      case 'faq':
        return <AdminFaqManager />;
      case 'company':
        return <AdminCompanySettings />;
      case 'seo':
        return <AdminSeoManager />;
      case 'ai-generator':
        return <AdminAiProposalGenerator />;
      case 'settings':
        return <AdminCompanySettings />;
      default:
        return <AdminDashboard />;
    }
  };

  return (
    <div className="min-h-screen bg-slate-100/90 text-slate-900 flex flex-col font-sans">
      {/* Top Bar */}
      <header className="sticky top-0 z-40 bg-white border-b border-slate-200 shadow-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          {/* Brand & Portal Title */}
          <div className="flex items-center gap-4">
            <button
              onClick={() => setIsMobileNavOpen(!isMobileNavOpen)}
              className="lg:hidden p-2 rounded-xl text-slate-600 hover:bg-slate-100"
              title="Toggle Menu"
            >
              {isMobileNavOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>

            <div className="flex items-center gap-3">
              <PmsLogo className="h-8 w-auto" />
              <div className="hidden sm:block h-5 w-px bg-slate-200" />
              <div className="hidden sm:flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-blue-50 border border-blue-200 text-blue-800 text-[11px] font-bold uppercase tracking-wider">
                <ShieldCheck className="w-3.5 h-3.5 text-blue-600" />
                CMS Admin Panel
              </div>
            </div>
          </div>

          {/* Right Top Actions */}
          <div className="flex items-center gap-3">
            {/* View Live Website Button */}
            <button
              onClick={() => {
                setIsAdminOpen(false);
                window.location.hash = '';
              }}
              className="px-3.5 py-2 rounded-xl bg-blue-50 hover:bg-blue-100 border border-blue-200 text-blue-700 font-bold text-xs transition-colors flex items-center gap-1.5 cursor-pointer"
              title="Switch back to public website view"
            >
              <ExternalLink className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">View Public Website</span>
              <span className="sm:hidden">Live Site</span>
            </button>

            {/* Logout */}
            <button
              onClick={logoutAdmin}
              className="p-2 rounded-xl text-slate-500 hover:text-rose-600 hover:bg-rose-50 border border-transparent hover:border-rose-200 transition-colors cursor-pointer"
              title="Sign Out"
            >
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        </div>
      </header>

      {/* Main Body */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 w-full flex-1 flex gap-8">
        {/* Left Desktop Sidebar */}
        <aside className="hidden lg:block w-64 shrink-0 space-y-6">
          <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-4 space-y-1">
            <div className="px-3 py-2 text-[10px] font-bold uppercase tracking-wider text-slate-400">
              Management Modules
            </div>

            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-2xl text-xs font-bold transition-all cursor-pointer ${
                    isActive
                      ? 'bg-blue-600 text-white shadow-sm'
                      : item.highlight
                      ? 'bg-amber-50 hover:bg-amber-100 text-amber-900'
                      : 'text-slate-700 hover:bg-slate-50 hover:text-blue-600'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <Icon className={`w-4 h-4 ${isActive ? 'text-white' : item.highlight ? 'text-amber-600' : 'text-slate-500'}`} />
                    <span>{item.label}</span>
                  </div>

                  {item.badge !== undefined && item.badge > 0 && (
                    <span
                      className={`text-[10px] px-1.5 py-0.5 rounded-full font-extrabold ${
                        isActive
                          ? 'bg-white text-blue-700'
                          : 'bg-rose-500 text-white'
                      }`}
                    >
                      {item.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </div>

          {/* Quick System Badge */}
          <div className="p-4 rounded-2xl bg-gradient-to-br from-blue-900 to-slate-900 text-white text-xs space-y-2">
            <div className="flex items-center gap-1.5 text-amber-400 font-bold text-[11px]">
              <Sparkles className="w-3.5 h-3.5" />
              <span>PMS HQ Kolkata Hub</span>
            </div>
            <p className="text-[11px] text-blue-200 leading-snug">
              Ground Floor, 1174, Madurdaha, Hussainpur, Kolkata 700107
            </p>
            <div className="text-[10px] text-slate-400 pt-1 font-mono">
              Hotline: +91 98316 30072
            </div>
          </div>
        </aside>

        {/* Mobile Navigation Drawer */}
        {isMobileNavOpen && (
          <div className="fixed inset-0 z-50 lg:hidden bg-slate-950/60 backdrop-blur-xs flex">
            <div className="w-72 bg-white h-full p-6 shadow-2xl flex flex-col justify-between overflow-y-auto">
              <div className="space-y-4">
                <div className="flex items-center justify-between pb-4 border-b border-slate-100">
                  <PmsLogo className="h-7 w-auto" />
                  <button
                    onClick={() => setIsMobileNavOpen(false)}
                    className="p-1 rounded-lg text-slate-500 hover:bg-slate-100"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                <div className="space-y-1">
                  {navItems.map((item) => {
                    const Icon = item.icon;
                    const isActive = activeTab === item.id;
                    return (
                      <button
                        key={item.id}
                        onClick={() => {
                          setActiveTab(item.id);
                          setIsMobileNavOpen(false);
                        }}
                        className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-2xl text-xs font-bold transition-all ${
                          isActive
                            ? 'bg-blue-600 text-white'
                            : 'text-slate-700 hover:bg-slate-100'
                        }`}
                      >
                        <div className="flex items-center gap-2.5">
                          <Icon className="w-4 h-4" />
                          <span>{item.label}</span>
                        </div>
                        {item.badge !== undefined && item.badge > 0 && (
                          <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-rose-500 text-white font-bold">
                            {item.badge}
                          </span>
                        )}
                      </button>
                    );
                  })}
                </div>
              </div>

              <div className="pt-4 border-t border-slate-100">
                <button
                  onClick={() => {
                    setIsAdminOpen(false);
                    setIsMobileNavOpen(false);
                  }}
                  className="w-full py-2.5 px-3 rounded-xl bg-blue-50 text-blue-700 font-bold text-xs flex items-center justify-center gap-2"
                >
                  <ExternalLink className="w-4 h-4" />
                  <span>Exit to Public Website</span>
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Center Main Tab Content */}
        <main className="flex-1 min-w-0">{renderActiveTab()}</main>
      </div>
    </div>
  );
};
