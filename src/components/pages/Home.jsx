


// import React, { useState, useEffect } from 'react';
// import { motion, AnimatePresence } from 'framer-motion';
// import { useNavigate } from 'react-router-dom';
// import {
//   BanknotesIcon,
//   ArrowTrendingUpIcon,
//   ArrowDownTrayIcon,
//   ArrowUpTrayIcon,
//   ChartBarIcon,
//   XMarkIcon,
//   GiftIcon,
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
// import companyLogo from '../../assets/flux2.svg';

// export default function Dashboard() {
//   const navigate = useNavigate();
//   const { theme } = useTheme();
//   const isDark = theme === 'dark';

//   const [loading, setLoading] = useState(true);
//   const [profile, setProfile] = useState(null);
//   const [showReferPopup, setShowReferPopup] = useState(false);

//   // Referral popup – shows once per login session
//   useEffect(() => {
//     const STORAGE_KEY = 'hasSeenReferralPopupThisSession';

//     // Already shown in this browser session → skip
//     if (sessionStorage.getItem(STORAGE_KEY)) {
//       return;
//     }

//     const showDelayMs = 2200; // 2.2 seconds

//     const showTimer = setTimeout(() => {
//       setShowReferPopup(true);
//       sessionStorage.setItem(STORAGE_KEY, 'true');
//     }, showDelayMs);

//     return () => clearTimeout(showTimer);
//   }, []);

//   // Auto-close after ~8 seconds
//   useEffect(() => {
//     if (!showReferPopup) return;

//     const autoCloseMs = 8000;

//     const autoCloseTimer = setTimeout(() => {
//       setShowReferPopup(false);
//     }, autoCloseMs);

//     return () => clearTimeout(autoCloseTimer);
//   }, [showReferPopup]);

//   // Fetch profile
//   useEffect(() => {
//     let isCurrent = true;

//     const fetchProfile = async () => {
//       try {
//         setLoading(true);
//         const res = await userService.getProfile();
//         if (isCurrent && res?.success) {
//           setProfile(res.data);
//         }
//       } catch (err) {
//         console.error('Profile fetch failed:', err);
//       } finally {
//         if (isCurrent) setLoading(false);
//       }
//     };

//     fetchProfile();

//     return () => {
//       isCurrent = false;
//     };
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

//   const placeholderChart = Array.from({ length: 7 }, (_, i) => {
//     const date = new Date();
//     date.setDate(date.getDate() - (6 - i));
//     return {
//       date: date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
//       balance: totalCryptoBalance,
//       profit: profile.totalEarnings ?? 0,
//     };
//   });

//   const stats = [
//     { title: 'Account Balance', value: totalCryptoBalance, icon: BanknotesIcon, color: 'from-orange-600 to-orange-500' },
//     { title: 'Total Earnings', value: profile.totalEarnings ?? 0, icon: ArrowTrendingUpIcon, color: 'from-emerald-600 to-emerald-500' },
//     { title: 'Deposited', value: profile.totalDeposited ?? 0, icon: ArrowDownTrayIcon, color: 'from-blue-600 to-blue-500' },
//     { title: 'Withdrawn', value: profile.totalWithdrawn ?? 0, icon: ArrowUpTrayIcon, color: 'from-red-600 to-red-500' },
//   ];

//   return (
//     <div className="min-h-screen bg-gray-50 dark:bg-gray-950 text-gray-900 dark:text-gray-100 p-6 md:p-10 relative">
//       <AnimatePresence mode="wait">
//         {showReferPopup && (
//           <motion.div
//             key="overlay"
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 1 }}
//             exit={{ opacity: 0 }}
//             transition={{ duration: 0.4 }}
//             className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
//           >
//             <motion.div
//               key="card"
//               initial={{ scale: 0.82, y: 60, opacity: 0 }}
//               animate={{ scale: 1, y: 0, opacity: 1 }}
//               exit={{ scale: 0.82, y: 60, opacity: 0 }}
//               transition={{ type: 'spring', damping: 22, stiffness: 280 }}
//               className="bg-white dark:bg-gray-900 border border-orange-500/40 rounded-2xl p-7 max-w-sm w-full shadow-2xl relative"
//             >
//               <button
//                 onClick={() => setShowReferPopup(false)}
//                 className="absolute top-4 right-4 text-gray-500 hover:text-gray-800 dark:text-gray-400 dark:hover:text-gray-200"
//                 aria-label="Close"
//               >
//                 <XMarkIcon className="w-7 h-7" />
//               </button>

