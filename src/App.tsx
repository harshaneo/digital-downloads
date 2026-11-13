import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { 
  DigitalProduct, 
  CartItem, 
  PurchasedItem, 
  Currency, 
  FilterState, 
  ProductCategory, 
  ViewMode,
  LicenseTierId
} from './types';
import { DIGITAL_PRODUCTS } from './data/products';
import { UpperNavigation } from './components/UpperNavigation';
import { LeftNavigation } from './components/LeftNavigation';
import { ProductTile } from './components/ProductTile';
import { QuickLookModal } from './components/QuickLookModal';
import { AssetBundleInspectorModal } from './components/bundle-inspector/AssetBundleInspectorModal';
import { CartDrawer } from './components/CartDrawer';
import { WishlistDrawer } from './components/WishlistDrawer';
import { CheckoutSuccessModal } from './components/CheckoutSuccessModal';
import { MyDownloadsModal } from './components/MyDownloadsModal';
import { MobileDock } from './components/MobileDock';
import { SkeletonTileGrid, EmptyState, ErrorState } from './components/UXStates';
import { 
  calculateSubtotal, 
  convertCurrency 
} from './services/cart-service';
import { 
  generateLicenseKey, 
  generateInvoiceId, 
  triggerBlobDownload,
  createLicenseManifest 
} from './services/license-service';
import { safeStorage } from './services/storage-service';
import { telemetry } from './services/telemetry';
import { 
  ArrowUpDown, 
  LayoutGrid, 
  List, 
  Check, 
  X,
  Zap,
  ShieldCheck,
  RotateCcw,
  BadgeCheck,
  Star,
  FileArchive,
  Eye,
  Download,
  ShoppingBag,
  Sparkles,
  Heart
} from 'lucide-react';

const CURRENCY_SYMBOLS: Record<Currency, string> = {
  USD: '$',
  EUR: '€',
  GBP: '£',
};

