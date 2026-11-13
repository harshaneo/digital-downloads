import React from 'react';

interface IconProps extends React.SVGProps<SVGSVGElement> {
  className?: string;
  size?: number | string;
}

// 1. All Products Bento Mosaic Icon
export const AllCategoriesIcon: React.FC<IconProps> = ({ className = 'w-4 h-4', ...props }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true" {...props}>
    <rect x="3" y="3" width="7" height="7" rx="2" className="fill-stone-200/50" />
    <rect x="14" y="3" width="7" height="7" rx="2" />
    <rect x="3" y="14" width="7" height="7" rx="2" />
    <rect x="14" y="14" width="7" height="7" rx="2" className="fill-stone-200/50" />
  </svg>
);

// 2. UI Kits & Systems Icon
export const UiKitsIcon: React.FC<IconProps> = ({ className = 'w-4 h-4', ...props }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true" {...props}>
    <rect x="2.5" y="4" width="19" height="16" rx="2.5" />
    <path d="M2.5 8.5h19" />
    <path d="M8.5 8.5v11.5" />
    <rect x="11.5" y="11.5" width="7" height="5.5" rx="1" className="fill-amber-500/10 stroke-amber-600/70" />
    <circle cx="5.5" cy="6.25" r="0.75" fill="currentColor" />
  </svg>
);

// 3. 3D Models & Spatial Assets Icon
export const ThreeDAssetsIcon: React.FC<IconProps> = ({ className = 'w-4 h-4', ...props }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true" {...props}>
    <path d="M12 2.5L20.5 7.4v9.2L12 21.5l-8.5-4.9V7.4L12 2.5z" />
    <path d="M12 2.5v19" />
    <path d="M12 12l8.5-4.6" />
    <path d="M12 12L3.5 7.4" />
    <circle cx="12" cy="12" r="1.5" className="fill-cyan-500/80 stroke-none" />
  </svg>
);

// 4. Code & Starter Kits Icon
export const CodeTemplatesIcon: React.FC<IconProps> = ({ className = 'w-4 h-4', ...props }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true" {...props}>
    <polyline points="7 8 3 12 7 16" />
    <polyline points="17 8 21 12 17 16" />
    <line x1="14" y1="4" x2="10" y2="20" className="stroke-emerald-600" />
  </svg>
);

// 5. Typefaces & Typography Icon
export const FontsIcon: React.FC<IconProps> = ({ className = 'w-4 h-4', ...props }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true" {...props}>
    <path d="M3.5 19L9.5 5h1l6 14" />
    <path d="M5.5 14.5h9" />
    <path d="M18 19c-1.5 0-2.5-1-2.5-2.5 0-1.8 1.5-2.5 3.5-2.5h1v-1c0-.8-.6-1.5-1.5-1.5-.7 0-1.3.4-1.5 1m3 2.5v4" />
  </svg>
);

// 6. Audio Stems & Sound FX Icon
export const AudioStemsIcon: React.FC<IconProps> = ({ className = 'w-4 h-4', ...props }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true" {...props}>
    <path d="M3 10v4" />
    <path d="M7 6v12" />
    <path d="M11 3v18" className="stroke-fuchsia-600" />
    <path d="M15 7v10" />
    <path d="M19 10v4" />
    <path d="M22 11v2" />
  </svg>
);

// 7. Vector Glyphs & Icons Set
export const VectorGlyphsIcon: React.FC<IconProps> = ({ className = 'w-4 h-4', ...props }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true" {...props}>
    <rect x="2.5" y="2.5" width="4" height="4" rx="0.5" className="fill-rose-500/20" />
    <rect x="17.5" y="2.5" width="4" height="4" rx="0.5" />
    <rect x="17.5" y="17.5" width="4" height="4" rx="0.5" className="fill-rose-500/20" />
    <rect x="2.5" y="17.5" width="4" height="4" rx="0.5" />
    <path d="M6.5 4.5h11" strokeDasharray="2 2" />
    <path d="M19.5 6.5v11" strokeDasharray="2 2" />
    <path d="M17.5 19.5h-11" strokeDasharray="2 2" />
    <path d="M4.5 17.5v-11" strokeDasharray="2 2" />
    <path d="M4.5 4.5C12 7 12 17 19.5 19.5" className="stroke-rose-600" />
  </svg>
);

// 8. Instant Delivery / Cloud Bolt
export const InstantDeliveryIcon: React.FC<IconProps> = ({ className = 'w-4 h-4', ...props }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true" {...props}>
    <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" className="fill-amber-400/20 stroke-amber-600" />
  </svg>
);

// 9. Verified Cryptographic License Shield
export const VerifiedLicenseIcon: React.FC<IconProps> = ({ className = 'w-4 h-4', ...props }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true" {...props}>
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" className="fill-emerald-500/10 stroke-emerald-600" />
    <path d="m9 12 2 2 4-4" className="stroke-emerald-600 stroke-[2]" />
  </svg>
);

// 10. Lifetime Updates Loop
export const LifetimeUpdatesIcon: React.FC<IconProps> = ({ className = 'w-4 h-4', ...props }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true" {...props}>
    <path d="M21 12a9 9 0 0 0-9-9 9.75 9.75 0 0 0-6.74 2.74L3 8" />
    <path d="M3 3v5h5" />
    <path d="M3 12a9 9 0 0 0 9 9 9.75 9.75 0 0 0 6.74-2.74L21 16" />
    <path d="M21 21v-5h-5" />
  </svg>
);

// 11. Commercial Enterprise License
export const CommercialBadgeIcon: React.FC<IconProps> = ({ className = 'w-4 h-4', ...props }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true" {...props}>
    <circle cx="12" cy="8" r="6" className="fill-indigo-500/10 stroke-indigo-600" />
    <path d="M15.477 12.89L17 22l-5-3-5 3 1.523-9.11" />
  </svg>
);