//               <div className="text-center space-y-6 pt-3">
//                 <div className="bg-orange-100 dark:bg-orange-950/50 w-20 h-20 rounded-full flex items-center justify-center mx-auto">
//                   <GiftIcon className="w-10 h-10 text-orange-600" />
//                 </div>

//                 <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
//                   Referral Bonus Awaits! 🎁
//                 </h3>

//                 <p className="text-gray-600 dark:text-gray-300 text-[15px] leading-relaxed px-2">
//                   Invite <span className="font-semibold text-orange-600">5 friends</span> and unlock exclusive trading rewards.
//                 </p>

//                 <button
//                   onClick={() => {
//                     setShowReferPopup(false);
//                     navigate('/refer');
//                   }}
//                   className="w-full bg-gradient-to-r from-orange-600 to-orange-500 hover:from-orange-700 hover:to-orange-600 text-white font-semibold py-3.5 rounded-xl transition shadow-lg shadow-orange-600/30"
//                 >
//                   Refer Friends Now
//                 </button>
//               </div>
//             </motion.div>
//           </motion.div>
//         )}
//       </AnimatePresence>

//       {/* ────────────── Main Dashboard Content ────────────── */}
//       <div className="max-w-7xl mx-auto space-y-8 md:space-y-10">
//         <motion.div
//           initial={{ opacity: 0, y: -20 }}
//           animate={{ opacity: 1, y: 0 }}
//           className="flex flex-col gap-4"
//         >
//           <div>
//             <h1 className="text-3xl font-bold text-orange-600">
//               Welcome, {profile.fullName || profile.username}
//             </h1>
//             <p className="text-gray-500 dark:text-gray-400 mt-1">
//               @{profile.username} • {profile.country}
//             </p>
//           </div>

//           <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
//             <motion.div
//               animate={{ scale: [1, 1.08, 1], opacity: [0.9, 1, 0.9] }}
//               transition={{ duration: 4, repeat: Infinity, repeatType: 'reverse' }}
//               className="flex items-center p-1 w-full justify-center md:hidden"
//             >
//               <img
//                 src={companyLogo}
//                 alt="Company Logo"
//                 className="h-24 w-full object-cover bg-white dark:bg-gray-800 p-2 rounded-xl border border-gray-200 dark:border-gray-700"
//               />
//             </motion.div>

//             <div className="hidden md:block flex-1 overflow-hidden">
//               <motion.div
//                 animate={{ x: ['100%', '-100%'] }}
//                 transition={{ repeat: Infinity, duration: 14, ease: 'linear' }}
//                 className="whitespace-nowrap text-lg font-medium text-orange-600 dark:text-orange-400"
//               >
//                 🚀 Trade smarter • Secure investments • Fast withdrawals • Trusted platform
//               </motion.div>
//             </div>
//           </div>
//         </motion.div>

//         <div className="grid grid-cols-2 lg:grid-cols-4 gap-5">
//           {stats.map((item, i) => (
//             <motion.div
//               key={item.title}
//               initial={{ opacity: 0, y: 20 }}
//               animate={{ opacity: 1, y: 0 }}
//               transition={{ delay: i * 0.08 }}
//               className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl p-5 shadow-sm"
//             >
//               <div className={`inline-flex p-3 bg-gradient-to-br ${item.color} rounded-lg mb-4`}>
//                 <item.icon className="w-6 h-6 text-white" />
//               </div>
//               <p className="text-sm text-gray-500 dark:text-gray-400">{item.title}</p>
//               <p className="text-2xl font-bold mt-1">${formatMoney(item.value)}</p>
//             </motion.div>
//           ))}
//         </div>

