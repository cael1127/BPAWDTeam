import React, { useState, useRef, useEffect } from 'react';
import { Send, Users, Shield, AlertCircle, X, Minimize2, Maximize2 } from 'lucide-react';

const LiveChat = () => {
  const [messages, setMessages] = useState([
    {
      id: 1,
      user: 'Moderator Sarah',
      role: 'moderator',
      message: 'Welcome to the peer support chat! This is a safe space for mutual support. Remember, we\'re here to listen and share, not to provide medical advice.',
      timestamp: new Date(Date.now() - 3600000),
      system: true
    },
    {
      id: 2,
      user: 'Alex',
      role: 'member',
      message: 'Hi everyone, having a rough day but feeling better knowing I can talk here.',
      timestamp: new Date(Date.now() - 1800000)
    },
    {
      id: 3,
      user: 'Jamie',
      role: 'member',
      message: 'You\'re not alone, Alex. We\'re here for you. What\'s been on your mind?',
      timestamp: new Date(Date.now() - 1500000)
    },
    {
      id: 4,
      user: 'Dr. Martinez',
      role: 'counselor',
      message: 'Remember everyone, if you\'re experiencing a crisis, please call 988 or text HOME to 741741. We\'re here for support, but crisis services are equipped for emergencies.',
      timestamp: new Date(Date.now() - 900000),
      system: true
    }
  ]);

  const [inputMessage, setInputMessage] = useState('');
  const [currentUser] = useState({ name: 'You', role: 'member' });
  const [onlineUsers] = useState(23);
  const [isMinimized, setIsMinimized] = useState(false);
  const [showGuidelines, setShowGuidelines] = useState(false);
  const messagesEndRef = useRef(null);
  const chatContainerRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const getRoleBadge = (role) => {
    switch (role) {
      case 'moderator':
        return (
          <span className="inline-flex items-center px-2 py-0.5 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 text-xs rounded-full ml-2">
            <Shield className="h-3 w-3 mr-1" />
            Moderator
          </span>
        );
      case 'counselor':
        return (
          <span className="inline-flex items-center px-2 py-0.5 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300 text-xs rounded-full ml-2">
            <Shield className="h-3 w-3 mr-1" />
            Counselor
          </span>
        );
      default:
        return null;
    }
  };

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!inputMessage.trim()) return;

    // Check for crisis keywords
    const crisisKeywords = ['suicide', 'kill myself', 'end it all', 'want to die'];
    const hasCrisisContent = crisisKeywords.some(keyword => 
      inputMessage.toLowerCase().includes(keyword)
    );

    if (hasCrisisContent) {
      // Add crisis intervention message
      const crisisMessage = {
        id: Date.now(),
        user: 'Crisis Support Bot',
        role: 'system',
        message: '🚨 If you\'re in crisis, please reach out for immediate help: Call 988 (Suicide & Crisis Lifeline) or text HOME to 741741. You can also call 911 for emergencies. You\'re not alone.',
        timestamp: new Date(),
        system: true,
        urgent: true
      };
      setMessages(prev => [...prev, crisisMessage]);
    }

    const newMessage = {
      id: Date.now() + 1,
      user: currentUser.name,
      role: currentUser.role,
      message: inputMessage,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, newMessage]);
    setInputMessage('');

    // Simulate a response (in real app, this would be from other users)
    setTimeout(() => {
      const responses = [
        { user: 'Jamie', message: 'Thanks for sharing that.' },
        { user: 'Alex', message: 'I hear you. That must be difficult.' },
        { user: 'Taylor', message: 'Sending support your way.' }
      ];
      
      const randomResponse = responses[Math.floor(Math.random() * responses.length)];
      const responseMessage = {
        id: Date.now() + 2,
        user: randomResponse.user,
        role: 'member',
        message: randomResponse.message,
        timestamp: new Date()
      };
      setMessages(prev => [...prev, responseMessage]);
    }, 2000 + Math.random() * 3000);
  };

  const formatTime = (date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  if (isMinimized) {
    return (
      <div className="fixed bottom-6 right-6 z-50">
        <button
          onClick={() => setIsMinimized(false)}
          className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-full shadow-lg flex items-center gap-2 transition-all"
        >
          <Users className="h-5 w-5" />
          <span className="font-semibold">Live Peer Chat ({onlineUsers} online)</span>
          <Maximize2 className="h-4 w-4" />
        </button>
      </div>
    );
  }

  return (
    <div className="fixed bottom-6 right-6 w-96 h-[600px] bg-white dark:bg-gray-800 rounded-lg shadow-2xl border border-gray-200 dark:border-gray-700 z-50 flex flex-col">
      {/* Header */}
      <div className="bg-green-600 text-white p-4 rounded-t-lg flex items-center justify-between">
        <div className="flex items-center">
          <Users className="h-5 w-5 mr-2" />
          <div>
            <h3 className="font-semibold">Peer Support Chat</h3>
            <p className="text-xs text-green-100">{onlineUsers} members online</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setShowGuidelines(!showGuidelines)}
            className="text-white hover:text-green-100 transition-colors"
            aria-label="Show guidelines"
          >
            <AlertCircle className="h-5 w-5" />
          </button>
          <button
            onClick={() => setIsMinimized(true)}
            className="text-white hover:text-green-100 transition-colors"
            aria-label="Minimize chat"
          >
            <Minimize2 className="h-5 w-5" />
          </button>
        </div>
      </div>

      {/* Guidelines Banner */}
      {showGuidelines && (
        <div className="bg-yellow-50 dark:bg-yellow-900/20 border-b border-yellow-200 dark:border-yellow-800 p-3">
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <h4 className="text-sm font-semibold text-yellow-800 dark:text-yellow-200 mb-1">
                Chat Guidelines
              </h4>
              <ul className="text-xs text-yellow-700 dark:text-yellow-300 space-y-1">
                <li>• Be respectful and supportive</li>
                <li>• No medical advice - share experiences only</li>
                <li>• Keep conversations confidential</li>
                <li>• Report concerning messages to moderators</li>
                <li>• In crisis? Call 988 immediately</li>
              </ul>
            </div>
            <button
              onClick={() => setShowGuidelines(false)}
              className="text-yellow-600 hover:text-yellow-800 ml-2"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        </div>
      )}

      {/* Messages */}
      <div 
        ref={chatContainerRef}
        className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50 dark:bg-gray-900"
      >
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex flex-col ${
              msg.system ? 'items-center' : msg.user === currentUser.name ? 'items-end' : 'items-start'
            }`}
          >
            {msg.system ? (
              <div className={`max-w-[85%] p-3 rounded-lg text-center text-sm ${
                msg.urgent 
                  ? 'bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-200 border border-red-300 dark:border-red-700'
                  : 'bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-200'
              }`}>
                {msg.urgent && <AlertCircle className="h-4 w-4 inline-block mr-1" />}
                <strong>{msg.user}:</strong> {msg.message}
              </div>
            ) : (
              <>
                <div className="flex items-center mb-1">
                  <span className="text-xs font-semibold text-gray-700 dark:text-gray-300">
                    {msg.user}
                  </span>
                  {getRoleBadge(msg.role)}
                  <span className="text-xs text-gray-500 dark:text-gray-400 ml-2">
                    {formatTime(msg.timestamp)}
                  </span>
                </div>
                <div
                  className={`max-w-[75%] p-3 rounded-lg ${
                    msg.user === currentUser.name
                      ? 'bg-green-600 text-white'
                      : 'bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200 border border-gray-200 dark:border-gray-700'
                  }`}
                >
                  <p className="text-sm">{msg.message}</p>
                </div>
              </>
            )}
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <form onSubmit={handleSendMessage} className="p-4 border-t border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800">
        <div className="flex items-center gap-2">
          <input
            type="text"
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            placeholder="Type your message..."
            className="flex-1 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
            maxLength={500}
          />
          <button
            type="submit"
            disabled={!inputMessage.trim()}
            className="bg-green-600 hover:bg-green-700 disabled:bg-gray-400 disabled:cursor-not-allowed text-white p-2 rounded-lg transition-colors"
            aria-label="Send message"
          >
            <Send className="h-5 w-5" />
          </button>
        </div>
        <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">
          Crisis? Call 988 or text HOME to 741741
        </p>
      </form>
    </div>
  );
};

export default LiveChat;

