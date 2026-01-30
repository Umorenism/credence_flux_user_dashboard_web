// src/components/TradingDashboard.jsx
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { tradingService } from '../../api/tradingApi';

const handleApiError = (error) => {
  toast.error(error?.response?.data?.message || 'Something went wrong 😕');
};

export default function TradingDashboard() {
  const [pairs, setPairs] = useState([]);
  const [selectedPair, setSelectedPair] = useState(null);
  const [portfolio, setPortfolio] = useState(null);
  const [loading, setLoading] = useState(false);
  const [showTradeModal, setShowTradeModal] = useState(false);
  const [tradeSide, setTradeSide] = useState('buy');
  const [tradeAmount, setTradeAmount] = useState('');
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setLoading(true);
    try {
      const [pairsRes, portRes] = await Promise.all([
        tradingService.getPairs(),
        tradingService.getPortfolio(),
      ]);
      setPairs(pairsRes.data || []);
      setPortfolio(portRes.data);
    } catch (err) {
      handleApiError(err);
    } finally {
      setLoading(false);
    }
  };

  const openTrade = (pair) => {
    setSelectedPair(pair);
    setTradeSide('buy');
    setTradeAmount('');
    setShowTradeModal(true);
  };

  const executeTrade = async () => {
    if (!tradeAmount || Number(tradeAmount) <= 0) {
      toast.warn('Enter a valid amount');
      return;
    }

    setLoading(true);
    try {
      const payload = {
        orderType: tradeSide.toUpperCase(),
        tradingPair: selectedPair.symbol,
        quantity: Number(tradeAmount),
      };

      await tradingService.executeTrade(payload);

      toast.success('Trade placed successfully!');
      setShowTradeModal(false);
      setShowSuccessModal(true);
      fetchData(); // ← refresh portfolio balance
    } catch (err) {
      handleApiError(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 pb-20">
      <ToastContainer position="top-center" autoClose={2800} theme="colored" />

      {/* Header */}
      <header className="sticky top-0 z-10 bg-white/90 dark:bg-gray-900/90 backdrop-blur-md border-b border-gray-200 dark:border-gray-800 px-4 py-5">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-2xl md:text-3xl font-bold text-orange-600 dark:text-orange-400">
            Trade Crypto
          </h1>
          {portfolio && (
            <p className="mt-1 text-sm md:text-base text-gray-600 dark:text-gray-400">
              Wallet Balance:{' '}
              <span className="font-bold text-green-600 dark:text-green-400">
                ${Number(portfolio.balance || 0).toLocaleString()}
              </span>
            </p>
          )}
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 pt-8">
        {loading && pairs.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-orange-500"></div>
            <p className="mt-4 text-gray-500 dark:text-gray-400">Loading trading pairs...</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 md:gap-6">
            {pairs.map((pair) => (
              <motion.div
                key={pair.symbol}
                whileHover={{ scale: 1.04, y: -6 }}
                whileTap={{ scale: 0.97 }}
                className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg overflow-hidden cursor-pointer border border-gray-200 dark:border-gray-700 hover:border-orange-500/70 transition-all duration-300"
                onClick={() => openTrade(pair)}
              >
                <div className="p-5">
                  <h3 className="text-xl font-bold">{pair.symbol}</h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                    {pair.base} / {pair.quote}
                  </p>

                  <div className="mt-5 grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <p className="text-gray-500 dark:text-gray-400">Min</p>
                      <p className="font-semibold">${pair.minInvestment || '10'}</p>
                    </div>
                    <div>
                      <p className="text-gray-500 dark:text-gray-400">Return</p>
                      <p className="font-semibold text-green-600 dark:text-green-400">
                        {pair.expectedReturn || '8-15%'}
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </main>

      {/* Trade Modal */}
      <AnimatePresence>
        {showTradeModal && selectedPair && (
          <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4">
            <motion.div
              initial={{ scale: 0.85, opacity: 0, y: 30 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.85, opacity: 0, y: 30 }}
              className="bg-white dark:bg-gray-900 rounded-3xl p-6 md:p-8 w-full max-w-lg border border-gray-200 dark:border-gray-700 shadow-2xl"
            >
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl md:text-3xl font-bold text-orange-600 dark:text-orange-400">
                  {tradeSide.toUpperCase()} {selectedPair.symbol}
                </h2>
                <button
                  onClick={() => setShowTradeModal(false)}
                  className="text-3xl text-gray-500 hover:text-gray-700 dark:hover:text-gray-300"
                >
                  ×
                </button>
              </div>

              <div className="flex gap-4 mb-8">
                <button
                  onClick={() => setTradeSide('buy')}
                  className={`flex-1 py-4 rounded-2xl font-bold transition-all ${
                    tradeSide === 'buy'
                      ? 'bg-green-600 text-white shadow-lg scale-105'
                      : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300'
                  }`}
                >
                  BUY
                </button>
                <button
                  onClick={() => setTradeSide('sell')}
                  className={`flex-1 py-4 rounded-2xl font-bold transition-all ${
                    tradeSide === 'sell'
                      ? 'bg-red-600 text-white shadow-lg scale-105'
                      : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300'
                  }`}
                >
                  SELL
                </button>
              </div>

              <div className="mb-8">
                <label className="block text-sm text-gray-500 dark:text-gray-400 mb-2 font-medium">
                  Amount ({selectedPair.quote || 'USDT'})
                </label>
                <input
                  type="number"
                  value={tradeAmount}
                  onChange={(e) => setTradeAmount(e.target.value)}
                  placeholder="0.00"
                  min={selectedPair.minInvestment || 10}
                  step="any"
                  className="w-full p-5 text-3xl bg-gray-50 dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-2xl focus:outline-none focus:ring-2 focus:ring-orange-500 transition"
                />
                <div className="mt-3 flex justify-between text-sm text-gray-500 dark:text-gray-400">
                  <span>Min: ${selectedPair.minInvestment || 10}</span>
                  <span>Max: ${selectedPair.maxInvestment || 10_000}</span>
                </div>
              </div>

              <div className="bg-gray-50 dark:bg-gray-800 p-5 rounded-2xl mb-8">
                <div className="flex justify-between text-sm mb-2">
                  <span className="text-gray-500 dark:text-gray-400">Expected Return (est.)</span>
                  <span className="font-medium text-green-600 dark:text-green-400">
                    +${(Number(tradeAmount) * (selectedPair.expectedReturnRate || 0.10)).toFixed(2)}
                  </span>
                </div>
                <div className="text-xs text-gray-500 dark:text-gray-400">
                  Duration: {selectedPair.duration || '24 hours'}
                </div>
              </div>

              <div className="flex gap-4">
                <button
                  onClick={() => setShowTradeModal(false)}
                  className="flex-1 py-4 bg-gray-200 dark:bg-gray-700 rounded-2xl font-medium hover:bg-gray-300 dark:hover:bg-gray-600 transition"
                >
                  Cancel
                </button>
                <button
                  onClick={executeTrade}
                  disabled={loading || !tradeAmount || Number(tradeAmount) <= 0}
                  className="flex-1 py-4 bg-orange-600 hover:bg-orange-700 text-white rounded-2xl font-bold shadow-lg disabled:opacity-50 transition"
                >
                  {loading ? 'Processing...' : 'Confirm & Trade'}
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Success Modal */}
      <AnimatePresence>
        {showSuccessModal && (
          <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4">
            <motion.div
              initial={{ scale: 0.7, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.7, opacity: 0 }}
              className="bg-white dark:bg-gray-900 rounded-3xl p-8 md:p-10 text-center max-w-md w-full shadow-2xl border border-gray-200 dark:border-gray-700"
            >
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: 'spring', stiffness: 200, damping: 10 }}
                className="text-8xl mb-6"
              >
                🎉
              </motion.div>
              <h2 className="text-3xl font-bold text-green-600 dark:text-green-400 mb-4">
                Trade Completed!
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-300 mb-8">
                {tradeSide.toUpperCase()} {tradeAmount} {selectedPair?.symbol} successful
              </p>

              <button
                onClick={() => {
                  setShowSuccessModal(false);
                  fetchData();
                }}
                className="w-full py-4 bg-orange-600 hover:bg-orange-700 text-white rounded-2xl font-bold shadow-lg transition"
              >
                Done
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Mobile floating refresh */}
      <button
        onClick={fetchData}
        disabled={loading}
        className="fixed bottom-6 right-6 bg-blue-600 text-white p-4 rounded-full shadow-2xl hover:bg-blue-700 transition disabled:opacity-60 z-40 md:hidden"
      >
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
        </svg>
      </button>
    </div>
  );
}