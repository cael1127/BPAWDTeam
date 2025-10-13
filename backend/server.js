const express = require('express');
const cors = require('cors');
const fs = require('fs').promises;
const path = require('path');
const rateLimit = require('express-rate-limit');
const helmet = require('helmet');
const DOMPurify = require('dompurify');
const JSDOM = require('jsdom');

const app = express();
const PORT = process.env.PORT || 3001;

// Security middleware
app.use(helmet({
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'self'"],
      styleSrc: ["'self'", "'unsafe-inline'"],
      scriptSrc: ["'self'"],
      imgSrc: ["'self'", "data:", "https:"],
    },
  },
}));

// CORS configuration
const allowedOrigins = [
  'http://localhost:5173',
  'http://localhost:3000',
  'https://mindwell-campaign.netlify.app',
  process.env.FRONTEND_URL
].filter(Boolean);

app.use(cors({
  origin: (origin, callback) => {
    // Allow requests with no origin (mobile apps, Postman, etc.)
    if (!origin) return callback(null, true);
    
    if (allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      console.log('Blocked origin:', origin);
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true
}));

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
  message: 'Too many requests from this IP, please try again later.'
});
app.use('/api/', limiter);

// Strict rate limiting for forms
const formLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 5, // limit each IP to 5 form submissions per windowMs
  message: 'Too many form submissions, please try again later.'
});

// Body parsing middleware
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Create DOM for DOMPurify
const window = new JSDOM('').window;
const purify = DOMPurify(window);

// Input sanitization utility
const sanitizeInput = (input) => {
  if (typeof input !== 'string') return input;
  return purify.sanitize(input, {
    ALLOWED_TAGS: [],
    ALLOWED_ATTR: []
  });
};

// Data storage paths
const DATA_DIR = path.join(__dirname, 'data');
const APPOINTMENTS_FILE = path.join(DATA_DIR, 'appointments.json');
const MOOD_DATA_FILE = path.join(DATA_DIR, 'moodData.json');
const COMMUNITY_FILE = path.join(DATA_DIR, 'communityPosts.json');

// Ensure data directory exists
const ensureDataDir = async () => {
  try {
    await fs.access(DATA_DIR);
  } catch {
    await fs.mkdir(DATA_DIR, { recursive: true });
  }
};

// Initialize empty data files if they don't exist
const initializeDataFiles = async () => {
  await ensureDataDir();
  
  const files = [
    { path: APPOINTMENTS_FILE, default: [] },
    { path: MOOD_DATA_FILE, default: [] },
    { path: COMMUNITY_FILE, default: [] }
  ];
  
  for (const file of files) {
    try {
      await fs.access(file.path);
    } catch {
      await fs.writeFile(file.path, JSON.stringify(file.default, null, 2));
    }
  }
};

// Validation schemas
const validateAppointment = (data) => {
  const errors = [];
  
  if (!data.name || typeof data.name !== 'string' || data.name.trim().length < 2) {
    errors.push('Name must be at least 2 characters long');
  }
  
  if (!data.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
    errors.push('Valid email address is required');
  }
  
  if (!data.preferredDate || isNaN(Date.parse(data.preferredDate))) {
    errors.push('Valid preferred date is required');
  }
  
  if (!data.serviceType || !['individual', 'group', 'family', 'crisis'].includes(data.serviceType)) {
    errors.push('Valid service type is required');
  }
  
  if (!data.urgency || !['low', 'medium', 'high'].includes(data.urgency)) {
    errors.push('Valid urgency level is required');
  }
  
  return errors;
};

const validateMoodData = (data) => {
  const errors = [];
  
  if (!data.mood || !['great', 'good', 'okay', 'sad', 'struggling'].includes(data.mood)) {
    errors.push('Valid mood selection is required');
  }
  
  if (!data.date || !/^\d{4}-\d{2}-\d{2}$/.test(data.date)) {
    errors.push('Valid date in YYYY-MM-DD format is required');
  }
  
  return errors;
};

// API Routes

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'healthy', 
    timestamp: new Date().toISOString(),
    version: '1.0.0'
  });
});

