// // // src/components/Header.jsx
// // import React, { useState, useRef, useEffect } from "react";
// // import { motion, AnimatePresence } from "framer-motion";
// // import {
// //   FiMenu,
// //   FiBell,
// //   FiUser,
// //   FiLogOut,
// //   FiSun,
// //   FiMoon,
// //   FiSearch,
// // } from "react-icons/fi";
// // import { useNavigate } from "react-router-dom";
// // import { useUser } from "./ui/UserContext";
// // import { useTheme } from "./ui/ThemeContext";

// // export default function Header({ toggleSidebar }) {
// //   const navigate = useNavigate();
// //   const { user } = useUser();
// //   const { theme, toggleTheme } = useTheme();
// //   const isDark = theme === "dark";

// //   const [showNotifications, setShowNotifications] = useState(false);
// //   const [showUserMenu, setShowUserMenu] = useState(false);
// //   const [searchQuery, setSearchQuery] = useState("");
// //   const [showSearchResults, setShowSearchResults] = useState(false);

// //   const notifRef = useRef(null);
// //   const userRef = useRef(null);
// //   const searchRef = useRef(null);

// //   // Dashboard pages for search (you can expand this list)
// //   const dashboardPages = [
// //     { name: "Dashboard", path: "/home", keywords: ["home", "dashboard"] },
// //     { name: "Deposits", path: "/wallet", keywords: ["deposit", "fund", "add money"] },
// //     { name: "Withdraw", path: "/withdraw", keywords: ["withdraw", "cash out"] },
// //     { name: "Investments", path: "/investments", keywords: ["invest", "staking"] },
// //     { name: "Trading Records", path: "/trading-records", keywords: ["trade history", "records"] },
// //     { name: "Transactions", path: "/transactions", keywords: ["history", "tx", "transactions"] },
// //     { name: "Trade Now", path: "/trade", keywords: ["trade", "buy", "sell"] },
// //     { name: "Join Trade", path: "/join-trade", keywords: ["join", "copy trade"] },
// //     { name: "Recent Trades", path: "/recent-trades", keywords: ["recent", "live trades"] },
// //     { name: "Referrals", path: "/refer", keywords: ["refer", "invite", "bonus"] },
// //     { name: "Support", path: "/support", keywords: ["help", "support", "contact"] },
// //     { name: "Profile", path: "/profile", keywords: ["profile", "account", "settings"] },
// //   ];

// //   // Filter pages based on search query
// //   const filteredPages = dashboardPages.filter(
// //     (page) =>
// //       searchQuery.trim() !== "" &&
// //       (page.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
// //         page.keywords.some((kw) =>
// //           kw.toLowerCase().includes(searchQuery.toLowerCase())
// //         ))
// //   );

// //   // Close dropdowns & search on outside click
// //   useEffect(() => {
// //     const handleClickOutside = (e) => {
// //       if (notifRef.current && !notifRef.current.contains(e.target)) {
// //         setShowNotifications(false);
// //       }
// //       if (userRef.current && !userRef.current.contains(e.target)) {
// //         setShowUserMenu(false);
// //       }
// //       if (searchRef.current && !searchRef.current.contains(e.target)) {
// //         setShowSearchResults(false);
// //       }
// //     };
// //     document.addEventListener("mousedown", handleClickOutside);
// //     return () => document.removeEventListener("mousedown", handleClickOutside);
// //   }, []);

// //   const handleLogout = async () => {
// //     try {
// //       const token = localStorage.getItem("token");
// //       await fetch("/api/auth/logout", {
// //         method: "POST",
// //         headers: {
// //           Authorization: `Bearer ${token}`,
// //           "Content-Type": "application/json",
// //         },
// //       });
// //       localStorage.removeItem("token");
// //       localStorage.removeItem("user");
// //       navigate("/signup");
// //     } catch (error) {
// //       console.error("Logout failed:", error);
// //       navigate("/signup");
// //     }
// //   };

// //   const handleSearchSelect = (path) => {
// //     navigate(path);
// //     setSearchQuery("");
// //     setShowSearchResults(false);
// //   };

