// // src/pages/Investments.jsx
// import React, { useEffect, useState } from "react";
// import { motion } from "framer-motion";
// import { investmentService } from "../../api/investmentApi";
// import { useTheme } from "../ui/ThemeContext";
// import { BanknotesIcon, CpuChipIcon, SparklesIcon } from "@heroicons/react/24/solid";

// export default function Investments() {
//   const { theme } = useTheme();
//   const isDark = theme === "dark";

//   const [investments, setInvestments] = useState([]);
//   const [stats, setStats] = useState(null);
//   const [todayEarnings, setTodayEarnings] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   // Pagination
//   const [page, setPage] = useState(1);
//   const [totalPages, setTotalPages] = useState(1);

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         setLoading(true);
//         const [invRes, statsRes, todayRes] = await Promise.all([
//           investmentService.getInvestments({ page, limit: 20 }),
//           investmentService.getEarningsStats(),
//           investmentService.getTodayEarnings(),
//         ]);

//         setInvestments(invRes?.investments || []);
//         setTotalPages(invRes?.pagination?.pages || 1);
//         setStats(statsRes?.data || {});
//         setTodayEarnings(todayRes?.data || { totalToday: 0 });
//       } catch (err) {
//         console.error(err);
//         setError("Failed to load investment data. Please try again.");
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchData();
//   }, [page]);

//   if (loading) {
//     return (
//       <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-950">
//         <motion.div
//           animate={{ rotate: 360 }}
//           transition={{ duration: 1.2, repeat: Infinity, ease: "linear" }}
//           className="w-14 h-14 border-4 border-orange-500 border-t-transparent rounded-full"
//         />
//       </div>
//     );
//   }

//   if (error) {
//     return (
//       <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-950 text-gray-900 dark:text-white p-6">
//         <div className="text-center max-w-md">
//           <p className="text-red-600 dark:text-red-400 text-xl font-medium mb-4">{error}</p>
//           <button
//             onClick={() => window.location.reload()}
//             className="px-6 py-3 bg-orange-600 hover:bg-orange-700 text-white rounded-xl font-medium transition"
//           >
//             Retry
//           </button>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className={`min-h-screen p-5 sm:p-6 lg:p-8 bg-gray-50 dark:bg-gray-950 text-gray-900 dark:text-gray-100 transition-colors duration-300`}>
//       {/* Top CTA */}
//       <motion.div
//         initial={{ opacity: 0, y: -20 }}
//         animate={{ opacity: 1, y: 0 }}
//         className="max-w-5xl mx-auto mb-10"
//       >
//         <div className="bg-gradient-to-r from-orange-600 to-orange-500 dark:from-orange-700 dark:to-orange-600 rounded-2xl p-6 sm:p-8 shadow-xl text-white text-center">
//           <h2 className="text-2xl sm:text-3xl font-bold mb-3">Ready to Start Trading?</h2>
//           <p className="text-orange-100 dark:text-orange-200 mb-6 max-w-2xl mx-auto">
//             Deposit funds now to activate AI-powered trading plans and start earning
//           </p>
//           <motion.button
//             whileHover={{ scale: 1.04 }}
//             whileTap={{ scale: 0.97 }}
//             className="px-10 py-4 bg-white dark:bg-gray-900 text-orange-600 dark:text-orange-400 font-bold text-lg rounded-xl shadow-lg hover:shadow-2xl transition-all flex items-center gap-3 mx-auto"
//             onClick={() => (window.location.href = "/deposits")}
//           >
//             <BanknotesIcon className="w-6 h-6" />
//             <Link to="/deposits">Deposit to Trade Now</Link>
//           </motion.button>
//         </div>
//       </motion.div>

//       <div className="max-w-5xl mx-auto">
//         {/* Header */}
//         <motion.h1
//           initial={{ opacity: 0, y: -15 }}
//           animate={{ opacity: 1, y: 0 }}
//           className="text-3xl sm:text-4xl font-bold mb-8 text-orange-600 dark:text-orange-400 text-center md:text-left"
//         >
//           Investments Dashboard
//         </motion.h1>

