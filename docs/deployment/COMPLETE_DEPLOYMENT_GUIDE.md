# 🚀 Complete Deployment Guide - MindWell Platform

## Overview

This guide covers the complete deployment of the MindWell Mental Health Platform, including both frontend and backend components with shared data functionality.

## 🎯 Architecture

- **Frontend**: React application deployed to Netlify
- **Backend**: Node.js/Express API deployed to Render
- **Data Storage**: File-based JSON storage (shared across users)
- **Domain**: Custom domain support available

---

## 📋 Prerequisites

- GitHub account (free)
- Netlify account (free) - for frontend hosting
- Render account (free) - for backend hosting
- Git installed locally

---

## 🚀 Part 1: Backend Deployment (Render)

### Step 1: Prepare Backend

The backend is already configured in the `backend/` directory with:
- Express.js server with API endpoints
- File-based data storage
- CORS configuration for frontend
- Security middleware (Helmet, rate limiting, input sanitization)

### Step 2: Deploy to Render

1. **Go to [Render.com](https://render.com)**
2. **Sign up/Login with GitHub**
3. **Click "New +" → "Web Service"**
4. **Connect your GitHub repository**
5. **Configure the service:**
   - **Name**: `mindwell-backend`
   - **Environment**: `Node`
   - **Root Directory**: `backend`
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`
   - **Plan**: `Free`

6. **Add Environment Variables:**
   - `NODE_ENV` = `production`
   - `FRONTEND_URL` = `https://your-netlify-domain.netlify.app` (update after frontend deployment)

7. **Click "Create Web Service"**

### Step 3: Get Backend URL

After deployment, you'll get a URL like:
```
https://mindwell-backend.onrender.com
```

**Save this URL** - you'll need it for frontend configuration.

---

## 🌐 Part 2: Frontend Deployment (Netlify)

### Step 1: Configure Frontend

The frontend is already configured with:
- Vite build system
- Tailwind CSS
- PWA capabilities
- API integration ready

### Step 2: Deploy to Netlify

#### Option A: GitHub Integration (Recommended)

1. **Go to [Netlify.com](https://netlify.com)**
2. **Sign up/Login with GitHub**
3. **Click "New site from Git"**
4. **Connect your GitHub repository**
5. **Configure build settings:**
   - **Build command**: `npm run build`
   - **Publish directory**: `dist`
   - **Node version**: `18` (in Environment Variables)

6. **Add Environment Variables:**
   - `VITE_API_URL` = `https://your-backend-url.onrender.com/api`

7. **Click "Deploy site"**

#### Option B: Manual Deploy

```bash
# Build the application
npm run build

# Install Netlify CLI
npm install -g netlify-cli

# Deploy
netlify deploy --prod --dir=dist
```

### Step 3: Update Backend CORS

After frontend deployment, update your backend's CORS configuration:

1. **Go to Render dashboard**
2. **Find your backend service**
3. **Go to Environment tab**
4. **Update `FRONTEND_URL`** to your actual Netlify URL
5. **Redeploy the service**

---

## 🔧 Part 3: Configuration

### Frontend Configuration

Update the API URL in your frontend:

```javascript
// In src/services/communityService.js
this.baseURL = process.env.NODE_ENV === 'production' 
  ? 'https://your-backend-url.onrender.com/api' 
  : 'http://localhost:3001/api';
```

### Backend Configuration

Ensure CORS allows your frontend domain:

```javascript
// In backend/server.js
const allowedOrigins = [
  'http://localhost:5173',
  'http://localhost:3000',
  'https://your-netlify-domain.netlify.app',
  process.env.FRONTEND_URL
].filter(Boolean);
```

---

## ✅ Part 4: Testing

### Test Backend API

```bash
# Health check
curl https://your-backend-url.onrender.com/api/health

# Test community posts
curl https://your-backend-url.onrender.com/api/posts
```

### Test Frontend

1. **Visit your Netlify URL**
2. **Test community forum functionality**
3. **Verify posts, replies, and likes work**
4. **Check that data persists across page refreshes**

---

## 🔄 Part 5: Continuous Deployment

### Automatic Deployments

Both services are configured for automatic deployment:

- **Frontend**: Deploys automatically on git push to main branch
- **Backend**: Deploys automatically on git push to main branch

### Manual Deployments

```bash
# Push changes
git add .
git commit -m "Update deployment"
git push origin main

# Both services will automatically redeploy
```

---

## 🛠️ Troubleshooting

### Common Issues

1. **CORS Errors**
   - Check that `FRONTEND_URL` environment variable is set correctly
   - Verify the frontend URL is in the `allowedOrigins` array

2. **API Connection Issues**
   - Verify the backend URL is correct in frontend configuration
   - Check that the backend service is running on Render

3. **Build Failures**
   - Check Node.js version compatibility
   - Verify all dependencies are installed
   - Check build logs for specific errors

### Debugging

1. **Check Render logs** for backend issues
2. **Check Netlify build logs** for frontend issues
3. **Test API endpoints** directly with curl or Postman
4. **Check browser console** for frontend errors

---

## 📊 Monitoring

### Health Checks

- **Backend**: `https://your-backend-url.onrender.com/api/health`
- **Frontend**: Your Netlify URL

### Performance

- **Frontend**: Netlify provides CDN and performance metrics
- **Backend**: Render provides basic monitoring and logs

---

## 🔒 Security

### Implemented Security Features

- **CORS Protection**: Configured for specific domains
- **Rate Limiting**: 100 requests per 15 minutes
- **Input Sanitization**: DOMPurify for XSS protection
- **Security Headers**: Helmet.js for security headers
- **Form Rate Limiting**: 5 form submissions per 15 minutes

### Additional Security Considerations

- **HTTPS**: Both services use HTTPS by default
- **Environment Variables**: Sensitive data stored in environment variables
- **Input Validation**: All inputs validated and sanitized

---

## 📈 Scaling

### Current Limitations (Free Tiers)

- **Render**: 750 hours/month, spins down after inactivity
- **Netlify**: 100GB bandwidth/month, 300 build minutes/month

### Upgrading

- **Render Pro**: $7/month for always-on service
- **Netlify Pro**: $19/month for increased limits

---

## 🎯 Success Metrics

After successful deployment, you should have:

- ✅ Frontend accessible at your Netlify URL
- ✅ Backend API responding at your Render URL
- ✅ Community forum working with shared data
- ✅ All features functional (mood tracking, resources, etc.)
- ✅ Mobile-responsive design
- ✅ PWA capabilities (installable)

---

## 📞 Support

If you encounter issues:

1. **Check the logs** in both Render and Netlify dashboards
2. **Test API endpoints** directly
3. **Verify environment variables** are set correctly
4. **Check CORS configuration** matches your frontend URL

---

**Deployment completed successfully! 🎉**

Your MindWell platform is now live with shared data functionality across all users.
