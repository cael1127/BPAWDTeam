import React from 'react';
import { Phone, Calendar, MessageCircle } from 'lucide-react';
import { moodOptions } from '../../data/moodOptions';

const HomePage = ({ setActiveTab, currentMood, recordMood }) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 dark:from-gray-900 dark:to-gray-800">
      {/* Hero Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 dark:text-white mb-6">
            Your Mental Health Matters
          </h1>
          <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 mb-8 max-w-3xl mx-auto">
            You're not alone. We're here to support you every step of the way with resources, community, and professional help.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button 
              onClick={() => setActiveTab('support')}
              className="bg-green-600 hover:bg-green-700 text-white px-8 py-3 rounded-lg font-semibold transition-colors"
            >
              Get Immediate Help
            </button>
            <button 
              onClick={() => setActiveTab('learn')}
              className="bg-white dark:bg-gray-800 text-gray-800 dark:text-white px-8 py-3 rounded-lg font-semibold border border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
            >
              Learn More
            </button>
          </div>
        </div>
      </section>

      {/* Quick Actions */}
      <section className="py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-gray-900 dark:text-white mb-12">Quick Access</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg text-center hover:shadow-xl transition-shadow">
              <Phone className="h-12 w-12 text-green-600 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">Crisis Helplines</h3>
              <p className="text-gray-600 dark:text-gray-300 mb-4">24/7 support when you need it most</p>
              <button 
                onClick={() => setActiveTab('support')}
                className="text-green-600 hover:text-green-700 font-medium"
              >
                View Helplines →
              </button>
            </div>
            <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg text-center hover:shadow-xl transition-shadow">
              <Calendar className="h-12 w-12 text-blue-600 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">Schedule Counseling</h3>
              <p className="text-gray-600 dark:text-gray-300 mb-4">Book a session with a professional</p>
              <button 
                onClick={() => setActiveTab('support')}
                className="text-blue-600 hover:text-blue-700 font-medium"
              >
                Schedule Now →
              </button>
            </div>
            <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg text-center hover:shadow-xl transition-shadow">
              <MessageCircle className="h-12 w-12 text-purple-600 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">Support Community</h3>
              <p className="text-gray-600 dark:text-gray-300 mb-4">Connect with others who understand</p>
              <button 
                onClick={() => setActiveTab('support')}
                className="text-purple-600 hover:text-purple-700 font-medium"
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
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">How are you feeling today?</h2>
          <div className="flex flex-wrap justify-center gap-4 mb-6">
            {moodOptions.map((mood) => (
              <button
                key={mood.value}
                onClick={() => recordMood(mood)}
                className={`p-4 rounded-lg flex flex-col items-center transition-transform hover:scale-105 ${
                  currentMood?.value === mood.value 
                    ? `${mood.color} text-white` 
                    : 'bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200'
                }`}
              >
                <span className="text-2xl mb-2">{mood.emoji}</span>
                <span className="font-medium">{mood.label}</span>
              </button>
            ))}
          </div>
          {currentMood && (
            <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded-lg inline-block">
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