//         {/* Stats */}
//         <motion.div
//           initial="hidden"
//           animate="visible"
//           variants={{ hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.12 } } }}
//           className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6 mb-12"
//         >
//           {[
//             { title: "Total Earnings", value: stats?.totalEarnings ?? 0, icon: BanknotesIcon },
//             { title: "Today's Earnings", value: todayEarnings?.totalToday ?? 0, icon: SparklesIcon },
//             { title: "Active Plans", value: stats?.activeInvestments?.length ?? 0, icon: CpuChipIcon },
//           ].map((item, i) => (
//             <motion.div
//               key={i}
//               variants={{ hidden: { y: 30, opacity: 0 }, visible: { y: 0, opacity: 1 } }}
//               whileHover={{ y: -6 }}
//               className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 shadow-md dark:shadow-xl p-6 text-center transition-all"
//             >
//               <item.icon className="w-10 h-10 mx-auto mb-4 text-orange-600 dark:text-orange-500" />
//               <h3 className="text-lg font-medium text-gray-600 dark:text-gray-400 mb-1">{item.title}</h3>
//               <p className="text-3xl font-bold text-gray-900 dark:text-white">{item.value} {item.title.includes("Earnings") && "USDT"}</p>
//             </motion.div>
//           ))}
//         </motion.div>

//         {/* Investment Plans */}
//         <motion.section initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }}>
//           <h2 className="text-2xl sm:text-3xl font-semibold mb-6 text-gray-900 dark:text-gray-100">
//             Your Investment Plans
//           </h2>

//           {investments.length === 0 ? (
//             <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 p-10 text-center shadow-md">
//               <p className="text-gray-600 dark:text-gray-400 text-lg mb-4">No active investments yet</p>
//               <p className="text-gray-500 dark:text-gray-500 mb-6">Deposit funds and choose a plan to start earning with AI-powered trading</p>
//               <button
//                 onClick={() => (window.location.href = "/dashboard/deposits")}
//                 className="px-8 py-3.5 bg-orange-600 hover:bg-orange-700 text-white font-medium rounded-xl shadow-md transition"
//               >
//                 Deposit & Invest Now
//               </button>
//             </div>
//           ) : (
//             <>
//               <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//                 {investments.map((inv) => (
//                   <motion.div
//                     key={inv.id}
//                     initial={{ opacity: 0, y: 20 }}
//                     animate={{ opacity: 1, y: 0 }}
//                     whileHover={{ y: -6 }}
//                     className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 shadow-md dark:shadow-xl overflow-hidden transition-all"
//                   >
//                     <div className="p-6">
//                       <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">{inv.planName || `Plan #${inv.id}`}</h3>
//                       <p className="text-gray-600 dark:text-gray-400 mb-5">
//                         Invested: {inv.amount ?? 0} USDT • {inv.date || "—"}
//                       </p>

//                       <div className="flex justify-between items-center text-sm mb-4">
//                         <span className="text-gray-500 dark:text-gray-400">Status</span>
//                         <span className={`font-semibold px-3 py-1 rounded-full text-xs ${
//                           inv.status === "active"
//                             ? "bg-emerald-100 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800/40"
//                             : "bg-amber-100 dark:bg-amber-950/40 text-amber-700 dark:text-amber-300 border border-amber-200 dark:border-amber-800/40"
//                         }`}>
//                           {inv.status?.toUpperCase() || "UNKNOWN"}
//                         </span>
//                       </div>

//                       {inv.profit !== undefined && (
//                         <div className="flex justify-between text-sm">
//                           <span className="text-gray-500 dark:text-gray-400">Current PnL</span>
//                           <span className={`font-bold ${inv.profit >= 0 ? "text-emerald-600 dark:text-emerald-400" : "text-red-600 dark:text-red-400"}`}>
//                             {inv.profit >= 0 ? "+" : ""}${Math.abs(inv.profit).toFixed(2)}
//                           </span>
//                         </div>
//                       )}
//                     </div>

//                     <div className="bg-gray-50 dark:bg-gray-800/50 px-6 py-4 flex justify-end border-t border-gray-200 dark:border-gray-800">
//                       <button
//                         onClick={() => alert("View earnings for " + inv.id)}
//                         className="px-5 py-2.5 bg-orange-600 hover:bg-orange-700 text-white font-medium rounded-lg transition shadow-sm"
//                       >
//                         View Earnings
//                       </button>
//                     </div>
//                   </motion.div>
//                 ))}
//               </div>

