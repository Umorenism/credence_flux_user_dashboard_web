



// import React, { useState, useEffect } from 'react';
// import { motion } from 'framer-motion';
// import { useNavigate } from 'react-router-dom';
// import {
//   BanknotesIcon,
//   ArrowTrendingUpIcon,
//   ArrowDownTrayIcon,
//   ArrowUpTrayIcon,
//   ChartBarIcon,
// } from '@heroicons/react/24/solid';
// import {
//   LineChart,
//   Line,
//   XAxis,
//   YAxis,
//   CartesianGrid,
//   Tooltip,
//   ResponsiveContainer,
// } from 'recharts';

// import { userService } from '../../api/userApi';
// import { useTheme } from '../ui/ThemeContext';

// export default function Dashboard() {
//   const navigate = useNavigate();
//   const { theme } = useTheme();
//   const isDark = theme === 'dark';

//   const [loading, setLoading] = useState(true);
//   const [profile, setProfile] = useState(null);
//   const [dashboardData, setDashboardData] = useState(null);
//   const [portfolioChart, setPortfolioChart] = useState([]);

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         setLoading(true);

//         const profileRes = await userService.getProfile();
//         const dashboardRes = await userService.getDashboard();

//         if (profileRes.success && dashboardRes.success) {
//           setProfile(profileRes.data);
//           setDashboardData(dashboardRes.data);

//           // Generate chart data for last 7 days
//           const chart = [];
//           for (let i = 6; i >= 0; i--) {
//             const date = new Date();
//             date.setDate(date.getDate() - i);
//             const dateStr = date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });

//             chart.push({
//               date: dateStr,
//               balance: dashboardRes.data.totalDeposited, // placeholder: could enhance with real daily balance
//               profit: dashboardRes.data.totalEarnings,  // placeholder
//             });
//           }
//           setPortfolioChart(chart);
//         }
//       } catch (err) {
//         console.error(err);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchData();
//   }, []);

//   if (loading) {
//     return (
//       <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-950">
//         <motion.div
//           animate={{ rotate: 360 }}
//           transition={{ repeat: Infinity, duration: 1.2, ease: 'linear' }}
//           className="w-12 h-12 border-4 border-orange-600 border-t-transparent rounded-full"
//         />
//       </div>
//     );
//   }

//   const formatMoney = (num) =>
//     Number(num).toLocaleString('en-US', {
//       minimumFractionDigits: 2,
//       maximumFractionDigits: 2,
//     });

//   return (
//     <div className="min-h-screen bg-gray-50 dark:bg-gray-950 text-gray-900 dark:text-gray-100 p-6 md:p-8">
//       <div className="max-w-7xl mx-auto space-y-10">

//         {/* Header */}
//        <motion.h1
//   initial={{ opacity: 0, y: -20 }}
//   animate={{ opacity: 1, y: 0 }}
//   className="text-3xl md:text-4xl font-bold text-orange-600"
// >
//   Welcome back, {profile ? profile.fullName.split(' ')[0] : 'User'}
// </motion.h1>


//         {/* Stats Cards */}
//         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
//           {[
//             {
//               title: 'Account Balance',
//               value: Object.values(profile.cryptoBalance || {}).reduce((a, b) => a + Number(b), 0),
//               icon: BanknotesIcon,
//               color: 'from-orange-600 to-orange-500',
//             },
//             {
//               title: 'Total Earnings',
//               value: dashboardData.totalEarnings,
//               icon: ArrowTrendingUpIcon,
//               color: 'from-emerald-600 to-emerald-500',
//             },
//             {
//               title: 'Deposits',
//               value: dashboardData.totalDeposited,
//               icon: ArrowDownTrayIcon,
//               color: 'from-blue-600 to-blue-500',
//             },
//             {
//               title: 'Withdrawals',
//               value: dashboardData.totalWithdrawn,
//               icon: ArrowUpTrayIcon,
//               color: 'from-red-600 to-red-500',
//             },
//           ].map((item, i) => (
//             <motion.div
//               key={item.title}
//               initial={{ opacity: 0, y: 24 }}
//               animate={{ opacity: 1, y: 0 }}
//               transition={{ delay: i * 0.08 }}
//               className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl p-6 shadow-md"
//             >
//               <div className={`inline-flex p-3 bg-gradient-to-br ${item.color} rounded-xl mb-4`}>
//                 <item.icon className="w-7 h-7 text-white" />
//               </div>
//               <p className="text-sm text-gray-500">{item.title}</p>
//               <p className="text-2xl font-bold">${formatMoney(item.value)}</p>
//             </motion.div>
//           ))}
//         </div>

