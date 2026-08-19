import React, { useState } from 'react';
import { useCms } from '../context/CmsContext';
import defaultLogoUrl from '../../Logo final-02.png';

interface PmsLogoProps {
  className?: string;
  variant?: 'color' | 'white' | 'dark';
  showSubtitle?: boolean;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  customUrl?: string;
  altText?: string;
}

export const PmsLogo: React.FC<PmsLogoProps> = ({
  className = 'h-10 w-auto',
  variant = 'color',
  showSubtitle = true,
  size,
  customUrl,
  altText,
}) => {
  const [imageError, setImageError] = useState(false);

  // Safe access to CMS context (if rendered within or outside CmsProvider)
  let cmsContext = null;
  try {
    cmsContext = useCms();
  } catch {
    // fallback if outside context
  }

  const companyInfo = cmsContext?.companyInfo;

  // Determine active uploaded logo URL
  let activeUploadedLogo = customUrl;
  if (!activeUploadedLogo && companyInfo?.logoUrl) {
    if (variant === 'white' && companyInfo.logoWhiteUrl) {
      activeUploadedLogo = companyInfo.logoWhiteUrl;
    } else {
      activeUploadedLogo = companyInfo.logoUrl;
    }
  }

  // Use the supplied PMS brand artwork unless an administrator has selected a
  // replacement logo.  The vector below remains as a resilient fallback.
  if (!activeUploadedLogo && variant !== 'white') {
    activeUploadedLogo = defaultLogoUrl;
  }

  const sizeClasses = {
    sm: 'h-8',
    md: 'h-11',
    lg: 'h-16',
    xl: 'h-24',
  };

  const finalClass = size ? `${sizeClasses[size]} w-auto ${className}` : className;

  // If a valid custom/uploaded logo exists and hasn't failed to load, render the uploaded logo
  if (activeUploadedLogo && !imageError) {
    return (
      <div className={`inline-flex items-center select-none ${finalClass}`}>
        <img
          src={activeUploadedLogo}
          alt={altText || companyInfo?.name || 'PMS Innovation Solutions Logo'}
          className="max-h-full w-auto object-contain transition-all"
          onError={() => setImageError(true)}
        />
      </div>
    );
  }

  // Brand Colors for Vector SVG
  const navyColor = variant === 'white' ? '#FFFFFF' : '#054B78';
  const orangeColor = variant === 'white' ? '#FBBF24' : '#F89D1B';
  const subtitleColor = variant === 'white' ? '#FDE68A' : '#F89D1B';

  return (
    <div className={`inline-flex flex-col items-center select-none ${finalClass}`}>
      <svg
        viewBox="0 0 540 240"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full max-h-full object-contain"
        aria-label="PMS Innovation Solutions Logo"
      >
        <g>
          {/* P Letter (Navy Blue) */}
          <path
            d="M 68 45 
               C 56 45 46 55 46 67 
               L 46 173 
               C 46 185 56 195 68 195 
               C 80 195 90 185 90 173 
               L 90 135 
               L 115 135 
               C 152 135 178 115 178 90 
               C 178 65 152 45 115 45 
               Z 
               M 90 85 
               L 112 85 
               C 126 85 136 91 136 90 
               C 136 89 126 95 112 95 
               L 90 95 
               Z"
            fill={navyColor}
          />
          {/* Inner cutout of P */}
          <path
            d="M 90 82 
               L 110 82 
               C 126 82 136 86 136 90 
               C 136 94 126 98 110 98 
               L 90 98 
               Z"
            fill="transparent"
          />
          {/* Precise P shape */}
          <path
            d="M 48 68 C 48 55 58 45 71 45 L 116 45 C 152 45 178 65 178 90 C 178 115 152 135 116 135 L 92 135 L 92 172 C 92 185 82 195 70 195 C 58 195 48 185 48 172 Z"
            fill={navyColor}
          />
          <path
            d="M 92 82 L 114 82 C 128 82 136 85 136 90 C 136 95 128 98 114 98 L 92 98 Z"
            fill={variant === 'white' ? '#0F172A' : '#FFFFFF'}
          />

          {/* M - Navy Blue connecting core & right leg */}
          <path
            d="M 175 60 L 225 150 L 275 60 L 325 150 L 355 190 C 352 194 340 195 330 185 L 290 120 L 245 190 L 195 110 L 175 60 Z"
            fill={navyColor}
          />

          {/* M - Left Orange Bar (Slanted Upward with rounded ends) */}
          <line
            x1="140"
            y1="180"
            x2="198"
            y2="60"
            stroke={orangeColor}
            strokeWidth="38"
            strokeLinecap="round"
          />

          {/* M - Right Orange Bar (Slanted Downward with rounded ends) */}
          <line
            x1="262"
            y1="60"
            x2="204"
            y2="180"
            stroke={orangeColor}
            strokeWidth="38"
            strokeLinecap="round"
          />

          {/* M - Navy Blue Right Stem (slanted up-right into S) */}
          <line
            x1="260"
            y1="62"
            x2="318"
            y2="180"
            stroke={navyColor}
            strokeWidth="38"
            strokeLinecap="round"
          />

          {/* S Letter (Navy Blue) */}
          <path
            d="M 445 78
               C 445 66 433 52 400 48
               C 360 44 330 60 330 92
               C 330 122 355 134 395 142
               C 425 148 435 156 435 166
               C 435 178 418 190 390 190
               C 362 190 342 178 335 164
               C 330 154 316 150 306 156
               C 296 162 292 176 298 186
               C 312 210 348 230 390 230
               C 442 230 478 202 478 164
               C 478 132 452 118 410 110
               C 382 104 372 98 372 88
               C 372 78 386 68 405 68
               C 424 68 438 78 442 88
               C 446 98 458 104 468 100
               C 478 96 482 84 478 74
               Z"
            fill={navyColor}
          />
        </g>

        {/* Subtitle: INNOVATION SOLUTIONS */}
        {showSubtitle && (
          <text
            x="270"
            y="232"
            textAnchor="middle"
            fill={subtitleColor}
            fontFamily="system-ui, -apple-system, sans-serif"
            fontWeight="700"
            fontSize="25"
            letterSpacing="9"
          >
            INNOVATION SOLUTIONS
          </text>
        )}
      </svg>
    </div>
  );
};

