import React, { useState } from "react";
import { motion } from "framer-motion";
import ConfirmTradeModal from "./ConfirmTradeModal";

const PLAN = {
  min: 50,
  max: 10000,
  duration: "7 days",
  expiration: "Auto-close",
  expectedReturn: "8% – 15%",
};

export default function InvestPairModal({ pair, onClose }) {
  const [amount, setAmount] = useState("");
  const [confirm, setConfirm] = useState(false);

  return (
    <>
      <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="bg-white dark:bg-gray-900 rounded-2xl w-full max-w-md p-6"
        >
          <h2 className="text-xl font-bold mb-4">{pair.pair} Investment</h2>

          <div className="space-y-3 text-sm text-gray-600 dark:text-gray-400">
            <p><b>Minimum:</b> ${PLAN.min}</p>
            <p><b>Maximum:</b> ${PLAN.max}</p>
            <p><b>Duration:</b> {PLAN.duration}</p>
            <p><b>Expiration:</b> {PLAN.expiration}</p>
            <p className="text-emerald-600 font-semibold">
              Expected Returns: {PLAN.expectedReturn}
            </p>
          </div>

          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder="Enter investment amount"
            className="mt-5 w-full p-3 rounded-xl border dark:border-gray-700 bg-transparent"
          />

          <div className="flex gap-3 mt-6">
            <button
              onClick={onClose}
              className="flex-1 py-3 rounded-xl border"
            >
              Cancel
            </button>
            <button
              onClick={() => setConfirm(true)}
              disabled={amount < PLAN.min}
              className="flex-1 py-3 rounded-xl bg-orange-600 text-white"
            >
              Confirm Trade
            </button>
          </div>
        </motion.div>
      </div>

      {confirm && (
        <ConfirmTradeModal
          pair={pair}
          amount={amount}
          onClose={() => setConfirm(false)}
        />
      )}
    </>
  );
}
