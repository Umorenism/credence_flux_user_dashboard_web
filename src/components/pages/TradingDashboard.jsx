
// // src/components/TradingDashboard.jsx
// import React, { useState, useEffect } from 'react';
// import { motion, AnimatePresence } from 'framer-motion';
// import { ToastContainer, toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
// import { tradingService } from '../../api/tradingApi';

// const handleApiError = (error) => {
//   const message =
//     error?.response?.data?.message ||
//     error?.response?.data?.error ||
//     error?.message ||
//     'Failed to load data. Please try again.';
//   toast.error(message);
// };

// // Helper: Convert raw pair like "BITCOIN/USDT" → normalized object with proper ticker
// const normalizePair = (rawSymbol) => {
//   if (!rawSymbol || typeof rawSymbol !== 'string') return null;

//   let namePart, quotePart = 'USDT';
  
//   if (rawSymbol.includes('/')) {
//     [namePart, quotePart] = rawSymbol.split('/');
//   } else {
//     namePart = rawSymbol;
//   }

//   const upperName = namePart.trim().toUpperCase();

//   const nameToTicker = {
//     'BITCOIN': 'BTC',
//     'ETHEREUM': 'ETH',
//     'BNB': 'BNB',
//     'SOL': 'SOL',
//     'DOGE': 'DOGE',
//     'XRP': 'XRP',
//     'LTC': 'LTC',
//     'ADA': 'ADA',
//     'CAKE': 'CAKE',
//     'PEPE': 'PEPE',
//     'WFI': 'WFI',
//     'AVAX': 'AVAX',
//     'BCH': 'BCH',
//     'UNI': 'UNI',
//   };

//   const base = nameToTicker[upperName] || upperName;

//   quotePart = quotePart.trim().toUpperCase();

//   return {
//     raw: rawSymbol,
//     displaySymbol: `${base}/${quotePart}`,
//     apiSymbol: `${base}${quotePart}`,
//     baseAsset: base,
//     quoteAsset: quotePart,
//   };
// };

// export default function TradingDashboard() {
//   const [pairs, setPairs] = useState([]);           // array of normalized pair objects
//   const [portfolio, setPortfolio] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [selectedPair, setSelectedPair] = useState(null);
//   const [showTradeModal, setShowTradeModal] = useState(false);
//   const [tradeSide, setTradeSide] = useState('buy');
//   const [tradeAmount, setTradeAmount] = useState('');
//   const [showSuccessModal, setShowSuccessModal] = useState(false);

//   useEffect(() => {
//     const loadData = async () => {
//       setLoading(true);
//       setError(null);
//       try {
//         const [pairsResponse, portfolioResponse] = await Promise.all([
//           tradingService.getPairs(),
//           tradingService.getPortfolio(),
//         ]);

//         let receivedPairs = [];
//         if (pairsResponse?.data?.success && Array.isArray(pairsResponse.data.data)) {
//           receivedPairs = pairsResponse.data.data;
//         } else if (Array.isArray(pairsResponse?.data)) {
//           receivedPairs = pairsResponse.data;
//         }

//         const normalized = receivedPairs
//           .map(normalizePair)
//           .filter(Boolean)
//           .sort((a, b) => a.baseAsset.localeCompare(b.baseAsset));

//         // TODO: Replace dummy data with real price fetch
//         const pairsWithPrices = normalized.map(pair => ({
//           ...pair,
//           // Placeholder — replace with real API data
//           currentPrice: (Math.random() * 100000 + 500).toFixed(2), // fake $500–100k range
//           change24h: (Math.random() * 20 - 10).toFixed(2),         // -10% to +10%
//         }));

//         setPairs(pairsWithPrices);
//         setPortfolio(portfolioResponse?.data ?? null);

//         if (normalized.length === 0) {
//           toast.info('No trading pairs available at this time.');
//         }
//       } catch (err) {
//         handleApiError(err);
//         setError('Could not load trading pairs. Please check your connection.');
//       } finally {
//         setLoading(false);
//       }
//     };

//     loadData();
//   }, []);

//   const openTradeModal = (pairObj) => {
//     setSelectedPair(pairObj);
//     setTradeSide('buy');
//     setTradeAmount('');
//     setShowTradeModal(true);
//   };

//   const hasEnoughToSell = () => {
//     if (!portfolio?.holdings || !selectedPair) return false;
//     const base = selectedPair.baseAsset;
//     const heldAmount = Number(portfolio.holdings[base] || 0);
//     return heldAmount >= Number(tradeAmount || 0);
//   };

//   const handleExecuteTrade = async () => {
//     const amount = Number(tradeAmount);
//     if (isNaN(amount) || amount <= 0) {
//       toast.warn('Enter a valid amount greater than 0');
//       return;
//     }

//     if (tradeSide === 'sell' && !hasEnoughToSell()) {
//       toast.error(`Insufficient ${selectedPair.baseAsset} balance`);
//       return;
//     }

//     setLoading(true);
//     try {
//       const payload = {
//         side: tradeSide.toUpperCase(),
//         symbol: selectedPair.apiSymbol,
//         amount: amount,
//       };

//       await tradingService.executeTrade(payload);

//       toast.success(
//         `Order placed: ${tradeSide.toUpperCase()} ${amount} USDT – ${selectedPair.displaySymbol}`
//       );
//       setShowTradeModal(false);
//       setShowSuccessModal(true);
//       setTradeAmount('');
//     } catch (err) {
//       handleApiError(err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gray-50 dark:bg-gray-950 pb-16">
//       <ToastContainer position="top-center" autoClose={3500} theme="colored" limit={2} />

