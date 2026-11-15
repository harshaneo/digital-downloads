import React from 'react';
import { Currency, ProductCategory } from '../types';
import { 
  Search, 
  ShoppingBag, 
  Heart, 
  DownloadCloud, 
  X,
  Menu
} from 'lucide-react';

interface UpperNavigationProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  currency: Currency;
  onCurrencyChange: (c: Currency) => void;
  cartCount: number;
  cartTotal: number;
  onOpenCart: () => void;
  wishlistCount: number;
  onOpenWishlist: () => void;
  purchasedCount: number;
  onOpenPurchases: () => void;
  onToggleSidebarMobile: () => void;
  activeCategory?: ProductCategory;
  onSelectCategory?: (cat: ProductCategory) => void;
  formatPrice: (amountInUSD: number) => string;
}

export const UpperNavigation: React.FC<UpperNavigationProps> = ({
  searchQuery,
  onSearchChange,
  currency,
  onCurrencyChange,
  cartCount,
  cartTotal,
  onOpenCart,
  wishlistCount,
  onOpenWishlist,
  purchasedCount,
  onOpenPurchases,
  onToggleSidebarMobile,
  formatPrice
}) => {
  return (
    <header className="sticky top-0 z-40 w-full max-w-full overflow-hidden nav-frosted-capsule px-3 sm:px-6 lg:px-8 py-2.5 transition-all bg-[var(--bg-raised)]/95 backdrop-blur-md border-b border-white/[0.08]">
      <div className="flex items-center justify-between gap-2 sm:gap-3 max-w-6xl mx-auto w-full min-w-0">
        
        {/* Left: Mobile Toggle & Curatorial Brand Stamp */}
        <div className="flex items-center gap-2 sm:gap-3 shrink-0">
          <button 
            type="button"
            onClick={onToggleSidebarMobile}
            className="p-2 rounded-xl bg-[#0c0c0c] hover:bg-[#181818] text-zinc-300 border border-white/10 transition-colors cursor-pointer"
            aria-label="Toggle navigation drawer"
            title="Open Vault Index"
          >
            <Menu className="w-4 h-4" />
          </button>

          <a href="#" className="flex items-center gap-3 group">
            {/* Custom Modern Geometric Logo Mark */}
            <div className="w-9 h-9 rounded-xl bg-white text-zinc-950 flex items-center justify-center font-bold shadow-xs group-hover:scale-105 transition-all relative overflow-hidden border border-white/20">
              <svg 
                viewBox="0 0 32 32" 
                fill="none" 
                xmlns="http://www.w3.org/2000/svg" 
                className="w-5 h-5 text-zinc-950"
              >
                <path 
                  d="M16 3L28 9.5V22.5L16 29L4 22.5V9.5L16 3Z" 
                  stroke="currentColor" 
                  strokeWidth="2" 
                  strokeLinejoin="round" 
                />
                <path 
                  d="M16 3V16M28 9.5L16 16M4 9.5L16 16" 
                  stroke="currentColor" 
                  strokeWidth="1.75" 
                  strokeLinejoin="round" 
                  strokeOpacity="0.7"
                />
                <circle 
                  cx="16" 
                  cy="16" 
                  r="3.5" 
                  className="fill-indigo-500" 
                />
              </svg>
            </div>

            <div>
              <div className="flex items-center gap-2 leading-none">
                <span className="font-extrabold text-[15px] tracking-tight text-white font-sans">
                  Nexus<span className="text-indigo-400">.</span>Vault
                </span>
              </div>
              <p className="text-[11px] text-zinc-400 hidden sm:block mt-0.5 font-medium tracking-tight">
                Production Artifacts & Executive Legal Kits
              </p>
            </div>
          </a>
        </div>

        {/* Center: Tactile Pill Search Bar */}
        <div className="flex-1 min-w-0 max-w-lg mx-1 sm:mx-6">
          <div className="relative group w-full">
            <Search className="w-3.5 sm:w-4 h-3.5 sm:h-4 text-zinc-400 group-focus-within:text-indigo-400 absolute left-3 sm:left-3.5 top-1/2 -translate-y-1/2 transition-colors pointer-events-none" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              placeholder="Search contracts, RFPs, SOPs, financial models..."
              className="w-full pl-8 sm:pl-9 pr-8 sm:pr-16 py-1.5 sm:py-2 text-xs bg-[var(--bg-surface)] hover:bg-[var(--bg-surface-elevated)] focus:bg-[var(--bg-surface-elevated)] border border-white/10 focus:border-indigo-500/40 rounded-full text-[var(--text-primary)] placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/15 transition-all font-sans"
            />
            {searchQuery ? (
              <button 
                type="button"
                onClick={() => onSearchChange('')}
                className="absolute right-2.5 sm:right-3 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-white p-0.5 rounded cursor-pointer"
                title="Clear search"
                aria-label="Clear Search"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            ) : (
              <div className="hidden md:flex items-center gap-1 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none select-none">
                <kbd className="px-1.5 py-0.5 text-[11px] font-mono text-zinc-400 bg-[var(--bg-surface-elevated)] border border-white/10 rounded">
                  ⌘K
                </kbd>
                <span className="text-zinc-600 text-[11px] font-mono">/</span>
                <kbd className="px-1.5 py-0.5 text-[11px] font-mono text-zinc-400 bg-[var(--bg-surface-elevated)] border border-white/10 rounded">
                  /
                </kbd>
              </div>
            )}
          </div>
        </div>

        {/* Right Actions: Currency Selector, Wishlist, Library, Bag */}
        <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
          
          {/* Subtle Currency Selector Pill */}
          <div className="hidden md:flex items-center bg-[#000000] border border-white/10 rounded-lg p-0.5 text-[11px] font-medium text-zinc-300">
            {(['USD', 'EUR', 'GBP'] as Currency[]).map((c) => (
              <button
                key={c}
                type="button"
                onClick={() => onCurrencyChange(c)}
                className={`px-2.5 py-1 rounded-md transition-all cursor-pointer ${
                  currency === c 
                    ? 'btn-primary text-zinc-950 font-bold shadow-sm' 
                    : 'text-zinc-400 hover:text-white'
                }`}
              >
                {c === 'USD' ? '$ USD' : c === 'EUR' ? '€ EUR' : '£ GBP'}
              </button>
            ))}
          </div>

          {/* Wishlist Trigger Pill */}
          <button
            type="button"
            onClick={onOpenWishlist}
            className={`hidden sm:inline-flex relative p-2 rounded-lg transition-all cursor-pointer active:scale-95 ${
              wishlistCount > 0 
                ? 'bg-rose-500/15 border border-rose-500/30 text-rose-400 hover:bg-rose-500/20' 
                : 'btn-tactile-dark text-zinc-400 hover:text-white hover:border-rose-500/20'
            }`}
            title="Open Curated Wishlist"
            aria-label="Open Curated Wishlist"
          >
            <Heart className={`w-4 h-4 ${wishlistCount > 0 ? 'fill-rose-500 text-rose-500' : 'text-zinc-400'}`} />
            {wishlistCount > 0 && (
              <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-rose-500 text-white font-mono font-bold text-[10px] flex items-center justify-center shadow-xs">
                {wishlistCount}
              </span>
            )}
          </button>

          {/* Archival Vault & Library Button */}
          <button
            type="button"
            onClick={onOpenPurchases}
            className={`hidden sm:inline-flex relative p-2 rounded-lg transition-all cursor-pointer active:scale-95 ${
              purchasedCount > 0
                ? 'bg-sky-500/15 border border-sky-500/30 text-sky-300 hover:bg-sky-500/20'
                : 'btn-tactile-dark text-zinc-400 hover:text-white'
            }`}
            title="Archive Vault & Downloads"
            aria-label="Archive Vault & Downloads"
          >
            <DownloadCloud className="w-4 h-4" />
            {purchasedCount > 0 && (
              <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-sky-500 text-white font-mono font-bold text-[10px] flex items-center justify-center shadow-xs">
                {purchasedCount}
              </span>
            )}
          </button>

          {/* Shopping Bag Button (Crisp White Button with Emerald Counter Badge) */}
          <button
            type="button"
            onClick={onOpenCart}
            className="btn-primary flex items-center gap-1.5 sm:gap-2 px-3.5 sm:px-4 py-1.5 rounded-lg text-xs font-bold cursor-pointer select-none shrink-0"
            aria-label="Open Shopping Bag"
          >
            <ShoppingBag className="w-3.5 h-3.5 text-zinc-950" />
            <span className="hidden xs:inline">Bag</span>
            {cartCount > 0 && (
              <span className="px-1.5 py-0.2 rounded-full bg-emerald-500 text-black font-extrabold text-[11px]">
                {cartCount}
              </span>
            )}
            {cartTotal > 0 && (
              <span className="hidden sm:inline pl-1.5 border-l border-zinc-300 font-mono text-zinc-900 font-bold">
                {formatPrice(cartTotal)}
              </span>
            )}
          </button>

        </div>

      </div>
    </header>
  );
};
