import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import type { Service } from '../types';
import { servicesData } from '../data/content';
import CheckIcon from './icons/CheckIcon';
import ArrowRightIcon from './icons/ArrowRightIcon';
import ChevronDownIcon from './icons/ChevronDownIcon';

const serviceCategories = [
    'All', 
    'Security & Infrastructure', 
    'Growth & Marketing', 
    'Development & Training', 
    'Business Strategy'
];

interface SolutionsExplorerProps {
  trackInterest: (interest: string) => void;
}

const SolutionsExplorer: React.FC<SolutionsExplorerProps> = ({ trackInterest }) => {
    const [activeCategory, setActiveCategory] = useState('All');
    const [selectedService, setSelectedService] = useState<Service>(servicesData[0]);
    const [sortBy, setSortBy] = useState('default'); // 'default', 'alphabetical', 'popularity'

    const displayedServices = useMemo(() => {
        // 1. Filter by category
        let services = activeCategory === 'All' 
            ? [...servicesData] // Create a mutable copy
            : servicesData.filter(service => service.category === activeCategory);
        
        // 2. Sort based on sortBy state
        switch (sortBy) {
            case 'alphabetical':
                services.sort((a, b) => a.title.localeCompare(b.title));
                break;
            case 'popularity':
                try {
                    const popularity = JSON.parse(localStorage.getItem('servicePopularity') || '{}');
                    services.sort((a, b) => (popularity[b.title] || 0) - (popularity[a.title] || 0));
                } catch (error) {
                    console.error("Could not sort by popularity:", error);
                }
                break;
            case 'default':
            default:
                // For default, we need to restore the original order if it's been sorted before.
                // Re-filtering is the simplest way to ensure this.
                 services = activeCategory === 'All' 
                    ? [...servicesData]
                    : servicesData.filter(service => service.category === activeCategory);
                break;
        }

        return services;
    }, [activeCategory, sortBy]);
    
    // Update selected service if it's not in the new filtered list
    React.useEffect(() => {
        if (!displayedServices.find(s => s.title === selectedService.title)) {
            setSelectedService(displayedServices[0] || servicesData[0]);
        }
    }, [displayedServices, selectedService.title]);

  const handleServiceLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, serviceTitle: string) => {
    e.preventDefault();

    const contactFormElement = document.getElementById('contact');

    // Programmatically scroll to the form with smooth behavior
    if (contactFormElement) {
      contactFormElement.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }

    // Update URL hash and manually trigger event for ContactForm to pick up the change.
    // This ensures the form is pre-filled without a harsh page jump.
    history.replaceState(null, '', `#contact?service=${encodeURIComponent(serviceTitle)}`);
    window.dispatchEvent(new HashChangeEvent('hashchange'));
  };

  const handleSelectService = (service: Service) => {
    setSelectedService(service);
    trackInterest(service.category);
    // Track service popularity in localStorage
    try {
        const popularity = JSON.parse(localStorage.getItem('servicePopularity') || '{}');
        popularity[service.title] = (popularity[service.title] || 0) + 1;
        localStorage.setItem('servicePopularity', JSON.stringify(popularity));
    } catch (error) {
        console.error("Failed to track service popularity:", error);
    }
  }

  return (
    <section id="solutions" className="py-20 bg-white dark:bg-slate-950">
      <div className="container mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white">Our Solutions Explorer</h2>
          <p className="text-lg text-slate-600 dark:text-slate-400 mt-4 max-w-3xl mx-auto">
            An interactive guide to our comprehensive suite of services. Select a category or service to learn how we can help you achieve your goals.
          </p>
        </div>
        
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mb-10">
            <div className="relative w-full sm:w-auto overflow-hidden">
                <div className="flex space-x-2 overflow-x-auto pb-2 hide-scrollbar">
                    {serviceCategories.map(category => (
                        <button
                            key={category}
                            onClick={() => setActiveCategory(category)}
                            aria-pressed={activeCategory === category}
                            className={`px-4 py-2 text-sm font-semibold rounded-full transition-all duration-300 flex-shrink-0 active:scale-95 ${
                                activeCategory === category 
                                ? 'bg-indigo-600 text-white shadow-md' 
                                : 'bg-slate-100 text-slate-700 hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-300 dark:hover:bg-slate-700'
                            }`}
                        >
                            {category}
                        </button>
                    ))}
                </div>
            </div>
            <div className="relative flex-shrink-0 w-full sm:w-auto">
                <label htmlFor="sort-services" className="sr-only">Sort Services</label>
                <select
                    id="sort-services"
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="w-full sm:w-auto appearance-none pr-10 pl-4 py-2 border border-slate-300 dark:border-slate-700 rounded-md bg-white dark:bg-slate-800 text-sm font-semibold focus:ring-indigo-500 focus:border-indigo-500 transition"
                >
                    <option value="default">Sort by: Default</option>
                    <option value="alphabetical">Sort by: Alphabetical</option>
                    <option value="popularity">Sort by: Popularity</option>
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-slate-700 dark:text-slate-300">
                    <ChevronDownIcon />
                </div>
            </div>
        </div>

        <div className="md:grid md:grid-cols-12 md:gap-12 min-h-[500px]">
            <div className="md:col-span-4 lg:col-span-3 mb-8 md:mb-0">
                <div className="space-y-2">
                    {displayedServices.map(service => (
                        <button
                            key={service.title}
                            onClick={() => handleSelectService(service)}
                            aria-pressed={selectedService.title === service.title}
                            className={`w-full text-left p-3 rounded-lg transition-all duration-300 text-md font-medium flex items-center gap-3 active:scale-95 ${
                                selectedService.title === service.title
                                ? 'bg-indigo-100 text-indigo-700 dark:bg-indigo-500/10 dark:text-indigo-400 shadow-sm'
                                : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900 dark:text-slate-300 dark:hover:bg-slate-800 dark:hover:text-white'
                            }`}
                        >
                            <span className="flex-shrink-0">{service.icon}</span>
                            <span>{service.title}</span>
                        </button>
                    ))}
                </div>
            </div>
            <div className="md:col-span-8 lg:col-span-9" aria-live="polite">
                <div key={selectedService.title} className="bg-slate-50 dark:bg-slate-800/50 p-8 rounded-xl shadow-inner animate-fade-in">
                    <div className="flex items-center gap-4 mb-4">
                         <div className="bg-indigo-100 text-indigo-600 dark:bg-indigo-500/10 dark:text-indigo-400 rounded-full p-3">
                            {selectedService.icon}
                        </div>
                        <h3 className="text-2xl font-bold text-slate-900 dark:text-white">{selectedService.title}</h3>
                    </div>
                    <p className="text-slate-600 dark:text-slate-400 leading-relaxed mb-6">{selectedService.description}</p>
                    
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
                        <div>
                            <h4 className="text-lg font-semibold text-slate-800 dark:text-slate-200 mb-3">Key Benefits</h4>
                            <ul className="space-y-1">
                                {selectedService.keyBenefits.map(benefit => (
                                     <li key={benefit} className="group">
                                        <a href={`#contact?service=${encodeURIComponent(selectedService.title)}`} onClick={(e) => handleServiceLinkClick(e, selectedService.title)} title={`Inquire about ${benefit}`} className="flex items-start p-1 rounded-md hover:bg-slate-100 dark:hover:bg-slate-700/50 transition-colors duration-200">
                                            <span className="text-green-500 mt-1 mr-2 flex-shrink-0"><CheckIcon /></span>
                                            <span className="flex-grow text-slate-600 dark:text-slate-400 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors duration-200">
                                                {benefit}
                                            </span>
                                        </a>
                                    </li>
                                ))}
                            </ul>
                        </div>
                         <div>
                            <h4 className="text-lg font-semibold text-slate-800 dark:text-slate-200 mb-3">What This Includes</h4>
                            <ul className="space-y-1">
                                {selectedService.includes.map(item => (
                                     <li key={item} className="group">
                                        <a href={`#contact?service=${encodeURIComponent(selectedService.title)}`} onClick={(e) => handleServiceLinkClick(e, selectedService.title)} title={`Inquire about ${item}`} className="flex items-start p-1 rounded-md hover:bg-slate-100 dark:hover:bg-slate-700/50 transition-colors duration-200">
                                            <span className="text-indigo-500 mt-1 mr-2 flex-shrink-0"><CheckIcon /></span>
                                            <span className="flex-grow text-slate-600 dark:text-slate-400 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors duration-200">
                                                {item}
                                            </span>
                                        </a>
                                    </li>

                                ))}
                            </ul>
                        </div>
                    </div>
                    
                    <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
                        <a href={`#contact?service=${encodeURIComponent(selectedService.title)}`} onClick={(e) => handleServiceLinkClick(e, selectedService.title)} className="group inline-flex items-center justify-center gap-2 bg-indigo-600 text-white font-semibold px-6 py-3 rounded-md hover:bg-indigo-700 transition-all duration-300 shadow-md active:scale-95 transform hover:scale-105">
                            <span>Get a Quote for this Service</span>
                            <span className="transition-transform duration-300 group-hover:translate-x-1">
                                <ArrowRightIcon />
                            </span>
                        </a>
                         {selectedService.relatedPostSlug && (
                            <Link 
                                to={`/blog/${selectedService.relatedPostSlug}`}
                                className="group inline-flex items-center gap-2 font-semibold text-indigo-600 dark:text-indigo-400 hover:underline"
                            >
                                <span>Read Related Article</span>
                                <span className="transition-transform duration-300 group-hover:translate-x-1">
                                    <ArrowRightIcon />
                                </span>
                            </Link>
                        )}
                    </div>
                </div>
            </div>
        </div>
      </div>
       <style>{`
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in {
          animation: fade-in 0.5s ease-out forwards;
        }
        .hide-scrollbar {
          -ms-overflow-style: none;  /* IE and Edge */
          scrollbar-width: none;  /* Firefox */
        }
        .hide-scrollbar::-webkit-scrollbar {
          display: none; /* Chrome, Safari and Opera */
        }
      `}</style>
    </section>
  );
};

export default SolutionsExplorer;