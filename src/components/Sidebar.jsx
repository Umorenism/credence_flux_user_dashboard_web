// // src/components/Sidebar.jsx
// import React, { useEffect, useState } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import {
//   FiHome,
//   FiCreditCard,
//   FiArrowDownCircle,
//   FiCornerRightDown,
//   FiClock,
//   FiUsers,
//   FiShare2,
//   FiHelpCircle,
//   FiLogOut,
//   FiUser,
// } from "react-icons/fi";
// import { useTheme } from "./ui/ThemeContext";
// import { userService } from "../api/userApi";
// import logo from "../assets/flux2.svg";

// export default function Sidebar({ isOpen, closeSidebar }) {
//   const navigate = useNavigate();
//   const { theme } = useTheme();
//   const isDark = theme === "dark";

//   const [user, setUser] = useState(() => {
//     const saved = localStorage.getItem("user");
//     return saved
//       ? JSON.parse(saved)
//       : { fullName: "", avatar: null, email: "", id: "" };
//   });

//   const [loading, setLoading] = useState(true);

//   const loadProfile = async () => {
//     const token = localStorage.getItem("token");
//     if (!token) {
//       setLoading(false);
//       return;
//     }

//     try {
//       const res = await userService.getProfile();
//       if (res?.success && res.data) {
//         const profile = {
//           fullName: res.data.fullName || "",
//           avatar: res.data.avatar || null,
//           email: res.data.email || "",
//           id: res.data.id || "",
//         };
//         setUser(profile);
//         localStorage.setItem("user", JSON.stringify(profile));
//       }
//     } catch (err) {
//       console.error("Failed to load profile:", err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     loadProfile();
//     // Optional: refresh profile every 2 minutes
//     const interval = setInterval(loadProfile, 120000);
//     return () => clearInterval(interval);
//   }, []);

//   const handleLogout = () => {
//     localStorage.removeItem("token");
//     localStorage.removeItem("user");
//     navigate("/signup");
//   };

//   const navItems = [
//     { to: "/home", icon: FiHome, label: "Dashboard" },
//     { to: "/deposits", icon: FiCreditCard, label: "Deposits" },
//     { to: "/withdraw", icon: FiArrowDownCircle, label: "Withdraw" },
//     { to: "/crypto", icon: FiCornerRightDown, label: "Convert Crypto" },
//     { to: "/transactions", icon: FiClock, label: "Transaction History" },
//     { to: "/trade", icon: FiCornerRightDown, label: "Trade Now" },
//     { to: "/join-trade", icon: FiUsers, label: "Join Trade" },
//     { to: "/refer", icon: FiShare2, label: "Referrals" },
//     { to: "/support", icon: FiHelpCircle, label: "Help & Support" },
//   ];

//   return (
//     <>
//       {/* Mobile overlay backdrop */}
//       {isOpen && (
//         <div
//           className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 md:hidden"
//           onClick={closeSidebar}
//         />
//       )}

//       {/* Sidebar – fixed on desktop, drawer on mobile */}
//       <aside
//         className={`
//           fixed inset-y-0 left-0 z-50
//           w-72 sm:w-72 md:w-64 lg:w-72
//           bg-white dark:bg-gray-950
//           border-r border-gray-200 dark:border-gray-800
//           transform transition-transform duration-300 ease-in-out
//           ${isOpen ? "translate-x-0" : "-translate-x-full"}
//           md:translate-x-0 md:relative md:shadow-none
//           flex flex-col
//           overflow-y-auto
//         `}
//       >
//         {/* Logo / Brand */}
//         <div className="p-6 border-b border-gray-200 dark:border-gray-800 flex justify-center">
//           <img
//             src={logo}
//             alt="CredenceFlux Logo"
//             className="h-14 md:h-16 w-auto object-contain drop-shadow-md"
//           />
//         </div>

//         {/* Main Navigation */}
//         <nav className="flex-1 px-3 py-6 space-y-1">
//           {navItems.map((item) => (
//             <Link
//               key={item.to}
//               to={item.to}
//               onClick={closeSidebar}
//               className={`
//                 flex items-center gap-3 px-4 py-3 rounded-lg
//                 text-gray-700 dark:text-gray-300
//                 hover:bg-orange-50 dark:hover:bg-gray-800/70
//                 hover:text-orange-600 dark:hover:text-orange-400
//                 transition-colors duration-200
//                 font-medium
//               `}
//             >
//               <item.icon className="w-5 h-5 flex-shrink-0" />
//               <span>{item.label}</span>
//             </Link>
//           ))}
//         </nav>

