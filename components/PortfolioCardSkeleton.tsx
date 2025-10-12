import React from 'react';

const PortfolioCardSkeleton: React.FC = () => {
  return (
    <div className="bg-white dark:bg-slate-800 rounded-xl shadow-lg overflow-hidden animate-pulse">
      <div className="bg-slate-200 dark:bg-slate-700 h-60 w-full"></div>
      <div className="p-6">
        <div className="h-6 bg-slate-200 dark:bg-slate-700 rounded w-3/4 mb-2"></div>
        <div className="h-4 bg-slate-200 dark:bg-slate-700 rounded w-1/3 mb-4"></div>
        <div className="space-y-2 mb-4">
          <div className="h-4 bg-slate-200 dark:bg-slate-700 rounded"></div>
          <div className="h-4 bg-slate-200 dark:bg-slate-700 rounded w-5/6"></div>
        </div>
        <div className="flex flex-wrap gap-2">
          <div className="h-5 bg-slate-200 dark:bg-slate-700 rounded-full w-20"></div>
          <div className="h-5 bg-slate-200 dark:bg-slate-700 rounded-full w-24"></div>
          <div className="h-5 bg-slate-200 dark:bg-slate-700 rounded-full w-16"></div>
        </div>
      </div>
    </div>
  );
};

export default PortfolioCardSkeleton;