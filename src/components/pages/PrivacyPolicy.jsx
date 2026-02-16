// src/pages/WithdrawalPolicy.jsx
import React from "react";
import { motion } from "framer-motion";
import { useTheme } from "../ui/ThemeContext";

export default function WithdrawalPolicy() {
  const { theme } = useTheme();
  const isDark = theme === "dark";

  return (
    <div className={`min-h-screen pt-16 pb-20 px-5 sm:px-8 transition-colors ${isDark ? "bg-slate-950 text-gray-200" : "bg-gray-50 text-gray-900"}`}>
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl sm:text-5xl font-bold text-orange-600 dark:text-orange-400 mb-4">
            Withdrawal Policy
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-400">
            Credence Flux – Effective February 2026
          </p>
        </motion.div>

        {/* Content – using ONLY your exact provided text */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.8 }}
          className="prose prose-lg dark:prose-invert max-w-none space-y-10 leading-relaxed"
        >
          <section>
            <h2 className="text-3xl font-bold text-orange-600 dark:text-orange-400 mb-6">
              Credence Flux Withdrawal Policy
            </h2>

            <p className="mb-6">
              In order to achieve the base purpose in which our institution was created on which are
            </p>

            <ul className="list-disc pl-6 space-y-3 mb-8">
              <li>Help our traders build and maintain consistent non disruptive trading strategies.</li>
              <li>Protect our traders from short term liquidity shocks</li>
              <li>Also to ensure a high risk management integrity.</li>
            </ul>

            <p className="mb-6">
              We have implemented a capital policy. All deposited capital’s are subjected to a fixed lock period of 35 days. During this time you can increase your capital in order to maximize profits but your capital will remain a fixed deposit for the duration of the aforementioned number of days
            </p>
          </section>

          <section>
            <h2 className="text-3xl font-bold text-orange-600 dark:text-orange-400 mb-6">
              What can I withdraw?
            </h2>

            <p className="mb-6">
              The capital locked policy does not affect your profits. All generated profits can be withdrawn and processed at any time of the day as long as you follow the due processes :
            </p>

            <ul className="list-disc pl-6 space-y-4">
              <li>
                <strong>Closed positions profits are the only profits that can be withdrawn.</strong>
              </li>
              <li>
                <strong>Withdraw threshold:</strong> There is no limit that must be met before you can withdraw. You can withdraw any amount of profit accumulated.
              </li>
              <li>
                <strong>withdrawal exceeding accumulated profits will not be processed,</strong>
              </li>
            </ul>
          </section>

          <section className="mt-12 pt-8 border-t border-gray-200 dark:border-gray-700">
            <p className="text-center text-sm text-gray-500 dark:text-gray-400 italic">
              For any questions regarding withdrawals or your account, please contact support.
            </p>
          </section>
        </motion.div>

        {/* Footer note */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="text-center mt-16 text-sm text-gray-500 dark:text-gray-400"
        >
          © {new Date().getFullYear()} Credence Flux. All rights reserved.
        </motion.p>
      </div>
    </div>
  );
}