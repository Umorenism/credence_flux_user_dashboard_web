// // src/pages/RecentTrades.js
// import React, { useState } from 'react';
// import { motion, AnimatePresence } from 'framer-motion';
// import {
//   ArrowTrendingUpIcon,
//   ArrowTrendingDownIcon,
//   ClockIcon,
//   CpuChipIcon,
//   SparklesIcon,
//   BoltIcon,
//   ChevronUpIcon,
//   ChevronDownIcon,
// } from '@heroicons/react/24/solid';

// export default function RecentTrades() {
//   const [expandedId, setExpandedId] = useState(null);

//   const recentTrades = [
//     { id: 1, user: 'AlphaTrader_7', pair: 'BTC/USDT', type: 'BUY', amount: 0.52, price: 45230.50, leverage: 50, profit: 124.80, time: '2 min ago', accuracy: 98 },
//     { id: 2, user: 'NeuralWhale', pair: 'ETH/USDT', type: 'SELL', amount: 12.3, price: 3800.45, leverage: 75, profit: -45.20, time: '5 min ago', accuracy: 92 },
//     { id: 3, user: 'QuantumBot', pair: 'SOL/USDT', type: 'BUY', amount: 450, price: 95.67, leverage: 100, profit: 289.10, time: '8 min ago', accuracy: 99 },
//     { id: 4, user: 'CyberSniper', pair: 'XRP/USDT', type: 'SELL', amount: 8500, price: 0.62, leverage: 30, profit: 78.50, time: '12 min ago', accuracy: 95 },
//     { id: 5, user: 'AI_Master', pair: 'LINK/USDT', type: 'BUY', amount: 120, price: 14.20, leverage: 60, profit: 156.30, time: '15 min ago', accuracy: 97 },
//     { id: 6, user: 'HodlKing', pair: 'ADA/USDT', type: 'SELL', amount: 5000, price: 0.45, leverage: 40, profit: -32.10, time: '18 min ago', accuracy: 90 },
//   ];

//   return (
//     <div className="min-h-screen w-full flex flex-col bg-black text-white relative overflow-hidden">
//       {/* Prevent any horizontal overflow globally */}
//       <style jsx global>{`
//         html, body, #root { overflow-x: hidden; }
//       `}</style>

//       {/* Animated Robotic Grid Background */}
//       <div className="fixed inset-0 opacity-10 pointer-events-none -z-10">
//         <motion.div
//           animate={{ backgroundPosition: ["0% 0%", "100% 100%"] }}
//           transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
//           className="w-full h-full"
//           style={{
//             backgroundImage: "linear-gradient(cyan 1px, transparent 1px), linear-gradient(90deg, cyan 1px, transparent 1px)",
//             backgroundSize: "60px 60px",
//           }}
//         />
//       </div>

//       {/* Gradient Overlay */}
//       <div className="fixed inset-0 bg-gradient-to-br from-cyan-900/40 via-black to-purple-900/40 pointer-events-none -z-10" />

//       {/* Main Scrollable Content - Safe padding for FAB */}
//       <div className="relative z-10 flex flex-col min-h-screen w-full max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 gap-6 sm:gap-8 pb-32">

//         {/* Header */}
//         <motion.div
//           initial={{ opacity: 0, y: -30 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ type: "spring", stiffness: 100 }}
//           className="text-center"
//         >
//           <div className="flex flex-col items-center gap-3 mb-2">
//             <CpuChipIcon className="w-10 h-10 text-cyan-400" />
//             <h1 className="text-2xl sm:text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-purple-400">
//               Recent Trades
//             </h1>
//           </div>
//           <p className="text-sm text-gray-400">Live AI-powered platform activity</p>
//           <div className="mt-3 flex flex-wrap items-center justify-center gap-3 sm:gap-4 text-xs sm:text-sm text-gray-500">
//             <span className="flex items-center gap-1">
//               <SparklesIcon className="w-4 h-4 text-yellow-400" />
//               Neural Engine Active
//             </span>
//             <span className="hidden sm:inline">•</span>
//             <span className="flex items-center gap-1">
//               <BoltIcon className="w-4 h-4 text-cyan-400" />
//               Real-time Updates
//             </span>
//           </div>
//         </motion.div>

