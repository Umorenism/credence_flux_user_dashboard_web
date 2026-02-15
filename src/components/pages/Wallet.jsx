

// // // // // Deposit.jsx
// // // // import React, { useState, useEffect } from 'react';
// // // // import { motion, AnimatePresence } from 'framer-motion';
// // // // import { WalletIcon, DocumentDuplicateIcon, CheckCircleIcon, ClockIcon } from '@heroicons/react/24/solid';
// // // // import QRCode from 'react-qr-code';

// // // // import { createDeposit, getDepositHistory, checkDepositStatus } from '../../api/depositapi';
// // // // import { useTheme } from '../ui/ThemeContext';

// // // // export default function Deposit() {
// // // //   const { theme } = useTheme();
// // // //   const isDark = theme === 'dark';

// // // //   const [amount, setAmount] = useState('');
// // // //   const [depositLoading, setDepositLoading] = useState(false);
// // // //   const [depositResult, setDepositResult] = useState(null);
// // // //   const [history, setHistory] = useState([]);
// // // //   const [historyLoading, setHistoryLoading] = useState(true);
// // // //   const [error, setError] = useState('');
// // // //   const [message, setMessage] = useState('');
// // // //   const [copied, setCopied] = useState(false);
// // // //   const [polling, setPolling] = useState(false);

// // // //   useEffect(() => {
// // // //     loadHistory();
// // // //   }, []);

// // // //   // Load deposit history
// // // //   const loadHistory = async () => {
// // // //     try {
// // // //       setHistoryLoading(true);
// // // //       const res = await getDepositHistory();
// // // //       console.log('Deposit history response:', res); // DEBUG
// // // //       setHistory(res.success && Array.isArray(res.data) ? res.data : []);
// // // //     } catch (err) {
// // // //       console.error('Failed to load deposit history:', err);
// // // //       setHistory([]);
// // // //     } finally {
// // // //       setHistoryLoading(false);
// // // //     }
// // // //   };

// // // //   // Create new deposit
// // // //   const handleCreateDeposit = async (e) => {
// // // //     e.preventDefault();
// // // //     const numAmount = parseFloat(amount);
// // // //     if (isNaN(numAmount) || numAmount <= 0) {
// // // //       setError('Please enter a valid amount greater than 0');
// // // //       return;
// // // //     }

// // // //     setError('');
// // // //     setMessage('');
// // // //     setDepositLoading(true);

// // // //     try {
// // // //       // API expects amount directly, not an object
// // // //       const res = await createDeposit(numAmount);
// // // //       console.log('Create deposit response:', res); // DEBUG

// // // //       const data = res.data || res; // handle API structure
// // // //       setDepositResult(data);
// // // //       setMessage(res.message || 'Deposit request created! Please send funds.');
// // // //       setAmount('');
// // // //       loadHistory();

// // // //       if (data?.paymentId) {
// // // //         startPolling(data.paymentId);
// // // //       }
// // // //     } catch (err) {
// // // //       console.error('Deposit creation error:', err);
// // // //       setError(err.response?.data?.message || 'Failed to create deposit request.');
// // // //     } finally {
// // // //       setDepositLoading(false);
// // // //     }
// // // //   };

// // // //   // Poll deposit status
// // // //   const startPolling = (paymentId) => {
// // // //     setPolling(true);
// // // //     const interval = setInterval(async () => {
// // // //       try {
// // // //         const res = await checkDepositStatus(paymentId);
// // // //         console.log(`Polling deposit ${paymentId} status:`, res); // DEBUG

// // // //         const status = res.data?.status || 'pending';
// // // //         setDepositResult((prev) => ({ ...prev, status }));

// // // //         if (status === 'completed' || status === 'confirmed') {
// // // //           clearInterval(interval);
// // // //           setPolling(false);
// // // //           setMessage('Deposit confirmed! Balance updated.');
// // // //           loadHistory();
// // // //         }
// // // //       } catch (err) {
// // // //         console.warn('Polling error:', err);
// // // //       }
// // // //     }, 8000);

// // // //     return () => clearInterval(interval);
// // // //   };

// // // //   const copyToClipboard = (text) => {
// // // //     navigator.clipboard.writeText(text);
// // // //     setCopied(true);
// // // //     setTimeout(() => setCopied(false), 2200);
// // // //   };

// // // //   const shorten = (str) => (str ? `${str.slice(0, 8)}...${str.slice(-6)}` : '');

// // // //   return (
// // // //     <div className={`min-h-screen p-6 transition-colors duration-300 ${isDark ? 'bg-slate-950 text-white' : 'bg-gray-50 text-gray-900'}`}>
// // // //       <div className="max-w-3xl mx-auto space-y-10">
// // // //         {/* Deposit Form */}
// // // //         <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className={`rounded-3xl border p-8 shadow-2xl backdrop-blur-xl ${isDark ? 'bg-black/40 border-orange-600/30' : 'bg-white border-gray-200 shadow-xl'}`}>
// // // //           <div className="text-center mb-8">
// // // //             <WalletIcon className={`w-16 h-16 mx-auto mb-4 ${isDark ? 'text-orange-400' : 'text-orange-600'}`} />
// // // //             <h1 className={`text-4xl font-bold bg-gradient-to-r bg-clip-text text-transparent ${isDark ? 'from-orange-400 to-orange-500' : 'from-orange-600 to-orange-700'}`}>
// // // //               Deposit Funds
// // // //             </h1>
// // // //             <p className={`${isDark ? 'text-gray-400' : 'text-gray-500'} mt-2`}>USDT (BSC)</p>
// // // //           </div>

// // // //           <form onSubmit={handleCreateDeposit} className="space-y-6">
// // // //             <div>
// // // //               <label className={`block text-sm font-medium mb-2 ${isDark ? 'text-orange-300/90' : 'text-orange-700'}`}>Amount (USDT)</label>
// // // //               <input
// // // //                 type="number"
// // // //                 step="0.01"
// // // //                 min="1"
// // // //                 value={amount}
// // // //                 onChange={(e) => setAmount(e.target.value)}
// // // //                 placeholder="10.00"
// // // //                 className={`w-full px-5 py-4 rounded-xl placeholder-gray-500 border focus:outline-none focus:ring-2 transition ${isDark ? 'bg-slate-900 border-orange-700/40 text-white focus:border-orange-500 focus:ring-orange-500/30' : 'bg-white border-gray-300 text-gray-900 focus:border-orange-500 focus:ring-orange-400/30'}`}
// // // //                 disabled={depositLoading}
// // // //                 required
// // // //               />
// // // //             </div>

// // // //             <button type="submit" disabled={depositLoading || !amount || parseFloat(amount) <= 0} className={`w-full py-4 px-6 font-semibold rounded-xl transition transform hover:scale-[1.02] shadow-lg ${isDark ? 'bg-gradient-to-r from-orange-600 to-orange-500 hover:from-orange-500 hover:to-orange-400 text-white' : 'bg-gradient-to-r from-orange-600 to-orange-700 hover:from-orange-700 hover:to-orange-800 text-white'} ${depositLoading ? 'opacity-60 cursor-not-allowed' : ''}`}>
// // // //               {depositLoading ? 'Creating...' : 'Create Deposit Request'}
// // // //             </button>
// // // //           </form>

// // // //           {error && <p className="mt-4 text-red-500 dark:text-red-400 text-center font-medium">{error}</p>}
// // // //           {message && <p className="mt-4 text-green-500 dark:text-orange-300 text-center font-medium">{message}</p>}

// // // //           {/* Payment Instructions / QR */}
// // // //           <AnimatePresence>
// // // //             {depositResult && (
// // // //               <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }} className="mt-8 overflow-hidden">
// // // //                 <div className={`p-6 rounded-2xl border ${isDark ? 'bg-slate-900/70 border-orange-600/30' : 'bg-gray-50 border-gray-200 shadow-inner'}`}>
// // // //                   <div className="flex justify-between items-center mb-4">
// // // //                     <h3 className={`text-lg font-semibold ${isDark ? 'text-orange-300' : 'text-orange-700'}`}>Payment Details</h3>
// // // //                     <div className="flex items-center gap-2">
// // // //                       {polling && <ClockIcon className="w-5 h-5 text-amber-400 animate-pulse" />}
// // // //                       <span className={`text-sm ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>{depositResult.status || 'pending'}</span>
// // // //                     </div>
// // // //                   </div>

// // // //                   {depositResult.payAddress && (
// // // //                     <>
// // // //                       <p className={`text-sm mb-2 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
// // // //                         Send {depositResult.payCurrency} to address:
// // // //                       </p>
// // // //                       <div className={`flex items-center gap-3 p-4 rounded-xl border ${isDark ? 'bg-black/40 border-orange-800/30' : 'bg-white border-gray-200 shadow-sm'}`}>
// // // //                         <p className={`font-mono break-all flex-1 ${isDark ? 'text-orange-300' : 'text-orange-700'}`}>{shorten(depositResult.payAddress)}</p>
// // // //                         <button onClick={() => copyToClipboard(depositResult.payAddress)} className="p-2 hover:bg-black/10 dark:hover:bg-white/10 rounded-lg transition">
// // // //                           {copied ? <CheckCircleIcon className={`w-6 h-6 ${isDark ? 'text-orange-400' : 'text-green-600'}`} /> : <DocumentDuplicateIcon className={`w-6 h-6 ${isDark ? 'text-gray-300' : 'text-gray-600'}`} />}
// // // //                         </button>
// // // //                       </div>

// // // //                       <div className="mt-6 flex justify-center">
// // // //                         <div className="p-4 rounded-2xl shadow-2xl bg-white">
// // // //                           <QRCode value={depositResult.payAddress} size={180} level="H" />
// // // //                         </div>
// // // //                       </div>
// // // //                       <p className={`text-center text-sm mt-3 ${isDark ? 'text-gray-500' : 'text-gray-600'}`}>Scan to send {depositResult.payCurrency}</p>
// // // //                     </>
// // // //                   )}
// // // //                 </div>
// // // //               </motion.div>
// // // //             )}
// // // //           </AnimatePresence>
// // // //         </motion.div>

// // // //         {/* Deposit History */}
// // // //         <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }} className={`rounded-3xl border p-8 ${isDark ? 'bg-black/40 backdrop-blur-xl border-orange-600/30' : 'bg-white border-gray-200 shadow-xl'}`}>
// // // //           <h2 className={`text-2xl font-semibold mb-6 ${isDark ? 'text-orange-300' : 'text-orange-700'}`}>Deposit History</h2>

// // // //           {historyLoading ? (
// // // //             <p className={`${isDark ? 'text-gray-400' : 'text-gray-500'} text-center py-8`}>Loading...</p>
// // // //           ) : history.length === 0 ? (
// // // //             <p className={`${isDark ? 'text-gray-400' : 'text-gray-500'} text-center py-8`}>No deposits yet.</p>
// // // //           ) : (
// // // //             <div className="space-y-4">
// // // //               {history.map((dep) => (
// // // //                 <div key={dep._id || dep.paymentId} className={`p-5 rounded-xl border flex justify-between items-center ${isDark ? 'bg-slate-900/60 border-orange-800/30' : 'bg-gray-50 border-gray-200'}`}>
// // // //                   <div>
// // // //                     <p className={`font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>{dep.payAmount || dep.amount} USDT</p>
// // // //                     <p className={`${isDark ? 'text-gray-400' : 'text-gray-500'} text-sm`}>{dep.payAddress ? shorten(dep.payAddress) : '—'}</p>
// // // //                   </div>
// // // //                   <div className="text-right">
// // // //                     <p className={`font-semibold ${dep.status === 'completed' || dep.status === 'confirmed' ? (isDark ? 'text-orange-400' : 'text-green-600') : dep.status === 'pending' ? 'text-amber-400' : 'text-red-500'}`}>{dep.status?.toUpperCase() || 'PENDING'}</p>
// // // //                     <p className={`${isDark ? 'text-gray-500' : 'text-gray-600'} text-xs`}>{dep.createdAt ? new Date(dep.createdAt).toLocaleString() : '—'}</p>
// // // //                   </div>
// // // //                 </div>
// // // //               ))}
// // // //             </div>
// // // //           )}
// // // //         </motion.div>
// // // //       </div>
// // // //     </div>
// // // //   );
// // // // }




// // // // // Deposit.jsx
// // // // import React, { useState, useEffect, useRef } from 'react';
// // // // import { motion, AnimatePresence } from 'framer-motion';
// // // // import { WalletIcon, DocumentDuplicateIcon, CheckCircleIcon, ClockIcon, PhotoIcon, ArrowUpTrayIcon } from '@heroicons/react/24/solid';
// // // // import QRCode from 'react-qr-code';

// // // // import { 
// // // //   createManualDepositRequest,  // ← new or renamed API: creates pending deposit record
// // // //   submitDepositProof,          // ← new API: uploads image + optional txHash
// // // //   getDepositHistory 
// // // // } from '../../api/depositapi';   // Update your api file accordingly
// // // // import { useTheme } from '../ui/ThemeContext';

// // // // const FIXED_WALLET_ADDRESS = '0xYourCompanyUSDTBSCAddressHere...'; // ← Replace or fetch from backend
// // // // const SUPPORTED_CURRENCY = 'USDT (BSC)';

// // // // export default function Deposit() {
// // // //   const { theme } = useTheme();
// // // //   const isDark = theme === 'dark';

// // // //   const [amount, setAmount] = useState('');
// // // //   const [txHash, setTxHash] = useState('');               // Optional: user pastes tx hash
// // // //   const [proofFile, setProofFile] = useState(null);
// // // //   const [preview, setPreview] = useState(null);           // Image preview
// // // //   const [loading, setLoading] = useState(false);
// // // //   const [message, setMessage] = useState('');
// // // //   const [error, setError] = useState('');
// // // //   const [history, setHistory] = useState([]);
// // // //   const [historyLoading, setHistoryLoading] = useState(true);
// // // //   const [copied, setCopied] = useState(false);

// // // //   const fileInputRef = useRef(null);

// // // //   useEffect(() => {
// // // //     loadHistory();
// // // //   }, []);

// // // //   const loadHistory = async () => {
// // // //     try {
// // // //       setHistoryLoading(true);
// // // //       const res = await getDepositHistory();
// // // //       setHistory(res.success && Array.isArray(res.data) ? res.data : []);
// // // //     } catch (err) {
// // // //       console.error('Failed to load history:', err);
// // // //       setHistory([]);
// // // //     } finally {
// // // //       setHistoryLoading(false);
// // // //     }
// // // //   };

// // // //   const handleFileChange = (e) => {
// // // //     const file = e.target.files[0];
// // // //     if (!file) return;

// // // //     if (!['image/jpeg', 'image/png', 'image/jpg'].includes(file.type)) {
// // // //       setError('Only JPG/PNG images allowed');
// // // //       return;
// // // //     }
// // // //     if (file.size > 5 * 1024 * 1024) { // 5MB limit
// // // //       setError('File too large (max 5MB)');
// // // //       return;
// // // //     }

