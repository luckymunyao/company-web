import React, { useState, useEffect, useMemo } from 'react';
import type { Project } from '../types';
import PortfolioCardSkeleton from './PortfolioCardSkeleton';
import ProjectModal from './ProjectModal';

const projectsData: Project[] = [
  {
    title: 'Enterprise CRM Platform',
    client: 'Innovate Corp',
    description: 'Developed a custom CRM platform to streamline sales and customer support processes, resulting in a 30% increase in team efficiency. The platform features advanced contact management, sales pipeline tracking, automated reporting, and seamless integration with third-party APIs for enhanced functionality. Our focus was on creating an intuitive UI to ensure rapid user adoption.',
    imageUrl: 'https://picsum.photos/seed/project10',
    tags: ['React', 'Node.js', 'Salesforce Integration'],
  },
  {
    title: 'E-commerce Website Redesign',
    client: 'Fashion Hub',
    description: 'A complete redesign of their online store with a focus on mobile-first user experience, which boosted conversion rates by 25%. We implemented a headless architecture using Shopify as the backend, providing greater flexibility and performance. The new design includes features like a visual search, personalized recommendations, and a streamlined one-page checkout process.',
    imageUrl: 'https://picsum.photos/seed/project11',
    tags: ['Shopify', 'UI/UX', 'Performance Optimization'],
  },
   {
    title: 'Threat Intelligence Platform',
    client: 'SecureNet',
    description: 'Implemented an advanced threat intelligence platform that aggregates data from multiple sources to provide real-time alerts on potential security breaches. This led to a 60% faster incident response time for their security team.',
    imageUrl: 'https://picsum.photos/seed/project12',
    tags: ['Cybersecurity', 'Big Data', 'SIEM'],
  },
  {
    title: 'Cloud Migration for SaaS Platform',
    client: 'ScaleUp Solutions',
    description: 'Migrated a monolithic SaaS application to a scalable, microservices-based architecture on AWS. The project involved containerization with Docker and orchestration with Kubernetes, resulting in a 50% reduction in infrastructure costs and improved deployment times.',
    imageUrl: 'https://picsum.photos/seed/project14',
    tags: ['Cloud', 'AWS', 'Kubernetes', 'DevOps'],
  },
  {
    title: 'Mobile Banking App UI/UX',
    client: 'Fintech Innovations',
    description: 'Designed a user-centric mobile banking application from the ground up, focusing on intuitive navigation and a seamless user experience. Conducted extensive user research to inform the design, resulting in a 40% increase in user engagement.',
    imageUrl: 'https://picsum.photos/seed/project15',
    tags: ['UI/UX', 'Figma', 'Mobile Design'],
  },
  {
    title: 'AI-Powered Recommendation Engine',
    client: 'StreamNow',
    description: 'Developed a machine learning model to provide personalized content recommendations for a streaming platform. The new engine increased user watch time by an average of 15% and improved user retention.',
    imageUrl: 'https://picsum.photos/seed/project16',
    tags: ['AI/ML', 'Python', 'Big Data'],
  },
   {
    title: 'Data Analytics Dashboard',
    client: 'HealthData Inc.',
    description: 'Built a real-time data analytics dashboard to visualize patient data, enabling healthcare providers to make faster, more informed decisions. The HIPAA-compliant dashboard integrates with various EMR systems, providing key metrics on patient outcomes, operational efficiency, and resource allocation, all presented through interactive charts and graphs.',
    imageUrl: 'https://picsum.photos/seed/project13',
    tags: ['Tableau', 'Big Data', 'Healthcare IT'],
  },
];

const filterTags = ['All', 'React', 'Node.js', 'UI/UX', 'Cloud', 'Cybersecurity', 'AI/ML', 'DevOps', 'AWS', 'Big Data', 'Healthcare IT', 'SIEM', 'Salesforce Integration'];

interface PortfolioProps {
  trackInterest: (interest: string) => void;
}

