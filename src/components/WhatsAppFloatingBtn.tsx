import React from 'react';
import { useCms } from '../context/CmsContext';
import { MessageSquare } from 'lucide-react';

export const WhatsAppFloatingBtn: React.FC = () => {
  const { companyInfo } = useCms();

  const handleClick = () => {
    const text = encodeURIComponent(
      `Hello PMS Innovation Solutions! I am visiting your website and would like to inquire about your 360° Marketing, Corporate Event Management, and Retail Branding services.`
    );
    window.open(`https://wa.me/${companyInfo.phone1Raw}?text=${text}`, '_blank');
  };

  return (
    <button
      onClick={handleClick}
      id="floating-whatsapp-btn"
      className="fixed bottom-6 right-6 z-40 p-3.5 sm:px-4 sm:py-3 rounded-full bg-emerald-600 hover:bg-emerald-500 text-white font-bold shadow-2xl shadow-emerald-600/40 hover:scale-105 active:scale-95 transition-all flex items-center gap-2 group cursor-pointer border border-emerald-400/40"
      title="Message PMS Innovation Solutions on WhatsApp"
    >
      <div className="relative">
        <MessageSquare className="w-5 h-5 fill-white" />
        <span className="w-2.5 h-2.5 rounded-full bg-amber-400 border-2 border-emerald-600 absolute -top-1 -right-1 animate-ping" />
      </div>
      <span className="text-xs tracking-wide hidden sm:inline">
        WhatsApp Us ({companyInfo.phone1})
      </span>
    </button>
  );
};

