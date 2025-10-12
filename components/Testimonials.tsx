import React, { useState, useEffect, useCallback, useRef } from 'react';
import type { Testimonial } from '../types';
import QuoteIcon from './icons/QuoteIcon';
import ChevronLeftIcon from './icons/ChevronLeftIcon';
import ChevronRightIcon from './icons/ChevronRightIcon';
import TestimonialSkeleton from './TestimonialSkeleton';

const testimonialsData: Testimonial[] = [
  {
    quote: "Ability IT's cybersecurity solutions have been a game-changer for us. Their proactive approach gave us peace of mind. We feel more secure than ever.",
    name: 'Sarah Johnson',
    company: 'CEO of TechCorp',
    avatarUrl: 'https://i.pravatar.cc/60?u=a042581f4e29026704a',
  },
  {
    quote: "The managed IT services from Ability IT are exceptional. Their team is responsive, knowledgeable, and has significantly improved our system uptime. Highly recommended!",
    name: 'Michael Chen',
    company: 'Operations Director, Growth Solutions',
    avatarUrl: 'https://i.pravatar.cc/60?u=a042581f4e29026704b',
  },
  {
    quote: "Working with Ability IT on our digital marketing strategy has yielded incredible results. Their data-driven insights led to a 150% increase in our online leads within just three months.",
    name: 'Jessica Rodriguez',
    company: 'Marketing Manager, MarketPro',
    avatarUrl: 'https://i.pravatar.cc/60?u=a042581f4e29026704c',
  },
];

const Testimonials: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500); // Simulate loading delay
    return () => clearTimeout(timer);
  }, []);

  const resetTimeout = useCallback(() => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
  }, []);

  const nextSlide = useCallback(() => {
    setCurrentIndex((prevIndex) =>
      prevIndex === testimonialsData.length - 1 ? 0 : prevIndex + 1
    );
  }, []);

  const prevSlide = useCallback(() => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? testimonialsData.length - 1 : prevIndex - 1
    );
  }, []);

  const goToSlide = (slideIndex: number) => {
    setCurrentIndex(slideIndex);
  };

  useEffect(() => {
    if (isLoading) return; // Don't start autoplay if loading
    resetTimeout();
    timeoutRef.current = setTimeout(nextSlide, 5000); // Autoplay every 5 seconds
    return () => {
      resetTimeout();
    };
  }, [currentIndex, nextSlide, resetTimeout, isLoading]);
  
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (isLoading) return; // Ignore key events while loading
      if (event.key === 'ArrowLeft') {
        prevSlide();
      } else if (event.key === 'ArrowRight') {
        nextSlide();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [prevSlide, nextSlide, isLoading]);

  const handleMouseEnter = () => {
    resetTimeout();
  };

  const handleMouseLeave = () => {
    if (isLoading) return; // Don't restart autoplay if loading
    resetTimeout();
    timeoutRef.current = setTimeout(nextSlide, 5000);
  };

  return (
    <section id="testimonials" className="py-20 bg-white dark:bg-slate-950">
      <div className="container mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white">What Our Clients Say</h2>
          <p className="text-lg text-slate-600 dark:text-slate-400 mt-4 max-w-2xl mx-auto">
            We are proud to partner with businesses that trust our expertise and commitment to excellence.
          </p>
        </div>
        {isLoading ? (
          <TestimonialSkeleton />
        ) : (
          <div 
            className="max-w-3xl mx-auto relative group"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            <div className="overflow-hidden relative h-[380px] sm:h-[320px]">
              <div
                className="flex transition-transform ease-in-out duration-500"
                style={{ transform: `translateX(-${currentIndex * 100}%)` }}
              >
                {testimonialsData.map((testimonial, index) => (
                  <div key={index} className="w-full flex-shrink-0 p-4">
                    <div className="bg-slate-50 dark:bg-slate-800 p-8 rounded-xl shadow-lg flex flex-col h-full justify-between">
                      <div className="mb-6">
                        <QuoteIcon />
                        <p className="text-slate-600 dark:text-slate-400 italic mt-4">"{testimonial.quote}"</p>
                      </div>
                      <div className="flex items-center">
                        <img src={testimonial.avatarUrl} alt={testimonial.name} className="w-14 h-14 rounded-full mr-4 border-2 border-indigo-200 dark:border-indigo-800" />
                        <div>
                          <p className="font-bold text-slate-800 dark:text-slate-200">{testimonial.name}</p>
                          <p className="text-sm text-indigo-600 dark:text-indigo-400 font-medium">{testimonial.company}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            {/* Left Arrow */}
            <button
              onClick={prevSlide}
              className="absolute top-1/2 -translate-y-1/2 left-0 sm:-left-12 transform bg-white/50 hover:bg-white dark:bg-slate-700/50 dark:hover:bg-slate-600 rounded-full p-2 text-slate-600 dark:text-slate-200 hover:text-indigo-600 dark:hover:text-indigo-400 transition-all duration-300 shadow-md opacity-0 group-hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              aria-label="Previous testimonial"
            >
              <ChevronLeftIcon />
            </button>
            {/* Right Arrow */}
            <button
              onClick={nextSlide}
              className="absolute top-1/2 -translate-y-1/2 right-0 sm:-right-12 transform bg-white/50 hover:bg-white dark:bg-slate-700/50 dark:hover:bg-slate-600 rounded-full p-2 text-slate-600 dark:text-slate-200 hover:text-indigo-600 dark:hover:text-indigo-400 transition-all duration-300 shadow-md opacity-0 group-hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              aria-label="Next testimonial"
            >
              <ChevronRightIcon />
            </button>
            <div className="flex items-center justify-center gap-2 pt-6">
              {testimonialsData.map((_, slideIndex) => (
                <button
                  key={slideIndex}
                  onClick={() => goToSlide(slideIndex)}
                  className={`w-3 h-3 rounded-full transition-colors duration-300 ${
                    currentIndex === slideIndex ? 'bg-indigo-600 dark:bg-indigo-500' : 'bg-slate-300 dark:bg-slate-600 hover:bg-slate-400 dark:hover:bg-slate-500'
                  }`}
                  aria-label={`Go to slide ${slideIndex + 1}`}
                ></button>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default Testimonials;