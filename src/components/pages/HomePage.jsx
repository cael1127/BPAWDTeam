import React from 'react';
import { Phone, Calendar, MessageCircle } from 'lucide-react';
import { moodOptions } from '../../data/moodOptions';

const HomePage = ({ setActiveTab, currentMood, recordMood }) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 dark:from-gray-900 dark:to-gray-800">
      {/* Hero Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 dark:text-white mb-6 animate-fade-in-up">
            Your Mental Health Matters
          </h1>
          <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 mb-8 max-w-3xl mx-auto animate-fade-in-up" style={{animationDelay: '0.2s'}}>
            You're not alone. We're here to support you every step of the way with resources, community, and professional help.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in-up" style={{animationDelay: '0.4s'}}>
            <button 
              onClick={() => setActiveTab('support')}
              className="bg-green-600 hover:bg-green-700 text-white px-8 py-3 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105 hover:shadow-lg active:scale-95"
            >
              Get Immediate Help
            </button>
            <button 
              onClick={() => setActiveTab('learn')}
              className="bg-white dark:bg-gray-800 text-gray-800 dark:text-white px-8 py-3 rounded-lg font-semibold border border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700 transition-all duration-300 transform hover:scale-105 hover:shadow-lg active:scale-95"
            >
              Learn More
            </button>
          </div>
        </div>
      </section>

      {/* Quick Actions */}
      <section className="py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-gray-900 dark:text-white mb-12 animate-fade-in">Quick Access</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg text-center hover:shadow-xl transition-all duration-300 transform hover:scale-105 hover:-translate-y-1 group">
              <Phone className="h-12 w-12 text-green-600 mx-auto mb-4 transition-transform duration-300 group-hover:scale-110" />
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">Crisis Helplines</h3>
              <p className="text-gray-600 dark:text-gray-300 mb-4">24/7 support when you need it most</p>
              <button 
                onClick={() => setActiveTab('support')}
                className="text-green-600 hover:text-green-700 font-medium transition-colors duration-200 hover:underline"
              >
                View Helplines →
              </button>
            </div>
            <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg text-center hover:shadow-xl transition-all duration-300 transform hover:scale-105 hover:-translate-y-1 group">
              <Calendar className="h-12 w-12 text-blue-600 mx-auto mb-4 transition-transform duration-300 group-hover:scale-110" />
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">Schedule Counseling</h3>
              <p className="text-gray-600 dark:text-gray-300 mb-4">Book a session with a professional</p>
              <button 
                onClick={() => setActiveTab('support')}
                className="text-blue-600 hover:text-blue-700 font-medium transition-colors duration-200 hover:underline"
              >
                Schedule Now →
              </button>
            </div>
            <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg text-center hover:shadow-xl transition-all duration-300 transform hover:scale-105 hover:-translate-y-1 group">
              <MessageCircle className="h-12 w-12 text-purple-600 mx-auto mb-4 transition-transform duration-300 group-hover:scale-110" />
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">Support Community</h3>
              <p className="text-gray-600 dark:text-gray-300 mb-4">Connect with others who understand</p>
              <button 
                onClick={() => setActiveTab('community')}
                className="text-purple-600 hover:text-purple-700 font-medium transition-colors duration-200 hover:underline"
              >
                Join Community →
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Mood Tracker Preview */}
      <section className="py-12 px-4 sm:px-6 lg:px-8 bg-white dark:bg-gray-800">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6 animate-fade-in">How are you feeling today?</h2>
          <div className="flex flex-wrap justify-center gap-4 mb-6">
            {moodOptions.map((mood, index) => (
              <button
                key={mood.value}
                onClick={() => recordMood(mood)}
                className={`p-4 rounded-lg flex flex-col items-center transition-all duration-300 transform hover:scale-110 hover:-translate-y-1 active:scale-95 ${
                  currentMood?.value === mood.value 
                    ? `${mood.color} text-white shadow-lg scale-105` 
                    : 'bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200 hover:shadow-md'
                }`}
                style={{animationDelay: `${index * 0.1}s`}}
              >
                <span className="text-2xl mb-2 transition-transform duration-300 hover:scale-125">{mood.emoji}</span>
                <span className="font-medium">{mood.label}</span>
              </button>
            ))}
          </div>
          {currentMood && (
            <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded-lg inline-block animate-fade-in-up">
              <p className="text-green-800 dark:text-green-200">
                Thank you for sharing! Remember, it's okay to not be okay. 
                {currentMood.value === 'struggling' || currentMood.value === 'sad' ? (
                  <span className="block mt-2">Consider reaching out to our support resources.</span>
                ) : null}
              </p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default HomePage;