// // // //     setProofFile(file);
// // // //     setPreview(URL.createObjectURL(file));
// // // //     setError('');
// // // //   };

// // // //   const handleSubmitProof = async (e) => {
// // // //     e.preventDefault();
// // // //     const numAmount = parseFloat(amount);
// // // //     if (isNaN(numAmount) || numAmount <= 0) {
// // // //       setError('Enter valid amount > 0');
// // // //       return;
// // // //     }
// // // //     if (!proofFile) {
// // // //       setError('Please upload payment proof screenshot');
// // // //       return;
// // // //     }

// // // //     setError('');
// // // //     setMessage('');
// // // //     setLoading(true);

// // // //     try {
// // // //       // Step 1: Create pending deposit record (optional but good for tracking)
// // // //       const requestRes = await createManualDepositRequest(numAmount);
// // // //       const depositId = requestRes.data?.depositId || null; // assume backend returns ID

// // // //       // Step 2: Submit proof
// // // //       const formData = new FormData();
// // // //       formData.append('amount', numAmount);
// // // //       formData.append('proof', proofFile);
// // // //       if (txHash.trim()) formData.append('txHash', txHash.trim());
// // // //       if (depositId) formData.append('depositId', depositId);

// // // //       const proofRes = await submitDepositProof(formData);

// // // //       setMessage('Payment proof submitted! Awaiting admin confirmation.');
// // // //       setAmount('');
// // // //       setTxHash('');
// // // //       setProofFile(null);
// // // //       setPreview(null);
// // // //       loadHistory();
// // // //     } catch (err) {
// // // //       setError(err.response?.data?.message || 'Failed to submit proof');
// // // //       console.error(err);
// // // //     } finally {
// // // //       setLoading(false);
// // // //     }
// // // //   };

// // // //   const copyToClipboard = (text) => {
// // // //     navigator.clipboard.writeText(text);
// // // //     setCopied(true);
// // // //     setTimeout(() => setCopied(false), 2200);
// // // //   };

// // // //   const shorten = (str) => (str ? `${str.slice(0, 8)}...${str.slice(-6)}` : '');

// // // //   return (
// // // //     <div className={`min-h-screen p-6 transition-colors duration-300 ${isDark ? 'bg-slate-950 text-white' : 'bg-gray-50 text-gray-900'}`}>
// // // //       <div className="max-w-3xl mx-auto space-y-10">
// // // //         {/* Deposit Form – Manual */}
// // // //         <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className={`rounded-3xl border p-8 shadow-2xl backdrop-blur-xl ${isDark ? 'bg-black/40 border-orange-600/30' : 'bg-white border-gray-200 shadow-xl'}`}>
// // // //           <div className="text-center mb-8">
// // // //             <WalletIcon className={`w-16 h-16 mx-auto mb-4 ${isDark ? 'text-orange-400' : 'text-orange-600'}`} />
// // // //             <h1 className={`text-4xl font-bold bg-gradient-to-r bg-clip-text text-transparent ${isDark ? 'from-orange-400 to-orange-500' : 'from-orange-600 to-orange-700'}`}>
// // // //               Manual Deposit
// // // //             </h1>
// // // //             <p className={`${isDark ? 'text-gray-400' : 'text-gray-500'} mt-2`}>{SUPPORTED_CURRENCY}</p>
// // // //           </div>

// // // //           <form onSubmit={handleSubmitProof} className="space-y-6">
// // // //             <div>
// // // //               <label className={`block text-sm font-medium mb-2 ${isDark ? 'text-orange-300/90' : 'text-orange-700'}`}>Amount (USDT)</label>
// // // //               <input
// // // //                 type="number"
// // // //                 step="0.01"
// // // //                 min="1"
// // // //                 value={amount}
// // // //                 onChange={(e) => setAmount(e.target.value)}
// // // //                 placeholder="10.00"
// // // //                 className={`w-full px-5 py-4 rounded-xl placeholder-gray-500 border focus:outline-none focus:ring-2 transition ${isDark ? 'bg-slate-900 border-orange-700/40 text-white focus:border-orange-500 focus:ring-orange-500/30' : 'bg-white border-gray-300 text-gray-900 focus:border-orange-500 focus:ring-orange-400/30'}`}
// // // //                 disabled={loading}
// // // //                 required
// // // //               />
// // // //             </div>

// // // //             {/* Fixed Wallet + QR */}
// // // //             <div className={`p-6 rounded-2xl border ${isDark ? 'bg-slate-900/70 border-orange-600/30' : 'bg-gray-50 border-gray-200'}`}>
// // // //               <p className={`text-sm mb-3 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
// // // //                 Send the amount to the following address (BSC network):
// // // //               </p>
// // // //               <div className={`flex items-center gap-3 p-4 rounded-xl border mb-4 ${isDark ? 'bg-black/40 border-orange-800/30' : 'bg-white border-gray-200'}`}>
// // // //                 <p className={`font-mono break-all flex-1 ${isDark ? 'text-orange-300' : 'text-orange-700'}`}>
// // // //                   {shorten(FIXED_WALLET_ADDRESS)}
// // // //                 </p>
// // // //                 <button type="button" onClick={() => copyToClipboard(FIXED_WALLET_ADDRESS)} className="p-2 hover:bg-black/10 dark:hover:bg-white/10 rounded-lg transition">
// // // //                   {copied ? <CheckCircleIcon className={`w-6 h-6 ${isDark ? 'text-orange-400' : 'text-green-600'}`} /> : <DocumentDuplicateIcon className={`w-6 h-6 ${isDark ? 'text-gray-300' : 'text-gray-600'}`} />}
// // // //                 </button>
// // // //               </div>

// // // //               <div className="flex justify-center mb-3">
// // // //                 <div className="p-4 rounded-2xl shadow-2xl bg-white">
// // // //                   <QRCode value={FIXED_WALLET_ADDRESS} size={180} level="H" />
// // // //                 </div>
// // // //               </div>
// // // //               <p className={`text-center text-sm ${isDark ? 'text-gray-500' : 'text-gray-600'}`}>Scan or copy address – use BSC network only!</p>
// // // //             </div>

// // // //             {/* Payment Proof Upload */}
// // // //             <div>
// // // //               <label className={`block text-sm font-medium mb-2 ${isDark ? 'text-orange-300/90' : 'text-orange-700'}`}>
// // // //                 Upload Payment Proof (screenshot)
// // // //               </label>
// // // //               <div 
// // // //                 onClick={() => fileInputRef.current?.click()}
// // // //                 className={`border-2 border-dashed rounded-xl p-6 text-center cursor-pointer transition hover:border-orange-500 ${isDark ? 'border-orange-700/40 bg-slate-900/30' : 'border-gray-300 bg-gray-50'}`}
// // // //               >
// // // //                 {preview ? (
// // // //                   <img src={preview} alt="Proof preview" className="max-h-48 mx-auto rounded" />
// // // //                 ) : (
// // // //                   <>
// // // //                     <ArrowUpTrayIcon className={`w-10 h-10 mx-auto mb-2 ${isDark ? 'text-orange-400' : 'text-orange-600'}`} />
// // // //                     <p className={`${isDark ? 'text-gray-300' : 'text-gray-600'}`}>Click or drag screenshot here</p>
// // // //                     <p className={`text-xs mt-1 ${isDark ? 'text-gray-500' : 'text-gray-400'}`}>JPG/PNG – max 5MB</p>
// // // //                   </>
// // // //                 )}
// // // //                 <input
// // // //                   ref={fileInputRef}
// // // //                   type="file"
// // // //                   accept="image/jpeg,image/png"
// // // //                   onChange={handleFileChange}
// // // //                   className="hidden"
// // // //                 />
// // // //               </div>
// // // //             </div>

// // // //             {/* Optional Tx Hash */}
// // // //             <div>
// // // //               <label className={`block text-sm font-medium mb-2 ${isDark ? 'text-orange-300/90' : 'text-orange-700'}`}>
// // // //                 Transaction Hash (optional – helps admin verify faster)
// // // //               </label>
// // // //               <input
// // // //                 type="text"
// // // //                 value={txHash}
// // // //                 onChange={(e) => setTxHash(e.target.value)}
// // // //                 placeholder="0x..."
// // // //                 className={`w-full px-5 py-4 rounded-xl placeholder-gray-500 border focus:outline-none focus:ring-2 transition ${isDark ? 'bg-slate-900 border-orange-700/40 text-white focus:border-orange-500 focus:ring-orange-500/30' : 'bg-white border-gray-300 text-gray-900 focus:border-orange-500 focus:ring-orange-400/30'}`}
// // // //               />
// // // //             </div>

// // // //             <button 
// // // //               type="submit" 
// // // //               disabled={loading || !amount || !proofFile}
// // // //               className={`w-full py-4 px-6 font-semibold rounded-xl transition transform hover:scale-[1.02] shadow-lg ${isDark ? 'bg-gradient-to-r from-orange-600 to-orange-500 hover:from-orange-500 hover:to-orange-400 text-white' : 'bg-gradient-to-r from-orange-600 to-orange-700 hover:from-orange-700 hover:to-orange-800 text-white'} ${loading || !amount || !proofFile ? 'opacity-60 cursor-not-allowed' : ''}`}
// // // //             >
// // // //               {loading ? 'Submitting...' : 'Submit Proof & Request Confirmation'}
// // // //             </button>
// // // //           </form>

// // // //           {error && <p className="mt-4 text-red-500 dark:text-red-400 text-center font-medium">{error}</p>}
// // // //           {message && <p className="mt-4 text-green-500 dark:text-orange-300 text-center font-medium">{message}</p>}
// // // //         </motion.div>

// // // //         {/* Deposit History – now shows pending/manual status */}
// // // //         <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }} className={`rounded-3xl border p-8 ${isDark ? 'bg-black/40 backdrop-blur-xl border-orange-600/30' : 'bg-white border-gray-200 shadow-xl'}`}>
// // // //           <h2 className={`text-2xl font-semibold mb-6 ${isDark ? 'text-orange-300' : 'text-orange-700'}`}>Deposit Requests History</h2>

// // // //           {historyLoading ? (
// // // //             <p className={`${isDark ? 'text-gray-400' : 'text-gray-500'} text-center py-8`}>Loading...</p>
// // // //           ) : history.length === 0 ? (
// // // //             <p className={`${isDark ? 'text-gray-400' : 'text-gray-500'} text-center py-8`}>No deposit requests yet.</p>
// // // //           ) : (
// // // //             <div className="space-y-4">
// // // //               {history.map((dep) => (
// // // //                 <div key={dep._id || dep.id} className={`p-5 rounded-xl border flex justify-between items-center ${isDark ? 'bg-slate-900/60 border-orange-800/30' : 'bg-gray-50 border-gray-200'}`}>
// // // //                   <div>
// // // //                     <p className={`font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>{dep.amount} USDT</p>
// // // //                     <p className={`${isDark ? 'text-gray-400' : 'text-gray-500'} text-sm`}>Proof uploaded • {dep.txHash ? shorten(dep.txHash) : 'No hash'}</p>
// // // //                   </div>
// // // //                   <div className="text-right">
// // // //                     <p className={`font-semibold ${dep.status === 'confirmed' || dep.status === 'completed' ? (isDark ? 'text-orange-400' : 'text-green-600') : dep.status === 'pending' || dep.status === 'under_review' ? 'text-amber-400' : 'text-red-500'}`}>
// // // //                       {dep.status?.toUpperCase() || 'PENDING REVIEW'}
// // // //                     </p>
// // // //                     <p className={`${isDark ? 'text-gray-500' : 'text-gray-600'} text-xs`}>{dep.createdAt ? new Date(dep.createdAt).toLocaleString() : '—'}</p>
// // // //                   </div>
// // // //                 </div>
// // // //               ))}
// // // //             </div>
// // // //           )}
// // // //         </motion.div>
// // // //       </div>
// // // //     </div>
// // // //   );
// // // // }





// // // // Deposit.jsx
// // // import React, { useState, useEffect } from 'react';
// // // import { motion, AnimatePresence } from 'framer-motion';
// // // import { WalletIcon, DocumentDuplicateIcon, CheckCircleIcon, ClockIcon, ArrowUpTrayIcon } from '@heroicons/react/24/solid';
// // // import QRCode from 'react-qr-code';

// // // import { createDeposit, getDepositHistory, checkDepositStatus, uploadReceipt } from '../../api/depositapi'; // Assume uploadReceipt is added to API
// // // import { useTheme } from '../ui/ThemeContext';

// // // export default function Deposit() {
// // //   const { theme } = useTheme();
// // //   const isDark = theme === 'dark';

// // //   const [amount, setAmount] = useState('');
// // //   const [depositLoading, setDepositLoading] = useState(false);
// // //   const [depositResult, setDepositResult] = useState(null);
// // //   const [history, setHistory] = useState([]);
// // //   const [historyLoading, setHistoryLoading] = useState(true);
// // //   const [error, setError] = useState('');
// // //   const [message, setMessage] = useState('');
// // //   const [copied, setCopied] = useState(false);
// // //   const [pollingInterval, setPollingInterval] = useState(null);
// // //   const [receiptFile, setReceiptFile] = useState(null);
// // //   const [uploadingReceipt, setUploadingReceipt] = useState(false);

// // //   useEffect(() => {
// // //     loadHistory();
// // //     // Start periodic history refresh every 30s for live data
// // //     const historyRefresh = setInterval(loadHistory, 30000);
// // //     return () => clearInterval(historyRefresh);
// // //   }, []);

// // //   // Load deposit history with better error handling
// // //   const loadHistory = async () => {
// // //     try {
// // //       setHistoryLoading(true);
// // //       const res = await getDepositHistory();
// // //       if (res.success && Array.isArray(res.data)) {
// // //         setHistory(res.data);
// // //       } else {
// // //         setHistory([]);
// // //         setError('Invalid history data format');
// // //       }
// // //     } catch (err) {
// // //       console.error('Failed to load deposit history:', err);
// // //       setHistory([]);
// // //       setError('Failed to load history. Please try again.');
// // //     } finally {
// // //       setHistoryLoading(false);
// // //     }
// // //   };

// // //   // Create new deposit with improved validation
// // //   const handleCreateDeposit = async (e) => {
// // //     e.preventDefault();
// // //     const numAmount = parseFloat(amount);
// // //     if (isNaN(numAmount) || numAmount <= 0) {
// // //       setError('Please enter a valid amount greater than 0');
// // //       return;
// // //     }

// // //     setError('');
// // //     setMessage('');
// // //     setDepositLoading(true);
// // //     setDepositResult(null); // Reset previous result
// // //     setReceiptFile(null); // Reset file

// // //     try {
// // //       const res = await createDeposit(numAmount);
// // //       const data = res.data || res;
// // //       if (!data || !data.paymentId) {
// // //         throw new Error('Invalid deposit response');
// // //       }
// // //       setDepositResult(data);
// // //       setMessage('Deposit request created! Please send funds and upload receipt.');
// // //       setAmount('');
// // //       loadHistory();
// // //       startPolling(data.paymentId);
// // //     } catch (err) {
// // //       console.error('Deposit creation error:', err);
// // //       setError(err.response?.data?.message || 'Failed to create deposit request.');
// // //     } finally {
// // //       setDepositLoading(false);
// // //     }
// // //   };

