
// // src/pages/Referrals.jsx
// import React, { useState, useEffect } from 'react';
// import { motion } from 'framer-motion';
// import {
//   UsersIcon,
  
//   ShareIcon,
//   TrophyIcon,
 
//   UserGroupIcon,
  
//   ClipboardDocumentIcon,
 
// } from '@heroicons/react/24/solid';
// import QRCode from 'react-qr-code';
// import { userService } from '../../api/userApi';
// import { useTheme } from '../ui/ThemeContext';

// export default function Referrals() {
//   const { theme } = useTheme();

//   const [copiedCode, setCopiedCode] = useState(false);
//   const [copiedLink, setCopiedLink] = useState(false);
//   const [referralData, setReferralData] = useState({
//     code: '',
//     link: '',
//     totalReferrals: 0,
//   });
//   const [referredUsers, setReferredUsers] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState('');

//   const tiers = [
//     { level: 1, req: 5, reward: '50 USDT Bonus' },
//     { level: 2, req: 15, reward: '200 USDT + 5% lifetime commission boost' },
//     { level: 3, req: 30, reward: '500 USDT + 10% lifetime commission boost' },
//     { level: 4, req: 50, reward: '1500 USDT + VIP access & priority support' },
//   ];

//   const fetchReferralData = async () => {
//     try {
//       setLoading(true);
//       const res = await userService.getReferrals();
//       const data = res.data;

//       setReferralData({
//         code: data.referralCode || 'XXXXXX',
//         link: data.referralLink || `${window.location.origin}/register?ref=${data.referralCode || 'XXXXXX'}`,
//         totalReferrals: data.totalReferrals || 0,
//       });

//       const mappedReferrals = (data.referrals || []).map((user, index) => ({
//         id: user.id || user._id || `ref-${index}`,
//         username: user.username || user.email?.split('@')[0] || 'Anonymous',
//         email: user.email || '',
//         joinedAt: user.createdAt || user.joinedAt || null,
//         status: user.status || 'pending',
//       }));

//       setReferredUsers(mappedReferrals);
//     } catch (err) {
//       console.error(err);
//       setError('Failed to load referral information.');
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchReferralData();
//   }, []);

//   const copyCode = () => {
//     navigator.clipboard.writeText(referralData.code);
//     setCopiedCode(true);
//     setTimeout(() => setCopiedCode(false), 2200);
//   };

//   const copyLink = () => {
//     navigator.clipboard.writeText(referralData.link);
//     setCopiedLink(true);
//     setTimeout(() => setCopiedLink(false), 2200);
//   };

//   const currentTier = tiers.reduce(
//     (acc, tier) => (referralData.totalReferrals >= tier.req ? tier.level : acc),
//     0
//   );
//   const displayTier = currentTier > 0 ? `Level ${currentTier}` : 'Beginner';

//   if (loading) {
//     return (
//       <div className="min-h-screen bg-gray-50 dark:bg-gray-950 flex items-center justify-center">
//         <motion.div
//           animate={{ rotate: 360 }}
//           transition={{ duration: 1.2, repeat: Infinity, ease: 'linear' }}
//           className="w-12 h-12 border-4 border-orange-500 dark:border-orange-400 border-t-transparent rounded-full"
//         />
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-gray-50 dark:bg-gray-950 text-gray-900 dark:text-gray-100 p-4 sm:p-6 lg:p-8 transition-colors duration-300">
//       <motion.h1
//         initial={{ opacity: 0, y: -20 }}
//         animate={{ opacity: 1, y: 0 }}
//         className="text-3xl sm:text-4xl font-bold mb-8 text-orange-600 dark:text-orange-400 text-center"
//       >
//         Referral Program
//       </motion.h1>

//       {error && (
//         <div className="max-w-3xl mx-auto mb-8 p-5 bg-red-50 dark:bg-red-950/40 border border-red-200 dark:border-red-800/60 rounded-2xl text-red-700 dark:text-red-300 text-center shadow-sm">
//           {error}
//         </div>
//       )}

