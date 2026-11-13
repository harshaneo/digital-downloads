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
      className="fixed inset-0 z-50 overflow-hidden bg-stone-900/30 backdrop-blur-xs animate-in fade-in duration-200"
    >
      <div className="absolute inset-0" onClick={onClose} />

      <div className="absolute inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-white border-l border-stone-200 shadow-2xl flex flex-col z-10 text-stone-800">
          
          {/* Mobile Sheet Grab Indicator */}
          <div className="w-10 h-1 bg-stone-300 rounded-full mx-auto my-2 sm:hidden shrink-0" />

          {/* Header */}
          <div className="px-5 py-4 border-b border-stone-200/80 flex items-center justify-between bg-stone-50/60">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-rose-50 border border-rose-200 flex items-center justify-center text-rose-500">
                <Heart className="w-4 h-4 fill-rose-500" />
              </div>
              <div>
                <h2 className="font-bold text-base text-stone-900">Saved Wishlist</h2>
                <p className="text-xs text-stone-500">
                  {wishlistProducts.length} {wishlistProducts.length === 1 ? 'item saved' : 'items saved'}
                </p>
              </div>
            </div>

            <button
              type="button"
              onClick={onClose}
              className="p-1.5 rounded-xl text-stone-400 hover:text-stone-700 hover:bg-stone-100 transition-colors cursor-pointer"
              aria-label="Close Wishlist"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Wishlist Items List */}
          <div className="flex-1 overflow-y-auto p-5 space-y-3">
            {wishlistProducts.length === 0 ? (
              <div className="py-20 text-center space-y-3">
                <div className="w-16 h-16 rounded-2xl bg-stone-100 border border-stone-200 flex items-center justify-center mx-auto text-stone-400">
                  <Heart className="w-7 h-7" />
                </div>
                <h3 className="font-bold text-base text-stone-900">Your wishlist is empty</h3>
                <p className="text-xs text-stone-500 max-w-xs mx-auto">
                  Click the heart icon on any design kit, font, 3D asset, or code starter to save it here for later.
                </p>
                <button
                  type="button"
                  onClick={onClose}
                  className="mt-2 px-4 py-2 bg-stone-900 hover:bg-stone-800 text-white rounded-xl text-xs font-semibold transition-all cursor-pointer shadow-sm active:scale-95"
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
                    className="p-3.5 rounded-2xl bg-white border border-stone-200/80 shadow-xs hover:border-stone-300 transition-all flex flex-col gap-3 group"
                  >
                    <div className="flex items-start gap-3">
                      {/* Thumbnail badge */}
                      <div className="w-12 h-12 rounded-xl bg-stone-100 border border-stone-200/80 flex items-center justify-center font-mono font-bold text-xs text-stone-700 shrink-0">
                        {product.fileFormat}
                      </div>

                      <div className="flex-1 min-w-0">
                        <h4 
                          onClick={() => {
                            onQuickLook(product);
                            onClose();
                          }}
                          className="text-xs font-bold text-stone-900 hover:text-indigo-600 transition-colors truncate cursor-pointer"
                        >
                          {product.title}
                        </h4>
                        <p className="text-[11px] text-stone-500 truncate mt-0.5">
                          {product.subtitle}
                        </p>
                        <div className="flex items-center gap-2 mt-1">
                          <span className="text-xs font-extrabold text-stone-900 font-mono">
                            {isFree ? 'FREE' : formatPrice(product.price)}
                          </span>
                          <span className="text-[10px] text-stone-400">•</span>
                          <span className="text-[10px] text-stone-500">{product.fileSize}</span>
                        </div>
                      </div>

                      <button
                        type="button"
                        onClick={() => onRemoveFromWishlist(product)}
                        className="p-1.5 text-stone-400 hover:text-rose-500 hover:bg-rose-50 rounded-lg transition-colors cursor-pointer"
                        title="Remove from wishlist"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>

                    {/* Actions row */}
                    <div className="pt-2 border-t border-stone-100 flex items-center justify-between gap-2">
                      <button
                        type="button"
                        onClick={() => {
                          onQuickLook(product);
                          onClose();
                        }}
                        className="text-[11px] font-semibold text-stone-600 hover:text-stone-900 transition-colors cursor-pointer"
                      >
                        View Details
                      </button>

                      <button
                        type="button"
                        onClick={() => {
                          onAddToCart(product);
                          onClose();
                        }}
                        className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-stone-900 hover:bg-stone-800 text-white text-xs font-semibold shadow-xs cursor-pointer active:scale-95 transition-all"
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
            <div className="p-4 bg-stone-50/80 border-t border-stone-200/80 flex items-center justify-between">
              <span className="text-xs text-stone-500">
                {wishlistProducts.length} items saved in your browser
              </span>
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 rounded-xl bg-white border border-stone-200 text-stone-700 hover:bg-stone-50 text-xs font-semibold shadow-2xs cursor-pointer"
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
