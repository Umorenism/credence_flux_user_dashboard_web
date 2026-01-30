// // src/components/TradingDashboard.jsx
// import React, { useState, useEffect } from 'react';
// import { tradingService } from '../../api/tradingApi';
// import { ToastContainer, toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';

// const handleApiError = (error) => {
//   toast.error(error?.response?.data?.message || 'Something went wrong 😕');
// };

// const TradingDashboard = () => {
//   const [pairs, setPairs] = useState([]);
//   const [selectedPair, setSelectedPair] = useState('');
//   const [orders, setOrders] = useState([]);
//   const [trades, setTrades] = useState([]);
//   const [portfolio, setPortfolio] = useState(null);
//   const [stats, setStats] = useState(null);
//   const [loading, setLoading] = useState(false);

//   useEffect(() => {
//     const fetchPairs = async () => {
//       setLoading(true);
//       try {
//         const { data } = await tradingService.getPairs();
//         setPairs(data);
//         if (data.length > 0) setSelectedPair(data[0].symbol);
//         toast.success('Pairs loaded!');
//       } catch (err) {
//         handleApiError(err);
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchPairs();
//   }, []);

//   const refreshData = async () => {
//     setLoading(true);
//     try {
//       const [ordersRes, tradesRes, portRes, statsRes] = await Promise.all([
//         tradingService.getOrders(),
//         tradingService.getTrades(),
//         tradingService.getPortfolio(),
//         tradingService.getStats(),
//       ]);

//       setOrders(ordersRes.data);
//       setTrades(tradesRes.data);
//       setPortfolio(portRes.data);
//       setStats(statsRes.data);
//     } catch (err) {
//       handleApiError(err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     refreshData();
//     // Optional: auto-refresh every 30s (comment out if not wanted)
//     // const interval = setInterval(refreshData, 30000);
//     // return () => clearInterval(interval);
//   }, []);

//   return (
//     <div className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 p-4 pb-20">
//       <ToastContainer 
//         position="top-center" 
//         autoClose={2800} 
//         hideProgressBar 
//         newestOnTop 
//         closeOnClick 
//         rtl={false} 
//         pauseOnFocusLoss 
//         draggable 
//         pauseOnHover 
//         theme="colored"
//       />

//       <h1 className="text-2xl md:text-3xl font-bold mb-6 text-center md:text-left">
//         Trading Dashboard
//       </h1>

//       {loading && (
//         <div className="text-center text-blue-600 dark:text-blue-400 my-4">
//           Loading...
//         </div>
//       )}

//       <div className="space-y-8 md:space-y-10">

//         {/* Pair Selection */}
//         <section className="bg-white dark:bg-gray-800 p-4 rounded-xl shadow-sm">
//           <h2 className="text-xl font-semibold mb-3">Trading Pair</h2>
//           <select
//             value={selectedPair}
//             onChange={(e) => setSelectedPair(e.target.value)}
//             className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-base"
//           >
//             {pairs.map((pair) => (
//               <option key={pair.symbol} value={pair.symbol}>
//                 {pair.symbol} • {pair.base}/{pair.quote}
//               </option>
//             ))}
//           </select>
//         </section>

//         {/* Market Trade */}
//         <MarketTradeSection 
//           selectedPair={selectedPair} 
//           refreshData={refreshData} 
//         />

//         {/* Limit Orders */}
//         <LimitOrderSection 
//           selectedPair={selectedPair} 
//           orders={orders} 
//           refreshData={refreshData} 
//         />

//         {/* Recent Trades */}
//         <TradesSection trades={trades} />

//         {/* Portfolio & Stats */}
//         <PortfolioSection portfolio={portfolio} stats={stats} />

//         {/* Deposit */}
//         <DepositSection refreshData={refreshData} />

