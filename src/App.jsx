import React, { useState } from 'react';
import Navigation from './components/Navigation';
import Footer from './components/Footer';
import HomePage from './components/pages/HomePage';
import LearnPage from './components/pages/LearnPage';
import SupportPage from './components/pages/SupportPage';
import BlogPage from './components/pages/BlogPage';
import ContactPage from './components/pages/ContactPage';
import { useDarkMode } from './hooks/useDarkMode';
import { useMoodTracker } from './hooks/useMoodTracker';

const App = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [darkMode, setDarkMode] = useDarkMode();
  const [activeTab, setActiveTab] = useState('home');
  const { currentMood, recordMood } = useMoodTracker();

  const renderActivePage = () => {
    switch (activeTab) {
      case 'home': 
        return <HomePage setActiveTab={setActiveTab} currentMood={currentMood} recordMood={recordMood} />;
      case 'learn': 
        return <LearnPage />;
      case 'support': 
        return <SupportPage />;
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
      <Navigation 
        isMenuOpen={isMenuOpen}
        setIsMenuOpen={setIsMenuOpen}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        darkMode={darkMode}
        setDarkMode={setDarkMode}
      />
      {renderActivePage()}
      <Footer />
    </div>
  );
};

export default App;
