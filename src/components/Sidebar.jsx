





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
// import logo from "../assets/flux.svg";
// export default function Sidebar({ isOpen, closeSidebar }) {
//   const navigate = useNavigate();
//   const { theme } = useTheme();

//  // Hook to load user safely
// const [user, setUser] = useState(() => {
//   const saved = localStorage.getItem("user");
//   if (saved) {
//     try {
//       return JSON.parse(saved);
//     } catch {
//       return { fullName: "User", avatar: null, email: "", id: "" };
//     }
//   }
//   return { fullName: "User", avatar: null, email: "", id: "" };
// });

// const loadProfile = async () => {
//   const token = localStorage.getItem("token");
//   if (!token) return; // skip if no token

//   try {
//     const res = await userService.getProfile();
//     if (res && res.fullName) {
//       const profile = {
//         fullName: res.fullName,
//         avatar: res.avatar || null,
//         email: res.email || "",
//         id: res.id || "",
//       };
//       setUser(profile); // update state
//       localStorage.setItem("user", JSON.stringify(profile)); // update storage
//     }
//   } catch (err) {
//     console.error("Failed to load profile:", err);
//     // do NOT reset user — keeps the localStorage value
//   }
// };

// useEffect(() => {
//   loadProfile();
//   const interval = setInterval(loadProfile, 60000);
//   return () => clearInterval(interval);
// }, []);

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

//   const navItems = [
//     { to: "/home", icon: FiHome, label: "Dashboard" },
//     { to: "/deposits", icon: FiCreditCard, label: "Deposits" },
//     { to: "/withdraw", icon: FiArrowDownCircle, label: "Withdraw" },
//     { to: "/crypto", icon: FiCornerRightDown, label: "Convert Crypto" },
//     { to: "/transactions", icon: FiClock, label: "Transaction History" },
//      { to: "/trade", icon: FiCornerRightDown, label: "Trade Now" }, 
//     { to: "/join-trade", icon: FiUsers, label: "Join Trade" },
//     { to: "/refer", icon: FiShare2, label: "Referrals" },
//     { to: "/support", icon: FiHelpCircle, label: "Help & Support" },
//   ];

//   return (
//     <>
//       {isOpen && <div className="fixed inset-0 bg-black/60 backdrop-blur-sm md:hidden z-40" onClick={closeSidebar} />}
//       <aside
//         className={`fixed top-0 left-0 min-h-screen w-64
//           bg-gray-50 text-black
//           dark:bg-gray-950 dark:text-gray-100
//           shadow-2xl z-50
//           transform transition-transform duration-300 ease-in-out overflow-y-auto
//           ${isOpen ? "translate-x-0" : "-translate-x-full"}
//           md:translate-x-0 md:relative md:shadow-none`}
//       >
//        <div className="p-6 border-b border-orange-900/50 dark:border-gray-800/70 flex items-center justify-center">
//   <img
//     src={logo}
//     alt="CredenceFlux Logo"
//     className="
//       h-12 sm:h-16 md:h-20
//       w-auto
//       object-contain
//       drop-shadow-[0_0_18px_rgba(249,115,22,0.45)]
//       transition-transform duration-300
//       hover:scale-110
//     "
//   />
// </div>



//         <nav className="flex flex-col gap-1 p-4">
//           {navItems.map((item) => (
//             <Link
//               key={item.to}
//               to={item.to}
//               onClick={closeSidebar}
//               className="flex items-center gap-3 px-4 py-3 rounded-xl
//                          text-black hover:bg-orange-900/40 hover:text-orange-400
//                          dark:text-gray-300 dark:hover:bg-gray-800/60 dark:hover:text-orange-400
//                          transition-all duration-200"
//             >
//               <item.icon className="w-5 h-5" />
//               <span className="font-medium text-black dark:text-white">{item.label}</span>
//             </Link>
//           ))}
//         </nav>

//         <div className="mt-auto p-6 border-t border-orange-900/50 dark:border-gray-800/70">
//           <div
//             className="flex items-center gap-3 px-4 py-3 rounded-xl cursor-pointer
//                        hover:bg-orange-900/30 transition-colors mb-2 dark:hover:bg-gray-800/50"
//             onClick={() => navigate("/profile")}
//           >
//             {user.avatar ? (
//               <img
//                 src={user.avatar}
//                 alt="Profile"
//                 className="w-10 h-10 rounded-full object-cover border border-orange-600/50 dark:border-orange-600/40"
//                 onError={(e) => (e.target.style.display = "none")}
//               />
//             ) : (
//               <div className="w-10 h-10 rounded-full bg-orange-700 dark:bg-orange-800 flex items-center justify-center text-orange-100 dark:text-orange-200 text-lg font-semibold">
//                 {user.fullName?.charAt(0)?.toUpperCase() || <FiUser />}
//               </div>
//             )}

//             <div className="flex-1 min-w-0">
//               <p className="font-medium text-black dark:text-gray-100 truncate">{user.fullName}</p>
//               <p className="text-xs underline text-black dark:text-gray-400">
//                 <Link to="/profile">View Profile</Link>
//               </p>
//             </div>
//           </div>

