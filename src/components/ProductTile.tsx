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
  FolderGit2
} from 'lucide-react';

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

  // Category-Specific Luxury Document/Artifact Specimen Inside Tucked Pocket
  const renderCategoryPreview = () => {
    switch (product.category) {
      case 'legal-contracts':
        return (
          <div className="relative w-full h-full bg-gradient-to-b from-[#101217] via-[#0b0d10] to-[#040507] p-3.5 flex flex-col justify-between overflow-hidden text-slate-200">
            <div className="flex items-center justify-between pb-2 border-b border-white/[0.08]">
              <div className="flex items-center gap-2">
                <Scale className="w-3.5 h-3.5 text-slate-300" />
                <span className="text-[11px] font-mono text-slate-200 font-bold uppercase tracking-wider">
                  LEGAL INSTRUMENT
                </span>
              </div>
              <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-white/[0.06] text-slate-300 border border-white/10 font-medium">
                ENFORCEABLE
              </span>
            </div>

            <div className="my-auto py-2 px-3 bg-[var(--bg-base)]/90 rounded-lg border border-white/[0.07] space-y-2 font-mono">
              <div className="flex justify-between items-center text-slate-200 text-xs font-semibold">
                <span className="font-serif italic text-white text-[13px]">§ 4.2 Indemnification & IP</span>
                <span className="text-[11px] text-slate-400">REV. 2026</span>
              </div>
              <div className="text-[11px] text-slate-400 leading-snug line-clamp-2">
                Party A warrants clear title, proprietary ownership & perpetual client execution rights.
              </div>
              <div className="pt-1 flex items-center justify-between text-[11px] text-slate-400 border-t border-white/[0.05]">
                <span className="text-slate-300 font-medium">Mutual Non-Solicit</span>
                <span>DE / NY / UK</span>
              </div>
            </div>

            <div className="flex items-center justify-between text-[11px] font-mono text-slate-400 pt-1.5 border-t border-white/[0.08]">
              <span className="text-slate-200 font-medium">Counsel Reviewed</span>
              <span className="text-slate-400">Word + PDF + MD</span>
            </div>
          </div>
        );

      case 'sales-proposals':
        return (
          <div className="relative w-full h-full bg-gradient-to-b from-[#101217] via-[#0b0d10] to-[#040507] p-3.5 flex flex-col justify-between overflow-hidden text-slate-200">
            <div className="flex items-center justify-between pb-2 border-b border-white/[0.08]">
              <div className="flex items-center gap-2">
                <Presentation className="w-3.5 h-3.5 text-slate-300" />
                <span className="text-[11px] font-mono text-slate-200 font-bold uppercase tracking-wider">
                  COMMERCIAL PROPOSAL
                </span>
              </div>
              <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-white/[0.06] text-slate-300 border border-white/10 font-medium">
                ENTERPRISE RFP
              </span>
            </div>

            <div className="my-auto p-2.5 bg-[var(--bg-base)]/90 rounded-lg border border-white/[0.07] space-y-2">
              <div className="flex items-center justify-between text-xs font-mono">
                <span className="font-serif italic text-white text-[13px]">Scope & Commercial SOW</span>
                <span className="text-slate-300 font-bold">Fixed Deliverables</span>
              </div>
              <div className="grid grid-cols-3 gap-1.5 text-center font-mono text-[11px]">
                <div className="py-1 bg-white/[0.04] rounded border border-white/[0.08] text-slate-300">Phase 1: Specs</div>
                <div className="py-1 bg-white/[0.04] rounded border border-white/[0.08] text-slate-300">Phase 2: Build</div>
                <div className="py-1 bg-white/[0.04] rounded border border-white/[0.08] text-slate-300">Phase 3: Deploy</div>
              </div>
            </div>

            <div className="flex items-center justify-between text-[11px] font-mono text-slate-400 pt-1.5 border-t border-white/[0.08]">
              <span className="text-slate-200 font-medium">Pitch Deck + SOW</span>
              <span className="text-slate-400">Keynote & Figma</span>
            </div>
          </div>
        );

      case 'ops-sops':
        return (
          <div className="relative w-full h-full bg-gradient-to-b from-[#101217] via-[#0b0d10] to-[#040507] p-3.5 flex flex-col justify-between overflow-hidden text-slate-200">
            <div className="flex items-center justify-between pb-2 border-b border-white/[0.08]">
              <div className="flex items-center gap-2">
                <FolderGit2 className="w-3.5 h-3.5 text-slate-300" />
                <span className="text-[11px] font-mono text-slate-200 font-bold uppercase tracking-wider">
                  STANDARD OPS (SOP)
                </span>
              </div>
              <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-white/[0.06] text-slate-300 border border-white/10 font-medium">
                RUNBOOK
              </span>
            </div>

            <div className="my-auto p-2.5 bg-[var(--bg-base)]/90 rounded-lg border border-white/[0.07] space-y-1.5 font-mono text-[11px]">
              <div className="flex items-center gap-2 text-slate-200">
                <Check className="w-3.5 h-3.5 text-slate-300" />
                <span>01. Client Onboarding Protocol</span>
              </div>
              <div className="flex items-center gap-2 text-slate-300">
                <Check className="w-3.5 h-3.5 text-slate-300" />
                <span>02. Incident Escalation Matrix</span>
              </div>
              <div className="flex items-center gap-2 text-slate-400">
                <Check className="w-3.5 h-3.5 text-slate-500" />
                <span>03. Retainer Governance Runbook</span>
              </div>
            </div>

            <div className="flex items-center justify-between text-[11px] font-mono text-slate-400 pt-1.5 border-t border-white/[0.08]">
              <span className="text-slate-200 font-medium">Process Blueprints</span>
              <span className="text-slate-400">Notion & Markdown</span>
            </div>
          </div>
        );

      case 'financial-models':
      case 'spreadsheets':
        return (
          <div className="relative w-full h-full bg-gradient-to-b from-[#101217] via-[#0b0d10] to-[#040507] p-3.5 flex flex-col justify-between overflow-hidden text-slate-200">
            <div className="flex items-center justify-between pb-2 border-b border-white/[0.08]">
              <div className="flex items-center gap-2">
                <FileSpreadsheet className="w-3.5 h-3.5 text-slate-300" />
                <span className="text-[11px] font-mono text-slate-200 font-bold uppercase tracking-wider">
                  CAP TABLE & PRO FORMA
                </span>
              </div>
              <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-white/[0.06] text-slate-300 border border-white/10 font-medium">
                DYNAMIC XLSX
              </span>
            </div>

            <div className="my-auto bg-[var(--bg-base)]/90 rounded-lg border border-white/[0.07] p-2.5 font-mono text-[11px]">
              <div className="grid grid-cols-3 gap-2 pb-1.5 border-b border-white/[0.08] text-slate-400 font-bold">
                <span>METRIC</span>
                <span className="text-right">YR 1</span>
                <span className="text-right">YR 3</span>
              </div>
              <div className="grid grid-cols-3 gap-2 py-1 text-slate-300">
                <span className="text-slate-400">ARR</span>
                <span className="text-right tabular-nums">40K</span>
                <span className="text-right text-slate-100 font-bold tabular-nums">.84M</span>
              </div>
              <div className="grid grid-cols-3 gap-2 py-0.5 text-slate-300">
                <span className="text-slate-400">EBITDA</span>
                <span className="text-right tabular-nums">18.4%</span>
                <span className="text-right text-slate-100 font-bold tabular-nums">34.2%</span>
              </div>
            </div>

            <div className="flex items-center justify-between text-[11px] font-mono text-slate-400 pt-1.5 border-t border-white/[0.08]">
              <span className="text-slate-200 font-medium">Automated Formulas</span>
              <span className="text-slate-400">Excel + Sheets</span>
            </div>
          </div>
        );

      case 'compliance-security':
        return (
          <div className="relative w-full h-full bg-gradient-to-b from-[#101217] via-[#0b0d10] to-[#040507] p-3.5 flex flex-col justify-between overflow-hidden text-slate-200">
            <div className="flex items-center justify-between pb-2 border-b border-white/[0.08]">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-3.5 h-3.5 text-slate-300" />
                <span className="text-[11px] font-mono text-slate-200 font-bold uppercase tracking-wider">
                  SECURITY AUDIT SUITE
                </span>
              </div>
              <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-white/[0.06] text-slate-300 border border-white/10 font-medium">
                SOC 2 / ISO 27001
              </span>
            </div>

            <div className="my-auto p-2.5 bg-[var(--bg-base)]/90 rounded-lg border border-white/[0.07] space-y-1.5 font-mono text-[11px]">
              <div className="flex justify-between items-center text-slate-200 font-semibold pb-1 border-b border-white/[0.05]">
                <span>AUDIT CONTROLS</span>
                <span className="text-slate-100 font-bold">142/142 VERIFIED</span>
              </div>
              <div className="flex justify-between text-slate-400">
                <span>Encryption At Rest</span>
                <span className="text-slate-300">AES-256</span>
              </div>
              <div className="flex justify-between text-slate-400">
                <span>Zero-Trust RBAC Policy</span>
                <span className="text-slate-300">Enforced</span>
              </div>
            </div>

            <div className="flex items-center justify-between text-[11px] font-mono text-slate-400 pt-1.5 border-t border-white/[0.08]">
              <span className="text-slate-200 font-medium">Audit Ready</span>
              <span className="text-slate-400">GDPR + SOC 2 + ISO</span>
            </div>
          </div>
        );

      case 'backends':
        return (
          <div className="relative w-full h-full bg-gradient-to-b from-[#101217] via-[#0b0d10] to-[#040507] p-3.5 flex flex-col justify-between overflow-hidden text-slate-200 font-mono">
            <div className="flex items-center justify-between pb-2 border-b border-white/[0.08]">
              <div className="flex items-center gap-2">
                <Code2 className="w-3.5 h-3.5 text-slate-300" />
                <span className="text-[11px] text-slate-200 font-bold uppercase tracking-wider">
                  EDGE MICROSERVICE
                </span>
              </div>
              <span className="text-[11px] text-slate-300 bg-white/[0.06] border border-white/10 px-2 py-0.5 rounded font-medium">
                200 OK • 8ms
              </span>
            </div>

            <div className="my-auto py-1 space-y-1.5 text-[11px] leading-tight">
              <div className="text-slate-200 font-semibold">POST /v1/auth/verify</div>
              <div className="text-slate-400 pl-2">status: "verified", sub: "usr_94a"</div>
              <div className="text-slate-300 font-semibold pt-0.5">GET /v1/telemetry/live</div>
            </div>

            <div className="flex items-center justify-between text-[11px] text-slate-400 pt-1.5 border-t border-white/[0.08]">
              <span className="text-slate-200 font-medium">Postgres RLS</span>
              <span className="text-slate-400">Cloudflare Edge</span>
            </div>
          </div>
        );

      case 'react-apps':
        return (
          <div className="relative w-full h-full bg-gradient-to-b from-[#101217] via-[#0b0d10] to-[#040507] p-3.5 flex flex-col justify-between overflow-hidden text-slate-200">
            <div className="flex items-center justify-between pb-2 border-b border-white/[0.08]">
              <div className="flex items-center gap-2">
                <Code2 className="w-3.5 h-3.5 text-slate-300" />
                <span className="text-[11px] font-mono text-slate-200 font-bold uppercase tracking-wider">
                  REACT 19 SYSTEM
                </span>
              </div>
              <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-white/[0.06] text-slate-300 border border-white/10 font-medium">
                PRODUCTION
              </span>
            </div>

            <div className="my-auto p-2.5 bg-[var(--bg-base)]/90 rounded-lg border border-white/[0.07] space-y-1.5 font-mono text-[11px]">
              <div className="flex justify-between items-center text-slate-200 pb-1 border-b border-white/[0.05]">
                <span className="font-serif italic text-white text-[13px]">Component Architecture</span>
                <span className="text-slate-400">Vite + TS</span>
              </div>
              <div className="flex justify-between text-slate-400">
                <span>State Engine</span>
                <span className="text-slate-300">Zustand Store</span>
              </div>
              <div className="flex justify-between text-slate-400">
                <span>Design Ramp</span>
                <span className="text-slate-300">Obsidian & Platinum</span>
              </div>
            </div>

            <div className="flex items-center justify-between text-[11px] font-mono text-slate-400 pt-1.5 border-t border-white/[0.08]">
              <span className="text-slate-200 font-medium">Full Source Kit</span>
              <span className="text-slate-400">Zero Slop Dependencies</span>
            </div>
          </div>
        );

      case 'resumes':
        return (
          <div className="relative w-full h-full bg-gradient-to-b from-[#101217] via-[#0b0d10] to-[#040507] p-3.5 flex flex-col justify-between overflow-hidden text-slate-200">
            <div className="flex items-center justify-between pb-2 border-b border-white/[0.08]">
              <div className="flex items-center gap-2">
                <Briefcase className="w-3.5 h-3.5 text-slate-300" />
                <span className="text-[11px] font-mono text-slate-200 font-bold uppercase tracking-wider">
                  EXECUTIVE DOSSIER
                </span>
              </div>
              <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-white/[0.06] text-slate-300 border border-white/10 font-medium">
                ATS OPTIMIZED
              </span>
            </div>

            <div className="my-auto py-2 px-3 bg-[var(--bg-base)]/90 rounded-lg border border-white/[0.07] space-y-1">
              <div className="text-[13px] font-bold text-white font-serif">Staff Software Architect</div>
              <div className="text-[11px] text-slate-400 font-mono">Executive CV & Portfolio System</div>
              <div className="w-full h-px bg-white/[0.06] my-1" />
              <div className="space-y-0.5 text-[11px] text-slate-400">
                <div>• Scaled edge distributed APIs to 2M+ MAU</div>
                <div>• Reduced cloud compute overhead by 64%</div>
              </div>
            </div>

            <div className="flex items-center justify-between text-[11px] font-mono text-slate-400 pt-1.5 border-t border-white/[0.08]">
              <span className="text-slate-200 font-medium">DOCX + PDF + Figma</span>
              <span className="text-slate-400">XYZ Impact Bullets</span>
            </div>
          </div>
        );

      case 'documents-pdf':
      case 'websites-ui':
      default:
        return (
          <div className="relative w-full h-full bg-gradient-to-b from-[#101217] via-[#0b0d10] to-[#040507] p-3.5 flex flex-col justify-between overflow-hidden text-slate-200">
            <div className="flex items-center justify-between pb-2 border-b border-white/[0.08]">
              <div className="flex items-center gap-2">
                <Layout className="w-3.5 h-3.5 text-slate-300" />
                <span className="text-[11px] font-mono text-slate-200 font-bold uppercase tracking-wider">
                  ARCHIVAL SPECIMEN
                </span>
              </div>
              <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-white/[0.06] text-slate-300 border border-white/10 font-medium">
                PRODUCTION
              </span>
            </div>

            <div className="my-auto p-2.5 bg-[var(--bg-base)]/90 rounded-lg border border-white/[0.07] space-y-1.5 font-mono text-[11px]">
              <div className="flex justify-between items-center text-slate-200 pb-1 border-b border-white/[0.05]">
                <span className="font-serif italic text-white text-[13px]">{product.title}</span>
              </div>
              <div className="text-slate-400 line-clamp-2 leading-relaxed">
                {product.subtitle}
              </div>
            </div>

            <div className="flex items-center justify-between text-[11px] font-mono text-slate-400 pt-1.5 border-t border-white/[0.08]">
              <span className="text-slate-200 font-medium">{product.fileFormat} Archive</span>
              <span className="text-slate-400">Direct Download</span>
            </div>
          </div>
        );
    }
  };

    return (
    <div 
      className="group luxury-folder-envelope relative p-[10px] flex flex-col h-full min-w-0 max-w-full overflow-hidden"
    >
      {/* Folder Header Tab with Metallic Gold/Silver Rivet */}
      <div className="px-2.5 py-2 flex items-center justify-between gap-2 border-b border-white/[0.08] mb-2 bg-[#14171e]/60 rounded-t-xl">
        <div className="flex items-center gap-2 min-w-0">
          <div className="relative">
            <img 
              src={product.creator.avatar} 
              alt={product.creator.name}
              className="w-5 h-5 rounded-full object-cover border border-white/20 shrink-0" 
            />
            <div className="absolute -bottom-0.5 -right-0.5 w-2 h-2 rounded-full bg-amber-400 border border-black" />
          </div>
          <span className="truncate text-xs font-semibold text-zinc-200">
            {product.creator.name}
          </span>
          {product.creator.verified && (
            <CheckCircle2 className="w-3.5 h-3.5 text-amber-400 shrink-0" />
          )}
        </div>

        <div className="flex items-center gap-1.5 shrink-0">
          {product.badge && (
            <span className={`px-2.5 py-0.5 text-[11px] font-mono font-bold tracking-wider uppercase ${
              product.badge === 'HOT' ? 'badge-3d badge-3d-rose' :
              product.badge === 'BESTSELLER' ? 'badge-3d badge-3d-gold-solid' :
              product.badge === 'FREE' ? 'badge-3d badge-3d-emerald' :
              'badge-3d badge-3d-indigo'
            }`}>
              {product.badge}
            </span>
          )}

          {/* Tactile Wishlist Toggle Pill */}
          <button
            type="button"
            onClick={() => onToggleWishlist(product)}
            className={`p-1.5 rounded-lg transition-all cursor-pointer ${
              isWishlisted 
                ? 'badge-3d badge-3d-rose text-rose-300 scale-105' 
                : 'btn-tactile-dark text-zinc-400 hover:text-white'
            } active:scale-75 transition-transform duration-200 ease-[cubic-bezier(0.34,1.56,0.64,1)]`}
            aria-label="Save to Wishlist"
            title={isWishlisted ? 'Remove from Wishlist' : 'Save to Wishlist'}
          >
            <Heart className={`w-3.5 h-3.5 ${isWishlisted ? 'fill-rose-500 text-rose-500' : ''}`} />
          </button>
        </div>
      </div>

      {/* Tucked Pocket Container with Slide-Out File Thumbnail Sheet */}
      <div className="relative w-full aspect-16/10 rounded-[14px] overflow-hidden group/preview bg-[#020304] border border-white/[0.07] shadow-inner">
        
        {/* Back Chamber of the Folder (Interior lining pattern) */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#08090c] to-[#020203] opacity-98" />
        <div className="absolute inset-0 bg-[radial-gradient(#ffffff08_1px,transparent_1px)] [background-size:12px_12px] opacity-50 pointer-events-none" />

        {/* 1. Tucked Document/Asset Sheet (Peeks out from the pocket, slides up on hover) */}
        <div className="absolute inset-x-2.5 top-2 bottom-4 tucked-specimen-sheet z-10 rounded-xl overflow-hidden border border-white/[0.12] shadow-[0_8px_20px_rgba(0,0,0,0.9)]">
          {renderCategoryPreview()}
        </div>

        {/* 2. Physical Front Pocket Overlay Sleeve (Tucked Pocket with Angled Lip) */}
        <div className="absolute inset-x-0 bottom-0 h-16 tucked-pocket-sleeve z-20 flex items-center justify-between px-3 pointer-events-none">
          {/* Subtle silver-white stitch line along the top of the pocket */}
          <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-slate-300/25 to-transparent" />
          
          <div className="flex items-center gap-1.5 pointer-events-auto">
            <span className="text-[11px] font-mono uppercase tracking-wider px-2.5 py-0.5 rounded-md badge-3d badge-3d-neutral text-slate-200 font-bold">
              {product.fileFormat}
            </span>
            <span className="text-[11px] font-mono text-slate-400">
              {product.fileSize}
            </span>
          </div>

          {/* Quick Peek & Archive Inspection Action Buttons */}
          <div className="flex items-center gap-1.5 opacity-90 group-hover/preview:opacity-100 transition-opacity pointer-events-auto">
            {product.category === 'legal-contracts' && onOpenLegalDocument ? (
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  onOpenLegalDocument(product);
                }}
                className="btn-tactile-amber flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-mono font-bold cursor-pointer shadow-sm active:scale-95 transition-all"
                title="Read full complete legal agreement with clauses"
              >
                <FileText className="w-3.5 h-3.5 text-amber-200" />
                <span>Clauses</span>
              </button>
            ) : (
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  if (onInspectBundle) {
                    onInspectBundle(product);
                  } else {
                    onQuickLook(product);
                  }
                }}
                className="btn-tactile-dark flex items-center gap-1.5 px-3 py-1 rounded-lg text-amber-300 text-xs font-mono font-bold cursor-pointer active:scale-95 transition-all"
                title="Inspect package contents & file tree"
              >
                <FileText className="w-3.5 h-3.5 text-amber-400" />
                <span>Files</span>
              </button>
            )}
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                onQuickLook(product);
              }}
              className="btn-tactile-white flex items-center gap-1.5 px-3 py-1 rounded-lg text-zinc-950 text-xs font-semibold cursor-pointer shadow-sm active:scale-95 transition-all"
              title="Quick preview spec"
            >
              <Eye className="w-3.5 h-3.5 text-zinc-950" />
              <span>Spec</span>
            </button>
          </div>
        </div>

      </div>

      {/* 3. Folder Footer Dossier Details */}
      <div className="p-2.5 pt-3 flex-1 flex flex-col justify-between space-y-3">
        <div>
          {/* Catalog Rating */}
          <div className="flex items-center justify-between text-xs text-zinc-400 mb-1.5 font-mono">
            <div className="flex items-center gap-1 font-medium text-amber-400">
              <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
              <span>{product.rating}</span>
              <span className="text-zinc-500">({product.reviewCount})</span>
            </div>
            <span className="text-xs font-mono text-zinc-500">
              v{product.version}
            </span>
          </div>

          {/* Title & Subtitle */}
          <h3 
            onClick={() => onQuickLook(product)}
            className="text-sm font-semibold text-[#f4f5f6] group-hover:text-amber-300 transition-colors cursor-pointer line-clamp-1 [text-wrap:balance]"
          >
            {product.title}
          </h3>
          <p className="text-xs text-zinc-400 line-clamp-2 mt-1 leading-relaxed [text-wrap:pretty]">
            {product.subtitle}
          </p>
        </div>

