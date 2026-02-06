

// // // Deposit.jsx
// // import React, { useState, useEffect } from 'react';
// // import { motion, AnimatePresence } from 'framer-motion';
// // import { WalletIcon, DocumentDuplicateIcon, CheckCircleIcon, ClockIcon } from '@heroicons/react/24/solid';
// // import QRCode from 'react-qr-code';

// // import { createDeposit, getDepositHistory, checkDepositStatus } from '../../api/depositapi';
// // import { useTheme } from '../ui/ThemeContext';

// // export default function Deposit() {
// //   const { theme } = useTheme();
// //   const isDark = theme === 'dark';

// //   const [amount, setAmount] = useState('');
// //   const [depositLoading, setDepositLoading] = useState(false);
// //   const [depositResult, setDepositResult] = useState(null);
// //   const [history, setHistory] = useState([]);
// //   const [historyLoading, setHistoryLoading] = useState(true);
// //   const [error, setError] = useState('');
// //   const [message, setMessage] = useState('');
// //   const [copied, setCopied] = useState(false);
// //   const [polling, setPolling] = useState(false);

// //   useEffect(() => {
// //     loadHistory();
// //   }, []);

// //   // Load deposit history
// //   const loadHistory = async () => {
// //     try {
// //       setHistoryLoading(true);
// //       const res = await getDepositHistory();
// //       console.log('Deposit history response:', res); // DEBUG
// //       setHistory(res.success && Array.isArray(res.data) ? res.data : []);
// //     } catch (err) {
// //       console.error('Failed to load deposit history:', err);
// //       setHistory([]);
// //     } finally {
// //       setHistoryLoading(false);
// //     }
// //   };

// //   // Create new deposit
// //   const handleCreateDeposit = async (e) => {
// //     e.preventDefault();
// //     const numAmount = parseFloat(amount);
// //     if (isNaN(numAmount) || numAmount <= 0) {
// //       setError('Please enter a valid amount greater than 0');
// //       return;
// //     }

// //     setError('');
// //     setMessage('');
// //     setDepositLoading(true);

// //     try {
// //       // API expects amount directly, not an object
// //       const res = await createDeposit(numAmount);
// //       console.log('Create deposit response:', res); // DEBUG

// //       const data = res.data || res; // handle API structure
// //       setDepositResult(data);
// //       setMessage(res.message || 'Deposit request created! Please send funds.');
// //       setAmount('');
// //       loadHistory();

// //       if (data?.paymentId) {
// //         startPolling(data.paymentId);
// //       }
// //     } catch (err) {
// //       console.error('Deposit creation error:', err);
// //       setError(err.response?.data?.message || 'Failed to create deposit request.');
// //     } finally {
// //       setDepositLoading(false);
// //     }
// //   };

// //   // Poll deposit status
// //   const startPolling = (paymentId) => {
// //     setPolling(true);
// //     const interval = setInterval(async () => {
// //       try {
// //         const res = await checkDepositStatus(paymentId);
// //         console.log(`Polling deposit ${paymentId} status:`, res); // DEBUG

// //         const status = res.data?.status || 'pending';
// //         setDepositResult((prev) => ({ ...prev, status }));

// //         if (status === 'completed' || status === 'confirmed') {
// //           clearInterval(interval);
// //           setPolling(false);
// //           setMessage('Deposit confirmed! Balance updated.');
// //           loadHistory();
// //         }
// //       } catch (err) {
// //         console.warn('Polling error:', err);
// //       }
// //     }, 8000);

// //     return () => clearInterval(interval);
// //   };

// //   const copyToClipboard = (text) => {
// //     navigator.clipboard.writeText(text);
// //     setCopied(true);
// //     setTimeout(() => setCopied(false), 2200);
// //   };

// //   const shorten = (str) => (str ? `${str.slice(0, 8)}...${str.slice(-6)}` : '');

// //   return (
// //     <div className={`min-h-screen p-6 transition-colors duration-300 ${isDark ? 'bg-slate-950 text-white' : 'bg-gray-50 text-gray-900'}`}>
// //       <div className="max-w-3xl mx-auto space-y-10">
// //         {/* Deposit Form */}
// //         <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className={`rounded-3xl border p-8 shadow-2xl backdrop-blur-xl ${isDark ? 'bg-black/40 border-orange-600/30' : 'bg-white border-gray-200 shadow-xl'}`}>
// //           <div className="text-center mb-8">
// //             <WalletIcon className={`w-16 h-16 mx-auto mb-4 ${isDark ? 'text-orange-400' : 'text-orange-600'}`} />
// //             <h1 className={`text-4xl font-bold bg-gradient-to-r bg-clip-text text-transparent ${isDark ? 'from-orange-400 to-orange-500' : 'from-orange-600 to-orange-700'}`}>
// //               Deposit Funds
// //             </h1>
// //             <p className={`${isDark ? 'text-gray-400' : 'text-gray-500'} mt-2`}>USDT (BSC)</p>
// //           </div>

// //           <form onSubmit={handleCreateDeposit} className="space-y-6">
// //             <div>
// //               <label className={`block text-sm font-medium mb-2 ${isDark ? 'text-orange-300/90' : 'text-orange-700'}`}>Amount (USDT)</label>
// //               <input
// //                 type="number"
// //                 step="0.01"
// //                 min="1"
// //                 value={amount}
// //                 onChange={(e) => setAmount(e.target.value)}
// //                 placeholder="10.00"
// //                 className={`w-full px-5 py-4 rounded-xl placeholder-gray-500 border focus:outline-none focus:ring-2 transition ${isDark ? 'bg-slate-900 border-orange-700/40 text-white focus:border-orange-500 focus:ring-orange-500/30' : 'bg-white border-gray-300 text-gray-900 focus:border-orange-500 focus:ring-orange-400/30'}`}
// //                 disabled={depositLoading}
// //                 required
// //               />
// //             </div>

// //             <button type="submit" disabled={depositLoading || !amount || parseFloat(amount) <= 0} className={`w-full py-4 px-6 font-semibold rounded-xl transition transform hover:scale-[1.02] shadow-lg ${isDark ? 'bg-gradient-to-r from-orange-600 to-orange-500 hover:from-orange-500 hover:to-orange-400 text-white' : 'bg-gradient-to-r from-orange-600 to-orange-700 hover:from-orange-700 hover:to-orange-800 text-white'} ${depositLoading ? 'opacity-60 cursor-not-allowed' : ''}`}>
// //               {depositLoading ? 'Creating...' : 'Create Deposit Request'}
// //             </button>
// //           </form>

// //           {error && <p className="mt-4 text-red-500 dark:text-red-400 text-center font-medium">{error}</p>}
// //           {message && <p className="mt-4 text-green-500 dark:text-orange-300 text-center font-medium">{message}</p>}

