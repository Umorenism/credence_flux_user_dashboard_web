

// // import React, { useState, useEffect } from 'react';
// // import { motion } from 'framer-motion';
// // import {
// //   LineChart,
// //   Line,
// //   XAxis,
// //   YAxis,
// //   CartesianGrid,
// //   Tooltip,
// //   ResponsiveContainer,
// //   Legend,
// // } from 'recharts';
// // import { format } from 'date-fns';

// // import { getCryptoPrices, getCryptoChart, convertUsdToCrypto } from '../../api/cryptoApi';

// // export default function CryptoPage() {
// //   const [prices, setPrices] = useState([]);
// //   const [selectedCoin, setSelectedCoin] = useState('');
// //   const [chartData, setChartData] = useState([]);
// //   const [loadingPrices, setLoadingPrices] = useState(true);
// //   const [loadingChart, setLoadingChart] = useState(true);
// //   const [error, setError] = useState(null);

// //   // Converter states
// //   const [usdAmount, setUsdAmount] = useState('');
// //   const [convertedAmount, setConvertedAmount] = useState(null);
// //   const [converting, setConverting] = useState(false);
// //   const [convertError, setConvertError] = useState(null);

// //   // Fetch crypto prices
// //   useEffect(() => {
// //     const fetchPrices = async () => {
// //       try {
// //         setLoadingPrices(true);
// //         const res = await getCryptoPrices();

// //         if (res.data?.success) {
// //           const coinData = res.data.data; // assuming object keyed by coin
// //           const formatted = Object.keys(coinData).map((key) => ({
// //             id: key,
// //             name: coinData[key].name || key.toUpperCase(),
// //             price: coinData[key].market_data?.current_price?.usd || 0,
// //             change24h: coinData[key].market_data?.price_change_percentage_24h || 0,
// //             marketCap: coinData[key].market_data?.market_cap?.usd || 0,
// //           }));

// //           setPrices(formatted);
// //           if (!selectedCoin) setSelectedCoin(formatted[0].id);
// //         } else {
// //           throw new Error(res.data?.message || 'Failed to load prices');
// //         }
// //       } catch (err) {
// //         setError(err.message || 'Failed to fetch prices');
// //       } finally {
// //         setLoadingPrices(false);
// //       }
// //     };

// //     fetchPrices();
// //     const interval = setInterval(fetchPrices, 60000); // refresh every 60s
// //     return () => clearInterval(interval);
// //   }, [selectedCoin]);

// //   // Fetch chart for selected coin
// //   useEffect(() => {
// //     const fetchChart = async () => {
// //       if (!selectedCoin) return;
// //       try {
// //         setLoadingChart(true);
// //         const res = await getCryptoChart(selectedCoin);

// //         if (res.data?.success) {
// //           const formatted = res.data.data.map((item) => ({
// //             time: format(new Date(item.time), 'MMM dd HH:mm'),
// //             price: item.price,
// //           }));
// //           setChartData(formatted);
// //         } else {
// //           throw new Error(res.data?.message || 'Failed to load chart');
// //         }
// //       } catch (err) {
// //         setError(err.message);
// //       } finally {
// //         setLoadingChart(false);
// //       }
// //     };

// //     fetchChart();
// //   }, [selectedCoin]);

// //   // USD → Crypto conversion
// //   const handleConvert = async () => {
// //     setConvertError(null);
// //     setConvertedAmount(null);

// //     const amountNum = Number(usdAmount);
// //     if (!usdAmount || isNaN(amountNum) || amountNum <= 0) {
// //       setConvertError('Enter a valid USD amount > 0');
// //       return;
// //     }
// //     if (!selectedCoin) {
// //       setConvertError('Select a cryptocurrency');
// //       return;
// //     }

// //     try {
// //       setConverting(true);
// //       const res = await convertUsdToCrypto({ amount: amountNum, cryptoId: selectedCoin, direction: 'usdToCrypto' });
// //       if (res.data?.success) {
// //         setConvertedAmount(res.data.data?.amount ?? 0);
// //       } else {
// //         setConvertError(res.data?.message || 'Conversion failed');
// //       }
// //     } catch (err) {
// //       setConvertError(err.message || 'Network error');
// //     } finally {
// //       setConverting(false);
// //     }
// //   };

// //   const selectedPrice = prices.find((c) => c.id === selectedCoin) || { name: 'BTC', price: 0, change24h: 0 };

// //   return (
// //     <div className="min-h-screen bg-gray-50 dark:bg-gray-950 text-gray-900 dark:text-gray-100 p-6 md:p-8">
// //       <div className="max-w-7xl mx-auto space-y-10">

// //         {/* Page title */}
// //         <motion.h1
// //           initial={{ opacity: 0, y: -20 }}
// //           animate={{ opacity: 1, y: 0 }}
// //           className="text-3xl md:text-4xl font-bold text-orange-600"
// //         >
// //           Crypto Market
// //         </motion.h1>

// //         {error && (
// //           <div className="bg-red-100 dark:bg-red-900/30 border border-red-400 text-red-700 dark:text-red-300 px-4 py-3 rounded-xl">
// //             {error}
// //           </div>
// //         )}

// //         {/* Live prices table */}
// //         <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl shadow-md overflow-auto">
// //           <div className="p-6 border-b border-gray-200 dark:border-gray-800">
// //             <h2 className="text-xl font-semibold text-orange-500">Live Prices</h2>
// //           </div>

// //           {loadingPrices ? (
// //             <div className="p-10 text-center">Loading prices...</div>
// //           ) : prices.length === 0 ? (
// //             <div className="p-10 text-center text-gray-500">No price data</div>
// //           ) : (
// //             <div className="overflow-x-auto">
// //               <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-800">
// //                 <thead className="bg-gray-50 dark:bg-gray-800">
// //                   <tr>
// //                     <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Coin</th>
// //                     <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Price (USD)</th>
// //                     <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">24h Change</th>
// //                     <th className="hidden md:table-cell px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Market Cap</th>
// //                   </tr>
// //                 </thead>
// //                 <tbody className="divide-y divide-gray-200 dark:divide-gray-800">
// //                   {prices.map((coin) => (
// //                     <tr
// //                       key={coin.id}
// //                       className={`cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-800/50 ${
// //                         selectedCoin === coin.id ? 'bg-orange-50 dark:bg-orange-950/30' : ''
// //                       }`}
// //                       onClick={() => setSelectedCoin(coin.id)}
// //                     >
// //                       <td className="px-6 py-4 font-medium">{coin.name}</td>
// //                       <td className="px-6 py-4 text-right">${coin.price.toLocaleString(undefined, { minimumFractionDigits: 2 })}</td>
// //                       <td className={`px-6 py-4 text-right font-medium ${coin.change24h >= 0 ? 'text-emerald-600' : 'text-red-600'}`}>
// //                         {coin.change24h >= 0 ? '+' : ''}{coin.change24h.toFixed(2)}%
// //                       </td>
// //                       <td className="hidden md:table-cell px-6 py-4 text-right">${coin.marketCap.toLocaleString()}</td>
// //                     </tr>
// //                   ))}
// //                 </tbody>
// //               </table>
// //             </div>
// //           )}
// //         </div>

// //         {/* Chart + Converter */}
// //         <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">

