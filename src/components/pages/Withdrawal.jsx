





// // Withdrawal.jsx
// import React, { useState, useEffect } from 'react';
// import { motion } from 'framer-motion';
// import { createWithdrawal, getWithdrawals } from '../../api/withdrawlApi';
// import { apiClient } from '../../api/apiClient'; // for profile
// import { useTheme } from '../ui/ThemeContext';

// export default function Withdrawal() {
//   const { theme } = useTheme();

//   const [amount, setAmount] = useState('');
//   const [cryptocurrency, setCryptocurrency] = useState('USDT');
//   const [address, setAddress] = useState('');
//   const [balance, setBalance] = useState(0); // user balance from profile
//   const [withdrawals, setWithdrawals] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [historyLoading, setHistoryLoading] = useState(true);
//   const [message, setMessage] = useState('');
//   const [error, setError] = useState('');

//   const cryptoOptions = [
//     { value: 'BTC', label: 'Bitcoin (BTC)' },
//     { value: 'ETH', label: 'Ethereum (ETH)' },
//     { value: 'USDT', label: 'Tether (USDT)' },
//     { value: 'BNB', label: 'Binance Coin (BNB)' },
//     { value: 'SOL', label: 'Solana (SOL)' },
//   ];

//   useEffect(() => {
//     fetchProfile();
//     fetchHistory();
//   }, []);

//   // Fetch user profile to get total earnings
//   const fetchProfile = async () => {
//     try {
//       const res = await apiClient.get('/api/users/profile');
//       if (res?.data?.data) {
//         setBalance(res.data.data.totalEarnings || 0);
//       }
//     } catch (err) {
//       console.error('Failed to fetch profile', err);
//       setBalance(0);
//     }
//   };

//   const fetchHistory = async () => {
//     try {
//       setHistoryLoading(true);
//       const res = await getWithdrawals();
//       if (res.success && Array.isArray(res.data)) {
//         setWithdrawals(res.data);
//       } else {
//         setWithdrawals([]);
//       }
//     } catch (err) {
//       console.error(err);
//       setWithdrawals([]);
//     } finally {
//       setHistoryLoading(false);
//     }
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setMessage('');
//     setError('');

//     const parsedAmount = parseFloat(amount);
//     if (isNaN(parsedAmount) || parsedAmount <= 0) {
//       setError('Please enter a valid amount greater than 0');
//       return;
//     }

//     if (!address.trim()) {
//       setError('Wallet address is required');
//       return;
//     }

//     if (parsedAmount > balance) {
//       setError(`Insufficient earnings. Available: ${balance.toFixed(8)} ${cryptocurrency}`);
//       return;
//     }

//     setLoading(true);
//     try {
//       const payload = {
//         amount: parseFloat(parsedAmount.toFixed(8)),
//         cryptocurrency,
//         walletAddress: address.trim(),
//       };

//       console.log('Creating withdrawal request:', payload);

//       const res = await createWithdrawal(payload);
//       console.log('Withdrawal response:', res);

//       if (res?.message) {
//         setError(res.message);
//       } else if (res?.success) {
//         setMessage('Withdrawal request submitted! (Pending admin approval)');
//         setAmount('');
//         setAddress('');
//         setCryptocurrency('USDT');
//         fetchHistory();
//         fetchProfile(); // refresh balance
//       } else {
//         setError('Failed to submit withdrawal. Try again.');
//       }
//     } catch (err) {
//       console.error('Withdrawal API error:', err);
//       setError(err.response?.data?.message || err.message || 'Server error');
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="min-h-screen p-6 bg-gray-50 dark:bg-gray-950 text-gray-900 dark:text-white transition-colors duration-300">
//       <motion.h1
//         initial={{ opacity: 0, y: -20 }}
//         animate={{ opacity: 1, y: 0 }}
//         className="text-3xl md:text-4xl font-bold mb-4 text-center text-orange-600 dark:text-orange-400"
//       >
//         Withdraw Earnings
//       </motion.h1>

//       <p className="text-center mb-6 text-gray-700 dark:text-gray-300">
//         Available Earnings: <span className="font-semibold">{balance.toFixed(8)} {cryptocurrency}</span>
//       </p>