// //           {/* Payment Instructions / QR */}
// //           <AnimatePresence>
// //             {depositResult && (
// //               <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }} className="mt-8 overflow-hidden">
// //                 <div className={`p-6 rounded-2xl border ${isDark ? 'bg-slate-900/70 border-orange-600/30' : 'bg-gray-50 border-gray-200 shadow-inner'}`}>
// //                   <div className="flex justify-between items-center mb-4">
// //                     <h3 className={`text-lg font-semibold ${isDark ? 'text-orange-300' : 'text-orange-700'}`}>Payment Details</h3>
// //                     <div className="flex items-center gap-2">
// //                       {polling && <ClockIcon className="w-5 h-5 text-amber-400 animate-pulse" />}
// //                       <span className={`text-sm ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>{depositResult.status || 'pending'}</span>
// //                     </div>
// //                   </div>

// //                   {depositResult.payAddress && (
// //                     <>
// //                       <p className={`text-sm mb-2 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
// //                         Send {depositResult.payCurrency} to address:
// //                       </p>
// //                       <div className={`flex items-center gap-3 p-4 rounded-xl border ${isDark ? 'bg-black/40 border-orange-800/30' : 'bg-white border-gray-200 shadow-sm'}`}>
// //                         <p className={`font-mono break-all flex-1 ${isDark ? 'text-orange-300' : 'text-orange-700'}`}>{shorten(depositResult.payAddress)}</p>
// //                         <button onClick={() => copyToClipboard(depositResult.payAddress)} className="p-2 hover:bg-black/10 dark:hover:bg-white/10 rounded-lg transition">
// //                           {copied ? <CheckCircleIcon className={`w-6 h-6 ${isDark ? 'text-orange-400' : 'text-green-600'}`} /> : <DocumentDuplicateIcon className={`w-6 h-6 ${isDark ? 'text-gray-300' : 'text-gray-600'}`} />}
// //                         </button>
// //                       </div>

// //                       <div className="mt-6 flex justify-center">
// //                         <div className="p-4 rounded-2xl shadow-2xl bg-white">
// //                           <QRCode value={depositResult.payAddress} size={180} level="H" />
// //                         </div>
// //                       </div>
// //                       <p className={`text-center text-sm mt-3 ${isDark ? 'text-gray-500' : 'text-gray-600'}`}>Scan to send {depositResult.payCurrency}</p>
// //                     </>
// //                   )}
// //                 </div>
// //               </motion.div>
// //             )}
// //           </AnimatePresence>
// //         </motion.div>

// //         {/* Deposit History */}
// //         <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }} className={`rounded-3xl border p-8 ${isDark ? 'bg-black/40 backdrop-blur-xl border-orange-600/30' : 'bg-white border-gray-200 shadow-xl'}`}>
// //           <h2 className={`text-2xl font-semibold mb-6 ${isDark ? 'text-orange-300' : 'text-orange-700'}`}>Deposit History</h2>

// //           {historyLoading ? (
// //             <p className={`${isDark ? 'text-gray-400' : 'text-gray-500'} text-center py-8`}>Loading...</p>
// //           ) : history.length === 0 ? (
// //             <p className={`${isDark ? 'text-gray-400' : 'text-gray-500'} text-center py-8`}>No deposits yet.</p>
// //           ) : (
// //             <div className="space-y-4">
// //               {history.map((dep) => (
// //                 <div key={dep._id || dep.paymentId} className={`p-5 rounded-xl border flex justify-between items-center ${isDark ? 'bg-slate-900/60 border-orange-800/30' : 'bg-gray-50 border-gray-200'}`}>
// //                   <div>
// //                     <p className={`font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>{dep.payAmount || dep.amount} USDT</p>
// //                     <p className={`${isDark ? 'text-gray-400' : 'text-gray-500'} text-sm`}>{dep.payAddress ? shorten(dep.payAddress) : '—'}</p>
// //                   </div>
// //                   <div className="text-right">
// //                     <p className={`font-semibold ${dep.status === 'completed' || dep.status === 'confirmed' ? (isDark ? 'text-orange-400' : 'text-green-600') : dep.status === 'pending' ? 'text-amber-400' : 'text-red-500'}`}>{dep.status?.toUpperCase() || 'PENDING'}</p>
// //                     <p className={`${isDark ? 'text-gray-500' : 'text-gray-600'} text-xs`}>{dep.createdAt ? new Date(dep.createdAt).toLocaleString() : '—'}</p>
// //                   </div>
// //                 </div>
// //               ))}
// //             </div>
// //           )}
// //         </motion.div>
// //       </div>
// //     </div>
// //   );
// // }




// // // Deposit.jsx
// // import React, { useState, useEffect, useRef } from 'react';
// // import { motion, AnimatePresence } from 'framer-motion';
// // import { WalletIcon, DocumentDuplicateIcon, CheckCircleIcon, ClockIcon, PhotoIcon, ArrowUpTrayIcon } from '@heroicons/react/24/solid';
// // import QRCode from 'react-qr-code';

// // import { 
// //   createManualDepositRequest,  // ← new or renamed API: creates pending deposit record
// //   submitDepositProof,          // ← new API: uploads image + optional txHash
// //   getDepositHistory 
// // } from '../../api/depositapi';   // Update your api file accordingly
// // import { useTheme } from '../ui/ThemeContext';

// // const FIXED_WALLET_ADDRESS = '0xYourCompanyUSDTBSCAddressHere...'; // ← Replace or fetch from backend
// // const SUPPORTED_CURRENCY = 'USDT (BSC)';

// // export default function Deposit() {
// //   const { theme } = useTheme();
// //   const isDark = theme === 'dark';

// //   const [amount, setAmount] = useState('');
// //   const [txHash, setTxHash] = useState('');               // Optional: user pastes tx hash
// //   const [proofFile, setProofFile] = useState(null);
// //   const [preview, setPreview] = useState(null);           // Image preview
// //   const [loading, setLoading] = useState(false);
// //   const [message, setMessage] = useState('');
// //   const [error, setError] = useState('');
// //   const [history, setHistory] = useState([]);
// //   const [historyLoading, setHistoryLoading] = useState(true);
// //   const [copied, setCopied] = useState(false);

// //   const fileInputRef = useRef(null);

// //   useEffect(() => {
// //     loadHistory();
// //   }, []);

// //   const loadHistory = async () => {
// //     try {
// //       setHistoryLoading(true);
// //       const res = await getDepositHistory();
// //       setHistory(res.success && Array.isArray(res.data) ? res.data : []);
// //     } catch (err) {
// //       console.error('Failed to load history:', err);
// //       setHistory([]);
// //     } finally {
// //       setHistoryLoading(false);
// //     }
// //   };

// //   const handleFileChange = (e) => {
// //     const file = e.target.files[0];
// //     if (!file) return;

// //     if (!['image/jpeg', 'image/png', 'image/jpg'].includes(file.type)) {
// //       setError('Only JPG/PNG images allowed');
// //       return;
// //     }
// //     if (file.size > 5 * 1024 * 1024) { // 5MB limit
// //       setError('File too large (max 5MB)');
// //       return;
// //     }

// //     setProofFile(file);
// //     setPreview(URL.createObjectURL(file));
// //     setError('');
// //   };

