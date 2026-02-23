
// // // // // // src/components/TradingDashboard.jsx
// // // // // import React, { useState, useEffect } from 'react';
// // // // // import { motion, AnimatePresence } from 'framer-motion';
// // // // // import { ToastContainer, toast } from 'react-toastify';
// // // // // import 'react-toastify/dist/ReactToastify.css';
// // // // // import { tradingService } from '../../api/tradingApi';

// // // // // const handleApiError = (error) => {
// // // // //   const message =
// // // // //     error?.response?.data?.message ||
// // // // //     error?.response?.data?.error ||
// // // // //     error?.message ||
// // // // //     'Failed to load data. Please try again.';
// // // // //   toast.error(message);
// // // // // };

// // // // // // Helper: Convert raw pair like "BITCOIN/USDT" → normalized object with proper ticker
// // // // // const normalizePair = (rawSymbol) => {
// // // // //   if (!rawSymbol || typeof rawSymbol !== 'string') return null;

// // // // //   let namePart, quotePart = 'USDT';
  
// // // // //   if (rawSymbol.includes('/')) {
// // // // //     [namePart, quotePart] = rawSymbol.split('/');
// // // // //   } else {
// // // // //     namePart = rawSymbol;
// // // // //   }

// // // // //   const upperName = namePart.trim().toUpperCase();

// // // // //   const nameToTicker = {
// // // // //     'BITCOIN': 'BTC',
// // // // //     'ETHEREUM': 'ETH',
// // // // //     'BNB': 'BNB',
// // // // //     'SOL': 'SOL',
// // // // //     'DOGE': 'DOGE',
// // // // //     'XRP': 'XRP',
// // // // //     'LTC': 'LTC',
// // // // //     'ADA': 'ADA',
// // // // //     'CAKE': 'CAKE',
// // // // //     'PEPE': 'PEPE',
// // // // //     'WFI': 'WFI',
// // // // //     'AVAX': 'AVAX',
// // // // //     'BCH': 'BCH',
// // // // //     'UNI': 'UNI',
// // // // //   };

// // // // //   const base = nameToTicker[upperName] || upperName;

// // // // //   quotePart = quotePart.trim().toUpperCase();

// // // // //   return {
// // // // //     raw: rawSymbol,
// // // // //     displaySymbol: `${base}/${quotePart}`,
// // // // //     apiSymbol: `${base}${quotePart}`,
// // // // //     baseAsset: base,
// // // // //     quoteAsset: quotePart,
// // // // //   };
// // // // // };

// // // // // export default function TradingDashboard() {
// // // // //   const [pairs, setPairs] = useState([]);           // array of normalized pair objects
// // // // //   const [portfolio, setPortfolio] = useState(null);
// // // // //   const [loading, setLoading] = useState(true);
// // // // //   const [error, setError] = useState(null);
// // // // //   const [selectedPair, setSelectedPair] = useState(null);
// // // // //   const [showTradeModal, setShowTradeModal] = useState(false);
// // // // //   const [tradeSide, setTradeSide] = useState('buy');
// // // // //   const [tradeAmount, setTradeAmount] = useState('');
// // // // //   const [showSuccessModal, setShowSuccessModal] = useState(false);

// // // // //   useEffect(() => {
// // // // //     const loadData = async () => {
// // // // //       setLoading(true);
// // // // //       setError(null);
// // // // //       try {
// // // // //         const [pairsResponse, portfolioResponse] = await Promise.all([
// // // // //           tradingService.getPairs(),
// // // // //           tradingService.getPortfolio(),
// // // // //         ]);

// // // // //         let receivedPairs = [];
// // // // //         if (pairsResponse?.data?.success && Array.isArray(pairsResponse.data.data)) {
// // // // //           receivedPairs = pairsResponse.data.data;
// // // // //         } else if (Array.isArray(pairsResponse?.data)) {
// // // // //           receivedPairs = pairsResponse.data;
// // // // //         }

// // // // //         const normalized = receivedPairs
// // // // //           .map(normalizePair)
// // // // //           .filter(Boolean)
// // // // //           .sort((a, b) => a.baseAsset.localeCompare(b.baseAsset));

// // // // //         // TODO: Replace dummy data with real price fetch
// // // // //         const pairsWithPrices = normalized.map(pair => ({
// // // // //           ...pair,
// // // // //           // Placeholder — replace with real API data
// // // // //           currentPrice: (Math.random() * 100000 + 500).toFixed(2), // fake $500–100k range
// // // // //           change24h: (Math.random() * 20 - 10).toFixed(2),         // -10% to +10%
// // // // //         }));

// // // // //         setPairs(pairsWithPrices);
// // // // //         setPortfolio(portfolioResponse?.data ?? null);

// // // // //         if (normalized.length === 0) {
// // // // //           toast.info('No trading pairs available at this time.');
// // // // //         }
// // // // //       } catch (err) {
// // // // //         handleApiError(err);
// // // // //         setError('Could not load trading pairs. Please check your connection.');
// // // // //       } finally {
// // // // //         setLoading(false);
// // // // //       }
// // // // //     };

// // // // //     loadData();
// // // // //   }, []);

// // // // //   const openTradeModal = (pairObj) => {
// // // // //     setSelectedPair(pairObj);
// // // // //     setTradeSide('buy');
// // // // //     setTradeAmount('');
// // // // //     setShowTradeModal(true);
// // // // //   };

// // // // //   const hasEnoughToSell = () => {
// // // // //     if (!portfolio?.holdings || !selectedPair) return false;
// // // // //     const base = selectedPair.baseAsset;
// // // // //     const heldAmount = Number(portfolio.holdings[base] || 0);
// // // // //     return heldAmount >= Number(tradeAmount || 0);
// // // // //   };

// // // // //   const handleExecuteTrade = async () => {
// // // // //     const amount = Number(tradeAmount);
// // // // //     if (isNaN(amount) || amount <= 0) {
// // // // //       toast.warn('Enter a valid amount greater than 0');
// // // // //       return;
// // // // //     }

// // // // //     if (tradeSide === 'sell' && !hasEnoughToSell()) {
// // // // //       toast.error(`Insufficient ${selectedPair.baseAsset} balance`);
// // // // //       return;
// // // // //     }

// // // // //     setLoading(true);
// // // // //     try {
// // // // //       const payload = {
// // // // //         side: tradeSide.toUpperCase(),
// // // // //         symbol: selectedPair.apiSymbol,
// // // // //         amount: amount,
// // // // //       };

// // // // //       await tradingService.executeTrade(payload);

// // // // //       toast.success(
// // // // //         `Order placed: ${tradeSide.toUpperCase()} ${amount} USDT – ${selectedPair.displaySymbol}`
// // // // //       );
// // // // //       setShowTradeModal(false);
// // // // //       setShowSuccessModal(true);
// // // // //       setTradeAmount('');
// // // // //     } catch (err) {
// // // // //       handleApiError(err);
// // // // //     } finally {
// // // // //       setLoading(false);
// // // // //     }
// // // // //   };

// // // // //   return (
// // // // //     <div className="min-h-screen bg-gray-50 dark:bg-gray-950 pb-16">
// // // // //       <ToastContainer position="top-center" autoClose={3500} theme="colored" limit={2} />

// // // // //       <header className="sticky top-0 z-10 bg-white/95 dark:bg-gray-900/95 backdrop-blur-sm border-b border-gray-200 dark:border-gray-800 px-4 py-5">
// // // // //         <div className="max-w-7xl mx-auto flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
// // // // //           <div>
// // // // //             <h1 className="text-2xl md:text-3xl font-bold text-orange-600 dark:text-orange-400">
// // // // //               Crypto Trading
// // // // //             </h1>
// // // // //             {portfolio && (
// // // // //               <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
// // // // //                 Invested: <strong className="text-green-600">${Number(portfolio.totalInvested || 0).toLocaleString()}</strong>
// // // // //                 {' • '} PnL: <strong className={Number(portfolio.totalRealizedPnL || 0) >= 0 ? 'text-green-600' : 'text-red-600'}>
// // // // //                   ${Number(portfolio.totalRealizedPnL || 0).toLocaleString()}
// // // // //                 </strong>
// // // // //               </p>
// // // // //             )}
// // // // //           </div>
// // // // //           <button
// // // // //             onClick={() => window.location.reload()}
// // // // //             disabled={loading}
// // // // //             className="px-5 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium disabled:opacity-60 transition"
// // // // //           >
// // // // //             {loading ? 'Loading...' : 'Refresh'}
// // // // //           </button>
// // // // //         </div>
// // // // //       </header>

// // // // //       <main className="max-w-7xl mx-auto px-4 py-8">
// // // // //         {loading ? (
// // // // //           <div className="flex flex-col items-center justify-center py-20">
// // // // //             <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-orange-500"></div>
// // // // //             <p className="mt-4 text-gray-600 dark:text-gray-400">Loading available pairs...</p>
// // // // //           </div>
// // // // //         ) : error ? (
// // // // //           <div className="text-center py-16 text-red-600 dark:text-red-400">
// // // // //             {error}
// // // // //           </div>
// // // // //         ) : pairs.length === 0 ? (
// // // // //           <div className="text-center py-16 text-gray-500 dark:text-gray-400">
// // // // //             No trading pairs available right now.
// // // // //           </div>
// // // // //         ) : (
// // // // //           <div className="grid grid-cols-1 sm:grid-cols-1 lg:grid-cols-1 xl:grid-cols-1 gap-5">
// // // // //             {pairs.map((pair) => {
// // // // //               const isPositive = Number(pair.change24h) >= 0;
// // // // //               return (
// // // // //                 <motion.div
// // // // //                   key={pair.apiSymbol}
// // // // //                   whileHover={{ scale: 1.02, y: -2 }}
// // // // //                   className="bg-white dark:bg-gray-800 rounded-xl shadow border border-gray-200 dark:border-gray-700 hover:border-orange-500/40 transition-all duration-200 overflow-hidden"
// // // // //                 >
// // // // //                   <div className="p-5 flex items-center justify-between gap-4">
// // // // //                     {/* Left: Symbol */}
// // // // //                     <div className="flex items-baseline gap-2 min-w-0">
// // // // //                       <h3 className="text-xl font-bold tracking-tight truncate">
// // // // //                         {pair.baseAsset}
// // // // //                       </h3>
// // // // //                       <span className="text-sm font-medium text-gray-500 dark:text-gray-400">
// // // // //                         /{pair.quoteAsset}
// // // // //                       </span>
// // // // //                     </div>

// // // // //                     {/* Middle: Price + Change */}
// // // // //                     <div className="text-right flex-1">
// // // // //                       <div className="text-lg font-semibold">
// // // // //                         ${Number(pair.currentPrice).toLocaleString()}
// // // // //                       </div>
// // // // //                       <div className={`text-sm font-medium ${isPositive ? 'text-green-500' : 'text-red-500'}`}>
// // // // //                         {isPositive ? '+' : ''}{pair.change24h}%
// // // // //                       </div>
// // // // //                     </div>

// // // // //                     {/* Right: Trade Button */}
// // // // //                     <button
// // // // //                       onClick={() => openTradeModal(pair)}
// // // // //                       className="px-5 py-2.5 bg-orange-600 hover:bg-orange-700 text-white text-sm font-medium rounded-lg transition whitespace-nowrap"
// // // // //                     >
// // // // //                       Trade
// // // // //                     </button>
// // // // //                   </div>
// // // // //                 </motion.div>
// // // // //               );
// // // // //             })}
// // // // //           </div>
// // // // //         )}
// // // // //       </main>

// // // // //       {/* Trade Modal */}
// // // // //       <AnimatePresence>
// // // // //         {showTradeModal && selectedPair && (
// // // // //           <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4">
// // // // //             <motion.div
// // // // //               initial={{ scale: 0.9, opacity: 0 }}
// // // // //               animate={{ scale: 1, opacity: 1 }}
// // // // //               exit={{ scale: 0.9, opacity: 0 }}
// // // // //               className="bg-white dark:bg-gray-900 rounded-2xl p-6 w-full max-w-md border border-gray-200 dark:border-gray-700 shadow-2xl"
// // // // //             >
// // // // //               <div className="flex justify-between items-center mb-5">
// // // // //                 <h2 className="text-2xl font-bold text-orange-600 dark:text-orange-400">
// // // // //                   {tradeSide.toUpperCase()} {selectedPair.displaySymbol}
// // // // //                 </h2>
// // // // //                 <button
// // // // //                   onClick={() => setShowTradeModal(false)}
// // // // //                   className="text-4xl text-gray-500 hover:text-gray-700 dark:hover:text-gray-300"
// // // // //                 >
// // // // //                   ×
// // // // //                 </button>
// // // // //               </div>

// // // // //               <div className="grid grid-cols-2 gap-3 mb-6">
// // // // //                 <button
// // // // //                   onClick={() => setTradeSide('buy')}
// // // // //                   className={`py-3 rounded-xl font-semibold ${
// // // // //                     tradeSide === 'buy' ? 'bg-green-600 text-white' : 'bg-gray-200 dark:bg-gray-700'
// // // // //                   }`}
// // // // //                 >
// // // // //                   BUY
// // // // //                 </button>
// // // // //                 <button
// // // // //                   onClick={() => setTradeSide('sell')}
// // // // //                   disabled={!hasEnoughToSell()}
// // // // //                   className={`py-3 rounded-xl font-semibold ${
// // // // //                     tradeSide === 'sell' ? 'bg-red-600 text-white' : 'bg-gray-200 dark:bg-gray-700'
// // // // //                   } ${!hasEnoughToSell() ? 'opacity-50 cursor-not-allowed' : ''}`}
// // // // //                 >
// // // // //                   SELL
// // // // //                 </button>
// // // // //               </div>

// // // // //               <div className="mb-6">
// // // // //                 <label className="block text-sm text-gray-500 dark:text-gray-400 mb-2">
// // // // //                   Amount (USDT)
// // // // //                 </label>
// // // // //                 <input
// // // // //                   type="number"
// // // // //                   value={tradeAmount}
// // // // //                   onChange={(e) => setTradeAmount(e.target.value)}
// // // // //                   placeholder="0.00"
// // // // //                   step="any"
// // // // //                   className="w-full p-4 text-2xl bg-gray-50 dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500"
// // // // //                 />
// // // // //               </div>

// // // // //               <div className="flex gap-3">
// // // // //                 <button
// // // // //                   onClick={() => setShowTradeModal(false)}
// // // // //                   className="flex-1 py-3 bg-gray-200 dark:bg-gray-700 rounded-xl font-medium hover:bg-gray-300 dark:hover:bg-gray-600"
// // // // //                 >
// // // // //                   Cancel
// // // // //                 </button>
// // // // //                 <button
// // // // //                   onClick={handleExecuteTrade}
// // // // //                   disabled={loading || !tradeAmount || Number(tradeAmount) <= 0}
// // // // //                   className="flex-1 py-3 bg-orange-600 hover:bg-orange-700 text-white rounded-xl font-bold disabled:opacity-60"
// // // // //                 >
// // // // //                   {loading ? 'Processing...' : 'Confirm Order'}
// // // // //                 </button>
// // // // //               </div>
// // // // //             </motion.div>
// // // // //           </div>
// // // // //         )}
// // // // //       </AnimatePresence>

// // // // //       {/* Success Modal */}
// // // // //       <AnimatePresence>
// // // // //         {showSuccessModal && (
// // // // //           <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4">
// // // // //             <motion.div
// // // // //               initial={{ scale: 0.8, opacity: 0 }}
// // // // //               animate={{ scale: 1, opacity: 1 }}
// // // // //               exit={{ scale: 0.8, opacity: 0 }}
// // // // //               className="bg-white dark:bg-gray-900 rounded-2xl p-8 text-center max-w-sm w-full"
// // // // //             >
// // // // //               <div className="text-6xl mb-4">✅</div>
// // // // //               <h2 className="text-2xl font-bold mb-3 text-green-600 dark:text-green-400">
// // // // //                 Order Placed!
// // // // //               </h2>
// // // // //               <p className="text-gray-600 dark:text-gray-300 mb-6">
// // // // //                 {tradeSide.toUpperCase()} {tradeAmount} USDT – {selectedPair.displaySymbol}
// // // // //               </p>
// // // // //               <button
// // // // //                 onClick={() => setShowSuccessModal(false)}
// // // // //                 className="w-full py-3 bg-orange-600 hover:bg-orange-700 text-white rounded-xl font-bold"
// // // // //               >
// // // // //                 Continue Trading
// // // // //               </button>
// // // // //             </motion.div>
// // // // //           </div>
// // // // //         )}
// // // // //       </AnimatePresence>
// // // // //     </div>
// // // // //   );
// // // // // }



// // // // // import React, { useState, useEffect } from 'react';
// // // // // import { motion, AnimatePresence } from 'framer-motion';
// // // // // import { ToastContainer, toast } from 'react-toastify';
// // // // // import 'react-toastify/dist/ReactToastify.css';
// // // // // import { tradingService } from '../../api/tradingApi';

// // // // // const MIN_TRADE_USDT = 50;
// // // // // const MAX_TRADE_USDT = 10000;

// // // // // const handleApiError = (error) => {
// // // // //   const message =
// // // // //     error?.response?.data?.message ||
// // // // //     error?.response?.data?.error ||
// // // // //     error?.message ||
// // // // //     'Failed to load data. Please try again.';
// // // // //   toast.error(message);
// // // // // };

// // // // // const normalizePair = (rawSymbol) => {
// // // // //   if (!rawSymbol || typeof rawSymbol !== 'string') return null;

// // // // //   let namePart, quotePart = 'USDT';
  
// // // // //   if (rawSymbol.includes('/')) {
// // // // //     [namePart, quotePart] = rawSymbol.split('/');
// // // // //   } else {
// // // // //     namePart = rawSymbol;
// // // // //   }

// // // // //   const upperName = namePart.trim().toUpperCase();

// // // // //   const nameToTicker = {
// // // // //     'BITCOIN': 'BTC',
// // // // //     'ETHEREUM': 'ETH',
// // // // //     'BNB': 'BNB',
// // // // //     'SOL': 'SOL',
// // // // //     'DOGE': 'DOGE',
// // // // //     'XRP': 'XRP',
// // // // //     'LTC': 'LTC',
// // // // //     'ADA': 'ADA',
// // // // //     'CAKE': 'CAKE',
// // // // //     'PEPE': 'PEPE',
// // // // //     'WFI': 'WFI',
// // // // //     'AVAX': 'AVAX',
// // // // //     'BCH': 'BCH',
// // // // //     'UNI': 'UNI',
// // // // //   };

// // // // //   const base = nameToTicker[upperName] || upperName;

// // // // //   quotePart = quotePart.trim().toUpperCase();

// // // // //   return {
// // // // //     raw: rawSymbol,
// // // // //     displaySymbol: `${base}/${quotePart}`,
// // // // //     apiSymbol: `${base}${quotePart}`,
// // // // //     baseAsset: base,
// // // // //     quoteAsset: quotePart,
// // // // //   };
// // // // // };

// // // // // export default function TradingDashboard() {
// // // // //   const [pairs, setPairs] = useState([]);
// // // // //   const [portfolio, setPortfolio] = useState(null);
// // // // //   const [loading, setLoading] = useState(true);
// // // // //   const [error, setError] = useState(null);
// // // // //   const [selectedPair, setSelectedPair] = useState(null);
// // // // //   const [showTradeModal, setShowTradeModal] = useState(false);
// // // // //   const [tradeSide, setTradeSide] = useState('buy');
// // // // //   const [tradeAmount, setTradeAmount] = useState('');
// // // // //   const [showSuccessModal, setShowSuccessModal] = useState(false);

// // // // //   useEffect(() => {
// // // // //     const loadData = async () => {
// // // // //       setLoading(true);
// // // // //       setError(null);
// // // // //       try {
// // // // //         const [pairsResponse, portfolioResponse] = await Promise.all([
// // // // //           tradingService.getPairs(),
// // // // //           tradingService.getPortfolio(),
// // // // //         ]);

// // // // //         let receivedPairs = [];
// // // // //         if (pairsResponse?.data?.success && Array.isArray(pairsResponse.data.data)) {
// // // // //           receivedPairs = pairsResponse.data.data;
// // // // //         } else if (Array.isArray(pairsResponse?.data)) {
// // // // //           receivedPairs = pairsResponse.data;
// // // // //         }

// // // // //         const normalized = receivedPairs
// // // // //           .map(normalizePair)
// // // // //           .filter(Boolean)
// // // // //           .sort((a, b) => a.baseAsset.localeCompare(b.baseAsset));

// // // // //         // TODO: Replace dummy data with real price fetch
// // // // //         const pairsWithPrices = normalized.map(pair => ({
// // // // //           ...pair,
// // // // //           currentPrice: (Math.random() * 100000 + 500).toFixed(2), // fake $500–100k range
// // // // //           change24h: (Math.random() * 20 - 10).toFixed(2),
// // // // //         }));

// // // // //         setPairs(pairsWithPrices);
// // // // //         setPortfolio(portfolioResponse?.data ?? null);

// // // // //         if (normalized.length === 0) {
// // // // //           toast.info('No trading pairs available at this time.');
// // // // //         }
// // // // //       } catch (err) {
// // // // //         handleApiError(err);
// // // // //         setError('Could not load trading pairs. Please check your connection.');
// // // // //       } finally {
// // // // //         setLoading(false);
// // // // //       }
// // // // //     };

// // // // //     loadData();
// // // // //   }, []);

// // // // //   const openTradeModal = (pairObj) => {
// // // // //     setSelectedPair(pairObj);
// // // // //     setTradeSide('buy');
// // // // //     setTradeAmount('');
// // // // //     setShowTradeModal(true);
// // // // //   };

// // // // //   const hasEnoughToSell = () => {
// // // // //     if (!portfolio?.holdings || !selectedPair) return false;
// // // // //     const base = selectedPair.baseAsset;
// // // // //     const heldAmount = Number(portfolio.holdings[base] || 0);
// // // // //     const valueInUsdt = heldAmount * Number(selectedPair.currentPrice || 0);
// // // // //     return valueInUsdt >= Number(tradeAmount || 0);
// // // // //   };

// // // // //   const getEstimatedQuantity = () => {
// // // // //     if (!selectedPair?.currentPrice || Number(selectedPair.currentPrice) <= 0) return 0;
// // // // //     return Number(tradeAmount) / Number(selectedPair.currentPrice);
// // // // //   };

// // // // //   const handleExecuteTrade = async () => {
// // // // //     const amount = Number(tradeAmount);
// // // // //     if (isNaN(amount) || amount <= 0) {
// // // // //       toast.warn('Enter a valid amount greater than 0');
// // // // //       return;
// // // // //     }

// // // // //     if (amount < MIN_TRADE_USDT) {
// // // // //       toast.error(`Minimum trade amount is $${MIN_TRADE_USDT}`);
// // // // //       return;
// // // // //     }

// // // // //     if (amount > MAX_TRADE_USDT) {
// // // // //       toast.error(`Maximum trade amount is $${MAX_TRADE_USDT}`);
// // // // //       return;
// // // // //     }

// // // // //     if (tradeSide === 'sell' && !hasEnoughToSell()) {
// // // // //       toast.error(`Insufficient ${selectedPair.baseAsset} balance`);
// // // // //       return;
// // // // //     }

// // // // //     setLoading(true);
// // // // //     try {
// // // // //       const payload = {
// // // // //         side: tradeSide.toUpperCase(),
// // // // //         symbol: selectedPair.apiSymbol,
// // // // //         amount: amount,
// // // // //       };

// // // // //       await tradingService.executeTrade(payload);

// // // // //       toast.success(
// // // // //         `Order placed: ${tradeSide.toUpperCase()} ${amount} USDT – ${selectedPair.displaySymbol}`
// // // // //       );
// // // // //       setShowTradeModal(false);
// // // // //       setShowSuccessModal(true);
// // // // //       setTradeAmount('');
// // // // //     } catch (err) {
// // // // //       handleApiError(err);
// // // // //     } finally {
// // // // //       setLoading(false);
// // // // //     }
// // // // //   };

// // // // //   const estimatedQty = getEstimatedQuantity().toFixed(6);
// // // // //   const isAmountValid = Number(tradeAmount) >= MIN_TRADE_USDT && Number(tradeAmount) <= MAX_TRADE_USDT;

// // // // //   return (
// // // // //     <div className="min-h-screen bg-gray-50 dark:bg-gray-950 pb-16">
// // // // //       <ToastContainer position="top-center" autoClose={3500} theme="colored" limit={2} />

// // // // //       <header className="sticky top-0 z-10 bg-white/95 dark:bg-gray-900/95 backdrop-blur-sm border-b border-gray-200 dark:border-gray-800 px-4 py-5">
// // // // //         <div className="max-w-7xl mx-auto flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
// // // // //           <div>
// // // // //             <h1 className="text-2xl md:text-3xl font-bold text-orange-600 dark:text-orange-400">
// // // // //               Crypto Trading
// // // // //             </h1>
// // // // //             {portfolio && (
// // // // //               <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
// // // // //                 Invested: <strong className="text-green-600">${Number(portfolio.totalInvested || 0).toLocaleString()}</strong>
// // // // //                 {' • '} PnL: <strong className={Number(portfolio.totalRealizedPnL || 0) >= 0 ? 'text-green-600' : 'text-red-600'}>
// // // // //                   ${Number(portfolio.totalRealizedPnL || 0).toLocaleString()}
// // // // //                 </strong>
// // // // //               </p>
// // // // //             )}
// // // // //           </div>
// // // // //           <button
// // // // //             onClick={() => window.location.reload()}
// // // // //             disabled={loading}
// // // // //             className="px-5 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium disabled:opacity-60 transition"
// // // // //           >
// // // // //             {loading ? 'Loading...' : 'Refresh'}
// // // // //           </button>
// // // // //         </div>
// // // // //       </header>

// // // // //       <main className="max-w-7xl mx-auto px-4 py-8">
// // // // //         {loading ? (
// // // // //           <div className="flex flex-col items-center justify-center py-20">
// // // // //             <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-orange-500"></div>
// // // // //             <p className="mt-4 text-gray-600 dark:text-gray-400">Loading available pairs...</p>
// // // // //           </div>
// // // // //         ) : error ? (
// // // // //           <div className="text-center py-16 text-red-600 dark:text-red-400">
// // // // //             {error}
// // // // //           </div>
// // // // //         ) : pairs.length === 0 ? (
// // // // //           <div className="text-center py-16 text-gray-500 dark:text-gray-400">
// // // // //             No trading pairs available right now.
// // // // //           </div>
// // // // //         ) : (
// // // // //           <div className="grid grid-cols-1 sm:grid-cols-1 lg:grid-cols-1 xl:grid-cols-1 gap-5">
// // // // //             {pairs.map((pair) => {
// // // // //               const isPositive = Number(pair.change24h) >= 0;
// // // // //               return (
// // // // //                 <motion.div
// // // // //                   key={pair.apiSymbol}
// // // // //                   whileHover={{ scale: 1.02, y: -2 }}
// // // // //                   className="bg-white dark:bg-gray-800 rounded-xl shadow border border-gray-200 dark:border-gray-700 hover:border-orange-500/40 transition-all duration-200 overflow-hidden"
// // // // //                 >
// // // // //                   <div className="p-5 flex items-center justify-between gap-4">
// // // // //                     {/* Left: Symbol */}
// // // // //                     <div className="flex items-baseline gap-2 min-w-0">
// // // // //                       <h3 className="text-xl font-bold tracking-tight truncate">
// // // // //                         {pair.baseAsset}
// // // // //                       </h3>
// // // // //                       <span className="text-sm font-medium text-gray-500 dark:text-gray-400">
// // // // //                         /{pair.quoteAsset}
// // // // //                       </span>
// // // // //                     </div>

