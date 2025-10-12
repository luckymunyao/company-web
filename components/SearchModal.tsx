import React, { useState, useEffect, useRef } from 'react';
import { servicesData, blogPostsData, faqData } from '../data/content';

import SearchIcon from './icons/SearchIcon';
import CloseIcon from './icons/CloseIcon';
import WrenchScrewdriverIcon from './icons/WrenchScrewdriverIcon';
import BookOpenIcon from './icons/BookOpenIcon';
import QuestionMarkCircleIcon from './icons/QuestionMarkCircleIcon';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface SearchResultItem {
    title: string;
    snippet: string;
    href: string;
}

interface SearchResults {
    services: SearchResultItem[];
    blog: SearchResultItem[];
    faq: SearchResultItem[];
}

const categoryConfig = {
    services: { icon: <WrenchScrewdriverIcon />, title: 'Services' },
    blog: { icon: <BookOpenIcon />, title: 'Blog Posts' },
    faq: { icon: <QuestionMarkCircleIcon />, title: 'FAQs' },
};

const SearchModal: React.FC<SearchModalProps> = ({ isOpen, onClose }) => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<SearchResults | null>(null);
  const [expandedCategories, setExpandedCategories] = useState<Record<string, boolean>>({});
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleKeyDown);
      setTimeout(() => inputRef.current?.focus(), 100);
    } else {
      // Reset state when closing
      setQuery('');
      setResults(null);
      setExpandedCategories({});
    }

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);
  
  const handleSearch = (searchQuery: string) => {
    if (!searchQuery.trim()) {
      setResults(null);
      return;
    };

    setExpandedCategories({});
    const lowerCaseQuery = searchQuery.toLowerCase();

    const serviceResults = servicesData
      .filter(service => 
        service.title.toLowerCase().includes(lowerCaseQuery) ||
        service.description.toLowerCase().includes(lowerCaseQuery) ||
        service.keyBenefits.some(b => b.toLowerCase().includes(lowerCaseQuery)) ||
        service.includes.some(i => i.toLowerCase().includes(lowerCaseQuery))
      )
      .map(service => ({
        title: service.title,
        snippet: service.description.substring(0, 120) + '...',
        href: '#solutions'
      }));

    const blogResults = blogPostsData
      .filter(post => 
        post.title.toLowerCase().includes(lowerCaseQuery) ||
        post.excerpt.toLowerCase().includes(lowerCaseQuery)
      )
      .map(post => ({
        title: post.title,
        snippet: post.excerpt,
        href: '#blog'
      }));

    const faqResults = faqData
      .filter(faq => 
        faq.question.toLowerCase().includes(lowerCaseQuery) ||
        faq.answer.toLowerCase().includes(lowerCaseQuery)
      )
      .map(faq => ({
        title: faq.question,
        snippet: faq.answer.substring(0, 120) + '...',
        href: '#faq'
      }));

    setResults({
        services: serviceResults,
        blog: blogResults,
        faq: faqResults,
    });
  };

  const handleQueryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newQuery = e.target.value;
    setQuery(newQuery);
    handleSearch(newQuery);
  }

  const hasResults = results && (results.services.length > 0 || results.blog.length > 0 || results.faq.length > 0);

  if (!isOpen) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Search"
      className="fixed inset-0 z-[100] flex items-start justify-center p-4 pt-[10vh] sm:pt-[15vh] bg-slate-900/50 backdrop-blur-sm animate-fade-in-fast"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-2xl bg-white dark:bg-slate-800 rounded-xl shadow-2xl animate-slide-down-fast flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="relative flex-shrink-0">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 text-slate-500 hover:text-slate-800 dark:hover:text-slate-200 transition-colors rounded-full"
            aria-label="Close search"
          >
            <CloseIcon />
          </button>
          <form onSubmit={(e) => e.preventDefault()}>
            <div className="relative">
              <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-6 text-slate-500 dark:text-slate-400">
                <SearchIcon />
              </div>
              <input
                ref={inputRef}
                type="search"
                name="search"
                value={query}
                onChange={handleQueryChange}
                placeholder="Search services, blog, and more..."
                className="w-full bg-transparent p-6 pl-16 pr-12 text-lg text-slate-800 dark:text-slate-200 placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:ring-0 border-0"
                autoComplete="off"
              />
            </div>
          </form>
        </div>
        
        <div className="overflow-y-auto max-h-[60vh] border-t border-slate-200 dark:border-slate-700">
          {query.trim() && results && (
            !hasResults ? (
                <div className="p-10 text-center text-slate-500 dark:text-slate-400">
                    <h3 className="font-semibold text-slate-700 dark:text-slate-300">No results found for "{query}"</h3>
                    <p className="text-sm mt-1">Try searching for something else.</p>
                </div>
            ) : (
                <div className="p-4 sm:p-6">
                    {(Object.keys(results) as Array<keyof SearchResults>).map(key => {
                        const items = results[key];
                        if (items.length === 0) return null;
                        const config = categoryConfig[key];
                        const isExpanded = expandedCategories[key] || false;
                        const visibleItems = isExpanded ? items : items.slice(0, 3);

                        return (
                            <div key={key} className="mb-6 last:mb-0">
                                <div className="flex items-center gap-2 mb-2 px-2">
                                    {config.icon}
                                    <h3 className="text-sm font-bold uppercase tracking-wider text-slate-600 dark:text-slate-400">{config.title}</h3>
                                </div>
                                <ul>
                                    {visibleItems.map(item => (
                                        <li key={item.title}>
                                            <a href={item.href} onClick={onClose} className="block p-3 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-700/50 transition-colors">
                                                <p className="font-semibold text-indigo-600 dark:text-indigo-400">{item.title}</p>
                                                <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">{item.snippet}</p>
                                            </a>
                                        </li>
                                    ))}
                                </ul>
                                {items.length > 3 && (
                                    <button 
                                        onClick={() => setExpandedCategories(prev => ({...prev, [key]: !prev[key]}))}
                                        className="text-sm font-semibold text-indigo-600 dark:text-indigo-400 hover:underline px-3 py-2"
                                    >
                                        {isExpanded ? 'See Less' : `See ${items.length - 3} More`}
                                    </button>
                                )}
                            </div>
                        );
                    })}
                </div>
            )
          )}
           {!query.trim() && (
               <div className="p-10 text-center text-slate-500 dark:text-slate-400">
                    <h3 className="font-semibold text-slate-700 dark:text-slate-300">Start typing to search</h3>
                    <p className="text-sm mt-1">Find information about our services, blog posts, and FAQs.</p>
                </div>
           )}
        </div>
      </div>
       <style>{`
        @keyframes fade-in-fast { from { opacity: 0; } to { opacity: 1; } }
        @keyframes slide-down-fast { from { opacity: 0; transform: translateY(-20px); } to { opacity: 1; transform: translateY(0); } }
        .animate-fade-in-fast { animation: fade-in-fast 0.2s ease-out forwards; }
        .animate-slide-down-fast { animation: slide-down-fast 0.3s ease-out forwards; }
      `}</style>
    </div>
  );
};

export default SearchModal;