// // src/pages/Trade.js
// import React, { useState } from 'react';
// import { motion } from 'framer-motion';
// import {
//   ArrowTrendingUpIcon,
//   ArrowTrendingDownIcon,
//   CpuChipIcon,
//   ArrowsUpDownIcon,
//   ChartBarIcon,
//   BoltIcon,
// } from '@heroicons/react/24/solid';

// export default function Trade() {
//   const [tradeType, setTradeType] = useState('buy'); // 'buy' or 'sell'
//   const [amount, setAmount] = useState('');
//   const [leverage, setLeverage] = useState(10);

//   // Mock current pair data
//   const currentPair = 'BTC/USDT';
//   const currentPrice = 45230.50;
//   const priceChange24h = 3.45; // positive = green

//   return (
//     <div className="min-h-screen w-full flex flex-col bg-black text-white relative overflow-hidden">
//       {/* Animated Robotic Grid Background */}
//       <div className="absolute inset-0 opacity-10 pointer-events-none">
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
//       <div className="absolute inset-0 bg-gradient-to-br from-cyan-900/40 via-black to-purple-900/40 pointer-events-none" />

//       {/* Main Content */}
//       <div className="relative z-10 flex flex-col w-full max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 gap-6 sm:gap-8 pb-32">

//         {/* Header */}
//         <motion.div
//           initial={{ opacity: 0, y: -30 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ type: "spring", stiffness: 100 }}
//           className="text-center"
//         >
//           <div className="flex items-center justify-center gap-3 mb-2">
//             <CpuChipIcon className="w-10 h-10 text-cyan-400" />
//             <h1 className="text-2xl sm:text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-purple-400">
//               Trade Now
//             </h1>
//           </div>
//           <p className="text-sm text-gray-400">AI-powered neural trading terminal</p>
//         </motion.div>

//         {/* Current Market Snapshot */}
//         <motion.div
//           initial={{ opacity: 0, scale: 0.95 }}
//           animate={{ opacity: 1, scale: 1 }}
//           transition={{ delay: 0.2 }}
//           className="bg-black/70 backdrop-blur-2xl rounded-3xl border-2 border-cyan-500/50 shadow-2xl p-6 text-center"
//         >
//           <h2 className="text-xl sm:text-2xl font-bold text-white mb-2">{currentPair}</h2>
//           <div className="flex items-center justify-center gap-4">
//             <p className="text-3xl sm:text-4xl font-extrabold text-white">
//               ${currentPrice.toLocaleString()}
//             </p>
//             <span className={`flex items-center text-lg font-bold ${priceChange24h >= 0 ? 'text-emerald-400' : 'text-red-400'}`}>
//               {priceChange24h >= 0 ? <ArrowTrendingUpIcon className="w-6 h-6" /> : <ArrowTrendingDownIcon className="w-6 h-6" />}
//               {Math.abs(priceChange24h)}%
//             </span>
//           </div>
//           <motion.div
//             className="mt-4 h-1 bg-gradient-to-r from-cyan-400 via-purple-500 to-cyan-400 rounded-full"
//             initial={{ scaleX: 0 }}
//             animate={{ scaleX: 1 }}
//             transition={{ duration: 1.5, ease: "easeOut" }}
//           />
//         </motion.div>

//         {/* Buy/Sell Toggle */}
//         <motion.div
//           initial={{ opacity: 0, y: 20 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ delay: 0.3 }}
//           className="flex justify-center"
//         >
//           <div className="inline-flex bg-black/60 backdrop-blur-xl rounded-2xl p-1 border border-cyan-500/40 shadow-lg">
//             <motion.button
//               onClick={() => setTradeType('buy')}
//               className={`px-8 py-4 rounded-xl font-bold text-lg transition-all relative overflow-hidden ${
//                 tradeType === 'buy' ? 'text-white' : 'text-gray-400'
//               }`}
//               whileHover={{ scale: 1.05 }}
//               whileTap={{ scale: 0.95 }}
//             >
//               {tradeType === 'buy' && (
//                 <motion.div
//                   layoutId="tradeBubble"
//                   className="absolute inset-0 bg-gradient-to-r from-emerald-500 to-green-600 rounded-xl"
//                   initial={false}
//                   transition={{ type: "spring", stiffness: 300, damping: 30 }}
//                 />
//               )}
//               <span className="relative z-10 flex items-center gap-2">
//                 <ArrowTrendingUpIcon className="w-6 h-6" />
//                 BUY
//               </span>
//             </motion.button>

//             <motion.button
//               onClick={() => setTradeType('sell')}
//               className={`px-8 py-4 rounded-xl font-bold text-lg transition-all relative overflow-hidden ${
//                 tradeType === 'sell' ? 'text-white' : 'text-gray-400'
//               }`}
//               whileHover={{ scale: 1.05 }}
//               whileTap={{ scale: 0.95 }}
//             >
//               {tradeType === 'sell' && (
//                 <motion.div
//                   layoutId="tradeBubble"
//                   className="absolute inset-0 bg-gradient-to-r from-red-500 to-pink-600 rounded-xl"
//                   initial={false}
//                   transition={{ type: "spring", stiffness: 300, damping: 30 }}
//                 />
//               )}
//               <span className="relative z-10 flex items-center gap-2">
//                 <ArrowTrendingDownIcon className="w-6 h-6" />
//                 SELL
//               </span>
//             </motion.button>
//           </div>
//         </motion.div>