//       {/* Stats */}
//       <motion.div
//         initial={{ opacity: 0, scale: 0.98 }}
//         animate={{ opacity: 1, scale: 1 }}
//         className="bg-white dark:bg-gray-900 p-6 sm:p-8 rounded-2xl border border-gray-200 dark:border-gray-800/60 shadow-md dark:shadow-xl grid grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6 text-center mb-10"
//       >
//         <div>
//           <UsersIcon className="w-10 h-10 mx-auto text-orange-600 dark:text-orange-500 mb-3" />
//           <p className="text-3xl font-bold">{referralData.totalReferrals}</p>
//           <p className="text-gray-600 dark:text-gray-400 text-sm mt-1">Total Referrals</p>
//         </div>
//         <div>
//           <TrophyIcon className="w-10 h-10 mx-auto text-orange-600 dark:text-orange-500 mb-3" />
//           <p className="text-3xl font-bold">{displayTier}</p>
//           <p className="text-gray-600 dark:text-gray-400 text-sm mt-1">Current Tier</p>
//         </div>
//         <div>
//           <ClipboardDocumentIcon className="w-10 h-10 mx-auto text-orange-600 dark:text-orange-500 mb-3" />
//           <p className="text-sm font-medium text-gray-700 dark:text-gray-300 break-all">{referralData.code}</p>
//           <p className="text-gray-600 dark:text-gray-400 text-sm mt-1">Your Code</p>
//         </div>
//         <div>
//           <ShareIcon className="w-10 h-10 mx-auto text-orange-600 dark:text-orange-500 mb-3" />
//           <p className="text-sm font-medium text-gray-700 dark:text-gray-300 break-all">{referralData.link}</p>
//           <p className="text-gray-600 dark:text-gray-400 text-sm mt-1">Referral Link</p>
//         </div>
//       </motion.div>

//       {/* Copy & Share */}
//       <div className="max-w-2xl mx-auto flex flex-col sm:flex-row gap-4 justify-center mb-10">
//         <button
//           onClick={copyCode}
//           className={`flex-1 py-3 px-6 rounded-xl font-medium flex items-center justify-center gap-3 transition-all shadow-md ${
//             copiedCode
//               ? 'bg-green-600 text-white'
//               : 'bg-orange-600 hover:bg-orange-700 text-white'
//           }`}
//         >
//           {copiedCode ? 'Code Copied!' : 'Copy Code'}
//         </button>
//         <button
//           onClick={copyLink}
//           className={`flex-1 py-3 px-6 rounded-xl font-medium flex items-center justify-center gap-3 transition-all shadow-md ${
//             copiedLink
//               ? 'bg-green-600 text-white'
//               : 'bg-orange-600 hover:bg-orange-700 text-white'
//           }`}
//         >
//           {copiedLink ? 'Link Copied!' : 'Copy Link'}
//         </button>
//       </div>

//       {/* QR Code */}
//       <div className="flex justify-center mb-10">
//         <div className="bg-white dark:bg-white p-6 rounded-2xl shadow-xl border border-gray-200 dark:border-gray-300">
//           <QRCode value={referralData.link} size={200} level="H" fgColor="#ea580c" bgColor="#ffffff" />
//         </div>
//       </div>

//       {/* Referred Users */}
//       <motion.div
//         initial={{ opacity: 0 }}
//         animate={{ opacity: 1 }}
//         className="bg-white dark:bg-gray-900 p-6 sm:p-8 rounded-2xl border border-gray-200 dark:border-gray-800/60 shadow-md dark:shadow-xl"
//       >
//         <h2 className="text-2xl sm:text-3xl font-semibold mb-7 text-orange-600 dark:text-orange-300 flex items-center gap-3">
//           <UserGroupIcon className="w-8 h-8" />
//           Referred Users ({referredUsers.length})
//         </h2>
//         {referredUsers.length === 0 ? (
//           <div className="text-center py-12 text-gray-500 dark:text-gray-400 bg-gray-50 dark:bg-gray-800/40 rounded-xl border border-dashed border-gray-300 dark:border-gray-700">
//             <UsersIcon className="w-12 h-12 mx-auto mb-4 opacity-60" />
//             <p className="text-lg font-medium">No referrals yet</p>
//             <p className="mt-2">Share your link or code to start earning!</p>
//           </div>
//         ) : (
//           <div className="space-y-4">
           