// // //   // Poll deposit status for live updates
// // //   const startPolling = (paymentId) => {
// // //     if (pollingInterval) clearInterval(pollingInterval);

// // //     const interval = setInterval(async () => {
// // //       try {
// // //         const res = await checkDepositStatus(paymentId);
// // //         const status = res.data?.status || 'pending';
// // //         setDepositResult((prev) => prev ? { ...prev, status } : null);

// // //         // Update history live if status changed
// // //         const updatedHistory = history.map((dep) =>
// // //           dep.paymentId === paymentId ? { ...dep, status } : dep
// // //         );
// // //         setHistory(updatedHistory);

// // //         if (status === 'completed' || status === 'confirmed' || status === 'rejected') {
// // //           clearInterval(interval);
// // //           setPollingInterval(null);
// // //           setMessage(status === 'rejected' ? 'Deposit rejected.' : 'Deposit confirmed! Balance updated.');
// // //           loadHistory(); // Full refresh
// // //         }
// // //       } catch (err) {
// // //         console.warn('Polling error:', err);
// // //         setError('Status check failed. Retrying...');
// // //       }
// // //     }, 8000);

// // //     setPollingInterval(interval);
// // //   };

// // //   // Upload receipt for manual verification
// // //   const handleUploadReceipt = async () => {
// // //     if (!depositResult?.paymentId || !receiptFile) {
// // //       setError('Missing payment ID or receipt file');
// // //       return;
// // //     }

// // //     setUploadingReceipt(true);
// // //     setError('');
// // //     setMessage('');

// // //     try {
// // //       const formData = new FormData();
// // //       formData.append('receipt', receiptFile);
// // //       const res = await uploadReceipt(depositResult.paymentId, formData);
// // //       if (res.success) {
// // //         setMessage('Receipt uploaded! Awaiting verification.');
// // //         setReceiptFile(null);
// // //         loadHistory();
// // //       } else {
// // //         throw new Error(res.message || 'Upload failed');
// // //       }
// // //     } catch (err) {
// // //       console.error('Receipt upload error:', err);
// // //       setError(err.response?.data?.message || 'Failed to upload receipt.');
// // //     } finally {
// // //       setUploadingReceipt(false);
// // //     }
// // //   };

// // //   const copyToClipboard = (text) => {
// // //     if (!text) return;
// // //     navigator.clipboard.writeText(text);
// // //     setCopied(true);
// // //     setTimeout(() => setCopied(false), 2200);
// // //   };

// // //   const shorten = (str) => (str ? `${str.slice(0, 8)}...${str.slice(-6)}` : '');

// // //   return (
// // //     <div className={`min-h-screen p-6 transition-colors duration-300 ${isDark ? 'bg-slate-950 text-white' : 'bg-gray-50 text-gray-900'}`}>
// // //       <div className="max-w-3xl mx-auto space-y-10">
// // //         {/* Deposit Form */}
// // //         <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className={`rounded-3xl border p-8 shadow-2xl backdrop-blur-xl ${isDark ? 'bg-black/40 border-orange-600/30' : 'bg-white border-gray-200 shadow-xl'}`}>
// // //           <div className="text-center mb-8">
// // //             <WalletIcon className={`w-16 h-16 mx-auto mb-4 ${isDark ? 'text-orange-400' : 'text-orange-600'}`} />
// // //             <h1 className={`text-4xl font-bold bg-gradient-to-r bg-clip-text text-transparent ${isDark ? 'from-orange-400 to-orange-500' : 'from-orange-600 to-orange-700'}`}>
// // //               Deposit Funds
// // //             </h1>
// // //             <p className={`${isDark ? 'text-gray-400' : 'text-gray-500'} mt-2`}>USDT (BSC)</p>
// // //           </div>

// // //           <form onSubmit={handleCreateDeposit} className="space-y-6">
// // //             <div>
// // //               <label className={`block text-sm font-medium mb-2 ${isDark ? 'text-orange-300/90' : 'text-orange-700'}`}>Amount (USDT)</label>
// // //               <input
// // //                 type="number"
// // //                 step="0.01"
// // //                 min="1"
// // //                 value={amount}
// // //                 onChange={(e) => setAmount(e.target.value)}
// // //                 placeholder="10.00"
// // //                 className={`w-full px-5 py-4 rounded-xl placeholder-gray-500 border focus:outline-none focus:ring-2 transition ${isDark ? 'bg-slate-900 border-orange-700/40 text-white focus:border-orange-500 focus:ring-orange-500/30' : 'bg-white border-gray-300 text-gray-900 focus:border-orange-500 focus:ring-orange-400/30'}`}
// // //                 disabled={depositLoading}
// // //                 required
// // //               />
// // //             </div>

// // //             <button type="submit" disabled={depositLoading || !amount || parseFloat(amount) <= 0} className={`w-full py-4 px-6 font-semibold rounded-xl transition transform hover:scale-[1.02] shadow-lg ${isDark ? 'bg-gradient-to-r from-orange-600 to-orange-500 hover:from-orange-500 hover:to-orange-400 text-white' : 'bg-gradient-to-r from-orange-600 to-orange-700 hover:from-orange-700 hover:to-orange-800 text-white'} ${depositLoading ? 'opacity-60 cursor-not-allowed' : ''}`}>
// // //               {depositLoading ? 'Creating...' : 'Create Deposit Request'}
// // //             </button>
// // //           </form>

// // //           {error && <p className="mt-4 text-red-500 dark:text-red-400 text-center font-medium">{error}</p>}
// // //           {message && <p className="mt-4 text-green-500 dark:text-orange-300 text-center font-medium">{message}</p>}

// // //           {/* Payment Instructions / QR / Receipt Upload */}
// // //           <AnimatePresence>
// // //             {depositResult && (
// // //               <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }} className="mt-8 overflow-hidden">
// // //                 <div className={`p-6 rounded-2xl border ${isDark ? 'bg-slate-900/70 border-orange-600/30' : 'bg-gray-50 border-gray-200 shadow-inner'}`}>
// // //                   <div className="flex justify-between items-center mb-4">
// // //                     <h3 className={`text-lg font-semibold ${isDark ? 'text-orange-300' : 'text-orange-700'}`}>Payment Details</h3>
// // //                     <div className="flex items-center gap-2">
// // //                       {pollingInterval && <ClockIcon className="w-5 h-5 text-amber-400 animate-pulse" />}
// // //                       <span className={`text-sm ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>{depositResult.status || 'pending'}</span>
// // //                     </div>
// // //                   </div>

// // //                   {depositResult.payAddress && (
// // //                     <>
// // //                       <p className={`text-sm mb-2 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
// // //                         Send {depositResult.payCurrency} to address:
// // //                       </p>
// // //                       <div className={`flex items-center gap-3 p-4 rounded-xl border ${isDark ? 'bg-black/40 border-orange-800/30' : 'bg-white border-gray-200 shadow-sm'}`}>
// // //                         <p className={`font-mono break-all flex-1 ${isDark ? 'text-orange-300' : 'text-orange-700'}`}>{shorten(depositResult.payAddress)}</p>
// // //                         <button onClick={() => copyToClipboard(depositResult.payAddress)} className="p-2 hover:bg-black/10 dark:hover:bg-white/10 rounded-lg transition">
// // //                           {copied ? <CheckCircleIcon className={`w-6 h-6 ${isDark ? 'text-orange-400' : 'text-green-600'}`} /> : <DocumentDuplicateIcon className={`w-6 h-6 ${isDark ? 'text-gray-300' : 'text-gray-600'}`} />}
// // //                         </button>
// // //                       </div>

// // //                       <div className="mt-6 flex justify-center">
// // //                         <div className="p-4 rounded-2xl shadow-2xl bg-white">
// // //                           <QRCode value={depositResult.payAddress} size={180} level="H" />
// // //                         </div>
// // //                       </div>
// // //                       <p className={`text-center text-sm mt-3 ${isDark ? 'text-gray-500' : 'text-gray-600'}`}>Scan to send {depositResult.payCurrency}</p>
// // //                     </>
// // //                   )}

// // //                   {/* Receipt Upload Section */}
// // //                   <div className="mt-8">
// // //                     <h4 className={`text-md font-semibold mb-3 ${isDark ? 'text-orange-300' : 'text-orange-700'}`}>Upload Payment Receipt</h4>
// // //                     <p className={`text-sm mb-4 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>After sending funds, upload your transaction receipt for verification.</p>
// // //                     <input
// // //                       type="file"
// // //                       accept="image/*,.pdf"
// // //                       onChange={(e) => setReceiptFile(e.target.files?.[0] || null)}
// // //                       className={`block w-full text-sm text-gray-500 file:mr-4 file:py-3 file:px-5 file:rounded-xl file:border-0 file:text-sm file:font-semibold ${isDark ? 'file:bg-orange-900/50 file:text-orange-300 hover:file:bg-orange-900/70' : 'file:bg-orange-50 file:text-orange-700 hover:file:bg-orange-100'}`}
// // //                       disabled={uploadingReceipt || depositResult.status !== 'pending'}
// // //                     />
// // //                     <button
// // //                       onClick={handleUploadReceipt}
// // //                       disabled={!receiptFile || uploadingReceipt || depositResult.status !== 'pending'}
// // //                       className={`w-full mt-4 py-4 px-6 font-semibold rounded-xl transition transform hover:scale-[1.02] shadow-lg ${isDark ? 'bg-gradient-to-r from-green-600 to-green-500 hover:from-green-500 hover:to-green-400 text-white' : 'bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white'} ${uploadingReceipt ? 'opacity-60 cursor-not-allowed' : ''}`}
// // //                     >
// // //                       {uploadingReceipt ? 'Uploading...' : 'Upload Receipt & Submit'}
// // //                     </button>
// // //                   </div>
// // //                 </div>
// // //               </motion.div>
// // //             )}
// // //           </AnimatePresence>
// // //         </motion.div>

// // //         {/* Deposit History */}
// // //         <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }} className={`rounded-3xl border p-8 ${isDark ? 'bg-black/40 backdrop-blur-xl border-orange-600/30' : 'bg-white border-gray-200 shadow-xl'}`}>
// // //           <h2 className={`text-2xl font-semibold mb-6 ${isDark ? 'text-orange-300' : 'text-orange-700'}`}>Deposit History</h2>

// // //           {historyLoading ? (
// // //             <p className={`${isDark ? 'text-gray-400' : 'text-gray-500'} text-center py-8`}>Loading...</p>
// // //           ) : history.length === 0 ? (
// // //             <p className={`${isDark ? 'text-gray-400' : 'text-gray-500'} text-center py-8`}>No deposits yet.</p>
// // //           ) : (
// // //             <div className="space-y-4">
// // //               {history.map((dep) => (
// // //                 <div key={dep._id || dep.paymentId} className={`p-5 rounded-xl border flex justify-between items-center ${isDark ? 'bg-slate-900/60 border-orange-800/30' : 'bg-gray-50 border-gray-200'}`}>
// // //                   <div>
// // //                     <p className={`font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>{dep.payAmount || dep.amount} USDT</p>
// // //                     <p className={`${isDark ? 'text-gray-400' : 'text-gray-500'} text-sm`}>{dep.payAddress ? shorten(dep.payAddress) : '—'}</p>
// // //                   </div>
// // //                   <div className="text-right">
// // //                     <p className={`font-semibold ${dep.status === 'completed' || dep.status === 'confirmed' ? (isDark ? 'text-orange-400' : 'text-green-600') : dep.status === 'pending' ? 'text-amber-400' : 'text-red-500'}`}>{dep.status?.toUpperCase() || 'PENDING'}</p>
// // //                     <p className={`${isDark ? 'text-gray-500' : 'text-gray-600'} text-xs`}>{dep.createdAt ? new Date(dep.createdAt).toLocaleString() : '—'}</p>
// // //                   </div>
// // //                 </div>
// // //               ))}
// // //             </div>
// // //           )}
// // //         </motion.div>
// // //       </div>
// // //     </div>
// // //   );
// // // }



// // // Deposit.jsx - Updated with Pagination & Improved Status Feedback
// // import React, { useState, useEffect } from 'react';
// // import { motion, AnimatePresence } from 'framer-motion';
// // import { 
// //   WalletIcon, 
// //   DocumentDuplicateIcon, 
// //   CheckCircleIcon, 
// //   ClockIcon, 
// //   ArrowUpTrayIcon,
// //   ChevronLeftIcon,
// //   ChevronRightIcon
// // } from '@heroicons/react/24/solid';
// // import QRCode from 'react-qr-code';
// // import confetti from 'canvas-confetti';

// // import { 
// //   createDeposit, 
// //   getDepositHistory, 
// //   checkDepositStatus, 
// //   uploadReceipt 
// // } from '../../api/depositapi';
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
// //   const [pollingInterval, setPollingInterval] = useState(null);
// //   const [receiptFile, setReceiptFile] = useState(null);
// //   const [selectedFileName, setSelectedFileName] = useState('');
// //   const [uploadingReceipt, setUploadingReceipt] = useState(false);
// //   const [showSuccessPopup, setShowSuccessPopup] = useState(false);

// //   // Pagination states
// //   const [currentPage, setCurrentPage] = useState(1);
// //   const itemsPerPage = 5; // Adjust as needed

// //   useEffect(() => {
// //     loadHistory();
// //     const historyRefresh = setInterval(loadHistory, 30000);
// //     return () => clearInterval(historyRefresh);
// //   }, []);

// //   useEffect(() => {
// //     if (showSuccessPopup) {
// //       const timer = setTimeout(() => setShowSuccessPopup(false), 6000);
// //       return () => clearTimeout(timer);
// //     }
// //   }, [showSuccessPopup]);

// //   const loadHistory = async () => {
// //     try {
// //       setHistoryLoading(true);
// //       const res = await getDepositHistory();
// //       if (res.success && Array.isArray(res.data)) {
// //         setHistory(res.data);
// //       } else {
// //         setHistory([]);
// //         setError('Invalid history data format');
// //       }
// //     } catch (err) {
// //       console.error('Failed to load deposit history:', err);
// //       setHistory([]);
// //       setError('Failed to load history. Please try again.');
// //     } finally {
// //       setHistoryLoading(false);
// //     }
// //   };

// //   const handleCreateDeposit = async (e) => {
// //     e.preventDefault();
// //     const numAmount = parseFloat(amount);
    
// //     if (isNaN(numAmount) || numAmount < 50) {
// //       setError('Minimum deposit amount is $50 USDT');
// //       return;
// //     }

// //     setError('');
// //     setMessage('');
// //     setDepositLoading(true);
// //     setDepositResult(null);
// //     setReceiptFile(null);
// //     setSelectedFileName('');
// //     setCurrentPage(1); // Reset pagination on new deposit