//         {/* Refresh Button - fixed bottom on mobile */}
//         <div className="fixed bottom-4 left-0 right-0 px-4 md:static md:px-0">
//           <button
//             onClick={refreshData}
//             disabled={loading}
//             className="w-full md:w-auto bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-6 rounded-xl shadow-lg transition-colors disabled:opacity-60"
//           >
//             {loading ? 'Refreshing...' : 'Refresh All Data'}
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// /* ──────────────────────────────────────────────── */
// /*                  Child Components                */
// /* ──────────────────────────────────────────────── */

// const MarketTradeSection = ({ selectedPair, refreshData }) => {
//   const [side, setSide] = useState('buy');
//   const [amount, setAmount] = useState('');

//   const handleTrade = async () => {
//     if (!selectedPair || !amount || amount <= 0) {
//       toast.warn('Please enter valid amount');
//       return;
//     }

//     try {
//       await tradingService.executeTrade({
//         pair: selectedPair,
//         side,
//         amount: Number(amount),
//       });
//       toast.success(`${side.toUpperCase()} executed!`);
//       setAmount('');
//       refreshData();
//     } catch (err) {
//       handleApiError(err);
//     }
//   };

//   return (
//     <section className="bg-white dark:bg-gray-800 p-4 rounded-xl shadow-sm">
//       <h2 className="text-xl font-semibold mb-4">Market Order</h2>
//       <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
//         <select
//           value={side}
//           onChange={(e) => setSide(e.target.value)}
//           className="p-3 border rounded-lg bg-white dark:bg-gray-700"
//         >
//           <option value="buy">Buy</option>
//           <option value="sell">Sell</option>
//         </select>

//         <input
//           type="number"
//           value={amount}
//           onChange={(e) => setAmount(e.target.value)}
//           placeholder="Amount"
//           min="0"
//           step="any"
//           className="p-3 border rounded-lg bg-white dark:bg-gray-700"
//         />

//         <button
//           onClick={handleTrade}
//           className={`p-3 rounded-lg font-medium text-white ${
//             side === 'buy' 
//               ? 'bg-green-600 hover:bg-green-700' 
//               : 'bg-red-600 hover:bg-red-700'
//           } transition-colors`}
//         >
//           {side === 'buy' ? 'BUY' : 'SELL'}
//         </button>
//       </div>
//     </section>
//   );
// };

// const LimitOrderSection = ({ selectedPair, orders, refreshData }) => {
//   const [side, setSide] = useState('buy');
//   const [price, setPrice] = useState('');
//   const [amount, setAmount] = useState('');

//   const handleCreate = async () => {
//     if (!price || !amount) {
//       toast.warn('Price & Amount required');
//       return;
//     }

//     try {
//       await tradingService.createOrder({
//         pair: selectedPair,
//         side,
//         price: Number(price),
//         amount: Number(amount),
//       });
//       toast.success('Limit order placed!');
//       setPrice('');
//       setAmount('');
//       refreshData();
//     } catch (err) {
//       handleApiError(err);
//     }
//   };

//   const handleCancel = async (orderId) => {
//     if (!window.confirm('Cancel this order?')) return;
//     try {
//       await tradingService.cancelOrder(orderId);
//       toast.success('Order cancelled');
//       refreshData();
//     } catch (err) {
//       handleApiError(err);
//     }
//   };

//   return (
//     <section className="bg-white dark:bg-gray-800 p-4 rounded-xl shadow-sm">
//       <h2 className="text-xl font-semibold mb-4">Limit Order</h2>

//       {/* Form */}
//       <div className="grid grid-cols-1 sm:grid-cols-4 gap-3 mb-6">
//         <select
//           value={side}
//           onChange={e => setSide(e.target.value)}
//           className="p-3 border rounded-lg bg-white dark:bg-gray-700"
//         >
//           <option value="buy">Buy</option>
//           <option value="sell">Sell</option>
//         </select>
//         <input
//           type="number"
//           placeholder="Price"
//           value={price}
//           onChange={e => setPrice(e.target.value)}
//           className="p-3 border rounded-lg bg-white dark:bg-gray-700"
//         />
//         <input
//           type="number"
//           placeholder="Amount"
//           value={amount}
//           onChange={e => setAmount(e.target.value)}
//           className="p-3 border rounded-lg bg-white dark:bg-gray-700"
//         />
//         <button
//           onClick={handleCreate}
//           className="p-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg font-medium transition-colors"
//         >
//           Place Order
//         </button>
//       </div>

