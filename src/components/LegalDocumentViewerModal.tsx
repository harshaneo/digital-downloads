import React, { useState } from 'react';
import { CompleteLegalDocument } from '../data/legal-documents/store';
import { 
  X, 
  Download, 
  Copy, 
  Check, 
  FileText, 
  Scale, 
  ShieldCheck, 
  Building2, 
  Calendar, 
  Printer, 
  CheckCircle2,
  ExternalLink,
  BookOpen
} from 'lucide-react';
import { triggerBlobDownload } from '../services/license-service';

interface LegalDocumentViewerModalProps {
  document: CompleteLegalDocument | null;
  isOpen: boolean;
  onClose: () => void;
  onAddToCart?: () => void;
  isInCart?: boolean;
}

export const LegalDocumentViewerModal: React.FC<LegalDocumentViewerModalProps> = ({
  document,
  isOpen,
  onClose,
  onAddToCart,
  isInCart = false
}) => {
  const [copiedClause, setCopiedClause] = useState<string | null>(null);
  const [copiedAll, setCopiedAll] = useState(false);
  const [searchClause, setSearchClause] = useState('');
  const [activeTab, setActiveTab] = useState<'clauses' | 'parties' | 'export'>('clauses');

  if (!isOpen || !document) return null;

  const handleCopyClause = (section: string, text: string) => {
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(text);
    }
    setCopiedClause(section);
    setTimeout(() => setCopiedClause(null), 2200);
  };

  const handleCopyFullDocument = () => {
    const fullText = [
      `================================================================================`,
      `${document.documentTitle}`,
      `Version: ${document.version} | Last Updated: ${document.lastUpdated}`,
      `Jurisdiction: ${document.jurisdiction}`,
      `Governing Law: ${document.governingLaw}`,
      `================================================================================\n`,
      `PARTIES:`,
      `Party A: ${document.parties.partyA}`,
      `Party B: ${document.parties.partyB}\n`,
      `EXECUTIVE SUMMARY:`,
      `${document.summary}\n`,
      `--------------------------------------------------------------------------------`,
      `ENFORCEABLE TERMS & CONDITIONS:`,
      `--------------------------------------------------------------------------------\n`,
      ...document.clauses.map(c => 
        `[SECTION ${c.section}] ${c.title.toUpperCase()}\n\nPlain-English Context:\n${c.explanation}\n\nEnforceable Legal Provision:\n${c.enforceableText}\n\n`
      ),
      `================================================================================`,
      `SIGNING & EXECUTION BLOCK`,
      `================================================================================`,
      `${document.signingBlock.disclaimer}\n`,
      `Signatory A: _______________________________ Date: _______________`,
      `(${document.signingBlock.partyALabel})\n`,
      `Signatory B: _______________________________ Date: _______________`,
      `(${document.signingBlock.partyBLabel})\n`,
      `[Verified via Nexus Vault Legal Atelier - Cryptographically Signed]`
    ].join('\n');

    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(fullText);
    }
    setCopiedAll(true);
    setTimeout(() => setCopiedAll(false), 2400);
  };

  const handleDownloadDoc = () => {
    const fullDocData = {
      manifestHeader: 'NEXUS VAULT VERIFIED LEGAL INSTRUMENT',
      documentId: document.id,
      title: document.documentTitle,
      version: document.version,
      governingLaw: document.governingLaw,
      jurisdiction: document.jurisdiction,
      wordCount: document.wordCount,
      parties: document.parties,
      summary: document.summary,
      clauses: document.clauses,
      signingBlock: document.signingBlock,
      exportedAt: new Date().toISOString()
    };
    triggerBlobDownload(`${document.id}_enforceable_agreement.json`, fullDocData);
  };

  const filteredClauses = document.clauses.filter(c => 
    c.title.toLowerCase().includes(searchClause.toLowerCase()) ||
    c.section.toLowerCase().includes(searchClause.toLowerCase()) ||
    c.enforceableText.toLowerCase().includes(searchClause.toLowerCase())
  );

  return (
    <div 
      role="dialog" 
      aria-modal="true" 
      aria-labelledby="legal-viewer-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/80 backdrop-blur-md animate-in fade-in duration-200"
    >
      {/* Dismiss backdrop */}
      <div className="absolute inset-0" onClick={onClose} />

      {/* Main Luxury Modal Surface */}
      <div className="relative w-full max-w-4xl max-h-[92vh] bg-[#0c0d11] border border-white/[0.12] rounded-2xl overflow-hidden shadow-[0_25px_60px_-15px_rgba(0,0,0,0.9)] flex flex-col z-10 text-zinc-100 border-t border-t-amber-400/40">
        
        {/* Top Specular Gold Edge Light */}
        <div className="absolute inset-x-0 top-0 h-[1px] bg-gradient-to-r from-transparent via-amber-400/60 to-transparent pointer-events-none z-20" />

        {/* Modal Header */}
        <div className="px-5 py-4 border-b border-white/[0.08] bg-[#12141a] flex items-center justify-between gap-3 shrink-0">
          <div className="flex items-center gap-3 min-w-0">
            <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-400 flex items-center justify-center shrink-0">
              <Scale className="w-5 h-5" />
            </div>

            <div className="min-w-0">
              <div className="flex items-center gap-2">
                <span className="text-[9.5px] font-mono font-bold uppercase tracking-wider px-2 py-0.5 rounded-md gold-rim-badge">
                  Full Document Preview
                </span>
                <span className="text-[10px] font-mono text-emerald-400 font-bold bg-emerald-500/10 px-2 py-0.5 rounded-md border border-emerald-500/20">
                  v{document.version}
                </span>
                <span className="text-xs text-zinc-400 hidden sm:inline font-mono">
                  {document.wordCount} words • {document.totalClauses} clauses
                </span>
              </div>

              <h2 id="legal-viewer-title" className="text-sm sm:text-base font-bold text-white truncate mt-0.5">
                {document.documentTitle}
              </h2>
            </div>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <button
              type="button"
              onClick={handleCopyFullDocument}
              className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#181b22] hover:bg-[#20242e] text-zinc-200 border border-white/10 text-xs font-semibold cursor-pointer active:scale-95 transition-all"
              title="Copy entire contract text to clipboard"
            >
              {copiedAll ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-400" />
                  <span className="text-emerald-400">Copied Full Doc</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5 text-zinc-400" />
                  <span>Copy Agreement</span>
                </>
              )}
            </button>

            <button
              type="button"
              onClick={handleDownloadDoc}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white hover:bg-zinc-200 text-zinc-950 text-xs font-bold cursor-pointer active:scale-95 transition-all"
              title="Export formatted legal agreement (.JSON / text)"
            >
              <Download className="w-3.5 h-3.5 text-zinc-950" />
              <span>Export</span>
            </button>

            <button
              type="button"
              onClick={onClose}
              className="p-1.5 rounded-lg text-zinc-400 hover:text-white hover:bg-white/[0.08] transition-colors cursor-pointer"
              aria-label="Close legal preview"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Metadata & Navigation Strip */}
        <div className="px-5 py-2.5 bg-[#0a0b0e] border-b border-white/[0.06] flex flex-wrap items-center justify-between gap-3 text-xs font-mono text-zinc-400 shrink-0">
          <div className="flex items-center gap-1.5 p-1 bg-[#14161f] rounded-xl border border-white/10">
            <button
              type="button"
              onClick={() => setActiveTab('clauses')}
              className={`px-3 py-1 rounded-lg text-xs font-semibold cursor-pointer transition-all ${
                activeTab === 'clauses'
                  ? 'bg-white text-zinc-950 font-bold shadow-xs'
                  : 'text-zinc-400 hover:text-white'
              }`}
            >
              Clause Matrix ({document.totalClauses})
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('parties')}
              className={`px-3 py-1 rounded-lg text-xs font-semibold cursor-pointer transition-all ${
                activeTab === 'parties'
                  ? 'bg-white text-zinc-950 font-bold shadow-xs'
                  : 'text-zinc-400 hover:text-white'
              }`}
            >
              Parties & Signatures
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('export')}
              className={`px-3 py-1 rounded-lg text-xs font-semibold cursor-pointer transition-all ${
                activeTab === 'export'
                  ? 'bg-white text-zinc-950 font-bold shadow-xs'
                  : 'text-zinc-400 hover:text-white'
              }`}
            >
              Clean Plain Text
            </button>
          </div>

          <div className="flex items-center gap-2">
            <input 
              type="text"
              value={searchClause}
              onChange={(e) => setSearchClause(e.target.value)}
              placeholder="Search clauses (e.g. indemnity, IP)..."
              className="px-2.5 py-1 rounded-lg bg-[#14161f] border border-white/10 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-amber-400/50 w-48 sm:w-64"
            />
          </div>
        </div>

        {/* Document Body */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-6 bg-[#090a0d]">
          
          {/* Executive Overview Callout */}
          <div className="p-4 rounded-xl bg-[#12141a] border border-white/[0.08] space-y-2">
            <div className="flex items-center justify-between">
              <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-amber-300 flex items-center gap-1.5">
                <BookOpen className="w-3.5 h-3.5" />
                <span>Executive Summary & Commercial Context</span>
              </h3>
              <span className="text-[10px] font-mono text-zinc-500">
                Governing: {document.governingLaw}
              </span>
            </div>
            <p className="text-xs text-zinc-300 leading-relaxed [text-wrap:pretty]">
              {document.summary}
            </p>
          </div>

          {activeTab === 'clauses' && (
            /* Clauses List */
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-zinc-400">
                  Enforceable Contract Sections ({filteredClauses.length} of {document.totalClauses})
                </h3>
                <span className="text-[11px] text-zinc-500 font-mono">
                  Click any section to copy individual provision
                </span>
              </div>

              {filteredClauses.length === 0 ? (
                <div className="py-12 text-center text-xs text-zinc-500 font-mono">
                  No contract clauses matched "{searchClause}".
                </div>
              ) : (
                filteredClauses.map((clause) => {
                  const isCopied = copiedClause === clause.section;
                  return (
                    <div 
                      key={clause.section}
                      className="rounded-xl border border-white/[0.08] bg-[#0e1015] hover:border-white/[0.16] transition-all p-4 space-y-2.5 group"
                    >
                      {/* Clause Header */}
                      <div className="flex items-start justify-between gap-3">
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="text-xs font-mono font-bold px-1.5 py-0.5 rounded bg-white/[0.06] text-amber-300 border border-white/10">
                              SECTION {clause.section}
                            </span>
                            <h4 className="text-sm font-bold text-white">
                              {clause.title}
                            </h4>
                          </div>
                          <p className="text-[11px] text-zinc-400 mt-1 italic">
                            Why this is here: {clause.explanation}
                          </p>
                        </div>

                        <button
                          type="button"
                          onClick={() => handleCopyClause(clause.section, clause.enforceableText)}
                          className={`px-2.5 py-1 rounded-lg text-xs font-mono font-bold flex items-center gap-1.5 transition-all cursor-pointer shrink-0 ${
                            isCopied 
                              ? 'bg-emerald-500 text-zinc-950' 
                              : 'bg-[#181b22] hover:bg-[#20242e] text-zinc-300 border border-white/10'
                          }`}
                          title="Copy clause to clipboard"
                        >
                          {isCopied ? (
                            <>
                              <Check className="w-3 h-3" />
                              <span>Copied</span>
                            </>
                          ) : (
                            <>
                              <Copy className="w-3 h-3 text-zinc-500 group-hover:text-zinc-200" />
                              <span>Copy Clause</span>
                            </>
                          )}
                        </button>
                      </div>

                      {/* Enforceable Legal Language Box */}
                      <div className="p-3 rounded-lg bg-[#07080a] border border-white/[0.06] font-mono text-xs text-zinc-200 whitespace-pre-wrap leading-relaxed select-text">
                        {clause.enforceableText}
                      </div>
                    </div>
                  );
                })
              )}
            </div>
          )}

          {activeTab === 'parties' && (
            <div className="space-y-4">
              <div className="p-5 rounded-xl bg-[#0e1015] border border-white/[0.08] space-y-4">
                <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-amber-300">
                  Parties Bound Under Agreement
                </h3>
                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="p-3.5 rounded-lg bg-[#07080a] border border-white/[0.06] space-y-1">
                    <span className="text-[10px] font-mono text-zinc-500 uppercase font-bold">Party A (Service Provider)</span>
                    <p className="text-sm font-bold text-white font-mono">{document.parties.partyA}</p>
                    <p className="text-xs text-zinc-400">Authorized technical consultancies, developers, and engineering firms.</p>
                  </div>
                  <div className="p-3.5 rounded-lg bg-[#07080a] border border-white/[0.06] space-y-1">
                    <span className="text-[10px] font-mono text-zinc-500 uppercase font-bold">Party B (Commercial Customer)</span>
                    <p className="text-sm font-bold text-white font-mono">{document.parties.partyB}</p>
                    <p className="text-xs text-zinc-400">Enterprise clients, project sponsors, and hiring organizations.</p>
                  </div>
                </div>
              </div>

              {/* Execution & Signing Block */}
              <div className="p-4 rounded-xl bg-[#0f1117] border border-white/[0.08] space-y-3">
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-emerald-400" />
                  <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-white">
                    Execution & Signature Block
                  </h4>
                </div>

                <p className="text-xs text-zinc-400">
                  {document.signingBlock.disclaimer}
                </p>

                <div className="grid sm:grid-cols-2 gap-4 pt-2">
                  <div className="p-3 rounded-lg bg-[#07080a] border border-white/[0.06] space-y-2">
                    <span className="text-[10px] font-mono font-bold text-zinc-400 uppercase">
                      {document.signingBlock.partyALabel}
                    </span>
                    <div className="h-px bg-white/10 my-2" />
                    <div className="flex justify-between text-[11px] font-mono text-zinc-500">
                      <span>Sign: ____________________</span>
                      <span>Date: ___________</span>
                    </div>
                  </div>

                  <div className="p-3 rounded-lg bg-[#07080a] border border-white/[0.06] space-y-2">
                    <span className="text-[10px] font-mono font-bold text-zinc-400 uppercase">
                      {document.signingBlock.partyBLabel}
                    </span>
                    <div className="h-px bg-white/10 my-2" />
                    <div className="flex justify-between text-[11px] font-mono text-zinc-500">
                      <span>Sign: ____________________</span>
                      <span>Date: ___________</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'export' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-zinc-400">
                  Clean Markdown & Plain-Text Agreement
                </h3>
                <button
                  type="button"
                  onClick={handleCopyFullDocument}
                  className="flex items-center gap-1.5 px-3 py-1 rounded-lg bg-white hover:bg-zinc-200 text-zinc-950 text-xs font-bold cursor-pointer"
                >
                  {copiedAll ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copiedAll ? 'Copied' : 'Copy Plain Text'}</span>
                </button>
              </div>

              <div className="p-4 rounded-xl bg-[#060709] border border-white/[0.08] font-mono text-xs text-zinc-300 whitespace-pre-wrap leading-relaxed select-all max-h-[460px] overflow-y-auto">
                {`================================================================================
${document.documentTitle}
Version: ${document.version} | Last Updated: ${document.lastUpdated}
Jurisdiction: ${document.jurisdiction}
Governing Law: ${document.governingLaw}
================================================================================

PARTIES:
Party A: ${document.parties.partyA}
Party B: ${document.parties.partyB}

EXECUTIVE SUMMARY:
${document.summary}

--------------------------------------------------------------------------------
ENFORCEABLE TERMS & CONDITIONS:
--------------------------------------------------------------------------------

${document.clauses.map(c => `[SECTION ${c.section}] ${c.title.toUpperCase()}\n\nPlain-English Context:\n${c.explanation}\n\nEnforceable Provision:\n${c.enforceableText}\n\n`).join('')}
================================================================================
SIGNING & EXECUTION BLOCK
================================================================================
${document.signingBlock.disclaimer}

Signatory A: _______________________________ Date: _______________
(${document.signingBlock.partyALabel})

Signatory B: _______________________________ Date: _______________
(${document.signingBlock.partyBLabel})
`}
              </div>
            </div>
          )}

        </div>

        {/* Modal Footer */}
        <div className="px-5 py-3.5 bg-[#0e1014] border-t border-white/[0.08] flex items-center justify-between gap-3 shrink-0">
          <div className="flex items-center gap-2 text-xs font-mono text-zinc-400">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span>Complete verified legal instrument ready for deployment</span>
          </div>

          <div className="flex items-center gap-2">
            {onAddToCart && (
              <button
                type="button"
                onClick={() => {
                  onAddToCart();
                  onClose();
                }}
                disabled={isInCart}
                className={`px-4 py-2 rounded-xl text-xs font-bold cursor-pointer transition-all ${
                  isInCart 
                    ? 'bg-zinc-800 text-zinc-400 border border-white/10'
                    : 'btn-primary'
                }`}
              >
                {isInCart ? 'In Your Bag' : 'Add Suite to Bag'}
              </button>
            )}

            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-xl bg-[#181b22] hover:bg-[#20242e] text-zinc-300 border border-white/10 text-xs font-semibold cursor-pointer transition-all"
            >
              Close Reader
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