// {referredUsers.length === 0 && (
//   <div className="text-center py-12 text-gray-500 dark:text-gray-400 bg-gray-50 dark:bg-gray-800/40 rounded-xl border border-dashed border-gray-300 dark:border-gray-700">
//     <UsersIcon className="w-12 h-12 mx-auto mb-4 opacity-60" />
//     <p className="text-lg font-medium mb-3">No referrals visible yet</p>
//     <p className="text-sm mb-4 max-w-md mx-auto">
//       New signups using your code may take 5–30 minutes to appear (or longer if they need to verify email or make a deposit).
//     </p>
//     <button
//       onClick={() => {
//         fetchReferralData();
//         toast.success("Refreshing...");
//       }}
//       disabled={loading}
//       className="mt-3 px-6 py-2 bg-orange-600 hover:bg-orange-700 text-white rounded-lg text-sm font-medium"
//     >
//       Refresh List
//     </button>
//   </div>
// )}
//           </div>
//         )}
//       </motion.div>
//     </div>
//   );
// }





// src/pages/Referrals.jsx
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  UsersIcon,
  ShareIcon,
  TrophyIcon,
  UserGroupIcon,
  ClipboardDocumentIcon,
  CurrencyDollarIcon,
} from '@heroicons/react/24/solid';
import QRCode from 'react-qr-code';
import { userService } from '../../api/userApi';
import { useTheme } from '../ui/ThemeContext';