//       <header className="sticky top-0 z-10 bg-white/95 dark:bg-gray-900/95 backdrop-blur-sm border-b border-gray-200 dark:border-gray-800 px-4 py-5">
//         <div className="max-w-7xl mx-auto flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
//           <div>
//             <h1 className="text-2xl md:text-3xl font-bold text-orange-600 dark:text-orange-400">
//               Crypto Trading
//             </h1>
//             {portfolio && (
//               <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
//                 Invested: <strong className="text-green-600">${Number(portfolio.totalInvested || 0).toLocaleString()}</strong>
//                 {' • '} PnL: <strong className={Number(portfolio.totalRealizedPnL || 0) >= 0 ? 'text-green-600' : 'text-red-600'}>
//                   ${Number(portfolio.totalRealizedPnL || 0).toLocaleString()}
//                 </strong>
//               </p>
//             )}
//           </div>
//           <button
//             onClick={() => window.location.reload()}
//             disabled={loading}
//             className="px-5 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium disabled:opacity-60 transition"
//           >
//             {loading ? 'Loading...' : 'Refresh'}
//           </button>
//         </div>
//       </header>

//       <main className="max-w-7xl mx-auto px-4 py-8">
//         {loading ? (
//           <div className="flex flex-col items-center justify-center py-20">
//             <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-orange-500"></div>
//             <p className="mt-4 text-gray-600 dark:text-gray-400">Loading available pairs...</p>
//           </div>
//         ) : error ? (
//           <div className="text-center py-16 text-red-600 dark:text-red-400">
//             {error}
//           </div>
//         ) : pairs.length === 0 ? (
//           <div className="text-center py-16 text-gray-500 dark:text-gray-400">
//             No trading pairs available right now.
//           </div>
//         ) : (
//           <div className="grid grid-cols-1 sm:grid-cols-1 lg:grid-cols-1 xl:grid-cols-1 gap-5">
//             {pairs.map((pair) => {
//               const isPositive = Number(pair.change24h) >= 0;
//               return (
//                 <motion.div
//                   key={pair.apiSymbol}
//                   whileHover={{ scale: 1.02, y: -2 }}
//                   className="bg-white dark:bg-gray-800 rounded-xl shadow border border-gray-200 dark:border-gray-700 hover:border-orange-500/40 transition-all duration-200 overflow-hidden"
//                 >
//                   <div className="p-5 flex items-center justify-between gap-4">
//                     {/* Left: Symbol */}
//                     <div className="flex items-baseline gap-2 min-w-0">
//                       <h3 className="text-xl font-bold tracking-tight truncate">
//                         {pair.baseAsset}
//                       </h3>
//                       <span className="text-sm font-medium text-gray-500 dark:text-gray-400">
//                         /{pair.quoteAsset}
//                       </span>
//                     </div>

//                     {/* Middle: Price + Change */}
//                     <div className="text-right flex-1">
//                       <div className="text-lg font-semibold">
//                         ${Number(pair.currentPrice).toLocaleString()}
//                       </div>
//                       <div className={`text-sm font-medium ${isPositive ? 'text-green-500' : 'text-red-500'}`}>
//                         {isPositive ? '+' : ''}{pair.change24h}%
//                       </div>
//                     </div>

//                     {/* Right: Trade Button */}
//                     <button
//                       onClick={() => openTradeModal(pair)}
//                       className="px-5 py-2.5 bg-orange-600 hover:bg-orange-700 text-white text-sm font-medium rounded-lg transition whitespace-nowrap"
//                     >
//                       Trade
//                     </button>
//                   </div>
//                 </motion.div>
//               );
//             })}
//           </div>
//         )}
//       </main>

//       {/* Trade Modal */}
//       <AnimatePresence>
//         {showTradeModal && selectedPair && (
//           <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4">
//             <motion.div
//               initial={{ scale: 0.9, opacity: 0 }}
//               animate={{ scale: 1, opacity: 1 }}
//               exit={{ scale: 0.9, opacity: 0 }}
//               className="bg-white dark:bg-gray-900 rounded-2xl p-6 w-full max-w-md border border-gray-200 dark:border-gray-700 shadow-2xl"
//             >
//               <div className="flex justify-between items-center mb-5">
//                 <h2 className="text-2xl font-bold text-orange-600 dark:text-orange-400">
//                   {tradeSide.toUpperCase()} {selectedPair.displaySymbol}
//                 </h2>
//                 <button
//                   onClick={() => setShowTradeModal(false)}
//                   className="text-4xl text-gray-500 hover:text-gray-700 dark:hover:text-gray-300"
//                 >
//                   ×
//                 </button>
//               </div>

//               <div className="grid grid-cols-2 gap-3 mb-6">
//                 <button
//                   onClick={() => setTradeSide('buy')}
//                   className={`py-3 rounded-xl font-semibold ${
//                     tradeSide === 'buy' ? 'bg-green-600 text-white' : 'bg-gray-200 dark:bg-gray-700'
//                   }`}
//                 >
//                   BUY
//                 </button>
//                 <button
//                   onClick={() => setTradeSide('sell')}
//                   disabled={!hasEnoughToSell()}
//                   className={`py-3 rounded-xl font-semibold ${
//                     tradeSide === 'sell' ? 'bg-red-600 text-white' : 'bg-gray-200 dark:bg-gray-700'
//                   } ${!hasEnoughToSell() ? 'opacity-50 cursor-not-allowed' : ''}`}
//                 >
//                   SELL
//                 </button>
//               </div>

