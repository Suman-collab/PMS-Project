import React, { useState } from 'react';
import {
  Building2,
  Phone,
  Mail,
  MapPin,
  Clock,
  Save,
  RotateCcw,
  Download,
  Upload,
  Sparkles,
  CheckCircle2,
  AlertTriangle,
} from 'lucide-react';
import { useCms } from '../../context/CmsContext';

export const AdminCompanySettings: React.FC = () => {
  const {
    companyInfo,
    updateCompanyInfo,
    resetToDefaults,
    exportDataJSON,
    importDataJSON,
  } = useCms();

  const [savedAlert, setSavedAlert] = useState(false);
  const [formData, setFormData] = useState({ ...companyInfo });

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    updateCompanyInfo(formData);
    setSavedAlert(true);
    setTimeout(() => setSavedAlert(false), 3000);
  };

  const handleImportFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (event) => {
      const content = event.target?.result as string;
      const success = importDataJSON(content);
      if (success) {
        alert('CMS state successfully restored from JSON backup!');
      } else {
        alert('Failed to parse backup JSON file.');
      }
    };
    reader.readAsText(file);
  };

  return (
    <div className="space-y-8 animate-fadeIn max-w-5xl">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold font-serif text-slate-900">
            Company Profile & Contact Settings
          </h2>
          <p className="text-xs text-slate-500">
            Update official company hotlines, headquarter address, working hours, and brand copy.
          </p>
        </div>

        {savedAlert && (
          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-bold animate-bounce">
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            <span>Settings Saved Successfully!</span>
          </div>
        )}
      </div>

      {/* Main Settings Form */}
      <form onSubmit={handleSave} className="space-y-6">
        {/* Contact Numbers & Emails */}
        <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-sm space-y-4">
          <div className="flex items-center gap-2 pb-3 border-b border-slate-100">
            <Phone className="w-4 h-4 text-blue-600" />
            <h3 className="font-bold text-slate-900 text-sm font-serif">
              Official Contact Hotlines & Inboxes
            </h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div>
              <label className="block font-bold text-slate-700 mb-1">Primary Hotline (Display)</label>
              <input
                type="text"
                value={formData.phone1}
                onChange={(e) => setFormData({ ...formData, phone1: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 focus:border-blue-500 outline-none text-xs"
              />
            </div>
            <div>
              <label className="block font-bold text-slate-700 mb-1">Primary Hotline (Dialable Number)</label>
              <input
                type="text"
                value={formData.phone1Raw}
                onChange={(e) => setFormData({ ...formData, phone1Raw: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 focus:border-blue-500 outline-none text-xs font-mono"
              />
            </div>

            <div>
              <label className="block font-bold text-slate-700 mb-1">Secondary Hotline (Display)</label>
              <input
                type="text"
                value={formData.phone2}
                onChange={(e) => setFormData({ ...formData, phone2: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 focus:border-blue-500 outline-none text-xs"
              />
            </div>
            <div>
              <label className="block font-bold text-slate-700 mb-1">Secondary Hotline (Dialable Number)</label>
              <input
                type="text"
                value={formData.phone2Raw}
                onChange={(e) => setFormData({ ...formData, phone2Raw: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 focus:border-blue-500 outline-none text-xs font-mono"
              />
            </div>

            <div>
              <label className="block font-bold text-slate-700 mb-1">Primary Corporate Email</label>
              <input
                type="email"
                value={formData.email1}
                onChange={(e) => setFormData({ ...formData, email1: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 focus:border-blue-500 outline-none text-xs"
              />
            </div>
            <div>
              <label className="block font-bold text-slate-700 mb-1">Secondary Email / Support</label>
              <input
                type="email"
                value={formData.email2}
                onChange={(e) => setFormData({ ...formData, email2: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 focus:border-blue-500 outline-none text-xs"
              />
            </div>
          </div>
        </div>

        {/* Physical Address & Hours */}
        <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-sm space-y-4">
          <div className="flex items-center gap-2 pb-3 border-b border-slate-100">
            <MapPin className="w-4 h-4 text-emerald-600" />
            <h3 className="font-bold text-slate-900 text-sm font-serif">
              Headquarters Address & Operating Hours
            </h3>
          </div>

          <div className="space-y-3.5 text-xs">
            <div>
              <label className="block font-bold text-slate-700 mb-1">Office & Studio Address</label>
              <input
                type="text"
                value={formData.address}
                onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 focus:border-blue-500 outline-none text-xs"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              <div>
                <label className="block font-bold text-slate-700 mb-1">Working & Support Hours</label>
                <input
                  type="text"
                  value={formData.workingHours}
                  onChange={(e) => setFormData({ ...formData, workingHours: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 focus:border-blue-500 outline-none text-xs"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Google Maps Embed / Location URL</label>
                <input
                  type="url"
                  value={formData.mapUrl}
                  onChange={(e) => setFormData({ ...formData, mapUrl: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 focus:border-blue-500 outline-none text-xs"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Brand Mission & Story */}
        <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-sm space-y-4">
          <div className="flex items-center gap-2 pb-3 border-b border-slate-100">
            <Building2 className="w-4 h-4 text-amber-500" />
            <h3 className="font-bold text-slate-900 text-sm font-serif">
              Brand Mission, Vision & Hero Taglines
            </h3>
          </div>

          <div className="space-y-3.5 text-xs">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              <div>
                <label className="block font-bold text-slate-700 mb-1">Hero Subtitle</label>
                <input
                  type="text"
                  value={formData.subtitle}
                  onChange={(e) => setFormData({ ...formData, subtitle: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 focus:border-blue-500 outline-none text-xs"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Main Tagline</label>
                <input
                  type="text"
                  value={formData.tagline}
                  onChange={(e) => setFormData({ ...formData, tagline: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 focus:border-blue-500 outline-none text-xs"
                />
              </div>
            </div>

            <div>
              <label className="block font-bold text-slate-700 mb-1">Hero Paragraph Description</label>
              <textarea
                rows={2}
                value={formData.heroDescription}
                onChange={(e) => setFormData({ ...formData, heroDescription: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 focus:border-blue-500 outline-none text-xs"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              <div>
                <label className="block font-bold text-slate-700 mb-1">Our Mission</label>
                <textarea
                  rows={3}
                  value={formData.mission}
                  onChange={(e) => setFormData({ ...formData, mission: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 focus:border-blue-500 outline-none text-xs"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Our Vision</label>
                <textarea
                  rows={3}
                  value={formData.vision}
                  onChange={(e) => setFormData({ ...formData, vision: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 focus:border-blue-500 outline-none text-xs"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Save Button Bar */}
        <div className="flex items-center justify-end gap-3 pt-2">
          <button
            type="submit"
            className="px-6 py-3 rounded-2xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm shadow-md transition-all flex items-center gap-2 cursor-pointer"
          >
            <Save className="w-4 h-4" />
            <span>Save All Company Changes</span>
          </button>
        </div>
      </form>

      {/* Backup & System Maintenance Zone */}
      <div className="p-6 rounded-3xl bg-slate-50 border border-slate-200 space-y-4">
        <h3 className="font-bold text-slate-900 text-sm font-serif">
          CMS Data Backup & Maintenance
        </h3>
        <p className="text-xs text-slate-500">
          Export full CMS configuration, leads, and services to JSON, or restore defaults.
        </p>

        <div className="flex flex-wrap items-center gap-3 pt-2">
          <button
            onClick={exportDataJSON}
            className="px-4 py-2 rounded-xl bg-white hover:bg-slate-100 border border-slate-200 text-slate-800 font-semibold text-xs transition-colors flex items-center gap-1.5 cursor-pointer shadow-xs"
          >
            <Download className="w-3.5 h-3.5 text-blue-600" />
            <span>Export CMS Backup (JSON)</span>
          </button>

          <label className="px-4 py-2 rounded-xl bg-white hover:bg-slate-100 border border-slate-200 text-slate-800 font-semibold text-xs transition-colors flex items-center gap-1.5 cursor-pointer shadow-xs">
            <Upload className="w-3.5 h-3.5 text-emerald-600" />
            <span>Import JSON Backup</span>
            <input
              type="file"
              accept=".json"
              onChange={handleImportFile}
              className="hidden"
            />
          </label>

          <button
            onClick={() => {
              if (confirm('Are you sure you want to reset all CMS content to original default PMS data? This will clear customized local records.')) {
                resetToDefaults();
                alert('CMS content reset to defaults.');
              }
            }}
            className="px-4 py-2 rounded-xl bg-rose-50 hover:bg-rose-100 border border-rose-200 text-rose-700 font-semibold text-xs transition-colors flex items-center gap-1.5 cursor-pointer ml-auto"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset to Default Showcase</span>
          </button>
        </div>
      </div>
    </div>
  );
};