// //   const handleSubmitProof = async (e) => {
// //     e.preventDefault();
// //     const numAmount = parseFloat(amount);
// //     if (isNaN(numAmount) || numAmount <= 0) {
// //       setError('Enter valid amount > 0');
// //       return;
// //     }
// //     if (!proofFile) {
// //       setError('Please upload payment proof screenshot');
// //       return;
// //     }

// //     setError('');
// //     setMessage('');
// //     setLoading(true);

// //     try {
// //       // Step 1: Create pending deposit record (optional but good for tracking)
// //       const requestRes = await createManualDepositRequest(numAmount);
// //       const depositId = requestRes.data?.depositId || null; // assume backend returns ID

// //       // Step 2: Submit proof
// //       const formData = new FormData();
// //       formData.append('amount', numAmount);
// //       formData.append('proof', proofFile);
// //       if (txHash.trim()) formData.append('txHash', txHash.trim());
// //       if (depositId) formData.append('depositId', depositId);

// //       const proofRes = await submitDepositProof(formData);

// //       setMessage('Payment proof submitted! Awaiting admin confirmation.');
// //       setAmount('');
// //       setTxHash('');
// //       setProofFile(null);
// //       setPreview(null);
// //       loadHistory();
// //     } catch (err) {
// //       setError(err.response?.data?.message || 'Failed to submit proof');
// //       console.error(err);
// //     } finally {
// //       setLoading(false);
// //     }
// //   };

// //   const copyToClipboard = (text) => {
// //     navigator.clipboard.writeText(text);
// //     setCopied(true);
// //     setTimeout(() => setCopied(false), 2200);
// //   };

// //   const shorten = (str) => (str ? `${str.slice(0, 8)}...${str.slice(-6)}` : '');

// //   return (
// //     <div className={`min-h-screen p-6 transition-colors duration-300 ${isDark ? 'bg-slate-950 text-white' : 'bg-gray-50 text-gray-900'}`}>
// //       <div className="max-w-3xl mx-auto space-y-10">
// //         {/* Deposit Form – Manual */}
// //         <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className={`rounded-3xl border p-8 shadow-2xl backdrop-blur-xl ${isDark ? 'bg-black/40 border-orange-600/30' : 'bg-white border-gray-200 shadow-xl'}`}>
// //           <div className="text-center mb-8">
// //             <WalletIcon className={`w-16 h-16 mx-auto mb-4 ${isDark ? 'text-orange-400' : 'text-orange-600'}`} />
// //             <h1 className={`text-4xl font-bold bg-gradient-to-r bg-clip-text text-transparent ${isDark ? 'from-orange-400 to-orange-500' : 'from-orange-600 to-orange-700'}`}>
// //               Manual Deposit
// //             </h1>
// //             <p className={`${isDark ? 'text-gray-400' : 'text-gray-500'} mt-2`}>{SUPPORTED_CURRENCY}</p>
// //           </div>

// //           <form onSubmit={handleSubmitProof} className="space-y-6">
// //             <div>
// //               <label className={`block text-sm font-medium mb-2 ${isDark ? 'text-orange-300/90' : 'text-orange-700'}`}>Amount (USDT)</label>
// //               <input
// //                 type="number"
// //                 step="0.01"
// //                 min="1"
// //                 value={amount}
// //                 onChange={(e) => setAmount(e.target.value)}
// //                 placeholder="10.00"
// //                 className={`w-full px-5 py-4 rounded-xl placeholder-gray-500 border focus:outline-none focus:ring-2 transition ${isDark ? 'bg-slate-900 border-orange-700/40 text-white focus:border-orange-500 focus:ring-orange-500/30' : 'bg-white border-gray-300 text-gray-900 focus:border-orange-500 focus:ring-orange-400/30'}`}
// //                 disabled={loading}
// //                 required
// //               />
// //             </div>

// //             {/* Fixed Wallet + QR */}
// //             <div className={`p-6 rounded-2xl border ${isDark ? 'bg-slate-900/70 border-orange-600/30' : 'bg-gray-50 border-gray-200'}`}>
// //               <p className={`text-sm mb-3 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
// //                 Send the amount to the following address (BSC network):
// //               </p>
// //               <div className={`flex items-center gap-3 p-4 rounded-xl border mb-4 ${isDark ? 'bg-black/40 border-orange-800/30' : 'bg-white border-gray-200'}`}>
// //                 <p className={`font-mono break-all flex-1 ${isDark ? 'text-orange-300' : 'text-orange-700'}`}>
// //                   {shorten(FIXED_WALLET_ADDRESS)}
// //                 </p>
// //                 <button type="button" onClick={() => copyToClipboard(FIXED_WALLET_ADDRESS)} className="p-2 hover:bg-black/10 dark:hover:bg-white/10 rounded-lg transition">
// //                   {copied ? <CheckCircleIcon className={`w-6 h-6 ${isDark ? 'text-orange-400' : 'text-green-600'}`} /> : <DocumentDuplicateIcon className={`w-6 h-6 ${isDark ? 'text-gray-300' : 'text-gray-600'}`} />}
// //                 </button>
// //               </div>

// //               <div className="flex justify-center mb-3">
// //                 <div className="p-4 rounded-2xl shadow-2xl bg-white">
// //                   <QRCode value={FIXED_WALLET_ADDRESS} size={180} level="H" />
// //                 </div>
// //               </div>
// //               <p className={`text-center text-sm ${isDark ? 'text-gray-500' : 'text-gray-600'}`}>Scan or copy address – use BSC network only!</p>
// //             </div>

// //             {/* Payment Proof Upload */}
// //             <div>
// //               <label className={`block text-sm font-medium mb-2 ${isDark ? 'text-orange-300/90' : 'text-orange-700'}`}>
// //                 Upload Payment Proof (screenshot)
// //               </label>
// //               <div 
// //                 onClick={() => fileInputRef.current?.click()}
// //                 className={`border-2 border-dashed rounded-xl p-6 text-center cursor-pointer transition hover:border-orange-500 ${isDark ? 'border-orange-700/40 bg-slate-900/30' : 'border-gray-300 bg-gray-50'}`}
// //               >
// //                 {preview ? (
// //                   <img src={preview} alt="Proof preview" className="max-h-48 mx-auto rounded" />
// //                 ) : (
// //                   <>
// //                     <ArrowUpTrayIcon className={`w-10 h-10 mx-auto mb-2 ${isDark ? 'text-orange-400' : 'text-orange-600'}`} />
// //                     <p className={`${isDark ? 'text-gray-300' : 'text-gray-600'}`}>Click or drag screenshot here</p>
// //                     <p className={`text-xs mt-1 ${isDark ? 'text-gray-500' : 'text-gray-400'}`}>JPG/PNG – max 5MB</p>
// //                   </>
// //                 )}
// //                 <input
// //                   ref={fileInputRef}
// //                   type="file"
// //                   accept="image/jpeg,image/png"
// //                   onChange={handleFileChange}
// //                   className="hidden"
// //                 />
// //               </div>
// //             </div>

