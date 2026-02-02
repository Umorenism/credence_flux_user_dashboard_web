
// // src/components/CryptoPage.jsx
// import React, { useState, useEffect } from 'react';
// import { motion } from 'framer-motion';
// import {
//   ComposedChart,
//   Candlestick,
//   XAxis,
//   YAxis,
//   CartesianGrid,
//   Tooltip,
//   ResponsiveContainer,
//   Bar,
//   YAxis as VolumeYAxis,
// } from 'recharts';
// import { format } from 'date-fns';
// import axios from 'axios';
// import { ToastContainer, toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';

// export default function CryptoPage() {
//   const [prices, setPrices] = useState([]);
//   const [selectedCoin, setSelectedCoin] = useState(
//     () => localStorage.getItem('selectedCrypto') || 'bitcoin'
//   );
//   const [ohlcData, setOhlcData] = useState([]); // for candlestick
//   const [loadingPrices, setLoadingPrices] = useState(true);
//   const [loadingChart, setLoadingChart] = useState(true);
//   const [usdAmount, setUsdAmount] = useState('');
//   const [convertedAmount, setConvertedAmount] = useState(null);

//   const COINGECKO_BASE = 'https://api.coingecko.com/api/v3';

//   // Fetch live prices for table
//   useEffect(() => {
//     const fetchPrices = async () => {
//       setLoadingPrices(true);
//       try {
//         const ids =
//           'bitcoin,ethereum,solana,binancecoin,ripple,cardano,dogecoin,avalanche-2,polkadot,chainlink';
//         const res = await axios.get(`${COINGECKO_BASE}/simple/price`, {
//           params: {
//             ids,
//             vs_currencies: 'usd',
//             include_24hr_change: true,
//             include_market_cap: true,
//           },
//         });

//         const data = res.data;
//         const formatted = Object.keys(data).map((id) => ({
//           id,
//           name: id.charAt(0).toUpperCase() + id.slice(1),
//           price: data[id].usd || 0,
//           change24h: data[id].usd_24h_change || 0,
//           marketCap: data[id].usd_market_cap || 0,
//         }));

//         setPrices(formatted);
//       } catch (err) {
//         toast.error('Failed to load live prices');
//         console.error(err);
//       } finally {
//         setLoadingPrices(false);
//       }
//     };

//     fetchPrices();
//     const interval = setInterval(fetchPrices, 60000);
//     return () => clearInterval(interval);
//   }, []);

//   // Fetch OHLC data for candlestick chart (4h candles, last 30 days)
//   useEffect(() => {
//     const fetchOhlc = async () => {
//       if (!selectedCoin) return;
//       setLoadingChart(true);
//       try {
//         const res = await axios.get(
//           `${COINGECKO_BASE}/coins/${selectedCoin}/ohlc`,
//           {
//             params: { vs_currency: 'usd', days: '30' }, // 30 days of 4h candles
//           }
//         );

//         const ohlcArray = res.data || [];
//         const formatted = ohlcArray.map(([timestamp, open, high, low, close]) => ({
//           time: format(new Date(timestamp), 'MMM dd HH:mm'),
//           open: Number(open.toFixed(2)),
//           high: Number(high.toFixed(2)),
//           low: Number(low.toFixed(2)),
//           close: Number(close.toFixed(2)),
//         }));

//         setOhlcData(formatted);
//       } catch (err) {
//         toast.error('Failed to load candlestick chart');
//         console.error(err);
//       } finally {
//         setLoadingChart(false);
//       }
//     };

//     fetchOhlc();
//   }, [selectedCoin]);

//   // USD → Crypto converter
//   const handleConvert = () => {
//     if (!usdAmount || isNaN(Number(usdAmount)) || Number(usdAmount) <= 0) {
//       toast.warn('Enter a valid USD amount');
//       return;
//     }

//     const coin = prices.find((c) => c.id === selectedCoin);
//     if (!coin || coin.price <= 0) {
//       toast.error('No price data for this coin');
//       return;
//     }

//     const amount = Number(usdAmount) / coin.price;
//     setConvertedAmount(amount.toFixed(8));
//   };

//   const selectedPrice =
//     prices.find((c) => c.id === selectedCoin) || {
//       name: 'Bitcoin',
//       price: 0,
//       change24h: 0,
//       marketCap: 0,
//     };

//   const isPriceUp = selectedPrice.change24h >= 0;

//   return (
//     <div className="min-h-screen bg-gray-50 dark:bg-gray-950 text-gray-900 dark:text-gray-100 p-4 md:p-8">
//       <ToastContainer position="top-right" autoClose={4000} theme="colored" />