export const PmsLogoMark: React.FC<{
  className?: string;
  variant?: 'color' | 'white';
  customUrl?: string;
}> = ({ className = 'w-10 h-10', variant = 'color', customUrl }) => {
  const [imageError, setImageError] = useState(false);

  let cmsContext = null;
  try {
    cmsContext = useCms();
  } catch {
    // fallback if outside context
  }

  const companyInfo = cmsContext?.companyInfo;

  let activeUploadedLogo = customUrl;
  if (!activeUploadedLogo && companyInfo?.logoUrl) {
    if (variant === 'white' && companyInfo.logoWhiteUrl) {
      activeUploadedLogo = companyInfo.logoWhiteUrl;
    } else {
      activeUploadedLogo = companyInfo.logoUrl;
    }
  }

  if (activeUploadedLogo && !imageError) {
    return (
      <div className={`inline-flex items-center justify-center overflow-hidden rounded-lg ${className}`}>
        <img
          src={activeUploadedLogo}
          alt="PMS Logo Mark"
          className="w-full h-full object-contain"
          onError={() => setImageError(true)}
        />
      </div>
    );
  }

  const navyColor = variant === 'white' ? '#FFFFFF' : '#054B78';
  const orangeColor = variant === 'white' ? '#FBBF24' : '#F89D1B';

  return (
    <div className={`inline-flex items-center justify-center ${className}`}>
      <svg
        viewBox="0 0 100 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full"
      >
        {/* Modern PMS Monogram Icon */}
        <rect width="100" height="100" rx="22" fill={navyColor} />
        {/* Stylized M Golden Accent */}
        <path
          d="M 28 72 L 44 28 L 56 62 L 72 28"
          stroke={orangeColor}
          strokeWidth="10"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        {/* Subtle P loop */}
        <circle cx="28" cy="38" r="8" stroke="#FFFFFF" strokeWidth="6" fill="none" />
      </svg>
    </div>
  );
};