// //             {/* Optional Tx Hash */}
// //             <div>
// //               <label className={`block text-sm font-medium mb-2 ${isDark ? 'text-orange-300/90' : 'text-orange-700'}`}>
// //                 Transaction Hash (optional – helps admin verify faster)
// //               </label>
// //               <input
// //                 type="text"
// //                 value={txHash}
// //                 onChange={(e) => setTxHash(e.target.value)}
// //                 placeholder="0x..."
// //                 className={`w-full px-5 py-4 rounded-xl placeholder-gray-500 border focus:outline-none focus:ring-2 transition ${isDark ? 'bg-slate-900 border-orange-700/40 text-white focus:border-orange-500 focus:ring-orange-500/30' : 'bg-white border-gray-300 text-gray-900 focus:border-orange-500 focus:ring-orange-400/30'}`}
// //               />
// //             </div>

// //             <button 
// //               type="submit" 
// //               disabled={loading || !amount || !proofFile}
// //               className={`w-full py-4 px-6 font-semibold rounded-xl transition transform hover:scale-[1.02] shadow-lg ${isDark ? 'bg-gradient-to-r from-orange-600 to-orange-500 hover:from-orange-500 hover:to-orange-400 text-white' : 'bg-gradient-to-r from-orange-600 to-orange-700 hover:from-orange-700 hover:to-orange-800 text-white'} ${loading || !amount || !proofFile ? 'opacity-60 cursor-not-allowed' : ''}`}
// //             >
// //               {loading ? 'Submitting...' : 'Submit Proof & Request Confirmation'}
// //             </button>
// //           </form>

// //           {error && <p className="mt-4 text-red-500 dark:text-red-400 text-center font-medium">{error}</p>}
// //           {message && <p className="mt-4 text-green-500 dark:text-orange-300 text-center font-medium">{message}</p>}
// //         </motion.div>

// //         {/* Deposit History – now shows pending/manual status */}
// //         <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }} className={`rounded-3xl border p-8 ${isDark ? 'bg-black/40 backdrop-blur-xl border-orange-600/30' : 'bg-white border-gray-200 shadow-xl'}`}>
// //           <h2 className={`text-2xl font-semibold mb-6 ${isDark ? 'text-orange-300' : 'text-orange-700'}`}>Deposit Requests History</h2>

// //           {historyLoading ? (
// //             <p className={`${isDark ? 'text-gray-400' : 'text-gray-500'} text-center py-8`}>Loading...</p>
// //           ) : history.length === 0 ? (
// //             <p className={`${isDark ? 'text-gray-400' : 'text-gray-500'} text-center py-8`}>No deposit requests yet.</p>
// //           ) : (
// //             <div className="space-y-4">
// //               {history.map((dep) => (
// //                 <div key={dep._id || dep.id} className={`p-5 rounded-xl border flex justify-between items-center ${isDark ? 'bg-slate-900/60 border-orange-800/30' : 'bg-gray-50 border-gray-200'}`}>
// //                   <div>
// //                     <p className={`font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>{dep.amount} USDT</p>
// //                     <p className={`${isDark ? 'text-gray-400' : 'text-gray-500'} text-sm`}>Proof uploaded • {dep.txHash ? shorten(dep.txHash) : 'No hash'}</p>
// //                   </div>
// //                   <div className="text-right">
// //                     <p className={`font-semibold ${dep.status === 'confirmed' || dep.status === 'completed' ? (isDark ? 'text-orange-400' : 'text-green-600') : dep.status === 'pending' || dep.status === 'under_review' ? 'text-amber-400' : 'text-red-500'}`}>
// //                       {dep.status?.toUpperCase() || 'PENDING REVIEW'}
// //                     </p>
// //                     <p className={`${isDark ? 'text-gray-500' : 'text-gray-600'} text-xs`}>{dep.createdAt ? new Date(dep.createdAt).toLocaleString() : '—'}</p>
// //                   </div>
// //                 </div>
// //               ))}
// //             </div>
// //           )}
// //         </motion.div>
// //       </div>
// //     </div>
// //   );
// // }





// // Deposit.jsx
// import React, { useState, useEffect } from 'react';
// import { motion, AnimatePresence } from 'framer-motion';
// import { WalletIcon, DocumentDuplicateIcon, CheckCircleIcon, ClockIcon, ArrowUpTrayIcon } from '@heroicons/react/24/solid';
// import QRCode from 'react-qr-code';

// import { createDeposit, getDepositHistory, checkDepositStatus, uploadReceipt } from '../../api/depositapi'; // Assume uploadReceipt is added to API
// import { useTheme } from '../ui/ThemeContext';

// export default function Deposit() {
//   const { theme } = useTheme();
//   const isDark = theme === 'dark';

//   const [amount, setAmount] = useState('');
//   const [depositLoading, setDepositLoading] = useState(false);
//   const [depositResult, setDepositResult] = useState(null);
//   const [history, setHistory] = useState([]);
//   const [historyLoading, setHistoryLoading] = useState(true);
//   const [error, setError] = useState('');
//   const [message, setMessage] = useState('');
//   const [copied, setCopied] = useState(false);
//   const [pollingInterval, setPollingInterval] = useState(null);
//   const [receiptFile, setReceiptFile] = useState(null);
//   const [uploadingReceipt, setUploadingReceipt] = useState(false);

//   useEffect(() => {
//     loadHistory();
//     // Start periodic history refresh every 30s for live data
//     const historyRefresh = setInterval(loadHistory, 30000);
//     return () => clearInterval(historyRefresh);
//   }, []);

//   // Load deposit history with better error handling
//   const loadHistory = async () => {
//     try {
//       setHistoryLoading(true);
//       const res = await getDepositHistory();
//       if (res.success && Array.isArray(res.data)) {
//         setHistory(res.data);
//       } else {
//         setHistory([]);
//         setError('Invalid history data format');
//       }
//     } catch (err) {
//       console.error('Failed to load deposit history:', err);
//       setHistory([]);
//       setError('Failed to load history. Please try again.');
//     } finally {
//       setHistoryLoading(false);
//     }
//   };

//   // Create new deposit with improved validation
//   const handleCreateDeposit = async (e) => {
//     e.preventDefault();
//     const numAmount = parseFloat(amount);
//     if (isNaN(numAmount) || numAmount <= 0) {
//       setError('Please enter a valid amount greater than 0');
//       return;
//     }

//     setError('');
//     setMessage('');
//     setDepositLoading(true);
//     setDepositResult(null); // Reset previous result
//     setReceiptFile(null); // Reset file

//     try {
//       const res = await createDeposit(numAmount);
//       const data = res.data || res;
//       if (!data || !data.paymentId) {
//         throw new Error('Invalid deposit response');
//       }
//       setDepositResult(data);
//       setMessage('Deposit request created! Please send funds and upload receipt.');
//       setAmount('');
//       loadHistory();
//       startPolling(data.paymentId);
//     } catch (err) {
//       console.error('Deposit creation error:', err);
//       setError(err.response?.data?.message || 'Failed to create deposit request.');
//     } finally {
//       setDepositLoading(false);
//     }
//   };

