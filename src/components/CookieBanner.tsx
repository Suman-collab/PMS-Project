import React, { useState, useEffect } from 'react';

export const CookieBanner: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem('pms_cookie_consent');
    if (!consent) {
      const timer = setTimeout(() => setIsVisible(true), 1200);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleChoice = (accepted: boolean) => {
    localStorage.setItem('pms_cookie_consent', accepted ? 'accepted' : 'declined');
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-4 left-4 right-4 sm:left-6 sm:max-w-md z-50 bg-white/95 backdrop-blur-md border border-slate-200 rounded-2xl p-5 shadow-2xl text-slate-900 text-xs animate-slideUp">
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <span className="font-serif font-black tracking-wider text-blue-700 text-xs uppercase">
            PMS INNOVATION SOLUTIONS
          </span>
          <span className="text-[10px] text-slate-400 uppercase font-mono">Cookie Policy</span>
        </div>
        <h4 className="font-bold text-sm text-slate-900">
          This website uses cookies.
        </h4>
        <p className="text-slate-600 font-normal text-[11px] leading-relaxed">
          We use cookies to analyze website traffic and optimize your website experience. By accepting our use of cookies, your data will be aggregated with all other user data.
        </p>
        <div className="flex items-center justify-end gap-3 pt-2">
          <button
            onClick={() => handleChoice(false)}
            className="px-4 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-600 hover:text-slate-900 font-medium text-xs transition-colors cursor-pointer"
          >
            Decline
          </button>
          <button
            onClick={() => handleChoice(true)}
            className="px-5 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs transition-colors shadow cursor-pointer"
          >
            Agree
          </button>
        </div>
      </div>
    </div>
  );
};
