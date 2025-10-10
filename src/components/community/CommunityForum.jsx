import React, { useState } from 'react';
import { MessageSquare, ThumbsUp, Reply, Flag, Shield, Users, TrendingUp } from 'lucide-react';

const CommunityForum = () => {
  const [selectedTopic, setSelectedTopic] = useState('all');
  const [posts, setPosts] = useState([
    {
      id: 1,
      author: 'Sarah M.',
      authorRole: 'member',
      topic: 'anxiety',
      title: 'Coping with Social Anxiety - My Journey',
      content: 'After years of struggling with social anxiety, I wanted to share what has helped me. Deep breathing exercises, gradual exposure, and support from this community have been life-changing.',
      likes: 24,
      replies: 12,
      timestamp: '2 hours ago',
      tags: ['anxiety', 'coping-strategies', 'success-story']
    },
    {
      id: 2,
      author: 'Michael R.',
      authorRole: 'moderator',
      topic: 'depression',
      title: 'Reminder: Small Steps Count',
      content: 'Just a reminder that recovery isn\'t linear. If you made your bed today, that\'s progress. If you reached out to one person, that\'s progress. Be kind to yourself.',
      likes: 87,
      replies: 31,
      timestamp: '5 hours ago',
      tags: ['depression', 'motivation', 'self-care']
    },
    {
      id: 3,
      author: 'Dr. Emily Chen',
      authorRole: 'counselor',
      topic: 'general',
      title: 'Understanding Panic Attacks: A Professional Perspective',
      content: 'As a licensed therapist, I want to demystify panic attacks. They are frightening but not dangerous. Here are evidence-based techniques for managing them...',
      likes: 156,
      replies: 43,
      timestamp: '1 day ago',
      tags: ['panic-attacks', 'professional-advice', 'anxiety']
    },
    {
      id: 4,
      author: 'Alex T.',
      authorRole: 'member',
      topic: 'support',
      title: 'Feeling Overwhelmed - Need Support',
      content: 'Having a really tough week. Would appreciate some encouragement and hearing how others cope during difficult times.',
      likes: 18,
      replies: 27,
      timestamp: '3 hours ago',
      tags: ['support-needed', 'crisis-support']
    }
  ]);

  const topics = [
    { id: 'all', name: 'All Topics', icon: MessageSquare, color: 'text-gray-600' },
    { id: 'anxiety', name: 'Anxiety Support', icon: Shield, color: 'text-blue-600' },
    { id: 'depression', name: 'Depression Support', icon: TrendingUp, color: 'text-purple-600' },
    { id: 'general', name: 'General Discussion', icon: Users, color: 'text-green-600' },
    { id: 'support', name: 'Peer Support', icon: MessageSquare, color: 'text-orange-600' }
  ];

  const getRoleBadge = (role) => {
    switch (role) {
      case 'moderator':
        return <span className="px-2 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 text-xs rounded-full">Moderator</span>;
      case 'counselor':
        return <span className="px-2 py-1 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300 text-xs rounded-full">Licensed Counselor</span>;
      default:
        return null;
    }
  };

  const filteredPosts = selectedTopic === 'all' 
    ? posts 
    : posts.filter(post => post.topic === selectedTopic);

  const handleLike = (postId) => {
    setPosts(posts.map(post => 
      post.id === postId ? { ...post, likes: post.likes + 1 } : post
    ));
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Community Support Forum
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Connect with others who understand. Share experiences, offer support, and build meaningful connections in a safe, moderated environment.
          </p>
        </div>

        {/* Community Guidelines Banner */}
        <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4 mb-8">
          <div className="flex items-start">
            <Shield className="h-5 w-5 text-blue-600 dark:text-blue-400 mr-3 mt-0.5 flex-shrink-0" />
            <div>
              <h3 className="font-semibold text-blue-900 dark:text-blue-200 mb-1">
                Community Guidelines
              </h3>
              <p className="text-sm text-blue-800 dark:text-blue-300">
                Be respectful, supportive, and kind. No medical advice. Report concerning content. 
                In crisis? Call 988 or text HOME to 741741 for immediate help.
              </p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Topics Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 sticky top-4">
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                Topics
              </h2>
              <div className="space-y-2">
                {topics.map((topic) => {
                  const Icon = topic.icon;
                  return (
                    <button
                      key={topic.id}
                      onClick={() => setSelectedTopic(topic.id)}
                      className={`w-full flex items-center px-3 py-2 rounded-lg transition-colors ${
                        selectedTopic === topic.id
                          ? 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300'
                          : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700'
                      }`}
                    >
                      <Icon className={`h-4 w-4 mr-2 ${topic.color}`} />
                      <span className="text-sm font-medium">{topic.name}</span>
                    </button>
                  );
                })}
              </div>

              <div className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-700">
                <button className="w-full bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg font-semibold transition-colors">
                  New Post
                </button>
              </div>

              <div className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-700">
                <h3 className="text-sm font-semibold text-gray-900 dark:text-white mb-3">
                  Forum Stats
                </h3>
                <div className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
                  <div className="flex justify-between">
                    <span>Active Members:</span>
                    <span className="font-semibold">1,247</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Total Posts:</span>
                    <span className="font-semibold">5,832</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Online Now:</span>
                    <span className="font-semibold text-green-600">87</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Posts Feed */}
          <div className="lg:col-span-3 space-y-6">
            {filteredPosts.map((post) => (
              <article 
                key={post.id}
                className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow"
              >
                <div className="p-6">
                  {/* Post Header */}
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center">
                      <div className="w-10 h-10 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mr-3">
                        <span className="text-green-600 dark:text-green-400 font-bold">
                          {post.author.split(' ').map(n => n[0]).join('')}
                        </span>
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-semibold text-gray-900 dark:text-white">
                            {post.author}
                          </span>
                          {getRoleBadge(post.authorRole)}
                        </div>
                        <span className="text-sm text-gray-500 dark:text-gray-400">
                          {post.timestamp}
                        </span>
                      </div>
                    </div>
                    <button 
                      className="text-gray-400 hover:text-red-500 transition-colors"
                      aria-label="Report post"
                    >
                      <Flag className="h-5 w-5" />
                    </button>
                  </div>

                  {/* Post Content */}
                  <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                    {post.title}
                  </h2>
                  <p className="text-gray-600 dark:text-gray-300 mb-4">
                    {post.content}
                  </p>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    {post.tags.map((tag, index) => (
                      <span 
                        key={index}
                        className="px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 text-xs rounded-full"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>

                  {/* Post Actions */}
                  <div className="flex items-center gap-4 pt-4 border-t border-gray-200 dark:border-gray-700">
                    <button
                      onClick={() => handleLike(post.id)}
                      className="flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-green-600 dark:hover:text-green-400 transition-colors"
                    >
                      <ThumbsUp className="h-5 w-5" />
                      <span className="font-medium">{post.likes}</span>
                    </button>
                    <button className="flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                      <Reply className="h-5 w-5" />
                      <span className="font-medium">{post.replies} Replies</span>
                    </button>
                  </div>
                </div>
              </article>
            ))}

            {filteredPosts.length === 0 && (
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-12 text-center">
                <MessageSquare className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                  No posts yet
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  Be the first to start a conversation in this topic!
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CommunityForum;

