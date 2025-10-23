# PowerShell script to create .env file with MongoDB configuration
# Run this in PowerShell: .\create-env.ps1

Write-Host "================================================" -ForegroundColor Cyan
Write-Host "   MongoDB Atlas Configuration Setup" -ForegroundColor Cyan
Write-Host "================================================" -ForegroundColor Cyan
Write-Host ""

# Get MongoDB username
Write-Host "Step 1: Enter your MongoDB Atlas username" -ForegroundColor Yellow
Write-Host "(Find it at: MongoDB Atlas > Database Access)" -ForegroundColor Gray
$username = Read-Host "Enter your MongoDB username"

if ([string]::IsNullOrWhiteSpace($username)) {
    Write-Host "ERROR: Username cannot be empty!" -ForegroundColor Red
    exit
}

# Create .env file content
$envContent = @"
PORT=5000
MONGODB_URI=mongodb+srv://$username:Manish2025@cluster0.bylmk9t.mongodb.net/chat?retryWrites=true&w=majority&appName=Cluster0
JWT_SECRET=manish-2025-chat-app-jwt-secret-key-production-ready
CLIENT_URL=http://localhost:3000
NODE_ENV=development
"@

# Write to .env file
$envContent | Out-File -FilePath ".env" -Encoding UTF8 -NoNewline

Write-Host ""
Write-Host "✓ .env file created successfully!" -ForegroundColor Green
Write-Host ""
Write-Host "Your configuration:" -ForegroundColor Cyan
Write-Host "  Database: chat" -ForegroundColor White
Write-Host "  Username: $username" -ForegroundColor White
Write-Host "  Password: Manish2025" -ForegroundColor White
Write-Host "  Cluster: cluster0.bylmk9t.mongodb.net" -ForegroundColor White
Write-Host ""
Write-Host "Next steps:" -ForegroundColor Yellow
Write-Host "1. Make sure IP is whitelisted in MongoDB Atlas" -ForegroundColor White
Write-Host "   (Network Access > Allow Access from Anywhere)" -ForegroundColor Gray
Write-Host "2. Run: npm run dev" -ForegroundColor White
Write-Host "3. View data at: MongoDB Atlas > Browse Collections > chat database" -ForegroundColor White
Write-Host ""
Write-Host "================================================" -ForegroundColor Cyan