//   // Poll deposit status for live updates
//   const startPolling = (paymentId) => {
//     if (pollingInterval) clearInterval(pollingInterval);

//     const interval = setInterval(async () => {
//       try {
//         const res = await checkDepositStatus(paymentId);
//         const status = res.data?.status || 'pending';
//         setDepositResult((prev) => prev ? { ...prev, status } : null);

//         // Update history live if status changed
//         const updatedHistory = history.map((dep) =>
//           dep.paymentId === paymentId ? { ...dep, status } : dep
//         );
//         setHistory(updatedHistory);

//         if (status === 'completed' || status === 'confirmed' || status === 'rejected') {
//           clearInterval(interval);
//           setPollingInterval(null);
//           setMessage(status === 'rejected' ? 'Deposit rejected.' : 'Deposit confirmed! Balance updated.');
//           loadHistory(); // Full refresh
//         }
//       } catch (err) {
//         console.warn('Polling error:', err);
//         setError('Status check failed. Retrying...');
//       }
//     }, 8000);

//     setPollingInterval(interval);
//   };

//   // Upload receipt for manual verification
//   const handleUploadReceipt = async () => {
//     if (!depositResult?.paymentId || !receiptFile) {
//       setError('Missing payment ID or receipt file');
//       return;
//     }

//     setUploadingReceipt(true);
//     setError('');
//     setMessage('');

//     try {
//       const formData = new FormData();
//       formData.append('receipt', receiptFile);
//       const res = await uploadReceipt(depositResult.paymentId, formData);
//       if (res.success) {
//         setMessage('Receipt uploaded! Awaiting verification.');
//         setReceiptFile(null);
//         loadHistory();
//       } else {
//         throw new Error(res.message || 'Upload failed');
//       }
//     } catch (err) {
//       console.error('Receipt upload error:', err);
//       setError(err.response?.data?.message || 'Failed to upload receipt.');
//     } finally {
//       setUploadingReceipt(false);
//     }
//   };

//   const copyToClipboard = (text) => {
//     if (!text) return;
//     navigator.clipboard.writeText(text);
//     setCopied(true);
//     setTimeout(() => setCopied(false), 2200);
//   };

//   const shorten = (str) => (str ? `${str.slice(0, 8)}...${str.slice(-6)}` : '');

//   return (
//     <div className={`min-h-screen p-6 transition-colors duration-300 ${isDark ? 'bg-slate-950 text-white' : 'bg-gray-50 text-gray-900'}`}>
//       <div className="max-w-3xl mx-auto space-y-10">
//         {/* Deposit Form */}
//         <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className={`rounded-3xl border p-8 shadow-2xl backdrop-blur-xl ${isDark ? 'bg-black/40 border-orange-600/30' : 'bg-white border-gray-200 shadow-xl'}`}>
//           <div className="text-center mb-8">
//             <WalletIcon className={`w-16 h-16 mx-auto mb-4 ${isDark ? 'text-orange-400' : 'text-orange-600'}`} />
//             <h1 className={`text-4xl font-bold bg-gradient-to-r bg-clip-text text-transparent ${isDark ? 'from-orange-400 to-orange-500' : 'from-orange-600 to-orange-700'}`}>
//               Deposit Funds
//             </h1>
//             <p className={`${isDark ? 'text-gray-400' : 'text-gray-500'} mt-2`}>USDT (BSC)</p>
//           </div>

//           <form onSubmit={handleCreateDeposit} className="space-y-6">
//             <div>
//               <label className={`block text-sm font-medium mb-2 ${isDark ? 'text-orange-300/90' : 'text-orange-700'}`}>Amount (USDT)</label>
//               <input
//                 type="number"
//                 step="0.01"
//                 min="1"
//                 value={amount}
//                 onChange={(e) => setAmount(e.target.value)}
//                 placeholder="10.00"
//                 className={`w-full px-5 py-4 rounded-xl placeholder-gray-500 border focus:outline-none focus:ring-2 transition ${isDark ? 'bg-slate-900 border-orange-700/40 text-white focus:border-orange-500 focus:ring-orange-500/30' : 'bg-white border-gray-300 text-gray-900 focus:border-orange-500 focus:ring-orange-400/30'}`}
//                 disabled={depositLoading}
//                 required
//               />
//             </div>

//             <button type="submit" disabled={depositLoading || !amount || parseFloat(amount) <= 0} className={`w-full py-4 px-6 font-semibold rounded-xl transition transform hover:scale-[1.02] shadow-lg ${isDark ? 'bg-gradient-to-r from-orange-600 to-orange-500 hover:from-orange-500 hover:to-orange-400 text-white' : 'bg-gradient-to-r from-orange-600 to-orange-700 hover:from-orange-700 hover:to-orange-800 text-white'} ${depositLoading ? 'opacity-60 cursor-not-allowed' : ''}`}>
//               {depositLoading ? 'Creating...' : 'Create Deposit Request'}
//             </button>
//           </form>

//           {error && <p className="mt-4 text-red-500 dark:text-red-400 text-center font-medium">{error}</p>}
//           {message && <p className="mt-4 text-green-500 dark:text-orange-300 text-center font-medium">{message}</p>}

//           {/* Payment Instructions / QR / Receipt Upload */}
//           <AnimatePresence>
//             {depositResult && (
//               <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }} className="mt-8 overflow-hidden">
//                 <div className={`p-6 rounded-2xl border ${isDark ? 'bg-slate-900/70 border-orange-600/30' : 'bg-gray-50 border-gray-200 shadow-inner'}`}>
//                   <div className="flex justify-between items-center mb-4">
//                     <h3 className={`text-lg font-semibold ${isDark ? 'text-orange-300' : 'text-orange-700'}`}>Payment Details</h3>
//                     <div className="flex items-center gap-2">
//                       {pollingInterval && <ClockIcon className="w-5 h-5 text-amber-400 animate-pulse" />}
//                       <span className={`text-sm ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>{depositResult.status || 'pending'}</span>
//                     </div>
//                   </div>

//                   {depositResult.payAddress && (
//                     <>
//                       <p className={`text-sm mb-2 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
//                         Send {depositResult.payCurrency} to address:
//                       </p>
//                       <div className={`flex items-center gap-3 p-4 rounded-xl border ${isDark ? 'bg-black/40 border-orange-800/30' : 'bg-white border-gray-200 shadow-sm'}`}>
//                         <p className={`font-mono break-all flex-1 ${isDark ? 'text-orange-300' : 'text-orange-700'}`}>{shorten(depositResult.payAddress)}</p>
//                         <button onClick={() => copyToClipboard(depositResult.payAddress)} className="p-2 hover:bg-black/10 dark:hover:bg-white/10 rounded-lg transition">
//                           {copied ? <CheckCircleIcon className={`w-6 h-6 ${isDark ? 'text-orange-400' : 'text-green-600'}`} /> : <DocumentDuplicateIcon className={`w-6 h-6 ${isDark ? 'text-gray-300' : 'text-gray-600'}`} />}
//                         </button>
//                       </div>