//         <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
//           <button onClick={() => navigate('/deposits')} className="bg-gradient-to-r from-blue-600 to-blue-500 hover:brightness-110 text-white font-semibold py-4 rounded-xl shadow-md transition">
//             Deposit Funds
//           </button>
//           <button onClick={() => navigate('/withdraw')} className="bg-gradient-to-r from-red-600 to-red-500 hover:brightness-110 text-white font-semibold py-4 rounded-xl shadow-md transition">
//             Withdraw
//           </button>
//           <button onClick={() => navigate('/trade')} className="bg-gradient-to-r from-orange-600 to-orange-500 hover:brightness-110 text-white font-semibold py-4 rounded-xl shadow-md transition">
//             Start Trading
//           </button>
//         </div>

//         <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl p-6 shadow-sm">
//           <h2 className="text-xl font-semibold text-orange-500 mb-6 flex items-center gap-2">
//             <ChartBarIcon className="w-6 h-6" />
//             Portfolio Overview
//           </h2>
//           <div className="h-72">
//             <ResponsiveContainer width="100%" height="100%">
//               <LineChart data={placeholderChart}>
//                 <CartesianGrid strokeDasharray="3 3" stroke={isDark ? '#374151' : '#e5e7eb'} />
//                 <XAxis dataKey="date" stroke="#9ca3af" fontSize={12} />
//                 <YAxis stroke="#9ca3af" fontSize={12} />
//                 <Tooltip />
//                 <Line type="monotone" dataKey="balance" stroke="#f97316" strokeWidth={2.5} name="Balance" dot={false} />
//                 <Line type="monotone" dataKey="profit" stroke="#22c55e" strokeWidth={2.5} name="Earnings" dot={false} />
//               </LineChart>
//             </ResponsiveContainer>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }






import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import {
  BanknotesIcon,
  ArrowTrendingUpIcon,
  ArrowDownTrayIcon,
  ArrowUpTrayIcon,
  ChartBarIcon,
  ClockIcon,
  GiftIcon,
  XMarkIcon,
  ArrowRightIcon,
} from '@heroicons/react/24/solid';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from 'recharts';
import { userService } from '../../api/userApi';
import { useTheme } from '../ui/ThemeContext';
import companyLogo from '../../assets/flux2.svg';

