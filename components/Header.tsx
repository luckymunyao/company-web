import React, { useState, useEffect } from 'react';
import SunIcon from './icons/SunIcon';
import MoonIcon from './icons/MoonIcon';
import SearchIcon from './icons/SearchIcon';
import SearchModal from './SearchModal';

const Header: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [theme, setTheme] = useState(() => {
    if (typeof window !== 'undefined') {
      const savedTheme = localStorage.getItem('theme');
      if (savedTheme) return savedTheme;

      // Automatically set dark mode for night visitors if no theme is saved
      const currentHour = new Date().getHours();
      if (currentHour >= 19 || currentHour < 7) { // 7 PM to 7 AM
        return 'dark';
      }

      // Fallback to system preference
      return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    }
    return 'light';
  });
  
  const navLinks = [
    { name: 'Home', href: '#home' },
    { name: 'Solutions', href: '#solutions' },
    { name: 'About', href: '#about' },
    { name: 'Portfolio', href: '#portfolio' },
    { name: 'Blog', href: '#blog' },
    { name: 'Events', href: '#events' },
    { name: 'Customize', href: '#customize' },
    { name: 'Booking', href: '#consultation' },
    { name: 'Careers', href: '#careers' },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                setActiveSection(entry.target.id);
            }
        });
    }, { rootMargin: '-30% 0px -70% 0px' });
    
    navLinks.forEach(link => {
        const sectionId = link.href.substring(1);
        const section = document.getElementById(sectionId);
        if (section) observer.observe(section);
    });

    window.addEventListener('scroll', handleScroll);
    return () => {
        window.removeEventListener('scroll', handleScroll);
        navLinks.forEach(link => {
            const sectionId = link.href.substring(1);
            const section = document.getElementById(sectionId);
            if (section) observer.unobserve(section);
        });
    };
  }, [navLinks]);
  
  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };

  return (
    <>
      <header 
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled || isMenuOpen ? 'bg-slate-900/80 backdrop-blur-sm shadow-md' : 'bg-transparent'
        }`}
      >
        <div className="container mx-auto px-6">
          <div className="flex justify-between items-center h-20">
            <a href="#home" className="text-2xl font-bold text-white">
              Ability IT
            </a>
            
            {/* Desktop Nav */}
            <nav aria-label="Main Navigation" className="hidden md:flex items-center space-x-1">
              {navLinks.map(link => (
                <a 
                  key={link.name} 
                  href={link.href} 
                  aria-current={activeSection === link.href.substring(1) ? 'page' : undefined}
                  className={`px-4 py-2 rounded-md transition-all duration-300 font-medium border-b-2
                  ${activeSection === link.href.substring(1) 
                      ? 'text-indigo-400 font-semibold border-indigo-400' 
                      : 'text-slate-300 border-transparent hover:text-indigo-400'
                  }`}
                >
                  {link.name}
                </a>
              ))}
            </nav>

            <div className="flex items-center space-x-2">
              <button
                  onClick={() => setIsSearchOpen(true)}
                  className="p-2 rounded-full text-slate-300 hover:bg-slate-700 transition-colors"
                  aria-label="Open search"
              >
                  <SearchIcon />
              </button>
              <button
                  onClick={toggleTheme}
                  className="p-2 rounded-full text-slate-300 hover:bg-slate-700 transition-colors"
                  aria-label="Toggle theme"
              >
                  {theme === 'light' ? <MoonIcon /> : <SunIcon />}
              </button>
              <a href="#contact" className="hidden lg:inline-block bg-indigo-600 text-white font-semibold px-5 py-2 rounded-md hover:bg-indigo-700 transition-all duration-300 shadow-sm">
                  Get a Quote
              </a>
              
              {/* Mobile Menu Button */}
              <button 
                className="md:hidden text-white z-10"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                aria-label="Open menu"
                aria-expanded={isMenuOpen}
                aria-controls="mobile-menu"
              >
                {isMenuOpen ? (
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
                ) : (
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" /></svg>
                )}
              </button>
            </div>
          </div>
        </div>
        
        {/* Mobile Nav */}
        <div id="mobile-menu" className={`md:hidden absolute top-0 left-0 right-0 pt-20 bg-slate-900 shadow-lg transition-transform duration-300 ease-in-out ${isMenuOpen ? 'transform translate-y-0' : 'transform -translate-y-full'}`}>
            <nav aria-label="Main Navigation" className="flex flex-col items-center space-y-2 p-6">
              {navLinks.map(link => (
                <a 
                  key={link.name} 
                  href={link.href}
                  aria-current={activeSection === link.href.substring(1) ? 'page' : undefined}
                  className={`w-full text-center font-semibold text-lg py-2 rounded-md transition-colors duration-300
                  ${activeSection === link.href.substring(1) 
                      ? 'bg-indigo-900/50 text-indigo-400' 
                      : 'text-slate-300 hover:bg-slate-800'
                  }`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  {link.name}
                </a>
              ))}
              <a 
                href="#contact" 
                className="w-full text-center bg-indigo-600 text-white font-semibold px-5 py-3 rounded-md hover:bg-indigo-700 transition-all duration-300 shadow-sm mt-4"
                onClick={() => setIsMenuOpen(false)}
              >
                  Get a Quote
              </a>
            </nav>
        </div>
      </header>
      <SearchModal isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
    </>
  );
};

export default Header;