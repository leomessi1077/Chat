@echo off
REM Batch script to create .env file with MongoDB configuration
REM Run this in Command Prompt: create-env.bat

echo ================================================
echo    MongoDB Atlas Configuration Setup
echo ================================================
echo.

set /p username="Enter your MongoDB Atlas username: "

if "%username%"=="" (
    echo ERROR: Username cannot be empty!
    pause
    exit /b
)

echo PORT=5000> .env
echo MONGODB_URI=mongodb+srv://%username%:Manish2025@cluster0.bylmk9t.mongodb.net/chat?retryWrites=true^&w=majority^&appName=Cluster0>> .env
echo JWT_SECRET=manish-2025-chat-app-jwt-secret-key-production-ready>> .env
echo CLIENT_URL=http://localhost:3000>> .env
echo NODE_ENV=development>> .env

echo.
echo ✓ .env file created successfully!
echo.
echo Your configuration:
echo   Database: chat
echo   Username: %username%
echo   Password: Manish2025
echo   Cluster: cluster0.bylmk9t.mongodb.net
echo.
echo Next steps:
echo 1. Make sure IP is whitelisted in MongoDB Atlas
echo 2. Run: npm run dev
echo 3. View data at: MongoDB Atlas ^> Browse Collections ^> chat database
echo.
echo ================================================
pause

