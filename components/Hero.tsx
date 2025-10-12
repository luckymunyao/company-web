import React from 'react';

const Hero: React.FC = () => {
  return (
    <section id="home" className="relative bg-white">
      <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: "url('https://picsum.photos/1920/1080?grayscale&blur=2')" }}></div>
      <div className="absolute inset-0 bg-indigo-900/70"></div>
      <div className="relative container mx-auto px-6 py-32 md:py-48 text-center text-white">
        <h1 className="text-4xl md:text-6xl font-extrabold leading-tight mb-4">
          Your Partner in Digital Transformation
        </h1>
        <p className="text-lg md:text-xl text-indigo-100 max-w-3xl mx-auto mb-8">
          Your strategic partner for integrated solutions in IT, cybersecurity, custom software development, social media, and data analytics.
        </p>
        <div className="flex justify-center space-x-4">
            <a href="#services" className="bg-white text-indigo-600 font-bold py-3 px-8 rounded-full hover:bg-indigo-100 transition-all duration-300 shadow-lg transform hover:scale-105">
                Explore Services
            </a>
            <a href="#contact" className="bg-transparent border-2 border-white text-white font-bold py-3 px-8 rounded-full hover:bg-white/20 transition-all duration-300 shadow-lg transform hover:scale-105">
                Contact Us
            </a>
        </div>
      </div>
    </section>
  );
};

export default Hero;