//               <div className="mb-6">
//                 <label className="block text-sm text-gray-500 dark:text-gray-400 mb-2">
//                   Amount (USDT)
//                 </label>
//                 <input
//                   type="number"
//                   value={tradeAmount}
//                   onChange={(e) => setTradeAmount(e.target.value)}
//                   placeholder="0.00"
//                   step="any"
//                   className="w-full p-4 text-2xl bg-gray-50 dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500"
//                 />
//               </div>

//               <div className="flex gap-3">
//                 <button
//                   onClick={() => setShowTradeModal(false)}
//                   className="flex-1 py-3 bg-gray-200 dark:bg-gray-700 rounded-xl font-medium hover:bg-gray-300 dark:hover:bg-gray-600"
//                 >
//                   Cancel
//                 </button>
//                 <button
//                   onClick={handleExecuteTrade}
//                   disabled={loading || !tradeAmount || Number(tradeAmount) <= 0}
//                   className="flex-1 py-3 bg-orange-600 hover:bg-orange-700 text-white rounded-xl font-bold disabled:opacity-60"
//                 >
//                   {loading ? 'Processing...' : 'Confirm Order'}
//                 </button>
//               </div>
//             </motion.div>
//           </div>
//         )}
//       </AnimatePresence>

//       {/* Success Modal */}
//       <AnimatePresence>
//         {showSuccessModal && (
//           <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4">
//             <motion.div
//               initial={{ scale: 0.8, opacity: 0 }}
//               animate={{ scale: 1, opacity: 1 }}
//               exit={{ scale: 0.8, opacity: 0 }}
//               className="bg-white dark:bg-gray-900 rounded-2xl p-8 text-center max-w-sm w-full"
//             >
//               <div className="text-6xl mb-4">✅</div>
//               <h2 className="text-2xl font-bold mb-3 text-green-600 dark:text-green-400">
//                 Order Placed!
//               </h2>
//               <p className="text-gray-600 dark:text-gray-300 mb-6">
//                 {tradeSide.toUpperCase()} {tradeAmount} USDT – {selectedPair.displaySymbol}
//               </p>
//               <button
//                 onClick={() => setShowSuccessModal(false)}
//                 className="w-full py-3 bg-orange-600 hover:bg-orange-700 text-white rounded-xl font-bold"
//               >
//                 Continue Trading
//               </button>
//             </motion.div>
//           </div>
//         )}
//       </AnimatePresence>
//     </div>
//   );
// }



// import React, { useState, useEffect } from 'react';
// import { motion, AnimatePresence } from 'framer-motion';
// import { ToastContainer, toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
// import { tradingService } from '../../api/tradingApi';

// const MIN_TRADE_USDT = 50;
// const MAX_TRADE_USDT = 10000;

// const handleApiError = (error) => {
//   const message =
//     error?.response?.data?.message ||
//     error?.response?.data?.error ||
//     error?.message ||
//     'Failed to load data. Please try again.';
//   toast.error(message);
// };

// const normalizePair = (rawSymbol) => {
//   if (!rawSymbol || typeof rawSymbol !== 'string') return null;

//   let namePart, quotePart = 'USDT';
  
//   if (rawSymbol.includes('/')) {
//     [namePart, quotePart] = rawSymbol.split('/');
//   } else {
//     namePart = rawSymbol;
//   }

//   const upperName = namePart.trim().toUpperCase();

//   const nameToTicker = {
//     'BITCOIN': 'BTC',
//     'ETHEREUM': 'ETH',
//     'BNB': 'BNB',
//     'SOL': 'SOL',
//     'DOGE': 'DOGE',
//     'XRP': 'XRP',
//     'LTC': 'LTC',
//     'ADA': 'ADA',
//     'CAKE': 'CAKE',
//     'PEPE': 'PEPE',
//     'WFI': 'WFI',
//     'AVAX': 'AVAX',
//     'BCH': 'BCH',
//     'UNI': 'UNI',
//   };

//   const base = nameToTicker[upperName] || upperName;

//   quotePart = quotePart.trim().toUpperCase();

//   return {
//     raw: rawSymbol,
//     displaySymbol: `${base}/${quotePart}`,
//     apiSymbol: `${base}${quotePart}`,
//     baseAsset: base,
//     quoteAsset: quotePart,
//   };
// };

// export default function TradingDashboard() {
//   const [pairs, setPairs] = useState([]);
//   const [portfolio, setPortfolio] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [selectedPair, setSelectedPair] = useState(null);
//   const [showTradeModal, setShowTradeModal] = useState(false);
//   const [tradeSide, setTradeSide] = useState('buy');
//   const [tradeAmount, setTradeAmount] = useState('');
//   const [showSuccessModal, setShowSuccessModal] = useState(false);

//   useEffect(() => {
//     const loadData = async () => {
//       setLoading(true);
//       setError(null);
//       try {
//         const [pairsResponse, portfolioResponse] = await Promise.all([
//           tradingService.getPairs(),
//           tradingService.getPortfolio(),
//         ]);

