




// import React, { useState, useEffect } from "react";
// import { motion, AnimatePresence } from "framer-motion";
// import {
//   ArrowUpRightIcon,
//   ArrowDownRightIcon,
//   MagnifyingGlassIcon,
//   ChevronDownIcon,
//   ChevronUpIcon,
// } from "@heroicons/react/24/solid";
// import { userService } from "../../api/userApi";
// import { useTheme } from "../ui/ThemeContext";

// export default function Transactions() {
//   const { theme } = useTheme();
//   const isDark = theme === "dark";

//   const [searchTerm, setSearchTerm] = useState("");
//   const [expandedId, setExpandedId] = useState(null);
//   const [transactions, setTransactions] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [pagination, setPagination] = useState({
//     page: 1,
//     limit: 20,
//     total: 0,
//     pages: 0,
//   });

//   const fetchTransactions = async (page = 1) => {
//     try {
//       setLoading(true);
//       setError(null);
//       const res = await userService.getTransactions({ page, limit: pagination.limit });
//       const txs = res?.data?.transactions || [];
//       const pageInfo = res?.data?.pagination || {};

//       const mapped = txs.map((tx) => ({
//         id: tx._id,
//         type: (tx.type || "unknown").toLowerCase(),
//         amount: tx.amount || 0,
//         currency: tx.currency || tx.cryptocurrency || "USDT",
//         from: tx.from || "—",
//         to: tx.to || tx.walletAddress || "—",
//         status: (tx.status || "pending").toLowerCase(),
//         timestamp: new Date(tx.createdAt || tx.date || Date.now()).toLocaleString(),
//         txid: tx.txHash || tx.transactionId || tx.hash || "—",
//         fee: tx.fee || tx.networkFee || 0,
//         description: tx.description || tx.note || "",
//       }));

//       mapped.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));

//       setTransactions(mapped);
//       setPagination(pageInfo);
//     } catch (err) {
//       console.error(err);
//       setError("Failed to load transactions. Try again later.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchTransactions(pagination.page);
//   }, [pagination.page]);

//   // Filter within current page
//   const filtered = transactions.filter((tx) =>
//     `${tx.type} ${tx.currency} ${tx.from} ${tx.to} ${tx.txid} ${tx.description}`
//       .toLowerCase()
//       .includes(searchTerm.toLowerCase())
//   );

//   const getIconForType = (type) => {
//     if (type === "deposit") return <ArrowDownRightIcon className="w-8 h-8 text-green-600 dark:text-green-400" />;
//     if (type === "withdraw") return <ArrowUpRightIcon className="w-8 h-8 text-orange-600 dark:text-orange-400" />;
//     return <ArrowUpRightIcon className="w-8 h-8 text-gray-500 dark:text-gray-400" />;
//   };

//   const getTypeColor = (type) => {
//     if (type === "deposit") return "text-green-600 dark:text-green-400";
//     if (type === "withdraw") return "text-orange-600 dark:text-orange-400";
//     return "text-gray-600 dark:text-gray-300";
//   };

//   const getStatusStyle = (status) => {
//     if (status === "completed")
//       return { color: "text-green-700 dark:text-green-400", bg: "bg-green-100 dark:bg-green-950/50", border: "border-green-300 dark:border-green-800/60" };
//     if (status === "pending")
//       return { color: "text-orange-700 dark:text-orange-400", bg: "bg-orange-100 dark:bg-orange-950/50", border: "border-orange-300 dark:border-orange-800/60" };
//     return { color: "text-red-700 dark:text-red-400", bg: "bg-red-100 dark:bg-red-950/50", border: "border-red-300 dark:border-red-800/60" };
//   };

//   const handlePageChange = (newPage) => {
//     if (newPage >= 1 && newPage <= pagination.pages) {
//       setPagination((prev) => ({ ...prev, page: newPage }));
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gray-50 dark:bg-gray-950 text-gray-900 dark:text-white p-5 sm:p-6 transition-colors duration-300">
//       <motion.h1
//         initial={{ opacity: 0, y: -20 }}
//         animate={{ opacity: 1, y: 0 }}
//         className="text-3xl sm:text-4xl font-bold mb-8 text-orange-600 dark:text-orange-400 text-center"
//       >
//         Transaction History
//       </motion.h1>

