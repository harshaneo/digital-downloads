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
    return <span className="text-[11px] font-mono px-2 py-0.5 rounded-md badge-3d text-slate-200 font-bold uppercase">{e || 'raw'}</span>;
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
            isFolder ? 'cursor-pointer hover:bg-white/[0.06] active:bg-white/[0.10]' : 'hover:bg-white/[0.04]'
          }`}
          style={{ paddingLeft: `${Math.max(10, depth * 22 + 10)}px` }}
        >
          <div className="flex items-center gap-2 min-w-0 pr-2">
            {isFolder ? (
              <span className="p-0.5 text-zinc-500 group-hover:text-zinc-200 transition-colors">
                {isExpanded ? <ChevronDown className="w-3.5 h-3.5" /> : <ChevronRight className="w-3.5 h-3.5" />}
              </span>
            ) : (
              <span className="w-3.5" />
            )}

            {isFolder ? (
              isExpanded ? (
                <FolderOpen className="w-4 h-4 text-slate-300 shrink-0" />
              ) : (
                <Folder className="w-4 h-4 text-slate-300 shrink-0" />
              )
            ) : item.extension === 'tsx' || item.extension === 'ts' || item.extension === 'json' ? (
              <FileCode className="w-4 h-4 text-slate-300 shrink-0" />
            ) : item.extension === 'pdf' || item.extension === 'md' || item.extension === 'txt' ? (
              <FileText className="w-4 h-4 text-zinc-400 shrink-0" />
            ) : item.extension === 'fig' || item.extension === 'blend' || item.extension === 'svg' ? (
              <FileArchive className="w-4 h-4 text-slate-300 shrink-0" />
            ) : (
              <File className="w-4 h-4 text-zinc-500 shrink-0" />
            )}

            <span className={`text-xs truncate font-mono ${isFolder ? 'font-semibold text-zinc-200' : 'text-zinc-300'}`}>
              {item.name}
            </span>

            {!isFolder && item.extension && getExtensionBadge(item.extension)}
          </div>

          <div className="flex items-center gap-2 shrink-0">
            {item.size && (
              <span className="text-[11px] font-mono text-zinc-400 font-medium">
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
                className="btn-tactile-dark flex items-center gap-1.5 px-2.5 py-0.5 rounded-lg text-[11px] font-bold cursor-pointer active:scale-95 transition-all text-slate-200"
                title="Download verified free sample specimen"
              >
                {sampleDownloadingName === item.name ? (
                  <>
                    <Check className="w-3 h-3 text-white" />
                    <span>Saving...</span>
                  </>
                ) : (
                  <>
                    <Download className="w-3 h-3 text-white" />
                    <span>Free Sample</span>
                  </>
                )}
              </button>
            )}
          </div>
        </div>

        {isFolder && isExpanded && item.children && item.children.length > 0 && (
          <div className="border-l border-white/[0.08] ml-5 my-0.5 space-y-0.5">
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
      className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 bg-black/85 backdrop-blur-xl animate-in fade-in duration-200"
    >
      {/* Backdrop click dismiss */}
      <div className="absolute inset-0" onClick={onClose} />

      {/* Main Container with Concentric Radii and Specular Sheen */}
      <div className="relative w-full max-w-4xl max-h-[92vh] bg-[#090909] border border-white/10 rounded-t-3xl sm:rounded-3xl overflow-hidden shadow-2xl flex flex-col z-10 text-white">
        
        {/* Mobile Sheet Grab Indicator */}
        <div className="sheet-grabber sm:hidden" />

        {/* 1. Top Header Bar */}
        <div className="px-5 py-4 border-b border-white/[0.08] bg-[#090909] flex items-center justify-between gap-3 shrink-0">
          <div className="flex items-center gap-3 min-w-0">
            <div className="w-10 h-10 rounded-xl bg-white/[0.05] border border-white/[0.08] text-white flex items-center justify-center font-black text-sm shrink-0">
              <Layers className="w-5 h-5 text-white" />
            </div>

            <div className="min-w-0">
              <div className="flex items-center gap-2">
                <span className="text-[11px] font-mono font-bold uppercase tracking-wider px-2 py-0.5 rounded-md bg-white/[0.06] text-zinc-300 border border-white/[0.08]">
                  Bundle Inspector
                </span>
                <span className="text-[11px] font-mono text-slate-200 font-bold px-2.5 py-0.5 rounded-md badge-3d">
                  v{manifest.version}
                </span>
                <span className="text-xs text-zinc-400 hidden sm:inline">
                  Released {manifest.releaseDate}
                </span>
              </div>

              <h2 id="bundle-inspector-title" className="text-base sm:text-lg font-bold text-white truncate">
                {product.title}
              </h2>
            </div>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <button
              type="button"
              onClick={onClose}
              className="p-2 rounded-xl text-zinc-400 hover:text-white hover:bg-white/[0.06] transition-colors cursor-pointer active:scale-95"
              aria-label="Close inspector"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* 2. Apple-Grade Segmented Navigation Tabs */}
        <div className="px-5 py-2.5 bg-[var(--bg-surface)] border-b border-white/[0.08] flex items-center justify-between gap-2 shrink-0 overflow-x-auto">
          <div className="flex items-center p-1 bg-[var(--bg-surface-elevated)] rounded-xl border border-white/[0.06] gap-1">
            <button
              type="button"
              onClick={() => setActiveTab('files')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                activeTab === 'files'
                  ? 'bg-white text-[var(--bg-base)] shadow-sm'
                  : 'text-zinc-400 hover:text-white'
              }`}
            >
              <FileArchive className="w-3.5 h-3.5 text-slate-300" />
              <span>Look Inside ({manifest.totalFiles} Files)</span>
            </button>

            <button
              type="button"
              onClick={() => setActiveTab('licenses')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                activeTab === 'licenses'
                  ? 'bg-white text-[var(--bg-base)] shadow-sm'
                  : 'text-zinc-400 hover:text-white'
              }`}
            >
              <Scale className="w-3.5 h-3.5 text-slate-300" />
              <span>Licensing & Usage</span>
            </button>

            <button
              type="button"
              onClick={() => setActiveTab('security')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                activeTab === 'security'
                  ? 'bg-white text-[var(--bg-base)] shadow-sm'
                  : 'text-zinc-400 hover:text-white'
              }`}
            >
              <ShieldCheck className="w-3.5 h-3.5 text-slate-300" />
              <span>SHA-256 & Changelog</span>
            </button>
          </div>

          {/* Quick Stats Pill */}
          <div className="hidden md:flex items-center gap-3 text-xs font-mono text-zinc-400">
            <span>Size: <strong className="text-white">{manifest.totalSize}</strong></span>
            <span>Files: <strong className="text-white">{manifest.totalFiles}</strong></span>
          </div>
        </div>

        {/* 3. Tab Body Container */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 bg-[var(--bg-surface)] min-h-[340px]">
          
          {/* TAB 1: Look Inside File Tree */}
          {activeTab === 'files' && (
            <div className="space-y-4">
              
              {/* Search & Tree Controls */}
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
                <div className="relative flex-1">
                  <Search className="w-4 h-4 text-zinc-500 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search files by name or extension (e.g. .fig, .json)..."
                    className="w-full pl-9 pr-4 py-2 bg-[var(--bg-surface-elevated)] border border-white/[0.08] rounded-xl text-xs font-mono text-white placeholder-zinc-500 focus:outline-none focus:border-white/20 transition-all"
                  />
                  {searchQuery && (
                    <button
                      type="button"
                      onClick={() => setSearchQuery('')}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-500 hover:text-white"
                    >
                      <X className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  <button
                    type="button"
                    onClick={() => setAllFolders(true)}
                    className="px-2.5 py-1.5 rounded-lg bg-[var(--bg-surface-elevated)] hover:bg-white/[0.06] text-zinc-300 border border-white/[0.06] text-xs font-medium cursor-pointer transition-colors"
                  >
                    Expand All
                  </button>
                  <button
                    type="button"
                    onClick={() => setAllFolders(false)}
                    className="px-2.5 py-1.5 rounded-lg bg-[var(--bg-surface-elevated)] hover:bg-white/[0.06] text-zinc-300 border border-white/[0.06] text-xs font-medium cursor-pointer transition-colors"
                  >
                    Collapse All
                  </button>
                </div>
              </div>

              {/* Free Sample Callout Banner */}
              <div className="p-3 bg-[var(--bg-surface-elevated)] border border-white/10 rounded-xl flex items-center justify-between gap-3">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-lg bg-white/[0.08] text-white flex items-center justify-center shrink-0">
                    <Download className="w-4 h-4 text-white" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-white">
                      Need to test before buying?
                    </h4>
                    <p className="text-[11px] text-zinc-400">
                      Click the <span className="font-semibold text-slate-200">"Free Sample"</span> badge next to eligible components to download high-resolution specimen files directly.
                    </p>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => {
                    const firstSample = manifest.fileTree.find(f => f.sampleAvailable) || manifest.fileTree[0];
                    handleDownloadSample(firstSample);
                  }}
                  className="px-3 py-1.5 rounded-lg bg-white hover:bg-zinc-200 text-[var(--bg-base)] text-xs font-bold shrink-0 transition-colors cursor-pointer"
                >
                  Download Free Sample
                </button>
              </div>

              {/* Interactive Tree Box */}
              <div className="border border-white/[0.08] rounded-xl p-3 bg-[var(--bg-surface)] max-h-[380px] overflow-y-auto space-y-0.5">
                {visibleFileTree.length === 0 ? (
                  <div className="py-8 text-center text-xs text-zinc-500 font-mono">
                    No files found matching "{searchQuery}"
                  </div>
                ) : (
                  visibleFileTree.map(item => renderTreeNode(item, item.name, 0))
                )}
              </div>

              {/* Tree Footer Metadata */}
              <div className="flex flex-wrap items-center justify-between text-xs text-zinc-500 px-1 pt-1 font-mono">
                <div className="flex items-center gap-1.5">
                  <Terminal className="w-3.5 h-3.5 text-zinc-500" />
                  <span>Verified Archive Layout • POSIX Compliant</span>
                </div>
                <span>Total uncompressed footprint: <strong className="text-zinc-300">{manifest.totalSize}</strong></span>
              </div>

            </div>
          )}

          {/* TAB 2: Plain-English Licensing & Usage */}
          {activeTab === 'licenses' && (
            <div className="space-y-5">
              <div>
                <h3 className="text-sm font-bold text-white tracking-tight">
                  Select Your Permitted Usage Tier
                </h3>
                <p className="text-xs text-zinc-400 mt-0.5">
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
                      className={`relative rounded-xl p-4.5 border transition-all cursor-pointer flex flex-col justify-between ${
                        isSelected 
                          ? 'border-white bg-[var(--bg-surface-elevated)] shadow-lg -translate-y-0.5' 
                          : 'border-white/[0.08] hover:border-white/[0.16] bg-[var(--bg-surface)]'
                      }`}
                    >
                      {tier.badge && (
                        <div className="absolute -top-2.5 right-3.5">
                          <span className={`text-[11px] font-mono font-bold uppercase tracking-wider px-2 py-0.5 rounded-full shadow-2xs border ${
                            isSelected 
                              ? 'bg-white text-[var(--bg-base)] border-white' 
                              : 'bg-white/[0.08] text-zinc-300 border-white/[0.12]'
                          }`}>
                            {tier.badge}
                          </span>
                        </div>
                      )}

                      <div>
                        {/* Radio Header */}
                        <div className="flex items-center justify-between mb-2">
                          <h4 className="text-sm font-bold text-white">
                            {tier.name}
                          </h4>
                          <div className={`w-4 h-4 rounded-full border flex items-center justify-center transition-all ${
                            isSelected ? 'border-white bg-white text-[var(--bg-base)]' : 'border-white/[0.2]'
                          }`}>
                            {isSelected && <Check className="w-3 h-3 stroke-[3]" />}
                          </div>
                        </div>

                        {/* Price Tag */}
                        <div className="mb-3">
                          <div className="text-xl font-extrabold text-white font-mono">
                            {formatPrice(tierPrice)}
                          </div>
                          <p className="text-[11px] text-zinc-400 leading-snug mt-1">
                            {tier.description}
                          </p>
                        </div>

                        {/* Affirmative Do's Checklist */}
                        <div className="space-y-1.5 pt-2 border-t border-white/[0.06]">
                          <div className="text-[11px] font-bold text-slate-200 uppercase tracking-wide">
                            Included & Allowed:
                          </div>
                          {tier.allowedUses.map((use, i) => (
                            <div key={i} className="flex items-start gap-1.5 text-xs text-zinc-300">
                              <CheckCircle2 className="w-3.5 h-3.5 text-slate-300 shrink-0 mt-0.5" />
                              <span className="leading-tight">{use}</span>
                            </div>
                          ))}
                        </div>

                        {/* Affirmative Don'ts Checklist */}
                        <div className="space-y-1.5 pt-2.5 mt-2.5 border-t border-white/[0.06]">
                          <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wide">
                            Prohibited:
                          </div>
                          {tier.prohibitedUses.map((dont, i) => (
                            <div key={i} className="flex items-start gap-1.5 text-[11px] text-zinc-400">
                              <XCircle className="w-3.5 h-3.5 text-slate-400 shrink-0 mt-0.5" />
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
                        className={`w-full mt-4 py-2 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                          isSelected
                            ? 'bg-white text-[var(--bg-base)]'
                            : 'bg-[var(--bg-surface-elevated)] hover:bg-white/[0.06] text-white border border-white/[0.08]'
                        }`}
                      >
                        {isSelected ? 'Current Selection' : 'Select Tier'}
                      </button>
                    </div>
                  );
                })}
              </div>

              {/* Legal Indemnity Guarantee Banner */}
              <div className="p-3 bg-[var(--bg-surface-elevated)] rounded-xl border border-white/[0.08] flex items-center gap-3 text-xs text-zinc-400">
                <ShieldCheck className="w-5 h-5 text-slate-300 shrink-0" />
                <span>
                  All Nexus Vault licenses carry perpetual, irrevocable rights with verified commercial terms.
                </span>
              </div>
            </div>
          )}

          {/* TAB 3: Cryptographic SHA-256 & Semantic Changelog */}
          {activeTab === 'security' && (
            <div className="space-y-5">
              
              {/* One-Click SHA-256 Checksum Card */}
              <div className="p-4 rounded-xl bg-[var(--bg-surface-elevated)] text-zinc-100 border border-white/[0.08]">
                <div className="flex items-center justify-between pb-2 mb-2 border-b border-white/[0.06]">
                  <div className="flex items-center gap-2">
                    <ShieldCheck className="w-4 h-4 text-slate-300" />
                    <span className="text-xs font-bold font-mono tracking-wide text-white">
                      CRYPTOGRAPHIC INTEGRITY VERIFICATION
                    </span>
                  </div>
                  <span className="text-[11px] font-mono text-zinc-400 bg-white/[0.05] border border-white/[0.08] px-2 py-0.5 rounded">
                    SHA-256 ARCHIVE HASH
                  </span>
                </div>

                <p className="text-xs text-zinc-400 mb-2 leading-relaxed">
                  Official package archive verified directly by the author and publisher.
                </p>

                <div className="flex items-center justify-between gap-2 p-2.5 rounded-lg bg-[var(--bg-surface)] border border-white/[0.06]">
                  <span className="text-xs font-mono text-zinc-300 break-all select-all">
                    {manifest.sha256}
                  </span>

                  <button
                    type="button"
                    onClick={handleCopySha256}
                    className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all duration-200 shrink-0 cursor-pointer active:scale-95 ${
                      copiedHash 
                        ? 'btn-primary text-zinc-950 scale-105' 
                        : 'btn-secondary text-zinc-200'
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

                <div className="flex items-center justify-between text-[11px] font-mono text-zinc-500 mt-2.5 pt-1">
                  <span>ECDSA Signature: {manifest.signature.substring(0, 32)}...</span>
                  <span className="text-slate-300 font-semibold flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-slate-300 animate-pulse" />
                    Signature Valid
                  </span>
                </div>
              </div>

              {/* Version Changelog Timeline */}
              <div>
                <div className="flex items-center gap-2 mb-3">
                  <History className="w-4 h-4 text-zinc-400" />
                  <h4 className="text-sm font-bold text-white tracking-tight">
                    Release Version History & Semantic Changelog
                  </h4>
                </div>

                <div className="relative border-l border-white/[0.08] ml-3 pl-5 space-y-6">
                  {manifest.changelog.map((entry, index) => (
                    <div key={entry.version} className="relative">
                      {/* Timeline Dot */}
                      <div className={`absolute -left-[25px] top-1 w-3 h-3 rounded-full border ${
                        index === 0 ? 'border-white bg-white ring-4 ring-white/20' : 'border-zinc-600 bg-[var(--bg-surface)]'
                      }`} />

                      <div className="flex items-center gap-2">
                        <span className="px-2 py-0.5 rounded-md bg-[var(--bg-surface-elevated)] text-zinc-200 font-mono text-xs font-bold border border-white/[0.08]">
                          v{entry.version}
                        </span>
                        <span className="text-xs text-zinc-500 font-mono">
                          {entry.releaseDate}
                        </span>
                        {entry.breaking && (
                          <span className="px-2.5 py-0.5 rounded-full badge-3d text-slate-200 text-[11px] font-bold">
                            Breaking Changes
                          </span>
                        )}
                        {index === 0 && (
                          <span className="px-2.5 py-0.5 rounded-full badge-3d text-white text-[11px] font-bold">
                            Latest Production
                          </span>
                        )}
                      </div>

                      <h5 className="text-xs font-semibold text-white mt-1">
                        {entry.title}
                      </h5>

                      <ul className="mt-1.5 space-y-1">
                        {entry.changes.map((change, cIdx) => (
                          <li key={cIdx} className="text-xs text-zinc-400 flex items-start gap-1.5">
                            <span className="text-zinc-600 select-none">•</span>
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
        <div className="p-4 sm:p-5 bg-[var(--bg-surface)] border-t border-white/[0.08] shrink-0 space-y-3">
          
          {/* Creator Tip Quick Chips */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 p-3 bg-[var(--bg-surface-elevated)] rounded-xl border border-white/[0.06]">
            <div className="flex items-center gap-2.5">
              <img 
                src={product.creator.avatar} 
                alt={product.creator.name}
                className="w-8 h-8 rounded-full object-cover border border-white/[0.08] shrink-0" 
              />
              <div className="min-w-0">
                <div className="flex items-center gap-1.5 text-xs font-bold text-white">
                  <Coffee className="w-3.5 h-3.5 text-slate-300" />
                  <span>Tip {product.creator.name}</span>
                  <span className="text-zinc-500 font-mono font-normal">({manifest.creatorTips.creatorHandle})</span>
                </div>
                <p className="text-[11px] text-zinc-400 truncate">
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
                  className={`px-3 py-1 rounded-lg text-xs font-mono font-bold transition-all cursor-pointer ${
                    selectedTip === amount
                      ? 'bg-white text-[var(--bg-base)] shadow-sm'
                      : 'bg-[var(--bg-surface)] hover:bg-white/[0.06] text-zinc-300 border border-white/[0.06]'
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
                <span className="text-xl sm:text-2xl font-black text-white font-mono">
                  {isFree ? 'FREE' : formatPrice(finalPrice)}
                </span>
                <span className="text-xs text-zinc-400 capitalize font-medium">
                  • {currentTier.name}
                  {selectedTip > 0 && <span className="text-slate-300 font-mono font-bold"> (+${selectedTip} tip)</span>}
                </span>
              </div>
              <p className="text-[11px] text-zinc-500">
                Immediate digital download + included version updates
              </p>
            </div>

            <div className="flex items-center gap-2">
              {isPurchased ? (
                <button
                  type="button"
                  onClick={() => onInstantDownload(product)}
                  className="btn-primary flex items-center gap-2 px-5 py-2.5 rounded-xl text-zinc-950 text-xs font-bold cursor-pointer shadow-md active:scale-95 transition-all"
                >
                  <Download className="w-4 h-4 text-zinc-950" />
                  <span>Download Bundle</span>
                </button>
              ) : isFree ? (
                <button
                  type="button"
                  onClick={() => onInstantDownload(product)}
                  className="btn-primary flex items-center gap-2 px-5 py-2.5 rounded-xl text-zinc-950 text-xs font-bold cursor-pointer shadow-md active:scale-95 transition-all"
                >
                  <Download className="w-4 h-4 text-zinc-950" />
                  <span>Download Free Asset</span>
                </button>
              ) : isInCart ? (
                <button
                  type="button"
                  onClick={() => {
                    onAddToCart(product, selectedLicense, selectedTip);
                    onClose();
                  }}
                  className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-white hover:bg-zinc-200 text-[var(--bg-base)] text-xs font-bold cursor-pointer shadow-md active:scale-95 transition-all"
                >
                  <Check className="w-4 h-4 text-zinc-950" />
                  <span>Update in Bag • {formatPrice(finalPrice)}</span>
                </button>
              ) : (
                <button
                  type="button"
                  onClick={() => {
                    onAddToCart(product, selectedLicense, selectedTip);
                    onClose();
                  }}
                  className="flex items-center gap-2 px-6 py-2.5 rounded-xl bg-white hover:bg-zinc-200 text-[var(--bg-base)] text-xs font-bold cursor-pointer shadow-md active:scale-95 transition-all"
                >
                  <ShoppingBag className="w-4 h-4 text-[var(--bg-base)]" />
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
