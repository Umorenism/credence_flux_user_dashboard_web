// src/pages/Support.jsx
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  CpuChipIcon,
  QuestionMarkCircleIcon,
  ChatBubbleLeftRightIcon,
  EnvelopeIcon,
  LifebuoyIcon,
  DocumentTextIcon,
  ChevronDownIcon,
  ChevronUpIcon,
  SparklesIcon,
} from '@heroicons/react/24/solid';
import { useTheme } from '../ui/ThemeContext'; // ← adjust path to your ThemeContext

export default function Support() {
  const { theme, toggleTheme } = useTheme();

  const [expandedFaq, setExpandedFaq] = useState(null);

  const faqs = [
    {
      q: 'How does the AI trading engine work?',
      a: 'Our Neural Engine analyzes real-time market data, on-chain metrics, and sentiment using advanced machine learning models to generate high-accuracy signals.',
    },
    {
      q: 'Is my funds safe?',
      a: 'Yes. We use cold wallet storage, multi-signature protocols, and industry-leading security. Your funds are never exposed during AI trading.',
    },
    {
      q: 'How do I join a community trade?',
      a: 'Go to the "Join Trade" section, browse live signals from top performers, and tap "JOIN" to automatically copy their position with your chosen leverage.',
    },
    {
      q: 'What are the referral rewards?',
      a: 'Earn up to 20% lifetime commission on your referrals\' trading fees, plus tiered bonuses up to $2000 USDT and VIP AI signals.',
    },
    {
      q: 'How to deposit/withdraw funds?',
      a: 'Navigate to Wallet → Deposit/Withdraw. We support USDT, BTC, ETH and more on multiple networks (ERC20, TRC20, BEP20).',
    },
  ];

  return (
    <div
      className={`min-h-screen w-full flex flex-col ${
        theme === 'dark' ? 'bg-gray-950' : 'bg-gray-50'
      } text-gray-900 dark:text-gray-100 transition-colors duration-300 relative overflow-hidden`}
    >
     

      {/* Subtle animated grid background – toned down in light mode */}
      <div className="fixed inset-0 opacity-[0.03] dark:opacity-10 pointer-events-none -z-10">
        <motion.div
          animate={{ backgroundPosition: ['0% 0%', '100% 100%'] }}
          transition={{ duration: 90, repeat: Infinity, ease: 'linear' }}
          className="w-full h-full"
          style={{
            backgroundImage: `linear-gradient(${
              theme === 'dark' ? '#22d3ee' : '#60a5fa'
            } 1px, transparent 1px), linear-gradient(90deg, ${
              theme === 'dark' ? '#22d3ee' : '#60a5fa'
            } 1px, transparent 1px)`,
            backgroundSize: '70px 70px',
          }}
        />
      </div>

      <div className="relative z-10 flex flex-col w-full max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 gap-8 pb-24">

        {/* Header */}
        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="text-center">
          <div className="flex items-center justify-center gap-3 mb-4">
            <CpuChipIcon className="w-10 h-10 text-cyan-600 dark:text-cyan-400" />
            <h1 className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-cyan-600 to-blue-600 dark:from-cyan-400 dark:to-blue-400 bg-clip-text text-transparent">
              Help & Support
            </h1>
          </div>
          <p className="text-gray-600 dark:text-gray-400">We're here to assist you 24/7</p>
        </motion.div>

        {/* Support Options Cards */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="grid grid-cols-1 sm:grid-cols-3 gap-5 lg:gap-6"
        >
          {[
            {
              icon: ChatBubbleLeftRightIcon,
              title: 'Live Chat',
              desc: 'Instant support from our AI assistant & team',
              color: 'from-cyan-500 to-blue-600',
            },
            {
              icon: EnvelopeIcon,
              title: 'Email Support',
              desc: 'Reply within 1 hour • support@starbiit.com',
              color: 'from-purple-500 to-pink-600',
            },
            {
              icon: DocumentTextIcon,
              title: 'Knowledge Base',
              desc: 'Guides, tutorials & FAQ',
              color: 'from-emerald-500 to-green-600',
            },
          ].map((option, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, scale: 0.94 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3 + idx * 0.08 }}
              whileHover={{ y: -6, scale: 1.02 }}
              className={`bg-white dark:bg-gray-900/90 rounded-2xl border ${
                theme === 'dark' ? 'border-gray-700' : 'border-gray-200'
              } shadow-md dark:shadow-xl p-6 text-center cursor-pointer transition-all hover:shadow-lg`}
            >
              <div
                className={`p-4 rounded-xl bg-gradient-to-br ${option.color} w-fit mx-auto mb-5 shadow-md`}
              >
                <option.icon className="w-10 h-10 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                {option.title}
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">{option.desc}</p>
            </motion.div>
          ))}
        </motion.div>

        {/* FAQ Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className={`bg-white dark:bg-gray-900/90 rounded-2xl border ${
            theme === 'dark' ? 'border-gray-700' : 'border-gray-200'
          } shadow-md dark:shadow-xl p-6 sm:p-8`}
        >
          <h2 className="text-2xl sm:text-3xl font-bold text-center mb-7 flex items-center justify-center gap-3 text-gray-900 dark:text-white">
            <QuestionMarkCircleIcon className="w-8 h-8 text-cyan-600 dark:text-cyan-400" />
            Frequently Asked Questions
          </h2>

          <div className="space-y-4">
            {faqs.map((faq, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 + idx * 0.07 }}
                className={`rounded-xl border overflow-hidden ${
                  theme === 'dark'
                    ? 'border-gray-700 bg-gray-800/40'
                    : 'border-gray-200 bg-gray-50'
                }`}
              >
                <button
                  onClick={() => setExpandedFaq(expandedFaq === idx ? null : idx)}
                  className={`w-full px-5 py-5 flex items-center justify-between text-left transition ${
                    expandedFaq === idx
                      ? 'bg-gray-100 dark:bg-gray-800/70'
                      : 'hover:bg-gray-100 dark:hover:bg-gray-800/50'
                  }`}
                >
                  <p className="text-base sm:text-lg font-medium text-gray-900 dark:text-gray-100 pr-4">
                    {faq.q}
                  </p>
                  {expandedFaq === idx ? (
                    <ChevronUpIcon className="w-6 h-6 text-cyan-600 dark:text-cyan-400 flex-shrink-0" />
                  ) : (
                    <ChevronDownIcon className="w-6 h-6 text-cyan-600 dark:text-cyan-400 flex-shrink-0" />
                  )}
                </button>

                <AnimatePresence>
                  {expandedFaq === idx && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="px-5 pb-5 pt-1"
                    >
                      <p className="text-sm sm:text-base text-gray-700 dark:text-gray-300 leading-relaxed">
                        {faq.a}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Emergency / Urgent Support */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className={`rounded-2xl border p-6 sm:p-8 text-center shadow-md ${
            theme === 'dark'
              ? 'bg-red-950/30 border-red-800/50'
              : 'bg-red-50 border-red-200'
          }`}
        >
          <LifebuoyIcon className="w-14 h-14 text-red-600 dark:text-red-500 mx-auto mb-4" />
          <h3 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white mb-3">
            Need Immediate Help?
          </h3>
          <p className="text-gray-700 dark:text-gray-300 mb-6 max-w-xl mx-auto">
            For urgent issues (withdrawal problems, security concerns, account access)
          </p>
          <motion.button
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.97 }}
            className="px-8 py-4 bg-red-600 hover:bg-red-700 dark:bg-red-600 dark:hover:bg-red-500 text-white font-semibold rounded-xl shadow-lg transition"
          >
            Contact Emergency Support
          </motion.button>
        </motion.div>

        {/* Footer note */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7 }}
          className="text-center text-sm text-gray-500 dark:text-gray-400 pt-6 border-t border-gray-200 dark:border-gray-800"
        >
          <p className="flex items-center justify-center gap-2">
            <SparklesIcon className="w-5 h-5 text-cyan-500 dark:text-cyan-400" />
            Average response time: <span className="text-cyan-600 dark:text-cyan-400 font-medium">under 3 minutes</span>
          </p>
          <p className="mt-2">Powered by Neural Support Engine • 24/7 Availability</p>
        </motion.div>
      </div>

      {/* Floating Contact Button */}
      <motion.button
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 0.8, type: 'spring', stiffness: 120 }}
        whileHover={{ scale: 1.12 }}
        whileTap={{ scale: 0.94 }}
        className="fixed bottom-7 left-1/2 -translate-x-1/2 bg-gradient-to-br from-cyan-500 to-blue-600 dark:from-cyan-600 dark:to-blue-500 p-5 rounded-full shadow-2xl border-4 border-cyan-300/40 dark:border-cyan-400/30 z-50"
      >
        <ChatBubbleLeftRightIcon className="w-8 h-8 text-white" />
      </motion.button>
    </div>
  );
}