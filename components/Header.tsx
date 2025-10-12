import React, { useState } from 'react';

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navLinks = [
    { href: '#home', label: 'Home' },
    { href: '#solutions', label: 'Solutions' },
    { href: '#about', label: 'About' },
    { href: '#testimonials', label: 'Testimonials' },
    { href: '#blog', label: 'Blog' },
    { href: '#contact', label: 'Contact' },
  ];

  return (
    <header className="bg-white/80 backdrop-blur-md sticky top-0 z-50 shadow-sm">
      <div className="container mx-auto px-6 py-4 flex justify-between items-center">
        <a href="#home" className="text-2xl font-bold text-indigo-600">
          Ability IT
        </a>
        <nav className="hidden md:flex items-center space-x-8">
          {navLinks.map((link) => (
            <a key={link.href} href={link.href} className="text-slate-600 hover:text-indigo-600 transition-colors duration-300 font-medium">
              {link.label}
            </a>
          ))}
        </nav>
        <a href="#contact" className="hidden md:inline-block bg-indigo-600 text-white font-semibold px-5 py-2 rounded-md hover:bg-indigo-700 transition-all duration-300 shadow-md">
          Get a Quote
        </a>
        <div className="md:hidden">
          <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="text-slate-700 focus:outline-none">
            <span className="text-2xl h-6 w-6 flex items-center justify-center" aria-hidden="true">
              {isMenuOpen ? '×' : '≡'}
            </span>
          </button>
        </div>
      </div>
      {isMenuOpen && (
        <div className="md:hidden bg-white">
          <nav className="px-6 pt-2 pb-4 flex flex-col space-y-2">
            {navLinks.map((link) => (
              <a key={link.href} href={link.href} className="text-slate-600 hover:text-indigo-600 block py-2 rounded-md text-base font-medium" onClick={() => setIsMenuOpen(false)}>
                {link.label}
              </a>
            ))}
            <a href="#contact" className="bg-indigo-600 text-white font-semibold text-center mt-2 px-5 py-2 rounded-md hover:bg-indigo-700 transition-all duration-300 shadow-md">
              Get a Quote
            </a>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;