//       <div className="max-w-4xl mx-auto space-y-10">
//         {/* Withdrawal Form */}
//         <motion.div
//           initial={{ opacity: 0, scale: 0.98 }}
//           animate={{ opacity: 1, scale: 1 }}
//           className="bg-white dark:bg-gray-900/95 p-6 sm:p-8 rounded-2xl border border-gray-200 dark:border-gray-800/60 shadow-lg dark:shadow-2xl transition-all duration-300"
//         >
//           <form onSubmit={handleSubmit} className="space-y-6">
//             <div>
//               <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
//                 Amount (from profits)
//               </label>
//               <input
//                 type="number"
//                 min="0"
//                 step="any"
//                 value={amount}
//                 onChange={(e) => setAmount(e.target.value)}
//                 placeholder="0.005"
//                 disabled={loading}
//                 className="w-full px-4 py-3.5 sm:px-5 sm:py-4 bg-gray-100 dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-xl text-gray-900 dark:text-white placeholder-gray-500 focus:border-orange-500 focus:ring-2 focus:ring-orange-500/30 outline-none transition"
//               />
//             </div>

//             <div>
//               <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
//                 Cryptocurrency
//               </label>
//               <select
//                 value={cryptocurrency}
//                 onChange={(e) => setCryptocurrency(e.target.value)}
//                 disabled={loading}
//                 className="w-full px-4 py-3.5 sm:px-5 sm:py-4 bg-gray-100 dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-xl text-gray-900 dark:text-white focus:border-orange-500 focus:ring-2 focus:ring-orange-500/30 outline-none transition"
//               >
//                 {cryptoOptions.map((opt) => (
//                   <option key={opt.value} value={opt.value}>
//                     {opt.label}
//                   </option>
//                 ))}
//               </select>
//             </div>

//             <div>
//               <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
//                 Wallet Address
//               </label>
//               <input
//                 type="text"
//                 value={address}
//                 onChange={(e) => setAddress(e.target.value)}
//                 placeholder="Enter your wallet address"
//                 disabled={loading}
//                 className="w-full px-4 py-3.5 sm:px-5 sm:py-4 bg-gray-100 dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-xl text-gray-900 dark:text-white placeholder-gray-500 focus:border-orange-500 focus:ring-2 focus:ring-orange-500/30 outline-none transition"
//               />
//             </div>

//             <button
//               type="submit"
//               disabled={loading || !amount || parseFloat(amount) <= 0 || !address.trim()}
//               className={`w-full py-4 px-6 bg-orange-600 hover:bg-orange-700 dark:bg-orange-600 dark:hover:bg-orange-500 text-white font-semibold rounded-xl transition transform hover:scale-[1.015] shadow-md active:scale-[0.98] ${
//                 loading || !amount || parseFloat(amount) <= 0 || !address.trim()
//                   ? 'opacity-60 cursor-not-allowed'
//                   : ''
//               }`}
//             >
//               {loading ? 'Processing...' : 'Request Withdrawal'}
//             </button>
//           </form>

//           {message && <p className="mt-6 text-center text-green-600 dark:text-green-400 font-medium">{message}</p>}
//           {error && <p className="mt-6 text-center text-red-600 dark:text-red-400 font-medium">{error}</p>}
//         </motion.div>

//         {/* Withdrawal History */}
//         <motion.div
//           initial={{ opacity: 0 }}
//           animate={{ opacity: 1 }}
//           transition={{ delay: 0.2 }}
//           className="bg-white dark:bg-gray-900/95 p-6 sm:p-8 rounded-2xl border border-gray-200 dark:border-gray-800/60 shadow-lg dark:shadow-2xl transition-all duration-300"
//         >
//           <h2 className="text-2xl font-semibold mb-6 text-gray-800 dark:text-gray-200">Withdrawal History</h2>

//           {historyLoading ? (
//             <p className="text-center text-gray-500 dark:text-gray-400 py-8">Loading...</p>
//           ) : withdrawals.length === 0 ? (
//             <p className="text-center text-gray-500 dark:text-gray-400 py-10">No withdrawal requests yet.</p>
//           ) : (
//             <div className="space-y-4">
//               {withdrawals.map((wd) => (
//                 <div
//                   key={wd.id || wd._id}
//                   className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 p-4 bg-gray-50 dark:bg-gray-800/60 rounded-xl border border-gray-200 dark:border-gray-700/50 transition-colors"
//                 >
//                   <div className="space-y-1">
//                     <p className="font-medium text-gray-900 dark:text-white">
//                       {wd.cryptoAmount ?? wd.amount} {wd.cryptocurrency}
//                     </p>
//                     <p className="text-sm text-gray-500 dark:text-gray-400 font-mono">
//                       {wd.walletAddress?.slice(0, 8)}…{wd.walletAddress?.slice(-6)}
//                     </p>
//                   </div>
//                   <div className="text-right sm:min-w-[140px]">
//                     <p
//                       className={`font-semibold ${
//                         wd.status === 'pending'
//                           ? 'text-orange-600 dark:text-orange-400'
//                           : wd.status === 'approved'
//                           ? 'text-green-600 dark:text-green-400'
//                           : 'text-red-600 dark:text-red-400'
//                       }`}
//                     >
//                       {wd.status?.toUpperCase() || 'PENDING'}
//                     </p>
//                     <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
//                       {wd.createdAt ? new Date(wd.createdAt).toLocaleDateString('en-GB') : '—'}
//                     </p>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           )}
//         </motion.div>
//       </div>
//     </div>
//   );
// }