// //     try {
// //       const res = await createDeposit(numAmount);
// //       const data = res.data || res;
// //       if (!data || !data.paymentId) {
// //         throw new Error('Invalid deposit response - missing paymentId');
// //       }
// //       setDepositResult(data);
// //       setMessage('Deposit request created successfully! Please send funds and upload receipt.');
// //       setAmount('');
// //       loadHistory();
// //       startPolling(data.paymentId);
// //     } catch (err) {
// //       console.error('Deposit creation error:', err);
// //       setError(err.response?.data?.message || 'Failed to create deposit request.');
// //     } finally {
// //       setDepositLoading(false);
// //     }
// //   };

// //   const startPolling = (paymentId) => {
// //     if (pollingInterval) clearInterval(pollingInterval);

// //     const interval = setInterval(async () => {
// //       try {
// //         const res = await checkDepositStatus(paymentId);
// //         const status = res.data?.status || 'pending';
// //         setDepositResult((prev) => prev ? { ...prev, status } : null);

// //         const updatedHistory = history.map((dep) =>
// //           dep.paymentId === paymentId ? { ...dep, status } : dep
// //         );
// //         setHistory(updatedHistory);

// //         if (['completed', 'confirmed', 'verified', 'rejected'].includes(status)) {
// //           clearInterval(interval);
// //           setPollingInterval(null);
// //           setMessage(
// //             status === 'rejected' 
// //               ? 'Your deposit was rejected by our team.' 
// //               : 'Payment confirmed! Funds added to your balance.'
// //           );
// //           loadHistory();
// //         }
// //       } catch (err) {
// //         console.warn('Polling error:', err);
// //       }
// //     }, 8000);

// //     setPollingInterval(interval);
// //   };

// //   const handleUploadReceipt = async () => {
// //     if (!depositResult) {
// //       setError('No active deposit request found');
// //       return;
// //     }

// //     if (!receiptFile) {
// //       setError('Please select a receipt file first');
// //       return;
// //     }

// //     setUploadingReceipt(true);
// //     setError('');
// //     setMessage('');

// //     try {
// //       const depositId = depositResult.depositId || depositResult.paymentId || depositResult.id;
// //       if (!depositId) {
// //         throw new Error('Missing deposit/payment ID');
// //       }

// //       const res = await uploadReceipt(depositId, receiptFile);

// //       if (res?.success) {
// //         setMessage('Receipt submitted successfully! Awaiting admin verification (usually within 24 hours).');
// //         setReceiptFile(null);
// //         setSelectedFileName('');
// //         setShowSuccessPopup(true);

// //         if (pollingInterval) {
// //           clearInterval(pollingInterval);
// //           setPollingInterval(null);
// //         }

// //         confetti({
// //           particleCount: 120,
// //           spread: 70,
// //           origin: { y: 0.6 },
// //           colors: ['#f97316', '#fb923c', '#fed7aa', '#ffffff'],
// //           ticks: 300,
// //         });

// //         setTimeout(() => {
// //           confetti({
// //             particleCount: 80,
// //             angle: 60,
// //             spread: 55,
// //             origin: { x: 0.2, y: 0.6 },
// //           });
// //           confetti({
// //             particleCount: 80,
// //             angle: 120,
// //             spread: 55,
// //             origin: { x: 0.8, y: 0.6 },
// //           });
// //         }, 200);

// //         loadHistory();
// //       } else {
// //         throw new Error(res?.message || 'Upload did not complete successfully');
// //       }
// //     } catch (err) {
// //       console.error('Receipt upload error:', err);
// //       const errorMessage = err.message || err.response?.data?.message || 'Failed to upload receipt. Please try again.';
// //       setError(errorMessage);
// //     } finally {
// //       setUploadingReceipt(false);
// //     }
// //   };

// //   const handleFileChange = (e) => {
// //     const file = e.target.files?.[0];
// //     if (file) {
// //       setReceiptFile(file);
// //       setSelectedFileName(file.name);
// //     } else {
// //       setReceiptFile(null);
// //       setSelectedFileName('');
// //     }
// //   };

// //   const copyToClipboard = (text) => {
// //     if (!text) return;
// //     navigator.clipboard.writeText(text);
// //     setCopied(true);
// //     setTimeout(() => setCopied(false), 2200);
// //   };

// //   const shorten = (str) => (str ? `${str.slice(0, 8)}...${str.slice(-6)}` : '');

// //   const hasActivePendingDeposit = depositResult && depositResult.status === 'pending';

// //   // Pagination logic
// //   const indexOfLastItem = currentPage * itemsPerPage;
// //   const indexOfFirstItem = indexOfLastItem - itemsPerPage;
// //   const currentItems = history.slice(indexOfFirstItem, indexOfLastItem);
// //   const totalPages = Math.ceil(history.length / itemsPerPage);

// //   const paginate = (pageNumber) => setCurrentPage(pageNumber);
// //   const prevPage = () => setCurrentPage((prev) => Math.max(prev - 1, 1));
// //   const nextPage = () => setCurrentPage((prev) => Math.min(prev + 1, totalPages));

// //   const getStatusColor = (status) => {
// //     switch (status?.toLowerCase()) {
// //       case 'completed':
// //       case 'confirmed':
// //       case 'verified':
// //         return isDark ? 'text-orange-400' : 'text-green-600';
// //       case 'pending':
// //         return 'text-amber-400';
// //       case 'rejected':
// //         return 'text-red-500';
// //       case 'receipt_uploaded':
// //       case 'awaiting_verification':
// //         return isDark ? 'text-blue-400' : 'text-blue-600';
// //       default:
// //         return isDark ? 'text-gray-400' : 'text-gray-600';
// //     }
// //   };

// //   const getStatusText = (status) => {
// //     switch (status?.toLowerCase()) {
// //       case 'receipt_uploaded':
// //       case 'awaiting_verification':
// //         return 'Awaiting Verification';
// //       default:
// //         return status ? status.charAt(0).toUpperCase() + status.slice(1) : 'Pending';
// //     }
// //   };

// //   return (
// //     <div className={`min-h-screen p-6 transition-colors duration-300 ${isDark ? 'bg-slate-950 text-white' : 'bg-gray-50 text-gray-900'}`}>
// //       <div className="max-w-3xl mx-auto space-y-10">
// //         {/* Deposit Form - unchanged except minor text tweaks */}
// //         <motion.div 
// //           initial={{ opacity: 0, y: 20 }} 
// //           animate={{ opacity: 1, y: 0 }} 
// //           className={`rounded-3xl border p-8 shadow-2xl backdrop-blur-xl ${isDark ? 'bg-black/40 border-orange-600/30' : 'bg-white border-gray-200 shadow-xl'}`}
// //         >
// //           {/* ... (form content remains the same as previous version) ... */}
// //           {/* Just showing the key parts for brevity */}
// //           <form onSubmit={handleCreateDeposit} className="space-y-6">
// //             {/* Amount input with min=50 */}
// //             {/* Create button */}
// //           </form>

// //           {error && <p className="mt-4 text-red-500 dark:text-red-400 text-center font-medium">{error}</p>}
// //           {message && <p className="mt-4 text-green-500 dark:text-orange-300 text-center font-medium">{message}</p>}

// //           {/* Payment Details + Receipt Upload section remains the same */}
// //         </motion.div>

// //         {/* Deposit History with Pagination */}
// //         <motion.div 
// //           initial={{ opacity: 0 }} 
// //           animate={{ opacity: 1 }} 
// //           transition={{ delay: 0.2 }} 
// //           className={`rounded-3xl border p-8 ${isDark ? 'bg-black/40 backdrop-blur-xl border-orange-600/30' : 'bg-white border-gray-200 shadow-xl'}`}
// //         >
// //           <h2 className={`text-2xl font-semibold mb-6 ${isDark ? 'text-orange-300' : 'text-orange-700'}`}>
// //             Deposit History
// //           </h2>

// //           {historyLoading ? (
// //             <p className={`${isDark ? 'text-gray-400' : 'text-gray-500'} text-center py-8`}>Loading...</p>
// //           ) : history.length === 0 ? (
// //             <p className={`${isDark ? 'text-gray-400' : 'text-gray-500'} text-center py-8`}>No deposits yet.</p>
// //           ) : (
// //             <>
// //               <div className="space-y-4">
// //                 {currentItems.map((dep) => (
// //                   <div 
// //                     key={dep._id || dep.paymentId} 
// //                     className={`p-5 rounded-xl border flex justify-between items-center ${isDark ? 'bg-slate-900/60 border-orange-800/30' : 'bg-gray-50 border-gray-200'}`}
// //                   >
// //                     <div>
// //                       <p className={`font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>
// //                         {dep.payAmount || dep.amount} USDT
// //                       </p>
// //                       <p className={`${isDark ? 'text-gray-400' : 'text-gray-500'} text-sm`}>
// //                         {dep.payAddress ? shorten(dep.payAddress) : '—'}
// //                       </p>
// //                     </div>
// //                     <div className="text-right">
// //                       <p className={`font-semibold ${getStatusColor(dep.status)}`}>
// //                         {getStatusText(dep.status)}
// //                       </p>
// //                       <p className={`${isDark ? 'text-gray-500' : 'text-gray-600'} text-xs`}>
// //                         {dep.createdAt ? new Date(dep.createdAt).toLocaleString() : '—'}
// //                       </p>
// //                     </div>
// //                   </div>
// //                 ))}
// //               </div>

// //               {/* Pagination Controls */}
// //               {totalPages > 1 && (
// //                 <div className="flex justify-center items-center mt-8">
// //                   <div className="join">
// //                     <button
// //                       className={`join-item btn btn-sm ${isDark ? 'btn-neutral' : 'btn-outline'} ${currentPage === 1 ? 'btn-disabled' : ''}`}
// //                       onClick={prevPage}
// //                       disabled={currentPage === 1}
// //                     >
// //                       <ChevronLeftIcon className="w-5 h-5" />
// //                     </button>

// //                     {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
// //                       <button
// //                         key={page}
// //                         className={`join-item btn btn-sm ${currentPage === page ? (isDark ? 'btn-primary' : 'btn-active') : isDark ? 'btn-neutral' : 'btn-outline'}`}
// //                         onClick={() => paginate(page)}
// //                       >
// //                         {page}
// //                       </button>
// //                     ))}

// //                     <button
// //                       className={`join-item btn btn-sm ${isDark ? 'btn-neutral' : 'btn-outline'} ${currentPage === totalPages ? 'btn-disabled' : ''}`}
// //                       onClick={nextPage}
// //                       disabled={currentPage === totalPages}
// //                     >
// //                       <ChevronRightIcon className="w-5 h-5" />
// //                     </button>
// //                   </div>
// //                 </div>
// //               )}
// //             </>
// //           )}
// //         </motion.div>

// //         {/* Success Popup - updated text for clarity */}
// //         <AnimatePresence>
// //           {showSuccessPopup && (
// //             <motion.div
// //               initial={{ opacity: 0 }}
// //               animate={{ opacity: 1 }}
// //               exit={{ opacity: 0 }}
// //               className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4"
// //               onClick={() => setShowSuccessPopup(false)}
// //             >
// //               <motion.div
// //                 initial={{ scale: 0.7, opacity: 0, y: 40 }}
// //                 animate={{ scale: 1, opacity: 1, y: 0 }}
// //                 exit={{ scale: 0.7, opacity: 0, y: 40 }}
// //                 className={`relative max-w-md w-full rounded-3xl p-8 shadow-2xl border text-center ${
// //                   isDark ? 'bg-gradient-to-b from-slate-900 to-slate-800 border-orange-600/40' : 'bg-white border-orange-200 shadow-orange-100/50'
// //                 }`}
// //                 onClick={(e) => e.stopPropagation()}
// //               >
// //                 <div className="mb-6 text-7xl">🎉</div>

// //                 <h2 className={`text-3xl font-bold mb-3 ${isDark ? 'text-orange-400' : 'text-orange-600'}`}>
// //                   Receipt Submitted!
// //                 </h2>

// //                 <p className={`text-lg mb-8 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
// //                   Your payment proof has been uploaded successfully.<br />
// //                   Our team will verify it shortly (typically within 24 hours).<br />
// //                   You'll receive a notification once processed.
// //                 </p>

// //                 <button
// //                   onClick={() => setShowSuccessPopup(false)}
// //                   className={`px-8 py-4 rounded-xl font-semibold text-lg transition transform hover:scale-105 shadow-lg ${
// //                     isDark ? 'bg-gradient-to-r from-orange-600 to-orange-500 hover:from-orange-500 hover:to-orange-400 text-white' : 'bg-gradient-to-r from-orange-600 to-orange-700 hover:from-orange-700 hover:to-orange-800 text-white'
// //                   }`}
// //                 >
// //                   Got It!
// //                 </button>

// //                 <button
// //                   onClick={() => setShowSuccessPopup(false)}
// //                   className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 text-xl"
// //                 >
// //                   ×
// //                 </button>
// //               </motion.div>
// //             </motion.div>
// //           )}
// //         </AnimatePresence>
// //       </div>
// //     </div>
// //   );
// // // 




// // Deposit.jsx - FULL UPDATED VERSION
// import React, { useState, useEffect } from 'react';
// import { motion, AnimatePresence } from 'framer-motion';
// import { 
//   WalletIcon, 
//   DocumentDuplicateIcon, 
//   CheckCircleIcon, 
//   ClockIcon, 
//   ArrowUpTrayIcon 
// } from '@heroicons/react/24/solid';
// import QRCode from 'react-qr-code';
// import confetti from 'canvas-confetti';

// import { 
//   createDeposit, 
//   getDepositHistory, 
//   checkDepositStatus, 
//   uploadReceipt 
// } from '../../api/depositapi';
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
//   const [selectedFileName, setSelectedFileName] = useState('');
//   const [uploadingReceipt, setUploadingReceipt] = useState(false);
//   const [showSuccessPopup, setShowSuccessPopup] = useState(false);

//   useEffect(() => {
//     loadHistory();
//     const historyRefresh = setInterval(loadHistory, 30000);
//     return () => clearInterval(historyRefresh);
//   }, []);

//   useEffect(() => {
//     if (showSuccessPopup) {
//       const timer = setTimeout(() => setShowSuccessPopup(false), 5000);
//       return () => clearTimeout(timer);
//     }
//   }, [showSuccessPopup]);

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

//   const handleCreateDeposit = async (e) => {
//     e.preventDefault();
//     const numAmount = parseFloat(amount);
    
//     if (isNaN(numAmount) || numAmount < 50) {
//       setError('Minimum deposit amount is $50 USDT');
//       return;
//     }

//     setError('');
//     setMessage('');
//     setDepositLoading(true);
//     setDepositResult(null);
//     setReceiptFile(null);
//     setSelectedFileName('');

//     try {
//       const res = await createDeposit(numAmount);
//       const data = res.data || res;
//       if (!data || !data.paymentId) {
//         throw new Error('Invalid deposit response - missing paymentId');
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