//         {/* Live Activity Indicator */}
//         <motion.div
//           initial={{ opacity: 0, scale: 0.9 }}
//           animate={{ opacity: 1, scale: 1 }}
//           transition={{ delay: 0.2 }}
//           className="flex justify-center"
//         >
//           <div className="inline-flex items-center gap-3 bg-black/60 backdrop-blur-xl rounded-full px-6 py-3 border border-cyan-500/40 shadow-lg">
//             <motion.div
//               animate={{ opacity: [0.4, 1, 0.4] }}
//               transition={{ duration: 1.5, repeat: Infinity }}
//               className="w-3 h-3 bg-emerald-400 rounded-full"
//             />
//             <span className="text-sm font-medium text-emerald-400">
//               LIVE • {recentTrades.length} trades in last 20 minutes
//             </span>
//           </div>
//         </motion.div>

//         {/* Recent Trades Cards */}
//         <motion.div
//           initial={{ opacity: 0 }}
//           animate={{ opacity: 1 }}
//           transition={{ delay: 0.4 }}
//           className="space-y-5"
//         >
//           <AnimatePresence>
//             {recentTrades.map((trade, idx) => (
//               <motion.div
//                 key={trade.id}
//                 layout
//                 initial={{ opacity: 0, y: 30 }}
//                 animate={{ opacity: 1, y: 0 }}
//                 exit={{ opacity: 0, y: -30 }}
//                 transition={{ delay: idx * 0.05 }}
//                 className="bg-black/70 backdrop-blur-2xl rounded-2xl border border-cyan-500/40 shadow-2xl overflow-hidden"
//                 whileHover={{ boxShadow: "0 0 35px rgba(34, 211, 238, 0.4)" }}
//               >
//                 {/* Main Trade Card */}
//                 <div className="p-5 sm:p-6">
//                   <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-4">
//                     <div className="flex items-center gap-4">
//                       <div className={`p-3 rounded-xl ${trade.type === 'BUY' ? 'bg-emerald-500/20 border border-emerald-500/40' : 'bg-red-500/20 border border-red-500/40'}`}>
//                         {trade.type === 'BUY' ? 
//                           <ArrowTrendingUpIcon className="w-7 h-7 text-emerald-400" /> : 
//                           <ArrowTrendingDownIcon className="w-7 h-7 text-red-400" />
//                         }
//                       </div>
//                       <div>
//                         <div className="flex flex-col sm:flex-row sm:items-center gap-2">
//                           <h3 className="text-lg font-bold text-white">{trade.pair}</h3>
//                           <span className="text-xs text-cyan-300">• {trade.user}</span>
//                         </div>
//                         <p className="text-sm text-gray-400 flex items-center gap-1 mt-1">
//                           <ClockIcon className="w-4 h-4" />
//                           {trade.time}
//                         </p>
//                       </div>
//                     </div>
//                     <div className="text-right sm:text-left">
//                       <p className={`text-2xl font-bold ${trade.profit >= 0 ? 'text-emerald-400' : 'text-red-400'}`}>
//                         {trade.profit >= 0 ? '+' : ''}${Math.abs(trade.profit).toFixed(2)}
//                       </p>
//                       <p className="text-xs text-gray-500">PnL</p>
//                     </div>
//                   </div>

//                   {/* Stats Grid */}
//                   <div className="grid grid-cols-3 gap-3 text-sm">
//                     <div className="bg-black/50 rounded-xl p-3 border border-cyan-500/30 text-center">
//                       <p className="text-gray-400 text-xs">Amount</p>
//                       <p className="font-bold text-white">{trade.amount}</p>
//                     </div>
//                     <div className="bg-black/50 rounded-xl p-3 border border-cyan-500/30 text-center">
//                       <p className="text-gray-400 text-xs">Price</p>
//                       <p className="font-bold text-white">${trade.price.toLocaleString()}</p>
//                     </div>
//                     <div className="bg-black/50 rounded-xl p-3 border border-cyan-500/30 text-center">
//                       <p className="text-gray-400 text-xs">Leverage</p>
//                       <p className="font-bold text-cyan-400">{trade.leverage}x</p>
//                     </div>
//                   </div>