// //   return (
// //     <header
// //       className={`
// //         sticky top-0 z-50 w-full
// //         ${isDark ? "bg-black/90 border-orange-900/60" : "bg-white/90 border-gray-200"}
// //         backdrop-blur-xl border-b shadow-sm transition-colors
// //       `}
// //     >
// //       <div className="flex items-center justify-between px-4 md:px-6 py-3 max-w-7xl mx-auto">
// //         {/* Search Bar (replaces logo) */}
// //         <div className="flex-1 max-w-md relative" ref={searchRef}>
// //           <div
// //             className={`
// //               flex items-center px-4 py-2.5 rounded-full
// //               ${isDark
// //                 ? "bg-gray-900 border border-gray-700 text-white"
// //                 : "bg-gray-100 border border-gray-300 text-gray-900"}
// //               focus-within:ring-2 focus-within:ring-orange-500/40 transition
// //             `}
// //           >
// //             <FiSearch
// //               className={`mr-3 ${isDark ? "text-gray-400" : "text-gray-500"}`}
// //               size={18}
// //             />
// //             <input
// //               type="text"
// //               value={searchQuery}
// //               onChange={(e) => {
// //                 setSearchQuery(e.target.value);
// //                 setShowSearchResults(e.target.value.trim() !== "");
// //               }}
// //               onFocus={() => setShowSearchResults(searchQuery.trim() !== "")}
// //               placeholder="Search dashboard..."
// //               className={`
// //                 bg-transparent outline-none flex-1 text-sm md:text-base
// //                 ${isDark ? "placeholder-gray-500" : "placeholder-gray-500"}
// //               `}
// //             />
// //           </div>

// //           {/* Search Results Dropdown */}
// //           <AnimatePresence>
// //             {showSearchResults && (
// //               <motion.div
// //                 initial={{ opacity: 0, y: -8 }}
// //                 animate={{ opacity: 1, y: 0 }}
// //                 exit={{ opacity: 0, y: -8 }}
// //                 className={`
// //                   absolute left-0 right-0 mt-2 rounded-xl shadow-xl overflow-hidden z-50
// //                   ${isDark
// //                     ? "bg-gray-900 border border-gray-700"
// //                     : "bg-white border border-gray-200"}
// //                 `}
// //               >
// //                 {filteredPages.length > 0 ? (
// //                   <ul className="py-2 max-h-64 overflow-y-auto">
// //                     {filteredPages.map((page) => (
// //                       <li
// //                         key={page.path}
// //                         onClick={() => handleSearchSelect(page.path)}
// //                         className={`
// //                           px-4 py-3 cursor-pointer flex items-center gap-3
// //                           ${isDark
// //                             ? "hover:bg-gray-800 text-gray-200"
// //                             : "hover:bg-gray-50 text-gray-800"}
// //                           transition
// //                         `}
// //                       >
// //                         <FiSearch size={16} className="text-orange-500" />
// //                         <span className="font-medium">{page.name}</span>
// //                       </li>
// //                     ))}
// //                   </ul>
// //                 ) : (
// //                   <div
// //                     className={`
// //                       px-4 py-6 text-center text-sm
// //                       ${isDark ? "text-gray-400" : "text-gray-500"}
// //                     `}
// //                   >
// //                     No results found
// //                   </div>
// //                 )}
// //               </motion.div>
// //             )}
// //           </AnimatePresence>
// //         </div>

// //         {/* Right-side actions */}
// //         <div className="flex items-center gap-3 md:gap-4">
// //           {/* Notifications */}
// //           <div className="relative" ref={notifRef}>
// //             <motion.button
// //               onClick={() => {
// //                 setShowNotifications(!showNotifications);
// //                 setShowUserMenu(false);
// //               }}
// //               className={`
// //                 p-2.5 rounded-full transition
// //                 ${isDark
// //                   ? "bg-gray-900 hover:bg-gray-800 text-orange-400"
// //                   : "bg-gray-100 hover:bg-gray-200 text-orange-600"}
// //               `}
// //               whileHover={{ scale: 1.1 }}
// //               whileTap={{ scale: 0.95 }}
// //             >
// //               <FiBell size={20} />
// //             </motion.button>

// //             <AnimatePresence>
// //               {showNotifications && (
// //                 <motion.div
// //                   initial={{ opacity: 0, y: -10 }}
// //                   animate={{ opacity: 1, y: 0 }}
// //                   exit={{ opacity: 0, y: -10 }}
// //                   className={`
// //                     absolute right-0 mt-3 w-80 rounded-xl shadow-2xl overflow-hidden
// //                     ${isDark
// //                       ? "bg-gray-950 border border-gray-800"
// //                       : "bg-white border border-gray-200"}
// //                   `}
// //                 >
// //                   <div
// //                     className={`
// //                       px-5 py-3 font-semibold border-b
// //                       ${isDark
// //                         ? "text-orange-400 border-gray-800"
// //                         : "text-orange-700 border-gray-200"}
// //                     `}
// //                   >
// //                     Notifications
// //                   </div>
// //                   {/* Add real notifications here later */}
// //                   <div className="p-6 text-center text-sm text-gray-500">
// //                     No new notifications
// //                   </div>
// //                 </motion.div>
// //               )}
// //             </AnimatePresence>
// //           </div>

