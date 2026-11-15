import React from 'react';
import { 
  Compass, 
  Layers, 
  Heart, 
  DownloadCloud, 
  ShoppingBag 
} from 'lucide-react';
import { Currency } from '../types';

interface MobileDockProps {
  onToggleSidebarMobile: () => void;
  onOpenWishlist: () => void;
  wishlistCount: number;
  onOpenPurchases: () => void;
  purchasedCount: number;
  onOpenCart: () => void;
  cartCount: number;
  cartTotal: number;
  currency: Currency;
  formatPrice: (amountInUSD: number) => string;
}

export const MobileDock: React.FC<MobileDockProps> = ({
  onToggleSidebarMobile,
  onOpenWishlist,
  wishlistCount,
  onOpenPurchases,
  purchasedCount,
  onOpenCart,
  cartCount,
  cartTotal,
  formatPrice
}) => {
  return (
    <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-40 max-w-[95vw] sm:max-w-max pointer-events-auto">
      <nav 
        aria-label="Universal floating app tray"
        className="flex items-center gap-1 sm:gap-2 px-3 sm:px-4 py-2 sm:py-2.5 rounded-full backdrop-blur-2xl bg-[#090909]/90 border border-white/[0.14] shadow-[0_20px_48px_rgba(0,0,0,0.95)]"
      >
        {/* 1. Discover / Feed */}
        <button
          type="button"
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="flex flex-col items-center justify-center w-11 h-11 rounded-full text-zinc-400 hover:text-white hover:bg-white/[0.06] active:scale-90 transition-all cursor-pointer"
          aria-label="Scroll to top"
        >
          <Compass className="w-5 h-5 text-slate-300" />
        </button>

        {/* 2. Categories Drawer */}
        <button
          type="button"
          onClick={onToggleSidebarMobile}
          className="flex flex-col items-center justify-center w-11 h-11 rounded-full text-zinc-400 hover:text-white hover:bg-white/[0.06] active:scale-90 transition-all cursor-pointer"
          aria-label="Browse categories"
        >
          <Layers className="w-5 h-5 text-slate-300" />
        </button>

        <div className="w-px h-6 bg-white/[0.08] mx-0.5" />

        {/* 3. Wishlist Button */}
        <button
          type="button"
          onClick={onOpenWishlist}
          className="relative flex flex-col items-center justify-center w-11 h-11 rounded-full text-zinc-400 hover:text-white hover:bg-white/[0.06] active:scale-90 transition-all cursor-pointer"
          aria-label="View Wishlist"
        >
          <Heart className={`w-5 h-5 ${wishlistCount > 0 ? 'fill-rose-500 text-rose-500' : 'text-zinc-400'}`} />
          {wishlistCount > 0 && (
            <span className="absolute top-1 right-1 w-4 h-4 rounded-full bg-rose-500 text-white font-mono font-bold text-[10px] flex items-center justify-center shadow-xs">
              {wishlistCount}
            </span>
          )}
        </button>

        {/* 4. Vault Purchases */}
        <button
          type="button"
          onClick={onOpenPurchases}
          className="relative flex flex-col items-center justify-center w-11 h-11 rounded-full text-zinc-400 hover:text-white hover:bg-white/[0.06] active:scale-90 transition-all cursor-pointer"
          aria-label="View My Downloads"
        >
          <DownloadCloud className="w-5 h-5 text-zinc-300" />
          {purchasedCount > 0 && (
            <span className="absolute top-1 right-1 w-4 h-4 rounded-full bg-sky-500 text-white font-mono font-bold text-[10px] flex items-center justify-center shadow-xs">
              {purchasedCount}
            </span>
          )}
        </button>

        {/* 5. Cart Pill */}
        <button
          type="button"
          onClick={onOpenCart}
          className="btn-primary flex items-center gap-1.5 pl-3.5 pr-4 py-2 rounded-lg text-xs font-bold active:scale-95 transition-all cursor-pointer ml-1"
          aria-label="View Cart"
        >
          <ShoppingBag className="w-4 h-4 text-zinc-950" />
          <span>{cartCount > 0 ? formatPrice(cartTotal) : 'Bag'}</span>
          {cartCount > 0 && (
            <span className="px-1.5 py-0.5 rounded-full bg-emerald-500 text-black font-extrabold text-[10px] ml-0.5">
              {cartCount}
            </span>
          )}
        </button>
      </nav>
    </div>
  );
};
