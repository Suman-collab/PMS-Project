import React from 'react';
import { useCms } from '../context/CmsContext';
import { PmsLogo } from './PmsLogo';
import { Phone, Mail, MapPin, Clock } from 'lucide-react';

export const Footer: React.FC = () => {
  const { companyInfo } = useCms();

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer className="bg-slate-50 text-slate-600 text-xs border-t border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          {/* Brand Col (2 Cols) */}
          <div className="lg:col-span-2 space-y-4">
            <div className="space-y-2">
              <PmsLogo className="h-12 w-auto" />
              <span className="text-[10px] tracking-wider text-blue-700 uppercase font-bold block pt-1">
                360-Degree Marketing & Corporate Event Agency
              </span>
            </div>

            <p className="text-slate-600 font-normal leading-relaxed max-w-sm">
              We are a full-service, 360-degree marketing agency built for the now. From strategy, creative, and digital to corporate events, MICE, brand activations, outdoor hoardings, and retail shop branding.
            </p>

            <div className="pt-2 space-y-1 text-slate-600">
              <p className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
                <span>{companyInfo.address}</span>
              </p>
              <p className="flex items-center gap-2 pt-1 font-mono text-slate-900 font-bold">
                <Phone className="w-3.5 h-3.5 text-blue-600 shrink-0" />
                <span>{companyInfo.phone1} / {companyInfo.phone2}</span>
              </p>
              <p className="flex items-center gap-2 text-slate-600">
                <Mail className="w-3.5 h-3.5 text-blue-600 shrink-0" />
                <span>{companyInfo.email1} / {companyInfo.email2}</span>
              </p>
            </div>
          </div>

          {/* Quick Navigation */}
          <div className="space-y-3">
            <h4 className="text-slate-900 font-serif font-bold text-sm tracking-wider uppercase">
              Quick Navigation
            </h4>
            <ul className="space-y-2 text-slate-600 font-medium">
              <li>
                <button onClick={() => scrollTo('home')} className="hover:text-blue-600 transition-colors cursor-pointer">
                  Home
                </button>
              </li>
              <li>
                <button onClick={() => scrollTo('about')} className="hover:text-blue-600 transition-colors cursor-pointer">
                  Who We Are
                </button>
              </li>
              <li>
                <button onClick={() => scrollTo('services')} className="hover:text-blue-600 transition-colors cursor-pointer">
                  Our Services
                </button>
              </li>
              <li>
                <button onClick={() => scrollTo('gallery')} className="hover:text-blue-600 transition-colors cursor-pointer">
                  Our Gallery
                </button>
              </li>
              <li>
                <button onClick={() => scrollTo('testimonials')} className="hover:text-blue-600 transition-colors cursor-pointer">
                  Client Testimonials
                </button>
              </li>
              <li>
                <button onClick={() => scrollTo('faq')} className="hover:text-blue-600 transition-colors cursor-pointer">
                  FAQ & Client Help
                </button>
              </li>
              <li>
                <button onClick={() => scrollTo('contact')} className="hover:text-blue-600 transition-colors cursor-pointer">
                  Contact Us
                </button>
              </li>
            </ul>
          </div>

          {/* Our Core Services */}
          <div className="space-y-3">
            <h4 className="text-slate-900 font-serif font-bold text-sm tracking-wider uppercase">
              Our Core Services
            </h4>
            <ul className="space-y-1.5 text-slate-600 font-normal">
              <li>• Corporate Events</li>
              <li>• MICE Services</li>
              <li>• Brand Activation</li>
              <li>• Retail Shop Branding</li>
              <li>• Hoarding & Outdoor</li>
              <li>• Digital Marketing</li>
              <li>• Merchandising & Gifting</li>
              <li>• Experiential Setup</li>
            </ul>
          </div>

          {/* Working Hours & Direct Call */}
          <div className="space-y-3">
            <h4 className="text-slate-900 font-serif font-bold text-sm tracking-wider uppercase">
              Agency Operations
            </h4>
            <div className="space-y-3 text-slate-600">
              <div className="flex items-center gap-2 text-emerald-700 font-semibold">
                <Clock className="w-4 h-4 text-emerald-600" />
                <span>{companyInfo.workingHours}</span>
              </div>
              <p className="text-[11px] text-slate-600 leading-relaxed">
                Operating pan-India with centralized command in Kolkata, West Bengal.
              </p>
              <div className="pt-2 flex flex-col gap-2">
                <a
                  href={`tel:${companyInfo.phone1Raw}`}
                  className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs shadow-sm"
                >
                  <Phone className="w-3.5 h-3.5 text-amber-300" />
                  <span>Call {companyInfo.phone1}</span>
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-14 pt-6 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-slate-500">
          <div>
            Copyright © 2026 PMS INNOVATION SOLUTIONS - All Rights Reserved.
          </div>
          <div className="flex items-center gap-4 text-slate-500">
            <span>PMS INNOVATION SOLUTIONS</span>
            <span>•</span>
            <span>Kolkata & Pan-India</span>
          </div>
        </div>
      </div>
    </footer>
  );
};