// //           {/* Price Chart */}
// //           <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl p-6 shadow-md">
// //             <div className="flex justify-between items-center mb-6 flex-wrap gap-4">
// //               <h2 className="text-xl font-semibold text-orange-500">{selectedPrice.name} Price Chart</h2>
// //               <div className="text-right">
// //                 <p className="text-2xl font-bold">${selectedPrice.price.toLocaleString(undefined, { minimumFractionDigits: 2 })}</p>
// //                 <p className={`text-sm ${selectedPrice.change24h >= 0 ? 'text-emerald-500' : 'text-red-500'}`}>
// //                   {selectedPrice.change24h >= 0 ? '+' : ''}{selectedPrice.change24h.toFixed(2)}% (24h)
// //                 </p>
// //               </div>
// //             </div>

// //             {loadingChart ? (
// //               <div className="h-80 flex items-center justify-center">Loading chart...</div>
// //             ) : chartData.length ? (
// //               <div className="h-80">
// //                 <ResponsiveContainer width="100%" height="100%">
// //                   <LineChart data={chartData}>
// //                     <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
// //                     <XAxis dataKey="time" stroke="#9ca3af" />
// //                     <YAxis stroke="#9ca3af" />
// //                     <Tooltip formatter={(v) => [`$${v.toLocaleString()}`, 'Price']} />
// //                     <Legend />
// //                     <Line type="monotone" dataKey="price" stroke="#f97316" strokeWidth={2} dot={false} />
// //                   </LineChart>
// //                 </ResponsiveContainer>
// //               </div>
// //             ) : (
// //               <div className="h-80 flex items-center justify-center text-gray-500">No chart data</div>
// //             )}
// //           </div>

// //           {/* USD → Crypto Converter */}
// //           <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl p-6 shadow-md">
// //             <h2 className="text-xl font-semibold text-orange-500 mb-6">USD → Crypto Converter</h2>
// //             <div className="space-y-6">
// //               <div>
// //                 <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Amount in USD</label>
// //                 <input
// //                   type="number"
// //                   value={usdAmount}
// //                   onChange={(e) => { setUsdAmount(e.target.value); setConvertedAmount(null); setConvertError(null); }}
// //                   placeholder="100.00"
// //                   min="0.01"
// //                   step="any"
// //                   className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500"
// //                 />
// //               </div>

// //               <div>
// //                 <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Cryptocurrency</label>
// //                 <select
// //                   value={selectedCoin}
// //                   onChange={(e) => { setSelectedCoin(e.target.value); setConvertedAmount(null); setConvertError(null); }}
// //                   className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500"
// //                 >
// //                   {prices.map((coin) => <option key={coin.id} value={coin.id}>{coin.name}</option>)}
// //                 </select>
// //               </div>

// //               <button
// //                 onClick={handleConvert}
// //                 disabled={converting || !usdAmount || Number(usdAmount) <= 0 || !selectedCoin}
// //                 className={`w-full bg-gradient-to-r from-orange-600 to-orange-500 text-white font-semibold py-3 rounded-xl shadow-md transition ${converting || !usdAmount || Number(usdAmount) <= 0 || !selectedCoin ? 'opacity-50 cursor-not-allowed' : 'hover:opacity-90'}`}
// //               >
// //                 {converting ? 'Converting...' : 'Convert'}
// //               </button>

// //               {convertedAmount !== null && (
// //                 <div className="mt-4 p-4 bg-green-50 dark:bg-green-950/30 border border-green-200 dark:border-green-800 rounded-xl text-center">
// //                   <p className="text-lg font-medium">≈ {Number(convertedAmount).toFixed(8)} {selectedPrice.name}</p>
// //                   <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">for ${Number(usdAmount).toLocaleString(undefined, { minimumFractionDigits: 2 })}</p>
// //                 </div>
// //               )}

// //               {convertError && (
// //                 <div className="mt-4 p-4 bg-red-50 dark:bg-red-950/30 border border-red-200 dark:border-red-800 rounded-xl text-center text-red-700 dark:text-red-300">
// //                   {convertError}
// //                 </div>
// //               )}
// //             </div>
// //           </div>

// //         </div>
// //       </div>
// //     </div>
// //   );
// // }





// import React, { useState, useEffect } from 'react';
// import { motion } from 'framer-motion';
// import {
//   LineChart,
//   Line,
//   XAxis,
//   YAxis,
//   CartesianGrid,
//   Tooltip,
//   ResponsiveContainer,
//   Legend,
// } from 'recharts';
// import { format } from 'date-fns';
// import { getCryptoPrices, getCryptoChart, convertUsdToCrypto } from '../../api/cryptoApi';

// export default function CryptoPage() {
//   // ----------------- States -----------------
//   const [prices, setPrices] = useState([]);
//   const [selectedCoin, setSelectedCoin] = useState(() => localStorage.getItem('selectedCoin') || '');
//   const [chartData, setChartData] = useState([]);
//   const [loadingPrices, setLoadingPrices] = useState(true);
//   const [loadingChart, setLoadingChart] = useState(true);
//   const [error, setError] = useState(null);

//   const [usdAmount, setUsdAmount] = useState(() => localStorage.getItem('usdAmount') || '');
//   const [convertedAmount, setConvertedAmount] = useState(null);
//   const [converting, setConverting] = useState(false);
//   const [convertError, setConvertError] = useState(null);

//   // ----------------- Fetch Prices -----------------
//   useEffect(() => {
//     const fetchPrices = async () => {
//       try {
//         setLoadingPrices(true);
//         const res = await getCryptoPrices();
//         console.log('getCryptoPrices response:', res);

//         if (res.data?.success) {
//           const coinData = res.data.data || {};
//           const formatted = Object.keys(coinData).map((key) => ({
//             id: key,
//             name: coinData[key]?.name || key.toUpperCase(),
//             price: coinData[key]?.market_data?.current_price?.usd || 0,
//             change24h: coinData[key]?.market_data?.price_change_percentage_24h || 0,
//             marketCap: coinData[key]?.market_data?.market_cap?.usd || 0,
//           }));

//           setPrices(formatted);

//           // If no selectedCoin, pick first available
//           if (!selectedCoin && formatted.length > 0) {
//             setSelectedCoin(formatted[0].id);
//             localStorage.setItem('selectedCoin', formatted[0].id);
//           }
//         } else {
//           throw new Error(res.data?.message || 'Failed to load prices');
//         }
//       } catch (err) {
//         console.error('Fetch prices error:', err);
//         setError(err.message || 'Failed to fetch prices');
//       } finally {
//         setLoadingPrices(false);
//       }
//     };

//     fetchPrices();
//     const interval = setInterval(fetchPrices, 60000); // refresh every 60s
//     return () => clearInterval(interval);
//   }, [selectedCoin]);

//   // ----------------- Fetch Chart -----------------
//   useEffect(() => {
//     const fetchChart = async () => {
//       if (!selectedCoin) return;
//       try {
//         setLoadingChart(true);
//         const res = await getCryptoChart(selectedCoin);
//         console.log('getCryptoChart response:', res);

