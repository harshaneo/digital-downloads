import React, { useState } from 'react';
import { DigitalProduct, Currency } from '../types';
import { 
  X, 
  Download, 
  ShoppingBag, 
  Check, 
  CheckCircle2, 
  Star, 
  ShieldCheck, 
  HardDrive, 
  FileCheck,
  FileArchive,
  ExternalLink
} from 'lucide-react';

interface QuickLookModalProps {
  product: DigitalProduct | null;
  onClose: () => void;
  onAddToCart: (p: DigitalProduct, license: 'standard' | 'extended') => void;
  onInstantDownload: (p: DigitalProduct) => void;
  onInspectBundle?: (p: DigitalProduct) => void;
  isInCart: boolean;
  isPurchased: boolean;
  formatPrice: (amountInUSD: number) => string;
}

export const QuickLookModal: React.FC<QuickLookModalProps> = ({
  product,
  onClose,
  onAddToCart,
  onInstantDownload,
  onInspectBundle,
  isInCart,
  isPurchased,
  formatPrice
}) => {
  if (!product) return null;

  const [selectedLicense, setSelectedLicense] = useState<'standard' | 'extended'>('standard');
  const isFree = product.price === 0;

  const finalPrice = selectedLicense === 'extended' ? Math.round(product.price * 1.8) : product.price;

  return (
    <div 
      role="dialog" 
      aria-modal="true" 
      aria-labelledby="modal-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-stone-900/40 backdrop-blur-sm animate-in fade-in duration-200"
    >
      <div className="absolute inset-0" onClick={onClose} />

      <div className="relative w-full max-w-3xl max-h-[90vh] bg-white border border-stone-200 rounded-3xl overflow-hidden shadow-2xl flex flex-col z-10 text-stone-800">
        
        {/* Top Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-stone-200 bg-stone-50/80">
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-md bg-stone-200/80 text-stone-800 font-mono text-xs font-bold uppercase">
              {product.fileFormat}
            </span>
            <span className="text-xs text-stone-600 capitalize font-medium">
              {product.category.replace('-', ' ')}
            </span>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="p-1.5 rounded-xl text-stone-500 hover:text-stone-900 hover:bg-stone-200/60 transition-colors cursor-pointer"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Body */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          
          {/* Hero Banner */}
          <div className="w-full rounded-2xl bg-gradient-to-br from-amber-50 via-orange-50/50 to-stone-100 p-6 sm:p-8 border border-amber-200/60 relative overflow-hidden flex flex-col justify-between min-h-[160px]">
            <div className="relative z-10 flex items-center justify-between">
              <span className="px-2.5 py-1 rounded-full bg-white/80 backdrop-blur-sm text-xs font-mono text-stone-700 border border-stone-200/80 shadow-2xs">
                v{product.version} • Updated {product.updatedAt}
              </span>
              {product.badge && (
                <span className="px-3 py-1 rounded-full bg-stone-900 text-white font-extrabold text-xs uppercase tracking-wider shadow-sm">
                  {product.badge}
                </span>
              )}
            </div>

            <div className="relative z-10 mt-5">
              <h2 id="modal-title" className="text-2xl sm:text-3xl font-extrabold text-stone-900 tracking-tight [text-wrap:balance]">
                {product.title}
              </h2>
              <p className="text-sm text-stone-600 mt-1.5 max-w-xl leading-relaxed [text-wrap:pretty]">
                {product.subtitle}
              </p>
            </div>
          </div>

          {/* Quick Stat Chips */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <div className="p-3.5 rounded-2xl bg-stone-50 border border-stone-200/80">
              <div className="flex items-center gap-1.5 text-stone-500 text-xs mb-1">
                <HardDrive className="w-3.5 h-3.5 text-stone-600" />
                <span>Archive Size</span>
              </div>
              <div className="text-sm font-bold text-stone-900 font-mono">{product.fileSize}</div>
            </div>

            <div className="p-3.5 rounded-2xl bg-stone-50 border border-stone-200/80">
              <div className="flex items-center gap-1.5 text-stone-500 text-xs mb-1">
                <Star className="w-3.5 h-3.5 text-amber-500 fill-amber-400" />
                <span>Rating</span>
              </div>
              <div className="text-sm font-bold text-stone-900">{product.rating} ({product.reviewCount})</div>
            </div>

            <div className="p-3.5 rounded-2xl bg-stone-50 border border-stone-200/80">
              <div className="flex items-center gap-1.5 text-stone-500 text-xs mb-1">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                <span>License</span>
              </div>
              <div className="text-xs font-bold text-stone-900 truncate">{product.license}</div>
            </div>

            <div className="p-3.5 rounded-2xl bg-stone-50 border border-stone-200/80">
              <div className="flex items-center gap-1.5 text-stone-500 text-xs mb-1">
                <Download className="w-3.5 h-3.5 text-cyan-600" />
                <span>Downloads</span>
              </div>
              <div className="text-sm font-bold text-stone-900 font-mono">{product.downloadsCount.toLocaleString()}</div>
            </div>
          </div>

          {/* Full Description & Key Features */}
          <div className="space-y-4">
            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-stone-500 mb-1.5">Overview</h4>
              <p className="text-sm text-stone-700 leading-relaxed [text-wrap:pretty]">
                {product.description}
              </p>
            </div>

            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-stone-500 mb-2">Highlights & Specifications</h4>
              <ul className="grid sm:grid-cols-2 gap-2 text-xs text-stone-700">
                {product.features.map((feat, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span>{feat}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Included Files */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-stone-500 mb-2 flex items-center justify-between">
              <span>Archive Contents</span>
              {onInspectBundle ? (
                <button
                  type="button"
                  onClick={() => onInspectBundle(product)}
                  className="flex items-center gap-1 text-[11px] font-mono font-bold text-amber-700 hover:text-amber-800 bg-amber-50 hover:bg-amber-100/90 border border-amber-200/80 px-2 py-0.5 rounded-lg cursor-pointer active:scale-95 transition-all shadow-2xs"
                >
                  <FileArchive className="w-3 h-3 text-amber-600" />
                  <span>Look Inside (.ZIP)</span>
                  <ExternalLink className="w-2.5 h-2.5 ml-0.5 text-amber-500" />
                </button>
              ) : (
                <span className="text-[11px] font-mono text-stone-500 font-normal">{product.includedFiles.length} files included</span>
              )}
            </h4>
            <div className="border border-stone-200 rounded-2xl overflow-hidden divide-y divide-stone-100 bg-stone-50/50">
              {product.includedFiles.map((file, i) => (
                <div key={i} className="flex items-center justify-between px-3.5 py-2.5 text-xs">
                  <div className="flex items-center gap-2.5 min-w-0">
                    <FileCheck className="w-4 h-4 text-[#e06344] shrink-0" />
                    <span className="font-mono text-stone-800 truncate">{file.name}</span>
                  </div>
                  <div className="flex items-center gap-3 shrink-0">
                    <span className="text-stone-500 text-[11px] hidden sm:inline">{file.type}</span>
                    <span className="font-mono text-[11px] text-stone-600 bg-white border border-stone-200 px-2 py-0.5 rounded shadow-2xs">
                      {file.size}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* License Selection */}
          {!isFree && (
            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-stone-500 mb-2">Select License Type</h4>
              <div className="grid sm:grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => setSelectedLicense('standard')}
                  className={`p-3.5 rounded-2xl border text-left transition-all cursor-pointer ${
                    selectedLicense === 'standard'
                      ? 'bg-white border-stone-900 shadow-sm'
                      : 'bg-stone-50 border-stone-200 text-stone-600 hover:border-stone-300'
                  }`}
                >
                  <div className="flex items-center justify-between font-bold text-xs mb-1">
                    <span className="text-stone-900">Standard Commercial</span>
                    <span className="text-[#e06344] font-mono">{formatPrice(product.price)}</span>
                  </div>
                  <p className="text-[11px] text-stone-600">
                    Single commercial project for yourself or a client.
                  </p>
                </button>

                <button
                  type="button"
                  onClick={() => setSelectedLicense('extended')}
                  className={`p-3.5 rounded-2xl border text-left transition-all cursor-pointer ${
                    selectedLicense === 'extended'
                      ? 'bg-white border-stone-900 shadow-sm'
                      : 'bg-stone-50 border-stone-200 text-stone-600 hover:border-stone-300'
                  }`}
                >
                  <div className="flex items-center justify-between font-bold text-xs mb-1">
                    <span className="text-stone-900">Extended Agency</span>
                    <span className="text-[#e06344] font-mono">{formatPrice(Math.round(product.price * 1.8))}</span>
                  </div>
                  <p className="text-[11px] text-stone-600">
                    Unlimited client projects & SaaS redistribution.
                  </p>
                </button>
              </div>
            </div>
          )}

          {/* Creator Profile */}
          <div className="p-3.5 rounded-2xl bg-stone-50 border border-stone-200 flex items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <img 
                src={product.creator.avatar} 
                alt={product.creator.name} 
                className="w-10 h-10 rounded-full object-cover border border-stone-200"
              />
              <div>
                <div className="flex items-center gap-1.5 font-bold text-xs text-stone-900">
                  <span>{product.creator.name}</span>
                  {product.creator.verified && <CheckCircle2 className="w-3.5 h-3.5 text-[#e06344]" />}
                </div>
                <span className="text-stone-500 text-xs">{product.creator.handle}</span>
              </div>
            </div>
            <div className="text-right">
              <div className="text-xs font-bold text-stone-800 font-mono">
                {product.creator.salesCount.toLocaleString()}
              </div>
              <div className="text-[10px] text-stone-500">Total Asset Sales</div>
            </div>
          </div>

        </div>

        {/* Modal Action Footer */}
        <div className="px-6 py-4 bg-stone-50 border-t border-stone-200 flex items-center justify-between gap-4">
          <div>
            <div className="text-[11px] text-stone-500">Digital Archive Package</div>
            <div className="text-xl font-extrabold text-stone-900 font-mono">
              {isFree ? (
                <span className="text-emerald-700 font-black">FREE DOWNLOAD</span>
              ) : (
                formatPrice(finalPrice)
              )}
            </div>
          </div>

          <div className="flex items-center gap-3">
            {isPurchased ? (
              <button
                type="button"
                onClick={() => {
                  onInstantDownload(product);
                  onClose();
                }}
                className="flex items-center gap-2 px-5 py-2.5 rounded-xl keycap-soft-sage text-xs cursor-pointer"
              >
                <Download className="w-4 h-4" />
                <span>Download Bundle</span>
              </button>
            ) : isFree ? (
              <button
                type="button"
                onClick={() => {
                  onInstantDownload(product);
                  onClose();
                }}
                className="flex items-center gap-2 px-5 py-2.5 rounded-xl keycap-soft-sage text-xs cursor-pointer"
              >
                <Download className="w-4 h-4" />
                <span>Download Free</span>
              </button>
            ) : isInCart ? (
              <button
                type="button"
                disabled
                className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-stone-200 text-stone-600 font-medium text-xs cursor-default"
              >
                <Check className="w-4 h-4 text-stone-600" />
                <span>Already In Cart</span>
              </button>
            ) : (
              <button
                type="button"
                onClick={() => {
                  onAddToCart(product, selectedLicense);
                  onClose();
                }}
                className="flex items-center gap-2 px-5 py-2.5 rounded-xl keycap-soft-terracotta text-xs cursor-pointer shadow-sm"
              >
                <ShoppingBag className="w-4 h-4" />
                <span>Add to Cart ({formatPrice(finalPrice)})</span>
              </button>
            )}
          </div>
        </div>

      </div>

    </div>
  );
};
