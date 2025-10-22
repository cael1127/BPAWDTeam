# Deployment and Hosting Guide
## MindWell Mental Health Awareness Campaign Website

### Production Deployment Options

#### **Option 1: Netlify (Recommended for Static Hosting)**

**Frontend Deployment:**
```bash
# Build the React application
npm run build

# Deploy to Netlify
npx netlify-cli deploy --prod --dir=dist
```

**Configuration Files:**
```javascript
// netlify.toml
[build]
  publish = "dist"
  command = "npm run build"

[build.environment]
  NODE_VERSION = "18"

[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200

[[headers]]
  for = "/*"
  [headers.values]
    X-Frame-Options = "DENY"
    X-XSS-Protection = "1; mode=block"
    Content-Security-Policy = "default-src 'self'; script-src 'self' 'unsafe-inline'; style-src 'self' 'unsafe-inline'; img-src 'self' data: https:;"
```

**Backend Deployment:**
```bash
# Deploy backend to Netlify Functions or separate service
# For Netlify Functions, place in netlify/functions/
```

#### **Option 2: Vercel**

**Frontend Deployment:**
```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel --prod
```

**Configuration:**
```json
// vercel.json
{
  "builds": [
    {
      "src": "package.json",
      "use": "@vercel/static-build",
      "config": {
        "distDir": "dist"
      }
    }
  ],
  "routes": [
    {
      "src": "/(.*)",
      "dest": "/index.html"
    }
  ],
  "headers": [
    {
      "source": "/(.*)",
      "headers": [
        {
          "key": "X-Frame-Options",
          "value": "DENY"
        },
        {
          "key": "X-Content-Type-Options",
          "value": "nosniff"
        }
      ]
    }
  ]
}
```

#### **Option 3: AWS S3 + CloudFront**

**Frontend Deployment:**
```bash
# Build application
npm run build

# Upload to S3 bucket
aws s3 sync dist/ s3://your-bucket-name --delete

# Invalidate CloudFront cache
aws cloudfront create-invalidation --distribution-id YOUR_DISTRIBUTION_ID --paths "/*"
```

**Backend Deployment (AWS Lambda):**
```bash
# Package backend for Lambda
zip -r backend.zip backend/

# Upload to Lambda
aws lambda update-function-code --function-name mindwell-api --zip-file fileb://backend.zip
```

### Offline Demo Setup

#### **Local Development Environment**

**Prerequisites:**
- Node.js 16+ installed
- npm or yarn package manager
- Git (optional, for version control)

**Setup Instructions:**

1. **Clone/Download Project:**
```bash
# If using Git
git clone <repository-url>
cd mindwell-campaign

# Or download and extract ZIP file
```

2. **Install Frontend Dependencies:**
```bash
npm install
```

3. **Install Backend Dependencies:**
```bash
cd backend
npm install
cd ..
```

4. **Start Backend Server:**
```bash
cd backend
npm run dev
# Server runs on http://localhost:3001
```

5. **Start Frontend Development Server:**
```bash
# In separate terminal
npm run dev
# Frontend runs on http://localhost:5173
```

#### **Production Build for Offline Demo:**

1. **Build Frontend:**
```bash
npm run build
```

2. **Start Production Backend:**
```bash
cd backend
npm start
```

3. **Serve Frontend:**
```bash
# Option 1: Using serve
npx serve -s dist -l 3000

# Option 2: Using Python (if installed)
cd dist
python -m http.server 8000
```

### Environment Configuration

#### **Frontend Environment Variables:**
```bash
# .env.local
VITE_API_BASE_URL=http://localhost:3001/api
VITE_APP_NAME=MindWell Mental Health Campaign
VITE_APP_VERSION=1.0.0
```

#### **Backend Environment Variables:**
```bash
# backend/.env
NODE_ENV=production
PORT=3001
CORS_ORIGIN=http://localhost:3000
RATE_LIMIT_WINDOW_MS=900000
RATE_LIMIT_MAX_REQUESTS=100
```

### Docker Deployment

#### **Frontend Dockerfile:**
```dockerfile
# Frontend Dockerfile
FROM node:18-alpine as build

WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production

COPY . .
RUN npm run build

FROM nginx:alpine
COPY --from=build /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/nginx.conf

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
```

#### **Backend Dockerfile:**
```dockerfile
# Backend Dockerfile
FROM node:18-alpine

WORKDIR /app

COPY package*.json ./
RUN npm ci --only=production

COPY . .

EXPOSE 3001

CMD ["npm", "start"]
```

