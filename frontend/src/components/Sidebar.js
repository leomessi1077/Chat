import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { FaSignOutAlt, FaSearch, FaComments } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

const Sidebar = ({ users, selectedUser, setSelectedUser, onlineUsers, conversations }) => {
  const { user, logout } = useAuth();
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const filteredUsers = users.filter(u => 
    u.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="w-full md:w-96 bg-chatBg border-r border-gray-700 flex flex-col">
      {/* Header */}
      <div className="bg-messageBg p-4 border-b border-gray-700">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-3">
            <img 
              src={user?.avatar} 
              alt={user?.name} 
              className="w-12 h-12 rounded-full ring-2 ring-teal"
            />
            <div>
              <h2 className="text-white font-semibold">{user?.name}</h2>
              <p className="text-xs text-gray-400">Online</p>
            </div>
          </div>
          <button
            onClick={handleLogout}
            className="p-2 text-gray-400 hover:text-red-500 hover:bg-inputBg rounded-lg transition"
            title="Logout"
          >
            <FaSignOutAlt size={20} />
          </button>
        </div>

        {/* Search */}
        <div className="relative">
          <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search contacts..."
            className="w-full pl-10 pr-4 py-2 bg-inputBg text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-teal transition text-sm"
          />
        </div>
      </div>

      {/* User List */}
      <div className="flex-1 overflow-y-auto">
        {filteredUsers.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full text-gray-400 p-8">
            <FaComments size={48} className="mb-4 opacity-50" />
            <p className="text-center">No users found</p>
          </div>
        ) : (
          <div className="divide-y divide-gray-700">
            {filteredUsers.map((contact) => (
              <div
                key={contact._id}
                onClick={() => setSelectedUser(contact)}
                className={`p-4 cursor-pointer transition-all hover:bg-messageBg ${
                  selectedUser?._id === contact._id ? 'bg-messageBg border-l-4 border-teal' : ''
                }`}
              >
                <div className="flex items-center space-x-3">
                  <div className="relative">
                    <img 
                      src={contact.avatar} 
                      alt={contact.name} 
                      className="w-12 h-12 rounded-full"
                    />
                    {onlineUsers[contact._id] && (
                      <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-chatBg"></span>
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="text-white font-medium truncate">{contact.name}</h3>
                    <p className="text-sm text-gray-400 truncate">
                      {onlineUsers[contact._id] ? 'Online' : contact.status}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Sidebar;