//         let receivedPairs = [];
//         if (pairsResponse?.data?.success && Array.isArray(pairsResponse.data.data)) {
//           receivedPairs = pairsResponse.data.data;
//         } else if (Array.isArray(pairsResponse?.data)) {
//           receivedPairs = pairsResponse.data;
//         }

//         const normalized = receivedPairs
//           .map(normalizePair)
//           .filter(Boolean)
//           .sort((a, b) => a.baseAsset.localeCompare(b.baseAsset));

//         // TODO: Replace dummy data with real price fetch
//         const pairsWithPrices = normalized.map(pair => ({
//           ...pair,
//           currentPrice: (Math.random() * 100000 + 500).toFixed(2), // fake $500–100k range
//           change24h: (Math.random() * 20 - 10).toFixed(2),
//         }));

//         setPairs(pairsWithPrices);
//         setPortfolio(portfolioResponse?.data ?? null);

//         if (normalized.length === 0) {
//           toast.info('No trading pairs available at this time.');
//         }
//       } catch (err) {
//         handleApiError(err);
//         setError('Could not load trading pairs. Please check your connection.');
//       } finally {
//         setLoading(false);
//       }
//     };

//     loadData();
//   }, []);

//   const openTradeModal = (pairObj) => {
//     setSelectedPair(pairObj);
//     setTradeSide('buy');
//     setTradeAmount('');
//     setShowTradeModal(true);
//   };

//   const hasEnoughToSell = () => {
//     if (!portfolio?.holdings || !selectedPair) return false;
//     const base = selectedPair.baseAsset;
//     const heldAmount = Number(portfolio.holdings[base] || 0);
//     const valueInUsdt = heldAmount * Number(selectedPair.currentPrice || 0);
//     return valueInUsdt >= Number(tradeAmount || 0);
//   };

//   const getEstimatedQuantity = () => {
//     if (!selectedPair?.currentPrice || Number(selectedPair.currentPrice) <= 0) return 0;
//     return Number(tradeAmount) / Number(selectedPair.currentPrice);
//   };

//   const handleExecuteTrade = async () => {
//     const amount = Number(tradeAmount);
//     if (isNaN(amount) || amount <= 0) {
//       toast.warn('Enter a valid amount greater than 0');
//       return;
//     }

//     if (amount < MIN_TRADE_USDT) {
//       toast.error(`Minimum trade amount is $${MIN_TRADE_USDT}`);
//       return;
//     }

//     if (amount > MAX_TRADE_USDT) {
//       toast.error(`Maximum trade amount is $${MAX_TRADE_USDT}`);
//       return;
//     }

//     if (tradeSide === 'sell' && !hasEnoughToSell()) {
//       toast.error(`Insufficient ${selectedPair.baseAsset} balance`);
//       return;
//     }

//     setLoading(true);
//     try {
//       const payload = {
//         side: tradeSide.toUpperCase(),
//         symbol: selectedPair.apiSymbol,
//         amount: amount,
//       };

//       await tradingService.executeTrade(payload);

//       toast.success(
//         `Order placed: ${tradeSide.toUpperCase()} ${amount} USDT – ${selectedPair.displaySymbol}`
//       );
//       setShowTradeModal(false);
//       setShowSuccessModal(true);
//       setTradeAmount('');
//     } catch (err) {
//       handleApiError(err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const estimatedQty = getEstimatedQuantity().toFixed(6);
//   const isAmountValid = Number(tradeAmount) >= MIN_TRADE_USDT && Number(tradeAmount) <= MAX_TRADE_USDT;

//   return (
//     <div className="min-h-screen bg-gray-50 dark:bg-gray-950 pb-16">
//       <ToastContainer position="top-center" autoClose={3500} theme="colored" limit={2} />

//       <header className="sticky top-0 z-10 bg-white/95 dark:bg-gray-900/95 backdrop-blur-sm border-b border-gray-200 dark:border-gray-800 px-4 py-5">
//         <div className="max-w-7xl mx-auto flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
//           <div>
//             <h1 className="text-2xl md:text-3xl font-bold text-orange-600 dark:text-orange-400">
//               Crypto Trading
//             </h1>
//             {portfolio && (
//               <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
//                 Invested: <strong className="text-green-600">${Number(portfolio.totalInvested || 0).toLocaleString()}</strong>
//                 {' • '} PnL: <strong className={Number(portfolio.totalRealizedPnL || 0) >= 0 ? 'text-green-600' : 'text-red-600'}>
//                   ${Number(portfolio.totalRealizedPnL || 0).toLocaleString()}
//                 </strong>
//               </p>
//             )}
//           </div>
//           <button
//             onClick={() => window.location.reload()}
//             disabled={loading}
//             className="px-5 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium disabled:opacity-60 transition"
//           >
//             {loading ? 'Loading...' : 'Refresh'}
//           </button>
//         </div>
//       </header>