//         if (res.data?.success) {
//           const formatted = res.data.data.map((item) => ({
//             time: format(new Date(item.time), 'MMM dd HH:mm'),
//             price: item.price,
//           }));
//           setChartData(formatted);
//         } else {
//           throw new Error(res.data?.message || 'Failed to load chart');
//         }
//       } catch (err) {
//         console.error('Fetch chart error:', err);
//         setError(err.message || 'Failed to fetch chart data');
//       } finally {
//         setLoadingChart(false);
//       }
//     };

//     fetchChart();
//   }, [selectedCoin]);

//   // ----------------- Convert USD → Crypto -----------------
//   const handleConvert = async () => {
//     setConvertError(null);
//     setConvertedAmount(null);

//     const amountNum = Number(usdAmount);
//     if (!usdAmount || isNaN(amountNum) || amountNum <= 0) {
//       setConvertError('Enter a valid USD amount > 0');
//       return;
//     }
//     if (!selectedCoin) {
//       setConvertError('Select a cryptocurrency');
//       return;
//     }

//     try {
//       setConverting(true);
//       const res = await convertUsdToCrypto({
//         amount: amountNum,
//         cryptoId: selectedCoin,
//         direction: 'usdToCrypto',
//       });
//       console.log('convertUsdToCrypto response:', res);

//       if (res.data?.success) {
//         setConvertedAmount(res.data.data?.amount ?? 0);
//       } else {
//         setConvertError(res.data?.message || 'Conversion failed');
//       }
//     } catch (err) {
//       console.error('Conversion error:', err);
//       setConvertError(err.message || 'Network error');
//     } finally {
//       setConverting(false);
//     }
//   };

//   // ----------------- Handlers for persistence -----------------
//   const handleCoinChange = (coinId) => {
//     setSelectedCoin(coinId);
//     localStorage.setItem('selectedCoin', coinId);
//     setConvertedAmount(null);
//     setConvertError(null);
//   };

//   const handleUsdChange = (value) => {
//     setUsdAmount(value);
//     localStorage.setItem('usdAmount', value);
//     setConvertedAmount(null);
//     setConvertError(null);
//   };

//   const selectedPrice = prices.find((c) => c.id === selectedCoin) || { name: 'BTC', price: 0, change24h: 0 };

//   // ----------------- JSX -----------------
//   return (
//     <div className="min-h-screen bg-gray-50 dark:bg-gray-950 text-gray-900 dark:text-gray-100 p-6 md:p-8">
//       <div className="max-w-7xl mx-auto space-y-10">
//         {/* Title */}
//         <motion.h1 initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="text-3xl md:text-4xl font-bold text-orange-600">
//           Crypto Market
//         </motion.h1>

//         {/* Error */}
//         {error && (
//           <div className="bg-red-100 dark:bg-red-900/30 border border-red-400 text-red-700 dark:text-red-300 px-4 py-3 rounded-xl">
//             {error}
//           </div>
//         )}

//         {/* Prices Table */}
//         <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl shadow-md overflow-auto">
//           <div className="p-6 border-b border-gray-200 dark:border-gray-800">
//             <h2 className="text-xl font-semibold text-orange-500">Live Prices</h2>
//           </div>

//           {loadingPrices ? (
//             <div className="p-10 text-center">Loading prices...</div>
//           ) : prices.length === 0 ? (
//             <div className="p-10 text-center text-gray-500">No price data</div>
//           ) : (
//             <div className="overflow-x-auto">
//               <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-800">
//                 <thead className="bg-gray-50 dark:bg-gray-800">
//                   <tr>
//                     <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Coin</th>
//                     <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Price (USD)</th>
//                     <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">24h Change</th>
//                     <th className="hidden md:table-cell px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Market Cap</th>
//                   </tr>
//                 </thead>
//                 <tbody className="divide-y divide-gray-200 dark:divide-gray-800">
//                   {prices.map((coin) => (
//                     <tr
//                       key={coin.id}
//                       className={`cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-800/50 ${selectedCoin === coin.id ? 'bg-orange-50 dark:bg-orange-950/30' : ''}`}
//                       onClick={() => handleCoinChange(coin.id)}
//                     >
//                       <td className="px-6 py-4 font-medium">{coin.name}</td>
//                       <td className="px-6 py-4 text-right">${coin.price.toLocaleString(undefined, { minimumFractionDigits: 2 })}</td>
//                       <td className={`px-6 py-4 text-right font-medium ${coin.change24h >= 0 ? 'text-emerald-600' : 'text-red-600'}`}>
//                         {coin.change24h >= 0 ? '+' : ''}{coin.change24h.toFixed(2)}%
//                       </td>
//                       <td className="hidden md:table-cell px-6 py-4 text-right">${coin.marketCap.toLocaleString()}</td>
//                     </tr>
//                   ))}
//                 </tbody>
//               </table>
//             </div>
//           )}
//         </div>

//         {/* Chart + Converter */}
//         <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">

//           {/* Price Chart */}
//           <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl p-6 shadow-md">
//             <div className="flex justify-between items-center mb-6 flex-wrap gap-4">
//               <h2 className="text-xl font-semibold text-orange-500">{selectedPrice.name} Price Chart</h2>
//               <div className="text-right">
//                 <p className="text-2xl font-bold">${selectedPrice.price.toLocaleString(undefined, { minimumFractionDigits: 2 })}</p>
//                 <p className={`text-sm ${selectedPrice.change24h >= 0 ? 'text-emerald-500' : 'text-red-500'}`}>
//                   {selectedPrice.change24h >= 0 ? '+' : ''}{selectedPrice.change24h.toFixed(2)}% (24h)
//                 </p>
//               </div>
//             </div>

//             {loadingChart ? (
//               <div className="h-80 flex items-center justify-center">Loading chart...</div>
//             ) : chartData.length ? (
//               <div className="h-80">
//                 <ResponsiveContainer width="100%" height="100%">
//                   <LineChart data={chartData}>
//                     <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
//                     <XAxis dataKey="time" stroke="#9ca3af" />
//                     <YAxis stroke="#9ca3af" />
//                     <Tooltip formatter={(v) => [`$${v.toLocaleString()}`, 'Price']} />
//                     <Legend />
//                     <Line type="monotone" dataKey="price" stroke="#f97316" strokeWidth={2} dot={false} />
//                   </LineChart>
//                 </ResponsiveContainer>
//               </div>
//             ) : (
//               <div className="h-80 flex items-center justify-center text-gray-500">No chart data</div>
//             )}
//           </div>

//           {/* USD → Crypto Converter */}
//           <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl p-6 shadow-md">
//             <h2 className="text-xl font-semibold text-orange-500 mb-6">USD → Crypto Converter</h2>
//             <div className="space-y-6">
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Amount in USD</label>
//                 <input
//                   type="number"
//                   value={usdAmount}
//                   onChange={(e) => handleUsdChange(e.target.value)}
//                   placeholder="100.00"
//                   min="0.01"
//                   step="any"
//                   className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500"
//                 />
//               </div>

//               <div>
//                 <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Cryptocurrency</label>
//                 <select
//                   value={selectedCoin}
//                   onChange={(e) => handleCoinChange(e.target.value)}
//                   className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500"
//                 >
//                   {prices.map((coin) => <option key={coin.id} value={coin.id}>{coin.name}</option>)}
//                 </select>
//               </div>

