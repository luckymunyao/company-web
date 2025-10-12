import React, { useState, useEffect } from 'react';
import type { Project } from '../types';
import PortfolioCardSkeleton from './PortfolioCardSkeleton';

const projectsData: Project[] = [
  {
    title: 'Enterprise CRM Platform',
    client: 'Innovate Corp',
    description: 'Developed a custom CRM platform to streamline sales and customer support processes, resulting in a 30% increase in team efficiency.',
    imageUrl: 'https://picsum.photos/500/300?random=10',
    tags: ['React', 'Node.js', 'Salesforce Integration'],
  },
  {
    title: 'E-commerce Website Redesign',
    client: 'Fashion Hub',
    description: 'A complete redesign of their online store with a focus on mobile-first user experience, which boosted conversion rates by 25%.',
    imageUrl: 'https://picsum.photos/500/300?random=11',
    tags: ['Shopify', 'UI/UX', 'Performance Optimization'],
  },
  {
    title: 'Cybersecurity Audit & Upgrade',
    client: 'SecureBank',
    description: 'Conducted a thorough security audit and implemented a multi-layered defense system to protect sensitive financial data against modern threats.',
    imageUrl: 'https://picsum.photos/500/300?random=12',
    tags: ['Cybersecurity', 'Compliance', 'Penetration Testing'],
  },
   {
    title: 'Data Analytics Dashboard',
    client: 'HealthData Inc.',
    description: 'Built a real-time data analytics dashboard to visualize patient data, enabling healthcare providers to make faster, more informed decisions.',
    imageUrl: 'https://picsum.photos/500/300?random=13',
    tags: ['Tableau', 'Big Data', 'Healthcare IT'],
  },
];

const Portfolio: React.FC = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate a network request
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <section id="portfolio" className="py-20 bg-slate-50 dark:bg-slate-900">
      <div className="container mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white">Our Recent Work</h2>
          <p className="text-lg text-slate-600 dark:text-slate-400 mt-4 max-w-2xl mx-auto">
            We are proud of the solutions we've delivered. Here's a glimpse of our impact.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {isLoading
            ? Array.from({ length: 4 }).map((_, index) => <PortfolioCardSkeleton key={index} />)
            : projectsData.map((project, index) => (
                <div key={index} className="group bg-white dark:bg-slate-800 rounded-xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-2xl hover:-translate-y-2">
                  <div className="relative overflow-hidden h-60">
                    <img src={project.imageUrl} alt={project.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                    <div className="absolute inset-0 bg-black/20"></div>
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">{project.title}</h3>
                    <p className="text-sm font-semibold text-indigo-600 dark:text-indigo-400 mb-3">{project.client}</p>
                    <p className="text-slate-600 dark:text-slate-400 leading-relaxed mb-4">{project.description}</p>
                    <div className="flex flex-wrap gap-2">
                      {project.tags.map(tag => (
                        <span key={tag} className="bg-slate-200 text-slate-700 dark:bg-slate-700 dark:text-slate-300 text-xs font-medium px-2.5 py-1 rounded-full">{tag}</span>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
        </div>
      </div>
    </section>
  );
};

export default Portfolio;