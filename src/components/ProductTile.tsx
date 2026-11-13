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
          <div className="relative w-full h-full bg-gradient-to-b from-[#181a20] to-[#0d0e12] p-3 flex flex-col justify-between overflow-hidden text-zinc-200">
            {/* Header watermarked seal */}
            <div className="flex items-center justify-between pb-1.5 border-b border-white/[0.08]">
              <div className="flex items-center gap-1.5">
                <Scale className="w-3.5 h-3.5 text-amber-400" />
                <span className="text-[10px] font-mono text-zinc-300 font-bold uppercase tracking-wider">LEGAL INSTRUMENT</span>
              </div>
              <span className="text-[9px] font-mono px-1.5 py-0.5 rounded bg-amber-500/10 text-amber-300 border border-amber-500/30 font-bold">
                ENFORCEABLE
              </span>
            </div>

            {/* Document Lines & Redlined clauses */}
            <div className="my-auto py-1 px-2.5 bg-[#0e1014]/90 rounded-lg border border-white/[0.06] space-y-1.5 font-mono text-[9px]">
              <div className="flex justify-between items-center text-amber-300/90 font-bold">
                <span>§ 4.2 INDEMNIFICATION & IP</span>
                <span className="text-[8px] text-zinc-500">REV. 2026</span>
              </div>
              <div className="space-y-1 text-zinc-400">
                <div className="h-1.5 w-full bg-zinc-800 rounded-full overflow-hidden">
                  <div className="h-full w-4/5 bg-amber-500/40 rounded-full" />
                </div>
                <div className="h-1.5 w-3/4 bg-zinc-800 rounded-full" />
              </div>
              <div className="pt-1 flex items-center justify-between text-[8px] text-zinc-500">
                <span className="text-emerald-400 flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                  Mutual Non-Solicit
                </span>
                <span>Jurisdiction: DE / NY / UK</span>
              </div>
            </div>

            <div className="flex items-center justify-between text-[10px] font-mono text-zinc-400 pt-1 border-t border-white/[0.06]">
              <span className="text-amber-400/90 font-semibold">Ready to Sign</span>
              <span className="text-zinc-500">Word + PDF + Notion</span>
            </div>
          </div>
        );

      case 'sales-proposals':
        return (
          <div className="relative w-full h-full bg-gradient-to-b from-[#181922] via-[#10121a] to-[#0b0c10] p-3 flex flex-col justify-between overflow-hidden text-zinc-200">
            <div className="flex items-center justify-between pb-1.5 border-b border-white/[0.08]">
              <div className="flex items-center gap-1.5">
                <Presentation className="w-3.5 h-3.5 text-blue-400" />
                <span className="text-[10px] font-mono text-zinc-300 font-bold uppercase tracking-wider">RFP PROPOSAL DECK</span>
              </div>
              <span className="text-[9px] font-mono px-1.5 py-0.5 rounded bg-blue-500/10 text-blue-300 border border-blue-500/30 font-bold">
                84% WIN RATE
              </span>
            </div>

            {/* Slide Specimen */}
            <div className="my-auto p-2 bg-[#0c0e14] rounded-lg border border-white/[0.08] shadow-inner space-y-1.5">
              <div className="flex items-center justify-between text-[9px] font-mono">
                <span className="text-zinc-300 font-bold">COMMERCIAL PROPOSAL</span>
                <span className="text-blue-400 font-mono font-bold">$180,000 ARR</span>
              </div>
              <div className="grid grid-cols-3 gap-1">
                <div className="h-4 bg-blue-950/60 rounded border border-blue-500/20 flex items-center justify-center text-[7.5px] font-mono text-blue-300">Phase 1</div>
                <div className="h-4 bg-indigo-950/60 rounded border border-indigo-500/20 flex items-center justify-center text-[7.5px] font-mono text-indigo-300">Phase 2</div>
                <div className="h-4 bg-amber-950/60 rounded border border-amber-500/20 flex items-center justify-center text-[7.5px] font-mono text-amber-300">Scale</div>
              </div>
            </div>

            <div className="flex items-center justify-between text-[10px] font-mono text-zinc-400 pt-1 border-t border-white/[0.06]">
              <span className="text-blue-400 font-semibold">Pitch-Deck + SOW</span>
              <span className="text-zinc-500">Keynote & Figma</span>
            </div>
          </div>
        );

      case 'ops-sops':
        return (
          <div className="relative w-full h-full bg-gradient-to-b from-[#151c18] via-[#0f1412] to-[#090d0b] p-3 flex flex-col justify-between overflow-hidden text-zinc-200">
            <div className="flex items-center justify-between pb-1.5 border-b border-white/[0.08]">
              <div className="flex items-center gap-1.5">
                <FolderGit2 className="w-3.5 h-3.5 text-emerald-400" />
                <span className="text-[10px] font-mono text-zinc-300 font-bold uppercase tracking-wider">STANDARD OPS (SOP)</span>
              </div>
              <span className="text-[9px] font-mono px-1.5 py-0.5 rounded bg-emerald-500/10 text-emerald-300 border border-emerald-500/30 font-bold">
                120 RUNBOOKS
              </span>
            </div>

            {/* Checklist Specimen */}
            <div className="my-auto p-2 bg-[#0b0e0c] rounded-lg border border-white/[0.08] space-y-1 font-mono text-[8.5px]">
              <div className="flex items-center gap-1.5 text-emerald-300">
                <CheckCircle2 className="w-3 h-3 text-emerald-400" />
                <span>Client Onboarding Protocol</span>
              </div>
              <div className="flex items-center gap-1.5 text-zinc-400">
                <CheckCircle2 className="w-3 h-3 text-emerald-400" />
                <span>Incident Response Escalation</span>
              </div>
              <div className="flex items-center gap-1.5 text-zinc-500">
                <CheckCircle2 className="w-3 h-3 text-zinc-600" />
                <span>Monthly Retainer Governance</span>
              </div>
            </div>

            <div className="flex items-center justify-between text-[10px] font-mono text-zinc-400 pt-1 border-t border-white/[0.06]">
              <span className="text-emerald-400 font-semibold">Process Blueprints</span>
              <span className="text-zinc-500">Notion & Markdown</span>
            </div>
          </div>
        );

      case 'financial-models':
      case 'spreadsheets':
        return (
          <div className="relative w-full h-full bg-gradient-to-b from-[#181a17] via-[#10140e] to-[#0a0c08] p-3 flex flex-col justify-between overflow-hidden text-zinc-200">
            <div className="flex items-center justify-between pb-1.5 border-b border-white/[0.08]">
              <div className="flex items-center gap-1.5">
                <FileSpreadsheet className="w-3.5 h-3.5 text-emerald-400" />
                <span className="text-[10px] font-mono text-zinc-300 font-bold uppercase tracking-wider">CAP TABLE & PRO FORMA</span>
              </div>
              <span className="text-[9px] font-mono px-1.5 py-0.5 rounded bg-emerald-500/10 text-emerald-300 border border-emerald-500/30 font-bold">
                DYNAMIC XLSX
              </span>
            </div>

            {/* Mini Ledger Grid Specimen */}
            <div className="my-auto bg-[#0a0d0a] rounded-lg border border-emerald-500/20 p-2 font-mono text-[9px]">
              <div className="grid grid-cols-3 gap-1 pb-1 border-b border-white/[0.08] text-zinc-400 font-bold">
                <span>METRIC</span>
                <span className="text-right">YR 1</span>
                <span className="text-right">YR 3</span>
              </div>
              <div className="grid grid-cols-3 gap-1 py-0.5 text-zinc-300">
                <span>ARR</span>
                <span className="text-right">$240K</span>
                <span className="text-right text-emerald-400 font-bold">$1.84M</span>
              </div>
              <div className="grid grid-cols-3 gap-1 py-0.5 text-zinc-400">
                <span>EBITDA</span>
                <span className="text-right">18.4%</span>
                <span className="text-right text-emerald-400 font-bold">34.2%</span>
              </div>
            </div>

            <div className="flex items-center justify-between text-[10px] font-mono text-zinc-400 pt-1 border-t border-white/[0.06]">
              <span className="font-bold text-emerald-400">Automated Formulas</span>
              <span className="text-zinc-500">Excel + Sheets</span>
            </div>
          </div>
        );

      case 'compliance-security':
        return (
          <div className="relative w-full h-full bg-gradient-to-b from-[#18131d] via-[#100d14] to-[#0a070e] p-3 flex flex-col justify-between overflow-hidden text-zinc-200">
            <div className="flex items-center justify-between pb-1.5 border-b border-white/[0.08]">
              <div className="flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5 text-purple-400" />
                <span className="text-[10px] font-mono text-zinc-300 font-bold uppercase tracking-wider">COMPLIANCE SUITE</span>
              </div>
              <span className="text-[9px] font-mono px-1.5 py-0.5 rounded bg-purple-500/10 text-purple-300 border border-purple-500/30 font-bold">
                SOC2 / ISO27001
              </span>
            </div>

            <div className="my-auto p-2 bg-[#0d0912] rounded-lg border border-purple-500/20 space-y-1 font-mono text-[8.5px]">
              <div className="flex justify-between items-center text-purple-300">
                <span>AUDIT CONTROLS</span>
                <span className="text-emerald-400 font-bold">142/142 PASS</span>
              </div>
              <div className="space-y-1 text-zinc-400">
                <div className="flex justify-between">
                  <span>Data Encryption At Rest</span>
                  <span className="text-zinc-300">AES-256</span>
                </div>
                <div className="flex justify-between">
                  <span>Zero-Trust RBAC Policy</span>
                  <span className="text-emerald-400">Audited</span>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between text-[10px] font-mono text-zinc-400 pt-1 border-t border-white/[0.06]">
              <span className="text-purple-400 font-semibold">Audit Ready</span>
              <span className="text-zinc-500">GDPR + HIPAA + SOC2</span>
            </div>
          </div>
        );

      case 'backends':
        return (
          <div className="relative w-full h-full bg-gradient-to-b from-[#16181d] to-[#08090b] p-3 flex flex-col justify-between overflow-hidden font-mono text-xs text-white">
            <div className="flex items-center justify-between pb-1.5 border-b border-white/[0.08]">
              <div className="flex items-center gap-1.5">
                <div className="w-2.5 h-2.5 rounded-full bg-rose-500/80" />
                <div className="w-2.5 h-2.5 rounded-full bg-amber-500/80" />
                <div className="w-2.5 h-2.5 rounded-full bg-emerald-500/80" />
                <span className="text-[10px] text-zinc-400 ml-1 font-sans">api.nexus.dev</span>
              </div>
              <span className="text-[9px] text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-1.5 py-0.2 rounded font-bold">
                200 OK • 8ms
              </span>
            </div>

            <div className="my-auto py-1 space-y-1 text-[11px] leading-tight">
              <div className="text-amber-400 font-semibold">POST /v1/auth/verify</div>
              <div className="text-zinc-400 pl-2">{'{ "status": "verified", "sub": "usr_94a" }'}</div>
              <div className="text-emerald-400 font-semibold pt-0.5">GET /v1/telemetry/live</div>
            </div>

            <div className="flex items-center justify-between text-[10px] text-zinc-400 pt-1 border-t border-white/[0.08] font-sans">
              <span className="flex items-center gap-1 text-emerald-400 font-bold">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                Edge Microservice
              </span>
              <span>Postgres RLS</span>
            </div>
          </div>
        );

      case 'react-apps':
        return (
          <div className="relative w-full h-full bg-gradient-to-b from-[#16181d] via-[#111317] to-[#08090b] p-3 flex flex-col justify-between overflow-hidden text-white">
            <div className="flex items-center justify-between z-10">
              <span className="flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-[10px] font-mono font-bold text-emerald-400">
                <Code2 className="w-3 h-3 text-emerald-400" />
                React 19 App
              </span>
              <span className="curatorial-stamp text-[9px] text-zinc-400">60 FPS CANVAS</span>
            </div>

            <div className="my-auto py-2 flex items-center justify-center">
              <div className="w-full max-w-[200px] h-14 bg-[#111317] rounded-xl border border-white/[0.08] p-2 flex flex-col justify-between shadow-lg">
                <div className="flex items-center justify-between text-[10px] font-mono">
                  <span className="text-zinc-400">TICK / FEED</span>
                  <span className="text-emerald-400 font-bold">+18.4%</span>
                </div>
                <div className="flex items-end gap-1 h-6">
                  {[40, 65, 30, 85, 55, 95, 75, 100].map((h, i) => (
                    <div key={i} style={{ height: `${h}%` }} className="flex-1 bg-gradient-to-t from-emerald-500 to-cyan-400 rounded-xs" />
                  ))}
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between text-[10px] font-mono text-zinc-400 z-10">
              <span className="text-cyan-400 font-semibold">Web Audio Synthesizer</span>
              <span>SPA Dashboard</span>
            </div>
          </div>
        );

      case 'resumes':
        return (
          <div className="relative w-full h-full bg-gradient-to-b from-[#181a20] to-[#0e1014] p-3 flex flex-col justify-between overflow-hidden text-zinc-200">
            <div className="flex items-center justify-between z-10 pb-1.5 border-b border-white/[0.08]">
              <span className="flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-white/[0.06] border border-white/10 text-[10px] font-mono font-bold text-zinc-200">
                <Briefcase className="w-3 h-3 text-amber-400" />
                ATS 98% SCORE
              </span>
              <span className="curatorial-stamp text-[9px] text-zinc-500">EXECUTIVE</span>
            </div>

            <div className="my-auto py-1 px-3 bg-[#0a0c10] rounded-lg border border-white/[0.08] shadow-xs max-w-[200px] mx-auto w-full">
              <div className="text-[11px] font-bold text-white font-serif">Alex Morgan</div>
              <div className="text-[9px] text-amber-400/90 font-mono">Staff Software Architect</div>
              <div className="w-full h-px bg-white/[0.06] my-1" />
              <div className="space-y-0.5 text-[8.5px] text-zinc-400">
                <div>• Scaled edge distributed API to 2M MAU</div>
                <div>• Reduced cloud infrastructure spend 64%</div>
              </div>
            </div>

            <div className="flex items-center justify-between text-[10px] font-mono text-zinc-400 z-10 pt-1 border-t border-white/[0.06]">
              <span className="font-bold text-zinc-200">PDF + DOCX + Figma</span>
              <span>XYZ Impact Bullets</span>
            </div>
          </div>
        );

      case 'documents-pdf':
      case 'websites-ui':
      default:
        return (
          <div className="relative w-full h-full bg-gradient-to-br from-[#161822] via-[#10121a] to-[#0a0b0e] p-3 flex flex-col justify-between overflow-hidden text-zinc-200">
            <div className="flex items-center justify-between z-10 pb-1.5 border-b border-white/[0.08]">
              <span className="flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-white/[0.06] border border-white/10 text-[10px] font-mono font-bold text-indigo-300">
                <Layout className="w-3 h-3 text-indigo-400" />
                Artifact Specimen
              </span>
              <span className="curatorial-stamp text-[9px] text-zinc-500">ARCHIVE READY</span>
            </div>

            {/* Dimensional Floating Specimen Sheet */}
            <div className="flex items-center justify-center my-auto py-1.5">
              <div className="relative w-36 h-18 perspective-500">
                <div className="absolute top-0 left-0 w-32 h-14 rounded-lg bg-[#0e1014] border border-white/[0.08] rotate-[-5deg]" />
                <div className="absolute top-1 left-2 w-32 h-14 rounded-lg bg-[#181b24] border border-white/15 shadow-[0_8px_20px_rgba(0,0,0,0.7)] flex items-center justify-between px-3 rotate-[3deg] group-hover:rotate-[5deg] group-hover:-translate-y-1 transition-all duration-300">
                  <div className="space-y-1">
                    <div className="w-10 h-1.5 rounded-full bg-amber-400/80" />
                    <div className="w-7 h-1 rounded-full bg-zinc-600" />
                  </div>
                  <div className="flex gap-1">
                    <div className="w-2 h-2 rounded-full bg-amber-400" />
                    <div className="w-2 h-2 rounded-full bg-emerald-400" />
                  </div>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between text-[10px] font-mono text-zinc-400 z-10 pt-1 border-t border-white/[0.06]">
              <span className="text-zinc-300 font-bold">{product.fileFormat} Archive</span>
              <span>Instant Unpack</span>
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
              className="w-5 h-5 rounded-full object-cover border border-amber-400/30 shrink-0" 
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
            <span className={`px-2 py-0.5 rounded-full text-[9px] font-mono font-bold tracking-wider uppercase shadow-2xs ${
              product.badge === 'HOT' ? 'bg-rose-950/70 text-rose-300 border border-rose-500/40' :
              product.badge === 'BESTSELLER' ? 'gold-rim-badge font-black' :
              product.badge === 'FREE' ? 'bg-emerald-950/70 text-emerald-300 border border-emerald-500/40 font-black' :
              'bg-indigo-950/70 text-indigo-300 border border-indigo-500/40'
            }`}>
              {product.badge}
            </span>
          )}

          {/* Tactile Wishlist Toggle Pill */}
          <button
            type="button"
            onClick={() => onToggleWishlist(product)}
            className={`p-1.5 rounded-full border transition-all cursor-pointer ${
              isWishlisted 
                ? 'bg-rose-950/70 text-rose-400 border-rose-500/50 shadow-2xs scale-105' 
                : 'bg-[#181b22] text-zinc-400 border-white/10 hover:text-white hover:bg-[#20242e]'
            } active:scale-75 transition-transform duration-200 ease-[cubic-bezier(0.34,1.56,0.64,1)]`}
            aria-label="Save to Wishlist"
            title={isWishlisted ? 'Remove from Wishlist' : 'Save to Wishlist'}
          >
            <Heart className={`w-3.5 h-3.5 ${isWishlisted ? 'fill-rose-500 text-rose-500' : ''}`} />
          </button>
        </div>
      </div>

      {/* Tucked Pocket Container with Slide-Out File Thumbnail Sheet */}
      <div className="relative w-full aspect-16/10 rounded-[14px] overflow-hidden group/preview bg-[#090a0d] border border-white/[0.08] shadow-inner">
        
        {/* Back Chamber of the Folder (Interior lining pattern) */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#14161d] to-[#07080a] opacity-90" />
        <div className="absolute inset-0 bg-[radial-gradient(#ffffff08_1px,transparent_1px)] [background-size:12px_12px] opacity-40 pointer-events-none" />

        {/* 1. Tucked Document/Asset Sheet (Peeks out from the pocket, slides up on hover) */}
        <div className="absolute inset-x-2.5 top-2 bottom-4 tucked-specimen-sheet z-10 rounded-xl overflow-hidden border border-white/[0.14] shadow-[0_8px_20px_rgba(0,0,0,0.8)]">
          {renderCategoryPreview()}
        </div>

        {/* 2. Physical Front Pocket Overlay Sleeve (Tucked Pocket with Angled Lip) */}
        <div className="absolute inset-x-0 bottom-0 h-14 tucked-pocket-sleeve z-20 flex items-center justify-between px-3 pointer-events-none">
          {/* Subtle gold stitch line along the top of the pocket */}
          <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-amber-400/40 to-transparent" />
          
          <div className="flex items-center gap-1.5 pointer-events-auto">
            <span className="text-[9px] font-mono uppercase tracking-wider px-2 py-0.5 rounded bg-black/60 border border-white/10 text-zinc-300 font-bold">
              {product.fileFormat} POCKET
            </span>
            <span className="text-[9px] font-mono text-zinc-500">
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
                className="flex items-center gap-1 px-2.5 py-1 rounded-full bg-amber-500 hover:bg-amber-400 text-zinc-950 text-[10.5px] font-mono font-bold cursor-pointer shadow-sm active:scale-95 transition-all"
                title="Read full complete legal agreement with clauses"
              >
                <FileText className="w-3 h-3 text-zinc-950" />
                <span>Read Clauses</span>
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
                className="flex items-center gap-1 px-2.5 py-1 rounded-full bg-black/80 hover:bg-black text-amber-300 text-[10.5px] font-mono font-bold cursor-pointer shadow-sm border border-amber-400/30 hover:border-amber-400 active:scale-95 transition-all"
                title="Inspect ZIP archive contents & license manifest"
              >
                <FileArchive className="w-3 h-3 text-amber-400" />
                <span>Unpack</span>
              </button>
            )}
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                onQuickLook(product);
              }}
              className="flex items-center gap-1 px-2.5 py-1 rounded-full bg-white hover:bg-zinc-200 text-zinc-950 text-[10.5px] font-semibold cursor-pointer shadow-sm active:scale-95 transition-all"
              title="Quick preview spec"
            >
              <Eye className="w-3 h-3 text-zinc-950" />
              <span>Spec</span>
            </button>
          </div>
        </div>

      </div>

      {/* 3. Folder Footer Dossier Details */}
      <div className="p-2.5 pt-3 flex-1 flex flex-col justify-between space-y-3">
        <div>
          {/* Catalog Accession Serial & Star Rating */}
          <div className="flex items-center justify-between text-xs text-zinc-400 mb-1.5 font-mono">
            <div className="flex items-center gap-1 font-medium text-amber-400">
              <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
              <span>{product.rating}</span>
              <span className="text-zinc-500">({product.reviewCount})</span>
            </div>
            <span className="text-[9px] curatorial-stamp text-amber-400/80 font-bold tracking-widest">
              PKT // {product.id.slice(0, 10).toUpperCase()}
            </span>
          </div>

          {/* Title & Subtitle */}
          <h3 
            onClick={() => onQuickLook(product)}
            className="text-[13.5px] font-bold text-[#f4f5f6] group-hover:text-amber-300 transition-colors cursor-pointer line-clamp-1 [text-wrap:balance]"
          >
            {product.title}
          </h3>
          <p className="text-xs text-zinc-400 line-clamp-2 mt-1 leading-relaxed [text-wrap:pretty]">
            {product.subtitle}
          </p>
        </div>

        {/* Archival Spec Micro-Tags & Look Inside Trigger */}
        <div className="flex items-center justify-between gap-1.5 pt-1">
          <div className="flex items-center gap-1.5 flex-wrap">
            <span className="text-[10px] font-mono px-2 py-0.5 rounded-md font-bold border bg-[#14171f] text-zinc-200 border-white/10">
              {product.fileFormat}
            </span>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded-md bg-[#14171f] text-zinc-400 border border-white/10">
              {product.fileSize}
            </span>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded-md bg-[#14171f] text-zinc-400 border border-white/10 hidden sm:inline">
              v{product.version}
            </span>
          </div>

          {product.category === 'legal-contracts' && onOpenLegalDocument ? (
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                onOpenLegalDocument(product);
              }}
              className="flex items-center gap-1 px-2.5 py-0.5 rounded-md bg-amber-500/10 hover:bg-amber-500/20 text-amber-300 border border-amber-500/30 text-[10px] font-mono font-bold cursor-pointer active:scale-95 transition-all shrink-0"
              title="Read full complete legal agreement with clauses"
            >
              <FileText className="w-3 h-3 text-amber-400" />
              <span>Full Agreement</span>
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
              className="flex items-center gap-1 px-2.5 py-0.5 rounded-md bg-[#161a22] hover:bg-[#1f2430] text-amber-300 border border-amber-500/30 text-[10px] font-mono font-bold cursor-pointer active:scale-95 transition-all shrink-0"
              title="Inspect ZIP archive contents"
            >
              <FileArchive className="w-3 h-3 text-amber-400" />
              <span>Folder Manifest</span>
            </button>
          )}
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
            <span className="text-[10px] text-zinc-500 block font-mono">
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