//   const startPolling = (paymentId) => {
//     if (pollingInterval) clearInterval(pollingInterval);

//     const interval = setInterval(async () => {
//       try {
//         const res = await checkDepositStatus(paymentId);
//         const status = res.data?.status || 'pending';
//         setDepositResult((prev) => prev ? { ...prev, status } : null);

//         const updatedHistory = history.map((dep) =>
//           dep.paymentId === paymentId ? { ...dep, status } : dep
//         );
//         setHistory(updatedHistory);

//         if (status === 'completed' || status === 'confirmed' || status === 'rejected' || status === 'verified') {
//           clearInterval(interval);
//           setPollingInterval(null);
//           setMessage(
//             status === 'rejected' 
//               ? 'Deposit rejected by admin.' 
//               : status === 'completed' || status === 'confirmed' || status === 'verified'
//               ? 'Deposit confirmed! Balance updated.'
//               : 'Deposit processed.'
//           );
//           loadHistory();
//         }
//       } catch (err) {
//         console.warn('Polling error:', err);
//       }
//     }, 8000);

//     setPollingInterval(interval);
//   };

//   const handleUploadReceipt = async () => {
//     if (!depositResult) {
//       setError('No active deposit request found');
//       return;
//     }

//     if (!receiptFile) {
//       setError('Please select a receipt file first');
//       return;
//     }

//     setUploadingReceipt(true);
//     setError('');
//     setMessage('');

//     try {
//       const depositId = depositResult.depositId || depositResult.paymentId || depositResult.id;
//       if (!depositId) {
//         throw new Error('Missing deposit/payment ID');
//       }

//       const res = await uploadReceipt(depositId, receiptFile);

//       if (res?.success) {
//         setMessage('Receipt uploaded successfully! Awaiting admin verification.');
//         setReceiptFile(null);
//         setSelectedFileName('');
//         setShowSuccessPopup(true);

//         // Stop polling after upload
//         if (pollingInterval) {
//           clearInterval(pollingInterval);
//           setPollingInterval(null);
//         }

//         confetti({
//           particleCount: 120,
//           spread: 70,
//           origin: { y: 0.6 },
//           colors: ['#f97316', '#fb923c', '#fed7aa', '#ffffff'],
//           ticks: 300,
//         });

//         setTimeout(() => {
//           confetti({
//             particleCount: 80,
//             angle: 60,
//             spread: 55,
//             origin: { x: 0.2, y: 0.6 },
//           });
//           confetti({
//             particleCount: 80,
//             angle: 120,
//             spread: 55,
//             origin: { x: 0.8, y: 0.6 },
//           });
//         }, 200);

//         loadHistory();
//       } else {
//         throw new Error(res?.message || 'Upload did not complete successfully');
//       }
//     } catch (err) {
//       console.error('Receipt upload error:', err);
//       const errorMessage = err.message || err.response?.data?.message || 'Failed to upload receipt. Please try again.';
//       setError(errorMessage);
//     } finally {
//       setUploadingReceipt(false);
//     }
//   };

//   const handleFileChange = (e) => {
//     const file = e.target.files?.[0];
//     if (file) {
//       setReceiptFile(file);
//       setSelectedFileName(file.name);
//     } else {
//       setReceiptFile(null);
//       setSelectedFileName('');
//     }
//   };

//   const copyToClipboard = (text) => {
//     if (!text) return;
//     navigator.clipboard.writeText(text);
//     setCopied(true);
//     setTimeout(() => setCopied(false), 2200);
//   };

//   const shorten = (str) => (str ? `${str.slice(0, 8)}...${str.slice(-6)}` : '');

//   const hasActivePendingDeposit = depositResult && depositResult.status === 'pending';

//   return (
//     <div className={`min-h-screen p-6 transition-colors duration-300 ${isDark ? 'bg-slate-950 text-white' : 'bg-gray-50 text-gray-900'}`}>
//       <div className="max-w-3xl mx-auto space-y-10">
//         {/* Deposit Form */}
//         <motion.div 
//           initial={{ opacity: 0, y: 20 }} 
//           animate={{ opacity: 1, y: 0 }} 
//           className={`rounded-3xl border p-8 shadow-2xl backdrop-blur-xl ${isDark ? 'bg-black/40 border-orange-600/30' : 'bg-white border-gray-200 shadow-xl'}`}
//         >
//           <div className="text-center mb-8">
//             <WalletIcon className={`w-16 h-16 mx-auto mb-4 ${isDark ? 'text-orange-400' : 'text-orange-600'}`} />
//             <h1 className={`text-4xl font-bold bg-gradient-to-r bg-clip-text text-transparent ${isDark ? 'from-orange-400 to-orange-500' : 'from-orange-600 to-orange-700'}`}>
//               Deposit Funds
//             </h1>
//             <p className={`${isDark ? 'text-gray-400' : 'text-gray-500'} mt-2`}>USDT (BSC)</p>
//           </div>

//           <form onSubmit={handleCreateDeposit} className="space-y-6">
//             <div>
//               <label className={`block text-sm font-medium mb-2 ${isDark ? 'text-orange-300/90' : 'text-orange-700'}`}>
//                 Amount (USDT)
//               </label>
//               <input
//                 type="number"
//                 step="0.01"
//                 min="50"
//                 value={amount}
//                 onChange={(e) => setAmount(e.target.value)}
//                 placeholder="50.00 minimum"
//                 className={`w-full px-5 py-4 rounded-xl placeholder-gray-500 border focus:outline-none focus:ring-2 transition ${isDark ? 'bg-slate-900 border-orange-700/40 text-white focus:border-orange-500 focus:ring-orange-500/30' : 'bg-white border-gray-300 text-gray-900 focus:border-orange-500 focus:ring-orange-400/30'}`}
//                 disabled={depositLoading || hasActivePendingDeposit}
//                 required
//               />
//               <p className={`mt-2 text-sm ${parseFloat(amount) > 0 && parseFloat(amount) < 50 ? 'text-red-500 font-medium' : isDark ? 'text-gray-400' : 'text-gray-600'}`}>
//                 Minimum deposit amount: <strong>$50</strong>
//               </p>
//             </div>

//             <button 
//               type="submit" 
//               disabled={depositLoading || hasActivePendingDeposit || !amount || parseFloat(amount) < 50}
//               className={`w-full py-4 px-6 font-semibold rounded-xl transition transform hover:scale-[1.02] shadow-lg ${isDark ? 'bg-gradient-to-r from-orange-600 to-orange-500 hover:from-orange-500 hover:to-orange-400 text-white' : 'bg-gradient-to-r from-orange-600 to-orange-700 hover:from-orange-700 hover:to-orange-800 text-white'} ${depositLoading || hasActivePendingDeposit ? 'opacity-60 cursor-not-allowed' : ''}`}
//             >
//               {depositLoading ? 'Creating...' : hasActivePendingDeposit ? 'Request Already Created' : 'Create Deposit Request'}
//             </button>
//           </form>

//           {error && <p className="mt-4 text-red-500 dark:text-red-400 text-center font-medium">{error}</p>}
//           {message && <p className="mt-4 text-green-500 dark:text-orange-300 text-center font-medium">{message}</p>}

//           {/* Payment Details + Receipt Upload */}
//           <AnimatePresence>
//             {depositResult && (
//               <motion.div 
//                 initial={{ opacity: 0, height: 0 }} 
//                 animate={{ opacity: 1, height: 'auto' }} 
//                 exit={{ opacity: 0, height: 0 }} 
//                 className="mt-8 overflow-hidden"
//               >
//                 <div className={`p-6 rounded-2xl border ${isDark ? 'bg-slate-900/70 border-orange-600/30' : 'bg-gray-50 border-gray-200 shadow-inner'}`}>
//                   <div className="flex justify-between items-center mb-4">
//                     <h3 className={`text-lg font-semibold ${isDark ? 'text-orange-300' : 'text-orange-700'}`}>
//                       Payment Details
//                     </h3>
//                     <div className="flex items-center gap-2">
//                       {pollingInterval && <ClockIcon className="w-5 h-5 text-amber-400 animate-pulse" />}
//                       <span className={`text-sm font-medium ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
//                         {depositResult.status?.toUpperCase() || 'PENDING'}
//                       </span>
//                     </div>
//                   </div>

//                   {depositResult.payAddress && (
//                     <>
//                       <p className={`text-sm mb-2 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
//                         Send {depositResult.payCurrency || 'USDT'} to address:
//                       </p>
//                       <div className={`flex items-center gap-3 p-4 rounded-xl border ${isDark ? 'bg-black/40 border-orange-800/30' : 'bg-white border-gray-200 shadow-sm'}`}>
//                         <p className={`font-mono break-all flex-1 ${isDark ? 'text-orange-300' : 'text-orange-700'}`}>
//                           {shorten(depositResult.payAddress)}
//                         </p>
//                         <button 
//                           onClick={() => copyToClipboard(depositResult.payAddress)} 
//                           className="p-2 hover:bg-black/10 dark:hover:bg-white/10 rounded-lg transition"
//                         >
//                           {copied ? (
//                             <CheckCircleIcon className={`w-6 h-6 ${isDark ? 'text-orange-400' : 'text-green-600'}`} />
//                           ) : (
//                             <DocumentDuplicateIcon className={`w-6 h-6 ${isDark ? 'text-gray-300' : 'text-gray-600'}`} />
//                           )}
//                         </button>
//                       </div>

//                       <div className="mt-6 flex justify-center">
//                         <div className="p-4 rounded-2xl shadow-2xl bg-white">
//                           <QRCode value={depositResult.payAddress} size={180} level="H" />
//                         </div>
//                       </div>
//                       <p className={`text-center text-sm mt-3 ${isDark ? 'text-gray-500' : 'text-gray-600'}`}>
//                         Scan to send {depositResult.payCurrency || 'USDT'}
//                       </p>
//                     </>
//                   )}

//                   {/* Receipt Upload Section */}
//                   <div className="mt-8">
//                     <h4 className={`text-md font-semibold mb-3 ${isDark ? 'text-orange-300' : 'text-orange-700'}`}>
//                       Upload Payment Receipt
//                     </h4>
//                     <p className={`text-sm mb-4 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
//                       After sending funds, upload your transaction receipt / proof of payment.
//                     </p>
//                     <input
//                       type="file"
//                       accept="image/*,.pdf"
//                       onChange={handleFileChange}
//                       className={`block w-full text-sm text-gray-500 file:mr-4 file:py-3 file:px-5 file:rounded-xl file:border-0 file:text-sm file:font-semibold ${isDark ? 'file:bg-orange-900/50 file:text-orange-300 hover:file:bg-orange-900/70' : 'file:bg-orange-50 file:text-orange-700 hover:file:bg-orange-100'}`}
//                       disabled={uploadingReceipt || depositResult.status !== 'pending'}
//                     />
//                     {selectedFileName && (
//                       <p className={`mt-2 text-sm truncate ${isDark ? 'text-orange-300' : 'text-orange-700'}`}>
//                         Selected: {selectedFileName}
//                       </p>
//                     )}
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
//         <motion.div 
//           initial={{ opacity: 0 }} 
//           animate={{ opacity: 1 }} 
//           transition={{ delay: 0.2 }} 
//           className={`rounded-3xl border p-8 ${isDark ? 'bg-black/40 backdrop-blur-xl border-orange-600/30' : 'bg-white border-gray-200 shadow-xl'}`}
//         >
//           <h2 className={`text-2xl font-semibold mb-6 ${isDark ? 'text-orange-300' : 'text-orange-700'}`}>
//             Deposit History
//           </h2>

//           {historyLoading ? (
//             <p className={`${isDark ? 'text-gray-400' : 'text-gray-500'} text-center py-8`}>Loading...</p>
//           ) : history.length === 0 ? (
//             <p className={`${isDark ? 'text-gray-400' : 'text-gray-500'} text-center py-8`}>No deposits yet.</p>
//           ) : (
//             <div className="space-y-4">
//               {history.map((dep) => (
//                 <div 
//                   key={dep._id || dep.paymentId} 
//                   className={`p-5 rounded-xl border flex justify-between items-center ${isDark ? 'bg-slate-900/60 border-orange-800/30' : 'bg-gray-50 border-gray-200'}`}
//                 >
//                   <div>
//                     <p className={`font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>
//                       {dep.payAmount || dep.amount} USDT
//                     </p>
//                     <p className={`${isDark ? 'text-gray-400' : 'text-gray-500'} text-sm`}>
//                       {dep.payAddress ? shorten(dep.payAddress) : '—'}
//                     </p>
//                   </div>
//                   <div className="text-right">
//                     <p className={`font-semibold ${dep.status === 'completed' || dep.status === 'confirmed' || dep.status === 'verified' ? (isDark ? 'text-orange-400' : 'text-green-600') : dep.status === 'pending' ? 'text-amber-400' : 'text-red-500'}`}>
//                       {dep.status?.toUpperCase() || 'PENDING'}
//                     </p>
//                     <p className={`${isDark ? 'text-gray-500' : 'text-gray-600'} text-xs`}>
//                       {dep.createdAt ? new Date(dep.createdAt).toLocaleString() : '—'}
//                     </p>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           )}
//         </motion.div>

//         {/* Success Popup */}
//         <AnimatePresence>
//           {showSuccessPopup && (
//             <motion.div
//               initial={{ opacity: 0 }}
//               animate={{ opacity: 1 }}
//               exit={{ opacity: 0 }}
//               className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4"
//               onClick={() => setShowSuccessPopup(false)}
//             >
//               <motion.div
//                 initial={{ scale: 0.7, opacity: 0, y: 40 }}
//                 animate={{ scale: 1, opacity: 1, y: 0 }}
//                 exit={{ scale: 0.7, opacity: 0, y: 40 }}
//                 transition={{ type: 'spring', stiffness: 300, damping: 25 }}
//                 className={`relative max-w-md w-full rounded-3xl p-8 shadow-2xl border text-center ${
//                   isDark
//                     ? 'bg-gradient-to-b from-slate-900 to-slate-800 border-orange-600/40'
//                     : 'bg-white border-orange-200 shadow-orange-100/50'
//                 }`}
//                 onClick={(e) => e.stopPropagation()}
//               >
//                 <div className="mb-6">
//                   <motion.div
//                     initial={{ scale: 0 }}
//                     animate={{ scale: 1, rotate: [0, 15, -10, 5, 0] }}
//                     transition={{ delay: 0.3, type: 'spring', stiffness: 400 }}
//                     className="inline-block text-7xl"
//                   >
//                     🎉
//                   </motion.div>
//                 </div>

//                 <h2 className={`text-3xl font-bold mb-3 ${isDark ? 'text-orange-400' : 'text-orange-600'}`}>
//                   Congratulations Victor!
//                 </h2>

//                 <p className={`text-lg mb-8 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
//                   Your receipt has been successfully uploaded.<br />
//                   Our team will review it shortly — you're almost there!
//                 </p>