//       <motion.h1
//         initial={{ opacity: 0, y: -20 }}
//         animate={{ opacity: 1, y: 0 }}
//         className="text-3xl md:text-4xl font-bold text-orange-600 dark:text-orange-500 mb-8 text-center"
//       >
//         Live Crypto Market
//       </motion.h1>

//       <div className="max-w-7xl mx-auto space-y-10">
//         {/* Prices Table */}
//         <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-xl overflow-hidden border border-gray-200 dark:border-gray-800">
//           <div className="p-6 border-b border-gray-200 dark:border-gray-800">
//             <h2 className="text-2xl font-semibold text-orange-600 dark:text-orange-400">
//               Top Coins – Live Prices & Market Cap
//             </h2>
//             <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
//               Updates every ~60 seconds • Click row to view candlestick chart
//             </p>
//           </div>

//           <div className="overflow-x-auto">
//             <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-800">
//               <thead className="bg-gray-50 dark:bg-gray-800 sticky top-0 z-10">
//                 <tr>
//                   <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600 dark:text-gray-300 uppercase tracking-wider">
//                     Coin
//                   </th>
//                   <th className="px-6 py-4 text-right text-sm font-semibold text-gray-600 dark:text-gray-300 uppercase tracking-wider">
//                     Price (USD)
//                   </th>
//                   <th className="px-6 py-4 text-right text-sm font-semibold text-gray-600 dark:text-gray-300 uppercase tracking-wider">
//                     24h Change
//                   </th>
//                   <th className="hidden md:table-cell px-6 py-4 text-right text-sm font-semibold text-gray-600 dark:text-gray-300 uppercase tracking-wider">
//                     Market Cap
//                   </th>
//                 </tr>
//               </thead>
//               <tbody className="divide-y divide-gray-200 dark:divide-gray-800">
//                 {loadingPrices ? (
//                   <tr>
//                     <td colSpan={4} className="text-center py-10">
//                       <div className="animate-spin rounded-full h-10 w-10 border-t-4 border-orange-500 mx-auto"></div>
//                       <p className="mt-4 text-gray-500 dark:text-gray-400">Loading live market...</p>
//                     </td>
//                   </tr>
//                 ) : (
//                   prices.map((coin) => {
//                     const isUp = coin.change24h >= 0;
//                     return (
//                       <motion.tr
//                         key={coin.id}
//                         whileHover={{ backgroundColor: 'rgba(249, 115, 22, 0.08)' }}
//                         className={`cursor-pointer transition-colors ${
//                           selectedCoin === coin.id ? 'bg-orange-50 dark:bg-orange-950/30' : ''
//                         }`}
//                         onClick={() => {
//                           setSelectedCoin(coin.id);
//                           localStorage.setItem('selectedCrypto', coin.id);
//                         }}
//                       >
//                         <td className="px-6 py-4 font-medium">{coin.name}</td>
//                         <td className="px-6 py-4 text-right font-medium">
//                           ${coin.price.toLocaleString(undefined, { minimumFractionDigits: 2 })}
//                         </td>
//                         <td className={`px-6 py-4 text-right font-bold ${isUp ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}`}>
//                           {isUp ? '↑' : '↓'} {Math.abs(coin.change24h || 0).toFixed(2)}%
//                         </td>
//                         <td className="hidden md:table-cell px-6 py-4 text-right">
//                           ${coin.marketCap?.toLocaleString() || '—'}
//                         </td>
//                       </motion.tr>
//                     );
//                   })
//                 )}
//               </tbody>
//             </table>
//           </div>
//         </div>

//         {/* Candlestick Chart */}
//         <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-xl p-6 border border-gray-200 dark:border-gray-800">
//           <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
//             <h2 className="text-xl md:text-2xl font-bold text-orange-600 dark:text-orange-400">
//               {selectedPrice.name} Candlestick Chart (30 days)
//             </h2>
//             <div className="text-right">
//               <p className="text-2xl md:text-3xl font-bold">
//                 ${selectedPrice.price.toLocaleString(undefined, { minimumFractionDigits: 2 })}
//               </p>
//               <p className={`text-base md:text-lg font-medium ${isPriceUp ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}`}>
//                 {isPriceUp ? '↑' : '↓'}
//                 {Math.abs(selectedPrice.change24h || 0).toFixed(2)}% (24h)
//               </p>
//             </div>
//           </div>