// // // // //                     {/* Middle: Price + Change */}
// // // // //                     <div className="text-right flex-1">
// // // // //                       <div className="text-lg font-semibold">
// // // // //                         ${Number(pair.currentPrice).toLocaleString()}
// // // // //                       </div>
// // // // //                       <div className={`text-sm font-medium ${isPositive ? 'text-green-500' : 'text-red-500'}`}>
// // // // //                         {isPositive ? '+' : ''}{pair.change24h}%
// // // // //                       </div>
// // // // //                     </div>

// // // // //                     {/* Right: Trade Button */}
// // // // //                     <button
// // // // //                       onClick={() => openTradeModal(pair)}
// // // // //                       className="px-5 py-2.5 bg-orange-600 hover:bg-orange-700 text-white text-sm font-medium rounded-lg transition whitespace-nowrap"
// // // // //                     >
// // // // //                       Trade
// // // // //                     </button>
// // // // //                   </div>
// // // // //                 </motion.div>
// // // // //               );
// // // // //             })}
// // // // //           </div>
// // // // //         )}
// // // // //       </main>

// // // // //       {/* Trade Modal - kept original structure */}
// // // // //       <AnimatePresence>
// // // // //         {showTradeModal && selectedPair && (
// // // // //           <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4">
// // // // //             <motion.div
// // // // //               initial={{ scale: 0.9, opacity: 0 }}
// // // // //               animate={{ scale: 1, opacity: 1 }}
// // // // //               exit={{ scale: 0.9, opacity: 0 }}
// // // // //               className="bg-white dark:bg-gray-900 rounded-2xl p-6 w-full max-w-md border border-gray-200 dark:border-gray-700 shadow-2xl"
// // // // //             >
// // // // //               <div className="flex justify-between items-center mb-5">
// // // // //                 <h2 className="text-2xl font-bold text-orange-600 dark:text-orange-400">
// // // // //                   {tradeSide.toUpperCase()} {selectedPair.displaySymbol}
// // // // //                 </h2>
// // // // //                 <button
// // // // //                   onClick={() => setShowTradeModal(false)}
// // // // //                   className="text-4xl text-gray-500 hover:text-gray-700 dark:hover:text-gray-300"
// // // // //                 >
// // // // //                   ×
// // // // //                 </button>
// // // // //               </div>

// // // // //               <div className="grid grid-cols-2 gap-3 mb-6">
// // // // //                 <button
// // // // //                   onClick={() => setTradeSide('buy')}
// // // // //                   className={`py-3 rounded-xl font-semibold ${
// // // // //                     tradeSide === 'buy' ? 'bg-green-600 text-white' : 'bg-gray-200 dark:bg-gray-700'
// // // // //                   }`}
// // // // //                 >
// // // // //                   BUY
// // // // //                 </button>
// // // // //                 <button
// // // // //                   onClick={() => setTradeSide('sell')}
// // // // //                   disabled={!hasEnoughToSell()}
// // // // //                   className={`py-3 rounded-xl font-semibold ${
// // // // //                     tradeSide === 'sell' ? 'bg-red-600 text-white' : 'bg-gray-200 dark:bg-gray-700'
// // // // //                   } ${!hasEnoughToSell() ? 'opacity-50 cursor-not-allowed' : ''}`}
// // // // //                 >
// // // // //                   SELL
// // // // //                 </button>
// // // // //               </div>

// // // // //               <div className="mb-6">
// // // // //                 <label className="block text-sm text-gray-500 dark:text-gray-400 mb-2">
// // // // //                   Amount (USDT)
// // // // //                 </label>
// // // // //                 <input
// // // // //                   type="number"
// // // // //                   value={tradeAmount}
// // // // //                   onChange={(e) => setTradeAmount(e.target.value)}
// // // // //                   placeholder="0.00"
// // // // //                   step="any"
// // // // //                   className="w-full p-4 text-2xl bg-gray-50 dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500"
// // // // //                 />

// // // // //                 {tradeAmount && Number(tradeAmount) > 0 && (
// // // // //                   <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
// // // // //                     ≈ {estimatedQty} {selectedPair.baseAsset}
// // // // //                     {Number(tradeAmount) < MIN_TRADE_USDT && <span className="text-red-500 ml-2"> (below minimum)</span>}
// // // // //                     {Number(tradeAmount) > MAX_TRADE_USDT && <span className="text-red-500 ml-2"> (exceeds maximum)</span>}
// // // // //                   </p>
// // // // //                 )}
// // // // //               </div>

// // // // //               <div className="flex gap-3">
// // // // //                 <button
// // // // //                   onClick={() => setShowTradeModal(false)}
// // // // //                   className="flex-1 py-3 bg-gray-200 dark:bg-gray-700 rounded-xl font-medium hover:bg-gray-300 dark:hover:bg-gray-600"
// // // // //                 >
// // // // //                   Cancel
// // // // //                 </button>
// // // // //                 <button
// // // // //                   onClick={handleExecuteTrade}
// // // // //                   disabled={loading || !isAmountValid || (tradeSide === 'sell' && !hasEnoughToSell())}
// // // // //                   className="flex-1 py-3 bg-orange-600 hover:bg-orange-700 text-white rounded-xl font-bold disabled:opacity-60"
// // // // //                 >
// // // // //                   {loading ? 'Processing...' : 'Confirm Order'}
// // // // //                 </button>
// // // // //               </div>
// // // // //             </motion.div>
// // // // //           </div>
// // // // //         )}
// // // // //       </AnimatePresence>

// // // // //       {/* Success Modal - unchanged */}
// // // // //       <AnimatePresence>
// // // // //         {showSuccessModal && (
// // // // //           <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4">
// // // // //             <motion.div
// // // // //               initial={{ scale: 0.8, opacity: 0 }}
// // // // //               animate={{ scale: 1, opacity: 1 }}
// // // // //               exit={{ scale: 0.8, opacity: 0 }}
// // // // //               className="bg-white dark:bg-gray-900 rounded-2xl p-8 text-center max-w-sm w-full"
// // // // //             >
// // // // //               <div className="text-6xl mb-4">✅</div>
// // // // //               <h2 className="text-2xl font-bold mb-3 text-green-600 dark:text-green-400">
// // // // //                 Order Placed!
// // // // //               </h2>
// // // // //               <p className="text-gray-600 dark:text-gray-300 mb-6">
// // // // //                 {tradeSide.toUpperCase()} {tradeAmount} USDT – {selectedPair.displaySymbol}
// // // // //               </p>
// // // // //               <button
// // // // //                 onClick={() => setShowSuccessModal(false)}
// // // // //                 className="w-full py-3 bg-orange-600 hover:bg-orange-700 text-white rounded-xl font-bold"
// // // // //               >
// // // // //                 Continue Trading
// // // // //               </button>
// // // // //             </motion.div>
// // // // //           </div>
// // // // //         )}
// // // // //       </AnimatePresence>
// // // // //     </div>
// // // // //   );
// // // // // }





// // // // // import React, { useState, useEffect } from 'react';
// // // // // import { motion, AnimatePresence } from 'framer-motion';
// // // // // import { ToastContainer, toast } from 'react-toastify';
// // // // // import 'react-toastify/dist/ReactToastify.css';
// // // // // import { tradingService } from '../../api/tradingApi';

// // // // // const MIN_TRADE_USDT = 50;
// // // // // const MAX_TRADE_USDT = 10000;

// // // // // const handleApiError = (error) => {
// // // // //   const message =
// // // // //     error?.response?.data?.message ||
// // // // //     error?.response?.data?.error ||
// // // // //     error?.message ||
// // // // //     'Failed to load data. Please try again.';
// // // // //   toast.error(message);
// // // // // };

// // // // // const normalizePair = (rawSymbol) => {
// // // // //   if (!rawSymbol || typeof rawSymbol !== 'string') return null;

// // // // //   let namePart, quotePart = 'USDT';
  
// // // // //   if (rawSymbol.includes('/')) {
// // // // //     [namePart, quotePart] = rawSymbol.split('/');
// // // // //   } else {
// // // // //     namePart = rawSymbol;
// // // // //   }

// // // // //   const upperName = namePart.trim().toUpperCase();

// // // // //   const nameToTicker = {
// // // // //     'BITCOIN': 'BTC',
// // // // //     'ETHEREUM': 'ETH',
// // // // //     'BNB': 'BNB',
// // // // //     'SOL': 'SOL',
// // // // //     'DOGE': 'DOGE',
// // // // //     'XRP': 'XRP',
// // // // //     'LTC': 'LTC',
// // // // //     'ADA': 'ADA',
// // // // //     'CAKE': 'CAKE',
// // // // //     'PEPE': 'PEPE',
// // // // //     'WFI': 'WFI',
// // // // //     'AVAX': 'AVAX',
// // // // //     'BCH': 'BCH',
// // // // //     'UNI': 'UNI',
// // // // //   };

// // // // //   const base = nameToTicker[upperName] || upperName;
// // // // //   quotePart = quotePart.trim().toUpperCase();

// // // // //   return {
// // // // //     raw: rawSymbol,
// // // // //     displaySymbol: `${base}/${quotePart}`,
// // // // //     apiSymbol: `${base}${quotePart}`,
// // // // //     baseAsset: base,
// // // // //     quoteAsset: quotePart,
// // // // //   };
// // // // // };

// // // // // export default function TradingDashboard() {
// // // // //   const [pairs, setPairs] = useState([]);
// // // // //   const [portfolio, setPortfolio] = useState(null);
// // // // //   const [loading, setLoading] = useState(true);
// // // // //   const [error, setError] = useState(null);
// // // // //   const [selectedPair, setSelectedPair] = useState(null);
// // // // //   const [showTradeModal, setShowTradeModal] = useState(false);
// // // // //   const [tradeSide, setTradeSide] = useState('buy');
// // // // //   const [tradeAmount, setTradeAmount] = useState('');
// // // // //   const [orderDuration, setOrderDuration] = useState('GTC');
// // // // //   const [showSuccessModal, setShowSuccessModal] = useState(false);

// // // // //   useEffect(() => {
// // // // //     const loadData = async () => {
// // // // //       setLoading(true);
// // // // //       setError(null);
// // // // //       try {
// // // // //         const [pairsResponse, portfolioResponse] = await Promise.all([
// // // // //           tradingService.getPairs(),
// // // // //           tradingService.getPortfolio(),
// // // // //         ]);

// // // // //         let receivedPairs = [];
// // // // //         if (pairsResponse?.data?.success && Array.isArray(pairsResponse.data.data)) {
// // // // //           receivedPairs = pairsResponse.data.data;
// // // // //         } else if (Array.isArray(pairsResponse?.data)) {
// // // // //           receivedPairs = pairsResponse.data;
// // // // //         }

// // // // //         const normalized = receivedPairs
// // // // //           .map(normalizePair)
// // // // //           .filter(Boolean)
// // // // //           .sort((a, b) => a.baseAsset.localeCompare(b.baseAsset));

// // // // //         // TODO: Replace with real-time price feed (WebSocket / polling)
// // // // //         const pairsWithPrices = normalized.map(pair => ({
// // // // //           ...pair,
// // // // //           currentPrice: (Math.random() * 100000 + 500).toFixed(2), // placeholder
// // // // //           change24h: (Math.random() * 20 - 10).toFixed(2),
// // // // //         }));

// // // // //         setPairs(pairsWithPrices);
// // // // //         setPortfolio(portfolioResponse?.data ?? null);

// // // // //         if (normalized.length === 0) {
// // // // //           toast.info('No trading pairs available at this time.');
// // // // //         }
// // // // //       } catch (err) {
// // // // //         handleApiError(err);
// // // // //         setError('Could not load trading pairs. Please check your connection.');
// // // // //       } finally {
// // // // //         setLoading(false);
// // // // //       }
// // // // //     };

// // // // //     loadData();
// // // // //   }, []);

// // // // //   const openTradeModal = (pairObj) => {
// // // // //     setSelectedPair(pairObj);
// // // // //     setTradeSide('buy');
// // // // //     setTradeAmount('');
// // // // //     setOrderDuration('GTC');
// // // // //     setShowTradeModal(true);
// // // // //   };

// // // // //   const hasEnoughToSell = () => {
// // // // //     if (!portfolio?.holdings || !selectedPair) return false;
// // // // //     const base = selectedPair.baseAsset;
// // // // //     const heldAmount = Number(portfolio.holdings[base] || 0);
// // // // //     const valueInUsdt = heldAmount * Number(selectedPair.currentPrice || 0);
// // // // //     return valueInUsdt >= Number(tradeAmount || 0);
// // // // //   };

// // // // //   const getEstimatedQuantity = () => {
// // // // //     if (!selectedPair?.currentPrice || Number(selectedPair.currentPrice) <= 0) return 0;
// // // // //     return Number(tradeAmount) / Number(selectedPair.currentPrice);
// // // // //   };

// // // // //   const estimatedQty = getEstimatedQuantity().toFixed(6);
// // // // //   const isAmountValid =
// // // // //     tradeAmount !== '' &&
// // // // //     !isNaN(Number(tradeAmount)) &&
// // // // //     Number(tradeAmount) >= MIN_TRADE_USDT &&
// // // // //     Number(tradeAmount) <= MAX_TRADE_USDT;

// // // // //   const handleExecuteTrade = async () => {
// // // // //     const amount = Number(tradeAmount);
// // // // //     if (isNaN(amount) || amount <= 0) {
// // // // //       toast.warn('Enter a valid amount greater than 0');
// // // // //       return;
// // // // //     }

// // // // //     if (amount < MIN_TRADE_USDT) {
// // // // //       toast.error(`Minimum trade amount is $${MIN_TRADE_USDT}`);
// // // // //       return;
// // // // //     }

// // // // //     if (amount > MAX_TRADE_USDT) {
// // // // //       toast.error(`Maximum trade amount is $${MAX_TRADE_USDT}`);
// // // // //       return;
// // // // //     }

// // // // //     if (tradeSide === 'sell' && !hasEnoughToSell()) {
// // // // //       toast.error(`Insufficient ${selectedPair.baseAsset} balance`);
// // // // //       return;
// // // // //     }

// // // // //     setLoading(true);
// // // // //     try {
// // // // //       const payload = {
// // // // //         side: tradeSide.toUpperCase(),
// // // // //         symbol: selectedPair.apiSymbol,
// // // // //         amount: amount,
// // // // //         timeInForce: orderDuration,           // GTC, DAY, GTD_48h, etc.
// // // // //         // You can compute & add expiry timestamp if backend expects it:
// // // // //         // expiry: orderDuration === 'GTD_48h' ? Date.now() + 48*60*60*1000 : undefined,
// // // // //       };

// // // // //       await tradingService.executeTrade(payload);

// // // // //       toast.success(
// // // // //         `${tradeSide.toUpperCase()} order placed: $${amount.toLocaleString()} USDT • ${selectedPair.displaySymbol} • ${orderDuration}`
// // // // //       );

// // // // //       setShowTradeModal(false);
// // // // //       setShowSuccessModal(true);
// // // // //       setTradeAmount('');
// // // // //       setOrderDuration('GTC');
// // // // //     } catch (err) {
// // // // //       handleApiError(err);
// // // // //     } finally {
// // // // //       setLoading(false);
// // // // //     }
// // // // //   };

// // // // //   return (
// // // // //     <div className="min-h-screen bg-gray-50 dark:bg-gray-950 pb-16">
// // // // //       <ToastContainer position="top-center" autoClose={3500} theme="colored" limit={2} />

// // // // //       {/* Header & main content unchanged – keeping it short */}
// // // // //       <header className="sticky top-0 z-10 bg-white/95 dark:bg-gray-900/95 backdrop-blur-sm border-b border-gray-200 dark:border-gray-800 px-4 py-5">
// // // // //         <div className="max-w-7xl mx-auto flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
// // // // //           <div>
// // // // //             <h1 className="text-2xl md:text-3xl font-bold text-orange-600 dark:text-orange-400">
// // // // //               Crypto Trading
// // // // //             </h1>
// // // // //             {portfolio && (
// // // // //               <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
// // // // //                 Invested: <strong className="text-green-600">${Number(portfolio.totalInvested || 0).toLocaleString()}</strong>
// // // // //                 {' • '} PnL: <strong className={Number(portfolio.totalRealizedPnL || 0) >= 0 ? 'text-green-600' : 'text-red-600'}>
// // // // //                   ${Number(portfolio.totalRealizedPnL || 0).toLocaleString()}
// // // // //                 </strong>
// // // // //               </p>
// // // // //             )}
// // // // //           </div>
// // // // //           <button
// // // // //             onClick={() => window.location.reload()}
// // // // //             disabled={loading}
// // // // //             className="px-5 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium disabled:opacity-60 transition"
// // // // //           >
// // // // //             {loading ? 'Loading...' : 'Refresh'}
// // // // //           </button>
// // // // //         </div>
// // // // //       </header>

// // // // //       <main className="max-w-7xl mx-auto px-4 py-8">
// // // // //         {/* ... pair list rendering remains the same ... */}
// // // // //         {loading ? (
// // // // //           <div className="flex flex-col items-center justify-center py-20">
// // // // //             <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-orange-500"></div>
// // // // //             <p className="mt-4 text-gray-600 dark:text-gray-400">Loading available pairs...</p>
// // // // //           </div>
// // // // //         ) : error ? (
// // // // //           <div className="text-center py-16 text-red-600 dark:text-red-400">{error}</div>
// // // // //         ) : pairs.length === 0 ? (
// // // // //           <div className="text-center py-16 text-gray-500 dark:text-gray-400">
// // // // //             No trading pairs available right now.
// // // // //           </div>
// // // // //         ) : (
// // // // //           <div className="grid grid-cols-1 sm:grid-cols-1 lg:grid-cols-1 xl:grid-cols-1 gap-5">
// // // // //             {pairs.map((pair) => {
// // // // //               const isPositive = Number(pair.change24h) >= 0;
// // // // //               return (
// // // // //                 <motion.div
// // // // //                   key={pair.apiSymbol}
// // // // //                   whileHover={{ scale: 1.02, y: -2 }}
// // // // //                   className="bg-white dark:bg-gray-800 rounded-xl shadow border border-gray-200 dark:border-gray-700 hover:border-orange-500/40 transition-all duration-200 overflow-hidden"
// // // // //                 >
// // // // //                   <div className="p-5 flex items-center justify-between gap-4">
// // // // //                     <div className="flex items-baseline gap-2 min-w-0">
// // // // //                       <h3 className="text-xl font-bold tracking-tight truncate">
// // // // //                         {pair.baseAsset}
// // // // //                       </h3>
// // // // //                       <span className="text-sm font-medium text-gray-500 dark:text-gray-400">
// // // // //                         /{pair.quoteAsset}
// // // // //                       </span>
// // // // //                     </div>
// // // // //                     <div className="text-right flex-1">
// // // // //                       <div className="text-lg font-semibold">
// // // // //                         ${Number(pair.currentPrice).toLocaleString()}
// // // // //                       </div>
// // // // //                       <div className={`text-sm font-medium ${isPositive ? 'text-green-500' : 'text-red-500'}`}>
// // // // //                         {isPositive ? '+' : ''}{pair.change24h}%
// // // // //                       </div>
// // // // //                     </div>
// // // // //                     <button
// // // // //                       onClick={() => openTradeModal(pair)}
// // // // //                       className="px-5 py-2.5 bg-orange-600 hover:bg-orange-700 text-white text-sm font-medium rounded-lg transition whitespace-nowrap"
// // // // //                     >
// // // // //                       Trade
// // // // //                     </button>
// // // // //                   </div>
// // // // //                 </motion.div>
// // // // //               );
// // // // //             })}
// // // // //           </div>
// // // // //         )}
// // // // //       </main>

// // // // //       {/* ──────────────────────────────────────────────── */}
// // // // //       {/*                UPDATED TRADE MODAL                 */}
// // // // //       {/* ──────────────────────────────────────────────── */}
// // // // //       <AnimatePresence>
// // // // //         {showTradeModal && selectedPair && (
// // // // //           <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4">
// // // // //             <motion.div
// // // // //               initial={{ scale: 0.9, opacity: 0 }}
// // // // //               animate={{ scale: 1, opacity: 1 }}
// // // // //               exit={{ scale: 0.9, opacity: 0 }}
// // // // //               className="bg-white dark:bg-gray-900 rounded-2xl p-6 w-full max-w-md border border-gray-200 dark:border-gray-700 shadow-2xl"
// // // // //             >
// // // // //               <div className="flex justify-between items-center mb-5">
// // // // //                 <h2 className="text-2xl font-bold text-orange-600 dark:text-orange-400">
// // // // //                   {tradeSide.toUpperCase()} {selectedPair.displaySymbol}
// // // // //                 </h2>
// // // // //                 <button
// // // // //                   onClick={() => setShowTradeModal(false)}
// // // // //                   className="text-4xl text-gray-500 hover:text-gray-700 dark:hover:text-gray-300"
// // // // //                 >
// // // // //                   ×
// // // // //                 </button>
// // // // //               </div>

// // // // //               {/* Live Market Price */}
// // // // //               <div className="mb-6 p-4 bg-gray-50 dark:bg-gray-800 rounded-xl text-center">
// // // // //                 <p className="text-sm text-gray-500 dark:text-gray-400">Current Market Price</p>
// // // // //                 <p className="text-3xl font-bold text-orange-600 dark:text-orange-400">
// // // // //                   ${Number(selectedPair.currentPrice).toLocaleString(undefined, {
// // // // //                     minimumFractionDigits: 2,
// // // // //                     maximumFractionDigits: 2,
// // // // //                   })}
// // // // //                 </p>
// // // // //                 <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
// // // // //                   24h change: {Number(selectedPair.change24h) >= 0 ? '+' : ''}
// // // // //                   {selectedPair.change24h}%
// // // // //                 </p>
// // // // //               </div>

// // // // //               <div className="grid grid-cols-2 gap-3 mb-6">
// // // // //                 <button
// // // // //                   onClick={() => setTradeSide('buy')}
// // // // //                   className={`py-3 rounded-xl font-semibold ${
// // // // //                     tradeSide === 'buy' ? 'bg-green-600 text-white' : 'bg-gray-200 dark:bg-gray-700'
// // // // //                   }`}
// // // // //                 >
// // // // //                   BUY
// // // // //                 </button>
// // // // //                 <button
// // // // //                   onClick={() => setTradeSide('sell')}
// // // // //                   disabled={!hasEnoughToSell()}
// // // // //                   className={`py-3 rounded-xl font-semibold ${
// // // // //                     tradeSide === 'sell' ? 'bg-red-600 text-white' : 'bg-gray-200 dark:bg-gray-700'
// // // // //                   } ${!hasEnoughToSell() ? 'opacity-50 cursor-not-allowed' : ''}`}
// // // // //                 >
// // // // //                   SELL
// // // // //                 </button>
// // // // //               </div>

// // // // //               <div className="mb-6">
// // // // //                 <label className="block text-sm text-gray-500 dark:text-gray-400 mb-2">
// // // // //                   Amount (USDT)
// // // // //                 </label>
// // // // //                 <input
// // // // //                   type="number"
// // // // //                   value={tradeAmount}
// // // // //                   onChange={(e) => setTradeAmount(e.target.value)}
// // // // //                   placeholder="0.00"
// // // // //                   step="any"
// // // // //                   className="w-full p-4 text-2xl bg-gray-50 dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500"
// // // // //                 />

// // // // //                 <div className="mt-2 flex justify-between text-sm text-gray-600 dark:text-gray-400">
// // // // //                   <div className='flex flex-col'>
// // // // //                     <span>Min: <strong>${MIN_TRADE_USDT}</strong></span>
// // // // //                   <span>Roi: <strong>2%</strong></span>
// // // // //                   </div>
// // // // //                   <span>Max: <strong>${MAX_TRADE_USDT.toLocaleString()}</strong></span>
// // // // //                 </div>

// // // // //                 {tradeAmount && Number(tradeAmount) > 0 && (
// // // // //                   <p className="mt-2 text-sm">
// // // // //                     ≈ <strong>{estimatedQty}</strong> {selectedPair.baseAsset}
// // // // //                     {Number(tradeAmount) < MIN_TRADE_USDT && (
// // // // //                       <span className="text-red-500 ml-2">below min</span>
// // // // //                     )}
// // // // //                     {Number(tradeAmount) > MAX_TRADE_USDT && (
// // // // //                       <span className="text-red-500 ml-2">exceeds max</span>
// // // // //                     )}
// // // // //                   </p>
// // // // //                 )}
// // // // //               </div>

// // // // //               <div className="mb-6">
// // // // //                 <label className="block text-sm text-gray-500 dark:text-gray-400 mb-2">
// // // // //                   Order Duration: <span>48hrs</span>
// // // // //                 </label>
                
// // // // //                 {orderDuration.startsWith('GTD') && (
// // // // //                   <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
// // // // //                     Order will auto-cancel after the selected time if not filled.
// // // // //                   </p>
// // // // //                 )}
// // // // //               </div>

// // // // //               <div className="flex gap-3">
// // // // //                 <button
// // // // //                   onClick={() => setShowTradeModal(false)}
// // // // //                   className="flex-1 py-3 bg-gray-200 dark:bg-gray-700 rounded-xl font-medium hover:bg-gray-300 dark:hover:bg-gray-600"
// // // // //                 >
// // // // //                   Cancel
// // // // //                 </button>
// // // // //                 <button
// // // // //                   onClick={handleExecuteTrade}
// // // // //                   disabled={loading || !isAmountValid || (tradeSide === 'sell' && !hasEnoughToSell())}
// // // // //                   className={`flex-1 py-3 rounded-xl font-bold text-white transition ${
// // // // //                     loading
// // // // //                       ? 'bg-orange-400 cursor-wait'
// // // // //                       : 'bg-orange-600 hover:bg-orange-700'
// // // // //                   } disabled:opacity-50 disabled:cursor-not-allowed`}
// // // // //                 >
// // // // //                   {loading ? 'Processing...' : 'Confirm Order'}
// // // // //                 </button>
// // // // //               </div>
// // // // //             </motion.div>
// // // // //           </div>
// // // // //         )}
// // // // //       </AnimatePresence>

// // // // //       {/* Success Modal */}
// // // // //       <AnimatePresence>
// // // // //         {showSuccessModal && (
// // // // //           <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4">
// // // // //             <motion.div
// // // // //               initial={{ scale: 0.8, opacity: 0 }}
// // // // //               animate={{ scale: 1, opacity: 1 }}
// // // // //               exit={{ scale: 0.8, opacity: 0 }}
// // // // //               className="bg-white dark:bg-gray-900 rounded-2xl p-8 text-center max-w-sm w-full"
// // // // //             >
// // // // //               <div className="text-6xl mb-4">✅</div>
// // // // //               <h2 className="text-2xl font-bold mb-3 text-green-600 dark:text-green-400">
// // // // //                 Order Placed Successfully!
// // // // //               </h2>
// // // // //               <p className="text-gray-600 dark:text-gray-300 mb-6">
// // // // //                 {tradeSide.toUpperCase()} ${Number(tradeAmount).toLocaleString()} USDT
// // // // //                 <br />
// // // // //                 {selectedPair.displaySymbol} • {orderDuration}
// // // // //               </p>
// // // // //               <button
// // // // //                 onClick={() => setShowSuccessModal(false)}
// // // // //                 className="w-full py-3 bg-orange-600 hover:bg-orange-700 text-white rounded-xl font-bold"
// // // // //               >
// // // // //                 Continue Trading
// // // // //               </button>
// // // // //             </motion.div>
// // // // //           </div>
// // // // //         )}
// // // // //       </AnimatePresence>
// // // // //     </div>
// // // // //   );
// // // // // }




// // // // // import React, { useState, useEffect } from 'react';
// // // // // import { motion, AnimatePresence } from 'framer-motion';
// // // // // import { ToastContainer, toast } from 'react-toastify';
// // // // // import 'react-toastify/dist/ReactToastify.css';
// // // // // import { tradingService } from '../../api/tradingApi';