//                       <div className="mt-6 flex justify-center">
//                         <div className="p-4 rounded-2xl shadow-2xl bg-white">
//                           <QRCode value={depositResult.payAddress} size={180} level="H" />
//                         </div>
//                       </div>
//                       <p className={`text-center text-sm mt-3 ${isDark ? 'text-gray-500' : 'text-gray-600'}`}>Scan to send {depositResult.payCurrency}</p>
//                     </>
//                   )}

//                   {/* Receipt Upload Section */}
//                   <div className="mt-8">
//                     <h4 className={`text-md font-semibold mb-3 ${isDark ? 'text-orange-300' : 'text-orange-700'}`}>Upload Payment Receipt</h4>
//                     <p className={`text-sm mb-4 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>After sending funds, upload your transaction receipt for verification.</p>
//                     <input
//                       type="file"
//                       accept="image/*,.pdf"
//                       onChange={(e) => setReceiptFile(e.target.files?.[0] || null)}
//                       className={`block w-full text-sm text-gray-500 file:mr-4 file:py-3 file:px-5 file:rounded-xl file:border-0 file:text-sm file:font-semibold ${isDark ? 'file:bg-orange-900/50 file:text-orange-300 hover:file:bg-orange-900/70' : 'file:bg-orange-50 file:text-orange-700 hover:file:bg-orange-100'}`}
//                       disabled={uploadingReceipt || depositResult.status !== 'pending'}
//                     />
//                     <button
//                       onClick={handleUploadReceipt}
//                       disabled={!receiptFile || uploadingReceipt || depositResult.status !== 'pending'}
//                       className={`w-full mt-4 py-4 px-6 font-semibold rounded-xl transition transform hover:scale-[1.02] shadow-lg ${isDark ? 'bg-gradient-to-r from-green-600 to-green-500 hover:from-green-500 hover:to-green-400 text-white' : 'bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white'} ${uploadingReceipt ? 'opacity-60 cursor-not-allowed' : ''}`}
//                     >
//                       {uploadingReceipt ? 'Uploading...' : 'Upload Receipt & Submit'}
//                     </button>
//                   </div>
//                 </div>
//               </motion.div>
//             )}
//           </AnimatePresence>
//         </motion.div>

//         {/* Deposit History */}
//         <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }} className={`rounded-3xl border p-8 ${isDark ? 'bg-black/40 backdrop-blur-xl border-orange-600/30' : 'bg-white border-gray-200 shadow-xl'}`}>
//           <h2 className={`text-2xl font-semibold mb-6 ${isDark ? 'text-orange-300' : 'text-orange-700'}`}>Deposit History</h2>

//           {historyLoading ? (
//             <p className={`${isDark ? 'text-gray-400' : 'text-gray-500'} text-center py-8`}>Loading...</p>
//           ) : history.length === 0 ? (
//             <p className={`${isDark ? 'text-gray-400' : 'text-gray-500'} text-center py-8`}>No deposits yet.</p>
//           ) : (
//             <div className="space-y-4">
//               {history.map((dep) => (
//                 <div key={dep._id || dep.paymentId} className={`p-5 rounded-xl border flex justify-between items-center ${isDark ? 'bg-slate-900/60 border-orange-800/30' : 'bg-gray-50 border-gray-200'}`}>
//                   <div>
//                     <p className={`font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>{dep.payAmount || dep.amount} USDT</p>
//                     <p className={`${isDark ? 'text-gray-400' : 'text-gray-500'} text-sm`}>{dep.payAddress ? shorten(dep.payAddress) : '—'}</p>
//                   </div>
//                   <div className="text-right">
//                     <p className={`font-semibold ${dep.status === 'completed' || dep.status === 'confirmed' ? (isDark ? 'text-orange-400' : 'text-green-600') : dep.status === 'pending' ? 'text-amber-400' : 'text-red-500'}`}>{dep.status?.toUpperCase() || 'PENDING'}</p>
//                     <p className={`${isDark ? 'text-gray-500' : 'text-gray-600'} text-xs`}>{dep.createdAt ? new Date(dep.createdAt).toLocaleString() : '—'}</p>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           )}
//         </motion.div>
//       </div>
//     </div>
//   );
// }



// Deposit.jsx
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  WalletIcon, 
  DocumentDuplicateIcon, 
  CheckCircleIcon, 
  ClockIcon, 
  ArrowUpTrayIcon 
} from '@heroicons/react/24/solid';
import QRCode from 'react-qr-code';
import confetti from 'canvas-confetti';

import { 
  createDeposit, 
  getDepositHistory, 
  checkDepositStatus, 
  uploadReceipt 
} from '../../api/depositapi';
import { useTheme } from '../ui/ThemeContext';

