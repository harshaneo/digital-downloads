import React from 'react';
import { SearchX, AlertTriangle, RefreshCw, Filter } from 'lucide-react';

export const SkeletonTileGrid: React.FC<{ count?: number }> = ({ count = 6 }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-4 sm:gap-5">
      {Array.from({ length: count }).map((_, i) => (
        <div 
          key={i} 
          className="bg-[#090909] border border-white/[0.08] rounded-2xl overflow-hidden p-4 space-y-4 animate-pulse"
        >
          {/* Shimmer Preview Header */}
          <div className="w-full aspect-16/10 rounded-xl bg-[#141414] flex items-center justify-center">
            <div className="w-12 h-12 rounded-lg bg-white/[0.04]" />
          </div>

          {/* Shimmer Details */}
          <div className="space-y-2.5">
            <div className="flex justify-between items-center">
              <div className="h-3 w-24 bg-white/[0.08] rounded" />
              <div className="h-3 w-12 bg-white/[0.08] rounded" />
            </div>
            <div className="h-4 w-3/4 bg-white/[0.08] rounded" />
            <div className="h-3 w-full bg-white/[0.04] rounded" />
          </div>

          {/* Shimmer Footer */}
          <div className="pt-3 border-t border-white/[0.06] flex justify-between items-center">
            <div className="h-5 w-16 bg-white/[0.08] rounded" />
            <div className="h-8 w-20 bg-white/[0.08] rounded-lg" />
          </div>
        </div>
      ))}
    </div>
  );
};

export const EmptyState: React.FC<{
  query?: string;
  onResetFilters: () => void;
}> = ({ query, onResetFilters }) => {
  return (
    <div className="py-20 text-center space-y-4 max-w-md mx-auto">
      <div className="w-16 h-16 rounded-2xl bg-[var(--bg-surface-elevated)] border border-white/[0.08] flex items-center justify-center mx-auto text-zinc-500 shadow-sm">
        <SearchX className="w-8 h-8 text-white" />
      </div>

      <div className="space-y-1.5">
        <h3 className="text-lg font-bold text-white tracking-tight">No digital assets found</h3>
        <p className="text-xs text-zinc-400 leading-relaxed [text-wrap:pretty]">
          {query 
            ? `We couldn't find any digital downloads matching "${query}".`
            : "No digital downloads match your current filter selections."}
        </p>
      </div>

      <div className="pt-2 flex justify-center">
        <button
          type="button"
          onClick={onResetFilters}
          className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white hover:bg-zinc-200 text-[var(--bg-base)] text-xs font-bold transition-all shadow-sm cursor-pointer"
        >
          <Filter className="w-3.5 h-3.5" />
          <span>Reset All Filters</span>
        </button>
      </div>
    </div>
  );
};

export const ErrorState: React.FC<{
  errorMessage: string;
  onRetry: () => void;
}> = ({ errorMessage, onRetry }) => {
  return (
    <div className="py-20 text-center space-y-4 max-w-md mx-auto">
      <div className="w-16 h-16 rounded-2xl bg-white/[0.08] border border-white/20 flex items-center justify-center mx-auto text-white shadow-sm">
        <AlertTriangle className="w-8 h-8 text-white" />
      </div>

      <div className="space-y-1.5">
        <h3 className="text-lg font-bold text-white tracking-tight">Unable to Load Catalog</h3>
        <p className="text-xs text-zinc-400 leading-relaxed font-mono">
          {errorMessage}
        </p>
      </div>

      <div className="pt-2 flex justify-center">
        <button
          type="button"
          onClick={onRetry}
          className="flex items-center gap-2 px-4 py-2 rounded-xl bg-[var(--bg-surface-elevated)] border border-white/[0.12] text-white hover:bg-white/[0.06] text-xs font-bold transition-all cursor-pointer shadow-xs"
        >
          <RefreshCw className="w-3.5 h-3.5" />
          <span>Retry Connection</span>
        </button>
      </div>
    </div>
  );
};
