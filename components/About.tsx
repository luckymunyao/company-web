import React, { useState, useEffect, useRef } from 'react';

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
  
  useEffect(() => {
    const handleScroll = () => {
      if (sectionRef.current) {
        const elementTop = sectionRef.current.getBoundingClientRect().top;
        const inView = elementTop < window.innerHeight && elementTop > -sectionRef.current.offsetHeight;
        if (inView) {
          // Decreased speed for a more subtle effect
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
        <div className="flex flex-col md:flex-row items-center gap-12">
          <div className="md:w-1/2 h-80 md:h-auto rounded-lg shadow-2xl overflow-hidden">
            <img 
              src="https://picsum.photos/600/400?random=1" 
              alt="Our Team" 
              className="w-full h-full object-cover"
              style={{ 
                transform: `scale(1.2) translateY(${parallaxOffset}px)`
              }}
            />
          </div>
          <div className="md:w-1/2">
            <h2 className={`text-3xl md:text-4xl font-bold text-slate-900 dark:text-white mb-4 transition-all duration-700 ease-out ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'}`}>
              About Ability IT
            </h2>
            {/* Adjusted delays for a smoother stagger effect */}
            <p className={`text-slate-600 dark:text-slate-400 text-lg mb-6 transition-all duration-700 ease-out delay-200 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'}`}>
              We are a team of passionate technology experts dedicated to providing innovative and reliable IT solutions. Our mission is to empower businesses and individuals by making technology accessible, manageable, and a true asset for growth.
            </p>
            <p className={`text-slate-600 dark:text-slate-400 text-lg mb-6 transition-all duration-700 ease-out delay-400 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'}`}>
              With years of experience across various industries, we pride ourselves on our customer-centric approach, tailoring our services to meet your specific challenges and goals. Your success is our success.
            </p>
            <div className={`transition-all duration-700 ease-out delay-600 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'}`}>
              <a href="#contact" className="inline-block bg-indigo-600 text-white font-semibold px-6 py-3 rounded-md hover:bg-indigo-700 transition-all duration-300 shadow-md">
                Learn More
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;