//         {/* Action Buttons */}
//         <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
//           <button
//             onClick={() => navigate('/deposits')}
//             className="bg-gradient-to-r from-blue-600 to-blue-500 hover:opacity-90 text-white font-semibold py-4 rounded-xl shadow-md transition"
//           >
//             Deposit
//           </button>

//           <button
//             onClick={() => navigate('/withdraw')}
//             className="bg-gradient-to-r from-red-600 to-red-500 hover:opacity-90 text-white font-semibold py-4 rounded-xl shadow-md transition"
//           >
//             Withdraw
//           </button>

//           <button
//             onClick={() => navigate('/trade')}
//             className="bg-gradient-to-r from-orange-600 to-orange-500 hover:opacity-90 text-white font-semibold py-4 rounded-xl shadow-md transition"
//           >
//             Trade Now
//           </button>
//         </div>

//         {/* Portfolio Chart */}
//         <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl p-6 shadow-md">
//           <h2 className="text-xl font-semibold text-orange-500 mb-6 flex items-center gap-2">
//             <ChartBarIcon className="w-6 h-6" />
//             Portfolio Growth
//           </h2>

//           <div className="h-72">
//             <ResponsiveContainer width="100%" height="100%">
//               <LineChart data={portfolioChart}>
//                 <CartesianGrid strokeDasharray="3 3" stroke={isDark ? '#374151' : '#e5e7eb'} />
//                 <XAxis dataKey="date" stroke="#9ca3af" />
//                 <YAxis stroke="#9ca3af" />
//                 <Tooltip />
//                 <Line type="monotone" dataKey="balance" stroke="#f97316" strokeWidth={2} />
//                 <Line type="monotone" dataKey="profit" stroke="#22c55e" strokeWidth={2} />
//               </LineChart>
//             </ResponsiveContainer>
//           </div>
//         </div>

//         {/* Pending Transactions */}
//         <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl p-6 shadow-md">
//           <h2 className="text-xl font-semibold text-orange-500 mb-6">Pending Transactions</h2>
//           {dashboardData.pendingDeposits + dashboardData.pendingWithdrawals === 0 ? (
//             <p className="text-gray-500 dark:text-gray-400">No pending transactions</p>
//           ) : (
//             <div className="space-y-2">
//               {dashboardData.pendingDeposits > 0 && (
//                 <p className="text-blue-500">{dashboardData.pendingDeposits} deposit(s) pending</p>
//               )}
//               {dashboardData.pendingWithdrawals > 0 && (
//                 <p className="text-red-500">{dashboardData.pendingWithdrawals} withdrawal(s) pending</p>
//               )}
//             </div>
//           )}
//         </div>

//       </div>
//     </div>
//   );
// }






// import React, { useState, useEffect } from 'react';
// import { motion } from 'framer-motion';
// import { useNavigate } from 'react-router-dom';
// import {
//   BanknotesIcon,
//   ArrowTrendingUpIcon,
//   ArrowDownTrayIcon,
//   ArrowUpTrayIcon,
//   ChartBarIcon,
// } from '@heroicons/react/24/solid';
// import {
//   LineChart,
//   Line,
//   XAxis,
//   YAxis,
//   CartesianGrid,
//   Tooltip,
//   ResponsiveContainer,
// } from 'recharts';

// import { userService } from '../../api/userApi';
// import { useTheme } from '../ui/ThemeContext';

// export default function Dashboard() {
//   const navigate = useNavigate();
//   const { theme } = useTheme();
//   const isDark = theme === 'dark';

//   const [loading, setLoading] = useState(true);
//   const [profile, setProfile] = useState(null);
//   const [dashboardData, setDashboardData] = useState(null);
//   const [portfolioChart, setPortfolioChart] = useState([]);

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         setLoading(true);

//         const profileRes = await userService.getProfile();
//         const dashboardRes = await userService.getDashboard();

//         if (profileRes?.success) setProfile(profileRes.data || {});
//         if (dashboardRes?.success) setDashboardData(dashboardRes.data || {});