//                   {/* AI Accuracy + Details Button */}
//                   <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mt-5">
//                     <div className="flex items-center gap-2">
//                       <SparklesIcon className="w-5 h-5 text-yellow-400" />
//                       <span className="text-sm text-gray-400">AI Signal Accuracy</span>
//                       <span className="text-lg font-bold text-yellow-400">{trade.accuracy}%</span>
//                     </div>
//                     <button
//                       onClick={() => setExpandedId(expandedId === trade.id ? null : trade.id)}
//                       className="text-cyan-400 hover:text-cyan-300 transition text-sm font-medium flex items-center gap-1"
//                     >
//                       Details
//                       {expandedId === trade.id ? <ChevronUpIcon className="w-5 h-5" /> : <ChevronDownIcon className="w-5 h-5" />}
//                     </button>
//                   </div>
//                 </div>

//                 {/* Expanded Details */}
//                 <AnimatePresence>
//                   {expandedId === trade.id && (
//                     <motion.div
//                       initial={{ height: 0 }}
//                       animate={{ height: 'auto' }}
//                       exit={{ height: 0 }}
//                       transition={{ duration: 0.3 }}
//                       className="border-t border-cyan-500/30 bg-black/50 px-5 sm:px-6 py-4"
//                     >
//                       <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
//                         <div>
//                           <p className="text-gray-400">Entry Strategy</p>
//                           <p className="text-white font-medium">Neural Momentum Breakout</p>
//                         </div>
//                         <div>
//                           <p className="text-gray-400">Execution Time</p>
//                           <p className="text-white font-medium">0.12s (Zero Latency)</p>
//                         </div>
//                         <div>
//                           <p className="text-gray-400">Risk Management</p>
//                           <p className="text-white font-medium">Dynamic Stop-Loss Applied</p>
//                         </div>
//                         <div>
//                           <p className="text-gray-400">Signal Source</p>
//                           <p className="text-white font-medium">Velox AI Alpha Engine</p>
//                         </div>
//                       </div>
//                       <motion.div
//                         className="mt-4 h-1 bg-gradient-to-r from-cyan-400 via-purple-500 to-cyan-400 rounded-full"
//                         initial={{ scaleX: 0 }}
//                         animate={{ scaleX: 1 }}
//                         transition={{ duration: 1.2, ease: "easeOut" }}
//                       />
//                     </motion.div>
//                   )}
//                 </AnimatePresence>
//               </motion.div>
//             ))}
//           </AnimatePresence>
//         </motion.div>
//       </div>

//       {/* Floating Live Feed Button - Centered */}
//       <motion.button
//         initial={{ scale: 0 }}
//         animate={{ scale: 1 }}
//         transition={{ delay: 0.6, type: "spring", stiffness: 100 }}
//         whileHover={{ scale: 1.15 }}
//         whileTap={{ scale: 0.95 }}
//         className="fixed bottom-6 left-1/2 -translate-x-1/2 bg-gradient-to-br from-cyan-500 to-purple-600 p-5 rounded-full shadow-2xl border-4 border-cyan-300/50 z-50"
//         animate={{
//           boxShadow: [
//             "0 0 20px rgba(34,211,238,0.8)",
//             "0 0 40px rgba(34,211,238,1)",
//             "0 0 20px rgba(34,211,238,0.8)",
//           ]
//         }}
//         transition={{ duration: 2, repeat: Infinity }}
//       >
//         <SparklesIcon className="w-8 h-8 text-white" />
//       </motion.button>
//     </div>
//   );
// }







// src/pages/RecentTrades.jsx
import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ArrowTrendingUpIcon,
  ArrowTrendingDownIcon,
  ClockIcon,
  SparklesIcon,
  BoltIcon,
  ChevronUpIcon,
  ChevronDownIcon,
  CpuChipIcon,
} from '@heroicons/react/24/solid';
import { useTheme } from '../ui/ThemeContext'; // adjust path

// Fake user prefixes & trading pairs (realistic)
const userPrefixes = ['Alpha', 'Quantum', 'Neural', 'Cyber', 'Elite', 'Phantom', 'Vortex', 'Nexus', 'Pulse', 'Shadow'];
const pairs = ['BTC/USDT', 'ETH/USDT', 'SOL/USDT', 'XRP/USDT', 'ADA/USDT', 'BNB/USDT', 'DOGE/USDT', 'LINK/USDT', 'AVAX/USDT'];