//       <main className="max-w-7xl mx-auto px-4 py-8">
//         {loading ? (
//           <div className="flex flex-col items-center justify-center py-20">
//             <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-orange-500"></div>
//             <p className="mt-4 text-gray-600 dark:text-gray-400">Loading available pairs...</p>
//           </div>
//         ) : error ? (
//           <div className="text-center py-16 text-red-600 dark:text-red-400">
//             {error}
//           </div>
//         ) : pairs.length === 0 ? (
//           <div className="text-center py-16 text-gray-500 dark:text-gray-400">
//             No trading pairs available right now.
//           </div>
//         ) : (
//           <div className="grid grid-cols-1 sm:grid-cols-1 lg:grid-cols-1 xl:grid-cols-1 gap-5">
//             {pairs.map((pair) => {
//               const isPositive = Number(pair.change24h) >= 0;
//               return (
//                 <motion.div
//                   key={pair.apiSymbol}
//                   whileHover={{ scale: 1.02, y: -2 }}
//                   className="bg-white dark:bg-gray-800 rounded-xl shadow border border-gray-200 dark:border-gray-700 hover:border-orange-500/40 transition-all duration-200 overflow-hidden"
//                 >
//                   <div className="p-5 flex items-center justify-between gap-4">
//                     {/* Left: Symbol */}
//                     <div className="flex items-baseline gap-2 min-w-0">
//                       <h3 className="text-xl font-bold tracking-tight truncate">
//                         {pair.baseAsset}
//                       </h3>
//                       <span className="text-sm font-medium text-gray-500 dark:text-gray-400">
//                         /{pair.quoteAsset}
//                       </span>
//                     </div>

//                     {/* Middle: Price + Change */}
//                     <div className="text-right flex-1">
//                       <div className="text-lg font-semibold">
//                         ${Number(pair.currentPrice).toLocaleString()}
//                       </div>
//                       <div className={`text-sm font-medium ${isPositive ? 'text-green-500' : 'text-red-500'}`}>
//                         {isPositive ? '+' : ''}{pair.change24h}%
//                       </div>
//                     </div>

//                     {/* Right: Trade Button */}
//                     <button
//                       onClick={() => openTradeModal(pair)}
//                       className="px-5 py-2.5 bg-orange-600 hover:bg-orange-700 text-white text-sm font-medium rounded-lg transition whitespace-nowrap"
//                     >
//                       Trade
//                     </button>
//                   </div>
//                 </motion.div>
//               );
//             })}
//           </div>
//         )}
//       </main>

//       {/* Trade Modal - kept original structure */}
//       <AnimatePresence>
//         {showTradeModal && selectedPair && (
//           <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4">
//             <motion.div
//               initial={{ scale: 0.9, opacity: 0 }}
//               animate={{ scale: 1, opacity: 1 }}
//               exit={{ scale: 0.9, opacity: 0 }}
//               className="bg-white dark:bg-gray-900 rounded-2xl p-6 w-full max-w-md border border-gray-200 dark:border-gray-700 shadow-2xl"
//             >
//               <div className="flex justify-between items-center mb-5">
//                 <h2 className="text-2xl font-bold text-orange-600 dark:text-orange-400">
//                   {tradeSide.toUpperCase()} {selectedPair.displaySymbol}
//                 </h2>
//                 <button
//                   onClick={() => setShowTradeModal(false)}
//                   className="text-4xl text-gray-500 hover:text-gray-700 dark:hover:text-gray-300"
//                 >
//                   ×
//                 </button>
//               </div>

//               <div className="grid grid-cols-2 gap-3 mb-6">
//                 <button
//                   onClick={() => setTradeSide('buy')}
//                   className={`py-3 rounded-xl font-semibold ${
//                     tradeSide === 'buy' ? 'bg-green-600 text-white' : 'bg-gray-200 dark:bg-gray-700'
//                   }`}
//                 >
//                   BUY
//                 </button>
//                 <button
//                   onClick={() => setTradeSide('sell')}
//                   disabled={!hasEnoughToSell()}
//                   className={`py-3 rounded-xl font-semibold ${
//                     tradeSide === 'sell' ? 'bg-red-600 text-white' : 'bg-gray-200 dark:bg-gray-700'
//                   } ${!hasEnoughToSell() ? 'opacity-50 cursor-not-allowed' : ''}`}
//                 >
//                   SELL
//                 </button>
//               </div>

//               <div className="mb-6">
//                 <label className="block text-sm text-gray-500 dark:text-gray-400 mb-2">
//                   Amount (USDT)
//                 </label>
//                 <input
//                   type="number"
//                   value={tradeAmount}
//                   onChange={(e) => setTradeAmount(e.target.value)}
//                   placeholder="0.00"
//                   step="any"
//                   className="w-full p-4 text-2xl bg-gray-50 dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500"
//                 />

//                 {tradeAmount && Number(tradeAmount) > 0 && (
//                   <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
//                     ≈ {estimatedQty} {selectedPair.baseAsset}
//                     {Number(tradeAmount) < MIN_TRADE_USDT && <span className="text-red-500 ml-2"> (below minimum)</span>}
//                     {Number(tradeAmount) > MAX_TRADE_USDT && <span className="text-red-500 ml-2"> (exceeds maximum)</span>}
//                   </p>
//                 )}
//               </div>

//               <div className="flex gap-3">
//                 <button
//                   onClick={() => setShowTradeModal(false)}
//                   className="flex-1 py-3 bg-gray-200 dark:bg-gray-700 rounded-xl font-medium hover:bg-gray-300 dark:hover:bg-gray-600"
//                 >
//                   Cancel
//                 </button>
//                 <button
//                   onClick={handleExecuteTrade}
//                   disabled={loading || !isAmountValid || (tradeSide === 'sell' && !hasEnoughToSell())}
//                   className="flex-1 py-3 bg-orange-600 hover:bg-orange-700 text-white rounded-xl font-bold disabled:opacity-60"
//                 >
//                   {loading ? 'Processing...' : 'Confirm Order'}
//                 </button>
//               </div>
//             </motion.div>
//           </div>
//         )}
//       </AnimatePresence>

