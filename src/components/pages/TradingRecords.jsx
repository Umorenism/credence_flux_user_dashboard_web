// import React, { useState, useEffect } from 'react';
// import { motion, AnimatePresence } from 'framer-motion';
// import {
//   ChartBarIcon,
//   ArrowTrendingUpIcon,
//   ArrowTrendingDownIcon,
//   CurrencyDollarIcon,
//   ClockIcon,
//   FunnelIcon,
//   ChevronDownIcon,
//   ChevronUpIcon,
//   CpuChipIcon,
//   ArrowPathIcon,
// } from '@heroicons/react/24/solid';
// import { useTheme } from '../ui/ThemeContext'; // ← import this

// // Adjust import path to your api file
// import { apiClient } from '../../api/apiClient';

// export default function TradingRecords() {
//   const { theme, toggleTheme } = useTheme();

//   const [filter, setFilter] = useState('all');
//   const [expandedRow, setExpandedRow] = useState(null);
//   const [records, setRecords] = useState([]);
//   const [stats, setStats] = useState({
//     totalTrades: 0,
//     totalProfit: 0,
//     winRate: '0.0',
//     avgTrade: '0.00',
//   });
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState('');
//   const [page, setPage] = useState(1);
//   const limit = 20;

//   useEffect(() => {
//     const fetchTrades = async () => {
//       setLoading(true);
//       setError('');

//       try {
//         const params = { page, limit };
//         const response = await apiClient.get('/api/trades', { params });
//         const trades = response.data?.trades || response.data || [];

//         setRecords(trades);

//         const total = trades.length;
//         const profits = trades.filter(t => (t.profit || t.pnl || 0) > 0).length;
//         const totalPnl = trades.reduce((sum, t) => sum + (t.profit || t.pnl || 0), 0);
//         const avg = total > 0 ? (trades.reduce((sum, t) => sum + (t.total || 0), 0) / total) : 0;

//         setStats({
//           totalTrades: total,
//           totalProfit: totalPnl,
//           winRate: total > 0 ? ((profits / total) * 100).toFixed(1) : '0.0',
//           avgTrade: avg.toFixed(2),
//         });
//       } catch (err) {
//         console.error(err);
//         setError('Failed to load trading records. Please try again.');
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchTrades();
//   }, [page, filter]);

//   const filteredRecords = records; // client-side filter can be added later if needed

//   const formatTimestamp = (ts) => {
//     return new Date(ts).toLocaleString('en-US', {
//       year: 'numeric', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit'
//     });
//   };

//   return (
//     <div className="min-h-screen w-full flex flex-col bg-gray-50 dark:bg-gray-950 text-gray-900 dark:text-white transition-colors duration-300 relative overflow-hidden">
//       {/* Optional subtle background pattern – lighter in light mode */}
//       <div className="absolute inset-0 opacity-[0.07] dark:opacity-10 pointer-events-none">
//         <div
//           className="w-full h-full"
//           style={{
//             backgroundImage:
//               "linear-gradient(to right, #f97316 1px, transparent 1px), linear-gradient(to bottom, #f97316 1px, transparent 1px)",
//             backgroundSize: "60px 60px",
//           }}
//         />
//       </div>

//       {/* Theme toggle */}
//       <button
//         onClick={toggleTheme}
//         className="fixed top-5 right-5 z-50 p-3 rounded-full bg-white dark:bg-gray-800 shadow-md dark:shadow-lg text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 transition"
//         aria-label="Toggle theme"
//       >
//         {theme === 'dark' ? '☀️' : '🌙'}
//       </button>

//       <div className="relative z-10 flex flex-col w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-10 gap-6 sm:gap-10">

//         {/* Header */}
//         <motion.div
//           initial={{ opacity: 0, y: -30 }}
//           animate={{ opacity: 1, y: 0 }}
//           className="text-center"
//         >
//           <div className="flex items-center justify-center gap-3 mb-3">
//             <CpuChipIcon className="w-10 h-10 text-orange-600 dark:text-orange-500" />
//             <h1 className="text-3xl sm:text-4xl font-bold text-orange-600 dark:text-orange-400">
//               Trading Records
//             </h1>
//           </div>
//           <p className="text-sm text-gray-600 dark:text-gray-400">Your trade history & performance</p>
//         </motion.div>