export default function Deposit() {
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  const [amount, setAmount] = useState('');
  const [depositLoading, setDepositLoading] = useState(false);
  const [depositResult, setDepositResult] = useState(null);
  const [history, setHistory] = useState([]);
  const [historyLoading, setHistoryLoading] = useState(true);
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');
  const [copied, setCopied] = useState(false);
  const [pollingInterval, setPollingInterval] = useState(null);
  const [receiptFile, setReceiptFile] = useState(null);
  const [uploadingReceipt, setUploadingReceipt] = useState(false);
  const [showSuccessPopup, setShowSuccessPopup] = useState(false);

  useEffect(() => {
    loadHistory();
    const historyRefresh = setInterval(loadHistory, 30000);
    return () => clearInterval(historyRefresh);
  }, []);

  // Auto-close success popup after 5 seconds
  useEffect(() => {
    if (showSuccessPopup) {
      const timer = setTimeout(() => setShowSuccessPopup(false), 5000);
      return () => clearTimeout(timer);
    }
  }, [showSuccessPopup]);

  const loadHistory = async () => {
    try {
      setHistoryLoading(true);
      const res = await getDepositHistory();
      if (res.success && Array.isArray(res.data)) {
        setHistory(res.data);
      } else {
        setHistory([]);
        setError('Invalid history data format');
      }
    } catch (err) {
      console.error('Failed to load deposit history:', err);
      setHistory([]);
      setError('Failed to load history. Please try again.');
    } finally {
      setHistoryLoading(false);
    }
  };

  const handleCreateDeposit = async (e) => {
    e.preventDefault();
    const numAmount = parseFloat(amount);
    if (isNaN(numAmount) || numAmount <= 0) {
      setError('Please enter a valid amount greater than 0');
      return;
    }

    setError('');
    setMessage('');
    setDepositLoading(true);
    setDepositResult(null);
    setReceiptFile(null);

    try {
      const res = await createDeposit(numAmount);
      const data = res.data || res;
      if (!data || !data.paymentId) {
        throw new Error('Invalid deposit response');
      }
      setDepositResult(data);
      setMessage('Deposit request created! Please send funds and upload receipt.');
      setAmount('');
      loadHistory();
      startPolling(data.paymentId);
    } catch (err) {
      console.error('Deposit creation error:', err);
      setError(err.response?.data?.message || 'Failed to create deposit request.');
    } finally {
      setDepositLoading(false);
    }
  };

  const startPolling = (paymentId) => {
    if (pollingInterval) clearInterval(pollingInterval);

    const interval = setInterval(async () => {
      try {
        const res = await checkDepositStatus(paymentId);
        const status = res.data?.status || 'pending';
        setDepositResult((prev) => prev ? { ...prev, status } : null);

        const updatedHistory = history.map((dep) =>
          dep.paymentId === paymentId ? { ...dep, status } : dep
        );
        setHistory(updatedHistory);

        if (status === 'completed' || status === 'confirmed' || status === 'rejected') {
          clearInterval(interval);
          setPollingInterval(null);
          setMessage(status === 'rejected' ? 'Deposit rejected.' : 'Deposit confirmed! Balance updated.');
          loadHistory();
        }
      } catch (err) {
        console.warn('Polling error:', err);
        setError('Status check failed. Retrying...');
      }
    }, 8000);

    setPollingInterval(interval);
  };

  const handleUploadReceipt = async () => {
    if (!depositResult?.paymentId) {
        setError('No active deposit request found');
        return;
    }

    if (!receiptFile) {
        setError('Please select a receipt file first');
        return;
    }

    setUploadingReceipt(true);
    setError('');
    setMessage('');

    try {
        const formData = new FormData();
        formData.append('receipt', receiptFile);
        formData.append('paymentId', depositResult.paymentId);     // ← added here

        

        const res = await uploadReceipt(formData);                 
        if (res?.success || res?.status === 200 || res?.status === 201) {
            setMessage('Receipt uploaded successfully! Awaiting verification.');
            setReceiptFile(null);

            setShowSuccessPopup(true);

            confetti({
                particleCount: 120,
                spread: 70,
                origin: { y: 0.6 },
                colors: ['#f97316', '#fb923c', '#fed7aa', '#ffffff'],
                ticks: 300,
            });

            setTimeout(() => {
                confetti({
                    particleCount: 80,
                    angle: 60,
                    spread: 55,
                    origin: { x: 0.2, y: 0.6 },
                });
                confetti({
                    particleCount: 80,
                    angle: 120,
                    spread: 55,
                    origin: { x: 0.8, y: 0.6 },
                });
            }, 200);

            loadHistory();
        } else {
            throw new Error(res?.message || 'Upload did not complete successfully');
        }
    } catch (err) {
        console.error('Receipt upload error:', err);
        const errorMessage =
            err.response?.data?.message ||
            err.message ||
            'Failed to upload receipt. Please try again.';
        setError(errorMessage);
    } finally {
        setUploadingReceipt(false);
    }
};

  const copyToClipboard = (text) => {
    if (!text) return;
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2200);
  };

  const shorten = (str) => (str ? `${str.slice(0, 8)}...${str.slice(-6)}` : '');

  return (
    <div className={`min-h-screen p-6 transition-colors duration-300 ${isDark ? 'bg-slate-950 text-white' : 'bg-gray-50 text-gray-900'}`}>
      <div className="max-w-3xl mx-auto space-y-10">
        {/* Deposit Form */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }} 
          animate={{ opacity: 1, y: 0 }} 
          className={`rounded-3xl border p-8 shadow-2xl backdrop-blur-xl ${isDark ? 'bg-black/40 border-orange-600/30' : 'bg-white border-gray-200 shadow-xl'}`}
        >
          <div className="text-center mb-8">
            <WalletIcon className={`w-16 h-16 mx-auto mb-4 ${isDark ? 'text-orange-400' : 'text-orange-600'}`} />
            <h1 className={`text-4xl font-bold bg-gradient-to-r bg-clip-text text-transparent ${isDark ? 'from-orange-400 to-orange-500' : 'from-orange-600 to-orange-700'}`}>
              Deposit Funds
            </h1>
            <p className={`${isDark ? 'text-gray-400' : 'text-gray-500'} mt-2`}>USDT (BSC)</p>
          </div>

          <form onSubmit={handleCreateDeposit} className="space-y-6">
            <div>
              <label className={`block text-sm font-medium mb-2 ${isDark ? 'text-orange-300/90' : 'text-orange-700'}`}>
                Amount (USDT)
              </label>
              <input
                type="number"
                step="0.01"
                min="1"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                placeholder="10.00"
                className={`w-full px-5 py-4 rounded-xl placeholder-gray-500 border focus:outline-none focus:ring-2 transition ${isDark ? 'bg-slate-900 border-orange-700/40 text-white focus:border-orange-500 focus:ring-orange-500/30' : 'bg-white border-gray-300 text-gray-900 focus:border-orange-500 focus:ring-orange-400/30'}`}
                disabled={depositLoading}
                required
              />
            </div>

            <button 
              type="submit" 
              disabled={depositLoading || !amount || parseFloat(amount) <= 0}
              className={`w-full py-4 px-6 font-semibold rounded-xl transition transform hover:scale-[1.02] shadow-lg ${isDark ? 'bg-gradient-to-r from-orange-600 to-orange-500 hover:from-orange-500 hover:to-orange-400 text-white' : 'bg-gradient-to-r from-orange-600 to-orange-700 hover:from-orange-700 hover:to-orange-800 text-white'} ${depositLoading ? 'opacity-60 cursor-not-allowed' : ''}`}
            >
              {depositLoading ? 'Creating...' : 'Create Deposit Request'}
            </button>
          </form>

          {error && <p className="mt-4 text-red-500 dark:text-red-400 text-center font-medium">{error}</p>}
          {message && <p className="mt-4 text-green-500 dark:text-orange-300 text-center font-medium">{message}</p>}

          {/* Payment Details + Receipt Upload */}
          <AnimatePresence>
            {depositResult && (
              <motion.div 
                initial={{ opacity: 0, height: 0 }} 
                animate={{ opacity: 1, height: 'auto' }} 
                exit={{ opacity: 0, height: 0 }} 
                className="mt-8 overflow-hidden"
              >
                <div className={`p-6 rounded-2xl border ${isDark ? 'bg-slate-900/70 border-orange-600/30' : 'bg-gray-50 border-gray-200 shadow-inner'}`}>
                  <div className="flex justify-between items-center mb-4">
                    <h3 className={`text-lg font-semibold ${isDark ? 'text-orange-300' : 'text-orange-700'}`}>
                      Payment Details
                    </h3>
                    <div className="flex items-center gap-2">
                      {pollingInterval && <ClockIcon className="w-5 h-5 text-amber-400 animate-pulse" />}
                      <span className={`text-sm ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                        {depositResult.status || 'pending'}
                      </span>
                    </div>
                  </div>

                  {depositResult.payAddress && (
                    <>
                      <p className={`text-sm mb-2 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                        Send {depositResult.payCurrency || 'USDT'} to address:
                      </p>
                      <div className={`flex items-center gap-3 p-4 rounded-xl border ${isDark ? 'bg-black/40 border-orange-800/30' : 'bg-white border-gray-200 shadow-sm'}`}>
                        <p className={`font-mono break-all flex-1 ${isDark ? 'text-orange-300' : 'text-orange-700'}`}>
                          {shorten(depositResult.payAddress)}
                        </p>
                        <button 
                          onClick={() => copyToClipboard(depositResult.payAddress)} 
                          className="p-2 hover:bg-black/10 dark:hover:bg-white/10 rounded-lg transition"
                        >
                          {copied ? (
                            <CheckCircleIcon className={`w-6 h-6 ${isDark ? 'text-orange-400' : 'text-green-600'}`} />
                          ) : (
                            <DocumentDuplicateIcon className={`w-6 h-6 ${isDark ? 'text-gray-300' : 'text-gray-600'}`} />
                          )}
                        </button>
                      </div>

                      <div className="mt-6 flex justify-center">
                        <div className="p-4 rounded-2xl shadow-2xl bg-white">
                          <QRCode value={depositResult.payAddress} size={180} level="H" />
                        </div>
                      </div>
                      <p className={`text-center text-sm mt-3 ${isDark ? 'text-gray-500' : 'text-gray-600'}`}>
                        Scan to send {depositResult.payCurrency || 'USDT'}
                      </p>
                    </>
                  )}

                  {/* Receipt Upload Section */}
                  <div className="mt-8">
                    <h4 className={`text-md font-semibold mb-3 ${isDark ? 'text-orange-300' : 'text-orange-700'}`}>
                      Upload Payment Receipt
                    </h4>
                    <p className={`text-sm mb-4 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                      After sending funds, upload your transaction receipt / proof of payment for verification.
                    </p>
                    <input
                      type="file"
                      accept="image/*,.pdf"
                      onChange={(e) => setReceiptFile(e.target.files?.[0] || null)}
                      className={`block w-full text-sm text-gray-500 file:mr-4 file:py-3 file:px-5 file:rounded-xl file:border-0 file:text-sm file:font-semibold ${isDark ? 'file:bg-orange-900/50 file:text-orange-300 hover:file:bg-orange-900/70' : 'file:bg-orange-50 file:text-orange-700 hover:file:bg-orange-100'}`}
                      disabled={uploadingReceipt || depositResult.status !== 'pending'}
                    />
                    <button
                      onClick={handleUploadReceipt}
                      disabled={!receiptFile || uploadingReceipt || depositResult.status !== 'pending'}
                      className={`w-full mt-4 py-4 px-6 font-semibold rounded-xl transition transform hover:scale-[1.02] shadow-lg ${isDark ? 'bg-gradient-to-r from-green-600 to-green-500 hover:from-green-500 hover:to-green-400 text-white' : 'bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white'} ${uploadingReceipt ? 'opacity-60 cursor-not-allowed' : ''}`}
                    >
                      {uploadingReceipt ? 'Uploading...' : 'Upload Receipt & Submit'}
                    </button>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        {/* Deposit History */}
        <motion.div 
          initial={{ opacity: 0 }} 
          animate={{ opacity: 1 }} 
          transition={{ delay: 0.2 }} 
          className={`rounded-3xl border p-8 ${isDark ? 'bg-black/40 backdrop-blur-xl border-orange-600/30' : 'bg-white border-gray-200 shadow-xl'}`}
        >
          <h2 className={`text-2xl font-semibold mb-6 ${isDark ? 'text-orange-300' : 'text-orange-700'}`}>
            Deposit History
          </h2>

          {historyLoading ? (
            <p className={`${isDark ? 'text-gray-400' : 'text-gray-500'} text-center py-8`}>Loading...</p>
          ) : history.length === 0 ? (
            <p className={`${isDark ? 'text-gray-400' : 'text-gray-500'} text-center py-8`}>No deposits yet.</p>
          ) : (
            <div className="space-y-4">
              {history.map((dep) => (
                <div 
                  key={dep._id || dep.paymentId} 
                  className={`p-5 rounded-xl border flex justify-between items-center ${isDark ? 'bg-slate-900/60 border-orange-800/30' : 'bg-gray-50 border-gray-200'}`}
                >
                  <div>
                    <p className={`font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>
                      {dep.payAmount || dep.amount} USDT
                    </p>
                    <p className={`${isDark ? 'text-gray-400' : 'text-gray-500'} text-sm`}>
                      {dep.payAddress ? shorten(dep.payAddress) : '—'}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className={`font-semibold ${dep.status === 'completed' || dep.status === 'confirmed' ? (isDark ? 'text-orange-400' : 'text-green-600') : dep.status === 'pending' ? 'text-amber-400' : 'text-red-500'}`}>
                      {dep.status?.toUpperCase() || 'PENDING'}
                    </p>
                    <p className={`${isDark ? 'text-gray-500' : 'text-gray-600'} text-xs`}>
                      {dep.createdAt ? new Date(dep.createdAt).toLocaleString() : '—'}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </motion.div>

        {/* Success Popup */}
        <AnimatePresence>
          {showSuccessPopup && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4"
              onClick={() => setShowSuccessPopup(false)}
            >
              <motion.div
                initial={{ scale: 0.7, opacity: 0, y: 40 }}
                animate={{ scale: 1, opacity: 1, y: 0 }}
                exit={{ scale: 0.7, opacity: 0, y: 40 }}
                transition={{ type: 'spring', stiffness: 300, damping: 25 }}
                className={`relative max-w-md w-full rounded-3xl p-8 shadow-2xl border text-center ${
                  isDark
                    ? 'bg-gradient-to-b from-slate-900 to-slate-800 border-orange-600/40'
                    : 'bg-white border-orange-200 shadow-orange-100/50'
                }`}
                onClick={(e) => e.stopPropagation()}
              >
                <div className="mb-6">
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1, rotate: [0, 15, -10, 5, 0] }}
                    transition={{ delay: 0.3, type: 'spring', stiffness: 400 }}
                    className="inline-block text-7xl"
                  >
                    🎉
                  </motion.div>
                </div>

                <h2 className={`text-3xl font-bold mb-3 ${isDark ? 'text-orange-400' : 'text-orange-600'}`}>
                  Congratulations Victor!
                </h2>

                <p className={`text-lg mb-8 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                  Your receipt has been successfully uploaded.<br />
                  Our team will review it shortly — you're almost there!
                </p>

                <button
                  onClick={() => setShowSuccessPopup(false)}
                  className={`px-8 py-4 rounded-xl font-semibold text-lg transition transform hover:scale-105 shadow-lg ${
                    isDark
                      ? 'bg-gradient-to-r from-orange-600 to-orange-500 hover:from-orange-500 hover:to-orange-400 text-white'
                      : 'bg-gradient-to-r from-orange-600 to-orange-700 hover:from-orange-700 hover:to-orange-800 text-white'
                  }`}
                >
                  Awesome!
                </button>

                <button
                  onClick={() => setShowSuccessPopup(false)}
                  className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 text-xl"
                >
                  ×
                </button>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}