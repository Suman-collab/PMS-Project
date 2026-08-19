import React, { useState, useEffect } from 'react';
import { useCms } from '../context/CmsContext';
import { PmsInquiryFormData } from '../types';
import { X, Send, CheckCircle2, Phone, Mail, User, MessageSquare } from 'lucide-react';
import confetti from 'canvas-confetti';

interface InquiryModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialData?: Partial<PmsInquiryFormData>;
}

export const InquiryModal: React.FC<InquiryModalProps> = ({
  isOpen,
  onClose,
  initialData,
}) => {
  const { companyInfo, addInquiry } = useCms();
  const [formData, setFormData] = useState<PmsInquiryFormData>({
    name: '',
    phone: '',
    email: '',
    eventDetails: '',
    serviceCategory: '360° Integrated Marketing & Corporate Events',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittedDocket, setSubmittedDocket] = useState<{ id: string } | null>(null);
  const [errorMsg, setErrorMsg] = useState('');

  useEffect(() => {
    if (initialData) {
      setFormData((prev) => ({
        ...prev,
        ...initialData,
      }));
    }
  }, [initialData]);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.phone || !formData.email || !formData.eventDetails) {
      setErrorMsg('Please complete all required fields (Phone, Email, Event details).');
      return;
    }

    setIsSubmitting(true);
    setErrorMsg('');

    try {
      const created = addInquiry(formData);

      fetch('/api/inquiries', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      }).catch((err) => console.error('API backup error', err));

      setSubmittedDocket({ id: created.id });
      confetti({
        particleCount: 70,
        spread: 60,
        origin: { y: 0.6 },
      });
    } catch (err) {
      setErrorMsg('Network error. Please call directly.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fadeIn">
      <div className="bg-white border border-slate-200 rounded-2xl max-w-xl w-full max-h-[90vh] overflow-y-auto shadow-2xl p-6 sm:p-8 relative text-slate-900 space-y-5">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-500 hover:text-slate-900 transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {!submittedDocket ? (
          <div className="space-y-4">
            <div>
              <span className="text-[11px] uppercase tracking-wider font-bold text-blue-700 font-mono">
                PMS INNOVATION SOLUTIONS
              </span>
              <h3 className="text-2xl font-serif font-bold text-slate-900">
                Request Turnkey Proposal
              </h3>
              <p className="text-xs text-slate-600 font-normal mt-1">
                Tell us about your corporate event, MICE tour, or branding campaign. We will prepare an official scope of work and quotation.
              </p>
            </div>

            {errorMsg && (
              <div className="p-3 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs font-medium">
                {errorMsg}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-3.5 text-xs">
              <div className="space-y-1">
                <label className="block text-[11px] uppercase tracking-wider font-bold text-slate-700">
                  Name
                </label>
                <div className="relative">
                  <User className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-3" />
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="Your Full Name"
                    className="w-full pl-9 pr-3 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 focus:border-blue-600 focus:bg-white focus:outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="block text-[11px] uppercase tracking-wider font-bold text-slate-700">
                    Phone*
                  </label>
                  <div className="relative">
                    <Phone className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-3" />
                    <input
                      type="tel"
                      required
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      placeholder="+91 98316 30072"
                      className="w-full pl-9 pr-3 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 focus:border-blue-600 focus:bg-white focus:outline-none font-mono"
                    />
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="block text-[11px] uppercase tracking-wider font-bold text-slate-700">
                    Email*
                  </label>
                  <div className="relative">
                    <Mail className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-3" />
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="your.email@company.com"
                      className="w-full pl-9 pr-3 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 focus:border-blue-600 focus:bg-white focus:outline-none"
                    />
                  </div>
                </div>
              </div>

              <div className="space-y-1">
                <label className="block text-[11px] uppercase tracking-wider font-bold text-slate-700">
                  Tell us a bit about your event / branding requirement.*
                </label>
                <textarea
                  rows={4}
                  required
                  value={formData.eventDetails}
                  onChange={(e) => setFormData({ ...formData, eventDetails: e.target.value })}
                  placeholder="Describe your event date, expected scale, location, MICE requirements, retail branding, or digital marketing goals..."
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 focus:border-blue-600 focus:bg-white focus:outline-none leading-relaxed"
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
              >
                {isSubmitting ? (
                  <span>Submitting Inquiry...</span>
                ) : (
                  <>
                    <span>Send Message</span>
                    <Send className="w-4 h-4 text-amber-300" />
                  </>
                )}
              </button>

              <div className="text-[11px] text-slate-500 text-center pt-1">
                Or call our Kolkata desk directly at{' '}
                <a href={`tel:${companyInfo.phone1Raw}`} className="text-blue-600 font-bold hover:underline">
                  {companyInfo.phone1}
                </a>
              </div>
            </form>
          </div>
        ) : (
          <div className="text-center py-6 space-y-4">
            <div className="w-14 h-14 rounded-full bg-emerald-50 border border-emerald-300 flex items-center justify-center mx-auto text-emerald-600">
              <CheckCircle2 className="w-7 h-7" />
            </div>
            <h4 className="text-2xl font-serif font-bold text-slate-900">
              Inquiry Received!
            </h4>
            <p className="text-xs text-slate-600 max-w-sm mx-auto font-normal">
              Thank you, {formData.name || 'valued client'}. Your inquiry docket reference is{' '}
              <strong className="text-blue-600 font-mono">{submittedDocket.id}</strong>. Our team will contact you promptly.
            </p>
            <div className="pt-2">
              <button
                onClick={onClose}
                className="px-6 py-2 rounded-xl bg-blue-600 text-white font-bold text-xs hover:bg-blue-700 cursor-pointer"
              >
                Close
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

