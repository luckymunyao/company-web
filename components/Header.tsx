import React, { useState, useEffect } from 'react';
import SunIcon from './icons/SunIcon';
import MoonIcon from './icons/MoonIcon';
import SearchIcon from './icons/SearchIcon';
import SearchModal from './SearchModal';

interface HeaderProps {
  onOpenCallbackModal: () => void;
}

// Data structure for navigation
interface NavLink {
  name: string;
  href: string;
}

interface NavGroup {
  name: string;
  links: NavLink[];
}

type NavItem = NavLink | NavGroup;

const navItems: NavItem[] = [
  { name: 'Home', href: '#home' },
  {
    name: 'Services',
    links: [
      { name: 'Solutions', href: '#solutions' },
      { name: 'Portfolio', href: '#portfolio' },
      { name: 'Customize', href: '#customize' },
      { name: 'Booking', href: '#consultation' },
    ],
  },
  {
    name: 'Company',
    links: [
      { name: 'About', href: '#about' },
      { name: 'Why Us', href: '#why-us' },
      { name: 'Blog', href: '#blog' },
      { name: 'Events', href: '#events' },
      { name: 'Careers', href: '#careers' },
    ],
  },
];

// Flattened list for IntersectionObserver
const allNavLinks = navItems.flatMap(item => ('links' in item ? item.links : [item]));


