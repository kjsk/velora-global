# Build Script for Windows (PowerShell)
# Run this script to build your React app for production

Write-Host "🚀 Building Velora Global for production..." -ForegroundColor Green

# Navigate to client folder
Set-Location -Path ".\client"

# Build the React app
npm run build

Write-Host "✅ Build complete! Files are in client\build\" -ForegroundColor Green
Write-Host "📁 Upload these files to your GoDaddy hosting:" -ForegroundColor Yellow
Write-Host "   - client\build\index.html"
Write-Host "   - client\build\static\ (entire folder)"
Write-Host "   - All other files in client\build\" -ForegroundColor Yellow

Write-Host "🌐 Don't forget to update the Railway URL in api.config.js first!" -ForegroundColor Red