// // // // // const MIN_TRADE_USDT = 50;
// // // // // const MAX_TRADE_USDT = 10000;

// // // // // const handleApiError = (error) => {
// // // // //   const message =
// // // // //     error?.response?.data?.message ||
// // // // //     error?.response?.data?.error ||
// // // // //     error?.message ||
// // // // //     'Failed to load data. Please try again.';
// // // // //   toast.error(message);
// // // // // };

// // // // // const normalizePair = (rawSymbol) => {
// // // // //   if (!rawSymbol || typeof rawSymbol !== 'string') return null;
// // // // //   let namePart, quotePart = 'USDT';

// // // // //   if (rawSymbol.includes('/')) {
// // // // //     [namePart, quotePart] = rawSymbol.split('/');
// // // // //   } else {
// // // // //     namePart = rawSymbol;
// // // // //   }

// // // // //   const upperName = namePart.trim().toUpperCase();
// // // // //   const nameToTicker = {
// // // // //     'BITCOIN': 'BTC',
// // // // //     'ETHEREUM': 'ETH',
// // // // //     'BNB': 'BNB',
// // // // //     'SOL': 'SOL',
// // // // //     'DOGE': 'DOGE',
// // // // //     'XRP': 'XRP',
// // // // //     'LTC': 'LTC',
// // // // //     'ADA': 'ADA',
// // // // //     'CAKE': 'CAKE',
// // // // //     'PEPE': 'PEPE',
// // // // //     'WFI': 'WFI',
// // // // //     'AVAX': 'AVAX',
// // // // //     'BCH': 'BCH',
// // // // //     'UNI': 'UNI',
// // // // //   };

// // // // //   const base = nameToTicker[upperName] || upperName;
// // // // //   quotePart = quotePart.trim().toUpperCase();

// // // // //   return {
// // // // //     raw: rawSymbol,
// // // // //     displaySymbol: `${base}/${quotePart}`,
// // // // //     apiSymbol: `${base}${quotePart}`,
// // // // //     baseAsset: base,
// // // // //     quoteAsset: quotePart,
// // // // //   };
// // // // // };

// // // // // // ────────────────────────────────────────────────
// // // // // // CoinGecko coin id mapping (lowercase ids from coingecko)
// // // // // // Extend this map for missing coins
// // // // // // ────────────────────────────────────────────────
// // // // // const tickerToCoinGeckoId = {
// // // // //   BTC: 'bitcoin',
// // // // //   ETH: 'ethereum',
// // // // //   BNB: 'binancecoin',
// // // // //   SOL: 'solana',
// // // // //   DOGE: 'dogecoin',
// // // // //   XRP: 'ripple',
// // // // //   LTC: 'litecoin',
// // // // //   ADA: 'cardano',
// // // // //   CAKE: 'pancakeswap-token',
// // // // //   PEPE: 'pepe',
// // // // //   AVAX: 'avalanche-2',
// // // // //   BCH: 'bitcoin-cash',
// // // // //   UNI: 'uniswap',
// // // // //   // WFI: ?? → add real id if listed on coingecko
// // // // //   // Add more as needed
// // // // // };

// // // // // export default function TradingDashboard() {
// // // // //   const [pairs, setPairs] = useState([]);
// // // // //   const [portfolio, setPortfolio] = useState(null);
// // // // //   const [loading, setLoading] = useState(true);
// // // // //   const [error, setError] = useState(null);
// // // // //   const [selectedPair, setSelectedPair] = useState(null);
// // // // //   const [showTradeModal, setShowTradeModal] = useState(false);
// // // // //   const [tradeSide, setTradeSide] = useState('buy');
// // // // //   const [tradeAmount, setTradeAmount] = useState('');
// // // // //   const [orderDuration, setOrderDuration] = useState('GTC');
// // // // //   const [showSuccessModal, setShowSuccessModal] = useState(false);

// // // // //   // Load initial pairs & portfolio
// // // // //   useEffect(() => {
// // // // //     const loadData = async () => {
// // // // //       setLoading(true);
// // // // //       setError(null);
// // // // //       try {
// // // // //         const [pairsResponse, portfolioResponse] = await Promise.all([
// // // // //           tradingService.getPairs(),
// // // // //           tradingService.getPortfolio(),
// // // // //         ]);

// // // // //         let receivedPairs = [];
// // // // //         if (pairsResponse?.data?.success && Array.isArray(pairsResponse.data.data)) {
// // // // //           receivedPairs = pairsResponse.data.data;
// // // // //         } else if (Array.isArray(pairsResponse?.data)) {
// // // // //           receivedPairs = pairsResponse.data;
// // // // //         }

// // // // //         const normalized = receivedPairs
// // // // //           .map(normalizePair)
// // // // //           .filter(Boolean)
// // // // //           .sort((a, b) => a.baseAsset.localeCompare(b.baseAsset));

// // // // //         setPairs(normalized); // temporarily without prices
// // // // //         setPortfolio(portfolioResponse?.data ?? null);

// // // // //         if (normalized.length === 0) {
// // // // //           toast.info('No trading pairs available at this time.');
// // // // //         }
// // // // //       } catch (err) {
// // // // //         handleApiError(err);
// // // // //         setError('Could not load trading pairs. Please check your connection.');
// // // // //       } finally {
// // // // //         setLoading(false);
// // // // //       }
// // // // //     };

// // // // //     loadData();
// // // // //   }, []);

// // // // //   // Fetch live prices from CoinGecko
// // // // //   useEffect(() => {
// // // // //     if (pairs.length === 0) return;

// // // // //     const updatePrices = async () => {
// // // // //       try {
// // // // //         // Collect coin ids we care about
// // // // //         const coinIds = pairs
// // // // //           .map(p => tickerToCoinGeckoId[p.baseAsset])
// // // // //           .filter(Boolean); // skip unmapped

// // // // //         if (coinIds.length === 0) return;

// // // // //         const idsString = [...new Set(coinIds)].join(',');

// // // // //         const url = `https://api.coingecko.com/api/v3/simple/price?ids=${idsString}&vs_currencies=usd&include_24hr_change=true`;

// // // // //         const res = await fetch(url);
// // // // //         if (!res.ok) throw new Error(`CoinGecko HTTP ${res.status}`);

// // // // //         const data = await res.json();

// // // // //         setPairs(prevPairs =>
// // // // //           prevPairs.map(pair => {
// // // // //             const cgId = tickerToCoinGeckoId[pair.baseAsset];
// // // // //             if (!cgId || !data[cgId]) return pair;

// // // // //             return {
// // // // //               ...pair,
// // // // //               currentPrice: data[cgId].usd?.toFixed(6) || '—',
// // // // //               change24h: data[cgId].usd_24h_change?.toFixed(2) || '—',
// // // // //             };
// // // // //           })
// // // // //         );
// // // // //       } catch (err) {
// // // // //         console.error('CoinGecko price fetch failed:', err);
// // // // //         // Optionally: toast.warn("Live prices temporarily unavailable");
// // // // //       }
// // // // //     };

// // // // //     updatePrices();

// // // // //     // Optional: refresh every 45 seconds (stay under rate limit)
// // // // //     // const interval = setInterval(updatePrices, 45_000);
// // // // //     // return () => clearInterval(interval);

// // // // //   }, [pairs.length]); // re-run when pairs list becomes available

// // // // //   const openTradeModal = (pairObj) => {
// // // // //     setSelectedPair(pairObj);
// // // // //     setTradeSide('buy');
// // // // //     setTradeAmount('');
// // // // //     setOrderDuration('GTC');
// // // // //     setShowTradeModal(true);
// // // // //   };

// // // // //   const hasEnoughToSell = () => {
// // // // //     if (!portfolio?.holdings || !selectedPair) return false;
// // // // //     const base = selectedPair.baseAsset;
// // // // //     const heldAmount = Number(portfolio.holdings[base] || 0);
// // // // //     const valueInUsdt = heldAmount * Number(selectedPair.currentPrice || 0);
// // // // //     return valueInUsdt >= Number(tradeAmount || 0);
// // // // //   };

// // // // //   const getEstimatedQuantity = () => {
// // // // //     if (!selectedPair?.currentPrice || Number(selectedPair.currentPrice) <= 0) return 0;
// // // // //     return Number(tradeAmount) / Number(selectedPair.currentPrice);
// // // // //   };

// // // // //   const estimatedQty = getEstimatedQuantity().toFixed(6);
// // // // //   const isAmountValid =
// // // // //     tradeAmount !== '' &&
// // // // //     !isNaN(Number(tradeAmount)) &&
// // // // //     Number(tradeAmount) >= MIN_TRADE_USDT &&
// // // // //     Number(tradeAmount) <= MAX_TRADE_USDT;

// // // // //   const handleExecuteTrade = async () => {
// // // // //     const amount = Number(tradeAmount);
// // // // //     if (isNaN(amount) || amount <= 0) {
// // // // //       toast.warn('Enter a valid amount greater than 0');
// // // // //       return;
// // // // //     }
// // // // //     if (amount < MIN_TRADE_USDT) {
// // // // //       toast.error(`Minimum trade amount is $${MIN_TRADE_USDT}`);
// // // // //       return;
// // // // //     }
// // // // //     if (amount > MAX_TRADE_USDT) {
// // // // //       toast.error(`Maximum trade amount is $${MAX_TRADE_USDT}`);
// // // // //       return;
// // // // //     }
// // // // //     if (tradeSide === 'sell' && !hasEnoughToSell()) {
// // // // //       toast.error(`Insufficient ${selectedPair.baseAsset} balance`);
// // // // //       return;
// // // // //     }

// // // // //     setLoading(true);
// // // // //     try {
// // // // //       const payload = {
// // // // //         side: tradeSide.toUpperCase(),
// // // // //         symbol: selectedPair.apiSymbol,
// // // // //         amount: amount,
// // // // //         timeInForce: orderDuration,
// // // // //       };

// // // // //       await tradingService.executeTrade(payload);

// // // // //       toast.success(
// // // // //         `${tradeSide.toUpperCase()} order placed: $${amount.toLocaleString()} USDT • ${selectedPair.displaySymbol} • ${orderDuration}`
// // // // //       );

// // // // //       setShowTradeModal(false);
// // // // //       setShowSuccessModal(true);
// // // // //       setTradeAmount('');
// // // // //       setOrderDuration('GTC');
// // // // //     } catch (err) {
// // // // //       handleApiError(err);
// // // // //     } finally {
// // // // //       setLoading(false);
// // // // //     }
// // // // //   };

// // // // //   return (
// // // // //     <div className="min-h-screen bg-gray-50 dark:bg-gray-950 pb-16">
// // // // //       <ToastContainer position="top-center" autoClose={3500} theme="colored" limit={2} />

// // // // //       <header className="sticky top-0 z-10 bg-white/95 dark:bg-gray-900/95 backdrop-blur-sm border-b border-gray-200 dark:border-gray-800 px-4 py-5">
// // // // //         <div className="max-w-7xl mx-auto flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
// // // // //           <div>
// // // // //             <h1 className="text-2xl md:text-3xl font-bold text-orange-600 dark:text-orange-400">
// // // // //               Crypto Trading
// // // // //             </h1>
// // // // //             {portfolio && (
// // // // //               <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
// // // // //                 Invested: <strong className="text-green-600">${Number(portfolio.totalInvested || 0).toLocaleString()}</strong>
// // // // //                 {' • '} PnL: <strong className={Number(portfolio.totalRealizedPnL || 0) >= 0 ? 'text-green-600' : 'text-red-600'}>
// // // // //                   ${Number(portfolio.totalRealizedPnL || 0).toLocaleString()}
// // // // //                 </strong>
// // // // //               </p>
// // // // //             )}
// // // // //           </div>
// // // // //           <button
// // // // //             onClick={() => window.location.reload()}
// // // // //             disabled={loading}
// // // // //             className="px-5 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium disabled:opacity-60 transition"
// // // // //           >
// // // // //             {loading ? 'Loading...' : 'Refresh'}
// // // // //           </button>
// // // // //         </div>
// // // // //       </header>

// // // // //       <main className="max-w-7xl mx-auto px-4 py-8">
// // // // //         {loading ? (
// // // // //           <div className="flex flex-col items-center justify-center py-20">
// // // // //             <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-orange-500"></div>
// // // // //             <p className="mt-4 text-gray-600 dark:text-gray-400">Loading available pairs...</p>
// // // // //           </div>
// // // // //         ) : error ? (
// // // // //           <div className="text-center py-16 text-red-600 dark:text-red-400">{error}</div>
// // // // //         ) : pairs.length === 0 ? (
// // // // //           <div className="text-center py-16 text-gray-500 dark:text-gray-400">
// // // // //             No trading pairs available right now.
// // // // //           </div>
// // // // //         ) : (
// // // // //           <div className="grid grid-cols-1 sm:grid-cols-1 lg:grid-cols-1 xl:grid-cols-1 gap-5">
// // // // //             {pairs.map((pair) => {
// // // // //               const isPositive = Number(pair.change24h) >= 0;
// // // // //               const priceDisplay = pair.currentPrice === '—' ? '—' : `$${Number(pair.currentPrice).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 6 })}`;

// // // // //               return (
// // // // //                 <motion.div
// // // // //                   key={pair.apiSymbol}
// // // // //                   whileHover={{ scale: 1.02, y: -2 }}
// // // // //                   className="bg-white dark:bg-gray-800 rounded-xl shadow border border-gray-200 dark:border-gray-700 hover:border-orange-500/40 transition-all duration-200 overflow-hidden"
// // // // //                 >
// // // // //                   <div className="p-5 flex items-center justify-between gap-4">
// // // // //                     <div className="flex items-baseline gap-2 min-w-0">
// // // // //                       <h3 className="text-xl font-bold tracking-tight truncate">
// // // // //                         {pair.baseAsset}
// // // // //                       </h3>
// // // // //                       <span className="text-sm font-medium text-gray-500 dark:text-gray-400">
// // // // //                         /{pair.quoteAsset}
// // // // //                       </span>
// // // // //                     </div>
// // // // //                     <div className="text-right flex-1">
// // // // //                       <div className="text-lg font-semibold">
// // // // //                         {priceDisplay}
// // // // //                       </div>
// // // // //                       <div className={`text-sm font-medium ${isPositive ? 'text-green-500' : 'text-red-500'}`}>
// // // // //                         {pair.change24h === '—' ? '—' : (isPositive ? '+' : '') + pair.change24h + '%'}
// // // // //                       </div>
// // // // //                     </div>
// // // // //                     <button
// // // // //                       onClick={() => openTradeModal(pair)}
// // // // //                       className="px-5 py-2.5 bg-orange-600 hover:bg-orange-700 text-white text-sm font-medium rounded-lg transition whitespace-nowrap"
// // // // //                     >
// // // // //                       Trade
// // // // //                     </button>
// // // // //                   </div>
// // // // //                 </motion.div>
// // // // //               );
// // // // //             })}
// // // // //           </div>
// // // // //         )}
// // // // //       </main>

// // // // //       {/* Trade Modal – unchanged except using live price */}
// // // // //       <AnimatePresence>
// // // // //         {showTradeModal && selectedPair && (
// // // // //           <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4">
// // // // //             <motion.div
// // // // //               initial={{ scale: 0.9, opacity: 0 }}
// // // // //               animate={{ scale: 1, opacity: 1 }}
// // // // //               exit={{ scale: 0.9, opacity: 0 }}
// // // // //               className="bg-white dark:bg-gray-900 rounded-2xl p-6 w-full max-w-md border border-gray-200 dark:border-gray-700 shadow-2xl"
// // // // //             >
// // // // //               <div className="flex justify-between items-center mb-5">
// // // // //                 <h2 className="text-2xl font-bold text-orange-600 dark:text-orange-400">
// // // // //                   {tradeSide.toUpperCase()} {selectedPair.displaySymbol}
// // // // //                 </h2>
// // // // //                 <button
// // // // //                   onClick={() => setShowTradeModal(false)}
// // // // //                   className="text-4xl text-gray-500 hover:text-gray-700 dark:hover:text-gray-300"
// // // // //                 >
// // // // //                   ×
// // // // //                 </button>
// // // // //               </div>

// // // // //               {/* Live Market Price */}
// // // // //               <div className="mb-6 p-4 bg-gray-50 dark:bg-gray-800 rounded-xl text-center">
// // // // //                 <p className="text-sm text-gray-500 dark:text-gray-400">Current Market Price</p>
// // // // //                 <p className="text-3xl font-bold text-orange-600 dark:text-orange-400">
// // // // //                   {selectedPair.currentPrice === '—' ? '—' : `$${Number(selectedPair.currentPrice).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 6 })}`}
// // // // //                 </p>
// // // // //                 <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
// // // // //                   24h change: {selectedPair.change24h === '—' ? '—' : (Number(selectedPair.change24h) >= 0 ? '+' : '') + selectedPair.change24h + '%'}
// // // // //                 </p>
// // // // //               </div>

// // // // //               {/* rest of modal unchanged */}
// // // // //               <div className="grid grid-cols-2 gap-3 mb-6">
// // // // //                 <button
// // // // //                   onClick={() => setTradeSide('buy')}
// // // // //                   className={`py-3 rounded-xl font-semibold ${tradeSide === 'buy' ? 'bg-green-600 text-white' : 'bg-gray-200 dark:bg-gray-700'}`}
// // // // //                 >
// // // // //                   BUY
// // // // //                 </button>
// // // // //                 <button
// // // // //                   onClick={() => setTradeSide('sell')}
// // // // //                   disabled={!hasEnoughToSell()}
// // // // //                   className={`py-3 rounded-xl font-semibold ${tradeSide === 'sell' ? 'bg-red-600 text-white' : 'bg-gray-200 dark:bg-gray-700'} ${!hasEnoughToSell() ? 'opacity-50 cursor-not-allowed' : ''}`}
// // // // //                 >
// // // // //                   SELL
// // // // //                 </button>
// // // // //               </div>

// // // // //               <div className="mb-6">
// // // // //                 <label className="block text-sm text-gray-500 dark:text-gray-400 mb-2">
// // // // //                   Amount (USDT)
// // // // //                 </label>
// // // // //                 <input
// // // // //                   type="number"
// // // // //                   value={tradeAmount}
// // // // //                   onChange={(e) => setTradeAmount(e.target.value)}
// // // // //                   placeholder="0.00"
// // // // //                   step="any"
// // // // //                   className="w-full p-4 text-2xl bg-gray-50 dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500"
// // // // //                 />
// // // // //                 <div className="mt-2 flex justify-between text-sm text-gray-600 dark:text-gray-400">
// // // // //                   <div className='flex flex-col'>
// // // // //                     <span>Min: <strong>${MIN_TRADE_USDT}</strong></span>
// // // // //                     <span>Roi: <strong>2%</strong></span>
// // // // //                   </div>
// // // // //                   <span>Max: <strong>${MAX_TRADE_USDT.toLocaleString()}</strong></span>
// // // // //                 </div>
// // // // //                 {tradeAmount && Number(tradeAmount) > 0 && (
// // // // //                   <p className="mt-2 text-sm">
// // // // //                     ≈ <strong>{estimatedQty}</strong> {selectedPair.baseAsset}
// // // // //                     {Number(tradeAmount) < MIN_TRADE_USDT && (
// // // // //                       <span className="text-red-500 ml-2">below min</span>
// // // // //                     )}
// // // // //                     {Number(tradeAmount) > MAX_TRADE_USDT && (
// // // // //                       <span className="text-red-500 ml-2">exceeds max</span>
// // // // //                     )}
// // // // //                   </p>
// // // // //                 )}
// // // // //               </div>

// // // // //               <div className="mb-6">
// // // // //                 <label className="block text-sm text-gray-500 dark:text-gray-400 mb-2">
// // // // //                   Order Duration: <span>48hrs</span>
// // // // //                 </label>
// // // // //                 {/* ... order duration selection if you add it later ... */}
// // // // //                 {orderDuration.startsWith('GTD') && (
// // // // //                   <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
// // // // //                     Order will auto-cancel after the selected time if not filled.
// // // // //                   </p>
// // // // //                 )}
// // // // //               </div>

// // // // //               <div className="flex gap-3">
// // // // //                 <button
// // // // //                   onClick={() => setShowTradeModal(false)}
// // // // //                   className="flex-1 py-3 bg-gray-200 dark:bg-gray-700 rounded-xl font-medium hover:bg-gray-300 dark:hover:bg-gray-600"
// // // // //                 >
// // // // //                   Cancel
// // // // //                 </button>
// // // // //                 <button
// // // // //                   onClick={handleExecuteTrade}
// // // // //                   disabled={loading || !isAmountValid || (tradeSide === 'sell' && !hasEnoughToSell())}
// // // // //                   className={`flex-1 py-3 rounded-xl font-bold text-white transition ${loading ? 'bg-orange-400 cursor-wait' : 'bg-orange-600 hover:bg-orange-700'} disabled:opacity-50 disabled:cursor-not-allowed`}
// // // // //                 >
// // // // //                   {loading ? 'Processing...' : 'Confirm Order'}
// // // // //                 </button>
// // // // //               </div>
// // // // //             </motion.div>
// // // // //           </div>
// // // // //         )}
// // // // //       </AnimatePresence>

// // // // //       {/* Success Modal – unchanged */}
// // // // //       <AnimatePresence>
// // // // //         {showSuccessModal && (
// // // // //           <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4">
// // // // //             <motion.div
// // // // //               initial={{ scale: 0.8, opacity: 0 }}
// // // // //               animate={{ scale: 1, opacity: 1 }}
// // // // //               exit={{ scale: 0.8, opacity: 0 }}
// // // // //               className="bg-white dark:bg-gray-900 rounded-2xl p-8 text-center max-w-sm w-full"
// // // // //             >
// // // // //               <div className="text-6xl mb-4">✅</div>
// // // // //               <h2 className="text-2xl font-bold mb-3 text-green-600 dark:text-green-400">
// // // // //                 Order Placed Successfully!
// // // // //               </h2>
// // // // //               <p className="text-gray-600 dark:text-gray-300 mb-6">
// // // // //                 {tradeSide.toUpperCase()} ${Number(tradeAmount).toLocaleString()} USDT
// // // // //                 <br />
// // // // //                 {selectedPair.displaySymbol} • {orderDuration}
// // // // //               </p>
// // // // //               <button
// // // // //                 onClick={() => setShowSuccessModal(false)}
// // // // //                 className="w-full py-3 bg-orange-600 hover:bg-orange-700 text-white rounded-xl font-bold"
// // // // //               >
// // // // //                 Continue Trading
// // // // //               </button>
// // // // //             </motion.div>
// // // // //           </div>
// // // // //         )}
// // // // //       </AnimatePresence>
// // // // //     </div>
// // // // //   );
// // // // // }




// // // // import React, { useState, useEffect } from 'react';
// // // // import { motion, AnimatePresence } from 'framer-motion';
// // // // import { ToastContainer, toast } from 'react-toastify';
// // // // import 'react-toastify/dist/ReactToastify.css';
// // // // import { tradingService } from '../../api/tradingApi';

// // // // const MIN_TRADE_USDT = 50;
// // // // const MAX_TRADE_USDT = 10000;

// // // // const handleApiError = (error) => {
// // // //   const message =
// // // //     error?.response?.data?.message ||
// // // //     error?.response?.data?.error ||
// // // //     error?.message ||
// // // //     'Failed to load data. Please try again.';
// // // //   toast.error(message);
// // // // };

// // // // const normalizePair = (rawSymbol) => {
// // // //   if (!rawSymbol || typeof rawSymbol !== 'string') return null;
// // // //   let namePart, quotePart = 'USDT';

// // // //   if (rawSymbol.includes('/')) {
// // // //     [namePart, quotePart] = rawSymbol.split('/');
// // // //   } else {
// // // //     namePart = rawSymbol;
// // // //   }

// // // //   const upperName = namePart.trim().toUpperCase();
// // // //   const nameToTicker = {
// // // //     'BITCOIN': 'BTC',
// // // //     'ETHEREUM': 'ETH',
// // // //     'BNB': 'BNB',
// // // //     'SOL': 'SOL',
// // // //     'DOGE': 'DOGE',
// // // //     'XRP': 'XRP',
// // // //     'LTC': 'LTC',
// // // //     'ADA': 'ADA',
// // // //     'CAKE': 'CAKE',
// // // //     'PEPE': 'PEPE',
// // // //     'WFI': 'WFI',
// // // //     'AVAX': 'AVAX',
// // // //     'BCH': 'BCH',
// // // //     'UNI': 'UNI',
// // // //   };

// // // //   const base = nameToTicker[upperName] || upperName;
// // // //   quotePart = quotePart.trim().toUpperCase();

// // // //   return {
// // // //     raw: rawSymbol,
// // // //     displaySymbol: `${base}/${quotePart}`,
// // // //     apiSymbol: `${base}${quotePart}`,
// // // //     baseAsset: base,
// // // //     quoteAsset: quotePart,
// // // //   };
// // // // };

// // // // // CoinGecko id mapping
// // // // const tickerToCoinGeckoId = {
// // // //   BTC: 'bitcoin',
// // // //   ETH: 'ethereum',
// // // //   BNB: 'binancecoin',
// // // //   SOL: 'solana',
// // // //   DOGE: 'dogecoin',
// // // //   XRP: 'ripple',
// // // //   LTC: 'litecoin',
// // // //   ADA: 'cardano',
// // // //   CAKE: 'pancakeswap-token',
// // // //   PEPE: 'pepe',
// // // //   AVAX: 'avalanche-2',
// // // //   BCH: 'bitcoin-cash',
// // // //   UNI: 'uniswap',
// // // //   WFI: 'wfi', // from CoinGecko data
// // // // };

// // // // // Slug mapping for cryptologos.cc (most are just lowercase ticker, but some differ)
// // // // const tickerToSlug = {
// // // //   BTC: 'bitcoin',
// // // //   ETH: 'ethereum',
// // // //   BNB: 'binance-coin',
// // // //   SOL: 'solana',
// // // //   DOGE: 'dogecoin',
// // // //   XRP: 'xrp',
// // // //   LTC: 'litecoin',
// // // //   ADA: 'cardano',
// // // //   CAKE: 'pancakeswap',
// // // //   PEPE: 'pepe',
// // // //   AVAX: 'avalanche',
// // // //   BCH: 'bitcoin-cash',
// // // //   UNI: 'uniswap',
// // // //   WFI: 'wfi', // assuming it exists or will use fallback
// // // // };

// // // // const getCoinIconUrl = (baseAsset) => {
// // // //   const tickerLower = baseAsset.toLowerCase();
// // // //   const slug = tickerToSlug[baseAsset] || tickerLower;
// // // //   return `https://cryptologos.cc/logos/${slug}-${tickerLower}-logo.svg?v=040`;
// // // // };

// // // // export default function TradingDashboard() {
// // // //   const [pairs, setPairs] = useState([]);
// // // //   const [portfolio, setPortfolio] = useState(null);
// // // //   const [loading, setLoading] = useState(true);
// // // //   const [error, setError] = useState(null);
// // // //   const [selectedPair, setSelectedPair] = useState(null);
// // // //   const [showTradeModal, setShowTradeModal] = useState(false);
// // // //   const [tradeSide, setTradeSide] = useState('buy');
// // // //   const [tradeAmount, setTradeAmount] = useState('');
// // // //   const [orderDuration, setOrderDuration] = useState('GTC');
// // // //   const [showSuccessModal, setShowSuccessModal] = useState(false);

// // // //   useEffect(() => {
// // // //     const loadData = async () => {
// // // //       setLoading(true);
// // // //       setError(null);
// // // //       try {
// // // //         const [pairsResponse, portfolioResponse] = await Promise.all([
// // // //           tradingService.getPairs(),
// // // //           tradingService.getPortfolio(),
// // // //         ]);

