// API service functions for communicating with the backend

const API_BASE_URL = process.env.NODE_ENV === 'production' 
  ? 'https://your-api-domain.com/api' 
  : 'http://localhost:3001/api';

// Generic API request function
const apiRequest = async (endpoint, options = {}) => {
  const url = `${API_BASE_URL}${endpoint}`;
  
  const config = {
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
    ...options,
  };

  try {
    const response = await fetch(url, config);
    
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({ error: 'Network error' }));
      throw new Error(errorData.error || `HTTP ${response.status}: ${response.statusText}`);
    }
    
    return await response.json();
  } catch (error) {
    console.error(`API request failed for ${endpoint}:`, error);
    throw error;
  }
};

// Health check
export const checkHealth = async () => {
  return apiRequest('/health');
};

// Appointment scheduling
export const createAppointment = async (appointmentData) => {
  return apiRequest('/appointments', {
    method: 'POST',
    body: JSON.stringify(appointmentData),
  });
};

export const getAppointments = async () => {
  return apiRequest('/appointments');
};

// Mood tracking
export const saveMoodData = async (moodData) => {
  return apiRequest('/mood-tracker', {
    method: 'POST',
    body: JSON.stringify(moodData),
  });
};

export const getMoodHistory = async () => {
  return apiRequest('/mood-history');
};

// Community features
export const createPost = async (postData) => {
  return apiRequest('/posts', {
    method: 'POST',
    body: JSON.stringify(postData),
  });
};

export const getPosts = async () => {
  return apiRequest('/posts');
};

// Testimonials
export const getTestimonials = async () => {
  return apiRequest('/testimonials');
};

// Form validation utilities
export const validateEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

export const validatePhone = (phone) => {
  const phoneRegex = /^[\+]?[1-9][\d]{0,15}$/;
  return phoneRegex.test(phone.replace(/[\s\-\(\)]/g, ''));
};

export const validateRequired = (value, fieldName) => {
  if (!value || value.trim().length === 0) {
    return `${fieldName} is required`;
  }
  return null;
};

export const validateMinLength = (value, minLength, fieldName) => {
  if (value && value.length < minLength) {
    return `${fieldName} must be at least ${minLength} characters long`;
  }
  return null;
};

// Error handling utility
export const handleApiError = (error, defaultMessage = 'An unexpected error occurred') => {
  if (error.message) {
    return error.message;
  }
  if (typeof error === 'string') {
    return error;
  }
  return defaultMessage;
};
