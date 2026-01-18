import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import InvestPairModal from "./InvestPairModal";

export default function TradingPairs() {
  const [pairs, setPairs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedPair, setSelectedPair] = useState(null);

  useEffect(() => {
    const fetchBitcoinData = async () => {
      try {
        const res = await fetch("https://cryptoinvestment-y1aa.onrender.com/api/crypto/bitcoin");
        const data = await res.json();

        if (data.success && data.data?.market_data) {
          const md = data.data.market_data;
          const usdPrice = md.current_price.usd;

          const generatedPairs = [
            { pair: "BTC/USD", price: usdPrice, change24h: md.price_change_percentage_24h, image: data.data.image.large },
            { pair: "BTC/EUR", price: md.current_price.eur, change24h: md.price_change_percentage_24h, image: data.data.image.large },
            { pair: "BTC/GBP", price: md.current_price.gbp, change24h: md.price_change_percentage_24h, image: data.data.image.large },
            { pair: "BTC/NGN", price: md.current_price.ngn, change24h: md.price_change_percentage_24h, image: data.data.image.large },
            { pair: "BTC/ETH", price: md.current_price.eth, change24h: md.price_change_percentage_24h, image: data.data.image.large },
            { pair: "BTC/USDT", price: usdPrice, change24h: md.price_change_percentage_24h, image: data.data.image.large },
          ];

          setPairs(generatedPairs);
        }
      } catch (err) {
        console.error("Failed to load Bitcoin data:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchBitcoinData();
  }, []);

  if (loading) {
    return (
      <div className="text-center py-16 text-orange-300 text-lg font-medium">
        Loading live trading pairs...
      </div>
    );
  }

  if (!pairs.length) {
    return (
      <p className="text-center text-gray-400 py-16 text-lg">
        No trading pairs available at the moment
      </p>
    );
  }

  return (
    <div className="w-full max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex flex-col gap-5 sm:gap-6">
        {pairs.map((pair) => (
          <motion.div
            key={pair.pair}
            whileHover={{ y: -6, scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => setSelectedPair(pair)}
            className="cursor-pointer bg-white dark:bg-gradient-to-br from-gray-900 to-black border border-orange-900/50 rounded-2xl p-5 sm:p-6 shadow-lg hover:shadow-2xl hover:border-orange-600/70 transition-all duration-300"
          >
            <div className="flex items-center gap-4 sm:gap-6">
              <div className="flex-shrink-0">
                <img
                  src={pair.image}
                  alt={pair.pair}
                  className="w-14 h-14 sm:w-16 sm:h-16 rounded-full border-2 border-orange-500/30 object-cover"
                  onError={(e) => (e.target.src = "https://via.placeholder.com/64?text=BTC")}
                />
              </div>

              <div className="flex-1 min-w-0">
                <h3 className="font-bold text-lg sm:text-xl text-white truncate">
                  {pair.pair}
                </h3>
                <p className="text-xl sm:text-2xl font-semibold text-orange-400 mt-1">
                  ${pair.price.toLocaleString(undefined, { maximumFractionDigits: 2 })}
                </p>
                <p
                  className={`text-sm sm:text-base font-medium mt-1 ${
                    pair.change24h >= 0 ? "text-green-400" : "text-red-400"
                  }`}
                >
                  {pair.change24h >= 0 ? "+" : ""}
                  {pair.change24h.toFixed(2)}% (24h)
                </p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {selectedPair && (
        <InvestPairModal
          pair={selectedPair}
          onClose={() => setSelectedPair(null)}
        />
      )}
    </div>
  );
}