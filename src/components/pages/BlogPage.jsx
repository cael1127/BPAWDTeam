import React, { useState } from 'react';
import { blogPosts } from '../../data/mentalHealthData';
import { BookOpen, Clock, User, Tag, ArrowLeft } from 'lucide-react';

const BlogPage = () => {
  const [selectedPost, setSelectedPost] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState('all');

  const categories = ['all', ...new Set(blogPosts.map(post => post.category))];

  const filteredPosts = selectedCategory === 'all'
    ? blogPosts
    : blogPosts.filter(post => post.category === selectedCategory);

  if (selectedPost) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <button
            onClick={() => setSelectedPost(null)}
            className="flex items-center text-green-600 hover:text-green-700 dark:text-green-400 dark:hover:text-green-300 mb-6 font-medium"
          >
            <ArrowLeft className="h-5 w-5 mr-2" />
            Back to Articles
          </button>

          <article className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8">
            <div className="mb-6">
              <span className="inline-block px-3 py-1 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300 rounded-full text-sm font-medium mb-4">
                {selectedPost.category}
              </span>
              <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
                {selectedPost.title}
              </h1>
              <div className="flex items-center text-gray-600 dark:text-gray-400 space-x-4 mb-4">
                <div className="flex items-center">
                  <User className="h-4 w-4 mr-2" />
                  <span className="text-sm">{selectedPost.author}</span>
                </div>
                <div className="flex items-center">
                  <Clock className="h-4 w-4 mr-2" />
                  <span className="text-sm">{selectedPost.readTime}</span>
                </div>
                <span className="text-sm">{selectedPost.date}</span>
              </div>
            </div>

            <div className="prose prose-lg dark:prose-invert max-w-none">
              <p className="text-xl text-gray-700 dark:text-gray-300 leading-relaxed mb-6">
                {selectedPost.content}
              </p>
            </div>

            <div className="mt-8 pt-8 border-t border-gray-200 dark:border-gray-700">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                Need Support?
              </h3>
              <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-4">
                <p className="text-blue-800 dark:text-blue-200">
                  If you're struggling with mental health challenges, remember you're not alone. 
                  Call 988 (Suicide & Crisis Lifeline) or text HOME to 741741 for immediate support.
                </p>
              </div>
            </div>
          </article>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Mental Health Blog
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Insights, tips, and stories to support your mental health journey from mental health professionals and advocates.
          </p>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-2 mb-8">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                selectedCategory === category
                  ? 'bg-green-600 text-white'
                  : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-green-100 dark:hover:bg-green-900/30'
              }`}
            >
              {category.charAt(0).toUpperCase() + category.slice(1)}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredPosts.map((post, index) => (
            <article 
              key={index} 
              className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow cursor-pointer group"
              onClick={() => setSelectedPost(post)}
            >
              <div className="p-6">
                <div className="flex items-center justify-between mb-3">
                  <span className="inline-block px-2 py-1 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300 rounded-full text-xs font-medium">
                    {post.category}
                  </span>
                  <BookOpen className="h-5 w-5 text-gray-400 group-hover:text-green-600 transition-colors" />
                </div>

                <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-3 group-hover:text-green-600 dark:group-hover:text-green-400 transition-colors">
                  {post.title}
                </h2>
                
                <p className="text-gray-600 dark:text-gray-300 mb-4 line-clamp-3">
                  {post.excerpt}
                </p>

                <div className="flex items-center text-sm text-gray-500 dark:text-gray-400 space-x-3">
                  <div className="flex items-center">
                    <Clock className="h-4 w-4 mr-1" />
                    <span>{post.readTime}</span>
                  </div>
                  <span>•</span>
                  <span>{post.date}</span>
                </div>

                <div className="mt-4">
                  <span className="text-green-600 dark:text-green-400 font-medium group-hover:underline">
                    Read More →
                  </span>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BlogPage;