//       {/* Search bar */}
//       <div className="max-w-5xl mx-auto mb-8">
//         <div className="relative">
//           <MagnifyingGlassIcon className="absolute left-4 top-1/2 -translate-y-1/2 w-6 h-6 text-orange-500 dark:text-orange-400" />
//           <input
//             type="text"
//             value={searchTerm}
//             onChange={(e) => setSearchTerm(e.target.value)}
//             placeholder="Search by type, currency, address, hash..."
//             className="w-full pl-12 pr-5 py-4 
//                        bg-white dark:bg-gray-900 
//                        border border-gray-300 dark:border-gray-700 
//                        rounded-xl text-gray-900 dark:text-white 
//                        placeholder-gray-500 dark:placeholder-gray-500 
//                        focus:border-orange-500 dark:focus:border-orange-500 
//                        focus:ring-2 focus:ring-orange-500/30 
//                        outline-none transition shadow-sm"
//           />
//         </div>
//       </div>

//       <div className="max-w-5xl mx-auto">
//         {loading ? (
//           <div className="flex justify-center items-center py-20">
//             <div className="w-12 h-12 border-4 border-orange-500 border-t-transparent rounded-full animate-spin" />
//           </div>
//         ) : error ? (
//           <div className="text-center py-16 text-red-600 dark:text-red-400 font-medium">{error}</div>
//         ) : filtered.length === 0 ? (
//           <div className="text-center py-20 text-gray-500 dark:text-gray-400">
//             <p className="text-xl mb-3">No transactions found</p>
//             <p>{searchTerm ? "Try a different search term" : "Your transaction history will appear here"}</p>
//           </div>
//         ) : (
//           <AnimatePresence>
//             {filtered.map((tx) => {
//               const st = getStatusStyle(tx.status);
//               const typeColor = getTypeColor(tx.type);

//               return (
//                 <motion.div
//                   key={tx.id}
//                   layout
//                   initial={{ opacity: 0, y: 15 }}
//                   animate={{ opacity: 1, y: 0 }}
//                   exit={{ opacity: 0, y: -15 }}
//                   className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800/60 overflow-hidden mb-5 shadow-md dark:shadow-lg transition-all"
//                 >
//                   <div className="p-5 sm:p-6">
//                     <div className="flex flex-col sm:flex-row justify-between items-start gap-5 mb-5">
//                       <div className="flex gap-4 sm:gap-5">
//                         <div
//                           className={`p-3 sm:p-4 rounded-xl flex-shrink-0 ${
//                             tx.type === "deposit"
//                               ? "bg-green-100 dark:bg-green-950/60"
//                               : "bg-orange-100 dark:bg-orange-950/60"
//                           }`}
//                         >
//                           {getIconForType(tx.type)}
//                         </div>
//                         <div>
//                           <h3 className="text-xl font-semibold capitalize text-gray-900 dark:text-white">
//                             {tx.type}
//                           </h3>
//                           <p className={`text-2xl font-bold ${typeColor} mt-1`}>
//                             {tx.type === "deposit" ? "+" : "-"}
//                             {tx.amount.toLocaleString()} {tx.currency}
//                           </p>
//                           {tx.description && (
//                             <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">{tx.description}</p>
//                           )}
//                         </div>
//                       </div>

//                       <div
//                         className={`px-4 py-2 rounded-full text-sm font-medium border ${st.border} ${st.bg} ${st.color} whitespace-nowrap`}
//                       >
//                         {tx.status.toUpperCase()}
//                       </div>
//                     </div>

//                     <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 text-sm">
//                       <div>
//                         <p className="text-gray-500 dark:text-gray-400">From</p>
//                         <p className="font-mono text-gray-800 dark:text-orange-200/90 break-all mt-1">{tx.from}</p>
//                       </div>
//                       <div>
//                         <p className="text-gray-500 dark:text-gray-400">To</p>
//                         <p className="font-mono text-gray-800 dark:text-orange-200/90 break-all mt-1">{tx.to}</p>
//                       </div>
//                       <div>
//                         <p className="text-gray-500 dark:text-gray-400">Date</p>
//                         <p className="mt-1 text-gray-800 dark:text-gray-300">{tx.timestamp}</p>
//                       </div>
//                     </div>

