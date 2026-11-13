import React, { useState, useMemo, useEffect, useCallback } from 'react';
import { 
  DigitalProduct, 
  LicenseTierId, 
  FileTreeItem, 
  BundleManifest 
} from '../../types';
import { 
  STANDARD_LICENSE_TIERS, 
  getBundleManifest 
} from '../../data/bundle-manifests';
import { triggerBlobDownload } from '../../services/license-service';
import { 
  X, 
  Folder, 
  FolderOpen, 
  FileText, 
  FileCode, 
  FileArchive, 
  File, 
  Search, 
  Download, 
  Copy, 
  Check, 
  CheckCircle2, 
  XCircle, 
  ShieldCheck, 
  Sparkles, 
  ShoppingBag, 
  ChevronRight, 
  ChevronDown, 
  Coffee, 
  History, 
  Terminal, 
  ExternalLink,
  Layers,
  Scale
} from 'lucide-react';

interface AssetBundleInspectorModalProps {
  product: DigitalProduct | null;
  isOpen: boolean;
  onClose: () => void;
  onAddToCart: (p: DigitalProduct, license: LicenseTierId, tipAmount: number) => void;
  onInstantDownload: (p: DigitalProduct) => void;
  isInCart: boolean;
  isPurchased: boolean;
  formatPrice: (amountInUSD: number) => string;
}

type ActiveTab = 'files' | 'licenses' | 'security';