//       {/* Orders Table */}
//       <h3 className="text-lg font-medium mb-3">Active Orders</h3>
//       {orders.length === 0 ? (
//         <p className="text-gray-500 dark:text-gray-400 text-center py-4">
//           No active orders
//         </p>
//       ) : (
//         <div className="overflow-x-auto">
//           <table className="min-w-full text-sm">
//             <thead>
//               <tr className="bg-gray-100 dark:bg-gray-700">
//                 <th className="p-3 text-left">Pair</th>
//                 <th className="p-3 text-left">Side</th>
//                 <th className="p-3 text-left">Price</th>
//                 <th className="p-3 text-left">Amount</th>
//                 <th className="p-3"></th>
//               </tr>
//             </thead>
//             <tbody>
//               {orders.map(order => (
//                 <tr key={order.id} className="border-t dark:border-gray-700">
//                   <td className="p-3">{order.pair}</td>
//                   <td className="p-3 font-medium">
//                     <span className={order.side === 'buy' ? 'text-green-600' : 'text-red-600'}>
//                       {order.side.toUpperCase()}
//                     </span>
//                   </td>
//                   <td className="p-3">{order.price}</td>
//                   <td className="p-3">{order.amount}</td>
//                   <td className="p-3">
//                     <button
//                       onClick={() => handleCancel(order.id)}
//                       className="text-red-600 hover:text-red-800 font-medium"
//                     >
//                       Cancel
//                     </button>
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>
//       )}
//     </section>
//   );
// };

// const TradesSection = ({ trades }) => (
//   <section className="bg-white dark:bg-gray-800 p-4 rounded-xl shadow-sm">
//     <h2 className="text-xl font-semibold mb-4">Recent Trades</h2>
//     {trades.length === 0 ? (
//       <p className="text-gray-500 dark:text-gray-400 text-center py-6">
//         No trades yet
//       </p>
//     ) : (
//       <div className="overflow-x-auto">
//         <table className="min-w-full text-sm">
//           <thead>
//             <tr className="bg-gray-100 dark:bg-gray-700">
//               <th className="p-3 text-left">Pair</th>
//               <th className="p-3 text-left">Side</th>
//               <th className="p-3 text-left">Price</th>
//               <th className="p-3 text-left">Amount</th>
//               <th className="p-3 text-left">Time</th>
//             </tr>
//           </thead>
//           <tbody>
//             {trades.slice(0, 10).map(t => (   // show last 10 for performance
//               <tr key={t.id} className="border-t dark:border-gray-700">
//                 <td className="p-3">{t.pair}</td>
//                 <td className="p-3">
//                   <span className={t.side === 'buy' ? 'text-green-600' : 'text-red-600'}>
//                     {t.side.toUpperCase()}
//                   </span>
//                 </td>
//                 <td className="p-3">{t.price}</td>
//                 <td className="p-3">{t.amount}</td>
//                 <td className="p-3 whitespace-nowrap">
//                   {new Date(t.date).toLocaleString([], {hour: '2-digit', minute:'2-digit'})}
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>
//     )}
//   </section>
// );

