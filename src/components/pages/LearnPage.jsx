import React from 'react';
import { Shield } from 'lucide-react';
import { mentalHealthDisorders } from '../../data/mentalHealthData';

const LearnPage = () => {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">Understanding Mental Health</h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Knowledge is power. Learn about common mental health conditions, their symptoms, and available resources.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8">
          {mentalHealthDisorders.map((disorder, index) => (
            <div key={index} className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 hover:shadow-xl transition-all duration-300 transform hover:scale-105 group">
              <div className="flex items-start justify-between mb-4">
                <h2 className="text-xl font-bold text-gray-900 dark:text-white group-hover:text-green-600 dark:group-hover:text-green-400 transition-colors">{disorder.title}</h2>
                <Shield className="h-6 w-6 text-green-600 dark:text-green-400 flex-shrink-0" />
              </div>
              
              <p className="text-gray-600 dark:text-gray-300 mb-4 text-sm leading-relaxed">{disorder.description}</p>
              
              {/* Prevalence and Treatment Info */}
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div className="bg-green-50 dark:bg-green-900/20 rounded-lg p-3">
                  <h4 className="text-xs font-semibold text-green-800 dark:text-green-200 mb-1">Prevalence</h4>
                  <p className="text-sm text-green-700 dark:text-green-300">{disorder.prevalence}</p>
                </div>
                <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-3">
                  <h4 className="text-xs font-semibold text-blue-800 dark:text-blue-200 mb-1">Treatment</h4>
                  <p className="text-sm text-blue-700 dark:text-blue-300">{disorder.treatment}</p>
                </div>
              </div>
              
              <div className="mb-4">
                <h3 className="font-semibold text-gray-900 dark:text-white mb-2 text-sm">Common Symptoms:</h3>
                <div className="flex flex-wrap gap-1">
                  {disorder.symptoms.slice(0, 4).map((symptom, i) => (
                    <span key={i} className="px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 text-xs rounded-full">
                      {symptom}
                    </span>
                  ))}
                  {disorder.symptoms.length > 4 && (
                    <span className="px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-500 dark:text-gray-400 text-xs rounded-full">
                      +{disorder.symptoms.length - 4} more
                    </span>
                  )}
                </div>
              </div>
              
              <div>
                <h3 className="font-semibold text-gray-900 dark:text-white mb-2 text-sm">Available Resources:</h3>
                <div className="flex flex-wrap gap-1">
                  {disorder.resources.slice(0, 3).map((resource, i) => (
                    <span key={i} className="px-2 py-1 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300 text-xs rounded-full">
                      {resource}
                    </span>
                  ))}
                  {disorder.resources.length > 3 && (
                    <span className="px-2 py-1 bg-green-100 dark:bg-green-900/30 text-green-500 dark:text-green-400 text-xs rounded-full">
                      +{disorder.resources.length - 3} more
                    </span>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 bg-blue-50 dark:bg-blue-900/20 rounded-xl p-8 text-center">
          <Shield className="h-12 w-12 text-blue-600 dark:text-blue-400 mx-auto mb-4" />
          <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Remember</h3>
          <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Mental health conditions are treatable. Seeking help is a sign of strength, not weakness. 
            You deserve support and care.
          </p>
        </div>
      </div>
    </div>
  );
};

export default LearnPage;
