// Simple test script to verify community service functionality
import communityService from './src/services/communityService.js';

console.log('Testing Community Service...');

// Test initial data loading
console.log('Initial posts:', communityService.getPosts().length);
console.log('Initial liked posts:', communityService.getLikedPosts().size);

// Test adding a new post
const newPost = {
  author: 'Test User',
  authorRole: 'member',
  topic: 'general',
  title: 'Test Post',
  content: 'This is a test post to verify functionality.',
  tags: ['test', 'verification']
};

const addedPost = communityService.addPost(newPost);
console.log('Added post ID:', addedPost.id);

// Test adding a reply
const reply = {
  author: 'Test Reply User',
  content: 'This is a test reply.',
  timestamp: 'Just now'
};

const addedReply = communityService.addReply(addedPost.id, reply);
console.log('Added reply ID:', addedReply.id);

// Test liking a post
const likeResult = communityService.toggleLike(addedPost.id);
console.log('Like result:', likeResult);

// Verify data persistence
console.log('Posts after operations:', communityService.getPosts().length);
console.log('Liked posts after operations:', communityService.getLikedPosts().size);

console.log('Community service test completed successfully!');