// // // //         let receivedPairs = [];
// // // //         if (pairsResponse?.data?.success && Array.isArray(pairsResponse.data.data)) {
// // // //           receivedPairs = pairsResponse.data.data;
// // // //         } else if (Array.isArray(pairsResponse?.data)) {
// // // //           receivedPairs = pairsResponse.data;
// // // //         }

// // // //         const normalized = receivedPairs
// // // //           .map(normalizePair)
// // // //           .filter(Boolean)
// // // //           .sort((a, b) => a.baseAsset.localeCompare(b.baseAsset));

// // // //         setPairs(normalized);
// // // //         setPortfolio(portfolioResponse?.data ?? null);

// // // //         if (normalized.length === 0) {
// // // //           toast.info('No trading pairs available at this time.');
// // // //         }
// // // //       } catch (err) {
// // // //         handleApiError(err);
// // // //         setError('Could not load trading pairs. Please check your connection.');
// // // //       } finally {
// // // //         setLoading(false);
// // // //       }
// // // //     };

// // // //     loadData();
// // // //   }, []);

// // // //   useEffect(() => {
// // // //     if (pairs.length === 0) return;

// // // //     const updatePrices = async () => {
// // // //       try {
// // // //         const coinIds = pairs
// // // //           .map(p => tickerToCoinGeckoId[p.baseAsset])
// // // //           .filter(Boolean);

// // // //         if (coinIds.length === 0) return;

// // // //         const idsString = [...new Set(coinIds)].join(',');
// // // //         const url = `https://api.coingecko.com/api/v3/simple/price?ids=${idsString}&vs_currencies=usd&include_24hr_change=true`;

// // // //         const res = await fetch(url);
// // // //         if (!res.ok) throw new Error(`CoinGecko HTTP ${res.status}`);

// // // //         const data = await res.json();

// // // //         setPairs(prev =>
// // // //           prev.map(pair => {
// // // //             const cgId = tickerToCoinGeckoId[pair.baseAsset];
// // // //             if (!cgId || !data[cgId]) return pair;

// // // //             return {
// // // //               ...pair,
// // // //               currentPrice: data[cgId].usd?.toFixed(8) || '—',
// // // //               change24h: data[cgId].usd_24h_change?.toFixed(2) || '—',
// // // //             };
// // // //           })
// // // //         );
// // // //       } catch (err) {
// // // //         console.error('CoinGecko fetch failed:', err);
// // // //       }
// // // //     };

// // // //     updatePrices();
// // // //     // Optional polling:
// // // //     // const interval = setInterval(updatePrices, 60000);
// // // //     // return () => clearInterval(interval);
// // // //   }, [pairs.length]);

// // // //   const openTradeModal = (pairObj) => {
// // // //     setSelectedPair(pairObj);
// // // //     setTradeSide('buy');
// // // //     setTradeAmount('');
// // // //     setOrderDuration('GTC');
// // // //     setShowTradeModal(true);
// // // //   };

// // // //   const hasEnoughToSell = () => {
// // // //     if (!portfolio?.holdings || !selectedPair) return false;
// // // //     const base = selectedPair.baseAsset;
// // // //     const heldAmount = Number(portfolio.holdings[base] || 0);
// // // //     const valueInUsdt = heldAmount * Number(selectedPair.currentPrice || 0);
// // // //     return valueInUsdt >= Number(tradeAmount || 0);
// // // //   };

// // // //   const getEstimatedQuantity = () => {
// // // //     if (!selectedPair?.currentPrice || Number(selectedPair.currentPrice) <= 0) return 0;
// // // //     return Number(tradeAmount) / Number(selectedPair.currentPrice);
// // // //   };

// // // //   const estimatedQty = getEstimatedQuantity().toFixed(6);
// // // //   const isAmountValid =
// // // //     tradeAmount !== '' &&
// // // //     !isNaN(Number(tradeAmount)) &&
// // // //     Number(tradeAmount) >= MIN_TRADE_USDT &&
// // // //     Number(tradeAmount) <= MAX_TRADE_USDT;

// // // //   const handleExecuteTrade = async () => {
// // // //     const amount = Number(tradeAmount);
// // // //     if (isNaN(amount) || amount <= 0) {
// // // //       toast.warn('Enter a valid amount greater than 0');
// // // //       return;
// // // //     }
// // // //     if (amount < MIN_TRADE_USDT) {
// // // //       toast.error(`Minimum trade amount is $${MIN_TRADE_USDT}`);
// // // //       return;
// // // //     }
// // // //     if (amount > MAX_TRADE_USDT) {
// // // //       toast.error(`Maximum trade amount is $${MAX_TRADE_USDT}`);
// // // //       return;
// // // //     }
// // // //     if (tradeSide === 'sell' && !hasEnoughToSell()) {
// // // //       toast.error(`Insufficient ${selectedPair.baseAsset} balance`);
// // // //       return;
// // // //     }

// // // //     setLoading(true);
// // // //     try {
// // // //       const payload = {
// // // //         side: tradeSide.toUpperCase(),
// // // //         symbol: selectedPair.apiSymbol,
// // // //         amount: amount,
// // // //         timeInForce: orderDuration,
// // // //       };

// // // //       await tradingService.executeTrade(payload);

// // // //       toast.success(
// // // //         `${tradeSide.toUpperCase()} order placed: $${amount.toLocaleString()} USDT • ${selectedPair.displaySymbol} • ${orderDuration}`
// // // //       );

// // // //       setShowTradeModal(false);
// // // //       setShowSuccessModal(true);
// // // //       setTradeAmount('');
// // // //       setOrderDuration('GTC');
// // // //     } catch (err) {
// // // //       handleApiError(err);
// // // //     } finally {
// // // //       setLoading(false);
// // // //     }
// // // //   };

// // // //   return (
// // // //     <div className="min-h-screen bg-gray-50 dark:bg-gray-950 pb-16">
// // // //       <ToastContainer position="top-center" autoClose={3500} theme="colored" limit={2} />

// // // //       <header className="sticky top-0 z-10 bg-white/95 dark:bg-gray-900/95 backdrop-blur-sm border-b border-gray-200 dark:border-gray-800 px-4 py-5">
// // // //         <div className="max-w-7xl mx-auto flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
// // // //           <div>
// // // //             <h1 className="text-2xl md:text-3xl font-bold text-orange-600 dark:text-orange-400">
// // // //               Crypto Trading
// // // //             </h1>
// // // //             {portfolio && (
// // // //               <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
// // // //                 Invested: <strong className="text-green-600">${Number(portfolio.totalInvested || 0).toLocaleString()}</strong>
// // // //                 {' • '} PnL: <strong className={Number(portfolio.totalRealizedPnL || 0) >= 0 ? 'text-green-600' : 'text-red-600'}>
// // // //                   ${Number(portfolio.totalRealizedPnL || 0).toLocaleString()}
// // // //                 </strong>
// // // //               </p>
// // // //             )}
// // // //           </div>
// // // //           <button
// // // //             onClick={() => window.location.reload()}
// // // //             disabled={loading}
// // // //             className="px-5 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium disabled:opacity-60 transition"
// // // //           >
// // // //             {loading ? 'Loading...' : 'Refresh'}
// // // //           </button>
// // // //         </div>
// // // //       </header>

// // // //       <main className="max-w-7xl mx-auto px-4 py-8">
// // // //         {loading ? (
// // // //           <div className="flex flex-col items-center justify-center py-20">
// // // //             <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-orange-500"></div>
// // // //             <p className="mt-4 text-gray-600 dark:text-gray-400">Loading available pairs...</p>
// // // //           </div>
// // // //         ) : error ? (
// // // //           <div className="text-center py-16 text-red-600 dark:text-red-400">{error}</div>
// // // //         ) : pairs.length === 0 ? (
// // // //           <div className="text-center py-16 text-gray-500 dark:text-gray-400">
// // // //             No trading pairs available right now.
// // // //           </div>
// // // //         ) : (
// // // //           <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
// // // //             {pairs.map((pair) => {
// // // //               const isPositive = Number(pair.change24h) >= 0;
// // // //               const priceDisplay = pair.currentPrice === '—'
// // // //                 ? '—'
// // // //                 : `$${Number(pair.currentPrice).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 8 })}`;

// // // //               return (
// // // //                 <motion.div
// // // //                   key={pair.apiSymbol}
// // // //                   whileHover={{ scale: 1.02, y: -2 }}
// // // //                   className="bg-white dark:bg-gray-800 rounded-xl shadow border border-gray-200 dark:border-gray-700 hover:border-orange-500/40 transition-all duration-200 overflow-hidden"
// // // //                 >
// // // //                   <div className="p-5 flex items-center justify-between gap-4">
// // // //                     <div className="flex items-center gap-3 min-w-0">
// // // //                       <img
// // // //                         src={getCoinIconUrl(pair.baseAsset)}
// // // //                         alt={`${pair.baseAsset} logo`}
// // // //                         className="w-10 h-10 rounded-full flex-shrink-0 object-contain bg-gray-100 dark:bg-gray-700 p-1 border border-gray-200 dark:border-gray-600"
// // // //                         loading="lazy"
// // // //                         onError={(e) => {
// // // //                           e.target.src = 'https://cryptologos.cc/logos/question-mark-question-mark-logo.svg?v=040';
// // // //                           e.target.onerror = null;
// // // //                         }}
// // // //                       />
// // // //                       <div className="flex flex-col">
// // // //                         <h3 className="text-xl font-bold tracking-tight">
// // // //                           {pair.baseAsset}
// // // //                         </h3>
// // // //                         <span className="text-sm font-medium text-gray-500 dark:text-gray-400">
// // // //                           /{pair.quoteAsset}
// // // //                         </span>
// // // //                       </div>
// // // //                     </div>

// // // //                     <div className="text-right flex-1">
// // // //                       <div className="text-lg font-semibold">
// // // //                         {priceDisplay}
// // // //                       </div>
// // // //                       <div className={`text-sm font-medium ${isPositive ? 'text-green-500' : 'text-red-500'}`}>
// // // //                         {pair.change24h === '—' ? '—' : `${isPositive ? '+' : ''}${pair.change24h}%`}
// // // //                       </div>
// // // //                     </div>

// // // //                     <button
// // // //                       onClick={() => openTradeModal(pair)}
// // // //                       className="px-5 py-2.5 bg-orange-600 hover:bg-orange-700 text-white text-sm font-medium rounded-lg transition whitespace-nowrap"
// // // //                     >
// // // //                       Trade
// // // //                     </button>
// // // //                   </div>
// // // //                 </motion.div>
// // // //               );
// // // //             })}
// // // //           </div>
// // // //         )}
// // // //       </main>

// // // //       {/* Trade Modal */}
// // // //       <AnimatePresence>
// // // //         {showTradeModal && selectedPair && (
// // // //           <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4">
// // // //             <motion.div
// // // //               initial={{ scale: 0.9, opacity: 0 }}
// // // //               animate={{ scale: 1, opacity: 1 }}
// // // //               exit={{ scale: 0.9, opacity: 0 }}
// // // //               className="bg-white dark:bg-gray-900 rounded-2xl p-6 w-full max-w-md border border-gray-200 dark:border-gray-700 shadow-2xl"
// // // //             >
// // // //               <div className="flex justify-between items-center mb-5">
// // // //                 <h2 className="text-2xl font-bold text-orange-600 dark:text-orange-400">
// // // //                   {tradeSide.toUpperCase()} {selectedPair.displaySymbol}
// // // //                 </h2>
// // // //                 <button
// // // //                   onClick={() => setShowTradeModal(false)}
// // // //                   className="text-4xl text-gray-500 hover:text-gray-700 dark:hover:text-gray-300"
// // // //                 >
// // // //                   ×
// // // //                 </button>
// // // //               </div>

// // // //               <div className="mb-6 p-4 bg-gray-50 dark:bg-gray-800 rounded-xl text-center">
// // // //                 <p className="text-sm text-gray-500 dark:text-gray-400">Current Market Price</p>
// // // //                 <p className="text-3xl font-bold text-orange-600 dark:text-orange-400">
// // // //                   {selectedPair.currentPrice === '—' ? '—' : `$${Number(selectedPair.currentPrice).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 8 })}`}
// // // //                 </p>
// // // //                 <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
// // // //                   24h change: {selectedPair.change24h === '—' ? '—' : `${Number(selectedPair.change24h) >= 0 ? '+' : ''}${selectedPair.change24h}%`}
// // // //                 </p>
// // // //               </div>

// // // //               <div className="grid grid-cols-2 gap-3 mb-6">
// // // //                 <button
// // // //                   onClick={() => setTradeSide('buy')}
// // // //                   className={`py-3 rounded-xl font-semibold ${tradeSide === 'buy' ? 'bg-green-600 text-white' : 'bg-gray-200 dark:bg-gray-700'}`}
// // // //                 >
// // // //                   BUY
// // // //                 </button>
// // // //                 <button
// // // //                   onClick={() => setTradeSide('sell')}
// // // //                   disabled={!hasEnoughToSell()}
// // // //                   className={`py-3 rounded-xl font-semibold ${tradeSide === 'sell' ? 'bg-red-600 text-white' : 'bg-gray-200 dark:bg-gray-700'} ${!hasEnoughToSell() ? 'opacity-50 cursor-not-allowed' : ''}`}
// // // //                 >
// // // //                   SELL
// // // //                 </button>
// // // //               </div>

// // // //               <div className="mb-6">
// // // //                 <label className="block text-sm text-gray-500 dark:text-gray-400 mb-2">
// // // //                   Amount (USDT)
// // // //                 </label>
// // // //                 <input
// // // //                   type="number"
// // // //                   value={tradeAmount}
// // // //                   onChange={(e) => setTradeAmount(e.target.value)}
// // // //                   placeholder="0.00"
// // // //                   step="any"
// // // //                   className="w-full p-4 text-2xl bg-gray-50 dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500"
// // // //                 />
// // // //                 <div className="mt-2 flex justify-between text-sm text-gray-600 dark:text-gray-400">
// // // //                   <div className='flex flex-col'>
// // // //                     <span>Min: <strong>${MIN_TRADE_USDT}</strong></span>
// // // //                     <span>Roi: <strong>2%</strong></span>
// // // //                   </div>
// // // //                   <span>Max: <strong>${MAX_TRADE_USDT.toLocaleString()}</strong></span>
// // // //                 </div>
// // // //                 {tradeAmount && Number(tradeAmount) > 0 && (
// // // //                   <p className="mt-2 text-sm">
// // // //                     ≈ <strong>{estimatedQty}</strong> {selectedPair.baseAsset}
// // // //                     {Number(tradeAmount) < MIN_TRADE_USDT && (
// // // //                       <span className="text-red-500 ml-2">below min</span>
// // // //                     )}
// // // //                     {Number(tradeAmount) > MAX_TRADE_USDT && (
// // // //                       <span className="text-red-500 ml-2">exceeds max</span>
// // // //                     )}
// // // //                   </p>
// // // //                 )}
// // // //               </div>

// // // //               <div className="mb-6">
// // // //                 <label className="block text-sm text-gray-500 dark:text-gray-400 mb-2">
// // // //                   Order Duration: <span>48hrs</span>
// // // //                 </label>
// // // //                 {orderDuration.startsWith('GTD') && (
// // // //                   <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
// // // //                     Order will auto-cancel after the selected time if not filled.
// // // //                   </p>
// // // //                 )}
// // // //               </div>

// // // //               <div className="flex gap-3">
// // // //                 <button
// // // //                   onClick={() => setShowTradeModal(false)}
// // // //                   className="flex-1 py-3 bg-gray-200 dark:bg-gray-700 rounded-xl font-medium hover:bg-gray-300 dark:hover:bg-gray-600"
// // // //                 >
// // // //                   Cancel
// // // //                 </button>
// // // //                 <button
// // // //                   onClick={handleExecuteTrade}
// // // //                   disabled={loading || !isAmountValid || (tradeSide === 'sell' && !hasEnoughToSell())}
// // // //                   className={`flex-1 py-3 rounded-xl font-bold text-white transition ${loading ? 'bg-orange-400 cursor-wait' : 'bg-orange-600 hover:bg-orange-700'} disabled:opacity-50 disabled:cursor-not-allowed`}
// // // //                 >
// // // //                   {loading ? 'Processing...' : 'Confirm Order'}
// // // //                 </button>
// // // //               </div>
// // // //             </motion.div>
// // // //           </div>
// // // //         )}
// // // //       </AnimatePresence>

// // // //       <AnimatePresence>
// // // //         {showSuccessModal && (
// // // //           <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4">
// // // //             <motion.div
// // // //               initial={{ scale: 0.8, opacity: 0 }}
// // // //               animate={{ scale: 1, opacity: 1 }}
// // // //               exit={{ scale: 0.8, opacity: 0 }}
// // // //               className="bg-white dark:bg-gray-900 rounded-2xl p-8 text-center max-w-sm w-full"
// // // //             >
// // // //               <div className="text-6xl mb-4">✅</div>
// // // //               <h2 className="text-2xl font-bold mb-3 text-green-600 dark:text-green-400">
// // // //                 Order Placed Successfully!
// // // //               </h2>
// // // //               <p className="text-gray-600 dark:text-gray-300 mb-6">
// // // //                 {tradeSide.toUpperCase()} ${Number(tradeAmount).toLocaleString()} USDT
// // // //                 <br />
// // // //                 {selectedPair.displaySymbol} • {orderDuration}
// // // //               </p>
// // // //               <button
// // // //                 onClick={() => setShowSuccessModal(false)}
// // // //                 className="w-full py-3 bg-orange-600 hover:bg-orange-700 text-white rounded-xl font-bold"
// // // //               >
// // // //                 Continue Trading
// // // //               </button>
// // // //             </motion.div>
// // // //           </div>
// // // //         )}
// // // //       </AnimatePresence>
// // // //     </div>
// // // //   );
// // // // }





// // // // import React, { useState, useEffect } from 'react';
// // // // import { motion, AnimatePresence } from 'framer-motion';
// // // // import { ToastContainer, toast } from 'react-toastify';
// // // // import 'react-toastify/dist/ReactToastify.css';
// // // // import { tradingService } from '../../api/tradingApi';

// // // // const MIN_TRADE_USDT = 50;
// // // // const MAX_TRADE_USDT = 10000;

// // // // const handleApiError = (error) => {
// // // //   const message =
// // // //     error?.response?.data?.message ||
// // // //     error?.response?.data?.error ||
// // // //     error?.message ||
// // // //     'Failed to load data. Please try again.';
// // // //   toast.error(message);
// // // // };

// // // // const normalizePair = (rawSymbol) => {
// // // //   if (!rawSymbol || typeof rawSymbol !== 'string') return null;
// // // //   let namePart, quotePart = 'USDT';

// // // //   if (rawSymbol.includes('/')) {
// // // //     [namePart, quotePart] = rawSymbol.split('/');
// // // //   } else {
// // // //     namePart = rawSymbol;
// // // //   }

// // // //   const upperName = namePart.trim().toUpperCase();
// // // //   const nameToTicker = {
// // // //     'BITCOIN': 'BTC',
// // // //     'ETHEREUM': 'ETH',
// // // //     'BNB': 'BNB',
// // // //     'SOL': 'SOL',
// // // //     'DOGE': 'DOGE',
// // // //     'XRP': 'XRP',
// // // //     'LTC': 'LTC',
// // // //     'ADA': 'ADA',
// // // //     'CAKE': 'CAKE',
// // // //     'PEPE': 'PEPE',
// // // //     'WFI': 'WFI',
// // // //     'AVAX': 'AVAX',
// // // //     'BCH': 'BCH',
// // // //     'UNI': 'UNI',
// // // //   };

// // // //   const base = nameToTicker[upperName] || upperName;
// // // //   quotePart = quotePart.trim().toUpperCase();

// // // //   return {
// // // //     raw: rawSymbol,
// // // //     displaySymbol: `${base}/${quotePart}`,
// // // //     apiSymbol: `${base}${quotePart}`,
// // // //     baseAsset: base,
// // // //     quoteAsset: quotePart,
// // // //   };
// // // // };

// // // // // CoinGecko id mapping
// // // // const tickerToCoinGeckoId = {
// // // //   BTC: 'bitcoin',
// // // //   ETH: 'ethereum',
// // // //   BNB: 'binancecoin',
// // // //   SOL: 'solana',
// // // //   DOGE: 'dogecoin',
// // // //   XRP: 'ripple',
// // // //   LTC: 'litecoin',
// // // //   ADA: 'cardano',
// // // //   CAKE: 'pancakeswap-token',
// // // //   PEPE: 'pepe',
// // // //   AVAX: 'avalanche-2',
// // // //   BCH: 'bitcoin-cash',
// // // //   UNI: 'uniswap',
// // // //   WFI: 'wfi',
// // // // };

// // // // // Slug mapping for icons
// // // // const tickerToSlug = {
// // // //   BTC: 'bitcoin',
// // // //   ETH: 'ethereum',
// // // //   BNB: 'binance-coin',
// // // //   SOL: 'solana',
// // // //   DOGE: 'dogecoin',
// // // //   XRP: 'xrp',
// // // //   LTC: 'litecoin',
// // // //   ADA: 'cardano',
// // // //   CAKE: 'pancakeswap',
// // // //   PEPE: 'pepe',
// // // //   AVAX: 'avalanche',
// // // //   BCH: 'bitcoin-cash',
// // // //   UNI: 'uniswap',
// // // //   WFI: 'wfi',
// // // // };

// // // // const getCoinIconUrl = (baseAsset) => {
// // // //   const tickerLower = baseAsset.toLowerCase();
// // // //   const slug = tickerToSlug[baseAsset] || tickerLower;
// // // //   return `https://cryptologos.cc/logos/${slug}-${tickerLower}-logo.svg?v=040`;
// // // // };

// // // // export default function TradingDashboard() {
// // // //   const [pairs, setPairs] = useState([]);
// // // //   const [prices, setPrices] = useState({}); // { BTC: { price: number, change24h: number }, ... }
// // // //   const [portfolio, setPortfolio] = useState(null);
// // // //   const [loading, setLoading] = useState(true);
// // // //   const [error, setError] = useState(null);
// // // //   const [selectedPair, setSelectedPair] = useState(null);
// // // //   const [showTradeModal, setShowTradeModal] = useState(false);
// // // //   const [tradeSide, setTradeSide] = useState('buy');
// // // //   const [tradeAmount, setTradeAmount] = useState('');
// // // //   const [orderDuration, setOrderDuration] = useState('GTC');
// // // //   const [showSuccessModal, setShowSuccessModal] = useState(false);

// // // //   // Load pairs & portfolio
// // // //   useEffect(() => {
// // // //     const loadData = async () => {
// // // //       setLoading(true);
// // // //       setError(null);
// // // //       try {
// // // //         const [pairsResponse, portfolioResponse] = await Promise.all([
// // // //           tradingService.getPairs(),
// // // //           tradingService.getPortfolio(),
// // // //         ]);

// // // //         let receivedPairs = [];
// // // //         if (pairsResponse?.data?.success && Array.isArray(pairsResponse.data.data)) {
// // // //           receivedPairs = pairsResponse.data.data;
// // // //         } else if (Array.isArray(pairsResponse?.data)) {
// // // //           receivedPairs = pairsResponse.data;
// // // //         }

// // // //         const normalized = receivedPairs
// // // //           .map(normalizePair)
// // // //           .filter(Boolean)
// // // //           .sort((a, b) => a.baseAsset.localeCompare(b.baseAsset));

// // // //         setPairs(normalized);
// // // //         setPortfolio(portfolioResponse?.data ?? null);

// // // //         if (normalized.length === 0) {
// // // //           toast.info('No trading pairs available at this time.');
// // // //         }
// // // //       } catch (err) {
// // // //         handleApiError(err);
// // // //         setError('Could not load trading pairs. Please check your connection.');
// // // //       } finally {
// // // //         setLoading(false);
// // // //       }
// // // //     };

// // // //     loadData();
// // // //   }, []);

// // // //   // Fetch live prices → separate state
// // // //   useEffect(() => {
// // // //     if (pairs.length === 0) return;

// // // //     const updatePrices = async () => {
// // // //       try {
// // // //         const coinIds = pairs
// // // //           .map((p) => tickerToCoinGeckoId[p.baseAsset])
// // // //           .filter(Boolean);

// // // //         if (coinIds.length === 0) return;

// // // //         const idsString = [...new Set(coinIds)].join(',');
// // // //         const url = `https://api.coingecko.com/api/v3/simple/price?ids=${idsString}&vs_currencies=usd&include_24hr_change=true`;

// // // //         const res = await fetch(url);
// // // //         if (!res.ok) throw new Error(`CoinGecko HTTP ${res.status}`);

// // // //         const data = await res.json();

// // // //         const newPrices = {};
// // // //         pairs.forEach((pair) => {
// // // //           const id = tickerToCoinGeckoId[pair.baseAsset];
// // // //           if (id && data[id]) {
// // // //             newPrices[pair.baseAsset] = {
// // // //               price: data[id].usd,
// // // //               change24h: data[id].usd_24h_change,
// // // //             };
// // // //           }
// // // //         });

// // // //         setPrices(newPrices);
// // // //       } catch (err) {
// // // //         console.error('CoinGecko price fetch failed:', err);
// // // //       }
// // // //     };

// // // //     updatePrices();

// // // //     // Optional: refresh every 60 seconds
// // // //     // const interval = setInterval(updatePrices, 60000);
// // // //     // return () => clearInterval(interval);
// // // //   }, [pairs]);

// // // //   const openTradeModal = (pairObj) => {
// // // //     setSelectedPair(pairObj);
// // // //     setTradeSide('buy');
// // // //     setTradeAmount('');
// // // //     setOrderDuration('GTC');
// // // //     setShowTradeModal(true);
// // // //   };

// // // //   const hasEnoughToSell = () => {
// // // //     if (!portfolio?.holdings || !selectedPair) return false;
// // // //     const base = selectedPair.baseAsset;
// // // //     const heldAmount = Number(portfolio.holdings[base] || 0);
// // // //     const price = prices[base]?.price || 0;
// // // //     const valueInUsdt = heldAmount * price;
// // // //     return valueInUsdt >= Number(tradeAmount || 0);
// // // //   };

// // // //   const getEstimatedQuantity = () => {
// // // //     const price = prices[selectedPair?.baseAsset]?.price;
// // // //     if (!price || Number(price) <= 0 || !tradeAmount) return 0;
// // // //     return Number(tradeAmount) / price;
// // // //   };

// // // //   const estimatedQty = getEstimatedQuantity().toFixed(6);

// // // //   const isAmountValid =
// // // //     tradeAmount !== '' &&
// // // //     !isNaN(Number(tradeAmount)) &&
// // // //     Number(tradeAmount) >= MIN_TRADE_USDT &&
// // // //     Number(tradeAmount) <= MAX_TRADE_USDT;

// // // //   const handleExecuteTrade = async () => {
// // // //     const amount = Number(tradeAmount);
// // // //     if (isNaN(amount) || amount <= 0) {
// // // //       toast.warn('Enter a valid amount greater than 0');
// // // //       return;
// // // //     }
// // // //     if (amount < MIN_TRADE_USDT) {
// // // //       toast.error(`Minimum trade amount is $${MIN_TRADE_USDT}`);
// // // //       return;
// // // //     }
// // // //     if (amount > MAX_TRADE_USDT) {
// // // //       toast.error(`Maximum trade amount is $${MAX_TRADE_USDT}`);
// // // //       return;
// // // //     }
// // // //     if (tradeSide === 'sell' && !hasEnoughToSell()) {
// // // //       toast.error(`Insufficient ${selectedPair.baseAsset} balance`);
// // // //       return;
// // // //     }

// // // //     setLoading(true);
// // // //     try {
// // // //       const payload = {
// // // //         side: tradeSide.toUpperCase(),
// // // //         symbol: selectedPair.apiSymbol,
// // // //         amount: amount,
// // // //         timeInForce: orderDuration,
// // // //       };

