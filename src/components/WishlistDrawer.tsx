import React from 'react';
import { DigitalProduct, Currency } from '../types';
import { 
  X, 
  Heart, 
  ShoppingBag, 
  Trash2, 
  ArrowRight,
  Sparkles
} from 'lucide-react';

interface WishlistDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  wishlistProducts: DigitalProduct[];
  onRemoveFromWishlist: (product: DigitalProduct) => void;
  onAddToCart: (product: DigitalProduct) => void;
  onQuickLook: (product: DigitalProduct) => void;
  formatPrice: (amountInUSD: number) => string;
}

export const WishlistDrawer: React.FC<WishlistDrawerProps> = ({
  isOpen,
  onClose,
  wishlistProducts,
  onRemoveFromWishlist,
  onAddToCart,
  onQuickLook,
  formatPrice
}) => {
  if (!isOpen) return null;

  return (
    <div 
      role="dialog" 
      aria-modal="true" 
      aria-label="Saved Wishlist"
      className="fixed inset-0 z-50 overflow-hidden bg-black/75 backdrop-blur-md animate-in fade-in duration-200"
    >
      <div className="absolute inset-0" onClick={onClose} />

      <div className="absolute inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-[var(--bg-surface)] border-l border-white/10 shadow-2xl flex flex-col z-10 text-[var(--text-primary)]">
          
          {/* Mobile Sheet Grab Indicator */}
          <div className="w-10 h-1 bg-zinc-700 rounded-full mx-auto my-2 sm:hidden shrink-0" />

          {/* Header */}
          <div className="px-5 py-4 border-b border-white/[0.08] flex items-center justify-between bg-[#0e1014]">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-rose-950/40 border border-rose-500/40 flex items-center justify-center text-rose-400">
                <Heart className="w-4 h-4 fill-rose-400" />
              </div>
              <div>
                <h2 className="font-bold text-base text-white">Saved Wishlist</h2>
                <p className="text-xs text-zinc-400">
                  {wishlistProducts.length} {wishlistProducts.length === 1 ? 'item saved' : 'items saved'}
                </p>
              </div>
            </div>

            <button
              type="button"
              onClick={onClose}
              className="p-1.5 rounded-xl text-zinc-400 hover:text-white hover:bg-white/[0.05] transition-colors cursor-pointer"
              aria-label="Close Wishlist"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Wishlist Items List */}
          <div className="flex-1 overflow-y-auto p-5 space-y-3">
            {wishlistProducts.length === 0 ? (
              <div className="py-20 text-center space-y-3">
                <div className="w-16 h-16 rounded-2xl bg-[var(--bg-surface-elevated)] border border-white/10 flex items-center justify-center mx-auto text-zinc-500">
                  <Heart className="w-7 h-7" />
                </div>
                <h3 className="font-bold text-base text-white">Your wishlist is empty</h3>
                <p className="text-xs text-zinc-400 max-w-xs mx-auto">
                  Click the heart icon on any contract, RFP kit, SOP, or model to save it here for later.
                </p>
                <button
                  type="button"
                  onClick={onClose}
                  className="mt-2 px-4 py-2 btn-primary text-zinc-950 rounded-xl text-xs font-semibold transition-all cursor-pointer shadow-sm active:scale-95"
                >
                  Browse Catalog
                </button>
              </div>
            ) : (
              wishlistProducts.map((product) => {
                const isFree = product.price === 0;
                return (
                  <div 
                    key={product.id}
                    className="p-3.5 rounded-2xl bg-[var(--bg-surface-elevated)] border border-white/[0.08] shadow-xs hover:border-white/20 transition-all flex flex-col gap-3 group"
                  >
                    <div className="flex items-start gap-3">
                      {/* Thumbnail badge */}
                      <div className="w-12 h-12 rounded-xl bg-[#0e1014] border border-white/10 flex items-center justify-center font-mono font-bold text-xs text-zinc-300 shrink-0">
                        {product.fileFormat}
                      </div>

                      <div className="flex-1 min-w-0">
                        <h4 
                          onClick={() => {
                            onQuickLook(product);
                            onClose();
                          }}
                          className="text-xs font-bold text-white hover:text-amber-400 transition-colors truncate cursor-pointer"
                        >
                          {product.title}
                        </h4>
                        <p className="text-[11px] text-zinc-400 truncate mt-0.5">
                          {product.subtitle}
                        </p>
                        <div className="flex items-center gap-2 mt-1">
                          <span className="text-xs font-extrabold text-white font-mono">
                            {isFree ? 'FREE' : formatPrice(product.price)}
                          </span>
                          <span className="text-[10px] text-zinc-600">•</span>
                          <span className="text-[10px] text-zinc-400">{product.fileSize}</span>
                        </div>
                      </div>

                      <button
                        type="button"
                        onClick={() => onRemoveFromWishlist(product)}
                        className="p-1.5 text-zinc-400 hover:text-rose-400 hover:bg-rose-950/40 rounded-lg transition-colors cursor-pointer"
                        title="Remove from wishlist"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>

                    {/* Actions row */}
                    <div className="pt-2 border-t border-white/[0.08] flex items-center justify-between gap-2">
                      <button
                        type="button"
                        onClick={() => {
                          onQuickLook(product);
                          onClose();
                        }}
                        className="text-[11px] font-semibold text-zinc-400 hover:text-white transition-colors cursor-pointer"
                      >
                        View Details
                      </button>

                      <button
                        type="button"
                        onClick={() => {
                          onAddToCart(product);
                          onClose();
                        }}
                        className="btn-primary flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-zinc-950 text-xs font-semibold shadow-xs cursor-pointer active:scale-95 transition-all"
                      >
                        <ShoppingBag className="w-3.5 h-3.5" />
                        <span>Add to Cart</span>
                      </button>
                    </div>

                  </div>
                );
              })
            )}
          </div>

          {/* Footer */}
          {wishlistProducts.length > 0 && (
            <div className="p-4 bg-[#0e1014] border-t border-white/[0.08] flex items-center justify-between">
              <span className="text-xs text-zinc-400">
                {wishlistProducts.length} items saved in your browser
              </span>
              <button
                type="button"
                onClick={onClose}
                className="btn-secondary px-4 py-2 rounded-xl text-xs font-semibold cursor-pointer"
              >
                Close
              </button>
            </div>
          )}

        </div>
      </div>

    </div>
  );
};
