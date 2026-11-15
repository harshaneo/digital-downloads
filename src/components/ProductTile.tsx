import React from 'react';
import { DigitalProduct, Currency } from '../types';
import { 
  Star, 
  Download, 
  Heart, 
  Eye, 
  ShoppingBag, 
  Check, 
  CheckCircle2, 
  FileArchive,
  Layout,
  Code2,
  FileText,
  FileSpreadsheet,
  Briefcase,
  Scale,
  ShieldCheck,
  Presentation,
  FolderGit2,
  Fingerprint,
  Copy
} from 'lucide-react';
import { getBundleManifest } from '../data/bundle-manifests';

interface ProductTileProps {
  product: DigitalProduct;
  isWishlisted: boolean;
  isInCart: boolean;
  isPurchased: boolean;
  onToggleWishlist: (p: DigitalProduct) => void;
  onAddToCart: (p: DigitalProduct) => void;
  onQuickLook: (p: DigitalProduct) => void;
  onInspectBundle?: (p: DigitalProduct) => void;
  onOpenLegalDocument?: (p: DigitalProduct) => void;
  onInstantDownload: (p: DigitalProduct) => void;
  currency: Currency;
  formatPrice: (amountInUSD: number) => string;
  viewMode?: 'grid' | 'bento' | 'compact';
}

