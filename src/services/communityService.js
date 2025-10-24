// Community data service for managing posts, replies, and likes via API
class CommunityService {
  constructor() {
    this.baseURL = process.env.NODE_ENV === 'production' 
      ? 'https://mindwell-backend.onrender.com/api' 
      : 'http://localhost:3001/api';
    this.likedPosts = new Set(JSON.parse(localStorage.getItem('mindwell_liked_posts') || '[]'));
  }

  async makeRequest(endpoint, options = {}) {
    try {
      const response = await fetch(`${this.baseURL}${endpoint}`, {
        headers: {
          'Content-Type': 'application/json',
          ...options.headers
        },
        ...options
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.error('API request failed:', error);
      throw error;
    }
  }

  async getPosts() {
    try {
      const data = await this.makeRequest('/posts');
      return data.posts || [];
    } catch (error) {
      console.error('Failed to fetch posts:', error);
      // Return sample data if backend is unavailable
      return this.getSamplePosts();
    }
  }

  getSamplePosts() {
    return [
      {
        id: 1,
        author: 'Sarah M.',
        authorRole: 'member',
        topic: 'anxiety',
        title: 'Coping with Social Anxiety - My Journey',
        content: 'After years of struggling with social anxiety, I wanted to share what has helped me. Deep breathing exercises, gradual exposure, and support from this community have been life-changing.',
        likes: 24,
        replies: 2,
        timestamp: '2 hours ago',
        tags: ['anxiety', 'coping-strategies', 'success-story'],
        repliesData: [
          {
            id: 1,
            author: 'Mike T.',
            content: 'Thank you for sharing! Deep breathing has helped me too. What specific exercises do you recommend?',
            timestamp: '1 hour ago',
            likes: 5
          },
          {
            id: 2,
            author: 'Dr. Emily Chen',
            authorRole: 'counselor',
            content: 'Excellent advice, Sarah. Gradual exposure is indeed one of the most effective techniques for social anxiety.',
            timestamp: '45 minutes ago',
            likes: 8
          }
        ]
      },
      {
        id: 2,
        author: 'Michael R.',
        authorRole: 'moderator',
        topic: 'depression',
        title: 'Reminder: Small Steps Count',
        content: 'Just a gentle reminder that every small step you take towards healing matters. Whether it\'s getting out of bed, taking a shower, or reaching out for help - you\'re making progress.',
        likes: 42,
        replies: 1,
        timestamp: '4 hours ago',
        tags: ['depression', 'encouragement', 'self-care'],
        repliesData: [
          {
            id: 1,
            author: 'Lisa K.',
            content: 'Thank you for this reminder. Sometimes I forget that small steps are still progress.',
            timestamp: '3 hours ago',
            likes: 12
          }
        ]
      },
      {
        id: 3,
        author: 'Alex P.',
        authorRole: 'member',
        topic: 'support',
        title: 'Having a Tough Week - Need Support',
        content: 'Having a really tough week. Would appreciate some encouragement and hearing how others cope during difficult times.',
        likes: 18,
        replies: 2,
        timestamp: '3 hours ago',
        tags: ['support-needed', 'crisis-support'],
        repliesData: [
          {
            id: 1,
            author: 'Maria S.',
            content: 'You\'re not alone, Alex. I\'ve been there too. Take it one day at a time.',
            timestamp: '2 hours ago',
            likes: 9
          },
          {
            id: 2,
            author: 'John D.',
            content: 'Sending you virtual hugs. This community is here for you.',
            timestamp: '1 hour ago',
            likes: 6
          }
        ]
      }
    ];
  }

  getLikedPosts() {
    return this.likedPosts;
  }

  async addPost(post) {
    try {
      const data = await this.makeRequest('/posts', {
        method: 'POST',
        body: JSON.stringify(post)
      });
      return data.post;
    } catch (error) {
      console.error('Failed to create post:', error);
      throw error;
    }
  }

  async addReply(postId, reply) {
    try {
      const data = await this.makeRequest(`/posts/${postId}/replies`, {
        method: 'POST',
        body: JSON.stringify(reply)
      });
      return data.reply;
    } catch (error) {
      console.error('Failed to add reply:', error);
      throw error;
    }
  }

  async toggleLike(postId) {
    try {
      // Check if already liked locally
      if (this.likedPosts.has(postId)) {
        // Unlike (just remove from local set, don't call API)
        this.likedPosts.delete(postId);
        this.saveLikedPosts();
        return { liked: false, likes: 0 };
      } else {
        // Like the post
        const data = await this.makeRequest(`/posts/${postId}/like`, {
          method: 'POST'
        });
        
        this.likedPosts.add(postId);
        this.saveLikedPosts();
        
        return { liked: true, likes: data.likes };
      }
    } catch (error) {
      console.error('Failed to like post:', error);
      throw error;
    }
  }

  async likeReply(postId, replyId) {
    try {
      const data = await this.makeRequest(`/posts/${postId}/replies/${replyId}/like`, {
        method: 'POST'
      });
      return data.likes;
    } catch (error) {
      console.error('Failed to like reply:', error);
      throw error;
    }
  }

  saveLikedPosts() {
    localStorage.setItem('mindwell_liked_posts', JSON.stringify(Array.from(this.likedPosts)));
  }
}

export default new CommunityService();
