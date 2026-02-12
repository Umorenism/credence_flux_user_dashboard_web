


import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import {
  BanknotesIcon,
  ArrowTrendingUpIcon,
  ArrowDownTrayIcon,
  ArrowUpTrayIcon,
  ChartBarIcon,
  XMarkIcon,
  GiftIcon,
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
import companyLogo from '../../assets/flux2.svg';

export default function Dashboard() {
  const navigate = useNavigate();
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  const [loading, setLoading] = useState(true);
  const [profile, setProfile] = useState(null);
  const [showReferPopup, setShowReferPopup] = useState(false);

  // Referral popup – shows once per login session
  useEffect(() => {
    const STORAGE_KEY = 'hasSeenReferralPopupThisSession';

    // Already shown in this browser session → skip
    if (sessionStorage.getItem(STORAGE_KEY)) {
      return;
    }

    const showDelayMs = 2200; // 2.2 seconds

    const showTimer = setTimeout(() => {
      setShowReferPopup(true);
      sessionStorage.setItem(STORAGE_KEY, 'true');
    }, showDelayMs);

    return () => clearTimeout(showTimer);
  }, []);

  // Auto-close after ~8 seconds
  useEffect(() => {
    if (!showReferPopup) return;

    const autoCloseMs = 8000;

    const autoCloseTimer = setTimeout(() => {
      setShowReferPopup(false);
    }, autoCloseMs);

    return () => clearTimeout(autoCloseTimer);
  }, [showReferPopup]);

  // Fetch profile
  useEffect(() => {
    let isCurrent = true;

    const fetchProfile = async () => {
      try {
        setLoading(true);
        const res = await userService.getProfile();
        if (isCurrent && res?.success) {
          setProfile(res.data);
        }
      } catch (err) {
        console.error('Profile fetch failed:', err);
      } finally {
        if (isCurrent) setLoading(false);
      }
    };

    fetchProfile();

    return () => {
      isCurrent = false;
    };
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

  const placeholderChart = Array.from({ length: 7 }, (_, i) => {
    const date = new Date();
    date.setDate(date.getDate() - (6 - i));
    return {
      date: date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
      balance: totalCryptoBalance,
      profit: profile.totalEarnings ?? 0,
    };
  });

  const stats = [
    { title: 'Account Balance', value: totalCryptoBalance, icon: BanknotesIcon, color: 'from-orange-600 to-orange-500' },
    { title: 'Total Earnings', value: profile.totalEarnings ?? 0, icon: ArrowTrendingUpIcon, color: 'from-emerald-600 to-emerald-500' },
    { title: 'Deposited', value: profile.totalDeposited ?? 0, icon: ArrowDownTrayIcon, color: 'from-blue-600 to-blue-500' },
    { title: 'Withdrawn', value: profile.totalWithdrawn ?? 0, icon: ArrowUpTrayIcon, color: 'from-red-600 to-red-500' },
  ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 text-gray-900 dark:text-gray-100 p-6 md:p-10 relative">
      <AnimatePresence mode="wait">
        {showReferPopup && (
          <motion.div
            key="overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
          >
            <motion.div
              key="card"
              initial={{ scale: 0.82, y: 60, opacity: 0 }}
              animate={{ scale: 1, y: 0, opacity: 1 }}
              exit={{ scale: 0.82, y: 60, opacity: 0 }}
              transition={{ type: 'spring', damping: 22, stiffness: 280 }}
              className="bg-white dark:bg-gray-900 border border-orange-500/40 rounded-2xl p-7 max-w-sm w-full shadow-2xl relative"
            >
              <button
                onClick={() => setShowReferPopup(false)}
                className="absolute top-4 right-4 text-gray-500 hover:text-gray-800 dark:text-gray-400 dark:hover:text-gray-200"
                aria-label="Close"
              >
                <XMarkIcon className="w-7 h-7" />
              </button>

              <div className="text-center space-y-6 pt-3">
                <div className="bg-orange-100 dark:bg-orange-950/50 w-20 h-20 rounded-full flex items-center justify-center mx-auto">
                  <GiftIcon className="w-10 h-10 text-orange-600" />
                </div>

                <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
                  Referral Bonus Awaits! 🎁
                </h3>

                <p className="text-gray-600 dark:text-gray-300 text-[15px] leading-relaxed px-2">
                  Invite <span className="font-semibold text-orange-600">5 friends</span> and unlock exclusive trading rewards.
                </p>

                <button
                  onClick={() => {
                    setShowReferPopup(false);
                    navigate('/refer');
                  }}
                  className="w-full bg-gradient-to-r from-orange-600 to-orange-500 hover:from-orange-700 hover:to-orange-600 text-white font-semibold py-3.5 rounded-xl transition shadow-lg shadow-orange-600/30"
                >
                  Refer Friends Now
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ────────────── Main Dashboard Content ────────────── */}
      <div className="max-w-7xl mx-auto space-y-8 md:space-y-10">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col gap-4"
        >
          <div>
            <h1 className="text-3xl font-bold text-orange-600">
              Welcome, {profile.fullName || profile.username}
            </h1>
            <p className="text-gray-500 dark:text-gray-400 mt-1">
              @{profile.username} • {profile.country}
            </p>
          </div>

          <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
            <motion.div
              animate={{ scale: [1, 1.08, 1], opacity: [0.9, 1, 0.9] }}
              transition={{ duration: 4, repeat: Infinity, repeatType: 'reverse' }}
              className="flex items-center p-1 w-full justify-center md:hidden"
            >
              <img
                src={companyLogo}
                alt="Company Logo"
                className="h-24 w-full object-cover bg-white dark:bg-gray-800 p-2 rounded-xl border border-gray-200 dark:border-gray-700"
              />
            </motion.div>

            <div className="hidden md:block flex-1 overflow-hidden">
              <motion.div
                animate={{ x: ['100%', '-100%'] }}
                transition={{ repeat: Infinity, duration: 14, ease: 'linear' }}
                className="whitespace-nowrap text-lg font-medium text-orange-600 dark:text-orange-400"
              >
                🚀 Trade smarter • Secure investments • Fast withdrawals • Trusted platform
              </motion.div>
            </div>
          </div>
        </motion.div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-5">
          {stats.map((item, i) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.08 }}
              className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl p-5 shadow-sm"
            >
              <div className={`inline-flex p-3 bg-gradient-to-br ${item.color} rounded-lg mb-4`}>
                <item.icon className="w-6 h-6 text-white" />
              </div>
              <p className="text-sm text-gray-500 dark:text-gray-400">{item.title}</p>
              <p className="text-2xl font-bold mt-1">${formatMoney(item.value)}</p>
            </motion.div>
          ))}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
          <button onClick={() => navigate('/deposits')} className="bg-gradient-to-r from-blue-600 to-blue-500 hover:brightness-110 text-white font-semibold py-4 rounded-xl shadow-md transition">
            Deposit Funds
          </button>
          <button onClick={() => navigate('/withdraw')} className="bg-gradient-to-r from-red-600 to-red-500 hover:brightness-110 text-white font-semibold py-4 rounded-xl shadow-md transition">
            Withdraw
          </button>
          <button onClick={() => navigate('/trade')} className="bg-gradient-to-r from-orange-600 to-orange-500 hover:brightness-110 text-white font-semibold py-4 rounded-xl shadow-md transition">
            Start Trading
          </button>
        </div>

        <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl p-6 shadow-sm">
          <h2 className="text-xl font-semibold text-orange-500 mb-6 flex items-center gap-2">
            <ChartBarIcon className="w-6 h-6" />
            Portfolio Overview
          </h2>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={placeholderChart}>
                <CartesianGrid strokeDasharray="3 3" stroke={isDark ? '#374151' : '#e5e7eb'} />
                <XAxis dataKey="date" stroke="#9ca3af" fontSize={12} />
                <YAxis stroke="#9ca3af" fontSize={12} />
                <Tooltip />
                <Line type="monotone" dataKey="balance" stroke="#f97316" strokeWidth={2.5} name="Balance" dot={false} />
                <Line type="monotone" dataKey="profit" stroke="#22c55e" strokeWidth={2.5} name="Earnings" dot={false} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
}