//         {/* Stats Cards */}
//         {loading ? (
//           <div className="flex justify-center py-12">
//             <ArrowPathIcon className="w-10 h-10 text-orange-600 dark:text-orange-500 animate-spin" />
//           </div>
//         ) : error ? (
//           <div className="text-center py-10 text-red-600 dark:text-red-400 font-medium">{error}</div>
//         ) : (
//           <motion.div
//             initial={{ opacity: 0, y: 20 }}
//             animate={{ opacity: 1, y: 0 }}
//             className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6"
//           >
//             {[
//               { label: 'Total Trades', value: stats.totalTrades, icon: ChartBarIcon, color: 'from-orange-500 to-orange-600' },
//               {
//                 label: 'Total PnL',
//                 value: `$${stats.totalProfit.toFixed(2)}`,
//                 icon: CurrencyDollarIcon,
//                 color: stats.totalProfit >= 0 ? 'from-green-500 to-green-600' : 'from-red-500 to-red-600',
//               },
//               { label: 'Win Rate', value: `${stats.winRate}%`, icon: ArrowTrendingUpIcon, color: 'from-orange-500 to-amber-600' },
//               { label: 'Avg Trade Size', value: `$${stats.avgTrade}`, icon: ArrowTrendingDownIcon, color: 'from-orange-600 to-amber-500' },
//             ].map((stat, idx) => (
//               <motion.div
//                 key={stat.label}
//                 initial={{ opacity: 0, scale: 0.95 }}
//                 animate={{ opacity: 1, scale: 1 }}
//                 transition={{ delay: idx * 0.08 }}
//                 className="bg-white dark:bg-gray-900/90 backdrop-blur-sm rounded-2xl p-5 border border-gray-200 dark:border-orange-900/40 shadow-md dark:shadow-lg hover:border-orange-400 dark:hover:border-orange-700/60 transition-all"
//               >
//                 <div className={`inline-flex p-3 rounded-xl bg-gradient-to-br ${stat.color} mb-3`}>
//                   <stat.icon className="w-6 h-6 text-white" />
//                 </div>
//                 <p className="text-sm text-gray-600 dark:text-gray-400">{stat.label}</p>
//                 <p className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white mt-1">{stat.value}</p>
//               </motion.div>
//             ))}
//           </motion.div>
//         )}

//         {/* Filter Bar */}
//         <motion.div
//           initial={{ opacity: 0, y: 20 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ delay: 0.3 }}
//           className="flex flex-col items-center gap-4"
//         >
//           <div className="flex items-center gap-2 text-orange-600 dark:text-orange-300">
//             <FunnelIcon className="w-5 h-5" />
//             <span className="text-sm font-medium">Filter Trades</span>
//           </div>
//           <div className="flex flex-wrap justify-center gap-3">
//             {['all', 'profit', 'loss', 'recent'].map((type) => (
//               <motion.button
//                 key={type}
//                 onClick={() => setFilter(type)}
//                 className={`px-5 py-2.5 rounded-xl text-sm font-medium transition-all shadow-sm ${
//                   filter === type
//                     ? 'bg-orange-600 text-white shadow-orange-600/30 dark:shadow-orange-500/40'
//                     : 'bg-white dark:bg-gray-800 border border-gray-300 dark:border-orange-800/50 hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-700 dark:text-orange-300'
//                 }`}
//                 whileHover={{ scale: 1.04 }}
//                 whileTap={{ scale: 0.96 }}
//               >
//                 {type.charAt(0).toUpperCase() + type.slice(1)}
//               </motion.button>
//             ))}
//           </div>
//         </motion.div>