// //           {/* Theme Toggle */}
// //           <motion.button
// //             onClick={toggleTheme}
// //             className={`
// //               p-2.5 rounded-full transition
// //               ${isDark
// //                 ? "bg-gray-900 hover:bg-gray-800 text-yellow-400"
// //                 : "bg-gray-100 hover:bg-gray-200 text-orange-600"}
// //             `}
// //             whileHover={{ scale: 1.1 }}
// //             whileTap={{ scale: 0.95 }}
// //             aria-label="Toggle theme"
// //           >
// //             {theme === "dark" ? <FiSun size={20} /> : <FiMoon size={20} />}
// //           </motion.button>

// //           {/* User Menu */}
// //           <div className="relative hidden sm:block" ref={userRef}>
// //             <motion.button
// //               onClick={() => {
// //                 setShowUserMenu(!showUserMenu);
// //                 setShowNotifications(false);
// //               }}
// //               className={`
// //                 flex items-center gap-2 p-1.5 rounded-full transition
// //                 ${isDark
// //                   ? "bg-gray-900 hover:bg-gray-800"
// //                   : "bg-gray-100 hover:bg-gray-200"}
// //               `}
// //               whileHover={{ scale: 1.05 }}
// //               whileTap={{ scale: 0.95 }}
// //             >
// //               {user?.avatar ? (
// //                 <img
// //                   src={user.avatar}
// //                   alt="Avatar"
// //                   className="w-8 h-8 rounded-full object-cover border-2 border-orange-500/40"
// //                 />
// //               ) : (
// //                 <div
// //                   className={`
// //                     w-8 h-8 rounded-full flex items-center justify-center text-white
// //                     ${isDark ? "bg-orange-700" : "bg-orange-600"}
// //                   `}
// //                 >
// //                   <FiUser size={18} />
// //                 </div>
// //               )}
// //               <span
// //                 className={`
// //                   hidden md:inline font-medium
// //                   ${isDark ? "text-orange-300" : "text-orange-700"}
// //                 `}
// //               >
// //                 {user?.fullName?.split(" ")[0] || "User"}
// //               </span>
              
// //             </motion.button>

// //             <AnimatePresence>
// //               {showUserMenu && (
// //                 <motion.div
// //                   initial={{ opacity: 0, y: -10 }}
// //                   animate={{ opacity: 1, y: 0 }}
// //                   exit={{ opacity: 0, y: -10 }}
// //                   className={`
// //                     absolute right-0 mt-3 w-64 rounded-xl shadow-2xl overflow-hidden
// //                     ${isDark
// //                       ? "bg-gray-950 border border-gray-800"
// //                       : "bg-white border border-gray-200"}
// //                   `}
// //                 >
// //                   <div
// //                     className={`
// //                       px-5 py-4 border-b flex items-center gap-3
// //                       ${isDark ? "border-gray-800" : "border-gray-200"}
// //                     `}
// //                   >
// //                     {user?.avatar ? (
// //                       <img
// //                         src={user.avatar}
// //                         alt="Avatar"
// //                         className="w-10 h-10 rounded-full object-cover border-2 border-orange-500/30"
// //                       />
// //                     ) : (
// //                       <div
// //                         className={`
// //                           w-10 h-10 rounded-full flex items-center justify-center text-white text-xl font-bold
// //                           ${isDark ? "bg-orange-700" : "bg-orange-600"}
// //                         `}
// //                       >
// //                         {user?.fullName?.[0]?.toUpperCase() || "?"}
// //                       </div>
// //                     )}
// //                     <div>
// //                       <p
// //                         className={`font-semibold ${
// //                           isDark ? "text-orange-300" : "text-orange-700"
// //                         }`}
// //                       >
// //                         {user?.fullName || "User"}
// //                       </p>
// //                       <p
// //                         className={`text-xs ${
// //                           isDark ? "text-gray-400" : "text-gray-500"
// //                         }`}
// //                       >
// //                         {user?.email || ""}
// //                       </p>
// //                       <p
// //                         className={`text-xs ${
// //                           isDark ? "text-gray-400" : "text-gray-500"
// //                         }`}
// //                       >
// //                         Id:{user?.id || "hhsggdgettette"}
// //                       </p>
// //                     </div>
// //                   </div>

// //                   <ul className="py-2 text-sm">
// //                     <li
// //                       onClick={() => {
// //                         navigate("/profile");
// //                         setShowUserMenu(false);
// //                       }}
// //                       className={`
// //                         flex items-center gap-3 px-5 py-3 cursor-pointer
// //                         ${isDark
// //                           ? "hover:bg-gray-800 text-orange-300"
// //                           : "hover:bg-gray-50 text-gray-800"}
// //                       `}
// //                     >
// //                       <FiUser size={18} />
// //                       Profile & Settings
// //                     </li>