//         // Generate chart data for last 7 days
//         const chart = [];
//         const totalBalance = dashboardRes?.data?.totalDeposited ?? 0;
//         const totalProfit = dashboardRes?.data?.totalEarnings ?? 0;

//         for (let i = 6; i >= 0; i--) {
//           const date = new Date();
//           date.setDate(date.getDate() - i);
//           const dateStr = date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });

//           chart.push({
//             date: dateStr,
//             balance: totalBalance,
//             profit: totalProfit,
//           });
//         }
//         setPortfolioChart(chart);
//       } catch (err) {
//         console.error('Dashboard fetch error:', err);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchData();
//   }, []);

//   if (loading || !profile || !dashboardData) {
//     return (
//       <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-950">
//         <motion.div
//           animate={{ rotate: 360 }}
//           transition={{ repeat: Infinity, duration: 1.2, ease: 'linear' }}
//           className="w-12 h-12 border-4 border-orange-600 border-t-transparent rounded-full"
//         />
//       </div>
//     );
//   }

//   const formatMoney = (num) =>
//     Number(num ?? 0).toLocaleString('en-US', {
//       minimumFractionDigits: 2,
//       maximumFractionDigits: 2,
//     });

//   return (
//     <div className="min-h-screen bg-gray-50 dark:bg-gray-950 text-gray-900 dark:text-gray-100 p-6 md:p-8">
//       <div className="max-w-7xl mx-auto space-y-10">
//         {/* Header */}
//         <motion.h1
//           initial={{ opacity: 0, y: -20 }}
//           animate={{ opacity: 1, y: 0 }}
//           className="text-3xl md:text-4xl font-bold text-orange-600"
//         >
//           Welcome back, {profile?.fullName?.split(' ')[0] ?? 'User'}
//         </motion.h1>

//         {/* Stats Cards */}
//         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
//           {[
//             {
//               title: 'Account Balance',
//               value: Object.values(profile?.cryptoBalance || {}).reduce(
//                 (a, b) => a + Number(b ?? 0),
//                 0
//               ),
//               icon: BanknotesIcon,
//               color: 'from-orange-600 to-orange-500',
//             },
//             {
//               title: 'Total Earnings',
//               value: dashboardData?.totalEarnings ?? 0,
//               icon: ArrowTrendingUpIcon,
//               color: 'from-emerald-600 to-emerald-500',
//             },
//             {
//               title: 'Deposits',
//               value: dashboardData?.totalDeposited ?? 0,
//               icon: ArrowDownTrayIcon,
//               color: 'from-blue-600 to-blue-500',
//             },
//             {
//               title: 'Withdrawals',
//               value: dashboardData?.totalWithdrawn ?? 0,
//               icon: ArrowUpTrayIcon,
//               color: 'from-red-600 to-red-500',
//             },
//           ].map((item, i) => (
//             <motion.div
//               key={item.title}
//               initial={{ opacity: 0, y: 24 }}
//               animate={{ opacity: 1, y: 0 }}
//               transition={{ delay: i * 0.08 }}
//               className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl p-6 shadow-md"
//             >
//               <div
//                 className={`inline-flex p-3 bg-gradient-to-br ${item.color} rounded-xl mb-4`}
//               >
//                 <item.icon className="w-7 h-7 text-white" />
//               </div>
//               <p className="text-sm text-gray-500">{item.title}</p>
//               <p className="text-2xl font-bold">${formatMoney(item.value)}</p>
//             </motion.div>
//           ))}
//         </div>

//         {/* Action Buttons */}
//         <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
//           <button
//             onClick={() => navigate('/deposits')}
//             className="bg-gradient-to-r from-blue-600 to-blue-500 hover:opacity-90 text-white font-semibold py-4 rounded-xl shadow-md transition"
//           >
//             Deposit
//           </button>

//           <button
//             onClick={() => navigate('/withdraw')}
//             className="bg-gradient-to-r from-red-600 to-red-500 hover:opacity-90 text-white font-semibold py-4 rounded-xl shadow-md transition"
//           >
//             Withdraw
//           </button>

//           <button
//             onClick={() => navigate('/trade')}
//             className="bg-gradient-to-r from-orange-600 to-orange-500 hover:opacity-90 text-white font-semibold py-4 rounded-xl shadow-md transition"
//           >
//             Trade Now
//           </button>
//         </div>

