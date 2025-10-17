import React, { useState, useEffect, useRef } from 'react';
import type { Service } from '../types';

interface ServiceCardProps {
  service: Service;
  index: number;
}

const ServiceCard: React.FC<ServiceCardProps> = ({ service, index }) => {
  const [isVisible, setIsVisible] = useState(false);
  const cardRef = useRef<HTMLAnchorElement | null>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
            observer.unobserve(entry.target); // Stop observing once visible to prevent re-animation
          }
        });
      },
      {
        threshold: 0.1, // Trigger when 10% of the item is visible
      }
    );

    if (cardRef.current) {
      observer.observe(cardRef.current);
    }

    return () => {
      if (cardRef.current) {
        // eslint-disable-next-line react-hooks/exhaustive-deps
        observer.unobserve(cardRef.current);
      }
    };
  }, []);

  return (
    <a 
      href="#contact"
      ref={cardRef}
      className={`group bg-white dark:bg-slate-800 p-8 rounded-xl shadow-lg hover:shadow-2xl hover:-translate-y-2 transition-all duration-700 ease-out transform flex flex-col items-center text-center ${
        isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-12'
      }`}
      style={{ transitionDelay: `${index * 100}ms` }}
    >
      <div className="bg-indigo-100 dark:bg-indigo-900/50 text-indigo-600 dark:text-indigo-400 rounded-full p-4 mb-6 transition-all duration-300 group-hover:bg-indigo-200 dark:group-hover:bg-indigo-900 group-hover:scale-110">
        {service.icon}
      </div>
      <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3 transition-colors duration-300 group-hover:text-indigo-600 dark:group-hover:text-indigo-400">{service.title}</h3>
      <p className="text-slate-600 dark:text-slate-400 leading-relaxed">{service.description}</p>
    </a>
  );
};

export default ServiceCard;