// //                     {/* <li
// //                       onClick={() => {
// //                         toggleTheme();
// //                         setShowUserMenu(false);
// //                       }}
// //                       className={`
// //                         flex items-center gap-3 px-5 py-3 cursor-pointer
// //                         ${isDark
// //                           ? "hover:bg-gray-800 text-orange-300"
// //                           : "hover:bg-gray-50 text-gray-800"}
// //                       `}
// //                     >
// //                       {theme === "dark" ? <FiSun size={18} /> : <FiMoon size={18} />}
// //                       {theme === "dark" ? "Light Mode" : "Dark Mode"}
// //                     </li> */}

// //                     <li
// //                       onClick={handleLogout}
// //                       className={`
// //                         flex items-center gap-3 px-5 py-3 cursor-pointer border-t mt-1
// //                         ${isDark
// //                           ? "border-gray-800 hover:bg-red-950/30 text-red-400"
// //                           : "border-gray-200 hover:bg-red-50 text-red-600"}
// //                       `}
// //                     >
// //                       <FiLogOut size={18} />
// //                       Logout
// //                     </li>
// //                   </ul>
// //                 </motion.div>
// //               )}
// //             </AnimatePresence>
// //           </div>

// //           {/* Mobile Sidebar Toggle */}
// //           <motion.button
// //             className={`
// //               md:hidden p-2.5 rounded-lg transition
// //               ${isDark
// //                 ? "border border-gray-700 hover:bg-gray-800 text-orange-400"
// //                 : "border border-gray-300 hover:bg-gray-200 text-orange-600"}
// //             `}
// //             onClick={toggleSidebar}
// //             whileHover={{ scale: 1.1 }}
// //             whileTap={{ scale: 0.95 }}
// //           >
// //             <FiMenu size={22} />
// //           </motion.button>
// //         </div>
// //       </div>
// //     </header>
// //   );
// // }




// import React, { useState, useRef, useEffect } from "react";
// import { motion, AnimatePresence } from "framer-motion";
// import {
//   FiMenu,
//   FiBell,
//   FiUser,
//   FiLogOut,
//   FiSun,
//   FiMoon,
//   FiSearch,
// } from "react-icons/fi";
// import { useNavigate } from "react-router-dom";
// import { useTheme } from "./ui/ThemeContext";
// import { userService } from "../api/userApi"; // adjust path

// export default function Header({ toggleSidebar }) {
//   const navigate = useNavigate();
//   const { theme, toggleTheme } = useTheme();
//   const isDark = theme === "dark";

//   const [user, setUser] = useState({
//     fullName: "User",
//     avatar: null,
//     email: "",
//     id: "",
//   });
//   const [showNotifications, setShowNotifications] = useState(false);
//   const [showUserMenu, setShowUserMenu] = useState(false);
//   const [searchQuery, setSearchQuery] = useState("");
//   const [showSearchResults, setShowSearchResults] = useState(false);

//   const notifRef = useRef(null);
//   const userRef = useRef(null);
//   const searchRef = useRef(null);

//   // Fetch profile
//   const loadProfile = async () => {
//     try {
//       const res = await userService.getProfile();
//       if (res) {
//         setUser({
//           fullName: res.fullName || "User",
//           avatar: res.avatar || null,
//           email: res.email || "",
//           id: res.id || "",
//         });
//       }
//     } catch (err) {
//       console.error("Failed to load profile:", err);
//     }
//   };

//   useEffect(() => {
//     loadProfile();

//     // Refresh periodically in case profile updates elsewhere
//     const interval = setInterval(loadProfile, 60000); // every 60s
//     return () => clearInterval(interval);
//   }, []);

//   // Close dropdowns & search on outside click
//   useEffect(() => {
//     const handleClickOutside = (e) => {
//       if (notifRef.current && !notifRef.current.contains(e.target)) {
//         setShowNotifications(false);
//       }
//       if (userRef.current && !userRef.current.contains(e.target)) {
//         setShowUserMenu(false);
//       }
//       if (searchRef.current && !searchRef.current.contains(e.target)) {
//         setShowSearchResults(false);
//       }
//     };
//     document.addEventListener("mousedown", handleClickOutside);
//     return () => document.removeEventListener("mousedown", handleClickOutside);
//   }, []);

//   const handleLogout = async () => {
//     try {
//       const token = localStorage.getItem("token");
//       if (token) {
//         await fetch("/api/auth/logout", {
//           method: "POST",
//           headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
//         });
//       }
//     } catch (err) {
//       console.error("Logout failed:", err);
//     } finally {
//       localStorage.removeItem("token");
//       localStorage.removeItem("user");
//       navigate("/signup");
//     }
//   };

