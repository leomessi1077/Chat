const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

console.log('🚀 Setting up Chat App...\n');

// Check if .env exists
const envPath = path.join(__dirname, '.env');
if (!fs.existsSync(envPath)) {
  console.log('📝 Creating .env file...');
  const envExample = `PORT=5000
MONGODB_URI=mongodb://localhost:27017/chatapp
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
CLIENT_URL=http://localhost:3000
NODE_ENV=development
`;
  fs.writeFileSync(envPath, envExample);
  console.log('✅ .env file created!\n');
}

// Check if frontend/.env exists
const frontendEnvPath = path.join(__dirname, 'frontend', '.env');
if (!fs.existsSync(frontendEnvPath)) {
  console.log('📝 Creating frontend/.env file...');
  const frontendEnv = `REACT_APP_API_URL=http://localhost:5000
REACT_APP_SOCKET_URL=http://localhost:5000
`;
  fs.writeFileSync(frontendEnvPath, frontendEnv);
  console.log('✅ frontend/.env file created!\n');
}

console.log('📦 Installing backend dependencies...');
try {
  execSync('npm install', { stdio: 'inherit' });
  console.log('✅ Backend dependencies installed!\n');
} catch (error) {
  console.error('❌ Error installing backend dependencies');
  process.exit(1);
}

console.log('📦 Installing frontend dependencies...');
try {
  execSync('npm install', { cwd: path.join(__dirname, 'frontend'), stdio: 'inherit' });
  console.log('✅ Frontend dependencies installed!\n');
} catch (error) {
  console.error('❌ Error installing frontend dependencies');
  process.exit(1);
}

console.log('🎉 Setup complete!\n');
console.log('📚 Next steps:');
console.log('1. Make sure MongoDB is running (or use MongoDB Atlas)');
console.log('2. Update .env file with your MongoDB connection string if needed');
console.log('3. Run "npm run dev" to start the application');
console.log('\n✨ Happy chatting!');

