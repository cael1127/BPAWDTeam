import React, { useState } from 'react';
import Navigation from './components/Navigation';
import Footer from './components/Footer';
import HomePage from './components/pages/HomePage';
import LearnPage from './components/pages/LearnPage';
import SupportPage from './components/pages/SupportPage';
import BlogPage from './components/pages/BlogPage';
import ContactPage from './components/pages/ContactPage';
import CommunityPage from './components/pages/CommunityPage';
import AIAssistant from './components/advanced/AIAssistant';
import { useDarkMode } from './hooks/useDarkMode';
import { useMoodTracker } from './hooks/useMoodTracker';

const App = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [darkMode, setDarkMode] = useDarkMode();
  const [activeTab, setActiveTab] = useState('home');
  const { currentMood, recordMood, moodHistory } = useMoodTracker();

  const renderActivePage = () => {
    switch (activeTab) {
      case 'home': 
        return <HomePage setActiveTab={setActiveTab} currentMood={currentMood} recordMood={recordMood} />;
      case 'learn': 
        return <LearnPage />;
      case 'support': 
        return <SupportPage />;
      case 'community':
        return <CommunityPage />;
      case 'blog': 
        return <BlogPage />;
      case 'contact': 
        return <ContactPage />;
      default: 
        return <HomePage setActiveTab={setActiveTab} currentMood={currentMood} recordMood={recordMood} />;
    }
  };

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      {/* Skip Links for Accessibility */}
      <a 
        href="#main-content" 
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:bg-green-600 focus:text-white focus:px-4 focus:py-2 focus:rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
      >
        Skip to main content
      </a>
      
      <Navigation 
        isMenuOpen={isMenuOpen}
        setIsMenuOpen={setIsMenuOpen}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        darkMode={darkMode}
        setDarkMode={setDarkMode}
      />
      
      <main id="main-content" role="main">
        {renderActivePage()}
      </main>
      
      <Footer />
      <AIAssistant />
    </div>
  );
};

export default App;