// Get all appointments (admin only in production)
app.get('/api/appointments', async (req, res) => {
  try {
    const data = await fs.readFile(APPOINTMENTS_FILE, 'utf8');
    const appointments = JSON.parse(data);
    
    // In production, add authentication check here
    res.json({ appointments });
  } catch (error) {
    console.error('Error reading appointments:', error);
    res.status(500).json({ error: 'Failed to retrieve appointments' });
  }
});

// Create new appointment
app.post('/api/appointments', formLimiter, async (req, res) => {
  try {
    const rawData = req.body;
    
    // Sanitize all string inputs
    const sanitizedData = {
      name: sanitizeInput(rawData.name),
      email: sanitizeInput(rawData.email),
      phone: sanitizeInput(rawData.phone || ''),
      preferredDate: rawData.preferredDate,
      serviceType: sanitizeInput(rawData.serviceType),
      urgency: sanitizeInput(rawData.urgency),
      notes: sanitizeInput(rawData.notes || ''),
    };
    
    // Validate data
    const errors = validateAppointment(sanitizedData);
    if (errors.length > 0) {
      return res.status(400).json({ errors });
    }
    
    // Read existing appointments
    const data = await fs.readFile(APPOINTMENTS_FILE, 'utf8');
    const appointments = JSON.parse(data);
    
    // Create new appointment
    const newAppointment = {
      id: `apt_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      ...sanitizedData,
      status: 'pending',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    
    // Add to appointments array
    appointments.push(newAppointment);
    
    // Save to file
    await fs.writeFile(APPOINTMENTS_FILE, JSON.stringify(appointments, null, 2));
    
    // Return success response (without sensitive data)
    res.status(201).json({
      success: true,
      message: 'Appointment request submitted successfully',
      appointmentId: newAppointment.id,
      nextSteps: [
        'You will receive a confirmation email within 24 hours',
        'A counselor will contact you to confirm your appointment time',
        'If this is an emergency, please call 988 immediately'
      ]
    });
    
  } catch (error) {
    console.error('Error creating appointment:', error);
    res.status(500).json({ error: 'Failed to create appointment' });
  }
});

// Get mood tracking data
app.get('/api/mood-history', async (req, res) => {
  try {
    const data = await fs.readFile(MOOD_DATA_FILE, 'utf8');
    const moodData = JSON.parse(data);
    
    // Return anonymized data (no personal identifiers)
    const anonymizedData = moodData.map(entry => ({
      mood: entry.mood,
      date: entry.date,
      time: entry.time,
      triggers: entry.triggers || [],
      copingStrategies: entry.copingStrategies || []
    }));
    
    res.json({ moodHistory: anonymizedData });
  } catch (error) {
    console.error('Error reading mood data:', error);
    res.status(500).json({ error: 'Failed to retrieve mood history' });
  }
});

// Save mood tracking data
app.post('/api/mood-tracker', formLimiter, async (req, res) => {
  try {
    const rawData = req.body;
    
    // Sanitize inputs
    const sanitizedData = {
      mood: sanitizeInput(rawData.mood),
      date: sanitizeInput(rawData.date),
      time: sanitizeInput(rawData.time),
      notes: sanitizeInput(rawData.notes || ''),
      triggers: Array.isArray(rawData.triggers) 
        ? rawData.triggers.map(t => sanitizeInput(t)).filter(Boolean)
        : [],
      copingStrategies: Array.isArray(rawData.copingStrategies)
        ? rawData.copingStrategies.map(c => sanitizeInput(c)).filter(Boolean)
        : []
    };
    
    // Validate data
    const errors = validateMoodData(sanitizedData);
    if (errors.length > 0) {
      return res.status(400).json({ errors });
    }
    
    // Read existing mood data
    const data = await fs.readFile(MOOD_DATA_FILE, 'utf8');
    const moodData = JSON.parse(data);
    
    // Create new mood entry
    const newMoodEntry = {
      id: `mood_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      ...sanitizedData,
      createdAt: new Date().toISOString()
    };
    
    // Add to mood data array
    moodData.push(newMoodEntry);
    
    // Keep only last 100 entries to prevent file from growing too large
    if (moodData.length > 100) {
      moodData.splice(0, moodData.length - 100);
    }
    
    // Save to file
    await fs.writeFile(MOOD_DATA_FILE, JSON.stringify(moodData, null, 2));
    
    res.status(201).json({
      success: true,
      message: 'Mood data saved successfully',
      entryId: newMoodEntry.id
    });
    
  } catch (error) {
    console.error('Error saving mood data:', error);
    res.status(500).json({ error: 'Failed to save mood data' });
  }
});