//         {/* Portfolio Chart */}
//         <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl p-6 shadow-md">
//           <h2 className="text-xl font-semibold text-orange-500 mb-6 flex items-center gap-2">
//             <ChartBarIcon className="w-6 h-6" />
//             Portfolio Growth
//           </h2>

//           <div className="h-72">
//             <ResponsiveContainer width="100%" height="100%">
//               <LineChart data={portfolioChart}>
//                 <CartesianGrid
//                   strokeDasharray="3 3"
//                   stroke={isDark ? '#374151' : '#e5e7eb'}
//                 />
//                 <XAxis dataKey="date" stroke="#9ca3af" />
//                 <YAxis stroke="#9ca3af" />
//                 <Tooltip />
//                 <Line
//                   type="monotone"
//                   dataKey="balance"
//                   stroke="#f97316"
//                   strokeWidth={2}
//                 />
//                 <Line
//                   type="monotone"
//                   dataKey="profit"
//                   stroke="#22c55e"
//                   strokeWidth={2}
//                 />
//               </LineChart>
//             </ResponsiveContainer>
//           </div>
//         </div>

//         {/* Pending Transactions */}
//         <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl p-6 shadow-md">
//           <h2 className="text-xl font-semibold text-orange-500 mb-6">
//             Pending Transactions
//           </h2>
//           {(dashboardData?.pendingDeposits ?? 0) + (dashboardData?.pendingWithdrawals ?? 0) === 0 ? (
//             <p className="text-gray-500 dark:text-gray-400">No pending transactions</p>
//           ) : (
//             <div className="space-y-2">
//               {(dashboardData?.pendingDeposits ?? 0) > 0 && (
//                 <p className="text-blue-500">
//                   {dashboardData.pendingDeposits} deposit(s) pending
//                 </p>
//               )}
//               {(dashboardData?.pendingWithdrawals ?? 0) > 0 && (
//                 <p className="text-red-500">
//                   {dashboardData.pendingWithdrawals} withdrawal(s) pending
//                 </p>
//               )}
//             </div>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// }





// import React, { useState, useEffect } from 'react';
// import { motion } from 'framer-motion';
// import { useNavigate } from 'react-router-dom';
// import {
//   BanknotesIcon,
//   ArrowTrendingUpIcon,
//   ArrowDownTrayIcon,
//   ArrowUpTrayIcon,
//   ChartBarIcon,
//   UserIcon,
//   CalendarIcon,
// } from '@heroicons/react/24/solid';
// import {
//   LineChart,
//   Line,
//   XAxis,
//   YAxis,
//   CartesianGrid,
//   Tooltip,
//   ResponsiveContainer,
// } from 'recharts';

// import { userService } from '../../api/userApi';
// import { useTheme } from '../ui/ThemeContext';

// export default function Dashboard() {
//   const navigate = useNavigate();
//   const { theme } = useTheme();
//   const isDark = theme === 'dark';

//   const [loading, setLoading] = useState(true);
//   const [profile, setProfile] = useState(null);

//   useEffect(() => {
//     const fetchProfile = async () => {
//       try {
//         setLoading(true);
//         const res = await userService.getProfile();
//         if (res?.success) {
//           setProfile(res.data);
//         }
//       } catch (err) {
//         console.error('Profile fetch error:', err);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchProfile();
//   }, []);

//   if (loading || !profile) {
//     return (
//       <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-950">
//         <motion.div
//           animate={{ rotate: 360 }}
//           transition={{ repeat: Infinity, duration: 1.2, ease: 'linear' }}
//           className="w-12 h-12 border-4 border-orange-600 border-t-transparent rounded-full"
//         />
//       </div>
//     );
//   }

//   const formatMoney = (num) =>
//     Number(num ?? 0).toLocaleString('en-US', {
//       minimumFractionDigits: 2,
//       maximumFractionDigits: 2,
//     });

//   const totalCryptoBalance = Object.values(profile.cryptoBalance || {}).reduce(
//     (sum, val) => sum + Number(val ?? 0),
//     0
//   );

//   // For now — placeholder chart (remove or replace with real data later)
//   const placeholderChart = Array.from({ length: 7 }, (_, i) => {
//     const date = new Date();
//     date.setDate(date.getDate() - (6 - i));
//     return {
//       date: date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
//       balance: totalCryptoBalance,
//       profit: profile.totalEarnings ?? 0,
//     };
//   });

