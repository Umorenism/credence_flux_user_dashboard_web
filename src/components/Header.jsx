






// src/components/Header.jsx
import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FiMenu,
  FiUser,
  FiLogOut,
  FiSun,
  FiMoon,
  FiSearch,
} from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import { useTheme } from "./ui/ThemeContext";
import { userService } from "../api/userApi";

export default function Header({ toggleSidebar }) {
  const navigate = useNavigate();
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === "dark";

  // Load user from localStorage first (instant display)
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem("user");
    return saved
      ? JSON.parse(saved)
      : { fullName: "User", avatar: null, email: "", id: "" };
  });

  const [showNotifications, setShowNotifications] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [showSearchResults, setShowSearchResults] = useState(false);

  const notifRef = useRef(null);
  const userRef = useRef(null);
  const searchRef = useRef(null);

  // Fetch fresh profile data
  const loadProfile = async () => {
    try {
      const res = await userService.getProfile();
      if (res?.success && res.data) {
        const profile = {
          fullName: res.data.fullName || "User",
          avatar: res.data.avatar || null,
          email: res.data.email || "",
          id: res.data.id || res.data._id || "",
        };
        setUser(profile);
        localStorage.setItem("user", JSON.stringify(profile));
      }
    } catch (err) {
      console.error("Failed to load profile in header:", err);
    }
  };

  useEffect(() => {
    loadProfile();
    const interval = setInterval(loadProfile, 90000);
    return () => clearInterval(interval);
  }, []);

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (notifRef.current && !notifRef.current.contains(e.target)) {
        setShowNotifications(false);
      }
      if (userRef.current && !userRef.current.contains(e.target)) {
        setShowUserMenu(false);
      }
      if (searchRef.current && !searchRef.current.contains(e.target)) {
        setShowSearchResults(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/signup");
  };

  const dashboardPages = [
    { name: "Dashboard", path: "/home", keywords: ["home", "dashboard"] },
    { name: "Deposits", path: "/deposits", keywords: ["deposit", "fund"] },
    { name: "Withdraw", path: "/withdraw", keywords: ["withdraw", "cash out"] },
    { name: "Trade Now", path: "/trade", keywords: ["trade", "buy", "sell"] },
    { name: "Transactions", path: "/transactions", keywords: ["history", "tx"] },
    { name: "Referrals", path: "/refer", keywords: ["refer", "invite"] },
    { name: "Profile", path: "/profile", keywords: ["profile", "account"] },
  ];

  const filteredPages = dashboardPages.filter(
    (page) =>
      searchQuery.trim() &&
      (page.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        page.keywords.some((kw) => kw.toLowerCase().includes(searchQuery.toLowerCase())))
  );

  const handleSearchSelect = (path) => {
    navigate(path);
    setSearchQuery("");
    setShowSearchResults(false);
  };

  const firstName = user.fullName?.split(" ")[0] || "User";

  return (
    <header
      className={`sticky top-0 z-50 w-full backdrop-blur-xl border-b shadow-sm transition-colors
        ${isDark ? "bg-black/80 border-gray-800" : "bg-white/90 border-gray-200"}`}
    >
      <div className="flex items-center justify-between px-4 md:px-6 py-3 max-w-7xl mx-auto">
        {/* Left: Search */}
        <div className="flex-1 max-w-md relative" ref={searchRef}>
          <div
            className={`flex items-center px-4 py-2.5 rounded-full border transition-all
              ${isDark ? "bg-gray-900 border-gray-700 text-white" : "bg-gray-100 border-gray-300 text-gray-900"}
              focus-within:ring-2 focus-within:ring-orange-500/40`}
          >
            <FiSearch className={`mr-3 ${isDark ? "text-gray-400" : "text-gray-500"}`} size={18} />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setShowSearchResults(!!e.target.value.trim());
              }}
              placeholder="Search dashboard..."
              className="bg-transparent outline-none flex-1 text-sm md:text-base placeholder-gray-500"
            />
          </div>

          <AnimatePresence>
            {showSearchResults && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className={`absolute left-0 right-0 mt-2 rounded-xl shadow-2xl overflow-hidden z-50 border
                  ${isDark ? "bg-gray-900 border-gray-700" : "bg-white border-gray-200"}`}
              >
                {filteredPages.length > 0 ? (
                  <ul className="py-2 max-h-60 overflow-y-auto">
                    {filteredPages.map((page) => (
                      <li
                        key={page.path}
                        onClick={() => handleSearchSelect(page.path)}
                        className={`px-5 py-3 cursor-pointer flex items-center gap-3 hover:bg-orange-50/50 dark:hover:bg-gray-800/70 transition
                          ${isDark ? "text-gray-200" : "text-gray-800"}`}
                      >
                        <FiSearch size={16} className="text-orange-500" />
                        <span className="font-medium">{page.name}</span>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <div className={`px-5 py-8 text-center text-sm ${isDark ? "text-gray-400" : "text-gray-500"}`}>
                    No matching pages found
                  </div>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Right side actions */}
        <div className="flex items-center gap-3 md:gap-5">
          {/* Theme toggle */}
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            onClick={toggleTheme}
            className={`p-2.5 rounded-full transition-colors
              ${isDark ? "hover:bg-gray-800 text-yellow-300" : "hover:bg-gray-100 text-orange-600"}`}
          >
            {isDark ? <FiSun size={20} /> : <FiMoon size={20} />}
          </motion.button>

          {/* User menu */}
          <div className="relative" ref={userRef}>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setShowUserMenu(!showUserMenu)}
              className={`flex items-center gap-2.5 p-1.5 rounded-full transition
                ${isDark ? "hover:bg-gray-800" : "hover:bg-gray-100"}`}
            >
              {user.avatar ? (
                <img
                  src={user.avatar}
                  alt="User"
                  className="w-8 h-8 md:w-9 md:h-9 rounded-full object-cover border-2 border-orange-500/30"
                />
              ) : (
                <div className="w-8 h-8 md:w-9 md:h-9 rounded-full bg-gradient-to-br from-orange-500 to-amber-600 flex items-center justify-center text-white font-semibold text-base md:text-lg">
                  {firstName.charAt(0).toUpperCase()}
                </div>
              )}
              <span className={`hidden md:inline font-medium text-sm md:text-base
                ${isDark ? "text-orange-300" : "text-orange-700"}`}>
                {firstName}
              </span>
            </motion.button>

            <AnimatePresence>
              {showUserMenu && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95, y: -8 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95, y: -8 }}
                  className={`absolute right-0 mt-3 w-72 rounded-xl shadow-2xl overflow-hidden border z-50
                    ${isDark ? "bg-gray-950 border-gray-800" : "bg-white border-gray-200"}`}
                >
                  <div className={`px-5 py-5 border-b flex items-center gap-4
                    ${isDark ? "border-gray-800" : "border-gray-200"}`}
                  >
                    {user.avatar ? (
                      <img
                        src={user.avatar}
                        alt="Avatar"
                        className="w-12 h-12 rounded-full object-cover border-2 border-orange-500/40"
                      />
                    ) : (
                      <div className="w-12 h-12 rounded-full bg-gradient-to-br from-orange-500 to-amber-600 flex items-center justify-center text-white text-2xl font-bold">
                        {firstName.charAt(0).toUpperCase()}
                      </div>
                    )}
                    <div className="min-w-0">
                      <p className={`font-semibold truncate ${isDark ? "text-orange-300" : "text-orange-700"}`}>
                        {user.fullName}
                      </p>
                      <p className={`text-xs truncate ${isDark ? "text-gray-400" : "text-gray-500"}`}>
                        {user.email || "No email"}
                      </p>
                      <p className={`text-xs mt-0.5 ${isDark ? "text-gray-500" : "text-gray-600"}`}>
                        ID: {user.id.slice(-8)}
                      </p>
                    </div>
                  </div>

                  <ul className="py-2 text-sm">
                    <li
                      onClick={() => {
                        navigate("/profile");
                        setShowUserMenu(false);
                      }}
                      className={`flex items-center gap-3 px-5 py-3.5 cursor-pointer transition
                        ${isDark ? "hover:bg-gray-800 text-gray-200" : "hover:bg-gray-50 text-gray-800"}`}
                    >
                      <FiUser size={18} className="text-orange-500" />
                      Profile & Settings
                    </li>

                    <li
                      onClick={() => {
                        handleLogout();
                        setShowUserMenu(false);
                      }}
                      className={`flex items-center gap-3 px-5 py-3.5 cursor-pointer border-t mt-1 transition
                        ${isDark ? "border-gray-800 hover:bg-red-950/30 text-red-400" : "border-gray-200 hover:bg-red-50 text-red-600"}`}
                    >
                      <FiLogOut size={18} />
                      Sign Out
                    </li>
                  </ul>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Mobile menu toggle - visible on mobile / tablets, hidden on desktop */}
          <motion.button
            className={`
              lg:hidden
              flex items-center justify-center
              w-10 h-10               /* fixed touch-friendly size */
              rounded-lg border
              transition-all duration-200
              focus:outline-none focus:ring-2 focus:ring-orange-500/40 focus:ring-offset-2
              active:scale-95
              ${isDark 
                ? "border-gray-700 hover:bg-gray-800 text-orange-400" 
                : "border-gray-300 hover:bg-gray-200 text-orange-600"}
            `}
            onClick={toggleSidebar}
            whileHover={{ scale: 1.08 }}
            whileTap={{ scale: 0.94 }}
            aria-label="Toggle sidebar menu"
          >
            <FiMenu size={24} />
          </motion.button>
        </div>
      </div>
    </header>
  );
}