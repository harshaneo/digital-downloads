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
    <div className="lg:hidden fixed bottom-5 left-1/2 -translate-x-1/2 z-40 max-w-[92vw]">
      <nav 
        aria-label="Mobile quick actions"
        className="flex items-center gap-1.5 px-3 py-2 rounded-full backdrop-blur-2xl bg-[#0e1014]/95 border border-white/[0.10] shadow-[0_12px_32px_rgba(0,0,0,0.6)]"
      >
        {/* 1. Discover / Feed */}
        <button
          type="button"
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="flex flex-col items-center justify-center w-11 h-11 rounded-full text-zinc-400 hover:text-white hover:bg-white/[0.06] active:scale-90 transition-all cursor-pointer"
          aria-label="Scroll to top"
        >
          <Compass className="w-5 h-5 text-indigo-400" />
        </button>

        {/* 2. Categories Drawer */}
        <button
          type="button"
          onClick={onToggleSidebarMobile}
          className="flex flex-col items-center justify-center w-11 h-11 rounded-full text-zinc-400 hover:text-white hover:bg-white/[0.06] active:scale-90 transition-all cursor-pointer"
          aria-label="Browse categories"
        >
          <Layers className="w-5 h-5 text-emerald-400" />
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
            <span className="absolute top-1 right-1 w-4 h-4 rounded-full bg-rose-500 text-white font-mono font-bold text-[9px] flex items-center justify-center shadow-xs">
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
            <span className="absolute top-1 right-1 w-4 h-4 rounded-full bg-white text-[#08090b] font-mono font-bold text-[9px] flex items-center justify-center shadow-xs">
              {purchasedCount}
            </span>
          )}
        </button>

        {/* 5. Cart Pill */}
        <button
          type="button"
          onClick={onOpenCart}
          className="flex items-center gap-1.5 pl-3 pr-4 py-2 rounded-full bg-white hover:bg-zinc-200 text-[#08090b] text-xs font-bold shadow-sm active:scale-95 transition-all cursor-pointer ml-1"
          aria-label="View Cart"
        >
          <ShoppingBag className="w-4 h-4 text-[#08090b]" />
          <span>{cartCount > 0 ? formatPrice(cartTotal) : 'Bag'}</span>
          {cartCount > 0 && (
            <span className="w-4 h-4 rounded-full bg-[#08090b] text-white font-mono font-bold text-[9px] flex items-center justify-center ml-0.5">
              {cartCount}
            </span>
          )}
        </button>
      </nav>
    </div>
  );
};