//           <div
//             onClick={handleLogout}
//             className="flex items-center gap-3 px-4 py-3 text-red-400 hover:bg-red-900/30 hover:text-red-300
//                        dark:text-red-400 dark:hover:bg-red-950/40 dark:hover:text-red-300
//                        cursor-pointer transition-colors rounded-xl"
//           >
//             <FiLogOut className="w-5 h-5" />
//             <span>Logout</span>
//           </div>
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
import { useTheme } from "./ui/ThemeContext";
import { userService } from "../api/userApi";
import logo from "../assets/flux.svg";

export default function Sidebar({ isOpen, closeSidebar }) {
  const navigate = useNavigate();
  const { theme } = useTheme();

  // Load user from localStorage first
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem("user");
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch {
        return { fullName: "", avatar: null, email: "", id: "" };
      }
    }
    return { fullName: "", avatar: null, email: "", id: "" };
  });

  const [loading, setLoading] = useState(true);

  // Fetch latest profile from API
  const loadProfile = async () => {
    const token = localStorage.getItem("token");
    if (!token) return setLoading(false);

    try {
      const res = await userService.getProfile();
      if (res?.fullName) {
        const profile = {
          fullName: res.fullName,
          avatar: res.avatar || null,
          email: res.email || "",
          id: res.id || "",
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
    const interval = setInterval(loadProfile, 60000); // refresh every 60s
    return () => clearInterval(interval);
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
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/60 backdrop-blur-sm md:hidden z-40"
          onClick={closeSidebar}
        />
      )}

      <aside
        className={`fixed top-0 left-0 min-h-screen w-64
          bg-gray-50 text-black
          dark:bg-gray-950 dark:text-gray-100
          shadow-2xl z-50
          transform transition-transform duration-300 ease-in-out overflow-y-auto
          ${isOpen ? "translate-x-0" : "-translate-x-full"}
          md:translate-x-0 md:relative md:shadow-none`}
      >
        {/* Logo */}
        <div className="p-6 border-b border-orange-900/50 dark:border-gray-800/70 flex items-center justify-center">
          <img
            src={logo}
            alt="CredenceFlux Logo"
            className="
              h-12 sm:h-16 md:h-20
              w-auto
              object-contain
              drop-shadow-[0_0_18px_rgba(249,115,22,0.45)]
              transition-transform duration-300
              hover:scale-110
            "
          />
        </div>

        {/* Navigation */}
        <nav className="flex flex-col gap-1 p-4">
          {navItems.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              onClick={closeSidebar}
              className="flex items-center gap-3 px-4 py-3 rounded-xl
                         text-black hover:bg-orange-900/40 hover:text-orange-400
                         dark:text-gray-300 dark:hover:bg-gray-800/60 dark:hover:text-orange-400
                         transition-all duration-200"
            >
              <item.icon className="w-5 h-5" />
              <span className="font-medium text-black dark:text-white">{item.label}</span>
            </Link>
          ))}
        </nav>

        {/* Profile & Logout */}
        <div className="mt-auto p-6 border-t border-orange-900/50 dark:border-gray-800/70">
          <div
            className="flex items-center gap-3 px-4 py-3 rounded-xl cursor-pointer
                       hover:bg-orange-900/30 transition-colors mb-2 dark:hover:bg-gray-800/50"
            onClick={() => navigate("/profile")}
          >
            {/* Avatar */}
            {loading ? (
              <div className="w-10 h-10 rounded-full bg-gray-300 animate-pulse dark:bg-gray-700" />
            ) : user.avatar ? (
              <img
                src={user.avatar}
                alt="Profile"
                className="w-10 h-10 rounded-full object-cover border border-orange-600/50 dark:border-orange-600/40"
                onError={(e) => (e.target.style.display = "none")}
              />
            ) : (
              <div className="w-10 h-10 rounded-full bg-orange-700 dark:bg-orange-800 flex items-center justify-center text-orange-100 dark:text-orange-200 text-lg font-semibold">
                {user.fullName?.charAt(0)?.toUpperCase() || <FiUser />}
              </div>
            )}

            {/* Name */}
            <div className="flex-1 min-w-0">
              <p className="font-medium text-black dark:text-gray-100 truncate">
                {loading ? "Loading..." : user.fullName || "User"}
              </p>
              <p className="text-xs underline text-black dark:text-gray-400">
                <Link to="/profile">View Profile</Link>
              </p>
            </div>
          </div>

          {/* Logout */}
          <div
            onClick={handleLogout}
            className="flex items-center gap-3 px-4 py-3 text-red-400 hover:bg-red-900/30 hover:text-red-300
                       dark:text-red-400 dark:hover:bg-red-950/40 dark:hover:text-red-300
                       cursor-pointer transition-colors rounded-xl"
          >
            <FiLogOut className="w-5 h-5" />
            <span>Logout</span>
          </div>
        </div>
      </aside>
    </>
  );
}
