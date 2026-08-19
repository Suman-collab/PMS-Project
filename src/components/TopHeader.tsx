import React from 'react';
import { useCms } from '../context/CmsContext';
import { Phone, Mail, Clock } from 'lucide-react';
import { PmsLogoMark } from './PmsLogo';

export const TopHeader: React.FC = () => {
  const { companyInfo, setIsAdminOpen } = useCms();

  return (
    <header className="bg-blue-950 text-blue-100 text-xs border-b border-blue-900 py-2 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-wrap items-center justify-between gap-3">
        {/* Left: Contact Numbers & Email */}
        <div className="flex flex-wrap items-center gap-4 text-[11px] sm:text-xs">
          <a
            href={`tel:${companyInfo.phone1Raw}`}
            className="flex items-center gap-1.5 hover:text-amber-300 transition-colors font-medium text-white"
          >
            <Phone className="w-3.5 h-3.5 text-amber-400" />
            <span>{companyInfo.phone1}</span>
          </a>
          <span className="text-blue-700 hidden sm:inline">|</span>
          <a
            href={`tel:${companyInfo.phone2Raw}`}
            className="flex items-center gap-1.5 hover:text-amber-300 transition-colors font-medium text-white hidden sm:flex"
          >
            <Phone className="w-3.5 h-3.5 text-amber-400" />
            <span>{companyInfo.phone2}</span>
          </a>
          <span className="text-blue-700 hidden md:inline">|</span>
          <a
            href={`mailto:${companyInfo.email1}`}
            className="flex items-center gap-1.5 hover:text-amber-300 transition-colors hidden md:flex text-blue-200"
          >
            <Mail className="w-3.5 h-3.5 text-amber-400" />
            <span>{companyInfo.email1}</span>
          </a>
        </div>

        {/* Right: Badge, Working Hours & Desktop Top-Right Small Logo Secret Trigger */}
        <div className="flex items-center gap-3 text-[11px] sm:text-xs ml-auto">
          <span className="px-2.5 py-0.5 rounded-full bg-amber-400 text-slate-950 font-bold tracking-wider uppercase text-[10px]">
            360° Marketing Agency
          </span>
          <div className="flex items-center gap-1.5 text-amber-300 font-medium hidden sm:flex">
            <Clock className="w-3.5 h-3.5 text-amber-400" />
            <span>{companyInfo.workingHours}</span>
          </div>

          {/* Secret Small Logo in Top Right Corner (Desktop Only) */}
          <button
            id="desktop-admin-secret-trigger"
            onClick={() => setIsAdminOpen(true)}
            className="hidden md:inline-flex items-center justify-center p-1 rounded-md hover:bg-blue-900/60 transition-colors cursor-pointer ml-1 opacity-80 hover:opacity-100"
            title="PMS Innovation"
            aria-label="Security Access"
          >
            <PmsLogoMark className="w-4 h-4" variant="white" />
          </button>
        </div>
      </div>
    </header>
  );
};