// Get community posts
app.get('/api/posts', async (req, res) => {
  try {
    const data = await fs.readFile(COMMUNITY_FILE, 'utf8');
    const posts = JSON.parse(data);
    
    // Return only approved posts
    const approvedPosts = posts.filter(post => post.isModerated === true);
    
    res.json({ posts: approvedPosts });
  } catch (error) {
    console.error('Error reading community posts:', error);
    res.status(500).json({ error: 'Failed to retrieve community posts' });
  }
});

// Create community post
app.post('/api/posts', formLimiter, async (req, res) => {
  try {
    const rawData = req.body;
    
    // Sanitize inputs
    const sanitizedData = {
      title: sanitizeInput(rawData.title),
      content: sanitizeInput(rawData.content),
      category: sanitizeInput(rawData.category || 'general'),
      author: `user_${Math.random().toString(36).substr(2, 9)}` // Anonymous user ID
    };
    
    // Validate data
    if (!sanitizedData.title || sanitizedData.title.length < 5) {
      return res.status(400).json({ errors: ['Title must be at least 5 characters long'] });
    }
    
    if (!sanitizedData.content || sanitizedData.content.length < 10) {
      return res.status(400).json({ errors: ['Content must be at least 10 characters long'] });
    }
    
    // Read existing posts
    const data = await fs.readFile(COMMUNITY_FILE, 'utf8');
    const posts = JSON.parse(data);
    
    // Create new post
    const newPost = {
      id: `post_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      ...sanitizedData,
      replies: [],
      isModerated: false, // Requires moderation before appearing publicly
      createdAt: new Date().toISOString()
    };
    
    // Add to posts array
    posts.push(newPost);
    
    // Save to file
    await fs.writeFile(COMMUNITY_FILE, JSON.stringify(posts, null, 2));
    
    res.status(201).json({
      success: true,
      message: 'Post submitted successfully and is pending moderation',
      postId: newPost.id
    });
    
  } catch (error) {
    console.error('Error creating community post:', error);
    res.status(500).json({ error: 'Failed to create community post' });
  }
});

// Get testimonials (static data)
app.get('/api/testimonials', (req, res) => {
  const testimonials = [
    {
      id: 'testimonial_1',
      name: 'Sarah M.',
      story: 'After struggling with anxiety for years, I finally reached out for help through this campaign\'s resources. The support groups and counseling changed my life.',
      condition: 'Generalized Anxiety Disorder',
      isVerified: true
    },
    {
      id: 'testimonial_2',
      name: 'Michael R.',
      story: 'The mood tracker helped me recognize patterns in my depression. Working with a counselor, I\'ve learned coping strategies that actually work.',
      condition: 'Major Depressive Disorder',
      isVerified: true
    },
    {
      id: 'testimonial_3',
      name: 'Jessica T.',
      story: 'Finding this community made me feel less alone. Sharing my bipolar journey with others who understand has been incredibly healing.',
      condition: 'Bipolar II Disorder',
      isVerified: true
    }
  ];
  
  res.json({ testimonials });
});

// Error handling middleware
app.use((error, req, res, next) => {
  console.error('Unhandled error:', error);
  res.status(500).json({ 
    error: 'Internal server error',
    message: process.env.NODE_ENV === 'development' ? error.message : 'Something went wrong'
  });
});

// 404 handler
app.use('*', (req, res) => {
  res.status(404).json({ error: 'Endpoint not found' });
});

// Start server
const startServer = async () => {
  try {
    await initializeDataFiles();
    
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
      console.log(`Environment: ${process.env.NODE_ENV || 'development'}`);
      console.log(`Data directory: ${DATA_DIR}`);
    });
  } catch (error) {
    console.error('Failed to start server:', error);
    process.exit(1);
  }
};

startServer();

module.exports = app;
