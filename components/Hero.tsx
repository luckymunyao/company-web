import React from 'react';

const Hero: React.FC = () => {
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
      <div className="relative z-20 container mx-auto px-6 text-center">
        <h1 className="text-4xl md:text-6xl font-extrabold leading-tight mb-4">
          Your Partner in Digital Transformation
        </h1>
        <p className="text-lg md:text-xl text-indigo-100 max-w-3xl mx-auto mb-8">
          Your strategic partner for integrated solutions in IT, cybersecurity, custom software development, social media, and data analytics.
        </p>
        <div className="flex flex-col sm:flex-row justify-center items-center space-y-4 sm:space-y-0 sm:space-x-4">
            <a href="#solutions" className="bg-white text-indigo-600 font-bold py-3 px-8 rounded-full hover:bg-indigo-100 transition-all duration-300 shadow-lg transform hover:scale-105 w-full sm:w-auto">
                Explore Our Solutions
            </a>
            <a href="#about" className="bg-transparent border-2 border-white text-white font-bold py-3 px-8 rounded-full hover:bg-white/20 transition-all duration-300 shadow-lg transform hover:scale-105 w-full sm:w-auto">
                Learn More About Us
            </a>
        </div>
      </div>
    </section>
  );
};

export default Hero;