//               <button
//                 onClick={handleConvert}
//                 disabled={converting || !usdAmount || Number(usdAmount) <= 0 || !selectedCoin}
//                 className={`w-full bg-gradient-to-r from-orange-600 to-orange-500 text-white font-semibold py-3 rounded-xl shadow-md transition ${converting || !usdAmount || Number(usdAmount) <= 0 || !selectedCoin ? 'opacity-50 cursor-not-allowed' : 'hover:opacity-90'}`}
//               >
//                 {converting ? 'Converting...' : 'Convert'}
//               </button>

//               {convertedAmount !== null && (
//                 <div className="mt-4 p-4 bg-green-50 dark:bg-green-950/30 border border-green-200 dark:border-green-800 rounded-xl text-center">
//                   <p className="text-lg font-medium">≈ {Number(convertedAmount).toFixed(8)} {selectedPrice.name}</p>
//                   <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">for ${Number(usdAmount).toLocaleString(undefined, { minimumFractionDigits: 2 })}</p>
//                 </div>
//               )}

//               {convertError && (
//                 <div className="mt-4 p-4 bg-red-50 dark:bg-red-950/30 border border-red-200 dark:border-red-800 rounded-xl text-center text-red-700 dark:text-red-300">
//                   {convertError}
//                 </div>
//               )}
//             </div>
//           </div>

//         </div>
//       </div>
//     </div>
//   );
// }



// import React, { useState, useEffect } from 'react';
// import { motion } from 'framer-motion';
// import {
//   LineChart,
//   Line,
//   XAxis,
//   YAxis,
//   CartesianGrid,
//   Tooltip,
//   ResponsiveContainer,
//   Legend,
// } from 'recharts';
// import { format } from 'date-fns';
// import { getCryptoPrices, getCryptoChart, convertUsdToCrypto } from '../../api/cryptoApi';

// export default function CryptoPage() {
//   // ----------------- States -----------------
//   const [prices, setPrices] = useState([]);
//   const [selectedCoin, setSelectedCoin] = useState(() => localStorage.getItem('selectedCoin') || '');
//   const [chartData, setChartData] = useState([]);
//   const [loadingPrices, setLoadingPrices] = useState(true);
//   const [loadingChart, setLoadingChart] = useState(true);
//   const [error, setError] = useState(null);

//   const [usdAmount, setUsdAmount] = useState(() => localStorage.getItem('usdAmount') || '');
//   const [convertedAmount, setConvertedAmount] = useState(null);
//   const [converting, setConverting] = useState(false);
//   const [convertError, setConvertError] = useState(null);

//   // ----------------- Fetch Prices -----------------
//   useEffect(() => {
//     const fetchPrices = async () => {
//       try {
//         setError(null);
//         setLoadingPrices(true);

//         const res = await getCryptoPrices();
//         console.log('getCryptoPrices response:', res);

//         if (res.status === 200 && res.data?.success) {
//           const coinData = res.data.data || {};
//           const formatted = Object.keys(coinData).map((key) => ({
//             id: key,
//             name: coinData[key]?.name || key.toUpperCase(),
//             price: coinData[key]?.market_data?.current_price?.usd || 0,
//             change24h: coinData[key]?.market_data?.price_change_percentage_24h || 0,
//             marketCap: coinData[key]?.market_data?.market_cap?.usd || 0,
//           }));

//           setPrices(formatted);

//           if (!selectedCoin && formatted.length > 0) {
//             setSelectedCoin(formatted[0].id);
//             localStorage.setItem('selectedCoin', formatted[0].id);
//           }
//         } else {
//           throw new Error(res.data?.message || 'Failed to load crypto prices');
//         }
//       } catch (err) {
//         console.error('Fetch prices error:', err);
//         setError(err.response?.data?.message || err.message || 'Server error while fetching prices');
//       } finally {
//         setLoadingPrices(false);
//       }
//     };

//     fetchPrices();
//     const interval = setInterval(fetchPrices, 60000);
//     return () => clearInterval(interval);
//   }, [selectedCoin]);

//   // ----------------- Fetch Chart -----------------
//   useEffect(() => {
//    const fetchChart = async () => {
//   if (!selectedCoin) return;
//   try {
//     setError(null);
//     setLoadingChart(true);

//     const res = await getCryptoChart(selectedCoin);
//     console.log('getCryptoChart response:', res);

//     if (res.status === 200 && res.data?.success) {
//       let chartArray = res.data.data;

//       // If data is not an array, try extracting a nested array
//       if (!Array.isArray(chartArray)) {
//         if (res.data.data.prices) chartArray = res.data.data.prices;
//         else chartArray = [];
//       }

//       const formatted = chartArray.map(item => {
//         // Handle [timestamp, price] format or {time, price} object
//         if (Array.isArray(item)) {
//           return {
//             time: format(new Date(item[0]), 'MMM dd HH:mm'),
//             price: item[1],
//           };
//         } else {
//           return {
//             time: format(new Date(item.time), 'MMM dd HH:mm'),
//             price: item.price,
//           };
//         }
//       });

//       setChartData(formatted);
//     } else {
//       throw new Error(res.data?.message || 'Failed to load chart');
//     }
//   } catch (err) {
//     console.error('Fetch chart error:', err);
//     setError(err.response?.data?.message || err.message || 'Server error while fetching chart');
//   } finally {
//     setLoadingChart(false);
//   }
// };


//     fetchChart();
//   }, [selectedCoin]);

//   // ----------------- Convert USD → Crypto -----------------
//   const handleConvert = async () => {
//     setConvertError(null);
//     setConvertedAmount(null);

//     const amountNum = Number(usdAmount);
//     if (!usdAmount || isNaN(amountNum) || amountNum <= 0) {
//       setConvertError('Enter a valid USD amount > 0');
//       return;
//     }
//     if (!selectedCoin) {
//       setConvertError('Select a cryptocurrency');
//       return;
//     }

//     try {
//       setConverting(true);

//       const res = await convertUsdToCrypto({
//         amount: amountNum,
//         cryptoId: selectedCoin,
//       });
//       console.log('convertUsdToCrypto response:', res);

//       if (res.status === 200 && res.data?.success) {
//         setConvertedAmount(res.data.data?.amount ?? 0);
//       } else {
//         throw new Error(res.data?.message || 'Conversion failed');
//       }
//     } catch (err) {
//       console.error('Conversion error:', err);
//       setConvertError(err.response?.data?.message || err.message || 'Server error during conversion');
//     } finally {
//       setConverting(false);
//     }
//   };

//   // ----------------- Handlers for persistence -----------------
//   const handleCoinChange = (coinId) => {
//     setSelectedCoin(coinId);
//     localStorage.setItem('selectedCoin', coinId);
//     setConvertedAmount(null);
//     setConvertError(null);
//   };

//   const handleUsdChange = (value) => {
//     setUsdAmount(value);
//     localStorage.setItem('usdAmount', value);
//     setConvertedAmount(null);
//     setConvertError(null);
//   };

//   const selectedPrice = prices.find((c) => c.id === selectedCoin) || { name: 'BTC', price: 0, change24h: 0 };

