# Railway Deployment Instructions for Velora Global Server

## Quick Deploy to Railway (Free)

1. **Go to Railway.app** and sign up (free account)

2. **Connect your GitHub** or upload the server folder directly

3. **Deploy from GitHub** (recommended):
   - Fork this project to your GitHub
   - Connect GitHub repo to Railway
   - Railway will auto-detect it's a Node.js app

4. **Manual Upload** (alternative):
   - Download server folder as ZIP
   - Upload to Railway dashboard
   - Set environment variables if needed

## Environment Variables (if needed)
Add these in Railway dashboard:
- `PORT=3001` (Railway will provide this automatically)
- `NODE_ENV=production`

## Your API Endpoints After Deployment
After successful deployment, you'll get a URL like:
`https://velora-server-production.up.railway.app`

Update your React app to use this new URL instead of `http://localhost:3001`

## Test Your Deployment
- Exchange rates: `https://your-railway-url/api/exchange-rates`
- Currency conversion: `https://your-railway-url/api/convert-currency`