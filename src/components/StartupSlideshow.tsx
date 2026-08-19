import React, { useState, useEffect, useRef } from 'react';
import { ChevronLeft, ChevronRight, Sparkles, ArrowRight, Play, Pause } from 'lucide-react';
import { useCms } from '../context/CmsContext';

interface StartupSlideshowProps {
  onOpenContact?: (note?: string) => void;
  onExploreServices?: () => void;
}

export const StartupSlideshow: React.FC<StartupSlideshowProps> = ({
  onOpenContact,
  onExploreServices,
}) => {
  const { slides, slideshowSettings } = useCms();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [isPausedManually, setIsPausedManually] = useState(false);

  // Active slides only
  const activeSlides = slides.filter((s) => s.active !== false);

  // Ensure index is within range if slides change
  useEffect(() => {
    if (currentIndex >= activeSlides.length && activeSlides.length > 0) {
      setCurrentIndex(0);
    }
  }, [activeSlides.length, currentIndex]);

  // Autoplay rotation
  useEffect(() => {
    if (!slideshowSettings.enabled || !slideshowSettings.autoplay || activeSlides.length <= 1) {
      return;
    }
    if (isHovered || isPausedManually) {
      return;
    }

    const intervalMs = Math.max(1, slideshowSettings.intervalSeconds || 4) * 1000;
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % activeSlides.length);
    }, intervalMs);

    return () => clearInterval(timer);
  }, [
    slideshowSettings.enabled,
    slideshowSettings.autoplay,
    slideshowSettings.intervalSeconds,
    activeSlides.length,
    isHovered,
    isPausedManually,
  ]);

  if (!slideshowSettings.enabled || activeSlides.length === 0) {
    return null;
  }

  const currentSlide = activeSlides[currentIndex] || activeSlides[0];

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev === 0 ? activeSlides.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % activeSlides.length);
  };

  const handleCtaClick = (linkUrl?: string, title?: string) => {
    if (linkUrl === '#contact' && onOpenContact) {
      onOpenContact(title ? `Inquiring regarding slideshow feature: ${title}` : undefined);
    } else if (linkUrl === '#services' && onExploreServices) {
      onExploreServices();
    } else if (linkUrl && linkUrl.startsWith('#')) {
      const el = document.querySelector(linkUrl);
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    } else if (linkUrl && (linkUrl.startsWith('http') || linkUrl.startsWith('/'))) {
      window.open(linkUrl, '_blank');
    } else if (onOpenContact) {
      onOpenContact();
    }
  };

  // Height preset class
  const heightClass =
    slideshowSettings.heightDesktop === 'tall'
      ? 'h-[440px] sm:h-[540px] lg:h-[620px]'
      : slideshowSettings.heightDesktop === 'compact'
      ? 'h-[280px] sm:h-[360px] lg:h-[420px]'
      : 'h-[360px] sm:h-[460px] lg:h-[520px]'; // standard

  return (
    <div
      id="startup-slideshow"
      className="relative w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-4 pb-2"
    >
      <div
        className={`relative w-full rounded-2xl overflow-hidden shadow-xl border border-slate-200/90 bg-slate-950 ${heightClass} select-none group`}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Slides Render */}
        {activeSlides.map((slide, idx) => {
          const isActive = idx === currentIndex;
          return (
            <div
              key={slide.id}
              className={`absolute inset-0 transition-opacity duration-700 ease-in-out ${
                isActive ? 'opacity-100 z-10' : 'opacity-0 z-0 pointer-events-none'
              }`}
              aria-hidden={!isActive}
            >
              {/* Responsive Computer / Mobile Image */}
              <picture className="w-full h-full block">
                {slide.mobileImage && (
                  <source media="(max-width: 767px)" srcSet={slide.mobileImage} />
                )}
                <img
                  src={slide.desktopImage}
                  alt={slide.title || 'PMS Innovation Solutions Showcase'}
                  className="w-full h-full object-cover object-center"
                  referrerPolicy="no-referrer"
                  loading={idx === 0 ? 'eager' : 'lazy'}
                />
              </picture>

              {/* Dynamic Gradient Overlay for Readability */}
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/85 via-slate-950/40 to-transparent" />
              <div className="absolute inset-0 bg-gradient-to-r from-slate-950/60 via-transparent to-transparent hidden md:block" />

              {/* Captions Overlay (if enabled) */}
              {slideshowSettings.showCaptions && (slide.title || slide.subtitle || slide.badge) && (
                <div className="absolute inset-0 flex flex-col justify-end p-6 sm:p-10 lg:p-14 z-20 pointer-events-none">
                  <div className="max-w-2xl space-y-3 pointer-events-auto">
                    {/* Badge */}
                    {slide.badge && (
                      <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-600/90 text-amber-300 backdrop-blur-md border border-blue-400/40 text-xs font-mono font-bold uppercase tracking-wider shadow-sm">
                        <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                        <span>{slide.badge}</span>
                      </div>
                    )}

                    {/* Title */}
                    {slide.title && (
                      <h2 className="text-2xl sm:text-3xl lg:text-4xl font-serif font-black text-white leading-tight tracking-tight drop-shadow-md">
                        {slide.title}
                      </h2>
                    )}

                    {/* Subtitle */}
                    {slide.subtitle && (
                      <p className="text-xs sm:text-sm lg:text-base text-slate-200 font-normal leading-relaxed line-clamp-2 max-w-xl drop-shadow-sm">
                        {slide.subtitle}
                      </p>
                    )}

                    {/* CTA Button */}
                    {slide.buttonText && (
                      <div className="pt-2">
                        <button
                          onClick={() => handleCtaClick(slide.buttonLink, slide.title)}
                          className="px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs sm:text-sm font-bold shadow-lg shadow-blue-900/40 transition-all flex items-center gap-2 cursor-pointer hover:gap-3"
                        >
                          <span>{slide.buttonText}</span>
                          <ArrowRight className="w-4 h-4 text-amber-300" />
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          );
        })}

        {/* Previous Navigation Arrow */}
        {slideshowSettings.showArrows && activeSlides.length > 1 && (
          <button
            onClick={handlePrev}
            aria-label="Previous Slide"
            className="absolute left-3 sm:left-5 top-1/2 -translate-y-1/2 z-30 w-10 h-10 rounded-full bg-black/40 hover:bg-blue-600 text-white backdrop-blur-md border border-white/20 flex items-center justify-center transition-all duration-200 cursor-pointer shadow-md opacity-80 hover:opacity-100 hover:scale-105"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
        )}

        {/* Next Navigation Arrow */}
        {slideshowSettings.showArrows && activeSlides.length > 1 && (
          <button
            onClick={handleNext}
            aria-label="Next Slide"
            className="absolute right-3 sm:right-5 top-1/2 -translate-y-1/2 z-30 w-10 h-10 rounded-full bg-black/40 hover:bg-blue-600 text-white backdrop-blur-md border border-white/20 flex items-center justify-center transition-all duration-200 cursor-pointer shadow-md opacity-80 hover:opacity-100 hover:scale-105"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        )}

        {/* Bottom Bar: Dots and Slide Counter */}
        {activeSlides.length > 1 && (
          <div className="absolute bottom-4 left-0 right-0 z-30 flex items-center justify-between px-6 pointer-events-none">
            {/* Slide Index Counter */}
            <div className="hidden sm:flex items-center gap-1.5 px-3 py-1 rounded-full bg-black/50 backdrop-blur-md border border-white/15 text-[11px] font-mono text-white/90">
              <span className="text-amber-400 font-bold">{currentIndex + 1}</span>
              <span className="text-white/40">/</span>
              <span>{activeSlides.length}</span>
            </div>

            {/* Dot Indicators */}
            {slideshowSettings.showDots && (
              <div className="flex items-center gap-2 mx-auto sm:mx-0 pointer-events-auto bg-black/40 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/10">
                {activeSlides.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => setCurrentIndex(idx)}
                    aria-label={`Jump to slide ${idx + 1}`}
                    className={`transition-all duration-300 rounded-full cursor-pointer ${
                      idx === currentIndex
                        ? 'w-6 h-2 bg-amber-400 shadow-sm'
                        : 'w-2 h-2 bg-white/50 hover:bg-white/90'
                    }`}
                  />
                ))}
              </div>
            )}

            {/* Play/Pause Toggle Indicator */}
            {slideshowSettings.autoplay && (
              <button
                onClick={() => setIsPausedManually(!isPausedManually)}
                title={isPausedManually ? 'Resume Slideshow' : 'Pause Slideshow'}
                aria-label={isPausedManually ? 'Resume' : 'Pause'}
                className="pointer-events-auto hidden sm:flex items-center justify-center w-7 h-7 rounded-full bg-black/50 hover:bg-black/80 text-white/80 hover:text-white backdrop-blur-md border border-white/15 transition-colors cursor-pointer"
              >
                {isPausedManually ? (
                  <Play className="w-3 h-3 text-amber-400 fill-amber-400" />
                ) : (
                  <Pause className="w-3 h-3 text-white fill-white" />
                )}
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