//   // ----------------- JSX -----------------
//   return (
//     <div className="min-h-screen bg-gray-50 dark:bg-gray-950 text-gray-900 dark:text-gray-100 p-6 md:p-8">
//       <div className="max-w-7xl mx-auto space-y-10">
//         {/* Title */}
//         <motion.h1 initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="text-3xl md:text-4xl font-bold text-orange-600">
//           Crypto Market
//         </motion.h1>

//         {/* Error */}
//         {error && (
//           <div className="bg-red-100 dark:bg-red-900/30 border border-red-400 text-red-700 dark:text-red-300 px-4 py-3 rounded-xl">
//             {error}
//           </div>
//         )}

//         {/* Prices Table */}
//         <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl shadow-md overflow-auto">
//           <div className="p-6 border-b border-gray-200 dark:border-gray-800">
//             <h2 className="text-xl font-semibold text-orange-500">Live Prices</h2>
//           </div>

//           {loadingPrices ? (
//             <div className="p-10 text-center">Loading prices...</div>
//           ) : prices.length === 0 ? (
//             <div className="p-10 text-center text-gray-500">No price data</div>
//           ) : (
//             <div className="overflow-x-auto">
//               <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-800">
//                 <thead className="bg-gray-50 dark:bg-gray-800">
//                   <tr>
//                     <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Coin</th>
//                     <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Price (USD)</th>
//                     <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">24h Change</th>
//                     <th className="hidden md:table-cell px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Market Cap</th>
//                   </tr>
//                 </thead>
//                 <tbody className="divide-y divide-gray-200 dark:divide-gray-800">
//                   {prices.map((coin) => (
//                     <tr
//                       key={coin.id}
//                       className={`cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-800/50 ${selectedCoin === coin.id ? 'bg-orange-50 dark:bg-orange-950/30' : ''}`}
//                       onClick={() => handleCoinChange(coin.id)}
//                     >
//                       <td className="px-6 py-4 font-medium">{coin.name}</td>
//                       <td className="px-6 py-4 text-right">${coin.price.toLocaleString(undefined, { minimumFractionDigits: 2 })}</td>
//                       <td className={`px-6 py-4 text-right font-medium ${coin.change24h >= 0 ? 'text-emerald-600' : 'text-red-600'}`}>
//                         {coin.change24h >= 0 ? '+' : ''}{coin.change24h.toFixed(2)}%
//                       </td>
//                       <td className="hidden md:table-cell px-6 py-4 text-right">${coin.marketCap.toLocaleString()}</td>
//                     </tr>
//                   ))}
//                 </tbody>
//               </table>
//             </div>
//           )}
//         </div>

//         {/* Chart + Converter */}
//         <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">

//           {/* Price Chart */}
//           <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl p-6 shadow-md">
//             <div className="flex justify-between items-center mb-6 flex-wrap gap-4">
//               <h2 className="text-xl font-semibold text-orange-500">{selectedPrice.name} Price Chart</h2>
//               <div className="text-right">
//                 <p className="text-2xl font-bold">${selectedPrice.price.toLocaleString(undefined, { minimumFractionDigits: 2 })}</p>
//                 <p className={`text-sm ${selectedPrice.change24h >= 0 ? 'text-emerald-500' : 'text-red-500'}`}>
//                   {selectedPrice.change24h >= 0 ? '+' : ''}{selectedPrice.change24h.toFixed(2)}% (24h)
//                 </p>
//               </div>
//             </div>

//             {loadingChart ? (
//               <div className="h-80 flex items-center justify-center">Loading chart...</div>
//             ) : chartData.length ? (
//               <div className="h-80">
//                 <ResponsiveContainer width="100%" height="100%">
//                   <LineChart data={chartData}>
//                     <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
//                     <XAxis dataKey="time" stroke="#9ca3af" />
//                     <YAxis stroke="#9ca3af" />
//                     <Tooltip formatter={(v) => [`$${v.toLocaleString()}`, 'Price']} />
//                     <Legend />
//                     <Line type="monotone" dataKey="price" stroke="#f97316" strokeWidth={2} dot={false} />
//                   </LineChart>
//                 </ResponsiveContainer>
//               </div>
//             ) : (
//               <div className="h-80 flex items-center justify-center text-gray-500">No chart data</div>
//             )}
//           </div>

//           {/* USD → Crypto Converter */}
//           <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl p-6 shadow-md">
//             <h2 className="text-xl font-semibold text-orange-500 mb-6">USD → Crypto Converter</h2>
//             <div className="space-y-6">
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Amount in USD</label>
//                 <input
//                   type="number"
//                   value={usdAmount}
//                   onChange={(e) => handleUsdChange(e.target.value)}
//                   placeholder="100.00"
//                   min="0.01"
//                   step="any"
//                   className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500"
//                 />
//               </div>

//               <div>
//                 <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Cryptocurrency</label>
//                 <select
//                   value={selectedCoin}
//                   onChange={(e) => handleCoinChange(e.target.value)}
//                   className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500"
//                 >
//                   {prices.map((coin) => <option key={coin.id} value={coin.id}>{coin.name}</option>)}
//                 </select>
//               </div>

//               <button
//                 onClick={handleConvert}
//                 disabled={converting || !usdAmount || Number(usdAmount) <= 0 || !selectedCoin}
//                 className={`w-full bg-gradient-to-r from-orange-600 to-orange-500 text-white font-semibold py-3 rounded-xl shadow-md transition ${converting || !usdAmount || Number(usdAmount) <= 0 || !selectedCoin ? 'opacity-50 cursor-not-allowed' : 'hover:opacity-90'}`}
//               >
//                 {converting ? 'Converting...' : 'Convert'}
//               </button>

//               {convertedAmount !== null && (
//                 <div className="mt-4 p-4 bg-green-50 dark:bg-green-950/30 border border-green-200 dark:border-green-800 rounded-xl text-center">
//                   <p className="text-lg font-medium">≈ {Number(convertedAmount).toFixed(8)} {selectedPrice.name}</p>
//                   <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">for ${Number(usdAmount).toLocaleString(undefined, { minimumFractionDigits: 2 })}</p>
//                 </div>
//               )}

//               {convertError && (
//                 <div className="mt-4 p-4 bg-red-50 dark:bg-red-950/30 border border-red-200 dark:border-red-800 rounded-xl text-center text-red-700 dark:text-red-300">
//                   {convertError}
//                 </div>
//               )}
//             </div>
//           </div>

//         </div>
//       </div>
//     </div>
//   );
// }










// import React, { useState, useEffect } from 'react';
// import { motion } from 'framer-motion';
// import {
//   LineChart,
//   Line,
//   XAxis,
//   YAxis,
//   CartesianGrid,
//   Tooltip,
//   ResponsiveContainer,
//   Legend,
// } from 'recharts';
// import { format } from 'date-fns';
// import { getCryptoPrices, getCryptoChart, convertUsdToCrypto } from '../../api/cryptoApi';

// export default function CryptoPage() {
//   // ----------------- States -----------------
//   const [prices, setPrices] = useState([]);
//   const [selectedCoin, setSelectedCoin] = useState(() => localStorage.getItem('selectedCoin') || '');
//   const [chartData, setChartData] = useState([]);
//   const [loadingPrices, setLoadingPrices] = useState(true);
//   const [loadingChart, setLoadingChart] = useState(true);
//   const [error, setError] = useState(null);
//   const [usingMockData, setUsingMockData] = useState(false);