//   // Dashboard pages for search
//   const dashboardPages = [
//     { name: "Dashboard", path: "/", keywords: ["home", "dashboard"] },
//     { name: "Deposits", path: "/deposits", keywords: ["deposit", "fund", "add money"] },
//     { name: "Withdraw", path: "/withdraw", keywords: ["withdraw", "cash out"] },
//     { name: "Trading Records", path: "/trading-records", keywords: ["trade history", "records"] },
//     { name: "Transactions", path: "/transactions", keywords: ["history", "tx", "transactions"] },
//     { name: "Trade Now", path: "/trade", keywords: ["trade", "buy", "sell"] },
//     { name: "Join Trade", path: "/join-trade", keywords: ["join", "copy trade"] },
//     { name: "Recent Trades", path: "/recent-trades", keywords: ["recent", "live trades"] },
//     { name: "Referrals", path: "/refer", keywords: ["refer", "invite", "bonus"] },
//     { name: "Support", path: "/support", keywords: ["help", "support", "contact"] },
//     { name: "Profile", path: "/profile", keywords: ["profile", "account", "settings"] },
//   ];

//   const filteredPages = dashboardPages.filter(
//     (page) =>
//       searchQuery.trim() !== "" &&
//       (page.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
//         page.keywords.some((kw) =>
//           kw.toLowerCase().includes(searchQuery.toLowerCase())
//         ))
//   );

//   const handleSearchSelect = (path) => {
//     navigate(path);
//     setSearchQuery("");
//     setShowSearchResults(false);
//   };

//   return (
//     <header
//       className={`sticky top-0 z-50 w-full backdrop-blur-xl border-b shadow-sm transition-colors
//         ${isDark ? "bg-black/90 border-orange-900/60" : "bg-white/90 border-gray-200"}`}
//     >
//       <div className="flex items-center justify-between px-4 md:px-6 py-3 max-w-7xl mx-auto">
//         {/* Search Bar */}
//         <div className="flex-1 max-w-md relative" ref={searchRef}>
//           <div
//             className={`flex items-center px-4 py-2.5 rounded-full
//               ${isDark ? "bg-gray-900 border border-gray-700 text-white" : "bg-gray-100 border border-gray-300 text-gray-900"}
//               focus-within:ring-2 focus-within:ring-orange-500/40 transition`}
//           >
//             <FiSearch className={`mr-3 ${isDark ? "text-gray-400" : "text-gray-500"}`} size={18} />
//             <input
//               type="text"
//               value={searchQuery}
//               onChange={(e) => {
//                 setSearchQuery(e.target.value);
//                 setShowSearchResults(e.target.value.trim() !== "");
//               }}
//               onFocus={() => setShowSearchResults(searchQuery.trim() !== "")}
//               placeholder="Search dashboard..."
//               className={`bg-transparent outline-none flex-1 text-sm md:text-base ${isDark ? "placeholder-gray-500" : "placeholder-gray-500"}`}
//             />
//           </div>

//           <AnimatePresence>
//             {showSearchResults && (
//               <motion.div
//                 initial={{ opacity: 0, y: -8 }}
//                 animate={{ opacity: 1, y: 0 }}
//                 exit={{ opacity: 0, y: -8 }}
//                 className={`absolute left-0 right-0 mt-2 rounded-xl shadow-xl overflow-hidden z-50
//                   ${isDark ? "bg-gray-900 border border-gray-700" : "bg-white border border-gray-200"}`}
//               >
//                 {filteredPages.length > 0 ? (
//                   <ul className="py-2 max-h-64 overflow-y-auto">
//                     {filteredPages.map((page) => (
//                       <li
//                         key={page.path}
//                         onClick={() => handleSearchSelect(page.path)}
//                         className={`px-4 py-3 cursor-pointer flex items-center gap-3
//                           ${isDark ? "hover:bg-gray-800 text-gray-200" : "hover:bg-gray-50 text-gray-800"} transition`}
//                       >
//                         <FiSearch size={16} className="text-orange-500" />
//                         <span className="font-medium">{page.name}</span>
//                       </li>
//                     ))}
//                   </ul>
//                 ) : (
//                   <div className={`px-4 py-6 text-center text-sm ${isDark ? "text-gray-400" : "text-gray-500"}`}>
//                     No results found
//                   </div>
//                 )}
//               </motion.div>
//             )}
//           </AnimatePresence>
//         </div>