//                 <button
//                   onClick={() => setShowSuccessPopup(false)}
//                   className={`px-8 py-4 rounded-xl font-semibold text-lg transition transform hover:scale-105 shadow-lg ${
//                     isDark
//                       ? 'bg-gradient-to-r from-orange-600 to-orange-500 hover:from-orange-500 hover:to-orange-400 text-white'
//                       : 'bg-gradient-to-r from-orange-600 to-orange-700 hover:from-orange-700 hover:to-orange-800 text-white'
//                   }`}
//                 >
//                   Awesome!
//                 </button>

//                 <button
//                   onClick={() => setShowSuccessPopup(false)}
//                   className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 text-xl"
//                 >
//                   ×
//                 </button>
//               </motion.div>
//             </motion.div>
//           )}
//         </AnimatePresence>
//       </div>
//     </div>
//   );
// }



// Deposit.jsx - FULL VERSION WITH PAGINATION
// import React, { useState, useEffect } from 'react';
// import { motion, AnimatePresence } from 'framer-motion';
// import { 
//   WalletIcon, 
//   DocumentDuplicateIcon, 
//   CheckCircleIcon, 
//   ClockIcon, 
//   ChevronLeftIcon,
//   ChevronRightIcon 
// } from '@heroicons/react/24/solid';
// import QRCode from 'react-qr-code';
// import confetti from 'canvas-confetti';

// import { 
//   createDeposit, 
//   getDepositHistory, 
//   checkDepositStatus, 
//   uploadReceipt 
// } from '../../api/depositapi';
// import { useTheme } from '../ui/ThemeContext';

// export default function Deposit() {
//   const { theme } = useTheme();
//   const isDark = theme === 'dark';

//   // ── State ────────────────────────────────────────────────────
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
//   const [selectedFileName, setSelectedFileName] = useState('');
//   const [uploadingReceipt, setUploadingReceipt] = useState(false);
//   const [showSuccessPopup, setShowSuccessPopup] = useState(false);

//   // Pagination state
//   const [currentPage, setCurrentPage] = useState(1);
//   const itemsPerPage = 5;

//   // ── Utility Functions ────────────────────────────────────────
//   const shorten = (str) => 
//     str ? `${str.slice(0, 8)}...${str.slice(-6)}` : '';

//   const copyToClipboard = (text) => {
//     if (!text) return;
//     navigator.clipboard.writeText(text);
//     setCopied(true);
//     setTimeout(() => setCopied(false), 2200);
//   };

//   // ── Effects ──────────────────────────────────────────────────
//   useEffect(() => {
//     loadHistory();
//     const historyRefresh = setInterval(loadHistory, 30000);
//     return () => clearInterval(historyRefresh);
//   }, []);

//   useEffect(() => {
//     if (showSuccessPopup) {
//       const timer = setTimeout(() => setShowSuccessPopup(false), 5000);
//       return () => clearTimeout(timer);
//     }
//   }, [showSuccessPopup]);

//   // Reset to first page when number of items changes significantly
//   useEffect(() => {
//     setCurrentPage(1);
//   }, [history.length]);

//   // ── Data Loading ─────────────────────────────────────────────
//   const loadHistory = async () => {
//     try {
//       setHistoryLoading(true);
//       const res = await getDepositHistory();
//       if (res.success && Array.isArray(res.data)) {
//         // Sort newest → oldest
//         const sorted = [...res.data].sort((a, b) => 
//           new Date(b.createdAt) - new Date(a.createdAt)
//         );
//         setHistory(sorted);
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

//   // ── Pagination Calculation ───────────────────────────────────
//   const indexOfLastItem  = currentPage * itemsPerPage;
//   const indexOfFirstItem = indexOfLastItem - itemsPerPage;
//   const currentItems     = history.slice(indexOfFirstItem, indexOfLastItem);
//   const totalPages       = Math.ceil(history.length / itemsPerPage);

//   const paginate = (pageNumber) => {
//     if (pageNumber < 1 || pageNumber > totalPages) return;
//     setCurrentPage(pageNumber);
//   };

//   // ── Deposit Creation ─────────────────────────────────────────
//   const handleCreateDeposit = async (e) => {
//     e.preventDefault();
//     const numAmount = parseFloat(amount);
    
//     if (isNaN(numAmount) || numAmount < 50) {
//       setError('Minimum deposit amount is $50 USDT');
//       return;
//     }

//     setError('');
//     setMessage('');
//     setDepositLoading(true);
//     setDepositResult(null);
//     setReceiptFile(null);
//     setSelectedFileName('');

//     try {
//       const res = await createDeposit(numAmount);
//       const data = res.data || res;
//       if (!data || !data.paymentId) {
//         throw new Error('Invalid deposit response - missing paymentId');
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

//   // ── Status Polling ───────────────────────────────────────────
//   const startPolling = (paymentId) => {
//     if (pollingInterval) clearInterval(pollingInterval);

//     const interval = setInterval(async () => {
//       try {
//         const res = await checkDepositStatus(paymentId);
//         const status = res.data?.status || 'pending';
//         setDepositResult((prev) => prev ? { ...prev, status } : null);

//         const updatedHistory = history.map((dep) =>
//           dep.paymentId === paymentId ? { ...dep, status } : dep
//         );
//         setHistory(updatedHistory);

//         if (status === 'completed' || status === 'confirmed' || status === 'rejected' || status === 'verified') {
//           clearInterval(interval);
//           setPollingInterval(null);
//           setMessage(
//             status === 'rejected' 
//               ? 'Deposit rejected by admin.' 
//               : 'Deposit confirmed! Balance updated.'
//           );
//           loadHistory();
//         }
//       } catch (err) {
//         console.warn('Polling error:', err);
//       }
//     }, 8000);

//     setPollingInterval(interval);
//   };

//   // ── Receipt Upload ───────────────────────────────────────────
//   const handleUploadReceipt = async () => {
//     if (!depositResult) {
//       setError('No active deposit request found');
//       return;
//     }

//     if (!receiptFile) {
//       setError('Please select a receipt file first');
//       return;
//     }

//     setUploadingReceipt(true);
//     setError('');
//     setMessage('');

//     try {
//       const depositId = depositResult.depositId || depositResult.paymentId || depositResult.id;
//       if (!depositId) throw new Error('Missing deposit/payment ID');

//       const res = await uploadReceipt(depositId, receiptFile);

//       if (res?.success) {
//         setMessage('Receipt uploaded successfully! Awaiting admin verification.');
//         setReceiptFile(null);
//         setSelectedFileName('');
//         setShowSuccessPopup(true);

//         if (pollingInterval) {
//           clearInterval(pollingInterval);
//           setPollingInterval(null);
//         }

//         confetti({
//           particleCount: 120,
//           spread: 70,
//           origin: { y: 0.6 },
//           colors: ['#f97316', '#fb923c', '#fed7aa', '#ffffff'],
//           ticks: 300,
//         });

//         setTimeout(() => {
//           confetti({
//             particleCount: 80,
//             angle: 60,
//             spread: 55,
//             origin: { x: 0.2, y: 0.6 },
//           });
//           confetti({
//             particleCount: 80,
//             angle: 120,
//             spread: 55,
//             origin: { x: 0.8, y: 0.6 },
//           });
//         }, 200);

//         loadHistory();
//       } else {
//         throw new Error(res?.message || 'Upload did not complete successfully');
//       }
//     } catch (err) {
//       console.error('Receipt upload error:', err);
//       const errorMessage = err.message || err.response?.data?.message || 'Failed to upload receipt. Please try again.';
//       setError(errorMessage);
//     } finally {
//       setUploadingReceipt(false);
//     }
//   };

//   const handleFileChange = (e) => {
//     const file = e.target.files?.[0];
//     if (file) {
//       setReceiptFile(file);
//       setSelectedFileName(file.name);
//     } else {
//       setReceiptFile(null);
//       setSelectedFileName('');
//     }
//   };

//   const hasActivePendingDeposit = depositResult && depositResult.status === 'pending';

//   // ── Render ───────────────────────────────────────────────────
//   return (
//     <div className={`min-h-screen p-6 transition-colors duration-300 ${isDark ? 'bg-slate-950 text-white' : 'bg-gray-50 text-gray-900'}`}>
//       <div className="max-w-3xl mx-auto space-y-10">

//         {/* Deposit Form */}
//         <motion.div 
//           initial={{ opacity: 0, y: 20 }} 
//           animate={{ opacity: 1, y: 0 }} 
//           className={`rounded-3xl border p-8 shadow-2xl backdrop-blur-xl ${isDark ? 'bg-black/40 border-orange-600/30' : 'bg-white border-gray-200 shadow-xl'}`}
//         >
//           <div className="text-center mb-8">
//             <WalletIcon className={`w-16 h-16 mx-auto mb-4 ${isDark ? 'text-orange-400' : 'text-orange-600'}`} />
//             <h1 className={`text-4xl font-bold bg-gradient-to-r bg-clip-text text-transparent ${isDark ? 'from-orange-400 to-orange-500' : 'from-orange-600 to-orange-700'}`}>
//               Deposit Funds
//             </h1>
//             <p className={`${isDark ? 'text-gray-400' : 'text-gray-500'} mt-2`}>USDT (BSC)</p>
//           </div>

//           <form onSubmit={handleCreateDeposit} className="space-y-6">
//             <div>
//               <label className={`block text-sm font-medium mb-2 ${isDark ? 'text-orange-300/90' : 'text-orange-700'}`}>
//                 Amount (USDT)
//               </label>
//               <input
//                 type="number"
//                 step="0.01"
//                 min="50"
//                 value={amount}
//                 onChange={(e) => setAmount(e.target.value)}
//                 placeholder="50.00 minimum"
//                 className={`w-full px-5 py-4 rounded-xl placeholder-gray-500 border focus:outline-none focus:ring-2 transition ${isDark ? 'bg-slate-900 border-orange-700/40 text-white focus:border-orange-500 focus:ring-orange-500/30' : 'bg-white border-gray-300 text-gray-900 focus:border-orange-500 focus:ring-orange-400/30'}`}
//                 disabled={depositLoading || hasActivePendingDeposit}
//                 required
//               />
//               <p className={`mt-2 text-sm ${parseFloat(amount) > 0 && parseFloat(amount) < 50 ? 'text-red-500 font-medium' : isDark ? 'text-gray-400' : 'text-gray-600'}`}>
//                 Minimum deposit amount: <strong>$50</strong>
//               </p>
//             </div>

//             <button 
//               type="submit" 
//               disabled={depositLoading || hasActivePendingDeposit || !amount || parseFloat(amount) < 50}
//               className={`w-full py-4 px-6 font-semibold rounded-xl transition transform hover:scale-[1.02] shadow-lg ${isDark ? 'bg-gradient-to-r from-orange-600 to-orange-500 hover:from-orange-500 hover:to-orange-400 text-white' : 'bg-gradient-to-r from-orange-600 to-orange-700 hover:from-orange-700 hover:to-orange-800 text-white'} ${depositLoading || hasActivePendingDeposit ? 'opacity-60 cursor-not-allowed' : ''}`}
//             >
//               {depositLoading ? 'Creating...' : hasActivePendingDeposit ? 'Request Already Created' : 'Create Deposit Request'}
//             </button>
//           </form>

//           {error && <p className="mt-4 text-red-500 dark:text-red-400 text-center font-medium">{error}</p>}
//           {message && <p className="mt-4 text-green-500 dark:text-orange-300 text-center font-medium">{message}</p>}

//           <AnimatePresence>
//             {depositResult && (
//               <motion.div 
//                 initial={{ opacity: 0, height: 0 }} 
//                 animate={{ opacity: 1, height: 'auto' }} 
//                 exit={{ opacity: 0, height: 0 }} 
//                 className="mt-8 overflow-hidden"
//               >
//                 <div className={`p-6 rounded-2xl border ${isDark ? 'bg-slate-900/70 border-orange-600/30' : 'bg-gray-50 border-gray-200 shadow-inner'}`}>
//                   <div className="flex justify-between items-center mb-4">
//                     <h3 className={`text-lg font-semibold ${isDark ? 'text-orange-300' : 'text-orange-700'}`}>
//                       Payment Details
//                     </h3>
//                     <div className="flex items-center gap-2">
//                       {pollingInterval && <ClockIcon className="w-5 h-5 text-amber-400 animate-pulse" />}
//                       <span className={`text-sm font-medium ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
//                         {depositResult.status?.toUpperCase() || 'PENDING'}
//                       </span>
//                     </div>
//                   </div>

//                   {depositResult.payAddress && (
//                     <>
//                       <p className={`text-sm mb-2 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
//                         Send {depositResult.payCurrency || 'USDT'} to address:
//                       </p>
//                       <div className={`flex items-center gap-3 p-4 rounded-xl border ${isDark ? 'bg-black/40 border-orange-800/30' : 'bg-white border-gray-200 shadow-sm'}`}>
//                         <p className={`font-mono break-all flex-1 ${isDark ? 'text-orange-300' : 'text-orange-700'}`}>
//                           {shorten(depositResult.payAddress)}
//                         </p>
//                         <button 
//                           onClick={() => copyToClipboard(depositResult.payAddress)} 
//                           className="p-2 hover:bg-black/10 dark:hover:bg-white/10 rounded-lg transition"
//                         >
//                           {copied ? (
//                             <CheckCircleIcon className={`w-6 h-6 ${isDark ? 'text-orange-400' : 'text-green-600'}`} />
//                           ) : (
//                             <DocumentDuplicateIcon className={`w-6 h-6 ${isDark ? 'text-gray-300' : 'text-gray-600'}`} />
//                           )}
//                         </button>
//                       </div>

//                       <div className="mt-6 flex justify-center">
//                         <div className="p-4 rounded-2xl shadow-2xl bg-white">
//                           <QRCode value={depositResult.payAddress} size={180} level="H" />
//                         </div>
//                       </div>
//                       <p className={`text-center text-sm mt-3 ${isDark ? 'text-gray-500' : 'text-gray-600'}`}>
//                         Scan to send {depositResult.payCurrency || 'USDT'}
//                       </p>
//                     </>
//                   )}

//                   <div className="mt-8">
//                     <h4 className={`text-md font-semibold mb-3 ${isDark ? 'text-orange-300' : 'text-orange-700'}`}>
//                       Upload Payment Receipt
//                     </h4>
//                     <p className={`text-sm mb-4 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
//                       After sending funds, upload your transaction receipt / proof of payment.
//                     </p>
//                     <input
//                       type="file"
//                       accept="image/*,.pdf"
//                       onChange={handleFileChange}
//                       className={`block w-full text-sm text-gray-500 file:mr-4 file:py-3 file:px-5 file:rounded-xl file:border-0 file:text-sm file:font-semibold ${isDark ? 'file:bg-orange-900/50 file:text-orange-300 hover:file:bg-orange-900/70' : 'file:bg-orange-50 file:text-orange-700 hover:file:bg-orange-100'}`}
//                       disabled={uploadingReceipt || depositResult.status !== 'pending'}
//                     />
//                     {selectedFileName && (
//                       <p className={`mt-2 text-sm truncate ${isDark ? 'text-orange-300' : 'text-orange-700'}`}>
//                         Selected: {selectedFileName}
//                       </p>
//                     )}
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

