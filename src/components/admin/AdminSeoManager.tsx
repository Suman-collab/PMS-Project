import React, { useState } from 'react';
import {
  Globe,
  Search,
  Share2,
  CheckCircle2,
  AlertCircle,
  Copy,
  Check,
  RefreshCw,
  Eye,
  Smartphone,
  Monitor,
  Code2,
  FileCode,
  ShieldCheck,
  Sparkles,
  ExternalLink,
  Upload,
  Download,
  Info,
  HelpCircle,
} from 'lucide-react';
import { useCms } from '../../context/CmsContext';
import { PmsSeoSettings } from '../../types';

export const AdminSeoManager: React.FC = () => {
  const { seoSettings, updateSeoSettings, resetSeoSettings, companyInfo } = useCms();
  const [formData, setFormData] = useState<PmsSeoSettings>({ ...seoSettings });
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [previewDevice, setPreviewDevice] = useState<'desktop' | 'mobile'>('desktop');
  const [activeTab, setActiveTab] = useState<'meta' | 'social' | 'google-tools' | 'schema' | 'sitemap'>('meta');
  const [copiedCode, setCopiedCode] = useState<string | null>(null);

  // Sync if context updates
  React.useEffect(() => {
    setFormData({ ...seoSettings });
  }, [seoSettings]);

  const handleChange = (field: keyof PmsSeoSettings, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    updateSeoSettings(formData);
    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 3000);
  };

  const handleAddKeyword = (kw: string) => {
    const currentKeywords = formData.metaKeywords
      ? formData.metaKeywords.split(',').map((k) => k.trim())
      : [];
    if (!currentKeywords.includes(kw)) {
      const updated = [...currentKeywords, kw].join(', ');
      handleChange('metaKeywords', updated);
    }
  };

  const handleCopy = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedCode(id);
    setTimeout(() => setCopiedCode(null), 2000);
  };

  // Image Upload simulation
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>, field: 'ogImage' | 'twitterImage') => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        if (typeof reader.result === 'string') {
          handleChange(field, reader.result);
          if (field === 'ogImage' && !formData.twitterImage) {
            handleChange('twitterImage', reader.result);
          }
        }
      };
      reader.readAsDataURL(file);
    }
  };

  // Preset keywords recommendations
  const recommendedKeywords = [
    'Corporate Event Management',
    'Event Management Kolkata',
    'MICE Services India',
    'Brand Activation Agency',
    'Retail Shop Branding',
    'Outdoor Hoardings Kolkata',
    'Digital Marketing Agency',
    'Corporate Gifting Kolkata',
    'Stage Setup & LED Wall',
    'Dealer Meets & Galas',
  ];

  // Calculate SEO Health Score
  const titleLength = formData.metaTitle.length;
  const descLength = formData.metaDescription.length;
  const hasKeywords = formData.metaKeywords.split(',').filter(Boolean).length >= 5;
  const hasOgImage = Boolean(formData.ogImage);
  const isIndexed = formData.robotsIndexing.includes('index');
  const hasCanonical = Boolean(formData.canonicalUrl);
  const hasSchema = formData.structuredDataEnabled;

  let seoScore = 0;
  if (titleLength >= 40 && titleLength <= 70) seoScore += 20;
  else if (titleLength > 0) seoScore += 10;

  if (descLength >= 120 && descLength <= 170) seoScore += 25;
  else if (descLength > 0) seoScore += 12;

  if (hasKeywords) seoScore += 15;
  if (hasOgImage) seoScore += 15;
  if (isIndexed) seoScore += 10;
  if (hasCanonical) seoScore += 5;
  if (hasSchema) seoScore += 10;

  // Generated JSON-LD Schema
  const jsonLdSchema = {
    '@context': 'https://schema.org',
    '@type': formData.businessType || 'LocalBusiness',
    name: formData.businessName || companyInfo.name,
    description: formData.metaDescription,
    url: formData.canonicalUrl || 'https://pmsinnovations.com',
    image: formData.ogImage,
    telephone: companyInfo.phone1,
    email: companyInfo.email1,
    address: {
      '@type': 'PostalAddress',
      streetAddress: companyInfo.address,
      addressLocality: 'Kolkata',
      addressRegion: 'West Bengal',
      postalCode: '700107',
      addressCountry: 'IN',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: 22.5126,
      longitude: 88.4042,
    },
    openingHoursSpecification: {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
      opens: '10:00',
      closes: '19:00',
    },
    priceRange: formData.priceRange || '$$',
    areaServed: ['Kolkata', 'West Bengal', 'Eastern India', 'Pan India'],
    sameAs: [
      'https://www.facebook.com',
      'https://www.instagram.com',
      'https://www.linkedin.com',
    ],
  };

  const robotsTxtContent = `User-agent: *
Allow: /
Sitemap: ${formData.canonicalUrl || 'https://pmsinnovations.com'}/sitemap.xml

# Disallow indexing for internal admin routes
Disallow: /admin
Disallow: /api/`;

  const sitemapXmlContent = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>${formData.canonicalUrl || 'https://pmsinnovations.com'}/</loc>
    <lastmod>${new Date().toISOString().slice(0, 10)}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>1.0</priority>
  </url>
  <url>
    <loc>${formData.canonicalUrl || 'https://pmsinnovations.com'}#services</loc>
    <lastmod>${new Date().toISOString().slice(0, 10)}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.9</priority>
  </url>
  <url>
    <loc>${formData.canonicalUrl || 'https://pmsinnovations.com'}#gallery</loc>
    <lastmod>${new Date().toISOString().slice(0, 10)}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>
  <url>
    <loc>${formData.canonicalUrl || 'https://pmsinnovations.com'}#about</loc>
    <lastmod>${new Date().toISOString().slice(0, 10)}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.7</priority>
  </url>
  <url>
    <loc>${formData.canonicalUrl || 'https://pmsinnovations.com'}#contact</loc>
    <lastmod>${new Date().toISOString().slice(0, 10)}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>
