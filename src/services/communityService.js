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
      return [];
    }
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
