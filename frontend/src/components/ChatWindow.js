import React, { useState, useEffect, useRef } from 'react';
import axios from '../api/axios';
import { useSocket } from '../context/SocketContext';
import { FaPaperPlane, FaCircle } from 'react-icons/fa';
import { BsEmojiSmile } from 'react-icons/bs';

const ChatWindow = ({ selectedUser, currentUser, onlineUsers }) => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [otherUserTyping, setOtherUserTyping] = useState(false);
  const messagesEndRef = useRef(null);
  const typingTimeoutRef = useRef(null);
  const socket = useSocket();

  useEffect(() => {
    if (selectedUser) {
      fetchMessages();
    }
  }, [selectedUser]);

  useEffect(() => {
    if (socket && selectedUser) {
      socket.on('receive-message', (message) => {
        if (message.sender._id === selectedUser._id || message.sender === selectedUser._id) {
          setMessages(prev => [...prev, message]);
          scrollToBottom();
        }
      });

      socket.on('message-sent', (message) => {
        // Message already added optimistically
      });

      socket.on('user-typing', ({ senderId, isTyping }) => {
        if (senderId === selectedUser._id) {
          setOtherUserTyping(isTyping);
        }
      });

      return () => {
        socket.off('receive-message');
        socket.off('message-sent');
        socket.off('user-typing');
      };
    }
  }, [socket, selectedUser]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const fetchMessages = async () => {
    try {
      const response = await axios.get(`/api/messages/${selectedUser._id}`);
      setMessages(response.data);
    } catch (error) {
      console.error('Error fetching messages:', error);
    }
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleTyping = () => {
    if (!isTyping && socket) {
      setIsTyping(true);
      socket.emit('typing', { receiverId: selectedUser._id, isTyping: true, senderId: currentUser.id });
    }

    if (typingTimeoutRef.current) {
      clearTimeout(typingTimeoutRef.current);
    }

    typingTimeoutRef.current = setTimeout(() => {
      setIsTyping(false);
      if (socket) {
        socket.emit('typing', { receiverId: selectedUser._id, isTyping: false, senderId: currentUser.id });
      }
    }, 1000);
  };

  const handleSendMessage = async (e) => {
    e.preventDefault();
    
    if (!newMessage.trim() || !selectedUser) return;

    const messageData = {
      sender: currentUser.id,
      receiver: selectedUser._id,
      content: newMessage,
      createdAt: new Date()
    };

    try {
      const response = await axios.post('/api/messages', {
        receiver: selectedUser._id,
        content: newMessage
      });

      // Add message optimistically
      setMessages(prev => [...prev, response.data]);
      
      // Emit via socket
      if (socket) {
        socket.emit('send-message', {
          receiverId: selectedUser._id,
          message: response.data
        });
      }

      setNewMessage('');
      setIsTyping(false);
      scrollToBottom();
    } catch (error) {
      console.error('Error sending message:', error);
    }
  };

  const formatTime = (date) => {
    const messageDate = new Date(date);
    return messageDate.toLocaleTimeString('en-US', { 
      hour: '2-digit', 
      minute: '2-digit' 
    });
  };

  if (!selectedUser) {
    return (
      <div className="flex-1 flex items-center justify-center bg-chatBg">
        <div className="text-center">
          <div className="bg-messageBg p-8 rounded-full mb-4 mx-auto w-32 h-32 flex items-center justify-center">
            <BsEmojiSmile size={64} className="text-gray-600" />
          </div>
          <h2 className="text-2xl font-semibold text-white mb-2">Welcome to Chat App</h2>
          <p className="text-gray-400">Select a conversation to start messaging</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 flex flex-col bg-chatBg">
      {/* Chat Header */}
      <div className="bg-messageBg p-4 border-b border-gray-700 flex items-center space-x-3">
        <div className="relative">
          <img 
            src={selectedUser.avatar} 
            alt={selectedUser.name} 
            className="w-12 h-12 rounded-full"
          />
          {onlineUsers[selectedUser._id] && (
            <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-messageBg"></span>
          )}
        </div>
        <div className="flex-1">
          <h3 className="text-white font-semibold">{selectedUser.name}</h3>
          <p className="text-sm text-gray-400">
            {otherUserTyping ? 'typing...' : onlineUsers[selectedUser._id] ? 'Online' : 'Offline'}
          </p>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.length === 0 ? (
          <div className="flex items-center justify-center h-full">
            <p className="text-gray-500">No messages yet. Start the conversation!</p>
          </div>
        ) : (
          messages.map((message, index) => {
            const isSender = message.sender._id === currentUser.id || message.sender === currentUser.id;
            return (
              <div 
                key={message._id || index} 
                className={`flex ${isSender ? 'justify-end' : 'justify-start'} animate-fadeIn message-enter`}
              >
                <div 
                  className={`max-w-xs md:max-w-md lg:max-w-lg px-4 py-2 rounded-lg ${
                    isSender 
                      ? 'bg-teal text-white rounded-br-none' 
                      : 'bg-messageBg text-white rounded-bl-none'
                  }`}
                >
                  <p className="break-words">{message.content}</p>
                  <p className={`text-xs mt-1 ${isSender ? 'text-gray-200' : 'text-gray-400'}`}>
                    {formatTime(message.createdAt)}
                  </p>
                </div>
              </div>
            );
          })
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Message Input */}
      <div className="bg-messageBg p-4 border-t border-gray-700">
        <form onSubmit={handleSendMessage} className="flex items-center space-x-2">
          <input
            type="text"
            value={newMessage}
            onChange={(e) => {
              setNewMessage(e.target.value);
              handleTyping();
            }}
            placeholder="Type a message..."
            className="flex-1 px-4 py-3 bg-inputBg text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-teal transition"
          />
          <button
            type="submit"
            disabled={!newMessage.trim()}
            className="p-3 bg-gradient-to-r from-teal to-tealDark text-white rounded-lg hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <FaPaperPlane size={20} />
          </button>
        </form>
      </div>
    </div>
  );
};

export default ChatWindow;