//   const [usdAmount, setUsdAmount] = useState(() => localStorage.getItem('usdAmount') || '');
//   const [convertedAmount, setConvertedAmount] = useState(null);
//   const [converting, setConverting] = useState(false);
//   const [convertError, setConvertError] = useState(null);

//   // ----------------- Mock Data -----------------
//   const mockPrices = {
//     bitcoin: { usd: 95434, usd_market_cap: 1907144444282, usd_24h_change: 0.655 },
//     ethereum: { usd: 3324.32, usd_market_cap: 401094828519, usd_24h_change: 1.77 },
//     binancecoin: { usd: 952.6, usd_market_cap: 130090784419, usd_24h_change: 2.64 },
//     ripple: { usd: 2.08, usd_market_cap: 126405050885, usd_24h_change: 1.93 },
//     solana: { usd: 144.13, usd_market_cap: 81530953156, usd_24h_change: 2.07 },
//     tether: { usd: 0.9996, usd_market_cap: 186795754905, usd_24h_change: -0.005 },
//   };

//   const mockChartData = Array.from({ length: 24 }, (_, i) => ({
//     time: format(new Date(Date.now() - (23 - i) * 3600 * 1000), 'MMM dd HH:mm'),
//     price: Math.random() * 100 + (selectedCoin === 'bitcoin' ? 95000 : 3000),
//   }));

//   // ----------------- Fetch Prices -----------------
//   useEffect(() => {
//     const fetchPrices = async () => {
//       try {
//         setError(null);
//         setLoadingPrices(true);
//         setUsingMockData(false);

//         const res = await getCryptoPrices();
//         console.log('getCryptoPrices response:', res);

//         if (res.status === 200 && res.data?.success) {
//           const coinData = res.data.data || {};
//           const formatted = Object.keys(coinData).map((key) => ({
//             id: key,
//             name: key.charAt(0).toUpperCase() + key.slice(1),
//             price: coinData[key]?.usd || 0,
//             change24h: coinData[key]?.usd_24h_change || 0,
//             marketCap: coinData[key]?.usd_market_cap || 0,
//           }));

//           setPrices(formatted);

//           if (!selectedCoin && formatted.length > 0) {
//             setSelectedCoin(formatted[0].id);
//             localStorage.setItem('selectedCoin', formatted[0].id);
//           }
//         } else {
//           throw new Error(res.data?.message || 'Failed to load crypto prices');
//         }
//       } catch (err) {
//         console.error('Fetch prices error:', err);
//         setError('Unable to fetch crypto prices. Using mock data.');
//         setUsingMockData(true);

//         // fallback to mock data
//         const formatted = Object.keys(mockPrices).map((key) => ({
//           id: key,
//           name: key.charAt(0).toUpperCase() + key.slice(1),
//           price: mockPrices[key].usd,
//           change24h: mockPrices[key].usd_24h_change,
//           marketCap: mockPrices[key].usd_market_cap,
//         }));
//         setPrices(formatted);
//         if (!selectedCoin && formatted.length > 0) {
//           setSelectedCoin(formatted[0].id);
//           localStorage.setItem('selectedCoin', formatted[0].id);
//         }
//       } finally {
//         setLoadingPrices(false);
//       }
//     };

//     fetchPrices();
//     const interval = setInterval(fetchPrices, 60000);
//     return () => clearInterval(interval);
//   }, [selectedCoin]);

//   // ----------------- Fetch Chart -----------------
//   useEffect(() => {
//     const fetchChart = async () => {
//       if (!selectedCoin) return;
//       try {
//         setError(null);
//         setLoadingChart(true);
//         setUsingMockData(false);

//         const res = await getCryptoChart(selectedCoin);
//         console.log('getCryptoChart response:', res);

//         if (res.status === 200 && res.data?.success) {
//           let chartArray = res.data.data;

//           if (!Array.isArray(chartArray)) {
//             if (res.data.data.prices) chartArray = res.data.data.prices;
//             else chartArray = [];
//           }

//           const formatted = chartArray.map((item) => {
//             if (Array.isArray(item)) {
//               return {
//                 time: format(new Date(item[0]), 'MMM dd HH:mm'),
//                 price: item[1],
//               };
//             } else {
//               return {
//                 time: format(new Date(item.time), 'MMM dd HH:mm'),
//                 price: item.price,
//               };
//             }
//           });

//           setChartData(formatted);
//         } else {
//           throw new Error(res.data?.message || 'Failed to load chart');
//         }
//       } catch (err) {
//         console.error('Fetch chart error:', err);
//         setError('Unable to fetch chart data. Using mock chart.');
//         setUsingMockData(true);
//         setChartData(mockChartData);
//       } finally {
//         setLoadingChart(false);
//       }
//     };

//     fetchChart();
//   }, [selectedCoin]);

//   // ----------------- Convert USD → Crypto -----------------
//   const handleConvert = async () => {
//     setConvertError(null);
//     setConvertedAmount(null);

//     const amountNum = Number(usdAmount);
//     if (!usdAmount || isNaN(amountNum) || amountNum <= 0) {
//       setConvertError('Enter a valid USD amount > 0');
//       return;
//     }
//     if (!selectedCoin) {
//       setConvertError('Select a cryptocurrency');
//       return;
//     }

//     try {
//       setConverting(true);

//       const res = await convertUsdToCrypto({
//         amount: amountNum,
//         cryptoId: selectedCoin,
//       });
//       console.log('convertUsdToCrypto response:', res);

//       if (res.status === 200 && res.data?.success) {
//         setConvertedAmount(res.data.data?.amount ?? 0);
//       } else {
//         throw new Error(res.data?.message || 'Conversion failed');
//       }
//     } catch (err) {
//       console.error('Conversion error:', err);
//       setConvertError(err.response?.data?.message || err.message || 'Server error during conversion');
//     } finally {
//       setConverting(false);
//     }
//   };

//   // ----------------- Handlers for persistence -----------------
//   const handleCoinChange = (coinId) => {
//     setSelectedCoin(coinId);
//     localStorage.setItem('selectedCoin', coinId);
//     setConvertedAmount(null);
//     setConvertError(null);
//   };

//   const handleUsdChange = (value) => {
//     setUsdAmount(value);
//     localStorage.setItem('usdAmount', value);
//     setConvertedAmount(null);
//     setConvertError(null);
//   };

//   const selectedPrice = prices.find((c) => c.id === selectedCoin) || { name: 'BTC', price: 0, change24h: 0 };

//   // ----------------- JSX -----------------
//   return (
//     <div className="min-h-screen bg-gray-50 dark:bg-gray-950 text-gray-900 dark:text-gray-100 p-6 md:p-8">
//       <div className="max-w-7xl mx-auto space-y-10">
//         {/* Title */}
//         <motion.h1 initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="text-3xl md:text-4xl font-bold text-orange-600">
//           Crypto Market {usingMockData && '(Mock Data)'}
//         </motion.h1>

//         {/* Error */}
//         {error && (
//           <div className="bg-red-100 dark:bg-red-900/30 border border-red-400 text-red-700 dark:text-red-300 px-4 py-3 rounded-xl">
//             {error}
//           </div>
//         )}

