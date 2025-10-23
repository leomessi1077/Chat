# PowerShell script to create .env files automatically
# Run this: .\setup-env-files.ps1

Write-Host ""
Write-Host "================================================================" -ForegroundColor Cyan
Write-Host "   Creating .env files for Chat App" -ForegroundColor Cyan
Write-Host "================================================================" -ForegroundColor Cyan
Write-Host ""

# Backend .env content
$backendEnv = @"
PORT=5000
MONGODB_URI=mongodb+srv://Manish:Manish123@cluster0.bylmk9t.mongodb.net/chat?retryWrites=true&w=majority&appName=Cluster0
JWT_SECRET=manish-2025-chat-app-secure-jwt-secret-production-key
CLIENT_URL=http://localhost:3000
NODE_ENV=development
"@

# Frontend .env content
$frontendEnv = @"
REACT_APP_API_URL=http://localhost:5000
REACT_APP_SOCKET_URL=http://localhost:5000
"@

# Create backend .env
Write-Host "Creating backend .env file..." -ForegroundColor Yellow
$backendEnv | Out-File -FilePath ".env" -Encoding UTF8 -NoNewline
Write-Host "✓ Created: .env" -ForegroundColor Green

# Create frontend .env
Write-Host "Creating frontend .env file..." -ForegroundColor Yellow
$frontendEnv | Out-File -FilePath "frontend\.env" -Encoding UTF8 -NoNewline
Write-Host "✓ Created: frontend\.env" -ForegroundColor Green

Write-Host ""
Write-Host "================================================================" -ForegroundColor Green
Write-Host "   SUCCESS! Environment files created!" -ForegroundColor Green
Write-Host "================================================================" -ForegroundColor Green
Write-Host ""
Write-Host "Your MongoDB Configuration:" -ForegroundColor Cyan
Write-Host "  Username: Manish" -ForegroundColor White
Write-Host "  Password: Manish123" -ForegroundColor White
Write-Host "  Database: chat" -ForegroundColor White
Write-Host "  Cluster: cluster0.bylmk9t.mongodb.net" -ForegroundColor White
Write-Host ""
Write-Host "Next Steps:" -ForegroundColor Yellow
Write-Host ""
Write-Host "1. Whitelist your IP in MongoDB Atlas:" -ForegroundColor White
Write-Host "   → Go to: https://cloud.mongodb.com/" -ForegroundColor Gray
Write-Host "   → Network Access → Add IP Address" -ForegroundColor Gray
Write-Host "   → Allow Access from Anywhere (0.0.0.0/0)" -ForegroundColor Gray
Write-Host "   → Wait 1-2 minutes" -ForegroundColor Gray
Write-Host ""
Write-Host "2. Install dependencies:" -ForegroundColor White
Write-Host "   npm install" -ForegroundColor Gray
Write-Host ""
Write-Host "3. Start the application:" -ForegroundColor White
Write-Host "   npm run dev" -ForegroundColor Gray
Write-Host ""
Write-Host "4. Open in browser:" -ForegroundColor White
Write-Host "   http://localhost:3000" -ForegroundColor Gray
Write-Host ""
Write-Host "5. View your data in MongoDB Atlas:" -ForegroundColor White
Write-Host "   → Database → Browse Collections → chat database" -ForegroundColor Gray
Write-Host ""
Write-Host "================================================================" -ForegroundColor Cyan
Write-Host "Happy Chatting! 💬" -ForegroundColor Green
Write-Host "================================================================" -ForegroundColor Cyan
Write-Host ""

