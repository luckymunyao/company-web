import React, { useState, useEffect, useRef } from 'react';

interface HeroProps {
  personalizedContent?: {
    headline: string;
    subheadline: string;
  };
  recommendedServiceTitle?: string;
}

const defaultContent = {
  headline: 'Engineering the Future of Technology',
  subheadline: 'We build intelligent, scalable, and secure solutions that power the next generation of business. Discover our AI-driven approach to digital innovation.'
};

const Hero: React.FC<HeroProps> = ({ personalizedContent, recommendedServiceTitle }) => {
  const [isVisible, setIsVisible] = useState(false);
  const heroContentRef = useRef<HTMLDivElement | null>(null);
  const [overlayOpacity, setOverlayOpacity] = useState(0.7);

  const content = personalizedContent && personalizedContent.headline ? personalizedContent : defaultContent;
  const consultationHref = recommendedServiceTitle
    ? `#consultation?service=${encodeURIComponent(recommendedServiceTitle)}`
    : '#consultation';

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

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const screenHeight = window.innerHeight;
      const scrollRange = screenHeight * 0.8; // Animate over the first 80% of a screen scroll

      if (scrollY <= scrollRange) {
        const scrollFraction = scrollY / scrollRange;
        let newOpacity;

        // "Fade in" (overlay becomes more transparent) for the first 40% of the scroll
        if (scrollFraction < 0.4) {
          newOpacity = 0.7 - (scrollFraction / 0.4) * 0.1; // from 0.7 down to 0.6
        } else { // "Fade out" (overlay becomes more opaque) for the remaining 60%
          newOpacity = 0.6 + ((scrollFraction - 0.4) / 0.6) * 0.2; // from 0.6 up to 0.8
        }
        setOverlayOpacity(newOpacity);
      } else {
        setOverlayOpacity(0.8);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
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
        <source src="https://cdn.pixabay.com/video/2024/05/23/211511_large.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      {/* Overlay */}
      <div 
        className="absolute inset-0 bg-indigo-900 z-10 transition-opacity duration-150 ease-out"
        style={{ opacity: overlayOpacity }}
      ></div>
      
      {/* Content */}
      <div ref={heroContentRef} className="relative z-20 container mx-auto px-6 text-center">
        <h1 className={`text-4xl md:text-6xl font-extrabold leading-tight mb-4 transition-all duration-700 ease-out [text-shadow:0_2px_4px_rgba(0,0,0,0.5)] ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'}`}>
          {content.headline}
        </h1>
        <p className={`text-lg md:text-xl text-white/90 max-w-3xl mx-auto mb-8 transition-all duration-700 ease-out delay-200 [text-shadow:0_1px_4px_rgba(0,0,0,0.5)] ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'}`}>
          {content.subheadline}
        </p>
        <div className={`flex flex-col sm:flex-row justify-center items-center space-y-4 sm:space-y-0 sm:space-x-4 transition-all duration-700 ease-out delay-400 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'}`}>
            <a 
              href={consultationHref}
              className="inline-block text-xl font-bold text-white bg-indigo-600 rounded-lg py-4 px-10 transition-all duration-300 ease-in-out shadow-lg shadow-indigo-900/40 hover:shadow-2xl hover:shadow-indigo-500/50 transform hover:-translate-y-1 hover:scale-105 w-full sm:w-auto [text-shadow:0_1px_2px_rgba(0,0,0,0.2)]"
            >
                Book a Consultation
            </a>
            <a 
              href="#solutions" 
              className="inline-block text-xl font-bold text-white bg-black/20 backdrop-blur-md border-2 border-white/30 rounded-lg py-4 px-10 transition-all duration-300 ease-in-out shadow-lg shadow-black/40 hover:shadow-xl hover:bg-black/40 hover:border-white/60 transform hover:-translate-y-1 hover:scale-105 w-full sm:w-auto [text-shadow:0_1px_2px_rgba(0,0,0,0.2)]"
            >
                Explore Solutions
            </a>
        </div>
      </div>
    </section>
  );
};

export default Hero;
