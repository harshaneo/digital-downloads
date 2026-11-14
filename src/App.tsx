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
import { LegalDocumentViewerModal } from './components/LegalDocumentViewerModal';
import { LEGAL_DOCUMENTS_STORE, CompleteLegalDocument } from './data/legal-documents/store';
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
  Heart,
  FileText
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
  const [activeLegalDocument, setActiveLegalDocument] = useState<CompleteLegalDocument | null>(null);
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

  const handleOpenLegalDocument = useCallback((product: DigitalProduct) => {
    const doc = LEGAL_DOCUMENTS_STORE[product.id] || LEGAL_DOCUMENTS_STORE['msa-sow-master-kit'];
    setActiveLegalDocument(doc);
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
      'legal-contracts': 0,
      'sales-proposals': 0,
      'ops-sops': 0,
      'financial-models': 0,
      'compliance-security': 0,
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
    <div className="min-h-screen bg-[#08090b] text-[#f4f5f6] flex flex-col font-sans selection:bg-white selection:text-black">
      
      {/* Toast Alert */}
      {toastMessage && (
        <div 
          role="status" 
          aria-live="polite"
          className="fixed bottom-6 right-6 z-50 px-4 py-2.5 rounded-xl bg-[#16181d] border border-white/[0.12] text-white text-xs font-semibold shadow-2xl flex items-center gap-2 animate-in slide-in-from-bottom-3 duration-200"
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
            className="relative rounded-2xl sm:rounded-3xl p-4 sm:p-8 lg:p-10 bg-[#111317] border border-white/[0.08] shadow-[0_12px_36px_rgba(0,0,0,0.6)] overflow-hidden border-t border-t-white/[0.14] max-w-full"
          >
            {/* Ambient Dark Light Pools */}
            <div className="absolute -top-24 right-1/4 w-96 h-96 rounded-full bg-gradient-to-br from-amber-500/10 via-white/[0.02] to-transparent blur-3xl pointer-events-none" />
            <div className="absolute -bottom-16 -left-16 w-80 h-80 rounded-full bg-gradient-to-tr from-emerald-500/5 to-transparent blur-2xl pointer-events-none" />

            <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              
              {/* 60% Column: Curatorial Editorial Section */}
              <div className="lg:col-span-7 space-y-5">
                {/* Refined Category / Status Indicator */}
                <div className="flex flex-wrap items-center gap-2 text-xs font-mono">
                  <span className="px-2.5 py-1 rounded-md bg-[#16181d] border border-white/10 text-[11px] font-semibold text-zinc-300">
                    2026 ARCHIVE
                  </span>
                  <span className="text-zinc-600">•</span>
                  <span className="text-xs font-medium text-zinc-400">
                    VERIFIED LEGAL & CODE ASSETS
                  </span>
                </div>

                {/* Editorial Headline */}
                <h1 id="banner-heading" className="text-3xl sm:text-4xl lg:text-[44px] font-extrabold text-white tracking-tight leading-[1.1] font-sans [text-wrap:balance]">
                  {filterState.category === 'all' && (
                    <>Executive <span className="gold-sheen-text">Contracts & System Kits</span></>
                  )}
                  {filterState.category === 'legal-contracts' && (
                    <>Master Services Agreements, <span className="gold-sheen-text">SOWs & Agreements</span></>
                  )}
                  {filterState.category === 'sales-proposals' && (
                    <>Enterprise RFP Responses, <span className="gold-sheen-text">Pitch Kits & Decks</span></>
                  )}
                  {filterState.category === 'ops-sops' && (
                    <>Agency Operations, <span className="gold-sheen-text">Runbooks & Handbooks</span></>
                  )}
                  {filterState.category === 'financial-models' && (
                    <>SaaS Unit Economics, <span className="gold-sheen-text">Cap Tables & Pro-Formas</span></>
                  )}
                  {filterState.category === 'compliance-security' && (
                    <>SOC 2 Type II, <span className="gold-sheen-text">ISO 27001 & Compliance</span></>
                  )}
                  {filterState.category === 'websites-ui' && 'Websites, UI Kits & Production Frontends'}
                  {filterState.category === 'backends' && 'Serverless Edge Workers, Scrapers & Microservice APIs'}
                  {filterState.category === 'react-apps' && 'Production React Web Apps & Real-time Terminals'}
                  {filterState.category === 'mobile-apps' && 'Cross-Platform React Native & Native Mobile Engines'}
                  {filterState.category === 'documents-pdf' && 'Technical Whitepapers, Architectural Specs & Manuals'}
                  {filterState.category === 'spreadsheets' && 'SaaS Unit Economics, Financial Models & Calculators'}
                  {filterState.category === 'resumes' && 'Executive Resumes & Technical Portfolios'}
                </h1>

                {/* Subtitle */}
                <p className="text-zinc-400 text-xs sm:text-sm leading-relaxed max-w-xl [text-wrap:pretty]">
                  Production-grade commercial agreements, spreadsheets, code bases, and architectural assets. Direct download with verified commercial licenses.
                </p>

                {/* Clean Pill Tabs */}
                <div className="pt-1">
                  <div className="text-[11px] font-mono font-medium text-zinc-400 mb-2 uppercase tracking-wider">
                    Browse Categories
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {[
                      { id: 'all', label: 'All Artifacts' },
                      { id: 'legal-contracts', label: 'Contracts & Legal' },
                      { id: 'sales-proposals', label: 'RFPs & Proposals' },
                      { id: 'ops-sops', label: 'SOPs & Operations' },
                      { id: 'financial-models', label: 'Financial Models' },
                      { id: 'compliance-security', label: 'Security & Compliance' },
                      { id: 'websites-ui', label: 'Websites & UI' },
                      { id: 'resumes', label: 'Resumes & Exec' },
                    ].map(tab => {
                      const isTabActive = filterState.category === tab.id;
                      return (
                        <button
                          key={tab.id}
                          type="button"
                          onClick={() => handleFilterChange({ category: tab.id as ProductCategory })}
                          className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all cursor-pointer select-none active:scale-95 ${
                            isTabActive
                              ? 'bg-white text-zinc-950 font-bold shadow-sm'
                              : 'bg-[#16181d] text-zinc-400 hover:text-white hover:bg-[#1a1d23] border border-white/10'
                          }`}
                        >
                          {tab.label}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Metrics Strip */}
                <div className="pt-3 flex flex-wrap items-center gap-4 text-xs font-mono text-zinc-400 border-t border-white/[0.08]">
                  <div className="flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-emerald-400" />
                    <span className="font-bold text-white">{filteredProducts.length}</span> Items
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span className="text-zinc-600">•</span>
                    <span className="font-bold text-white">100%</span> Perpetual Commercial Licenses
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span className="text-zinc-600">•</span>
                    <span className="font-bold text-white">Full Source</span> Included
                  </div>
                </div>
              </div>

              {/* 40% Column: Dimensional Exhibition Plinth Card */}
              <div className="lg:col-span-5">
                <div 
                  className="group relative rounded-[20px] p-[10px] bg-[#16181d] border border-white/[0.10] shadow-[0_16px_36px_-6px_rgba(0,0,0,0.8)] border-t border-t-white/[0.18] hover:border-white/[0.22] transition-all duration-300"
                >
                  {/* Top Specimen Badge & Heart */}
                  <div className="px-2.5 py-1.5 flex items-center justify-between gap-2 border-b border-white/[0.08] mb-2">
                    <div className="flex items-center gap-2">
                      <span className="px-2 py-0.5 rounded-full bg-amber-400 text-zinc-950 font-mono text-[10px] font-bold tracking-wide">
                        FEATURED
                      </span>
                      <span className="text-[10px] font-mono text-zinc-400 hidden sm:inline">
                        ID: {flagshipProduct.id.slice(0, 10).toUpperCase()}
                      </span>
                    </div>

                    <button
                      type="button"
                      onClick={() => handleToggleWishlist(flagshipProduct)}
                      className={`p-1.5 rounded-full border transition-all cursor-pointer ${
                        isFlagshipWishlisted
                          ? 'bg-rose-950/60 text-rose-400 border-rose-500/40 shadow-2xs scale-105'
                          : 'bg-[#111317] text-zinc-400 border-white/10 hover:text-white'
                      }`}
                      title={isFlagshipWishlisted ? 'Remove from Wishlist' : 'Save to Wishlist'}
                      aria-label="Wishlist Flagship Specimen"
                    >
                      <Heart className={`w-3.5 h-3.5 ${isFlagshipWishlisted ? 'fill-rose-400 text-rose-400' : ''}`} />
                    </button>
                  </div>

                  {/* Tucked Pocket Flagship Container */}
                  <div className="relative aspect-16/10 rounded-[14px] bg-[#090a0d] border border-white/[0.08] overflow-hidden group/preview shadow-inner">
                    {/* Folder Chamber Lining */}
                    <div className="absolute inset-0 bg-gradient-to-b from-[#14161f] to-[#08090c]" />
                    <div className="absolute inset-0 bg-[radial-gradient(#ffffff0a_1px,transparent_1px)] [background-size:12px_12px] opacity-40 pointer-events-none" />

                    {/* 1. Tucked Flagship Specimen Document */}
                    <div className="absolute inset-x-2.5 top-2 bottom-4 tucked-specimen-sheet z-10 rounded-xl overflow-hidden border border-white/[0.16] shadow-2xl bg-gradient-to-b from-[#1c1f28] to-[#0e1015] p-3 flex flex-col justify-between">
                      <div className="flex items-center justify-between z-10 pb-1 border-b border-white/[0.08]">
                        <span className="px-2 py-0.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-[9.5px] font-mono font-bold text-amber-300">
                          {flagshipProduct.fileFormat} MASTER KIT
                        </span>
                        <div className="flex items-center gap-1 font-mono text-xs text-amber-400 bg-black/50 px-2 py-0.5 rounded-full border border-white/10">
                          <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                          <span className="font-bold">{flagshipProduct.rating}</span>
                        </div>
                      </div>

                      {/* 3D Multi-Plane Floating Aesthetic Showcase */}
                      <div className="flex items-center justify-center my-auto py-1">
                        <div className="relative w-44 h-18 perspective-500">
                          <div className="absolute top-0 left-0 w-40 h-14 rounded-xl bg-[#141720] border border-white/10 shadow-xs rotate-[-5deg]" />
                          <div className="absolute top-1 left-2.5 w-40 h-14 rounded-xl bg-gradient-to-r from-[#202430] via-[#1a1d26] to-[#12141a] border border-amber-400/30 shadow-[0_12px_24px_rgba(0,0,0,0.8)] flex items-center justify-between px-3.5 rotate-[2deg]">
                            <div className="space-y-1">
                              <div className="w-16 h-2 rounded-full bg-amber-400/80" />
                              <div className="w-10 h-1 rounded-full bg-zinc-600" />
                            </div>
                            <div className="flex gap-1">
                              <div className="w-2.5 h-2.5 rounded-full bg-amber-400" />
                              <div className="w-2.5 h-2.5 rounded-full bg-emerald-400" />
                              <div className="w-2.5 h-2.5 rounded-full bg-blue-400" />
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center justify-between text-[9.5px] font-mono text-zinc-400 z-10 pt-1 border-t border-white/[0.06]">
                        <span className="text-zinc-300 font-semibold">{flagshipProduct.fileSize} • 4 Files</span>
                        <span className="text-amber-400 font-bold">Attorney Verified</span>
                      </div>
                    </div>

                    {/* 2. Physical Front Pocket Overlay Sleeve with Gold Stitch Accent */}
                    <div className="absolute inset-x-0 bottom-0 h-14 tucked-pocket-sleeve z-20 flex items-center justify-between px-3 pointer-events-none">
                      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-amber-400/50 to-transparent" />
                      
                      <div className="flex items-center gap-1.5 pointer-events-auto">
                        <span className="text-[10px] font-mono uppercase tracking-wider px-2 py-0.5 rounded bg-black/70 border border-amber-400/30 text-amber-300 font-bold">
                          FEATURED ASSET
                        </span>
                        <span className="text-[10px] font-mono text-zinc-400">
                          DIRECT ACCESS
                        </span>
                      </div>

                      <div className="flex items-center gap-1.5 pointer-events-auto">
                        <button
                          type="button"
                          onClick={() => setInspectingBundleProduct(flagshipProduct)}
                          className="flex items-center gap-1 px-2.5 py-1 rounded-full bg-black/80 hover:bg-black text-amber-300 text-[10.5px] font-mono font-bold cursor-pointer shadow-sm border border-amber-400/40 active:scale-95 transition-all"
                        >
                          <FileText className="w-3 h-3 text-amber-400" />
                          <span>View Files</span>
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Flagship Body & Controls */}
                  <div className="p-2.5 pt-3 space-y-2.5">
                    <div>
                      <div className="flex items-center justify-between">
                        <h2 className="text-sm font-bold text-white truncate">
                          {flagshipProduct.title}
                        </h2>
                        <span className="text-sm font-extrabold text-white font-mono">
                          {formatPrice(flagshipProduct.price)}
                        </span>
                      </div>
                      <p className="text-xs text-zinc-400 line-clamp-1 mt-0.5">
                        {flagshipProduct.subtitle}
                      </p>
                    </div>

                    {/* Interactive Action Buttons */}
                    <div className="flex items-center gap-2 pt-1 border-t border-white/[0.08]">
      {/* Flagship Legal Document Full Reader Trigger */}
      <div className="flex items-center gap-2">
        <button
          type="button"
          onClick={() => handleOpenLegalDocument(flagshipProduct)}
          className="flex-1 flex items-center justify-center gap-1.5 py-1.5 px-3 rounded-xl bg-amber-500 hover:bg-amber-400 text-zinc-950 text-xs font-bold cursor-pointer active:scale-95 transition-all shadow-sm"
        >
          <FileText className="w-3.5 h-3.5" />
          <span>Read Full Agreement</span>
        </button>

        <button
          type="button"
          onClick={() => setInspectingBundleProduct(flagshipProduct)}
          className="flex items-center justify-center gap-1.5 py-1.5 px-3 rounded-xl bg-[#111317] hover:bg-[#1a1d23] text-amber-300 border border-amber-500/30 text-xs font-semibold cursor-pointer active:scale-95 transition-all"
        >
          <FileText className="w-3.5 h-3.5 text-amber-400" />
          <span>Inspect Files</span>
        </button>
      </div>

                      <button
                        type="button"
                        onClick={() => setActiveQuickLook(flagshipProduct)}
                        className="p-1.5 rounded-xl bg-[#111317] hover:bg-[#1a1d23] text-zinc-300 border border-white/10 cursor-pointer active:scale-95 transition-all"
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
                          className="flex items-center gap-1.5 py-1.5 px-3.5 rounded-xl bg-zinc-800 text-zinc-400 border border-white/10 text-xs font-medium cursor-default"
                        >
                          <Check className="w-3.5 h-3.5" />
                          <span>In Bag</span>
                        </button>
                      ) : (
                        <button
                          type="button"
                          onClick={() => handleAddToCart(flagshipProduct, 'standard')}
                          className="btn-primary flex items-center gap-1.5 py-1.5 px-3.5 rounded-xl text-xs font-semibold cursor-pointer"
                        >
                          <ShoppingBag className="w-3.5 h-3.5 text-zinc-950" />
                          <span>Add to Bag</span>
                        </button>
                      )}
                    </div>

                  </div>
                </div>
              </div>

            </div>
          </section>

          {/* Document Format & Compliance Highlights */}
          <section aria-label="Format specifications" className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2.5 sm:gap-3 max-w-full">
            <div className="group flex items-center gap-3 p-3.5 rounded-2xl bg-[#111317] border border-white/[0.08] hover:border-amber-400/40 transition-all border-t border-t-white/[0.12] min-w-0">
              <div className="p-2 rounded-xl bg-amber-950/40 border border-amber-500/30 text-amber-400 group-hover:scale-105 transition-transform shrink-0">
                <FileText className="w-4 h-4 text-amber-400" />
              </div>
              <div className="min-w-0">
                <div className="text-xs font-bold text-white group-hover:text-amber-300 transition-colors truncate">Native Formats</div>
                <div className="text-[11px] text-zinc-400 truncate">Word, PDF, Excel & Markdown</div>
              </div>
            </div>

            <div className="group flex items-center gap-3 p-3.5 rounded-2xl bg-[#111317] border border-white/[0.08] hover:border-emerald-400/40 transition-all border-t border-t-white/[0.12] min-w-0">
              <div className="p-2 rounded-xl bg-emerald-950/40 border border-emerald-500/30 text-emerald-400 group-hover:scale-105 transition-transform shrink-0">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
              </div>
              <div className="min-w-0">
                <div className="text-xs font-bold text-white group-hover:text-emerald-300 transition-colors truncate">Counsel Reviewed</div>
                <div className="text-[11px] text-zinc-400 truncate">Standardized commercial terms</div>
              </div>
            </div>

            <div className="group flex items-center gap-3 p-3.5 rounded-2xl bg-[#111317] border border-white/[0.08] hover:border-sky-400/40 transition-all border-t border-t-white/[0.12] min-w-0">
              <div className="p-2 rounded-xl bg-sky-950/40 border border-sky-500/30 text-sky-400 group-hover:scale-105 transition-transform shrink-0">
                <RotateCcw className="w-4 h-4 text-sky-400" />
              </div>
              <div className="min-w-0">
                <div className="text-xs font-bold text-white group-hover:text-sky-300 transition-colors truncate">Version Updates</div>
                <div className="text-[11px] text-zinc-400 truncate">Quarterly clause revisions</div>
              </div>
            </div>

            <div className="group flex items-center gap-3 p-3.5 rounded-2xl bg-[#111317] border border-white/[0.08] hover:border-indigo-400/40 transition-all border-t border-t-white/[0.12] min-w-0">
              <div className="p-2 rounded-xl bg-indigo-950/40 border border-indigo-500/30 text-indigo-400 group-hover:scale-105 transition-transform shrink-0">
                <BadgeCheck className="w-4 h-4 text-indigo-400" />
              </div>
              <div className="min-w-0">
                <div className="text-xs font-bold text-white group-hover:text-indigo-300 transition-colors truncate">Commercial Rights</div>
                <div className="text-[11px] text-zinc-400 truncate">Perpetual client usage rights</div>
              </div>
            </div>
          </section>

          {/* Controls Bar: Sort, View Switcher & Active Filter Tags */}
          <div className="flex flex-wrap items-center justify-between gap-3 p-3 rounded-2xl bg-[#111317] border border-white/[0.08] border-t border-t-white/[0.12] max-w-full">
            
            {/* Left: Active count and reset */}
            <div className="flex items-center gap-2 min-w-0">
              <span className="text-xs font-mono text-zinc-400 truncate">
                Catalog: <strong className="text-white font-bold">{filteredProducts.length}</strong> items
              </span>

              {(filterState.search || filterState.format || filterState.priceFilter !== 'all' || filterState.category !== 'all') && (
                <button
                  type="button"
                  onClick={handleResetFilters}
                  className="flex items-center gap-1 text-[11px] font-semibold text-amber-400 hover:text-amber-300 pl-2 border-l border-white/10 cursor-pointer shrink-0"
                >
                  <X className="w-3.5 h-3.5" />
                  <span>Reset</span>
                </button>
              )}
            </div>

            {/* Right: Sort & Layout toggles */}
            <div className="flex items-center gap-2 sm:gap-3 shrink-0">
              
              <div className="flex items-center gap-1.5 text-xs text-zinc-400">
                <ArrowUpDown className="w-3.5 h-3.5 text-zinc-500 hidden sm:inline" />
                <label htmlFor="sort-select" className="hidden sm:inline font-medium">Sort:</label>
                <select
                  id="sort-select"
                  value={filterState.sortBy}
                  onChange={(e) => handleFilterChange({ sortBy: e.target.value as FilterState['sortBy'] })}
                  className="bg-[#16181d] border border-white/10 rounded-lg px-2 sm:px-2.5 py-1 sm:py-1.5 text-xs text-zinc-200 focus:outline-none focus:border-white/30 font-medium cursor-pointer"
                >
                  <option value="popular">Popular</option>
                  <option value="rating">Rating</option>
                  <option value="price-asc">Price: Low</option>
                  <option value="price-desc">Price: High</option>
                  <option value="newest">New Releases</option>
                </select>
              </div>

              {/* View Switcher */}
              <div className="flex items-center bg-[#16181d] border border-white/10 rounded-lg p-0.5">
                <button
                  type="button"
                  onClick={() => setViewMode('grid')}
                  className={`p-1.5 rounded-md transition-colors cursor-pointer ${
                    viewMode === 'grid' ? 'bg-white text-zinc-950 font-bold' : 'text-zinc-400 hover:text-white'
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
                    viewMode === 'compact' ? 'bg-white text-zinc-950 font-bold' : 'text-zinc-400 hover:text-white'
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
                  onOpenLegalDocument={handleOpenLegalDocument}
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
        onOpenLegalDocument={handleOpenLegalDocument}
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

      {/* Complete Legal Document Viewer Modal */}
      <LegalDocumentViewerModal
        document={activeLegalDocument}
        isOpen={!!activeLegalDocument}
        onClose={() => setActiveLegalDocument(null)}
        onAddToCart={() => {
          if (activeLegalDocument) {
            const product = DIGITAL_PRODUCTS.find(p => p.id === activeLegalDocument.id);
            if (product) handleAddToCart(product, 'standard');
          }
        }}
        isInCart={activeLegalDocument ? cart.some(i => i.product.id === activeLegalDocument.id) : false}
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
