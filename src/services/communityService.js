// Community data service for managing posts, replies, and likes
class CommunityService {
  constructor() {
    this.storageKey = 'mindwell_community_data';
    this.initializeData();
  }

  initializeData() {
    if (!localStorage.getItem(this.storageKey)) {
      const initialData = {
        posts: [
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
                content: 'Excellent advice, Sarah. Gradual exposure is indeed one of the most effective techniques for social anxiety. Keep up the great work!',
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
        ],
        likedPosts: [],
        nextPostId: 4,
        nextReplyId: 4
      };
      this.saveData(initialData);
    }
  }

  getData() {
    const data = localStorage.getItem(this.storageKey);
    return data ? JSON.parse(data) : { posts: [], likedPosts: [], nextPostId: 1, nextReplyId: 1 };
  }

  saveData(data) {
    localStorage.setItem(this.storageKey, JSON.stringify(data));
  }

  getPosts() {
    return this.getData().posts;
  }

  getLikedPosts() {
    return new Set(this.getData().likedPosts);
  }

  addPost(post) {
    const data = this.getData();
    const newPost = {
      ...post,
      id: data.nextPostId,
      likes: 0,
      replies: 0,
      timestamp: 'Just now',
      repliesData: []
    };
    
    data.posts.unshift(newPost);
    data.nextPostId += 1;
    this.saveData(data);
    return newPost;
  }

  addReply(postId, reply) {
    const data = this.getData();
    const postIndex = data.posts.findIndex(post => post.id === postId);
    
    if (postIndex !== -1) {
      const newReply = {
        ...reply,
        id: data.nextReplyId,
        likes: 0
      };
      
      data.posts[postIndex].repliesData.push(newReply);
      data.posts[postIndex].replies = data.posts[postIndex].repliesData.length;
      data.nextReplyId += 1;
      this.saveData(data);
      return newReply;
    }
    return null;
  }

  toggleLike(postId) {
    const data = this.getData();
    const postIndex = data.posts.findIndex(post => post.id === postId);
    
    if (postIndex !== -1) {
      const likedPosts = new Set(data.likedPosts);
      
      if (likedPosts.has(postId)) {
        // Unlike
        likedPosts.delete(postId);
        data.posts[postIndex].likes = Math.max(0, data.posts[postIndex].likes - 1);
      } else {
        // Like
        likedPosts.add(postId);
        data.posts[postIndex].likes += 1;
      }
      
      data.likedPosts = Array.from(likedPosts);
      this.saveData(data);
      return { liked: likedPosts.has(postId), likes: data.posts[postIndex].likes };
    }
    return null;
  }

  likeReply(postId, replyId) {
    const data = this.getData();
    const postIndex = data.posts.findIndex(post => post.id === postId);
    
    if (postIndex !== -1) {
      const replyIndex = data.posts[postIndex].repliesData.findIndex(reply => reply.id === replyId);
      
      if (replyIndex !== -1) {
        data.posts[postIndex].repliesData[replyIndex].likes += 1;
        this.saveData(data);
        return data.posts[postIndex].repliesData[replyIndex].likes;
      }
    }
    return null;
  }
}

export default new CommunityService();
