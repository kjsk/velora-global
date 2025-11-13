# GitHub Connection Helper Script
# Run this script to connect your project to GitHub

echo "🚀 Connecting Velora Global to GitHub..."

# Set up Git configuration (replace with your details)
$env:PATH += ";C:\Program Files\Git\bin"

# Configure Git (UPDATE THESE VALUES!)
git config --global user.email "your-email@example.com"
git config --global user.name "Your Name"

echo "✅ Git configured successfully!"
echo ""
echo "📋 NEXT STEPS:"
echo "1. Go to GitHub.com and create a new repository called 'velora-global'"
echo "2. Copy your repository URL (https://github.com/yourusername/velora-global.git)"
echo "3. Run these commands:"
echo ""
echo "   git remote add origin https://github.com/yourusername/velora-global.git"
echo "   git branch -M main"
echo "   git push -u origin main"
echo ""
echo "🎯 Then go to Railway.app and deploy from GitHub!"

echo ""
echo "💡 Don't forget to update your email and name in this script first!"