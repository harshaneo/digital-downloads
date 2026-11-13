import React, { useState } from 'react';
import { DigitalProduct, Currency } from '../types';
import { 
  Star, 
  Download, 
  Heart, 
  Eye, 
  ShoppingBag, 
  Check, 
  CheckCircle2, 
  Play, 
  Pause, 
  Volume2, 
  Box,
  FileArchive,
  Layout,
  Server,
  Code2,
  Smartphone,
  FileText,
  FileSpreadsheet,
  Briefcase
} from 'lucide-react';

interface ProductTileProps {
  product: DigitalProduct;
  isWishlisted: boolean;
  isInCart: boolean;
  isPurchased: boolean;
  onToggleWishlist: (p: DigitalProduct) => void;
  onAddToCart: (p: DigitalProduct) => void;
  onQuickLook: (p: DigitalProduct) => void;
  onInspectBundle?: (p: DigitalProduct) => void;
  onInstantDownload: (p: DigitalProduct) => void;
  currency: Currency;
  formatPrice: (amountInUSD: number) => string;
  viewMode?: 'grid' | 'bento' | 'compact';
}

export const ProductTile: React.FC<ProductTileProps> = ({
  product,
  isWishlisted,
  isInCart,
  isPurchased,
  onToggleWishlist,
  onAddToCart,
  onQuickLook,
  onInspectBundle,
  onInstantDownload,
  formatPrice
}) => {
  const isFree = product.price === 0;

  // Category-Specific Live Media Specimen Previews
  const renderCategoryPreview = () => {
    switch (product.category) {
      case 'backends':
        return (
          <div className="relative w-full h-full bg-gradient-to-b from-stone-900 to-stone-950 p-3 flex flex-col justify-between overflow-hidden font-mono text-xs text-white">
            <div className="flex items-center justify-between pb-1.5 border-b border-stone-800">
              <div className="flex items-center gap-1.5">
                <div className="w-2.5 h-2.5 rounded-full bg-rose-500/80" />
                <div className="w-2.5 h-2.5 rounded-full bg-amber-500/80" />
                <div className="w-2.5 h-2.5 rounded-full bg-emerald-500/80" />
                <span className="text-[10px] text-stone-400 ml-1 font-sans">api.nexus.dev</span>
              </div>
              <span className="text-[9px] text-emerald-400 bg-emerald-950/80 border border-emerald-800/80 px-1.5 py-0.2 rounded font-bold">
                200 OK • 8ms
              </span>
            </div>

            <div className="my-auto py-1 space-y-1 text-[11px] leading-tight">
              <div className="text-amber-400 font-semibold">POST /v1/auth/verify</div>
              <div className="text-stone-400 pl-2">{'{ "status": "verified", "sub": "usr_94a" }'}</div>
              <div className="text-emerald-400 font-semibold pt-0.5">GET /v1/telemetry/live</div>
            </div>

            <div className="flex items-center justify-between text-[10px] text-stone-400 pt-1 border-t border-stone-800 font-sans">
              <span className="flex items-center gap-1 text-emerald-400 font-bold">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                Edge Microservice
              </span>
              <span>Postgres RLS</span>
            </div>
          </div>
        );

      case 'react-apps':
        return (
          <div className="relative w-full h-full bg-gradient-to-b from-stone-950 via-slate-900 to-stone-900 p-3 flex flex-col justify-between overflow-hidden text-white">
            <div className="flex items-center justify-between z-10">
              <span className="flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-emerald-950/80 border border-emerald-800/80 text-[10px] font-mono font-bold text-emerald-300">
                <Code2 className="w-3 h-3 text-emerald-400" />
                React 19 App
              </span>
              <span className="curatorial-stamp text-[9px] text-stone-400">60 FPS CANVAS</span>
            </div>

            <div className="my-auto py-2 flex items-center justify-center">
              <div className="w-full max-w-[200px] h-14 bg-stone-900/90 rounded-xl border border-stone-800 p-2 flex flex-col justify-between shadow-lg">
                <div className="flex items-center justify-between text-[10px] font-mono">
                  <span className="text-stone-400">TICK / FEED</span>
                  <span className="text-emerald-400 font-bold">+18.4%</span>
                </div>
                <div className="flex items-end gap-1 h-6">
                  {[40, 65, 30, 85, 55, 95, 75, 100].map((h, i) => (
                    <div key={i} style={{ height: `${h}%` }} className="flex-1 bg-gradient-to-t from-emerald-600 to-cyan-400 rounded-xs" />
                  ))}
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between text-[10px] font-mono text-stone-400 z-10">
              <span className="text-cyan-400 font-semibold">Web Audio Synthesizer</span>
              <span>SPA Dashboard</span>
            </div>
          </div>
        );

      case 'mobile-apps':
        return (
          <div className="relative w-full h-full bg-gradient-to-br from-blue-50/70 via-indigo-50/50 to-stone-100 p-3 flex flex-col justify-between overflow-hidden">
            <div className="flex items-center justify-between z-10">
              <span className="px-2 py-0.5 rounded-full bg-white/95 border border-indigo-200 text-[10px] font-mono font-bold text-indigo-800 shadow-2xs">
                Expo SDK 52
              </span>
              <span className="curatorial-stamp text-[9px] text-stone-500">IOS & ANDROID</span>
            </div>

            {/* Mobile Device Mockup */}
            <div className="my-auto flex justify-center">
              <div className="w-24 h-16 rounded-2xl bg-stone-900 p-1.5 shadow-md border border-stone-800 flex flex-col justify-between">
                <div className="w-6 h-1 rounded-full bg-stone-700 mx-auto" />
                <div className="bg-stone-800/90 rounded-lg p-1 flex items-center justify-between">
                  <div className="w-2.5 h-2.5 rounded-full bg-indigo-500" />
                  <div className="w-8 h-1 rounded-full bg-stone-500" />
                </div>
                <div className="w-8 h-0.5 rounded-full bg-stone-600 mx-auto" />
              </div>
            </div>

            <div className="flex items-center justify-between text-[10px] font-mono text-stone-600 z-10">
              <span className="font-bold text-indigo-700">Native Gestures</span>
              <span>SQLite Offline</span>
            </div>
          </div>
        );

      case 'documents-pdf':
        return (
          <div className="relative w-full h-full bg-gradient-to-b from-stone-100 via-[#fdfcfb] to-rose-50/40 p-3.5 flex flex-col justify-between overflow-hidden">
            <div className="flex items-center justify-between z-10">
              <span className="flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-rose-50 border border-rose-200/90 text-[10px] font-mono font-bold text-rose-800 shadow-2xs">
                <FileText className="w-3 h-3 text-rose-600" />
                Technical Whitepaper
              </span>
              <span className="curatorial-stamp text-[9px] text-stone-500">120 PAGES</span>
            </div>

            <div className="my-auto py-1 px-3 bg-white rounded-xl border border-stone-200 shadow-sm max-w-[200px] mx-auto w-full">
              <div className="w-16 h-1.5 rounded-full bg-rose-500 mb-2" />
              <div className="space-y-1">
                <div className="w-full h-1 rounded-full bg-stone-200" />
                <div className="w-4/5 h-1 rounded-full bg-stone-200" />
                <div className="w-3/5 h-1 rounded-full bg-stone-200" />
              </div>
            </div>

            <div className="flex items-center justify-between text-[10px] font-mono text-stone-600 z-10">
              <span className="font-bold text-stone-900">Zero Egress Blueprint</span>
              <span>Vector Diagrams</span>
            </div>
          </div>
        );

      case 'spreadsheets':
        return (
          <div className="relative w-full h-full bg-gradient-to-b from-emerald-50/70 via-stone-50 to-teal-50/40 p-3 flex flex-col justify-between overflow-hidden">
            <div className="flex items-center justify-between z-10">
              <span className="flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-emerald-50 border border-emerald-200 text-[10px] font-mono font-bold text-emerald-800 shadow-2xs">
                <FileSpreadsheet className="w-3 h-3 text-emerald-600" />
                Financial Model (.XLSX)
              </span>
              <span className="curatorial-stamp text-[9px] text-stone-500">36 MONTHS</span>
            </div>

            {/* Mini Spreadsheet Grid Specimen */}
            <div className="my-auto bg-white rounded-xl border border-emerald-200/80 p-2 shadow-xs text-[10px] font-mono max-w-[210px] mx-auto w-full">
              <div className="grid grid-cols-3 gap-1 pb-1 border-b border-stone-100 font-bold text-stone-700">
                <span>METRIC</span>
                <span className="text-right">Q1</span>
                <span className="text-right">Q4</span>
              </div>
              <div className="grid grid-cols-3 gap-1 py-0.5 text-stone-600">
                <span>ARR</span>
                <span className="text-right">$48k</span>
                <span className="text-right text-emerald-700 font-bold">$420k</span>
              </div>
              <div className="grid grid-cols-3 gap-1 py-0.5 text-stone-600">
                <span>LTV:CAC</span>
                <span className="text-right">3.8x</span>
                <span className="text-right text-emerald-700 font-bold">5.4x</span>
              </div>
            </div>

            <div className="flex items-center justify-between text-[10px] font-mono text-stone-600 z-10">
              <span className="font-bold text-emerald-800">Automated Formulas</span>
              <span>Excel & Sheets</span>
            </div>
          </div>
        );

      case 'resumes':
        return (
          <div className="relative w-full h-full bg-[#FAF9F6] p-3.5 flex flex-col justify-between overflow-hidden">
            <div className="flex items-center justify-between z-10">
              <span className="flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-stone-100 border border-stone-300 text-[10px] font-mono font-bold text-stone-800 shadow-2xs">
                <Briefcase className="w-3 h-3 text-stone-700" />
                ATS 98% Score
              </span>
              <span className="curatorial-stamp text-[9px] text-stone-500">TECH LEAD</span>
            </div>

            <div className="my-auto py-1 px-3 bg-white rounded-xl border border-stone-200 shadow-xs max-w-[200px] mx-auto w-full">
              <div className="text-[11px] font-bold text-stone-900 font-serif">Alex Morgan</div>
              <div className="text-[9px] text-stone-500 font-mono">Staff Software Architect</div>
              <div className="w-full h-px bg-stone-100 my-1" />
              <div className="space-y-0.5 text-[8.5px] text-stone-600">
                <div>• Scaled edge distributed API to 2M MAU</div>
                <div>• Reduced cloud infrastructure spend 64%</div>
              </div>
            </div>

            <div className="flex items-center justify-between text-[10px] font-mono text-stone-600 z-10">
              <span className="font-bold text-stone-900">PDF + DOCX + Figma</span>
              <span>XYZ Impact Bullets</span>
            </div>
          </div>
        );

      case 'websites-ui':
      default:
        return (
          <div className="relative w-full h-full bg-gradient-to-br from-indigo-50/70 via-purple-50/40 to-amber-50/30 p-4 flex flex-col justify-between overflow-hidden">
            <div className="flex items-center justify-between z-10">
              <span className="flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-white/95 border border-indigo-200 text-[10px] font-mono font-bold text-indigo-700 shadow-2xs">
                <Layout className="w-3 h-3 text-indigo-600" />
                Web & UI System
              </span>
              <span className="curatorial-stamp text-[9px] text-stone-400">2,400+ NODES</span>
            </div>

            {/* 3D Multi-Plane Floating UI Cards */}
            <div className="flex items-center justify-center my-auto py-2">
              <div className="relative w-40 h-20 perspective-500">
                <div className="absolute top-0 left-0 w-36 h-16 rounded-xl bg-white/90 border border-stone-200/90 shadow-xs rotate-[-6deg] group-hover:rotate-[-8deg] group-hover:translate-x-[-2px] transition-transform duration-300 ease-out" />
                
                <div className="absolute top-1.5 left-3 w-36 h-16 rounded-xl bg-gradient-to-r from-indigo-50/95 via-white to-purple-50/90 border border-indigo-200/90 shadow-[0_12px_24px_-6px_rgba(99,102,241,0.22)] flex items-center justify-between px-3.5 rotate-[3deg] group-hover:rotate-[5deg] group-hover:-translate-y-2 group-hover:scale-105 transition-all duration-300 ease-[cubic-bezier(0.34,1.56,0.64,1)]">
                  <div className="space-y-1.5">
                    <div className="w-12 h-2.5 rounded-full bg-indigo-500/80 shadow-2xs" />
                    <div className="w-8 h-1.5 rounded-full bg-stone-300" />
                  </div>
                  <div className="flex gap-1.5">
                    <div className="w-3 h-3 rounded-full bg-indigo-500 shadow-xs" />
                    <div className="w-3 h-3 rounded-full bg-emerald-500 shadow-xs" />
                    <div className="w-3 h-3 rounded-full bg-amber-500 shadow-xs" />
                  </div>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between text-[10px] font-mono text-stone-500 z-10">
              <span className="text-indigo-700 font-bold">Tailwind & Figma</span>
              <span>Responsive Pages</span>
            </div>
          </div>
        );
    }
  };

  return (
    <div 
      className="group relative rounded-[22px] p-[10px] bg-white border border-stone-200/90 shadow-[0_2px_8px_rgba(28,25,23,0.04),0_1px_3px_rgba(28,25,23,0.02)] hover:shadow-[0_16px_36px_-6px_rgba(28,25,23,0.08),0_4px_12px_-2px_rgba(28,25,23,0.03)] hover:-translate-y-1.5 transition-all duration-300 ease-[cubic-bezier(0.23,1,0.32,1)] flex flex-col h-full border-t border-t-white min-w-0 max-w-full overflow-hidden"
      style={{
        boxShadow: 'inset 0 1px 0 0 rgba(255, 255, 255, 0.95), 0 2px 8px -2px rgba(28, 25, 23, 0.04), 0 1px 3px 0 rgba(28, 25, 23, 0.02)'
      }}
    >
      {/* 1. Curatorial Specimen Header */}
      <div className="px-2.5 py-2 flex items-center justify-between gap-2 border-b border-stone-100/80 mb-2">
        <div className="flex items-center gap-2 min-w-0">
          <img 
            src={product.creator.avatar} 
            alt={product.creator.name}
            className="w-5 h-5 rounded-full object-cover border border-stone-200 shrink-0" 
          />
          <span className="truncate text-xs font-semibold text-stone-800">
            {product.creator.name}
          </span>
          {product.creator.verified && (
            <CheckCircle2 className="w-3.5 h-3.5 text-[#e06344] shrink-0" />
          )}
        </div>

        <div className="flex items-center gap-1.5 shrink-0">
          {product.badge && (
            <span className={`px-2 py-0.5 rounded-full text-[9.5px] font-mono font-bold tracking-wider shadow-2xs ${
              product.badge === 'HOT' ? 'bg-rose-50 text-rose-700 border border-rose-200/80' :
              product.badge === 'BESTSELLER' ? 'bg-amber-50 text-amber-800 border border-amber-200/80' :
              product.badge === 'FREE' ? 'bg-emerald-50 text-emerald-800 border border-emerald-200/80 font-black' :
              'bg-indigo-50 text-indigo-700 border border-indigo-200/80'
            }`}>
              {product.badge}
            </span>
          )}

          {/* Tactile Wishlist Toggle Pill */}
          <button
            type="button"
            onClick={() => onToggleWishlist(product)}
            className={`p-1.5 rounded-full border transition-all cursor-pointer ${
              isWishlisted 
                ? 'bg-rose-50 text-rose-600 border-rose-200 shadow-2xs scale-105' 
                : 'bg-stone-50/80 text-stone-400 border-stone-200 hover:text-stone-700 hover:bg-stone-100 shadow-2xs'
            } active:scale-75 transition-transform duration-200 ease-[cubic-bezier(0.34,1.56,0.64,1)]`}
            aria-label="Save to Wishlist"
            title={isWishlisted ? 'Remove from Wishlist' : 'Save to Wishlist'}
          >
            <Heart className={`w-3.5 h-3.5 ${isWishlisted ? 'fill-rose-500 text-rose-500' : ''}`} />
          </button>
        </div>
      </div>

      {/* 2. Concentric Inner Media Container (rounded-[12px] inside rounded-[22px] with p-[10px]) */}
      <div className="relative w-full aspect-16/10 rounded-[12px] border border-stone-200/80 overflow-hidden group/preview bg-stone-50">
        {renderCategoryPreview()}

        {/* Floating Quick Spec & Archive Inspection Actions */}
        <div className="absolute bottom-2.5 right-2.5 z-20 opacity-0 group-hover/preview:opacity-100 transition-opacity duration-200 flex items-center gap-1.5">
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              if (onInspectBundle) {
                onInspectBundle(product);
              } else {
                onQuickLook(product);
              }
            }}
            className="flex items-center gap-1 px-2.5 py-1 rounded-full backdrop-blur-md bg-stone-900/90 hover:bg-stone-900 text-amber-300 text-[11px] font-bold cursor-pointer shadow-sm border border-stone-700/80 active:scale-95 transition-all"
            title="Inspect ZIP archive contents & license manifest"
          >
            <FileArchive className="w-3.5 h-3.5 text-amber-300" />
            <span>Look Inside</span>
          </button>
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onQuickLook(product);
            }}
            className="flex items-center gap-1 px-2.5 py-1 rounded-full backdrop-blur-md bg-white/95 hover:bg-white text-stone-800 text-[11px] font-semibold cursor-pointer shadow-sm border border-stone-200/80 active:scale-95 transition-all"
            title="Quick preview spec"
          >
            <Eye className="w-3.5 h-3.5 text-stone-600" />
            <span>Spec</span>
          </button>
        </div>
      </div>

      {/* 3. Card Curatorial Details & Micro-Tags */}
      <div className="p-2.5 pt-3 flex-1 flex flex-col justify-between space-y-3">
        <div>
          {/* Museum Accession ID & Rating */}
          <div className="flex items-center justify-between text-xs text-stone-500 mb-1.5 font-mono">
            <div className="flex items-center gap-1 font-medium text-amber-700">
              <Star className="w-3 h-3 fill-amber-400 text-amber-500" />
              <span>{product.rating}</span>
              <span className="text-stone-400">({product.reviewCount})</span>
            </div>
            <span className="text-[9.5px] curatorial-stamp text-stone-400">
              ACC // {product.id.slice(0, 10).toUpperCase()}
            </span>
          </div>

          {/* Title & Subtitle */}
          <h3 
            onClick={() => onQuickLook(product)}
            className="text-[13.5px] font-bold text-stone-900 group-hover:text-[#e06344] transition-colors cursor-pointer line-clamp-1 [text-wrap:balance]"
          >
            {product.title}
          </h3>
          <p className="text-xs text-stone-600 line-clamp-2 mt-1 leading-relaxed [text-wrap:pretty]">
            {product.subtitle}
          </p>
        </div>

        {/* Archival Spec Micro-Tags & Look Inside Trigger */}
        <div className="flex items-center justify-between gap-1.5 pt-1">
          <div className="flex items-center gap-1.5 flex-wrap">
            <span className={`text-[10px] font-mono px-2 py-0.5 rounded-md font-bold border shadow-2xs ${
              product.fileFormat === '.FIG' ? 'bg-amber-50 text-amber-800 border-amber-200/80' :
              product.fileFormat === '.BLEND' ? 'bg-cyan-50 text-cyan-800 border-cyan-200/80' :
              product.fileFormat === '.TSX' ? 'bg-emerald-50 text-emerald-800 border-emerald-200/80' :
              product.fileFormat === '.OTF' ? 'bg-violet-50 text-violet-800 border-violet-200/80' :
              product.fileFormat === '.WAV' ? 'bg-fuchsia-50 text-fuchsia-800 border-fuchsia-200/80' :
              product.fileFormat === '.SVG' ? 'bg-rose-50 text-rose-800 border-rose-200/80' :
              'bg-stone-100 text-stone-700 border-stone-200/60'
            }`}>
              {product.fileFormat}
            </span>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded-md bg-stone-50 text-stone-600 border border-stone-200/60">
              {product.fileSize}
            </span>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded-md bg-stone-50 text-stone-600 border border-stone-200/60 hidden sm:inline">
              v{product.version}
            </span>
          </div>

          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              if (onInspectBundle) {
                onInspectBundle(product);
              } else {
                onQuickLook(product);
              }
            }}
            className="flex items-center gap-1 px-2 py-0.5 rounded-md bg-amber-50 hover:bg-amber-100 text-amber-900 border border-amber-200/80 text-[10px] font-mono font-bold cursor-pointer active:scale-95 transition-all shrink-0"
            title="Inspect ZIP archive contents"
          >
            <FileArchive className="w-3 h-3 text-amber-700" />
            <span>Inspect</span>
          </button>
        </div>

        {/* Valuation & Tactile Action Buttons (Verb-First) */}
        <div className="pt-2.5 border-t border-stone-200/70 flex items-center justify-between gap-2 mt-auto">
          <div>
            <div className="flex items-baseline gap-1.5">
              <span className="text-base font-extrabold text-stone-950 font-mono tracking-tight">
                {isFree ? (
                  <span className="text-emerald-700 font-black">FREE</span>
                ) : (
                  formatPrice(product.price)
                )}
              </span>
              {product.originalPrice && product.originalPrice > product.price && (
                <span className="text-xs text-stone-400 line-through font-mono">
                  {formatPrice(product.originalPrice)}
                </span>
              )}
            </div>
            <span className="text-[10px] text-stone-500 block font-mono">
              {product.downloadsCount.toLocaleString()} downloads
            </span>
          </div>

          {/* Tactile Action Button */}
          {isPurchased ? (
            <button
              type="button"
              onClick={() => onInstantDownload(product)}
              className="btn-plinth-emerald flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-semibold cursor-pointer"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Download</span>
            </button>
          ) : isFree ? (
            <button
              type="button"
              onClick={() => onInstantDownload(product)}
              className="btn-plinth-emerald flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-semibold cursor-pointer"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Free Download</span>
            </button>
          ) : isInCart ? (
            <button
              type="button"
              disabled
              className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-stone-100 text-stone-500 border border-stone-200 text-xs font-medium cursor-default"
            >
              <Check className="w-3.5 h-3.5 text-stone-500" />
              <span>In Bag</span>
            </button>
          ) : (
            <button
              type="button"
              onClick={() => onAddToCart(product)}
              className="btn-plinth-primary flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-semibold cursor-pointer"
            >
              <ShoppingBag className="w-3.5 h-3.5 text-amber-300" />
              <span>Add to Bag</span>
            </button>
          )}

        </div>

      </div>

    </div>
  );
};
