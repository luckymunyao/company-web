import React, { useState, useEffect, useRef } from 'react';

const Hero: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const heroContentRef = useRef<HTMLDivElement | null>(null);

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

    if (heroContentRef.current) {
      observer.observe(heroContentRef.current);
    }

    return () => {
      if (heroContentRef.current) {
        // eslint-disable-next-line react-hooks/exhaustive-deps
        observer.unobserve(heroContentRef.current);
      }
    };
  }, []);

  return (
    <section id="home" className="relative h-screen flex items-center justify-center text-white overflow-hidden">
      {/* Video Background */}
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute z-0 w-auto min-w-full min-h-full max-w-none object-cover"
      >
        <source src="https://cdn.pixabay.com/video/2019/11/14/28383-370591490_large.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      {/* Overlay */}
      <div className="absolute inset-0 bg-indigo-900/70 z-10"></div>
      
      {/* Content */}
      <div ref={heroContentRef} className="relative z-20 container mx-auto px-6 text-center">
        <h1 className={`text-4xl md:text-6xl font-extrabold leading-tight mb-4 transition-all duration-700 ease-out [text-shadow:0_2px_4px_rgba(0,0,0,0.5)] ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'}`}>
          Your Partner in Digital Transformation
        </h1>
        <p className={`text-lg md:text-xl text-white/90 max-w-3xl mx-auto mb-8 transition-all duration-700 ease-out delay-200 [text-shadow:0_1px_4px_rgba(0,0,0,0.5)] ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'}`}>
          Your strategic partner for integrated solutions in IT, cybersecurity, custom software development, social media, and data analytics.
        </p>
        <div className={`flex flex-col sm:flex-row justify-center items-center space-y-4 sm:space-y-0 sm:space-x-4 transition-all duration-700 ease-out delay-400 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'}`}>
            <a 
              href="#contact" 
              className="inline-block text-2xl font-bold text-white bg-indigo-600 rounded-full py-10 px-20 transition-all duration-300 ease-in-out shadow-lg shadow-indigo-900/40 hover:shadow-2xl hover:shadow-indigo-500/50 transform hover:-translate-y-1 hover:scale-105 w-full sm:w-auto [text-shadow:0_1px_2px_rgba(0,0,0,0.2)]"
            >
                Get a Quote
            </a>
            {/* FIX: The file was truncated here, leaving an incomplete `<a>` tag and no component export. Completed the tag and added the export. */}
            <a 
              href="#solutions" 
              className="inline-block text-2xl font-bold text-white bg-black/20 backdrop-blur-md border-2 border-white/30 rounded-full py-10 px-20 transition-all duration-300 ease-in-out shadow-lg shadow-black/40 hover:shadow-xl hover:bg-black/40 hover:border-white/60 transform hover:-translate-y-1 hover:scale-105 w-full sm:w-auto [text-shadow:0_1px_2px_rgba(0,0,0,0.2)]"
            >
                Our Solutions
            </a>
        </div>
      </div>
    </section>
  );
};

export default Hero;