//         {/* Deposit History with Pagination */}
//         <motion.div 
//           initial={{ opacity: 0 }} 
//           animate={{ opacity: 1 }} 
//           transition={{ delay: 0.2 }} 
//           className={`rounded-3xl border p-8 ${isDark ? 'bg-black/40 backdrop-blur-xl border-orange-600/30' : 'bg-white border-gray-200 shadow-xl'}`}
//         >
//           <h2 className={`text-2xl font-semibold mb-6 ${isDark ? 'text-orange-300' : 'text-orange-700'}`}>
//             Deposit History
//           </h2>

//           {historyLoading ? (
//             <p className={`${isDark ? 'text-gray-400' : 'text-gray-500'} text-center py-8`}>Loading...</p>
//           ) : history.length === 0 ? (
//             <p className={`${isDark ? 'text-gray-400' : 'text-gray-500'} text-center py-8`}>No deposits yet.</p>
//           ) : (
//             <>
//               <div className="space-y-4">
//                 {currentItems.map((dep) => (
//                   <div 
//                     key={dep._id || dep.paymentId} 
//                     className={`p-5 rounded-xl border flex justify-between items-center ${isDark ? 'bg-slate-900/60 border-orange-800/30' : 'bg-gray-50 border-gray-200'}`}
//                   >
//                     <div>
//                       <p className={`font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>
//                         {dep.payAmount || dep.amount} USDT
//                       </p>
//                       <p className={`${isDark ? 'text-gray-400' : 'text-gray-500'} text-sm`}>
//                         {dep.payAddress ? shorten(dep.payAddress) : '—'}
//                       </p>
//                     </div>
//                     <div className="text-right">
//                       <p className={`font-semibold ${dep.status === 'completed' || dep.status === 'confirmed' || dep.status === 'verified' ? (isDark ? 'text-orange-400' : 'text-green-600') : dep.status === 'pending' ? 'text-amber-400' : 'text-red-500'}`}>
//                         {dep.status?.toUpperCase() || 'PENDING'}
//                       </p>
//                       <p className={`${isDark ? 'text-gray-500' : 'text-gray-600'} text-xs mt-1`}>
//                         {dep.createdAt ? new Date(dep.createdAt).toLocaleString() : '—'}
//                       </p>
//                     </div>
//                   </div>
//                 ))}
//               </div>

//               {/* Pagination Controls */}
//               {totalPages > 1 && (
//                 <div className="mt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
//                   <button
//                     onClick={() => paginate(currentPage - 1)}
//                     disabled={currentPage === 1}
//                     className={`flex items-center gap-1 px-5 py-2.5 rounded-xl font-medium transition-colors ${
//                       currentPage === 1 
//                         ? 'opacity-50 cursor-not-allowed bg-gray-700/20' 
//                         : isDark 
//                           ? 'bg-orange-900/50 hover:bg-orange-800/70 text-orange-300' 
//                           : 'bg-orange-100 hover:bg-orange-200 text-orange-700 border border-orange-200'
//                     }`}
//                   >
//                     <ChevronLeftIcon className="w-5 h-5" />
//                     Prev
//                   </button>

//                   <div className="flex gap-2 flex-wrap justify-center">
//                     {Array.from({ length: Math.min(totalPages, 7) }, (_, i) => {
//                       const page = i + 1;
//                       return (
//                         <button
//                           key={page}
//                           onClick={() => paginate(page)}
//                           className={`w-10 h-10 rounded-xl font-medium transition-all ${
//                             page === currentPage
//                               ? isDark 
//                                 ? 'bg-orange-600 text-white shadow-lg shadow-orange-500/30' 
//                                 : 'bg-orange-600 text-white shadow-lg shadow-orange-500/40'
//                               : isDark 
//                                 ? 'bg-slate-800 hover:bg-slate-700 text-gray-300 border border-slate-700' 
//                                 : 'bg-gray-200 hover:bg-gray-300 text-gray-700 border border-gray-300'
//                           }`}
//                         >
//                           {page}
//                         </button>
//                       );
//                     })}
//                     {totalPages > 7 && currentPage < totalPages - 3 && (
//                       <span className={`w-10 h-10 flex items-center justify-center text-gray-400 ${isDark ? 'text-gray-500' : ''}`}>
//                         ...
//                       </span>
//                     )}
//                   </div>

//                   <button
//                     onClick={() => paginate(currentPage + 1)}
//                     disabled={currentPage === totalPages}
//                     className={`flex items-center gap-1 px-5 py-2.5 rounded-xl font-medium transition-colors ${
//                       currentPage === totalPages 
//                         ? 'opacity-50 cursor-not-allowed bg-gray-700/20' 
//                         : isDark 
//                           ? 'bg-orange-900/50 hover:bg-orange-800/70 text-orange-300' 
//                           : 'bg-orange-100 hover:bg-orange-200 text-orange-700 border border-orange-200'
//                     }`}
//                   >
//                     Next
//                     <ChevronRightIcon className="w-5 h-5" />
//                   </button>
//                 </div>
//               )}

//               {history.length > 0 && (
//                 <p className={`mt-4 text-center text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
//                   Showing {indexOfFirstItem + 1}–{Math.min(indexOfLastItem, history.length)} of {history.length}
//                 </p>
//               )}
//             </>
//           )}
//         </motion.div>

//         {/* Success Popup */}
//         <AnimatePresence>
//           {showSuccessPopup && (
//             <motion.div
//               initial={{ opacity: 0 }}
//               animate={{ opacity: 1 }}
//               exit={{ opacity: 0 }}
//               className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4"
//               onClick={() => setShowSuccessPopup(false)}
//             >
//               <motion.div
//                 initial={{ scale: 0.7, opacity: 0, y: 40 }}
//                 animate={{ scale: 1, opacity: 1, y: 0 }}
//                 exit={{ scale: 0.7, opacity: 0, y: 40 }}
//                 transition={{ type: 'spring', stiffness: 300, damping: 25 }}
//                 className={`relative max-w-md w-full rounded-3xl p-8 shadow-2xl border text-center ${
//                   isDark
//                     ? 'bg-gradient-to-b from-slate-900 to-slate-800 border-orange-600/40'
//                     : 'bg-white border-orange-200 shadow-orange-100/50'
//                 }`}
//                 onClick={(e) => e.stopPropagation()}
//               >
//                 <div className="mb-6">
//                   <motion.div
//                     initial={{ scale: 0 }}
//                     animate={{ scale: 1, rotate: [0, 15, -10, 5, 0] }}
//                     transition={{ delay: 0.3, type: 'spring', stiffness: 400 }}
//                     className="inline-block text-7xl"
//                   >
//                     🎉
//                   </motion.div>
//                 </div>

//                 <h2 className={`text-3xl font-bold mb-3 ${isDark ? 'text-orange-400' : 'text-orange-600'}`}>
//                   Congratulations Victor!
//                 </h2>

//                 <p className={`text-lg mb-8 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
//                   Your receipt has been successfully uploaded.<br />
//                   Our team will review it shortly — you're almost there!
//                 </p>

//                 <button
//                   onClick={() => setShowSuccessPopup(false)}
//                   className={`px-8 py-4 rounded-xl font-semibold text-lg transition transform hover:scale-105 shadow-lg ${
//                     isDark
//                       ? 'bg-gradient-to-r from-orange-600 to-orange-500 hover:from-orange-500 hover:to-orange-400 text-white'
//                       : 'bg-gradient-to-r from-orange-600 to-orange-700 hover:from-orange-700 hover:to-orange-800 text-white'
//                   }`}
//                 >
//                   Awesome!
//                 </button>

//                 <button
//                   onClick={() => setShowSuccessPopup(false)}
//                   className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 text-xl"
//                 >
//                   ×
//                 </button>
//               </motion.div>
//             </motion.div>
//           )}
//         </AnimatePresence>

//       </div>
//     </div>
//   );
// }








// Deposit.jsx – fully updated February 2025 version
import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  WalletIcon,
  DocumentDuplicateIcon,
  CheckCircleIcon,
  ClockIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  ExclamationTriangleIcon,
  ArrowTopRightOnSquareIcon,
} from '@heroicons/react/24/solid';
import QRCode from 'react-qr-code';
import confetti from 'canvas-confetti';

