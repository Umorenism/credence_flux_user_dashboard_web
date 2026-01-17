import React, { useState } from "react";
import { Outlet } from "react-router-dom";

import Header from "../Header";
import { useTheme } from "../ui/ThemeContext"; // adjust path if needed
import Sidebar from "../Sidebar";

export default function DashboardLayout() {
  const { theme } = useTheme(); // 'light' | 'dark'
  const isDark = theme === 'dark';

  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);
  const closeSidebar = () => setIsSidebarOpen(false);

  return (
    <div
      className={`
        flex min-h-screen
        ${isDark 
          ? 'bg-gray-950 text-white' 
          : 'bg-gray-50 text-gray-900'}
        transition-colors duration-300
      `}
    >
      {/* Sidebar */}
      <Sidebar
        isOpen={isSidebarOpen} 
        closeSidebar={closeSidebar} 
      />

      {/* Main content wrapper */}
      <div className="flex-1 flex flex-col min-h-screen">
        {/* Header */}
        <Header toggleSidebar={toggleSidebar} />

        {/* Main content area */}
        <main
          className={`
            flex-1 overflow-auto p-4 md:p-6
            ${isDark 
              ? 'bg-gradient-to-b from-gray-950 via-gray-900 to-gray-950/80' 
              : 'bg-gradient-to-b from-gray-50 via-white to-gray-100'}
            transition-colors duration-300
          `}
        >
          <div className="max-w-7xl mx-auto">
            <Outlet />
          </div>
        </main>
      </div>

      {/* Optional mobile overlay when sidebar is open */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-30 md:hidden"
          onClick={closeSidebar}
        />
      )}
    </div>
  );
}