// // // //       await tradingService.executeTrade(payload);

// // // //       toast.success(
// // // //         `${tradeSide.toUpperCase()} order placed: $${amount.toLocaleString()} USDT • ${selectedPair.displaySymbol} • ${orderDuration}`
// // // //       );

// // // //       setShowTradeModal(false);
// // // //       setShowSuccessModal(true);
// // // //       setTradeAmount('');
// // // //       setOrderDuration('GTC');
// // // //     } catch (err) {
// // // //       handleApiError(err);
// // // //     } finally {
// // // //       setLoading(false);
// // // //     }
// // // //   };

// // // //   return (
// // // //     <div className="min-h-screen bg-gray-50 dark:bg-gray-950 pb-16">
// // // //       <ToastContainer position="top-center" autoClose={3500} theme="colored" limit={2} />

// // // //       <header className="sticky top-0 z-10 bg-white/95 dark:bg-gray-900/95 backdrop-blur-sm border-b border-gray-200 dark:border-gray-800 px-4 py-5">
// // // //         <div className="max-w-7xl mx-auto flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
// // // //           <div>
// // // //             <h1 className="text-2xl md:text-3xl font-bold text-orange-600 dark:text-orange-400">
// // // //               Crypto Trading
// // // //             </h1>
// // // //             {portfolio && (
// // // //               <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
// // // //                 Invested: <strong className="text-green-600">${Number(portfolio.totalInvested || 0).toLocaleString()}</strong>
// // // //                 {' • '} PnL: <strong className={Number(portfolio.totalRealizedPnL || 0) >= 0 ? 'text-green-600' : 'text-red-600'}>
// // // //                   ${Number(portfolio.totalRealizedPnL || 0).toLocaleString()}
// // // //                 </strong>
// // // //               </p>
// // // //             )}
// // // //           </div>
// // // //           <button
// // // //             onClick={() => window.location.reload()}
// // // //             disabled={loading}
// // // //             className="px-5 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium disabled:opacity-60 transition"
// // // //           >
// // // //             {loading ? 'Loading...' : 'Refresh'}
// // // //           </button>
// // // //         </div>
// // // //       </header>

// // // //       <main className="max-w-7xl mx-auto px-4 py-8">
// // // //         {loading ? (
// // // //           <div className="flex flex-col items-center justify-center py-20">
// // // //             <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-orange-500"></div>
// // // //             <p className="mt-4 text-gray-600 dark:text-gray-400">Loading available pairs...</p>
// // // //           </div>
// // // //         ) : error ? (
// // // //           <div className="text-center py-16 text-red-600 dark:text-red-400">{error}</div>
// // // //         ) : pairs.length === 0 ? (
// // // //           <div className="text-center py-16 text-gray-500 dark:text-gray-400">
// // // //             No trading pairs available right now.
// // // //           </div>
// // // //         ) : (
// // // //           <div className="grid grid-cols-1 sm:grid-cols-1 lg:grid-cols-1 xl:grid-cols-1 gap-5">
// // // //             {pairs.map((pair) => {
// // // //               const live = prices[pair.baseAsset];
// // // //               const priceValue = live?.price;
// // // //               const changeValue = live?.change24h;

// // // //               const priceDisplay = typeof priceValue === 'number'
// // // //                 ? `$${priceValue.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 8 })}`
// // // //                 : '—';

// // // //               const isPositive = typeof changeValue === 'number' && changeValue >= 0;
// // // //               const changeDisplay = typeof changeValue === 'number'
// // // //                 ? `${isPositive ? '+' : ''}${changeValue.toFixed(2)}%`
// // // //                 : '—';

// // // //               return (
// // // //                 <motion.div
// // // //                   key={pair.apiSymbol}
// // // //                   whileHover={{ scale: 1.02, y: -2 }}
// // // //                   className="bg-white dark:bg-gray-800 rounded-xl shadow border border-gray-200 dark:border-gray-700 hover:border-orange-500/40 transition-all duration-200 overflow-hidden"
// // // //                 >
// // // //                   <div className="p-5 flex items-center justify-between gap-4">
// // // //                     <div className="flex items-center gap-3 min-w-0">
// // // //                       <img
// // // //                         src={getCoinIconUrl(pair.baseAsset)}
// // // //                         alt={`${pair.baseAsset} logo`}
// // // //                         className="w-10 h-10 rounded-full flex-shrink-0 object-contain bg-gray-100 dark:bg-gray-700 p-1 border border-gray-200 dark:border-gray-600"
// // // //                         loading="lazy"
// // // //                         onError={(e) => {
// // // //                           e.target.src = 'https://cryptologos.cc/logos/question-mark-question-mark-logo.svg?v=040';
// // // //                           e.target.onerror = null;
// // // //                         }}
// // // //                       />
// // // //                       <div className="flex flex-col">
// // // //                         <h3 className="text-xl font-bold tracking-tight">
// // // //                           {pair.baseAsset}
// // // //                         </h3>
// // // //                         <span className="text-sm font-medium text-gray-500 dark:text-gray-400">
// // // //                           /{pair.quoteAsset}
// // // //                         </span>
// // // //                       </div>
// // // //                     </div>

// // // //                     <div className="text-right flex-1">
// // // //                       <div className="text-lg font-semibold">
// // // //                         {priceDisplay}
// // // //                       </div>
// // // //                       <div className={`text-sm font-medium ${isPositive ? 'text-green-500' : 'text-red-500'}`}>
// // // //                         {changeDisplay}
// // // //                       </div>
// // // //                     </div>

// // // //                     <button
// // // //                       onClick={() => openTradeModal(pair)}
// // // //                       className="px-5 py-2.5 bg-orange-600 hover:bg-orange-700 text-white text-sm font-medium rounded-lg transition whitespace-nowrap"
// // // //                     >
// // // //                       Trade
// // // //                     </button>
// // // //                   </div>
// // // //                 </motion.div>
// // // //               );
// // // //             })}
// // // //           </div>
// // // //         )}
// // // //       </main>

// // // //       {/* ──────────────────────────────────────────────── */}
// // // //       {/* Trade Modal (your original structure kept) */}
// // // //       {/* ──────────────────────────────────────────────── */}
// // // //       <AnimatePresence>
// // // //         {showTradeModal && selectedPair && (
// // // //           <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4">
// // // //             <motion.div
// // // //               initial={{ scale: 0.9, opacity: 0 }}
// // // //               animate={{ scale: 1, opacity: 1 }}
// // // //               exit={{ scale: 0.9, opacity: 0 }}
// // // //               className="bg-white dark:bg-gray-900 rounded-2xl p-6 w-full max-w-md border border-gray-200 dark:border-gray-700 shadow-2xl"
// // // //             >
// // // //               <div className="flex justify-between items-center mb-5">
// // // //                 <h2 className="text-2xl font-bold text-orange-600 dark:text-orange-400">
// // // //                   {tradeSide.toUpperCase()} {selectedPair.displaySymbol}
// // // //                 </h2>
// // // //                 <button
// // // //                   onClick={() => setShowTradeModal(false)}
// // // //                   className="text-4xl text-gray-500 hover:text-gray-700 dark:hover:text-gray-300"
// // // //                 >
// // // //                   ×
// // // //                 </button>
// // // //               </div>

// // // //               <div className="mb-6 p-4 bg-gray-50 dark:bg-gray-800 rounded-xl text-center">
// // // //                 <p className="text-sm text-gray-500 dark:text-gray-400">Current Market Price</p>
// // // //                 <p className="text-3xl font-bold text-orange-600 dark:text-orange-400">
// // // //                   {(() => {
// // // //                     const p = prices[selectedPair.baseAsset]?.price;
// // // //                     return typeof p === 'number'
// // // //                       ? `$${p.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 8 })}`
// // // //                       : '—';
// // // //                   })()}
// // // //                 </p>
// // // //                 <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
// // // //                   24h change:{' '}
// // // //                   {(() => {
// // // //                     const c = prices[selectedPair.baseAsset]?.change24h;
// // // //                     const pos = typeof c === 'number' && c >= 0;
// // // //                     return typeof c === 'number' ? `${pos ? '+' : ''}${c.toFixed(2)}%` : '—';
// // // //                   })()}
// // // //                 </p>
// // // //               </div>

// // // //               <div className="grid grid-cols-2 gap-3 mb-6">
// // // //                 <button
// // // //                   onClick={() => setTradeSide('buy')}
// // // //                   className={`py-3 rounded-xl font-semibold ${tradeSide === 'buy' ? 'bg-green-600 text-white' : 'bg-gray-200 dark:bg-gray-700'}`}
// // // //                 >
// // // //                   BUY
// // // //                 </button>
// // // //                 <button
// // // //                   onClick={() => setTradeSide('sell')}
// // // //                   disabled={!hasEnoughToSell()}
// // // //                   className={`py-3 rounded-xl font-semibold ${tradeSide === 'sell' ? 'bg-red-600 text-white' : 'bg-gray-200 dark:bg-gray-700'} ${!hasEnoughToSell() ? 'opacity-50 cursor-not-allowed' : ''}`}
// // // //                 >
// // // //                   SELL
// // // //                 </button>
// // // //               </div>

// // // //               <div className="mb-6">
// // // //                 <label className="block text-sm text-gray-500 dark:text-gray-400 mb-2">
// // // //                   Amount (USDT)
// // // //                 </label>
// // // //                 <input
// // // //                   type="number"
// // // //                   value={tradeAmount}
// // // //                   onChange={(e) => setTradeAmount(e.target.value)}
// // // //                   placeholder="0.00"
// // // //                   step="any"
// // // //                   className="w-full p-4 text-2xl bg-gray-50 dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500"
// // // //                 />
// // // //                 <div className="mt-2 flex justify-between text-sm text-gray-600 dark:text-gray-400">
// // // //                   <div className='flex flex-col'>
// // // //                     <span>Min: <strong>${MIN_TRADE_USDT}</strong></span>
// // // //                     <span>Roi: <strong>2%</strong></span>
// // // //                   </div>
// // // //                   <span>Max: <strong>${MAX_TRADE_USDT.toLocaleString()}</strong></span>
// // // //                 </div>
// // // //                 {tradeAmount && Number(tradeAmount) > 0 && (
// // // //                   <p className="mt-2 text-sm">
// // // //                     ≈ <strong>{estimatedQty}</strong> {selectedPair.baseAsset}
// // // //                     {Number(tradeAmount) < MIN_TRADE_USDT && (
// // // //                       <span className="text-red-500 ml-2">below min</span>
// // // //                     )}
// // // //                     {Number(tradeAmount) > MAX_TRADE_USDT && (
// // // //                       <span className="text-red-500 ml-2">exceeds max</span>
// // // //                     )}
// // // //                   </p>
// // // //                 )}
// // // //               </div>

// // // //               <div className="mb-6">
// // // //                 <label className="block text-sm text-gray-500 dark:text-gray-400 mb-2">
// // // //                   Order Duration: <span>48hrs</span>
// // // //                 </label>
// // // //                 {orderDuration.startsWith('GTD') && (
// // // //                   <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
// // // //                     Order will auto-cancel after the selected time if not filled.
// // // //                   </p>
// // // //                 )}
// // // //               </div>

// // // //               <div className="flex gap-3">
// // // //                 <button
// // // //                   onClick={() => setShowTradeModal(false)}
// // // //                   className="flex-1 py-3 bg-gray-200 dark:bg-gray-700 rounded-xl font-medium hover:bg-gray-300 dark:hover:bg-gray-600"
// // // //                 >
// // // //                   Cancel
// // // //                 </button>
// // // //                 <button
// // // //                   onClick={handleExecuteTrade}
// // // //                   disabled={loading || !isAmountValid || (tradeSide === 'sell' && !hasEnoughToSell())}
// // // //                   className={`flex-1 py-3 rounded-xl font-bold text-white transition ${loading ? 'bg-orange-400 cursor-wait' : 'bg-orange-600 hover:bg-orange-700'} disabled:opacity-50 disabled:cursor-not-allowed`}
// // // //                 >
// // // //                   {loading ? 'Processing...' : 'Confirm Order'}
// // // //                 </button>
// // // //               </div>
// // // //             </motion.div>
// // // //           </div>
// // // //         )}
// // // //       </AnimatePresence>

// // // //       {/* Success Modal */}
// // // //       <AnimatePresence>
// // // //         {showSuccessModal && (
// // // //           <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4">
// // // //             <motion.div
// // // //               initial={{ scale: 0.8, opacity: 0 }}
// // // //               animate={{ scale: 1, opacity: 1 }}
// // // //               exit={{ scale: 0.8, opacity: 0 }}
// // // //               className="bg-white dark:bg-gray-900 rounded-2xl p-8 text-center max-w-sm w-full"
// // // //             >
// // // //               <div className="text-6xl mb-4">✅</div>
// // // //               <h2 className="text-2xl font-bold mb-3 text-green-600 dark:text-green-400">
// // // //                 Order Placed Successfully!
// // // //               </h2>
// // // //               <p className="text-gray-600 dark:text-gray-300 mb-6">
// // // //                 {tradeSide.toUpperCase()} ${Number(tradeAmount).toLocaleString()} USDT
// // // //                 <br />
// // // //                 {selectedPair?.displaySymbol} • {orderDuration}
// // // //               </p>
// // // //               <button
// // // //                 onClick={() => setShowSuccessModal(false)}
// // // //                 className="w-full py-3 bg-orange-600 hover:bg-orange-700 text-white rounded-xl font-bold"
// // // //               >
// // // //                 Continue Trading
// // // //               </button>
// // // //             </motion.div>
// // // //           </div>
// // // //         )}
// // // //       </AnimatePresence>
// // // //     </div>
// // // //   );
// // // // }





// // // import React, { useState, useEffect } from 'react';
// // // import { motion, AnimatePresence } from 'framer-motion';
// // // import { ToastContainer, toast } from 'react-toastify';
// // // import 'react-toastify/dist/ReactToastify.css';
// // // import { tradingService } from '../../api/tradingApi';

// // // const MIN_TRADE_USDT = 50;
// // // const MAX_TRADE_USDT = 10000;

// // // const handleApiError = (error) => {
// // //   const message =
// // //     error?.response?.data?.message ||
// // //     error?.response?.data?.error ||
// // //     error?.message ||
// // //     'Failed to load data. Please try again.';
// // //   toast.error(message);
// // // };

// // // const normalizePair = (rawSymbol) => {
// // //   if (!rawSymbol || typeof rawSymbol !== 'string') return null;
// // //   let namePart, quotePart = 'USDT';

// // //   if (rawSymbol.includes('/')) {
// // //     [namePart, quotePart] = rawSymbol.split('/');
// // //   } else {
// // //     namePart = rawSymbol;
// // //   }

// // //   const upperName = namePart.trim().toUpperCase();
// // //   const nameToTicker = {
// // //     'BITCOIN': 'BTC',
// // //     'ETHEREUM': 'ETH',
// // //     'BNB': 'BNB',
// // //     'SOL': 'SOL',
// // //     'DOGE': 'DOGE',
// // //     'XRP': 'XRP',
// // //     'LTC': 'LTC',
// // //     'ADA': 'ADA',
// // //     'CAKE': 'CAKE',
// // //     'PEPE': 'PEPE',
// // //     'WFI': 'WFI',
// // //     'AVAX': 'AVAX',
// // //     'BCH': 'BCH',
// // //     'UNI': 'UNI',
// // //   };

// // //   const base = nameToTicker[upperName] || upperName;
// // //   quotePart = quotePart.trim().toUpperCase();

// // //   return {
// // //     raw: rawSymbol,
// // //     displaySymbol: `${base}/${quotePart}`,
// // //     apiSymbol: `${base}${quotePart}`,
// // //     baseAsset: base,
// // //     quoteAsset: quotePart,
// // //   };
// // // };

// // // // CoinGecko id mapping (unchanged)
// // // const tickerToCoinGeckoId = {
// // //   BTC: 'bitcoin',
// // //   ETH: 'ethereum',
// // //   BNB: 'binancecoin',
// // //   SOL: 'solana',
// // //   DOGE: 'dogecoin',
// // //   XRP: 'ripple',
// // //   LTC: 'litecoin',
// // //   ADA: 'cardano',
// // //   CAKE: 'pancakeswap-token',
// // //   PEPE: 'pepe',
// // //   AVAX: 'avalanche-2',
// // //   BCH: 'bitcoin-cash',
// // //   UNI: 'uniswap',
// // //   WFI: 'wfi',
// // // };

// // // // Slug mapping for icons (unchanged)
// // // const tickerToSlug = {
// // //   BTC: 'bitcoin',
// // //   ETH: 'ethereum',
// // //   BNB: 'binance-coin',
// // //   SOL: 'solana',
// // //   DOGE: 'dogecoin',
// // //   XRP: 'xrp',
// // //   LTC: 'litecoin',
// // //   ADA: 'cardano',
// // //   CAKE: 'pancakeswap',
// // //   PEPE: 'pepe',
// // //   AVAX: 'avalanche',
// // //   BCH: 'bitcoin-cash',
// // //   UNI: 'uniswap',
// // //   WFI: 'wfi',
// // // };

// // // const getCoinIconUrl = (baseAsset) => {
// // //   const tickerLower = baseAsset.toLowerCase();
// // //   const slug = tickerToSlug[baseAsset] || tickerLower;
// // //   return `https://cryptologos.cc/logos/${slug}-${tickerLower}-logo.svg?v=040`;
// // // };

// // // export default function TradingDashboard() {
// // //   const [pairs, setPairs] = useState([]);
// // //   const [prices, setPrices] = useState({});
// // //   const [portfolio, setPortfolio] = useState(null);
// // //   const [loading, setLoading] = useState(true);
// // //   const [error, setError] = useState(null);
// // //   const [selectedPair, setSelectedPair] = useState(null);
// // //   const [showTradeModal, setShowTradeModal] = useState(false);
// // //   const [tradeSide, setTradeSide] = useState('buy');
// // //   const [tradeAmount, setTradeAmount] = useState('');
// // //   const [orderDuration, setOrderDuration] = useState('GTC');
// // //   const [showSuccessModal, setShowSuccessModal] = useState(false);
// // //   const [tradeLoading, setTradeLoading] = useState(false);

// // //   // Load pairs & portfolio
// // //   useEffect(() => {
// // //     const loadData = async () => {
// // //       setLoading(true);
// // //       setError(null);
// // //       try {
// // //         const [pairsResponse, portfolioResponse] = await Promise.all([
// // //           tradingService.getPairs(),
// // //           tradingService.getPortfolio(),
// // //         ]);

// // //         let receivedPairs = [];
// // //         if (pairsResponse?.data?.success && Array.isArray(pairsResponse.data.data)) {
// // //           receivedPairs = pairsResponse.data.data;
// // //         } else if (Array.isArray(pairsResponse?.data)) {
// // //           receivedPairs = pairsResponse.data;
// // //         }

// // //         const normalized = receivedPairs
// // //           .map(normalizePair)
// // //           .filter(Boolean)
// // //           .sort((a, b) => a.baseAsset.localeCompare(b.baseAsset));

// // //         setPairs(normalized);
// // //         setPortfolio(portfolioResponse?.data ?? null);

// // //         if (normalized.length === 0) {
// // //           toast.info('No trading pairs available at this time.');
// // //         }
// // //       } catch (err) {
// // //         handleApiError(err);
// // //         setError('Could not load trading pairs. Please check your connection.');
// // //       } finally {
// // //         setLoading(false);
// // //       }
// // //     };

// // //     loadData();
// // //   }, []);

// // //   // Fetch live prices – now with polling
// // //   useEffect(() => {
// // //     if (pairs.length === 0) return;

// // //     const updatePrices = async () => {
// // //       try {
// // //         const coinIds = pairs
// // //           .map((p) => tickerToCoinGeckoId[p.baseAsset])
// // //           .filter(Boolean);

// // //         if (coinIds.length === 0) return;

// // //         const idsString = [...new Set(coinIds)].join(',');
// // //         const url = `https://api.coingecko.com/api/v3/simple/price?ids=${idsString}&vs_currencies=usd&include_24hr_change=true`;

// // //         const res = await fetch(url);
// // //         if (!res.ok) throw new Error(`CoinGecko HTTP ${res.status}`);

// // //         const data = await res.json();

// // //         const newPrices = {};
// // //         pairs.forEach((pair) => {
// // //           const id = tickerToCoinGeckoId[pair.baseAsset];
// // //           if (id && data[id]) {
// // //             newPrices[pair.baseAsset] = {
// // //               price: data[id].usd,
// // //               change24h: data[id].usd_24h_change,
// // //             };
// // //           }
// // //         });

// // //         setPrices(newPrices);
// // //       } catch (err) {
// // //         console.error('CoinGecko price fetch failed:', err);
// // //       }
// // //     };

// // //     updatePrices();
// // //     const interval = setInterval(updatePrices, 45000); // every 45 seconds
// // //     return () => clearInterval(interval);
// // //   }, [pairs]);

// // //   const refreshPortfolio = async () => {
// // //     try {
// // //       const res = await tradingService.getPortfolio();
// // //       setPortfolio(res?.data ?? null);
// // //     } catch (err) {
// // //       console.warn('Portfolio refresh failed:', err);
// // //     }
// // //   };

// // //   const openTradeModal = (pairObj) => {
// // //     setSelectedPair(pairObj);
// // //     setTradeSide('buy');
// // //     setTradeAmount('');
// // //     setOrderDuration('GTC');
// // //     setShowTradeModal(true);
// // //   };

// // //   const getAvailableUsdt = () => Number(portfolio?.holdings?.USDT || 0);
// // //   const getAvailableCrypto = (base) => Number(portfolio?.holdings?.[base] || 0);

// // //   const hasEnoughForBuy = () => {
// // //     const amount = Number(tradeAmount) || 0;
// // //     return getAvailableUsdt() >= amount;
// // //   };

// // //   const hasEnoughForSell = () => {
// // //     if (!selectedPair) return false;
// // //     const amount = Number(tradeAmount) || 0;
// // //     const price = prices[selectedPair.baseAsset]?.price || 0;
// // //     const heldValue = getAvailableCrypto(selectedPair.baseAsset) * price;
// // //     return heldValue >= amount && heldValue > 0;
// // //   };

// // //   const getEstimatedQuantity = () => {
// // //     const price = prices[selectedPair?.baseAsset]?.price || 0;
// // //     if (!price || price <= 0 || !tradeAmount) return 0;
// // //     return Number(tradeAmount) / price;
// // //   };

// // //   const estimatedQty = getEstimatedQuantity().toFixed(6);

// // //   const isAmountValid =
// // //     tradeAmount !== '' &&
// // //     !isNaN(Number(tradeAmount)) &&
// // //     Number(tradeAmount) >= MIN_TRADE_USDT &&
// // //     Number(tradeAmount) <= MAX_TRADE_USDT;

// // //   const canExecute = isAmountValid &&
// // //     !tradeLoading &&
// // //     (tradeSide === 'buy' ? hasEnoughForBuy() : hasEnoughForSell());

// // //   const handleQuickAmount = (percent) => {
// // //     if (tradeSide === 'buy') {
// // //       const maxUsdt = Math.min(getAvailableUsdt(), MAX_TRADE_USDT);
// // //       setTradeAmount((maxUsdt * percent / 100).toFixed(2));
// // //     } else {
// // //       const price = prices[selectedPair?.baseAsset]?.price || 0;
// // //       if (price <= 0) return;
// // //       const maxValue = getAvailableCrypto(selectedPair.baseAsset) * price;
// // //       setTradeAmount(Math.min(maxValue * percent / 100, MAX_TRADE_USDT).toFixed(2));
// // //     }
// // //   };

// // //   const handleExecuteTrade = async () => {
// // //     const amount = Number(tradeAmount);
// // //     if (!canExecute) return;

// // //     setTradeLoading(true);
// // //     try {
// // //       const payload = {
// // //         side: tradeSide.toUpperCase(),
// // //         symbol: selectedPair.apiSymbol,
// // //         amount: amount,
// // //         timeInForce: orderDuration,
// // //       };

// // //       await tradingService.executeTrade(payload);

// // //       toast.success(
// // //         `${tradeSide.toUpperCase()} order placed: $${amount.toLocaleString()} USDT • ${selectedPair.displaySymbol} • ${orderDuration}`
// // //       );

// // //       // Auto refresh portfolio after trade
// // //       await refreshPortfolio();

// // //       setShowTradeModal(false);
// // //       setShowSuccessModal(true);
// // //       setTradeAmount('');
// // //     } catch (err) {
// // //       handleApiError(err);
// // //     } finally {
// // //       setTradeLoading(false);
// // //     }
// // //   };

// // //   return (
// // //     <div className="min-h-screen bg-gray-50 dark:bg-gray-950 pb-16">
// // //       <ToastContainer position="top-center" autoClose={3500} theme="colored" limit={2} />

// // //       <header className="sticky top-0 z-10 bg-white/95 dark:bg-gray-900/95 backdrop-blur-sm border-b border-gray-200 dark:border-gray-800 px-4 py-5">
// // //         <div className="max-w-7xl mx-auto flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
// // //           <div>
// // //             <h1 className="text-2xl md:text-3xl font-bold text-orange-600 dark:text-orange-400">
// // //               Crypto Trading
// // //             </h1>
// // //             {portfolio && (
// // //               <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
// // //                 Invested: <strong className="text-green-600">${Number(portfolio.totalInvested || 0).toLocaleString()}</strong>
// // //                 {' • '} PnL: <strong className={Number(portfolio.totalRealizedPnL || 0) >= 0 ? 'text-green-600' : 'text-red-600'}>
// // //                   ${Number(portfolio.totalRealizedPnL || 0).toLocaleString()}
// // //                 </strong>
// // //               </p>
// // //             )}
// // //           </div>
// // //           <button
// // //             onClick={() => window.location.reload()}
// // //             disabled={loading || tradeLoading}
// // //             className="px-5 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium disabled:opacity-60 transition"
// // //           >
// // //             {loading || tradeLoading ? 'Loading...' : 'Refresh'}
// // //           </button>
// // //         </div>
// // //       </header>

// // //       <main className="max-w-7xl mx-auto px-4 py-8">
// // //         {loading ? (
// // //           <div className="flex flex-col items-center justify-center py-20">
// // //             <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-orange-500"></div>
// // //             <p className="mt-4 text-gray-600 dark:text-gray-400">Loading available pairs...</p>
// // //           </div>
// // //         ) : error ? (
// // //           <div className="text-center py-16 text-red-600 dark:text-red-400">{error}</div>
// // //         ) : pairs.length === 0 ? (
// // //           <div className="text-center py-16 text-gray-500 dark:text-gray-400">
// // //             No trading pairs available right now.
// // //           </div>
// // //         ) : (
// // //           <div className="grid grid-cols-1 sm:grid-cols-1 lg:grid-cols-1 xl:grid-cols-1 gap-5">
// // //             {pairs.map((pair) => {
// // //               const live = prices[pair.baseAsset];
// // //               const priceValue = live?.price;
// // //               const changeValue = live?.change24h;

// // //               const priceDisplay = typeof priceValue === 'number'
// // //                 ? `$${priceValue.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 8 })}`
// // //                 : '—';

// // //               const isPositive = typeof changeValue === 'number' && changeValue >= 0;
// // //               const changeDisplay = typeof changeValue === 'number'
// // //                 ? `${isPositive ? '+' : ''}${changeValue.toFixed(2)}%`
// // //                 : '—';

