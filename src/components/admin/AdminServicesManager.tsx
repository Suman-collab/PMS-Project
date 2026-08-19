import React, { useState } from 'react';
import {
  Briefcase,
  Plus,
  Edit,
  Trash2,
  CheckCircle2,
  X,
  Eye,
  EyeOff,
  Sparkles,
  Layers,
  Award,
  Image as ImageIcon,
} from 'lucide-react';
import { useCms } from '../../context/CmsContext';
import { PmsService, PmsServiceCode } from '../../types';

export const AdminServicesManager: React.FC = () => {
  const {
    services,
    addService,
    updateService,
    deleteService,
    toggleServiceActive,
  } = useCms();

  const [editingService, setEditingService] = useState<PmsService | null>(null);
  const [isAddMode, setIsAddMode] = useState(false);

  // Form State
  const [formData, setFormData] = useState<{
    code: PmsServiceCode;
    title: string;
    subtitle: string;
    tagline: string;
    description: string;
    coreHighlights: string;
    detailedInclusions: string;
    image: string;
    badge: string;
  }>({
    code: 'event',
    title: '',
    subtitle: '',
    tagline: '',
    description: '',
    coreHighlights: '',
    detailedInclusions: '',
    image: 'https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&w=1200&q=80',
    badge: 'Premier Discipline',
  });

  const handleOpenAdd = () => {
    setFormData({
      code: 'event',
      title: '',
      subtitle: '',
      tagline: '',
      description: '',
      coreHighlights: 'Executive Conferences & Meets\nProduct Launches & Reveals\nStagecraft & Audio Visual',
      detailedInclusions: '3D Stage Design & LED Walls\nConcert Audio & Lighting\nDelegate Registration',
      image: 'https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&w=1200&q=80',
      badge: 'Premier Discipline',
    });
    setEditingService(null);
    setIsAddMode(true);
  };

  const handleOpenEdit = (service: PmsService) => {
    setFormData({
      code: service.code,
      title: service.title,
      subtitle: service.subtitle,
      tagline: service.tagline,
      description: service.description,
      coreHighlights: service.coreHighlights.join('\n'),
      detailedInclusions: service.detailedInclusions.join('\n'),
      image: service.image,
      badge: service.badge,
    });
    setEditingService(service);
    setIsAddMode(false);
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    const highlights = formData.coreHighlights
      .split('\n')
      .map((s) => s.trim())
      .filter(Boolean);
    const inclusions = formData.detailedInclusions
      .split('\n')
      .map((s) => s.trim())
      .filter(Boolean);

    if (isAddMode) {
      addService({
        code: formData.code,
        title: formData.title,
        subtitle: formData.subtitle,
        tagline: formData.tagline,
        description: formData.description,
        coreHighlights: highlights,
        detailedInclusions: inclusions,
        image: formData.image,
        badge: formData.badge,
        active: true,
      });
    } else if (editingService) {
      updateService(editingService.id, {
        code: formData.code,
        title: formData.title,
        subtitle: formData.subtitle,
        tagline: formData.tagline,
        description: formData.description,
        coreHighlights: highlights,
        detailedInclusions: inclusions,
        image: formData.image,
        badge: formData.badge,
      });
    }

    setEditingService(null);
    setIsAddMode(false);
  };

  const imagePresets = [
    { label: 'Corporate Event Stage', url: 'https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&w=1200&q=80' },
    { label: 'MICE & Conference', url: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&w=1200&q=80' },
    { label: 'Mall & Brand Activation', url: 'https://images.unsplash.com/photo-1505373877841-8d25f7d46678?auto=format&fit=crop&w=1200&q=80' },
    { label: 'Retail Shop & Signage', url: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=1200&q=80' },
    { label: 'Outdoor Billboard Media', url: 'https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?auto=format&fit=crop&w=1200&q=80' },
    { label: 'Digital Studio & Ads', url: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1200&q=80' },
    { label: 'Executive Gifting & Kits', url: 'https://images.unsplash.com/photo-1513885535751-8b9238bd345a?auto=format&fit=crop&w=1200&q=80' },
  ];

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold font-serif text-slate-900">
            360° Services & Disciplines CMS
          </h2>
          <p className="text-xs text-slate-500">
            Manage the core capabilities displayed in the "Our Services & Solutions" section of the website.
          </p>
        </div>

        <button
          onClick={handleOpenAdd}
          className="px-4 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs shadow-md transition-all flex items-center gap-1.5 cursor-pointer self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" />
          <span>Add New Service Package</span>
        </button>
      </div>

      {/* Services Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {services.map((srv) => (
          <div
            key={srv.id}
            className={`rounded-3xl border transition-all duration-300 overflow-hidden flex flex-col justify-between bg-white ${
              srv.active === false
                ? 'opacity-60 border-dashed border-slate-300 bg-slate-50'
                : 'border-slate-200 shadow-sm hover:shadow-md hover:border-blue-300'
            }`}
          >
            <div>
              {/* Image Preview & Badge */}
              <div className="relative h-44 w-full overflow-hidden bg-slate-900">
                <img
                  src={srv.image}
                  alt={srv.title}
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent" />
                <div className="absolute top-3 left-3 flex items-center gap-1.5">
                  <span className="px-2.5 py-1 rounded-full bg-blue-600/90 text-white font-bold text-[10px] uppercase tracking-wider backdrop-blur-xs">
                    {srv.badge}
                  </span>
                  <span className="px-2 py-0.5 rounded-md bg-slate-900/80 text-amber-400 text-[10px] font-mono uppercase font-bold">
                    {srv.code}
                  </span>
                </div>

                <div className="absolute bottom-3 left-3 right-3">
                  <h3 className="font-bold text-base text-white font-serif leading-tight">
                    {srv.title}
                  </h3>
                  <p className="text-[11px] text-blue-200 line-clamp-1 mt-0.5">
                    {srv.subtitle}
                  </p>
                </div>
              </div>

              {/* Body */}
              <div className="p-5 space-y-3">
                <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed">
                  {srv.description}
                </p>

                {/* Highlights List */}
                <div className="space-y-1 pt-1 border-t border-slate-100">
                  <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                    Core Highlights ({srv.coreHighlights.length})
                  </div>
                  {srv.coreHighlights.slice(0, 3).map((h, i) => (
                    <div key={i} className="flex items-center gap-1.5 text-xs text-slate-700">
                      <CheckCircle2 className="w-3 h-3 text-emerald-600 shrink-0" />
                      <span className="line-clamp-1">{h}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Card Footer Actions */}
            <div className="p-4 bg-slate-50 border-t border-slate-100 flex items-center justify-between">
              <button
                onClick={() => toggleServiceActive(srv.id)}
                className={`flex items-center gap-1 text-xs font-semibold px-2.5 py-1 rounded-lg transition-colors cursor-pointer ${
                  srv.active === false
                    ? 'bg-amber-100 text-amber-800 hover:bg-amber-200'
                    : 'bg-emerald-100 text-emerald-800 hover:bg-emerald-200'
                }`}
              >
                {srv.active === false ? (
                  <>
                    <EyeOff className="w-3.5 h-3.5" />
                    <span>Hidden</span>
                  </>
                ) : (
                  <>
                    <Eye className="w-3.5 h-3.5" />
                    <span>Live on Site</span>
                  </>
                )}
              </button>

              <div className="flex items-center gap-1.5">
                <button
                  onClick={() => handleOpenEdit(srv)}
                  className="p-2 rounded-xl bg-white hover:bg-blue-50 text-blue-600 border border-slate-200 hover:border-blue-300 transition-colors cursor-pointer shadow-xs"
                  title="Edit Service"
                >
                  <Edit className="w-3.5 h-3.5" />
                </button>
                <button
                  onClick={() => {
                    if (confirm(`Are you sure you want to delete service "${srv.title}"?`)) {
                      deleteService(srv.id);
                    }
                  }}
                  className="p-2 rounded-xl bg-white hover:bg-rose-50 text-rose-600 border border-slate-200 hover:border-rose-300 transition-colors cursor-pointer shadow-xs"
                  title="Delete Service"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Add / Edit Service Modal */}
      {(isAddMode || editingService) && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-xs animate-fadeIn">
          <div className="relative w-full max-w-2xl bg-white rounded-3xl border border-slate-200 shadow-2xl p-6 sm:p-8 max-h-[90vh] overflow-y-auto space-y-5 text-slate-900">
            <button
              onClick={() => {
                setEditingService(null);
                setIsAddMode(false);
              }}
              className="absolute top-5 right-5 p-2 rounded-full text-slate-400 hover:text-slate-700 hover:bg-slate-100"
            >
              <X className="w-5 h-5" />
            </button>

            <div>
              <h3 className="text-xl font-bold font-serif text-slate-900">
                {isAddMode ? 'Create New Service Discipline' : `Edit: ${formData.title}`}
              </h3>
              <p className="text-xs text-slate-500">
                Updates will immediately reflect on the live homepage and service modals.
              </p>
            </div>

            <form onSubmit={handleSave} className="space-y-4 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Service Title *</label>
                  <input
                    type="text"
                    required
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    placeholder="e.g. Corporate Event Management"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 focus:border-blue-500 outline-none text-xs"
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">Service Code *</label>
                  <select
                    value={formData.code}
                    onChange={(e) => setFormData({ ...formData, code: e.target.value as PmsServiceCode })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 focus:border-blue-500 outline-none text-xs"
                  >
                    <option value="event">Corporate Events (event)</option>
                    <option value="mice">MICE Services (mice)</option>
                    <option value="activation">Brand Activation (activation)</option>
                    <option value="branding">Retail Shop Branding (branding)</option>
                    <option value="hoarding">Hoarding & Outdoor (hoarding)</option>
                    <option value="digital">Digital Campaigns (digital)</option>
                    <option value="merchandising">Merchandising (merchandising)</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Subtitle / Subheading</label>
                  <input
                    type="text"
                    value={formData.subtitle}
                    onChange={(e) => setFormData({ ...formData, subtitle: e.target.value })}
                    placeholder="e.g. Creating Impactful & Memorable Experiences"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 focus:border-blue-500 outline-none text-xs"
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">Badge Callout</label>
                  <input
                    type="text"
                    value={formData.badge}
                    onChange={(e) => setFormData({ ...formData, badge: e.target.value })}
                    placeholder="e.g. Flagship Discipline / High Engagement"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 focus:border-blue-500 outline-none text-xs"
                  />
                </div>
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Tagline & Summary</label>
                <input
                  type="text"
                  value={formData.tagline}
                  onChange={(e) => setFormData({ ...formData, tagline: e.target.value })}
                  placeholder="Short impact statement..."
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 focus:border-blue-500 outline-none text-xs"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Detailed Description *</label>
                <textarea
                  rows={2}
                  required
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="In-depth explanation of how PMS delivers this solution..."
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 focus:border-blue-500 outline-none text-xs"
                />
              </div>

              {/* Highlights & Inclusions */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">
                    Core Highlights (One per line)
                  </label>
                  <textarea
                    rows={4}
                    value={formData.coreHighlights}
                    onChange={(e) => setFormData({ ...formData, coreHighlights: e.target.value })}
                    placeholder="3D Stage Design&#10;Audio Visuals&#10;Delegate Kits"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 focus:border-blue-500 outline-none text-xs font-mono"
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">
                    Detailed Inclusions (One per line)
                  </label>
                  <textarea
                    rows={4}
                    value={formData.detailedInclusions}
                    onChange={(e) => setFormData({ ...formData, detailedInclusions: e.target.value })}
                    placeholder="Hotel blocks&#10;Run of Show execution&#10;Promoters"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 focus:border-blue-500 outline-none text-xs font-mono"
                  />
                </div>
              </div>

              {/* Image URL & Preset Selection */}
              <div>
                <label className="block font-bold text-slate-700 mb-1">Cover Image URL</label>
                <div className="flex gap-2 mb-2">
                  <input
                    type="url"
                    required
                    value={formData.image}
                    onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                    placeholder="https://images.unsplash.com/..."
                    className="flex-1 px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 focus:border-blue-500 outline-none text-xs"
                  />
                </div>

                {/* Quick Presets */}
                <div className="flex flex-wrap items-center gap-1.5">
                  <span className="text-[10px] text-slate-400 font-semibold">Presets:</span>
                  {imagePresets.map((p, i) => (
                    <button
                      key={i}
                      type="button"
                      onClick={() => setFormData({ ...formData, image: p.url })}
                      className="px-2 py-0.5 rounded-md bg-slate-100 hover:bg-blue-100 text-slate-700 hover:text-blue-700 text-[10px] font-medium transition-colors cursor-pointer"
                    >
                      {p.label}
                    </button>
                  ))}
                </div>
              </div>

              <div className="flex justify-end gap-2.5 pt-3 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => {
                    setEditingService(null);
                    setIsAddMode(false);
                  }}
                  className="px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold text-xs cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs shadow-md cursor-pointer"
                >
                  {isAddMode ? 'Publish Service' : 'Save Changes'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
