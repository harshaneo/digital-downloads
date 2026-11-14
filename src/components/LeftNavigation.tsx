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
    icon: React.ComponentType<{ className?: string }>;
  }[] = [
    { id: 'all', label: 'All Artifacts', icon: LayoutGrid },
    { id: 'legal-contracts', label: 'Legal & Contracts', icon: Scale },
    { id: 'sales-proposals', label: 'Sales & Proposals', icon: Presentation },
    { id: 'ops-sops', label: 'SOPs & Operations', icon: FolderGit2 },
    { id: 'financial-models', label: 'Financial Models', icon: FileSpreadsheet },
    { id: 'compliance-security', label: 'Compliance & Audit', icon: ShieldCheck },
    { id: 'websites-ui', label: 'Websites & UI Kits', icon: Layout },
    { id: 'resumes', label: 'Exec Resumes & CVs', icon: Briefcase },
  ];

  const formats = ['All', '.DOCX', '.XLSX', '.PDF', '.NOTION', '.PPTX', '.FIG', '.ZIP', '.TSX'];

  return (
    <aside 
      className={`relative lg:sticky top-0 lg:top-[61px] left-0 h-full lg:h-[calc(100vh-61px)] z-30 bg-[var(--bg-raised)]/95 backdrop-blur-md border-r border-white/[0.08] flex flex-col transition-all duration-300 ease-[cubic-bezier(0.23,1,0.32,1)] ${
        collapsed ? 'w-16' : 'w-64 max-w-[80vw]'
      }`}
    >
      {/* Scrollable Plinth Navigation Sections */}
      <div className="flex-1 overflow-y-auto px-3 py-4 space-y-6 scrollbar-thin">
        
        {/* Categories Section */}
        <div>
          {!collapsed && (
            <div className="px-2 mb-2.5 flex items-center justify-between">
              <span className="text-xs font-mono uppercase tracking-wider text-zinc-400 font-semibold">
                Categories
              </span>
              <span className="text-xs font-mono text-zinc-500">
                {String(categories.length).padStart(2, '0')} Total
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
                  className={`w-full flex items-center justify-between px-2.5 py-2 rounded-xl text-xs font-medium transition-all group cursor-pointer border ${
                    isActive 
                      ? 'bg-white text-zinc-950 font-semibold shadow-md border-white' 
                      : 'bg-transparent text-zinc-400 hover:text-white hover:bg-white/[0.06] border-transparent'
                  }`}
                  title={cat.label}
                >
                  <div className="flex items-center gap-2.5 min-w-0">
                    <span className={`w-7 h-7 rounded-lg flex items-center justify-center transition-all ${
                      isActive 
                        ? 'bg-zinc-950 text-white shadow-inner' 
                        : 'bg-[var(--bg-surface-elevated)] text-zinc-300 border border-white/10 group-hover:border-white/20'
                    }`}>
                      <Icon className="w-3.5 h-3.5" />
                    </span>
                    {!collapsed && (
                      <span className="truncate leading-tight text-xs">{cat.label}</span>
                    )}
                  </div>
                  {!collapsed && (
                    <span className={`text-xs font-mono px-2 py-0.5 rounded-full ${
                      isActive 
                        ? 'bg-zinc-900 text-white' 
                        : 'text-zinc-400 bg-[var(--bg-surface-elevated)] border border-white/10'
                    }`}>
                      {count}
                    </span>
                  )}
                </button>
              );
            })}
          </nav>
        </div>

        {/* File Format Filter */}
        {!collapsed && (
          <div className="pt-4 border-t border-white/[0.08]">
            <span className="px-2 text-xs font-mono uppercase tracking-wider text-zinc-400 mb-2.5 block font-semibold">
              Format
            </span>
            <div className="flex flex-wrap gap-1.5 px-1">
              {formats.map((fmt) => {
                const isSelected = (fmt === 'All' && !filterState.format) || filterState.format === fmt;
                return (
                  <button
                    key={fmt}
                    type="button"
                    onClick={() => onFilterChange({ format: fmt === 'All' ? '' : fmt })}
                    className={`px-2 py-1 rounded-lg text-xs font-mono font-medium border transition-all cursor-pointer ${
                      isSelected
                        ? 'bg-white text-zinc-950 border-white font-bold shadow-xs'
                        : 'bg-[var(--bg-surface-elevated)] text-zinc-300 border-white/10 hover:border-white/20 hover:text-white'
                    }`}
                  >
                    {fmt}
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* Price Bracket Filter */}
        {!collapsed && (
          <div className="pt-4 border-t border-white/[0.08]">
            <span className="px-2 text-xs font-mono uppercase tracking-wider text-zinc-400 mb-2.5 block font-semibold">
              Price Range
            </span>
            <div className="space-y-1">
              {[
                { id: 'all', label: 'All Catalog' },
                { id: 'free', label: 'Free Assets' },
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
                        ? 'bg-white/10 text-white font-semibold'
                        : 'text-zinc-400 hover:text-white hover:bg-white/[0.04]'
                    }`}
                  >
                    <span className="truncate">{p.label}</span>
                    {isSelected && <span className="w-1.5 h-1.5 rounded-full bg-amber-400 shrink-0 ml-1" />}
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* Commercial License Filter */}
        {!collapsed && (
          <div className="pt-4 border-t border-white/[0.08]">
            <label className="flex items-center gap-2.5 px-3 py-2 rounded-xl bg-[var(--bg-surface)] border border-white/10 cursor-pointer hover:border-white/20 transition-colors">
              <input
                type="checkbox"
                checked={filterState.commercialOnly}
                onChange={(e) => onFilterChange({ commercialOnly: e.target.checked })}
                className="w-3.5 h-3.5 rounded border-zinc-600 text-white focus:ring-0 accent-white"
              />
              <span className="text-xs text-zinc-300 font-medium flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5 text-zinc-400" />
                Commercial License
              </span>
            </label>
          </div>
        )}



      </div>

      {/* Footer Toggle */}
      <div className="p-2.5 border-t border-white/[0.08] bg-[var(--bg-base)] flex items-center justify-end">
        <button
          type="button"
          onClick={onToggleCollapse}
          className="p-1.5 rounded-xl text-zinc-400 hover:text-white hover:bg-white/[0.05] transition-colors cursor-pointer w-full flex items-center justify-center gap-1.5 text-xs font-medium"
          title={collapsed ? 'Expand Sidebar' : 'Collapse Sidebar'}
          aria-label={collapsed ? 'Expand Sidebar' : 'Collapse Sidebar'}
        >
          {collapsed ? <ChevronRight className="w-4 h-4" /> : (
            <>
              <ChevronLeft className="w-3.5 h-3.5" />
              <span className="font-mono text-xs">COLLAPSE PANEL</span>
            </>
          )}
        </button>
      </div>

    </aside>
  );
};
