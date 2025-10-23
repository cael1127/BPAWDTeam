import React, { useState } from 'react';
import CommunityForum from '../community/CommunityForum';
import LiveChat from '../community/LiveChat';
import { MessageCircle, Users, Shield, Heart } from 'lucide-react';

const CommunityPage = () => {
  const [activeView, setActiveView] = useState('forum');
  const [showChat, setShowChat] = useState(false);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white py-16 px-4 sm:px-6 lg:px-8 overflow-hidden">
        {/* Diagonal peach accent */}
        <div className="absolute top-0 right-0 w-1/3 h-full bg-gradient-to-bl from-orange-300 via-orange-200 to-transparent transform rotate-12 translate-x-1/4 -translate-y-1/4 opacity-60"></div>
        <div className="absolute top-0 right-0 w-1/4 h-full bg-gradient-to-bl from-orange-400 via-orange-300 to-transparent transform rotate-12 translate-x-1/3 -translate-y-1/3 opacity-40"></div>
        
        <div className="relative max-w-7xl mx-auto text-center z-10">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Connect & Support Each Other
          </h1>
          <p className="text-xl md:text-2xl text-gray-200 mb-8 max-w-3xl mx-auto">
            Join our safe, moderated community where you can share experiences, offer support, and build meaningful connections with others who understand.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => setActiveView('forum')}
              className={`px-8 py-3 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105 ${
                activeView === 'forum'
                  ? 'bg-orange-400 text-gray-900 shadow-lg'
                  : 'bg-gray-700 hover:bg-gray-600 text-white border border-gray-600'
              }`}
            >
              <MessageCircle className="inline-block h-5 w-5 mr-2" />
              Support Forum
            </button>
            <button
              onClick={() => setShowChat(!showChat)}
              className="px-8 py-3 bg-orange-500 hover:bg-orange-600 text-white rounded-lg font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg"
            >
              <Users className="inline-block h-5 w-5 mr-2" />
              {showChat ? 'Hide' : 'Join'} Live Chat
            </button>
          </div>
        </div>
      </section>

      {/* Community Features */}
      <section className="py-12 px-4 sm:px-6 lg:px-8 bg-white dark:bg-gray-800">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-gray-900 dark:text-white mb-12">
            Why Join Our Community?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-purple-100 dark:bg-purple-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
                <Shield className="h-8 w-8 text-purple-600 dark:text-purple-400" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                Safe & Moderated
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                Our trained moderators and licensed counselors ensure a supportive, safe environment for all members.
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="h-8 w-8 text-blue-600 dark:text-blue-400" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                Peer Support
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                Connect with others who truly understand. Share experiences and learn from those on similar journeys.
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
                <Heart className="h-8 w-8 text-green-600 dark:text-green-400" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                24/7 Available
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                Community members from around the world ensure someone is always there when you need support.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      {activeView === 'forum' && <CommunityForum />}

      {/* Live Chat Component */}
      {showChat && <LiveChat />}
    </div>
  );
};

export default CommunityPage;