//   const joinedDate = new Date(profile.createdAt).toLocaleDateString('en-US', {
//     month: 'long',
//     year: 'numeric',
//   });

//   const lastLoginDate = new Date(profile.lastLogin).toLocaleString('en-US', {
//     dateStyle: 'medium',
//     timeStyle: 'short',
//   });

//   return (
//     <div className="min-h-screen bg-gray-50 dark:bg-gray-950 text-gray-900 dark:text-gray-100 p-5 md:p-8">
//       <div className="max-w-7xl mx-auto space-y-8 md:space-y-10">

//         {/* Header + User Info */}
//         <motion.div
//           initial={{ opacity: 0, y: -20 }}
//           animate={{ opacity: 1, y: 0 }}
//           className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4"
//         >
//           <div>
//             <h1 className="text-2xl md:text-3xl font-bold text-orange-600">
//               Welcome, {profile.fullName || profile.username}
//             </h1>
//             <p className="text-gray-500 dark:text-gray-400 text-sm mt-1">
//               @{profile.username} • {profile.country}
//             </p>
//           </div>

//           <div className="flex items-center gap-3 text-sm">
//             <div className="flex items-center gap-1.5">
//               <CalendarIcon className="w-4 h-4 text-gray-500" />
//               <span>Joined {joinedDate}</span>
//             </div>
//             <div className="hidden sm:block text-gray-500">•</div>
//             <div className="flex items-center gap-1.5">
//               <UserIcon className="w-4 h-4 text-gray-500" />
//               <span>Last active: {lastLoginDate}</span>
//             </div>
//           </div>
//         </motion.div>

//         {/* Stats Cards */}
//         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 md:gap-6">
//           {[
//             {
//               title: 'Account Balance',
//               value: totalCryptoBalance,
//               icon: BanknotesIcon,
//               color: 'from-orange-600 to-orange-500',
//             },
//             {
//               title: 'Total Earnings',
//               value: profile.totalEarnings ?? 0,
//               icon: ArrowTrendingUpIcon,
//               color: 'from-emerald-600 to-emerald-500',
//             },
//             {
//               title: 'Deposited',
//               value: profile.totalDeposited ?? 0,
//               icon: ArrowDownTrayIcon,
//               color: 'from-blue-600 to-blue-500',
//             },
//             {
//               title: 'Withdrawn',
//               value: profile.totalWithdrawn ?? 0,
//               icon: ArrowUpTrayIcon,
//               color: 'from-red-600 to-red-500',
//             },
//           ].map((item, i) => (
//             <motion.div
//               key={item.title}
//               initial={{ opacity: 0, y: 20 }}
//               animate={{ opacity: 1, y: 0 }}
//               transition={{ delay: i * 0.07 }}
//               className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl p-5 shadow-sm"
//             >
//               <div className={`inline-flex p-3 bg-gradient-to-br ${item.color} rounded-lg mb-3`}>
//                 <item.icon className="w-6 h-6 text-white" />
//               </div>
//               <p className="text-sm text-gray-500 dark:text-gray-400">{item.title}</p>
//               <p className="text-2xl font-bold mt-1">${formatMoney(item.value)}</p>
//             </motion.div>
//           ))}
//         </div>

//         {/* Quick Actions */}
//         <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 md:gap-6">
//           <button
//             onClick={() => navigate('/deposits')}
//             className="bg-gradient-to-r from-blue-600 to-blue-500 hover:brightness-110 text-white font-semibold py-4 rounded-xl shadow-md transition"
//           >
//             Deposit Funds
//           </button>
//           <button
//             onClick={() => navigate('/withdraw')}
//             className="bg-gradient-to-r from-red-600 to-red-500 hover:brightness-110 text-white font-semibold py-4 rounded-xl shadow-md transition"
//           >
//             Withdraw
//           </button>
//           <button
//             onClick={() => navigate('/trade')}
//             className="bg-gradient-to-r from-orange-600 to-orange-500 hover:brightness-110 text-white font-semibold py-4 rounded-xl shadow-md transition"
//           >
//             Start Trading
//           </button>
//         </div>

//         {/* Simple Portfolio Chart (placeholder) */}
//         <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl p-5 md:p-6 shadow-sm">
//           <h2 className="text-lg md:text-xl font-semibold text-orange-500 mb-5 flex items-center gap-2">
//             <ChartBarIcon className="w-5 h-5 md:w-6 md:h-6" />
//             Portfolio Overview
//           </h2>

