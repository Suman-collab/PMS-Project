import React from 'react';
import { PmsService } from '../types';
import { X, CheckCircle2, ArrowRight, Sparkles, Layers, ShieldCheck } from 'lucide-react';

interface ServiceDetailModalProps {
  service: PmsService | null;
  onClose: () => void;
  onInquire: (serviceTitle: string) => void;
}

export const ServiceDetailModal: React.FC<ServiceDetailModalProps> = ({
  service,
  onClose,
  onInquire,
}) => {
  if (!service) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fadeIn">
      <div className="bg-white border border-slate-200 rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl p-6 sm:p-8 relative text-slate-900 space-y-6">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-500 hover:text-slate-900 transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-full bg-blue-100 text-blue-800 border border-blue-200 text-[10px] font-mono font-bold uppercase">
              Service Code: {service.code}
            </span>
            <span className="text-xs text-slate-500 font-semibold">
              {service.badge}
            </span>
          </div>
          <h3 className="text-2xl sm:text-3xl font-serif font-bold text-slate-900">
            {service.title}
          </h3>
          <p className="text-xs text-blue-600 font-semibold">
            {service.subtitle}
          </p>
        </div>

        {/* Image Preview */}
        <div className="h-56 sm:h-64 rounded-xl overflow-hidden border border-slate-200 shadow-inner">
          <img
            src={service.image}
            alt={service.title}
            className="w-full h-full object-cover"
          />
        </div>

        {/* Description */}
        <div className="space-y-2">
          <h4 className="text-xs uppercase tracking-wider font-bold text-slate-700">
            Overview & Strategic Scope
          </h4>
          <p className="text-xs sm:text-sm text-slate-600 font-normal leading-relaxed">
            {service.description}
          </p>
        </div>

        {/* Core Highlights */}
        <div className="space-y-2">
          <h4 className="text-xs uppercase tracking-wider font-bold text-slate-700">
            Core Disciplines
          </h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {service.coreHighlights.map((hl, i) => (
              <div key={i} className="flex items-center gap-2 text-xs text-slate-700 bg-slate-50 p-2.5 rounded-lg border border-slate-200">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>{hl}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Detailed Inclusions */}
        <div className="space-y-2">
          <h4 className="text-xs uppercase tracking-wider font-bold text-slate-700">
            Deliverable Inclusions & Execution
          </h4>
          <div className="space-y-1.5 bg-slate-50 p-4 rounded-xl border border-slate-200 text-xs text-slate-600">
            {service.detailedInclusions.map((item, idx) => (
              <div key={idx} className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-amber-500 shrink-0" />
                <span>{item}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Modal Footer CTAs */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-3 border-t border-slate-200">
          <span className="text-xs text-slate-500">
            Ready to deploy this capability for your brand?
          </span>
          <div className="flex items-center gap-2 w-full sm:w-auto">
            <button
              onClick={onClose}
              className="px-4 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-xs font-semibold text-slate-700 w-full sm:w-auto cursor-pointer"
            >
              Close
            </button>
            <button
              onClick={() => {
                const title = service.title;
                onClose();
                onInquire(title);
              }}
              className="px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs flex items-center justify-center gap-1.5 w-full sm:w-auto cursor-pointer shadow-sm"
            >
              <span>Inquire for This Service</span>
              <ArrowRight className="w-3.5 h-3.5 text-amber-300" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