// const PortfolioSection = ({ portfolio, stats }) => (
//   <section className="bg-white dark:bg-gray-800 p-4 rounded-xl shadow-sm">
//     <h2 className="text-xl font-semibold mb-4">Portfolio</h2>
//     {portfolio ? (
//       <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
//         <div>
//           <p className="text-gray-600 dark:text-gray-400">Total Balance</p>
//           <p className="text-2xl font-bold">{portfolio.balance || '—'}</p>
//         </div>
//         {stats && (
//           <div>
//             <p className="text-gray-600 dark:text-gray-400">Estimated Value</p>
//             <p className="text-2xl font-bold">{stats.totalValue || '—'}</p>
//           </div>
//         )}
//       </div>
//     ) : (
//       <p className="text-gray-500 dark:text-gray-400">Loading portfolio...</p>
//     )}
//   </section>
// );

// const DepositSection = ({ refreshData }) => {
//   const [file, setFile] = useState(null);

//   const handleUpload = async () => {
//     if (!file) {
//       toast.warn('Please select receipt file first');
//       return;
//     }

//     const formData = new FormData();
//     formData.append('receipt', file);

//     try {
//       await tradingService.uploadReceipt(formData);
//       toast.success('Receipt uploaded successfully!');
//       setFile(null);
//       refreshData();
//     } catch (err) {
//       handleApiError(err);
//     }
//   };

//   return (
//     <section className="bg-white dark:bg-gray-800 p-4 rounded-xl shadow-sm">
//       <h2 className="text-xl font-semibold mb-4">Deposit (Upload Receipt)</h2>
//       <div className="flex flex-col sm:flex-row sm:items-center gap-3">
//         <input
//           type="file"
//           onChange={e => setFile(e.target.files?.[0] || null)}
//           className="text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100 dark:file:bg-gray-700 dark:file:text-gray-200"
//         />
//         <button
//           onClick={handleUpload}
//           disabled={!file}
//           className="mt-2 sm:mt-0 px-6 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg font-medium disabled:opacity-50 transition-colors"
//         >
//           Upload
//         </button>
//       </div>
//     </section>
//   );
// };

// export default TradingDashboard;







// src/components/TradingDashboard.jsx
import React, { useState, useEffect } from 'react';
import { tradingService } from '../../api/tradingApi';  // Adjust path if needed
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const handleApiError = (error) => {
  toast.error(error?.response?.data?.message || 'Something went wrong 😕');
};

