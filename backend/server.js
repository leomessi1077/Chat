const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const http = require('http');
const socketIO = require('socket.io');

dotenv.config();

const app = express();
const server = http.createServer(app);
const io = socketIO(server, {
  cors: {
    origin: process.env.CLIENT_URL || "http://localhost:3000",
    methods: ["GET", "POST"]
  }
});

// Middleware
app.use(cors({
  origin: process.env.CLIENT_URL || "http://localhost:3000",
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"]
}));
app.use(express.json());

// MongoDB Connection
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/chatapp', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('MongoDB connected successfully');
  } catch (error) {
    console.error('MongoDB connection error:', error);
    process.exit(1);
  }
};

connectDB();

// Routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/users', require('./routes/users'));
app.use('/api/messages', require('./routes/messages'));

// Socket.io
const users = {};

io.on('connection', (socket) => {
  console.log('New user connected:', socket.id);

  socket.on('user-connected', (userId) => {
    users[userId] = socket.id;
    io.emit('user-status', { userId, status: 'online' });
  });

  socket.on('send-message', async (data) => {
    const { receiverId, message } = data;
    const receiverSocketId = users[receiverId];
    
    if (receiverSocketId) {
      io.to(receiverSocketId).emit('receive-message', message);
    }
    
    io.to(socket.id).emit('message-sent', message);
  });

  socket.on('typing', (data) => {
    const { receiverId, isTyping, senderId } = data;
    const receiverSocketId = users[receiverId];
    
    if (receiverSocketId) {
      io.to(receiverSocketId).emit('user-typing', { senderId, isTyping });
    }
  });

  socket.on('disconnect', () => {
    const userId = Object.keys(users).find(key => users[key] === socket.id);
    if (userId) {
      delete users[userId];
      io.emit('user-status', { userId, status: 'offline' });
    }
    console.log('User disconnected:', socket.id);
  });
});

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', message: 'Server is running' });
});

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

module.exports = { app, io };