// // //               return (
// // //                 <motion.div
// // //                   key={pair.apiSymbol}
// // //                   whileHover={{ scale: 1.02, y: -2 }}
// // //                   className="bg-white dark:bg-gray-800 rounded-xl shadow border border-gray-200 dark:border-gray-700 hover:border-orange-500/40 transition-all duration-200 overflow-hidden"
// // //                 >
// // //                   <div className="p-5 flex items-center justify-between gap-4">
// // //                     <div className="flex items-center gap-3 min-w-0">
// // //                       <img
// // //                         src={getCoinIconUrl(pair.baseAsset)}
// // //                         alt={`${pair.baseAsset} logo`}
// // //                         className="w-10 h-10 rounded-full flex-shrink-0 object-contain bg-gray-100 dark:bg-gray-700 p-1 border border-gray-200 dark:border-gray-600"
// // //                         loading="lazy"
// // //                         onError={(e) => {
// // //                           e.target.src = 'https://cryptologos.cc/logos/question-mark-question-mark-logo.svg?v=040';
// // //                           e.target.onerror = null;
// // //                         }}
// // //                       />
// // //                       <div className="flex flex-col">
// // //                         <h3 className="text-xl font-bold tracking-tight">
// // //                           {pair.baseAsset}
// // //                         </h3>
// // //                         <span className="text-sm font-medium text-gray-500 dark:text-gray-400">
// // //                           /{pair.quoteAsset}
// // //                         </span>
// // //                       </div>
// // //                     </div>

// // //                     <div className="text-right flex-1">
// // //                       <div className="text-lg font-semibold">
// // //                         {priceDisplay}
// // //                       </div>
// // //                       <div className={`text-sm font-medium ${isPositive ? 'text-green-500' : 'text-red-500'}`}>
// // //                         {changeDisplay}
// // //                       </div>
// // //                     </div>

// // //                     <button
// // //                       onClick={() => openTradeModal(pair)}
// // //                       className="px-5 py-2.5 bg-orange-600 hover:bg-orange-700 text-white text-sm font-medium rounded-lg transition whitespace-nowrap"
// // //                     >
// // //                       Trade
// // //                     </button>
// // //                   </div>
// // //                 </motion.div>
// // //               );
// // //             })}
// // //           </div>
// // //         )}
// // //       </main>

// // //       {/* Trade Modal – original structure kept, flow improved */}
// // //       <AnimatePresence>
// // //         {showTradeModal && selectedPair && (
// // //           <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4">
// // //             <motion.div
// // //               initial={{ scale: 0.9, opacity: 0 }}
// // //               animate={{ scale: 1, opacity: 1 }}
// // //               exit={{ scale: 0.9, opacity: 0 }}
// // //               className="bg-white dark:bg-gray-900 rounded-2xl p-6 w-full max-w-md border border-gray-200 dark:border-gray-700 shadow-2xl"
// // //             >
// // //               <div className="flex justify-between items-center mb-5">
// // //                 <h2 className="text-2xl font-bold text-orange-600 dark:text-orange-400">
// // //                   {tradeSide.toUpperCase()} {selectedPair.displaySymbol}
// // //                 </h2>
// // //                 <button
// // //                   onClick={() => setShowTradeModal(false)}
// // //                   className="text-4xl text-gray-500 hover:text-gray-700 dark:hover:text-gray-300"
// // //                 >
// // //                   ×
// // //                 </button>
// // //               </div>

// // //               <div className="mb-6 p-4 bg-gray-50 dark:bg-gray-800 rounded-xl text-center">
// // //                 <p className="text-sm text-gray-500 dark:text-gray-400">Current Market Price</p>
// // //                 <p className="text-3xl font-bold text-orange-600 dark:text-orange-400">
// // //                   {(() => {
// // //                     const p = prices[selectedPair.baseAsset]?.price;
// // //                     return typeof p === 'number'
// // //                       ? `$${p.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 8 })}`
// // //                       : '—';
// // //                   })()}
// // //                 </p>
// // //                 <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
// // //                   24h change:{' '}
// // //                   {(() => {
// // //                     const c = prices[selectedPair.baseAsset]?.change24h;
// // //                     const pos = typeof c === 'number' && c >= 0;
// // //                     return typeof c === 'number' ? `${pos ? '+' : ''}${c.toFixed(2)}%` : '—';
// // //                   })()}
// // //                 </p>
// // //               </div>

// // //               <div className="grid grid-cols-2 gap-3 mb-6">
// // //                 <button
// // //                   onClick={() => setTradeSide('buy')}
// // //                   className={`py-3 rounded-xl font-semibold ${tradeSide === 'buy' ? 'bg-green-600 text-white' : 'bg-gray-200 dark:bg-gray-700'}`}
// // //                 >
// // //                   BUY
// // //                 </button>
// // //                 <button
// // //                   onClick={() => setTradeSide('sell')}
// // //                   disabled={getAvailableCrypto(selectedPair.baseAsset) <= 0}
// // //                   className={`py-3 rounded-xl font-semibold ${tradeSide === 'sell' ? 'bg-red-600 text-white' : 'bg-gray-200 dark:bg-gray-700'} ${getAvailableCrypto(selectedPair.baseAsset) <= 0 ? 'opacity-50 cursor-not-allowed' : ''}`}
// // //                 >
// // //                   SELL
// // //                 </button>
// // //               </div>

// // //               {/* Show available balance – fits original layout */}
// // //               <div className="mb-4 text-sm text-gray-600 dark:text-gray-300">
// // //                 Available:{' '}
// // //                 <strong>
// // //                   {tradeSide === 'buy'
// // //                     ? `$${getAvailableUsdt().toLocaleString(undefined, { minimumFractionDigits: 2 })} USDT`
// // //                     : `${getAvailableCrypto(selectedPair.baseAsset).toFixed(6)} ${selectedPair.baseAsset}`}
// // //                 </strong>
// // //               </div>

// // //               <div className="mb-6">
// // //                 <label className="block text-sm text-gray-500 dark:text-gray-400 mb-2">
// // //                   Amount (USDT)
// // //                 </label>
// // //                 <input
// // //                   type="number"
// // //                   value={tradeAmount}
// // //                   onChange={(e) => setTradeAmount(e.target.value)}
// // //                   placeholder="0.00"
// // //                   step="any"
// // //                   className="w-full p-4 text-2xl bg-gray-50 dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500"
// // //                 />

// // //                 {/* Quick amount buttons – added inside original spacing */}
// // //                 <div className="mt-3 grid grid-cols-4 gap-2">
// // //                   {[ 50, 100].map(pct => (
// // //                     <button
// // //                       key={pct}
// // //                       type="button"
// // //                       onClick={() => handleQuickAmount(pct)}
// // //                       className="py-1.5 text-xs bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 rounded transition"
// // //                     >
// // //                       {pct}%
// // //                     </button>
// // //                   ))}
// // //                 </div>

// // //                 <div className="mt-2 flex justify-between text-sm text-gray-600 dark:text-gray-400">
// // //                   <div className='flex flex-col'>
// // //                     <span>Min: <strong>${MIN_TRADE_USDT}</strong></span>
// // //                   </div>
// // //                   <span>Max: <strong>${MAX_TRADE_USDT.toLocaleString()}</strong></span>
// // //                 </div>

// // //                 {tradeAmount && Number(tradeAmount) > 0 && (
// // //                   <p className="mt-2 text-sm">
// // //                     ≈ <strong>{estimatedQty}</strong> {selectedPair.baseAsset}
// // //                     {Number(tradeAmount) < MIN_TRADE_USDT && (
// // //                       <span className="text-red-500 ml-2">below min</span>
// // //                     )}
// // //                     {Number(tradeAmount) > MAX_TRADE_USDT && (
// // //                       <span className="text-red-500 ml-2">exceeds max</span>
// // //                     )}
// // //                   </p>
// // //                 )}

// // //                 {/* Inline error feedback */}
// // //                 {!isAmountValid && tradeAmount && (
// // //                   <p className="mt-2 text-sm text-red-500">
// // //                     {Number(tradeAmount) < MIN_TRADE_USDT ? 'Amount too low' : 'Amount too high'}
// // //                   </p>
// // //                 )}
// // //                 {tradeSide === 'buy' && !hasEnoughForBuy() && tradeAmount && (
// // //                   <p className="mt-1 text-sm text-red-500">Insufficient USDT balance</p>
// // //                 )}
// // //                 {tradeSide === 'sell' && !hasEnoughForSell() && tradeAmount && (
// // //                   <p className="mt-1 text-sm text-red-500">Insufficient holdings</p>
// // //                 )}
// // //               </div>

// // //               <div className="mb-6">
// // //                 <label className="block text-sm text-gray-500 dark:text-gray-400 mb-2">
// // //                   Order Duration:48hrs
// // //                 </label>
// // //                 <span className="text-sm text-gray-600 dark:text-gray-300">Good 'Til Canceled (GTC)</span>
// // //               </div>

// // //               <div className="flex gap-3">
// // //                 <button
// // //                   onClick={() => setShowTradeModal(false)}
// // //                   className="flex-1 py-3 bg-gray-200 dark:bg-gray-700 rounded-xl font-medium hover:bg-gray-300 dark:hover:bg-gray-600"
// // //                   disabled={tradeLoading}
// // //                 >
// // //                   Cancel
// // //                 </button>
// // //                 <button
// // //                   onClick={handleExecuteTrade}
// // //                   disabled={!canExecute}
// // //                   className={`flex-1 py-3 rounded-xl font-bold text-white transition ${tradeLoading ? 'bg-orange-400 cursor-wait' : 'bg-orange-600 hover:bg-orange-700'} disabled:opacity-50 disabled:cursor-not-allowed`}
// // //                 >
// // //                   {tradeLoading ? 'Processing...' : 'Confirm Order'}
// // //                 </button>
// // //               </div>
// // //             </motion.div>
// // //           </div>
// // //         )}
// // //       </AnimatePresence>

// // //       {/* Success Modal – original kept */}
// // //       <AnimatePresence>
// // //         {showSuccessModal && (
// // //           <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4">
// // //             <motion.div
// // //               initial={{ scale: 0.8, opacity: 0 }}
// // //               animate={{ scale: 1, opacity: 1 }}
// // //               exit={{ scale: 0.8, opacity: 0 }}
// // //               className="bg-white dark:bg-gray-900 rounded-2xl p-8 text-center max-w-sm w-full"
// // //             >
// // //               <div className="text-6xl mb-4">✅</div>
// // //               <h2 className="text-2xl font-bold mb-3 text-green-600 dark:text-green-400">
// // //                 Order Placed Successfully!
// // //               </h2>
// // //               <p className="text-gray-600 dark:text-gray-300 mb-6">
// // //                 {tradeSide.toUpperCase()} ${Number(tradeAmount).toLocaleString()} USDT
// // //                 <br />
// // //                 {selectedPair?.displaySymbol} • {orderDuration}
// // //               </p>
// // //               <button
// // //                 onClick={() => setShowSuccessModal(false)}
// // //                 className="w-full py-3 bg-orange-600 hover:bg-orange-700 text-white rounded-xl font-bold"
// // //               >
// // //                 Continue Trading
// // //               </button>
// // //             </motion.div>
// // //           </div>
// // //         )}
// // //       </AnimatePresence>
// // //     </div>
// // //   );
// // // }





// // import React, { useState, useEffect } from 'react';
// // import { motion, AnimatePresence } from 'framer-motion';
// // import { ToastContainer, toast } from 'react-toastify';
// // import 'react-toastify/dist/ReactToastify.css';
// // import { tradingService } from '../../api/tradingApi';

// // const MIN_TRADE_USDT = 50;
// // const MAX_TRADE_USDT = 10000;

// // const handleApiError = (error) => {
// //   const message =
// //     error?.response?.data?.message ||
// //     error?.response?.data?.error ||
// //     error?.message ||
// //     'Failed to load data. Please try again.';
// //   toast.error(message);
// // };

// // const normalizePair = (rawSymbol) => {
// //   if (!rawSymbol || typeof rawSymbol !== 'string') return null;
// //   let namePart, quotePart = 'USDT';

// //   if (rawSymbol.includes('/')) {
// //     [namePart, quotePart] = rawSymbol.split('/');
// //   } else {
// //     namePart = rawSymbol;
// //   }

// //   const upperName = namePart.trim().toUpperCase();
// //   const nameToTicker = {
// //     'BITCOIN': 'BTC',
// //     'ETHEREUM': 'ETH',
// //     'BNB': 'BNB',
// //     'SOL': 'SOL',
// //     'DOGE': 'DOGE',
// //     'XRP': 'XRP',
// //     'LTC': 'LTC',
// //     'ADA': 'ADA',
// //     'CAKE': 'CAKE',
// //     'PEPE': 'PEPE',
// //     'WFI': 'WFI',
// //     'AVAX': 'AVAX',
// //     'BCH': 'BCH',
// //     'UNI': 'UNI',
// //   };

// //   const base = nameToTicker[upperName] || upperName;
// //   quotePart = quotePart.trim().toUpperCase();

// //   return {
// //     raw: rawSymbol,
// //     displaySymbol: `${base}/${quotePart}`,
// //     apiSymbol: `${base}${quotePart}`,
// //     baseAsset: base,
// //     quoteAsset: quotePart,
// //   };
// // };

// // // CoinGecko id mapping (unchanged)
// // const tickerToCoinGeckoId = {
// //   BTC: 'bitcoin',
// //   ETH: 'ethereum',
// //   BNB: 'binancecoin',
// //   SOL: 'solana',
// //   DOGE: 'dogecoin',
// //   XRP: 'ripple',
// //   LTC: 'litecoin',
// //   ADA: 'cardano',
// //   CAKE: 'pancakeswap-token',
// //   PEPE: 'pepe',
// //   AVAX: 'avalanche-2',
// //   BCH: 'bitcoin-cash',
// //   UNI: 'uniswap',
// //   WFI: 'wfi',
// // };

// // // Slug mapping for icons (unchanged)
// // const tickerToSlug = {
// //   BTC: 'bitcoin',
// //   ETH: 'ethereum',
// //   BNB: 'binance-coin',
// //   SOL: 'solana',
// //   DOGE: 'dogecoin',
// //   XRP: 'xrp',
// //   LTC: 'litecoin',
// //   ADA: 'cardano',
// //   CAKE: 'pancakeswap',
// //   PEPE: 'pepe',
// //   AVAX: 'avalanche',
// //   BCH: 'bitcoin-cash',
// //   UNI: 'uniswap',
// //   WFI: 'wfi',
// // };

// // const getCoinIconUrl = (baseAsset) => {
// //   const tickerLower = baseAsset.toLowerCase();
// //   const slug = tickerToSlug[baseAsset] || tickerLower;
// //   return `https://cryptologos.cc/logos/${slug}-${tickerLower}-logo.svg?v=040`;
// // };

// // export default function TradingDashboard() {
// //   const [pairs, setPairs] = useState([]);
// //   const [prices, setPrices] = useState({});
// //   const [portfolio, setPortfolio] = useState(null);
// //   const [trades, setTrades] = useState([]);
// //   const [orders, setOrders] = useState([]);
// //   const [loading, setLoading] = useState(true);
// //   const [error, setError] = useState(null);
// //   const [selectedPair, setSelectedPair] = useState(null);
// //   const [showTradeModal, setShowTradeModal] = useState(false);
// //   const [tradeSide, setTradeSide] = useState('buy');
// //   const [tradeAmount, setTradeAmount] = useState('');
// //   const [orderDuration, setOrderDuration] = useState('GTC');
// //   const [showSuccessModal, setShowSuccessModal] = useState(false);
// //   const [tradeLoading, setTradeLoading] = useState(false);

// //   // Load pairs, portfolio, trades, and orders
// //   useEffect(() => {
// //     const loadData = async () => {
// //       setLoading(true);
// //       setError(null);
// //       try {
// //         const [pairsResponse, portfolioResponse, tradesResponse, ordersResponse] = await Promise.all([
// //           tradingService.getPairs(),
// //           tradingService.getPortfolio(),
// //           tradingService.getTrades(),
// //           tradingService.getOrders(),
// //         ]);

// //         let receivedPairs = [];
// //         if (pairsResponse?.data?.success && Array.isArray(pairsResponse.data.data)) {
// //           receivedPairs = pairsResponse.data.data;
// //         } else if (Array.isArray(pairsResponse?.data)) {
// //           receivedPairs = pairsResponse.data;
// //         }

// //         const normalized = receivedPairs
// //           .map(normalizePair)
// //           .filter(Boolean)
// //           .sort((a, b) => a.baseAsset.localeCompare(b.baseAsset));

// //         setPairs(normalized);
// //         setPortfolio(portfolioResponse?.data ?? null);
// //         setTrades(tradesResponse?.data?.data || tradesResponse?.data || []);
// //         setOrders(ordersResponse?.data?.data || ordersResponse?.data || []);

// //         if (normalized.length === 0) {
// //           toast.info('No trading pairs available at this time.');
// //         }
// //       } catch (err) {
// //         handleApiError(err);
// //         setError('Could not load trading pairs. Please check your connection.');
// //       } finally {
// //         setLoading(false);
// //       }
// //     };

// //     loadData();
// //   }, []);

// //   // Fetch live prices – now with polling
// //   useEffect(() => {
// //     if (pairs.length === 0) return;

// //     const updatePrices = async () => {
// //       try {
// //         const coinIds = pairs
// //           .map((p) => tickerToCoinGeckoId[p.baseAsset])
// //           .filter(Boolean);

// //         if (coinIds.length === 0) return;

// //         const idsString = [...new Set(coinIds)].join(',');
// //         const url = `https://api.coingecko.com/api/v3/simple/price?ids=${idsString}&vs_currencies=usd&include_24hr_change=true`;

// //         const res = await fetch(url);
// //         if (!res.ok) throw new Error(`CoinGecko HTTP ${res.status}`);

// //         const data = await res.json();

// //         const newPrices = {};
// //         pairs.forEach((pair) => {
// //           const id = tickerToCoinGeckoId[pair.baseAsset];
// //           if (id && data[id]) {
// //             newPrices[pair.baseAsset] = {
// //               price: data[id].usd,
// //               change24h: data[id].usd_24h_change,
// //             };
// //           }
// //         });

// //         setPrices(newPrices);
// //       } catch (err) {
// //         console.error('CoinGecko price fetch failed:', err);
// //       }
// //     };

// //     updatePrices();
// //     const interval = setInterval(updatePrices, 45000); // every 45 seconds
// //     return () => clearInterval(interval);
// //   }, [pairs]);

// //   const refreshPortfolioAndHistory = async () => {
// //     try {
// //       const [portfolioRes, tradesRes, ordersRes] = await Promise.all([
// //         tradingService.getPortfolio(),
// //         tradingService.getTrades(),
// //         tradingService.getOrders(),
// //       ]);
// //       setPortfolio(portfolioRes?.data ?? null);
// //       setTrades(tradesRes?.data?.data || tradesRes?.data || []);
// //       setOrders(ordersRes?.data?.data || ordersRes?.data || []);
// //     } catch (err) {
// //       console.warn('Refresh failed:', err);
// //     }
// //   };

// //   const openTradeModal = (pairObj) => {
// //     setSelectedPair(pairObj);
// //     setTradeSide('buy');
// //     setTradeAmount('');
// //     setOrderDuration('GTC');
// //     setShowTradeModal(true);
// //   };

// //   const getAvailableUsdt = () => Number(portfolio?.holdings?.USDT || 0);
// //   const getAvailableCrypto = (base) => Number(portfolio?.holdings?.[base] || 0);

// //   const hasEnoughForBuy = () => {
// //     const amount = Number(tradeAmount) || 0;
// //     return getAvailableUsdt() >= amount;
// //   };

// //   const hasEnoughForSell = () => {
// //     if (!selectedPair) return false;
// //     const amount = Number(tradeAmount) || 0;
// //     const price = prices[selectedPair.baseAsset]?.price || 0;
// //     const heldValue = getAvailableCrypto(selectedPair.baseAsset) * price;
// //     return heldValue >= amount && heldValue > 0;
// //   };

// //   const getEstimatedQuantity = () => {
// //     const price = prices[selectedPair?.baseAsset]?.price || 0;
// //     if (!price || price <= 0 || !tradeAmount) return 0;
// //     return Number(tradeAmount) / price;
// //   };

// //   const estimatedQty = getEstimatedQuantity().toFixed(6);

// //   const isAmountValid =
// //     tradeAmount !== '' &&
// //     !isNaN(Number(tradeAmount)) &&
// //     Number(tradeAmount) >= MIN_TRADE_USDT &&
// //     Number(tradeAmount) <= MAX_TRADE_USDT;

// //   const canExecute = isAmountValid &&
// //     !tradeLoading &&
// //     (tradeSide === 'buy' ? hasEnoughForBuy() : hasEnoughForSell());

// //   const handleQuickAmount = (percent) => {
// //     if (tradeSide === 'buy') {
// //       const maxUsdt = Math.min(getAvailableUsdt(), MAX_TRADE_USDT);
// //       setTradeAmount((maxUsdt * percent / 100).toFixed(2));
// //     } else {
// //       const price = prices[selectedPair?.baseAsset]?.price || 0;
// //       if (price <= 0) return;
// //       const maxValue = getAvailableCrypto(selectedPair.baseAsset) * price;
// //       setTradeAmount(Math.min(maxValue * percent / 100, MAX_TRADE_USDT).toFixed(2));
// //     }
// //   };

// //   const handleExecuteTrade = async () => {
// //     const amount = Number(tradeAmount);
// //     if (!canExecute) return;

// //     setTradeLoading(true);
// //     try {
// //       const payload = {
// //         side: tradeSide.toUpperCase(),
// //         symbol: selectedPair.apiSymbol,
// //         amount: amount,
// //         timeInForce: orderDuration,
// //       };

// //       await tradingService.executeTrade(payload);

// //       toast.success(
// //         `${tradeSide.toUpperCase()} order placed: $${amount.toLocaleString()} USDT • ${selectedPair.displaySymbol} • ${orderDuration}`
// //       );

// //       // Auto refresh portfolio, trades, and orders after trade
// //       await refreshPortfolioAndHistory();

// //       setShowTradeModal(false);
// //       setShowSuccessModal(true);
// //       setTradeAmount('');
// //     } catch (err) {
// //       handleApiError(err);
// //     } finally {
// //       setTradeLoading(false);
// //     }
// //   };

// //   const handleCancelOrder = async (orderId) => {
// //     if (window.confirm('Are you sure you want to cancel this order?')) {
// //       try {
// //         await tradingService.cancelOrder(orderId);
// //         toast.success('Order cancelled successfully');
// //         await refreshPortfolioAndHistory();
// //       } catch (err) {
// //         handleApiError(err);
// //       }
// //     }
// //   };

// //   return (
// //     <div className="min-h-screen bg-gray-50 dark:bg-gray-950 pb-16">
// //       <ToastContainer position="top-center" autoClose={3500} theme="colored" limit={2} />

// //       <header className="sticky top-0 z-10 bg-white/95 dark:bg-gray-900/95 backdrop-blur-sm border-b border-gray-200 dark:border-gray-800 px-4 py-5">
// //         <div className="max-w-7xl mx-auto flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
// //           <div>
// //             <h1 className="text-2xl md:text-3xl font-bold text-orange-600 dark:text-orange-400">
// //               Crypto Trading
// //             </h1>
// //             {portfolio && (
// //               <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
// //                 Invested: <strong className="text-green-600">${Number(portfolio.totalInvested || 0).toLocaleString()}</strong>
// //                 {' • '} PnL: <strong className={Number(portfolio.totalRealizedPnL || 0) >= 0 ? 'text-green-600' : 'text-red-600'}>
// //                   ${Number(portfolio.totalRealizedPnL || 0).toLocaleString()}
// //                 </strong>
// //               </p>
// //             )}
// //           </div>
// //           <button
// //             onClick={() => window.location.reload()}
// //             disabled={loading || tradeLoading}
// //             className="px-5 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium disabled:opacity-60 transition"
// //           >
// //             {loading || tradeLoading ? 'Loading...' : 'Refresh'}
// //           </button>
// //         </div>
// //       </header>

// //       <main className="max-w-7xl mx-auto px-4 py-8">
// //         {loading ? (
// //           <div className="flex flex-col items-center justify-center py-20">
// //             <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-orange-500"></div>
// //             <p className="mt-4 text-gray-600 dark:text-gray-400">Loading available pairs...</p>
// //           </div>
// //         ) : error ? (
// //           <div className="text-center py-16 text-red-600 dark:text-red-400">{error}</div>
// //         ) : pairs.length === 0 ? (
// //           <div className="text-center py-16 text-gray-500 dark:text-gray-400">
// //             No trading pairs available right now.
// //           </div>
// //         ) : (
// //           <>
// //             <div className="grid grid-cols-1 sm:grid-cols-1 lg:grid-cols-1 xl:grid-cols-1 gap-5">
// //               {pairs.map((pair) => {
// //                 const live = prices[pair.baseAsset];
// //                 const priceValue = live?.price;
// //                 const changeValue = live?.change24h;

// //                 const priceDisplay = typeof priceValue === 'number'
// //                   ? `$${priceValue.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 8 })}`
// //                   : '—';

// //                 const isPositive = typeof changeValue === 'number' && changeValue >= 0;
// //                 const changeDisplay = typeof changeValue === 'number'
// //                   ? `${isPositive ? '+' : ''}${changeValue.toFixed(2)}%`
// //                   : '—';

// //                 return (
// //                   <motion.div
// //                     key={pair.apiSymbol}
// //                     whileHover={{ scale: 1.02, y: -2 }}
// //                     className="bg-white dark:bg-gray-800 rounded-xl shadow border border-gray-200 dark:border-gray-700 hover:border-orange-500/40 transition-all duration-200 overflow-hidden"
// //                   >
// //                     <div className="p-5 flex items-center justify-between gap-4">
// //                       <div className="flex items-center gap-3 min-w-0">
// //                         <img
// //                           src={getCoinIconUrl(pair.baseAsset)}
// //                           alt={`${pair.baseAsset} logo`}
// //                           className="w-10 h-10 rounded-full flex-shrink-0 object-contain bg-gray-100 dark:bg-gray-700 p-1 border border-gray-200 dark:border-gray-600"
// //                           loading="lazy"
// //                           onError={(e) => {
// //                             e.target.src = 'https://cryptologos.cc/logos/question-mark-question-mark-logo.svg?v=040';
// //                             e.target.onerror = null;
// //                           }}
// //                         />
// //                         <div className="flex flex-col">
// //                           <h3 className="text-xl font-bold tracking-tight">
// //                             {pair.baseAsset}
// //                           </h3>
// //                           <span className="text-sm font-medium text-gray-500 dark:text-gray-400">
// //                             /{pair.quoteAsset}
// //                           </span>
// //                         </div>
// //                       </div>

// //                       <div className="text-right flex-1">
// //                         <div className="text-lg font-semibold">
// //                           {priceDisplay}
// //                         </div>
// //                         <div className={`text-sm font-medium ${isPositive ? 'text-green-500' : 'text-red-500'}`}>
// //                           {changeDisplay}
// //                         </div>
// //                       </div>

// //                       <button
// //                         onClick={() => openTradeModal(pair)}
// //                         className="px-5 py-2.5 bg-orange-600 hover:bg-orange-700 text-white text-sm font-medium rounded-lg transition whitespace-nowrap"
// //                       >
// //                         Trade
// //                       </button>
// //                     </div>
// //                   </motion.div>
// //                 );
// //               })}
// //             </div>

