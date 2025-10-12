import React, { useState, useEffect } from 'react';
import SunIcon from './icons/SunIcon';
import MoonIcon from './icons/MoonIcon';

const navLinks = [
  { href: '#home', label: 'Home' },
  { href: '#solutions', label: 'Solutions' },
  { href: '#about', label: 'About' },
  { href: '#testimonials', label: 'Testimonials' },
  { href: '#blog', label: 'Blog' },
  { href: '#faq', label: 'FAQ' },
  { href: '#contact', label: 'Contact' },
];

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [theme, setTheme] = useState(localStorage.getItem('theme') || 'light');
  const [activeSection, setActiveSection] = useState('home');

  useEffect(() => {
    const root = window.document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      root.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [theme]);
  
  useEffect(() => {
    const sections = navLinks.map(link => document.querySelector(link.href));

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      {
        rootMargin: '-80px 0px -50% 0px',
        threshold: 0,
      }
    );

    sections.forEach(section => {
      if (section) observer.observe(section);
    });

    return () => {
      sections.forEach(section => {
        if (section) observer.unobserve(section);
      });
    };
  }, []);

  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  };

  return (
    <header className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-md sticky top-0 z-50 shadow-sm">
      <div className="container mx-auto px-6 py-4 flex justify-between items-center">
        <a href="#home" className="text-2xl font-bold text-indigo-600 dark:text-indigo-400">
          Ability IT
        </a>
        <nav className="hidden md:flex items-center space-x-8">
          {navLinks.map((link) => (
            <a 
              key={link.href} 
              href={link.href} 
              className={`transition-all duration-300 ${
                activeSection === link.href.substring(1)
                  ? 'font-semibold text-indigo-600 dark:text-indigo-400'
                  : 'font-medium text-slate-600 dark:text-slate-300 hover:text-indigo-600 dark:hover:text-indigo-400'
              }`}
            >
              {link.label}
            </a>
          ))}
        </nav>
        <div className="hidden md:flex items-center space-x-4">
          <button onClick={toggleTheme} className="p-2 rounded-full text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors" aria-label="Toggle theme">
            {theme === 'light' ? <MoonIcon /> : <SunIcon />}
          </button>
          <a href="#contact" className="inline-block bg-indigo-600 text-white font-semibold px-5 py-2 rounded-md hover:bg-indigo-700 transition-all duration-300 shadow-md">
            Get a Quote
          </a>
        </div>
        <div className="md:hidden flex items-center gap-2">
           <button onClick={toggleTheme} className="p-2 rounded-full text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors" aria-label="Toggle theme">
            {theme === 'light' ? <MoonIcon /> : <SunIcon />}
          </button>
          <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="text-slate-700 dark:text-slate-300 focus:outline-none">
            <span className="text-2xl h-6 w-6 flex items-center justify-center" aria-hidden="true">
              {isMenuOpen ? '×' : '≡'}
            </span>
          </button>
        </div>
      </div>
      {isMenuOpen && (
        <div className="md:hidden bg-white dark:bg-slate-800">
          <nav className="px-6 pt-2 pb-4 flex flex-col space-y-2">
            {navLinks.map((link) => (
              <a 
                key={link.href} 
                href={link.href} 
                className={`block py-2 rounded-md text-base transition-colors duration-300 ${
                  activeSection === link.href.substring(1)
                    ? 'font-semibold text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-slate-700'
                    : 'font-medium text-slate-600 dark:text-slate-300 hover:text-indigo-600 dark:hover:text-indigo-400'
                }`}
                onClick={() => setIsMenuOpen(false)}>
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