//         {/* User Profile & Logout – fixed at bottom */}
//         <div className="mt-auto border-t border-gray-200 dark:border-gray-800 p-5">
//           <div
//             className={`
//               flex items-center gap-3 p-3 rounded-xl
//               cursor-pointer hover:bg-orange-50 dark:hover:bg-gray-800/50
//               transition-colors
//             `}
//             onClick={() => navigate("/profile")}
//           >
//             {/* Avatar */}
//             {loading ? (
//               <div className="w-11 h-11 rounded-full bg-gray-200 dark:bg-gray-700 animate-pulse flex-shrink-0" />
//             ) : user.avatar ? (
//               <img
//                 src={user.avatar}
//                 alt="Profile"
//                 className="w-11 h-11 rounded-full object-cover border-2 border-orange-500/30 flex-shrink-0"
//                 onError={(e) => (e.target.src = "/default-avatar.png")} // fallback
//               />
//             ) : (
//               <div className="w-11 h-11 rounded-full bg-gradient-to-br from-orange-500 to-amber-600 flex items-center justify-center text-white font-semibold text-xl flex-shrink-0">
//                 {user.fullName?.charAt(0)?.toUpperCase() || "U"}
//               </div>
//             )}

//             {/* User Info */}
//             <div className="flex-1 min-w-0">
//               <p className="font-semibold text-gray-900 dark:text-gray-100 truncate">
//                 {loading ? "Loading..." : user.fullName || "User"}
//               </p>
//               <p className="text-xs text-gray-500 dark:text-gray-400 truncate">
//                 {user.email || "View profile"}
//               </p>
//             </div>
//           </div>

//           {/* Logout Button */}
//           <button
//             onClick={handleLogout}
//             className={`
//               mt-3 w-full flex items-center justify-center gap-3
//               py-3 px-4 rounded-xl
//               text-red-600 dark:text-red-400
//               hover:bg-red-50 dark:hover:bg-red-950/30
//               transition-colors font-medium
//             `}
//           >
//             <FiLogOut className="w-5 h-5" />
//             <span>Sign Out</span>
//           </button>
//         </div>
//       </aside>
//     </>
//   );
// }





// src/components/Sidebar.jsx
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  FiHome,
  FiCreditCard,
  FiArrowDownCircle,
  FiCornerRightDown,
  FiClock,
  FiUsers,
  FiShare2,
  FiHelpCircle,
  FiLogOut,
  FiUser,
} from "react-icons/fi";
import { toast } from "react-toastify";           // ← added import
import { useTheme } from "./ui/ThemeContext";
import { userService } from "../api/userApi";
import logo from "../assets/flux2.svg";

