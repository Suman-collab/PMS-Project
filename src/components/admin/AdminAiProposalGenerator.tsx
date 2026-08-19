import React, { useState } from 'react';
import {
  Sparkles,
  Send,
  Copy,
  Check,
  Printer,
  FileText,
  Building2,
  Calendar,
  DollarSign,
  Layers,
  RefreshCw,
} from 'lucide-react';
import { useCms } from '../../context/CmsContext';

export const AdminAiProposalGenerator: React.FC = () => {
  const { companyInfo } = useCms();

  const [clientName, setClientName] = useState('Tata Consultancy Services (Kolkata)');
  const [eventType, setEventType] = useState('Annual National Leadership Meet & MICE Gala');
  const [scale, setScale] = useState('450 Executive Delegates');
  const [location, setLocation] = useState('JW Marriott / Biswa Bangla Convention Centre, Kolkata');
  const [budgetRange, setBudgetRange] = useState('₹ 8.5L - ₹ 15L (Enterprise Tier)');
  const [specialRequirements, setSpecialRequirements] = useState(
    'Custom 40ft curved 3D LED Stage, Line-array sound system, RFID check-in badges, 3-camera live 4K switching, and corporate mementos.'
  );

  const [loading, setLoading] = useState(false);
  const [proposalOutput, setProposalOutput] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  const handleGenerate = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setProposalOutput(null);

    try {
      const res = await fetch('/api/ai/generate-proposal', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          clientName,
          eventType,
          scale,
          location,
          budgetRange,
          specialRequirements,
        }),
      });

      const data = await res.json();
      if (data.proposal) {
        setProposalOutput(data.proposal);
      } else if (data.fallback) {
        setProposalOutput(data.fallback);
      } else {
        setProposalOutput('Proposal generation complete. Review terms with the event director.');
      }
    } catch (err) {
      // Fallback generator
      setProposalOutput(
        `# PMS INNOVATION SOLUTIONS - Turnkey Event Proposal\n\n**Client**: ${clientName}\n**Event**: ${eventType}\n**Scale**: ${scale}\n**Venue**: ${location}\n**Budget**: ${budgetRange}\n\n## 1. Executive Summary & Creative Concept\nPMS Innovation Solutions is pleased to submit this turnkey proposal. We guarantee 360-degree event excellence with zero failure tolerance, modern stagecraft, high-definition audio visual, and corporate hospitality.\n\n## 2. Scope of Deliverables\n- **Stagecraft & AV**: 40ft Curved P2.9 High-Density LED backdrop, Line-array digital sound, moving heads & warm profiling.\n- **Delegate Journey**: Registration desks, custom lanyards, RFID quick badge check-ins.\n- **Run-of-Show Management**: Dedicated show caller, technical director, and on-ground backstage crew.\n\n## 3. Contact & Execution\nPMS Innovation Solutions | +91 98316 30072 | info@pmsinnovations.com`
      );
    } finally {
      setLoading(false);
    }
  };

  const handleCopy = () => {
    if (!proposalOutput) return;
    navigator.clipboard.writeText(proposalOutput);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Header */}
      <div>
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-50 border border-amber-200 text-amber-900 text-xs font-bold uppercase tracking-wider mb-1.5">
          <Sparkles className="w-3.5 h-3.5 text-amber-600" />
          AI Event Strategist & Commercial Quotation Engine
        </div>
        <h2 className="text-2xl font-bold font-serif text-slate-900">
          Turnkey B2B Proposal & Itinerary Generator
        </h2>
        <p className="text-xs text-slate-500">
          Powered by Gemini 3.7. Quickly draft comprehensive B2B event proposals, cost allocations, and run-of-show agendas for corporate clients.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Form Inputs (5 cols) */}
        <div className="lg:col-span-5 space-y-5">
          <form
            onSubmit={handleGenerate}
            className="p-6 rounded-3xl bg-white border border-slate-200 shadow-sm space-y-4 text-xs"
          >
            <h3 className="font-bold text-slate-900 text-sm font-serif">
              Event Specification Parameters
            </h3>

            <div>
              <label className="block font-bold text-slate-700 mb-1">Target Client / Company Name</label>
              <input
                type="text"
                required
                value={clientName}
                onChange={(e) => setClientName(e.target.value)}
                placeholder="e.g. Tata Steel / ITC Limited"
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 focus:border-blue-500 outline-none text-xs"
              />
            </div>

            <div>
              <label className="block font-bold text-slate-700 mb-1">Event / Campaign Type</label>
              <input
                type="text"
                required
                value={eventType}
                onChange={(e) => setEventType(e.target.value)}
                placeholder="e.g. Annual Dealer Meet & Product Launch"
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 focus:border-blue-500 outline-none text-xs"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block font-bold text-slate-700 mb-1">Guest Scale / Count</label>
                <input
                  type="text"
                  value={scale}
                  onChange={(e) => setScale(e.target.value)}
                  placeholder="e.g. 450 Delegates"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 focus:border-blue-500 outline-none text-xs"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Budget Target Tier</label>
                <input
                  type="text"
                  value={budgetRange}
                  onChange={(e) => setBudgetRange(e.target.value)}
                  placeholder="e.g. ₹ 8L - ₹ 12L"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 focus:border-blue-500 outline-none text-xs"
                />
              </div>
            </div>

            <div>
              <label className="block font-bold text-slate-700 mb-1">Target Venue / Location</label>
              <input
                type="text"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                placeholder="e.g. Kolkata, West Bengal"
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 focus:border-blue-500 outline-none text-xs"
              />
            </div>

            <div>
              <label className="block font-bold text-slate-700 mb-1">
                Special Deliverables & Technical Riders
              </label>
              <textarea
                rows={3}
                value={specialRequirements}
                onChange={(e) => setSpecialRequirements(e.target.value)}
                placeholder="3D Stagecraft, line array sound, celebrity emcee, video mapping..."
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 focus:border-blue-500 outline-none text-xs leading-relaxed"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-bold text-xs shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
            >
              {loading ? (
                <>
                  <RefreshCw className="w-4 h-4 animate-spin text-amber-300" />
                  <span>Drafting Turnkey Proposal...</span>
                </>
              ) : (
                <>
                  <Sparkles className="w-4 h-4 text-amber-400" />
                  <span>Generate Full Proposal</span>
                </>
              )}
            </button>
          </form>
        </div>

        {/* Generated Output Preview (7 cols) */}
        <div className="lg:col-span-7 space-y-4">
          <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-sm min-h-[500px] flex flex-col justify-between">
            <div>
              {/* Proposal Top Bar */}
              <div className="flex items-center justify-between pb-4 mb-4 border-b border-slate-100">
                <div className="flex items-center gap-2">
                  <FileText className="w-4 h-4 text-blue-600" />
                  <span className="font-bold text-slate-900 text-sm font-serif">
                    Proposal Document Preview
                  </span>
                </div>

                {proposalOutput && (
                  <div className="flex items-center gap-2">
                    <button
                      onClick={handleCopy}
                      className="px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold text-xs transition-colors flex items-center gap-1 cursor-pointer"
                    >
                      {copied ? (
                        <>
                          <Check className="w-3.5 h-3.5 text-emerald-600" />
                          <span className="text-emerald-700 font-bold">Copied!</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3.5 h-3.5" />
                          <span>Copy</span>
                        </>
                      )}
                    </button>
                    <button
                      onClick={handlePrint}
                      className="px-3 py-1.5 rounded-xl bg-blue-50 hover:bg-blue-100 text-blue-700 font-semibold text-xs transition-colors flex items-center gap-1 cursor-pointer"
                    >
                      <Printer className="w-3.5 h-3.5" />
                      <span>Print / PDF</span>
                    </button>
                  </div>
                )}
              </div>

              {/* Proposal Content Area */}
              {loading ? (
                <div className="flex flex-col items-center justify-center py-24 text-center space-y-3">
                  <div className="w-12 h-12 rounded-full border-4 border-blue-200 border-t-blue-600 animate-spin" />
                  <p className="font-bold text-slate-800 text-sm">
                    Synthesizing Creative Concept & Deliverables...
                  </p>
                  <p className="text-xs text-slate-400 max-w-sm">
                    Gemini AI is structuring stage specs, AV rider, budget breakdown, and timeline.
                  </p>
                </div>
              ) : proposalOutput ? (
                <div className="prose prose-sm max-w-none text-xs text-slate-800 space-y-3 font-normal leading-relaxed whitespace-pre-wrap font-sans">
                  {proposalOutput}
                </div>
              ) : (
                <div className="text-center py-24 text-slate-400 space-y-2">
                  <Sparkles className="w-10 h-10 mx-auto text-slate-300" />
                  <p className="font-semibold text-slate-600 text-sm">No proposal generated yet.</p>
                  <p className="text-xs text-slate-400 max-w-xs mx-auto">
                    Fill in client details on the left and click "Generate Full Proposal" to produce a ready-to-share PDF document.
                  </p>
                </div>
              )}
            </div>

            {/* Document Footer */}
            {proposalOutput && (
              <div className="pt-4 mt-6 border-t border-slate-100 text-[10px] text-slate-400 flex items-center justify-between">
                <span>PMS Innovation Solutions • Kolkata HQ</span>
                <span>Hotline: {companyInfo.phone1}</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
