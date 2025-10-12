import React from 'react';

const ServiceCardSkeleton: React.FC = () => {
  return (
    <div className="bg-white dark:bg-slate-800 p-8 rounded-xl shadow-lg animate-pulse">
      <div className="flex flex-col items-center text-center">
        <div className="bg-slate-200 dark:bg-slate-700 rounded-full p-4 mb-6 h-20 w-20"></div>
        <div className="h-6 bg-slate-200 dark:bg-slate-700 rounded w-3/4 mb-4"></div>
        <div className="space-y-2 w-full">
          <div className="h-4 bg-slate-200 dark:bg-slate-700 rounded w-full"></div>
          <div className="h-4 bg-slate-200 dark:bg-slate-700 rounded w-full"></div>
          <div className="h-4 bg-slate-200 dark:bg-slate-700 rounded w-5/6 mx-auto"></div>
        </div>
      </div>
    </div>
  );
};

export default ServiceCardSkeleton;