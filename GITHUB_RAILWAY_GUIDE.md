# 🚀 Connect Velora Global to GitHub & Deploy to Railway

## Step 1: Create GitHub Repository

1. **Go to GitHub.com** and log in (or create account)
2. **Click the "+" icon** in top right → "New repository"
3. **Repository Name**: `velora-global`
4. **Description**: `Shipping and logistics web application with currency conversion`
5. **Make it Public** (for free Railway deployment)
6. **Don't initialize** with README (we already have one)
7. **Click "Create repository"**

## Step 2: Connect Your Local Project to GitHub

**Copy your GitHub repository URL** (looks like: `https://github.com/yourusername/velora-global.git`)

Then run these commands in your project folder:

```bash
# Add the GitHub remote
$env:PATH += ";C:\Program Files\Git\bin"; git remote add origin https://github.com/yourusername/velora-global.git

# Push your code to GitHub
$env:PATH += ";C:\Program Files\Git\bin"; git branch -M main
$env:PATH += ";C:\Program Files\Git\bin"; git push -u origin main
```

## Step 3: Deploy to Railway (FREE)

1. **Go to Railway.app** and sign up with GitHub
2. **Click "New Project"** → "Deploy from GitHub"
3. **Select your `velora-global` repository**
4. **Railway will auto-detect** it's a Node.js app and deploy automatically
5. **Wait 2-3 minutes** for deployment to complete
6. **Copy your Railway URL** (looks like: `https://velora-server-production.up.railway.app`)

## Step 4: Update Frontend Configuration

1. **Edit the API configuration** file: `client/src/config/api.config.js`
2. **Replace the Railway URL** with your actual Railway URL:
   ```javascript
   production: 'https://velora-server-production.up.railway.app'
   ```
3. **Rebuild your React app**:
   ```bash
   cd client
   npm run build
   ```

## Step 5: Test Your Deployment

**Test Backend API**:
```
https://your-railway-url.up.railway.app/api/exchange-rates
```

**Test Frontend**:
- Upload the new `client/build/` folder to your GoDaddy hosting
- Visit: https://veloraglobal.co.in/pricing

## 🎯 Success Checklist

- ✅ GitHub repository created
- ✅ Code pushed to GitHub
- ✅ Railway deployment successful
- ✅ Backend API working
- ✅ Frontend updated with new API URL
- ✅ Frontend rebuilt and uploaded
- ✅ Currency conversion working on live site

## 🆘 Troubleshooting

### Railway Deployment Issues
- Check Railway dashboard logs
- Ensure `railway.json` is in server folder
- Verify Node.js version compatibility

### API Connection Issues
- Test API endpoints directly in browser
- Check CORS configuration in server
- Verify API URLs in frontend config

### Build Issues
- Clear npm cache: `npm cache clean --force`
- Delete `node_modules` and reinstall
- Check for missing dependencies

## 📞 Need Help?

If you get stuck on any step:
1. Check Railway deployment logs
2. Test API endpoints directly
3. Verify all URLs are correct
4. Open an issue on GitHub

**Next Step**: Go to Railway.app and start your deployment! 🚀