//           {totalCryptoBalance === 0 ? (
//             <div className="h-64 flex items-center justify-center text-gray-500 dark:text-gray-400">
//               <p>No trading activity yet • Make your first deposit to see growth</p>
//             </div>
//           ) : (
//             <div className="h-64 md:h-72">
//               <ResponsiveContainer width="100%" height="100%">
//                 <LineChart data={placeholderChart}>
//                   <CartesianGrid strokeDasharray="3 3" stroke={isDark ? '#374151' : '#e5e7eb'} />
//                   <XAxis dataKey="date" stroke="#9ca3af" fontSize={12} />
//                   <YAxis stroke="#9ca3af" fontSize={12} />
//                   <Tooltip />
//                   <Line type="monotone" dataKey="balance" stroke="#f97316" strokeWidth={2} name="Balance" />
//                   <Line type="monotone" dataKey="profit" stroke="#22c55e" strokeWidth={2} name="Earnings" />
//                 </LineChart>
//               </ResponsiveContainer>
//             </div>
//           )}
//         </div>

//         {/* Referral Info */}
//         {profile.referralCode && (
//           <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl p-5 shadow-sm">
//             <h2 className="text-lg font-semibold text-orange-500 mb-3">Invite Friends</h2>
//             <div className="flex flex-col sm:flex-row sm:items-center gap-3">
//               <div className="flex-1">
//                 <p className="text-sm text-gray-500">Your referral code:</p>
//                 <p className="font-mono text-lg font-bold">{profile.referralCode}</p>
//               </div>
//               <button
//                 onClick={() => {
//                   navigator.clipboard.writeText(profile.referralCode);
//                   alert('Referral code copied!');
//                 }}
//                 className="bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 px-5 py-2.5 rounded-lg text-sm font-medium transition"
//               >
//                 Copy Code
//               </button>
//             </div>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }




import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import {
  BanknotesIcon,
  ArrowTrendingUpIcon,
  ArrowDownTrayIcon,
  ArrowUpTrayIcon,
  ChartBarIcon,
  UserIcon,
  CalendarIcon,
} from '@heroicons/react/24/solid';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';

import { userService } from '../../api/userApi';
import { useTheme } from '../ui/ThemeContext';

