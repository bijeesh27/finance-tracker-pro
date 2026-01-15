import React from 'react';
import { Wallet, Bell, Settings, LogOut } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export const Header = () => {
  const navigate = useNavigate();
  
  // Safely parse user data
  const userString = localStorage.getItem("user");
  const userData = userString ? JSON.parse(userString) : null;

  // FALLBACK LOGIC: If name is missing, check 'email' or use 'Guest'
  const userName = userData?.name || userData?.email || "Guest";
  const userInitial = userName.charAt(0).toUpperCase();

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/");
  };

  return (
    <nav className="flex items-center justify-between px-6 py-4 bg-white border-b border-gray-200 shadow-sm sticky top-0 z-50 backdrop-blur-sm bg-white/95">
      <div className="flex items-center gap-3">
        <div className="p-2.5 bg-gradient-to-br from-blue-600 to-blue-700 rounded-xl shadow-md">
          <Wallet className="text-white" size={24} />
        </div>
        <div>
          <h1 className="text-2xl font-black text-gray-900 tracking-tight bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
            FinanceFlow
          </h1>
        </div>
      </div>
      
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-3">
          <span className="text-sm font-semibold text-gray-700 hidden sm:block">
            Hi, {userName}
          </span>
          <div className="w-10 h-10 rounded-full bg-indigo-600 border-2 border-white shadow-md flex items-center justify-center">
            <span className="text-white font-bold text-sm">{userInitial}</span>
          </div>
          
          <button 
            onClick={handleLogout}
            className="flex items-center gap-2 px-3 py-2 text-sm font-medium text-red-600 hover:bg-red-50 rounded-lg transition-colors"
          >
            <LogOut size={18} />
            <span className="hidden md:block">Logout</span>
          </button>
        </div>
      </div>
    </nav>
  );
};