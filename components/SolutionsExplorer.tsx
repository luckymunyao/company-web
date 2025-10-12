import React, { useState, useMemo } from 'react';
import type { Service } from '../types';
import { servicesData } from '../data/content';
import CheckIcon from './icons/CheckIcon';
import ExternalLinkIcon from './icons/ExternalLinkIcon';
import ArrowRightIcon from './icons/ArrowRightIcon';

const serviceCategories = [
    'All', 
    'Security & Infrastructure', 
    'Growth & Marketing', 
    'Development & Training', 
    'Business Strategy'
];

const SolutionsExplorer: React.FC = () => {
    const [activeCategory, setActiveCategory] = useState('All');
    const [selectedService, setSelectedService] = useState<Service>(servicesData[0]);

    const filteredServices = useMemo(() => {
        if (activeCategory === 'All') return servicesData;
        return servicesData.filter(service => service.category === activeCategory);
    }, [activeCategory]);
    
    // Update selected service if it's not in the new filtered list
    React.useEffect(() => {
        if (!filteredServices.find(s => s.title === selectedService.title)) {
            setSelectedService(filteredServices[0] || servicesData[0]);
        }
    }, [filteredServices, selectedService.title]);

  return (
    <section id="solutions" className="py-20 bg-white dark:bg-slate-950">
      <div className="container mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white">Our Solutions Explorer</h2>
          <p className="text-lg text-slate-600 dark:text-slate-400 mt-4 max-w-3xl mx-auto">
            An interactive guide to our comprehensive suite of services. Select a category or service to learn how we can help you achieve your goals.
          </p>
        </div>
        
        <div className="relative mb-10">
            <div className="flex space-x-2 overflow-x-auto pb-4 hide-scrollbar">
                {serviceCategories.map(category => (
                    <button
                        key={category}
                        onClick={() => setActiveCategory(category)}
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

        <div className="md:grid md:grid-cols-12 md:gap-12 min-h-[500px]">
            <div className="md:col-span-4 lg:col-span-3 mb-8 md:mb-0">
                <div className="space-y-2">
                    {filteredServices.map(service => (
                        <button
                            key={service.title}
                            onClick={() => setSelectedService(service)}
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
            <div className="md:col-span-8 lg:col-span-9">
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
                                        <a href="#" title={`Learn more about ${benefit}`} className="flex items-start p-1 rounded-md hover:bg-slate-100 dark:hover:bg-slate-700/50 transition-colors duration-200">
                                            <span className="text-green-500 mt-1 mr-2 flex-shrink-0"><CheckIcon /></span>
                                            <span className="flex-grow text-slate-600 dark:text-slate-400 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors duration-200">
                                                {benefit}
                                            </span>
                                            <span className="ml-2 text-slate-400 opacity-0 group-hover:opacity-100 transition-opacity duration-200"><ExternalLinkIcon /></span>
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
                                        <a href="#" title={`Learn more about ${item}`} className="flex items-start p-1 rounded-md hover:bg-slate-100 dark:hover:bg-slate-700/50 transition-colors duration-200">
                                            <span className="text-indigo-500 mt-1 mr-2 flex-shrink-0"><CheckIcon /></span>
                                            <span className="flex-grow text-slate-600 dark:text-slate-400 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors duration-200">
                                                {item}
                                            </span>
                                             <span className="ml-2 text-slate-400 opacity-0 group-hover:opacity-100 transition-opacity duration-200"><ExternalLinkIcon /></span>
                                        </a>
                                    </li>

                                ))}
                            </ul>
                        </div>
                    </div>
                    
                    <a href="#contact" className="group inline-flex items-center justify-center gap-2 bg-indigo-600 text-white font-semibold px-6 py-3 rounded-md hover:bg-indigo-700 transition-all duration-300 shadow-md active:scale-95 transform hover:scale-105">
                        <span>Get a Quote for this Service</span>
                        <span className="transition-transform duration-300 group-hover:translate-x-1">
                            <ArrowRightIcon />
                        </span>
                    </a>
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