//         {/* Right actions */}
//         <div className="flex items-center gap-3 md:gap-4">
//           {/* Theme Toggle */}
//           <motion.button
//             onClick={toggleTheme}
//             className={`p-2.5 rounded-full transition ${isDark ? "bg-gray-900 hover:bg-gray-800 text-yellow-400" : "bg-gray-100 hover:bg-gray-200 text-orange-600"}`}
//             whileHover={{ scale: 1.1 }}
//             whileTap={{ scale: 0.95 }}
//           >
//             {isDark ? <FiSun size={20} /> : <FiMoon size={20} />}
//           </motion.button>

//           {/* User Menu */}
//           <div className="relative hidden sm:block" ref={userRef}>
//             <motion.button
//               onClick={() => setShowUserMenu(!showUserMenu)}
//               className={`flex items-center gap-2 p-1.5 rounded-full transition ${isDark ? "bg-gray-900 hover:bg-gray-800" : "bg-gray-100 hover:bg-gray-200"}`}
//               whileHover={{ scale: 1.05 }}
//               whileTap={{ scale: 0.95 }}
//             >
//               {user?.avatar ? (
//                 <img src={user.avatar} alt="Avatar" className="w-8 h-8 rounded-full object-cover border-2 border-orange-500/40" />
//               ) : (
//                 <div className={`w-8 h-8 rounded-full flex items-center justify-center text-white ${isDark ? "bg-orange-700" : "bg-orange-600"}`}>
//                   <FiUser size={18} />
//                 </div>
//               )}
//               <span className={`hidden md:inline font-medium ${isDark ? "text-orange-300" : "text-orange-700"}`}>
//                 {user?.fullName?.split(" ")[0] || "User"}
//               </span>
//             </motion.button>

//             <AnimatePresence>
//               {showUserMenu && (
//                 <motion.div
//                   initial={{ opacity: 0, y: -10 }}
//                   animate={{ opacity: 1, y: 0 }}
//                   exit={{ opacity: 0, y: -10 }}
//                   className={`absolute right-0 mt-3 w-64 rounded-xl shadow-2xl overflow-hidden ${isDark ? "bg-gray-950 border border-gray-800" : "bg-white border border-gray-200"}`}
//                 >
//                   <div className={`px-5 py-4 border-b flex items-center gap-3 ${isDark ? "border-gray-800" : "border-gray-200"}`}>
//                     {user?.avatar ? (
//                       <img src={user.avatar} alt="Avatar" className="w-10 h-10 rounded-full object-cover border-2 border-orange-500/30" />
//                     ) : (
//                       <div className={`w-10 h-10 rounded-full flex items-center justify-center text-white text-xl font-bold ${isDark ? "bg-orange-700" : "bg-orange-600"}`}>
//                         {user?.fullName?.[0]?.toUpperCase() || "?"}
//                       </div>
//                     )}
//                     <div>
//                       <p className={`font-semibold ${isDark ? "text-orange-300" : "text-orange-700"}`}>{user?.fullName || "User"}</p>
//                       <p className={`text-xs ${isDark ? "text-gray-400" : "text-gray-500"}`}>{user?.email || ""}</p>
//                       <p className={`text-xs ${isDark ? "text-gray-400" : "text-gray-500"}`}>Id: {user?.id || ""}</p>
//                     </div>
//                   </div>

//                   <ul className="py-2 text-sm">
//                     <li
//                       onClick={() => {
//                         navigate("/profile");
//                         setShowUserMenu(false);
//                       }}
//                       className={`flex items-center gap-3 px-5 py-3 cursor-pointer ${isDark ? "hover:bg-gray-800 text-orange-300" : "hover:bg-gray-50 text-gray-800"}`}
//                     >
//                       <FiUser size={18} />
//                       Profile & Settings
//                     </li>

//                     <li
//                       onClick={handleLogout}
//                       className={`flex items-center gap-3 px-5 py-3 cursor-pointer border-t mt-1 ${isDark ? "border-gray-800 hover:bg-red-950/30 text-red-400" : "border-gray-200 hover:bg-red-50 text-red-600"}`}
//                     >
//                       <FiLogOut size={18} />
//                       Logout
//                     </li>
//                   </ul>
//                 </motion.div>
//               )}
//             </AnimatePresence>
//           </div>

//           {/* Mobile Sidebar Toggle */}
//           <motion.button
//             className={`md:hidden p-2.5 rounded-lg transition ${isDark ? "border border-gray-700 hover:bg-gray-800 text-orange-400" : "border border-gray-300 hover:bg-gray-200 text-orange-600"}`}
//             onClick={toggleSidebar}
//             whileHover={{ scale: 1.1 }}
//             whileTap={{ scale: 0.95 }}
//           >
//             <FiMenu size={22} />
//           </motion.button>
//         </div>
//       </div>
//     </header>
//   );
// }






