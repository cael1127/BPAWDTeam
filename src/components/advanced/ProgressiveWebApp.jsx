import React, { useState, useEffect } from 'react';
import { Download, Wifi, WifiOff, Bell, Share } from 'lucide-react';

const ProgressiveWebApp = () => {
  const [isInstalled, setIsInstalled] = useState(false);
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  const [deferredPrompt, setDeferredPrompt] = useState(null);
  const [notificationsSupported, setNotificationsSupported] = useState(false);
  const [shareSupported, setShareSupported] = useState(false);

  useEffect(() => {
    // Check if app is already installed
    if (window.matchMedia('(display-mode: standalone)').matches) {
      setIsInstalled(true);
    }

    // Check for PWA install prompt
    window.addEventListener('beforeinstallprompt', (e) => {
      e.preventDefault();
      setDeferredPrompt(e);
    });

    // Check if app was successfully installed
    window.addEventListener('appinstalled', () => {
      setIsInstalled(true);
      setDeferredPrompt(null);
    });

    // Monitor online/offline status
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    // Check notification support
    if ('Notification' in window) {
      setNotificationsSupported(true);
    }

    // Check share API support
    if (navigator.share) {
      setShareSupported(true);
    }

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  const handleInstall = async () => {
    if (!deferredPrompt) return;

    deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;
    
    if (outcome === 'accepted') {
      console.log('PWA installed successfully');
    } else {
      console.log('PWA installation declined');
    }
    
    setDeferredPrompt(null);
  };

  const requestNotificationPermission = async () => {
    if (!notificationsSupported) return;

    try {
      const permission = await Notification.requestPermission();
      if (permission === 'granted') {
        // Schedule a test notification
        setTimeout(() => {
          new Notification('MindWell', {
            body: 'Thank you for enabling notifications! We\'ll keep you updated on your mental health journey.',
            icon: '/icon-192x192.png',
            badge: '/badge-72x72.png'
          });
        }, 1000);
      }
    } catch (error) {
      console.error('Error requesting notification permission:', error);
    }
  };

  const handleShare = async () => {
    if (!shareSupported) {
      // Fallback to copying URL to clipboard
      try {
        await navigator.clipboard.writeText(window.location.href);
        alert('Link copied to clipboard!');
      } catch (error) {
        console.error('Error copying to clipboard:', error);
      }
      return;
    }

    try {
      await navigator.share({
        title: 'MindWell - Mental Health Support',
        text: 'Check out this mental health awareness platform',
        url: window.location.href
      });
    } catch (error) {
      console.error('Error sharing:', error);
    }
  };

  const getConnectionStatus = () => {
    if (!isOnline) {
      return {
        icon: <WifiOff className="h-4 w-4 text-red-500" />,
        text: 'Offline Mode',
        color: 'text-red-600 bg-red-100 dark:bg-red-900/20'
      };
    }
    
    return {
      icon: <Wifi className="h-4 w-4 text-green-500" />,
      text: 'Online',
      color: 'text-green-600 bg-green-100 dark:bg-green-900/20'
    };
  };

  const connectionStatus = getConnectionStatus();

  return (
    <div className="space-y-4">
      {/* PWA Installation Prompt */}
      {!isInstalled && deferredPrompt && (
        <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-semibold text-blue-800 dark:text-blue-200 mb-1">
                Install MindWell App
              </h3>
              <p className="text-sm text-blue-700 dark:text-blue-300">
                Get quick access and offline functionality by installing our app.
              </p>
            </div>
            <button
              onClick={handleInstall}
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-colors flex items-center"
            >
              <Download className="h-4 w-4 mr-2" />
              Install
            </button>
          </div>
        </div>
      )}

      {/* Connection Status */}
      <div className={`inline-flex items-center px-3 py-2 rounded-full text-sm font-medium ${connectionStatus.color}`}>
        {connectionStatus.icon}
        <span className="ml-2">{connectionStatus.text}</span>
      </div>

      {/* PWA Features */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Offline Capability */}
        <div className="bg-white dark:bg-gray-800 p-4 rounded-lg border border-gray-200 dark:border-gray-700">
          <div className="flex items-center mb-3">
            <WifiOff className="h-5 w-5 text-gray-600 dark:text-gray-400 mr-2" />
            <h3 className="font-semibold text-gray-900 dark:text-white">Offline Access</h3>
          </div>
          <p className="text-sm text-gray-600 dark:text-gray-300 mb-3">
            Access crisis resources and mood tracking even without internet connection.
          </p>
          <div className="text-xs text-gray-500 dark:text-gray-400">
            Cached resources available offline
          </div>
        </div>

        {/* Push Notifications */}
        {notificationsSupported && (
          <div className="bg-white dark:bg-gray-800 p-4 rounded-lg border border-gray-200 dark:border-gray-700">
            <div className="flex items-center mb-3">
              <Bell className="h-5 w-5 text-gray-600 dark:text-gray-400 mr-2" />
              <h3 className="font-semibold text-gray-900 dark:text-white">Notifications</h3>
            </div>
            <p className="text-sm text-gray-600 dark:text-gray-300 mb-3">
              Get gentle reminders for mood check-ins and mental health tips.
            </p>
            <button
              onClick={requestNotificationPermission}
              className="text-xs bg-green-100 hover:bg-green-200 dark:bg-green-900/30 dark:hover:bg-green-900/50 text-green-700 dark:text-green-300 px-2 py-1 rounded transition-colors"
            >
              Enable Notifications
            </button>
          </div>
        )}

        {/* Share Functionality */}
        {shareSupported && (
          <div className="bg-white dark:bg-gray-800 p-4 rounded-lg border border-gray-200 dark:border-gray-700">
            <div className="flex items-center mb-3">
              <Share className="h-5 w-5 text-gray-600 dark:text-gray-400 mr-2" />
              <h3 className="font-semibold text-gray-900 dark:text-white">Easy Sharing</h3>
            </div>
            <p className="text-sm text-gray-600 dark:text-gray-300 mb-3">
              Share mental health resources with friends and family.
            </p>
            <button
              onClick={handleShare}
              className="text-xs bg-blue-100 hover:bg-blue-200 dark:bg-blue-900/30 dark:hover:bg-blue-900/50 text-blue-700 dark:text-blue-300 px-2 py-1 rounded transition-colors"
            >
              Share App
            </button>
          </div>
        )}
      </div>

      {/* PWA Benefits */}
      <div className="bg-gradient-to-r from-green-50 to-blue-50 dark:from-green-900/20 dark:to-blue-900/20 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
          Why Install the MindWell App?
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
          <div className="space-y-2">
            <div className="flex items-start">
              <span className="text-green-600 dark:text-green-400 mr-2">✓</span>
              <span className="text-gray-700 dark:text-gray-300">Access crisis resources offline</span>
            </div>
            <div className="flex items-start">
              <span className="text-green-600 dark:text-green-400 mr-2">✓</span>
              <span className="text-gray-700 dark:text-gray-300">Faster loading and better performance</span>
            </div>
            <div className="flex items-start">
              <span className="text-green-600 dark:text-green-400 mr-2">✓</span>
              <span className="text-gray-700 dark:text-gray-300">Native app-like experience</span>
            </div>
          </div>
          <div className="space-y-2">
            <div className="flex items-start">
              <span className="text-green-600 dark:text-green-400 mr-2">✓</span>
              <span className="text-gray-700 dark:text-gray-300">Gentle mood check-in reminders</span>
            </div>
            <div className="flex items-start">
              <span className="text-green-600 dark:text-green-400 mr-2">✓</span>
              <span className="text-gray-700 dark:text-gray-300">Secure, encrypted data storage</span>
            </div>
            <div className="flex items-start">
              <span className="text-green-600 dark:text-green-400 mr-2">✓</span>
              <span className="text-gray-700 dark:text-gray-300">Works on all devices</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProgressiveWebApp;