//         {/* Prices Table */}
//         <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl shadow-md overflow-auto">
//           <div className="p-6 border-b border-gray-200 dark:border-gray-800">
//             <h2 className="text-xl font-semibold text-orange-500">Live Prices</h2>
//           </div>

//           {loadingPrices ? (
//             <div className="p-10 text-center">Loading prices...</div>
//           ) : prices.length === 0 ? (
//             <div className="p-10 text-center text-gray-500">No price data</div>
//           ) : (
//             <div className="overflow-x-auto">
//               <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-800">
//                 <thead className="bg-gray-50 dark:bg-gray-800">
//                   <tr>
//                     <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Coin</th>
//                     <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Price (USD)</th>
//                     <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">24h Change</th>
//                     <th className="hidden md:table-cell px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Market Cap</th>
//                   </tr>
//                 </thead>
//                 <tbody className="divide-y divide-gray-200 dark:divide-gray-800">
//                   {prices.map((coin) => (
//                     <tr
//                       key={coin.id}
//                       className={`cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-800/50 ${selectedCoin === coin.id ? 'bg-orange-50 dark:bg-orange-950/30' : ''}`}
//                       onClick={() => handleCoinChange(coin.id)}
//                     >
//                       <td className="px-6 py-4 font-medium">{coin.name}</td>
//                       <td className="px-6 py-4 text-right">${coin.price.toLocaleString(undefined, { minimumFractionDigits: 2 })}</td>
//                       <td className={`px-6 py-4 text-right font-medium ${coin.change24h >= 0 ? 'text-emerald-600' : 'text-red-600'}`}>
//                         {coin.change24h >= 0 ? '+' : ''}{coin.change24h.toFixed(2)}%
//                       </td>
//                       <td className="hidden md:table-cell px-6 py-4 text-right">${coin.marketCap.toLocaleString()}</td>
//                     </tr>
//                   ))}
//                 </tbody>
//               </table>
//             </div>
//           )}
//         </div>

//         {/* Chart + Converter */}
//         <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
//           {/* Price Chart */}
//           <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl p-6 shadow-md">
//             <div className="flex justify-between items-center mb-6 flex-wrap gap-4">
//               <h2 className="text-xl font-semibold text-orange-500">{selectedPrice.name} Price Chart</h2>
//               <div className="text-right">
//                 <p className="text-2xl font-bold">${selectedPrice.price.toLocaleString(undefined, { minimumFractionDigits: 2 })}</p>
//                 <p className={`text-sm ${selectedPrice.change24h >= 0 ? 'text-emerald-500' : 'text-red-500'}`}>
//                   {selectedPrice.change24h >= 0 ? '+' : ''}{selectedPrice.change24h.toFixed(2)}% (24h)
//                 </p>
//               </div>
//             </div>

//             {loadingChart ? (
//               <div className="h-80 flex items-center justify-center">Loading chart...</div>
//             ) : chartData.length ? (
//               <div className="h-80">
//                 <ResponsiveContainer width="100%" height="100%">
//                   <LineChart data={chartData}>
//                     <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
//                     <XAxis dataKey="time" stroke="#9ca3af" />
//                     <YAxis stroke="#9ca3af" />
//                     <Tooltip formatter={(v) => [`$${v.toLocaleString()}`, 'Price']} />
//                     <Legend />
//                     <Line type="monotone" dataKey="price" stroke="#f97316" strokeWidth={2} dot={false} />
//                   </LineChart>
//                 </ResponsiveContainer>
//               </div>
//             ) : (
//               <div className="h-80 flex items-center justify-center text-gray-500">No chart data</div>
//             )}
//           </div>

//           {/* USD → Crypto Converter */}
//           <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl p-6 shadow-md">
//             <h2 className="text-xl font-semibold text-orange-500 mb-6">USD → Crypto Converter</h2>
//             <div className="space-y-6">
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Amount in USD</label>
//                 <input
//                   type="number"
//                   value={usdAmount}
//                   onChange={(e) => handleUsdChange(e.target.value)}
//                   placeholder="100.00"
//                   min="0.01"
//                   step="any"
//                   className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500"
//                 />
//               </div>

//               <div>
//                 <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Cryptocurrency</label>
//                 <select
//                   value={selectedCoin}
//                   onChange={(e) => handleCoinChange(e.target.value)}
//                   className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500"
//                 >
//                   {prices.map((coin) => <option key={coin.id} value={coin.id}>{coin.name}</option>)}
//                 </select>
//               </div>

//               <button
//                 onClick={handleConvert}
//                 disabled={converting || !usdAmount || Number(usdAmount) <= 0 || !selectedCoin}
//                 className={`w-full bg-gradient-to-r from-orange-600 to-orange-500 text-white font-semibold py-3 rounded-xl shadow-md transition ${converting || !usdAmount || Number(usdAmount) <= 0 || !selectedCoin ? 'opacity-50 cursor-not-allowed' : 'hover:opacity-90'}`}
//               >
//                 {converting ? 'Converting...' : 'Convert'}
//               </button>

//               {convertedAmount !== null && (
//                 <div className="mt-4 p-4 bg-green-50 dark:bg-green-950/30 border border-green-200 dark:border-green-800 rounded-xl text-center">
//                   <p className="text-lg font-medium">≈ {Number(convertedAmount).toFixed(8)} {selectedPrice.name}</p>
//                   <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">for ${Number(usdAmount).toLocaleString(undefined, { minimumFractionDigits: 2 })}</p>
//                 </div>
//               )}

//               {convertError && (
//                 <div className="mt-4 p-4 bg-red-50 dark:bg-red-950/30 border border-red-200 dark:border-red-800 rounded-xl text-center text-red-700 dark:text-red-300">
//                   {convertError}
//                 </div>
//               )}
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }






import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import axios from 'axios';
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
import { format } from 'date-fns';