export default function Referrals() {
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  const [copiedCode, setCopiedCode] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [stats, setStats] = useState({
    referralCode: '',
    referralLink: '',
    totalReferrals: 0,
    completedReferrals: 0,
    pendingReferrals: 0,
    totalReferralEarnings: 0,
  });
  const [referredUsers, setReferredUsers] = useState([]);
  const [history, setHistory] = useState([]);
  const [historyLoading, setHistoryLoading] = useState(false);

  const tiers = [
    { level: 1, req: 5,   reward: '50 USDT Bonus' },
    { level: 2, req: 15,  reward: '200 USDT + 5% lifetime boost' },
    { level: 3, req: 30,  reward: '500 USDT + 10% lifetime boost' },
    { level: 4, req: 50,  reward: '1500 USDT + VIP access' },
  ];

  const fetchReferralData = async () => {
    try {
      setLoading(true);
      setError('');

      const statsRes = await userService.getReferralStats();

      if (!statsRes.success || !statsRes.data) {
        throw new Error('Invalid stats response');
      }

      const data = statsRes.data;

      setStats({
        referralCode: data.referralCode || '',
        referralLink: data.referralLink || '',
        totalReferrals: data.totalReferrals || 0,
        completedReferrals: data.completedReferrals || 0,
        pendingReferrals: data.pendingReferrals || 0,
        totalReferralEarnings: data.totalReferralEarnings || 0,
      });

      // Map referred users (adjust fields as per your real response)
      const users = (data.referredUsers || []).map((u, idx) => ({
        id: u._id || `ref-${idx}`,
        email: u.email || '—',
        status: u.status || 'pending',
        bonusEarned: u.bonusEarned || 0,
        referralDate: u.referralDate || u.createdAt || null,
      }));

      setReferredUsers(users);

      // Optional: also load history (earnings transactions)
      await loadReferralHistory();
    } catch (err) {
      console.error(err);
      setError('Failed to load referral information. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const loadReferralHistory = async () => {
    try {
      setHistoryLoading(true);
      const res = await userService.getReferralHistory({ limit: 12, skip: 0 });
      if (res.success && Array.isArray(res.data)) {
        const sorted = [...res.data].sort((a, b) =>
          new Date(b.createdAt) - new Date(a.createdAt)
        );
        setHistory(sorted);
      }
    } catch (err) {
      console.warn('Referral history failed to load', err);
      // non-critical → don't show error to user
    } finally {
      setHistoryLoading(false);
    }
  };

  useEffect(() => {
    fetchReferralData();
  }, []);

  const copyCode = () => {
    if (!stats.referralCode) return;
    navigator.clipboard.writeText(stats.referralCode);
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2200);
  };

  const copyLink = () => {
    if (!stats.referralLink) return;
    navigator.clipboard.writeText(stats.referralLink);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2200);
  };

  const currentTier = tiers.reduce(
    (acc, tier) => (stats.totalReferrals >= tier.req ? tier.level : acc),
    0
  );

  const displayTier = currentTier > 0 ? `Level ${currentTier}` : 'Beginner';

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-950 flex items-center justify-center">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1.2, repeat: Infinity, ease: 'linear' }}
          className="w-12 h-12 border-4 border-orange-500 border-t-transparent rounded-full"
        />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 text-gray-900 dark:text-gray-100 p-4 sm:p-6 lg:p-8 transition-colors duration-300">
      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-3xl sm:text-4xl font-bold mb-8 text-orange-600 dark:text-orange-400 text-center"
      >
        Referral Program
      </motion.h1>

      {error && (
        <div className="max-w-3xl mx-auto mb-8 p-5 bg-red-50 dark:bg-red-950/40 border border-red-200 dark:border-red-800/60 rounded-2xl text-red-700 dark:text-red-300 text-center shadow-sm">
          {error}
        </div>
      )}

      {/* Stats Cards */}
      <motion.div
        initial={{ opacity: 0, scale: 0.98 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-white dark:bg-gray-900 p-6 sm:p-8 rounded-2xl border border-gray-200 dark:border-gray-800/60 shadow-md grid grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6 text-center mb-10"
      >
        <div>
          <UsersIcon className="w-10 h-10 mx-auto text-orange-600 dark:text-orange-500 mb-3" />
          <p className="text-3xl font-bold">{stats.totalReferrals}</p>
          <p className="text-gray-600 dark:text-gray-400 text-sm mt-1">Total Referrals</p>
        </div>
        <div>
          <TrophyIcon className="w-10 h-10 mx-auto text-orange-600 dark:text-orange-500 mb-3" />
          <p className="text-3xl font-bold">{displayTier}</p>
          <p className="text-gray-600 dark:text-gray-400 text-sm mt-1">Your Tier</p>
        </div>
        <div>
          <CurrencyDollarIcon className="w-10 h-10 mx-auto text-orange-600 dark:text-orange-500 mb-3" />
          <p className="text-3xl font-bold">${stats.totalReferralEarnings}</p>
          <p className="text-gray-600 dark:text-gray-400 text-sm mt-1">Earnings</p>
        </div>
        <div>
          <ClipboardDocumentIcon className="w-10 h-10 mx-auto text-orange-600 dark:text-orange-500 mb-3" />
          <p className="text-lg font-mono font-semibold break-all">{stats.referralCode || '—'}</p>
          <p className="text-gray-600 dark:text-gray-400 text-sm mt-1">Referral Code</p>
        </div>
      </motion.div>

      {/* Copy & QR */}
      <div className="max-w-3xl mx-auto mb-12 space-y-8">
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button
            onClick={copyCode}
            disabled={!stats.referralCode}
            className={`flex-1 max-w-xs py-3.5 px-6 rounded-xl font-medium flex items-center justify-center gap-3 transition-all shadow-md ${
              copiedCode
                ? 'bg-green-600 text-white'
                : stats.referralCode
                ? 'bg-orange-600 hover:bg-orange-700 text-white'
                : 'bg-gray-400 cursor-not-allowed text-gray-700'
            }`}
          >
            {copiedCode ? 'Code Copied!' : 'Copy Code'}
          </button>

          <button
            onClick={copyLink}
            disabled={!stats.referralLink}
            className={`flex-1 max-w-xs py-3.5 px-6 rounded-xl font-medium flex items-center justify-center gap-3 transition-all shadow-md ${
              copiedLink
                ? 'bg-green-600 text-white'
                : stats.referralLink
                ? 'bg-orange-600 hover:bg-orange-700 text-white'
                : 'bg-gray-400 cursor-not-allowed text-gray-700'
            }`}
          >
            {copiedLink ? 'Link Copied!' : 'Copy Link'}
          </button>
        </div>

        {stats.referralLink && (
          <div className="flex justify-center">
            <div className={`p-6 rounded-2xl shadow-xl border ${isDark ? 'bg-white' : 'bg-white'}`}>
              <QRCode
                value={stats.referralLink}
                size={200}
                level="H"
                fgColor="#ea580c"
                bgColor="#ffffff"
              />
            </div>
          </div>
        )}
      </div>

      {/* Referred Users */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="bg-white dark:bg-gray-900 p-6 sm:p-8 rounded-2xl border border-gray-200 dark:border-gray-800/60 shadow-md mb-10"
      >
        <h2 className="text-2xl sm:text-3xl font-semibold mb-6 text-orange-600 dark:text-orange-300 flex items-center gap-3">
          <UserGroupIcon className="w-8 h-8" />
          Referred Users ({stats.totalReferrals})
        </h2>

        {referredUsers.length === 0 ? (
          <div className="text-center py-12 text-gray-500 dark:text-gray-400 bg-gray-50 dark:bg-gray-800/40 rounded-xl border border-dashed">
            <UsersIcon className="w-14 h-14 mx-auto mb-4 opacity-60" />
            <p className="text-lg font-medium">No referrals yet</p>
            <p className="mt-2 max-w-md mx-auto">
              Share your code or link — new users may take a few minutes to appear after signup.
            </p>
          </div>
        ) : (
          <div className="space-y-4 divide-y divide-gray-200 dark:divide-gray-700">
            {referredUsers.map((user) => (
              <div
                key={user.id}
                className="pt-4 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4"
              >
                <div>
                  <p className="font-medium text-gray-900 dark:text-white">
                    {user.email}
                  </p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Joined: {user.referralDate ? new Date(user.referralDate).toLocaleDateString() : '—'}
                  </p>
                </div>
                <div className="text-right">
                  <p className={`font-semibold ${user.status === 'completed' ? 'text-green-600 dark:text-green-400' : 'text-amber-600 dark:text-amber-400'}`}>
                    {user.status?.toUpperCase() || 'PENDING'}
                  </p>
                  {user.bonusEarned > 0 && (
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      +${user.bonusEarned} earned
                    </p>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </motion.div>

      {/* Referral Earnings History (optional but recommended) */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="bg-white dark:bg-gray-900 p-6 sm:p-8 rounded-2xl border border-gray-200 dark:border-gray-800/60 shadow-md"
      >
        <h2 className="text-2xl font-semibold mb-6 text-orange-600 dark:text-orange-300 flex items-center gap-3">
          <CurrencyDollarIcon className="w-8 h-8" />
          Referral Earnings History
        </h2>

        {historyLoading ? (
          <p className="text-center py-8 text-gray-500">Loading...</p>
        ) : history.length === 0 ? (
          <div className="text-center py-10 text-gray-500 dark:text-gray-400">
            <p>No earnings recorded yet</p>
          </div>
        ) : (
          <div className="space-y-4">
            {history.slice(0, 8).map((txn) => (   // showing latest 8 only
              <div
                key={txn._id}
                className="p-4 bg-gray-50 dark:bg-gray-800/50 rounded-xl flex justify-between items-center"
              >
                <div>
                  <p className="font-medium">{txn.description || 'Referral bonus'}</p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    {new Date(txn.createdAt).toLocaleString()}
                  </p>
                </div>
                <p className="font-semibold text-green-600 dark:text-green-400">
                  +${txn.amount}
                </p>
              </div>
            ))}
          </div>
        )}
      </motion.div>
    </div>
  );
}