import { initiateDeposit, getDepositHistory, uploadReceipt } from '../../api/depositapi';
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

  const [receiptFile, setReceiptFile] = useState(null);
  const [selectedFileName, setSelectedFileName] = useState('');
  const [filePreview, setFilePreview] = useState(null);
  const [uploadingReceipt, setUploadingReceipt] = useState(false);
  const [showSuccessPopup, setShowSuccessPopup] = useState(false);

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  const fileInputRef = useRef(null);

  // ────────────────────────────────────────────────────────────────
  //  UTILS
  // ────────────────────────────────────────────────────────────────
  const shorten = (str) => (str ? `${str.slice(0, 8)}...${str.slice(-6)}` : '—');

  const copyToClipboard = (text) => {
    if (!text) return;
    navigator.clipboard.writeText(text).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2200);
    });
  };

  const resetForm = () => {
    setAmount('');
    setDepositResult(null);
    setReceiptFile(null);
    setSelectedFileName('');
    setFilePreview(null);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  // ────────────────────────────────────────────────────────────────
  //  DATA FETCHING
  // ────────────────────────────────────────────────────────────────
  const loadHistory = async () => {
    try {
      setHistoryLoading(true);
      const res = await getDepositHistory('', 50, 0);
      const deposits = res?.data?.deposits || res?.deposits || res?.data || [];
      const sorted = [...deposits].sort(
        (a, b) => new Date(b.createdAt || b.date || 0) - new Date(a.createdAt || a.date || 0)
      );
      setHistory(sorted);

      const latestPending = sorted.find(
        (d) => ['pending', 'receipt_submitted'].includes(d.status?.toLowerCase())
      );
      if (latestPending && !depositResult) {
        setDepositResult(latestPending);
      }
    } catch (err) {
      console.error(err);
      setError('Failed to load deposit history');
    } finally {
      setHistoryLoading(false);
    }
  };

  useEffect(() => {
    loadHistory();
    const interval = setInterval(loadHistory, 45000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (showSuccessPopup) {
      confetti({
        particleCount: 140,
        spread: 80,
        origin: { y: 0.6 },
        colors: ['#f97316', '#fb923c', '#fed7aa', '#ffffff', '#10b981'],
      });
      const t = setTimeout(() => setShowSuccessPopup(false), 6000);
      return () => clearTimeout(t);
    }
  }, [showSuccessPopup]);

  useEffect(() => {
    setCurrentPage(1);
  }, [history.length]);

  // ────────────────────────────────────────────────────────────────
  //  CREATE DEPOSIT
  // ────────────────────────────────────────────────────────────────
  const handleCreateDeposit = async (e) => {
    e.preventDefault();
    const numAmount = parseFloat(amount);

    if (isNaN(numAmount) || numAmount < 50) {
      setError('Minimum deposit is 50 USDT');
      return;
    }

    setError('');
    setMessage('');
    setDepositLoading(true);

    try {
      const res = await initiateDeposit(numAmount);
      const dep = res?.data || res;

      if (!dep?.depositId && !dep?._id && !dep?.id) {
        throw new Error('Invalid deposit response from server');
      }

      setDepositResult(dep);
      setMessage('Deposit request created. Send funds & upload proof.');
      resetForm();
      loadHistory();
    } catch (err) {
      setError(err.response?.data?.message || err.message || 'Could not create deposit request');
    } finally {
      setDepositLoading(false);
    }
  };

  // ────────────────────────────────────────────────────────────────
  //  RECEIPT UPLOAD
  // ────────────────────────────────────────────────────────────────
  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const validTypes = ['image/jpeg', 'image/png', 'image/webp', 'application/pdf'];
    if (!validTypes.includes(file.type)) {
      setError('Only JPG, PNG, WebP or PDF allowed');
      return;
    }
    if (file.size > 8 * 1024 * 1024) {
      setError('File too large (max 8MB)');
      return;
    }

    setReceiptFile(file);
    setSelectedFileName(file.name);
    setError('');

    if (file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onload = () => setFilePreview(reader.result);
      reader.readAsDataURL(file);
    } else {
      setFilePreview(null);
    }
  };

  const handleUploadReceipt = async () => {
    if (!depositResult) return setError('No active deposit selected');
    if (!receiptFile) return setError('Please choose a file first');

    setUploadingReceipt(true);
    setError('');
    setMessage('');

    try {
      const depositId = depositResult.depositId || depositResult._id || depositResult.id;
      const res = await uploadReceipt(depositId, receiptFile);

      if (res?.success) {
        const receiptUrl = res?.data?.receiptImage;

        setMessage('Receipt uploaded! Waiting for admin review.');
        setShowSuccessPopup(true);

        setDepositResult((prev) =>
          prev ? { ...prev, receiptImage: receiptUrl, status: 'receipt_submitted' } : null
        );

        loadHistory();

        setReceiptFile(null);
        setSelectedFileName('');
        setFilePreview(null);
        if (fileInputRef.current) fileInputRef.current.value = '';
      } else {
        throw new Error(res?.message || 'Upload did not return success');
      }
    } catch (err) {
      setError(
        err.response?.data?.message ||
        err.message ||
        'Failed to upload receipt. Please try again.'
      );
    } finally {
      setUploadingReceipt(false);
    }
  };

  // ────────────────────────────────────────────────────────────────
  //  PAGINATION & HELPERS
  // ────────────────────────────────────────────────────────────────
  const totalPages = Math.ceil(history.length / itemsPerPage);
  const indexOfLast = currentPage * itemsPerPage;
  const indexOfFirst = indexOfLast - itemsPerPage;
  const currentItems = history.slice(indexOfFirst, indexOfLast);

  const paginate = (page) => {
    if (page < 1 || page > totalPages) return;
    setCurrentPage(page);
  };

  const hasActivePending = depositResult && ['pending', 'receipt_submitted'].includes(depositResult.status?.toLowerCase());

  // ────────────────────────────────────────────────────────────────
  //  RENDER
  // ────────────────────────────────────────────────────────────────
  return (
    <div className={`min-h-screen p-5 sm:p-6 transition-colors ${isDark ? 'bg-slate-950 text-white' : 'bg-gray-50 text-gray-900'}`}>
      <div className="max-w-3xl mx-auto space-y-10">

        {/* CREATE DEPOSIT SECTION */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className={`rounded-3xl p-7 sm:p-8 border shadow-xl ${isDark ? 'bg-black/40 border-orange-700/30 backdrop-blur-md' : 'bg-white border-gray-200 shadow-lg'}`}
        >
          <div className="text-center mb-8">
            <WalletIcon className={`w-16 h-16 mx-auto mb-4 ${isDark ? 'text-orange-400' : 'text-orange-600'}`} />
            <h1 className={`text-4xl font-bold bg-gradient-to-r bg-clip-text text-transparent ${isDark ? 'from-orange-400 to-orange-500' : 'from-orange-600 to-orange-700'}`}>
              Deposit USDT
            </h1>
            <p className={`mt-2 ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>BSC Network • Minimum $50</p>
          </div>

          {hasActivePending && (
            <div className="mb-6 p-5 bg-amber-100 dark:bg-amber-950/40 border border-amber-400 dark:border-amber-600 rounded-2xl text-center">
              <p className="font-semibold text-amber-800 dark:text-amber-300 text-lg mb-2">
                You already have an active deposit request
              </p>
              <p className="text-sm text-amber-700 dark:text-amber-400">
                Please complete the current request (send funds & upload receipt) or wait for admin approval before creating a new one.
              </p>
            </div>
          )}

          <form onSubmit={handleCreateDeposit} className="space-y-6">
            <div>
              <label className={`block mb-2 text-sm font-medium ${isDark ? 'text-orange-300/90' : 'text-orange-700'}`}>
                Amount (USDT)
              </label>
              <input
                type="number"
                step="0.01"
                min="50"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                placeholder="e.g. 150.00"
                disabled={depositLoading || hasActivePending}
                className={`w-full px-5 py-4 rounded-xl border focus:outline-none focus:ring-2 transition-all ${isDark ? 'bg-slate-900 border-orange-700/40 text-white focus:border-orange-500 focus:ring-orange-500/25' : 'bg-white border-gray-300 focus:border-orange-500 focus:ring-orange-400/25'} ${hasActivePending ? 'opacity-60 cursor-not-allowed' : ''}`}
                required
              />
              <p className={`mt-2 text-sm ${parseFloat(amount) > 0 && parseFloat(amount) < 50 ? 'text-red-500' : isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                Minimum: <strong>50 USDT</strong>
              </p>
            </div>

            <button
              type="submit"
              disabled={depositLoading || hasActivePending || !amount || parseFloat(amount) < 50}
              className={`w-full py-4 rounded-xl font-semibold shadow-lg transform transition hover:scale-[1.02] ${isDark ? 'bg-gradient-to-r from-orange-600 to-orange-500 hover:from-orange-500 hover:to-orange-400 text-white' : 'bg-gradient-to-r from-orange-600 to-orange-700 hover:from-orange-700 hover:to-orange-800 text-white'} disabled:opacity-50 disabled:cursor-not-allowed`}
            >
              {depositLoading
                ? 'Creating…'
                : hasActivePending
                ? 'Pending Request Active'
                : 'Create Deposit'}
            </button>
          </form>

          {error && (
            <p className="mt-5 text-red-500 dark:text-red-400 text-center font-medium flex items-center justify-center gap-2">
              <ExclamationTriangleIcon className="w-5 h-5" /> {error}
            </p>
          )}
          {message && <p className="mt-5 text-green-500 dark:text-orange-300 text-center font-medium">{message}</p>}

          <AnimatePresence>
            {depositResult && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="mt-9 overflow-hidden"
              >
                <div className={`p-6 rounded-2xl border ${isDark ? 'bg-slate-900/60 border-orange-800/30' : 'bg-gray-100 border-gray-200'}`}>
                  <div className="flex justify-between items-center mb-5">
                    <h3 className={`text-lg font-semibold ${isDark ? 'text-orange-300' : 'text-orange-700'}`}>
                      Payment Instructions
                    </h3>
                    <div className="flex items-center gap-2">
                      <ClockIcon className="w-5 h-5 text-amber-400 animate-pulse" />
                      <span className={`text-sm font-medium uppercase ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                        {depositResult.status || 'pending'}
                      </span>
                    </div>
                  </div>

                  {depositResult.payAddress && (
                    <>
                      <p className={`text-sm mb-3 ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                        Send <strong>{depositResult.amount || amount} USDT</strong> to:
                      </p>
                      <div className={`flex items-center gap-3 p-4 rounded-xl border font-mono break-all ${isDark ? 'bg-black/40 border-orange-900/40 text-orange-200' : 'bg-white border-gray-200 text-orange-700'}`}>
                        <span className="flex-1">{shorten(depositResult.payAddress)}</span>
                        <button
                          onClick={() => copyToClipboard(depositResult.payAddress)}
                          className="p-2.5 rounded-lg hover:bg-black/10 dark:hover:bg-white/10 transition"
                          title="Copy address"
                        >
                          {copied ? <CheckCircleIcon className="w-6 h-6 text-green-500" /> : <DocumentDuplicateIcon className="w-6 h-6" />}
                        </button>
                      </div>

                      <div className="mt-7 flex justify-center">
                        <div className="p-4 bg-white rounded-2xl shadow-2xl">
                          <QRCode value={depositResult.payAddress} size={180} level="H" />
                        </div>
                      </div>
                      <p className={`text-center text-sm mt-3 ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                        Scan to send (BSC network)
                      </p>
                    </>
                  )}

                  {/* Receipt Upload + Preview + Uploaded Image */}
                  <div className="mt-10">
                    <h4 className={`text-lg font-semibold mb-3 ${isDark ? 'text-orange-300' : 'text-orange-700'}`}>
                      Upload Proof of Payment
                    </h4>
                    <p className={`text-sm mb-4 ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                      After transfer, upload screenshot / receipt (jpg, png, pdf • max 8MB)
                    </p>

                    <label className={`block cursor-pointer ${isDark ? 'hover:bg-orange-950/30' : 'hover:bg-orange-50'} transition rounded-xl border-2 border-dashed p-6 text-center ${isDark ? 'border-orange-700/50 text-orange-300' : 'border-orange-200 text-orange-600'}`}>
                      <input
                        ref={fileInputRef}
                        type="file"
                        accept="image/jpeg,image/png,image/webp,application/pdf"
                        onChange={handleFileChange}
                        className="hidden"
                        disabled={uploadingReceipt || ['completed','rejected'].includes(depositResult?.status)}
                      />
                      <p className="font-medium">
                        {selectedFileName || 'Click or drag file here'}
                      </p>
                      <p className={`text-xs mt-1 ${isDark ? 'text-gray-500' : 'text-gray-400'}`}>
                        JPG / PNG / PDF • max 8 MB
                      </p>
                    </label>

                    {filePreview && (
                      <div className="mt-4">
                        <img src={filePreview} alt="Receipt preview" className="max-h-48 mx-auto rounded-lg shadow-md object-contain" />
                      </div>
                    )}

                    <button
                      onClick={handleUploadReceipt}
                      disabled={!receiptFile || uploadingReceipt || depositResult?.status !== 'pending'}
                      className={`w-full mt-6 py-4 rounded-xl font-semibold shadow-lg transition hover:scale-[1.02] ${isDark ? 'bg-gradient-to-r from-emerald-600 to-emerald-500 hover:from-emerald-500 hover:to-emerald-400 text-white' : 'bg-gradient-to-r from-emerald-600 to-emerald-700 hover:from-emerald-700 hover:to-emerald-800 text-white'} disabled:opacity-50 disabled:cursor-not-allowed`}
                    >
                      {uploadingReceipt ? 'Uploading…' : 'Submit Receipt'}
                    </button>

                    {/* Show uploaded receipt image after success */}
                    {depositResult?.receiptImage && (
                      <div className="mt-8">
                        <p className={`text-sm font-medium mb-3 ${isDark ? 'text-emerald-300' : 'text-emerald-700'}`}>
                          Uploaded Receipt
                        </p>
                        <div className="border border-gray-300 dark:border-gray-700 rounded-xl overflow-hidden shadow-sm max-h-80">
                          <img
                            src={depositResult.receiptImage}
                            alt="Uploaded payment receipt"
                            className="w-full h-auto object-contain"
                            onError={(e) => {
                              e.target.src = '/images/fallback-receipt.png'; // optional fallback
                              e.target.alt = 'Receipt image failed to load';
                            }}
                          />
                        </div>
                        <p className={`text-xs mt-2 text-center ${isDark ? 'text-gray-500' : 'text-gray-400'}`}>
                          Uploaded • Awaiting verification
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.section>

        {/* HISTORY SECTION – remains the same as previous version with thumbnails */}
        <motion.section
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.15 }}
          className={`rounded-3xl p-7 sm:p-8 border shadow-xl ${isDark ? 'bg-black/40 border-orange-700/30 backdrop-blur-md' : 'bg-white border-gray-200 shadow-lg'}`}
        >
          <h2 className={`text-2xl font-bold mb-6 ${isDark ? 'text-orange-300' : 'text-orange-700'}`}>
            Deposit History
          </h2>

          {historyLoading ? (
            <div className="text-center py-12 text-gray-400">Loading history…</div>
          ) : history.length === 0 ? (
            <div className="text-center py-12 text-gray-500 dark:text-gray-400">
              No deposits found yet.
            </div>
          ) : (
            <>
              <div className="space-y-4">
                {currentItems.map((dep) => {
                  const status = (dep.status || 'pending').toLowerCase();
                  let statusColor = 'text-amber-400';
                  if (['completed', 'verified', 'approved'].includes(status)) statusColor = isDark ? 'text-emerald-400' : 'text-emerald-600';
                  else if (status === 'receipt_submitted') statusColor = 'text-blue-400';
                  else if (['rejected', 'failed', 'cancelled'].includes(status)) statusColor = 'text-red-500';

                  return (
                    <div
                      key={dep._id || dep.depositId || dep.id}
                      className={`p-5 rounded-xl border flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 ${isDark ? 'bg-slate-900/60 border-orange-900/30' : 'bg-gray-50 border-gray-200'}`}
                    >
                      <div className="flex-1">
                        <p className={`font-semibold text-lg ${isDark ? 'text-white' : 'text-gray-900'}`}>
                          {dep.amount || dep.payAmount || '—'} USDT
                        </p>
                        <p className={`text-sm mt-1 font-mono ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                          {dep.payAddress ? shorten(dep.payAddress) : '—'}
                        </p>

                        {dep.receiptImage && (
                          <div className="mt-4">
                            <p className={`text-xs ${isDark ? 'text-gray-500' : 'text-gray-400'} mb-2`}>Receipt:</p>
                            <a
                              href={dep.receiptImage}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-block group"
                            >
                              <div className="relative">
                                <img
                                  src={dep.receiptImage}
                                  alt="Receipt thumbnail"
                                  className="w-24 h-24 object-cover rounded-md border border-gray-300 dark:border-gray-700 shadow-sm group-hover:opacity-90 transition"
                                  onError={(e) => (e.target.style.display = 'none')}
                                />
                                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition bg-black/40 rounded-md">
                                  <ArrowTopRightOnSquareIcon className="w-8 h-8 text-white" />
                                </div>
                              </div>
                            </a>
                          </div>
                        )}
                      </div>

                      <div className="text-right shrink-0">
                        <p className={`font-bold uppercase ${statusColor}`}>
                          {status}
                        </p>
                        <p className={`text-xs mt-1 ${isDark ? 'text-gray-500' : 'text-gray-600'}`}>
                          {dep.createdAt ? new Date(dep.createdAt).toLocaleString() : '—'}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>

              {totalPages > 1 && (
                <div className="mt-8 flex flex-col sm:flex-row items-center justify-between gap-5">
                  <button
                    onClick={() => paginate(currentPage - 1)}
                    disabled={currentPage === 1}
                    className={`flex items-center gap-2 px-6 py-3 rounded-xl font-medium transition ${currentPage === 1 ? 'opacity-40 cursor-not-allowed bg-gray-700/20' : isDark ? 'bg-orange-900/60 hover:bg-orange-800/70 text-orange-200' : 'bg-orange-100 hover:bg-orange-200 text-orange-700 border border-orange-200'}`}
                  >
                    <ChevronLeftIcon className="w-5 h-5" /> Prev
                  </button>

                  <div className="flex gap-2 flex-wrap justify-center">
                    {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                      <button
                        key={page}
                        onClick={() => paginate(page)}
                        className={`w-11 h-11 rounded-xl font-medium transition-all ${page === currentPage ? isDark ? 'bg-orange-600 text-white shadow-lg shadow-orange-600/40' : 'bg-orange-600 text-white shadow-lg shadow-orange-500/40' : isDark ? 'bg-slate-800 hover:bg-slate-700 border border-slate-700 text-gray-200' : 'bg-gray-200 hover:bg-gray-300 border border-gray-300 text-gray-700'}`}
                      >
                        {page}
                      </button>
                    ))}
                  </div>

                  <button
                    onClick={() => paginate(currentPage + 1)}
                    disabled={currentPage === totalPages}
                    className={`flex items-center gap-2 px-6 py-3 rounded-xl font-medium transition ${currentPage === totalPages ? 'opacity-40 cursor-not-allowed bg-gray-700/20' : isDark ? 'bg-orange-900/60 hover:bg-orange-800/70 text-orange-200' : 'bg-orange-100 hover:bg-orange-200 text-orange-700 border border-orange-200'}`}
                  >
                    Next <ChevronRightIcon className="w-5 h-5" />
                  </button>
                </div>
              )}

              <p className={`mt-5 text-center text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                Showing {indexOfFirst + 1}–{Math.min(indexOfLast, history.length)} of {history.length}
              </p>
            </>
          )}
        </motion.section>

        {/* SUCCESS POPUP */}
        <AnimatePresence>
          {showSuccessPopup && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm px-4"
              onClick={() => setShowSuccessPopup(false)}
            >
              <motion.div
                initial={{ scale: 0.75, y: 50, opacity: 0 }}
                animate={{ scale: 1, y: 0, opacity: 1 }}
                exit={{ scale: 0.75, y: 50, opacity: 0 }}
                transition={{ type: 'spring', stiffness: 280, damping: 22 }}
                className={`relative w-full max-w-md rounded-3xl p-9 text-center border shadow-2xl ${isDark ? 'bg-gradient-to-b from-slate-900 to-slate-800 border-orange-600/50' : 'bg-white border-orange-200 shadow-orange-100/60'}`}
                onClick={(e) => e.stopPropagation()}
              >
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.25, type: 'spring' }}
                  className="text-8xl mb-6"
                >
                  🎉
                </motion.div>

                <h2 className={`text-3xl font-bold mb-4 ${isDark ? 'text-orange-400' : 'text-orange-600'}`}>
                  Great Job Victor!
                </h2>

                <p className={`text-lg mb-9 leading-relaxed ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                  Receipt uploaded successfully.<br />
                  Our team will verify it soon — thank you!
                </p>

                <button
                  onClick={() => setShowSuccessPopup(false)}
                  className={`px-10 py-4 rounded-xl font-bold text-lg shadow-lg transform hover:scale-105 transition ${isDark ? 'bg-gradient-to-r from-orange-600 to-orange-500 hover:from-orange-500 hover:to-orange-400 text-white' : 'bg-gradient-to-r from-orange-600 to-orange-700 hover:from-orange-700 hover:to-orange-800 text-white'}`}
                >
                  Close
                </button>

                <button
                  onClick={() => setShowSuccessPopup(false)}
                  className="absolute top-5 right-5 text-2xl text-gray-400 hover:text-gray-200 transition"
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