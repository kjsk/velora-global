# GitHub Connection Script for Velora Global
# This script helps you connect your local project to GitHub

echo "🚀 Velora Global - GitHub Connection Helper"
echo "=========================================="
echo ""

# Set up Git path
$env:PATH += ";C:\Program Files\Git\bin"

# Check if Git is working
try {
    git --version | Out-Null
    echo "✅ Git is installed and working"
} catch {
    echo "❌ Git not found. Please install Git first."
    exit 1
}

echo ""
echo "📋 STEP 1: Create GitHub Repository"
echo "-------------------------------------"
echo "1. Go to https://github.com"
echo "2. Click '+' → 'New repository'"
echo "3. Name: 'velora-global'"
echo "4. Make it PUBLIC (required for Railway)"
echo "5. DON'T initialize with README"
echo "6. Click 'Create repository'"
echo ""

# Get GitHub username
echo "📋 STEP 2: Enter Your GitHub Details"
$githubUsername = Read-Host "Enter your GitHub username"
$githubToken = Read-Host "Enter your GitHub personal access token (or password)" -AsSecureString

# Convert secure string to plain text (for Git URL)
$credentials = [System.Runtime.InteropServices.Marshal]::PtrToStringAuto([System.Runtime.InteropServices.Marshal]::SecureStringToBSTR($githubToken))

echo ""
echo "🔗 STEP 3: Connecting to GitHub..."
try {
    # Add remote origin
    git remote add origin "https://$githubUsername`:$credentials@github.com/$githubUsername/velora-global.git"
    
    # Rename branch to main
    git branch -M main
    
    # Push to GitHub
    git push -u origin main
    
    echo "✅ Successfully connected to GitHub!"
    echo "🌐 Repository: https://github.com/$githubUsername/velora-global"
    
} catch {
    echo "❌ Error connecting to GitHub. Check your credentials and try again."
    echo "   You can also connect manually using:"
    echo "   git remote add origin https://github.com/$githubUsername/velora-global.git"
    echo "   git branch -M main"
    echo "   git push -u origin main"
}

echo ""
echo "🚂 NEXT: Deploy to Railway!"
echo "1. Go to https://railway.app"
echo "2. Sign up with GitHub"
echo "3. Click 'New Project' → 'Deploy from GitHub'"
echo "4. Select your velora-global repository"
echo "5. Wait for deployment and copy the Railway URL"
echo ""
echo "📖 Check DEPLOYMENT_CHECKLIST.md for detailed instructions!"