// // Withdrawal.jsx
// import React, { useState, useEffect } from 'react';
// import { motion } from 'framer-motion';
// import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/solid';
// import { createWithdrawal, getWithdrawals } from '../../api/withdrawlApi';
// import { apiClient } from '../../api/apiClient';
// import { useTheme } from '../ui/ThemeContext';

// export default function Withdrawal() {
//   const { theme } = useTheme();
//   const isDark = theme === 'dark';

//   const [amount, setAmount] = useState('');
//   const [cryptocurrency, setCryptocurrency] = useState('USDT');
//   const [address, setAddress] = useState('');
//   const [balance, setBalance] = useState(0);
//   const [withdrawals, setWithdrawals] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [historyLoading, setHistoryLoading] = useState(true);
//   const [message, setMessage] = useState('');
//   const [error, setError] = useState('');

//   // ── Pagination state ─────────────────────────────────────────
//   const [currentPage, setCurrentPage] = useState(1);
//   const itemsPerPage = 6; // adjust as preferred

//   const cryptoOptions = [
//     { value: 'BTC', label: 'Bitcoin (BTC)' },
//     { value: 'ETH', label: 'Ethereum (ETH)' },
//     { value: 'USDT', label: 'Tether (USDT)' },
//     { value: 'BNB', label: 'Binance Coin (BNB)' },
//     { value: 'SOL', label: 'Solana (SOL)' },
//   ];

//   useEffect(() => {
//     fetchProfile();
//     fetchHistory();
//   }, []);

//   const fetchProfile = async () => {
//     try {
//       const res = await apiClient.get('/api/users/profile');
//       if (res?.data?.data) {
//         setBalance(res.data.data.totalEarnings || 0);
//       }
//     } catch (err) {
//       console.error('Failed to fetch profile', err);
//       setBalance(0);
//     }
//   };

//   const fetchHistory = async () => {
//     try {
//       setHistoryLoading(true);
//       const res = await getWithdrawals();
//       if (res.success && Array.isArray(res.data)) {
//         // Sort newest first
//         const sorted = [...res.data].sort((a, b) =>
//           new Date(b.createdAt) - new Date(a.createdAt)
//         );
//         setWithdrawals(sorted);
//         setCurrentPage(1); // reset to page 1 after refresh
//       } else {
//         setWithdrawals([]);
//       }
//     } catch (err) {
//       console.error(err);
//       setWithdrawals([]);
//     } finally {
//       setHistoryLoading(false);
//     }
//   };

//   // ── Pagination calculation ───────────────────────────────────
//   const indexOfLastItem = currentPage * itemsPerPage;
//   const indexOfFirstItem = indexOfLastItem - itemsPerPage;
//   const currentItems = withdrawals.slice(indexOfFirstItem, indexOfLastItem);
//   const totalPages = Math.ceil(withdrawals.length / itemsPerPage);

//   const paginate = (pageNumber) => {
//     if (pageNumber < 1 || pageNumber > totalPages) return;
//     setCurrentPage(pageNumber);
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setMessage('');
//     setError('');

//     const parsedAmount = parseFloat(amount);
//     if (isNaN(parsedAmount) || parsedAmount <= 0) {
//       setError('Please enter a valid amount greater than 0');
//       return;
//     }

//     // Optional: add minimum withdrawal check
//     if (parsedAmount < 10) {
//       setError('Minimum withdrawal amount is 10 USDT (or equivalent)');
//       return;
//     }

//     if (!address.trim()) {
//       setError('Wallet address is required');
//       return;
//     }

//     if (parsedAmount > balance) {
//       setError(`Insufficient earnings. Available: ${balance.toFixed(8)}`);
//       return;
//     }

//     setLoading(true);
//     try {
//       const payload = {
//         amount: Number(parsedAmount.toFixed(8)),
//         cryptocurrency,
//         walletAddress: address.trim(),
//       };

//       const res = await createWithdrawal(payload);

//       if (res?.success) {
//         setMessage('Withdrawal request submitted! (Pending admin approval)');
//         setAmount('');
//         setAddress('');
//         setCryptocurrency('USDT');
//         fetchHistory();
//         fetchProfile();
//       } else {
//         setError(res?.message || 'Failed to submit withdrawal');
//       }
//     } catch (err) {
//       setError(err.response?.data?.message || 'Server error');
//     } finally {
//       setLoading(false);
//     }
//   };

