import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-slate-800 text-slate-300">
      <div className="container mx-auto px-6 py-8">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="text-center md:text-left mb-4 md:mb-0">
            <p className="text-lg font-semibold text-white">Ability IT</p>
            <p className="text-sm">&copy; {new Date().getFullYear()} All Rights Reserved.</p>
          </div>
          <nav className="flex flex-wrap justify-center gap-x-6 gap-y-2">
            <a href="#home" className="hover:text-white transition-colors duration-300">Home</a>
            <a href="#solutions" className="hover:text-white transition-colors duration-300">Solutions</a>
            <a href="#about" className="hover:text-white transition-colors duration-300">About</a>
            <a href="#testimonials" className="hover:text-white transition-colors duration-300">Testimonials</a>
            <a href="#blog" className="hover:text-white transition-colors duration-300">Blog</a>
            <a href="#contact" className="hover:text-white transition-colors duration-300">Contact</a>
          </nav>
        </div>
      </div>
    </footer>
  );
};

export default Footer;