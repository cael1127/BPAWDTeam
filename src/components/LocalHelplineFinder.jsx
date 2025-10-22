import React, { useState } from 'react';
import { MapPin, Phone, Search, AlertCircle } from 'lucide-react';
import { findLocalHelplines } from '../data/mentalHealthData';

const LocalHelplineFinder = () => {
  const [zipCode, setZipCode] = useState('');
  const [localResources, setLocalResources] = useState(null);
  const [error, setError] = useState('');

  const handleSearch = (e) => {
    e.preventDefault();
    setError('');
    
    if (!zipCode.trim()) {
      setError('Please enter a zip code');
      return;
    }
    
    if (!/^\d{5}(-\d{4})?$/.test(zipCode.trim())) {
      setError('Please enter a valid 5-digit zip code');
      return;
    }
    
    const resources = findLocalHelplines(zipCode.trim());
    setLocalResources(resources);
  };

  const handleCall = (number) => {
    window.open(`tel:${number}`, '_self');
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
      <div className="flex items-center mb-6">
        <MapPin className="h-6 w-6 text-green-600 mr-3" />
        <h3 className="text-xl font-bold text-gray-900 dark:text-white">
          Find Local Mental Health Resources
        </h3>
      </div>
      
      <p className="text-gray-600 dark:text-gray-300 mb-6">
        Enter your zip code to find mental health resources and crisis support services in your area.
      </p>
      
      <form onSubmit={handleSearch} className="mb-6">
        <div className="flex gap-4">
          <div className="flex-1">
            <input
              type="text"
              value={zipCode}
              onChange={(e) => setZipCode(e.target.value)}
              placeholder="Enter your zip code (e.g., 10001)"
              className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 dark:bg-gray-700 dark:text-white transition-all duration-200"
              maxLength="10"
            />
          </div>
          <button
            type="submit"
            className="px-6 py-3 bg-green-600 hover:bg-green-700 text-white rounded-lg font-semibold transition-all duration-200 transform hover:scale-105 active:scale-95 flex items-center gap-2"
          >
            <Search className="h-5 w-5" />
            Search
          </button>
        </div>
        {error && (
          <div className="mt-2 flex items-center text-red-600 dark:text-red-400">
            <AlertCircle className="h-4 w-4 mr-2" />
            <span className="text-sm">{error}</span>
          </div>
        )}
      </form>
      
      {localResources && (
        <div className="space-y-4">
          <div className="flex items-center mb-4">
            <MapPin className="h-5 w-5 text-green-600 mr-2" />
            <h4 className="text-lg font-semibold text-gray-900 dark:text-white">
              Resources for {localResources.city}
            </h4>
          </div>
          
          <div className="grid gap-4">
            {localResources.helplines.map((helpline, index) => (
              <div
                key={index}
                className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4 border border-gray-200 dark:border-gray-600 hover:shadow-md transition-all duration-200"
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <h5 className="font-semibold text-gray-900 dark:text-white mb-1">
                      {helpline.name}
                    </h5>
                    <p className="text-sm text-gray-600 dark:text-gray-300 mb-2">
                      {helpline.description}
                    </p>
                    <div className="flex items-center gap-4">
                      <span className="text-sm font-medium text-green-600 dark:text-green-400">
                        {helpline.type}
                      </span>
                      <span className="text-sm text-gray-500 dark:text-gray-400">
                        {helpline.number}
                      </span>
                    </div>
                  </div>
                  <button
                    onClick={() => handleCall(helpline.number.replace(/\D/g, ''))}
                    className="ml-4 p-2 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-all duration-200 transform hover:scale-105 active:scale-95"
                    title="Call this number"
                  >
                    <Phone className="h-4 w-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
          
          <div className="mt-6 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
            <div className="flex items-start">
              <AlertCircle className="h-5 w-5 text-blue-600 dark:text-blue-400 mr-3 mt-0.5 flex-shrink-0" />
              <div>
                <h5 className="font-semibold text-blue-900 dark:text-blue-200 mb-1">
                  Need Immediate Help?
                </h5>
                <p className="text-sm text-blue-800 dark:text-blue-300">
                  If you're in crisis or having thoughts of self-harm, call 988 (Suicide & Crisis Lifeline) 
                  or text HOME to 741741 (Crisis Text Line) for immediate support.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default LocalHelplineFinder;