//   const shortenAddress = (addr) =>
//     addr ? `${addr.slice(0, 8)}…${addr.slice(-6)}` : '—';

//   return (
//     <div className="min-h-screen p-6 bg-gray-50 dark:bg-gray-950 text-gray-900 dark:text-white transition-colors duration-300">
//       <motion.h1
//         initial={{ opacity: 0, y: -20 }}
//         animate={{ opacity: 1, y: 0 }}
//         className="text-3xl md:text-4xl font-bold mb-4 text-center text-orange-600 dark:text-orange-400"
//       >
//         Withdraw Earnings
//       </motion.h1>

//       <p className="text-center mb-8 text-gray-700 dark:text-gray-300">
//         Available Earnings:{' '}
//         <span className="font-semibold">{balance.toFixed(8)}</span>
//       </p>

//       <div className="max-w-4xl mx-auto space-y-10">
//         {/* ── Withdrawal Form ────────────────────────────────────── */}
//         <motion.div
//           initial={{ opacity: 0, scale: 0.98 }}
//           animate={{ opacity: 1, scale: 1 }}
//           className="bg-white dark:bg-gray-900/95 p-6 sm:p-8 rounded-2xl border border-gray-200 dark:border-gray-800/60 shadow-lg dark:shadow-2xl transition-all duration-300"
//         >
//           <form onSubmit={handleSubmit} className="space-y-6">
//             <div>
//               <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
//                 Amount (from profits)
//               </label>
//               <input
//                 type="number"
//                 min="0"
//                 step="any"
//                 value={amount}
//                 onChange={(e) => setAmount(e.target.value)}
//                 placeholder="0.005"
//                 disabled={loading}
//                 className="w-full px-4 py-3.5 sm:px-5 sm:py-4 bg-gray-100 dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-xl text-gray-900 dark:text-white placeholder-gray-500 focus:border-orange-500 focus:ring-2 focus:ring-orange-500/30 outline-none transition"
//               />
//             </div>

//             <div>
//               <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
//                 Cryptocurrency
//               </label>
//               <select
//                 value={cryptocurrency}
//                 onChange={(e) => setCryptocurrency(e.target.value)}
//                 disabled={loading}
//                 className="w-full px-4 py-3.5 sm:px-5 sm:py-4 bg-gray-100 dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-xl text-gray-900 dark:text-white focus:border-orange-500 focus:ring-2 focus:ring-orange-500/30 outline-none transition"
//               >
//                 {cryptoOptions.map((opt) => (
//                   <option key={opt.value} value={opt.value}>
//                     {opt.label}
//                   </option>
//                 ))}
//               </select>
//             </div>

//             <div>
//               <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
//                 Wallet Address
//               </label>
//               <input
//                 type="text"
//                 value={address}
//                 onChange={(e) => setAddress(e.target.value)}
//                 placeholder="Enter your wallet address"
//                 disabled={loading}
//                 className="w-full px-4 py-3.5 sm:px-5 sm:py-4 bg-gray-100 dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-xl text-gray-900 dark:text-white placeholder-gray-500 focus:border-orange-500 focus:ring-2 focus:ring-orange-500/30 outline-none transition"
//               />
//             </div>

//             <button
//               type="submit"
//               disabled={loading || !amount || parseFloat(amount) <= 0 || !address.trim()}
//               className={`w-full py-4 px-6 bg-orange-600 hover:bg-orange-700 dark:bg-orange-600 dark:hover:bg-orange-500 text-white font-semibold rounded-xl transition transform hover:scale-[1.015] shadow-md active:scale-[0.98] ${
//                 loading || !amount || parseFloat(amount) <= 0 || !address.trim()
//                   ? 'opacity-60 cursor-not-allowed'
//                   : ''
//               }`}
//             >
//               {loading ? 'Processing...' : 'Request Withdrawal'}
//             </button>
//           </form>

//           {message && (
//             <p className="mt-6 text-center text-green-600 dark:text-green-400 font-medium">
//               {message}
//             </p>
//           )}
//           {error && (
//             <p className="mt-6 text-center text-red-600 dark:text-red-400 font-medium">
//               {error}
//             </p>
//           )}
//         </motion.div>

//         {/* ── Withdrawal History with Pagination ────────────────── */}
//         <motion.div
//           initial={{ opacity: 0 }}
//           animate={{ opacity: 1 }}
//           transition={{ delay: 0.2 }}
//           className="bg-white dark:bg-gray-900/95 p-6 sm:p-8 rounded-2xl border border-gray-200 dark:border-gray-800/60 shadow-lg dark:shadow-2xl transition-all duration-300"
//         >
//           <h2 className="text-2xl font-semibold mb-6 text-gray-800 dark:text-gray-200">
//             Withdrawal History
//           </h2>