export default function CryptoPage() {
  // ----------------- States -----------------
  const [prices, setPrices] = useState([]);
  const [selectedCoin, setSelectedCoin] = useState(
    () => localStorage.getItem('selectedCoin') || 'bitcoin'
  );
  const [chartData, setChartData] = useState([]);
  const [loadingPrices, setLoadingPrices] = useState(true);
  const [loadingChart, setLoadingChart] = useState(true);
  const [error, setError] = useState(null);

  const [usdAmount, setUsdAmount] = useState(
    () => localStorage.getItem('usdAmount') || ''
  );
  const [convertedAmount, setConvertedAmount] = useState(null);
  const [converting, setConverting] = useState(false);
  const [convertError, setConvertError] = useState(null);

  // ----------------- APIS -----------------
  const COINGECKO_BASE = 'https://api.coingecko.com/api/v3';

  // ----------------- Fetch Live Prices -----------------
  useEffect(() => {
    const fetchPrices = async () => {
      setLoadingPrices(true);
      setError(null);

      try {
        // Get top coins (BTC, ETH, BNB, XRP, SOL, USDT for example)
        const ids = 'bitcoin,ethereum,binancecoin,ripple,solana,tether';
        const url = `${COINGECKO_BASE}/simple/price`;
        const res = await axios.get(url, {
          params: {
            ids,
            vs_currencies: 'usd',
            include_market_cap: true,
            include_24hr_change: true,
          },
        });

        const data = res.data;
        // Transform to array
        const formatted = Object.keys(data).map((id) => ({
          id,
          name: id.charAt(0).toUpperCase() + id.slice(1),
          price: data[id]?.usd || 0,
          change24h: data[id]?.usd_24h_change || 0,
          marketCap: data[id]?.usd_market_cap || 0,
        }));

        setPrices(formatted);

        if (!selectedCoin && formatted.length > 0) {
          setSelectedCoin(formatted[0].id);
          localStorage.setItem('selectedCoin', formatted[0].id);
        }
      } catch (err) {
        console.error('Fetch live prices error:', err);
        setError('Could not fetch live crypto prices.');
      } finally {
        setLoadingPrices(false);
      }
    };

    fetchPrices();
    const interval = setInterval(fetchPrices, 60000); // refresh every 60s
    return () => clearInterval(interval);
  }, [selectedCoin]);

  // ----------------- Fetch Live Chart -----------------
  useEffect(() => {
    const fetchChart = async () => {
      if (!selectedCoin) return;

      setLoadingChart(true);
      setError(null);

      try {
        // Get 1 day chart (last 24h, hourly)
        const url = `${COINGECKO_BASE}/coins/${selectedCoin}/market_chart`;
        const res = await axios.get(url, {
          params: {
            vs_currency: 'usd',
            days: 1,
          },
        });

        const pricesArr = res.data.prices || [];
        const formatted = pricesArr.map((item) => ({
          time: format(new Date(item[0]), 'HH:mm'),
          price: item[1],
        }));

        setChartData(formatted);
      } catch (err) {
        console.error('Fetch chart error:', err);
        setError('Could not load live chart data.');
      } finally {
        setLoadingChart(false);
      }
    };

    fetchChart();
  }, [selectedCoin]);

  // ----------------- Convert USD → Crypto -----------------
  const handleConvert = () => {
    setConvertError(null);
    setConvertedAmount(null);

    const amountNum = Number(usdAmount);
    if (!usdAmount || isNaN(amountNum) || amountNum <= 0) {
      setConvertError('Enter a valid USD amount > 0');
      return;
    }
    if (!selectedCoin) {
      setConvertError('Select a cryptocurrency');
      return;
    }

    const coinObj = prices.find((c) => c.id === selectedCoin);
    if (!coinObj) return;

    const result = amountNum / (coinObj.price || 1);
    setConvertedAmount(result);
  };

  // ----------------- Handlers -----------------
  const handleCoinChange = (e) => {
    setSelectedCoin(e.target.value);
    localStorage.setItem('selectedCoin', e.target.value);
    setConvertedAmount(null);
    setConvertError(null);
  };

  const handleUsdChange = (val) => {
    setUsdAmount(val);
    localStorage.setItem('usdAmount', val);
    setConvertedAmount(null);
    setConvertError(null);
  };

  const selectedPrice =
    prices.find((c) => c.id === selectedCoin) || { name: '', price: 0, change24h: 0 };

  // ----------------- JSX -----------------
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 text-gray-900 dark:text-gray-100 p-4 md:p-8">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Title */}
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-3xl md:text-4xl font-bold text-orange-600 text-center"
        >
          Crypto Market (Live)
        </motion.h1>

        {/* Error Message */}
        {error && (
          <div className="bg-red-200 text-red-800 p-3 rounded-md text-center">
            {error}
          </div>
        )}

        {/* Prices Table */}
        <div className="bg-white dark:bg-gray-900 shadow-md rounded-xl overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700 text-sm">
            <thead className="bg-gray-100 dark:bg-gray-800">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-600 dark:text-gray-300 uppercase">
                  Coin
                </th>
                <th className="px-4 py-3 text-right text-xs font-medium text-gray-600 dark:text-gray-300 uppercase">
                  Price (USD)
                </th>
                <th className="px-4 py-3 text-right text-xs font-medium text-gray-600 dark:text-gray-300 uppercase">
                  24h Change
                </th>
                <th className="px-4 py-3 text-right text-xs font-medium text-gray-600 dark:text-gray-300 uppercase">
                  Market Cap
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
              {loadingPrices ? (
                <tr>
                  <td colSpan="4" className="text-center py-6">
                    Loading prices…
                  </td>
                </tr>
              ) : (
                prices.map((coin) => (
                  <tr
                    key={coin.id}
                    className={`cursor-pointer ${
                      selectedCoin === coin.id
                        ? 'bg-orange-50 dark:bg-orange-900/30'
                        : 'hover:bg-gray-100 dark:hover:bg-gray-800'
                    }`}
                    onClick={() => handleCoinChange({ target: { value: coin.id } })}
                  >
                    <td className="px-4 py-2">{coin.name}</td>
                    <td className="px-4 py-2 text-right">
                      ${coin.price.toLocaleString(undefined, { minimumFractionDigits: 2 })}
                    </td>
                    <td
                      className={`px-4 py-2 text-right ${
                        coin.change24h >= 0 ? 'text-emerald-600' : 'text-red-600'
                      }`}
                    >
                      {coin.change24h ? coin.change24h.toFixed(2) + '%' : '—'}
                    </td>
                    <td className="px-4 py-2 text-right">
                      ${coin.marketCap.toLocaleString()}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Chart + Converter */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Live Chart */}
          <div className="bg-white dark:bg-gray-900 shadow-md rounded-xl p-4">
            <h2 className="text-xl font-semibold text-orange-500 mb-3 text-center">
              {selectedPrice.name} Price Chart (24h)
            </h2>
            {loadingChart ? (
              <div className="h-64 flex items-center justify-center">
                Loading chart…
              </div>
            ) : (
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={chartData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                    <XAxis dataKey="time" stroke="#9ca3af" />
                    <YAxis stroke="#9ca3af" domain={['auto', 'auto']} />
                    <Tooltip formatter={(v) => [`$${v.toLocaleString()}`, 'Price']} />
                    <Legend />
                    <Line
                      type="monotone"
                      dataKey="price"
                      stroke="#f97316"
                      strokeWidth={2}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            )}
          </div>

          {/* USD -> Crypto Converter */}
          <div className="bg-white dark:bg-gray-900 shadow-md rounded-xl p-4">
            <h2 className="text-xl font-semibold text-orange-500 mb-4 text-center">
              USD → Crypto Converter
            </h2>

            <div className="flex flex-col gap-4">
              <input
                type="number"
                value={usdAmount}
                onChange={(e) => handleUsdChange(e.target.value)}
                placeholder="Enter USD amount"
                className="p-3 border rounded-lg text-gray-900"
              />

              <select
                value={selectedCoin}
                onChange={handleCoinChange}
                className="p-3 border rounded-lg"
              >
                {prices.map((coin) => (
                  <option value={coin.id} key={coin.id}>
                    {coin.name}
                  </option>
                ))}
              </select>

              <button
                onClick={handleConvert}
                disabled={converting || !usdAmount || Number(usdAmount) <= 0}
                className="bg-orange-600 text-white py-2 rounded-lg font-semibold"
              >
                Convert
              </button>

              {convertedAmount !== null && (
                <div className="text-center text-lg font-medium">
                  ≈ {convertedAmount.toFixed(8)} {selectedPrice.name}
                </div>
              )}

              {convertError && (
                <div className="text-red-600 text-center">{convertError}</div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