//       {/* Success Modal - unchanged */}
//       <AnimatePresence>
//         {showSuccessModal && (
//           <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4">
//             <motion.div
//               initial={{ scale: 0.8, opacity: 0 }}
//               animate={{ scale: 1, opacity: 1 }}
//               exit={{ scale: 0.8, opacity: 0 }}
//               className="bg-white dark:bg-gray-900 rounded-2xl p-8 text-center max-w-sm w-full"
//             >
//               <div className="text-6xl mb-4">✅</div>
//               <h2 className="text-2xl font-bold mb-3 text-green-600 dark:text-green-400">
//                 Order Placed!
//               </h2>
//               <p className="text-gray-600 dark:text-gray-300 mb-6">
//                 {tradeSide.toUpperCase()} {tradeAmount} USDT – {selectedPair.displaySymbol}
//               </p>
//               <button
//                 onClick={() => setShowSuccessModal(false)}
//                 className="w-full py-3 bg-orange-600 hover:bg-orange-700 text-white rounded-xl font-bold"
//               >
//                 Continue Trading
//               </button>
//             </motion.div>
//           </div>
//         )}
//       </AnimatePresence>
//     </div>
//   );
// }





import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { tradingService } from '../../api/tradingApi';

const MIN_TRADE_USDT = 50;
const MAX_TRADE_USDT = 10000;

const handleApiError = (error) => {
  const message =
    error?.response?.data?.message ||
    error?.response?.data?.error ||
    error?.message ||
    'Failed to load data. Please try again.';
  toast.error(message);
};

const normalizePair = (rawSymbol) => {
  if (!rawSymbol || typeof rawSymbol !== 'string') return null;

  let namePart, quotePart = 'USDT';
  
  if (rawSymbol.includes('/')) {
    [namePart, quotePart] = rawSymbol.split('/');
  } else {
    namePart = rawSymbol;
  }

  const upperName = namePart.trim().toUpperCase();

  const nameToTicker = {
    'BITCOIN': 'BTC',
    'ETHEREUM': 'ETH',
    'BNB': 'BNB',
    'SOL': 'SOL',
    'DOGE': 'DOGE',
    'XRP': 'XRP',
    'LTC': 'LTC',
    'ADA': 'ADA',
    'CAKE': 'CAKE',
    'PEPE': 'PEPE',
    'WFI': 'WFI',
    'AVAX': 'AVAX',
    'BCH': 'BCH',
    'UNI': 'UNI',
  };

  const base = nameToTicker[upperName] || upperName;
  quotePart = quotePart.trim().toUpperCase();

  return {
    raw: rawSymbol,
    displaySymbol: `${base}/${quotePart}`,
    apiSymbol: `${base}${quotePart}`,
    baseAsset: base,
    quoteAsset: quotePart,
  };
};