//           <div className="h-80 md:h-96">
//             {loadingChart ? (
//               <div className="h-full flex items-center justify-center">
//                 <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-orange-500"></div>
//                 <p className="ml-4 text-gray-500 dark:text-gray-400">Loading candlestick data...</p>
//               </div>
//             ) : ohlcData.length > 0 ? (
//               <ResponsiveContainer width="100%" height="100%">
//                 <ComposedChart>
//                   <CartesianGrid strokeDasharray="4 4" stroke="#374151" />
//                   <XAxis
//                     dataKey="time"
//                     stroke="#9ca3af"
//                     tick={{ fontSize: 12 }}
//                     interval="preserveStartEnd"
//                   />
//                   <YAxis stroke="#9ca3af" tick={{ fontSize: 12 }} domain={['auto', 'auto']} />
//                   <Tooltip
//                     contentStyle={{
//                       backgroundColor: '#1f2937',
//                       border: 'none',
//                       borderRadius: '8px',
//                       color: 'white',
//                     }}
//                     formatter={(value, name) => [
//                       `$${Number(value).toLocaleString(undefined, { minimumFractionDigits: 2 })}`,
//                       name.charAt(0).toUpperCase() + name.slice(1),
//                     ]}
//                   />
//                   <Legend />

//                   {/* Candlestick */}
//                   <Candlestick
//                     data={ohlcData}
//                     dataKey={['open', 'high', 'low', 'close']}
//                     fill={(entry) => (entry.close >= entry.open ? '#10b981' : '#ef4444')}
//                     stroke={(entry) => (entry.close >= entry.open ? '#10b981' : '#ef4444')}
//                   />
//                 </ComposedChart>
//               </ResponsiveContainer>
//             ) : (
//               <div className="h-full flex items-center justify-center text-gray-500 dark:text-gray-400">
//                 No candlestick data available yet
//               </div>
//             )}
//           </div>
//         </div>

//         {/* USD → Crypto Converter */}
//         <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-xl p-6 border border-gray-200 dark:border-gray-800">
//           <h2 className="text-xl md:text-2xl font-semibold text-orange-600 dark:text-orange-400 mb-6">
//             USD → Crypto Converter
//           </h2>

//           <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
//             <div>
//               <label className="block text-sm font-medium text-gray-600 dark:text-gray-300 mb-2">
//                 Amount (USD)
//               </label>
//               <input
//                 type="number"
//                 value={usdAmount}
//                 onChange={(e) => setUsdAmount(e.target.value)}
//                 placeholder="100.00"
//                 min="0.01"
//                 className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500"
//               />
//             </div>

//             <div>
//               <label className="block text-sm font-medium text-gray-600 dark:text-gray-300 mb-2">
//                 Cryptocurrency
//               </label>
//               <select
//                 value={selectedCoin}
//                 onChange={(e) => setSelectedCoin(e.target.value)}
//                 className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500"
//               >
//                 {prices.map((coin) => (
//                   <option key={coin.id} value={coin.id}>
//                     {coin.name}
//                   </option>
//                 ))}
//               </select>
//             </div>

//             <div className="flex items-end">
//               <button
//                 onClick={handleConvert}
//                 className="w-full bg-gradient-to-r from-orange-600 to-orange-500 text-white font-bold py-3 rounded-xl shadow-lg hover:shadow-xl transition disabled:opacity-60"
//                 disabled={!usdAmount || Number(usdAmount) <= 0 || !selectedCoin}
//               >
//                 Convert Now
//               </button>
//             </div>
//           </div>

//           {convertedAmount !== null && (
//             <motion.div
//               initial={{ opacity: 0, scale: 0.9 }}
//               animate={{ opacity: 1, scale: 1 }}
//               className="mt-6 p-5 bg-green-50 dark:bg-green-900/30 border border-green-200 dark:border-green-800 rounded-2xl text-center"
//             >
//               <p className="text-2xl font-bold text-green-700 dark:text-green-300">
//                 ≈ {Number(convertedAmount).toFixed(8)} {selectedPrice.name}
//               </p>
//               <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
//                 for ${Number(usdAmount).toLocaleString(undefined, { minimumFractionDigits: 2 })}
//               </p>
//             </motion.div>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// }




