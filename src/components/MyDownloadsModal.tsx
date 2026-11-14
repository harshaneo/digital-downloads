import React, { useState } from 'react';
import { PurchasedItem } from '../types';
import { 
  X, 
  Download, 
  Key, 
  Copy, 
  Check, 
  Search, 
  DownloadCloud, 
  Calendar
} from 'lucide-react';
import { triggerBlobDownload, createLicenseManifest } from '../services/license-service';

interface MyDownloadsModalProps {
  isOpen: boolean;
  onClose: () => void;
  purchases: PurchasedItem[];
  formatPrice: (amountInUSD: number) => string;
}

export const MyDownloadsModal: React.FC<MyDownloadsModalProps> = ({
  isOpen,
  onClose,
  purchases
}) => {
  if (!isOpen) return null;

  const [search, setSearch] = useState('');
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  const filtered = purchases.filter(p => 
    p.product.title.toLowerCase().includes(search.toLowerCase()) ||
    p.licenseKey.toLowerCase().includes(search.toLowerCase())
  );

  const copyToClipboard = (key: string) => {
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(key);
    }
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 2500);
  };

  const handleDownload = (item: PurchasedItem) => {
    const manifest = createLicenseManifest(item);
    triggerBlobDownload(`${item.product.id}-package.json`, manifest);
  };

  return (
    <div 
      role="dialog" 
      aria-modal="true"
      aria-label="My Downloads Library"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/75 backdrop-blur-md animate-in fade-in duration-200"
    >
      <div className="absolute inset-0" onClick={onClose} />

      <div className="relative w-full max-w-3xl bg-[var(--bg-surface)] border border-white/[0.08] rounded-2xl overflow-hidden shadow-2xl flex flex-col z-10 max-h-[90vh] text-[var(--text-primary)]">
        
        {/* Header */}
        <div className="px-6 py-4 border-b border-white/[0.08] flex items-center justify-between bg-[var(--bg-surface-elevated)]">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-white/[0.05] border border-white/[0.08] flex items-center justify-center text-white">
              <DownloadCloud className="w-4 h-4" />
            </div>
            <div>
              <h2 className="font-bold text-sm text-white tracking-tight">My Downloads Library</h2>
              <p className="text-[11px] text-zinc-400">
                {purchases.length} digital {purchases.length === 1 ? 'asset' : 'assets'} in your lifetime collection
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="p-1.5 rounded-lg text-zinc-400 hover:text-white hover:bg-white/[0.06] transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Search inside vault */}
        {purchases.length > 0 && (
          <div className="p-4 border-b border-white/[0.06] bg-[var(--bg-surface)]">
            <div className="relative">
              <Search className="w-4 h-4 text-zinc-500 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search your library by asset name or license key..."
                className="w-full pl-9 pr-4 py-2 bg-[var(--bg-surface-elevated)] border border-white/[0.08] rounded-xl text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-white/20"
              />
            </div>
          </div>
        )}

        {/* Content list */}
        <div className="flex-1 overflow-y-auto p-6 space-y-3">
          {purchases.length === 0 ? (
            <div className="py-16 text-center space-y-3">
              <div className="w-16 h-16 rounded-2xl bg-[var(--bg-surface-elevated)] border border-white/[0.08] flex items-center justify-center mx-auto text-zinc-500">
                <DownloadCloud className="w-7 h-7" />
              </div>
              <h3 className="font-bold text-base text-white">No downloads yet</h3>
              <p className="text-xs text-zinc-400 max-w-xs mx-auto">
                Any asset you claim or purchase will appear here with unlimited re-download access.
              </p>
              <button
                type="button"
                onClick={onClose}
                className="mt-2 px-4 py-2 bg-white hover:bg-zinc-200 text-[var(--bg-base)] rounded-xl text-xs font-bold transition-colors cursor-pointer"
              >
                Browse Catalog
              </button>
            </div>
          ) : filtered.length === 0 ? (
            <div className="py-12 text-center text-zinc-500 text-xs">
              No purchased items match "{search}".
            </div>
          ) : (
            filtered.map((item) => (
              <div 
                key={item.id} 
                className="p-4 rounded-xl bg-[var(--bg-surface-elevated)] border border-white/[0.06] hover:border-white/[0.12] transition-colors space-y-3"
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-center gap-3 min-w-0">
                    <div className="w-12 h-12 rounded-lg bg-[var(--bg-surface)] border border-white/[0.08] flex items-center justify-center font-mono font-bold text-xs text-zinc-300 shrink-0">
                      {item.product.fileFormat}
                    </div>
                    <div className="min-w-0">
                      <h4 className="text-sm font-semibold text-white truncate">
                        {item.product.title}
                      </h4>
                      <div className="flex items-center gap-2 text-[11px] text-zinc-400 mt-0.5">
                        <span className="font-mono">{item.product.fileSize}</span>
                        <span>•</span>
                        <span>v{item.product.version}</span>
                        <span>•</span>
                        <span className="flex items-center gap-1">
                          <Calendar className="w-3 h-3 text-zinc-500" />
                          {item.purchaseDate}
                        </span>
                      </div>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={() => handleDownload(item)}
                    className="btn-primary flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold shrink-0 cursor-pointer"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>Download Bundle</span>
                  </button>
                </div>

                {/* License Key line */}
                <div className="flex items-center justify-between gap-2 p-2 rounded-lg bg-[var(--bg-surface)] border border-white/[0.06] font-mono text-xs">
                  <div className="flex items-center gap-2 text-zinc-400 min-w-0">
                    <Key className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                    <span className="text-zinc-500 text-[11px] uppercase font-bold">Key:</span>
                    <span className="text-zinc-200 truncate text-[11px] font-semibold">{item.licenseKey}</span>
                  </div>

                  <button
                    type="button"
                    onClick={() => copyToClipboard(item.licenseKey)}
                    className="p-1 text-zinc-400 hover:text-white transition-colors cursor-pointer shrink-0 flex items-center gap-1 text-[11px]"
                  >
                    {copiedKey === item.licenseKey ? (
                      <span className="text-emerald-400 font-sans font-bold flex items-center gap-1">
                        <Check className="w-3 h-3" /> Copied
                      </span>
                    ) : (
                      <span className="hover:text-white flex items-center gap-1">
                        <Copy className="w-3 h-3" /> Copy
                      </span>
                    )}
                  </button>
                </div>

              </div>
            ))
          )}
        </div>

        {/* Footer */}
        <div className="px-6 py-4 bg-[var(--bg-surface)] border-t border-white/[0.08] flex justify-end">
          <button
            type="button"
            onClick={onClose}
            className="px-5 py-2 rounded-xl bg-white hover:bg-zinc-200 text-[var(--bg-base)] text-xs font-bold transition-colors cursor-pointer"
          >
            Close Library
          </button>
        </div>

      </div>
    </div>
  );
};
