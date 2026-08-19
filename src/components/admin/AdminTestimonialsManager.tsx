import React, { useState } from 'react';
import {
  MessageSquare,
  Star,
  Plus,
  Edit,
  Trash2,
  CheckCircle2,
  X,
  Eye,
  EyeOff,
  Building2,
  UserCheck,
} from 'lucide-react';
import { useCms } from '../../context/CmsContext';
import { PmsTestimonial } from '../../types';

export const AdminTestimonialsManager: React.FC = () => {
  const {
    testimonials,
    addTestimonial,
    updateTestimonial,
    deleteTestimonial,
    toggleTestimonialActive,
  } = useCms();

  const [editingTestimonial, setEditingTestimonial] = useState<PmsTestimonial | null>(null);
  const [isAddMode, setIsAddMode] = useState(false);

  // Form State
  const [formData, setFormData] = useState<{
    clientName: string;
    role: string;
    company: string;
    serviceCategory: string;
    rating: number;
    review: string;
    projectHighlight: string;
    location: string;
    tag: string;
    verified: boolean;
    avatar: string;
  }>({
    clientName: '',
    role: 'Vice President of Marketing',
    company: '',
    serviceCategory: 'Corporate Event Management',
    rating: 5,
    review: '',
    projectHighlight: '450-Delegate Leadership Summit & 3D Stage',
    location: 'Kolkata, WB',
    tag: 'Enterprise Client',
    verified: true,
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
  });

  const handleOpenAdd = () => {
    setFormData({
      clientName: '',
      role: 'Head of Brand & Events',
      company: '',
      serviceCategory: 'Corporate Event Management',
      rating: 5,
      review: '',
      projectHighlight: 'Annual Conference & Stagecraft',
      location: 'Kolkata, WB',
      tag: 'Verified Client',
      verified: true,
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80',
    });
    setEditingTestimonial(null);
    setIsAddMode(true);
  };

  const handleOpenEdit = (t: PmsTestimonial) => {
    setFormData({
      clientName: t.clientName,
      role: t.role,
      company: t.company,
      serviceCategory: t.serviceCategory,
      rating: t.rating,
      review: t.review,
      projectHighlight: t.projectHighlight,
      location: t.location,
      tag: t.tag,
      verified: t.verified,
      avatar: t.avatar || 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80',
    });
    setEditingTestimonial(t);
    setIsAddMode(false);
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (isAddMode) {
      addTestimonial({
        clientName: formData.clientName,
        role: formData.role,
        company: formData.company,
        serviceCategory: formData.serviceCategory,
        rating: Number(formData.rating),
        review: formData.review,
        projectHighlight: formData.projectHighlight,
        location: formData.location,
        tag: formData.tag,
        verified: formData.verified,
        avatar: formData.avatar,
        active: true,
      });
    } else if (editingTestimonial) {
      updateTestimonial(editingTestimonial.id, {
        clientName: formData.clientName,
        role: formData.role,
        company: formData.company,
        serviceCategory: formData.serviceCategory,
        rating: Number(formData.rating),
        review: formData.review,
        projectHighlight: formData.projectHighlight,
        location: formData.location,
        tag: formData.tag,
        verified: formData.verified,
        avatar: formData.avatar,
      });
    }

    setEditingTestimonial(null);
    setIsAddMode(false);
  };

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold font-serif text-slate-900">
            Client Testimonials & Reviews CMS
          </h2>
          <p className="text-xs text-slate-500">
            Manage corporate endorsements and verified customer stories displayed on the home and about sections.
          </p>
        </div>

        <button
          onClick={handleOpenAdd}
          className="px-4 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs shadow-md transition-all flex items-center gap-1.5 cursor-pointer self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" />
          <span>Add Testimonial</span>
        </button>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {testimonials.map((t) => (
          <div
            key={t.id}
            className={`rounded-3xl border p-5 flex flex-col justify-between transition-all bg-white ${
              t.active === false
                ? 'opacity-60 border-dashed border-slate-300 bg-slate-50'
                : 'border-slate-200 shadow-sm hover:shadow-md hover:border-blue-300'
            }`}
          >
            <div className="space-y-3">
              {/* Rating & Tag */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1 text-amber-500">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                      key={i}
                      className={`w-3.5 h-3.5 ${
                        i < t.rating ? 'fill-amber-400 text-amber-400' : 'text-slate-300'
                      }`}
                    />
                  ))}
                </div>
                <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-blue-50 text-blue-700 border border-blue-100">
                  {t.tag}
                </span>
              </div>

              {/* Quote */}
              <p className="text-xs text-slate-700 italic leading-relaxed">
                "{t.review}"
              </p>

              {/* Delivered Scope */}
              <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-100 text-[11px] text-slate-600">
                <span className="font-bold text-slate-800">Delivered Scope:</span> {t.projectHighlight}
              </div>
            </div>

            {/* Author Details & Card Footer */}
            <div className="pt-4 mt-4 border-t border-slate-100 space-y-3">
              <div className="flex items-center gap-3">
                {t.avatar ? (
                  <img
                    src={t.avatar}
                    alt={t.clientName}
                    className="w-10 h-10 rounded-full object-cover border border-slate-200"
                    referrerPolicy="no-referrer"
                  />
                ) : (
                  <div className="w-10 h-10 rounded-full bg-blue-100 text-blue-700 font-bold flex items-center justify-center text-xs">
                    {t.clientName[0]}
                  </div>
                )}
                <div>
                  <h4 className="font-bold text-slate-900 text-xs">{t.clientName}</h4>
                  <p className="text-[10px] text-slate-500">{t.role} • <strong className="text-slate-700">{t.company}</strong></p>
                </div>
              </div>

              <div className="flex items-center justify-between pt-1">
                <button
                  onClick={() => toggleTestimonialActive(t.id)}
                  className={`text-[11px] font-semibold px-2 py-0.5 rounded-md cursor-pointer ${
                    t.active === false ? 'bg-amber-100 text-amber-800' : 'bg-emerald-100 text-emerald-800'
                  }`}
                >
                  {t.active === false ? 'Hidden' : 'Live on Page'}
                </button>

                <div className="flex items-center gap-1.5">
                  <button
                    onClick={() => handleOpenEdit(t)}
                    className="p-1.5 rounded-lg bg-slate-50 hover:bg-blue-50 text-blue-600 border border-slate-200 hover:border-blue-200 transition-colors"
                  >
                    <Edit className="w-3.5 h-3.5" />
                  </button>
                  <button
                    onClick={() => {
                      if (confirm(`Delete review from "${t.clientName}"?`)) {
                        deleteTestimonial(t.id);
                      }
                    }}
                    className="p-1.5 rounded-lg bg-slate-50 hover:bg-rose-50 text-rose-600 border border-slate-200 hover:border-rose-200 transition-colors"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Modal */}
      {(isAddMode || editingTestimonial) && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-xs animate-fadeIn">
          <div className="relative w-full max-w-lg bg-white rounded-3xl border border-slate-200 shadow-2xl p-6 sm:p-8 max-h-[90vh] overflow-y-auto space-y-5 text-slate-900">
            <button
              onClick={() => {
                setEditingTestimonial(null);
                setIsAddMode(false);
              }}
              className="absolute top-5 right-5 p-2 rounded-full text-slate-400 hover:text-slate-700 hover:bg-slate-100"
            >
              <X className="w-5 h-5" />
            </button>

            <div>
              <h3 className="text-xl font-bold font-serif text-slate-900">
                {isAddMode ? 'Add Client Review' : `Edit: ${formData.clientName}`}
              </h3>
            </div>

            <form onSubmit={handleSave} className="space-y-3.5 text-xs">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Client Name *</label>
                  <input
                    type="text"
                    required
                    value={formData.clientName}
                    onChange={(e) => setFormData({ ...formData, clientName: e.target.value })}
                    placeholder="e.g. Rajesh Banerjee"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 focus:border-blue-500 outline-none text-xs"
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">Designation / Role *</label>
                  <input
                    type="text"
                    required
                    value={formData.role}
                    onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                    placeholder="e.g. VP Marketing"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 focus:border-blue-500 outline-none text-xs"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Company / Organization *</label>
                  <input
                    type="text"
                    required
                    value={formData.company}
                    onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                    placeholder="e.g. East India Tech Corp"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 focus:border-blue-500 outline-none text-xs"
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">Star Rating (1-5)</label>
                  <select
                    value={formData.rating}
                    onChange={(e) => setFormData({ ...formData, rating: Number(e.target.value) })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 focus:border-blue-500 outline-none text-xs"
                  >
                    <option value={5}>5 Stars (Exceptional)</option>
                    <option value={4}>4 Stars (Very Good)</option>
                    <option value={3}>3 Stars (Good)</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Review Quote *</label>
                <textarea
                  rows={3}
                  required
                  value={formData.review}
                  onChange={(e) => setFormData({ ...formData, review: e.target.value })}
                  placeholder="Detailed endorsement of PMS Innovation Solutions' execution..."
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 focus:border-blue-500 outline-none text-xs"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Project Highlight / Scope</label>
                <input
                  type="text"
                  value={formData.projectHighlight}
                  onChange={(e) => setFormData({ ...formData, projectHighlight: e.target.value })}
                  placeholder="e.g. 450-Delegate Leadership Summit & 3D Stage"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 focus:border-blue-500 outline-none text-xs"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Avatar Photo URL</label>
                <input
                  type="url"
                  value={formData.avatar}
                  onChange={(e) => setFormData({ ...formData, avatar: e.target.value })}
                  placeholder="https://images.unsplash.com/..."
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 focus:border-blue-500 outline-none text-xs"
                />
              </div>

              <div className="flex justify-end gap-2.5 pt-3 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => {
                    setEditingTestimonial(null);
                    setIsAddMode(false);
                  }}
                  className="px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold text-xs"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs shadow-md"
                >
                  Save Review
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