//           {historyLoading ? (
//             <p className="text-center text-gray-500 dark:text-gray-400 py-8">
//               Loading...
//             </p>
//           ) : withdrawals.length === 0 ? (
//             <p className="text-center text-gray-500 dark:text-gray-400 py-10">
//               No withdrawal requests yet.
//             </p>
//           ) : (
//             <>
//               <div className="space-y-4">
//                 {currentItems.map((wd) => (
//                   <div
//                     key={wd.id || wd._id}
//                     className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 p-4 bg-gray-50 dark:bg-gray-800/60 rounded-xl border border-gray-200 dark:border-gray-700/50 transition-colors"
//                   >
//                     <div className="space-y-1">
//                       <p className="font-medium text-gray-900 dark:text-white">
//                         {wd.amount?.toFixed(8) || '—'} {wd.cryptocurrency}
//                       </p>
//                       <p className="text-sm text-gray-500 dark:text-gray-400 font-mono">
//                         {shortenAddress(wd.walletAddress)}
//                       </p>
//                     </div>
//                     <div className="text-right sm:min-w-[140px]">
//                       <p
//                         className={`font-semibold ${
//                           wd.status === 'pending'
//                             ? 'text-orange-600 dark:text-orange-400'
//                             : wd.status === 'approved'
//                             ? 'text-green-600 dark:text-green-400'
//                             : 'text-red-600 dark:text-red-400'
//                         }`}
//                       >
//                         {wd.status?.toUpperCase() || 'PENDING'}
//                       </p>
//                       <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
//                         {wd.createdAt
//                           ? new Date(wd.createdAt).toLocaleString('en-GB', {
//                               dateStyle: 'medium',
//                               timeStyle: 'short',
//                             })
//                           : '—'}
//                       </p>
//                     </div>
//                   </div>
//                 ))}
//               </div>

//               {/* Pagination */}
//               {totalPages > 1 && (
//                 <div className="mt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
//                   <button
//                     onClick={() => paginate(currentPage - 1)}
//                     disabled={currentPage === 1}
//                     className={`flex items-center gap-1 px-5 py-2.5 rounded-xl font-medium transition-colors ${
//                       currentPage === 1
//                         ? 'opacity-50 cursor-not-allowed bg-gray-200 dark:bg-gray-700'
//                         : 'bg-orange-100 hover:bg-orange-200 dark:bg-orange-900/60 dark:hover:bg-orange-800/70 text-orange-700 dark:text-orange-300'
//                     }`}
//                   >
//                     <ChevronLeftIcon className="w-5 h-5" />
//                     Prev
//                   </button>

//                   <div className="flex gap-2 flex-wrap justify-center">
//                     {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
//                       <button
//                         key={page}
//                         onClick={() => paginate(page)}
//                         className={`w-10 h-10 rounded-xl font-medium transition-all ${
//                           page === currentPage
//                             ? 'bg-orange-600 text-white shadow-md'
//                             : 'bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-800 dark:text-gray-200'
//                         }`}
//                       >
//                         {page}
//                       </button>
//                     ))}
//                   </div>

//                   <button
//                     onClick={() => paginate(currentPage + 1)}
//                     disabled={currentPage === totalPages}
//                     className={`flex items-center gap-1 px-5 py-2.5 rounded-xl font-medium transition-colors ${
//                       currentPage === totalPages
//                         ? 'opacity-50 cursor-not-allowed bg-gray-200 dark:bg-gray-700'
//                         : 'bg-orange-100 hover:bg-orange-200 dark:bg-orange-900/60 dark:hover:bg-orange-800/70 text-orange-700 dark:text-orange-300'
//                     }`}
//                   >
//                     Next
//                     <ChevronRightIcon className="w-5 h-5" />
//                   </button>
//                 </div>
//               )}

//               {withdrawals.length > 0 && (
//                 <p className="mt-5 text-center text-sm text-gray-500 dark:text-gray-400">
//                   Showing {indexOfFirstItem + 1}–{Math.min(indexOfLastItem, withdrawals.length)} of{' '}
//                   {withdrawals.length}
//                 </p>
//               )}
//             </>
//           )}
//         </motion.div>
//       </div>
//     </div>
//   );
// }






import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  ClockIcon,
  CheckCircleIcon,
  XCircleIcon,
  DocumentDuplicateIcon,
  ExclamationTriangleIcon,
} from '@heroicons/react/24/solid';
import {
  createWithdrawalRequest,
  getWithdrawalHistory,
  cancelWithdrawal,
} from '../../api/withdrawlApi'; // adjust path if needed
import { useTheme } from '../ui/ThemeContext';

