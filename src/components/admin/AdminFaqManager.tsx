import React, { useState, useMemo } from 'react';
import {
  HelpCircle,
  Plus,
  Edit2,
  Trash2,
  ArrowUp,
  ArrowDown,
  Eye,
  EyeOff,
  Search,
  Check,
  X,
  Sparkles,
  AlertCircle,
  CheckCircle2,
  Layers,
  FileQuestion,
} from 'lucide-react';
import { useCms } from '../../context/CmsContext';
import { PmsFaqItem } from '../../types';

export const AdminFaqManager: React.FC = () => {
  const { faqs, addFaq, updateFaq, deleteFaq, reorderFaq, toggleFaqActive } =
    useCms();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [editingFaq, setEditingFaq] = useState<PmsFaqItem | null>(null);
  const [isCreating, setIsCreating] = useState(false);
  const [showPresetModal, setShowPresetModal] = useState(false);
  const [deleteConfirmId, setDeleteConfirmId] = useState<string | null>(null);

  // Form State
  const [formData, setFormData] = useState<{
    question: string;
    answer: string;
    category: string;
    active: boolean;
  }>({
    question: '',
    answer: '',
    category: 'Corporate Events & MICE',
    active: true,
  });

  const categories = useMemo(() => {
    const set = new Set<string>([
      'Corporate Events & MICE',
      'Stage & Production',
      'Brand Activation & Retail',
      'Outdoor & Media',
      'Corporate Gifting',
      'Pricing & Process',
    ]);
    faqs.forEach((f) => {
      if (f.category) set.add(f.category);
    });
    return Array.from(set);
  }, [faqs]);

  // Filtered FAQs
  const filteredFaqs = useMemo(() => {
    return faqs.filter((f) => {
      const matchCat =
        selectedCategory === 'All' || f.category === selectedCategory;
      const query = searchQuery.toLowerCase().trim();
      const matchQuery =
        !query ||
        f.question.toLowerCase().includes(query) ||
        f.answer.toLowerCase().includes(query) ||
        (f.category && f.category.toLowerCase().includes(query));
      return matchCat && matchQuery;
    });
  }, [faqs, selectedCategory, searchQuery]);

  const handleOpenCreate = () => {
    setFormData({
      question: '',
      answer: '',
      category: 'Corporate Events & MICE',
      active: true,
    });
    setIsCreating(true);
    setEditingFaq(null);
  };

  const handleOpenEdit = (faq: PmsFaqItem) => {
    setFormData({
      question: faq.question,
      answer: faq.answer,
      category: faq.category || 'Corporate Events & MICE',
      active: faq.active !== false,
    });
    setEditingFaq(faq);
    setIsCreating(false);
  };

  const handleSaveForm = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.question.trim() || !formData.answer.trim()) return;

    if (editingFaq) {
      updateFaq(editingFaq.id, {
        question: formData.question.trim(),
        answer: formData.answer.trim(),
        category: formData.category.trim(),
        active: formData.active,
      });
    } else {
      addFaq({
        question: formData.question.trim(),
        answer: formData.answer.trim(),
        category: formData.category.trim(),
        active: formData.active,
      });
    }

    setIsCreating(false);
    setEditingFaq(null);
  };

  const presetFaqs = [
    {
      question: 'Do you provide artist booking, celebrity performers, and live band coordination?',
      answer:
        'Yes, PMS Innovation Solutions coordinates with top musical bands, celebrity artists, stand-up comedians, mentalists, and motivational speakers for corporate galas and annual day celebrations.',
      category: 'Corporate Events & MICE',
    },
    {
      question: 'Can you handle simultaneous multi-city brand launches in Eastern India?',
      answer:
        'Yes, our centralized operations team in Kolkata coordinates synchronised activations across Kolkata, Patna, Bhubaneswar, Ranchi, and Guwahati with live video streaming links.',
      category: 'Brand Activation & Retail',
    },
    {
      question: 'What safety precautions and structural certifications do you follow for heavy stage setups?',
      answer:
        'All our aluminum trusses, ground-support towers, and heavy LED wall structures are engineered with certified load calculations, fire-retardant masking drapes, and backup diesel generators (DG sets).',
      category: 'Stage & Production',
    },
  ];

  return (
    <div className="space-y-8 animate-fadeIn" id="admin-faq-manager">
      {/* Header */}
      <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 text-blue-700 text-xs font-semibold uppercase tracking-wider">
            <HelpCircle className="w-3.5 h-3.5" />
            Homepage FAQ Management CMS
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
            Frequently Asked Questions (FAQ)
          </h1>
          <p className="text-slate-500 text-sm max-w-2xl">
            Control the questions and detailed answers displayed on the homepage. Questions are automatically synced to Google Schema structured data for SERP rich snippets.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => setShowPresetModal(true)}
            className="px-4 py-2.5 rounded-xl border border-slate-200 hover:bg-slate-50 text-slate-700 text-xs sm:text-sm font-semibold transition-all flex items-center gap-2 cursor-pointer"
          >
            <Sparkles className="w-4 h-4 text-amber-500" /> Recommended Presets
          </button>

          <button
            type="button"
            onClick={handleOpenCreate}
            className="px-5 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs sm:text-sm font-bold shadow-md hover:shadow-lg transition-all flex items-center gap-2 cursor-pointer"
          >
            <Plus className="w-4 h-4" /> Add New Question
          </button>
        </div>
      </div>

      {/* Filter & Search Bar */}
      <div className="bg-white rounded-2xl p-4 sm:p-6 border border-slate-200 shadow-xs space-y-4">
        <div className="flex flex-col sm:flex-row gap-4 justify-between items-center">
          {/* Search */}
          <div className="relative w-full sm:w-80">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search questions or answers..."
              className="w-full pl-10 pr-4 py-2 rounded-xl border border-slate-200 bg-slate-50/50 text-slate-900 text-xs sm:text-sm focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
            />
          </div>

          {/* Category Filter */}
          <div className="flex items-center gap-2 w-full sm:w-auto overflow-x-auto pb-1 sm:pb-0">
            <button
              type="button"
              onClick={() => setSelectedCategory('All')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all whitespace-nowrap cursor-pointer ${
                selectedCategory === 'All'
                  ? 'bg-slate-900 text-white shadow-xs'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              All ({faqs.length})
            </button>
            {categories.map((cat) => {
              const count = faqs.filter((f) => f.category === cat).length;
              if (count === 0) return null;
              return (
                <button
                  key={cat}
                  type="button"
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all whitespace-nowrap cursor-pointer ${
                    selectedCategory === cat
                      ? 'bg-slate-900 text-white shadow-xs'
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                  }`}
                >
                  {cat} ({count})
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* FAQ List */}
      <div className="space-y-3">
        {filteredFaqs.length === 0 ? (
          <div className="text-center py-16 bg-white rounded-3xl border border-dashed border-slate-300 p-8 space-y-4">
            <FileQuestion className="w-12 h-12 text-slate-300 mx-auto" />
            <div className="space-y-1">
              <h3 className="text-base font-bold text-slate-800">
                No FAQs Found
              </h3>
              <p className="text-xs text-slate-500 max-w-sm mx-auto">
                No questions match your current filter. Create a new question or choose from preset recommendations.
              </p>
            </div>
            <button
              type="button"
              onClick={handleOpenCreate}
              className="px-4 py-2 rounded-xl bg-slate-900 text-white text-xs font-bold"
            >
              Add First Question
            </button>
          </div>
        ) : (
          filteredFaqs.map((faq, index) => {
            const isActive = faq.active !== false;

            return (
              <div
                key={faq.id}
                className={`bg-white rounded-2xl p-5 sm:p-6 border transition-all duration-200 space-y-3 ${
                  isActive
                    ? 'border-slate-200 shadow-xs hover:border-blue-200'
                    : 'border-slate-200 bg-slate-50/50 opacity-60'
                }`}
              >
                <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
                  {/* Question Header */}
                  <div className="flex items-start gap-3 flex-1">
                    <div className="w-8 h-8 rounded-xl bg-slate-100 border border-slate-200 text-slate-700 flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">
                      {index + 1}
                    </div>
                    <div className="space-y-1">
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-blue-50 text-blue-700 border border-blue-100">
                          {faq.category || 'General'}
                        </span>
                        {!isActive && (
                          <span className="px-2 py-0.5 rounded-md text-[10px] font-bold uppercase tracking-wider bg-slate-200 text-slate-600">
                            Hidden / Inactive
                          </span>
                        )}
                      </div>
                      <h3 className="text-base font-bold text-slate-900 leading-snug">
                        {faq.question}
                      </h3>
                      <p className="text-xs sm:text-sm text-slate-600 leading-relaxed pt-1">
                        {faq.answer}
                      </p>
                    </div>
                  </div>

                  {/* Actions Column */}
                  <div className="flex items-center gap-1.5 self-end sm:self-start shrink-0">
                    {/* Reorder Buttons */}
                    <button
                      type="button"
                      disabled={index === 0}
                      onClick={() => reorderFaq(faq.id, 'up')}
                      className="p-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-600 disabled:opacity-30 disabled:cursor-not-allowed transition-all"
                      title="Move Up"
                    >
                      <ArrowUp className="w-3.5 h-3.5" />
                    </button>
                    <button
                      type="button"
                      disabled={index === filteredFaqs.length - 1}
                      onClick={() => reorderFaq(faq.id, 'down')}
                      className="p-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-600 disabled:opacity-30 disabled:cursor-not-allowed transition-all"
                      title="Move Down"
                    >
                      <ArrowDown className="w-3.5 h-3.5" />
                    </button>

                    {/* Toggle Active */}
                    <button
                      type="button"
                      onClick={() => toggleFaqActive(faq.id)}
                      className={`p-2 rounded-xl transition-all ${
                        isActive
                          ? 'bg-emerald-50 text-emerald-700 hover:bg-emerald-100'
                          : 'bg-slate-200 text-slate-500 hover:bg-slate-300'
                      }`}
                      title={isActive ? 'Active (Click to Hide)' : 'Inactive (Click to Show)'}
                    >
                      {isActive ? <Eye className="w-3.5 h-3.5" /> : <EyeOff className="w-3.5 h-3.5" />}
                    </button>

                    {/* Edit */}
                    <button
                      type="button"
                      onClick={() => handleOpenEdit(faq)}
                      className="p-2 rounded-xl bg-blue-50 text-blue-700 hover:bg-blue-100 transition-all"
                      title="Edit Question & Answer"
                    >
                      <Edit2 className="w-3.5 h-3.5" />
                    </button>

                    {/* Delete */}
                    <button
                      type="button"
                      onClick={() => setDeleteConfirmId(faq.id)}
                      className="p-2 rounded-xl bg-rose-50 text-rose-700 hover:bg-rose-100 transition-all"
                      title="Delete FAQ"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>

      {/* Modal: Create / Edit FAQ */}
      {(isCreating || editingFaq) && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-3xl max-w-xl w-full p-6 sm:p-8 shadow-2xl border border-slate-200 space-y-6 my-8 animate-scaleUp">
            <div className="flex items-center justify-between border-b border-slate-100 pb-4">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
                  <HelpCircle className="w-5 h-5" />
                </div>
                <div>
                  <h2 className="text-lg font-bold text-slate-900">
                    {editingFaq ? 'Edit FAQ Item' : 'Add New FAQ Question'}
                  </h2>
                  <p className="text-xs text-slate-500">
                    Enter the client inquiry and corporate answer
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => {
                  setIsCreating(false);
                  setEditingFaq(null);
                }}
                className="p-2 rounded-xl text-slate-400 hover:text-slate-600 hover:bg-slate-100"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveForm} className="space-y-4">
              {/* Category */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                  Category Section <span className="text-red-500">*</span>
                </label>
                <select
                  value={formData.category}
                  onChange={(e) =>
                    setFormData((prev) => ({ ...prev, category: e.target.value }))
                  }
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 bg-white text-slate-900 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  {categories.map((c) => (
                    <option key={c} value={c}>
                      {c}
                    </option>
                  ))}
                </select>
              </div>

              {/* Question */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                  Question Text <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={formData.question}
                  onChange={(e) =>
                    setFormData((prev) => ({ ...prev, question: e.target.value }))
                  }
                  placeholder="e.g. What safety precautions and stage certifications do you follow?"
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50/50 text-slate-900 text-sm focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 font-medium"
                />
              </div>

              {/* Answer */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                  Detailed Answer Text <span className="text-red-500">*</span>
                </label>
                <textarea
                  rows={4}
                  required
                  value={formData.answer}
                  onChange={(e) =>
                    setFormData((prev) => ({ ...prev, answer: e.target.value }))
                  }
                  placeholder="Provide a clear, human, and professional answer explaining your equipment, team, process, and deliverables..."
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50/50 text-slate-900 text-sm focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 leading-relaxed"
                />
              </div>

              {/* Active Toggle */}
              <div className="pt-2">
                <label className="inline-flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.active}
                    onChange={(e) =>
                      setFormData((prev) => ({ ...prev, active: e.target.checked }))
                    }
                    className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
                  />
                  <span className="text-xs font-bold text-slate-800">
                    Display this FAQ question on the live website
                  </span>
                </label>
              </div>

              {/* Modal Actions */}
              <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => {
                    setIsCreating(false);
                    setEditingFaq(null);
                  }}
                  className="px-4 py-2.5 rounded-xl text-xs font-semibold text-slate-600 hover:bg-slate-100 transition-all"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs sm:text-sm font-bold shadow-md hover:shadow-lg transition-all flex items-center gap-2"
                >
                  <Check className="w-4 h-4" /> Save Question
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Modal: Preset Recommendations */}
      {showPresetModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-3xl max-w-xl w-full p-6 sm:p-8 shadow-2xl border border-slate-200 space-y-6 my-8 animate-scaleUp">
            <div className="flex items-center justify-between border-b border-slate-100 pb-4">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center">
                  <Sparkles className="w-5 h-5" />
                </div>
                <div>
                  <h2 className="text-lg font-bold text-slate-900">
                    Recommended Corporate FAQs
                  </h2>
                  <p className="text-xs text-slate-500">
                    Click to instantly add high-converting client questions
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setShowPresetModal(false)}
                className="p-2 rounded-xl text-slate-400 hover:text-slate-600 hover:bg-slate-100"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-3 max-h-96 overflow-y-auto pr-1">
              {presetFaqs.map((p, idx) => (
                <div
                  key={idx}
                  className="p-4 rounded-2xl bg-slate-50 border border-slate-200 hover:border-blue-300 transition-all space-y-2"
                >
                  <div className="flex items-start justify-between gap-3">
                    <span className="text-xs font-bold text-slate-900">
                      {p.question}
                    </span>
                    <button
                      type="button"
                      onClick={() => {
                        addFaq({
                          question: p.question,
                          answer: p.answer,
                          category: p.category,
                          active: true,
                        });
                        setShowPresetModal(false);
                      }}
                      className="px-3 py-1 rounded-lg bg-slate-900 hover:bg-blue-600 text-white text-[11px] font-bold shrink-0 transition-all"
                    >
                      + Add FAQ
                    </button>
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    {p.answer}
                  </p>
                  <span className="inline-block text-[10px] font-semibold text-blue-600 uppercase">
                    {p.category}
                  </span>
                </div>
              ))}
            </div>

            <div className="pt-2 text-right border-t border-slate-100">
              <button
                type="button"
                onClick={() => setShowPresetModal(false)}
                className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-600 hover:bg-slate-100"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal: Delete Confirmation */}
      {deleteConfirmId && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-sm w-full p-6 shadow-2xl border border-slate-200 space-y-4 animate-scaleUp">
            <div className="w-10 h-10 rounded-2xl bg-rose-50 text-rose-600 flex items-center justify-center mx-auto">
              <Trash2 className="w-5 h-5" />
            </div>
            <div className="text-center space-y-1">
              <h3 className="text-base font-bold text-slate-900">
                Delete Question?
              </h3>
              <p className="text-xs text-slate-500">
                Are you sure you want to delete this FAQ question? This action cannot be undone.
              </p>
            </div>
            <div className="flex items-center gap-3 pt-2">
              <button
                type="button"
                onClick={() => setDeleteConfirmId(null)}
                className="flex-1 py-2.5 rounded-xl text-xs font-semibold text-slate-600 bg-slate-100 hover:bg-slate-200 transition-all"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={() => {
                  deleteFaq(deleteConfirmId);
                  setDeleteConfirmId(null);
                }}
                className="flex-1 py-2.5 rounded-xl text-xs font-bold text-white bg-rose-600 hover:bg-rose-700 shadow-sm transition-all"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