export const ProductTile: React.FC<ProductTileProps> = ({
  product,
  isWishlisted,
  isInCart,
  isPurchased,
  onToggleWishlist,
  onAddToCart,
  onQuickLook,
  onInspectBundle,
  onOpenLegalDocument,
  onInstantDownload,
  formatPrice
}) => {
  const isFree = product.price === 0;
  const [copiedHash, setCopiedHash] = React.useState(false);

  const bundleManifest = React.useMemo(() => {
    return getBundleManifest(product.id, product.title, product.creator.name, product.fileFormat, product.fileSize);
  }, [product.id, product.title, product.creator.name, product.fileFormat, product.fileSize]);

  const handleCopyHash = (e: React.MouseEvent) => {
    e.stopPropagation();
    navigator.clipboard.writeText(bundleManifest.sha256).catch(() => {});
    setCopiedHash(true);
    setTimeout(() => setCopiedHash(false), 1500);
  };

  // Category-Specific Luxury Document/Artifact Specimen Inside Tucked Pocket
  const renderCategoryPreview = () => {
    switch (product.category) {
      case 'legal-contracts':
        return (
          <div className="relative w-full h-full bg-gradient-to-b from-[#0b1428] via-[#070d1a] to-[#03060c] p-3.5 flex flex-col justify-between overflow-hidden text-slate-200">
            <div className="flex items-center justify-between pb-2 border-b border-indigo-500/20">
              <div className="flex items-center gap-2">
                <Scale className="w-3.5 h-3.5 text-indigo-400" />
                <span className="text-[11px] font-mono text-indigo-200 font-bold uppercase tracking-wider">
                  LEGAL INSTRUMENT
                </span>
              </div>
              <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-indigo-500/15 text-indigo-300 border border-indigo-500/30 font-medium">
                ENFORCEABLE
              </span>
            </div>

            <div className="my-auto py-2 px-3 bg-[#000000]/80 rounded-lg border border-indigo-500/20 space-y-2 font-mono">
              <div className="flex justify-between items-center text-slate-200 text-xs font-semibold">
                <span className="font-serif italic text-indigo-100 text-[13px]">§ 4.2 Indemnification & IP</span>
                <span className="text-[11px] text-indigo-400">REV. 2026</span>
              </div>
              <div className="text-[11px] text-slate-400 leading-snug line-clamp-2">
                Party A warrants clear title, proprietary ownership & perpetual client execution rights.
              </div>
              <div className="pt-1 flex items-center justify-between text-[11px] text-slate-400 border-t border-indigo-500/15">
                <span className="text-indigo-300 font-medium">Mutual Non-Solicit</span>
                <span className="text-zinc-500">DE / NY / UK</span>
              </div>
            </div>

            <div className="flex items-center justify-between text-[11px] font-mono text-slate-400 pt-1.5 border-t border-indigo-500/20">
              <span className="text-indigo-300 font-medium">Counsel Reviewed</span>
              <span className="text-zinc-400">Word + PDF + MD</span>
            </div>
          </div>
        );

      case 'sales-proposals':
        return (
          <div className="relative w-full h-full bg-gradient-to-b from-[#081e2b] via-[#05131c] to-[#02070a] p-3.5 flex flex-col justify-between overflow-hidden text-slate-200">
            <div className="flex items-center justify-between pb-2 border-b border-sky-500/20">
              <div className="flex items-center gap-2">
                <Presentation className="w-3.5 h-3.5 text-sky-400" />
                <span className="text-[11px] font-mono text-sky-200 font-bold uppercase tracking-wider">
                  COMMERCIAL PROPOSAL
                </span>
              </div>
              <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-sky-500/15 text-sky-300 border border-sky-500/30 font-medium">
                ENTERPRISE RFP
              </span>
            </div>

            <div className="my-auto p-2.5 bg-[#000000]/80 rounded-lg border border-sky-500/20 space-y-2">
              <div className="flex items-center justify-between text-xs font-mono">
                <span className="font-serif italic text-sky-100 text-[13px]">Scope & Commercial SOW</span>
                <span className="text-sky-300 font-bold">Fixed Deliverables</span>
              </div>
              <div className="grid grid-cols-3 gap-1.5 font-mono text-[11px]">
                <div className="py-1 px-1.5 bg-sky-500/10 rounded border border-sky-500/20 text-sky-200 text-center">Phase 1: Specs</div>
                <div className="py-1 px-1.5 bg-sky-500/10 rounded border border-sky-500/20 text-sky-200 text-center">Phase 2: Build</div>
                <div className="py-1 px-1.5 bg-sky-500/10 rounded border border-sky-500/20 text-sky-200 text-center">Phase 3: Deploy</div>
              </div>
            </div>

            <div className="flex items-center justify-between text-[11px] font-mono text-slate-400 pt-1.5 border-t border-sky-500/20">
              <span className="text-sky-300 font-medium">Pitch Deck + SOW</span>
              <span className="text-zinc-400">Keynote & Figma</span>
            </div>
          </div>
        );

      case 'ops-sops':
        return (
          <div className="relative w-full h-full bg-gradient-to-b from-[#08221b] via-[#051712] to-[#020907] p-3.5 flex flex-col justify-between overflow-hidden text-slate-200">
            <div className="flex items-center justify-between pb-2 border-b border-teal-500/20">
              <div className="flex items-center gap-2">
                <FolderGit2 className="w-3.5 h-3.5 text-teal-400" />
                <span className="text-[11px] font-mono text-teal-200 font-bold uppercase tracking-wider">
                  STANDARD OPS (SOP)
                </span>
              </div>
              <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-teal-500/15 text-teal-300 border border-teal-500/30 font-medium">
                RUNBOOK
              </span>
            </div>

            <div className="my-auto p-2.5 bg-[#000000]/80 rounded-lg border border-teal-500/20 space-y-1.5 font-mono text-[11px]">
              <div className="flex items-center gap-2 text-teal-100">
                <Check className="w-3.5 h-3.5 text-teal-400" />
                <span>01. Client Onboarding Protocol</span>
              </div>
              <div className="flex items-center gap-2 text-teal-200">
                <Check className="w-3.5 h-3.5 text-teal-400" />
                <span>02. Incident Escalation Matrix</span>
              </div>
              <div className="flex items-center gap-2 text-teal-300">
                <Check className="w-3.5 h-3.5 text-teal-500" />
                <span>03. Retainer Governance Runbook</span>
              </div>
            </div>

            <div className="flex items-center justify-between text-[11px] font-mono text-slate-400 pt-1.5 border-t border-teal-500/20">
              <span className="text-teal-300 font-medium">Process Blueprints</span>
              <span className="text-zinc-400">Notion & Markdown</span>
            </div>
          </div>
        );

      case 'financial-models':
      case 'spreadsheets':
        return (
          <div className="relative w-full h-full bg-gradient-to-b from-[#072418] via-[#041910] to-[#020a06] p-3.5 flex flex-col justify-between overflow-hidden text-slate-200">
            <div className="flex items-center justify-between pb-2 border-b border-emerald-500/20">
              <div className="flex items-center gap-2">
                <FileSpreadsheet className="w-3.5 h-3.5 text-emerald-400" />
                <span className="text-[11px] font-mono text-emerald-200 font-bold uppercase tracking-wider">
                  CAP TABLE & PRO FORMA
                </span>
              </div>
              <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-emerald-500/15 text-emerald-300 border border-emerald-500/30 font-medium">
                DYNAMIC XLSX
              </span>
            </div>

            <div className="my-auto bg-[#000000]/80 rounded-lg border border-emerald-500/20 p-2.5 font-mono text-[11px]">
              <div className="grid grid-cols-3 gap-2 pb-1.5 border-b border-emerald-500/20 text-emerald-400 font-bold">
                <span>METRIC</span>
                <span className="text-right">YR 1</span>
                <span className="text-right">YR 3</span>
              </div>
              <div className="grid grid-cols-3 gap-2 py-1 text-slate-300">
                <span className="text-slate-400">ARR</span>
                <span className="text-right tabular-nums">$440K</span>
                <span className="text-right text-emerald-400 font-bold tabular-nums">$1.84M</span>
              </div>
              <div className="grid grid-cols-3 gap-2 py-0.5 text-slate-300">
                <span className="text-slate-400">EBITDA</span>
                <span className="text-right tabular-nums">18.4%</span>
                <span className="text-right text-emerald-400 font-bold tabular-nums">34.2%</span>
              </div>
            </div>

            <div className="flex items-center justify-between text-[11px] font-mono text-slate-400 pt-1.5 border-t border-emerald-500/20">
              <span className="text-emerald-300 font-medium">Automated Formulas</span>
              <span className="text-zinc-400">Excel + Sheets</span>
            </div>
          </div>
        );

      case 'compliance-security':
        return (
          <div className="relative w-full h-full bg-gradient-to-b from-[#1c0d2b] via-[#12081d] to-[#06030a] p-3.5 flex flex-col justify-between overflow-hidden text-slate-200">
            <div className="flex items-center justify-between pb-2 border-b border-violet-500/20">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-3.5 h-3.5 text-violet-400" />
                <span className="text-[11px] font-mono text-violet-200 font-bold uppercase tracking-wider">
                  SECURITY AUDIT SUITE
                </span>
              </div>
              <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-violet-500/15 text-violet-300 border border-violet-500/30 font-medium">
                SOC 2 / ISO 27001
              </span>
            </div>

            <div className="my-auto p-2.5 bg-[#000000]/80 rounded-lg border border-violet-500/20 space-y-1.5 font-mono text-[11px]">
              <div className="flex justify-between items-center text-slate-200 font-semibold pb-1 border-b border-violet-500/15">
                <span className="text-violet-200">AUDIT CONTROLS</span>
                <span className="text-emerald-400 font-bold">142/142 PASS</span>
              </div>
              <div className="flex justify-between text-slate-400">
                <span>Encryption At Rest</span>
                <span className="text-violet-300 font-bold">AES-256</span>
              </div>
              <div className="flex justify-between text-slate-400">
                <span>Zero-Trust RBAC Policy</span>
                <span className="text-emerald-400 font-semibold">Enforced</span>
              </div>
            </div>

            <div className="flex items-center justify-between text-[11px] font-mono text-slate-400 pt-1.5 border-t border-violet-500/20">
              <span className="text-violet-300 font-medium">Audit Ready</span>
              <span className="text-zinc-400">GDPR + SOC 2 + ISO</span>
            </div>
          </div>
        );

      case 'backends':
        return (
          <div className="relative w-full h-full bg-gradient-to-b from-[#241505] via-[#190e03] to-[#0a0501] p-3.5 flex flex-col justify-between overflow-hidden text-slate-200 font-mono">
            <div className="flex items-center justify-between pb-2 border-b border-amber-500/20">
              <div className="flex items-center gap-2">
                <Code2 className="w-3.5 h-3.5 text-amber-400" />
                <span className="text-[11px] text-amber-200 font-bold uppercase tracking-wider">
                  EDGE MICROSERVICE
                </span>
              </div>
              <span className="text-[11px] text-amber-300 bg-amber-500/15 border border-amber-500/30 px-2 py-0.5 rounded font-medium">
                200 OK • 8ms
              </span>
            </div>

            <div className="my-auto py-1 space-y-1.5 text-[11px] leading-tight">
              <div className="flex items-center gap-2">
                <span className="text-amber-400 font-bold">POST</span>
                <span className="text-zinc-200">/v1/auth/verify</span>
              </div>
              <div className="text-zinc-400 pl-3">
                status: <span className="text-emerald-400">"verified"</span>, sub: <span className="text-amber-300">"usr_94a"</span>
              </div>
              <div className="flex items-center gap-2 pt-0.5">
                <span className="text-sky-400 font-bold">GET</span>
                <span className="text-zinc-200">/v1/telemetry/live</span>
              </div>
            </div>

            <div className="flex items-center justify-between text-[11px] text-slate-400 pt-1.5 border-t border-amber-500/20">
              <span className="text-amber-300 font-medium">Postgres RLS</span>
              <span className="text-zinc-400">Cloudflare Edge</span>
            </div>
          </div>
        );

      case 'react-apps':
        return (
          <div className="relative w-full h-full bg-gradient-to-b from-[#071d2b] via-[#05131d] to-[#02070b] p-3.5 flex flex-col justify-between overflow-hidden text-slate-200">
            <div className="flex items-center justify-between pb-2 border-b border-cyan-500/20">
              <div className="flex items-center gap-2">
                <Code2 className="w-3.5 h-3.5 text-cyan-400" />
                <span className="text-[11px] font-mono text-cyan-200 font-bold uppercase tracking-wider">
                  REACT 19 SYSTEM
                </span>
              </div>
              <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-cyan-500/15 text-cyan-300 border border-cyan-500/30 font-medium">
                PRODUCTION
              </span>
            </div>

            <div className="my-auto p-2.5 bg-[#000000]/80 rounded-lg border border-cyan-500/20 space-y-1.5 font-mono text-[11px]">
              <div className="flex justify-between items-center text-slate-200 pb-1 border-b border-cyan-500/15">
                <span className="font-serif italic text-cyan-100 text-[13px]">Component Architecture</span>
                <span className="text-cyan-400">Vite + TS</span>
              </div>
              <div className="flex justify-between text-slate-400">
                <span>State Engine</span>
                <span className="text-cyan-300 font-medium">Zustand Store</span>
              </div>
              <div className="flex justify-between text-slate-400">
                <span>Performance</span>
                <span className="text-emerald-400 font-medium">60 FPS Smooth</span>
              </div>
            </div>

            <div className="flex items-center justify-between text-[11px] font-mono text-slate-400 pt-1.5 border-t border-cyan-500/20">
              <span className="text-cyan-300 font-medium">Full Source Kit</span>
              <span className="text-zinc-400">Zero Slop Dependencies</span>
            </div>
          </div>
        );

      case 'websites-ui':
        return (
          <div className="relative w-full h-full bg-gradient-to-b from-[#260b1b] via-[#190712] to-[#090206] p-3.5 flex flex-col justify-between overflow-hidden text-slate-200">
            <div className="flex items-center justify-between pb-2 border-b border-rose-500/20">
              <div className="flex items-center gap-2">
                <Layout className="w-3.5 h-3.5 text-rose-400" />
                <span className="text-[11px] font-mono text-rose-200 font-bold uppercase tracking-wider">
                  DESIGN SYSTEM & UI
                </span>
              </div>
              <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-rose-500/15 text-rose-300 border border-rose-500/30 font-medium">
                FIGMA + CODE
              </span>
            </div>

            <div className="my-auto p-2.5 bg-[#000000]/80 rounded-lg border border-rose-500/20 space-y-2 font-mono text-[11px]">
              <div className="flex justify-between items-center text-slate-200">
                <span className="font-serif italic text-rose-100 text-[13px]">{product.title}</span>
                <span className="text-rose-300 text-[10px]">WCAG AAA</span>
              </div>
              {/* Palette Color Swatches */}
              <div className="flex items-center gap-1.5 py-1">
                <span className="w-4 h-4 rounded-full bg-rose-500 border border-white/20 shadow-xs" title="Rose #f43f5e" />
                <span className="w-4 h-4 rounded-full bg-violet-500 border border-white/20 shadow-xs" title="Violet #8b5cf6" />
                <span className="w-4 h-4 rounded-full bg-cyan-500 border border-white/20 shadow-xs" title="Cyan #06b6d4" />
                <span className="w-4 h-4 rounded-full bg-emerald-500 border border-white/20 shadow-xs" title="Emerald #10b981" />
                <span className="w-4 h-4 rounded-full bg-amber-400 border border-white/20 shadow-xs" title="Amber #facc15" />
                <span className="text-[10px] text-zinc-400 pl-1">380+ Tokens</span>
              </div>
            </div>

            <div className="flex items-center justify-between text-[11px] font-mono text-slate-400 pt-1.5 border-t border-rose-500/20">
              <span className="text-rose-300 font-medium">Tailwind + Figma Tokens</span>
              <span className="text-zinc-400">Responsive Grid</span>
            </div>
          </div>
        );

      case 'resumes':
        return (
          <div className="relative w-full h-full bg-gradient-to-b from-[#211a0a] via-[#161105] to-[#080602] p-3.5 flex flex-col justify-between overflow-hidden text-slate-200">
            <div className="flex items-center justify-between pb-2 border-b border-amber-400/20">
              <div className="flex items-center gap-2">
                <Briefcase className="w-3.5 h-3.5 text-amber-400" />
                <span className="text-[11px] font-mono text-amber-200 font-bold uppercase tracking-wider">
                  EXECUTIVE DOSSIER
                </span>
              </div>
              <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-amber-400/15 text-amber-300 border border-amber-400/30 font-medium">
                ATS OPTIMIZED
              </span>
            </div>

            <div className="my-auto py-2 px-3 bg-[#000000]/80 rounded-lg border border-amber-400/20 space-y-1">
              <div className="text-[13px] font-bold text-amber-100 font-serif">Staff Software Architect</div>
              <div className="text-[11px] text-amber-300/80 font-mono">Executive CV & Portfolio System</div>
              <div className="w-full h-px bg-amber-400/20 my-1" />
              <div className="space-y-0.5 text-[11px] text-slate-400">
                <div>• Scaled edge distributed APIs to 2M+ MAU</div>
                <div>• Reduced cloud compute overhead by 64%</div>
              </div>
            </div>

            <div className="flex items-center justify-between text-[11px] font-mono text-slate-400 pt-1.5 border-t border-amber-400/20">
              <span className="text-amber-300 font-medium">DOCX + PDF + Figma</span>
              <span className="text-zinc-400">XYZ Impact Bullets</span>
            </div>
          </div>
        );

      case 'documents-pdf':
      default:
        return (
          <div className="relative w-full h-full bg-gradient-to-b from-[#0c1629] via-[#080f1c] to-[#03060a] p-3.5 flex flex-col justify-between overflow-hidden text-slate-200">
            <div className="flex items-center justify-between pb-2 border-b border-blue-500/20">
              <div className="flex items-center gap-2">
                <FileText className="w-3.5 h-3.5 text-blue-400" />
                <span className="text-[11px] font-mono text-blue-200 font-bold uppercase tracking-wider">
                  ARCHIVAL WHITE PAPER
                </span>
              </div>
              <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-blue-500/15 text-blue-300 border border-blue-500/30 font-medium">
                OFFICIAL SPEC
              </span>
            </div>

            <div className="my-auto p-2.5 bg-[#000000]/80 rounded-lg border border-blue-500/20 space-y-1.5 font-mono text-[11px]">
              <div className="flex justify-between items-center text-slate-200 pb-1 border-b border-blue-500/15">
                <span className="font-serif italic text-blue-100 text-[13px]">{product.title}</span>
              </div>
              <div className="text-slate-400 line-clamp-2 leading-relaxed">
                {product.subtitle}
              </div>
            </div>

            <div className="flex items-center justify-between text-[11px] font-mono text-slate-400 pt-1.5 border-t border-blue-500/20">
              <span className="text-blue-300 font-medium">{product.fileFormat} Archive</span>
              <span className="text-zinc-400">Direct Download</span>
            </div>
          </div>
        );
    }
  };

    return (
    <div 
      className="group app-card relative p-3 sm:p-3.5 flex flex-col h-full min-w-0 max-w-full overflow-hidden bg-[#090909] hover:bg-[#0e0e0e] border border-white/[0.08] hover:border-white/[0.20] rounded-2xl transition-all duration-200"
    >
      {/* 1. Header Bar: Creator Identity & Wishlist Button */}
      <div className="flex items-center justify-between gap-2 mb-2.5 px-0.5">
        <div className="flex items-center gap-2 min-w-0">
          <div className="relative">
            <img 
              src={product.creator.avatar} 
              alt={product.creator.name}
              className="w-5 h-5 rounded-full object-cover border border-white/20 shrink-0" 
            />
            <div className="absolute -bottom-0.5 -right-0.5 w-2 h-2 rounded-full bg-emerald-400 border border-black" />
          </div>
          <span className="truncate text-xs font-semibold text-zinc-300">
            {product.creator.name}
          </span>
          {product.creator.verified && (
            <span title="Verified Creator">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
            </span>
          )}
        </div>

        <div className="flex items-center gap-1.5 shrink-0">
          {product.badge && (
            <span className={`px-2 py-0.5 text-[10px] font-mono font-bold tracking-wider uppercase badge-3d ${
              product.badge.toLowerCase().includes('enterprise') || product.badge.toLowerCase().includes('popular')
                ? 'badge-3d-amber'
                : product.badge.toLowerCase().includes('soc') || product.badge.toLowerCase().includes('security')
                ? 'badge-3d-violet'
                : product.badge.toLowerCase().includes('free')
                ? 'badge-3d-emerald'
                : 'badge-3d-neutral'
            }`}>
              {product.badge}
            </span>
          )}

          {/* Wishlist Toggle Button */}
          <button
            type="button"
            onClick={() => onToggleWishlist(product)}
            className={`p-1.5 rounded-lg transition-all cursor-pointer ${
              isWishlisted 
                ? 'bg-rose-500/15 text-rose-400 border border-rose-500/30 font-bold scale-105 shadow-sm' 
                : 'bg-white/[0.04] text-zinc-400 hover:text-rose-400 border border-white/10 hover:border-rose-500/20'
            } active:scale-90 duration-150`}
            aria-label="Save to Wishlist"
            title={isWishlisted ? 'Remove from Wishlist' : 'Save to Wishlist'}
          >
            <Heart className={`w-3.5 h-3.5 ${isWishlisted ? 'fill-rose-500 text-rose-500' : ''}`} />
          </button>
        </div>
      </div>

      {/* 2. Visual Specimen Preview Viewport */}
      <div className="relative w-full aspect-16/10 rounded-xl overflow-hidden group/preview bg-[#030303] border border-white/[0.08]">
        {/* Preview Container */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#0e0e0e] to-[#040404]" />
        
        {/* Specimen Sheet */}
        <div className="absolute inset-x-2 top-2 bottom-3 tucked-specimen-sheet z-10 rounded-lg overflow-hidden border border-white/[0.10] shadow-xl">
          {renderCategoryPreview()}
        </div>

        {/* Floating Quick Action Overlay Lip */}
        <div className="absolute inset-x-0 bottom-0 h-14 tucked-pocket-sleeve z-20 flex items-center justify-between px-2.5 pointer-events-none">
          <div className="flex items-center gap-1.5 pointer-events-auto">
            <span className={`text-[10px] font-mono uppercase tracking-wider px-2 py-0.5 rounded-md badge-3d font-bold ${
              product.category === 'legal-contracts' ? 'badge-3d-indigo' :
              product.category === 'financial-models' || product.category === 'spreadsheets' ? 'badge-3d-emerald' :
              product.category === 'compliance-security' ? 'badge-3d-violet' :
              product.category === 'sales-proposals' ? 'badge-3d-sky' :
              product.category === 'ops-sops' ? 'badge-3d-teal' :
              product.category === 'websites-ui' ? 'badge-3d-rose' :
              product.category === 'backends' ? 'badge-3d-amber' :
              'badge-3d-neutral'
            }`}>
              {product.fileFormat}
            </span>
            <span className="text-[10px] font-mono text-slate-400">
              {product.fileSize}
            </span>
          </div>

          <div className="flex items-center gap-1.5 opacity-90 group-hover/preview:opacity-100 transition-opacity pointer-events-auto">
            <span className="text-[10px] font-mono uppercase tracking-wider text-emerald-400 font-semibold px-1.5 py-0.5 bg-emerald-500/10 border border-emerald-500/20 rounded">
              VERIFIED
            </span>
          </div>
        </div>
      </div>

      {/* 3. Card Body: Title, Subtitle & Cryptographic Telemetry */}
      <div className="p-1 pt-3 flex-1 flex flex-col justify-between space-y-2.5">
        <div>
          {/* Rating & Version */}
          <div className="flex items-center justify-between text-xs text-zinc-400 mb-1 font-mono">
            <div className="flex items-center gap-1 font-medium">
              <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
              <span className="text-amber-300 font-bold">{product.rating}</span>
              <span className="text-zinc-500 font-normal">({product.reviewCount})</span>
            </div>
            <span className="text-xs font-mono text-zinc-500">
              v{product.version}
            </span>
          </div>

          {/* Title & Subtitle */}
          <h3 
            onClick={() => onQuickLook(product)}
            className="text-sm sm:text-[15px] font-bold text-white group-hover:text-slate-100 transition-colors cursor-pointer line-clamp-1 tracking-tight"
          >
            {product.title}
          </h3>
          <p className="text-xs text-zinc-400 line-clamp-2 mt-1 leading-relaxed">
            {product.subtitle}
          </p>

          {/* Precision Telemetry Bezel */}
          <div className="mt-2.5 px-2.5 py-1.5 rounded-lg bg-[#050505] border border-white/[0.08] flex items-center justify-between gap-1.5 font-mono text-[10px]">
            <div className="flex items-center gap-1.5 min-w-0">
              <div className="flex items-center gap-1 text-zinc-400 shrink-0">
                <Fingerprint className="w-3 h-3 text-cyan-400" />
                <span className="uppercase tracking-wider font-semibold text-zinc-300">
                  VLT-{product.id.replace(/[^a-zA-Z0-9]/g, '').slice(0, 5).toUpperCase()}
                </span>
              </div>
              <span className="text-zinc-700 select-none">|</span>
              <button
                type="button"
                onClick={handleCopyHash}
                className="flex items-center gap-1 text-zinc-400 hover:text-white transition-colors truncate cursor-pointer group/hash"
                title={`Click to copy verified SHA-256: ${bundleManifest.sha256}`}
              >
                <span className="text-zinc-500 font-semibold group-hover/hash:text-zinc-300 transition-colors">SHA:</span>
                <span className="truncate tracking-tight font-mono text-zinc-400 group-hover/hash:text-zinc-200">
                  {bundleManifest.sha256.substring(0, 6)}...{bundleManifest.sha256.substring(60)}
                </span>
                {copiedHash ? (
                  <Check className="w-2.5 h-2.5 text-emerald-400 shrink-0 ml-0.5" />
                ) : (
                  <Copy className="w-2.5 h-2.5 text-zinc-600 group-hover/hash:text-zinc-300 shrink-0 ml-0.5 opacity-60 group-hover/hash:opacity-100 transition-opacity" />
                )}
              </button>
            </div>

            <div className="flex items-center gap-1 shrink-0">
              <span className="relative flex h-1.5 w-1.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-60"></span>
                <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-emerald-400 shadow-[0_0_6px_rgba(52,211,153,0.8)]"></span>
              </span>
              <span className="text-[9px] uppercase tracking-wider font-semibold text-emerald-400 font-mono">
                256B
              </span>
            </div>
          </div>
        </div>

        {/* 4. Action Row: Valuation & Main Button */}
        <div className="pt-2.5 border-t border-white/[0.08] flex items-center justify-between gap-2 mt-auto">
          <div>
            <div className="flex items-baseline gap-1.5">
              <span className="text-base font-bold text-white font-mono tracking-tight">
                {isFree ? (
                  <span className="text-emerald-400 font-black">FREE</span>
                ) : (
                  formatPrice(product.price)
                )}
              </span>
              {product.originalPrice && product.originalPrice > product.price && (
                <span className="text-xs text-zinc-500 line-through font-mono">
                  {formatPrice(product.originalPrice)}
                </span>
              )}
            </div>
            <span className="text-[11px] text-zinc-500 block font-mono">
              {product.downloadsCount.toLocaleString()} downloads
            </span>
          </div>

          <div className="flex items-center gap-1.5">
            {product.category === 'legal-contracts' && onOpenLegalDocument ? (
              <button
                type="button"
                onClick={() => onOpenLegalDocument(product)}
                className="btn-secondary h-9 px-3 rounded-xl text-xs font-semibold text-zinc-200 inline-flex items-center gap-1.5 cursor-pointer active:scale-95 transition-all hover:text-indigo-300 hover:border-indigo-500/30"
                title="Read full agreement clauses"
              >
                <FileText className="w-3.5 h-3.5 text-indigo-400" />
                <span>Clauses</span>
              </button>
            ) : (
              <button
                type="button"
                onClick={() => {
                  if (onInspectBundle) {
                    onInspectBundle(product);
                  } else {
                    onQuickLook(product);
                  }
                }}
                className="btn-secondary h-9 px-3 rounded-xl text-zinc-200 text-xs font-semibold inline-flex items-center gap-1.5 cursor-pointer active:scale-95 transition-all hover:text-sky-300 hover:border-sky-500/30"
                title="Inspect package files"
              >
                <FileText className="w-3.5 h-3.5 text-sky-400" />
                <span>Files</span>
              </button>
            )}

            <button
              type="button"
              onClick={() => onQuickLook(product)}
              className="btn-secondary h-9 px-3 rounded-xl text-zinc-200 text-xs font-semibold inline-flex items-center gap-1.5 cursor-pointer active:scale-95 transition-all"
              title="Quick spec"
            >
              <Eye className="w-3.5 h-3.5 text-slate-300" />
              <span>Spec</span>
            </button>

            {/* Primary CTA */}
            {isPurchased ? (
              <button
                type="button"
                onClick={() => onInstantDownload(product)}
                className="btn-primary h-9 px-4 rounded-xl text-xs font-bold text-black inline-flex items-center gap-1.5 cursor-pointer active:scale-95 transition-all hover:bg-emerald-400"
              >
                <Download className="w-3.5 h-3.5 text-black" />
                <span>Download</span>
              </button>
            ) : isFree ? (
              <button
                type="button"
                onClick={() => onInstantDownload(product)}
                className="btn-primary h-9 px-4 rounded-xl text-xs font-bold text-black inline-flex items-center gap-1.5 cursor-pointer active:scale-95 transition-all hover:bg-emerald-400"
              >
                <Download className="w-3.5 h-3.5 text-black" />
                <span>Free Download</span>
              </button>
            ) : isInCart ? (
              <button
                type="button"
                disabled
                className="h-9 px-4 rounded-xl bg-emerald-500/15 text-emerald-300 border border-emerald-500/30 text-xs font-semibold inline-flex items-center gap-1.5 cursor-default"
              >
                <Check className="w-3.5 h-3.5 text-emerald-400" />
                <span>In Bag</span>
              </button>
            ) : (
              <button
                type="button"
                onClick={() => onAddToCart(product)}
                className="btn-primary h-9 px-4 rounded-xl text-xs font-bold text-black inline-flex items-center gap-1.5 cursor-pointer active:scale-95 transition-all"
              >
                <ShoppingBag className="w-3.5 h-3.5 text-black" />
                <span>Add to Bag</span>
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
