import React from 'react';
import { Phone, Users } from 'lucide-react';
import { helplines } from '../../data/mentalHealthData';
import AppointmentForm from '../forms/AppointmentForm';
import LocalHelplineFinder from '../LocalHelplineFinder';

const SupportPage = () => {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">Support & Resources</h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Immediate help, professional counseling, and community support are just a click away.
          </p>
        </div>

        {/* Local Helpline Finder */}
        <section className="mb-16">
          <LocalHelplineFinder />
        </section>

        {/* National Helplines */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8 text-center">National Crisis Helplines</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {helplines.map((helpline, index) => (
              <div key={index} className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 hover:shadow-xl transition-all duration-300 transform hover:scale-105">
                <div className="flex items-center mb-4">
                  <Phone className="h-6 w-6 text-red-500 mr-3" />
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white">{helpline.name}</h3>
                </div>
                <p className="text-2xl font-bold text-gray-900 dark:text-white mb-2">{helpline.number}</p>
                <p className="text-gray-600 dark:text-gray-300">{helpline.type}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Appointment Scheduler */}
        <section className="mb-16 bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">Schedule Counseling</h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Available Services</h3>
              <ul className="space-y-3 text-gray-600 dark:text-gray-300">
                <li className="flex items-start">
                  <span className="text-green-600 dark:text-green-400 mr-2">•</span>
                  <div>
                    <strong>Individual Counseling</strong>
                    <p className="text-sm text-gray-500 dark:text-gray-400">One-on-one therapy sessions with licensed professionals</p>
                  </div>
                </li>
                <li className="flex items-start">
                  <span className="text-green-600 dark:text-green-400 mr-2">•</span>
                  <div>
                    <strong>Group Therapy Sessions</strong>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Peer support groups for shared experiences</p>
                  </div>
                </li>
                <li className="flex items-start">
                  <span className="text-green-600 dark:text-green-400 mr-2">•</span>
                  <div>
                    <strong>Crisis Intervention</strong>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Immediate support for urgent mental health situations</p>
                  </div>
                </li>
                <li className="flex items-start">
                  <span className="text-green-600 dark:text-green-400 mr-2">•</span>
                  <div>
                    <strong>Family Counseling</strong>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Therapy sessions involving family members</p>
                  </div>
                </li>
              </ul>
              
              <div className="mt-6 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                <h4 className="font-semibold text-blue-800 dark:text-blue-200 mb-2">What to Expect</h4>
                <ul className="text-sm text-blue-700 dark:text-blue-300 space-y-1">
                  <li>• Initial consultation within 24 hours</li>
                  <li>• Flexible scheduling options</li>
                  <li>• Confidential and safe environment</li>
                  <li>• Licensed mental health professionals</li>
                </ul>
              </div>
            </div>
            
            <div>
              <AppointmentForm />
            </div>
          </div>
        </section>

        {/* Community Section */}
        <section className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8">
          <div className="flex items-center mb-6">
            <Users className="h-8 w-8 text-purple-600 mr-3" />
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white">Support Community</h2>
          </div>
          <p className="text-gray-600 dark:text-gray-300 mb-6">
            Connect with others who understand what you're going through. Share experiences, offer support, 
            and build meaningful connections in a safe, moderated environment.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-purple-50 dark:bg-purple-900/20 p-4 rounded-lg">
              <h4 className="font-semibold text-purple-800 dark:text-purple-200 mb-2">Discussion Forums</h4>
              <p className="text-purple-700 dark:text-purple-300 text-sm">Topic-based conversations</p>
            </div>
            <div className="bg-purple-50 dark:bg-purple-900/20 p-4 rounded-lg">
              <h4 className="font-semibold text-purple-800 dark:text-purple-200 mb-2">Peer Support</h4>
              <p className="text-purple-700 dark:text-purple-300 text-sm">One-on-one connections</p>
            </div>
            <div className="bg-purple-50 dark:bg-purple-900/20 p-4 rounded-lg">
              <h4 className="font-semibold text-purple-800 dark:text-purple-200 mb-2">Resource Sharing</h4>
              <p className="text-purple-700 dark:text-purple-300 text-sm">Helpful tools & articles</p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default SupportPage;