// //             {/* New Section: My Orders (including cancelled) */}
// //             <section className="mt-12">
// //               <h2 className="text-2xl font-bold text-orange-600 dark:text-orange-400 mb-4">
// //                 My Orders
// //               </h2>
// //               {orders.length === 0 ? (
// //                 <p className="text-gray-500 dark:text-gray-400">No orders found.</p>
// //               ) : (
// //                 <div className="overflow-x-auto">
// //                   <table className="w-full text-left border-collapse">
// //                     <thead>
// //                       <tr className="bg-gray-100 dark:bg-gray-800">
// //                         <th className="p-3 border-b dark:border-gray-700">Symbol</th>
// //                         <th className="p-3 border-b dark:border-gray-700">Side</th>
// //                         <th className="p-3 border-b dark:border-gray-700">Amount (USDT)</th>
// //                         <th className="p-3 border-b dark:border-gray-700">Status</th>
// //                         <th className="p-3 border-b dark:border-gray-700">Date</th>
// //                         <th className="p-3 border-b dark:border-gray-700">Actions</th>
// //                       </tr>
// //                     </thead>
// //                     <tbody>
// //                       {orders.map((order) => (
// //                         <tr key={order.id || order.orderId} className="hover:bg-gray-50 dark:hover:bg-gray-700">
// //                           <td className="p-3 border-b dark:border-gray-700">{order.symbol}</td>
// //                           <td className="p-3 border-b dark:border-gray-700">{order.side}</td>
// //                           <td className="p-3 border-b dark:border-gray-700">${Number(order.amount).toLocaleString()}</td>
// //                           <td className="p-3 border-b dark:border-gray-700">
// //                             <span className={`font-medium ${
// //                               order.status === 'filled' ? 'text-green-600' :
// //                               order.status === 'cancelled' ? 'text-red-600' :
// //                               'text-blue-600'
// //                             }`}>
// //                               {order.status?.toUpperCase() || 'UNKNOWN'}
// //                             </span>
// //                           </td>
// //                           <td className="p-3 border-b dark:border-gray-700">
// //                             {new Date(order.createdAt || order.timestamp).toLocaleString()}
// //                           </td>
// //                           <td className="p-3 border-b dark:border-gray-700">
// //                             {order.status === 'open' && (
// //                               <button
// //                                 onClick={() => handleCancelOrder(order.id || order.orderId)}
// //                                 className="text-red-600 hover:text-red-800 text-sm"
// //                               >
// //                                 Cancel
// //                               </button>
// //                             )}
// //                           </td>
// //                         </tr>
// //                       ))}
// //                     </tbody>
// //                   </table>
// //                 </div>
// //               )}
// //             </section>

// //             {/* New Section: My Trades (trading details) */}
// //             <section className="mt-12">
// //               <h2 className="text-2xl font-bold text-orange-600 dark:text-orange-400 mb-4">
// //                 My Trades
// //               </h2>
// //               {trades.length === 0 ? (
// //                 <p className="text-gray-500 dark:text-gray-400">No trades found.</p>
// //               ) : (
// //                 <div className="overflow-x-auto">
// //                   <table className="w-full text-left border-collapse">
// //                     <thead>
// //                       <tr className="bg-gray-100 dark:bg-gray-800">
// //                         <th className="p-3 border-b dark:border-gray-700">Symbol</th>
// //                         <th className="p-3 border-b dark:border-gray-700">Side</th>
// //                         <th className="p-3 border-b dark:border-gray-700">Amount (USDT)</th>
// //                         <th className="p-3 border-b dark:border-gray-700">Price</th>
// //                         <th className="p-3 border-b dark:border-gray-700">Quantity</th>
// //                         <th className="p-3 border-b dark:border-gray-700">Date</th>
// //                       </tr>
// //                     </thead>
// //                     <tbody>
// //                       {trades.map((trade) => (
// //                         <tr key={trade.id || trade.tradeId} className="hover:bg-gray-50 dark:hover:bg-gray-700">
// //                           <td className="p-3 border-b dark:border-gray-700">{trade.symbol}</td>
// //                           <td className="p-3 border-b dark:border-gray-700">{trade.side}</td>
// //                           <td className="p-3 border-b dark:border-gray-700">${Number(trade.amount).toLocaleString()}</td>
// //                           <td className="p-3 border-b dark:border-gray-700">${Number(trade.price).toLocaleString(undefined, { minimumFractionDigits: 2 })}</td>
// //                           <td className="p-3 border-b dark:border-gray-700">{Number(trade.quantity).toFixed(6)}</td>
// //                           <td className="p-3 border-b dark:border-gray-700">
// //                             {new Date(trade.executedAt || trade.timestamp).toLocaleString()}
// //                           </td>
// //                         </tr>
// //                       ))}
// //                     </tbody>
// //                   </table>
// //                 </div>
// //               )}
// //             </section>
// //           </>
// //         )}
// //       </main>

// //       {/* Trade Modal – original structure kept, flow improved */}
// //       <AnimatePresence>
// //         {showTradeModal && selectedPair && (
// //           <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4">
// //             <motion.div
// //               initial={{ scale: 0.9, opacity: 0 }}
// //               animate={{ scale: 1, opacity: 1 }}
// //               exit={{ scale: 0.9, opacity: 0 }}
// //               className="bg-white dark:bg-gray-900 rounded-2xl p-6 w-full max-w-md border border-gray-200 dark:border-gray-700 shadow-2xl"
// //             >
// //               <div className="flex justify-between items-center mb-5">
// //                 <h2 className="text-2xl font-bold text-orange-600 dark:text-orange-400">
// //                   {tradeSide.toUpperCase()} {selectedPair.displaySymbol}
// //                 </h2>
// //                 <button
// //                   onClick={() => setShowTradeModal(false)}
// //                   className="text-4xl text-gray-500 hover:text-gray-700 dark:hover:text-gray-300"
// //                 >
// //                   ×
// //                 </button>
// //               </div>

// //               <div className="mb-6 p-4 bg-gray-50 dark:bg-gray-800 rounded-xl text-center">
// //                 <p className="text-sm text-gray-500 dark:text-gray-400">Current Market Price</p>
// //                 <p className="text-3xl font-bold text-orange-600 dark:text-orange-400">
// //                   {(() => {
// //                     const p = prices[selectedPair.baseAsset]?.price;
// //                     return typeof p === 'number'
// //                       ? `$${p.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 8 })}`
// //                       : '—';
// //                   })()}
// //                 </p>
// //                 <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
// //                   24h change:{' '}
// //                   {(() => {
// //                     const c = prices[selectedPair.baseAsset]?.change24h;
// //                     const pos = typeof c === 'number' && c >= 0;
// //                     return typeof c === 'number' ? `${pos ? '+' : ''}${c.toFixed(2)}%` : '—';
// //                   })()}
// //                 </p>
// //               </div>

// //               <div className="grid grid-cols-2 gap-3 mb-6">
// //                 <button
// //                   onClick={() => setTradeSide('buy')}
// //                   className={`py-3 rounded-xl font-semibold ${tradeSide === 'buy' ? 'bg-green-600 text-white' : 'bg-gray-200 dark:bg-gray-700'}`}
// //                 >
// //                   BUY
// //                 </button>
// //                 <button
// //                   onClick={() => setTradeSide('sell')}
// //                   disabled={getAvailableCrypto(selectedPair.baseAsset) <= 0}
// //                   className={`py-3 rounded-xl font-semibold ${tradeSide === 'sell' ? 'bg-red-600 text-white' : 'bg-gray-200 dark:bg-gray-700'} ${getAvailableCrypto(selectedPair.baseAsset) <= 0 ? 'opacity-50 cursor-not-allowed' : ''}`}
// //                 >
// //                   SELL
// //                 </button>
// //               </div>

// //               {/* Show available balance – fits original layout */}
// //               <div className="mb-4 text-sm text-gray-600 dark:text-gray-300">
// //                 Available:{' '}
// //                 <strong>
// //                   {tradeSide === 'buy'
// //                     ? `$${getAvailableUsdt().toLocaleString(undefined, { minimumFractionDigits: 2 })} USDT`
// //                     : `${getAvailableCrypto(selectedPair.baseAsset).toFixed(6)} ${selectedPair.baseAsset}`}
// //                 </strong>
// //               </div>

// //               <div className="mb-6">
// //                 <label className="block text-sm text-gray-500 dark:text-gray-400 mb-2">
// //                   Amount (USDT)
// //                 </label>
// //                 <input
// //                   type="number"
// //                   value={tradeAmount}
// //                   onChange={(e) => setTradeAmount(e.target.value)}
// //                   placeholder="0.00"
// //                   step="any"
// //                   className="w-full p-4 text-2xl bg-gray-50 dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500"
// //                 />

// //                 {/* Quick amount buttons – added inside original spacing */}
// //                 <div className="mt-3 grid grid-cols-4 gap-2">
// //                   {[25, 50, 75, 100].map(pct => (
// //                     <button
// //                       key={pct}
// //                       type="button"
// //                       onClick={() => handleQuickAmount(pct)}
// //                       className="py-1.5 text-xs bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 rounded transition"
// //                     >
// //                       {pct}%
// //                     </button>
// //                   ))}
// //                 </div>

// //                 <div className="mt-2 flex justify-between text-sm text-gray-600 dark:text-gray-400">
// //                   <div className='flex flex-col'>
// //                     <span>Min: <strong>${MIN_TRADE_USDT}</strong></span>
// //                   </div>
// //                   <span>Max: <strong>${MAX_TRADE_USDT.toLocaleString()}</strong></span>
// //                 </div>

// //                 {tradeAmount && Number(tradeAmount) > 0 && (
// //                   <p className="mt-2 text-sm">
// //                     ≈ <strong>{estimatedQty}</strong> {selectedPair.baseAsset}
// //                     {Number(tradeAmount) < MIN_TRADE_USDT && (
// //                       <span className="text-red-500 ml-2">below min</span>
// //                     )}
// //                     {Number(tradeAmount) > MAX_TRADE_USDT && (
// //                       <span className="text-red-500 ml-2">exceeds max</span>
// //                     )}
// //                   </p>
// //                 )}

// //                 {/* Inline error feedback */}
// //                 {!isAmountValid && tradeAmount && (
// //                   <p className="mt-2 text-sm text-red-500">
// //                     {Number(tradeAmount) < MIN_TRADE_USDT ? 'Amount too low' : 'Amount too high'}
// //                   </p>
// //                 )}
// //                 {tradeSide === 'buy' && !hasEnoughForBuy() && tradeAmount && (
// //                   <p className="mt-1 text-sm text-red-500">Insufficient USDT balance</p>
// //                 )}
// //                 {tradeSide === 'sell' && !hasEnoughForSell() && tradeAmount && (
// //                   <p className="mt-1 text-sm text-red-500">Insufficient holdings</p>
// //                 )}
// //               </div>

// //               <div className="mb-6">
// //                 <label className="block text-sm text-gray-500 dark:text-gray-400 mb-2">
// //                   Order Duration:48hrs
// //                 </label>
// //                <div className='flex flex-col'>
// //                  <span className="text-sm text-gray-600 dark:text-gray-300">Roi:2%</span>
// //                 <span className="text-sm text-gray-600 dark:text-gray-300">Good 'Til Canceled (GTC)</span>
// //                </div>
// //               </div>

// //               <div className="flex gap-3">
// //                 <button
// //                   onClick={() => setShowTradeModal(false)}
// //                   className="flex-1 py-3 bg-gray-200 dark:bg-gray-700 rounded-xl font-medium hover:bg-gray-300 dark:hover:bg-gray-600"
// //                   disabled={tradeLoading}
// //                 >
// //                   Cancel
// //                 </button>
// //                 <button
// //                   onClick={handleExecuteTrade}
// //                   disabled={!canExecute}
// //                   className={`flex-1 py-3 rounded-xl font-bold text-white transition ${tradeLoading ? 'bg-orange-400 cursor-wait' : 'bg-orange-600 hover:bg-orange-700'} disabled:opacity-50 disabled:cursor-not-allowed`}
// //                 >
// //                   {tradeLoading ? 'Processing...' : 'Confirm Order'}
// //                 </button>
// //               </div>
// //             </motion.div>
// //           </div>
// //         )}
// //       </AnimatePresence>

// //       {/* Success Modal – original kept */}
// //       <AnimatePresence>
// //         {showSuccessModal && (
// //           <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4">
// //             <motion.div
// //               initial={{ scale: 0.8, opacity: 0 }}
// //               animate={{ scale: 1, opacity: 1 }}
// //               exit={{ scale: 0.8, opacity: 0 }}
// //               className="bg-white dark:bg-gray-900 rounded-2xl p-8 text-center max-w-sm w-full"
// //             >
// //               <div className="text-6xl mb-4">✅</div>
// //               <h2 className="text-2xl font-bold mb-3 text-green-600 dark:text-green-400">
// //                 Order Placed Successfully!
// //               </h2>
// //               <p className="text-gray-600 dark:text-gray-300 mb-6">
// //                 {tradeSide.toUpperCase()} ${Number(tradeAmount).toLocaleString()} USDT
// //                 <br />
// //                 {selectedPair?.displaySymbol} • {orderDuration}
// //               </p>
// //               <button
// //                 onClick={() => setShowSuccessModal(false)}
// //                 className="w-full py-3 bg-orange-600 hover:bg-orange-700 text-white rounded-xl font-bold"
// //               >
// //                 Continue Trading
// //               </button>
// //             </motion.div>
// //           </div>
// //         )}
// //       </AnimatePresence>
// //     </div>
// //   );
// // }




// import React, { useState, useEffect } from 'react';
// import { motion, AnimatePresence } from 'framer-motion';
// import { ToastContainer, toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
// import { tradingService } from '../../api/tradingApi';

// const MIN_TRADE_USDT = 50;
// const MAX_TRADE_USDT = 10000;

// // Reusable paginated table component
// function OrdersTableWithPagination({ items, itemsPerPage = 10, renderRow, headers }) {
//   const [currentPage, setCurrentPage] = useState(1);

//   const totalPages = Math.ceil(items.length / itemsPerPage);
//   const startIndex = (currentPage - 1) * itemsPerPage;
//   const paginatedItems = items.slice(startIndex, startIndex + itemsPerPage);

//   return (
//     <div>
//       <div className="overflow-x-auto">
//         <table className="w-full text-left border-collapse min-w-[700px]">
//           <thead>
//             <tr className="bg-gray-100 dark:bg-gray-800">
//               {headers.map((header, idx) => (
//                 <th key={idx} className="p-3 border-b dark:border-gray-700 font-semibold">
//                   {header}
//                 </th>
//               ))}
//             </tr>
//           </thead>
//           <tbody>
//             {paginatedItems.map(renderRow)}
//           </tbody>
//         </table>
//       </div>

//       {totalPages > 1 && (
//         <div className="mt-6 flex items-center justify-center gap-4 flex-wrap">
//           <button
//             onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
//             disabled={currentPage === 1}
//             className="px-5 py-2 bg-gray-200 dark:bg-gray-700 rounded-lg disabled:opacity-50 hover:bg-gray-300 dark:hover:bg-gray-600 transition disabled:cursor-not-allowed"
//           >
//             Previous
//           </button>

//           <span className="text-sm text-gray-600 dark:text-gray-400 px-3">
//             Page {currentPage} of {totalPages}
//           </span>

//           <button
//             onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
//             disabled={currentPage === totalPages}
//             className="px-5 py-2 bg-gray-200 dark:bg-gray-700 rounded-lg disabled:opacity-50 hover:bg-gray-300 dark:hover:bg-gray-600 transition disabled:cursor-not-allowed"
//           >
//             Next
//           </button>
//         </div>
//       )}
//     </div>
//   );
// }

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

// // CoinGecko and icon mappings (unchanged)
// const tickerToCoinGeckoId = {
//   BTC: 'bitcoin',
//   ETH: 'ethereum',
//   BNB: 'binancecoin',
//   SOL: 'solana',
//   DOGE: 'dogecoin',
//   XRP: 'ripple',
//   LTC: 'litecoin',
//   ADA: 'cardano',
//   CAKE: 'pancakeswap-token',
//   PEPE: 'pepe',
//   AVAX: 'avalanche-2',
//   BCH: 'bitcoin-cash',
//   UNI: 'uniswap',
//   WFI: 'wfi',
// };

// const tickerToSlug = {
//   BTC: 'bitcoin',
//   ETH: 'ethereum',
//   BNB: 'binance-coin',
//   SOL: 'solana',
//   DOGE: 'dogecoin',
//   XRP: 'xrp',
//   LTC: 'litecoin',
//   ADA: 'cardano',
//   CAKE: 'pancakeswap',
//   PEPE: 'pepe',
//   AVAX: 'avalanche',
//   BCH: 'bitcoin-cash',
//   UNI: 'uniswap',
//   WFI: 'wfi',
// };

// const getCoinIconUrl = (baseAsset) => {
//   const tickerLower = baseAsset.toLowerCase();
//   const slug = tickerToSlug[baseAsset] || tickerLower;
//   return `https://cryptologos.cc/logos/${slug}-${tickerLower}-logo.svg?v=040`;
// };

// export default function TradingDashboard() {
//   const [pairs, setPairs] = useState([]);
//   const [prices, setPrices] = useState({});
//   const [portfolio, setPortfolio] = useState(null);
//   const [trades, setTrades] = useState([]);
//   const [orders, setOrders] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [selectedPair, setSelectedPair] = useState(null);
//   const [showTradeModal, setShowTradeModal] = useState(false);
//   const [tradeSide, setTradeSide] = useState('buy');
//   const [tradeAmount, setTradeAmount] = useState('');
//   const [orderDuration, setOrderDuration] = useState('GTC');
//   const [showSuccessModal, setShowSuccessModal] = useState(false);
//   const [tradeLoading, setTradeLoading] = useState(false);

//   // Load all initial data
//   useEffect(() => {
//     const loadData = async () => {
//       setLoading(true);
//       setError(null);
//       try {
//         const [pairsRes, portfolioRes, tradesRes, ordersRes] = await Promise.all([
//           tradingService.getPairs(),
//           tradingService.getPortfolio(),
//           tradingService.getTrades(),
//           tradingService.getOrders(),
//         ]);

//         let receivedPairs = [];
//         if (pairsRes?.data?.success && Array.isArray(pairsRes.data.data)) {
//           receivedPairs = pairsRes.data.data;
//         } else if (Array.isArray(pairsRes?.data)) {
//           receivedPairs = pairsRes.data;
//         }

//         const normalized = receivedPairs
//           .map(normalizePair)
//           .filter(Boolean)
//           .sort((a, b) => a.baseAsset.localeCompare(b.baseAsset));

//         setPairs(normalized);
//         setPortfolio(portfolioRes?.data ?? null);
//         setTrades(tradesRes?.data?.data || tradesRes?.data || []);
//         setOrders(ordersRes?.data?.data || ordersRes?.data || []);

//         if (normalized.length === 0) {
//           toast.info('No trading pairs available at this time.');
//         }
//       } catch (err) {
//         handleApiError(err);
//         setError('Could not load trading data. Please check your connection.');
//       } finally {
//         setLoading(false);
//       }
//     };

//     loadData();
//   }, []);

//   // Price polling
//   useEffect(() => {
//     if (pairs.length === 0) return;

//     const updatePrices = async () => {
//       try {
//         const coinIds = [...new Set(
//           pairs.map(p => tickerToCoinGeckoId[p.baseAsset]).filter(Boolean)
//         )];

//         if (coinIds.length === 0) return;

//         const idsString = coinIds.join(',');
//         const res = await fetch(
//           `https://api.coingecko.com/api/v3/simple/price?ids=${idsString}&vs_currencies=usd&include_24hr_change=true`
//         );
//         if (!res.ok) throw new Error('CoinGecko fetch failed');

//         const data = await res.json();
//         const newPrices = {};
//         pairs.forEach(pair => {
//           const id = tickerToCoinGeckoId[pair.baseAsset];
//           if (id && data[id]) {
//             newPrices[pair.baseAsset] = {
//               price: data[id].usd,
//               change24h: data[id].usd_24h_change,
//             };
//           }
//         });
//         setPrices(prev => ({ ...prev, ...newPrices }));
//       } catch (err) {
//         console.warn('Price update failed:', err);
//       }
//     };

//     updatePrices();
//     const interval = setInterval(updatePrices, 45000);
//     return () => clearInterval(interval);
//   }, [pairs]);

//   const refreshPortfolioAndHistory = async () => {
//     try {
//       const [portfolioRes, tradesRes, ordersRes] = await Promise.all([
//         tradingService.getPortfolio(),
//         tradingService.getTrades(),
//         tradingService.getOrders(),
//       ]);
//       setPortfolio(portfolioRes?.data ?? null);
//       setTrades(tradesRes?.data?.data || tradesRes?.data || []);
//       setOrders(ordersRes?.data?.data || ordersRes?.data || []);
//     } catch (err) {
//       console.warn('Refresh failed:', err);
//     }
//   };

//   const openTradeModal = (pairObj) => {
//     setSelectedPair(pairObj);
//     setTradeSide('buy');
//     setTradeAmount('');
//     setOrderDuration('GTC');
//     setShowTradeModal(true);
//   };

//   const getAvailableUsdt = () => Number(portfolio?.holdings?.USDT || 0);
//   const getAvailableCrypto = (base) => Number(portfolio?.holdings?.[base] || 0);

//   const hasEnoughForBuy = () => getAvailableUsdt() >= Number(tradeAmount || 0);
//   const hasEnoughForSell = () => {
//     if (!selectedPair) return false;
//     const amount = Number(tradeAmount || 0);
//     const price = prices[selectedPair.baseAsset]?.price || 0;
//     return (getAvailableCrypto(selectedPair.baseAsset) * price) >= amount;
//   };

//   const getEstimatedQuantity = () => {
//     const price = prices[selectedPair?.baseAsset]?.price || 0;
//     return price > 0 && tradeAmount ? (Number(tradeAmount) / price).toFixed(6) : '0';
//   };

//   const isAmountValid =
//     tradeAmount !== '' &&
//     !isNaN(Number(tradeAmount)) &&
//     Number(tradeAmount) >= MIN_TRADE_USDT &&
//     Number(tradeAmount) <= MAX_TRADE_USDT;

//   const canExecute = isAmountValid && !tradeLoading &&
//     (tradeSide === 'buy' ? hasEnoughForBuy() : hasEnoughForSell());

//   const handleQuickAmount = (percent) => {
//     if (tradeSide === 'buy') {
//       const maxUsdt = Math.min(getAvailableUsdt(), MAX_TRADE_USDT);
//       setTradeAmount((maxUsdt * percent / 100).toFixed(2));
//     } else {
//       const price = prices[selectedPair?.baseAsset]?.price || 0;
//       if (price <= 0) return;
//       const maxValue = getAvailableCrypto(selectedPair.baseAsset) * price;
//       setTradeAmount(Math.min(maxValue * percent / 100, MAX_TRADE_USDT).toFixed(2));
//     }
//   };

//   const handleExecuteTrade = async () => {
//     if (!canExecute) return;
//     const amount = Number(tradeAmount);

//     setTradeLoading(true);
//     try {
//       const payload = {
//         side: tradeSide.toUpperCase(),
//         symbol: selectedPair.apiSymbol,
//         amount,
//         timeInForce: orderDuration,
//       };

//       await tradingService.executeTrade(payload);

//       toast.success(
//         `${tradeSide.toUpperCase()} order placed: $${amount.toLocaleString()} USDT • ${selectedPair.displaySymbol}`
//       );

//       await refreshPortfolioAndHistory();

//       setShowTradeModal(false);
//       setShowSuccessModal(true);
//       setTradeAmount('');
//     } catch (err) {
//       handleApiError(err);
//     } finally {
//       setTradeLoading(false);
//     }
//   };

//   const handleCancelOrder = async (orderId) => {
//     if (!window.confirm('Cancel this order?')) return;
//     try {
//       await tradingService.cancelOrder(orderId);
//       toast.success('Order cancelled');
//       await refreshPortfolioAndHistory();
//     } catch (err) {
//       handleApiError(err);
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
//             disabled={loading || tradeLoading}
//             className="px-5 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium disabled:opacity-60 transition"
//           >
//             {loading || tradeLoading ? 'Loading...' : 'Refresh'}
//           </button>
//         </div>
//       </header>

//       <main className="max-w-7xl mx-auto px-4 py-8">
//         {loading ? (
//           <div className="flex flex-col items-center justify-center py-20">
//             <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-orange-500"></div>
//             <p className="mt-4 text-gray-600 dark:text-gray-400">Loading markets...</p>
//           </div>
//         ) : error ? (
//           <div className="text-center py-16 text-red-600 dark:text-red-400">{error}</div>
//         ) : pairs.length === 0 ? (
//           <div className="text-center py-16 text-gray-500 dark:text-gray-400">
//             No trading pairs available.
//           </div>
//         ) : (
//           <>
//             {/* Trading Pairs Grid */}
//             <div className="grid grid-cols-1 sm:grid-cols-1 lg:grid-cols-1 xl:grid-cols-1 gap-5">
//               {pairs.map((pair) => {
//                 const live = prices[pair.baseAsset];
//                 const priceDisplay = live?.price
//                   ? `$${live.price.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 8 })}`
//                   : '—';
//                 const change = live?.change24h;
//                 const changeDisplay = change != null ? `${change >= 0 ? '+' : ''}${change.toFixed(2)}%` : '—';
//                 const isPositive = change >= 0;

//                 return (
//                   <motion.div
//                     key={pair.apiSymbol}
//                     whileHover={{ scale: 1.02, y: -2 }}
//                     className="bg-white dark:bg-gray-800 rounded-xl shadow border border-gray-200 dark:border-gray-700 hover:border-orange-500/40 transition-all duration-200 overflow-hidden"
//                   >
//                     <div className="p-5 flex items-center justify-between gap-4">
//                       <div className="flex items-center gap-3 min-w-0">
//                         <img
//                           src={getCoinIconUrl(pair.baseAsset)}
//                           alt={`${pair.baseAsset} logo`}
//                           className="w-10 h-10 rounded-full flex-shrink-0 object-contain bg-gray-100 dark:bg-gray-700 p-1 border border-gray-200 dark:border-gray-600"
//                           loading="lazy"
//                           onError={(e) => { e.target.src = 'https://cryptologos.cc/logos/question-mark-question-mark-logo.svg?v=040'; }}
//                         />
//                         <div className="flex flex-col">
//                           <h3 className="text-xl font-bold tracking-tight">{pair.baseAsset}</h3>
//                           <span className="text-sm font-medium text-gray-500 dark:text-gray-400">/{pair.quoteAsset}</span>
//                         </div>
//                       </div>
//                       <div className="text-right flex-1">
//                         <div className="text-lg font-semibold">{priceDisplay}</div>
//                         <div className={`text-sm font-medium ${isPositive ? 'text-green-500' : 'text-red-500'}`}>
//                           {changeDisplay}
//                         </div>
//                       </div>
//                       <button
//                         onClick={() => openTradeModal(pair)}
//                         className="px-5 py-2.5 bg-orange-600 hover:bg-orange-700 text-white text-sm font-medium rounded-lg transition whitespace-nowrap"
//                       >
//                         Trade
//                       </button>
//                     </div>
//                   </motion.div>
//                 );
//               })}
//             </div>

//             {/* My Orders Section */}
//             <section className="mt-12">
//               <h2 className="text-2xl font-bold text-orange-600 dark:text-orange-400 mb-4">My Orders</h2>
//               {orders.length === 0 ? (
//                 <p className="text-gray-500 dark:text-gray-400">No orders found.</p>
//               ) : (
//                 <OrdersTableWithPagination
//                   items={orders}
//                   itemsPerPage={10}
//                   headers={['Symbol', 'Side', 'Amount (USDT)', 'Status', 'Date', 'Actions']}
//                   renderRow={(order) => (
//                     <tr key={order.id || order.orderId} className="hover:bg-gray-50 dark:hover:bg-gray-700">
//                       <td className="p-3 border-b dark:border-gray-700">{order.symbol}</td>
//                       <td className="p-3 border-b dark:border-gray-700">{order.side}</td>
//                       <td className="p-3 border-b dark:border-gray-700">${Number(order.amount || 0).toLocaleString()}</td>
//                       <td className="p-3 border-b dark:border-gray-700">
//                         <span className={`font-medium ${
//                           order.status === 'filled' ? 'text-green-600' :
//                           order.status === 'cancelled' ? 'text-red-600' :
//                           order.status === 'open' ? 'text-blue-600' : 'text-gray-500'
//                         }`}>
//                           {(order.status || 'unknown').toUpperCase()}
//                         </span>
//                       </td>
//                       <td className="p-3 border-b dark:border-gray-700">
//                         {new Date(order.createdAt || order.timestamp || Date.now()).toLocaleString()}
//                       </td>
//                       <td className="p-3 border-b dark:border-gray-700">
//                         {order.status === 'open' && (
//                           <button
//                             onClick={() => handleCancelOrder(order.id || order.orderId)}
//                             className="text-red-600 hover:text-red-800 text-sm font-medium"
//                           >
//                             Cancel
//                           </button>
//                         )}
//                       </td>
//                     </tr>
//                   )}
//                 />
//               )}
//             </section>

