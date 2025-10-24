// Community data service for managing posts, replies, and likes with localStorage
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
            content: 'After years of struggling with social anxiety, I wanted to share what has helped me. Deep breathing exercises, gradual exposure, and support from this community have been life-changing. I used to avoid social situations entirely, but now I can attend small gatherings and even speak up in meetings at work. The key was starting small and celebrating every small victory.',
            likes: 24,
            replies: 3,
            timestamp: '2 hours ago',
            tags: ['anxiety', 'coping-strategies', 'success-story'],
            repliesData: [
              {
                id: 1,
                author: 'Mike T.',
                content: 'Thank you for sharing! Deep breathing has helped me too. What specific exercises do you recommend? I\'ve been trying the 4-7-8 technique but looking for other options.',
                timestamp: '1 hour ago',
                likes: 5
              },
              {
                id: 2,
                author: 'Dr. Emily Chen',
                authorRole: 'counselor',
                content: 'Excellent advice, Sarah. Gradual exposure is indeed one of the most effective techniques for social anxiety. Keep up the great work! For anyone reading this, remember that progress isn\'t always linear - be patient with yourself.',
                timestamp: '45 minutes ago',
                likes: 8
              },
              {
                id: 3,
                author: 'Jessica L.',
                content: 'This gives me so much hope! I\'m just starting my journey with social anxiety. Any tips for dealing with panic attacks during social situations?',
                timestamp: '30 minutes ago',
                likes: 3
              }
            ]
          },
          {
            id: 2,
            author: 'Michael R.',
            authorRole: 'moderator',
            topic: 'depression',
            title: 'Reminder: Small Steps Count',
            content: 'Just a gentle reminder that every small step you take towards healing matters. Whether it\'s getting out of bed, taking a shower, or reaching out for help - you\'re making progress. I\'ve been there, and I know how hard it can be to see your own progress when you\'re in the middle of it. But trust me, every tiny step forward is a victory worth celebrating.',
            likes: 42,
            replies: 2,
            timestamp: '4 hours ago',
            tags: ['depression', 'encouragement', 'self-care'],
            repliesData: [
              {
                id: 1,
                author: 'Lisa K.',
                content: 'Thank you for this reminder. Sometimes I forget that small steps are still progress. Today I managed to make my bed and that felt like a huge accomplishment.',
                timestamp: '3 hours ago',
                likes: 12
              },
              {
                id: 2,
                author: 'Alex P.',
                content: 'This really hit home. I\'ve been struggling to see any progress lately, but you\'re right - even getting dressed is a step forward when you\'re dealing with depression.',
                timestamp: '2 hours ago',
                likes: 7
              }
            ]
          },
          {
            id: 3,
            author: 'Alex P.',
            authorRole: 'member',
            topic: 'support',
            title: 'Having a Tough Week - Need Support',
            content: 'Having a really tough week. Would appreciate some encouragement and hearing how others cope during difficult times. Work has been overwhelming, my sleep schedule is completely off, and I feel like I\'m just going through the motions. I know this will pass, but right now it feels endless.',
            likes: 18,
            replies: 4,
            timestamp: '3 hours ago',
            tags: ['support-needed', 'crisis-support'],
            repliesData: [
              {
                id: 1,
                author: 'Maria S.',
                content: 'You\'re not alone, Alex. I\'ve been there too. Take it one day at a time, and remember that reaching out for support is already a brave step forward.',
                timestamp: '2 hours ago',
                likes: 9
              },
              {
                id: 2,
                author: 'John D.',
                content: 'Sending you virtual hugs. This community is here for you. Have you tried any grounding techniques? The 5-4-3-2-1 method has helped me during overwhelming times.',
                timestamp: '1 hour ago',
                likes: 6
              },
              {
                id: 3,
                author: 'Dr. Sarah Williams',
                authorRole: 'counselor',
                content: 'Alex, what you\'re experiencing is completely valid. When work and sleep are disrupted, it can feel like everything is spiraling. Consider reaching out to a mental health professional if these feelings persist. You deserve support.',
                timestamp: '45 minutes ago',
                likes: 11
              },
              {
                id: 4,
                author: 'Emma R.',
                content: 'I\'ve been in a similar place recently. What helped me was setting one tiny goal each day - even if it was just drinking a glass of water or stepping outside for 5 minutes. You\'ve got this!',
                timestamp: '30 minutes ago',
                likes: 4
              }
            ]
          },
          {
            id: 4,
            author: 'Dr. Jennifer Martinez',
            authorRole: 'counselor',
            topic: 'general',
            title: 'Understanding Mental Health Stigma',
            content: 'As a mental health professional, I want to address something important: mental health stigma is still very real, but it\'s getting better. Many people still feel ashamed to seek help, but remember - seeking help is a sign of strength, not weakness. You wouldn\'t feel ashamed for seeing a doctor for a broken bone, so why should mental health be different?',
            likes: 35,
            replies: 2,
            timestamp: '6 hours ago',
            tags: ['stigma', 'mental-health', 'professional-advice'],
            repliesData: [
              {
                id: 1,
                author: 'Tom H.',
                content: 'This is so important. I\'ve been hesitant to tell my family about my therapy sessions, but reading this makes me feel more confident about being open about my mental health journey.',
                timestamp: '5 hours ago',
                likes: 8
              },
              {
                id: 2,
                author: 'Rachel G.',
                content: 'Thank you for this perspective. I\'ve been struggling with the idea of \'being strong enough\' but you\'re absolutely right - seeking help IS strength.',
                timestamp: '4 hours ago',
                likes: 6
              }
            ]
          },
          {
            id: 5,
            author: 'Emma R.',
            authorRole: 'member',
            topic: 'depression',
            title: 'Medication Journey - What I\'ve Learned',
            content: 'I wanted to share my experience with antidepressants because I know many people have questions. It took me three different medications and about 6 months to find the right one, but it was worth it. The key is being patient and working closely with your doctor. Side effects can be tough at first, but they usually subside. Don\'t give up if the first one doesn\'t work!',
            likes: 28,
            replies: 3,
            timestamp: '8 hours ago',
            tags: ['medication', 'depression', 'personal-experience'],
            repliesData: [
              {
                id: 1,
                author: 'David K.',
                content: 'Thank you for sharing this. I\'m about to start my first antidepressant and I\'m really nervous about side effects. Your post gives me hope.',
                timestamp: '7 hours ago',
                likes: 7
              },
              {
                id: 2,
                author: 'Dr. Emily Chen',
                authorRole: 'counselor',
                content: 'Emma, thank you for sharing your experience. It\'s so important for people to hear real stories about medication. Remember everyone\'s journey is different, but your story can help others feel less alone.',
                timestamp: '6 hours ago',
                likes: 9
              },
              {
                id: 3,
                author: 'Sophie M.',
                content: 'I had a similar experience! It took me 4 different medications over 8 months, but I finally found one that works for me. The key is definitely patience and communication with your doctor.',
                timestamp: '5 hours ago',
                likes: 5
              }
            ]
          }
        ],
        likedPosts: [],
        nextPostId: 6,
        nextReplyId: 15
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
