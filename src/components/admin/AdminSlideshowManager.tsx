import React, { useState, useRef } from 'react';
import {
  Sliders,
  Plus,
  Trash2,
  ArrowUp,
  ArrowDown,
  Upload,
  Image as ImageIcon,
  Smartphone,
  Monitor,
  Eye,
  EyeOff,
  Clock,
  Play,
  Pause,
  CheckCircle2,
  Sparkles,
  Link as LinkIcon,
  RefreshCw,
  Info,
} from 'lucide-react';
import { useCms } from '../../context/CmsContext';
import { PmsSlide } from '../../types';

export const AdminSlideshowManager: React.FC = () => {
  const {
    slides,
    slideshowSettings,
    addSlide,
    updateSlide,
    deleteSlide,
    reorderSlide,
    toggleSlideActive,
    updateSlideshowSettings,
  } = useCms();

  const [editingSlideId, setEditingSlideId] = useState<string | null>(null);
  const [isAddingNew, setIsAddingNew] = useState(false);
  const [previewViewport, setPreviewViewport] = useState<'desktop' | 'mobile'>('desktop');
  const [previewIndex, setPreviewIndex] = useState(0);

  // New slide form state
  const [newSlideForm, setNewSlideForm] = useState<Omit<PmsSlide, 'id' | 'order'>>({
    desktopImage: '',
    mobileImage: '',
    title: '',
    subtitle: '',
    badge: 'Spotlight',
    buttonText: 'Explore More',
    buttonLink: '#services',
    active: true,
  });

  const desktopFileInputRef = useRef<HTMLInputElement>(null);
  const mobileFileInputRef = useRef<HTMLInputElement>(null);
  const editDesktopInputRef = useRef<HTMLInputElement>(null);
  const editMobileInputRef = useRef<HTMLInputElement>(null);

  // File to Base64 helper
  const handleFileUpload = (
    e: React.ChangeEvent<HTMLInputElement>,
    onSuccess: (dataUrl: string) => void
  ) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Check size limit (< 5MB recommended)
    if (file.size > 5 * 1024 * 1024) {
      alert('Image file is larger than 5MB. Please choose a compressed image.');
      return;
    }

    const reader = new FileReader();
    reader.onload = (event) => {
      if (event.target?.result) {
        onSuccess(event.target.result as string);
      }
    };
    reader.readAsDataURL(file);
  };

  const handleCreateSlide = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newSlideForm.desktopImage.trim()) {
      alert('Please provide a Computer / Desktop image URL or upload an image.');
      return;
    }

    addSlide(newSlideForm);
    setNewSlideForm({
      desktopImage: '',
      mobileImage: '',
      title: '',
      subtitle: '',
      badge: 'Spotlight',
      buttonText: 'Explore More',
      buttonLink: '#services',
      active: true,
    });
    setIsAddingNew(false);
  };

  const activeSlides = slides.filter((s) => s.active !== false);

  return (
    <div className="space-y-8">
      {/* Header & Overview */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="p-2 rounded-xl bg-blue-50 text-blue-600 border border-blue-200">
                <Sliders className="w-5 h-5" />
              </span>
              <h2 className="text-xl font-bold text-slate-900 font-serif">
                Startup Slideshow Banner CMS
              </h2>
            </div>
            <p className="text-sm text-slate-600 mt-1">
              Configure images, rotation speeds, desktop vs. mobile views, and slide count for the startup section on the homepage.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setIsAddingNew(true)}
              className="px-4 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs sm:text-sm transition-all shadow-md shadow-blue-500/20 flex items-center gap-2 cursor-pointer"
            >
              <Plus className="w-4 h-4" />
              <span>Add New Slide</span>
            </button>
          </div>
        </div>
      </div>

      {/* Global Slideshow Settings Panel */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm space-y-6">
        <div className="flex items-center justify-between border-b border-slate-100 pb-4">
          <div className="flex items-center gap-2">
            <Clock className="w-5 h-5 text-blue-600" />
            <h3 className="text-base font-bold text-slate-900 font-serif">
              Rotation Speed & Controls
            </h3>
          </div>
          <span className="text-xs font-mono px-2.5 py-1 rounded-full bg-blue-50 text-blue-700 font-bold border border-blue-200">
            {slideshowSettings.intervalSeconds}s Interval
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Rotation Speed Slider & Presets */}
          <div className="space-y-3 lg:col-span-2">
            <div className="flex items-center justify-between">
              <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                Rotation Speed (Seconds per Slide)
              </label>
              <span className="text-sm font-mono font-bold text-blue-600">
                {slideshowSettings.intervalSeconds} seconds
              </span>
            </div>
            <input
              type="range"
              min="1"
              max="15"
              step="1"
              value={slideshowSettings.intervalSeconds}
              onChange={(e) =>
                updateSlideshowSettings({ intervalSeconds: parseInt(e.target.value, 10) })
              }
              className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
            />
            {/* Quick Speed Presets */}
            <div className="flex items-center gap-2 pt-1">
              <span className="text-[11px] text-slate-500 font-medium">Presets:</span>
              {[2, 3, 4, 5, 7, 10].map((sec) => (
                <button
                  key={sec}
                  onClick={() => updateSlideshowSettings({ intervalSeconds: sec })}
                  className={`px-2.5 py-1 rounded-md text-xs font-mono font-semibold transition-colors cursor-pointer ${
                    slideshowSettings.intervalSeconds === sec
                      ? 'bg-blue-600 text-white'
                      : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                  }`}
                >
                  {sec}s
                </button>
              ))}
            </div>
          </div>

          {/* Autoplay & Enabled Switches */}
          <div className="space-y-3">
            <label className="text-xs font-bold text-slate-700 uppercase tracking-wider block">
              Slideshow Behavior
            </label>
            <div className="space-y-2">
              <label className="flex items-center justify-between p-2.5 rounded-xl border border-slate-200 hover:bg-slate-50 cursor-pointer">
                <span className="text-xs font-medium text-slate-800">Enable Slideshow</span>
                <input
                  type="checkbox"
                  checked={slideshowSettings.enabled}
                  onChange={(e) => updateSlideshowSettings({ enabled: e.target.checked })}
                  className="w-4 h-4 text-blue-600 rounded cursor-pointer accent-blue-600"
                />
              </label>

              <label className="flex items-center justify-between p-2.5 rounded-xl border border-slate-200 hover:bg-slate-50 cursor-pointer">
                <span className="text-xs font-medium text-slate-800">Auto-Rotate (Autoplay)</span>
                <input
                  type="checkbox"
                  checked={slideshowSettings.autoplay}
                  onChange={(e) => updateSlideshowSettings({ autoplay: e.target.checked })}
                  className="w-4 h-4 text-blue-600 rounded cursor-pointer accent-blue-600"
                />
              </label>
            </div>
          </div>

          {/* Display Elements */}
          <div className="space-y-3">
            <label className="text-xs font-bold text-slate-700 uppercase tracking-wider block">
              Visual Elements
            </label>
            <div className="space-y-2">
              <label className="flex items-center justify-between p-2.5 rounded-xl border border-slate-200 hover:bg-slate-50 cursor-pointer">
                <span className="text-xs font-medium text-slate-800">Show Navigation Arrows</span>
                <input
                  type="checkbox"
                  checked={slideshowSettings.showArrows}
                  onChange={(e) => updateSlideshowSettings({ showArrows: e.target.checked })}
                  className="w-4 h-4 text-blue-600 rounded cursor-pointer accent-blue-600"
                />
              </label>

              <label className="flex items-center justify-between p-2.5 rounded-xl border border-slate-200 hover:bg-slate-50 cursor-pointer">
                <span className="text-xs font-medium text-slate-800">Show Dot Indicators</span>
                <input
                  type="checkbox"
                  checked={slideshowSettings.showDots}
                  onChange={(e) => updateSlideshowSettings({ showDots: e.target.checked })}
                  className="w-4 h-4 text-blue-600 rounded cursor-pointer accent-blue-600"
                />
              </label>
            </div>
          </div>
        </div>
      </div>

      {/* Add New Slide Form Modal / Card */}
      {isAddingNew && (
        <div className="bg-blue-50/50 rounded-2xl border-2 border-blue-300 p-6 shadow-md space-y-6">
          <div className="flex items-center justify-between border-b border-blue-200 pb-3">
            <div className="flex items-center gap-2">
              <Plus className="w-5 h-5 text-blue-600" />
              <h3 className="text-base font-bold text-blue-900 font-serif">
                Create & Upload New Slide
              </h3>
            </div>
            <button
              onClick={() => setIsAddingNew(false)}
              className="text-xs text-slate-500 hover:text-slate-700 cursor-pointer font-medium"
            >
              Cancel
            </button>
          </div>

          <form onSubmit={handleCreateSlide} className="space-y-5">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Computer / Desktop View Image */}
              <div className="space-y-3 bg-white p-4 rounded-xl border border-slate-200">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-bold text-slate-900 flex items-center gap-1.5">
                    <Monitor className="w-4 h-4 text-blue-600" />
                    <span>Computer / Desktop View Image *</span>
                  </label>
                  <span className="text-[11px] text-blue-600 font-mono font-medium">1920×800 rec.</span>
                </div>

                <div className="space-y-2">
                  <input
                    type="text"
                    placeholder="https://... (or upload below)"
                    value={newSlideForm.desktopImage}
                    onChange={(e) =>
                      setNewSlideForm({ ...newSlideForm, desktopImage: e.target.value })
                    }
                    className="w-full text-xs font-mono px-3 py-2 rounded-lg border border-slate-300 focus:outline-none focus:border-blue-500"
                    required
                  />

                  <div className="flex items-center gap-2">
                    <input
                      type="file"
                      ref={desktopFileInputRef}
                      accept="image/*"
                      className="hidden"
                      onChange={(e) =>
                        handleFileUpload(e, (dataUrl) =>
                          setNewSlideForm({ ...newSlideForm, desktopImage: dataUrl })
                        )
                      }
                    />
                    <button
                      type="button"
                      onClick={() => desktopFileInputRef.current?.click()}
                      className="px-3 py-1.5 rounded-lg bg-blue-50 hover:bg-blue-100 text-blue-700 text-xs font-bold border border-blue-200 flex items-center gap-1.5 cursor-pointer transition-colors"
                    >
                      <Upload className="w-3.5 h-3.5" />
                      <span>Upload Computer Image</span>
                    </button>
                    {newSlideForm.desktopImage && (
                      <span className="text-[11px] text-emerald-600 font-medium flex items-center gap-1">
                        <CheckCircle2 className="w-3.5 h-3.5" /> Ready
                      </span>
                    )}
                  </div>

                  {newSlideForm.desktopImage && (
                    <div className="relative h-24 w-full rounded-lg overflow-hidden border border-slate-200 mt-2 bg-slate-900">
                      <img
                        src={newSlideForm.desktopImage}
                        alt="Desktop Preview"
                        className="w-full h-full object-cover"
                      />
                    </div>
                  )}
                </div>
              </div>

              {/* Mobile View Image */}
              <div className="space-y-3 bg-white p-4 rounded-xl border border-slate-200">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-bold text-slate-900 flex items-center gap-1.5">
                    <Smartphone className="w-4 h-4 text-emerald-600" />
                    <span>Mobile View Image (Optional)</span>
                  </label>
                  <span className="text-[11px] text-slate-500 font-mono">800×600 rec.</span>
                </div>

                <div className="space-y-2">
                  <input
                    type="text"
                    placeholder="https://... (or upload below)"
                    value={newSlideForm.mobileImage || ''}
                    onChange={(e) =>
                      setNewSlideForm({ ...newSlideForm, mobileImage: e.target.value })
                    }
                    className="w-full text-xs font-mono px-3 py-2 rounded-lg border border-slate-300 focus:outline-none focus:border-blue-500"
                  />

                  <div className="flex items-center gap-2">
                    <input
                      type="file"
                      ref={mobileFileInputRef}
                      accept="image/*"
                      className="hidden"
                      onChange={(e) =>
                        handleFileUpload(e, (dataUrl) =>
                          setNewSlideForm({ ...newSlideForm, mobileImage: dataUrl })
                        )
                      }
                    />
                    <button
                      type="button"
                      onClick={() => mobileFileInputRef.current?.click()}
                      className="px-3 py-1.5 rounded-lg bg-emerald-50 hover:bg-emerald-100 text-emerald-700 text-xs font-bold border border-emerald-200 flex items-center gap-1.5 cursor-pointer transition-colors"
                    >
                      <Upload className="w-3.5 h-3.5" />
                      <span>Upload Mobile Image</span>
                    </button>
                    {newSlideForm.mobileImage && (
                      <span className="text-[11px] text-emerald-600 font-medium flex items-center gap-1">
                        <CheckCircle2 className="w-3.5 h-3.5" /> Mobile Ready
                      </span>
                    )}
                  </div>

                  {newSlideForm.mobileImage ? (
                    <div className="relative h-24 w-28 rounded-lg overflow-hidden border border-slate-200 mt-2 bg-slate-900">
                      <img
                        src={newSlideForm.mobileImage}
                        alt="Mobile Preview"
                        className="w-full h-full object-cover"
                      />
                    </div>
                  ) : (
                    <p className="text-[11px] text-slate-500 italic pt-1">
                      If empty, the desktop image will be automatically used on mobile devices.
                    </p>
                  )}
                </div>
              </div>
            </div>

            {/* Optional Slide Content */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 bg-white p-4 rounded-xl border border-slate-200">
              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">
                  Slide Title (Optional)
                </label>
                <input
                  type="text"
                  placeholder="e.g. 360° Corporate Events & MICE"
                  value={newSlideForm.title || ''}
                  onChange={(e) => setNewSlideForm({ ...newSlideForm, title: e.target.value })}
                  className="w-full text-xs px-3 py-2 rounded-lg border border-slate-300 focus:outline-none focus:border-blue-500"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">
                  Subtitle / Highlight (Optional)
                </label>
                <input
                  type="text"
                  placeholder="e.g. Turnkey stagecraft, lighting & delegate management"
                  value={newSlideForm.subtitle || ''}
                  onChange={(e) => setNewSlideForm({ ...newSlideForm, subtitle: e.target.value })}
                  className="w-full text-xs px-3 py-2 rounded-lg border border-slate-300 focus:outline-none focus:border-blue-500"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">
                  Badge Tag (Optional)
                </label>
                <input
                  type="text"
                  placeholder="e.g. Flagship Production"
                  value={newSlideForm.badge || ''}
                  onChange={(e) => setNewSlideForm({ ...newSlideForm, badge: e.target.value })}
                  className="w-full text-xs px-3 py-2 rounded-lg border border-slate-300 focus:outline-none focus:border-blue-500"
                />
              </div>
            </div>

            <div className="flex items-center justify-end gap-3 pt-2">
              <button
                type="button"
                onClick={() => setIsAddingNew(false)}
                className="px-4 py-2 rounded-xl text-slate-600 hover:bg-slate-200 text-xs font-bold transition-colors cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-6 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs sm:text-sm shadow-md shadow-blue-500/20 flex items-center gap-2 cursor-pointer"
              >
                <CheckCircle2 className="w-4 h-4 text-amber-300" />
                <span>Save & Insert Slide</span>
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Current Slides List & Reordering */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <ImageIcon className="w-5 h-5 text-blue-600" />
            <h3 className="text-base font-bold text-slate-900 font-serif">
              Current Slideshow Deck ({slides.length} Total, {activeSlides.length} Active)
            </h3>
          </div>
          <span className="text-xs text-slate-500">
            Use arrows to reorder slides. Click edit to swap images or adjust text.
          </span>
        </div>

        {slides.length === 0 ? (
          <div className="bg-white rounded-2xl border border-slate-200 p-12 text-center space-y-4">
            <ImageIcon className="w-12 h-12 text-slate-300 mx-auto" />
            <div className="text-slate-700 font-bold">No Slides in Slideshow</div>
            <p className="text-xs text-slate-500 max-w-md mx-auto">
              Add your first image slide above with custom desktop and mobile graphics.
            </p>
            <button
              onClick={() => setIsAddingNew(true)}
              className="px-4 py-2 rounded-xl bg-blue-600 text-white text-xs font-bold inline-flex items-center gap-1.5 cursor-pointer shadow-sm"
            >
              <Plus className="w-4 h-4" /> Add First Slide
            </button>
          </div>
        ) : (
          <div className="space-y-4">
            {slides.map((slide, index) => {
              const isEditing = editingSlideId === slide.id;

              return (
                <div
                  key={slide.id}
                  className={`bg-white rounded-2xl border transition-all shadow-sm ${
                    slide.active === false
                      ? 'border-slate-200 opacity-60 bg-slate-50'
                      : 'border-slate-200/90 hover:border-blue-300'
                  }`}
                >
                  {/* Slide Summary Row */}
                  <div className="p-4 sm:p-5 flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div className="flex items-start sm:items-center gap-4 flex-1">
                      {/* Order Index */}
                      <div className="flex flex-col items-center gap-1">
                        <span className="w-8 h-8 rounded-xl bg-blue-50 text-blue-700 font-mono font-black text-xs flex items-center justify-center border border-blue-200">
                          #{index + 1}
                        </span>
                        <div className="flex flex-col gap-0.5">
                          <button
                            onClick={() => reorderSlide(slide.id, 'up')}
                            disabled={index === 0}
                            title="Move Up"
                            className="p-1 text-slate-400 hover:text-blue-600 disabled:opacity-20 cursor-pointer"
                          >
                            <ArrowUp className="w-3.5 h-3.5" />
                          </button>
                          <button
                            onClick={() => reorderSlide(slide.id, 'down')}
                            disabled={index === slides.length - 1}
                            title="Move Down"
                            className="p-1 text-slate-400 hover:text-blue-600 disabled:opacity-20 cursor-pointer"
                          >
                            <ArrowDown className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>

                      {/* Image Thumbnails: Desktop & Mobile */}
                      <div className="flex items-center gap-3">
                        {/* Desktop Thumbnail */}
                        <div className="relative w-28 sm:w-36 h-20 rounded-xl overflow-hidden border border-slate-300 bg-slate-900 shrink-0 group">
                          <img
                            src={slide.desktopImage}
                            alt="Desktop View"
                            className="w-full h-full object-cover"
                          />
                          <span className="absolute bottom-1 left-1 px-1.5 py-0.5 rounded bg-black/70 text-[9px] font-mono text-white flex items-center gap-1">
                            <Monitor className="w-2.5 h-2.5" /> Desktop
                          </span>
                        </div>

                        {/* Mobile Thumbnail */}
                        <div className="relative w-16 sm:w-20 h-20 rounded-xl overflow-hidden border border-slate-300 bg-slate-900 shrink-0">
                          {slide.mobileImage ? (
                            <>
                              <img
                                src={slide.mobileImage}
                                alt="Mobile View"
                                className="w-full h-full object-cover"
                              />
                              <span className="absolute bottom-1 left-1 px-1.5 py-0.5 rounded bg-emerald-950/80 text-[9px] font-mono text-emerald-300 flex items-center gap-1">
                                <Smartphone className="w-2.5 h-2.5" /> Mobile
                              </span>
                            </>
                          ) : (
                            <div className="w-full h-full flex flex-col items-center justify-center p-1 text-center bg-slate-100 text-slate-400">
                              <Smartphone className="w-4 h-4 mb-0.5" />
                              <span className="text-[8px] font-medium leading-tight">Auto Adapt</span>
                            </div>
                          )}
                        </div>
                      </div>

                      {/* Details */}
                      <div className="space-y-1 min-w-0 flex-1">
                        <div className="flex flex-wrap items-center gap-2">
                          {slide.badge && (
                            <span className="px-2 py-0.5 rounded-full bg-blue-50 text-blue-700 border border-blue-200 text-[10px] font-bold uppercase tracking-wider">
                              {slide.badge}
                            </span>
                          )}
                          <span
                            className={`text-xs font-bold ${
                              slide.active !== false ? 'text-slate-900' : 'text-slate-400 line-through'
                            }`}
                          >
                            {slide.title || 'Slide Image #' + (index + 1)}
                          </span>
                        </div>
                        {slide.subtitle && (
                          <p className="text-xs text-slate-500 truncate max-w-md">
                            {slide.subtitle}
                          </p>
                        )}
                        <div className="flex items-center gap-3 text-[11px] text-slate-400 pt-0.5">
                          <span className="truncate max-w-[200px] font-mono">
                            {slide.desktopImage.slice(0, 40)}...
                          </span>
                          {slide.mobileImage && (
                            <span className="text-emerald-600 font-medium">
                              • Custom Mobile Image Active
                            </span>
                          )}
                        </div>
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="flex items-center gap-2 self-end sm:self-center">
                      <button
                        onClick={() => toggleSlideActive(slide.id)}
                        title={slide.active !== false ? 'Hide from live slideshow' : 'Show on live slideshow'}
                        className={`p-2 rounded-xl border text-xs font-bold transition-colors cursor-pointer flex items-center gap-1.5 ${
                          slide.active !== false
                            ? 'bg-slate-50 hover:bg-slate-100 text-slate-700 border-slate-200'
                            : 'bg-amber-50 hover:bg-amber-100 text-amber-700 border-amber-200'
                        }`}
                      >
                        {slide.active !== false ? (
                          <>
                            <Eye className="w-4 h-4 text-emerald-600" />
                            <span className="hidden sm:inline">Active</span>
                          </>
                        ) : (
                          <>
                            <EyeOff className="w-4 h-4 text-amber-600" />
                            <span className="hidden sm:inline">Inactive</span>
                          </>
                        )}
                      </button>

                      <button
                        onClick={() => setEditingSlideId(isEditing ? null : slide.id)}
                        className={`px-3 py-2 rounded-xl text-xs font-bold border transition-colors cursor-pointer ${
                          isEditing
                            ? 'bg-blue-600 text-white border-blue-600'
                            : 'bg-white hover:bg-slate-50 text-blue-600 border-slate-200'
                        }`}
                      >
                        {isEditing ? 'Done Editing' : 'Edit Slide'}
                      </button>

                      <button
                        onClick={() => {
                          if (confirm('Are you sure you want to delete this slide?')) {
                            deleteSlide(slide.id);
                          }
                        }}
                        className="p-2 rounded-xl bg-white hover:bg-rose-50 text-rose-500 hover:text-rose-700 border border-slate-200 hover:border-rose-200 transition-colors cursor-pointer"
                        title="Delete slide"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>

                  {/* Inline Editing Form */}
                  {isEditing && (
                    <div className="border-t border-slate-100 bg-slate-50/70 p-5 rounded-b-2xl space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                        {/* Computer / Desktop Image Editor */}
                        <div className="space-y-2 bg-white p-4 rounded-xl border border-slate-200">
                          <label className="text-xs font-bold text-slate-900 flex items-center justify-between">
                            <span className="flex items-center gap-1.5">
                              <Monitor className="w-4 h-4 text-blue-600" />
                              Computer / Desktop View Image
                            </span>
                          </label>

                          <input
                            type="text"
                            value={slide.desktopImage}
                            onChange={(e) => updateSlide(slide.id, { desktopImage: e.target.value })}
                            className="w-full text-xs font-mono px-3 py-2 rounded-lg border border-slate-300 focus:outline-none focus:border-blue-500"
                            placeholder="Enter image URL..."
                          />

                          <div className="flex items-center gap-2 pt-1">
                            <input
                              type="file"
                              ref={editDesktopInputRef}
                              accept="image/*"
                              className="hidden"
                              onChange={(e) =>
                                handleFileUpload(e, (dataUrl) =>
                                  updateSlide(slide.id, { desktopImage: dataUrl })
                                )
                              }
                            />
                            <button
                              type="button"
                              onClick={() => editDesktopInputRef.current?.click()}
                              className="px-3 py-1.5 rounded-lg bg-blue-50 hover:bg-blue-100 text-blue-700 text-xs font-bold border border-blue-200 flex items-center gap-1.5 cursor-pointer"
                            >
                              <Upload className="w-3.5 h-3.5" />
                              <span>Upload New Computer Image</span>
                            </button>
                          </div>
                        </div>

                        {/* Mobile Image Editor */}
                        <div className="space-y-2 bg-white p-4 rounded-xl border border-slate-200">
                          <label className="text-xs font-bold text-slate-900 flex items-center justify-between">
                            <span className="flex items-center gap-1.5">
                              <Smartphone className="w-4 h-4 text-emerald-600" />
                              Mobile View Image (Optional)
                            </span>
                            {slide.mobileImage && (
                              <button
                                onClick={() => updateSlide(slide.id, { mobileImage: '' })}
                                className="text-[11px] text-rose-500 hover:underline cursor-pointer"
                              >
                                Clear Mobile Image
                              </button>
                            )}
                          </label>

                          <input
                            type="text"
                            value={slide.mobileImage || ''}
                            onChange={(e) => updateSlide(slide.id, { mobileImage: e.target.value })}
                            className="w-full text-xs font-mono px-3 py-2 rounded-lg border border-slate-300 focus:outline-none focus:border-blue-500"
                            placeholder="Enter mobile image URL..."
                          />

                          <div className="flex items-center gap-2 pt-1">
                            <input
                              type="file"
                              ref={editMobileInputRef}
                              accept="image/*"
                              className="hidden"
                              onChange={(e) =>
                                handleFileUpload(e, (dataUrl) =>
                                  updateSlide(slide.id, { mobileImage: dataUrl })
                                )
                              }
                            />
                            <button
                              type="button"
                              onClick={() => editMobileInputRef.current?.click()}
                              className="px-3 py-1.5 rounded-lg bg-emerald-50 hover:bg-emerald-100 text-emerald-700 text-xs font-bold border border-emerald-200 flex items-center gap-1.5 cursor-pointer"
                            >
                              <Upload className="w-3.5 h-3.5" />
                              <span>Upload New Mobile Image</span>
                            </button>
                          </div>
                        </div>
                      </div>

                      {/* Content Fields */}
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 bg-white p-4 rounded-xl border border-slate-200">
                        <div>
                          <label className="text-xs font-bold text-slate-700 block mb-1">
                            Slide Title
                          </label>
                          <input
                            type="text"
                            value={slide.title || ''}
                            onChange={(e) => updateSlide(slide.id, { title: e.target.value })}
                            className="w-full text-xs px-3 py-2 rounded-lg border border-slate-300 focus:outline-none focus:border-blue-500"
                          />
                        </div>

                        <div>
                          <label className="text-xs font-bold text-slate-700 block mb-1">
                            Subtitle / Description
                          </label>
                          <input
                            type="text"
                            value={slide.subtitle || ''}
                            onChange={(e) => updateSlide(slide.id, { subtitle: e.target.value })}
                            className="w-full text-xs px-3 py-2 rounded-lg border border-slate-300 focus:outline-none focus:border-blue-500"
                          />
                        </div>

                        <div>
                          <label className="text-xs font-bold text-slate-700 block mb-1">
                            Badge Tag
                          </label>
                          <input
                            type="text"
                            value={slide.badge || ''}
                            onChange={(e) => updateSlide(slide.id, { badge: e.target.value })}
                            className="w-full text-xs px-3 py-2 rounded-lg border border-slate-300 focus:outline-none focus:border-blue-500"
                          />
                        </div>
                      </div>

                      <div className="flex justify-end">
                        <button
                          onClick={() => setEditingSlideId(null)}
                          className="px-4 py-2 rounded-xl bg-blue-600 text-white text-xs font-bold cursor-pointer"
                        >
                          Done Editing
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Helpful Instructions Card */}
      <div className="bg-slate-50 rounded-2xl border border-slate-200 p-5 flex items-start gap-3">
        <Info className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />
        <div className="text-xs text-slate-600 space-y-1">
          <p className="font-bold text-slate-800">
            How Startup Slideshow Responsiveness Works:
          </p>
          <ul className="list-disc list-inside space-y-0.5">
            <li>
              When visitors access on a <strong>Computer / Desktop screen</strong>, the browser renders your high-resolution desktop image.
            </li>
            <li>
              When visitors access on a <strong>Mobile / Phone device</strong>, the browser automatically switches to the custom mobile-optimized image.
            </li>
            <li>
              All changes are live instantly and saved securely in the CMS.
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};
