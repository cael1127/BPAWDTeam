import React from 'react';
import { Menu, X, Sun, Moon, Heart } from 'lucide-react';

const Navigation = ({ isMenuOpen, setIsMenuOpen, activeTab, setActiveTab, darkMode, setDarkMode }) => {
  return (
    <nav className="bg-white dark:bg-gray-800 shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center space-x-2">
            <Heart className="h-8 w-8 text-green-500" />
            <span className="text-xl font-bold text-gray-800 dark:text-white">MindWell</span>
          </div>
          
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-4">
              {['home', 'learn', 'support', 'blog', 'contact'].map((item) => (
                <button
                  key={item}
                  onClick={() => setActiveTab(item)}
                  className={`px-3 py-2 rounded-md text-sm font-medium capitalize transition-colors ${
                    activeTab === item
                      ? 'bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-100'
                      : 'text-gray-700 hover:text-green-600 dark:text-gray-300 dark:hover:text-green-400'
                  }`}
                >
                  {item}
                </button>
              ))}
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <button
              onClick={() => setDarkMode(!darkMode)}
              className="p-2 rounded-full text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
            >
              {darkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
            </button>
            
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-2 rounded-md text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {isMenuOpen && (
        <div className="md:hidden bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700">
          <div className="px-2 pt-2 pb-3 space-y-1">
            {['home', 'learn', 'support', 'blog', 'contact'].map((item) => (
              <button
                key={item}
                onClick={() => {
                  setActiveTab(item);
                  setIsMenuOpen(false);
                }}
                className={`block px-3 py-2 rounded-md text-base font-medium capitalize w-full text-left transition-colors ${
                  activeTab === item
                    ? 'bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-100'
                    : 'text-gray-700 hover:text-green-600 dark:text-gray-300 dark:hover:text-green-400'
                }`}
              >
                {item}
              </button>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navigation;