//               {/* Pagination */}
//               {totalPages > 1 && (
//                 <div className="flex justify-center mt-8 gap-3 flex-wrap">
//                   {Array.from({ length: totalPages }, (_, i) => (
//                     <button
//                       key={i + 1}
//                       onClick={() => setPage(i + 1)}
//                       className={`px-4 py-2 rounded-lg font-medium border ${
//                         page === i + 1
//                           ? "bg-orange-600 text-white border-orange-600"
//                           : isDark
//                             ? "bg-gray-900 text-gray-300 border-gray-700 hover:bg-gray-800"
//                             : "bg-white text-gray-900 border-gray-300 hover:bg-gray-100"
//                       }`}
//                     >
//                       {i + 1}
//                     </button>
//                   ))}
//                 </div>
//               )}
//             </>
//           )}
//         </motion.section>
//       </div>
//     </div>
//   );
// }





// src/pages/Investments.jsx
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { investmentService } from "../../api/investmentApi";
import { useTheme } from "../ui/ThemeContext";
import { BanknotesIcon, CpuChipIcon, SparklesIcon } from "@heroicons/react/24/solid";

export default function Investments() {
  const { theme } = useTheme();
  const isDark = theme === "dark";

  const [investments, setInvestments] = useState([]);
  const [stats, setStats] = useState(null);
  const [todayEarnings, setTodayEarnings] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Pagination
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const [invRes, statsRes, todayRes] = await Promise.all([
          investmentService.getInvestments({ page, limit: 20 }),
          investmentService.getEarningsStats(),
          investmentService.getTodayEarnings(),
        ]);

        setInvestments(invRes?.investments || []);
        setTotalPages(invRes?.pagination?.pages || 1);
        setStats(statsRes?.data || {});
        setTodayEarnings(todayRes?.data || { totalToday: 0 });
      } catch (err) {
        console.error(err);
        setError("Failed to load investment data. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [page]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-950">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1.2, repeat: Infinity, ease: "linear" }}
          className="w-14 h-14 border-4 border-orange-500 border-t-transparent rounded-full"
        />
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-950 text-gray-900 dark:text-white p-6">
        <div className="text-center max-w-md">
          <p className="text-red-600 dark:text-red-400 text-xl font-medium mb-4">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="px-6 py-3 bg-orange-600 hover:bg-orange-700 text-white rounded-xl font-medium transition"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className={`min-h-screen p-5 sm:p-6 lg:p-8 bg-gray-50 dark:bg-gray-950 text-gray-900 dark:text-gray-100 transition-colors duration-300`}>
      
      {/* Top CTA */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-5xl mx-auto mb-10"
      >
        <div className="bg-gradient-to-r from-orange-600 to-orange-500 dark:from-orange-700 dark:to-orange-600 rounded-2xl p-6 sm:p-8 shadow-xl text-white text-center">
          <h2 className="text-2xl sm:text-3xl font-bold mb-3">Ready to Start Trading?</h2>
          <p className="text-orange-100 dark:text-orange-200 mb-6 max-w-2xl mx-auto">
            Deposit funds now to activate AI-powered trading plans and start earning
          </p>
          <motion.button
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.97 }}
            className="px-10 py-4 bg-white dark:bg-gray-900 text-orange-600 dark:text-orange-400 font-bold text-lg rounded-xl shadow-lg hover:shadow-2xl transition-all flex items-center gap-3 mx-auto"
          >
            <BanknotesIcon className="w-6 h-6" />
            <Link to="/deposits">Deposit to Trade Now</Link>
          </motion.button>
        </div>
      </motion.div>

      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <motion.h1
          initial={{ opacity: 0, y: -15 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-3xl sm:text-4xl font-bold mb-8 text-orange-600 dark:text-orange-400 text-center md:text-left"
        >
          Investments Dashboard
        </motion.h1>

        {/* Stats */}
        <motion.div
          initial="hidden"
          animate="visible"
          variants={{ hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.12 } } }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6 mb-12"
        >
          {[
            { title: "Total Earnings", value: stats?.totalEarnings ?? 0, icon: BanknotesIcon },
            { title: "Today's Earnings", value: todayEarnings?.totalToday ?? 0, icon: SparklesIcon },
            { title: "Active Plans", value: stats?.activeInvestments?.length ?? 0, icon: CpuChipIcon },
          ].map((item, i) => (
            <motion.div
              key={i}
              variants={{ hidden: { y: 30, opacity: 0 }, visible: { y: 0, opacity: 1 } }}
              whileHover={{ y: -6 }}
              className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 shadow-md dark:shadow-xl p-6 text-center transition-all"
            >
              <item.icon className="w-10 h-10 mx-auto mb-4 text-orange-600 dark:text-orange-500" />
              <h3 className="text-lg font-medium text-gray-600 dark:text-gray-400 mb-1">{item.title}</h3>
              <p className="text-3xl font-bold text-gray-900 dark:text-white">{item.value} {item.title.includes("Earnings") && "USDT"}</p>
            </motion.div>
          ))}
        </motion.div>

        {/* Investment Plans */}
        <motion.section initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }}>
          <h2 className="text-2xl sm:text-3xl font-semibold mb-6 text-gray-900 dark:text-gray-100">
            Your Investment Plans
          </h2>

          {investments.length === 0 ? (
            <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 p-10 text-center shadow-md">
              <p className="text-gray-600 dark:text-gray-400 text-lg mb-4">No active investments yet</p>
              <p className="text-gray-500 dark:text-gray-500 mb-6">Deposit funds and choose a plan to start earning with AI-powered trading</p>
              <Link
                to="/deposits"
                className="px-8 py-3.5 bg-orange-600 hover:bg-orange-700 text-white font-medium rounded-xl shadow-md transition inline-block"
              >
                Deposit & Invest Now
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {investments.map((inv) => (
                <motion.div
                  key={inv.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  whileHover={{ y: -6 }}
                  className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 shadow-md dark:shadow-xl overflow-hidden transition-all"
                >
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">{inv.planName || `Plan #${inv.id}`}</h3>
                    <p className="text-gray-600 dark:text-gray-400 mb-5">
                      Invested: {inv.amount ?? 0} USDT • {inv.date || "—"}
                    </p>

                    <div className="flex justify-between items-center text-sm mb-4">
                      <span className="text-gray-500 dark:text-gray-400">Status</span>
                      <span className={`font-semibold px-3 py-1 rounded-full text-xs ${
                        inv.status === "active"
                          ? "bg-emerald-100 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800/40"
                          : "bg-amber-100 dark:bg-amber-950/40 text-amber-700 dark:text-amber-300 border border-amber-200 dark:border-amber-800/40"
                      }`}>
                        {inv.status?.toUpperCase() || "UNKNOWN"}
                      </span>
                    </div>

                    {inv.profit !== undefined && (
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-500 dark:text-gray-400">Current PnL</span>
                        <span className={`font-bold ${inv.profit >= 0 ? "text-emerald-600 dark:text-emerald-400" : "text-red-600 dark:text-red-400"}`}>
                          {inv.profit >= 0 ? "+" : ""}${Math.abs(inv.profit).toFixed(2)}
                        </span>
                      </div>
                    )}
                  </div>

                  <div className="bg-gray-50 dark:bg-gray-800/50 px-6 py-4 flex justify-end border-t border-gray-200 dark:border-gray-800">
                    <Link
                      to="/deposits"
                      className="px-5 py-2.5 bg-orange-600 hover:bg-orange-700 text-white font-medium rounded-lg transition shadow-sm"
                    >
                      Deposit to Invest
                    </Link>
                  </div>
                </motion.div>
              ))}
            </div>
          )}

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex justify-center mt-8 gap-3 flex-wrap">
              {Array.from({ length: totalPages }, (_, i) => (
                <button
                  key={i + 1}
                  onClick={() => setPage(i + 1)}
                  className={`px-4 py-2 rounded-lg font-medium border ${
                    page === i + 1
                      ? "bg-orange-600 text-white border-orange-600"
                      : isDark
                        ? "bg-gray-900 text-gray-300 border-gray-700 hover:bg-gray-800"
                        : "bg-white text-gray-900 border-gray-300 hover:bg-gray-100"
                  }`}
                >
                  {i + 1}
                </button>
              ))}
            </div>
          )}
        </motion.section>
      </div>
    </div>
  );
}