import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FiMenu,
  FiBell,
  FiUser,
  FiLogOut,
  FiSun,
  FiMoon,
  FiSearch,
} from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import { useTheme } from "./ui/ThemeContext";
import { userService } from "../api/userApi"; // adjust path

export default function Header({ toggleSidebar }) {
  const navigate = useNavigate();
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === "dark";

  // ✅ Initialize from localStorage so info shows immediately
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem("user");
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch {
        return { fullName: "User", avatar: null, email: "", id: "" };
      }
    }
    return { fullName: "User", avatar: null, email: "", id: "" };
  });

  const [showNotifications, setShowNotifications] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [showSearchResults, setShowSearchResults] = useState(false);

  const notifRef = useRef(null);
  const userRef = useRef(null);
  const searchRef = useRef(null);

  // Fetch profile and sync localStorage
  const loadProfile = async () => {
    try {
      const res = await userService.getProfile();
      if (res) {
        const profile = {
          fullName: res.fullName || "User",
          avatar: res.avatar || null,
          email: res.email || "",
          id: res.id || "",
        };
        setUser(profile);
        localStorage.setItem("user", JSON.stringify(profile));
      }
    } catch (err) {
      console.error("Failed to load profile:", err);
    }
  };

  useEffect(() => {
    loadProfile();

    // Refresh periodically
    const interval = setInterval(loadProfile, 60000);
    return () => clearInterval(interval);
  }, []);

  // Close dropdowns on outside click
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (notifRef.current && !notifRef.current.contains(e.target)) setShowNotifications(false);
      if (userRef.current && !userRef.current.contains(e.target)) setShowUserMenu(false);
      if (searchRef.current && !searchRef.current.contains(e.target)) setShowSearchResults(false);
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = async () => {
    try {
      const token = localStorage.getItem("token");
      if (token) {
        await fetch("/api/auth/logout", {
          method: "POST",
          headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
        });
      }
    } catch (err) {
      console.error("Logout failed:", err);
    } finally {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      navigate("/signup");
    }
  };

  // Dashboard search pages
  const dashboardPages = [
    { name: "Dashboard", path: "/", keywords: ["home", "dashboard"] },
    { name: "Deposits", path: "/deposits", keywords: ["deposit", "fund", "add money"] },
    { name: "Withdraw", path: "/withdraw", keywords: ["withdraw", "cash out"] },
    { name: "Trading Records", path: "/trading-records", keywords: ["trade history", "records"] },
    { name: "Transactions", path: "/transactions", keywords: ["history", "tx", "transactions"] },
    { name: "Trade Now", path: "/trade", keywords: ["trade", "buy", "sell"] },
    { name: "Join Trade", path: "/join-trade", keywords: ["join", "copy trade"] },
    { name: "Recent Trades", path: "/recent-trades", keywords: ["recent", "live trades"] },
    { name: "Referrals", path: "/refer", keywords: ["refer", "invite", "bonus"] },
    { name: "Support", path: "/support", keywords: ["help", "support", "contact"] },
    { name: "Profile", path: "/profile", keywords: ["profile", "account", "settings"] },
  ];

  const filteredPages = dashboardPages.filter(
    (page) =>
      searchQuery.trim() !== "" &&
      (page.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        page.keywords.some((kw) => kw.toLowerCase().includes(searchQuery.toLowerCase())))
  );

  const handleSearchSelect = (path) => {
    navigate(path);
    setSearchQuery("");
    setShowSearchResults(false);
  };

  return (
    <header
      className={`sticky top-0 z-50 w-full backdrop-blur-xl border-b shadow-sm transition-colors
        ${isDark ? "bg-black/90 border-orange-900/60" : "bg-white/90 border-gray-200"}`}
    >
      <div className="flex items-center justify-between px-4 md:px-6 py-3 max-w-7xl mx-auto">
        {/* Search */}
        <div className="flex-1 max-w-md relative" ref={searchRef}>
          <div
            className={`flex items-center px-4 py-2.5 rounded-full
              ${isDark ? "bg-gray-900 border border-gray-700 text-white" : "bg-gray-100 border border-gray-300 text-gray-900"}
              focus-within:ring-2 focus-within:ring-orange-500/40 transition`}
          >
            <FiSearch className={`mr-3 ${isDark ? "text-gray-400" : "text-gray-500"}`} size={18} />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setShowSearchResults(e.target.value.trim() !== "");
              }}
              onFocus={() => setShowSearchResults(searchQuery.trim() !== "")}
              placeholder="Search dashboard..."
              className={`bg-transparent outline-none flex-1 text-sm md:text-base ${isDark ? "placeholder-gray-500" : "placeholder-gray-500"}`}
            />
          </div>

          <AnimatePresence>
            {showSearchResults && (
              <motion.div
                initial={{ opacity: 0, y: -8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                className={`absolute left-0 right-0 mt-2 rounded-xl shadow-xl overflow-hidden z-50
                  ${isDark ? "bg-gray-900 border border-gray-700" : "bg-white border border-gray-200"}`}
              >
                {filteredPages.length > 0 ? (
                  <ul className="py-2 max-h-64 overflow-y-auto">
                    {filteredPages.map((page) => (
                      <li
                        key={page.path}
                        onClick={() => handleSearchSelect(page.path)}
                        className={`px-4 py-3 cursor-pointer flex items-center gap-3
                          ${isDark ? "hover:bg-gray-800 text-gray-200" : "hover:bg-gray-50 text-gray-800"} transition`}
                      >
                        <FiSearch size={16} className="text-orange-500" />
                        <span className="font-medium">{page.name}</span>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <div className={`px-4 py-6 text-center text-sm ${isDark ? "text-gray-400" : "text-gray-500"}`}>
                    No results found
                  </div>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Right actions */}
        <div className="flex items-center gap-3 md:gap-4">
          <motion.button
            onClick={toggleTheme}
            className={`p-2.5 rounded-full transition ${isDark ? "bg-gray-900 hover:bg-gray-800 text-yellow-400" : "bg-gray-100 hover:bg-gray-200 text-orange-600"}`}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
            {isDark ? <FiSun size={20} /> : <FiMoon size={20} />}
          </motion.button>

          <div className="relative hidden sm:block" ref={userRef}>
            <motion.button
              onClick={() => setShowUserMenu(!showUserMenu)}
              className={`flex items-center gap-2 p-1.5 rounded-full transition ${isDark ? "bg-gray-900 hover:bg-gray-800" : "bg-gray-100 hover:bg-gray-200"}`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {user?.avatar ? (
                <img src={user.avatar} alt="Avatar" className="w-8 h-8 rounded-full object-cover border-2 border-orange-500/40" />
              ) : (
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-white ${isDark ? "bg-orange-700" : "bg-orange-600"}`}>
                  <FiUser size={18} />
                </div>
              )}
              <span className={`hidden md:inline font-medium ${isDark ? "text-orange-300" : "text-orange-700"}`}>
                {user?.fullName?.split(" ")[0] || "User"}
              </span>
            </motion.button>

            <AnimatePresence>
              {showUserMenu && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className={`absolute right-0 mt-3 w-64 rounded-xl shadow-2xl overflow-hidden ${isDark ? "bg-gray-950 border border-gray-800" : "bg-white border border-gray-200"}`}
                >
                  <div className={`px-5 py-4 border-b flex items-center gap-3 ${isDark ? "border-gray-800" : "border-gray-200"}`}>
                    {user?.avatar ? (
                      <img src={user.avatar} alt="Avatar" className="w-10 h-10 rounded-full object-cover border-2 border-orange-500/30" />
                    ) : (
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center text-white text-xl font-bold ${isDark ? "bg-orange-700" : "bg-orange-600"}`}>
                        {user?.fullName?.[0]?.toUpperCase() || "?"}
                      </div>
                    )}
                    <div>
                      <p className={`font-semibold ${isDark ? "text-orange-300" : "text-orange-700"}`}>{user?.fullName}</p>
                      <p className={`text-xs ${isDark ? "text-gray-400" : "text-gray-500"}`}>{user?.email}</p>
                      <p className={`text-xs ${isDark ? "text-gray-400" : "text-gray-500"}`}>Id: {user?.id }</p>
                    </div>
                  </div>

                  <ul className="py-2 text-sm">
                    <li
                      onClick={() => { navigate("/profile"); setShowUserMenu(false); }}
                      className={`flex items-center gap-3 px-5 py-3 cursor-pointer ${isDark ? "hover:bg-gray-800 text-orange-300" : "hover:bg-gray-50 text-gray-800"}`}
                    >
                      <FiUser size={18} />
                      Profile & Settings
                    </li>

                    <li
                      onClick={handleLogout}
                      className={`flex items-center gap-3 px-5 py-3 cursor-pointer border-t mt-1 ${isDark ? "border-gray-800 hover:bg-red-950/30 text-red-400" : "border-gray-200 hover:bg-red-50 text-red-600"}`}
                    >
                      <FiLogOut size={18} />
                      Logout
                    </li>
                  </ul>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <motion.button
            className={`md:hidden p-2.5 rounded-lg transition ${isDark ? "border border-gray-700 hover:bg-gray-800 text-orange-400" : "border border-gray-300 hover:bg-gray-200 text-orange-600"}`}
            onClick={toggleSidebar}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
            <FiMenu size={22} />
          </motion.button>
        </div>
      </div>
    </header>
  );
}
