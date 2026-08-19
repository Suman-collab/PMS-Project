import React, { useState } from 'react';
import { useCms } from '../context/CmsContext';
import { PmsLogo } from './PmsLogo';
import { MessageSquare, Menu, X, ArrowRight } from 'lucide-react';

interface NavbarProps {
  onOpenContact: (prefillNote?: string) => void;
  onOpenConfigurator: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenContact }) => {
  const { companyInfo } = useCms();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { label: 'Home', href: '#home' },
    { label: 'Who We Are', href: '#about' },
    { label: 'Our Services', href: '#services' },
    { label: 'Gallery', href: '#gallery' },
    { label: 'Testimonials', href: '#testimonials' },
    { label: 'FAQ', href: '#faq' },
    { label: 'Contact Us', href: '#contact' },
  ];

  const handleNavClick = (href: string) => {
    setMobileMenuOpen(false);
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const openWhatsApp = () => {
    const message = encodeURIComponent(
      `Hello PMS Innovation Solutions! I am interested in your 360° Marketing and Corporate Event Management services.`
    );
    window.open(`https://wa.me/${companyInfo.phone1Raw}?text=${message}`, '_blank');
  };

  return (
    <nav className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Brand Logo */}
          <a
            href="#home"
            className="flex items-center gap-3 group text-left cursor-pointer py-1"
          >
            <PmsLogo className="h-10 sm:h-12 w-auto" />
          </a>

          {/* Desktop Nav Links */}
          <div className="hidden lg:flex items-center gap-7">
            {navLinks.map((link) => (
              <button
                key={link.label}
                onClick={() => handleNavClick(link.href)}
                className="text-xs uppercase tracking-wider font-bold text-slate-700 hover:text-blue-600 transition-colors cursor-pointer"
              >
                {link.label}
              </button>
            ))}
          </div>

          {/* Action CTAs */}
          <div className="hidden sm:flex items-center gap-3">
            {/* WhatsApp CTA */}
            <button
              onClick={openWhatsApp}
              className="px-3.5 py-2 rounded-xl bg-emerald-50 hover:bg-emerald-100 text-emerald-700 border border-emerald-300 text-xs font-bold flex items-center gap-1.5 transition-all shadow-sm cursor-pointer"
            >
              <MessageSquare className="w-3.5 h-3.5 fill-emerald-600 text-emerald-600" />
              <span>WhatsApp</span>
            </button>

            {/* Contact Us CTA */}
            <button
              onClick={() => onOpenContact()}
              className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs shadow-md shadow-blue-500/20 transition-all flex items-center gap-1.5 cursor-pointer hover:shadow-lg"
            >
              <span>Contact Us</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="lg:hidden flex items-center gap-2">
            <button
              onClick={openWhatsApp}
              className="p-2 rounded-xl bg-emerald-50 text-emerald-700 border border-emerald-300 text-xs font-semibold flex sm:hidden"
            >
              <MessageSquare className="w-4 h-4 fill-emerald-600 text-emerald-600" />
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2.5 rounded-xl bg-slate-100 text-slate-700 hover:text-slate-900 hover:bg-slate-200"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white border-b border-slate-200 px-4 pt-3 pb-6 space-y-4 animate-fadeIn shadow-lg">
          <div className="flex flex-col space-y-1">
            {navLinks.map((link) => (
              <button
                key={link.label}
                onClick={() => handleNavClick(link.href)}
                className="px-3 py-2.5 rounded-lg text-left text-sm font-bold text-slate-700 hover:bg-blue-50 hover:text-blue-600 transition-colors"
              >
                {link.label}
              </button>
            ))}
          </div>

          <div className="pt-3 border-t border-slate-200 flex flex-col gap-2.5">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                openWhatsApp();
              }}
              className="w-full py-2.5 rounded-xl bg-emerald-600 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-sm"
            >
              <MessageSquare className="w-4 h-4 fill-white" />
              <span>Connect on WhatsApp ({companyInfo.phone1})</span>
            </button>

            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenContact();
              }}
              className="w-full py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs flex items-center justify-center gap-1.5 shadow-md"
            >
              <span>Get In Touch / Book Consultation</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
    </nav>
  );
};