{/* Valuation & Tactile Action Buttons */}
        <div className="pt-2.5 border-t border-white/[0.08] flex items-center justify-between gap-2 mt-auto">
          <div>
            <div className="flex items-baseline gap-1.5">
              <span className="text-base font-extrabold text-white font-mono tracking-tight">
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
            <span className="text-xs text-zinc-500 block font-mono">
              {product.downloadsCount.toLocaleString()} downloads
            </span>
          </div>

          {/* Tactile Action Button */}
          {isPurchased ? (
            <button
              type="button"
              onClick={() => onInstantDownload(product)}
              className="btn-plinth-emerald flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-semibold cursor-pointer"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Download</span>
            </button>
          ) : isFree ? (
            <button
              type="button"
              onClick={() => onInstantDownload(product)}
              className="btn-plinth-emerald flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-semibold cursor-pointer"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Free Download</span>
            </button>
          ) : isInCart ? (
            <button
              type="button"
              disabled
              className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-zinc-800 text-zinc-400 border border-white/10 text-xs font-medium cursor-default"
            >
              <Check className="w-3.5 h-3.5 text-zinc-400" />
              <span>In Bag</span>
            </button>
          ) : (
            <button
              type="button"
              onClick={() => onAddToCart(product)}
              className="btn-primary flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-semibold cursor-pointer hover:shadow-[0_0_15px_rgba(255,255,255,0.25)]"
            >
              <ShoppingBag className="w-3.5 h-3.5 text-zinc-950" />
              <span>Add to Bag</span>
            </button>
          )}

        </div>

      </div>

    </div>
  );
};