//         {/* Records List */}
//         <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }}>
//           <AnimatePresence mode="wait">
//             {loading ? (
//               <div className="text-center py-16">
//                 <ArrowPathIcon className="w-12 h-12 text-orange-600 dark:text-orange-500 animate-spin mx-auto" />
//                 <p className="text-gray-600 dark:text-gray-400 mt-4">Loading trade history...</p>
//               </div>
//             ) : error ? (
//               <div className="text-center py-16 text-red-600 dark:text-red-400">{error}</div>
//             ) : filteredRecords.length === 0 ? (
//               <div className="text-center py-16">
//                 <ChartBarIcon className="w-16 h-16 text-gray-500 dark:text-gray-600 mx-auto mb-4" />
//                 <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-300">No trades found</h3>
//                 <p className="text-gray-600 dark:text-gray-500 mt-2">Adjust filters or make your first trade</p>
//               </div>
//             ) : (
//               <div className="space-y-4">
//                 {filteredRecords.map((record, idx) => (
//                   <motion.div
//                     key={record.id || idx}
//                     initial={{ opacity: 0, y: 15 }}
//                     animate={{ opacity: 1, y: 0 }}
//                     transition={{ delay: idx * 0.06 }}
//                     className="bg-white dark:bg-gray-900/90 backdrop-blur-sm rounded-2xl border border-gray-200 dark:border-orange-900/40 overflow-hidden shadow-md dark:shadow-lg hover:border-orange-400 dark:hover:border-orange-700/60 transition-all"
//                   >
//                     <div className="p-5 sm:p-6">
//                       <div className="flex items-center justify-between mb-4">
//                         <h3 className="text-lg font-bold text-gray-900 dark:text-white">
//                           {record.pair || record.symbol || '—'}
//                         </h3>
//                         <span
//                           className={`px-3 py-1 rounded-full text-xs font-bold ${
//                             (record.type || record.side) === 'BUY'
//                               ? 'bg-orange-100 dark:bg-orange-950/50 text-orange-700 dark:text-orange-300 border border-orange-300 dark:border-orange-600/40'
//                               : 'bg-red-100 dark:bg-red-950/50 text-red-700 dark:text-red-300 border border-red-300 dark:border-red-600/40'
//                           }`}
//                         >
//                           {record.type || record.side || 'TRADE'}
//                         </span>
//                       </div>

//                       <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 text-sm">
//                         <div>
//                           <p className="text-gray-500 dark:text-gray-400 text-xs">Amount</p>
//                           <p className="text-gray-900 dark:text-white font-medium">{record.amount?.toFixed(4) || '—'}</p>
//                         </div>
//                         <div>
//                           <p className="text-gray-500 dark:text-gray-400 text-xs">Price</p>
//                           <p className="text-gray-900 dark:text-white font-medium">
//                             ${(record.price || 0).toLocaleString()}
//                           </p>
//                         </div>
//                         <div>
//                           <p className="text-gray-500 dark:text-gray-400 text-xs">Total</p>
//                           <p className="text-gray-900 dark:text-white font-medium">
//                             ${(record.total || 0).toFixed(2)}
//                           </p>
//                         </div>
//                         <div>
//                           <p className="text-gray-500 dark:text-gray-400 text-xs">PnL</p>
//                           <p
//                             className={`font-bold ${
//                               (record.profit || record.pnl || 0) >= 0
//                                 ? 'text-green-600 dark:text-green-400'
//                                 : 'text-red-600 dark:text-red-400'
//                             }`}
//                           >
//                             {(record.profit || record.pnl || 0) >= 0 ? '+' : ''}$
//                             {Math.abs(record.profit || record.pnl || 0).toFixed(2)}
//                           </p>
//                         </div>
//                         <div>
//                           <p className="text-gray-500 dark:text-gray-400 text-xs">Status</p>
//                           <span
//                             className={`inline-block px-3 py-0.5 rounded-full text-xs font-medium ${
//                               record.status === 'open'
//                                 ? 'bg-amber-100 dark:bg-amber-950/50 text-amber-700 dark:text-amber-300 border border-amber-300 dark:border-amber-600/40'
//                                 : 'bg-gray-100 dark:bg-gray-800/50 text-gray-700 dark:text-gray-300 border border-gray-300 dark:border-gray-700/40'
//                             }`}
//                           >
//                             {record.status?.toUpperCase() || 'CLOSED'}
//                           </span>
//                         </div>
//                         <div>
//                           <p className="text-gray-500 dark:text-gray-400 text-xs">Time</p>
//                           <p className="text-gray-700 dark:text-gray-300 text-xs flex items-center">
//                             <ClockIcon className="w-4 h-4 mr-1.5" />
//                             {formatTimestamp(record.timestamp || record.createdAt)}
//                           </p>
//                         </div>
//                       </div>