const Header: React.FC<HeaderProps> = ({ onOpenCallbackModal }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [openMobileGroup, setOpenMobileGroup] = useState<string | null>(null);

  const [theme, setTheme] = useState(() => {
    if (typeof window !== 'undefined') {
      const savedTheme = localStorage.getItem('theme');
      if (savedTheme) return savedTheme;
      return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    }
    return 'light';
  });

  useEffect(() => {
    const handleScroll = () => {
      // The header height is 80px (h-20). The header becomes opaque once the hero section
      // has been scrolled past the header's position.
      const homeSection = document.getElementById('home');
      if (homeSection) {
        setIsScrolled(homeSection.getBoundingClientRect().bottom < 80);
      } else {
        // Fallback if the hero isn't found, trigger after scrolling past a threshold.
        setIsScrolled(window.scrollY > 80);
      }
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                setActiveSection(entry.target.id);
            }
        });
    }, { rootMargin: '-30% 0px -70% 0px' });
    
    allNavLinks.forEach(link => {
        const sectionId = link.href.substring(1);
        const section = document.getElementById(sectionId);
        if (section) observer.observe(section);
    });

    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);
      allNavLinks.forEach(link => {
        const sectionId = link.href.substring(1);
        const section = document.getElementById(sectionId);
        if (section) observer.unobserve(section);
      });
    };
  }, []);

  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    try {
      localStorage.setItem('theme', theme);
    } catch (e) {
      console.warn('Could not save theme to localStorage');
    }
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prevTheme => (prevTheme === 'light' ? 'dark' : 'light'));
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };
  
  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled
            ? 'bg-white/80 dark:bg-slate-900/80 backdrop-blur-md shadow-md'
            : 'bg-transparent'
        }`}
        aria-label="Primary"
      >
        <div className="container mx-auto px-6 flex justify-between items-center h-20">
          <a href="#home" className="text-2xl font-bold text-slate-900 dark:text-white">
            AbilityTech
          </a>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center">
            <nav aria-label="Main navigation" className="flex items-center gap-1">
              {navItems.map(item =>
                'links' in item ? (
                  <div
                    key={item.name}
                    className="relative"
                    onMouseEnter={() => setOpenDropdown(item.name)}
                    onMouseLeave={() => setOpenDropdown(null)}
                  >
                    <button
                      className="px-4 py-2 text-slate-700 dark:text-slate-300 hover:text-indigo-600 dark:hover:text-indigo-400 font-semibold transition-colors duration-300 flex items-center gap-1"
                    >
                      {item.name}
                      <svg className="w-4 h-4 transition-transform duration-200" style={{ transform: openDropdown === item.name ? 'rotate(180deg)' : 'rotate(0)' }} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
                    </button>
                    {openDropdown === item.name && (
                      <div className="absolute top-full left-0 mt-1 bg-white dark:bg-slate-800 shadow-lg rounded-md py-2 w-48 animate-fade-in-fast">
                        {item.links.map(link => (
                           <a
                            key={link.name}
                            href={link.href}
                            className={`block w-full text-left px-4 py-2 text-sm transition-colors duration-200 ${
                                activeSection === link.href.substring(1)
                                ? 'text-indigo-600 dark:text-indigo-400 font-semibold'
                                : 'text-slate-700 dark:text-slate-300 hover:text-indigo-600 dark:hover:text-indigo-400'
                            }`}
                           >
                            {link.name}
                           </a>
                        ))}
                      </div>
                    )}
                  </div>
                ) : (
                  <a
                    key={item.name}
                    href={item.href}
                    className={`px-4 py-2 font-semibold transition-all duration-300 border-b-2 ${
                      activeSection === item.href.substring(1)
                        ? 'text-indigo-600 dark:text-indigo-400 border-indigo-500'
                        : 'text-slate-700 dark:text-slate-300 border-transparent hover:text-indigo-600 dark:hover:text-indigo-400 hover:border-indigo-500'
                    }`}
                  >
                    {item.name}
                  </a>
                )
              )}
            </nav>
            
            <button
              onClick={onOpenCallbackModal}
              className="ml-6 px-4 py-2 text-sm font-semibold bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors duration-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 dark:focus:ring-offset-slate-900"
            >
              Request a Callback
            </button>

            <div className="flex items-center gap-2 border-l border-slate-200 dark:border-slate-700 pl-4 ml-4">
              <button
                onClick={() => setIsSearchOpen(true)}
                className="p-2 text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-white transition-colors rounded-full"
                aria-label="Open search"
              >
                <SearchIcon />
              </button>
              <button
                onClick={toggleTheme}
                className="p-2 text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-white transition-colors rounded-full"
                aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
              >
                {theme === 'light' ? <MoonIcon /> : <SunIcon />}
              </button>
            </div>
          </div>

          {/* Mobile Navigation Toggle */}
          <div className="lg:hidden flex items-center gap-2">
             <button
                onClick={() => setIsSearchOpen(true)}
                className="p-2 text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-white transition-colors rounded-full"
                aria-label="Open search"
              >
                <SearchIcon />
              </button>
            <button
              onClick={toggleMenu}
              className="p-2 text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-white transition-colors rounded-full"
              aria-label="Toggle menu"
              aria-expanded={isMenuOpen}
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {isMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="lg:hidden absolute top-full left-0 w-full bg-white dark:bg-slate-900 shadow-lg py-4 animate-slide-down-fast">
            <div className="container mx-auto px-6 flex flex-col items-stretch">
              {navItems.map(item =>
                'links' in item ? (
                    <div key={item.name} className="py-2 border-b border-slate-200 dark:border-slate-700">
                        <button
                            onClick={() => setOpenMobileGroup(openMobileGroup === item.name ? null : item.name)}
                            className="w-full flex justify-between items-center text-left font-semibold text-slate-700 dark:text-slate-300 py-2"
                        >
                            <span>{item.name}</span>
                            <svg className={`w-4 h-4 transition-transform ${openMobileGroup === item.name ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
                        </button>
                        {openMobileGroup === item.name && (
                            <div className="pl-4 pt-2 space-y-1">
                                {item.links.map(link => (
                                    <a
                                        key={link.name}
                                        href={link.href}
                                        onClick={() => setIsMenuOpen(false)}
                                        className="block py-2 px-2 text-slate-600 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-md"
                                    >
                                        {link.name}
                                    </a>
                                ))}
                            </div>
                        )}
                    </div>
                ) : (
                    <a
                        key={item.name}
                        href={item.href}
                        onClick={() => setIsMenuOpen(false)}
                        className="block py-3 px-2 text-slate-700 dark:text-slate-300 font-semibold border-b border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-md"
                    >
                        {item.name}
                    </a>
                )
              )}

              <div className="pt-4 mt-2">
                <button
                  onClick={() => {
                    onOpenCallbackModal();
                    setIsMenuOpen(false);
                  }}
                  className="w-full text-center bg-indigo-600 text-white font-semibold px-4 py-3 rounded-md hover:bg-indigo-700 transition-all duration-300 shadow-md"
                >
                  Request a Callback
                </button>
              </div>

              <div className="flex justify-center items-center pt-4 mt-2 border-t border-slate-200 dark:border-slate-700">
                <div className="flex items-center gap-2 text-slate-500 dark:text-slate-400 font-semibold">
                    <span>Theme:</span>
                    <button
                        onClick={toggleTheme}
                        className="p-2 text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-white transition-colors rounded-full"
                        aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
                    >
                        {theme === 'light' ? <MoonIcon /> : <SunIcon />}
                    </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </header>
      <SearchModal isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
      <style>{`
        @keyframes fade-in-fast { from { opacity: 0; } to { opacity: 1; } }
        @keyframes slide-down-fast { from { opacity: 0; transform: translateY(-10px); } to { opacity: 1; transform: translateY(0); } }
        .animate-fade-in-fast { animation: fade-in-fast 0.2s ease-out forwards; }
        .animate-slide-down-fast { animation: slide-down-fast 0.3s ease-out forwards; }
      `}</style>
    </>
  );
};

export default Header;