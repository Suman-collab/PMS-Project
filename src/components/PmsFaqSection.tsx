import React, { useState, useMemo } from 'react';
import {
  HelpCircle,
  ChevronDown,
  Search,
  MessageCircle,
  PhoneCall,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
} from 'lucide-react';
import { useCms } from '../context/CmsContext';

export const PmsFaqSection: React.FC = () => {
  const { faqs, companyInfo } = useCms();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [openFaqIds, setOpenFaqIds] = useState<string[]>(['faq-1']); // default first item open

  // Only show active FAQs
  const activeFaqs = useMemo(() => {
    return faqs.filter((f) => f.active !== false);
  }, [faqs]);

  // Extract unique categories
  const categories = useMemo(() => {
    const set = new Set<string>();
    activeFaqs.forEach((f) => {
      if (f.category) set.add(f.category);
    });
    return ['All', ...Array.from(set)];
  }, [activeFaqs]);

  // Filtered FAQs
  const filteredFaqs = useMemo(() => {
    return activeFaqs.filter((f) => {
      const matchCategory =
        selectedCategory === 'All' || f.category === selectedCategory;
      const query = searchQuery.toLowerCase().trim();
      const matchSearch =
        !query ||
        f.question.toLowerCase().includes(query) ||
        f.answer.toLowerCase().includes(query) ||
        (f.category && f.category.toLowerCase().includes(query));
      return matchCategory && matchSearch;
    });
  }, [activeFaqs, selectedCategory, searchQuery]);

  const toggleFaq = (id: string) => {
    setOpenFaqIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const handleWhatsAppChat = () => {
    const rawNumber = companyInfo.phone1Raw || '919831630072';
    const text = encodeURIComponent(
      `Hello PMS Innovation Solutions! I have a question regarding corporate event and marketing services in Kolkata.`
    );
    window.open(`https://wa.me/${rawNumber}?text=${text}`, '_blank');
  };

  return (
    <section
      id="faq"
      className="py-20 sm:py-28 bg-[#fbfbfd] border-t border-slate-200/60 relative overflow-hidden"
    >
      {/* Subtle Background Glows */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[800px] h-[350px] bg-gradient-to-r from-blue-500/5 via-indigo-500/5 to-purple-500/5 blur-3xl pointer-events-none -z-10" />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Section Header */}
        <div className="text-center space-y-4 max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-50 border border-blue-200/60 text-blue-700 text-xs font-bold tracking-wide uppercase">
            <HelpCircle className="w-3.5 h-3.5 text-blue-600" />
            Frequently Asked Questions
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight font-serif">
            Clear Answers for Your Next Corporate Event
          </h2>

          <p className="text-base sm:text-lg text-slate-600 leading-relaxed">
            Everything you need to know about our turnkey production, 3D stagecraft, MICE delegate logistics, retail branding, and booking timelines.
          </p>
        </div>

        {/* Search & Filter Controls */}
        <div className="space-y-4">
          {/* Live Search Input */}
          <div className="relative max-w-xl mx-auto">
            <Search className="w-5 h-5 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search questions (e.g. LED screen, MICE travel, booking time)..."
              className="w-full pl-12 pr-4 py-3.5 rounded-2xl bg-white border border-slate-200/90 text-slate-900 text-sm shadow-xs focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery('')}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-xs font-semibold text-slate-400 hover:text-slate-600 bg-slate-100 px-2 py-0.5 rounded-md"
              >
                Clear
              </button>
            )}
          </div>

          {/* Category Filter Chips */}
          <div className="flex flex-wrap items-center justify-center gap-2 pt-2">
            {categories.map((cat) => {
              const isSelected = selectedCategory === cat;
              const count =
                cat === 'All'
                  ? activeFaqs.length
                  : activeFaqs.filter((f) => f.category === cat).length;

              return (
                <button
                  key={cat}
                  type="button"
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all flex items-center gap-1.5 cursor-pointer ${
                    isSelected
                      ? 'bg-slate-900 text-white shadow-xs'
                      : 'bg-white text-slate-600 border border-slate-200/80 hover:bg-slate-50'
                  }`}
                >
                  <span>{cat}</span>
                  <span
                    className={`text-[10px] px-1.5 py-0.2 rounded-full ${
                      isSelected
                        ? 'bg-slate-800 text-slate-200'
                        : 'bg-slate-100 text-slate-500'
                    }`}
                  >
                    {count}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* FAQs Accordion List */}
        <div className="space-y-3.5">
          {filteredFaqs.length === 0 ? (
            <div className="text-center py-12 bg-white rounded-3xl border border-dashed border-slate-300 p-8 space-y-3">
              <HelpCircle className="w-10 h-10 text-slate-300 mx-auto" />
              <h3 className="text-base font-bold text-slate-800">
                No matching questions found
              </h3>
              <p className="text-sm text-slate-500 max-w-md mx-auto">
                We couldn't find any questions matching "{searchQuery}". Try clearing your search or contact our team directly.
              </p>
              <button
                type="button"
                onClick={() => {
                  setSearchQuery('');
                  setSelectedCategory('All');
                }}
                className="mt-2 text-xs font-bold text-blue-600 hover:text-blue-700 underline"
              >
                Reset Search Filters
              </button>
            </div>
          ) : (
            filteredFaqs.map((faq, index) => {
              const isOpen = openFaqIds.includes(faq.id);

              return (
                <div
                  key={faq.id}
                  id={`faq-item-${faq.id}`}
                  className={`bg-white rounded-2xl border transition-all duration-200 overflow-hidden ${
                    isOpen
                      ? 'border-blue-300 shadow-md ring-1 ring-blue-100'
                      : 'border-slate-200/90 shadow-2xs hover:border-slate-300'
                  }`}
                >
                  <button
                    type="button"
                    onClick={() => toggleFaq(faq.id)}
                    className="w-full p-5 sm:p-6 text-left flex items-start justify-between gap-4 cursor-pointer focus:outline-none"
                    aria-expanded={isOpen}
                  >
                    <div className="flex items-start gap-3 sm:gap-4">
                      <span className="w-7 h-7 rounded-xl bg-slate-100 border border-slate-200 text-slate-700 flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">
                        Q{index + 1}
                      </span>
                      <div className="space-y-1">
                        {faq.category && (
                          <span className="text-[11px] font-semibold uppercase tracking-wider text-blue-600">
                            {faq.category}
                          </span>
                        )}
                        <h3 className="text-base sm:text-lg font-bold text-slate-900 leading-snug">
                          {faq.question}
                        </h3>
                      </div>
                    </div>

                    <div
                      className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 transition-transform duration-200 ${
                        isOpen
                          ? 'bg-blue-600 text-white rotate-180'
                          : 'bg-slate-100 text-slate-500 hover:bg-slate-200'
                      }`}
                    >
                      <ChevronDown className="w-4 h-4" />
                    </div>
                  </button>

                  {isOpen && (
                    <div className="px-5 sm:px-6 pb-6 pt-1 text-slate-600 text-sm sm:text-base leading-relaxed border-t border-slate-100 bg-slate-50/40">
                      <div className="pl-10 sm:pl-11 space-y-3">
                        <p>{faq.answer}</p>
                      </div>
                    </div>
                  )}
                </div>
              );
            })
          )}
        </div>

        {/* Bottom CTA Card */}
        <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white shadow-xl relative overflow-hidden flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-2 text-center md:text-left z-10 max-w-xl">
            <div className="inline-flex items-center gap-1.5 text-xs font-bold text-amber-400 uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5" /> Have a Specific Project Requirement?
            </div>
            <h3 className="text-xl sm:text-2xl font-bold font-serif">
              Speak Directly with Our Event Architects
            </h3>
            <p className="text-sm text-slate-300 leading-relaxed">
              We provide itemized estimates, customized 3D venue layouts, and vendor documentation within 24 hours.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-3 z-10 w-full md:w-auto">
            <button
              type="button"
              onClick={handleWhatsAppChat}
              className="w-full sm:w-auto px-5 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs sm:text-sm shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <MessageCircle className="w-4 h-4" /> Chat on WhatsApp
            </button>

            <a
              href="#contact"
              className="w-full sm:w-auto px-5 py-3 rounded-xl bg-white hover:bg-slate-100 text-slate-900 font-bold text-xs sm:text-sm shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer text-center"
            >
              <PhoneCall className="w-4 h-4 text-blue-600" /> Request Custom Quote
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};