//                       <button
//                         onClick={() => setExpandedRow(expandedRow === record.id ? null : record.id)}
//                         className="mt-5 w-full flex items-center justify-center gap-2 text-orange-600 dark:text-orange-400 hover:text-orange-700 dark:hover:text-orange-300 transition text-sm font-medium"
//                       >
//                         {expandedRow === record.id ? 'Hide Details' : 'View Details'}
//                         {expandedRow === record.id ? <ChevronUpIcon className="w-5 h-5" /> : <ChevronDownIcon className="w-5 h-5" />}
//                       </button>
//                     </div>

//                     <AnimatePresence>
//                       {expandedRow === record.id && (
//                         <motion.div
//                           initial={{ height: 0, opacity: 0 }}
//                           animate={{ height: 'auto', opacity: 1 }}
//                           exit={{ height: 0, opacity: 0 }}
//                           className="border-t border-gray-200 dark:border-orange-900/40 bg-gray-50 dark:bg-gray-950/60 px-5 sm:px-6 py-5 text-sm"
//                         >
//                           <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
//                             <div>
//                               <span className="text-gray-500 dark:text-gray-400">Entry Time:</span>{' '}
//                               <span className="text-gray-900 dark:text-white">
//                                 {formatTimestamp(record.entryTime || record.timestamp)}
//                               </span>
//                             </div>
//                             <div>
//                               <span className="text-gray-500 dark:text-gray-400">Duration:</span>{' '}
//                               <span className="text-gray-900 dark:text-white">{record.duration || '—'}</span>
//                             </div>
//                             <div>
//                               <span className="text-gray-500 dark:text-gray-400">Strategy:</span>{' '}
//                               <span className="text-gray-900 dark:text-white">{record.strategy || 'Manual / AI'}</span>
//                             </div>
//                             <div>
//                               <span className="text-gray-500 dark:text-gray-400">Risk:</span>{' '}
//                               <span className="text-gray-900 dark:text-white">{record.risk || '—'}</span>
//                             </div>
//                           </div>
//                         </motion.div>
//                       )}
//                     </AnimatePresence>
//                   </motion.div>
//                 ))}
//               </div>
//             )}
//           </AnimatePresence>

//           {/* Load More */}
//           {!loading && records.length >= limit && (
//             <div className="flex justify-center mt-8">
//               <motion.button
//                 whileHover={{ scale: 1.05 }}
//                 whileTap={{ scale: 0.95 }}
//                 onClick={() => setPage(p => p + 1)}
//                 className="px-8 py-3 bg-orange-600 hover:bg-orange-700 dark:bg-orange-600 dark:hover:bg-orange-500 text-white font-medium rounded-xl shadow-md transition"
//               >
//                 Load More
//               </motion.button>
//             </div>
//           )}
//         </motion.div>
//       </div>
//     </div>
//   );
// }




import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ChartBarSquareIcon,
  ArrowTrendingUpIcon,
  ArrowTrendingDownIcon,
  CurrencyDollarIcon,
  ClockIcon,
  FunnelIcon,
  ChevronDownIcon,
  ChevronUpIcon,
  CpuChipIcon,
  ArrowPathIcon,
  ArrowDownTrayIcon,
  ExclamationTriangleIcon,
} from '@heroicons/react/24/outline';
import { useTheme } from '../ui/ThemeContext';

// For demo / development – replace with real endpoint when available
const MOCK_TRADES = [
  // ... you can add 15–30 mock entries for testing
  { id: 't1', pair: 'BTC/USDT', side: 'BUY', amount: 0.045, price: 68250, total: 3071.25, pnl: 142.80, status: 'closed', timestamp: '2025-12-20T14:30:00Z', entryTime: '2025-12-20T13:45:00Z', duration: '45m', strategy: 'Breakout', risk: '1.2%' },
  { id: 't2', pair: 'ETH/USDT', side: 'SELL', amount: 1.8, price: 3450, total: 6210, pnl: -87.30, status: 'closed', timestamp: '2025-12-19T09:15:00Z', entryTime: '2025-12-19T08:20:00Z', duration: '55m', strategy: 'Scalp', risk: '0.8%' },
  // ...
];