</urlset>`;

  const downloadFile = (content: string, filename: string, type: string) => {
    const blob = new Blob([content], { type });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-8 animate-fadeIn" id="admin-seo-manager">
      {/* Header Banner */}
      <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 text-xs font-semibold uppercase tracking-wider">
            <Search className="w-3.5 h-3.5" />
            Google Indexing & Search Engine Optimization
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
            SEO & Google Crawling Suite
          </h1>
          <p className="text-slate-500 text-sm max-w-2xl">
            Control all meta tags, keyword ranking signals, Open Graph social share cards, Google search snippets, and JSON-LD structured schemas in real-time.
          </p>
        </div>

        {/* Health Score Pill */}
        <div className="flex items-center gap-4 bg-slate-50 p-4 rounded-2xl border border-slate-200">
          <div className="text-center">
            <div className="text-2xl font-black text-emerald-600">{seoScore}%</div>
            <div className="text-[11px] font-semibold uppercase text-slate-400">SEO Health</div>
          </div>
          <div className="h-10 w-px bg-slate-200" />
          <div className="text-xs text-slate-600 space-y-1">
            <div className="flex items-center gap-1.5 font-medium text-emerald-700">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" /> Googlebot Ready
            </div>
            <div className="text-slate-400">Schema Active & Valid</div>
          </div>
        </div>
      </div>

      {/* Live Google Search Preview Card */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
        <div className="p-4 sm:p-6 border-b border-slate-100 flex flex-wrap items-center justify-between gap-4 bg-slate-50/50">
          <div className="flex items-center gap-2">
            <Globe className="w-4 h-4 text-blue-600" />
            <h2 className="text-sm font-bold text-slate-800 uppercase tracking-wider">
              Live Google Search (SERP) Simulator
            </h2>
          </div>

          <div className="flex items-center gap-2 bg-white p-1 rounded-xl border border-slate-200 shadow-2xs">
            <button
              type="button"
              onClick={() => setPreviewDevice('desktop')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                previewDevice === 'desktop'
                  ? 'bg-slate-900 text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Monitor className="w-3.5 h-3.5" /> Desktop
            </button>
            <button
              type="button"
              onClick={() => setPreviewDevice('mobile')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                previewDevice === 'mobile'
                  ? 'bg-slate-900 text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Smartphone className="w-3.5 h-3.5" /> Mobile
            </button>
          </div>
        </div>

        {/* Search Result Visualizer */}
        <div className="p-6 sm:p-8 bg-[#f8f9fa] flex justify-center">
          <div
            className={`w-full bg-white p-5 rounded-2xl shadow-xs border border-slate-200/80 transition-all ${
              previewDevice === 'mobile' ? 'max-w-md' : 'max-w-2xl'
            }`}
          >
            {/* Google Result Header */}
            <div className="flex items-center gap-3 mb-2">
              <div className="w-7 h-7 rounded-full bg-slate-100 border border-slate-200 flex items-center justify-center text-xs font-bold text-slate-700">
                PMS
              </div>
              <div className="flex flex-col">
                <span className="text-xs text-slate-800 font-medium leading-none">
                  PMS Innovation Solutions
                </span>
                <span className="text-[11px] text-slate-500 truncate max-w-[280px]">
                  {formData.canonicalUrl || 'https://pmsinnovations.com'}
                </span>
              </div>
            </div>

            {/* Google Result Title */}
            <h3 className="text-lg sm:text-xl font-medium text-[#1a0dab] hover:underline cursor-pointer leading-snug line-clamp-2">
              {formData.metaTitle || 'PMS Innovation Solutions | Corporate Events & 360° Marketing Agency Kolkata'}
            </h3>

            {/* Google Result Description */}
            <p className="mt-1 text-sm text-[#4d5156] leading-relaxed line-clamp-3">
              {formData.metaDescription ||
                'PMS Innovation Solutions is a leading corporate event management and 360° marketing agency in Kolkata. We handle corporate events, MICE conferences, brand activations, retail shop branding, outdoor hoardings, and gifts across India.'}
            </p>

            {/* Simulated Sitelinks */}
            <div className="mt-3 pt-3 border-t border-slate-100 grid grid-cols-2 gap-2 text-xs">
              <div className="text-[#1a0dab] hover:underline cursor-pointer font-medium">
                • Corporate Events & MICE
              </div>
              <div className="text-[#1a0dab] hover:underline cursor-pointer font-medium">
                • Retail Shop Branding
              </div>
              <div className="text-[#1a0dab] hover:underline cursor-pointer font-medium">
                • Outdoor Hoardings Kolkata
              </div>
              <div className="text-[#1a0dab] hover:underline cursor-pointer font-medium">
                • Request Quote & Contact
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Tabs Navigation */}
      <div className="flex flex-wrap gap-2 border-b border-slate-200 pb-2">
        <button
          onClick={() => setActiveTab('meta')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all ${
            activeTab === 'meta'
              ? 'bg-slate-900 text-white shadow-sm'
              : 'bg-white text-slate-600 hover:bg-slate-50 border border-slate-200'
          }`}
        >
          <Search className="w-4 h-4" /> Core Meta & Keywords
        </button>

        <button
          onClick={() => setActiveTab('social')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all ${
            activeTab === 'social'
              ? 'bg-slate-900 text-white shadow-sm'
              : 'bg-white text-slate-600 hover:bg-slate-50 border border-slate-200'
          }`}
        >
          <Share2 className="w-4 h-4" /> Social Share (OG & Twitter)
        </button>

        <button
          onClick={() => setActiveTab('google-tools')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all ${
            activeTab === 'google-tools'
              ? 'bg-slate-900 text-white shadow-sm'
              : 'bg-white text-slate-600 hover:bg-slate-50 border border-slate-200'
          }`}
        >
          <Globe className="w-4 h-4" /> Google Verification & Analytics
        </button>

        <button
          onClick={() => setActiveTab('schema')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all ${
            activeTab === 'schema'
              ? 'bg-slate-900 text-white shadow-sm'
              : 'bg-white text-slate-600 hover:bg-slate-50 border border-slate-200'
          }`}
        >
          <Code2 className="w-4 h-4" /> JSON-LD Schema (Rich Results)
        </button>

        <button
          onClick={() => setActiveTab('sitemap')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all ${
            activeTab === 'sitemap'
              ? 'bg-slate-900 text-white shadow-sm'
              : 'bg-white text-slate-600 hover:bg-slate-50 border border-slate-200'
          }`}
        >
          <FileCode className="w-4 h-4" /> Robots.txt & Sitemap
        </button>
      </div>

      {/* Form Area */}
      <form onSubmit={handleSave} className="space-y-6">
        {/* Tab 1: Core Meta Tags */}
        {activeTab === 'meta' && (
          <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-xs space-y-6">
            <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
              <Search className="w-5 h-5 text-blue-600" />
              Meta Tags & Primary Search Keyword Signals
            </h2>

            {/* Meta Title */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                  Page Meta Title (`&lt;title&gt;`) <span className="text-red-500">*</span>
                </label>
                <span
                  className={`text-xs font-semibold ${
                    titleLength >= 50 && titleLength <= 65
                      ? 'text-emerald-600'
                      : titleLength > 65
                      ? 'text-amber-600'
                      : 'text-slate-400'
                  }`}
                >
                  {titleLength} / 60 characters (Optimal: 50–65)
                </span>
              </div>
              <input
                type="text"
                required
                value={formData.metaTitle}
                onChange={(e) => handleChange('metaTitle', e.target.value)}
                className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50/50 text-slate-900 text-sm focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all font-medium"
                placeholder="PMS Innovation Solutions | Corporate Events & 360° Marketing Agency Kolkata"
              />
              <p className="text-xs text-slate-400">
                This is the primary headline that appears on Google search results and browser tabs.
              </p>
            </div>

            {/* Meta Description */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                  Meta Description (`&lt;meta name="description"&gt;`) <span className="text-red-500">*</span>
                </label>
                <span
                  className={`text-xs font-semibold ${
                    descLength >= 130 && descLength <= 165
                      ? 'text-emerald-600'
                      : descLength > 165
                      ? 'text-amber-600'
                      : 'text-slate-400'
                  }`}
                >
                  {descLength} / 160 characters (Optimal: 130–165)
                </span>
              </div>
              <textarea
                rows={3}
                required
                value={formData.metaDescription}
                onChange={(e) => handleChange('metaDescription', e.target.value)}
                className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50/50 text-slate-900 text-sm focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all leading-relaxed"
                placeholder="PMS Innovation Solutions is a leading corporate event management and 360° marketing agency in Kolkata..."
              />
              <p className="text-xs text-slate-400">
                Brief, compelling summary that convinces searchers to click when reading search snippets on Google.
              </p>
            </div>

            {/* Meta Keywords */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                  Meta Keywords (Comma-Separated)
                </label>
                <span className="text-xs text-slate-400 font-medium">
                  {formData.metaKeywords.split(',').filter(Boolean).length} keywords added
                </span>
              </div>
              <textarea
                rows={3}
                value={formData.metaKeywords}
                onChange={(e) => handleChange('metaKeywords', e.target.value)}
                className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50/50 text-slate-900 text-sm focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                placeholder="corporate event management, event management kolkata, corporate events, MICE services..."
              />

              {/* Quick Add Keyword Chips */}
              <div className="space-y-2 pt-1">
                <span className="text-xs font-semibold text-slate-500 flex items-center gap-1">
                  <Sparkles className="w-3.5 h-3.5 text-amber-500" /> 1-Click Popular Keywords Suggestions:
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {recommendedKeywords.map((kw) => (
                    <button
                      key={kw}
                      type="button"
                      onClick={() => handleAddKeyword(kw)}
                      className="px-2.5 py-1 rounded-lg bg-slate-100 hover:bg-blue-50 hover:text-blue-700 text-slate-700 text-xs font-medium border border-slate-200 transition-all"
                    >
                      + {kw}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Canonical URL & Author */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                  Canonical URL
                </label>
                <input
                  type="url"
                  value={formData.canonicalUrl}
                  onChange={(e) => handleChange('canonicalUrl', e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 bg-slate-50/50 text-slate-900 text-sm focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="https://pmsinnovations.com"
                />
              </div>

              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                  Publisher / Author
                </label>
                <input
                  type="text"
                  value={formData.author}
                  onChange={(e) => handleChange('author', e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 bg-slate-50/50 text-slate-900 text-sm focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="PMS Innovation Solutions"
                />
              </div>
            </div>

            {/* Robots Indexing Directive */}
            <div className="space-y-2 pt-2 border-t border-slate-100">
              <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                Search Engine Robots Directive (`robots`)
              </label>
              <select
                value={formData.robotsIndexing}
                onChange={(e) => handleChange('robotsIndexing', e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl border border-slate-200 bg-white text-slate-900 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="index, follow">index, follow (Standard: Index on Google & Follow all links)</option>
                <option value="noindex, follow">noindex, follow (Hide from Google Search, follow links)</option>
                <option value="index, nofollow">index, nofollow (Index page on Google, do not follow links)</option>
                <option value="noindex, nofollow">noindex, nofollow (Block crawlers completely)</option>
              </select>
            </div>
          </div>
        )}

        {/* Tab 2: Social Media (Open Graph & Twitter) */}
        {activeTab === 'social' && (
          <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-xs space-y-6">
            <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
              <Share2 className="w-5 h-5 text-blue-600" />
              Social Media Open Graph & Twitter Sharing Cards
            </h2>

            {/* Social Live Card Preview */}
            <div className="bg-slate-50 p-5 rounded-2xl border border-slate-200 space-y-3">
              <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                Facebook / LinkedIn / WhatsApp Preview Card:
              </span>
              <div className="max-w-md mx-auto bg-white rounded-xl overflow-hidden border border-slate-200 shadow-xs">
                {formData.ogImage ? (
                  <img
                    src={formData.ogImage}
                    alt="Social Card Preview"
                    className="w-full h-44 object-cover"
                  />
                ) : (
                  <div className="w-full h-44 bg-slate-100 flex items-center justify-center text-slate-400 text-xs font-semibold">
                    No Social Cover Image Uploaded
                  </div>
                )}
                <div className="p-4 space-y-1 bg-white">
                  <div className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
                    {formData.canonicalUrl || 'pmsinnovations.com'}
                  </div>
                  <div className="text-sm font-bold text-slate-900 line-clamp-1">
                    {formData.ogTitle || formData.metaTitle}
                  </div>
                  <div className="text-xs text-slate-500 line-clamp-2">
                    {formData.ogDescription || formData.metaDescription}
                  </div>
                </div>
              </div>
            </div>

            {/* OG Title & Site Name */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                  Open Graph Title (`og:title`)
                </label>
                <input
                  type="text"
                  value={formData.ogTitle}
                  onChange={(e) => handleChange('ogTitle', e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 bg-slate-50/50 text-slate-900 text-sm focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="PMS Innovation Solutions | Corporate Events & Marketing"
                />
              </div>

              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                  Site Name (`og:site_name`)
                </label>
                <input
                  type="text"
                  value={formData.ogSiteName}
                  onChange={(e) => handleChange('ogSiteName', e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 bg-slate-50/50 text-slate-900 text-sm focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="PMS Innovation Solutions"
                />
              </div>
            </div>

            {/* OG Description */}
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                Open Graph Description (`og:description`)
              </label>
              <textarea
                rows={2}
                value={formData.ogDescription}
                onChange={(e) => handleChange('ogDescription', e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl border border-slate-200 bg-slate-50/50 text-slate-900 text-sm focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Turnkey corporate events, stage design, MICE travel, retail branding..."
              />
            </div>

            {/* OG Image */}
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                Social Share Image (`og:image`) URL (Recommended: 1200x630px)
              </label>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={formData.ogImage}
                  onChange={(e) => handleChange('ogImage', e.target.value)}
                  className="flex-1 px-4 py-2.5 rounded-xl border border-slate-200 bg-slate-50/50 text-slate-900 text-sm focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="https://images.unsplash.com/..."
                />
                <label className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold cursor-pointer transition-all">
                  <Upload className="w-3.5 h-3.5" /> Upload File
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => handleImageUpload(e, 'ogImage')}
                    className="hidden"
                  />
                </label>
              </div>
            </div>

            {/* Twitter Card Section */}
            <div className="pt-4 border-t border-slate-100 grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                  Twitter Card Type (`twitter:card`)
                </label>
                <select
                  value={formData.twitterCardType}
                  onChange={(e) => handleChange('twitterCardType', e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 bg-white text-slate-900 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="summary_large_image">summary_large_image (Large Hero Banner)</option>
                  <option value="summary">summary (Small Compact Thumbnail)</option>
                </select>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                  Twitter Title
                </label>
                <input
                  type="text"
                  value={formData.twitterTitle}
                  onChange={(e) => handleChange('twitterTitle', e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 bg-slate-50/50 text-slate-900 text-sm focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="PMS Innovation Solutions | Corporate Events"
                />
              </div>
            </div>
          </div>
        )}

        {/* Tab 3: Google Verification & Analytics */}
        {activeTab === 'google-tools' && (
          <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-xs space-y-6">
            <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
              <Globe className="w-5 h-5 text-blue-600" />
              Google Search Console & Analytics Integration
            </h2>

            <div className="p-4 rounded-xl bg-blue-50 border border-blue-100 flex items-start gap-3">
              <Info className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />
              <p className="text-xs text-blue-800 leading-relaxed">
                Connect your website to Google Search Console to monitor keyword search queries, click rankings, indexation status, and Core Web Vitals directly from Google.
              </p>
            </div>

            <div className="space-y-4">
              {/* Search Console Tag */}
              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-700 uppercase tracking-wider flex items-center justify-between">
                  <span>Google Search Console HTML Verification Token</span>
                  <a
                    href="https://search.google.com/search-console"
                    target="_blank"
                    rel="noreferrer"
                    className="text-blue-600 hover:underline inline-flex items-center gap-1 font-normal lowercase"
                  >
                    Open Google Search Console <ExternalLink className="w-3 h-3" />
                  </a>
                </label>
                <input
                  type="text"
                  value={formData.googleSiteVerification}
                  onChange={(e) => handleChange('googleSiteVerification', e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50/50 text-slate-900 text-sm focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 font-mono text-xs"
                  placeholder="e.g. 7AbCdEfGhIjKlMnOpQrStUvWxYz123456789"
                />
                <p className="text-xs text-slate-400">
                  Enter the verification code from &lt;meta name="google-site-verification" content="..."&gt;
                </p>
              </div>

              {/* Google Analytics GA4 */}
              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                  Google Analytics 4 (GA4) Measurement ID
                </label>
                <input
                  type="text"
                  value={formData.googleAnalyticsId}
                  onChange={(e) => handleChange('googleAnalyticsId', e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50/50 text-slate-900 text-sm focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 font-mono text-xs"
                  placeholder="e.g. G-XXXXXXXXXX"
                />
                <p className="text-xs text-slate-400">
                  Track website traffic, visitors, and contact conversion rates from search engines.
                </p>
              </div>

              {/* Geographic Tags */}
              <div className="pt-4 border-t border-slate-100 grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                    Geographic Region Code (`geo.region`)
                  </label>
                  <input
                    type="text"
                    value={formData.geoRegion}
                    onChange={(e) => handleChange('geoRegion', e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 bg-slate-50/50 text-slate-900 text-sm focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="IN-WB"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                    Target City Placename (`geo.placename`)
                  </label>
                  <input
                    type="text"
                    value={formData.geoPlacename}
                    onChange={(e) => handleChange('geoPlacename', e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 bg-slate-50/50 text-slate-900 text-sm focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Kolkata"
                  />
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Tab 4: JSON-LD Schema */}
        {activeTab === 'schema' && (
          <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-xs space-y-6">
            <div className="flex items-center justify-between flex-wrap gap-4">
              <div>
                <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                  <Code2 className="w-5 h-5 text-blue-600" />
                  JSON-LD Structured Data Schema (Google Rich Results)
                </h2>
                <p className="text-xs text-slate-500 mt-1">
                  Provides structured machine-readable information to Google Search so your business appears in Knowledge Panels and Local Maps.
                </p>
              </div>

              {/* Enable Switch */}
              <label className="inline-flex items-center gap-2 cursor-pointer bg-slate-100 px-3 py-1.5 rounded-xl border border-slate-200">
                <input
                  type="checkbox"
                  checked={formData.structuredDataEnabled}
                  onChange={(e) => handleChange('structuredDataEnabled', e.target.checked)}
                  className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
                />
                <span className="text-xs font-bold text-slate-800">Enable Schema Output</span>
              </label>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                  Schema Business Type
                </label>
                <select
                  value={formData.businessType}
                  onChange={(e) => handleChange('businessType', e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 bg-white text-slate-900 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="LocalBusiness">LocalBusiness (Recommended)</option>
                  <option value="EventPlanner">EventPlanner</option>
                  <option value="ProfessionalService">ProfessionalService</option>
                  <option value="Organization">Organization</option>
                </select>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                  Business Legal Name
                </label>
                <input
                  type="text"
                  value={formData.businessName}
                  onChange={(e) => handleChange('businessName', e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 bg-slate-50/50 text-slate-900 text-sm focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="PMS Innovation Solutions"
                />
              </div>

              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                  Price Range Indicator
                </label>
                <input
                  type="text"
                  value={formData.priceRange}
                  onChange={(e) => handleChange('priceRange', e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 bg-slate-50/50 text-slate-900 text-sm focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="$$"
                />
              </div>
            </div>

            {/* Code Output Viewer */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                  Live Generated JSON-LD Code:
                </span>
                <button
                  type="button"
                  onClick={() => handleCopy(JSON.stringify(jsonLdSchema, null, 2), 'schema')}
                  className="inline-flex items-center gap-1.5 text-xs font-semibold text-blue-600 hover:text-blue-700 bg-blue-50 px-2.5 py-1 rounded-lg transition-all"
                >
                  {copiedCode === 'schema' ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-600" /> Copied!
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" /> Copy Code for Google Validator
                    </>
                  )}
                </button>
              </div>

              <pre className="p-4 rounded-xl bg-slate-900 text-slate-200 text-xs font-mono overflow-x-auto max-h-60 border border-slate-800">
                {JSON.stringify(jsonLdSchema, null, 2)}
              </pre>
            </div>
          </div>
        )}

        {/* Tab 5: Sitemap & Robots */}
        {activeTab === 'sitemap' && (
          <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-xs space-y-6">
            <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
              <FileCode className="w-5 h-5 text-blue-600" />
              Crawling Protocol Files (Robots.txt & Sitemap.xml)
            </h2>

            <p className="text-xs text-slate-500 leading-relaxed">
              These files guide Googlebot, Bingbot, and other search engines to crawl all sections of your website and discover all page contents accurately.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* robots.txt box */}
              <div className="space-y-3 p-5 rounded-2xl bg-slate-50 border border-slate-200">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <ShieldCheck className="w-4 h-4 text-emerald-600" />
                    <span className="text-sm font-bold text-slate-800">robots.txt</span>
                  </div>
                  <div className="flex gap-2">
                    <button
                      type="button"
                      onClick={() => handleCopy(robotsTxtContent, 'robots')}
                      className="p-1.5 rounded-lg bg-white border border-slate-200 text-slate-600 hover:text-slate-900 text-xs"
                      title="Copy"
                    >
                      {copiedCode === 'robots' ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                    </button>
                    <button
                      type="button"
                      onClick={() => downloadFile(robotsTxtContent, 'robots.txt', 'text/plain')}
                      className="p-1.5 rounded-lg bg-white border border-slate-200 text-slate-600 hover:text-slate-900 text-xs"
                      title="Download"
                    >
                      <Download className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>

                <pre className="p-3 rounded-xl bg-slate-900 text-emerald-400 text-xs font-mono overflow-x-auto">
                  {robotsTxtContent}
                </pre>
              </div>

              {/* sitemap.xml box */}
              <div className="space-y-3 p-5 rounded-2xl bg-slate-50 border border-slate-200">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Globe className="w-4 h-4 text-blue-600" />
                    <span className="text-sm font-bold text-slate-800">sitemap.xml</span>
                  </div>
                  <div className="flex gap-2">
                    <button
                      type="button"
                      onClick={() => handleCopy(sitemapXmlContent, 'sitemap')}
                      className="p-1.5 rounded-lg bg-white border border-slate-200 text-slate-600 hover:text-slate-900 text-xs"
                      title="Copy"
                    >
                      {copiedCode === 'sitemap' ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                    </button>
                    <button
                      type="button"
                      onClick={() => downloadFile(sitemapXmlContent, 'sitemap.xml', 'application/xml')}
                      className="p-1.5 rounded-lg bg-white border border-slate-200 text-slate-600 hover:text-slate-900 text-xs"
                      title="Download"
                    >
                      <Download className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>

                <pre className="p-3 rounded-xl bg-slate-900 text-blue-300 text-xs font-mono overflow-x-auto max-h-40">
                  {sitemapXmlContent}
                </pre>
              </div>
            </div>
          </div>
        )}

        {/* Action Bar */}
        <div className="sticky bottom-4 z-20 bg-white/95 backdrop-blur-md p-4 rounded-2xl border border-slate-200 shadow-lg flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            {saveSuccess && (
              <div className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-700 bg-emerald-50 px-3 py-1.5 rounded-xl border border-emerald-200 animate-fadeIn">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                SEO Settings Applied & Live in &lt;head&gt;!
              </div>
            )}
          </div>

          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => {
                if (window.confirm('Reset all SEO settings to the default optimal values?')) {
                  resetSeoSettings();
                }
              }}
              className="px-4 py-2.5 rounded-xl text-xs font-semibold text-slate-600 hover:bg-slate-100 transition-all flex items-center gap-1.5"
            >
              <RefreshCw className="w-3.5 h-3.5" /> Reset Defaults
            </button>

            <button
              type="submit"
              className="px-6 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs sm:text-sm font-bold shadow-md hover:shadow-lg transition-all flex items-center gap-2"
            >
              <Check className="w-4 h-4" /> Save & Apply SEO Changes
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};