// src/components/CryptoPage.jsx
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  ComposedChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  ErrorBar,
  Legend,
} from 'recharts';
import { format } from 'date-fns';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function CryptoPage() {
  const [prices, setPrices] = useState([]);
  const [selectedCoin, setSelectedCoin] = useState(
    () => localStorage.getItem('selectedCrypto') || 'bitcoin'
  );
  const [ohlcData, setOhlcData] = useState([]); // for candlestick
  const [loadingPrices, setLoadingPrices] = useState(true);
  const [loadingChart, setLoadingChart] = useState(true);
  const [usdAmount, setUsdAmount] = useState('');
  const [convertedAmount, setConvertedAmount] = useState(null);

  const COINGECKO_BASE = 'https://api.coingecko.com/api/v3';

  // Fetch live prices for table (unchanged)
  useEffect(() => {
    const fetchPrices = async () => {
      setLoadingPrices(true);
      try {
        const ids =
          'bitcoin,ethereum,solana,binancecoin,ripple,cardano,dogecoin,avalanche-2,polkadot,chainlink';
        const res = await axios.get(`${COINGECKO_BASE}/simple/price`, {
          params: {
            ids,
            vs_currencies: 'usd',
            include_24hr_change: true,
            include_market_cap: true,
          },
        });

        const data = res.data;
        const formatted = Object.keys(data).map((id) => ({
          id,
          name: id.charAt(0).toUpperCase() + id.slice(1),
          price: data[id].usd || 0,
          change24h: data[id].usd_24h_change || 0,
          marketCap: data[id].usd_market_cap || 0,
        }));

        setPrices(formatted);
      } catch (err) {
        toast.error('Failed to load live prices');
        console.error(err);
      } finally {
        setLoadingPrices(false);
      }
    };

    fetchPrices();
    const interval = setInterval(fetchPrices, 60000);
    return () => clearInterval(interval);
  }, []);

  // Fetch OHLC data (unchanged)
  useEffect(() => {
    const fetchOhlc = async () => {
      if (!selectedCoin) return;
      setLoadingChart(true);
      try {
        const res = await axios.get(
          `${COINGECKO_BASE}/coins/${selectedCoin}/ohlc`,
          {
            params: { vs_currency: 'usd', days: '30' },
          }
        );

        const ohlcArray = res.data || [];
        const formatted = ohlcArray.map(([timestamp, open, high, low, close]) => ({
          time: format(new Date(timestamp), 'MMM dd HH:mm'),
          open: Number(open.toFixed(2)),
          high: Number(high.toFixed(2)),
          low: Number(low.toFixed(2)),
          close: Number(close.toFixed(2)),
        }));

        setOhlcData(formatted);
      } catch (err) {
        toast.error('Failed to load candlestick chart');
        console.error(err);
      } finally {
        setLoadingChart(false);
      }
    };

    fetchOhlc();
  }, [selectedCoin]);

  // USD → Crypto converter (unchanged)
  const handleConvert = () => {
    if (!usdAmount || isNaN(Number(usdAmount)) || Number(usdAmount) <= 0) {
      toast.warn('Enter a valid USD amount');
      return;
    }

    const coin = prices.find((c) => c.id === selectedCoin);
    if (!coin || coin.price <= 0) {
      toast.error('No price data for this coin');
      return;
    }

    const amount = Number(usdAmount) / coin.price;
    setConvertedAmount(amount.toFixed(8));
  };

  const selectedPrice =
    prices.find((c) => c.id === selectedCoin) || {
      name: 'Bitcoin',
      price: 0,
      change24h: 0,
      marketCap: 0,
    };

  const isPriceUp = selectedPrice.change24h >= 0;

  // Prepare data for Recharts candlestick (split up/down)
  const candleData = ohlcData.map((d) => ({
    ...d,
    isUp: d.close >= d.open,
  }));

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 text-gray-900 dark:text-gray-100 p-4 md:p-8">
      <ToastContainer position="top-right" autoClose={4000} theme="colored" />

      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-3xl md:text-4xl font-bold text-orange-600 dark:text-orange-500 mb-8 text-center"
      >
        Live Crypto Market
      </motion.h1>

      <div className="max-w-7xl mx-auto space-y-10">
        {/* Prices Table – unchanged */}

        {/* Candlestick Chart – UPDATED */}
        <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-xl p-6 border border-gray-200 dark:border-gray-800">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
            <h2 className="text-xl md:text-2xl font-bold text-orange-600 dark:text-orange-400">
              {selectedPrice.name} Candlestick Chart (30 days, 4h)
            </h2>
            <div className="text-right">
              <p className="text-2xl md:text-3xl font-bold">
                ${selectedPrice.price.toLocaleString(undefined, { minimumFractionDigits: 2 })}
              </p>
              <p className={`text-base md:text-lg font-medium ${isPriceUp ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}`}>
                {isPriceUp ? '↑' : '↓'}
                {Math.abs(selectedPrice.change24h || 0).toFixed(2)}% (24h)
              </p>
            </div>
          </div>

          <div className="h-80 md:h-96">
            {loadingChart ? (
              <div className="h-full flex items-center justify-center">
                <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-orange-500"></div>
                <p className="ml-4 text-gray-500 dark:text-gray-400">Loading candlestick data...</p>
              </div>
            ) : ohlcData.length > 0 ? (
              <ResponsiveContainer width="100%" height="100%">
                <ComposedChart data={candleData}>
                  <CartesianGrid strokeDasharray="4 4" stroke="#374151" />
                  <XAxis
                    dataKey="time"
                    stroke="#9ca3af"
                    tick={{ fontSize: 12 }}
                    interval="preserveStartEnd"
                  />
                  <YAxis stroke="#9ca3af" tick={{ fontSize: 12 }} domain={['auto', 'auto']} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: '#1f2937',
                      border: 'none',
                      borderRadius: '8px',
                      color: 'white',
                    }}
                    formatter={(value, name, props) => {
                      if (['open', 'close', 'high', 'low'].includes(name)) {
                        return [`$${Number(value).toLocaleString(undefined, { minimumFractionDigits: 2 })}`, name.toUpperCase()];
                      }
                      return [value, name];
                    }}
                  />
                  <Legend />

                  {/* Up candles (green) */}
                  <Bar
                    dataKey="close"
                    baseValue={(entry) => entry.open}
                    fill="#10b981"
                    stroke="#10b981"
                    isAnimationActive={false}
                    barSize={16} // adjust width of candle body
                    filter={(entry) => entry.isUp}
                  >
                    <ErrorBar
                      dataKey={['low', 'high']}
                      stroke="#10b981"
                      strokeWidth={2}
                      width={16}
                    />
                  </Bar>

                  {/* Down candles (red) */}
                  <Bar
                    dataKey="close"
                    baseValue={(entry) => entry.open}
                    fill="#ef4444"
                    stroke="#ef4444"
                    isAnimationActive={false}
                    barSize={16}
                    filter={(entry) => !entry.isUp}
                  >
                    <ErrorBar
                      dataKey={['low', 'high']}
                      stroke="#ef4444"
                      strokeWidth={2}
                      width={16}
                    />
                  </Bar>
                </ComposedChart>
              </ResponsiveContainer>
            ) : (
              <div className="h-full flex items-center justify-center text-gray-500 dark:text-gray-400">
                No candlestick data available yet
              </div>
            )}
          </div>
        </div>
          <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-xl p-6 border border-gray-200 dark:border-gray-800">
          <h2 className="text-xl md:text-2xl font-semibold text-orange-600 dark:text-orange-400 mb-6">
            USD → Crypto Converter
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-600 dark:text-gray-300 mb-2">
                Amount (USD)
              </label>
              <input
                type="number"
                value={usdAmount}
                onChange={(e) => setUsdAmount(e.target.value)}
                placeholder="100.00"
                min="0.01"
                className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-600 dark:text-gray-300 mb-2">
                Cryptocurrency
              </label>
              <select
                value={selectedCoin}
                onChange={(e) => setSelectedCoin(e.target.value)}
                className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500"
              >
                {prices.map((coin) => (
                  <option key={coin.id} value={coin.id}>
                    {coin.name}
                  </option>
                ))}
              </select>
            </div>

            <div className="flex items-end">
              <button
                onClick={handleConvert}
                className="w-full bg-gradient-to-r from-orange-600 to-orange-500 text-white font-bold py-3 rounded-xl shadow-lg hover:shadow-xl transition disabled:opacity-60"
                disabled={!usdAmount || Number(usdAmount) <= 0 || !selectedCoin}
              >
                Convert Now
              </button>
            </div>
          </div>

          {convertedAmount !== null && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="mt-6 p-5 bg-green-50 dark:bg-green-900/30 border border-green-200 dark:border-green-800 rounded-2xl text-center"
            >
              <p className="text-2xl font-bold text-green-700 dark:text-green-300">
                ≈ {Number(convertedAmount).toFixed(8)} {selectedPrice.name}
              </p>
              <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
                for ${Number(usdAmount).toLocaleString(undefined, { minimumFractionDigits: 2 })}
              </p>
            </motion.div>
          )}
        </div>
        {/* Converter section – unchanged */}
      </div>
    </div>
  );
}