//                     {tx.fee > 0 && (
//                       <p className="mt-4 text-sm text-orange-600 dark:text-orange-300">
//                         Fee: {tx.fee} {tx.currency}
//                       </p>
//                     )}

//                     <div className="mt-6 flex justify-end">
//                       <button
//                         onClick={() => setExpandedId(expandedId === tx.id ? null : tx.id)}
//                         className="flex items-center gap-2 text-orange-600 dark:text-orange-400 hover:text-orange-700 dark:hover:text-orange-300 transition font-medium"
//                       >
//                         {expandedId === tx.id ? "Hide" : "Show"} Details
//                         {expandedId === tx.id ? <ChevronUpIcon className="w-5 h-5" /> : <ChevronDownIcon className="w-5 h-5" />}
//                       </button>
//                     </div>
//                   </div>

//                   <AnimatePresence>
//                     {expandedId === tx.id && (
//                       <motion.div
//                         initial={{ height: 0, opacity: 0 }}
//                         animate={{ height: "auto", opacity: 1 }}
//                         exit={{ height: 0, opacity: 0 }}
//                         className="border-t border-gray-200 dark:border-gray-800/60 bg-gray-50 dark:bg-gray-950/70 px-5 sm:px-6 py-5"
//                       >
//                         <p className="text-xs text-gray-500 dark:text-gray-400 mb-2">Transaction Hash / Reference</p>
//                         <p className="font-mono text-gray-800 dark:text-orange-200 text-sm break-all">{tx.txid}</p>
//                       </motion.div>
//                     )}
//                   </AnimatePresence>
//                 </motion.div>
//               );
//             })}
//           </AnimatePresence>
//         )}

//         {/* Pagination */}
//         {pagination.pages > 1 && (
//           <div className="flex justify-center items-center gap-3 mt-6 flex-wrap">
//             <button
//               onClick={() => handlePageChange(pagination.page - 1)}
//               disabled={pagination.page === 1}
//               className="px-4 py-2 rounded-lg bg-orange-500 hover:bg-orange-600 text-white disabled:opacity-50 transition"
//             >
//               Previous
//             </button>

//             {[...Array(pagination.pages)].map((_, i) => {
//               const page = i + 1;
//               return (
//                 <button
//                   key={page}
//                   onClick={() => handlePageChange(page)}
//                   className={`px-4 py-2 rounded-lg border ${
//                     pagination.page === page
//                       ? "bg-orange-600 text-white border-orange-600"
//                       : "bg-white dark:bg-gray-900 border-gray-300 dark:border-gray-700 text-gray-900 dark:text-white"
//                   } transition`}
//                 >
//                   {page}
//                 </button>
//               );
//             })}

//             <button
//               onClick={() => handlePageChange(pagination.page + 1)}
//               disabled={pagination.page === pagination.pages}
//               className="px-4 py-2 rounded-lg bg-orange-500 hover:bg-orange-600 text-white disabled:opacity-50 transition"
//             >
//               Next
//             </button>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }





import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowUpRightIcon,
  ArrowDownRightIcon,
  MagnifyingGlassIcon,
  ChevronDownIcon,
  ChevronUpIcon,
} from "@heroicons/react/24/solid";
import { userService } from "../../api/userApi";
import { useTheme } from "../ui/ThemeContext";