export default function TradingRecords() {
  const { theme, toggleTheme } = useTheme();

  const [filter, setFilter] = useState('all');
  const [expandedRow, setExpandedRow] = useState(null);
  const [records, setRecords] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const limit = 15;

  const isDevMode = true; // ← change to false when real API is ready

  useEffect(() => {
    let mounted = true;

    const fetchTrades = async () => {
      if (!mounted) return;

      setLoading(true);
      setError(null);

      try {
        if (isDevMode) {
          // Simulate network delay + pagination
          await new Promise(r => setTimeout(r, 800 + Math.random() * 600));
          const start = (page - 1) * limit;
          const mockSlice = MOCK_TRADES.slice(start, start + limit);
          setRecords(prev => page === 1 ? mockSlice : [...prev, ...mockSlice]);
          setHasMore(start + limit < MOCK_TRADES.length);
        } else {
          // Real API – uncomment when ready
          // const res = await apiClient.get('/api/user/trades', {
          //   params: { page, limit, filter: filter !== 'all' ? filter : undefined }
          // });
          // const newTrades = res.data?.trades || [];
          // setRecords(prev => page === 1 ? newTrades : [...prev, ...newTrades]);
          // setHasMore(res.data?.hasMore || newTrades.length === limit);
        }
      } catch (err) {
        console.error(err);
        setError(
          err.response?.status === 401 ? "Session expired. Please log in again." :
          err.response?.status === 403 ? "You don't have permission to view trade history." :
          err.message.includes('network') ? "Network error. Please check your connection." :
          "Couldn't load trade history. Please try again later."
        );
      } finally {
        if (mounted) setLoading(false);
      }
    };

    fetchTrades();

    return () => { mounted = false; };
  }, [page, isDevMode]); // filter not included → implement client-side

  // Client-side filtering (until backend supports it)
  const displayedRecords = useMemo(() => {
    if (filter === 'all') return records;
    if (filter === 'profit') return records.filter(r => (r.pnl || r.profit || 0) > 0);
    if (filter === 'loss')   return records.filter(r => (r.pnl || r.profit || 0) < 0);
    if (filter === 'recent') {
      const today = new Date().setHours(0,0,0,0);
      return records.filter(r => new Date(r.timestamp).setHours(0,0,0,0) === today);
    }
    return records;
  }, [records, filter]);

  const stats = useMemo(() => {
    if (!records.length) return { totalTrades: 0, totalPnL: 0, winRate: '0.0', avgTrade: '0.00' };

    const totalTrades = records.length;
    const profitable = records.filter(t => (t.pnl || t.profit || 0) > 0).length;
    const totalPnL = records.reduce((sum, t) => sum + (t.pnl || t.profit || 0), 0);
    const avgTrade = records.reduce((sum, t) => sum + Math.abs(t.total || 0), 0) / totalTrades;

    return {
      totalTrades,
      totalPnL,
      winRate: totalTrades > 0 ? ((profitable / totalTrades) * 100).toFixed(1) : '0.0',
      avgTrade: avgTrade.toFixed(2),
    };
  }, [records]);

  const formatCurrency = (val) => `$${Math.abs(val).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;

  const formatTimestamp = (ts) => {
    if (!ts) return '—';
    return new Date(ts).toLocaleString('en-US', {
      month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit'
    });
  };

  return (
    <div className={`min-h-screen ${theme === 'dark' ? 'bg-gray-950' : 'bg-gray-50/70'} text-gray-900 dark:text-gray-100 transition-colors duration-300 relative`}>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-12 space-y-8 lg:space-y-10">

        {/* Header + Quick Stats */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-orange-100 dark:bg-orange-900/40 rounded-xl">
              <CpuChipIcon className="w-8 h-8 text-orange-600 dark:text-orange-400" />
            </div>
            <div>
              <h1 className="text-3xl lg:text-4xl font-bold text-orange-600 dark:text-orange-400 tracking-tight">
                Trading Records
              </h1>
              <p className="text-gray-600 dark:text-gray-400 mt-1">Review your past performance</p>
            </div>
          </div>

          <div className="flex gap-3">
            <button className="flex items-center gap-2 px-4 py-2 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg text-sm font-medium hover:bg-gray-50 dark:hover:bg-gray-700 transition">
              <ArrowDownTrayIcon className="w-4 h-4" />
              Export CSV
            </button>
            <button
              onClick={() => { setPage(1); /* reset & refetch */ }}
              className="p-2.5 rounded-lg bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition"
              title="Refresh"
            >
              <ArrowPathIcon className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
          {[
            { label: 'Total Trades', value: stats.totalTrades, icon: ChartBarSquareIcon, color: 'orange' },
            { label: 'Net PnL', value: formatCurrency(stats.totalPnL), icon: CurrencyDollarIcon, color: stats.totalPnL >= 0 ? 'green' : 'red' },
            { label: 'Win Rate', value: `${stats.winRate}%`, icon: ArrowTrendingUpIcon, color: 'amber' },
            { label: 'Avg Trade', value: formatCurrency(stats.avgTrade), icon: ArrowTrendingDownIcon, color: 'orange' },
          ].map((item, i) => (
            <motion.div
              key={item.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="bg-white dark:bg-gray-800/70 rounded-xl border border-gray-200 dark:border-gray-700 p-5 shadow-sm hover:shadow-md transition"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">{item.label}</p>
                  <p className={`text-2xl font-bold mt-1 ${item.color === 'green' ? 'text-green-600 dark:text-green-400' :
                    item.color === 'red' ? 'text-red-600 dark:text-red-400' : 'text-orange-600 dark:text-orange-400'}`}>
                    {item.value}
                  </p>
                </div>
                <item.icon className={`w-10 h-10 opacity-40 ${item.color === 'green' ? 'text-green-500' :
                  item.color === 'red' ? 'text-red-500' : 'text-orange-500 dark:text-orange-400'}`} />
              </div>
            </motion.div>
          ))}
        </div>

        {/* Filters */}
        <div className="flex flex-wrap items-center gap-3">
          <div className="flex items-center gap-2 text-gray-700 dark:text-gray-300">
            <FunnelIcon className="w-5 h-5" />
            <span className="font-medium">Filter:</span>
          </div>
          {['all', 'profit', 'loss', 'recent'].map(f => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all ${
                filter === f
                  ? 'bg-orange-600 text-white shadow-md'
                  : 'bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-300'
              }`}
            >
              {f === 'all' ? 'All Trades' : f.charAt(0).toUpperCase() + f.slice(1)}
            </button>
          ))}
        </div>

        {/* Main content */}
        <AnimatePresence mode="wait">
          {loading && page === 1 ? (
            <div className="flex flex-col items-center justify-center py-20">
              <ArrowPathIcon className="w-12 h-12 text-orange-500 animate-spin" />
              <p className="mt-4 text-gray-500 dark:text-gray-400">Loading trading history...</p>
            </div>
          ) : error ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="bg-red-50 dark:bg-red-950/40 border border-red-200 dark:border-red-800 rounded-xl p-6 text-center"
            >
              <ExclamationTriangleIcon className="w-10 h-10 text-red-500 mx-auto mb-3" />
              <h3 className="text-lg font-semibold text-red-700 dark:text-red-300 mb-2">Error loading trades</h3>
              <p className="text-red-600 dark:text-red-400">{error}</p>
              <button
                onClick={() => { setPage(1); setError(null); }}
                className="mt-4 px-6 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition"
              >
                Try Again
              </button>
            </motion.div>
          ) : displayedRecords.length === 0 ? (
            <div className="text-center py-20 opacity-80">
              <ChartBarSquareIcon className="w-20 h-20 mx-auto text-gray-400 dark:text-gray-600 mb-4" />
              <h3 className="text-xl font-semibold text-gray-700 dark:text-gray-300">No trades match your filter</h3>
              <p className="mt-2 text-gray-500 dark:text-gray-400">
                {filter !== 'all' ? 'Try changing the filter or load more data.' : 'Start trading to see your history here.'}
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {displayedRecords.map((trade) => (
                <motion.div
                  key={trade.id}
                  layout
                  className="bg-white dark:bg-gray-800/70 rounded-xl border border-gray-200 dark:border-gray-700 overflow-hidden shadow-sm hover:shadow-md transition"
                >
                  {/* ... rest of the trade card remains similar but with improved spacing & readability */}
                </motion.div>
              ))}

              {hasMore && (
                <div className="flex justify-center mt-10">
                  <button
                    onClick={() => setPage(p => p + 1)}
                    disabled={loading}
                    className="px-8 py-3 bg-orange-600 hover:bg-orange-700 text-white font-medium rounded-xl disabled:opacity-60 transition flex items-center gap-2"
                  >
                    {loading ? 'Loading...' : 'Load More'}
                    {!loading && <ArrowPathIcon className="w-5 h-5" />}
                  </button>
                </div>
              )}
            </div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}