const TradingDashboard = () => {
  const [pairs, setPairs] = useState([]);
  const [selectedPair, setSelectedPair] = useState('');
  const [orders, setOrders] = useState([]);
  const [trades, setTrades] = useState([]);
  const [portfolio, setPortfolio] = useState(null);
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchPairs = async () => {
      setLoading(true);
      try {
        const { data } = await tradingService.getPairs();
        setPairs(data);
        if (data.length > 0) setSelectedPair(data[0].symbol);  // Assuming pair has 'symbol' field
        toast.success('Pairs loaded!');
      } catch (err) {
        handleApiError(err);
      } finally {
        setLoading(false);
      }
    };
    fetchPairs();
  }, []);

  const refreshData = async () => {
    setLoading(true);
    try {
      const [ordersRes, tradesRes, portRes, statsRes] = await Promise.all([
        tradingService.getOrders({ limit: 50 }),  // Example: add params for pagination
        tradingService.getTrades({ limit: 50 }),
        tradingService.getPortfolio(),
        tradingService.getStats(),
      ]);

      setOrders(ordersRes.data);
      setTrades(tradesRes.data);
      setPortfolio(portRes.data);
      setStats(statsRes.data);
    } catch (err) {
      handleApiError(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    refreshData();
    // Optional: auto-refresh every 30s
    // const interval = setInterval(refreshData, 30000);
    // return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 p-4 pb-20">
      <ToastContainer 
        position="top-center" 
        autoClose={2800} 
        hideProgressBar 
        newestOnTop 
        closeOnClick 
        rtl={false} 
        pauseOnFocusLoss 
        draggable 
        pauseOnHover 
        theme="colored"
      />

      <h1 className="text-2xl md:text-3xl font-bold mb-6 text-center md:text-left">
        Trading Dashboard
      </h1>

      {loading && (
        <div className="text-center text-blue-600 dark:text-blue-400 my-4">
          Loading...
        </div>
      )}

      <div className="space-y-8 md:space-y-10">
        {/* Pair Selection */}
        <section className="bg-white dark:bg-gray-800 p-4 rounded-xl shadow-sm">
          <h2 className="text-xl font-semibold mb-3">Trading Pair</h2>
          <select
            value={selectedPair}
            onChange={(e) => setSelectedPair(e.target.value)}
            className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-base"
          >
            {pairs.map((pair) => (
              <option key={pair.symbol} value={pair.symbol}>
                {pair.symbol} • {pair.base}/{pair.quote}
              </option>
            ))}
          </select>
        </section>

        {/* Market Trade */}
        <MarketTradeSection 
          selectedPair={selectedPair} 
          refreshData={refreshData} 
        />

        {/* Limit Orders */}
        <LimitOrderSection 
          selectedPair={selectedPair} 
          orders={orders} 
          refreshData={refreshData} 
        />

        {/* Recent Trades */}
        <TradesSection trades={trades} />

        {/* Portfolio & Stats */}
        <PortfolioSection portfolio={portfolio} stats={stats} />

        {/* Deposit */}
        <DepositSection refreshData={refreshData} />

        {/* Refresh Button - fixed bottom on mobile */}
        <div className="fixed bottom-4 left-0 right-0 px-4 md:static md:px-0">
          <button
            onClick={refreshData}
            disabled={loading}
            className="w-full md:w-auto bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-6 rounded-xl shadow-lg transition-colors disabled:opacity-60"
          >
            {loading ? 'Refreshing...' : 'Refresh All Data'}
          </button>
        </div>
      </div>
    </div>
  );
};

/* ──────────────────────────────────────────────── */
/*                  Child Components                */
/* ──────────────────────────────────────────────── */

const MarketTradeSection = ({ selectedPair, refreshData }) => {
  const [orderType, setOrderType] = useState('BUY');  // Updated to match backend (BUY/SELL)
  const [quantity, setQuantity] = useState('');
  const [entryPrice, setEntryPrice] = useState('');  // Added for backend requirement (optional?)

  const handleTrade = async () => {
    if (!selectedPair || !quantity || Number(quantity) <= 0) {
      toast.warn('Please enter valid quantity');
      return;
    }

    try {
      const payload = {
        orderType,
        tradingPair: selectedPair,
        quantity: Number(quantity),
        entryPrice: entryPrice ? Number(entryPrice) : undefined,  // Send if provided
      };
      await tradingService.executeTrade(payload);
      toast.success(`${orderType} executed!`);
      setQuantity('');
      setEntryPrice('');
      refreshData();
    } catch (err) {
      handleApiError(err);
    }
  };

  return (
    <section className="bg-white dark:bg-gray-800 p-4 rounded-xl shadow-sm">
      <h2 className="text-xl font-semibold mb-4">Market Order</h2>
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-3">  {/* Added extra column for entryPrice */}
        <select
          value={orderType}
          onChange={(e) => setOrderType(e.target.value)}
          className="p-3 border rounded-lg bg-white dark:bg-gray-700"
        >
          <option value="BUY">Buy</option>
          <option value="SELL">Sell</option>
        </select>

        <input
          type="number"
          value={quantity}
          onChange={(e) => setQuantity(e.target.value)}
          placeholder="Quantity"
          min="0"
          step="any"
          className="p-3 border rounded-lg bg-white dark:bg-gray-700"
        />

        <input
          type="number"
          value={entryPrice}
          onChange={(e) => setEntryPrice(e.target.value)}
          placeholder="Entry Price (optional)"
          min="0"
          step="any"
          className="p-3 border rounded-lg bg-white dark:bg-gray-700"
        />

        <button
          onClick={handleTrade}
          className={`p-3 rounded-lg font-medium text-white ${
            orderType === 'BUY' 
              ? 'bg-green-600 hover:bg-green-700' 
              : 'bg-red-600 hover:bg-red-700'
          } transition-colors`}
        >
          {orderType === 'BUY' ? 'BUY' : 'SELL'}
        </button>
      </div>
    </section>
  );
};

const LimitOrderSection = ({ selectedPair, orders, refreshData }) => {
  const [side, setSide] = useState('BUY');  // Will combine into LIMIT_BUY etc.
  const [pricePerUnit, setPricePerUnit] = useState('');
  const [quantity, setQuantity] = useState('');

  const handleCreate = async () => {
    if (!pricePerUnit || !quantity) {
      toast.warn('Price & Quantity required');
      return;
    }

    try {
      const payload = {
        orderType: `LIMIT_${side}`,
        tradingPair: selectedPair,
        quantity: Number(quantity),
        pricePerUnit: Number(pricePerUnit),
      };
      await tradingService.createOrder(payload);
      toast.success('Limit order placed!');
      setPricePerUnit('');
      setQuantity('');
      refreshData();
    } catch (err) {
      handleApiError(err);
    }
  };

  const handleCancel = async (orderId) => {
    if (!window.confirm('Cancel this order?')) return;
    try {
      await tradingService.cancelOrder(orderId);
      toast.success('Order cancelled');
      refreshData();
    } catch (err) {
      handleApiError(err);
    }
  };

  return (
    <section className="bg-white dark:bg-gray-800 p-4 rounded-xl shadow-sm">
      <h2 className="text-xl font-semibold mb-4">Limit Order</h2>

      {/* Form */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-3 mb-6">
        <select
          value={side}
          onChange={e => setSide(e.target.value)}
          className="p-3 border rounded-lg bg-white dark:bg-gray-700"
        >
          <option value="BUY">Buy</option>
          <option value="SELL">Sell</option>
        </select>
        <input
          type="number"
          placeholder="Price per Unit"
          value={pricePerUnit}
          onChange={e => setPricePerUnit(e.target.value)}
          className="p-3 border rounded-lg bg-white dark:bg-gray-700"
        />
        <input
          type="number"
          placeholder="Quantity"
          value={quantity}
          onChange={e => setQuantity(e.target.value)}
          className="p-3 border rounded-lg bg-white dark:bg-gray-700"
        />
        <button
          onClick={handleCreate}
          className="p-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg font-medium transition-colors"
        >
          Place Order
        </button>
      </div>

      {/* Orders Table */}
      <h3 className="text-lg font-medium mb-3">Active Orders</h3>
      {orders.length === 0 ? (
        <p className="text-gray-500 dark:text-gray-400 text-center py-4">
          No active orders
        </p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full text-sm">
            <thead>
              <tr className="bg-gray-100 dark:bg-gray-700">
                <th className="p-3 text-left">Pair</th>
                <th className="p-3 text-left">Side</th>
                <th className="p-3 text-left">Price per Unit</th>
                <th className="p-3 text-left">Quantity</th>
                <th className="p-3"></th>
              </tr>
            </thead>
            <tbody>
              {orders.map(order => (
                <tr key={order.id} className="border-t dark:border-gray-700">
                  <td className="p-3">{order.tradingPair}</td>
                  <td className="p-3 font-medium">
                    <span className={order.orderType.includes('BUY') ? 'text-green-600' : 'text-red-600'}>
                      {order.orderType.split('_').pop()}  {/* Extracts BUY/SELL */}
                    </span>
                  </td>
                  <td className="p-3">{order.pricePerUnit}</td>
                  <td className="p-3">{order.quantity}</td>
                  <td className="p-3">
                    <button
                      onClick={() => handleCancel(order.id)}
                      className="text-red-600 hover:text-red-800 font-medium"
                    >
                      Cancel
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </section>
  );
};

const TradesSection = ({ trades }) => (
  <section className="bg-white dark:bg-gray-800 p-4 rounded-xl shadow-sm">
    <h2 className="text-xl font-semibold mb-4">Recent Trades</h2>
    {trades.length === 0 ? (
      <p className="text-gray-500 dark:text-gray-400 text-center py-6">
        No trades yet
      </p>
    ) : (
      <div className="overflow-x-auto">
        <table className="min-w-full text-sm">
          <thead>
            <tr className="bg-gray-100 dark:bg-gray-700">
              <th className="p-3 text-left">Pair</th>
              <th className="p-3 text-left">Side</th>
              <th className="p-3 text-left">Price</th>
              <th className="p-3 text-left">Quantity</th>
              <th className="p-3 text-left">Time</th>
            </tr>
          </thead>
          <tbody>
            {trades.slice(0, 10).map(t => (
              <tr key={t.id} className="border-t dark:border-gray-700">
                <td className="p-3">{t.tradingPair}</td>
                <td className="p-3">
                  <span className={t.orderType.includes('BUY') ? 'text-green-600' : 'text-red-600'}>
                    {t.orderType.split('_').pop()}
                  </span>
                </td>
                <td className="p-3">{t.entryPrice || t.pricePerUnit}</td>  {/* Flexible for field */}
                <td className="p-3">{t.quantity}</td>
                <td className="p-3 whitespace-nowrap">
                  {new Date(t.date).toLocaleString([], {hour: '2-digit', minute:'2-digit'})}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    )}
  </section>
);

const PortfolioSection = ({ portfolio, stats }) => (
  <section className="bg-white dark:bg-gray-800 p-4 rounded-xl shadow-sm">
    <h2 className="text-xl font-semibold mb-4">Portfolio</h2>
    {portfolio ? (
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <div>
          <p className="text-gray-600 dark:text-gray-400">Total Balance</p>
          <p className="text-2xl font-bold">{portfolio.balance || '—'}</p>
        </div>
        {stats && (
          <div>
            <p className="text-gray-600 dark:text-gray-400">Estimated Value</p>
            <p className="text-2xl font-bold">{stats.totalValue || '—'}</p>
          </div>
        )}
      </div>
    ) : (
      <p className="text-gray-500 dark:text-gray-400">Loading portfolio...</p>
    )}
  </section>
);

const DepositSection = ({ refreshData }) => {
  const [file, setFile] = useState(null);
  const [depositId, setDepositId] = useState('');  // Added for backend requirement

  const handleUpload = async () => {
    if (!file || !depositId) {
      toast.warn('Please select receipt and enter deposit ID');
      return;
    }

    const formData = new FormData();
    formData.append('receipt', file);
    formData.append('depositId', depositId);

    try {
      await tradingService.uploadReceipt(formData);
      toast.success('Receipt uploaded successfully!');
      setFile(null);
      setDepositId('');
      refreshData();
    } catch (err) {
      handleApiError(err);
    }
  };

  return (
    <section className="bg-white dark:bg-gray-800 p-4 rounded-xl shadow-sm">
      <h2 className="text-xl font-semibold mb-4">Deposit (Upload Receipt)</h2>
      <div className="flex flex-col sm:flex-row sm:items-center gap-3">
        <input
          type="text"
          value={depositId}
          onChange={e => setDepositId(e.target.value)}
          placeholder="Deposit ID"
          className="p-3 border rounded-lg bg-white dark:bg-gray-700"
        />
        <input
          type="file"
          onChange={e => setFile(e.target.files?.[0] || null)}
          className="text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100 dark:file:bg-gray-700 dark:file:text-gray-200"
        />
        <button
          onClick={handleUpload}
          disabled={!file || !depositId}
          className="mt-2 sm:mt-0 px-6 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg font-medium disabled:opacity-50 transition-colors"
        >
          Upload
        </button>
      </div>
    </section>
  );
};

export default TradingDashboard;