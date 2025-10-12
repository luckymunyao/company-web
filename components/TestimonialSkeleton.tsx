import React from 'react';
import QuoteIcon from './icons/QuoteIcon';

const TestimonialSkeleton: React.FC = () => {
  return (
    <div className="max-w-3xl mx-auto animate-pulse">
        <div className="overflow-hidden relative h-[380px] sm:h-[320px]">
            <div className="w-full flex-shrink-0 p-4">
                <div className="bg-slate-50 dark:bg-slate-800 p-8 rounded-xl shadow-lg flex flex-col h-full justify-between">
                    <div className="mb-6">
                        <QuoteIcon />
                        <div className="space-y-3 mt-4">
                            <div className="h-4 bg-slate-200 dark:bg-slate-700 rounded w-full"></div>
                            <div className="h-4 bg-slate-200 dark:bg-slate-700 rounded w-full"></div>
                            <div className="h-4 bg-slate-200 dark:bg-slate-700 rounded w-4/5"></div>
                        </div>
                    </div>
                    <div className="flex items-center">
                        <div className="w-14 h-14 rounded-full bg-slate-200 dark:bg-slate-700 mr-4"></div>
                        <div className="flex-1">
                            <div className="h-5 bg-slate-200 dark:bg-slate-700 rounded w-1/3 mb-2"></div>
                            <div className="h-4 bg-slate-200 dark:bg-slate-700 rounded w-1/2"></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div className="flex items-center justify-center gap-2 pt-6">
            <div className="w-3 h-3 rounded-full bg-slate-300 dark:bg-slate-600"></div>
            <div className="w-3 h-3 rounded-full bg-slate-300 dark:bg-slate-600"></div>
            <div className="w-3 h-3 rounded-full bg-slate-300 dark:bg-slate-600"></div>
        </div>
    </div>
  );
};

export default TestimonialSkeleton;