export default function Dashboard() {
  const navigate = useNavigate();
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  const [dashboardData, setDashboardData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showReferPopup, setShowReferPopup] = useState(false);
  const [profile, setProfile] = useState(null);

  // Referral popup logic (once per session)
  useEffect(() => {
    const STORAGE_KEY = 'hasSeenReferralPopupThisSession';
    if (sessionStorage.getItem(STORAGE_KEY)) return;

    const timer = setTimeout(() => {
      setShowReferPopup(true);
      sessionStorage.setItem(STORAGE_KEY, 'true');
    }, 2200);

    return () => clearTimeout(timer);
  }, []);

  // Add this useEffect to fetch the profile
useEffect(() => {
  const fetchProfile = async () => {
    try {
      const res = await userService.getProfile();
      if (res?.success && res?.data) {
        setProfile(res.data);
      }
    } catch (err) {
      console.error("Failed to load user profile:", err);
    }
  };

  fetchProfile();
}, []);

  useEffect(() => {
    if (!showReferPopup) return;
    const timer = setTimeout(() => setShowReferPopup(false), 8500);
    return () => clearTimeout(timer);
  }, [showReferPopup]);

  // Fetch dashboard data
  useEffect(() => {
    let mounted = true;

    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);
        const res = await userService.getDashboard(); // ← using the correct endpoint
        if (mounted && res?.success) {
          setDashboardData(res.data);
        }
      } catch (err) {
        console.error('Dashboard fetch failed:', err);
        if (mounted) setError('Failed to load dashboard data. Please try again.');
      } finally {
        if (mounted) setLoading(false);
      }
    };

    fetchData();

    // Optional: refresh every 60s (useful for balances/prices)
    const interval = setInterval(fetchData, 60000);
    return () => {
      mounted = false;
      clearInterval(interval);
    };
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-950">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1.2, repeat: Infinity, ease: 'linear' }}
          className="w-14 h-14 border-4 border-orange-500 border-t-transparent rounded-full"
        />
      </div>
    );
  }

  if (error || !dashboardData) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-950 text-center p-6">
        <div className="max-w-md">
          <p className="text-red-500 dark:text-red-400 text-xl font-medium mb-4">{error || 'No dashboard data available'}</p>
          <button
            onClick={() => window.location.reload()}
            className="px-6 py-3 bg-orange-600 hover:bg-orange-700 text-white rounded-xl font-medium transition"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  const {
    balance = 0,
    totalDeposited = 0,
    totalEarnings = 0,
    totalInvested = 0,
    activeInvestments = 0,
    completedTrades = 0,
    totalReferralEarnings = 0,
    pendingWithdrawals = 0,
    recentTransactions = [],
  } = dashboardData;

  const formatUSD = (num = 0) =>
    Number(num).toLocaleString('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });

  // Prepare chart data – in real app you'd fetch time-series balance history
  const chartData = recentTransactions.length > 0
    ? recentTransactions.map(tx => ({
        date: new Date(tx.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
        balance: balance, // placeholder – replace with real historical points if available
        earnings: totalEarnings,
      }))
    : Array.from({ length: 7 }, (_, i) => {
        const d = new Date();
        d.setDate(d.getDate() - (6 - i));
        return {
          date: d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
          balance,
          earnings: totalEarnings,
        };
      });

  const quickActions = [
    { label: 'Deposit', path: '/deposits', color: 'from-blue-600 to-blue-500', icon: ArrowDownTrayIcon },
    { label: 'Withdraw', path: '/withdraw', color: 'from-red-600 to-red-500', icon: ArrowUpTrayIcon },
    { label: 'Trade', path: '/trade', color: 'from-orange-600 to-orange-500', icon: ArrowTrendingUpIcon },
  ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 text-gray-900 dark:text-gray-100 p-5 sm:p-6 lg:p-8 relative">
      {/* Referral Popup */}
      <AnimatePresence>
        {showReferPopup && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/65 backdrop-blur-sm p-4"
          >
            <motion.div
              initial={{ scale: 0.8, y: 50, opacity: 0 }}
              animate={{ scale: 1, y: 0, opacity: 1 }}
              exit={{ scale: 0.8, y: 50, opacity: 0 }}
              className="bg-white dark:bg-gray-900 border border-orange-500/50 rounded-2xl p-7 max-w-md w-full shadow-2xl relative"
            >
              <button
                onClick={() => setShowReferPopup(false)}
                className="absolute top-4 right-4 text-gray-500 hover:text-gray-800 dark:text-gray-400 dark:hover:text-gray-200 transition"
                aria-label="Close popup"
              >
                <XMarkIcon className="w-7 h-7" />
              </button>

              <div className="text-center space-y-5">
                <div className="mx-auto w-20 h-20 rounded-full bg-orange-100 dark:bg-orange-950/60 flex items-center justify-center">
                  <GiftIcon className="w-11 h-11 text-orange-600 dark:text-orange-500" />
                </div>
                <h3 className="text-2xl font-bold text-orange-600 dark:text-orange-400">
                  Referral Rewards Ready! 🎉
                </h3>
                <p className="text-gray-600 dark:text-gray-300 text-base leading-relaxed">
                  Invite friends and earn up to <span className="font-semibold text-orange-600 dark:text-orange-400">$500</span> in bonuses.
                </p>
                <button
                  onClick={() => {
                    setShowReferPopup(false);
                    navigate('/refer');
                  }}
                  className="w-full bg-gradient-to-r from-orange-600 to-orange-500 hover:from-orange-700 hover:to-orange-600 text-white font-semibold py-4 rounded-xl transition shadow-lg shadow-orange-600/30 flex items-center justify-center gap-2"
                >
                  Invite Friends Now <ArrowRightIcon className="w-5 h-5" />
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="max-w-7xl mx-auto space-y-8 lg:space-y-10">
        {/* Header */}
        {/* <motion.header
          initial={{ opacity: 0, y: -15 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-5"
        >
          <div>
            <h1 className="text-3xl sm:text-4xl font-bold text-orange-600 dark:text-orange-500">
              Dashboard
            </h1>
            <p className="text-gray-600 dark:text-gray-400 mt-1.5">
              Overview • {new Date().toLocaleDateString()}
            </p>
          </div>

          <div className="flex items-center gap-4 flex-wrap">
            <div className="text-right">
              <p className="text-sm text-gray-500 dark:text-gray-400">Main Balance</p>
              <p className="text-2xl font-bold text-emerald-600 dark:text-emerald-400">
                {formatUSD(balance)}
              </p>
            </div>
            <img
              src={companyLogo}
              alt="Platform Logo"
              className="h-14 sm:h-16 object-contain bg-white dark:bg-gray-800 rounded-xl p-2 border border-gray-200 dark:border-gray-700 shadow-sm"
            />
          </div>
        </motion.header> */}

        <motion.header
  initial={{ opacity: 0, y: -15 }}
  animate={{ opacity: 1, y: 0 }}
  className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-5"
>
  <div>
    <h1 className="text-3xl sm:text-4xl font-bold text-orange-600 dark:text-orange-500">
      {profile?.fullName 
        ? `Welcome back, ${profile.fullName.split(' ')[0]}`
        : 'Welcome back'}
    </h1>
    {/* <p className="text-gray-600 dark:text-gray-400 mt-1.5">
      Overview • {new Date().toLocaleDateString()}
    </p> */}
  </div>

  <div className="flex items-center gap-4 flex-wrap">
    <div className="text-right">
      <p className="text-sm text-gray-500 dark:text-gray-400">Main Balance</p>
      <p className="text-2xl font-bold text-emerald-600 dark:text-emerald-400">
        {formatUSD(balance)}
      </p>
    </div>
    {/* <img
      src={companyLogo}
      alt="Platform Logo"
      className="h-14 sm:h-16 object-contain bg-white dark:bg-gray-800 rounded-xl p-2 border border-gray-200 dark:border-gray-700 shadow-sm"
    /> */}
  </div>
</motion.header>

        {/* Quick Action Buttons
        <div className="grid grid-cols-3 gap-4 sm:gap-5">
          {quickActions.map((action, idx) => (
            <motion.button
              key={action.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              onClick={() => navigate(action.path)}
              className={`bg-gradient-to-br ${action.color} text-white font-semibold py-5 sm:py-6 rounded-2xl shadow-lg hover:shadow-xl hover:brightness-110 transition-all flex flex-col items-center justify-center gap-2 text-base sm:text-lg`}
            >
              <action.icon className="w-7 h-7 sm:w-8 sm:h-8" />
              {action.label}
            </motion.button>
          ))}
        </div> */}

        {/* Stats Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-5">
          {[
            { title: 'Total Earnings', value: totalEarnings, icon: ArrowTrendingUpIcon, color: 'from-emerald-600 to-emerald-500' },
            { title: 'Total Deposited', value: totalDeposited, icon: ArrowDownTrayIcon, color: 'from-blue-600 to-blue-500' },
            { title: 'Total Invested', value: totalInvested, icon: BanknotesIcon, color: 'from-purple-600 to-purple-500' },
            { title: 'Referral Earnings', value: totalReferralEarnings, icon: GiftIcon, color: 'from-amber-600 to-amber-500' },
          ].map((stat, i) => (
            <motion.div
              key={stat.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.07 + 0.2 }}
              className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl p-5 shadow hover:shadow-md transition-shadow"
            >
              <div className={`inline-flex p-3 bg-gradient-to-br ${stat.color} rounded-xl mb-4`}>
                <stat.icon className="w-6 h-6 text-white" />
              </div>
              <p className="text-sm text-gray-500 dark:text-gray-400">{stat.title}</p>
              <p className="text-2xl font-bold mt-1 text-gray-900 dark:text-white">
                {formatUSD(stat.value)}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Quick Action Buttons */}
        <div className="grid grid-cols-3 gap-4 sm:gap-5">
          {quickActions.map((action, idx) => (
            <motion.button
              key={action.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              onClick={() => navigate(action.path)}
              className={`bg-gradient-to-br ${action.color} text-white font-semibold py-5 sm:py-6 rounded-2xl shadow-lg hover:shadow-xl hover:brightness-110 transition-all flex flex-col items-center justify-center gap-2 text-base sm:text-lg`}
            >
              <action.icon className="w-7 h-7 sm:w-8 sm:h-8" />
              {action.label}
            </motion.button>
          ))}
        </div>

        {/* Portfolio Chart + Recent Activity */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
          {/* Chart */}
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="lg:col-span-2 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl p-6 shadow"
          >
            <h2 className="text-xl font-semibold text-orange-600 dark:text-orange-500 mb-6 flex items-center gap-3">
              <ChartBarIcon className="w-7 h-7" />
              Portfolio Performance
            </h2>
            <div className="h-80 sm:h-96">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={chartData}>
                  <CartesianGrid strokeDasharray="4 4" stroke={isDark ? '#374151' : '#e5e7eb'} />
                  <XAxis dataKey="date" stroke="#9ca3af" fontSize={13} />
                  <YAxis stroke="#9ca3af" fontSize={13} tickFormatter={(val) => `$${val.toLocaleString()}`} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: isDark ? '#1f2937' : '#ffffff',
                      borderColor: isDark ? '#374151' : '#e5e7eb',
                      color: isDark ? '#f3f4f6' : '#111827',
                    }}
                  />
                  <Legend />
                  <Line type="monotone" dataKey="balance" stroke="#f97316" strokeWidth={2.5} name="Balance" dot={false} activeDot={{ r: 8 }} />
                  <Line type="monotone" dataKey="earnings" stroke="#10b981" strokeWidth={2.5} name="Profit" dot={false} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </motion.div>

          {/* Recent Transactions / Quick Stats */}
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl p-6 shadow flex flex-col"
          >
            <h2 className="text-xl font-semibold text-orange-600 dark:text-orange-500 mb-5 flex items-center gap-3">
              <ClockIcon className="w-7 h-7" />
              Recent Activity
            </h2>

            {recentTransactions.length === 0 ? (
              <p className="text-gray-500 dark:text-gray-400 text-center py-10">No recent transactions</p>
            ) : (
              <div className="space-y-4 flex-1">
                {recentTransactions.slice(0, 5).map((tx) => (
                  <div
                    key={tx._id}
                    className="flex justify-between items-center py-3 border-b border-gray-100 dark:border-gray-800 last:border-0"
                  >
                    <div>
                      <p className="font-medium text-gray-900 dark:text-white capitalize">
                        {tx.type} • {tx.description || '—'}
                      </p>
                      <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
                        {new Date(tx.date).toLocaleString([], { hour: '2-digit', minute: '2-digit', day: 'numeric', month: 'short' })}
                      </p>
                    </div>
                    <p className={`font-semibold ${tx.amount > 0 ? 'text-emerald-600 dark:text-emerald-400' : 'text-red-600 dark:text-red-400'}`}>
                      {tx.amount > 0 ? '+' : ''}{formatUSD(Math.abs(tx.amount))}
                    </p>
                  </div>
                ))}
              </div>
            )}

            <button
              onClick={() => navigate('/transactions')}
              className="mt-4 text-orange-600 dark:text-orange-400 hover:text-orange-700 dark:hover:text-orange-300 font-medium flex items-center gap-1.5 self-end transition"
            >
              View All <ArrowRightIcon className="w-4 h-4" />
            </button>
          </motion.div>
        </div>

        {/* Extra small stats row (optional) */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-5 text-center">
          <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl p-5">
            <p className="text-sm text-gray-500 dark:text-gray-400">Active Investments</p>
            <p className="text-3xl font-bold mt-2 text-purple-600 dark:text-purple-400">{activeInvestments}</p>
          </div>
          <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl p-5">
            <p className="text-sm text-gray-500 dark:text-gray-400">Completed Trades</p>
            <p className="text-3xl font-bold mt-2 text-emerald-600 dark:text-emerald-400">{completedTrades}</p>
          </div>
          <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl p-5">
            <p className="text-sm text-gray-500 dark:text-gray-400">Pending Withdrawals</p>
            <p className="text-3xl font-bold mt-2 text-amber-600 dark:text-amber-400">{pendingWithdrawals}</p>
          </div>
          <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl p-5">
            <p className="text-sm text-gray-500 dark:text-gray-400">Total Invested</p>
            <p className="text-3xl font-bold mt-2 text-orange-600 dark:text-orange-400">{formatUSD(totalInvested)}</p>
          </div>
        </div>
      </div>
    </div>
  );
}