export default function Dashboard() {
  const navigate = useNavigate();
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  const [loading, setLoading] = useState(true);
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        setLoading(true);
        const res = await userService.getProfile();
        if (res?.success) {
          setProfile(res.data);
        }
      } catch (err) {
        console.error('Profile fetch error:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  if (loading || !profile) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-950">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ repeat: Infinity, duration: 1.2, ease: 'linear' }}
          className="w-12 h-12 border-4 border-orange-600 border-t-transparent rounded-full"
        />
      </div>
    );
  }

  const formatMoney = (num) =>
    Number(num ?? 0).toLocaleString('en-US', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });

  const totalCryptoBalance = Object.values(profile.cryptoBalance || {}).reduce(
    (sum, val) => sum + Number(val ?? 0),
    0
  );

  // For now — placeholder chart
  const placeholderChart = Array.from({ length: 7 }, (_, i) => {
    const date = new Date();
    date.setDate(date.getDate() - (6 - i));
    return {
      date: date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
      balance: totalCryptoBalance,
      profit: profile.totalEarnings ?? 0,
    };
  });

  const joinedDate = new Date(profile.createdAt).toLocaleDateString('en-US', {
    month: 'long',
    year: 'numeric',
  });

  const lastLoginDate = new Date(profile.lastLogin).toLocaleString('en-US', {
    dateStyle: 'medium',
    timeStyle: 'short',
  });

  // Stats data
  const stats = [
    {
      title: 'Account Balance',
      value: totalCryptoBalance,
      icon: BanknotesIcon,
      color: 'from-orange-600 to-orange-500',
    },
    {
      title: 'Total Earnings',
      value: profile.totalEarnings ?? 0,
      icon: ArrowTrendingUpIcon,
      color: 'from-emerald-600 to-emerald-500',
    },
    {
      title: 'Deposited',
      value: profile.totalDeposited ?? 0,
      icon: ArrowDownTrayIcon,
      color: 'from-blue-600 to-blue-500',
    },
    {
      title: 'Withdrawn',
      value: profile.totalWithdrawn ?? 0,
      icon: ArrowUpTrayIcon,
      color: 'from-red-600 to-red-500',
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 text-gray-900 dark:text-gray-100 p-5 md:p-8">
      <div className="max-w-7xl mx-auto space-y-8 md:space-y-10">

        {/* Header + User Info */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4"
        >
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-orange-600">
              Welcome, {profile.fullName || profile.username}
            </h1>
            <p className="text-gray-500 dark:text-gray-400 text-sm mt-1">
              @{profile.username} • {profile.country}
            </p>
          </div>

          <div className="flex items-center gap-3 text-sm">
            <div className="flex items-center gap-1.5">
              <CalendarIcon className="w-4 h-4 text-gray-500" />
              <span>Joined {joinedDate}</span>
            </div>
            <div className="hidden sm:block text-gray-500">•</div>
            <div className="flex items-center gap-1.5">
              <UserIcon className="w-4 h-4 text-gray-500" />
              <span>Last active: {lastLoginDate}</span>
            </div>
          </div>
        </motion.div>

        {/* Stats Cards - Improved mobile layout */}
        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
          {stats.map((item, i) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.07 }}
              className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl p-4 sm:p-5 shadow-sm"
            >
              <div className={`inline-flex p-2.5 sm:p-3 bg-gradient-to-br ${item.color} rounded-lg mb-3`}>
                <item.icon className="w-6 h-6 text-white" />
              </div>
              <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400">{item.title}</p>
              <p className="text-xl sm:text-2xl font-bold mt-1">
                ${formatMoney(item.value)}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 md:gap-6">
          <button
            onClick={() => navigate('/deposits')}
            className="bg-gradient-to-r from-blue-600 to-blue-500 hover:brightness-110 text-white font-semibold py-4 rounded-xl shadow-md transition"
          >
            Deposit Funds
          </button>
          <button
            onClick={() => navigate('/withdraw')}
            className="bg-gradient-to-r from-red-600 to-red-500 hover:brightness-110 text-white font-semibold py-4 rounded-xl shadow-md transition"
          >
            Withdraw
          </button>
          <button
            onClick={() => navigate('/trade')}
            className="bg-gradient-to-r from-orange-600 to-orange-500 hover:brightness-110 text-white font-semibold py-4 rounded-xl shadow-md transition"
          >
            Start Trading
          </button>
        </div>

        {/* Simple Portfolio Chart */}
        <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl p-5 md:p-6 shadow-sm">
          <h2 className="text-lg md:text-xl font-semibold text-orange-500 mb-5 flex items-center gap-2">
            <ChartBarIcon className="w-5 h-5 md:w-6 md:h-6" />
            Portfolio Overview
          </h2>

          {totalCryptoBalance === 0 ? (
            <div className="h-64 flex items-center justify-center text-gray-500 dark:text-gray-400">
              <p>No trading activity yet • Make your first deposit to see growth</p>
            </div>
          ) : (
            <div className="h-64 md:h-72">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={placeholderChart}>
                  <CartesianGrid strokeDasharray="3 3" stroke={isDark ? '#374151' : '#e5e7eb'} />
                  <XAxis dataKey="date" stroke="#9ca3af" fontSize={12} />
                  <YAxis stroke="#9ca3af" fontSize={12} />
                  <Tooltip />
                  <Line type="monotone" dataKey="balance" stroke="#f97316" strokeWidth={2} name="Balance" />
                  <Line type="monotone" dataKey="profit" stroke="#22c55e" strokeWidth={2} name="Earnings" />
                </LineChart>
              </ResponsiveContainer>
            </div>
          )}
        </div>

        {/* Referral Info */}
        {profile.referralCode && (
          <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl p-5 shadow-sm">
            <h2 className="text-lg font-semibold text-orange-500 mb-3">Invite Friends</h2>
            <div className="flex flex-col sm:flex-row sm:items-center gap-3">
              <div className="flex-1">
                <p className="text-sm text-gray-500">Your referral code:</p>
                <p className="font-mono text-lg font-bold">{profile.referralCode}</p>
              </div>
              <button
                onClick={() => {
                  navigator.clipboard.writeText(profile.referralCode);
                  alert('Referral code copied!');
                }}
                className="bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 px-5 py-2.5 rounded-lg text-sm font-medium transition"
              >
                Copy Code
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}