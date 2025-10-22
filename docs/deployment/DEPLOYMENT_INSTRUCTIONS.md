# 🚀 Complete Deployment Instructions

## Quick Start Guide for BPA Competition

### Prerequisites
- GitHub account
- Netlify account (free)
- Render account (free)

---

## Part 1: Deploy Backend to Render (5 minutes)

### Step 1: Push to GitHub

```bash
# If you haven't initialized git yet
git init
git add .
git commit -m "Initial commit - MindWell Mental Health Campaign"

# Create a new repository on GitHub, then:
git remote add origin https://github.com/YOUR-USERNAME/YOUR-REPO-NAME.git
git branch -M main
git push -u origin main
```

### Step 2: Deploy on Render

1. **Go to Render:** https://render.com
2. **Sign up/Login** with your GitHub account
3. **Create New Web Service:**
   - Click "New +" → "Web Service"
   - Connect your GitHub repository
   - **Important:** Set Root Directory to `backend`
   
4. **Configure Service:**
   ```
   Name: mindwell-backend
   Environment: Node
   Region: Oregon (or closest to you)
   Branch: main
   Root Directory: backend
   Build Command: npm install
   Start Command: npm start
   ```

5. **Select Plan:**
   - Choose "Free" plan

6. **Add Environment Variables:**
   - Click "Environment" tab
   - Add variable:
     - Key: `FRONTEND_URL`
     - Value: `https://mindwell-campaign.netlify.app` (we'll get this from Netlify)

7. **Deploy:**
   - Click "Create Web Service"
   - Wait 2-3 minutes for deployment
   - **Copy your backend URL**: `https://mindwell-backend.onrender.com`

### Step 3: Test Backend

Open in browser: `https://mindwell-backend.onrender.com/api/health`

Should see:
```json
{
  "status": "healthy",
  "timestamp": "2026-03-15T...",
  "version": "1.0.0"
}
```

✅ **Backend deployed!**

---

## Part 2: Deploy Frontend to Netlify (5 minutes)

### Step 1: Create Environment File

Create `.env.production` in your project root:

```env
VITE_API_BASE_URL=https://mindwell-backend.onrender.com
```

**Commit and push:**
```bash
git add .env.production
git commit -m "Add production environment config"
git push
```

### Step 2: Deploy on Netlify

1. **Go to Netlify:** https://netlify.com
2. **Sign up/Login** with your GitHub account
3. **Create New Site:**
   - Click "Add new site" → "Import an existing project"
   - Choose GitHub
   - Select your repository
   
4. **Configure Build:**
   ```
   Branch: main
   Base directory: (leave empty)
   Build command: npm run build
   Publish directory: dist
   ```

5. **Add Environment Variables:**
   - Click "Site settings" → "Environment variables"
   - Add variable:
     - Key: `VITE_API_BASE_URL`
     - Value: `https://mindwell-backend.onrender.com`

6. **Deploy:**
   - Click "Deploy site"
   - Wait 2-3 minutes
   - Your site will be at: `https://random-name-12345.netlify.app`

### Step 3: Customize Domain (Optional)

1. **Change Site Name:**
   - Go to "Site settings" → "Site details"
   - Click "Change site name"
   - Enter: `mindwell-campaign`
   - Your URL is now: `https://mindwell-campaign.netlify.app`

2. **Update Backend CORS:**
   - Go back to Render
   - Update `FRONTEND_URL` environment variable
   - Value: `https://mindwell-campaign.netlify.app`
   - Click "Save Changes" (backend will redeploy)

### Step 4: Test Frontend

1. Open: `https://mindwell-campaign.netlify.app`
2. Test features:
   - ✅ Homepage loads
   - ✅ Mood tracker works
   - ✅ Navigation works
   - ✅ All pages accessible
   - ✅ Dark mode works

✅ **Frontend deployed!**

---

## Part 3: Connect Frontend & Backend

Your frontend should now communicate with your backend. Test these features:

1. **Try Appointment Form:**
   - Go to Support page
   - Fill out appointment form
   - Click submit
   - Should see success message

2. **Check Browser Console:**
   - Press F12 → Console tab
   - Should see: `API Base URL: https://mindwell-backend.onrender.com/api`
   - No CORS errors

If you see CORS errors, make sure:
- Backend has correct FRONTEND_URL
- Both services redeployed after environment changes

---

## Part 4: Final BPA Submission

### Update All Documentation

**Update these files with your actual URLs:**

1. **BPA_SUBMISSION_PACKAGE.md:**
   - Replace `https://mindwell-campaign.netlify.app` with your actual URL
   - Add your backend URL if requested

2. **README.md:**
   - Add live demo link
   - Update deployment status

3. **WORKS_CITED.md:**
   - Ensure all sources are still accessible

### Test Checklist Before Submission

- [ ] Homepage loads correctly
- [ ] All navigation links work
- [ ] Mood tracker functions
- [ ] Appointment form submits (test with real data)
- [ ] Community features work
- [ ] Blog posts load
- [ ] Contact page accessible
- [ ] Dark mode toggles
- [ ] Mobile responsive (test on phone)
- [ ] All crisis hotline links clickable
- [ ] No console errors (F12 → Console)
- [ ] Lighthouse score 95+ (F12 → Lighthouse)
- [ ] Accessibility score 100/100

### Submit to BPA

1. **Get Final URLs:**
   - Frontend: `https://mindwell-campaign.netlify.app`
   - (Backend is hidden from users, only frontend URL needed)

2. **Go to BPA Submission Portal:**
   - https://upload.bpa.org
   - Login with Team ID
   - Submit URL, Works Cited, Release Forms
   - Deadline: April 1, 2026 at 11:59 PM ET

3. **Save Confirmation:**
   - Screenshot submission page
   - Save confirmation email
   - Note submission ID

---

## Troubleshooting

### Backend Issues

**Problem:** Backend shows "Application failed to respond"
- **Solution:** Check Render logs, might be startup delay (free tier)
- **Fix:** Visit backend URL to wake it up

**Problem:** CORS errors in browser
- **Solution:** 
  1. Check FRONTEND_URL in Render environment variables
  2. Make sure it matches your Netlify URL exactly
  3. Redeploy backend after changing

**Problem:** API endpoints return 404
- **Solution:** Check backend logs in Render dashboard
- **Fix:** Ensure routes are properly defined in server.js

### Frontend Issues

**Problem:** "API Base URL: undefined"
- **Solution:** Environment variable not set
- **Fix:** Add `VITE_API_BASE_URL` in Netlify environment variables

**Problem:** Build fails on Netlify
- **Solution:** Check build logs
- **Common fixes:**
  - Run `npm install` locally to update package-lock.json
  - Ensure no errors in code
  - Check Node version compatibility

**Problem:** Site loads but features don't work
- **Solution:** Open browser console (F12)
- **Check:** Network tab for failed API calls
- **Fix:** Verify backend is running and CORS is configured

### Quick Debug Commands

```bash
# Test backend health
curl https://mindwell-backend.onrender.com/api/health

# Test CORS (from terminal)
curl -H "Origin: https://mindwell-campaign.netlify.app" \
     -H "Access-Control-Request-Method: POST" \
     -X OPTIONS \
     https://mindwell-backend.onrender.com/api/appointments

# Check Netlify build logs
netlify logs

# Check Render logs (in Render dashboard)
```

---

## Free Tier Limitations

### Render (Backend)
- ⚠️ **Sleeps after 15 minutes of inactivity**
- First request after sleep takes 30-60 seconds to wake up
- **For BPA Demo:** Visit backend URL 1-2 minutes before presentation

### Netlify (Frontend)
- ✅ No sleep, instant loading
- ✅ Unlimited bandwidth (100GB/month free)
- ✅ Automatic HTTPS
- ✅ Global CDN

---

## Keeping Backend Awake During Competition

### Option 1: UptimeRobot (Recommended)

1. Go to https://uptimerobot.com (free)
2. Create monitor:
   - URL: `https://mindwell-backend.onrender.com/api/health`
   - Interval: 5 minutes
   - Monitor Type: HTTP(s)
3. Backend stays awake during competition hours

### Option 2: Manual Wake-Up

Before your presentation (2-3 minutes):
1. Open: `https://mindwell-backend.onrender.com/api/health`
2. Wait for response
3. Backend is now warm and fast

---

## Post-Deployment Updates

To update your site after deployment:

```bash
# Make changes to code
# Then commit and push
git add .
git commit -m "Update website features"
git push

# Netlify auto-deploys on push to main
# Render auto-deploys on push to main
```

Both services redeploy automatically in 2-3 minutes.

---

## Competition Day Checklist

### One Week Before
- [ ] Both frontend and backend deployed
- [ ] Custom domain configured (mindwell-campaign)
- [ ] All features tested in production
- [ ] UptimeRobot monitoring active
- [ ] Backup offline demo ready

### Day Before Competition
- [ ] Test all features one final time
- [ ] Verify URLs are accessible
- [ ] Check mobile responsiveness
- [ ] Test on different browsers
- [ ] Verify SSL certificates active (https://)

### Morning of Competition
- [ ] Visit backend URL to wake it up
- [ ] Test frontend loads correctly
- [ ] Have URLs written down/printed
- [ ] Backup plan ready (offline demo)

---

## Success! 🎉

Your website is now live and ready for BPA Nationals:

**Frontend:** `https://mindwell-campaign.netlify.app`  
**Backend:** `https://mindwell-backend.onrender.com` (hidden from users)

**Total Cost:** $0 (100% free tier)  
**Deployment Time:** ~15 minutes  
**Maintenance:** Automatic updates on git push

---

## Need Help?

**Render Support:**
- Docs: https://render.com/docs
- Community: https://community.render.com

**Netlify Support:**
- Docs: https://docs.netlify.com
- Community: https://answers.netlify.com

**Your Team:**
- Check deployment logs in respective dashboards
- Use browser dev tools (F12) for frontend debugging
- Test API endpoints with curl or Postman

---

**You're ready for Nationals! Good luck! 🏆**