export default function Withdrawal() {
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  const [amount, setAmount] = useState('');
  const [cryptocurrency, setCryptocurrency] = useState('USDT');
  const [network, setNetwork] = useState('BSC');
  const [address, setAddress] = useState('');
  const [balance, setBalance] = useState(0);
  const [withdrawals, setWithdrawals] = useState([]);
  const [loading, setLoading] = useState(false);
  const [historyLoading, setHistoryLoading] = useState(true);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [copied, setCopied] = useState(false);

  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  const cryptoOptions = [
    { value: 'USDT', label: 'Tether (USDT)' },
    { value: 'BTC', label: 'Bitcoin (BTC)' },
    { value: 'ETH', label: 'Ethereum (ETH)' },
    { value: 'BNB', label: 'Binance Coin (BNB)' },
    { value: 'SOL', label: 'Solana (SOL)' },
  ];

  const networkOptions = [
    { value: 'BSC', label: 'BSC (Binance Smart Chain)' },
    { value: 'ERC20', label: 'ERC-20 (Ethereum)' },
    { value: 'TRC20', label: 'TRC-20 (Tron)' },
  ];

  useEffect(() => {
    fetchProfile();
    fetchHistory();
  }, []);

  const fetchProfile = async () => {
    try {
      const res = await fetch('/api/users/profile'); // or use apiClient if you have it
      const data = await res.json();
      if (data?.success) {
        setBalance(Number(data.data.balance || data.data.totalEarnings || 0));
      }
    } catch (err) {
      console.error('Failed to fetch profile:', err);
      setBalance(0);
    }
  };

  const fetchHistory = async () => {
    try {
      setHistoryLoading(true);
      const res = await getWithdrawalHistory({ limit: 50 });
      let list = res?.data?.data || res?.data || res?.withdrawals || [];

      const sorted = [...list].sort((a, b) =>
        new Date(b.createdAt || b.updatedAt || 0) - new Date(a.createdAt || a.updatedAt || 0)
      );

      setWithdrawals(sorted);
      setCurrentPage(1);
    } catch (err) {
      console.error('History fetch failed:', err);
      setWithdrawals([]);
    } finally {
      setHistoryLoading(false);
    }
  };

  // Pagination
  const totalPages = Math.ceil(withdrawals.length / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = withdrawals.slice(indexOfFirstItem, indexOfLastItem);

  const paginate = (page) => {
    if (page < 1 || page > totalPages) return;
    setCurrentPage(page);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');
    setError('');

    const parsedAmount = parseFloat(amount);
    if (isNaN(parsedAmount) || parsedAmount <= 0) {
      setError('Please enter a valid amount');
      return;
    }

    if (parsedAmount < 50) {
      setError('Minimum withdrawal is 10 USDT');
      return;
    }

    if (parsedAmount > balance) {
      setError(`Insufficient balance. You have ${balance.toFixed(8)} available`);
      return;
    }

    if (!address.trim()) {
      setError('Wallet address is required');
      return;
    }

    setLoading(true);

    try {
      const payload = {
        amount: parsedAmount,
        cryptocurrency,
        network,
        userWalletAddress: address.trim(),
      };

      const res = await createWithdrawalRequest(payload);

      if (res?.success) {
        setMessage('Withdrawal request submitted! Awaiting admin approval.');
        setAmount('');
        setAddress('');
        fetchHistory();
        fetchProfile();
      } else {
        setError(res?.message || 'Failed to submit request');
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Something went wrong. Try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = async (withdrawalId) => {
    if (!window.confirm('Cancel this withdrawal request?')) return;

    try {
      const res = await cancelWithdrawal(withdrawalId);
      if (res?.success) {
        setMessage('Withdrawal request cancelled successfully.');
        fetchHistory();
      } else {
        setError(res?.message || 'Failed to cancel');
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Cancel failed');
    }
  };

  const shortenAddress = (addr) =>
    addr ? `${addr.slice(0, 8)}…${addr.slice(-6)}` : '—';

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const getStatusStyle = (status) => {
    const s = status?.toLowerCase();
    if (s === 'pending') return 'text-amber-500 dark:text-amber-400';
    if (s === 'approved' || s === 'completed') return 'text-emerald-600 dark:text-emerald-400';
    if (s === 'rejected' || s === 'cancelled') return 'text-red-600 dark:text-red-400';
    return 'text-gray-500 dark:text-gray-400';
  };

  const canCancel = (status) => ['pending'].includes(status?.toLowerCase());

  return (
    <div className={`min-h-screen p-5 sm:p-6 transition-colors ${isDark ? 'bg-slate-950 text-white' : 'bg-gray-50 text-gray-900'}`}>
      <div className="max-w-4xl mx-auto space-y-10">

        {/* Header */}
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-3xl md:text-4xl font-bold text-center text-orange-600 dark:text-orange-400"
        >
          Withdraw Earnings, Victor
        </motion.h1>

        <p className="text-center text-lg font-medium">
          Available Balance: <span className="text-emerald-600 dark:text-emerald-400">{balance.toFixed(8)} USDT</span>
        </p>

        {/* Form */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className={`rounded-3xl p-6 sm:p-8 border shadow-xl ${isDark ? 'bg-black/40 border-orange-700/30 backdrop-blur-md' : 'bg-white border-gray-200 shadow-lg'}`}
        >
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">
                Amount (USDT)
              </label>
              <input
                type="number"
                step="any"
                min="50"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                placeholder="Minimum 50 USDT"
                disabled={loading}
                className={`w-full px-5 py-4 rounded-xl border focus:outline-none focus:ring-2 transition-all ${
                  isDark
                    ? 'bg-slate-900 border-orange-700/40 text-white focus:border-orange-500 focus:ring-orange-500/25'
                    : 'bg-white border-gray-300 focus:border-orange-500 focus:ring-orange-400/25'
                }`}
              />
              {amount && parseFloat(amount) > balance && (
                <p className="mt-2 text-sm text-red-600 dark:text-red-400">
                  Amount exceeds available balance ({balance.toFixed(8)} USDT)
                </p>
              )}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">
                  Cryptocurrency
                </label>
                <select
                  value={cryptocurrency}
                  onChange={(e) => setCryptocurrency(e.target.value)}
                  disabled={loading}
                  className={`w-full px-5 py-4 rounded-xl border focus:outline-none focus:ring-2 transition-all ${
                    isDark
                      ? 'bg-slate-900 border-orange-700/40 text-white focus:border-orange-500 focus:ring-orange-500/25'
                      : 'bg-white border-gray-300 focus:border-orange-500 focus:ring-orange-400/25'
                  }`}
                >
                  {cryptoOptions.map((opt) => (
                    <option key={opt.value} value={opt.value}>
                      {opt.label}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">
                  Network
                </label>
                <select
                  value={network}
                  onChange={(e) => setNetwork(e.target.value)}
                  disabled={loading}
                  className={`w-full px-5 py-4 rounded-xl border focus:outline-none focus:ring-2 transition-all ${
                    isDark
                      ? 'bg-slate-900 border-orange-700/40 text-white focus:border-orange-500 focus:ring-orange-500/25'
                      : 'bg-white border-gray-300 focus:border-orange-500 focus:ring-orange-400/25'
                  }`}
                >
                  {networkOptions.map((opt) => (
                    <option key={opt.value} value={opt.value}>
                      {opt.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">
                Your Wallet Address
              </label>
              <div className="relative">
                <input
                  type="text"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  placeholder="Enter your receiving wallet address"
                  disabled={loading}
                  className={`w-full px-5 py-4 rounded-xl border focus:outline-none focus:ring-2 transition-all pr-12 ${
                    isDark
                      ? 'bg-slate-900 border-orange-700/40 text-white focus:border-orange-500 focus:ring-orange-500/25'
                      : 'bg-white border-gray-300 focus:border-orange-500 focus:ring-orange-400/25'
                  }`}
                />
                {address && (
                  <button
                    type="button"
                    onClick={() => copyToClipboard(address)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-orange-500"
                  >
                    {copied ? (
                      <CheckCircleIcon className="w-5 h-5 text-green-500" />
                    ) : (
                      <DocumentDuplicateIcon className="w-5 h-5" />
                    )}
                  </button>
                )}
              </div>
            </div>

            <button
              type="submit"
              disabled={loading || !amount || parseFloat(amount) < 10 || parseFloat(amount) > balance || !address.trim()}
              className={`w-full py-4 px-6 rounded-xl font-semibold text-white transition transform hover:scale-[1.015] shadow-lg ${
                loading || !amount || parseFloat(amount) < 10 || parseFloat(amount) > balance || !address.trim()
                  ? 'bg-orange-400 cursor-not-allowed'
                  : 'bg-orange-600 hover:bg-orange-700'
              }`}
            >
              {loading ? 'Processing...' : 'Request Withdrawal'}
            </button>
          </form>

          <AnimatePresence>
            {message && (
              <motion.p
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-6 text-center text-green-600 dark:text-green-400 font-medium"
              >
                {message}
              </motion.p>
            )}
            {error && (
              <motion.p
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-6 text-center text-red-600 dark:text-red-400 font-medium flex items-center justify-center gap-2"
              >
                <ExclamationTriangleIcon className="w-5 h-5" /> {error}
              </motion.p>
            )}
          </AnimatePresence>
        </motion.div>

        {/* History */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className={`rounded-3xl p-6 sm:p-8 border shadow-xl ${isDark ? 'bg-black/40 border-orange-700/30 backdrop-blur-md' : 'bg-white border-gray-200 shadow-lg'}`}
        >
          <h2 className="text-2xl font-bold mb-6 text-orange-600 dark:text-orange-400">
            Withdrawal History
          </h2>

          {historyLoading ? (
            <div className="flex justify-center py-12">
              <div className="animate-spin rounded-full h-10 w-10 border-t-4 border-orange-500"></div>
            </div>
          ) : withdrawals.length === 0 ? (
            <p className="text-center py-10 text-gray-500 dark:text-gray-400">
              No withdrawal requests yet
            </p>
          ) : (
            <>
              <div className="space-y-4">
                {currentItems.map((wd) => (
                  <div
                    key={wd._id}
                    className={`p-5 rounded-xl border flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 ${
                      isDark ? 'bg-slate-900/60 border-orange-900/30' : 'bg-gray-50 border-gray-200'
                    }`}
                  >
                    <div className="space-y-1 flex-1">
                      <p className="font-semibold text-lg">
                        {wd.amount?.toFixed(8) || '—'} {wd.cryptocurrency} ({wd.network})
                      </p>
                      <p className="text-sm font-mono text-gray-500 dark:text-gray-400 break-all">
                        {shortenAddress(wd.userWalletAddress)}
                      </p>
                    </div>

                    <div className="flex flex-col items-end gap-2">
                      <span className={`font-bold uppercase ${getStatusStyle(wd.status)}`}>
                        {wd.status?.toUpperCase() || 'PENDING'}
                      </span>

                      {canCancel(wd.status) && (
                        <button
                          onClick={() => handleCancel(wd._id)}
                          className="text-xs px-4 py-1.5 bg-red-600/10 hover:bg-red-600/20 text-red-600 dark:text-red-400 rounded-lg transition font-medium"
                        >
                          Cancel
                        </button>
                      )}

                      <p className="text-xs text-gray-500 dark:text-gray-400">
                        {wd.createdAt ? new Date(wd.createdAt).toLocaleString() : '—'}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              {totalPages > 1 && (
                <div className="mt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
                  <button
                    onClick={() => paginate(currentPage - 1)}
                    disabled={currentPage === 1}
                    className={`flex items-center gap-1 px-5 py-2.5 rounded-xl font-medium transition-colors ${
                      currentPage === 1
                        ? 'opacity-50 cursor-not-allowed bg-gray-200 dark:bg-gray-700'
                        : 'bg-orange-100 hover:bg-orange-200 dark:bg-orange-900/60 dark:hover:bg-orange-800/70 text-orange-700 dark:text-orange-300'
                    }`}
                  >
                    <ChevronLeftIcon className="w-5 h-5" />
                    Prev
                  </button>

                  <div className="flex gap-2 flex-wrap justify-center">
                    {Array.from({ length: Math.min(totalPages, 7) }, (_, i) => i + 1).map((page) => (
                      <button
                        key={page}
                        onClick={() => paginate(page)}
                        className={`w-10 h-10 rounded-xl font-medium transition-all ${
                          page === currentPage
                            ? 'bg-orange-600 text-white shadow-md'
                            : 'bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-800 dark:text-gray-200'
                        }`}
                      >
                        {page}
                      </button>
                    ))}
                    {totalPages > 7 && currentPage < totalPages - 3 && (
                      <span className="w-10 h-10 flex items-center justify-center text-gray-500 dark:text-gray-400">...</span>
                    )}
                  </div>

                  <button
                    onClick={() => paginate(currentPage + 1)}
                    disabled={currentPage === totalPages}
                    className={`flex items-center gap-1 px-5 py-2.5 rounded-xl font-medium transition-colors ${
                      currentPage === totalPages
                        ? 'opacity-50 cursor-not-allowed bg-gray-200 dark:bg-gray-700'
                        : 'bg-orange-100 hover:bg-orange-200 dark:bg-orange-900/60 dark:hover:bg-orange-800/70 text-orange-700 dark:text-orange-300'
                    }`}
                  >
                    Next
                    <ChevronRightIcon className="w-5 h-5" />
                  </button>
                </div>
              )}

              {withdrawals.length > 0 && (
                <p className="mt-5 text-center text-sm text-gray-500 dark:text-gray-400">
                  Showing {indexOfFirstItem + 1}–{Math.min(indexOfLastItem, withdrawals.length)} of {withdrawals.length}
                </p>
              )}
            </>
          )}
        </motion.div>
      </div>
    </div>
  );
}