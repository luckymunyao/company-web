import React, { useState, useEffect, useMemo } from 'react';
import { servicesData } from '../data/content';
import ServiceCard from './ServiceCard';
import ServiceCardSkeleton from './ServiceCardSkeleton';

const serviceCategories = [
    'All', 
    'Security & Infrastructure', 
    'Growth & Marketing', 
    'Development & Training', 
    'Business Strategy'
];

const Services: React.FC = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState('All');

  useEffect(() => {
    // Simulate a network request
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500);
    return () => clearTimeout(timer);
  }, []);

  const filteredServices = useMemo(() => {
    if (activeCategory === 'All') {
      return servicesData;
    }
    return servicesData.filter(service => service.category === activeCategory);
  }, [activeCategory]);

  return (
    <section id="services" className="py-20 bg-slate-50 dark:bg-slate-900">
      <div className="container mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white">Our Core Services</h2>
          <p className="text-lg text-slate-600 dark:text-slate-400 mt-4 max-w-2xl mx-auto">
            We offer a comprehensive range of IT services designed to meet the unique needs of your business.
          </p>
        </div>

        {/* Filter Buttons */}
        <div className="flex flex-wrap justify-center gap-2 mb-10">
          {serviceCategories.map(category => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              aria-pressed={activeCategory === category}
              className={`px-4 py-2 text-sm font-semibold rounded-full transition-all duration-300 active:scale-95 ${
                activeCategory === category
                  ? 'bg-indigo-600 text-white shadow-md'
                  : 'bg-white text-slate-700 hover:bg-slate-100 dark:bg-slate-800 dark:text-slate-300 dark:hover:bg-slate-700'
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {isLoading
            ? Array.from({ length: 6 }).map((_, index) => <ServiceCardSkeleton key={index} />)
            : filteredServices.map((service, index) => (
                <ServiceCard key={service.title} service={service} index={index} />
              ))}
        </div>
      </div>
    </section>
  );
};

export default Services;