#### **Docker Compose:**
```yaml
# docker-compose.yml
version: '3.8'

services:
  frontend:
    build: .
    ports:
      - "3000:80"
    depends_on:
      - backend
    environment:
      - VITE_API_BASE_URL=http://backend:3001/api

  backend:
    build: ./backend
    ports:
      - "3001:3001"
    volumes:
      - ./backend/data:/app/data
    environment:
      - NODE_ENV=production
      - CORS_ORIGIN=http://localhost:3000
```

### Performance Optimization

#### **Frontend Optimizations:**
```javascript
// vite.config.js optimizations
export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom'],
          icons: ['lucide-react']
        }
      }
    },
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true
      }
    }
  },
  server: {
    hmr: {
      overlay: false
    }
  }
});
```

#### **Backend Optimizations:**
```javascript
// server.js optimizations
app.use(compression());
app.use(express.static('public', {
  maxAge: '1y',
  etag: true
}));

// Database connection pooling
const pool = mysql.createPool({
  connectionLimit: 10,
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME
});
```

### Monitoring and Analytics

#### **Performance Monitoring:**
```javascript
// Add to main.jsx
import { getCLS, getFID, getFCP, getLCP, getTTFB } from 'web-vitals';

function sendToAnalytics(metric) {
  // Send to your analytics service
  console.log(metric);
}

getCLS(sendToAnalytics);
getFID(sendToAnalytics);
getFCP(sendToAnalytics);
getLCP(sendToAnalytics);
getTTFB(sendToAnalytics);
```

#### **Error Tracking:**
```javascript
// Error boundary component
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    // Log error to monitoring service
    console.error('Error caught by boundary:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return <ErrorFallback />;
    }
    return this.props.children;
  }
}
```

### Security Configuration

#### **Content Security Policy:**
```html
<!-- index.html -->
<meta http-equiv="Content-Security-Policy" content="
  default-src 'self';
  script-src 'self' 'unsafe-inline';
  style-src 'self' 'unsafe-inline';
  img-src 'self' data: https:;
  connect-src 'self' https://api.yourdomain.com;
  font-src 'self';
">
```

#### **Security Headers:**
```javascript
// backend/server.js
app.use(helmet({
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'self'"],
      styleSrc: ["'self'", "'unsafe-inline'"],
      scriptSrc: ["'self'"],
      imgSrc: ["'self'", "data:", "https:"],
      connectSrc: ["'self'", "https://api.yourdomain.com"]
    }
  },
  hsts: {
    maxAge: 31536000,
    includeSubDomains: true,
    preload: true
  }
}));
```

### Backup and Recovery

#### **Data Backup Strategy:**
```bash
#!/bin/bash
# backup.sh

DATE=$(date +%Y%m%d_%H%M%S)
BACKUP_DIR="/backups/mindwell"
DATA_DIR="./backend/data"

# Create backup directory
mkdir -p $BACKUP_DIR

# Backup data files
tar -czf $BACKUP_DIR/data_backup_$DATE.tar.gz $DATA_DIR

# Keep only last 7 days of backups
find $BACKUP_DIR -name "data_backup_*.tar.gz" -mtime +7 -delete

echo "Backup completed: data_backup_$DATE.tar.gz"
```

#### **Automated Backup (Cron Job):**
```bash
# Add to crontab
0 2 * * * /path/to/backup.sh
```

### Troubleshooting Guide

#### **Common Issues:**

1. **CORS Errors:**
   - Check CORS configuration in backend
   - Verify API_BASE_URL in frontend environment

2. **Build Failures:**
   - Clear node_modules and reinstall dependencies
   - Check Node.js version compatibility

3. **Performance Issues:**
   - Enable compression middleware
   - Optimize images and assets
   - Check database query performance

4. **Security Issues:**
   - Review security headers
   - Check input validation
   - Verify HTTPS configuration

#### **Log Analysis:**
```bash
# View application logs
tail -f /var/log/mindwell/app.log

# Check error logs
grep "ERROR" /var/log/mindwell/app.log

# Monitor performance
grep "slow query" /var/log/mindwell/app.log
```

### Maintenance Procedures

#### **Regular Maintenance Tasks:**
- [ ] Update dependencies monthly
- [ ] Review security patches weekly
- [ ] Monitor performance metrics daily
- [ ] Backup data weekly
- [ ] Test disaster recovery procedures quarterly

#### **Update Procedures:**
```bash
# Frontend updates
npm update
npm audit fix
npm run build
npm run test

# Backend updates
cd backend
npm update
npm audit fix
npm test
npm start
```

This deployment guide provides comprehensive instructions for both production deployment and offline demo setup, ensuring the MindWell campaign website can be effectively demonstrated and deployed in various environments.
