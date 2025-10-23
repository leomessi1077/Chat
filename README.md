# 💬 Real-Time Chat Application

A modern, full-featured WhatsApp-like chat application built with the MERN stack (MongoDB, Express, React, Node.js) and Socket.io for real-time messaging.

![MERN Stack](https://img.shields.io/badge/MERN-Stack-green)
![Socket.io](https://img.shields.io/badge/Socket.io-Real--time-blue)
![MongoDB](https://img.shields.io/badge/MongoDB-Atlas-green)
![React](https://img.shields.io/badge/React-18-blue)
![Node.js](https://img.shields.io/badge/Node.js-Latest-green)

## ✨ Features

- 🔐 **User Authentication** - Secure JWT-based registration and login
- 💬 **Real-time Messaging** - Instant message delivery using Socket.io
- 🟢 **Online Status** - See who's online with live status indicators
- ⌨️ **Typing Indicators** - Know when someone is typing
- 📱 **Responsive Design** - Beautiful dark UI that works on all devices
- 🔍 **User Search** - Quickly find and start conversations
- 💾 **Message Persistence** - All messages stored in MongoDB Atlas
- 🎨 **Modern UI** - WhatsApp-inspired dark theme with Tailwind CSS

## 🚀 Tech Stack

### Frontend
- React 18
- Tailwind CSS
- Socket.io Client
- React Router
- Axios
- React Context API

### Backend
- Node.js & Express
- MongoDB & Mongoose
- Socket.io
- JWT Authentication
- bcryptjs

## 📦 Installation

### Prerequisites
- Node.js (v14 or higher)
- MongoDB Atlas account (or local MongoDB)
- npm or yarn

### Setup Instructions

1. **Clone the repository**
   ```bash
   git clone https://github.com/leomessi1077/Chat.git
   cd Chat
   ```

2. **Install backend dependencies**
   ```bash
   npm install
   ```

3. **Install frontend dependencies**
   ```bash
   cd frontend
   npm install
   cd ..
   ```

4. **Create environment variables**

   Create `.env` file in root directory:
   ```env
   PORT=5000
   MONGODB_URI=your_mongodb_atlas_connection_string
   JWT_SECRET=your_jwt_secret_key
   CLIENT_URL=http://localhost:3000
   NODE_ENV=development
   ```

   Create `frontend/.env` file:
   ```env
   REACT_APP_API_URL=http://localhost:5000
   REACT_APP_SOCKET_URL=http://localhost:5000
   ```

5. **Start the application**
   ```bash
   npm run dev
   ```

   This will start:
   - Backend server on `http://localhost:5000`
   - Frontend on `http://localhost:3000`

## 🎮 Usage

1. Open `http://localhost:3000` in your browser
2. Register a new account
3. Open an incognito window and register another user
4. Start chatting between the two accounts!

## 📁 Project Structure

```
Chat/
├── backend/
│   ├── models/          # MongoDB schemas
│   ├── routes/          # API routes
│   ├── middleware/      # Authentication middleware
│   └── server.js        # Express server & Socket.io
├── frontend/
│   ├── src/
│   │   ├── components/  # React components
│   │   ├── context/     # React Context (Auth, Socket)
│   │   ├── pages/       # Page components
│   │   └── App.js       # Main app component
│   └── public/
├── .env                 # Backend environment variables
└── package.json         # Backend dependencies
```

## 🔐 Environment Variables

### Backend (.env)
- `PORT` - Server port (default: 5000)
- `MONGODB_URI` - MongoDB connection string
- `JWT_SECRET` - Secret key for JWT tokens
- `CLIENT_URL` - Frontend URL for CORS
- `NODE_ENV` - Environment (development/production)

### Frontend (frontend/.env)
- `REACT_APP_API_URL` - Backend API URL
- `REACT_APP_SOCKET_URL` - Socket.io server URL

## 🌐 Deployment

### Deploy to Vercel

1. Push your code to GitHub
2. Import project to Vercel
3. Add environment variables in Vercel dashboard
4. Deploy!

See `DEPLOYMENT.md` for detailed instructions.

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📝 License

This project is licensed under the MIT License.

## 🙏 Acknowledgments

- Inspired by WhatsApp's UI/UX
- Built with the MERN stack
- Real-time powered by Socket.io

## 📧 Contact

For questions or support, please open an issue in the repository.

---

**Made with ❤️ using MERN Stack**

⭐ Star this repo if you find it helpful!
