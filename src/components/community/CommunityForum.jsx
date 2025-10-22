import React, { useState, useEffect } from 'react';
import { MessageSquare, ThumbsUp, Reply, Flag, Shield, Users, TrendingUp, Send } from 'lucide-react';
import communityService from '../../services/communityService';

const CommunityForum = () => {
  const [selectedTopic, setSelectedTopic] = useState('all');
  const [selectedPost, setSelectedPost] = useState(null);
  const [likedPosts, setLikedPosts] = useState(new Set());
  const [showNewPostForm, setShowNewPostForm] = useState(false);
  const [newPost, setNewPost] = useState({
    title: '',
    content: '',
    topic: 'general',
    tags: []
  });
  const [posts, setPosts] = useState([]);
  const [replyText, setReplyText] = useState('');

  // Load data from service on component mount
  useEffect(() => {
    setPosts(communityService.getPosts());
    setLikedPosts(communityService.getLikedPosts());
  }, []);

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
    const result = communityService.toggleLike(postId);
    if (result) {
      setLikedPosts(communityService.getLikedPosts());
      setPosts(communityService.getPosts());
    }
  };

  const handleViewReplies = (post) => {
    setSelectedPost(post);
  };

  const handleNewPost = () => {
    if (newPost.title.trim() && newPost.content.trim()) {
      const post = {
        author: 'You',
        authorRole: 'member',
        topic: newPost.topic,
        title: newPost.title,
        content: newPost.content,
        tags: newPost.tags
      };
      const newPostData = communityService.addPost(post);
      setPosts(communityService.getPosts());
      setNewPost({ title: '', content: '', topic: 'general', tags: [] });
      setShowNewPostForm(false);
    }
  };

  const handleAddReply = () => {
    if (replyText.trim() && selectedPost) {
      const reply = {
        author: 'You',
        content: replyText.trim(),
        timestamp: 'Just now'
      };
      communityService.addReply(selectedPost.id, reply);
      setPosts(communityService.getPosts());
      setReplyText('');
      // Update selectedPost with new data
      setSelectedPost(communityService.getPosts().find(p => p.id === selectedPost.id));
    }
  };

  const handleLikeReply = (postId, replyId) => {
    const newLikes = communityService.likeReply(postId, replyId);
    if (newLikes !== null) {
      setPosts(communityService.getPosts());
      setSelectedPost(communityService.getPosts().find(p => p.id === postId));
    }
  };

  const handleTagInput = (e) => {
    if (e.key === 'Enter' && e.target.value.trim()) {
      const tag = e.target.value.trim().toLowerCase();
      if (!newPost.tags.includes(tag)) {
        setNewPost({ ...newPost, tags: [...newPost.tags, tag] });
        e.target.value = '';
      }
    }
  };

  const removeTag = (tagToRemove) => {
    setNewPost({ ...newPost, tags: newPost.tags.filter(tag => tag !== tagToRemove) });
  };

  return (
    <div className="max-w-6xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8">
        <div>
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Community Forum</h2>
          <p className="text-gray-600 dark:text-gray-300">Share experiences, offer support, and connect with others</p>
        </div>
        <button
          onClick={() => setShowNewPostForm(true)}
          className="mt-4 sm:mt-0 bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg font-semibold transition-all duration-200 transform hover:scale-105 active:scale-95"
        >
          + New Post
        </button>
      </div>

      {/* Topic Filter */}
      <div className="flex flex-wrap gap-2 mb-8">
        {topics.map((topic) => {
          const Icon = topic.icon;
          return (
            <button
              key={topic.id}
              onClick={() => setSelectedTopic(topic.id)}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all duration-200 transform hover:scale-105 ${
                selectedTopic === topic.id
                  ? 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300'
                  : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
              }`}
            >
              <Icon className="h-4 w-4" />
              {topic.name}
            </button>
          );
        })}
      </div>

      {/* Posts Grid */}
      <div className="grid gap-6">
        {filteredPosts.map((post) => (
          <div key={post.id} className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 hover:shadow-xl transition-all duration-300 transform hover:scale-[1.02]">
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center">
                  <span className="text-green-600 dark:text-green-400 font-semibold">
                    {post.author.split(' ').map(n => n[0]).join('')}
                  </span>
                </div>
                <div>
                  <div className="flex items-center space-x-2">
                    <span className="font-semibold text-gray-900 dark:text-white">{post.author}</span>
                    {post.authorRole && getRoleBadge(post.authorRole)}
                  </div>
                  <span className="text-sm text-gray-500 dark:text-gray-400">{post.timestamp}</span>
                </div>
              </div>
              <button className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300">
                <Flag className="h-5 w-5" />
              </button>
            </div>

            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">{post.title}</h3>
            <p className="text-gray-700 dark:text-gray-300 mb-4 leading-relaxed">{post.content}</p>

            {post.tags && post.tags.length > 0 && (
              <div className="flex flex-wrap gap-2 mb-4">
                {post.tags.map((tag, index) => (
                  <span
                    key={index}
                    className="px-3 py-1 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 text-sm rounded-full"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            )}

            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-6">
                <button
                  onClick={() => handleLike(post.id)}
                  className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-all duration-200 transform hover:scale-105 ${
                    likedPosts.has(post.id)
                      ? 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300'
                      : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                  }`}
                >
                  <ThumbsUp className="h-4 w-4" />
                  <span className="text-sm font-medium">{post.likes}</span>
                </button>
                <button
                  onClick={() => handleViewReplies(post)}
                  className="flex items-center space-x-2 px-4 py-2 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-all duration-200 transform hover:scale-105"
                >
                  <Reply className="h-4 w-4" />
                  <span className="text-sm font-medium">{post.replies}</span>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* New Post Modal */}
      {showNewPostForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-hidden">
            <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Create New Post</h2>
              <button
                onClick={() => setShowNewPostForm(false)}
                className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
              >
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <div className="overflow-y-auto max-h-[calc(90vh-120px)]">
              <div className="p-6 space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Topic</label>
                  <select
                    value={newPost.topic}
                    onChange={(e) => setNewPost({ ...newPost, topic: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 dark:bg-gray-700 dark:text-white"
                  >
                    <option value="general">General Discussion</option>
                    <option value="anxiety">Anxiety Support</option>
                    <option value="depression">Depression Support</option>
                    <option value="support">Peer Support</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Title</label>
                  <input
                    type="text"
                    value={newPost.title}
                    onChange={(e) => setNewPost({ ...newPost, title: e.target.value })}
                    placeholder="Enter a descriptive title..."
                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 dark:bg-gray-700 dark:text-white"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Content</label>
                  <textarea
                    value={newPost.content}
                    onChange={(e) => setNewPost({ ...newPost, content: e.target.value })}
                    placeholder="Share your thoughts, experiences, or ask for support..."
                    rows={6}
                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 dark:bg-gray-700 dark:text-white resize-none"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Tags (optional)</label>
                  <input
                    type="text"
                    onKeyPress={handleTagInput}
                    placeholder="Type a tag and press Enter..."
                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 dark:bg-gray-700 dark:text-white"
                  />
                  {newPost.tags.length > 0 && (
                    <div className="flex flex-wrap gap-2 mt-2">
                      {newPost.tags.map((tag, index) => (
                        <span
                          key={index}
                          className="inline-flex items-center gap-1 px-3 py-1 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300 text-sm rounded-full"
                        >
                          #{tag}
                          <button
                            onClick={() => removeTag(tag)}
                            className="ml-1 text-green-500 hover:text-green-700 dark:hover:text-green-300"
                          >
                            ×
                          </button>
                        </span>
                      ))}
                    </div>
                  )}
                </div>

                <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg">
                  <h4 className="font-semibold text-blue-900 dark:text-blue-200 mb-2">Community Guidelines</h4>
                  <ul className="text-sm text-blue-800 dark:text-blue-300 space-y-1">
                    <li>• Be respectful and supportive of others</li>
                    <li>• Share your own experiences, not medical advice</li>
                    <li>• Use appropriate language and avoid triggering content</li>
                    <li>• Report any concerning posts to moderators</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-end gap-4 p-6 border-t border-gray-200 dark:border-gray-700">
              <button
                onClick={() => setShowNewPostForm(false)}
                className="px-4 py-2 text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleNewPost}
                disabled={!newPost.title.trim() || !newPost.content.trim()}
                className="px-6 py-2 bg-green-600 hover:bg-green-700 disabled:bg-gray-400 disabled:cursor-not-allowed text-white rounded-lg font-semibold transition-colors"
              >
                Post
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Replies Modal */}
      {selectedPost && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] overflow-hidden">
            <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Replies</h2>
              <button
                onClick={() => setSelectedPost(null)}
                className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
              >
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <div className="overflow-y-auto max-h-[calc(90vh-200px)]">
              <div className="p-6">
                {/* Original Post */}
                <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4 mb-6">
                  <div className="flex items-center space-x-3 mb-3">
                    <div className="w-8 h-8 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center">
                      <span className="text-green-600 dark:text-green-400 font-semibold text-sm">
                        {selectedPost.author.split(' ').map(n => n[0]).join('')}
                      </span>
                    </div>
                    <div>
                      <div className="flex items-center space-x-2">
                        <span className="font-semibold text-gray-900 dark:text-white">{selectedPost.author}</span>
                        {selectedPost.authorRole && getRoleBadge(selectedPost.authorRole)}
                      </div>
                      <span className="text-sm text-gray-500 dark:text-gray-400">{selectedPost.timestamp}</span>
                    </div>
                  </div>
                  <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">{selectedPost.title}</h3>
                  <p className="text-gray-700 dark:text-gray-300">{selectedPost.content}</p>
                </div>

                {/* Replies */}
                <div className="space-y-4 mb-6">
                  {selectedPost.repliesData?.map((reply) => (
                    <div key={reply.id} className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-4">
                      <div className="flex items-start justify-between mb-2">
                        <div className="flex items-center space-x-3">
                          <div className="w-8 h-8 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center">
                            <span className="text-blue-600 dark:text-blue-400 font-semibold text-sm">
                              {reply.author.split(' ').map(n => n[0]).join('')}
                            </span>
                          </div>
                          <div>
                            <div className="flex items-center space-x-2">
                              <span className="font-semibold text-gray-900 dark:text-white">{reply.author}</span>
                              {reply.authorRole && getRoleBadge(reply.authorRole)}
                            </div>
                            <span className="text-sm text-gray-500 dark:text-gray-400">{reply.timestamp}</span>
                          </div>
                        </div>
                        <button
                          onClick={() => handleLikeReply(selectedPost.id, reply.id)}
                          className="flex items-center space-x-1 text-gray-500 hover:text-green-600 dark:hover:text-green-400 transition-colors"
                        >
                          <ThumbsUp className="h-4 w-4" />
                          <span className="text-xs">{reply.likes}</span>
                        </button>
                      </div>
                      <p className="text-gray-700 dark:text-gray-300">{reply.content}</p>
                    </div>
                  ))}
                  {(!selectedPost.repliesData || selectedPost.repliesData.length === 0) && (
                    <div className="text-center py-8 text-gray-500 dark:text-gray-400">
                      <MessageSquare className="h-12 w-12 mx-auto mb-4 opacity-50" />
                      <p>Be the first to reply to this post!</p>
                    </div>
                  )}
                </div>

                {/* Add Reply Form */}
                <div className="border-t border-gray-200 dark:border-gray-700 pt-4">
                  <div className="flex space-x-4">
                    <input
                      type="text"
                      value={replyText}
                      onChange={(e) => setReplyText(e.target.value)}
                      placeholder="Write a reply..."
                      className="flex-1 px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 dark:bg-gray-700 dark:text-white"
                      onKeyPress={(e) => {
                        if (e.key === 'Enter' && !e.shiftKey) {
                          e.preventDefault();
                          handleAddReply();
                        }
                      }}
                    />
                    <button
                      onClick={handleAddReply}
                      disabled={!replyText.trim()}
                      className="px-6 py-3 bg-green-600 hover:bg-green-700 disabled:bg-gray-400 disabled:cursor-not-allowed text-white rounded-lg font-semibold transition-colors flex items-center space-x-2"
                    >
                      <Send className="h-4 w-4" />
                      <span>Reply</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CommunityForum;