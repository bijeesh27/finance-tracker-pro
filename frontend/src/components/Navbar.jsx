import React from "react";
import { useNavigate } from "react-router-dom";
import { LogOut, Wallet } from "lucide-react";

export const Navbar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/");
  };

  return (
    <nav className="bg-white border-b border-gray-200 px-4 lg:px-6 py-4 flex items-center justify-between z-50">
      <div className="flex items-center gap-3">
        <div className="bg-indigo-600 p-2 rounded-xl text-white shadow-lg shadow-indigo-200">
          <Wallet size={24} />
        </div>
        <h1 className="text-xl font-black text-gray-900 tracking-tight">
          RupeeRoute
        </h1>
      </div>

      <button
        onClick={handleLogout}
        className="flex items-center gap-2 px-4 py-2 bg-red-50 text-red-600 font-bold rounded-xl hover:bg-red-100 transition-colors"
      >
        <LogOut size={18} />
        <span className="text-sm">Logout</span>
      </button>
    </nav>
  );
};