//         {/* Trade Form */}
//         <motion.div
//           initial={{ opacity: 0, y: 20 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ delay: 0.4 }}
//           className="bg-black/70 backdrop-blur-2xl rounded-3xl border-2 border-cyan-500/50 shadow-2xl p-6 sm:p-8"
//         >
//           {/* Amount Input */}
//           <div className="mb-6">
//             <label className="text-sm text-gray-400 mb-2 block">Amount (USDT)</label>
//             <div className="relative">
//               <input
//                 type="number"
//                 value={amount}
//                 onChange={(e) => setAmount(e.target.value)}
//                 placeholder="0.00"
//                 className="w-full px-5 py-5 bg-black/50 border-2 border-cyan-500/50 rounded-2xl text-2xl font-bold text-white placeholder-gray-600 focus:border-cyan-300 focus:outline-none transition-all"
//               />
//               <ArrowsUpDownIcon className="absolute right-4 top-1/2 -translate-y-1/2 w-6 h-6 text-cyan-400" />
//             </div>
//           </div>

//           {/* Leverage Slider */}
//           <div className="mb-8">
//             <div className="flex items-center justify-between mb-3">
//               <label className="text-sm text-gray-400 flex items-center gap-2">
//                 <BoltIcon className="w-5 h-5 text-yellow-400" />
//                 Leverage
//               </label>
//               <span className="text-2xl font-bold text-cyan-400">{leverage}x</span>
//             </div>
//             <input
//               type="range"
//               min="1"
//               max="100"
//               value={leverage}
//               onChange={(e) => setLeverage(e.target.value)}
//               className="w-full h-3 bg-gray-800 rounded-full appearance-none cursor-pointer slider-thumb"
//               style={{
//                 background: `linear-gradient(to right, #06b6d4 0%, #06b6d4 ${leverage}%, #374151 ${leverage}%, #374151 100%)`,
//               }}
//             />
//             <div className="flex justify-between text-xs text-gray-500 mt-2">
//               <span>1x</span>
//               <span>100x</span>
//             </div>
//           </div>

//           {/* Trade Summary */}
//           <div className="grid grid-cols-2 gap-4 mb-8 text-sm">
//             <div className="bg-black/50 rounded-xl p-4 border border-cyan-500/30">
//               <p className="text-gray-400">Entry Price</p>
//               <p className="text-xl font-bold text-white">${currentPrice.toLocaleString()}</p>
//             </div>
//             <div className="bg-black/50 rounded-xl p-4 border border-cyan-500/30">
//               <p className="text-gray-400">Position Size</p>
//               <p className="text-xl font-bold text-white">
//                 {amount ? `$${(amount * leverage).toFixed(2)}` : '-'}
//               </p>
//             </div>
//           </div>

//           {/* Execute Trade Button */}
//           <motion.button
//             whileHover={{ scale: 1.02 }}
//             whileTap={{ scale: 0.98 }}
//             className={`w-full py-6 rounded-2xl font-bold text-xl shadow-2xl transition-all ${
//               tradeType === 'buy'
//                 ? 'bg-gradient-to-r from-emerald-500 to-green-600 hover:shadow-emerald-500/50'
//                 : 'bg-gradient-to-r from-red-500 to-pink-600 hover:shadow-red-500/50'
//             }`}
//           >
//             <span className="flex items-center justify-center gap-3">
//               {tradeType === 'buy' ? <ArrowTrendingUpIcon className="w-8 h-8" /> : <ArrowTrendingDownIcon className="w-8 h-8" />}
//               EXECUTE {tradeType.toUpperCase()} ORDER
//             </span>
//           </motion.button>

//           <p className="text-center text-xs text-gray-500 mt-4">
//             Powered by Neural AI Engine • Risk Level: {leverage > 50 ? 'High' : leverage > 20 ? 'Medium' : 'Low'}
//           </p>
//         </motion.div>

//         {/* Mini Chart Placeholder */}
//         <motion.div
//           initial={{ opacity: 0, y: 20 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ delay: 0.5 }}
//           className="bg-black/60 backdrop-blur-xl rounded-3xl p-6 border border-cyan-500/40"
//         >
//           <div className="flex items-center justify-between mb-4">
//             <h3 className="text-lg font-bold flex items-center gap-2">
//               <ChartBarIcon className="w-6 h-6 text-cyan-400" />
//               Live Price Chart
//             </h3>
//             <span className="text-xs text-gray-400">Real-time</span>
//           </div>
//           <div className="bg-gray-900/80 border-2 border-dashed border-cyan-600/50 rounded-2xl h-48 sm:h-64 flex items-center justify-center">
//             <motion.div
//               animate={{ opacity: [0.5, 1, 0.5] }}
//               transition={{ duration: 3, repeat: Infinity }}
//               className="text-3xl font-bold text-cyan-400"
//             >
//               [NEURAL CHART LOADING...]
//             </motion.div>
//           </div>
//         </motion.div>
//       </div>

//       {/* Floating AI Assist Button */}
//       <motion.button
//         initial={{ scale: 0 }}
//         animate={{ scale: 1 }}
//         transition={{ delay: 0.7, type: "spring", stiffness: 100 }}
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
//         <CpuChipIcon className="w-8 h-8 text-white" />
//       </motion.button>

//       {/* Custom Slider Thumb Style */}
//       <style jsx>{`
//         .slider-thumb::-webkit-slider-thumb {
//           appearance: none;
//           width: 24px;
//           height: 24px;
//           background: #06b6d4;
//           border: 3px solid #000;
//           border-radius: 50%;
//           cursor: pointer;
//           box-shadow: 0 0 15px rgba(6, 182, 212, 0.6);
//         }
//         .slider-thumb::-moz-range-thumb {
//           width: 24px;
//           height: 24px;
//           background: #06b6d4;
//           border: 3px solid #000;
//           border-radius: 50%;
//           cursor: pointer;
//           box-shadow: 0 0 15px rgba(6, 182, 212, 0.6);
//         }
//       `}</style>
//     </div>
//   );
// }