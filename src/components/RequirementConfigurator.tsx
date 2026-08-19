import React, { useState } from 'react';
import { PMS_COMPANY_INFO } from '../data/pmsData';
import { Sliders, Sparkles, CheckCircle2, Phone, ArrowRight, Layers, FileText } from 'lucide-react';
import confetti from 'canvas-confetti';

interface RequirementConfiguratorProps {
  onSendSpecToTeam: (spec: {
    serviceCategory: string;
    scale: string;
    duration: string;
    addOns: string[];
    tierName: string;
  }) => void;
}

export const RequirementConfigurator: React.FC<RequirementConfiguratorProps> = ({
  onSendSpecToTeam,
}) => {
  const [serviceCategory, setServiceCategory] = useState('Corporate Event & Launch (event)');
  const [scale, setScale] = useState('100 - 300 Guests / Medium');
  const [duration, setDuration] = useState('Full Day Event (8 Hours)');
  const [selectedAddOns, setSelectedAddOns] = useState<string[]>([
    'Stage & Venue Branding',
    'AV & Technical Rigging',
  ]);

  const addOnOptions = [
    'Stage & Venue Branding',
    'AV & Technical Rigging',
    'Promoter Staffing',
    'Video & Drone Media Coverage',
    'Custom Gifting Kit',
  ];

  const handleAddOnToggle = (addon: string) => {
    setSelectedAddOns((prev) =>
      prev.includes(addon) ? prev.filter((a) => a !== addon) : [...prev, addon]
    );
  };

  const getTierName = () => {
    if (scale.includes('800+') || duration.includes('Multi-Day') || duration.includes('Multi-City')) {
      return 'Enterprise Turnkey Package';
    }
    if (scale.includes('300-800') || selectedAddOns.length >= 3) {
      return 'Executive Comprehensive Package';
    }
    return 'Standard Corporate Package';
  };

  const handleSendSpec = () => {
    confetti({
      particleCount: 50,
      spread: 60,
      origin: { y: 0.7 },
    });
    onSendSpecToTeam({
      serviceCategory,
      scale,
      duration,
      addOns: selectedAddOns,
      tierName: getTierName(),
    });
  };

  return (
    <section id="configurator" className="py-20 bg-slate-50 text-slate-900 relative border-b border-slate-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-14 space-y-3">
          <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-widest text-blue-700 bg-blue-100/70 px-3 py-1 rounded-full border border-blue-200">
            <Sliders className="w-3.5 h-3.5 text-amber-500" />
            Instant Requirement Configurator
          </div>
          <h2 className="text-3xl sm:text-4xl font-serif font-bold text-slate-900 tracking-tight">
            PLAN YOUR EVENT & MARKETING SCOPE
          </h2>
          <p className="text-slate-600 text-sm sm:text-base font-normal">
            Select your parameters below to generate an immediate scope estimate for your corporate event, MICE conference, or branding campaign.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Controls Configurator (7 Cols) */}
          <div className="lg:col-span-7 bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 space-y-6 shadow-md">
            {/* 1. Service Category */}
            <div className="space-y-2">
              <label className="block text-xs uppercase tracking-wider font-bold text-slate-700">
                1. Service Category
              </label>
              <select
                value={serviceCategory}
                onChange={(e) => setServiceCategory(e.target.value)}
                className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 text-xs sm:text-sm focus:border-blue-600 focus:bg-white focus:outline-none"
              >
                <option value="Corporate Event & Launch (event)">Corporate Event & Launch (event)</option>
                <option value="MICE Conference & Trips (mice)">MICE Conference & Trips (mice)</option>
                <option value="Brand Activation & Experiential (activation)">Brand Activation & Experiential (activation)</option>
                <option value="Retail Shop Branding (branding)">Retail Shop Branding (branding)</option>
                <option value="Hoarding & Outdoor Advertising (hoarding)">Hoarding & Outdoor Advertising (hoarding)</option>
                <option value="Digital Marketing & Campaigns (digital)">Digital Marketing & Campaigns (digital)</option>
                <option value="Merchandising & Corporate Gifting (merchandising)">Merchandising & Corporate Gifting (merchandising)</option>
              </select>
            </div>

            {/* 2. Expected Scale / Audience */}
            <div className="space-y-2">
              <label className="block text-xs uppercase tracking-wider font-bold text-slate-700">
                2. Expected Scale / Audience
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {[
                  '50 - 100 Guests / Small',
                  '100 - 300 Guests / Medium',
                  '300 - 800 Guests / Large',
                  '800+ Enterprise Scale',
                ].map((sc) => (
                  <button
                    key={sc}
                    type="button"
                    onClick={() => setScale(sc)}
                    className={`p-2.5 rounded-xl border text-left text-xs transition-all cursor-pointer ${
                      scale === sc
                        ? 'border-blue-600 bg-blue-50 text-blue-900 font-bold shadow-2xs'
                        : 'border-slate-200 bg-slate-50 text-slate-600 hover:border-slate-300 hover:bg-slate-100'
                    }`}
                  >
                    {sc}
                  </button>
                ))}
              </div>
            </div>

            {/* 3. Duration / Timeline */}
            <div className="space-y-2">
              <label className="block text-xs uppercase tracking-wider font-bold text-slate-700">
                3. Duration / Timeline
              </label>
              <select
                value={duration}
                onChange={(e) => setDuration(e.target.value)}
                className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 text-xs sm:text-sm focus:border-blue-600 focus:bg-white focus:outline-none"
              >
                <option value="Half Day Event (4 Hours)">Half Day Event (4 Hours)</option>
                <option value="Full Day Event (8 Hours)">Full Day Event (8 Hours)</option>
                <option value="Multi-Day Conference (2-3 Days)">Multi-Day Conference (2-3 Days)</option>
                <option value="1-Month Branding Campaign">1-Month Branding Campaign</option>
                <option value="Multi-City Roadshow / Tour">Multi-City Roadshow / Tour</option>
              </select>
            </div>

            {/* 4. Add-On Services */}
            <div className="space-y-2">
              <label className="block text-xs uppercase tracking-wider font-bold text-slate-700">
                4. Add-On Services
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {addOnOptions.map((addon) => {
                  const isChecked = selectedAddOns.includes(addon);
                  return (
                    <button
                      key={addon}
                      type="button"
                      onClick={() => handleAddOnToggle(addon)}
                      className={`p-3 rounded-xl border text-left text-xs transition-all flex items-center gap-2.5 cursor-pointer ${
                        isChecked
                          ? 'border-blue-600 bg-blue-50 text-blue-900 font-semibold shadow-2xs'
                          : 'border-slate-200 bg-slate-50 text-slate-600 hover:border-slate-300'
                      }`}
                    >
                      <div
                        className={`w-4 h-4 rounded flex items-center justify-center border ${
                          isChecked
                            ? 'bg-blue-600 border-blue-600 text-white'
                            : 'border-slate-300 bg-white'
                        }`}
                      >
                        {isChecked && <CheckCircle2 className="w-3.5 h-3.5" />}
                      </div>
                      <span>{addon}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Result Box (5 Cols) */}
          <div className="lg:col-span-5 bg-gradient-to-br from-blue-900 via-blue-950 to-blue-900 border border-blue-800 rounded-2xl p-6 sm:p-8 space-y-6 shadow-xl sticky top-28 text-white">
            <div className="flex items-center justify-between pb-3 border-b border-blue-800/80">
              <span className="text-xs uppercase tracking-wider font-bold text-amber-300 flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                Estimated Solution Tier
              </span>
              <span className="text-[10px] px-2.5 py-0.5 rounded bg-emerald-500/20 text-emerald-300 border border-emerald-400/40 font-mono font-bold">
                Ready for Quotation
              </span>
            </div>

            {/* Package Heading */}
            <div className="space-y-1">
              <h3 className="text-2xl sm:text-3xl font-serif font-black text-white">
                {getTierName()}
              </h3>
              <p className="text-xs text-blue-200 font-light">
                Custom turnkey proposal prepared by PMS Innovation Solutions experts.
              </p>
            </div>

            {/* Included Core Services */}
            <div className="bg-blue-950/80 p-4 rounded-xl border border-blue-800/80 space-y-2.5 text-xs text-blue-100">
              <div className="font-bold text-white uppercase tracking-wider text-[11px]">
                Included Core Services:
              </div>
              <div className="space-y-1.5">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Concept development & event planning</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Logistics & technical on-site coordination</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Dedicated account management & reporting</span>
                </div>
              </div>
            </div>

            {/* Direct Phone Notice */}
            <div className="text-xs text-blue-200 leading-relaxed">
              Call us directly at{' '}
              <a
                href={`tel:${PMS_COMPANY_INFO.phone1Raw}`}
                className="text-amber-300 font-bold hover:underline"
              >
                {PMS_COMPANY_INFO.phone1}
              </a>{' '}
              or submit this configuration for an official quotation.
            </div>

            {/* CTA Button */}
            <button
              onClick={handleSendSpec}
              className="w-full py-3.5 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold text-sm transition-all shadow-lg shadow-amber-500/20 flex items-center justify-center gap-2 cursor-pointer"
            >
              <span>Send Spec To Team PMS</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
