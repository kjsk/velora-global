# 🚀 Deploy to Railway (FREE) - Step by Step

## Quick Start (5 minutes)

1. **Go to Railway.app** → Sign up with GitHub
2. **Click "New Project"** → "Deploy from GitHub"
3. **Select your Velora Global repository**
4. **Railway auto-detects** it's Node.js and deploys automatically
5. **Copy your Railway URL** (looks like: `velora-server-production.up.railway.app`)

## Update Frontend

After Railway deployment:
1. Edit `client/src/config/api.config.js`
2. Change: `production: 'https://your-railway-url.up.railway.app'`
3. Rebuild: `npm run build` in client folder
4. Upload new build to GoDaddy

## Test Your Backend

- Exchange rates: `https://your-railway-url.up.railway.app/api/exchange-rates`
- Currency conversion: `https://your-railway-url.up.railway.app/api/convert-currency`

## Benefits
✅ **Completely FREE** (500 hours/month)
✅ **Auto-deploys** from GitHub
✅ **Handles Node.js perfectly**
✅ **SSL included**
✅ **Never sleeps** (unlike some free hosts)