import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Sidebar from '../components/Sidebar';
import ChatWindow from '../components/ChatWindow';
import { useAuth } from '../context/AuthContext';
import { useSocket } from '../context/SocketContext';

const Chat = () => {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [conversations, setConversations] = useState([]);
  const [onlineUsers, setOnlineUsers] = useState({});
  const { user } = useAuth();
  const socket = useSocket();

  useEffect(() => {
    fetchUsers();
    fetchConversations();
  }, []);

  useEffect(() => {
    if (socket) {
      socket.on('user-status', ({ userId, status }) => {
        setOnlineUsers(prev => ({
          ...prev,
          [userId]: status === 'online'
        }));
      });

      return () => {
        socket.off('user-status');
      };
    }
  }, [socket]);

  const fetchUsers = async () => {
    try {
      const response = await axios.get('/api/users');
      setUsers(response.data);
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };

  const fetchConversations = async () => {
    try {
      const response = await axios.get('/api/messages/conversations/list');
      setConversations(response.data);
    } catch (error) {
      console.error('Error fetching conversations:', error);
    }
  };

  return (
    <div className="flex h-screen bg-background overflow-hidden">
      <Sidebar 
        users={users}
        selectedUser={selectedUser}
        setSelectedUser={setSelectedUser}
        onlineUsers={onlineUsers}
        conversations={conversations}
      />
      <ChatWindow 
        selectedUser={selectedUser}
        currentUser={user}
        onlineUsers={onlineUsers}
      />
    </div>
  );
};

export default Chat;

