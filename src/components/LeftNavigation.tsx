import React from 'react';
import { ProductCategory, FilterState } from '../types';
import { 
  LayoutGrid, 
  Layout, 
  Server, 
  Code2, 
  Smartphone, 
  FileText, 
  FileSpreadsheet, 
  Briefcase,
  ChevronLeft, 
  ChevronRight, 
  ShieldCheck, 
  Sparkles,
  Scale,
  Presentation,
  FolderGit2
} from 'lucide-react';

interface LeftNavigationProps {
  filterState: FilterState;
  onFilterChange: (updates: Partial<FilterState>) => void;
  collapsed: boolean;
  onToggleCollapse: () => void;
  categoryCounts: Record<ProductCategory, number>;
  totalProductsCount: number;
}

export const LeftNavigation: React.FC<LeftNavigationProps> = ({
  filterState,
  onFilterChange,
  collapsed,
  onToggleCollapse,
  categoryCounts
}) => {
  const categories: { 
    id: ProductCategory; 
    label: string; 
    index: string;
    icon: React.ComponentType<{ className?: string }>;
    accentColor: string;
  }[] = [
    { 
      id: 'all', 
      label: 'All Artifacts', 
      index: '00',
      icon: LayoutGrid,
      accentColor: 'indigo'
    },
    { 
      id: 'legal-contracts', 
      label: 'Legal & Contracts', 
      index: '01',
      icon: Scale,
      accentColor: 'amber'
    },
    { 
      id: 'sales-proposals', 
      label: 'Sales & Proposals', 
      index: '02',
      icon: Presentation,
      accentColor: 'orange'
    },
    { 
      id: 'ops-sops', 
      label: 'SOPs & Operations', 
      index: '03',
      icon: FolderGit2,
      accentColor: 'emerald'
    },
    { 
      id: 'financial-models', 
      label: 'Financial Models', 
      index: '04',
      icon: FileSpreadsheet,
      accentColor: 'teal'
    },
    { 
      id: 'compliance-security', 
      label: 'Compliance & Audit', 
      index: '05',
      icon: ShieldCheck,
      accentColor: 'rose'
    },
    { 
      id: 'websites-ui', 
      label: 'Websites & UI Kits', 
      index: '06',
      icon: Layout,
      accentColor: 'indigo'
    },
    { 
      id: 'resumes', 
      label: 'Exec Resumes & CVs', 
      index: '07',
      icon: Briefcase,
      accentColor: 'stone'
    },
  ];

  const formats = ['All', '.DOCX', '.XLSX', '.PDF', '.NOTION', '.PPTX', '.FIG', '.ZIP', '.TSX'];

  return (
    <aside 
      className={`relative lg:sticky top-0 lg:top-[61px] left-0 h-full lg:h-[calc(100vh-61px)] z-30 bg-[#FBFBF9]/95 backdrop-blur-md border-r border-stone-200/80 flex flex-col transition-all duration-300 ease-[cubic-bezier(0.23,1,0.32,1)] ${
        collapsed ? 'w-16' : 'w-64 max-w-[80vw]'
      }`}
    >
      {/* Scrollable Plinth Navigation Sections */}
      <div className="flex-1 overflow-y-auto px-3 py-4 space-y-6 scrollbar-thin">
        
        {/* Archival Categories Section */}
        <div>
          {!collapsed && (
            <div className="px-2 mb-2.5 flex items-center justify-between">
              <span className="curatorial-stamp text-[9.5px]">
                COLLECTION // INDEX
              </span>
              <span className="text-[10px] font-mono text-stone-400">
                07 CATS
              </span>
            </div>
          )}
          <nav className="space-y-1">
            {categories.map((cat) => {
              const isActive = filterState.category === cat.id;
              const count = categoryCounts[cat.id] !== undefined ? categoryCounts[cat.id] : 0;
              const Icon = cat.icon;
              return (
                <button
                  key={cat.id}
                  type="button"
                  onClick={() => onFilterChange({ category: cat.id })}
                  className={`w-full flex items-center justify-between px-2.5 py-2 rounded-2xl text-xs font-medium transition-all group cursor-pointer border ${
                    isActive 
                      ? 'bg-stone-900 text-white font-semibold shadow-md border-stone-800 border-t-stone-700/80' 
                      : 'bg-transparent text-stone-700 hover:text-stone-950 hover:bg-stone-200/50 border-transparent hover:border-stone-200/60'
                  }`}
                  title={cat.label}
                >
                  <div className="flex items-center gap-2.5 min-w-0">
                    <span className={`w-7 h-7 rounded-xl flex items-center justify-center transition-all ${
                      isActive 
                        ? 'bg-stone-800 text-amber-300 shadow-inner' 
                        : 'bg-white text-stone-600 border border-stone-200/80 shadow-2xs group-hover:scale-105 group-hover:border-stone-300'
                    }`}>
                      <Icon className="w-3.5 h-3.5" />
                    </span>
                    {!collapsed && (
                      <div className="flex flex-col text-left truncate">
                        <span className="truncate leading-tight text-xs">{cat.label}</span>
                        <span className={`text-[9px] font-mono leading-none mt-0.5 ${isActive ? 'text-stone-400' : 'text-stone-400'}`}>
                          № {cat.index}
                        </span>
                      </div>
                    )}
                  </div>
                  {!collapsed && (
                    <span className={`text-[10px] font-mono px-2 py-0.5 rounded-full ${
                      isActive 
                        ? 'bg-stone-800 text-amber-200 border border-stone-700' 
                        : 'text-stone-500 bg-stone-100/80 border border-stone-200/50'
                    }`}>
                      {count}
                    </span>
                  )}
                </button>
              );
            })}
          </nav>
        </div>

        {/* Archival File Format Plinth Filter */}
        {!collapsed && (
          <div className="pt-4 border-t border-stone-200/70">
            <span className="px-2 curatorial-stamp text-[9.5px] mb-2.5 block">
              SPEC // ENCODING
            </span>
            <div className="flex flex-wrap gap-1.5 px-1">
              {formats.map((fmt) => {
                const isSelected = (fmt === 'All' && !filterState.format) || filterState.format === fmt;
                return (
                  <button
                    key={fmt}
                    type="button"
                    onClick={() => onFilterChange({ format: fmt === 'All' ? '' : fmt })}
                    className={`px-2 py-1 rounded-lg text-[10px] font-mono font-medium border transition-all cursor-pointer ${
                      isSelected
                        ? 'bg-stone-900 text-white border-stone-900 shadow-xs'
                        : 'bg-white/90 text-stone-600 border-stone-200 hover:border-stone-300 hover:text-stone-900 shadow-2xs'
                    }`}
                  >
                    {fmt}
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* Price Bracket Plinth */}
        {!collapsed && (
          <div className="pt-4 border-t border-stone-200/70">
            <span className="px-2 curatorial-stamp text-[9.5px] mb-2.5 block">
              VALUATION // RANGE
            </span>
            <div className="space-y-1">
              {[
                { id: 'all', label: 'All Catalog' },
                { id: 'free', label: '100% Free / Open Specimen' },
                { id: 'under-25', label: 'Under $25' },
                { id: '25-50', label: '$25 to $50' },
                { id: '50-plus', label: '$50+' },
              ].map((p) => {
                const isSelected = filterState.priceFilter === p.id;
                return (
                  <button
                    key={p.id}
                    type="button"
                    onClick={() => onFilterChange({ priceFilter: p.id as any })}
                    className={`w-full text-left px-2.5 py-1.5 rounded-xl text-xs font-medium transition-all cursor-pointer flex items-center justify-between ${
                      isSelected
                        ? 'bg-stone-200/80 text-stone-950 font-semibold shadow-2xs'
                        : 'text-stone-600 hover:text-stone-900 hover:bg-stone-200/40'
                    }`}
                  >
                    <span className="truncate">{p.label}</span>
                    {isSelected && <span className="w-1.5 h-1.5 rounded-full bg-stone-900 shrink-0 ml-1" />}
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* Commercial License Filter */}
        {!collapsed && (
          <div className="pt-4 border-t border-stone-200/70">
            <label className="flex items-center gap-2.5 px-3 py-2 rounded-xl bg-white border border-stone-200/80 shadow-2xs cursor-pointer hover:border-stone-300 transition-colors">
              <input
                type="checkbox"
                checked={filterState.commercialOnly}
                onChange={(e) => onFilterChange({ commercialOnly: e.target.checked })}
                className="w-3.5 h-3.5 rounded border-stone-300 text-stone-900 focus:ring-0 accent-stone-900"
              />
              <span className="text-xs text-stone-700 font-medium flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5 text-stone-500" />
                Commercial License
              </span>
            </label>
          </div>
        )}

        {/* Curatorial Atelier Onboarding Plinth */}
        {!collapsed && (
          <div className="p-4 rounded-2xl bg-gradient-to-br from-stone-100 to-amber-50/60 border border-stone-200/90 shadow-2xs relative overflow-hidden">
            <div className="flex items-center gap-1.5 text-stone-900 text-xs font-bold mb-1">
              <Sparkles className="w-3.5 h-3.5 text-amber-600" />
              Exhibit on Nexus Vault
            </div>
            <p className="text-[11px] text-stone-600 leading-relaxed mb-3">
              Independent atelier creator program. Keep 90% royalties with instantaneous automated crypto/fiat payouts.
            </p>
            <button 
              type="button"
              onClick={() => alert('Creator Studio: Exhibition submission portal opens here!')}
              className="btn-plinth-primary w-full py-2 px-3 text-white text-xs font-semibold rounded-xl cursor-pointer"
            >
              Submit Asset Specimen
            </button>
          </div>
        )}

      </div>

      {/* Footer Toggle Plinth */}
      <div className="p-2.5 border-t border-stone-200/80 bg-stone-100/60 flex items-center justify-end">
        <button
          type="button"
          onClick={onToggleCollapse}
          className="p-1.5 rounded-xl text-stone-500 hover:text-stone-800 hover:bg-stone-200/60 transition-colors cursor-pointer w-full flex items-center justify-center gap-1.5 text-xs font-medium"
          title={collapsed ? 'Expand Sidebar' : 'Collapse Sidebar'}
          aria-label={collapsed ? 'Expand Sidebar' : 'Collapse Sidebar'}
        >
          {collapsed ? <ChevronRight className="w-4 h-4" /> : (
            <>
              <ChevronLeft className="w-3.5 h-3.5" />
              <span className="font-mono text-[11px]">COLLAPSE PANEL</span>
            </>
          )}
        </button>
      </div>

    </aside>
  );
};
