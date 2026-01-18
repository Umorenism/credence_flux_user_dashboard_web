// src/components/ConfirmTradeModal.jsx
import React, { useState } from "react";
import { motion } from "framer-motion";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { apiClient } from "../../../api/apiClient"; // adjust path if needed

export default function ConfirmTradeModal({ pair, amount, onClose }) {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleConfirm = async () => {
    setLoading(true);

    try {
      // Prepare payload (you can expand this based on your needs)
      const payload = {
        pair: pair?.pair || "Unknown Pair",
        amount: Number(amount),
        plan: "Standard",          // or make dynamic later
        durationDays: 7,
        expectedReturnMin: 8,
        expectedReturnMax: 15,
      };

      // Attempt to create investment via your apiClient
      const response = await apiClient.post("/api/deposits", payload);

      if (!response.data.success) {
        throw new Error(response.data.message || "Investment creation failed");
      }

      toast.success(
        `Investment of $${amount} in ${pair?.pair} created successfully!`
      );

      // Navigate to investments or dashboard
      navigate("/home"); // change to your actual investments route

      onClose();

    } catch (err) {
      console.error("Investment error:", err);

      const errorMessage =
        err.response?.data?.message ||
        err.message ||
        "Failed to process investment";

      if (errorMessage.includes("Route not found") || errorMessage.includes("not found")) {
        toast.error(
          "Backend does not support creating investments yet. Please contact support or add POST /api/investments route."
        );
      } else if (errorMessage.includes("Insufficient balance")) {
        toast.error(
          "Insufficient balance. Please deposit more funds first.",
          { duration: 5000 }
        );
        navigate("/deposits");
      } else {
        toast.error(errorMessage);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 px-4">
      <motion.div
        initial={{ scale: 0.85, opacity: 0, y: 50 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.85, opacity: 0, y: 50 }}
        className="bg-gradient-to-br from-gray-950 to-black border border-orange-900/60 rounded-2xl p-6 md:p-8 max-w-md w-full shadow-2xl shadow-orange-950/40"
      >
        <h3 className="text-2xl md:text-3xl font-black text-orange-400 mb-6 text-center">
          Confirm Investment
        </h3>

        <div className="space-y-4 mb-8 text-gray-300 text-sm md:text-base">
          <div className="flex justify-between items-center border-b border-orange-900/40 pb-3">
            <span className="text-gray-400">Pair:</span>
            <span className="font-semibold text-white">{pair?.pair || "N/A"}</span>
          </div>
          <div className="flex justify-between items-center border-b border-orange-900/40 pb-3">
            <span className="text-gray-400">Amount:</span>
            <span className="font-bold text-orange-300">
              ${Number(amount).toLocaleString(undefined, { minimumFractionDigits: 2 })}
            </span>
          </div>
          <div className="flex justify-between items-center border-b border-orange-900/40 pb-3">
            <span className="text-gray-400">Duration:</span>
            <span className="font-semibold">7 days</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-gray-400">Expected Return:</span>
            <span className="font-bold text-emerald-400">8% – 15%</span>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-4">
          <button
            onClick={onClose}
            disabled={loading}
            className="flex-1 py-4 rounded-xl border border-orange-800/60 text-gray-300 hover:bg-gray-800/60 transition-all disabled:opacity-50"
          >
            Cancel
          </button>

          <button
            onClick={handleConfirm}
            disabled={loading}
            className="flex-1 py-4 rounded-xl bg-gradient-to-r from-orange-600 to-orange-500 text-white font-bold disabled:opacity-50 transition-all hover:brightness-110 shadow-lg shadow-orange-900/40"
          >
            {loading ? (
              <span className="flex items-center justify-center gap-2">
                <svg className="animate-spin h-5 w-5 text-white" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8h8a8 8 0 01-16 0z" />
                </svg>
                Processing...
              </span>
            ) : (
              "Confirm & Invest"
            )}
          </button>
        </div>

        <p className="text-xs text-orange-300/70 mt-6 text-center">
          This will be deducted from your available deposit balance
        </p>
      </motion.div>
    </div>
  );
}