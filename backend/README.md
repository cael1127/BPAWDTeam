# MindWell Backend API

Backend API for the MindWell Mental Health Awareness Campaign.

## Quick Deployment to Render

### Option 1: Deploy via GitHub (Recommended)

1. **Push your code to GitHub:**
   ```bash
   git add .
   git commit -m "Prepare backend for deployment"
   git push origin main
   ```

2. **Deploy on Render:**
   - Go to https://render.com
   - Sign up/login with GitHub
   - Click "New +" → "Web Service"
   - Connect your GitHub repository
   - Select the `backend` directory (use "Root Directory: backend")
   - Configure:
     - **Name:** mindwell-backend
     - **Environment:** Node
     - **Build Command:** `npm install`
     - **Start Command:** `npm start`
     - **Plan:** Free
   - Add environment variable:
     - `FRONTEND_URL` = `https://mindwell-campaign.netlify.app`
   - Click "Create Web Service"

3. **Get your backend URL:**
   - Will be: `https://mindwell-backend.onrender.com`
   - Copy this URL for frontend configuration

### Option 2: Deploy via Render Blueprint

1. Create `render.yaml` in root (already created)
2. Push to GitHub
3. In Render dashboard, click "New Blueprint Instance"
4. Connect repository
5. Deploy automatically

## API Endpoints

### Health Check
```
GET /api/health
```

### Appointments
```
POST /api/appointments
GET /api/appointments (admin)
```

### Mood Tracking
```
POST /api/mood-tracker
GET /api/mood-history
```

### Community
```
POST /api/posts
GET /api/posts
```

### Testimonials
```
GET /api/testimonials
```

## Environment Variables

```env
NODE_ENV=production
PORT=10000
FRONTEND_URL=https://mindwell-campaign.netlify.app
```

## Security Features

- Helmet.js for security headers
- CORS protection
- Rate limiting (100 requests/15min)
- Form rate limiting (5 submissions/15min)
- Input sanitization with DOMPurify
- XSS protection

## Local Development

```bash
# Install dependencies
npm install

# Run in development mode
npm run dev

# Run in production mode
npm start
```

Server runs on http://localhost:3001

## Testing

```bash
# Health check
curl http://localhost:3001/api/health

# Create appointment
curl -X POST http://localhost:3001/api/appointments \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test User",
    "email": "test@example.com",
    "preferredDate": "2026-04-15",
    "serviceType": "individual",
    "urgency": "medium"
  }'
```

