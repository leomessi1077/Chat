# Quick .env creation with your MongoDB credentials
# Run this: .\create-env-quick.ps1

Write-Host ""
Write-Host "================================================================" -ForegroundColor Cyan
Write-Host "   Creating .env Files for MongoDB Atlas" -ForegroundColor Cyan
Write-Host "================================================================" -ForegroundColor Cyan
Write-Host ""
Write-Host "Your MongoDB Details:" -ForegroundColor Yellow
Write-Host "  Cluster: cluster0.bylmk9t.mongodb.net" -ForegroundColor White
Write-Host "  Password: Manish2025" -ForegroundColor White
Write-Host "  Database: chat" -ForegroundColor White
Write-Host ""

# Get username
Write-Host "FIND YOUR USERNAME:" -ForegroundColor Yellow
Write-Host "1. Go to: https://cloud.mongodb.com/" -ForegroundColor Gray
Write-Host "2. Click 'Database Access' on the left" -ForegroundColor Gray
Write-Host "3. Copy your username (e.g., 'Manish', 'admin', etc.)" -ForegroundColor Gray
Write-Host ""

$username = Read-Host "Enter your MongoDB Atlas username"

if ([string]::IsNullOrWhiteSpace($username)) {
    Write-Host ""
    Write-Host "ERROR: Username cannot be empty!" -ForegroundColor Red
    Write-Host "Please run the script again and enter your username." -ForegroundColor Yellow
    Write-Host ""
    pause
    exit
}

# Create backend .env
$backendEnv = @"
PORT=5000
MONGODB_URI=mongodb+srv://$username`:Manish2025@cluster0.bylmk9t.mongodb.net/chat?retryWrites=true&w=majority&appName=Cluster0
JWT_SECRET=manish-2025-chat-app-secure-jwt-secret-production-key
CLIENT_URL=http://localhost:3000
NODE_ENV=development
"@

# Create frontend .env
$frontendEnv = @"
REACT_APP_API_URL=http://localhost:5000
REACT_APP_SOCKET_URL=http://localhost:5000
"@

Write-Host ""
Write-Host "Creating files..." -ForegroundColor Yellow

# Write backend .env
$backendEnv | Out-File -FilePath ".env" -Encoding UTF8 -NoNewline
Write-Host "✓ Created: .env (backend)" -ForegroundColor Green

# Write frontend .env
if (!(Test-Path "frontend")) {
    Write-Host "Warning: frontend folder not found, skipping frontend/.env" -ForegroundColor Yellow
} else {
    $frontendEnv | Out-File -FilePath "frontend\.env" -Encoding UTF8 -NoNewline
    Write-Host "✓ Created: frontend\.env" -ForegroundColor Green
}

Write-Host ""
Write-Host "================================================================" -ForegroundColor Green
Write-Host "   SUCCESS! Environment files created!" -ForegroundColor Green
Write-Host "================================================================" -ForegroundColor Green
Write-Host ""
Write-Host "Your Configuration:" -ForegroundColor Cyan
Write-Host "  MongoDB Username: $username" -ForegroundColor White
Write-Host "  MongoDB Password: Manish2025" -ForegroundColor White
Write-Host "  Database Name: chat" -ForegroundColor White
Write-Host "  Cluster: cluster0.bylmk9t.mongodb.net" -ForegroundColor White
Write-Host ""
Write-Host "CRITICAL - WHITELIST YOUR IP:" -ForegroundColor Red
Write-Host "1. Go to: https://cloud.mongodb.com/" -ForegroundColor Yellow
Write-Host "2. Click 'Network Access'" -ForegroundColor Yellow
Write-Host "3. Click 'Add IP Address'" -ForegroundColor Yellow
Write-Host "4. Select 'Allow Access from Anywhere' (0.0.0.0/0)" -ForegroundColor Yellow
Write-Host "5. Click 'Confirm'" -ForegroundColor Yellow
Write-Host "6. Wait 1-2 minutes" -ForegroundColor Yellow
Write-Host ""
Write-Host "Next Steps:" -ForegroundColor Cyan
Write-Host "1. Make sure frontend dependencies are installed:" -ForegroundColor White
Write-Host "   cd frontend" -ForegroundColor Gray
Write-Host "   npm install" -ForegroundColor Gray
Write-Host "   cd .." -ForegroundColor Gray
Write-Host ""
Write-Host "2. Start the application:" -ForegroundColor White
Write-Host "   npm run dev" -ForegroundColor Gray
Write-Host ""
Write-Host "3. Open browser:" -ForegroundColor White
Write-Host "   http://localhost:3000" -ForegroundColor Gray
Write-Host ""
Write-Host "================================================================" -ForegroundColor Cyan
Write-Host ""

