import React from 'react';
import { SearchX, AlertTriangle, RefreshCw, Filter } from 'lucide-react';

export const SkeletonTileGrid: React.FC<{ count?: number }> = ({ count = 6 }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-4 sm:gap-5">
      {Array.from({ length: count }).map((_, i) => (
        <div 
          key={i} 
          className="bg-white border border-stone-200/80 rounded-2xl overflow-hidden p-4 space-y-4 shadow-2xs animate-pulse"
        >
          {/* Shimmer Preview Header */}
          <div className="w-full aspect-16/10 rounded-xl bg-stone-100 flex items-center justify-center">
            <div className="w-12 h-12 rounded-xl bg-stone-200/80" />
          </div>

          {/* Shimmer Details */}
          <div className="space-y-2.5">
            <div className="flex justify-between items-center">
              <div className="h-3 w-24 bg-stone-200 rounded" />
              <div className="h-3 w-12 bg-stone-200 rounded" />
            </div>
            <div className="h-4 w-3/4 bg-stone-200 rounded" />
            <div className="h-3 w-full bg-stone-100 rounded" />
          </div>

          {/* Shimmer Footer */}
          <div className="pt-3 border-t border-stone-100 flex justify-between items-center">
            <div className="h-5 w-16 bg-stone-200 rounded" />
            <div className="h-8 w-20 bg-stone-200 rounded-xl" />
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
      <div className="w-16 h-16 rounded-2xl bg-stone-100 border border-stone-200 flex items-center justify-center mx-auto text-stone-400 shadow-sm">
        <SearchX className="w-8 h-8 text-[#e06344]" />
      </div>

      <div className="space-y-1.5">
        <h3 className="text-lg font-bold text-stone-900">No digital assets found</h3>
        <p className="text-xs text-stone-600 leading-relaxed [text-wrap:pretty]">
          {query 
            ? `We couldn't find any digital downloads matching "${query}".`
            : "No digital downloads match your current filter selections."}
        </p>
      </div>

      <div className="pt-2 flex justify-center">
        <button
          type="button"
          onClick={onResetFilters}
          className="flex items-center gap-2 px-4 py-2 rounded-xl keycap-soft-dark text-white text-xs font-bold transition-all shadow-sm cursor-pointer"
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
      <div className="w-16 h-16 rounded-2xl bg-rose-50 border border-rose-200 flex items-center justify-center mx-auto text-rose-600 shadow-sm">
        <AlertTriangle className="w-8 h-8" />
      </div>

      <div className="space-y-1.5">
        <h3 className="text-lg font-bold text-stone-900">Unable to Load Catalog</h3>
        <p className="text-xs text-stone-600 leading-relaxed font-mono">
          {errorMessage}
        </p>
      </div>

      <div className="pt-2 flex justify-center">
        <button
          type="button"
          onClick={onRetry}
          className="flex items-center gap-2 px-4 py-2 rounded-xl keycap-soft-light text-stone-800 text-xs font-bold transition-all cursor-pointer shadow-xs"
        >
          <RefreshCw className="w-3.5 h-3.5" />
          <span>Retry Connection</span>
        </button>
      </div>
    </div>
  );
};
