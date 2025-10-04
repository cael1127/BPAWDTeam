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

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {mentalHealthDisorders.map((disorder, index) => (
            <div key={index} className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">{disorder.title}</h2>
              <p className="text-gray-600 dark:text-gray-300 mb-4">{disorder.description}</p>
              
              <div className="mb-4">
                <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Common Symptoms:</h3>
                <ul className="list-disc list-inside text-gray-600 dark:text-gray-300 space-y-1">
                  {disorder.symptoms.map((symptom, i) => (
                    <li key={i}>{symptom}</li>
                  ))}
                </ul>
              </div>
              
              <div>
                <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Available Resources:</h3>
                <ul className="list-disc list-inside text-gray-600 dark:text-gray-300 space-y-1">
                  {disorder.resources.map((resource, i) => (
                    <li key={i}>{resource}</li>
                  ))}
                </ul>
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