export default function Transactions() {
  const { theme } = useTheme();
  const isDark = theme === "dark";

  const [searchTerm, setSearchTerm] = useState("");
  const [expandedId, setExpandedId] = useState(null);
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [pagination, setPagination] = useState({
    page: 1,
    limit: 20,
    total: 0,
    pages: 0,
  });

  // Fetch transactions
  const fetchTransactions = async (page = 1) => {
    setLoading(true);
    setError(null);
    try {
      console.log("Fetching transactions, page:", page);
      const res = await userService.getTransactions({ page, limit: pagination.limit });
      console.log("Transactions API response:", res.data);

      const txs = res?.data?.data?.transactions || [];
      const pageInfo = res?.data?.data?.pagination || {};

      const mapped = txs.map((tx) => ({
        id: tx._id,
        type: (tx.type || "unknown").toLowerCase(),
        amount: tx.amount || 0,
        currency: tx.currency || tx.cryptocurrency || "USDT",
        from: tx.from || "—",
        to: tx.to || tx.walletAddress || "—",
        status: (tx.status || "pending").toLowerCase(),
        timestamp: new Date(tx.createdAt || tx.date || Date.now()).toLocaleString(),
        txid: tx.txHash || tx.transactionId || tx.hash || "—",
        fee: tx.fee || tx.networkFee || 0,
        description: tx.description || tx.note || "",
      }));

      mapped.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));

      setTransactions(mapped);
      setPagination(pageInfo);
    } catch (err) {
      console.error("Error fetching transactions:", err.response?.data || err.message);
      setError("Failed to load transactions. Try again later.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTransactions(pagination.page);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pagination.page]);

  // Filter current page
  const filtered = transactions.filter((tx) =>
    `${tx.type} ${tx.currency} ${tx.from} ${tx.to} ${tx.txid} ${tx.description}`
      .toLowerCase()
      .includes(searchTerm.toLowerCase())
  );

  const getIconForType = (type) => {
    if (type === "deposit") return <ArrowDownRightIcon className="w-8 h-8 text-green-600 dark:text-green-400" />;
    if (type === "withdraw") return <ArrowUpRightIcon className="w-8 h-8 text-orange-600 dark:text-orange-400" />;
    return <ArrowUpRightIcon className="w-8 h-8 text-gray-500 dark:text-gray-400" />;
  };

  const getTypeColor = (type) => {
    if (type === "deposit") return "text-green-600 dark:text-green-400";
    if (type === "withdraw") return "text-orange-600 dark:text-orange-400";
    return "text-gray-600 dark:text-gray-300";
  };

  const getStatusStyle = (status) => {
    if (status === "completed")
      return { color: "text-green-700 dark:text-green-400", bg: "bg-green-100 dark:bg-green-950/50", border: "border-green-300 dark:border-green-800/60" };
    if (status === "pending")
      return { color: "text-orange-700 dark:text-orange-400", bg: "bg-orange-100 dark:bg-orange-950/50", border: "border-orange-300 dark:border-orange-800/60" };
    return { color: "text-red-700 dark:text-red-400", bg: "bg-red-100 dark:bg-red-950/50", border: "border-red-300 dark:border-red-800/60" };
  };

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= pagination.pages) {
      setPagination((prev) => ({ ...prev, page: newPage }));
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 text-gray-900 dark:text-white p-5 sm:p-6 transition-colors duration-300">
      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-3xl sm:text-4xl font-bold mb-8 text-orange-600 dark:text-orange-400 text-center"
      >
        Transaction History
      </motion.h1>

      {/* Search bar */}
      <div className="max-w-5xl mx-auto mb-8">
        <div className="relative">
          <MagnifyingGlassIcon className="absolute left-4 top-1/2 -translate-y-1/2 w-6 h-6 text-orange-500 dark:text-orange-400" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search by type, currency, address, hash..."
            className="w-full pl-12 pr-5 py-4 
                       bg-white dark:bg-gray-900 
                       border border-gray-300 dark:border-gray-700 
                       rounded-xl text-gray-900 dark:text-white 
                       placeholder-gray-500 dark:placeholder-gray-500 
                       focus:border-orange-500 dark:focus:border-orange-500 
                       focus:ring-2 focus:ring-orange-500/30 
                       outline-none transition shadow-sm"
          />
        </div>
      </div>

      <div className="max-w-5xl mx-auto">
        {loading ? (
          <div className="flex justify-center items-center py-20">
            <div className="w-12 h-12 border-4 border-orange-500 border-t-transparent rounded-full animate-spin" />
          </div>
        ) : error ? (
          <div className="text-center py-16 text-red-600 dark:text-red-400 font-medium">{error}</div>
        ) : filtered.length === 0 ? (
          <div className="text-center py-20 text-gray-500 dark:text-gray-400">
            <p className="text-xl mb-3">No transactions found</p>
            <p>{searchTerm ? "Try a different search term" : "Your transaction history will appear here"}</p>
          </div>
        ) : (
          <AnimatePresence>
            {filtered.map((tx) => {
              const st = getStatusStyle(tx.status);
              const typeColor = getTypeColor(tx.type);

              return (
                <motion.div
                  key={tx.id}
                  layout
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -15 }}
                  className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800/60 overflow-hidden mb-5 shadow-md dark:shadow-lg transition-all"
                >
                  <div className="p-5 sm:p-6">
                    <div className="flex flex-col sm:flex-row justify-between items-start gap-5 mb-5">
                      <div className="flex gap-4 sm:gap-5">
                        <div
                          className={`p-3 sm:p-4 rounded-xl flex-shrink-0 ${
                            tx.type === "deposit"
                              ? "bg-green-100 dark:bg-green-950/60"
                              : "bg-orange-100 dark:bg-orange-950/60"
                          }`}
                        >
                          {getIconForType(tx.type)}
                        </div>
                        <div>
                          <h3 className="text-xl font-semibold capitalize text-gray-900 dark:text-white">
                            {tx.type}
                          </h3>
                          <p className={`text-2xl font-bold ${typeColor} mt-1`}>
                            {tx.type === "deposit" ? "+" : "-"}
                            {tx.amount.toLocaleString()} {tx.currency}
                          </p>
                          {tx.description && (
                            <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">{tx.description}</p>
                          )}
                        </div>
                      </div>

                      <div
                        className={`px-4 py-2 rounded-full text-sm font-medium border ${st.border} ${st.bg} ${st.color} whitespace-nowrap`}
                      >
                        {tx.status.toUpperCase()}
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 text-sm">
                      <div>
                        <p className="text-gray-500 dark:text-gray-400">From</p>
                        <p className="font-mono text-gray-800 dark:text-orange-200/90 break-all mt-1">{tx.from}</p>
                      </div>
                      <div>
                        <p className="text-gray-500 dark:text-gray-400">To</p>
                        <p className="font-mono text-gray-800 dark:text-orange-200/90 break-all mt-1">{tx.to}</p>
                      </div>
                      <div>
                        <p className="text-gray-500 dark:text-gray-400">Date</p>
                        <p className="mt-1 text-gray-800 dark:text-gray-300">{tx.timestamp}</p>
                      </div>
                    </div>

                    {tx.fee > 0 && (
                      <p className="mt-4 text-sm text-orange-600 dark:text-orange-300">
                        Fee: {tx.fee} {tx.currency}
                      </p>
                    )}

                    <div className="mt-6 flex justify-end">
                      <button
                        onClick={() => setExpandedId(expandedId === tx.id ? null : tx.id)}
                        className="flex items-center gap-2 text-orange-600 dark:text-orange-400 hover:text-orange-700 dark:hover:text-orange-300 transition font-medium"
                      >
                        {expandedId === tx.id ? "Hide" : "Show"} Details
                        {expandedId === tx.id ? <ChevronUpIcon className="w-5 h-5" /> : <ChevronDownIcon className="w-5 h-5" />}
                      </button>
                    </div>
                  </div>

                  <AnimatePresence>
                    {expandedId === tx.id && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="border-t border-gray-200 dark:border-gray-800/60 bg-gray-50 dark:bg-gray-950/70 px-5 sm:px-6 py-5"
                      >
                        <p className="text-xs text-gray-500 dark:text-gray-400 mb-2">Transaction Hash / Reference</p>
                        <p className="font-mono text-gray-800 dark:text-orange-200 text-sm break-all">{tx.txid}</p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              );
            })}
          </AnimatePresence>
        )}

        {/* Pagination */}
        {pagination.pages > 1 && (
          <div className="flex justify-center items-center gap-3 mt-6 flex-wrap">
            <button
              onClick={() => handlePageChange(pagination.page - 1)}
              disabled={pagination.page === 1}
              className="px-4 py-2 rounded-lg bg-orange-500 hover:bg-orange-600 text-white disabled:opacity-50 transition"
            >
              Previous
            </button>

            {[...Array(pagination.pages)].map((_, i) => {
              const page = i + 1;
              return (
                <button
                  key={page}
                  onClick={() => handlePageChange(page)}
                  className={`px-4 py-2 rounded-lg border ${
                    pagination.page === page
                      ? "bg-orange-600 text-white border-orange-600"
                      : "bg-white dark:bg-gray-900 border-gray-300 dark:border-gray-700 text-gray-900 dark:text-white"
                  } transition`}
                >
                  {page}
                </button>
              );
            })}

            <button
              onClick={() => handlePageChange(pagination.page + 1)}
              disabled={pagination.page === pagination.pages}
              className="px-4 py-2 rounded-lg bg-orange-500 hover:bg-orange-600 text-white disabled:opacity-50 transition"
            >
              Next
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
