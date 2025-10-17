import React, { useState, useEffect, useRef } from 'react';

// --- Custom Icons for Core Values ---

// A shield icon representing trust and reliability.
const IntegrityIcon: React.FC = () => (
    <svg className="h-8 w-8" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75m-3-7.036A11.959 11.959 0 0 1 3.598 6 11.99 11.99 0 0 0 3 9.749c0 5.592 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.286Z" />
    </svg>
);

// A lightbulb inside a head, symbolizing new ideas.
const InnovationIcon: React.FC = () => (
    <svg className="h-8 w-8" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 18v-5.25m0 0a6.01 6.01 0 0 0 1.5-.189m-1.5.189a6.01 6.01 0 0 1-1.5-.189m3.75 7.478a12.06 12.06 0 0 1-4.5 0m3.75 2.311V21m-3.75 0h7.5M12 15.75a3 3 0 0 1-3-3V4.5a3 3 0 0 1 6 0v8.25a3 3 0 0 1-3 3Z" />
    </svg>
);

// A heart inside a magnifying glass, focusing on the customer.
const CustomerCentricityIcon: React.FC = () => (
    <svg className="h-8 w-8" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z" />
    </svg>
);

// A star or award, signifying quality.
const ExcellenceIcon: React.FC = () => (
    <svg className="h-8 w-8" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904 9 18.75l-.813-2.846a4.5 4.5 0 0 0-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 0 0 3.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 0 0 3.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 0 0-3.09 3.09ZM18.259 8.715 18 9.75l-.259-1.035a3.375 3.375 0 0 0-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 0 0 2.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 0 0 2.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 0 0-2.456 2.456Z" />
    </svg>
);

const coreValues = [
    { icon: <IntegrityIcon />, title: 'Integrity', description: 'We operate with unwavering honesty and transparency, building trust through every interaction.' },
    { icon: <InnovationIcon />, title: 'Innovation', description: 'We constantly seek and implement cutting-edge solutions to solve complex problems and drive progress.' },
    { icon: <CustomerCentricityIcon />, title: 'Customer-Centricity', description: 'Our clients are at the heart of everything we do. We listen, understand, and deliver on their needs.' },
    { icon: <ExcellenceIcon />, title: 'Excellence', description: 'We are committed to the highest standards of quality, performance, and professionalism in our work.' },
];

const About: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [parallaxOffset, setParallaxOffset] = useState(0);
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
        threshold: 0.1, // Trigger when 10% is visible
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
  
  useEffect(() => {
    const handleScroll = () => {
      if (sectionRef.current) {
        const elementTop = sectionRef.current.getBoundingClientRect().top;
        const inView = elementTop < window.innerHeight && elementTop > -sectionRef.current.offsetHeight;
        if (inView) {
          const speed = -0.15;
          setParallaxOffset(elementTop * speed);
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <section id="about" ref={sectionRef} className="py-20 bg-white dark:bg-slate-950 overflow-hidden">
      <div className="container mx-auto px-6">
        {/* --- Introduction --- */}
        <div className="flex flex-col md:flex-row items-center gap-12">
          <div className="md:w-1/2 h-80 md:h-auto rounded-lg shadow-2xl overflow-hidden">
            <img 
              src="https://images.pexels.com/photos/3184418/pexels-photo-3184418.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" 
              srcSet="https://images.pexels.com/photos/3184418/pexels-photo-3184418.jpeg?auto=compress&cs=tinysrgb&w=400 400w, https://images.pexels.com/photos/3184418/pexels-photo-3184418.jpeg?auto=compress&cs=tinysrgb&w=800 800w, https://images.pexels.com/photos/3184418/pexels-photo-3184418.jpeg?auto=compress&cs=tinysrgb&w=1200 1200w"
              sizes="(max-width: 768px) 100vw, 50vw"
              loading="lazy"
              decoding="async"
              alt="Our Team Collaborating" 
              className="w-full h-full object-cover"
              style={{ 
                transform: `scale(1.2) translateY(${parallaxOffset}px)`
              }}
            />
          </div>
          <div className="md:w-1/2">
            <h2 className={`text-3xl md:text-4xl font-bold text-slate-900 dark:text-white mb-4 transition-all duration-700 ease-out ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'}`}>
              About AbilityTech
            </h2>
            <p className={`text-slate-600 dark:text-slate-400 text-lg mb-6 transition-all duration-700 ease-out delay-200 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'}`}>
              We are a team of passionate technology experts dedicated to providing innovative and reliable IT solutions. With years of experience across various industries, we pride ourselves on a customer-centric approach, tailoring our services to meet your specific challenges and goals. Your success is our driving force.
            </p>
          </div>
        </div>

        {/* --- Mission & Vision --- */}
        <div className="mt-20 grid md:grid-cols-2 gap-12">
            <div className={`transition-all duration-700 ease-out delay-300 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'}`}>
                <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-3">Our Mission</h3>
                <p className="text-slate-600 dark:text-slate-400 text-lg">
                    To empower businesses and individuals by making technology accessible, manageable, and a true asset for growth. We are committed to delivering innovative and reliable IT solutions tailored to the unique needs of our clients.
                </p>
            </div>
             <div className={`transition-all duration-700 ease-out delay-400 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'}`}>
                <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-3">Our Vision</h3>
                <p className="text-slate-600 dark:text-slate-400 text-lg">
                    To be a leading technology partner recognized for our expertise and our dedication to helping clients navigate the complexities of the digital world, turning their technological challenges into opportunities for success.
                </p>
            </div>
        </div>

        {/* --- Core Values --- */}
        <div className="mt-20 text-center">
            <h3 className={`text-3xl font-bold text-slate-900 dark:text-white mb-10 transition-all duration-700 ease-out delay-500 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'}`}>
                Our Core Values
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                {coreValues.map((value, index) => (
                    <div 
                        key={value.title} 
                        className={`bg-slate-50 dark:bg-slate-800/50 p-6 rounded-xl shadow-lg transition-all duration-700 ease-out ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
                        style={{ transitionDelay: `${500 + (index + 1) * 150}ms` }}
                    >
                        <div className="flex justify-center mb-4">
                            <div className="bg-indigo-100 dark:bg-indigo-900/50 text-indigo-600 dark:text-indigo-400 rounded-full p-3">
                                {value.icon}
                            </div>
                        </div>
                        <h4 className="text-xl font-bold text-slate-900 dark:text-white mb-2">{value.title}</h4>
                        <p className="text-slate-600 dark:text-slate-400">{value.description}</p>
                    </div>
                ))}
            </div>
        </div>
        
        {/* --- Call to Action --- */}
        <div className={`mt-20 text-center transition-all duration-700 ease-out delay-[1200ms] ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'}`}>
            <a href="#contact" className="inline-block bg-indigo-600 text-white font-semibold px-8 py-4 rounded-md hover:bg-indigo-700 transition-all duration-300 shadow-lg text-lg transform hover:scale-105">
                Partner With Us
            </a>
        </div>

      </div>
    </section>
  );
};

export default About;
