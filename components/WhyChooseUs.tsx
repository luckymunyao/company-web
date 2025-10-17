import React, { useState, useEffect, useRef } from 'react';
import UsersGroupIcon from './icons/UsersGroupIcon';
import HeartIcon from './icons/HeartIcon';
import LightBulbIcon from './icons/LightBulbIcon';

const features = [
  {
    icon: <UsersGroupIcon />,
    title: 'Expert Team',
    description: 'Our team consists of certified professionals with years of experience in their respective fields. We are passionate about technology and dedicated to continuous learning.'
  },
  {
    icon: <HeartIcon />,
    title: 'Customer-Centric Approach',
    description: 'Your success is our priority. We take the time to understand your unique challenges and goals to deliver tailored solutions that provide real business value.'
  },
  {
    icon: <LightBulbIcon />,
    title: 'Innovative Solutions',
    description: 'We stay at the forefront of technology, leveraging cutting-edge tools and methodologies to build secure, scalable, and future-proof solutions for your business.'
  }
];

const WhyChooseUs: React.FC = () => {
    const [isVisible, setIsVisible] = useState(false);
    const sectionRef = useRef<HTMLElement | null>(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
        ([entry]) => {
            if (entry.isIntersecting) {
            setIsVisible(true);
            observer.unobserve(entry.target);
            }
        },
        {
            threshold: 0.2,
        }
        );

        if (sectionRef.current) {
        observer.observe(sectionRef.current);
        }

        return () => {
        if (sectionRef.current) {
            // eslint-disable-next-line react-hooks/exhaustive-deps
            observer.unobserve(sectionRef.current);
        }
        };
  }, []);

  return (
    <section id="why-us" ref={sectionRef} className="py-20 bg-white dark:bg-slate-950">
      <div className="container mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className={`text-3xl md:text-4xl font-bold text-slate-900 dark:text-white transition-all duration-700 ease-out ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'}`}>
            Why Choose AbilityTech?
          </h2>
          <p className={`text-lg text-slate-600 dark:text-slate-400 mt-4 max-w-2xl mx-auto transition-all duration-700 ease-out delay-200 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'}`}>
            We're more than just a service provider; we're your technology partner.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div 
              key={index} 
              className={`bg-slate-50 dark:bg-slate-800/50 p-8 rounded-xl shadow-lg text-center transition-all duration-700 ease-out ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
              style={{ transitionDelay: `${200 + index * 150}ms` }}
            >
              <div className="flex justify-center mb-4">
                <div className="bg-indigo-100 dark:bg-indigo-900/50 text-indigo-600 dark:text-indigo-400 rounded-full p-4">
                  {feature.icon}
                </div>
              </div>
              <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3">{feature.title}</h3>
              <p className="text-slate-600 dark:text-slate-400 leading-relaxed">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
