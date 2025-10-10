import React from 'react';
import { Heart } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white py-8 px-4 sm:px-6 lg:px-8" role="contentinfo">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="flex items-center space-x-2 mb-4 md:mb-0">
            <Heart className="h-6 w-6 text-green-400" aria-hidden="true" />
            <span className="text-xl font-bold">MindWell</span>
          </div>
          <div className="text-center md:text-right">
            <p className="text-gray-300 mb-2">© 2026 MindWell Mental Health Awareness Campaign</p>
            <p className="text-gray-400 text-sm">This is a demonstration project for BPA competition</p>
          </div>
        </div>
        <div className="mt-8 pt-8 border-t border-gray-700 text-center" role="complementary" aria-label="Crisis resources">
          <p className="text-gray-400">
            In crisis? Call <a href="tel:988" className="text-green-400 hover:text-green-300 focus:outline-none focus:ring-2 focus:ring-green-500 focus:rounded">988</a> or text HOME to <a href="sms:741741&body=HOME" className="text-green-400 hover:text-green-300 focus:outline-none focus:ring-2 focus:ring-green-500 focus:rounded">741741</a>. You are not alone.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
