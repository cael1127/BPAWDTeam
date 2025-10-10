import React, { useState, useEffect } from 'react';
import { MessageCircle, Send, Bot, User, Loader2 } from 'lucide-react';

const AIAssistant = () => {
  const [messages, setMessages] = useState([
    {
      id: 1,
      type: 'bot',
      text: "Hi! I'm your mental health assistant. I'm here to help you find resources, answer questions, or just listen. How can I support you today?",
      timestamp: new Date()
    }
  ]);
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  // AI knowledge base for mental health resources
  const knowledgeBase = {
    crisis: {
      keywords: ['suicide', 'kill myself', 'end it', 'hopeless', 'crisis', 'emergency'],
      response: "I'm concerned about what you're saying. If you're having thoughts of suicide, please reach out for help immediately. Call 988 (Suicide & Crisis Lifeline) or text HOME to 741741. You're not alone, and help is available 24/7.",
      priority: 'high'
    },
    anxiety: {
      keywords: ['anxious', 'anxiety', 'panic', 'worried', 'nervous', 'overwhelmed'],
      response: "Anxiety can be really challenging. Here are some immediate strategies: Take 5 deep breaths, try the 5-4-3-2-1 grounding technique (5 things you see, 4 you hear, 3 you touch, 2 you smell, 1 you taste), or try progressive muscle relaxation. Would you like me to guide you through any of these techniques?",
      priority: 'medium'
    },
    depression: {
      keywords: ['depressed', 'depression', 'sad', 'hopeless', 'empty', 'worthless'],
      response: "I hear that you're struggling with depression. Remember that depression is treatable and you don't have to face this alone. Consider reaching out to a mental health professional. In the meantime, try to maintain a routine, get some sunlight, and stay connected with supportive people.",
      priority: 'medium'
    },
    sleep: {
      keywords: ['sleep', 'insomnia', 'tired', 'exhausted', 'can\'t sleep'],
      response: "Sleep issues can really impact your mental health. Try establishing a bedtime routine, limit screen time before bed, keep your room cool and dark, and avoid caffeine in the afternoon. If sleep problems persist, consider speaking with a healthcare provider.",
      priority: 'low'
    },
    therapy: {
      keywords: ['therapy', 'counselor', 'therapist', 'treatment', 'help'],
      response: "Therapy can be incredibly helpful for mental health. You can find therapists through your insurance provider, Psychology Today's therapist finder, or local mental health clinics. Many offer sliding scale fees if cost is a concern. Would you like help finding resources in your area?",
      priority: 'low'
    },
    general: {
      response: "I understand you're going through a difficult time. While I can provide general support and resources, I'm not a replacement for professional mental health care. Consider reaching out to a counselor or therapist for personalized support. You can also use our mood tracker to monitor your emotional patterns.",
      priority: 'low'
    }
  };

  const analyzeMessage = (message) => {
    const lowerMessage = message.toLowerCase();
    
    // Check for crisis keywords first
    for (const [topic, data] of Object.entries(knowledgeBase)) {
      if (data.keywords) {
        for (const keyword of data.keywords) {
          if (lowerMessage.includes(keyword.toLowerCase())) {
            return { topic, response: data.response, priority: data.priority };
          }
        }
      }
    }
    
    return { topic: 'general', response: knowledgeBase.general.response, priority: 'low' };
  };

  const handleSendMessage = async () => {
    if (!inputText.trim()) return;

    const userMessage = {
      id: Date.now(),
      type: 'user',
      text: inputText,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputText('');
    setIsTyping(true);

    // Simulate AI processing time
    setTimeout(() => {
      const analysis = analyzeMessage(inputText);
      
      const botMessage = {
        id: Date.now() + 1,
        type: 'bot',
        text: analysis.response,
        priority: analysis.priority,
        timestamp: new Date()
      };

      setMessages(prev => [...prev, botMessage]);
      setIsTyping(false);

      // If high priority (crisis), also show crisis resources
      if (analysis.priority === 'high') {
        setTimeout(() => {
          const crisisMessage = {
            id: Date.now() + 2,
            type: 'bot',
            text: "Additional crisis resources: SAMHSA National Helpline: 1-800-662-4357, Crisis Text Line: Text HOME to 741741, National Suicide Prevention Lifeline: 988",
            priority: 'high',
            timestamp: new Date()
          };
          setMessages(prev => [...prev, crisisMessage]);
        }, 1000);
      }
    }, 1500);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high': return 'border-red-200 bg-red-50 dark:bg-red-900/20';
      case 'medium': return 'border-yellow-200 bg-yellow-50 dark:bg-yellow-900/20';
      default: return 'border-gray-200 bg-white dark:bg-gray-800';
    }
  };

  if (!isOpen) {
    return (
      <div className="fixed bottom-6 right-6 z-40">
        <button
          onClick={() => setIsOpen(true)}
          className="bg-green-600 hover:bg-green-700 text-white p-4 rounded-full shadow-lg transition-all duration-300 hover:scale-110"
          aria-label="Open AI Assistant"
        >
          <MessageCircle className="h-6 w-6" />
        </button>
      </div>
    );
  }

  return (
    <div className="fixed bottom-6 right-6 w-80 h-96 bg-white dark:bg-gray-800 rounded-lg shadow-2xl border border-gray-200 dark:border-gray-700 z-50 flex flex-col">
      {/* Header */}
      <div className="bg-green-600 text-white p-4 rounded-t-lg flex items-center justify-between">
        <div className="flex items-center">
          <Bot className="h-5 w-5 mr-2" />
          <h3 className="font-semibold">Mental Health Assistant</h3>
        </div>
        <button
          onClick={() => setIsOpen(false)}
          className="text-white hover:text-gray-200 text-xl"
        >
          ×
        </button>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-3">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`max-w-xs p-3 rounded-lg ${
                message.type === 'user'
                  ? 'bg-green-600 text-white'
                  : `${getPriorityColor(message.priority)} text-gray-800 dark:text-gray-200`
              }`}
            >
              <div className="flex items-start">
                {message.type === 'bot' && (
                  <Bot className="h-4 w-4 mr-2 mt-0.5 flex-shrink-0" />
                )}
                <div>
                  <p className="text-sm">{message.text}</p>
                  <p className="text-xs opacity-70 mt-1">
                    {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </p>
                </div>
              </div>
            </div>
          </div>
        ))}
        
        {isTyping && (
          <div className="flex justify-start">
            <div className="bg-gray-100 dark:bg-gray-700 p-3 rounded-lg">
              <div className="flex items-center">
                <Bot className="h-4 w-4 mr-2" />
                <Loader2 className="h-4 w-4 animate-spin" />
                <span className="ml-2 text-sm text-gray-600 dark:text-gray-300">
                  Assistant is typing...
                </span>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Input */}
      <div className="p-4 border-t border-gray-200 dark:border-gray-700">
        <div className="flex space-x-2">
          <input
            type="text"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Type your message..."
            className="flex-1 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
          />
          <button
            onClick={handleSendMessage}
            disabled={!inputText.trim() || isTyping}
            className="bg-green-600 hover:bg-green-700 disabled:bg-gray-400 text-white p-2 rounded-md transition-colors"
          >
            <Send className="h-4 w-4" />
          </button>
        </div>
        <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">
          I'm an AI assistant. For emergencies, call 988 or text HOME to 741741.
        </p>
      </div>
    </div>
  );
};

export default AIAssistant;

