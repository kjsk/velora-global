#!/bin/bash
# Build script for Velora Global deployment

echo "🚀 Building Velora Global for production..."

# Navigate to client folder
cd client

# Set environment to production
export REACT_APP_API_URL=https://your-railway-app-url.up.railway.app

# Build the React app
npm run build

echo "✅ Build complete! Files are in client/build/"
echo "📁 Upload these files to your GoDaddy hosting:"
echo "   - client/build/index.html"
echo "   - client/build/static/ (entire folder)"
echo "   - All other files in client/build/"

echo "🌐 Don't forget to update the Railway URL in api.config.js"