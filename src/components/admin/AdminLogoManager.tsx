import React, { useState } from 'react';
import { useCms } from '../../context/CmsContext';
import {
  Upload,
  Image as ImageIcon,
  CheckCircle2,
  RotateCcw,
  Sparkles,
  Eye,
  Sliders,
  AlertCircle,
  HelpCircle,
  ExternalLink,
  Sun,
  Moon,
  Smartphone,
  Laptop,
  Layers,
  Trash2,
} from 'lucide-react';
import { PmsLogo } from '../PmsLogo';

export const AdminLogoManager: React.FC = () => {
  const { companyInfo, updateCompanyInfo } = useCms();

  const [primaryLogoUrl, setPrimaryLogoUrl] = useState(companyInfo.logoUrl || '');
  const [whiteLogoUrl, setWhiteLogoUrl] = useState(companyInfo.logoWhiteUrl || '');
  const [logoHeight, setLogoHeight] = useState(companyInfo.logoHeightPx || 48);
  const [savedAlert, setSavedAlert] = useState(false);
  const [previewTab, setPreviewTab] = useState<'light-nav' | 'dark-footer' | 'mobile'>('light-nav');
  const [dragActive, setDragActive] = useState(false);

  // Handle local file upload with FileReader (Converts to Base64 Data URL)
  const handleFileUpload = (
    file: File,
    target: 'primary' | 'white'
  ) => {
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      alert('Please select a valid image file (PNG, SVG, JPG, WEBP, etc.)');
      return;
    }

    // Limit to 5MB for local storage safety
    if (file.size > 5 * 1024 * 1024) {
      alert('Image is too large. Please upload an image smaller than 5MB.');
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      const dataUrl = e.target?.result as string;
      if (target === 'primary') {
        setPrimaryLogoUrl(dataUrl);
        updateCompanyInfo({ logoUrl: dataUrl });
      } else {
        setWhiteLogoUrl(dataUrl);
        updateCompanyInfo({ logoWhiteUrl: dataUrl });
      }
      triggerSavedFeedback();
    };
    reader.readAsDataURL(file);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setDragActive(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setDragActive(false);
  };

  const handleDrop = (e: React.DragEvent, target: 'primary' | 'white') => {
    e.preventDefault();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFileUpload(e.dataTransfer.files[0], target);
    }
  };

  const triggerSavedFeedback = () => {
    setSavedAlert(true);
    setTimeout(() => setSavedAlert(false), 3000);
  };

  const handleSaveAll = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    updateCompanyInfo({
      logoUrl: primaryLogoUrl.trim(),
      logoWhiteUrl: whiteLogoUrl.trim(),
      logoHeightPx: logoHeight,
    });
    triggerSavedFeedback();
  };

  const handleResetToDefaultLogo = () => {
    if (
      window.confirm(
        'Are you sure you want to reset and restore the default vector SVG brand logo?'
      )
    ) {
      setPrimaryLogoUrl('');
      setWhiteLogoUrl('');
      setLogoHeight(48);
      updateCompanyInfo({
        logoUrl: '',
        logoWhiteUrl: '',
        logoHeightPx: 48,
      });
      triggerSavedFeedback();
    }
  };

  const handleClearWhiteLogo = () => {
    setWhiteLogoUrl('');
    updateCompanyInfo({ logoWhiteUrl: '' });
    triggerSavedFeedback();
  };

  // Sample Logo Presets for instant testing
  const samplePresets = [
    {
      name: 'Default Vector SVG Brandmark',
      primary: '',
      white: '',
      desc: 'Built-in crisp mathematical PMS Innovation Solutions vector graphic',
    },
    {
      name: 'Modern Navy & Gold Badge',
      primary: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=400&q=80',
      white: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=400&q=80',
      desc: 'Sleek luxury agency emblem',
    },
    {
      name: 'Creative Tech Geometric Mark',
      primary: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=400&q=80',
      white: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=400&q=80',
      desc: 'Vibrant geometric digital agency badge',
    },
  ];

  return (
    <div className="space-y-8 animate-fadeIn max-w-6xl">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-full bg-blue-100 text-blue-800 text-[10px] font-bold tracking-wider uppercase">
              Brand Identity System
            </span>
            {savedAlert && (
              <span className="flex items-center gap-1 text-emerald-600 font-bold text-xs animate-fadeIn">
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>Updated Across Site!</span>
              </span>
            )}
          </div>
          <h2 className="text-2xl font-bold font-serif text-slate-900 mt-1">
            Company Logo & Visual Identity Manager
          </h2>
          <p className="text-xs text-slate-500">
            Upload your official company logo. Changes will reflect instantly across the Navbar, Footer, Mobile Header, and Admin Panel.
          </p>
        </div>

        {/* Top Actions */}
        <div className="flex items-center gap-2.5">
          <button
            onClick={handleResetToDefaultLogo}
            className="px-3.5 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer"
            title="Reset to default SVG brandmark"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset to Default Logo</span>
          </button>
          <button
            onClick={() => handleSaveAll()}
            className="px-5 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold shadow-md shadow-blue-500/20 flex items-center gap-1.5 transition-all cursor-pointer"
          >
            <CheckCircle2 className="w-4 h-4 text-amber-300" />
            <span>Save & Apply Changes</span>
          </button>
        </div>
      </div>

      {/* Main Grid: Left Controls, Right Live Multi-Context Preview */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Column: Upload Controls (7 cols) */}
        <div className="lg:col-span-7 space-y-6">
          {/* Primary Logo Card */}
          <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-sm space-y-5">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <ImageIcon className="w-4 h-4 text-blue-600" />
                <h3 className="font-bold text-slate-900 text-sm font-serif">
                  Primary Company Logo (Color / Navbar)
                </h3>
              </div>
              <span className="text-[10px] text-slate-400 font-mono">
                SVG, PNG, JPG, WEBP
              </span>
            </div>

            {/* Drag & Drop Upload Zone */}
            <div
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={(e) => handleDrop(e, 'primary')}
              className={`relative border-2 border-dashed rounded-2xl p-6 text-center transition-all ${
                dragActive
                  ? 'border-blue-500 bg-blue-50/50 scale-[1.01]'
                  : 'border-slate-300 hover:border-blue-400 bg-slate-50/60'
              }`}
            >
              <div className="flex flex-col items-center justify-center space-y-3">
                <div className="w-12 h-12 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center shadow-xs">
                  <Upload className="w-6 h-6" />
                </div>
                <div className="space-y-1">
                  <p className="text-xs font-bold text-slate-800">
                    Click to browse or drag & drop company logo file
                  </p>
                  <p className="text-[11px] text-slate-500">
                    Recommended: Transparent PNG or SVG (aspect ratio approx 3:1 or 4:1)
                  </p>
                </div>

                <label className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs cursor-pointer shadow-xs transition-colors inline-block">
                  <span>Choose Image File</span>
                  <input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={(e) => {
                      if (e.target.files && e.target.files[0]) {
                        handleFileUpload(e.target.files[0], 'primary');
                      }
                    }}
                  />
                </label>
              </div>
            </div>

            {/* Direct Image URL Input */}
            <div className="space-y-2 pt-1">
              <label className="block text-xs font-bold text-slate-700">
                Or Paste Image Web URL
              </label>
              <div className="flex gap-2">
                <input
                  type="url"
                  placeholder="https://example.com/your-company-logo.png"
                  value={primaryLogoUrl}
                  onChange={(e) => setPrimaryLogoUrl(e.target.value)}
                  className="flex-1 px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 focus:border-blue-500 outline-none text-xs font-mono"
                />
                <button
                  type="button"
                  onClick={() => {
                    updateCompanyInfo({ logoUrl: primaryLogoUrl.trim() });
                    triggerSavedFeedback();
                  }}
                  className="px-4 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold cursor-pointer transition-colors"
                >
                  Apply URL
                </button>
              </div>
            </div>

            {/* Current Active Primary Preview */}
            <div className="p-4 rounded-2xl bg-slate-100/80 border border-slate-200 flex items-center justify-between gap-4">
              <div className="space-y-1">
                <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block">
                  Active Primary Logo:
                </span>
                <span className="text-xs font-medium text-slate-800">
                  {companyInfo.logoUrl
                    ? 'Custom Uploaded Logo'
                    : 'Default Mathematical Vector SVG Brandmark'}
                </span>
              </div>
              <div className="h-12 px-4 py-1.5 rounded-xl bg-white border border-slate-200 flex items-center justify-center shadow-2xs">
                <PmsLogo className="h-9 w-auto" />
              </div>
            </div>
          </div>

          {/* Secondary White Logo (Optional for Dark Footer) */}
          <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-sm space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <Moon className="w-4 h-4 text-slate-700" />
                <h3 className="font-bold text-slate-900 text-sm font-serif">
                  Secondary White/Light Logo (Optional for Dark Footer)
                </h3>
              </div>
              {whiteLogoUrl && (
                <button
                  onClick={handleClearWhiteLogo}
                  className="text-xs text-red-600 hover:text-red-700 font-semibold flex items-center gap-1 cursor-pointer"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                  <span>Remove White Logo</span>
                </button>
              )}
            </div>

            <p className="text-[11px] text-slate-500">
              If your main logo is dark and doesn't show clearly on dark backgrounds (like the website footer), you can upload a white or light monochrome version here. If left empty, the primary logo will be used automatically.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <label className="p-3.5 rounded-2xl border border-slate-200 bg-slate-50 hover:bg-slate-100 flex items-center justify-center gap-2 text-xs font-bold text-slate-700 cursor-pointer transition-colors">
                <Upload className="w-4 h-4 text-slate-600" />
                <span>Upload White Version</span>
                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={(e) => {
                    if (e.target.files && e.target.files[0]) {
                      handleFileUpload(e.target.files[0], 'white');
                    }
                  }}
                />
              </label>

              <input
                type="url"
                placeholder="Paste White Logo URL..."
                value={whiteLogoUrl}
                onChange={(e) => setWhiteLogoUrl(e.target.value)}
                onBlur={() => {
                  updateCompanyInfo({ logoWhiteUrl: whiteLogoUrl.trim() });
                  triggerSavedFeedback();
                }}
                className="px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 focus:border-blue-500 outline-none text-xs font-mono"
              />
            </div>
          </div>

          {/* Preset Sample Gallery */}
          <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-sm space-y-3">
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-amber-500" />
              <h3 className="font-bold text-slate-900 text-sm font-serif">
                Quick Sample Presets
              </h3>
            </div>
            <p className="text-[11px] text-slate-500">
              Click any preset to test how different logo formats look across the site:
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-1">
              {samplePresets.map((preset, idx) => (
                <button
                  key={idx}
                  onClick={() => {
                    setPrimaryLogoUrl(preset.primary);
                    setWhiteLogoUrl(preset.white);
                    updateCompanyInfo({
                      logoUrl: preset.primary,
                      logoWhiteUrl: preset.white,
                    });
                    triggerSavedFeedback();
                  }}
                  className="p-3.5 rounded-2xl border border-slate-200 bg-slate-50 hover:bg-blue-50 hover:border-blue-300 text-left transition-all cursor-pointer group"
                >
                  <span className="font-bold text-xs text-slate-900 group-hover:text-blue-700 block">
                    {preset.name}
                  </span>
                  <span className="text-[10px] text-slate-500 block mt-1 line-clamp-2">
                    {preset.desc}
                  </span>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column: Live Context Previews (5 cols) */}
        <div className="lg:col-span-5 space-y-5">
          <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-sm space-y-4 sticky top-6">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <Eye className="w-4 h-4 text-blue-600" />
                <h3 className="font-bold text-slate-900 text-sm font-serif">
                  Live Site-Wide Real-Time Preview
                </h3>
              </div>
              <span className="px-2 py-0.5 rounded-md bg-emerald-50 text-emerald-700 text-[10px] font-bold">
                Instant Sync
              </span>
            </div>

            {/* Context Switcher Tabs */}
            <div className="flex items-center p-1 rounded-xl bg-slate-100 gap-1 text-xs">
              <button
                onClick={() => setPreviewTab('light-nav')}
                className={`flex-1 py-1.5 px-2 rounded-lg font-bold flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
                  previewTab === 'light-nav'
                    ? 'bg-white text-blue-700 shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <Sun className="w-3.5 h-3.5 text-amber-500" />
                <span>Light Navbar</span>
              </button>

              <button
                onClick={() => setPreviewTab('dark-footer')}
                className={`flex-1 py-1.5 px-2 rounded-lg font-bold flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
                  previewTab === 'dark-footer'
                    ? 'bg-white text-blue-700 shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <Moon className="w-3.5 h-3.5 text-indigo-500" />
                <span>Dark Footer</span>
              </button>

              <button
                onClick={() => setPreviewTab('mobile')}
                className={`flex-1 py-1.5 px-2 rounded-lg font-bold flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
                  previewTab === 'mobile'
                    ? 'bg-white text-blue-700 shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <Smartphone className="w-3.5 h-3.5 text-slate-700" />
                <span>Mobile Bar</span>
              </button>
            </div>

            {/* Preview Canvas */}
            <div className="rounded-2xl overflow-hidden border border-slate-200 shadow-inner">
              {/* Context 1: Light Sticky Navbar */}
              {previewTab === 'light-nav' && (
                <div className="bg-white p-4 space-y-3">
                  <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                    Light Header Navbar (Desktop)
                  </div>
                  <div className="flex items-center justify-between p-3 rounded-xl bg-white border border-slate-200 shadow-sm">
                    <PmsLogo className="h-10 w-auto" />
                    <div className="flex items-center gap-2 text-[10px] font-bold text-slate-600">
                      <span className="text-blue-600">Home</span>
                      <span>Services</span>
                      <span>Gallery</span>
                      <span className="px-2 py-1 rounded-md bg-blue-600 text-white text-[9px]">
                        Contact
                      </span>
                    </div>
                  </div>
                  <p className="text-[11px] text-slate-500 italic text-center">
                    This is exactly how your logo appears to visitors in the top navigation bar.
                  </p>
                </div>
              )}

              {/* Context 2: Dark Website Footer */}
              {previewTab === 'dark-footer' && (
                <div className="bg-slate-900 p-4 text-white space-y-3">
                  <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                    Dark Website Footer
                  </div>
                  <div className="p-4 rounded-xl bg-slate-950 border border-white/10 space-y-3">
                    <PmsLogo variant="white" className="h-10 w-auto" />
                    <p className="text-[10px] text-slate-400">
                      We are a friendly, full-service marketing and event management agency in Kolkata.
                    </p>
                    <div className="text-[10px] text-amber-400 font-mono">
                      +91 98316 30072 | info@pmsinnovations.com
                    </div>
                  </div>
                </div>
              )}

              {/* Context 3: Compact Mobile Bar */}
              {previewTab === 'mobile' && (
                <div className="bg-slate-100 p-4 flex flex-col items-center space-y-3">
                  <div className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">
                    Mobile Viewport Simulation
                  </div>
                  <div className="w-64 bg-white rounded-2xl border border-slate-300 p-3 shadow-md space-y-2">
                    <div className="flex items-center justify-between border-b border-slate-100 pb-2">
                      <PmsLogo className="h-7 w-auto" />
                      <div className="w-6 h-6 rounded-md bg-slate-100 flex items-center justify-center text-slate-600 text-xs font-bold">
                        ☰
                      </div>
                    </div>
                    <div className="h-16 bg-blue-50 rounded-lg flex items-center justify-center text-[10px] font-bold text-blue-700">
                      Mobile Content Body
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Information Tips */}
            <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200 text-amber-900 text-xs space-y-2">
              <div className="font-bold flex items-center gap-1.5">
                <AlertCircle className="w-4 h-4 text-amber-600" />
                <span>Tips for High-Impact Logos:</span>
              </div>
              <ul className="space-y-1 text-[11px] list-disc list-inside text-amber-800 leading-relaxed">
                <li>Use transparent background PNG or SVG files.</li>
                <li>Horizontal or rectangular logos look best on web navbars.</li>
                <li>Changes are saved to local persistence and sync live immediately.</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
