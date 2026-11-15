import React from 'react';
import { PurchasedItem } from '../types';
import { 
  CheckCircle2, 
  Download, 
  Copy, 
  Check, 
  X, 
  Key, 
  ShieldCheck
} from 'lucide-react';
import { triggerBlobDownload, createLicenseManifest } from '../services/license-service';

interface CheckoutSuccessModalProps {
  purchases: PurchasedItem[];
  onClose: () => void;
  onOpenMyDownloads: () => void;
  formatPrice: (amountInUSD: number) => string;
}

export const CheckoutSuccessModal: React.FC<CheckoutSuccessModalProps> = ({
  purchases,
  onClose,
  onOpenMyDownloads
}) => {
  const [copiedKey, setCopiedKey] = React.useState<string | null>(null);

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
      aria-label="Order Confirmation Modal"
      className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 bg-black/85 backdrop-blur-xl animate-in fade-in duration-200"
    >
      <div className="absolute inset-0" onClick={onClose} />

      <div className="relative w-full max-w-2xl bg-[#090909] border border-white/10 rounded-t-3xl sm:rounded-3xl overflow-hidden shadow-2xl flex flex-col z-10 max-h-[92vh] text-white">
        
        {/* Mobile Sheet Grab Indicator */}
        <div className="sheet-grabber sm:hidden" />

        {/* Header */}
        <div className="p-6 bg-[#090909] border-b border-white/[0.08] flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/15 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
              <CheckCircle2 className="w-5 h-5 text-emerald-400" />
            </div>
            <div>
              <h2 className="text-base font-bold text-white tracking-tight">Order Confirmed & Ready</h2>
              <p className="text-xs text-emerald-400 font-mono font-medium">
                {purchases.length} digital {purchases.length === 1 ? 'asset' : 'assets'} unlocked
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

        {/* Content list */}
        <div className="flex-1 overflow-y-auto p-6 space-y-4">
          <p className="text-xs text-zinc-400">
            Your license keys and download archives are ready. Download the files immediately below or access them anytime from your <strong className="text-white">My Downloads</strong> library.
          </p>

          <div className="space-y-3">
            {purchases.map((item) => (
              <div 
                key={item.id} 
                className="p-4 rounded-xl bg-[var(--bg-surface-elevated)] border border-white/[0.06] space-y-3"
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-center gap-3 min-w-0">
                    <div className="w-10 h-10 rounded-lg bg-[var(--bg-surface)] border border-white/[0.08] flex items-center justify-center font-mono font-bold text-xs text-zinc-300 shrink-0">
                      {item.product.fileFormat}
                    </div>
                    <div className="min-w-0">
                      <h4 className="text-sm font-semibold text-white truncate">
                        {item.product.title}
                      </h4>
                      <div className="text-[11px] text-zinc-500 font-mono">
                        Invoice: {item.invoiceNumber} • {item.product.fileSize}
                      </div>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={() => handleDownload(item)}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white hover:bg-zinc-200 text-[var(--bg-base)] font-semibold text-xs cursor-pointer shrink-0 transition-colors"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>Download</span>
                  </button>
                </div>

                {/* License Key Box */}
                <div className="flex items-center justify-between gap-2 p-2.5 rounded-lg bg-[var(--bg-surface)] border border-white/[0.06] font-mono text-xs">
                  <div className="flex items-center gap-2 text-zinc-400 min-w-0">
                    <Key className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                    <span className="text-amber-400/80 text-[11px] uppercase font-bold">Key:</span>
                    <span className="text-zinc-200 truncate font-semibold">{item.licenseKey}</span>
                  </div>

                  <button
                    type="button"
                    onClick={() => copyToClipboard(item.licenseKey)}
                    className="p-1 text-zinc-400 hover:text-white transition-colors cursor-pointer shrink-0"
                    title="Copy License Key"
                  >
                    {copiedKey === item.licenseKey ? (
                      <Check className="w-3.5 h-3.5 text-emerald-400" />
                    ) : (
                      <Copy className="w-3.5 h-3.5" />
                    )}
                  </button>
                </div>

              </div>
            ))}
          </div>

          <div className="p-3.5 rounded-xl badge-3d flex items-center gap-2.5 text-xs text-slate-200">
            <ShieldCheck className="w-4 h-4 text-slate-300 shrink-0" />
            <span>Perpetual commercial rights included with free lifetime version updates.</span>
          </div>
        </div>

        {/* Footer */}
        <div className="p-5 bg-[var(--bg-surface)] border-t border-white/[0.08] flex items-center justify-between gap-3">
          <button
            type="button"
            onClick={() => {
              onClose();
              onOpenMyDownloads();
            }}
            className="text-xs text-slate-300 hover:text-white font-bold cursor-pointer transition-colors"
          >
            Go to My Downloads Vault →
          </button>

          <button
            type="button"
            onClick={onClose}
            className="px-5 py-2 rounded-lg btn-primary text-xs font-bold cursor-pointer"
          >
            Done
          </button>
        </div>

      </div>
    </div>
  );
};