export const AssetBundleInspectorModal: React.FC<AssetBundleInspectorModalProps> = ({
  product,
  isOpen,
  onClose,
  onAddToCart,
  onInstantDownload,
  isInCart,
  isPurchased,
  formatPrice
}) => {
  // --- Local Interactive State ---
  const [activeTab, setActiveTab] = useState<ActiveTab>('files');
  const [selectedLicense, setSelectedLicense] = useState<LicenseTierId>('commercial');
  const [selectedTip, setSelectedTip] = useState<number>(0);
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedFolders, setExpandedFolders] = useState<Record<string, boolean>>({});
  const [copiedHash, setCopiedHash] = useState(false);
  const [sampleDownloadingName, setSampleDownloadingName] = useState<string | null>(null);

  // Close on Escape key
  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  // Retrieve rich manifest
  const manifest: BundleManifest | null = useMemo(() => {
    if (!product) return null;
    return getBundleManifest(
      product.id, 
      product.title, 
      product.creator.name, 
      product.fileFormat, 
      product.fileSize
    );
  }, [product]);

  // Initialize all folders expanded by default
  useEffect(() => {
    if (!manifest) return;
    const initExpanded: Record<string, boolean> = {};
    const traverse = (items: FileTreeItem[], parentPath = '') => {
      items.forEach(item => {
        if (item.type === 'folder') {
          const path = parentPath ? `${parentPath}/${item.name}` : item.name;
          initExpanded[path] = true;
          if (item.children) {
            traverse(item.children, path);
          }
        }
      });
    };
    traverse(manifest.fileTree);
    setExpandedFolders(initExpanded);
  }, [manifest]);

  // Toggle single folder
  const toggleFolder = useCallback((folderPath: string) => {
    setExpandedFolders(prev => ({
      ...prev,
      [folderPath]: !prev[folderPath]
    }));
  }, []);

  // Expand / Collapse all
  const setAllFolders = useCallback((expand: boolean) => {
    if (!manifest) return;
    const next: Record<string, boolean> = {};
    const traverse = (items: FileTreeItem[], parentPath = '') => {
      items.forEach(item => {
        if (item.type === 'folder') {
          const path = parentPath ? `${parentPath}/${item.name}` : item.name;
          next[path] = expand;
          if (item.children) {
            traverse(item.children, path);
          }
        }
      });
    };
    traverse(manifest.fileTree);
    setExpandedFolders(next);
  }, [manifest]);

  // Copy SHA-256 to clipboard with tactile emerald feedback
  const handleCopySha256 = useCallback(() => {
    if (!manifest) return;
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(manifest.sha256).catch(() => {});
    }
    setCopiedHash(true);
    setTimeout(() => setCopiedHash(false), 2400);
  }, [manifest]);

  // Handle Free Sample Download
  const handleDownloadSample = useCallback((item: FileTreeItem) => {
    setSampleDownloadingName(item.name);
    // Trigger realistic specimen file download
    const samplePayload = {
      specimen: item.name,
      productTitle: product ? product.title : 'Asset',
      license: 'Free Sample Preview - Nexus Vault Evaluator',
      timestamp: new Date().toISOString(),
      sampleWatermark: 'EVALUATION PURPOSES ONLY • NEXUS VAULT',
      bundleId: product ? product.id : 'unknown'
    };
    triggerBlobDownload(`sample_${item.name}.json`, samplePayload);

    setTimeout(() => {
      setSampleDownloadingName(null);
    }, 1800);
  }, [product]);

  if (!isOpen || !product || !manifest) return null;

  // Pricing calculations
  const isFree = product.price === 0;
  const currentTier = STANDARD_LICENSE_TIERS.find(t => t.id === selectedLicense) || STANDARD_LICENSE_TIERS[1];
  const basePrice = isFree ? 0 : Math.round(product.price * currentTier.priceMultiplier);
  const finalPrice = basePrice + selectedTip;

  // Filter file tree based on search query
  const filterFileTree = (items: FileTreeItem[]): FileTreeItem[] => {
    if (!searchQuery.trim()) return items;
    const q = searchQuery.toLowerCase().trim();

    const filtered: FileTreeItem[] = [];
    for (const item of items) {
      if (item.type === 'file') {
        if (item.name.toLowerCase().includes(q) || (item.extension && item.extension.toLowerCase().includes(q))) {
          filtered.push(item);
        }
      } else if (item.type === 'folder') {
        const matchesSelf = item.name.toLowerCase().includes(q);
        const children = item.children ? filterFileTree(item.children) : [];
        if (matchesSelf || children.length > 0) {
          filtered.push({
            ...item,
            children: matchesSelf ? (item.children || []) : children
          });
        }
      }
    }
    return filtered;
  };

  const visibleFileTree = filterFileTree(manifest.fileTree);

  // File extension badge styles
  const getExtensionBadge = (ext?: string) => {
    const e = (ext || '').toLowerCase();
    switch (e) {
      case 'fig':
        return <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-amber-50 text-amber-700 border border-amber-200/70 font-semibold uppercase">fig</span>;
      case 'json':
        return <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-emerald-50 text-emerald-700 border border-emerald-200/70 font-semibold uppercase">json</span>;
      case 'tsx':
      case 'ts':
      case 'js':
        return <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-cyan-50 text-cyan-700 border border-cyan-200/70 font-semibold uppercase">{e}</span>;
      case 'svg':
        return <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-rose-50 text-rose-700 border border-rose-200/70 font-semibold uppercase">svg</span>;
      case 'pdf':
        return <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-red-50 text-red-700 border border-red-200/70 font-semibold uppercase">pdf</span>;
      case 'blend':
        return <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-orange-50 text-orange-700 border border-orange-200/70 font-semibold uppercase">blend</span>;
      case 'wav':
        return <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-fuchsia-50 text-fuchsia-700 border border-fuchsia-200/70 font-semibold uppercase">wav</span>;
      case 'otf':
      case 'woff2':
        return <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-violet-50 text-violet-700 border border-violet-200/70 font-semibold uppercase">{e}</span>;
      default:
        return <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-stone-100 text-stone-600 border border-stone-200 uppercase">{e || 'raw'}</span>;
    }
  };

  // Render tree node recursively
  const renderTreeNode = (item: FileTreeItem, currentPath: string, depth = 0) => {
    const isFolder = item.type === 'folder';
    const isExpanded = !!expandedFolders[currentPath];

    return (
      <div key={currentPath} className="select-none">
        <div 
          onClick={() => isFolder && toggleFolder(currentPath)}
          className={`flex items-center justify-between py-1.5 px-2.5 rounded-xl transition-all duration-150 group ${
            isFolder ? 'cursor-pointer hover:bg-stone-100/80 active:bg-stone-200/60' : 'hover:bg-stone-50/80'
          }`}
          style={{ paddingLeft: `${Math.max(10, depth * 22 + 10)}px` }}
        >
          <div className="flex items-center gap-2 min-w-0 pr-2">
            {isFolder ? (
              <span className="p-0.5 text-stone-400 group-hover:text-stone-700 transition-colors">
                {isExpanded ? <ChevronDown className="w-3.5 h-3.5" /> : <ChevronRight className="w-3.5 h-3.5" />}
              </span>
            ) : (
              <span className="w-3.5" />
            )}

            {isFolder ? (
              isExpanded ? (
                <FolderOpen className="w-4 h-4 text-amber-500 shrink-0" />
              ) : (
                <Folder className="w-4 h-4 text-amber-500 shrink-0" />
              )
            ) : item.extension === 'tsx' || item.extension === 'ts' || item.extension === 'json' ? (
              <FileCode className="w-4 h-4 text-emerald-600 shrink-0" />
            ) : item.extension === 'pdf' || item.extension === 'md' || item.extension === 'txt' ? (
              <FileText className="w-4 h-4 text-stone-500 shrink-0" />
            ) : item.extension === 'fig' || item.extension === 'blend' || item.extension === 'svg' ? (
              <FileArchive className="w-4 h-4 text-indigo-500 shrink-0" />
            ) : (
              <File className="w-4 h-4 text-stone-400 shrink-0" />
            )}

            <span className={`text-xs truncate font-mono ${isFolder ? 'font-semibold text-stone-800' : 'text-stone-700'}`}>
              {item.name}
            </span>

            {!isFolder && item.extension && getExtensionBadge(item.extension)}
          </div>

          <div className="flex items-center gap-2 shrink-0">
            {item.size && (
              <span className="text-[11px] font-mono text-stone-600 font-medium">
                {item.size}
              </span>
            )}

            {item.sampleAvailable && (
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  handleDownloadSample(item);
                }}
                disabled={sampleDownloadingName === item.name}
                className="flex items-center gap-1 px-2 py-0.5 rounded-lg bg-emerald-50 hover:bg-emerald-100/90 text-emerald-800 border border-emerald-300/80 text-[10px] font-bold cursor-pointer active:scale-95 transition-all shadow-2xs"
                title="Download verified free sample specimen"
              >
                {sampleDownloadingName === item.name ? (
                  <>
                    <Check className="w-3 h-3 text-emerald-700 animate-bounce" />
                    <span>Saving...</span>
                  </>
                ) : (
                  <>
                    <Download className="w-3 h-3 text-emerald-700" />
                    <span>Free Sample</span>
                  </>
                )}
              </button>
            )}
          </div>
        </div>

        {isFolder && isExpanded && item.children && item.children.length > 0 && (
          <div className="border-l border-stone-200/70 ml-5 my-0.5 space-y-0.5">
            {item.children.map(child => {
              const childPath = `${currentPath}/${child.name}`;
              return renderTreeNode(child, childPath, depth + 1);
            })}
          </div>
        )}
      </div>
    );
  };

  return (
    <div 
      role="dialog" 
      aria-modal="true" 
      aria-labelledby="bundle-inspector-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-stone-900/60 backdrop-blur-md animate-in fade-in duration-200"
    >
      {/* Backdrop click dismiss */}
      <div className="absolute inset-0" onClick={onClose} />

      {/* Main Container with Concentric Radii and Specular Sheen */}
      <div className="relative w-full max-w-4xl max-h-[92vh] bg-stone-50 border border-stone-300/90 rounded-[28px] overflow-hidden shadow-[0_25px_60px_-15px_rgba(0,0,0,0.35)] flex flex-col z-10 text-stone-800 ring-1 ring-stone-900/10">
        
        {/* Specular Edge Top Highlight */}
        <div className="absolute inset-x-0 top-0 h-[1px] bg-gradient-to-r from-transparent via-white/80 to-transparent pointer-events-none z-20" />

        {/* 1. Top Header Bar */}
        <div className="px-5 py-4 border-b border-stone-200/90 bg-white flex items-center justify-between gap-3 shrink-0">
          <div className="flex items-center gap-3 min-w-0">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-stone-900 to-stone-800 text-amber-300 flex items-center justify-center font-black text-sm shadow-md shrink-0 border border-stone-700">
              <Layers className="w-5 h-5 text-amber-400" />
            </div>

            <div className="min-w-0">
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-mono font-bold uppercase tracking-wider px-2 py-0.5 rounded-md bg-stone-100 text-stone-700 border border-stone-200">
                  Bundle Inspector
                </span>
                <span className="text-[11px] font-mono text-emerald-800 font-bold bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-200/80">
                  v{manifest.version}
                </span>
                <span className="text-xs text-stone-600 hidden sm:inline">
                  Released {manifest.releaseDate}
                </span>
              </div>

              <h2 id="bundle-inspector-title" className="text-base sm:text-lg font-bold text-stone-900 truncate">
                {product.title}
              </h2>
            </div>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <button
              type="button"
              onClick={onClose}
              className="p-2 rounded-xl text-stone-500 hover:text-stone-900 hover:bg-stone-100 transition-colors cursor-pointer active:scale-95"
              aria-label="Close inspector"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* 2. Apple-Grade Segmented Navigation Tabs */}
        <div className="px-5 py-2.5 bg-stone-100/80 border-b border-stone-200 flex items-center justify-between gap-2 shrink-0 overflow-x-auto">
          <div className="flex items-center p-1 bg-stone-200/80 rounded-2xl shadow-inner gap-1">
            <button
              type="button"
              onClick={() => setActiveTab('files')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                activeTab === 'files'
                  ? 'bg-white text-stone-900 shadow-sm'
                  : 'text-stone-600 hover:text-stone-900'
              }`}
            >
              <FileArchive className="w-3.5 h-3.5 text-amber-600" />
              <span>Look Inside ({manifest.totalFiles} Files)</span>
            </button>

            <button
              type="button"
              onClick={() => setActiveTab('licenses')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                activeTab === 'licenses'
                  ? 'bg-white text-stone-900 shadow-sm'
                  : 'text-stone-600 hover:text-stone-900'
              }`}
            >
              <Scale className="w-3.5 h-3.5 text-indigo-600" />
              <span>License Matrix</span>
            </button>

            <button
              type="button"
              onClick={() => setActiveTab('security')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                activeTab === 'security'
                  ? 'bg-white text-stone-900 shadow-sm'
                  : 'text-stone-600 hover:text-stone-900'
              }`}
            >
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
              <span>SHA-256 & Changelog</span>
            </button>
          </div>

          {/* Quick Stats Pill */}
          <div className="hidden md:flex items-center gap-3 text-xs font-mono text-stone-600">
            <span>Size: <strong className="text-stone-900">{manifest.totalSize}</strong></span>
            <span>Files: <strong className="text-stone-900">{manifest.totalFiles}</strong></span>
          </div>
        </div>

        {/* 3. Tab Body Container */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 bg-white min-h-[340px]">
          
          {/* TAB 1: Look Inside File Tree */}
          {activeTab === 'files' && (
            <div className="space-y-4">
              
              {/* Search & Tree Controls */}
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
                <div className="relative flex-1">
                  <Search className="w-4 h-4 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search files by name or extension (e.g. .fig, .json)..."
                    className="w-full pl-9 pr-4 py-2 bg-stone-50 border border-stone-200 rounded-xl text-xs font-mono text-stone-800 placeholder-stone-400 focus:outline-none focus:ring-2 focus:ring-stone-900 focus:bg-white transition-all"
                  />
                  {searchQuery && (
                    <button
                      type="button"
                      onClick={() => setSearchQuery('')}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-stone-400 hover:text-stone-700"
                    >
                      <X className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  <button
                    type="button"
                    onClick={() => setAllFolders(true)}
                    className="px-2.5 py-1.5 rounded-lg bg-stone-100 hover:bg-stone-200 text-stone-700 text-xs font-medium cursor-pointer transition-colors"
                  >
                    Expand All
                  </button>
                  <button
                    type="button"
                    onClick={() => setAllFolders(false)}
                    className="px-2.5 py-1.5 rounded-lg bg-stone-100 hover:bg-stone-200 text-stone-700 text-xs font-medium cursor-pointer transition-colors"
                  >
                    Collapse All
                  </button>
                </div>
              </div>

              {/* Free Sample Callout Banner */}
              <div className="p-3 bg-gradient-to-r from-emerald-50 via-teal-50 to-stone-50 border border-emerald-200/80 rounded-2xl flex items-center justify-between gap-3">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-xl bg-emerald-600 text-white flex items-center justify-center shrink-0 shadow-xs">
                    <Download className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-emerald-950">
                      Need to test before buying?
                    </h4>
                    <p className="text-[11px] text-emerald-800">
                      Click the <span className="font-semibold text-emerald-900">"Free Sample"</span> badge next to eligible components to download high-resolution specimen files directly.
                    </p>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => {
                    const firstSample = manifest.fileTree.find(f => f.sampleAvailable) || manifest.fileTree[0];
                    handleDownloadSample(firstSample);
                  }}
                  className="px-3 py-1.5 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-bold shrink-0 shadow-xs active:scale-95 transition-all cursor-pointer"
                >
                  Download Free Sample
                </button>
              </div>

              {/* Interactive Tree Box */}
              <div className="border border-stone-200 rounded-2xl p-3 bg-stone-50/50 max-h-[380px] overflow-y-auto space-y-0.5">
                {visibleFileTree.length === 0 ? (
                  <div className="py-8 text-center text-xs text-stone-500 font-mono">
                    No files found matching "{searchQuery}"
                  </div>
                ) : (
                  visibleFileTree.map(item => renderTreeNode(item, item.name, 0))
                )}
              </div>

              {/* Tree Footer Metadata */}
              <div className="flex flex-wrap items-center justify-between text-xs text-stone-500 px-1 pt-1 font-mono">
                <div className="flex items-center gap-1.5">
                  <Terminal className="w-3.5 h-3.5 text-stone-400" />
                  <span>Verified Archive Layout • POSIX Compliant</span>
                </div>
                <span>Total uncompressed footprint: <strong>{manifest.totalSize}</strong></span>
              </div>

            </div>
          )}

          {/* TAB 2: Plain-English License Matrix */}
          {activeTab === 'licenses' && (
            <div className="space-y-5">
              <div>
                <h3 className="text-sm font-bold text-stone-900">
                  Select Your Permitted Usage Tier
                </h3>
                <p className="text-xs text-stone-500 mt-0.5">
                  Straightforward, plain-English licensing with zero ambiguous legalese. Change anytime.
                </p>
              </div>

              {/* License Cards Grid */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5">
                {STANDARD_LICENSE_TIERS.map(tier => {
                  const isSelected = selectedLicense === tier.id;
                  const tierPrice = isFree ? 0 : Math.round(product.price * tier.priceMultiplier);

                  return (
                    <div
                      key={tier.id}
                      onClick={() => setSelectedLicense(tier.id)}
                      className={`relative rounded-2xl p-4.5 border-2 transition-all cursor-pointer flex flex-col justify-between ${
                        isSelected 
                          ? 'border-indigo-600 bg-indigo-50/30 shadow-[0_8px_20px_rgba(79,70,229,0.12)] -translate-y-0.5' 
                          : 'border-stone-200/90 hover:border-stone-300 bg-white hover:bg-stone-50/50'
                      }`}
                    >
                      {tier.badge && (
                        <div className="absolute -top-2.5 right-3.5">
                          <span className={`text-[9px] font-mono font-bold uppercase tracking-wider px-2 py-0.5 rounded-full shadow-2xs border ${
                            isSelected 
                              ? 'bg-indigo-600 text-white border-indigo-700' 
                              : 'bg-stone-100 text-stone-700 border-stone-200'
                          }`}>
                            {tier.badge}
                          </span>
                        </div>
                      )}

                      <div>
                        {/* Radio Header */}
                        <div className="flex items-center justify-between mb-2">
                          <h4 className="text-sm font-bold text-stone-900">
                            {tier.name}
                          </h4>
                          <div className={`w-4 h-4 rounded-full border flex items-center justify-center transition-all ${
                            isSelected ? 'border-indigo-600 bg-indigo-600 text-white' : 'border-stone-300'
                          }`}>
                            {isSelected && <Check className="w-3 h-3 stroke-[3]" />}
                          </div>
                        </div>

                        {/* Price Tag */}
                        <div className="mb-3">
                          <div className="text-xl font-extrabold text-stone-900 font-mono">
                            {formatPrice(tierPrice)}
                          </div>
                          <p className="text-[11px] text-stone-500 leading-snug mt-1">
                            {tier.description}
                          </p>
                        </div>

                        {/* Affirmative Do's Checklist */}
                        <div className="space-y-1.5 pt-2 border-t border-stone-100">
                          <div className="text-[10px] font-bold text-emerald-800 uppercase tracking-wide">
                            Included & Allowed:
                          </div>
                          {tier.allowedUses.map((use, i) => (
                            <div key={i} className="flex items-start gap-1.5 text-xs text-stone-700">
                              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                              <span className="leading-tight">{use}</span>
                            </div>
                          ))}
                        </div>

                        {/* Affirmative Don'ts Checklist */}
                        <div className="space-y-1.5 pt-2.5 mt-2.5 border-t border-stone-100">
                          <div className="text-[10px] font-bold text-rose-800 uppercase tracking-wide">
                            Prohibited:
                          </div>
                          {tier.prohibitedUses.map((dont, i) => (
                            <div key={i} className="flex items-start gap-1.5 text-[11px] text-stone-600">
                              <XCircle className="w-3.5 h-3.5 text-rose-500 shrink-0 mt-0.5" />
                              <span className="leading-tight">{dont}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Select Action Button */}
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          setSelectedLicense(tier.id);
                        }}
                        className={`w-full mt-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                          isSelected
                            ? 'bg-indigo-600 text-white shadow-xs'
                            : 'bg-stone-100 hover:bg-stone-200 text-stone-700'
                        }`}
                      >
                        {isSelected ? 'Current Selection' : 'Select Tier'}
                      </button>
                    </div>
                  );
                })}
              </div>

              {/* Legal Indemnity Guarantee Banner */}
              <div className="p-3 bg-stone-50 rounded-2xl border border-stone-200 flex items-center gap-3 text-xs text-stone-600">
                <ShieldCheck className="w-5 h-5 text-indigo-600 shrink-0" />
                <span>
                  All Nexus Vault licenses carry perpetual, irrevocable rights with verified cryptographic authorship chain-of-custody.
                </span>
              </div>
            </div>
          )}

          {/* TAB 3: Cryptographic SHA-256 & Semantic Changelog */}
          {activeTab === 'security' && (
            <div className="space-y-5">
              
              {/* One-Click SHA-256 Checksum Card with Tactile Emerald Feedback */}
              <div className="p-4 rounded-2xl bg-stone-900 text-stone-100 border border-stone-800 shadow-md">
                <div className="flex items-center justify-between pb-2 mb-2 border-b border-stone-800">
                  <div className="flex items-center gap-2">
                    <ShieldCheck className="w-4 h-4 text-emerald-400" />
                    <span className="text-xs font-bold font-mono tracking-wide text-emerald-400">
                      CRYPTOGRAPHIC INTEGRITY VERIFICATION
                    </span>
                  </div>
                  <span className="text-[10px] font-mono text-stone-400 bg-stone-800 px-2 py-0.5 rounded">
                    SHA-256 ARCHIVE HASH
                  </span>
                </div>

                <p className="text-xs text-stone-400 mb-2 leading-relaxed">
                  Verify the archive tamper-resistance before extracting. Every asset in Nexus Vault is signed by its verified creator.
                </p>

                <div className="flex items-center justify-between gap-2 p-2.5 rounded-xl bg-stone-950/80 border border-stone-800">
                  <span className="text-xs font-mono text-stone-300 break-all select-all">
                    {manifest.sha256}
                  </span>

                  <button
                    type="button"
                    onClick={handleCopySha256}
                    className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all duration-200 shrink-0 cursor-pointer active:scale-95 ${
                      copiedHash 
                        ? 'bg-emerald-500 text-white shadow-[0_0_15px_rgba(16,185,129,0.5)] scale-105' 
                        : 'bg-stone-800 hover:bg-stone-700 text-stone-200'
                    }`}
                  >
                    {copiedHash ? (
                      <>
                        <Check className="w-3.5 h-3.5 stroke-[3]" />
                        <span>Copied!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5" />
                        <span>Copy Hash</span>
                      </>
                    )}
                  </button>
                </div>

                <div className="flex items-center justify-between text-[11px] font-mono text-stone-500 mt-2.5 pt-1">
                  <span>ECDSA Signature: {manifest.signature.substring(0, 32)}...</span>
                  <span className="text-emerald-400 font-semibold flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                    Signature Valid
                  </span>
                </div>
              </div>

              {/* Version Changelog Timeline */}
              <div>
                <div className="flex items-center gap-2 mb-3">
                  <History className="w-4 h-4 text-stone-700" />
                  <h4 className="text-sm font-bold text-stone-900">
                    Release Version History & Semantic Changelog
                  </h4>
                </div>

                <div className="relative border-l-2 border-stone-200 ml-3 pl-5 space-y-6">
                  {manifest.changelog.map((entry, index) => (
                    <div key={entry.version} className="relative">
                      {/* Timeline Dot */}
                      <div className={`absolute -left-[27px] top-1 w-3.5 h-3.5 rounded-full border-2 bg-white ${
                        index === 0 ? 'border-emerald-600 bg-emerald-600 ring-4 ring-emerald-100' : 'border-stone-400'
                      }`} />

                      <div className="flex items-center gap-2">
                        <span className="px-2 py-0.5 rounded-md bg-stone-100 text-stone-800 font-mono text-xs font-bold border border-stone-200">
                          v{entry.version}
                        </span>
                        <span className="text-xs text-stone-600 font-mono">
                          {entry.releaseDate}
                        </span>
                        {entry.breaking && (
                          <span className="px-2 py-0.5 rounded-full bg-amber-50 text-amber-800 border border-amber-200 text-[10px] font-bold">
                            Breaking Changes
                          </span>
                        )}
                        {index === 0 && (
                          <span className="px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200 text-[10px] font-bold">
                            Latest Production
                          </span>
                        )}
                      </div>

                      <h5 className="text-xs font-bold text-stone-900 mt-1">
                        {entry.title}
                      </h5>

                      <ul className="mt-1.5 space-y-1">
                        {entry.changes.map((change, cIdx) => (
                          <li key={cIdx} className="text-xs text-stone-600 flex items-start gap-1.5">
                            <span className="text-stone-300 select-none">•</span>
                            <span>{change}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </div>

            </div>
          )}

        </div>

        {/* 4. Creator Tip Module & Dynamic Pricing Footer */}
        <div className="p-4 sm:p-5 bg-stone-50 border-t border-stone-200/90 shrink-0 space-y-3">
          
          {/* Creator Tip Quick Chips */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 p-3 bg-white rounded-2xl border border-stone-200">
            <div className="flex items-center gap-2.5">
              <img 
                src={product.creator.avatar} 
                alt={product.creator.name}
                className="w-8 h-8 rounded-full object-cover border border-stone-200 shrink-0" 
              />
              <div className="min-w-0">
                <div className="flex items-center gap-1.5 text-xs font-bold text-stone-900">
                  <Coffee className="w-3.5 h-3.5 text-amber-600" />
                  <span>Tip {product.creator.name}</span>
                  <span className="text-stone-600 font-mono font-normal">({manifest.creatorTips.creatorHandle})</span>
                </div>
                <p className="text-[11px] text-stone-600 truncate">
                  {manifest.creatorTips.messagePrompt || 'Support continuous development and updates!'}
                </p>
              </div>
            </div>

            {/* Quick Chips */}
            <div className="flex items-center gap-1.5 self-end sm:self-center">
              {manifest.creatorTips.suggestedAmounts.map(amount => (
                <button
                  key={amount}
                  type="button"
                  onClick={() => setSelectedTip(amount)}
                  className={`px-3 py-1 rounded-xl text-xs font-mono font-bold transition-all cursor-pointer ${
                    selectedTip === amount
                      ? 'bg-amber-600 text-white shadow-sm scale-105'
                      : 'bg-stone-100 hover:bg-stone-200 text-stone-700'
                  }`}
                >
                  {amount === 0 ? '+$0' : `+$${amount}`}
                </button>
              ))}
            </div>
          </div>

          {/* Pricing Summary & Final Primary Action */}
          <div className="flex items-center justify-between gap-3 pt-1">
            <div>
              <div className="flex items-baseline gap-2">
                <span className="text-xl sm:text-2xl font-black text-stone-900 font-mono">
                  {isFree ? 'FREE' : formatPrice(finalPrice)}
                </span>
                <span className="text-xs text-stone-600 capitalize font-medium">
                  • {currentTier.name}
                  {selectedTip > 0 && <span className="text-amber-800 font-mono font-bold"> (+${selectedTip} tip)</span>}
                </span>
              </div>
              <p className="text-[10px] text-stone-600">
                Instant cryptographic download + lifetime version updates
              </p>
            </div>

            <div className="flex items-center gap-2">
              {isPurchased ? (
                <button
                  type="button"
                  onClick={() => onInstantDownload(product)}
                  className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold cursor-pointer shadow-md hover:-translate-y-0.5 active:scale-95 transition-all"
                >
                  <Download className="w-4 h-4" />
                  <span>Download Bundle</span>
                </button>
              ) : isFree ? (
                <button
                  type="button"
                  onClick={() => onInstantDownload(product)}
                  className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold cursor-pointer shadow-md hover:-translate-y-0.5 active:scale-95 transition-all"
                >
                  <Download className="w-4 h-4" />
                  <span>Download Free Asset</span>
                </button>
              ) : isInCart ? (
                <button
                  type="button"
                  onClick={() => {
                    onAddToCart(product, selectedLicense, selectedTip);
                    onClose();
                  }}
                  className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-stone-900 hover:bg-stone-800 text-white text-xs font-bold cursor-pointer shadow-md hover:-translate-y-0.5 active:scale-95 transition-all"
                >
                  <Check className="w-4 h-4 text-emerald-400" />
                  <span>Update in Bag • {formatPrice(finalPrice)}</span>
                </button>
              ) : (
                <button
                  type="button"
                  onClick={() => {
                    onAddToCart(product, selectedLicense, selectedTip);
                    onClose();
                  }}
                  className="flex items-center gap-2 px-6 py-2.5 rounded-xl bg-stone-900 hover:bg-stone-800 text-white text-xs font-bold cursor-pointer shadow-[0_6px_18px_rgba(0,0,0,0.2)] hover:-translate-y-0.5 active:scale-95 transition-all"
                >
                  <ShoppingBag className="w-4 h-4 text-amber-300" />
                  <span>Add to Bag • {formatPrice(finalPrice)}</span>
                </button>
              )}
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};
