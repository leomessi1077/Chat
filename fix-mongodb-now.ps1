# Automatic .env file creation for MongoDB Atlas
# Run this: .\fix-mongodb-now.ps1

Write-Host ""
Write-Host "================================================================" -ForegroundColor Red
Write-Host "   FIXING 500 INTERNAL SERVER ERROR" -ForegroundColor Red
Write-Host "================================================================" -ForegroundColor Red
Write-Host ""

# Backend .env with MongoDB Atlas
$backendEnv = @"
PORT=5000
MONGODB_URI=mongodb+srv://Manish:Manish2025@cluster0.bylmk9t.mongodb.net/chat?retryWrites=true&w=majority&appName=Cluster0
JWT_SECRET=manish-2025-chat-app-secure-jwt-secret-production-key
CLIENT_URL=http://localhost:3000
NODE_ENV=development
"@

# Frontend .env
$frontendEnv = @"
REACT_APP_API_URL=http://localhost:5000
REACT_APP_SOCKET_URL=http://localhost:5000
"@

Write-Host "Creating backend .env file..." -ForegroundColor Yellow
$backendEnv | Out-File -FilePath ".env" -Encoding UTF8 -NoNewline
Write-Host "✓ Created: .env" -ForegroundColor Green

if (Test-Path "frontend") {
    Write-Host "Creating frontend .env file..." -ForegroundColor Yellow
    $frontendEnv | Out-File -FilePath "frontend\.env" -Encoding UTF8 -NoNewline
    Write-Host "✓ Created: frontend\.env" -ForegroundColor Green
}

Write-Host ""
Write-Host "================================================================" -ForegroundColor Green
Write-Host "   .env FILES CREATED!" -ForegroundColor Green
Write-Host "================================================================" -ForegroundColor Green
Write-Host ""
Write-Host "MongoDB Configuration:" -ForegroundColor Cyan
Write-Host "  Username: Manish" -ForegroundColor White
Write-Host "  Password: Manish2025" -ForegroundColor White
Write-Host "  Database: chat" -ForegroundColor White
Write-Host "  Cluster: cluster0.bylmk9t.mongodb.net" -ForegroundColor White
Write-Host ""
Write-Host "================================================================" -ForegroundColor Red
Write-Host "   CRITICAL: WHITELIST YOUR IP IN MONGODB ATLAS!" -ForegroundColor Red
Write-Host "================================================================" -ForegroundColor Red
Write-Host ""
Write-Host "1. Go to: https://cloud.mongodb.com/" -ForegroundColor Yellow
Write-Host "2. Click 'Network Access' (left menu)" -ForegroundColor Yellow
Write-Host "3. Click 'Add IP Address'" -ForegroundColor Yellow
Write-Host "4. Click 'Allow Access from Anywhere' (0.0.0.0/0)" -ForegroundColor Yellow
Write-Host "5. Click 'Confirm'" -ForegroundColor Yellow
Write-Host "6. WAIT 2 MINUTES for changes to activate" -ForegroundColor Yellow
Write-Host ""
Write-Host "================================================================" -ForegroundColor Cyan
Write-Host "   VERIFY YOUR USERNAME" -ForegroundColor Cyan
Write-Host "================================================================" -ForegroundColor Cyan
Write-Host ""
Write-Host "I used 'Manish' as your MongoDB username." -ForegroundColor White
Write-Host "If your username is different:" -ForegroundColor White
Write-Host ""
Write-Host "1. Check at: https://cloud.mongodb.com/ > Database Access" -ForegroundColor Gray
Write-Host "2. If different, edit .env file and replace 'Manish' with your username" -ForegroundColor Gray
Write-Host ""
Write-Host "================================================================" -ForegroundColor Green
Write-Host "   NEXT STEPS" -ForegroundColor Green
Write-Host "================================================================" -ForegroundColor Green
Write-Host ""
Write-Host "After whitelisting IP and waiting 2 minutes:" -ForegroundColor Cyan
Write-Host ""
Write-Host "1. Run: npm run dev" -ForegroundColor White
Write-Host ""
Write-Host "2. Look for this in terminal:" -ForegroundColor White
Write-Host "   ✓ MongoDB connected successfully" -ForegroundColor Green
Write-Host "   ✓ Server running on port 5000" -ForegroundColor Green
Write-Host ""
Write-Host "3. If you see the success message:" -ForegroundColor White
Write-Host "   - Refresh browser (F5)" -ForegroundColor Gray
Write-Host "   - Try registration again" -ForegroundColor Gray
Write-Host "   - Should work now!" -ForegroundColor Gray
Write-Host ""
Write-Host "4. If you see an error:" -ForegroundColor White
Write-Host "   - Take a screenshot of terminal" -ForegroundColor Gray
Write-Host "   - Share the error message" -ForegroundColor Gray
Write-Host ""
Write-Host "================================================================" -ForegroundColor Cyan
Write-Host ""