export default function Sidebar({ isOpen, closeSidebar }) {
  const navigate = useNavigate();
  const { theme } = useTheme();
  const isDark = theme === "dark";

  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem("user");
    return saved
      ? JSON.parse(saved)
      : { fullName: "", avatar: null, email: "", id: "" };
  });

  const [loading, setLoading] = useState(true);

  const loadProfile = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      setLoading(false);
      return;
    }

    try {
      const res = await userService.getProfile();
      if (res?.success && res.data) {
        const profile = {
          fullName: res.data.fullName || "",
          avatar: res.data.avatar || null,
          email: res.data.email || "",
          id: res.data.id || "",
        };
        setUser(profile);
        localStorage.setItem("user", JSON.stringify(profile));
      }
    } catch (err) {
      console.error("Failed to load profile:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadProfile();
    // Optional: refresh profile every 2 minutes
    const interval = setInterval(loadProfile, 120000);
    return () => clearInterval(interval);
  }, []);

  const handleLogout = () => {
    // Show success toast
    toast.success("Signed out successfully! 👋", {
      position: "top-center",
      autoClose: 2200,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      theme: isDark ? "dark" : "light",
    });

    // Delay redirect slightly so the toast is visible
    setTimeout(() => {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      navigate("/signup");
    }, 900); // 900ms delay – adjust if needed (500–1500ms)
  };

  const navItems = [
    { to: "/home", icon: FiHome, label: "Dashboard" },
    { to: "/deposits", icon: FiCreditCard, label: "Deposits" },
    { to: "/withdraw", icon: FiArrowDownCircle, label: "Withdraw" },
    { to: "/crypto", icon: FiCornerRightDown, label: "Convert Crypto" },
    { to: "/transactions", icon: FiClock, label: "Transaction History" },
    { to: "/trade", icon: FiCornerRightDown, label: "Trade Now" },
    { to: "/join-trade", icon: FiUsers, label: "Join Trade" },
    { to: "/refer", icon: FiShare2, label: "Referrals" },
    { to: "/support", icon: FiHelpCircle, label: "Help & Support" },
  ];

  return (
    <>
      {/* Mobile overlay backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 md:hidden"
          onClick={closeSidebar}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`
          fixed inset-y-0 left-0 z-50
          w-72 sm:w-72 md:w-64 lg:w-72
          bg-white dark:bg-gray-950
          border-r border-gray-200 dark:border-gray-800
          transform transition-transform duration-300 ease-in-out
          ${isOpen ? "translate-x-0" : "-translate-x-full"}
          md:translate-x-0 md:relative md:shadow-none
          flex flex-col
          overflow-y-auto
        `}
      >
        {/* Logo / Brand */}
        <div className="p-2 border-b border-gray-200 dark:border-gray-800 flex mt-10 justify-start">
          <img
            src={logo}
            alt="CredenceFlux Logo"
            className="h-[200px] md:h-[300px] w-[200px] lg:h-24 w-auto object-contain drop-shadow-lg"
          />
        </div>

        {/* Main Navigation */}
        <nav className="flex-1 px-3 py-6 space-y-1">
          {navItems.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              onClick={closeSidebar}
              className={`
                flex items-center gap-3 px-4 py-3 rounded-lg
                text-gray-700 dark:text-gray-300
                hover:bg-orange-50 dark:hover:bg-gray-800/70
                hover:text-orange-600 dark:hover:text-orange-400
                transition-colors duration-200
                font-medium
              `}
            >
              <item.icon className="w-5 h-5 flex-shrink-0" />
              <span>{item.label}</span>
            </Link>
          ))}
        </nav>

        {/* User Profile & Logout */}
        <div className="mt-auto border-t border-gray-200 dark:border-gray-800 p-5">
          <div
            className={`
              flex items-center gap-3 p-3 rounded-xl
              cursor-pointer hover:bg-orange-50 dark:hover:bg-gray-800/50
              transition-colors
            `}
            onClick={() => navigate("/profile")}
          >
            {/* Avatar */}
            {loading ? (
              <div className="w-11 h-11 rounded-full bg-gray-200 dark:bg-gray-700 animate-pulse flex-shrink-0" />
            ) : user.avatar ? (
              <img
                src={user.avatar}
                alt="Profile"
                className="w-11 h-11 rounded-full object-cover border-2 border-orange-500/30 flex-shrink-0"
                onError={(e) => (e.target.src = "/default-avatar.png")}
              />
            ) : (
              <div className="w-11 h-11 rounded-full bg-gradient-to-br from-orange-500 to-amber-600 flex items-center justify-center text-white font-semibold text-xl flex-shrink-0">
                {user.fullName?.charAt(0)?.toUpperCase() || "U"}
              </div>
            )}

            {/* User Info */}
            <div className="flex-1 min-w-0">
              <p className="font-semibold text-gray-900 dark:text-gray-100 truncate">
                {loading ? "Loading..." : user.fullName || "User"}
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-400 truncate">
                {user.email || "View profile"}
              </p>
            </div>
          </div>

          {/* Logout Button */}
          <button
            onClick={handleLogout}
            className={`
              mt-3 w-full flex items-center justify-center gap-3
              py-3 px-4 rounded-xl
              text-red-600 dark:text-red-400
              hover:bg-red-50 dark:hover:bg-red-950/30
              transition-colors font-medium
            `}
          >
            <FiLogOut className="w-5 h-5" />
            <span>Sign Out</span>
          </button>
        </div>
      </aside>
    </>
  );
}