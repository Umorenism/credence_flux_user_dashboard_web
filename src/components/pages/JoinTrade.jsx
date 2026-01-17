// // src/pages/JoinTrade.jsx  (or rename to JoinSignals.jsx)
// import React from 'react';
// import { motion } from 'framer-motion';
// import { TelegramIcon } from 'react-share';   // or use heroicons + custom svg
// import QRCode from 'react-qr-code';
// import {
//   ArrowTrendingUpIcon,
//   UsersIcon,
//   ShieldCheckIcon,
//   BellIcon,
//   ChartBarIcon,
// } from '@heroicons/react/24/solid';

// const TELEGRAM_CHANNEL_LINK = "https://t.me/+YourChannelInviteLinkHere"; // ← change this
// const TELEGRAM_QR_VALUE = TELEGRAM_CHANNEL_LINK;

// export default function JoinTrade() {
//   return (
//     <div className="min-h-screen bg-gray-950 text-white flex flex-col">
//       <div className="flex-1 flex items-center justify-center p-5 sm:p-8">
//         <motion.div
//           initial={{ opacity: 0, y: 30 }}
//           animate={{ opacity: 1, y: 0 }}
//           className="w-full max-w-lg bg-gray-900/80 backdrop-blur rounded-3xl border border-orange-900/50 shadow-2xl p-8 sm:p-10"
//         >
//           <div className="text-center mb-8">
//             <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-orange-600/20 mb-6">
//               <BellIcon className="w-10 h-10 text-orange-400" />
//             </div>
//             <h1 className="text-3xl sm:text-4xl font-bold text-orange-400 mb-3">
//               Live Trading Signals
//             </h1>
//             <p className="text-gray-300 text-lg">
//               Join our Telegram channel for real-time entries, targets & stop-losses
//             </p>
//           </div>

//           {/* Trust elements */}
//           <div className="grid grid-cols-2 gap-5 mb-10">
//             {[
//               { icon: UsersIcon, label: "2,400+ Members", color: "text-orange-400" },
//               { icon: ChartBarIcon, label: "85%+ Avg Win Rate", color: "text-orange-400" },
//               { icon: ShieldCheckIcon, label: "Risk Managed", color: "text-orange-300" },
//               { icon: ArrowTrendingUpIcon, label: "Daily Signals", color: "text-orange-300" },
//             ].map((item, i) => (
//               <motion.div
//                 key={i}
//                 initial={{ opacity: 0, scale: 0.9 }}
//                 animate={{ opacity: 1, scale: 1 }}
//                 transition={{ delay: i * 0.1 }}
//                 className="text-center"
//               >
//                 <item.icon className={`w-8 h-8 mx-auto mb-2 ${item.color}`} />
//                 <p className="font-medium text-gray-200">{item.label}</p>
//               </motion.div>
//             ))}
//           </div>

//           {/* Big action button */}
//           <motion.a
//             href={TELEGRAM_CHANNEL_LINK}
//             target="_blank"
//             rel="noopener noreferrer"
//             whileHover={{ scale: 1.04 }}
//             whileTap={{ scale: 0.96 }}
//             className="block w-full py-5 px-8 bg-gradient-to-r from-orange-600 to-orange-500 hover:from-orange-500 hover:to-orange-400 rounded-2xl text-white text-xl font-bold text-center shadow-xl transition-all mb-8 flex items-center justify-center gap-3"
//           >
//             <span className="text-2xl">Join Telegram Now</span>
//             <TelegramIcon size={32} round={true} />
//           </motion.a>

//           {/* QR Code for mobile */}
//           <div className="text-center">
//             <p className="text-gray-400 mb-4">Or scan to join instantly</p>
//             <div className="inline-block bg-white p-4 rounded-2xl shadow-2xl">
//               <QRCode
//                 value={TELEGRAM_QR_VALUE}
//                 size={180}
//                 level="H"
//                 fgColor="#f97316" // orange
//               />
//             </div>
//           </div>

//           <p className="text-center text-sm text-gray-500 mt-8">
//             Real-time alerts • Entry / Exit signals • Risk management levels
//           </p>
//         </motion.div>
//       </div>

//       {/* Optional subtle footer note */}
//       <div className="text-center py-6 text-sm text-gray-600 border-t border-gray-800">
//         Trading involves risk. Past performance is not indicative of future results.
//       </div>
//     </div>
//   );
// }





