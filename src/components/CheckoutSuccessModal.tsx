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
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-stone-900/40 backdrop-blur-sm animate-in fade-in duration-200"
    >
      <div className="absolute inset-0" onClick={onClose} />

      <div className="relative w-full max-w-2xl bg-white border border-stone-200 rounded-3xl overflow-hidden shadow-2xl flex flex-col z-10 max-h-[90vh] text-stone-800">
        
        {/* Header */}
        <div className="p-6 bg-gradient-to-r from-emerald-50 via-stone-50 to-white border-b border-stone-200 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-emerald-100 border border-emerald-300 flex items-center justify-center text-emerald-700 shadow-2xs">
              <CheckCircle2 className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-lg font-extrabold text-stone-900">Order Confirmed & Ready!</h2>
              <p className="text-xs text-emerald-800 font-mono font-medium">
                {purchases.length} digital {purchases.length === 1 ? 'asset' : 'assets'} unlocked
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="p-1.5 rounded-xl text-stone-500 hover:text-stone-900 hover:bg-stone-200/60 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content list */}
        <div className="flex-1 overflow-y-auto p-6 space-y-4">
          <p className="text-xs text-stone-600">
            Your license keys and download archives are ready. Download the files immediately below or access them anytime from your <strong className="text-stone-900">My Downloads</strong> library.
          </p>

          <div className="space-y-3">
            {purchases.map((item) => (
              <div 
                key={item.id} 
                className="p-4 rounded-2xl bg-stone-50 border border-stone-200/80 space-y-3 shadow-2xs"
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-center gap-3 min-w-0">
                    <div className="w-10 h-10 rounded-xl bg-white border border-stone-200 flex items-center justify-center font-mono font-bold text-xs text-stone-700 shrink-0 shadow-xs">
                      {item.product.fileFormat}
                    </div>
                    <div className="min-w-0">
                      <h4 className="text-sm font-bold text-stone-900 truncate">
                        {item.product.title}
                      </h4>
                      <div className="text-[11px] text-stone-500 font-mono">
                        Invoice: {item.invoiceNumber} • {item.product.fileSize}
                      </div>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={() => handleDownload(item)}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl keycap-soft-sage text-xs cursor-pointer shadow-xs shrink-0"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>Download</span>
                  </button>
                </div>

                {/* License Key Box */}
                <div className="flex items-center justify-between gap-2 p-2.5 rounded-xl bg-white border border-stone-200 font-mono text-xs shadow-2xs">
                  <div className="flex items-center gap-2 text-stone-500 min-w-0">
                    <Key className="w-3.5 h-3.5 text-amber-600 shrink-0" />
                    <span className="text-stone-400 text-[10px] uppercase font-bold">Key:</span>
                    <span className="text-stone-800 truncate font-semibold">{item.licenseKey}</span>
                  </div>

                  <button
                    type="button"
                    onClick={() => copyToClipboard(item.licenseKey)}
                    className="p-1 text-stone-400 hover:text-stone-900 transition-colors cursor-pointer shrink-0"
                    title="Copy License Key"
                  >
                    {copiedKey === item.licenseKey ? (
                      <Check className="w-3.5 h-3.5 text-emerald-600" />
                    ) : (
                      <Copy className="w-3.5 h-3.5" />
                    )}
                  </button>
                </div>

              </div>
            ))}
          </div>

          <div className="p-3.5 rounded-2xl bg-emerald-50/60 border border-emerald-200/60 flex items-center gap-2.5 text-xs text-emerald-900">
            <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>Perpetual commercial rights included with free lifetime version updates.</span>
          </div>
        </div>

        {/* Footer */}
        <div className="p-5 bg-stone-50 border-t border-stone-200 flex items-center justify-between gap-3">
          <button
            type="button"
            onClick={() => {
              onClose();
              onOpenMyDownloads();
            }}
            className="text-xs text-[#e06344] hover:text-[#cb4d2e] font-bold cursor-pointer"
          >
            Go to My Downloads Vault →
          </button>

          <button
            type="button"
            onClick={onClose}
            className="px-5 py-2 rounded-xl keycap-soft-light text-stone-800 text-xs font-bold transition-colors cursor-pointer"
          >
            Done
          </button>
        </div>

      </div>
    </div>
  );
};