//             {/* My Trades Section */}
//             <section className="mt-12">
//               <h2 className="text-2xl font-bold text-orange-600 dark:text-orange-400 mb-4">My Trades</h2>
//               {trades.length === 0 ? (
//                 <p className="text-gray-500 dark:text-gray-400">No trades found.</p>
//               ) : (
//                 <OrdersTableWithPagination
//                   items={trades}
//                   itemsPerPage={10}
//                   headers={['Symbol', 'Side', 'Amount (USDT)', 'Price', 'Quantity', 'Date']}
//                   renderRow={(trade) => (
//                     <tr key={trade.id || trade.tradeId} className="hover:bg-gray-50 dark:hover:bg-gray-700">
//                       <td className="p-3 border-b dark:border-gray-700">{trade.symbol}</td>
//                       <td className="p-3 border-b dark:border-gray-700">{trade.side}</td>
//                       <td className="p-3 border-b dark:border-gray-700">${Number(trade.amount || 0).toLocaleString()}</td>
//                       <td className="p-3 border-b dark:border-gray-700">
//                         ${Number(trade.price || 0).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 6 })}
//                       </td>
//                       <td className="p-3 border-b dark:border-gray-700">
//                         {Number(trade.quantity || 0).toFixed(6)}
//                       </td>
//                       <td className="p-3 border-b dark:border-gray-700">
//                         {new Date(trade.executedAt || trade.timestamp || Date.now()).toLocaleString()}
//                       </td>
//                     </tr>
//                   )}
//                 />
//               )}
//             </section>
//           </>
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

//               <div className="mb-6 p-4 bg-gray-50 dark:bg-gray-800 rounded-xl text-center">
//                 <p className="text-sm text-gray-500 dark:text-gray-400">Current Market Price</p>
//                 <p className="text-3xl font-bold text-orange-600 dark:text-orange-400">
//                   {prices[selectedPair.baseAsset]?.price
//                     ? `$${prices[selectedPair.baseAsset].price.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 8 })}`
//                     : '—'}
//                 </p>
//                 <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
//                   24h change: {(() => {
//                     const ch = prices[selectedPair.baseAsset]?.change24h;
//                     return ch != null ? `${ch >= 0 ? '+' : ''}${ch.toFixed(2)}%` : '—';
//                   })()}
//                 </p>
//               </div>

//               <div className="grid grid-cols-2 gap-3 mb-6">
//                 <button
//                   onClick={() => setTradeSide('buy')}
//                   className={`py-3 rounded-xl font-semibold ${tradeSide === 'buy' ? 'bg-green-600 text-white' : 'bg-gray-200 dark:bg-gray-700'}`}
//                 >
//                   BUY
//                 </button>
//                 <button
//                   onClick={() => setTradeSide('sell')}
//                   disabled={getAvailableCrypto(selectedPair.baseAsset) <= 0}
//                   className={`py-3 rounded-xl font-semibold ${tradeSide === 'sell' ? 'bg-red-600 text-white' : 'bg-gray-200 dark:bg-gray-700'} ${getAvailableCrypto(selectedPair.baseAsset) <= 0 ? 'opacity-50 cursor-not-allowed' : ''}`}
//                 >
//                   SELL
//                 </button>
//               </div>

//               <div className="mb-4 text-sm text-gray-600 dark:text-gray-300">
//                 Available: <strong>
//                   {tradeSide === 'buy'
//                     ? `$${getAvailableUsdt().toLocaleString(undefined, { minimumFractionDigits: 2 })} USDT`
//                     : `${getAvailableCrypto(selectedPair.baseAsset).toFixed(6)} ${selectedPair.baseAsset}`}
//                 </strong>
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

//                 <div className="mt-3 grid grid-cols-4 gap-2">
//                   {[25, 50, 75, 100].map(pct => (
//                     <button
//                       key={pct}
//                       onClick={() => handleQuickAmount(pct)}
//                       className="py-1.5 text-xs bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 rounded transition"
//                     >
//                       {pct}%
//                     </button>
//                   ))}
//                 </div>

//                 <div className="mt-2 flex justify-between text-sm text-gray-600 dark:text-gray-400">
//                   <span>Min: <strong>${MIN_TRADE_USDT}</strong></span>
//                   <span>Max: <strong>${MAX_TRADE_USDT.toLocaleString()}</strong></span>
//                 </div>

//                 {tradeAmount && (
//                   <p className="mt-2 text-sm">
//                     ≈ <strong>{getEstimatedQuantity()}</strong> {selectedPair.baseAsset}
//                   </p>
//                 )}

//                 {!isAmountValid && tradeAmount && (
//                   <p className="mt-2 text-sm text-red-500">
//                     {Number(tradeAmount) < MIN_TRADE_USDT ? 'Below minimum' : 'Exceeds maximum'}
//                   </p>
//                 )}
//                 {tradeSide === 'buy' && !hasEnoughForBuy() && tradeAmount && (
//                   <p className="mt-1 text-sm text-red-500">Insufficient USDT</p>
//                 )}
//                 {tradeSide === 'sell' && !hasEnoughForSell() && tradeAmount && (
//                   <p className="mt-1 text-sm text-red-500">Insufficient holdings</p>
//                 )}
//               </div>

//               <div className="mb-6">
//                 <label className="block text-sm text-gray-500 dark:text-gray-400 mb-2">
//                   Order Duration:48hrs
//                 </label>
//                 <span className="text-sm text-gray-600 dark:text-gray-300">Good 'Til Canceled (GTC)</span>
//               </div>

//               <div className="flex gap-3">
//                 <button
//                   onClick={() => setShowTradeModal(false)}
//                   disabled={tradeLoading}
//                   className="flex-1 py-3 bg-gray-200 dark:bg-gray-700 rounded-xl font-medium hover:bg-gray-300 dark:hover:bg-gray-600 disabled:opacity-50"
//                 >
//                   Cancel
//                 </button>
//                 <button
//                   onClick={handleExecuteTrade}
//                   disabled={!canExecute}
//                   className={`flex-1 py-3 rounded-xl font-bold text-white ${tradeLoading ? 'bg-orange-400 cursor-wait' : 'bg-orange-600 hover:bg-orange-700'} disabled:opacity-50 disabled:cursor-not-allowed`}
//                 >
//                   {tradeLoading ? 'Processing...' : 'Confirm Order'}
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
//                 Order Placed Successfully!
//               </h2>
//               <p className="text-gray-600 dark:text-gray-300 mb-6">
//                 {tradeSide.toUpperCase()} ${Number(tradeAmount).toLocaleString()} USDT
//                 <br />
//                 {selectedPair?.displaySymbol} • {orderDuration}
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

// Reusable paginated table
function PaginatedTable({ items, itemsPerPage = 10, headers, renderRow }) {
  const [page, setPage] = useState(1);
  const totalPages = Math.ceil(items.length / itemsPerPage);
  const start = (page - 1) * itemsPerPage;
  const paginated = items.slice(start, start + itemsPerPage);

  return (
    <div>
      <div className="overflow-x-auto rounded-xl border border-gray-200 dark:border-gray-700">
        <table className="w-full text-left min-w-[700px]">
          <thead>
            <tr className="bg-gray-100 dark:bg-gray-800">
              {headers.map((h, i) => (
                <th key={i} className="p-4 font-semibold border-b dark:border-gray-700">
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {paginated.map(renderRow)}
          </tbody>
        </table>
      </div>

      {totalPages > 1 && (
        <div className="mt-6 flex items-center justify-center gap-4 flex-wrap">
          <button
            onClick={() => setPage(p => Math.max(1, p - 1))}
            disabled={page === 1}
            className="px-5 py-2 bg-gray-200 dark:bg-gray-700 rounded-lg disabled:opacity-50 hover:bg-gray-300 dark:hover:bg-gray-600 transition disabled:cursor-not-allowed"
          >
            Previous
          </button>
          <span className="text-sm text-gray-600 dark:text-gray-400">
            Page {page} of {totalPages}
          </span>
          <button
            onClick={() => setPage(p => Math.min(totalPages, p + 1))}
            disabled={page === totalPages}
            className="px-5 py-2 bg-gray-200 dark:bg-gray-700 rounded-lg disabled:opacity-50 hover:bg-gray-300 dark:hover:bg-gray-600 transition disabled:cursor-not-allowed"
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
}

const handleApiError = (error) => {
  const message =
    error?.response?.data?.message ||
    error?.response?.data?.error ||
    error?.message ||
    'Operation failed. Please try again.';
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
    'BITCOIN': 'BTC', 'ETHEREUM': 'ETH', 'BNB': 'BNB', 'SOL': 'SOL',
    'DOGE': 'DOGE', 'XRP': 'XRP', 'LTC': 'LTC', 'ADA': 'ADA',
    'CAKE': 'CAKE', 'PEPE': 'PEPE', 'WFI': 'WFI', 'AVAX': 'AVAX',
    'BCH': 'BCH', 'UNI': 'UNI',
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

const tickerToCoinGeckoId = {
  BTC: 'bitcoin', ETH: 'ethereum', BNB: 'binancecoin', SOL: 'solana',
  DOGE: 'dogecoin', XRP: 'ripple', LTC: 'litecoin', ADA: 'cardano',
  CAKE: 'pancakeswap-token', PEPE: 'pepe', AVAX: 'avalanche-2',
  BCH: 'bitcoin-cash', UNI: 'uniswap', WFI: 'wfi',
};

const tickerToSlug = {
  BTC: 'bitcoin', ETH: 'ethereum', BNB: 'binance-coin', SOL: 'solana',
  DOGE: 'dogecoin', XRP: 'xrp', LTC: 'litecoin', ADA: 'cardano',
  CAKE: 'pancakeswap', PEPE: 'pepe', AVAX: 'avalanche',
  BCH: 'bitcoin-cash', UNI: 'uniswap', WFI: 'wfi',
};

const getCoinIconUrl = (baseAsset) => {
  const slug = tickerToSlug[baseAsset] || baseAsset.toLowerCase();
  return `https://cryptologos.cc/logos/${slug}-${baseAsset.toLowerCase()}-logo.svg?v=040`;
};

export default function TradingDashboard() {
  const [pairs, setPairs] = useState([]);
  const [prices, setPrices] = useState({});
  const [portfolio, setPortfolio] = useState(null);
  const [trades, setTrades] = useState([]);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedPair, setSelectedPair] = useState(null);
  const [showTradeModal, setShowTradeModal] = useState(false);
  const [tradeSide, setTradeSide] = useState('buy');
  const [tradeAmount, setTradeAmount] = useState('');
  const [orderDuration, setOrderDuration] = useState('GTC');
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [tradeLoading, setTradeLoading] = useState(false);

  // Load initial data
  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      setError(null);
      try {
        const [pairsRes, portfolioRes, tradesRes, ordersRes] = await Promise.all([
          tradingService.getPairs(),
          tradingService.getPortfolio(),
          tradingService.getTrades(),
          tradingService.getOrders(),
        ]);

        let receivedPairs = pairsRes?.data?.data || pairsRes?.data || [];
        const normalized = receivedPairs
          .map(normalizePair)
          .filter(Boolean)
          .sort((a, b) => a.baseAsset.localeCompare(b.baseAsset));

        setPairs(normalized);
        setPortfolio(portfolioRes?.data ?? null);
        setTrades(tradesRes?.data?.data || tradesRes?.data || []);
        setOrders(ordersRes?.data?.data || ordersRes?.data || []);

        if (normalized.length === 0) toast.info('No trading pairs available.');
      } catch (err) {
        handleApiError(err);
        setError('Failed to load trading data.');
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  // Live price polling
  useEffect(() => {
    if (pairs.length === 0) return;

    const updatePrices = async () => {
      try {
        const ids = [...new Set(
          pairs.map(p => tickerToCoinGeckoId[p.baseAsset]).filter(Boolean)
        )];

        if (ids.length === 0) return;

        const res = await fetch(
          `https://api.coingecko.com/api/v3/simple/price?ids=${ids.join(',')}&vs_currencies=usd&include_24hr_change=true`
        );
        if (!res.ok) throw new Error('Price fetch failed');

        const data = await res.json();
        const newPrices = {};
        pairs.forEach(pair => {
          const id = tickerToCoinGeckoId[pair.baseAsset];
          if (id && data[id]) {
            newPrices[pair.baseAsset] = {
              price: data[id].usd,
              change24h: data[id].usd_24h_change,
            };
          }
        });
        setPrices(prev => ({ ...prev, ...newPrices }));
      } catch (err) {
        console.warn('Price update failed:', err);
      }
    };

    updatePrices();
    const interval = setInterval(updatePrices, 45000);
    return () => clearInterval(interval);
  }, [pairs]);

  const refreshAll = async () => {
    try {
      const [portfolioRes, tradesRes, ordersRes] = await Promise.all([
        tradingService.getPortfolio(),
        tradingService.getTrades(),
        tradingService.getOrders(),
      ]);
      setPortfolio(portfolioRes?.data ?? null);
      setTrades(tradesRes?.data?.data || tradesRes?.data || []);
      setOrders(ordersRes?.data?.data || ordersRes?.data || []);
    } catch (err) {
      console.warn('Refresh failed:', err);
    }
  };

  const openTradeModal = (pair) => {
    setSelectedPair(pair);
    setTradeSide('buy');
    setTradeAmount('');
    setOrderDuration('GTC');
    setShowTradeModal(true);
  };

  const getAvailableUsdt = () => Number(portfolio?.holdings?.USDT || 0);
  const getAvailableCrypto = (base) => Number(portfolio?.holdings?.[base] || 0);

  const hasEnoughForBuy = () => getAvailableUsdt() >= Number(tradeAmount || 0);
  const hasEnoughForSell = () => {
    if (!selectedPair) return false;
    const amount = Number(tradeAmount || 0);
    const price = prices[selectedPair.baseAsset]?.price || 0;
    return (getAvailableCrypto(selectedPair.baseAsset) * price) >= amount;
  };

  const getEstimatedQuantity = () => {
    const price = prices[selectedPair?.baseAsset]?.price || 0;
    return price > 0 && tradeAmount ? (Number(tradeAmount) / price).toFixed(6) : '0';
  };

  const estimatedQty = getEstimatedQuantity();

  const isAmountValid =
    tradeAmount !== '' &&
    !isNaN(Number(tradeAmount)) &&
    Number(tradeAmount) >= MIN_TRADE_USDT &&
    Number(tradeAmount) <= MAX_TRADE_USDT;

  const canExecute = isAmountValid && !tradeLoading &&
    (tradeSide === 'buy' ? hasEnoughForBuy() : hasEnoughForSell());

  const handleQuickAmount = (pct) => {
    if (tradeSide === 'buy') {
      const max = Math.min(getAvailableUsdt(), MAX_TRADE_USDT);
      setTradeAmount((max * pct / 100).toFixed(2));
    } else {
      const price = prices[selectedPair?.baseAsset]?.price || 0;
      if (price <= 0) return;
      const maxValue = getAvailableCrypto(selectedPair.baseAsset) * price;
      setTradeAmount(Math.min(maxValue * pct / 100, MAX_TRADE_USDT).toFixed(2));
    }
  };

  const handleExecuteTrade = async () => {
    if (!canExecute) return;
    const amount = Number(tradeAmount);

    setTradeLoading(true);
    try {
      const payload = {
        side: tradeSide.toUpperCase(),
        symbol: selectedPair.apiSymbol,
        amount,
        timeInForce: orderDuration,
      };

      await tradingService.executeTrade(payload);
      toast.success(`${tradeSide.toUpperCase()} order placed successfully`);

      await refreshAll();
      setShowTradeModal(false);
      setShowSuccessModal(true);
      setTradeAmount('');
    } catch (err) {
      handleApiError(err);
    } finally {
      setTradeLoading(false);
    }
  };

  const handleCancelOrder = async (orderId) => {
    if (!window.confirm('Cancel this order?')) return;
    try {
      await tradingService.cancelOrder(orderId);
      toast.success('Order cancelled');
      await refreshAll();
    } catch (err) {
      handleApiError(err);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 pb-16">
      <ToastContainer position="top-center" autoClose={3500} theme="colored" limit={2} />

      <header className="sticky top-0 z-10 bg-white/95 dark:bg-gray-900/95 backdrop-blur-sm border-b border-gray-200 dark:border-gray-800 px-4 py-5">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-orange-600 dark:text-orange-400">
              Crypto Trading
            </h1>
            {portfolio && (
              <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
                Balance: <strong className="text-emerald-600">${Number(portfolio.balance || 0).toLocaleString()}</strong>
                {' • '} Invested: <strong>${Number(portfolio.totalInvested || 0).toLocaleString()}</strong>
              </p>
            )}
          </div>
          <button
            onClick={refreshAll}
            disabled={loading || tradeLoading}
            className="px-5 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium disabled:opacity-60 transition"
          >
            {loading || tradeLoading ? 'Loading...' : 'Refresh'}
          </button>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-8">
        {loading ? (
          <div className="flex flex-col items-center justify-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-orange-500"></div>
            <p className="mt-4 text-gray-600 dark:text-gray-400">Loading markets...</p>
          </div>
        ) : error ? (
          <div className="text-center py-16 text-red-600 dark:text-red-400">{error}</div>
        ) : pairs.length === 0 ? (
          <div className="text-center py-16 text-gray-500 dark:text-gray-400">
            No trading pairs available.
          </div>
        ) : (
          <>
            {/* Trading Pairs */}
            <div className="grid grid-cols-1 sm:grid-cols-1 lg:grid-cols-1 xl:grid-cols-1 gap-5">
              {pairs.map((pair) => {
                const live = prices[pair.baseAsset];
                const price = live?.price ? `$${live.price.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 8 })}` : '—';
                const change = live?.change24h;
                const changeDisplay = change != null ? `${change >= 0 ? '+' : ''}${change.toFixed(2)}%` : '—';
                const isPositive = change >= 0;

                return (
                  <motion.div
                    key={pair.apiSymbol}
                    whileHover={{ scale: 1.02, y: -2 }}
                    className="bg-white dark:bg-gray-800 rounded-xl shadow border border-gray-200 dark:border-gray-700 hover:border-orange-500/40 transition-all duration-200 overflow-hidden"
                  >
                    <div className="p-5 flex items-center justify-between gap-4">
                      <div className="flex items-center gap-3 min-w-0">
                        <img
                          src={getCoinIconUrl(pair.baseAsset)}
                          alt={pair.baseAsset}
                          className="w-10 h-10 rounded-full object-contain bg-gray-100 dark:bg-gray-700 p-1 border border-gray-200 dark:border-gray-600"
                          loading="lazy"
                          onError={(e) => { e.target.src = 'https://cryptologos.cc/logos/question-mark-question-mark-logo.svg?v=040'; }}
                        />
                        <div className="flex flex-col">
                          <h3 className="text-xl font-bold">{pair.baseAsset}</h3>
                          <span className="text-sm text-gray-500 dark:text-gray-400">/{pair.quoteAsset}</span>
                        </div>
                      </div>
                      <div className="text-right flex-1">
                        <div className="text-lg font-semibold">{price}</div>
                        <div className={`text-sm font-medium ${isPositive ? 'text-green-500' : 'text-red-500'}`}>
                          {changeDisplay}
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

            {/* My Orders */}
            <section className="mt-12">
              <h2 className="text-2xl font-bold text-orange-600 dark:text-orange-400 mb-4">My Orders</h2>
              {orders.length === 0 ? (
                <p className="text-gray-500 dark:text-gray-400">No orders yet.</p>
              ) : (
                <PaginatedTable
                  items={orders}
                  headers={['Symbol', 'Side', 'Amount (USDT)', 'Status', 'Date', 'Actions']}
                  renderRow={(order) => (
                    <tr key={order.id || order._id} className="hover:bg-gray-50 dark:hover:bg-gray-700">
                      <td className="p-4 border-b dark:border-gray-700">{order.symbol}</td>
                      <td className="p-4 border-b dark:border-gray-700 font-medium">{order.side}</td>
                      <td className="p-4 border-b dark:border-gray-700">${Number(order.amount || 0).toLocaleString()}</td>
                      <td className="p-4 border-b dark:border-gray-700">
                        <span className={`font-medium ${
                          order.status === 'filled' ? 'text-green-600' :
                          order.status === 'cancelled' ? 'text-red-600' :
                          order.status === 'open' ? 'text-blue-600' : 'text-gray-500'
                        }`}>
                          {(order.status || 'unknown').toUpperCase()}
                        </span>
                      </td>
                      <td className="p-4 border-b dark:border-gray-700">
                        {new Date(order.createdAt || Date.now()).toLocaleString()}
                      </td>
                      <td className="p-4 border-b dark:border-gray-700">
                        {order.status === 'open' && (
                          <button
                            onClick={() => handleCancelOrder(order.id || order._id)}
                            className="text-red-600 hover:text-red-800 font-medium"
                          >
                            Cancel
                          </button>
                        )}
                      </td>
                    </tr>
                  )}
                />
              )}
            </section>

            {/* My Trades */}
            <section className="mt-12">
              <h2 className="text-2xl font-bold text-orange-600 dark:text-orange-400 mb-4">My Trades</h2>
              {trades.length === 0 ? (
                <p className="text-gray-500 dark:text-gray-400">No trades yet.</p>
              ) : (
                <PaginatedTable
                  items={trades}
                  headers={['Symbol', 'Side', 'Amount (USDT)', 'Price', 'Quantity', 'Date']}
                  renderRow={(trade) => (
                    <tr key={trade.id || trade._id} className="hover:bg-gray-50 dark:hover:bg-gray-700">
                      <td className="p-4 border-b dark:border-gray-700">{trade.symbol}</td>
                      <td className="p-4 border-b dark:border-gray-700">{trade.side}</td>
                      <td className="p-4 border-b dark:border-gray-700">${Number(trade.amount || 0).toLocaleString()}</td>
                      <td className="p-4 border-b dark:border-gray-700">
                        ${Number(trade.price || 0).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 6 })}
                      </td>
                      <td className="p-4 border-b dark:border-gray-700">
                        {Number(trade.quantity || 0).toFixed(6)}
                      </td>
                      <td className="p-4 border-b dark:border-gray-700">
                        {new Date(trade.executedAt || trade.timestamp || Date.now()).toLocaleString()}
                      </td>
                    </tr>
                  )}
                />
              )}
            </section>
          </>
        )}
      </main>

      {/* Trade Modal */}
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

              <div className="mb-6 p-4 bg-gray-50 dark:bg-gray-800 rounded-xl text-center">
                <p className="text-sm text-gray-500 dark:text-gray-400">Market Price</p>
                <p className="text-3xl font-bold text-orange-600 dark:text-orange-400">
                  {prices[selectedPair.baseAsset]?.price
                    ? `$${prices[selectedPair.baseAsset].price.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 8 })}`
                    : '—'}
                </p>
                <p className="text-xs mt-1">
                  24h: {(() => {
                    const ch = prices[selectedPair.baseAsset]?.change24h;
                    return ch != null ? `${ch >= 0 ? '+' : ''}${ch.toFixed(2)}%` : '—';
                  })()}
                </p>
              </div>

              <div className="grid grid-cols-2 gap-3 mb-6">
                <button
                  onClick={() => setTradeSide('buy')}
                  className={`py-3 rounded-xl font-semibold ${tradeSide === 'buy' ? 'bg-green-600 text-white' : 'bg-gray-200 dark:bg-gray-700'}`}
                >
                  BUY
                </button>
                <button
                  onClick={() => setTradeSide('sell')}
                  disabled={getAvailableCrypto(selectedPair.baseAsset) <= 0}
                  className={`py-3 rounded-xl font-semibold ${tradeSide === 'sell' ? 'bg-red-600 text-white' : 'bg-gray-200 dark:bg-gray-700'} ${getAvailableCrypto(selectedPair.baseAsset) <= 0 ? 'opacity-50 cursor-not-allowed' : ''}`}
                >
                  SELL
                </button>
              </div>

              <div className="mb-4 text-sm text-gray-600 dark:text-gray-300">
                Available: <strong>
                  {tradeSide === 'buy'
                    ? `$${getAvailableUsdt().toLocaleString(undefined, { minimumFractionDigits: 2 })} USDT`
                    : `${getAvailableCrypto(selectedPair.baseAsset).toFixed(6)} ${selectedPair.baseAsset}`}
                </strong>
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

                <div className="mt-3 grid grid-cols-4 gap-2">
                  {[25, 50, 75, 100].map(pct => (
                    <button
                      key={pct}
                      onClick={() => handleQuickAmount(pct)}
                      className="py-1.5 text-xs bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 rounded transition"
                    >
                      {pct}%
                    </button>
                  ))}
                </div>

                <div className="mt-2 flex justify-between text-sm text-gray-600 dark:text-gray-400">
                  <div className='flex flex-col py-2'>
                    <span>Min: <strong>${MIN_TRADE_USDT}</strong></span>
                    <span>ROI:2%</span>
                  </div>
                  <span>Max: <strong>${MAX_TRADE_USDT.toLocaleString()}</strong></span>
                </div>

                {tradeAmount && (
                  <p className="mt-2 text-sm">
                    ≈ <strong>{estimatedQty}</strong> {selectedPair.baseAsset}
                  </p>
                )}

                {!isAmountValid && tradeAmount && (
                  <p className="mt-2 text-sm text-red-500">
                    {Number(tradeAmount) < MIN_TRADE_USDT ? 'Below minimum' : 'Exceeds maximum'}
                  </p>
                )}
                {tradeSide === 'buy' && !hasEnoughForBuy() && tradeAmount && (
                  <p className="mt-1 text-sm text-red-500">Not enough USDT</p>
                )}
                {tradeSide === 'sell' && !hasEnoughForSell() && tradeAmount && (
                  <p className="mt-1 text-sm text-red-500">Not enough crypto</p>
                )}
              </div>

              <div className="mb-6">
                <label className="block text-sm text-gray-500 dark:text-gray-400 mb-2">
                  Order Duration: 48hrs
                </label>
                <span className="text-sm text-gray-600 dark:text-gray-300">Good 'Til Canceled (GTC)</span>
              </div>

              <div className="flex gap-3">
                <button
                  onClick={() => setShowTradeModal(false)}
                  disabled={tradeLoading}
                  className="flex-1 py-3 bg-gray-200 dark:bg-gray-700 rounded-xl font-medium hover:bg-gray-300 dark:hover:bg-gray-600 disabled:opacity-50"
                >
                  Cancel
                </button>
                <button
                  onClick={handleExecuteTrade}
                  disabled={!canExecute}
                  className={`flex-1 py-3 rounded-xl font-bold text-white ${tradeLoading ? 'bg-orange-400 cursor-wait' : 'bg-orange-600 hover:bg-orange-700'} disabled:opacity-50 disabled:cursor-not-allowed`}
                >
                  {tradeLoading ? 'Processing...' : 'Confirm Order'}
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
                Order Placed!
              </h2>
              <p className="text-gray-600 dark:text-gray-300 mb-6">
                {tradeSide.toUpperCase()} ${Number(tradeAmount).toLocaleString()} USDT
                <br />
                {selectedPair?.displaySymbol}
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