// src/pages/JoinTrade.jsx  (or JoinSignals.jsx)
import React from 'react';
import { motion } from 'framer-motion';
import { TelegramIcon } from 'react-share';   // or replace with heroicons svg if preferred
import QRCode from 'react-qr-code';
import {
  ArrowTrendingUpIcon,
  UsersIcon,
  ShieldCheckIcon,
  BellIcon,
  ChartBarIcon,
} from '@heroicons/react/24/solid';
import { useTheme } from '../ui/ThemeContext'; // adjust path if needed

const TELEGRAM_CHANNEL_LINK = "https://t.me/+YourChannelInviteLinkHere"; // ← change this
const TELEGRAM_QR_VALUE = TELEGRAM_CHANNEL_LINK;

export default function JoinTrade() {
  const { theme, toggleTheme } = useTheme();

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 text-gray-900 dark:text-white transition-colors duration-300 flex flex-col">
      {/* Theme toggle – top right */}
     

      <div className="flex-1 flex items-center justify-center p-5 sm:p-8 lg:p-12">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="w-full max-w-md sm:max-w-xl bg-white dark:bg-gray-900/90 
                     backdrop-blur-sm rounded-3xl 
                     border border-gray-200 dark:border-orange-900/50 
                     shadow-xl dark:shadow-2xl p-7 sm:p-10 transition-all"
        >
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-full 
                            bg-orange-100 dark:bg-orange-900/40 mb-6 mx-auto">
              <BellIcon className="w-10 h-10 text-orange-600 dark:text-orange-400" />
            </div>
            <h1 className="text-3xl sm:text-4xl font-bold text-orange-600 dark:text-orange-400 mb-3 tracking-tight">
              Live Trading Signals
            </h1>
            <p className="text-gray-600 dark:text-gray-300 text-lg leading-relaxed">
              Join our Telegram channel for real-time entries, targets & stop-losses
            </p>
          </div>

          {/* Trust / Stats row */}
          <div className="grid grid-cols-2 gap-4 sm:gap-6 mb-10">
            {[
              { icon: UsersIcon,      label: "2,400+ Members",    color: "text-orange-600 dark:text-orange-400" },
              { icon: ChartBarIcon,   label: "85%+ Avg Win Rate", color: "text-orange-600 dark:text-orange-400" },
              { icon: ShieldCheckIcon,label: "Risk Managed",      color: "text-emerald-600 dark:text-emerald-400" },
              { icon: ArrowTrendingUpIcon, label: "Daily Signals", color: "text-emerald-600 dark:text-emerald-400" },
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.92 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: i * 0.08 + 0.2, duration: 0.5 }}
                className="text-center"
              >
                <item.icon className={`w-8 h-8 mx-auto mb-2.5 ${item.color}`} />
                <p className="font-semibold text-sm sm:text-base text-gray-800 dark:text-gray-200">
                  {item.label}
                </p>
              </motion.div>
            ))}
          </div>

          {/* Main CTA button */}
          <motion.a
            href={TELEGRAM_CHANNEL_LINK}
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.03, boxShadow: "0 10px 25px -5px rgba(249,115,22,0.4)" }}
            whileTap={{ scale: 0.97 }}
            className="block w-full py-5 px-8 
                       bg-gradient-to-r from-orange-600 to-orange-500 
                       dark:from-orange-600 dark:to-orange-500 
                       hover:from-orange-500 hover:to-orange-400 
                       rounded-2xl text-white text-xl font-bold text-center 
                       shadow-lg dark:shadow-xl transition-all mb-9 
                       flex items-center justify-center gap-3"
          >
            <span>Join Telegram Now</span>
            <TelegramIcon size={32} round bgStyle={{ fill: "white" }} />
          </motion.a>

          {/* QR Code section */}
          <div className="text-center">
            <p className="text-gray-500 dark:text-gray-400 mb-5 font-medium">
              Or scan to join instantly
            </p>
            <div className="inline-block bg-white dark:bg-white p-4 rounded-2xl 
                            shadow-xl dark:shadow-2xl mx-auto">
              <QRCode
                value={TELEGRAM_QR_VALUE}
                size={180}
                level="H"
                fgColor="#ea580c" // tailwind orange-600
                bgColor="#ffffff"
              />
            </div>
          </div>

          <p className="text-center text-sm text-gray-500 dark:text-gray-500 mt-10 leading-relaxed">
            Real-time alerts • Entry / Exit signals • Risk-managed levels
          </p>
        </motion.div>
      </div>

      {/* Footer disclaimer */}
      <div className="text-center py-6 text-sm text-gray-500 dark:text-gray-600 
                      border-t border-gray-200 dark:border-gray-800 bg-white/50 dark:bg-gray-950/50">
        Trading involves significant risk. Past performance is not indicative of future results.
      </div>
    </div>
  );
}