import React, { useState } from 'react';
import {
  Image as ImageIcon,
  Plus,
  Edit,
  Trash2,
  CheckCircle2,
  X,
  Eye,
  EyeOff,
  Building2,
  Calendar,
  MapPin,
  Sparkles,
  Upload,
  ArrowUp,
  ArrowDown,
  Star,
  Layers,
  ZoomIn,
} from 'lucide-react';
import { useCms } from '../../context/CmsContext';
import { PmsGalleryProject, PmsServiceCode } from '../../types';

export const AdminGalleryManager: React.FC = () => {
  const {
    galleryProjects,
    addProject,
    updateProject,
    deleteProject,
    toggleProjectActive,
  } = useCms();

  const [editingProject, setEditingProject] = useState<PmsGalleryProject | null>(null);
  const [isAddMode, setIsAddMode] = useState(false);

  // Form State
  const [formData, setFormData] = useState<{
    title: string;
    category: PmsServiceCode;
    categoryLabel: string;
    client: string;
    year: string;
    location: string;
    description: string;
    images: string[];
    highlights: string;
  }>({
    title: '',
    category: 'event',
    categoryLabel: 'Corporate Events & MICE',
    client: '',
    year: '2026',
    location: 'Kolkata, West Bengal',
    description: '',
    images: [
      'https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1475721027785-f74eccf877e2?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1505373877841-8d25f7d46678?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1515187029135-18ee286d815b?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1528605248644-14dd04022da1?auto=format&fit=crop&w=1200&q=80',
    ],
    highlights: 'Turnkey 3D Stagecraft\nConcert-grade Audio Visual\n450+ Corporate Delegates',
  });

  const handleOpenAdd = () => {
    setFormData({
      title: '',
      category: 'event',
      categoryLabel: 'Corporate Events & MICE',
      client: '',
      year: '2026',
      location: 'Kolkata, West Bengal',
      description: '',
      images: [
        'https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&w=1200&q=80',
        'https://images.unsplash.com/photo-1475721027785-f74eccf877e2?auto=format&fit=crop&w=1200&q=80',
        'https://images.unsplash.com/photo-1505373877841-8d25f7d46678?auto=format&fit=crop&w=1200&q=80',
        'https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&w=1200&q=80',
        'https://images.unsplash.com/photo-1515187029135-18ee286d815b?auto=format&fit=crop&w=1200&q=80',
        'https://images.unsplash.com/photo-1528605248644-14dd04022da1?auto=format&fit=crop&w=1200&q=80',
      ],
      highlights: 'Turnkey Stagecraft\nFull Lighting Rig\nVIP Hospitality',
    });
    setEditingProject(null);
    setIsAddMode(true);
  };

  const handleOpenEdit = (project: PmsGalleryProject) => {
    const existingImages =
      Array.isArray(project.images) && project.images.length > 0
        ? project.images
        : [project.image].filter(Boolean);

    setFormData({
      title: project.title,
      category: project.category,
      categoryLabel: project.categoryLabel,
      client: project.client,
      year: project.year,
      location: project.location || 'Kolkata, West Bengal',
      description: project.description,
      images: existingImages.length > 0 ? existingImages : [project.image],
      highlights: (project.highlights || []).join('\n'),
    });
    setEditingProject(project);
    setIsAddMode(false);
  };

  // Image manipulation handlers
  const handleImageChange = (index: number, value: string) => {
    const nextImages = [...formData.images];
    nextImages[index] = value;
    setFormData({ ...formData, images: nextImages });
  };

  const handleImageUpload = (index: number, file: File) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      if (e.target?.result) {
        handleImageChange(index, e.target.result as string);
      }
    };
    reader.readAsDataURL(file);
  };

  const handleAddImageSlot = () => {
    if (formData.images.length >= 10) return;
    setFormData({
      ...formData,
      images: [
        ...formData.images,
        'https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&w=1200&q=80',
      ],
    });
  };

  const handleRemoveImageSlot = (index: number) => {
    if (formData.images.length <= 1) {
      alert('A project must have at least one image.');
      return;
    }
    const nextImages = formData.images.filter((_, i) => i !== index);
    setFormData({ ...formData, images: nextImages });
  };

  const handleMoveImage = (index: number, direction: 'up' | 'down') => {
    const targetIdx = direction === 'up' ? index - 1 : index + 1;
    if (targetIdx < 0 || targetIdx >= formData.images.length) return;
    const nextImages = [...formData.images];
    const temp = nextImages[index];
    nextImages[index] = nextImages[targetIdx];
    nextImages[targetIdx] = temp;
    setFormData({ ...formData, images: nextImages });
  };

  const handleSetAsCover = (index: number) => {
    if (index === 0) return;
    const nextImages = [...formData.images];
    const [selected] = nextImages.splice(index, 1);
    nextImages.unshift(selected);
    setFormData({ ...formData, images: nextImages });
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    const highlightsArr = formData.highlights
      .split('\n')
      .map((s) => s.trim())
      .filter(Boolean);

    const cleanImages = formData.images.map((img) => img.trim()).filter(Boolean);
    const coverImage = cleanImages[0] || 'https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&w=1200&q=80';

    const categoryMap: Record<PmsServiceCode, string> = {
      event: 'Corporate Events & MICE',
      mice: 'MICE & Travel',
      activation: 'Brand Activation',
      branding: 'Retail Shop Branding',
      hoarding: 'Outdoor & Hoardings',
      digital: 'Digital Marketing',
      merchandising: 'Corporate Gifting',
    };

    if (isAddMode) {
      addProject({
        title: formData.title,
        category: formData.category,
        categoryLabel: categoryMap[formData.category] || formData.categoryLabel,
        client: formData.client,
        year: formData.year,
        location: formData.location,
        description: formData.description,
        image: coverImage,
        images: cleanImages,
        highlights: highlightsArr,
        active: true,
      });
    } else if (editingProject) {
      updateProject(editingProject.id, {
        title: formData.title,
        category: formData.category,
        categoryLabel: categoryMap[formData.category] || formData.categoryLabel,
        client: formData.client,
        year: formData.year,
        location: formData.location,
        description: formData.description,
        image: coverImage,
        images: cleanImages,
        highlights: highlightsArr,
      });
    }

    setEditingProject(null);
    setIsAddMode(false);
  };

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold font-serif text-slate-900">
            Portfolio & Showcase Gallery CMS
          </h2>
          <p className="text-xs text-slate-500">
            Manage executed client case studies. Add 5 to 7 high-resolution photos per project with interactive grid and zoom viewing.
          </p>
        </div>

        <button
          onClick={handleOpenAdd}
          className="px-4 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs shadow-md transition-all flex items-center gap-1.5 cursor-pointer self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" />
          <span>Add Showcase Project</span>
        </button>
      </div>

      {/* Gallery Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {galleryProjects.map((proj) => {
          const imageCount = (proj.images && proj.images.length > 0) ? proj.images.length : 1;
          return (
            <div
              key={proj.id}
              className={`rounded-3xl border transition-all duration-300 overflow-hidden flex flex-col justify-between bg-white ${
                proj.active === false
                  ? 'opacity-60 border-dashed border-slate-300 bg-slate-50'
                  : 'border-slate-200 shadow-sm hover:shadow-md hover:border-blue-300'
              }`}
            >
              <div>
                {/* Image Preview */}
                <div className="relative h-48 w-full overflow-hidden bg-slate-900">
                  <img
                    src={proj.image || (proj.images && proj.images[0])}
                    alt={proj.title}
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent" />
                  
                  {/* Category & Year Tags */}
                  <div className="absolute top-3 left-3 flex items-center gap-1.5">
                    <span className="px-2.5 py-1 rounded-full bg-blue-600/90 text-white font-bold text-[10px] uppercase tracking-wider backdrop-blur-xs">
                      {proj.categoryLabel}
                    </span>
                    <span className="px-2 py-0.5 rounded-md bg-amber-400 text-slate-950 font-bold text-[10px]">
                      {proj.year}
                    </span>
                  </div>

                  {/* Photos Count Badge */}
                  <div className="absolute top-3 right-3 px-2.5 py-1 rounded-full bg-slate-950/80 text-white text-[10px] font-bold border border-white/20 flex items-center gap-1">
                    <ImageIcon className="w-3 h-3 text-amber-400" />
                    <span>{imageCount} Photos</span>
                  </div>

                  <div className="absolute bottom-3 left-3 right-3">
                    <h3 className="font-bold text-base text-white font-serif leading-tight">
                      {proj.title}
                    </h3>
                    <div className="flex items-center gap-2 text-[11px] text-amber-300 mt-1 font-medium">
                      <span className="flex items-center gap-1">
                        <Building2 className="w-3 h-3" />
                        {proj.client}
                      </span>
                      {proj.location && (
                        <>
                          <span>•</span>
                          <span className="text-blue-200 flex items-center gap-1">
                            <MapPin className="w-3 h-3" />
                            {proj.location}
                          </span>
                        </>
                      )}
                    </div>
                  </div>
                </div>

                {/* Description & Mini Thumbnails */}
                <div className="p-5 space-y-3">
                  <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed">
                    {proj.description}
                  </p>

                  {/* Thumbnail Row */}
                  {proj.images && proj.images.length > 1 && (
                    <div className="flex items-center gap-1.5 overflow-x-auto py-1">
                      {proj.images.slice(0, 5).map((img, i) => (
                        <img
                          key={i}
                          src={img}
                          alt="thumb"
                          className="w-9 h-7 object-cover rounded-md border border-slate-200 shrink-0"
                        />
                      ))}
                      {proj.images.length > 5 && (
                        <span className="text-[10px] font-bold text-slate-500 bg-slate-100 px-1.5 py-1 rounded-md">
                          +{proj.images.length - 5}
                        </span>
                      )}
                    </div>
                  )}

                  {proj.highlights && proj.highlights.length > 0 && (
                    <div className="space-y-1 pt-1 border-t border-slate-100">
                      <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                        Deliverables
                      </div>
                      {proj.highlights.slice(0, 2).map((h, i) => (
                        <div key={i} className="flex items-center gap-1.5 text-xs text-slate-700">
                          <CheckCircle2 className="w-3 h-3 text-blue-600 shrink-0" />
                          <span className="line-clamp-1">{h}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              {/* Footer Actions */}
              <div className="p-4 bg-slate-50 border-t border-slate-100 flex items-center justify-between">
                <button
                  onClick={() => toggleProjectActive(proj.id)}
                  className={`flex items-center gap-1 text-xs font-semibold px-2.5 py-1 rounded-lg transition-colors cursor-pointer ${
                    proj.active === false
                      ? 'bg-amber-100 text-amber-800'
                      : 'bg-emerald-100 text-emerald-800'
                  }`}
                >
                  {proj.active === false ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                  <span>{proj.active === false ? 'Hidden' : 'Visible on Gallery'}</span>
                </button>

                <div className="flex items-center gap-1.5">
                  <button
                    onClick={() => handleOpenEdit(proj)}
                    className="p-2 rounded-xl bg-white hover:bg-blue-50 text-blue-600 border border-slate-200 hover:border-blue-300 transition-colors cursor-pointer shadow-xs"
                    title="Edit Project & Images"
                  >
                    <Edit className="w-3.5 h-3.5" />
                  </button>
                  <button
                    onClick={() => {
                      if (confirm(`Delete project "${proj.title}"?`)) {
                        deleteProject(proj.id);
                      }
                    }}
                    className="p-2 rounded-xl bg-white hover:bg-rose-50 text-rose-600 border border-slate-200 hover:border-rose-300 transition-colors cursor-pointer shadow-xs"
                    title="Delete Project"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Add / Edit Modal with Multi-Image Manager */}
      {(isAddMode || editingProject) && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-950/60 backdrop-blur-xs animate-fadeIn overflow-y-auto">
          <div className="relative w-full max-w-3xl bg-white rounded-3xl border border-slate-200 shadow-2xl p-6 sm:p-8 max-h-[92vh] overflow-y-auto space-y-6 text-slate-900 my-auto">
            <button
              onClick={() => {
                setEditingProject(null);
                setIsAddMode(false);
              }}
              className="absolute top-5 right-5 p-2 rounded-full text-slate-400 hover:text-slate-700 hover:bg-slate-100 cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            <div>
              <h3 className="text-xl font-bold font-serif text-slate-900">
                {isAddMode ? 'Add Project to Showcase Gallery' : `Edit: ${formData.title}`}
              </h3>
              <p className="text-xs text-slate-500">
                Upload 5 to 7 high-resolution photos so visitors can inspect the event in an interactive grid with full zoom capabilities.
              </p>
            </div>

            <form onSubmit={handleSave} className="space-y-5 text-xs">
              {/* Basic Details */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Project Title *</label>
                  <input
                    type="text"
                    required
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    placeholder="e.g. National Leadership Summit & 3D Stage"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 focus:border-blue-500 outline-none text-xs"
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">Client / Brand *</label>
                  <input
                    type="text"
                    required
                    value={formData.client}
                    onChange={(e) => setFormData({ ...formData, client: e.target.value })}
                    placeholder="e.g. ITC / Tata Steel / Bengal Corp"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 focus:border-blue-500 outline-none text-xs"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Category</label>
                  <select
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value as PmsServiceCode })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 focus:border-blue-500 outline-none text-xs"
                  >
                    <option value="event">Corporate Events</option>
                    <option value="mice">MICE & Retreats</option>
                    <option value="activation">Brand Activation</option>
                    <option value="branding">Retail Shop Branding</option>
                    <option value="hoarding">Outdoor Hoardings</option>
                    <option value="digital">Digital Campaigns</option>
                    <option value="merchandising">Corporate Gifting</option>
                  </select>
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">Execution Year</label>
                  <input
                    type="text"
                    value={formData.year}
                    onChange={(e) => setFormData({ ...formData, year: e.target.value })}
                    placeholder="2026"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 focus:border-blue-500 outline-none text-xs"
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">City / Location</label>
                  <input
                    type="text"
                    value={formData.location}
                    onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                    placeholder="Kolkata / Pan-India"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 focus:border-blue-500 outline-none text-xs"
                  />
                </div>
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Description & Scope Summary</label>
                <textarea
                  rows={2}
                  required
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="Overview of event scale, attendee counts, and on-ground precision..."
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 focus:border-blue-500 outline-none text-xs"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">
                  Deliverable Highlights (One per line)
                </label>
                <textarea
                  rows={2}
                  value={formData.highlights}
                  onChange={(e) => setFormData({ ...formData, highlights: e.target.value })}
                  placeholder="3D Stage Craft&#10;Line-Array Audio&#10;500+ Corporate Attendees"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 focus:border-blue-500 outline-none text-xs font-mono"
                />
              </div>

              {/* Multi-Image Upload & Management (5 to 7 images) */}
              <div className="p-4 sm:p-5 rounded-2xl bg-blue-50/50 border border-blue-200/80 space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <div>
                    <div className="text-xs font-bold text-blue-950 flex items-center gap-1.5">
                      <ImageIcon className="w-4 h-4 text-blue-600" />
                      <span>Project Case Photos ({formData.images.length} Images Added)</span>
                    </div>
                    <p className="text-[11px] text-blue-800">
                      Add 5 to 7 high-res angles (Stage, AV setup, crowd view, VIP booth, branding, signage).
                    </p>
                  </div>

                  <button
                    type="button"
                    onClick={handleAddImageSlot}
                    disabled={formData.images.length >= 10}
                    className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1 self-start sm:self-auto ${
                      formData.images.length >= 10
                        ? 'bg-slate-200 text-slate-400 cursor-not-allowed'
                        : 'bg-blue-600 hover:bg-blue-700 text-white shadow-xs cursor-pointer'
                    }`}
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>Add Photo Slot</span>
                  </button>
                </div>

                {/* List of Image Slots */}
                <div className="space-y-3">
                  {formData.images.map((imgUrl, idx) => (
                    <div
                      key={idx}
                      className="p-3 bg-white rounded-xl border border-slate-200 shadow-2xs flex flex-col sm:flex-row items-start sm:items-center gap-3"
                    >
                      {/* Image Thumbnail Preview */}
                      <div className="relative w-16 h-14 rounded-lg overflow-hidden bg-slate-100 border border-slate-200 shrink-0">
                        {imgUrl ? (
                          <img
                            src={imgUrl}
                            alt={`Preview ${idx + 1}`}
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center text-slate-400">
                            <ImageIcon className="w-5 h-5" />
                          </div>
                        )}
                        <span className="absolute top-0 left-0 bg-slate-900/80 text-white text-[9px] font-mono px-1 rounded-br">
                          #{idx + 1}
                        </span>
                      </div>

                      {/* URL input and upload button */}
                      <div className="flex-1 w-full space-y-1.5">
                        <div className="flex items-center justify-between">
                          <span className="text-[11px] font-bold text-slate-700 flex items-center gap-1.5">
                            {idx === 0 ? (
                              <span className="px-2 py-0.5 rounded-md bg-amber-100 text-amber-900 text-[10px] font-bold border border-amber-300 flex items-center gap-1">
                                <Star className="w-2.5 h-2.5 fill-amber-500 text-amber-500" />
                                Primary Cover Image
                              </span>
                            ) : (
                              <span>Angle #{idx + 1}</span>
                            )}
                          </span>

                          {idx !== 0 && (
                            <button
                              type="button"
                              onClick={() => handleSetAsCover(idx)}
                              className="text-[10px] font-semibold text-blue-600 hover:text-blue-800 hover:underline cursor-pointer"
                            >
                              Make Primary Cover
                            </button>
                          )}
                        </div>

                        <div className="flex items-center gap-2">
                          <input
                            type="text"
                            value={imgUrl}
                            onChange={(e) => handleImageChange(idx, e.target.value)}
                            placeholder="https://... or upload local file"
                            className="flex-1 px-3 py-1.5 rounded-lg bg-slate-50 border border-slate-200 focus:border-blue-500 outline-none text-xs font-mono"
                          />

                          {/* File Uploader */}
                          <label className="px-2.5 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold text-xs border border-slate-200 flex items-center gap-1 shrink-0 cursor-pointer transition-colors">
                            <Upload className="w-3 h-3 text-blue-600" />
                            <span>Upload</span>
                            <input
                              type="file"
                              accept="image/*"
                              className="hidden"
                              onChange={(e) => {
                                const file = e.target.files?.[0];
                                if (file) handleImageUpload(idx, file);
                              }}
                            />
                          </label>
                        </div>
                      </div>

                      {/* Reorder and Delete controls */}
                      <div className="flex items-center gap-1 self-end sm:self-center shrink-0">
                        <button
                          type="button"
                          disabled={idx === 0}
                          onClick={() => handleMoveImage(idx, 'up')}
                          className={`p-1.5 rounded-lg border text-slate-600 transition-colors ${
                            idx === 0
                              ? 'opacity-30 cursor-not-allowed border-slate-200'
                              : 'hover:bg-slate-100 border-slate-200 cursor-pointer'
                          }`}
                          title="Move Up"
                        >
                          <ArrowUp className="w-3.5 h-3.5" />
                        </button>

                        <button
                          type="button"
                          disabled={idx === formData.images.length - 1}
                          onClick={() => handleMoveImage(idx, 'down')}
                          className={`p-1.5 rounded-lg border text-slate-600 transition-colors ${
                            idx === formData.images.length - 1
                              ? 'opacity-30 cursor-not-allowed border-slate-200'
                              : 'hover:bg-slate-100 border-slate-200 cursor-pointer'
                          }`}
                          title="Move Down"
                        >
                          <ArrowDown className="w-3.5 h-3.5" />
                        </button>

                        <button
                          type="button"
                          onClick={() => handleRemoveImageSlot(idx)}
                          className="p-1.5 rounded-lg border border-slate-200 hover:border-rose-300 hover:bg-rose-50 text-rose-600 transition-colors cursor-pointer ml-1"
                          title="Remove Photo"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Form Buttons */}
              <div className="flex justify-end gap-2.5 pt-4 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => {
                    setEditingProject(null);
                    setIsAddMode(false);
                  }}
                  className="px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold text-xs cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs shadow-md cursor-pointer"
                >
                  {isAddMode ? 'Add Project to Showcase' : 'Save Changes'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