const generateRandomTrade = (id) => {
  const type = Math.random() > 0.45 ? 'BUY' : 'SELL';
  const profitSign = Math.random() > 0.38 ? 1 : -1;
  const profitAbs = (Math.random() * 320 + 15).toFixed(2);
  const profit = profitSign * parseFloat(profitAbs);

  return {
    id,
    user: `${userPrefixes[Math.floor(Math.random() * userPrefixes.length)]}${Math.floor(Math.random() * 900 + 100)}`,
    pair: pairs[Math.floor(Math.random() * pairs.length)],
    type,
    amount: (Math.random() * 480 + 0.3).toFixed(type === 'BUY' ? 4 : 1),
    price: (Math.random() * 68000 + 0.4).toFixed(2),
    leverage: [10, 20, 30, 50, 75, 100][Math.floor(Math.random() * 6)],
    profit,
    time: `${Math.floor(Math.random() * 18 + 1)} min ago`,
    accuracy: Math.floor(Math.random() * 8 + 92),
  };
};

export default function RecentTrades() {
  const { theme } = useTheme();
  const [trades, setTrades] = useState([]);
  const [expandedId, setExpandedId] = useState(null);
  const [isLive, setIsLive] = useState(true);

  // Simulate live trades coming in (polling style)
  useEffect(() => {
    // Initial trades
    const initial = Array.from({ length: 6 }, (_, i) => generateRandomTrade(i + 1));
    setTrades(initial);

    if (!isLive) return;

    const interval = setInterval(() => {
      setTrades((prev) => {
        const newTrade = generateRandomTrade(Date.now());
        // Keep only last 12 trades to prevent infinite growth
        return [newTrade, ...prev.slice(0, 11)];
      });
    }, 8000 + Math.random() * 4000); // 8–12 seconds

    return () => clearInterval(interval);
  }, [isLive]);

  const toggleLive = useCallback(() => setIsLive((p) => !p), []);

  return (
    <div className={`min-h-screen w-full flex flex-col ${theme === 'dark' ? 'bg-gray-950' : 'bg-gray-50'} text-gray-900 dark:text-gray-100 transition-colors duration-300 relative overflow-hidden`}>
      {/* Subtle animated grid background - toned down for light mode */}
      <div className="fixed inset-0 opacity-[0.04] dark:opacity-10 pointer-events-none -z-10">
        <motion.div
          animate={{ backgroundPosition: ['0% 0%', '100% 100%'] }}
          transition={{ duration: 80, repeat: Infinity, ease: 'linear' }}
          className="w-full h-full"
          style={{
            backgroundImage: `linear-gradient(${theme === 'dark' ? '#22d3ee' : '#60a5fa'} 1px, transparent 1px), linear-gradient(90deg, ${theme === 'dark' ? '#22d3ee' : '#60a5fa'} 1px, transparent 1px)`,
            backgroundSize: '70px 70px',
          }}
        />
      </div>

     

      <div className="relative z-10 flex flex-col w-full max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 gap-8 pb-24">

        {/* Header */}
        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="text-center">
          <div className="flex items-center justify-center gap-3 mb-3">
            <CpuChipIcon className="w-9 h-9 text-cyan-500 dark:text-cyan-400" />
            <h1 className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-cyan-600 to-blue-600 dark:from-cyan-400 dark:to-blue-400 bg-clip-text text-transparent">
              Recent Platform Trades
            </h1>
          </div>
          <p className="text-gray-600 dark:text-gray-400 mb-2">Live user activity powered by AI signals</p>

          <div className="inline-flex items-center gap-3 bg-white/70 dark:bg-gray-800/70 backdrop-blur-md px-5 py-2.5 rounded-full border border-cyan-200 dark:border-cyan-800/50 shadow-sm">
            <motion.div
              animate={{ scale: [1, 1.3, 1] }}
              transition={{ duration: 1.8, repeat: Infinity }}
              className="w-3 h-3 bg-emerald-500 rounded-full"
            />
            <span className="text-sm font-medium text-emerald-600 dark:text-emerald-400">
              LIVE • {trades.length} recent trades
            </span>
          </div>
        </motion.div>

        {/* Trades list */}
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }} className="space-y-5">
          <AnimatePresence>
            {trades.map((trade) => (
              <motion.div
                key={trade.id}
                layout
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -40, scale: 0.96 }}
                className={`bg-white dark:bg-gray-900/80 rounded-2xl border ${theme === 'dark' ? 'border-cyan-900/50' : 'border-gray-200'} shadow-md dark:shadow-xl overflow-hidden transition-all hover:shadow-lg dark:hover:shadow-2xl`}
                whileHover={{ y: -3 }}
              >
                <div className="p-5 sm:p-6">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
                    <div className="flex items-center gap-4">
                      <div className={`p-3.5 rounded-xl ${trade.type === 'BUY' ? 'bg-emerald-100 dark:bg-emerald-950/50 border-emerald-200 dark:border-emerald-800/40' : 'bg-red-100 dark:bg-red-950/50 border-red-200 dark:border-red-800/40'} border`}>
                        {trade.type === 'BUY' ? (
                          <ArrowTrendingUpIcon className="w-7 h-7 text-emerald-600 dark:text-emerald-400" />
                        ) : (
                          <ArrowTrendingDownIcon className="w-7 h-7 text-red-600 dark:text-red-400" />
                        )}
                      </div>
                      <div>
                        <div className="flex items-center gap-2.5">
                          <h3 className="text-lg font-bold text-gray-900 dark:text-white">{trade.pair}</h3>
                          <span className="text-xs text-gray-500 dark:text-gray-400">• {trade.user}</span>
                        </div>
                        <p className="text-sm text-gray-500 dark:text-gray-400 flex items-center gap-1.5 mt-1">
                          <ClockIcon className="w-4 h-4" />
                          {trade.time}
                        </p>
                      </div>
                    </div>

                    <div className="text-right">
                      <p className={`text-2xl font-bold ${trade.profit >= 0 ? 'text-emerald-600 dark:text-emerald-400' : 'text-red-600 dark:text-red-400'}`}>
                        {trade.profit >= 0 ? '+' : ''}${Math.abs(trade.profit).toLocaleString()}
                      </p>
                      <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">PnL</p>
                    </div>
                  </div>

                  {/* Mini stats */}
                  <div className="grid grid-cols-3 gap-3 text-sm">
                    {[
                      { label: 'Amount', value: trade.amount },
                      { label: 'Price', value: `$${parseFloat(trade.price).toLocaleString()}` },
                      { label: 'Leverage', value: `${trade.leverage}x`, color: 'text-cyan-600 dark:text-cyan-400' },
                    ].map((item, i) => (
                      <div key={i} className="bg-gray-50 dark:bg-gray-800/50 rounded-lg p-3 text-center border border-gray-200 dark:border-gray-700">
                        <p className="text-xs text-gray-500 dark:text-gray-400">{item.label}</p>
                        <p className={`font-semibold ${item.color || 'text-gray-900 dark:text-white'}`}>{item.value}</p>
                      </div>
                    ))}
                  </div>

                  {/* Accuracy & expand */}
                  <div className="flex items-center justify-between mt-5 pt-4 border-t border-gray-200 dark:border-gray-700">
                    <div className="flex items-center gap-2">
                      <SparklesIcon className="w-5 h-5 text-amber-500" />
                      <span className="text-sm text-gray-600 dark:text-gray-400">AI Accuracy</span>
                      <span className="text-lg font-bold text-amber-600 dark:text-amber-400">{trade.accuracy}%</span>
                    </div>

                    <button
                      onClick={() => setExpandedId(expandedId === trade.id ? null : trade.id)}
                      className="text-cyan-600 dark:text-cyan-400 hover:text-cyan-500 dark:hover:text-cyan-300 text-sm font-medium flex items-center gap-1.5 transition"
                    >
                      {expandedId === trade.id ? 'Hide' : 'Details'}
                      {expandedId === trade.id ? <ChevronUpIcon className="w-5 h-5" /> : <ChevronDownIcon className="w-5 h-5" />}
                    </button>
                  </div>
                </div>

                {/* Expanded section */}
                <AnimatePresence>
                  {expandedId === trade.id && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="border-t border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800/40 px-5 sm:px-6 py-5 text-sm"
                    >
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <p className="text-gray-500 dark:text-gray-400">Entry Strategy</p>
                          <p className="text-gray-900 dark:text-white font-medium">Momentum + Volume Breakout</p>
                        </div>
                        <div>
                          <p className="text-gray-500 dark:text-gray-400">Risk Level</p>
                          <p className="text-gray-900 dark:text-white font-medium">Medium (SL active)</p>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </div>
  );
}