export function App() {
  // --- Persistent Storage ---
  const [cart, setCart] = useState<CartItem[]>(() => 
    safeStorage.get<CartItem[]>('nexus_cart', [])
  );

  const [wishlistIds, setWishlistIds] = useState<string[]>(() => 
    safeStorage.get<string[]>('nexus_wishlist', ['apex-design-system', 'zero-to-scale-architecture-guide'])
  );

  const [purchases, setPurchases] = useState<PurchasedItem[]>(() => {
    const saved = safeStorage.get<PurchasedItem[]>('nexus_purchases', []);
    if (saved.length > 0) return saved;
    // Seed with 1 initial free item
    const initialItem = DIGITAL_PRODUCTS.find(p => p.id === 'zero-to-scale-architecture-guide') || DIGITAL_PRODUCTS[0];
    return [
      {
        id: 'initial-free-blueprint',
        product: initialItem,
        purchaseDate: '2026-11-04',
        licenseKey: 'NX-ARCH-7A2B-98F1-4E02',
        invoiceNumber: 'INV-2026-00481',
        downloadUrl: 'https://cdn.nexus-vault.network/assets/zero-to-scale-guide.pdf'
      }
    ];
  });

  const [currency, setCurrency] = useState<Currency>('USD');
  const [viewMode, setViewMode] = useState<ViewMode>('grid');
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // --- Filter & Search State ---
  const [filterState, setFilterState] = useState<FilterState>({
    category: 'all',
    search: '',
    priceFilter: 'all',
    sortBy: 'popular',
    format: '',
    commercialOnly: false
  });

  // --- Modals & Drawers ---
  const [activeQuickLook, setActiveQuickLook] = useState<DigitalProduct | null>(null);
  const [inspectingBundleProduct, setInspectingBundleProduct] = useState<DigitalProduct | null>(null);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isWishlistOpen, setIsWishlistOpen] = useState(false);
  const [isMyDownloadsOpen, setIsMyDownloadsOpen] = useState(false);
  const [activeCheckoutSuccess, setActiveCheckoutSuccess] = useState<PurchasedItem[] | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Sync to safeStorage
  useEffect(() => {
    safeStorage.set('nexus_cart', cart);
  }, [cart]);

  useEffect(() => {
    safeStorage.set('nexus_wishlist', wishlistIds);
  }, [wishlistIds]);

  useEffect(() => {
    safeStorage.set('nexus_purchases', purchases);
  }, [purchases]);

  const showToast = useCallback((msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  }, []);

  // Format Price with Currency Conversion
  const formatPrice = useCallback((amountInUSD: number): string => {
    if (amountInUSD === 0) return 'FREE';
    const converted = convertCurrency(amountInUSD, currency);
    const symbol = CURRENCY_SYMBOLS[currency];
    return `${symbol}${converted.toFixed(converted % 1 === 0 ? 0 : 2)}`;
  }, [currency]);

  // Global Keyboard Navigation ('/' or '⌘K' to focus search, Esc to close modals)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.key === '/' || (e.key === 'k' && (e.metaKey || e.ctrlKey))) && (!document.activeElement || document.activeElement.tagName !== 'INPUT')) {
        e.preventDefault();
        const searchInput = document.querySelector('input[type="text"]') as HTMLInputElement;
        if (searchInput) searchInput.focus();
      }
      if (e.key === 'Escape') {
        setActiveQuickLook(null);
        setInspectingBundleProduct(null);
        setIsCartOpen(false);
        setIsWishlistOpen(false);
        setIsMyDownloadsOpen(false);
        setActiveCheckoutSuccess(null);
        setMobileSidebarOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Filter Updates with Telemetry & Tactile Feedback
  const handleFilterChange = useCallback((updates: Partial<FilterState>) => {
    setIsLoading(true);
    setFilterState(prev => ({ ...prev, ...updates }));
    telemetry.track('filter_change', updates);
    setTimeout(() => setIsLoading(false), 120);
  }, []);

  const handleResetFilters = useCallback(() => {
    setIsLoading(true);
    setFilterState({
      category: 'all',
      search: '',
      priceFilter: 'all',
      sortBy: 'popular',
      format: '',
      commercialOnly: false
    });
    telemetry.track('filters_reset');
    setTimeout(() => setIsLoading(false), 120);
  }, []);

  // Wishlist Action
  const handleToggleWishlist = useCallback((product: DigitalProduct) => {
    setWishlistIds(prev => {
      const exists = prev.includes(product.id);
      if (exists) {
        showToast(`Removed "${product.title}" from Wishlist`);
        telemetry.track('wishlist_remove', { productId: product.id });
        return prev.filter(id => id !== product.id);
      } else {
        showToast(`Saved "${product.title}" to Wishlist`);
        telemetry.track('wishlist_add', { productId: product.id });
        return [...prev, product.id];
      }
    });
  }, [showToast]);

  // Cart Actions
  const handleAddToCart = useCallback((
    product: DigitalProduct, 
    licenseType: 'standard' | 'extended' | LicenseTierId = 'standard',
    tipAmount: number = 0
  ) => {
    let price: number;
    if (licenseType === 'extended') {
      price = Math.round(product.price * 1.8);
    } else if (licenseType === 'commercial') {
      price = Math.round(product.price * 1.6);
    } else if (licenseType === 'enterprise') {
      price = Math.round(product.price * 3.5);
    } else {
      price = product.price;
    }
    price += tipAmount;

    setCart(prev => {
      const existingIndex = prev.findIndex(item => item.product.id === product.id);
      if (existingIndex >= 0) {
        const updated = [...prev];
        updated[existingIndex] = { product, licenseType, price, tipAmount };
        return updated;
      }
      return [...prev, { product, licenseType, price, tipAmount }];
    });
    telemetry.track('cart_add', { productId: product.id, licenseType, price, tipAmount });
    showToast(`Added "${product.title}" to Cart`);
  }, [showToast]);

  const handleRemoveFromCart = useCallback((productId: string) => {
    setCart(prev => prev.filter(item => item.product.id !== productId));
    telemetry.track('cart_remove', { productId });
  }, []);

  const handleClearCart = useCallback(() => {
    setCart([]);
    telemetry.track('cart_clear');
  }, []);

  // Instant File Download with Manifest
  const handleInstantDownload = useCallback((product: DigitalProduct) => {
    let item = purchases.find(p => p.product.id === product.id);
    if (!item) {
      const newItem: PurchasedItem = {
        id: `download-${Date.now()}`,
        product,
        purchaseDate: new Date().toISOString().split('T')[0],
        licenseKey: generateLicenseKey(product.fileFormat.replace('.', '')),
        invoiceNumber: generateInvoiceId(),
        downloadUrl: `https://cdn.nexus-vault.network/assets/${product.id}.zip`
      };
      setPurchases(prev => [newItem, ...prev]);
      item = newItem;
    }

    const manifest = createLicenseManifest(item);
    triggerBlobDownload(`${product.id}-package.json`, manifest);
    telemetry.track('asset_download', { productId: product.id, licenseKey: item.licenseKey });
    showToast(`Downloading "${product.title}" bundle`);
  }, [purchases, showToast]);

  // Checkout Execution
  const handleCheckout = useCallback((appliedDiscountUSD: number) => {
    const newPurchased: PurchasedItem[] = cart.map(item => ({
      id: `purchased-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
      product: item.product,
      purchaseDate: new Date().toISOString().split('T')[0],
      licenseKey: generateLicenseKey('NX'),
      invoiceNumber: generateInvoiceId(),
      downloadUrl: `https://cdn.nexus-vault.network/assets/${item.product.id}.zip`
    }));

    telemetry.track('checkout_completed', {
      itemCount: cart.length,
      discountUSD: appliedDiscountUSD,
      purchasedIds: cart.map(c => c.product.id)
    });

    setPurchases(prev => [...newPurchased, ...prev]);
    setCart([]);
    setIsCartOpen(false);
    setActiveCheckoutSuccess(newPurchased);
  }, [cart]);

  // Category counts
  const categoryCounts = useMemo(() => {
    const counts: Record<ProductCategory, number> = {
      all: DIGITAL_PRODUCTS.length,
      'websites-ui': 0,
      'backends': 0,
      'react-apps': 0,
      'mobile-apps': 0,
      'documents-pdf': 0,
      'spreadsheets': 0,
      'resumes': 0,
    };
    DIGITAL_PRODUCTS.forEach(p => {
      counts[p.category] = (counts[p.category] || 0) + 1;
    });
    return counts;
  }, []);

  // Filtered & Sorted Product List
  const filteredProducts = useMemo(() => {
    return DIGITAL_PRODUCTS.filter(product => {
      if (filterState.category !== 'all' && product.category !== filterState.category) {
        return false;
      }
      if (filterState.search.trim()) {
        const q = filterState.search.toLowerCase();
        const matchesTitle = product.title.toLowerCase().includes(q);
        const matchesSubtitle = product.subtitle.toLowerCase().includes(q);
        const matchesTags = product.tags.some(t => t.toLowerCase().includes(q));
        const matchesFormat = product.fileFormat.toLowerCase().includes(q);
        const matchesCreator = product.creator.name.toLowerCase().includes(q);
        if (!matchesTitle && !matchesSubtitle && !matchesTags && !matchesFormat && !matchesCreator) {
          return false;
        }
      }
      if (filterState.priceFilter === 'free' && product.price !== 0) return false;
      if (filterState.priceFilter === 'under-25' && product.price >= 25) return false;
      if (filterState.priceFilter === '25-50' && (product.price < 25 || product.price > 50)) return false;
      if (filterState.priceFilter === '50-plus' && product.price < 50) return false;
      if (filterState.format && product.fileFormat !== filterState.format) return false;
      return true;
    }).sort((a, b) => {
      if (filterState.sortBy === 'popular') return b.downloadsCount - a.downloadsCount;
      if (filterState.sortBy === 'rating') return b.rating - a.rating;
      if (filterState.sortBy === 'price-asc') return a.price - b.price;
      if (filterState.sortBy === 'price-desc') return b.price - a.price;
      if (filterState.sortBy === 'newest') return (b.badge === 'NEW' ? 1 : 0) - (a.badge === 'NEW' ? 1 : 0);
      return 0;
    });
  }, [filterState]);

  const cartTotalUSD = useMemo(() => calculateSubtotal(cart), [cart]);

  // Wishlist products resolution
  const wishlistProducts = useMemo(() => 
    DIGITAL_PRODUCTS.filter(p => wishlistIds.includes(p.id)), 
    [wishlistIds]
  );

  // Flagship Asset Specimen for Dimensional Plinth Card
  const flagshipProduct = useMemo(() => {
    if (filterState.category !== 'all') {
      const match = DIGITAL_PRODUCTS.find(p => p.category === filterState.category);
      if (match) return match;
    }
    return DIGITAL_PRODUCTS.find(p => p.id === 'apex-design-system') || DIGITAL_PRODUCTS[0];
  }, [filterState.category]);

  const isFlagshipWishlisted = wishlistIds.includes(flagshipProduct.id);
  const isFlagshipInCart = cart.some(item => item.product.id === flagshipProduct.id);
  const isFlagshipPurchased = purchases.some(item => item.product.id === flagshipProduct.id);

  return (
    <div className="min-h-screen bg-[#FBFBF9] text-stone-800 flex flex-col font-sans selection:bg-amber-100 selection:text-stone-900">
      
      {/* Toast Alert */}
      {toastMessage && (
        <div 
          role="status" 
          aria-live="polite"
          className="fixed bottom-6 right-6 z-50 px-4 py-2.5 rounded-2xl bg-stone-900 border border-stone-800 text-white text-xs font-semibold shadow-2xl flex items-center gap-2 animate-in slide-in-from-bottom-3 duration-200"
        >
          <Check className="w-4 h-4 text-emerald-400" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Universal Upper Navigation with Frosted Capsule */}
      <UpperNavigation
        searchQuery={filterState.search}
        onSearchChange={(q) => handleFilterChange({ search: q })}
        currency={currency}
        onCurrencyChange={setCurrency}
        cartCount={cart.length}
        cartTotal={cartTotalUSD}
        onOpenCart={() => setIsCartOpen(true)}
        wishlistCount={wishlistIds.length}
        onOpenWishlist={() => setIsWishlistOpen(true)}
        purchasedCount={purchases.length}
        onOpenPurchases={() => setIsMyDownloadsOpen(true)}
        onToggleSidebarMobile={() => setMobileSidebarOpen(!mobileSidebarOpen)}
        activeCategory={filterState.category}
        onSelectCategory={(cat) => handleFilterChange({ category: cat })}
        formatPrice={formatPrice}
      />

      {/* Main Workspace Layout */}
      <div className="flex-1 flex max-w-[1920px] w-full mx-auto min-w-0 overflow-x-hidden">
        
        {/* Universal Left Navigation with Archival Plinth Styling */}
        <div className={`lg:block ${mobileSidebarOpen ? 'block fixed inset-0 z-40 bg-black/40 lg:relative lg:bg-transparent' : 'hidden'}`}>
          <div className="relative h-full" onClick={(e) => { if (e.target === e.currentTarget) setMobileSidebarOpen(false); }}>
            <LeftNavigation
              filterState={filterState}
              onFilterChange={handleFilterChange}
              collapsed={sidebarCollapsed}
              onToggleCollapse={() => setSidebarCollapsed(!sidebarCollapsed)}
              categoryCounts={categoryCounts}
              totalProductsCount={DIGITAL_PRODUCTS.length}
            />
          </div>
        </div>

        {/* Center Main Canvas */}
        <main className="flex-1 min-w-0 p-3 sm:p-6 lg:p-8 space-y-5 sm:space-y-6 max-w-full overflow-hidden">
          
          {/* Asymmetric 60/40 Editorial Exhibition Plinth */}
          <section 
            aria-labelledby="banner-heading" 
            className="relative rounded-2xl sm:rounded-3xl p-4 sm:p-8 lg:p-10 bg-white border border-stone-200/90 shadow-[0_4px_24px_-4px_rgba(28,25,23,0.04)] overflow-hidden border-t border-t-white max-w-full"
            style={{
              boxShadow: 'inset 0 1px 0 0 rgba(255, 255, 255, 0.95), 0 12px 32px -8px rgba(28, 25, 23, 0.05), 0 1px 3px 0 rgba(28, 25, 23, 0.02)'
            }}
          >
            {/* Ambient Warm Travertine & Gallery Light Pools */}
            <div className="absolute -top-24 right-1/4 w-96 h-96 rounded-full bg-gradient-to-br from-amber-100/40 via-stone-200/20 to-transparent blur-3xl pointer-events-none" />
            <div className="absolute -bottom-16 -left-16 w-80 h-80 rounded-full bg-gradient-to-tr from-stone-200/30 to-transparent blur-2xl pointer-events-none" />

            <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              
              {/* 60% Column: Curatorial Editorial Section */}
              <div className="lg:col-span-7 space-y-5">
                {/* Curatorial Index Stamp */}
                <div className="flex flex-wrap items-center gap-2">
                  <span className="curatorial-stamp px-2.5 py-1 rounded-md bg-stone-100/90 border border-stone-200/80 text-[10px]">
                    [ EXHIBITION // ISSUE 2026.04 ]
                  </span>
                  <span className="text-stone-300 font-mono text-xs">•</span>
                  <span className="text-xs font-mono font-medium text-stone-500">
                    PERMANENT COLLECTION
                  </span>
                  <span className="text-stone-300 font-mono text-xs">•</span>
                  <span className="px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200/70 text-[10px] font-mono font-bold shadow-2xs">
                    LIVE ATELIER
                  </span>
                </div>

                {/* Editorial Headline */}
                <h1 id="banner-heading" className="text-3xl sm:text-4xl lg:text-[42px] font-extrabold text-stone-950 tracking-tight leading-[1.12] font-sans [text-wrap:balance]">
                  {filterState.category === 'all' && 'Curated Production Software, Websites & Executive Documents'}
                  {filterState.category === 'websites-ui' && 'Websites, UI Kits & High-Conversion Frontends'}
                  {filterState.category === 'backends' && 'Serverless Edge Workers, Scrapers & Microservice APIs'}
                  {filterState.category === 'react-apps' && 'Production React Web Apps & Real-time Terminals'}
                  {filterState.category === 'mobile-apps' && 'Cross-Platform React Native & Native Mobile Engines'}
                  {filterState.category === 'documents-pdf' && 'Technical Whitepapers, Architectural Specs & Manuals'}
                  {filterState.category === 'spreadsheets' && 'SaaS Unit Economics, Financial Models & Calculators'}
                  {filterState.category === 'resumes' && 'ATS-Engineered Tech Lead Resumes & Portfolios'}
                </h1>

                {/* Curatorial Subtitle */}
                <p className="text-stone-600 text-xs sm:text-sm leading-relaxed max-w-xl [text-wrap:pretty]">
                  Obsessively engineered digital downloads. Instant zero-egress delivery with signed cryptographic JSON licenses, clean codebases, and production-tested patterns.
                </p>

                {/* Floating Showcase Pill Tabs */}
                <div className="pt-1">
                  <div className="text-[9.5px] curatorial-stamp text-stone-400 mb-2">
                    FOCUS DISCIPLINE // SELECTION
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {[
                      { id: 'all', label: 'All Artifacts' },
                      { id: 'websites-ui', label: 'Websites & UI' },
                      { id: 'backends', label: 'Backends' },
                      { id: 'react-apps', label: 'React Apps' },
                      { id: 'mobile-apps', label: 'Mobile' },
                      { id: 'documents-pdf', label: 'PDF Docs' },
                      { id: 'spreadsheets', label: 'Excel Models' },
                      { id: 'resumes', label: 'Resumes' },
                    ].map(tab => {
                      const isTabActive = filterState.category === tab.id;
                      return (
                        <button
                          key={tab.id}
                          type="button"
                          onClick={() => handleFilterChange({ category: tab.id as ProductCategory })}
                          className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all cursor-pointer select-none active:scale-95 ${
                            isTabActive
                              ? 'btn-plinth-primary text-white font-semibold'
                              : 'bg-stone-100/90 text-stone-600 hover:text-stone-900 hover:bg-stone-200/70 border border-stone-200/60 shadow-2xs'
                          }`}
                        >
                          {tab.label}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Curatorial Metrics Strip */}
                <div className="pt-3 flex flex-wrap items-center gap-4 text-xs font-mono text-stone-500 border-t border-stone-100">
                  <div className="flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-emerald-500" />
                    <span className="font-bold text-stone-900">{filteredProducts.length}</span> Specimens
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span className="text-stone-300">•</span>
                    <span className="font-bold text-stone-900">100%</span> Verified Licenses
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span className="text-stone-300">•</span>
                    <span className="font-bold text-stone-900">Zero</span> Egress Friction
                  </div>
                </div>
              </div>

              {/* 40% Column: Dimensional Exhibition Plinth Card */}
              <div className="lg:col-span-5">
                <div 
                  className="group relative rounded-[22px] p-[10px] bg-gradient-to-b from-stone-50/90 via-white to-white border border-stone-200/90 shadow-[0_16px_36px_-6px_rgba(28,25,23,0.08),0_4px_12px_-2px_rgba(28,25,23,0.03)] border-t border-t-white hover:shadow-[0_24px_48px_-8px_rgba(28,25,23,0.12)] transition-all duration-300"
                  style={{
                    boxShadow: 'inset 0 1px 0 0 rgba(255, 255, 255, 0.95), 0 16px 36px -6px rgba(28, 25, 23, 0.08), 0 4px 12px -2px rgba(28, 25, 23, 0.03)'
                  }}
                >
                  {/* Top Specimen Badge & Heart */}
                  <div className="px-2.5 py-1.5 flex items-center justify-between gap-2 border-b border-stone-100/90 mb-2">
                    <div className="flex items-center gap-2">
                      <span className="px-2 py-0.5 rounded-full bg-stone-900 text-amber-300 font-mono text-[9px] font-bold tracking-wider">
                        FEATURED EXHIBIT
                      </span>
                      <span className="curatorial-stamp text-[9px] text-stone-400 hidden sm:inline">
                        № {flagshipProduct.id.slice(0, 10).toUpperCase()}
                      </span>
                    </div>

                    <button
                      type="button"
                      onClick={() => handleToggleWishlist(flagshipProduct)}
                      className={`p-1.5 rounded-full border transition-all cursor-pointer ${
                        isFlagshipWishlisted
                          ? 'bg-rose-50 text-rose-600 border-rose-200 shadow-2xs scale-105'
                          : 'bg-white text-stone-400 border-stone-200 hover:text-stone-700'
                      }`}
                      title={isFlagshipWishlisted ? 'Remove from Wishlist' : 'Save to Wishlist'}
                      aria-label="Wishlist Flagship Specimen"
                    >
                      <Heart className={`w-3.5 h-3.5 ${isFlagshipWishlisted ? 'fill-rose-500 text-rose-500' : ''}`} />
                    </button>
                  </div>

                  {/* Concentric Media Preview Box (rounded-[12px] inside rounded-[22px] with p-[10px]) */}
                  <div className="relative aspect-16/10 rounded-[12px] bg-gradient-to-br from-indigo-50/80 via-purple-50/40 to-amber-50/30 border border-stone-200/80 overflow-hidden p-4 flex flex-col justify-between">
                    <div className="flex items-center justify-between z-10">
                      <span className="px-2 py-0.5 rounded-full bg-white/95 border border-indigo-200/90 text-[10px] font-mono font-bold text-indigo-700 shadow-2xs">
                        {flagshipProduct.fileFormat} Specimen
                      </span>
                      <div className="flex items-center gap-1 font-mono text-xs text-amber-700 bg-white/90 px-2 py-0.5 rounded-full border border-amber-200/80">
                        <Star className="w-3 h-3 fill-amber-400 text-amber-500" />
                        <span className="font-bold">{flagshipProduct.rating}</span>
                      </div>
                    </div>

                    {/* 3D Multi-Plane Floating Aesthetic Showcase */}
                    <div className="flex items-center justify-center my-auto py-2">
                      <div className="relative w-44 h-20 perspective-500">
                        <div className="absolute top-0 left-0 w-40 h-16 rounded-xl bg-white/80 border border-stone-200/80 shadow-xs rotate-[-5deg] group-hover:rotate-[-8deg] transition-transform duration-300" />
                        <div className="absolute top-1.5 left-3 w-40 h-16 rounded-xl bg-gradient-to-r from-white via-indigo-50/90 to-amber-50/80 border border-indigo-200/90 shadow-[0_12px_24px_-4px_rgba(99,102,241,0.25)] flex items-center justify-between px-4 rotate-[3deg] group-hover:rotate-[5deg] group-hover:-translate-y-1 transition-all duration-300">
                          <div className="space-y-1.5">
                            <div className="w-14 h-2.5 rounded-full bg-indigo-500/80 shadow-2xs" />
                            <div className="w-9 h-1.5 rounded-full bg-stone-300" />
                          </div>
                          <div className="flex gap-1.5">
                            <div className="w-3 h-3 rounded-full bg-indigo-500 shadow-xs" />
                            <div className="w-3 h-3 rounded-full bg-emerald-500 shadow-xs" />
                            <div className="w-3 h-3 rounded-full bg-amber-500 shadow-xs" />
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center justify-between text-[10px] font-mono text-stone-500 z-10 pt-1">
                      <span className="text-stone-700 font-semibold">{flagshipProduct.fileSize}</span>
                      <span className="text-indigo-700 font-bold">Production Ready</span>
                    </div>
                  </div>

                  {/* Flagship Body & Controls */}
                  <div className="p-2.5 pt-3 space-y-2.5">
                    <div>
                      <div className="flex items-center justify-between">
                        <h2 className="text-sm font-bold text-stone-950 truncate">
                          {flagshipProduct.title}
                        </h2>
                        <span className="text-sm font-extrabold text-stone-950 font-mono">
                          {formatPrice(flagshipProduct.price)}
                        </span>
                      </div>
                      <p className="text-xs text-stone-600 line-clamp-1 mt-0.5">
                        {flagshipProduct.subtitle}
                      </p>
                    </div>

                    {/* Interactive Action Buttons */}
                    <div className="flex items-center gap-2 pt-1 border-t border-stone-100">
                      <button
                        type="button"
                        onClick={() => setInspectingBundleProduct(flagshipProduct)}
                        className="flex-1 flex items-center justify-center gap-1.5 py-1.5 px-3 rounded-xl bg-amber-50 hover:bg-amber-100 text-amber-900 border border-amber-200/90 text-xs font-semibold cursor-pointer active:scale-95 transition-all"
                      >
                        <FileArchive className="w-3.5 h-3.5 text-amber-700" />
                        <span>Look Inside</span>
                      </button>

                      <button
                        type="button"
                        onClick={() => setActiveQuickLook(flagshipProduct)}
                        className="p-1.5 rounded-xl bg-stone-100 hover:bg-stone-200 text-stone-700 border border-stone-200 cursor-pointer active:scale-95 transition-all"
                        title="Spec Overview"
                        aria-label="Spec Overview"
                      >
                        <Eye className="w-4 h-4" />
                      </button>

                      {isFlagshipPurchased ? (
                        <button
                          type="button"
                          onClick={() => handleInstantDownload(flagshipProduct)}
                          className="btn-plinth-emerald flex items-center gap-1.5 py-1.5 px-3.5 rounded-xl text-xs font-semibold cursor-pointer"
                        >
                          <Download className="w-3.5 h-3.5" />
                          <span>Download</span>
                        </button>
                      ) : isFlagshipInCart ? (
                        <button
                          type="button"
                          disabled
                          className="flex items-center gap-1.5 py-1.5 px-3.5 rounded-xl bg-stone-100 text-stone-500 border border-stone-200 text-xs font-medium cursor-default"
                        >
                          <Check className="w-3.5 h-3.5" />
                          <span>In Bag</span>
                        </button>
                      ) : (
                        <button
                          type="button"
                          onClick={() => handleAddToCart(flagshipProduct, 'standard')}
                          className="btn-plinth-primary flex items-center gap-1.5 py-1.5 px-3.5 rounded-xl text-xs font-semibold cursor-pointer"
                        >
                          <ShoppingBag className="w-3.5 h-3.5 text-amber-300" />
                          <span>Add to Bag</span>
                        </button>
                      )}
                    </div>

                  </div>
                </div>
              </div>

            </div>
          </section>

          {/* Curated Trust & Feature Highlights Strip */}
          <section aria-label="Store guarantees" className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2.5 sm:gap-3 max-w-full">
            <div className="group flex items-center gap-3 p-3.5 rounded-2xl bg-white border border-stone-200/90 shadow-[0_2px_8px_-2px_rgba(28,25,23,0.03)] hover:border-amber-300 hover:shadow-xs transition-all border-t border-t-white min-w-0">
              <div className="p-2 rounded-xl bg-amber-50/90 border border-amber-200/80 text-amber-600 shadow-[0_2px_8px_rgba(245,158,11,0.15)] group-hover:scale-105 transition-transform shrink-0">
                <Zap className="w-4 h-4 fill-amber-400 text-amber-600" />
              </div>
              <div className="min-w-0">
                <div className="text-xs font-bold text-stone-900 group-hover:text-amber-900 transition-colors truncate">Instant Delivery</div>
                <div className="text-[11px] text-stone-500 truncate">Zero-egress direct CDN download</div>
              </div>
            </div>

            <div className="group flex items-center gap-3 p-3.5 rounded-2xl bg-white border border-stone-200/90 shadow-[0_2px_8px_-2px_rgba(28,25,23,0.03)] hover:border-emerald-300 hover:shadow-xs transition-all border-t border-t-white min-w-0">
              <div className="p-2 rounded-xl bg-emerald-50/90 border border-emerald-200/80 text-emerald-600 shadow-[0_2px_8px_rgba(16,185,129,0.15)] group-hover:scale-105 transition-transform shrink-0">
                <ShieldCheck className="w-4 h-4 text-emerald-600" />
              </div>
              <div className="min-w-0">
                <div className="text-xs font-bold text-stone-900 group-hover:text-emerald-900 transition-colors truncate">Verified Keys</div>
                <div className="text-[11px] text-stone-500 truncate">Cryptographic JSON manifest</div>
              </div>
            </div>

            <div className="group flex items-center gap-3 p-3.5 rounded-2xl bg-white border border-stone-200/90 shadow-[0_2px_8px_-2px_rgba(28,25,23,0.03)] hover:border-sky-300 hover:shadow-xs transition-all border-t border-t-white min-w-0">
              <div className="p-2 rounded-xl bg-sky-50/90 border border-sky-200/80 text-sky-600 shadow-[0_2px_8px_rgba(14,165,233,0.15)] group-hover:scale-105 transition-transform shrink-0">
                <RotateCcw className="w-4 h-4 text-sky-600" />
              </div>
              <div className="min-w-0">
                <div className="text-xs font-bold text-stone-900 group-hover:text-sky-900 transition-colors truncate">Lifetime Sync</div>
                <div className="text-[11px] text-stone-500 truncate">Continuous patch releases</div>
              </div>
            </div>

            <div className="group flex items-center gap-3 p-3.5 rounded-2xl bg-white border border-stone-200/90 shadow-[0_2px_8px_-2px_rgba(28,25,23,0.03)] hover:border-indigo-300 hover:shadow-xs transition-all border-t border-t-white min-w-0">
              <div className="p-2 rounded-xl bg-indigo-50/90 border border-indigo-200/80 text-indigo-600 shadow-[0_2px_8px_rgba(99,102,241,0.15)] group-hover:scale-105 transition-transform shrink-0">
                <BadgeCheck className="w-4 h-4 text-indigo-600" />
              </div>
              <div className="min-w-0">
                <div className="text-xs font-bold text-stone-900 group-hover:text-indigo-900 transition-colors truncate">100% Commercial</div>
                <div className="text-[11px] text-stone-500 truncate">Royalty-free client usage</div>
              </div>
            </div>
          </section>

          {/* Controls Bar: Sort, View Switcher & Active Filter Tags */}
          <div className="flex flex-wrap items-center justify-between gap-3 p-3 rounded-2xl bg-white border border-stone-200/80 shadow-[0_1px_3px_rgba(0,0,0,0.02)] border-t border-t-white max-w-full">
            
            {/* Left: Active count and reset */}
            <div className="flex items-center gap-2 min-w-0">
              <span className="text-xs font-mono text-stone-600 truncate">
                Catalog: <strong className="text-stone-900 font-bold">{filteredProducts.length}</strong> specimens
              </span>

              {(filterState.search || filterState.format || filterState.priceFilter !== 'all' || filterState.category !== 'all') && (
                <button
                  type="button"
                  onClick={handleResetFilters}
                  className="flex items-center gap-1 text-[11px] font-semibold text-[#e06344] hover:text-[#cb4d2e] pl-2 border-l border-stone-200 cursor-pointer shrink-0"
                >
                  <X className="w-3.5 h-3.5" />
                  <span>Reset</span>
                </button>
              )}
            </div>

            {/* Right: Sort & Layout toggles */}
            <div className="flex items-center gap-2 sm:gap-3 shrink-0">
              
              <div className="flex items-center gap-1.5 text-xs text-stone-600">
                <ArrowUpDown className="w-3.5 h-3.5 text-stone-400 hidden sm:inline" />
                <label htmlFor="sort-select" className="hidden sm:inline font-medium">Sort:</label>
                <select
                  id="sort-select"
                  value={filterState.sortBy}
                  onChange={(e) => handleFilterChange({ sortBy: e.target.value as FilterState['sortBy'] })}
                  className="bg-stone-50 border border-stone-200 rounded-lg px-2 sm:px-2.5 py-1 sm:py-1.5 text-xs text-stone-800 focus:outline-none focus:border-stone-400 font-medium cursor-pointer"
                >
                  <option value="popular">Popular</option>
                  <option value="rating">Rating</option>
                  <option value="price-asc">Price: Low</option>
                  <option value="price-desc">Price: High</option>
                  <option value="newest">New Releases</option>
                </select>
              </div>

              {/* View Switcher */}
              <div className="flex items-center bg-stone-100 border border-stone-200 rounded-lg p-0.5">
                <button
                  type="button"
                  onClick={() => setViewMode('grid')}
                  className={`p-1.5 rounded-md transition-colors cursor-pointer ${
                    viewMode === 'grid' ? 'bg-white text-stone-900 shadow-xs' : 'text-stone-600 hover:text-stone-700'
                  }`}
                  aria-label="Grid View"
                  title="Grid View"
                >
                  <LayoutGrid className="w-3.5 h-3.5" />
                </button>
                <button
                  type="button"
                  onClick={() => setViewMode('compact')}
                  className={`p-1.5 rounded-md transition-colors cursor-pointer ${
                    viewMode === 'compact' ? 'bg-white text-stone-900 shadow-xs' : 'text-stone-600 hover:text-stone-700'
                  }`}
                  aria-label="Compact View"
                  title="Compact View"
                >
                  <List className="w-3.5 h-3.5" />
                </button>
              </div>

            </div>

          </div>

          {/* Main Tiled Grid (Handling 4 UX states) */}
          {error ? (
            <ErrorState errorMessage={error} onRetry={() => setError(null)} />
          ) : isLoading ? (
            <SkeletonTileGrid count={8} />
          ) : filteredProducts.length === 0 ? (
            <EmptyState query={filterState.search} onResetFilters={handleResetFilters} />
          ) : (
            <div className={`grid gap-4 sm:gap-5 max-w-full overflow-hidden ${
              viewMode === 'compact' 
                ? 'grid-cols-1 md:grid-cols-2 xl:grid-cols-3' 
                : 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4'
            }`}>
              {filteredProducts.map((product) => (
                <ProductTile
                  key={product.id}
                  product={product}
                  isWishlisted={wishlistIds.includes(product.id)}
                  isInCart={cart.some(item => item.product.id === product.id)}
                  isPurchased={purchases.some(item => item.product.id === product.id)}
                  onToggleWishlist={handleToggleWishlist}
                  onAddToCart={(p) => handleAddToCart(p, 'standard')}
                  onQuickLook={setActiveQuickLook}
                  onInspectBundle={setInspectingBundleProduct}
                  onInstantDownload={handleInstantDownload}
                  currency={currency}
                  formatPrice={formatPrice}
                  viewMode={viewMode}
                />
              ))}
            </div>
          )}

        </main>

      </div>

      {/* Modals & Drawers */}
      <QuickLookModal
        product={activeQuickLook}
        onClose={() => setActiveQuickLook(null)}
        onAddToCart={handleAddToCart}
        onInspectBundle={(p) => {
          setActiveQuickLook(null);
          setInspectingBundleProduct(p);
        }}
        onInstantDownload={handleInstantDownload}
        isInCart={activeQuickLook ? cart.some(i => i.product.id === activeQuickLook.id) : false}
        isPurchased={activeQuickLook ? purchases.some(i => i.product.id === activeQuickLook.id) : false}
        formatPrice={formatPrice}
      />

      <AssetBundleInspectorModal
        product={inspectingBundleProduct}
        isOpen={!!inspectingBundleProduct}
        onClose={() => setInspectingBundleProduct(null)}
        onAddToCart={handleAddToCart}
        onInstantDownload={handleInstantDownload}
        isInCart={inspectingBundleProduct ? cart.some(i => i.product.id === inspectingBundleProduct.id) : false}
        isPurchased={inspectingBundleProduct ? purchases.some(i => i.product.id === inspectingBundleProduct.id) : false}
        formatPrice={formatPrice}
      />

      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cart={cart}
        onRemoveItem={handleRemoveFromCart}
        onClearCart={handleClearCart}
        onCheckout={handleCheckout}
        formatPrice={formatPrice}
      />

      <WishlistDrawer
        isOpen={isWishlistOpen}
        onClose={() => setIsWishlistOpen(false)}
        wishlistProducts={wishlistProducts}
        onRemoveFromWishlist={handleToggleWishlist}
        onAddToCart={(p) => handleAddToCart(p, 'standard')}
        onQuickLook={setActiveQuickLook}
        formatPrice={formatPrice}
      />

      {activeCheckoutSuccess && (
        <CheckoutSuccessModal
          purchases={activeCheckoutSuccess}
          onClose={() => setActiveCheckoutSuccess(null)}
          onOpenMyDownloads={() => setIsMyDownloadsOpen(true)}
          formatPrice={formatPrice}
        />
      )}

      <MyDownloadsModal
        isOpen={isMyDownloadsOpen}
        onClose={() => setIsMyDownloadsOpen(false)}
        purchases={purchases}
        formatPrice={formatPrice}
      />

      {/* Floating Frosted Mobile App Dock */}
      <MobileDock
        onToggleSidebarMobile={() => setMobileSidebarOpen(!mobileSidebarOpen)}
        onOpenWishlist={() => setIsWishlistOpen(true)}
        wishlistCount={wishlistIds.length}
        onOpenPurchases={() => setIsMyDownloadsOpen(true)}
        purchasedCount={purchases.length}
        onOpenCart={() => setIsCartOpen(true)}
        cartCount={cart.length}
        cartTotal={cartTotalUSD}
        currency={currency}
        formatPrice={formatPrice}
      />

    </div>
  );
}

export default App;
