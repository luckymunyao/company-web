import React from 'react';
import type { Service } from '../types';
import SparklesIcon from './icons/SparklesIcon';
import ArrowRightIcon from './icons/ArrowRightIcon';

interface AIServiceRecommendationsProps {
  recommendedServices: Service[];
}

const AIServiceRecommendations: React.FC<AIServiceRecommendationsProps> = ({ recommendedServices }) => {
  if (!recommendedServices || recommendedServices.length === 0) {
    return null; // Don't render the section if there's nothing to show
  }

  const handleServiceLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, serviceTitle: string) => {
    e.preventDefault();
    const contactFormElement = document.getElementById('contact');
    if (contactFormElement) {
      contactFormElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
    history.replaceState(null, '', `#contact?service=${encodeURIComponent(serviceTitle)}`);
    window.dispatchEvent(new HashChangeEvent('hashchange'));
  };

  return (
    <section id="recommendations" className="py-20 bg-slate-50 dark:bg-slate-900">
      <div className="container mx-auto px-6">
        <div className="text-center mb-12">
          <div className="flex justify-center items-center gap-2 mb-2">
            <SparklesIcon />
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white">Recommended For You</h2>
            <SparklesIcon />
          </div>
          <p className="text-lg text-slate-600 dark:text-slate-400 mt-4 max-w-2xl mx-auto">
            Based on your interests, here are a few services we think you'll find valuable.
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {recommendedServices.map((service, index) => (
            <div
              key={service.title}
              className="group bg-white dark:bg-slate-800 p-8 rounded-xl shadow-lg hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 ease-out transform flex flex-col items-center text-center"
              style={{ transitionDelay: `${index * 100}ms` }}
            >
              <div className="bg-indigo-100 dark:bg-indigo-900/50 text-indigo-600 dark:text-indigo-400 rounded-full p-4 mb-6 transition-colors duration-300 group-hover:bg-indigo-200 dark:group-hover:bg-indigo-800/50">
                {service.icon}
              </div>
              <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3 transition-colors duration-300 group-hover:text-indigo-600 dark:group-hover:text-indigo-400">{service.title}</h3>
              <p className="text-slate-600 dark:text-slate-400 leading-relaxed mb-6 flex-grow">{service.description.substring(0, 100)}...</p>
              <a 
                href={`#contact?service=${encodeURIComponent(service.title)}`}
                onClick={(e) => handleServiceLinkClick(e, service.title)}
                className="inline-flex items-center font-semibold text-indigo-600 dark:text-indigo-400 group-hover:text-indigo-500 transition-colors duration-300"
              >
                  Learn More
                  <span className="transition-transform duration-300 group-hover:translate-x-1 ml-1">
                      <ArrowRightIcon />
                  </span>
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AIServiceRecommendations;