const Portfolio: React.FC<PortfolioProps> = ({ trackInterest }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [activeTag, setActiveTag] = useState('All');
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  useEffect(() => {
    // Simulate a network request
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500);
    return () => clearTimeout(timer);
  }, []);

  const filteredProjects = useMemo(() => {
    if (activeTag === 'All') {
      return projectsData;
    }
    return projectsData.filter(project => project.tags.includes(activeTag));
  }, [activeTag]);

  const handleTagClick = (tag: string) => {
    setActiveTag(tag);
    if (tag !== 'All') {
      trackInterest(tag);
    }
  };

  const handleProjectClick = (project: Project) => {
    setSelectedProject(project);
  };

  const handleCloseModal = () => {
    setSelectedProject(null);
  };

  return (
    <>
      <section id="portfolio" className="py-20 bg-slate-50 dark:bg-slate-900">
        <div className="container mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white">Our Recent Work</h2>
            <p className="text-lg text-slate-600 dark:text-slate-400 mt-4 max-w-2xl mx-auto">
              We are proud of the solutions we've delivered. Here's a glimpse of our impact.
            </p>
          </div>

          <div className="flex flex-wrap justify-center gap-2 mb-10">
              {filterTags.map(tag => (
                  <button
                      key={tag}
                      onClick={() => handleTagClick(tag)}
                      aria-pressed={activeTag === tag}
                      className={`px-4 py-2 text-sm font-semibold rounded-full transition-all duration-300 active:scale-95 ${
                          activeTag === tag
                          ? 'bg-indigo-600 text-white shadow-md'
                          : 'bg-white text-slate-700 hover:bg-slate-100 dark:bg-slate-800 dark:text-slate-300 dark:hover:bg-slate-700'
                      }`}
                  >
                      {tag}
                  </button>
              ))}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {isLoading
              ? Array.from({ length: 4 }).map((_, index) => <PortfolioCardSkeleton key={index} />)
              : filteredProjects.map((project) => (
                  <button 
                    key={project.title} 
                    onClick={() => handleProjectClick(project)}
                    className="group text-left bg-white dark:bg-slate-800 rounded-xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-2xl hover:-translate-y-2 animate-fade-in-short focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-slate-50 dark:focus:ring-offset-slate-900 focus:ring-indigo-500"
                    aria-label={`View details for ${project.title}`}
                  >
                    <div className="relative overflow-hidden h-60">
                      <img 
                        src={`${project.imageUrl}/500/300`} 
                        srcSet={`${project.imageUrl}/500/300 500w, ${project.imageUrl}/1000/600 1000w`}
                        sizes="(max-width: 768px) 100vw, 50vw"
                        loading="lazy"
                        decoding="async"
                        alt={project.title} 
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" 
                      />
                      <div className="absolute inset-0 bg-black/20"></div>
                    </div>
                    <div className="p-6">
                      <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">{project.title}</h3>
                      <p className="text-sm font-semibold text-indigo-600 dark:text-indigo-400 mb-3">{project.client}</p>
                      <p className="text-slate-600 dark:text-slate-400 leading-relaxed mb-4 line-clamp-2">{project.description}</p>
                      <div className="flex flex-wrap gap-2">
                        {project.tags.map(tag => (
                          <span key={tag} className="bg-slate-200 text-slate-700 dark:bg-slate-700 dark:text-slate-300 text-xs font-medium px-2.5 py-1 rounded-full">{tag}</span>
                        ))}
                      </div>
                    </div>
                  </button>
                ))}
              
              {!isLoading && filteredProjects.length === 0 && (
                  <div className="text-center col-span-1 md:col-span-2 py-12">
                      <h3 className="text-xl font-semibold text-slate-700 dark:text-slate-300">No Projects Found</h3>
                      <p className="text-slate-500 dark:text-slate-400 mt-2">There are no projects matching the tag "{activeTag}".</p>
                  </div>
              )}
          </div>
        </div>
        <style>{`
          @keyframes fade-in-short {
            from { opacity: 0; transform: translateY(10px); }
            to { opacity: 1; transform: translateY(0); }
          }
          .animate-fade-in-short {
            animation: fade-in-short 0.5s ease-out forwards;
          }
          .line-clamp-2 {
            overflow: hidden;
            display: -webkit-box;
            -webkit-box-orient: vertical;
            -webkit-line-clamp: 2;
          }
        `}</style>
      </section>
      <ProjectModal project={selectedProject} onClose={handleCloseModal} />
    </>
  );
};

export default Portfolio;