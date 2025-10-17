import ThemeToggle from './ThemeToggle';
import { useState, useEffect } from 'react';

export default function Navbar() {
  const [mobileMenu, setMobileMenu] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setActiveSection(id);
      setMobileMenu(false);
    }
  };

  
  useEffect(() => {
    const handleScroll = () => {
      const sections = ['hero', 'stats', 'donors', 'gainers'];
      const scrollPosition = window.scrollY + 200;

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element && element.offsetTop <= scrollPosition) {
          setActiveSection(section);
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav
      className="fixed w-full z-50 bg-white/90 dark:bg-gray-900/90 backdrop-blur-sm shadow-sm"
      aria-label="Main navigation"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
       
          <button
            onClick={() => scrollToSection('hero')}
            className="text-2xl font-bold text-red-600 hover:text-red-700 transition"
            aria-label="Go to homepage"
          >
            BloodBridge
          </button>

          <div className="hidden md:flex items-center space-x-6">
            {[
              { id: 'hero', label: 'Home' },
              { id: 'stats', label: 'Stats' },
              { id: 'donors', label: 'Donors' },
              { id: 'gainers', label: 'Requests' },
            ].map((item) => (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className={`font-medium transition ${
                  activeSection === item.id
                    ? 'text-red-600 dark:text-red-400'
                    : 'text-gray-700 hover:text-red-600 dark:text-gray-300 dark:hover:text-red-400'
                }`}
                aria-current={activeSection === item.id ? 'page' : undefined}
              >
                {item.label}
              </button>
            ))}
            <ThemeToggle />
          </div>

          <div className="md:hidden">
            <button
              onClick={() => setMobileMenu(!mobileMenu)}
              className="text-gray-700 dark:text-gray-300 text-2xl focus:outline-none"
              aria-expanded={mobileMenu}
              aria-controls="mobile-menu"
              aria-label={mobileMenu ? 'Close menu' : 'Open menu'}
            >
              {mobileMenu ? '✕' : '☰'}
            </button>
          </div>
        </div>
      </div>

      {mobileMenu && (
        <div
          id="mobile-menu"
          className="md:hidden bg-white dark:bg-gray-800 py-4 px-4 space-y-3 border-t dark:border-gray-700"
        >
          {[
            { id: 'hero', label: 'Home' },
            { id: 'stats', label: 'Stats' },
            { id: 'donors', label: 'Donors' },
            { id: 'gainers', label: 'Requests' },
          ].map((item) => (
            <button
              key={item.id}
              onClick={() => scrollToSection(item.id)}
              className={`block w-full text-left px-3 py-2 rounded-lg font-medium transition ${
                activeSection === item.id
                  ? 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-300'
                  : 'text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700'
              }`}
            >
              {item.label}
            </button>
          ))}
          <div className="pt-2 flex justify-end px-3">
            <ThemeToggle />
          </div>
        </div>
      )}
    </nav>
  );
}