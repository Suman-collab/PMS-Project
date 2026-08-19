import React, { useState, useEffect, useCallback } from 'react';
import { useCms } from '../context/CmsContext';
import { PmsGalleryProject } from '../types';
import {
  Sparkles,
  MapPin,
  Layers,
  ArrowRight,
  Eye,
  Calendar,
  UserCheck,
  X,
  ZoomIn,
  ZoomOut,
  ChevronLeft,
  ChevronRight,
  RotateCcw,
  Maximize2,
  Image as ImageIcon,
  CheckCircle2,
  Share2,
} from 'lucide-react';

interface GallerySectionProps {
  onRequestProposal: (projectTitle?: string) => void;
}

export const GallerySection: React.FC<GallerySectionProps> = ({ onRequestProposal }) => {
  const { galleryProjects } = useCms();
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [selectedProject, setSelectedProject] = useState<PmsGalleryProject | null>(null);

  // Lightbox Zoom State
  const [zoomImageIndex, setZoomImageIndex] = useState<number | null>(null);
  const [zoomScale, setZoomScale] = useState<number>(1);
  const [panPosition, setPanPosition] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState<{ x: number; y: number }>({ x: 0, y: 0 });

  const categories = [
    { label: 'All Projects', value: 'all' },
    { label: 'Corporate Events', value: 'event' },
    { label: 'MICE Services', value: 'mice' },
    { label: 'Brand Activation', value: 'activation' },
    { label: 'Retail Shop Branding', value: 'branding' },
    { label: 'Outdoor Hoarding', value: 'hoarding' },
    { label: 'Digital Marketing', value: 'digital' },
    { label: 'Merchandising & Gifting', value: 'merchandising' },
  ];

  const filteredProjects =
    activeCategory === 'all'
      ? galleryProjects
      : galleryProjects.filter((p) => p.category === activeCategory);

  // Helper to retrieve all images of the active project
  const getProjectImages = (project: PmsGalleryProject): string[] => {
    if (Array.isArray(project.images) && project.images.length > 0) {
      return project.images.filter(Boolean);
    }
    return [project.image].filter(Boolean);
  };

  // Zoom handlers
  const handleOpenZoom = (index: number) => {
    setZoomImageIndex(index);
    setZoomScale(1);
    setPanPosition({ x: 0, y: 0 });
  };

  const handleCloseZoom = () => {
    setZoomImageIndex(null);
    setZoomScale(1);
    setPanPosition({ x: 0, y: 0 });
  };

  const handleZoomIn = () => {
    setZoomScale((prev) => Math.min(prev + 0.5, 3.5));
  };

  const handleZoomOut = () => {
    setZoomScale((prev) => {
      const next = Math.max(prev - 0.5, 1);
      if (next === 1) setPanPosition({ x: 0, y: 0 });
      return next;
    });
  };

  const handleResetZoom = () => {
    setZoomScale(1);
    setPanPosition({ x: 0, y: 0 });
  };

  const handleNextZoom = useCallback(() => {
    if (!selectedProject || zoomImageIndex === null) return;
    const images = getProjectImages(selectedProject);
    setZoomImageIndex((prev) => ((prev ?? 0) + 1) % images.length);
    setZoomScale(1);
    setPanPosition({ x: 0, y: 0 });
  }, [selectedProject, zoomImageIndex]);

  const handlePrevZoom = useCallback(() => {
    if (!selectedProject || zoomImageIndex === null) return;
    const images = getProjectImages(selectedProject);
    setZoomImageIndex((prev) => ((prev ?? 0) - 1 + images.length) % images.length);
    setZoomScale(1);
    setPanPosition({ x: 0, y: 0 });
  }, [selectedProject, zoomImageIndex]);

  // Keyboard navigation for zoom lightbox
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (zoomImageIndex !== null) {
        if (e.key === 'Escape') handleCloseZoom();
        else if (e.key === 'ArrowRight') handleNextZoom();
        else if (e.key === 'ArrowLeft') handlePrevZoom();
        else if (e.key === '+' || e.key === '=') handleZoomIn();
        else if (e.key === '-') handleZoomOut();
      } else if (selectedProject && e.key === 'Escape') {
        setSelectedProject(null);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [zoomImageIndex, selectedProject, handleNextZoom, handlePrevZoom]);

  // Mouse pan handlers for zoom
  const handleMouseDown = (e: React.MouseEvent) => {
    if (zoomScale > 1) {
      setIsDragging(true);
      setDragStart({ x: e.clientX - panPosition.x, y: e.clientY - panPosition.y });
    }
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (isDragging && zoomScale > 1) {
      setPanPosition({
        x: e.clientX - dragStart.x,
        y: e.clientY - dragStart.y,
      });
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  return (
    <section id="gallery" className="py-20 bg-white text-slate-900 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div className="max-w-2xl space-y-3">
            <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-widest text-blue-700 bg-blue-100/70 px-3 py-1 rounded-full border border-blue-200">
              <Layers className="w-3.5 h-3.5 text-amber-500" />
              Executed Client Portfolio
            </div>
            <h2 className="text-3xl sm:text-4xl font-serif font-bold text-slate-900 tracking-tight">
              OUR WORK & EXECUTED GALLERY
            </h2>
            <p className="text-slate-600 text-sm sm:text-base font-normal">
              Explore our real-world corporate events, MICE summits, retail shopfronts, outdoor hoardings, and creative activations. Click any case study to view its multi-angle photo gallery and high-res zoom.
            </p>
          </div>

          {/* Filter Pills */}
          <div className="flex flex-wrap gap-1.5 p-1 bg-slate-100 rounded-xl border border-slate-200 self-start md:self-auto">
            {categories.map((cat) => (
              <button
                key={cat.value}
                onClick={() => setActiveCategory(cat.value)}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                  activeCategory === cat.value
                    ? 'bg-blue-600 text-white shadow-sm'
                    : 'text-slate-600 hover:text-blue-600 hover:bg-slate-200/70'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map((project) => {
            const projectPhotos = getProjectImages(project);
            return (
              <div
                key={project.id}
                onClick={() => {
                  setSelectedProject(project);
                  setZoomImageIndex(null);
                }}
                className="bg-white rounded-2xl overflow-hidden border border-slate-200 hover:border-blue-300 transition-all duration-300 group flex flex-col justify-between cursor-pointer shadow-md hover:shadow-xl"
              >
                {/* Image Container */}
                <div className="relative h-60 overflow-hidden bg-slate-100">
                  <img
                    src={project.image || projectPhotos[0]}
                    alt={project.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/75 via-slate-950/15 to-transparent" />

                  {/* Category & Year Tags */}
                  <div className="absolute top-3 left-3 flex gap-2">
                    <span className="bg-blue-900/90 backdrop-blur-md px-3 py-0.5 rounded-full text-[10px] uppercase font-bold tracking-wider text-amber-300 border border-blue-500/30">
                      {project.categoryLabel}
                    </span>
                    <span className="bg-white/90 backdrop-blur-md px-2 py-0.5 rounded-full text-[10px] text-slate-800 font-mono font-semibold">
                      {project.year}
                    </span>
                  </div>

                  {/* Photo Count Badge */}
                  <div className="absolute top-3 right-3 bg-slate-900/80 backdrop-blur-md px-2.5 py-0.5 rounded-full text-[10px] font-bold text-white border border-white/20 flex items-center gap-1">
                    <ImageIcon className="w-3 h-3 text-amber-400" />
                    <span>{projectPhotos.length} Photos</span>
                  </div>

                  {/* Hover overlay */}
                  <div className="absolute inset-0 bg-blue-950/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center backdrop-blur-[2px]">
                    <span className="px-4 py-2 rounded-xl bg-amber-400 text-slate-950 text-xs font-bold shadow-lg flex items-center gap-1.5">
                      <Eye className="w-3.5 h-3.5" />
                      View {projectPhotos.length} Images & Case Study
                    </span>
                  </div>
                </div>

                {/* Body */}
                <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                  <div className="space-y-1.5">
                    <h3 className="text-lg font-serif font-bold text-slate-900 group-hover:text-blue-600 transition-colors">
                      {project.title}
                    </h3>
                    <div className="text-xs text-blue-700 font-semibold flex items-center justify-between">
                      <span>Client: {project.client}</span>
                      <span className="text-[11px] text-slate-400 font-normal">
                        {projectPhotos.length} angles
                      </span>
                    </div>
                    <p className="text-xs text-slate-600 font-normal leading-relaxed line-clamp-2 pt-1">
                      {project.description}
                    </p>
                  </div>

                  {/* Location & Year */}
                  {project.location && (
                    <div className="pt-3 border-t border-slate-100 text-[11px] text-slate-500 flex items-center gap-1.5">
                      <MapPin className="w-3.5 h-3.5 text-blue-600 shrink-0" />
                      <span className="truncate">{project.location}</span>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom Custom Proposal Banner */}
        <div className="mt-16 bg-gradient-to-r from-blue-900 via-blue-950 to-blue-900 border border-blue-800 rounded-2xl p-7 sm:p-9 flex flex-col sm:flex-row items-center justify-between gap-6 shadow-xl text-white">
          <div className="space-y-1.5 text-center sm:text-left">
            <span className="text-xs font-bold uppercase tracking-wider text-amber-300">
              Ready for your own custom event or campaign?
            </span>
            <h3 className="text-2xl sm:text-3xl font-serif font-bold text-white">
              Let’s Bring Your Brand Vision To Life
            </h3>
            <p className="text-xs text-blue-200 font-light">
              Turnkey stagecraft, experiential marketing, retail rollouts, and national outdoor hoardings.
            </p>
          </div>

          <button
            onClick={() => onRequestProposal()}
            className="px-6 py-3.5 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold text-xs sm:text-sm transition-all shadow-lg shadow-amber-500/20 flex items-center gap-2 shrink-0 cursor-pointer"
          >
            <span>Request Custom Proposal</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Project Details Modal with Image Grid */}
      {selectedProject && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-950/80 backdrop-blur-md animate-fadeIn overflow-y-auto">
          <div className="bg-white border border-slate-200 rounded-3xl max-w-4xl w-full max-h-[92vh] overflow-y-auto shadow-2xl p-6 sm:p-8 relative text-slate-900 space-y-6 my-auto">
            {/* Modal Header */}
            <div className="flex items-center justify-between pb-4 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <span className="px-3 py-1 rounded-full bg-blue-50 text-blue-700 border border-blue-200 text-xs font-bold uppercase tracking-wider">
                  {selectedProject.categoryLabel}
                </span>
                <span className="px-2.5 py-1 rounded-full bg-slate-100 text-slate-700 text-xs font-mono font-semibold">
                  {selectedProject.year}
                </span>
              </div>
              <button
                onClick={() => {
                  setSelectedProject(null);
                  setZoomImageIndex(null);
                }}
                className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-700 flex items-center justify-center transition-colors cursor-pointer"
                title="Close Modal"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Project Title & Overview */}
            <div className="space-y-2">
              <h3 className="text-2xl sm:text-3xl font-serif font-bold text-slate-900">
                {selectedProject.title}
              </h3>
              <div className="flex flex-wrap items-center gap-4 text-xs font-semibold text-blue-700">
                <span>Client: {selectedProject.client}</span>
                {selectedProject.location && (
                  <span className="flex items-center gap-1 text-slate-500 font-normal">
                    <MapPin className="w-3.5 h-3.5 text-blue-600" />
                    {selectedProject.location}
                  </span>
                )}
              </div>
              <p className="text-xs sm:text-sm text-slate-600 font-normal leading-relaxed pt-1">
                {selectedProject.description}
              </p>
            </div>

            {/* Image Gallery Grid (5 to 7 images) */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="text-xs font-bold uppercase tracking-wider text-slate-800 flex items-center gap-2">
                  <ImageIcon className="w-4 h-4 text-blue-600" />
                  <span>
                    Project Photo Gallery ({getProjectImages(selectedProject).length} Images)
                  </span>
                </div>
                <span className="text-[11px] text-blue-600 font-medium flex items-center gap-1">
                  <ZoomIn className="w-3.5 h-3.5" />
                  Click any image to zoom & inspect
                </span>
              </div>

              {/* Grid of Images */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 sm:gap-4">
                {getProjectImages(selectedProject).map((imgUrl, idx) => (
                  <div
                    key={idx}
                    onClick={() => handleOpenZoom(idx)}
                    className="relative group rounded-2xl overflow-hidden border border-slate-200 bg-slate-100 aspect-[4/3] cursor-pointer shadow-xs hover:shadow-md transition-all"
                  >
                    <img
                      src={imgUrl}
                      alt={`${selectedProject.title} - angle ${idx + 1}`}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-slate-950/20 group-hover:bg-slate-950/40 transition-colors" />

                    {/* Zoom Icon badge */}
                    <div className="absolute bottom-2.5 right-2.5 px-2 py-1 rounded-lg bg-white/90 backdrop-blur-md text-slate-900 text-[10px] font-bold shadow-sm opacity-90 group-hover:opacity-100 flex items-center gap-1 group-hover:bg-amber-400 transition-all">
                      <ZoomIn className="w-3 h-3" />
                      <span>Zoom</span>
                    </div>

                    <div className="absolute top-2.5 left-2.5 px-2 py-0.5 rounded-md bg-slate-900/80 text-white text-[10px] font-mono">
                      #{idx + 1}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Key Highlights */}
            {selectedProject.highlights && selectedProject.highlights.length > 0 && (
              <div className="bg-slate-50 p-5 rounded-2xl border border-slate-200 space-y-2.5">
                <div className="text-xs font-bold text-slate-900 uppercase tracking-wider flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  <span>Key Execution Highlights & Deliverables:</span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {selectedProject.highlights.map((h, i) => (
                    <span
                      key={i}
                      className="px-3 py-1.5 rounded-xl bg-white text-blue-900 font-medium text-xs border border-blue-200 shadow-2xs"
                    >
                      {h}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Modal Footer */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-slate-100">
              <span className="text-xs text-slate-500 text-center sm:text-left">
                Need similar turnkey execution or custom marketing scope?
              </span>
              <div className="flex items-center gap-3 w-full sm:w-auto">
                <button
                  onClick={() => {
                    setSelectedProject(null);
                    setZoomImageIndex(null);
                  }}
                  className="flex-1 sm:flex-none px-4 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold text-xs transition-colors cursor-pointer"
                >
                  Close
                </button>
                <button
                  onClick={() => {
                    const title = selectedProject.title;
                    setSelectedProject(null);
                    setZoomImageIndex(null);
                    onRequestProposal(title);
                  }}
                  className="flex-1 sm:flex-none px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs shadow-md shadow-blue-500/20 flex items-center justify-center gap-2 cursor-pointer"
                >
                  <span>Inquire About This Project</span>
                  <ArrowRight className="w-3.5 h-3.5 text-amber-300" />
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Full-Screen Lightbox Zoom Viewer */}
      {selectedProject && zoomImageIndex !== null && (
        <div className="fixed inset-0 z-60 bg-slate-950/95 backdrop-blur-lg flex flex-col justify-between animate-fadeIn select-none">
          {/* Top Controls Bar */}
          <div className="p-4 sm:p-6 flex items-center justify-between text-white border-b border-white/10 relative z-20">
            <div className="space-y-0.5 max-w-md">
              <div className="text-xs font-mono text-amber-400">
                Photo {zoomImageIndex + 1} of {getProjectImages(selectedProject).length}
              </div>
              <h4 className="text-sm sm:text-base font-bold text-white truncate">
                {selectedProject.title}
              </h4>
            </div>

            {/* Zoom Controls & Close */}
            <div className="flex items-center gap-2 sm:gap-3">
              {/* Zoom Buttons */}
              <div className="flex items-center bg-white/10 rounded-xl p-1 border border-white/10">
                <button
                  onClick={handleZoomOut}
                  disabled={zoomScale <= 1}
                  className={`p-2 rounded-lg text-white hover:bg-white/20 transition-all ${
                    zoomScale <= 1 ? 'opacity-40 cursor-not-allowed' : 'cursor-pointer'
                  }`}
                  title="Zoom Out (-)"
                >
                  <ZoomOut className="w-4 h-4" />
                </button>

                <span className="px-2.5 text-xs font-mono font-bold text-amber-300 min-w-[50px] text-center">
                  {Math.round(zoomScale * 100)}%
                </span>

                <button
                  onClick={handleZoomIn}
                  disabled={zoomScale >= 3.5}
                  className={`p-2 rounded-lg text-white hover:bg-white/20 transition-all ${
                    zoomScale >= 3.5 ? 'opacity-40 cursor-not-allowed' : 'cursor-pointer'
                  }`}
                  title="Zoom In (+)"
                >
                  <ZoomIn className="w-4 h-4" />
                </button>

                <button
                  onClick={handleResetZoom}
                  className="p-2 rounded-lg text-white hover:bg-white/20 transition-all ml-1 cursor-pointer"
                  title="Reset Zoom"
                >
                  <RotateCcw className="w-4 h-4" />
                </button>
              </div>

              {/* Close Lightbox */}
              <button
                onClick={handleCloseZoom}
                className="p-2.5 rounded-xl bg-white/10 hover:bg-red-500/80 text-white transition-colors cursor-pointer border border-white/10"
                title="Close Zoom (Esc)"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Main Zoom Display Stage */}
          <div
            className={`relative flex-1 flex items-center justify-center p-4 overflow-hidden ${
              zoomScale > 1 ? 'cursor-grab active:cursor-grabbing' : 'cursor-default'
            }`}
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseUp}
          >
            {/* Prev Arrow */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                handlePrevZoom();
              }}
              className="absolute left-4 sm:left-8 top-1/2 -translate-y-1/2 z-30 w-12 h-12 rounded-2xl bg-white/10 hover:bg-white/25 border border-white/20 text-white flex items-center justify-center transition-all cursor-pointer backdrop-blur-md"
              title="Previous Photo (Left Arrow)"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>

            {/* Next Arrow */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                handleNextZoom();
              }}
              className="absolute right-4 sm:right-8 top-1/2 -translate-y-1/2 z-30 w-12 h-12 rounded-2xl bg-white/10 hover:bg-white/25 border border-white/20 text-white flex items-center justify-center transition-all cursor-pointer backdrop-blur-md"
              title="Next Photo (Right Arrow)"
            >
              <ChevronRight className="w-6 h-6" />
            </button>

            {/* Scaled Image */}
            <div
              className="transition-transform duration-150 ease-out max-w-full max-h-[75vh] flex items-center justify-center"
              style={{
                transform: `scale(${zoomScale}) translate(${panPosition.x / zoomScale}px, ${
                  panPosition.y / zoomScale
                }px)`,
              }}
            >
              <img
                src={getProjectImages(selectedProject)[zoomImageIndex]}
                alt={`${selectedProject.title} enlarged photo`}
                className="max-w-[85vw] max-h-[75vh] object-contain rounded-xl shadow-2xl pointer-events-none"
                draggable={false}
              />
            </div>
          </div>

          {/* Bottom Thumbnail Strip Bar */}
          <div className="p-4 bg-slate-900/90 border-t border-white/10 backdrop-blur-md flex items-center justify-center gap-3 overflow-x-auto relative z-20">
            {getProjectImages(selectedProject).map((thumbUrl, idx) => (
              <button
                key={idx}
                onClick={() => {
                  setZoomImageIndex(idx);
                  setZoomScale(1);
                  setPanPosition({ x: 0, y: 0 });
                }}
                className={`relative w-16 h-12 rounded-xl overflow-hidden shrink-0 border-2 transition-all cursor-pointer ${
                  zoomImageIndex === idx
                    ? 'border-amber-400 scale-105 shadow-lg shadow-amber-400/20'
                    : 'border-white/20 opacity-60 hover:opacity-100 hover:border-white/40'
                }`}
              >
                <img
                  src={thumbUrl}
                  alt={`Thumbnail ${idx + 1}`}
                  className="w-full h-full object-cover"
                />
                {zoomImageIndex === idx && (
                  <div className="absolute inset-0 bg-amber-400/10" />
                )}
              </button>
            ))}
          </div>
        </div>
      )}
    </section>
  );
};
