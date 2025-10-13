# ⚡ Quick Deployment Guide - 10 Minutes to Live

## 🎯 Goal
Get your MindWell website live on the internet for BPA submission.

---

## 📋 What You Need
- GitHub account (free)
- Netlify account (free) - for frontend
- Render account (free) - for backend

---

## 🚀 Deploy Backend (5 min)

### 1. Push to GitHub
```bash
git init
git add .
git commit -m "Deploy MindWell to production"
```

Create repo on GitHub, then:
```bash
git remote add origin https://github.com/YOUR-USERNAME/mindwell.git
git push -u origin main
```

### 2. Deploy on Render
1. Go to https://render.com → Sign up with GitHub
2. Click **"New +"** → **"Web Service"**
3. Connect your GitHub repo
4. **Root Directory:** `backend`
5. **Build Command:** `npm install`
6. **Start Command:** `npm start`
7. **Plan:** Free
8. Click **"Create Web Service"**
9. ⏱️ Wait 2 minutes for deployment
10. **Copy URL:** `https://mindwell-backend.onrender.com` ✅

### 3. Test Backend
Open: `https://mindwell-backend.onrender.com/api/health`

Should see: `{"status":"healthy",...}`

---

## 🌐 Deploy Frontend (5 min)

### 1. Deploy on Netlify
1. Go to https://netlify.com → Sign up with GitHub
2. Click **"Add new site"** → **"Import an existing project"**
3. Choose **GitHub** → Select your repo
4. **Build command:** `npm run build`
5. **Publish directory:** `dist`
6. Click **"Deploy site"**
7. ⏱️ Wait 2 minutes

### 2. Configure Environment
1. Click **"Site settings"** → **"Environment variables"**
2. Add variable:
   - **Key:** `VITE_API_BASE_URL`
   - **Value:** `https://mindwell-backend.onrender.com`
3. Click **"Save"**
4. Click **"Deploys"** → **"Trigger deploy"** → **"Clear cache and deploy"**

### 3. Customize URL
1. **Site settings** → **"Site details"** → **"Change site name"**
2. Enter: `mindwell-campaign`
3. Your URL: `https://mindwell-campaign.netlify.app` ✅

### 4. Update Backend CORS
1. Go back to Render dashboard
2. Your service → **"Environment"** tab
3. Add variable:
   - **Key:** `FRONTEND_URL`
   - **Value:** `https://mindwell-campaign.netlify.app`
4. Click **"Save Changes"** (auto-redeploys)

---

## ✅ Test Everything (2 min)

Visit: `https://mindwell-campaign.netlify.app`

**Test Checklist:**
- [ ] Homepage loads
- [ ] All pages accessible
- [ ] Mood tracker works
- [ ] No errors in console (F12)
- [ ] Mobile works (test on phone)

---

## 🎓 For BPA Submission

**Your Project URL:**
```
https://mindwell-campaign.netlify.app
```

**Submit to BPA:**
1. Go to https://upload.bpa.org
2. Enter your URL above
3. Upload Works Cited (WORKS_CITED.md)
4. Upload Release Forms (signed by all team members)
5. Submit before April 1, 2026 at 11:59 PM ET

---

## ⚠️ Important Notes

### Backend Sleep (Render Free Tier)
- Backend sleeps after 15 minutes of inactivity
- First request takes 30-60 seconds to wake up

**Before Competition Presentation:**
1. Open `https://mindwell-backend.onrender.com/api/health` 
2. Wait for response (wakes backend up)
3. Now demo will be fast! ⚡

### Keep Backend Awake (Optional)
Use UptimeRobot (free):
1. https://uptimerobot.com
2. Monitor: `https://mindwell-backend.onrender.com/api/health`
3. Check every 5 minutes
4. Backend stays awake

---

## 🐛 Quick Fixes

### "API Base URL: undefined"
**Fix:** Add `VITE_API_BASE_URL` in Netlify environment variables, then redeploy

### CORS Errors
**Fix:** Update `FRONTEND_URL` in Render to match your Netlify URL exactly

### Backend 404 Errors
**Fix:** Wait 1 minute (backend is waking up from sleep)

### Build Fails
**Fix:** Run `npm install` locally, commit `package-lock.json`, push again

---

## 📱 Share Your Project

**Direct Link:** https://mindwell-campaign.netlify.app

**QR Code:** Generate at https://qr-code-generator.com
- Paste your URL
- Download QR code
- Add to presentation slides!

---

## 🏆 You Did It!

✅ Backend deployed to Render  
✅ Frontend deployed to Netlify  
✅ Ready for BPA Nationals  
✅ Total cost: $0

**Good luck at competition! 🎉**

---

## 💡 Pro Tips

1. **Test before competition day** - Don't deploy day-of
2. **Wake backend before presenting** - Avoid 30s delay
3. **Have backup** - Run local server as backup
4. **Print URLs** - Have them written down
5. **Test on mobile** - Judges might check on phones

---

**Need help?** Check `DEPLOYMENT_INSTRUCTIONS.md` for detailed troubleshooting.