export default function TradingDashboard() {
  const [pairs, setPairs] = useState([]);
  const [portfolio, setPortfolio] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedPair, setSelectedPair] = useState(null);
  const [showTradeModal, setShowTradeModal] = useState(false);
  const [tradeSide, setTradeSide] = useState('buy');
  const [tradeAmount, setTradeAmount] = useState('');
  const [orderDuration, setOrderDuration] = useState('GTC');
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      setError(null);
      try {
        const [pairsResponse, portfolioResponse] = await Promise.all([
          tradingService.getPairs(),
          tradingService.getPortfolio(),
        ]);

        let receivedPairs = [];
        if (pairsResponse?.data?.success && Array.isArray(pairsResponse.data.data)) {
          receivedPairs = pairsResponse.data.data;
        } else if (Array.isArray(pairsResponse?.data)) {
          receivedPairs = pairsResponse.data;
        }

        const normalized = receivedPairs
          .map(normalizePair)
          .filter(Boolean)
          .sort((a, b) => a.baseAsset.localeCompare(b.baseAsset));

        // TODO: Replace with real-time price feed (WebSocket / polling)
        const pairsWithPrices = normalized.map(pair => ({
          ...pair,
          currentPrice: (Math.random() * 100000 + 500).toFixed(2), // placeholder
          change24h: (Math.random() * 20 - 10).toFixed(2),
        }));

        setPairs(pairsWithPrices);
        setPortfolio(portfolioResponse?.data ?? null);

        if (normalized.length === 0) {
          toast.info('No trading pairs available at this time.');
        }
      } catch (err) {
        handleApiError(err);
        setError('Could not load trading pairs. Please check your connection.');
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  const openTradeModal = (pairObj) => {
    setSelectedPair(pairObj);
    setTradeSide('buy');
    setTradeAmount('');
    setOrderDuration('GTC');
    setShowTradeModal(true);
  };

  const hasEnoughToSell = () => {
    if (!portfolio?.holdings || !selectedPair) return false;
    const base = selectedPair.baseAsset;
    const heldAmount = Number(portfolio.holdings[base] || 0);
    const valueInUsdt = heldAmount * Number(selectedPair.currentPrice || 0);
    return valueInUsdt >= Number(tradeAmount || 0);
  };

  const getEstimatedQuantity = () => {
    if (!selectedPair?.currentPrice || Number(selectedPair.currentPrice) <= 0) return 0;
    return Number(tradeAmount) / Number(selectedPair.currentPrice);
  };

  const estimatedQty = getEstimatedQuantity().toFixed(6);
  const isAmountValid =
    tradeAmount !== '' &&
    !isNaN(Number(tradeAmount)) &&
    Number(tradeAmount) >= MIN_TRADE_USDT &&
    Number(tradeAmount) <= MAX_TRADE_USDT;

  const handleExecuteTrade = async () => {
    const amount = Number(tradeAmount);
    if (isNaN(amount) || amount <= 0) {
      toast.warn('Enter a valid amount greater than 0');
      return;
    }

    if (amount < MIN_TRADE_USDT) {
      toast.error(`Minimum trade amount is $${MIN_TRADE_USDT}`);
      return;
    }

    if (amount > MAX_TRADE_USDT) {
      toast.error(`Maximum trade amount is $${MAX_TRADE_USDT}`);
      return;
    }

    if (tradeSide === 'sell' && !hasEnoughToSell()) {
      toast.error(`Insufficient ${selectedPair.baseAsset} balance`);
      return;
    }

    setLoading(true);
    try {
      const payload = {
        side: tradeSide.toUpperCase(),
        symbol: selectedPair.apiSymbol,
        amount: amount,
        timeInForce: orderDuration,           // GTC, DAY, GTD_48h, etc.
        // You can compute & add expiry timestamp if backend expects it:
        // expiry: orderDuration === 'GTD_48h' ? Date.now() + 48*60*60*1000 : undefined,
      };

      await tradingService.executeTrade(payload);

      toast.success(
        `${tradeSide.toUpperCase()} order placed: $${amount.toLocaleString()} USDT • ${selectedPair.displaySymbol} • ${orderDuration}`
      );

      setShowTradeModal(false);
      setShowSuccessModal(true);
      setTradeAmount('');
      setOrderDuration('GTC');
    } catch (err) {
      handleApiError(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 pb-16">
      <ToastContainer position="top-center" autoClose={3500} theme="colored" limit={2} />

      {/* Header & main content unchanged – keeping it short */}
      <header className="sticky top-0 z-10 bg-white/95 dark:bg-gray-900/95 backdrop-blur-sm border-b border-gray-200 dark:border-gray-800 px-4 py-5">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-orange-600 dark:text-orange-400">
              Crypto Trading
            </h1>
            {portfolio && (
              <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
                Invested: <strong className="text-green-600">${Number(portfolio.totalInvested || 0).toLocaleString()}</strong>
                {' • '} PnL: <strong className={Number(portfolio.totalRealizedPnL || 0) >= 0 ? 'text-green-600' : 'text-red-600'}>
                  ${Number(portfolio.totalRealizedPnL || 0).toLocaleString()}
                </strong>
              </p>
            )}
          </div>
          <button
            onClick={() => window.location.reload()}
            disabled={loading}
            className="px-5 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium disabled:opacity-60 transition"
          >
            {loading ? 'Loading...' : 'Refresh'}
          </button>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-8">
        {/* ... pair list rendering remains the same ... */}
        {loading ? (
          <div className="flex flex-col items-center justify-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-orange-500"></div>
            <p className="mt-4 text-gray-600 dark:text-gray-400">Loading available pairs...</p>
          </div>
        ) : error ? (
          <div className="text-center py-16 text-red-600 dark:text-red-400">{error}</div>
        ) : pairs.length === 0 ? (
          <div className="text-center py-16 text-gray-500 dark:text-gray-400">
            No trading pairs available right now.
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-1 lg:grid-cols-1 xl:grid-cols-1 gap-5">
            {pairs.map((pair) => {
              const isPositive = Number(pair.change24h) >= 0;
              return (
                <motion.div
                  key={pair.apiSymbol}
                  whileHover={{ scale: 1.02, y: -2 }}
                  className="bg-white dark:bg-gray-800 rounded-xl shadow border border-gray-200 dark:border-gray-700 hover:border-orange-500/40 transition-all duration-200 overflow-hidden"
                >
                  <div className="p-5 flex items-center justify-between gap-4">
                    <div className="flex items-baseline gap-2 min-w-0">
                      <h3 className="text-xl font-bold tracking-tight truncate">
                        {pair.baseAsset}
                      </h3>
                      <span className="text-sm font-medium text-gray-500 dark:text-gray-400">
                        /{pair.quoteAsset}
                      </span>
                    </div>
                    <div className="text-right flex-1">
                      <div className="text-lg font-semibold">
                        ${Number(pair.currentPrice).toLocaleString()}
                      </div>
                      <div className={`text-sm font-medium ${isPositive ? 'text-green-500' : 'text-red-500'}`}>
                        {isPositive ? '+' : ''}{pair.change24h}%
                      </div>
                    </div>
                    <button
                      onClick={() => openTradeModal(pair)}
                      className="px-5 py-2.5 bg-orange-600 hover:bg-orange-700 text-white text-sm font-medium rounded-lg transition whitespace-nowrap"
                    >
                      Trade
                    </button>
                  </div>
                </motion.div>
              );
            })}
          </div>
        )}
      </main>

      {/* ──────────────────────────────────────────────── */}
      {/*                UPDATED TRADE MODAL                 */}
      {/* ──────────────────────────────────────────────── */}
      <AnimatePresence>
        {showTradeModal && selectedPair && (
          <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4">
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white dark:bg-gray-900 rounded-2xl p-6 w-full max-w-md border border-gray-200 dark:border-gray-700 shadow-2xl"
            >
              <div className="flex justify-between items-center mb-5">
                <h2 className="text-2xl font-bold text-orange-600 dark:text-orange-400">
                  {tradeSide.toUpperCase()} {selectedPair.displaySymbol}
                </h2>
                <button
                  onClick={() => setShowTradeModal(false)}
                  className="text-4xl text-gray-500 hover:text-gray-700 dark:hover:text-gray-300"
                >
                  ×
                </button>
              </div>

              {/* Live Market Price */}
              <div className="mb-6 p-4 bg-gray-50 dark:bg-gray-800 rounded-xl text-center">
                <p className="text-sm text-gray-500 dark:text-gray-400">Current Market Price</p>
                <p className="text-3xl font-bold text-orange-600 dark:text-orange-400">
                  ${Number(selectedPair.currentPrice).toLocaleString(undefined, {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                  })}
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                  24h change: {Number(selectedPair.change24h) >= 0 ? '+' : ''}
                  {selectedPair.change24h}%
                </p>
              </div>

              <div className="grid grid-cols-2 gap-3 mb-6">
                <button
                  onClick={() => setTradeSide('buy')}
                  className={`py-3 rounded-xl font-semibold ${
                    tradeSide === 'buy' ? 'bg-green-600 text-white' : 'bg-gray-200 dark:bg-gray-700'
                  }`}
                >
                  BUY
                </button>
                <button
                  onClick={() => setTradeSide('sell')}
                  disabled={!hasEnoughToSell()}
                  className={`py-3 rounded-xl font-semibold ${
                    tradeSide === 'sell' ? 'bg-red-600 text-white' : 'bg-gray-200 dark:bg-gray-700'
                  } ${!hasEnoughToSell() ? 'opacity-50 cursor-not-allowed' : ''}`}
                >
                  SELL
                </button>
              </div>

              <div className="mb-6">
                <label className="block text-sm text-gray-500 dark:text-gray-400 mb-2">
                  Amount (USDT)
                </label>
                <input
                  type="number"
                  value={tradeAmount}
                  onChange={(e) => setTradeAmount(e.target.value)}
                  placeholder="0.00"
                  step="any"
                  className="w-full p-4 text-2xl bg-gray-50 dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500"
                />

                <div className="mt-2 flex justify-between text-sm text-gray-600 dark:text-gray-400">
                  <span>Min: <strong>${MIN_TRADE_USDT}</strong></span>
                  <span>Max: <strong>${MAX_TRADE_USDT.toLocaleString()}</strong></span>
                </div>

                {tradeAmount && Number(tradeAmount) > 0 && (
                  <p className="mt-2 text-sm">
                    ≈ <strong>{estimatedQty}</strong> {selectedPair.baseAsset}
                    {Number(tradeAmount) < MIN_TRADE_USDT && (
                      <span className="text-red-500 ml-2">below min</span>
                    )}
                    {Number(tradeAmount) > MAX_TRADE_USDT && (
                      <span className="text-red-500 ml-2">exceeds max</span>
                    )}
                  </p>
                )}
              </div>

              <div className="mb-6">
                <label className="block text-sm text-gray-500 dark:text-gray-400 mb-2">
                  Order Duration
                </label>
                <select
                  value={orderDuration}
                  onChange={(e) => setOrderDuration(e.target.value)}
                  className="w-full p-3 bg-gray-50 dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500"
                >
                  <option value="GTC">Good 'Til Canceled (GTC)</option>
                  <option value="DAY">Day Order (until market close)</option>
                  <option value="GTD_24h">Good 'Til Date – 24 hours</option>
                  <option value="GTD_48h">Good 'Til Date – 48 hours</option>
                </select>
                {orderDuration.startsWith('GTD') && (
                  <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                    Order will auto-cancel after the selected time if not filled.
                  </p>
                )}
              </div>

              <div className="flex gap-3">
                <button
                  onClick={() => setShowTradeModal(false)}
                  className="flex-1 py-3 bg-gray-200 dark:bg-gray-700 rounded-xl font-medium hover:bg-gray-300 dark:hover:bg-gray-600"
                >
                  Cancel
                </button>
                <button
                  onClick={handleExecuteTrade}
                  disabled={loading || !isAmountValid || (tradeSide === 'sell' && !hasEnoughToSell())}
                  className={`flex-1 py-3 rounded-xl font-bold text-white transition ${
                    loading
                      ? 'bg-orange-400 cursor-wait'
                      : 'bg-orange-600 hover:bg-orange-700'
                  } disabled:opacity-50 disabled:cursor-not-allowed`}
                >
                  {loading ? 'Processing...' : 'Confirm Order'}
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Success Modal */}
      <AnimatePresence>
        {showSuccessModal && (
          <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4">
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              className="bg-white dark:bg-gray-900 rounded-2xl p-8 text-center max-w-sm w-full"
            >
              <div className="text-6xl mb-4">✅</div>
              <h2 className="text-2xl font-bold mb-3 text-green-600 dark:text-green-400">
                Order Placed Successfully!
              </h2>
              <p className="text-gray-600 dark:text-gray-300 mb-6">
                {tradeSide.toUpperCase()} ${Number(tradeAmount).toLocaleString()} USDT
                <br />
                {selectedPair.displaySymbol} • {orderDuration}
              </p>
              <button
                onClick={() => setShowSuccessModal(false)}
                className="w-full py-3 bg-orange-600 hover:bg-orange-700 text-white rounded-xl font-bold"
              >
                Continue Trading
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}