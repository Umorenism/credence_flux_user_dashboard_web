






// // // src/pages/GetStarted.js
// // import React from 'react';
// // import { motion } from 'framer-motion';
// // import { useNavigate } from 'react-router-dom';

// // const cryptoIcons = [
// //   { name: 'Bitcoin', color: '#f7931a', symbol: '₿' }, // Bitcoin orange
// //   { name: 'Ethereum', color: '#f7931a', symbol: 'Ξ' }, // Changed to orange
// //   { name: 'Solana', color: '#f7931a', symbol: '◈' }, // Changed to orange
// //   { name: 'Binance', color: '#f7931a', symbol: 'BNB' }, // Changed to orange
// //   { name: 'Cardano', color: '#f7931a', symbol: 'ADA' }, // Changed to orange
// //   { name: 'Polygon', color: '#f7931a', symbol: 'MATIC' }, // Changed to orange
// // ];

// // const GetStarted = () => {
// //   const navigate = useNavigate();

// //   const handleGetStarted = () => {
// //     navigate('/signup');
// //   };

// //   return (
// //     <div className="min-h-screen bg-black text-white overflow-hidden relative flex items-center justify-center">
// //       {/* Enhanced Grid Background with Circuit Feel */}
// //       <div className="absolute inset-0 bg-[linear-gradient(to_right,#0f0f0f_1px,transparent_1px),linear-gradient(to_bottom,#0f0f0f_1px,transparent_1px)] bg-[size:50px_50px] opacity-40" />
      
// //       {/* Matrix Rain / Falling Code Lines (Robotic Precision) */}
// //       <div className="absolute inset-0 pointer-events-none">
// //         {[...Array(15)].map((_, i) => (
// //           <motion.div
// //             key={`rain-${i}`}
// //             className="absolute w-px bg-gradient-to-b from-orange-500 to-transparent opacity-30"
// //             style={{
// //               left: `${Math.random() * 100}%`,
// //               height: '200px',
// //             }}
// //             animate={{ y: [0, window.innerHeight + 200] }}
// //             transition={{
// //               duration: 10 + i * 2,
// //               repeat: Infinity,
// //               ease: "linear",
// //               delay: i * 0.5,
// //             }}
// //           />
// //         ))}
// //       </div>

// //       {/* Particle Field Background (Robotic Nano Particles) */}
// //       <div className="absolute inset-0 pointer-events-none">
// //         {[...Array(80)].map((_, i) => (
// //           <motion.div
// //             key={`particle-${i}`}
// //             className="absolute w-1 h-1 bg-orange-400 rounded-full opacity-60 blur-sm"
// //             style={{
// //               top: `${Math.random() * 100}%`,
// //               left: `${Math.random() * 100}%`,
// //             }}
// //             animate={{
// //               x: [0, Math.random() * 200 - 100, 0],
// //               y: [0, Math.random() * 200 - 100, 0],
// //               scale: [1, 1.5, 1],
// //               opacity: [0.4, 0.8, 0.4],
// //             }}
// //             transition={{
// //               duration: 15 + i * 0.2,
// //               repeat: Infinity,
// //               ease: "easeInOut",
// //             }}
// //           />
// //         ))}
// //       </div>

// //       {/* Floating & Rotating Crypto Coins (Main New Animation) */}
// //       <div className="absolute inset-0 pointer-events-none">
// //         {[...Array(12)].map((_, i) => {
// //           const coin = cryptoIcons[i % cryptoIcons.length];
// //           return (
// //             <motion.div
// //               key={`coin-${i}`}
// //               className="absolute text-6xl font-bold flex items-center justify-center"
// //               style={{
// //                 top: `${Math.random() * 100}%`,
// //                 left: `${Math.random() * 100}%`,
// //                 filter: 'drop-shadow(0 0 20px currentColor)',
// //                 color: coin.color,
// //               }}
// //               animate={{
// //                 x: [0, 150, -150, 0],
// //                 y: [0, -150, 150, 0],
// //                 rotateY: [0, 360],
// //                 rotateZ: [0, 180],
// //                 scale: [0.8, 1.2, 0.8],
// //               }}
// //               transition={{
// //                 duration: 25 + i * 3,
// //                 repeat: Infinity,
// //                 ease: "linear",
// //                 delay: i * 1.5,
// //               }}
// //             >
// //               <span className="relative">
// //                 {coin.symbol}
// //                 <motion.div
// //                   className="absolute inset-0 rounded-full blur-xl opacity-50"
// //                   style={{ backgroundColor: coin.color }}
// //                   animate={{ scale: [1, 1.4, 1] }}
// //                   transition={{ duration: 4, repeat: Infinity }}
// //                 />
// //               </span>
// //             </motion.div>
// //           );
// //         })}
// //       </div>

// //       {/* Robotic Geometric Nodes (Circuit Connections) */}
// //       <div className="absolute inset-0 pointer-events-none">
// //         {[...Array(20)].map((_, i) => (
// //           <motion.div
// //             key={`node-${i}`}
// //             className="absolute w-4 h-4 bg-orange-500 rounded-full opacity-40 blur-md"
// //             style={{
// //               top: `${Math.random() * 100}%`,
// //               left: `${Math.random() * 100}%`,
// //             }}
// //             animate={{
// //               scale: [1, 1.8, 1],
// //               opacity: [0.3, 0.8, 0.3],
// //             }}
// //             transition={{
// //               duration: 8 + i,
// //               repeat: Infinity,
// //               ease: "easeInOut",
// //             }}
// //           />
// //         ))}
// //       </div>

// //       {/* Main Content */}
// //       <div className="relative z-10 text-center px-6 max-w-5xl">
// //         {/* Advanced Glitchy Holographic Title */}
// //         <motion.h1
// //           className="text-5xl md:text-9xl font-extrabold tracking-tight mb-8"
// //           initial={{ opacity: 0, y: -120 }}
// //           animate={{ opacity: 1, y: 0 }}
// //           transition={{ duration: 1.5, ease: "easeOut" }}
// //         >
// //           <span className="relative inline-block">
// //             <span className="bg-clip-text text-transparent bg-gradient-to-r from-orange-400 via-orange-500 to-orange-600">
// //               CREDENCEFLUX
// //             </span>
// //             {/* Glitch Layers */}
// //             <motion.span
// //               className="absolute inset-0 bg-clip-text text-transparent bg-gradient-to-r from-orange-400 to-orange-600 opacity-70"
// //               animate={{ x: [-5, 5, 0], y: [-3, 3, 0] }}
// //               transition={{ duration: 0.2, repeat: Infinity, repeatDelay: 4 }}
// //             >
// //               CREDENCEFLUX
// //             </motion.span>
// //             <motion.span
// //               className="absolute inset-0 bg-clip-text text-transparent bg-gradient-to-r from-orange-600 to-orange-400 opacity-70"
// //               animate={{ x: [5, -5, 0], y: [3, -3, 0] }}
// //               transition={{ duration: 0.2, repeat: Infinity, repeatDelay: 4, delay: 0.1 }}
// //             >
// //               CREDENCEFLUX
// //             </motion.span>
// //           </span>

// //           <motion.span
// //             className="block text-4xl md:text-7xl mt-6 font-mono text-orange-300"
// //             animate={{
// //               textShadow: [
// //                 "0 0 20px #ff6600, 0 0 40px #ff6600",
// //                 "0 0 40px #ff6600, 0 0 80px #ff6600",
// //                 "0 0 20px #ff6600, 0 0 40px #ff6600",
// //               ],
// //             }}
// //             transition={{ duration: 3, repeat: Infinity }}
// //           >
// //             FUTURE OF CRYPTO
// //           </motion.span>
// //         </motion.h1>

// //         <motion.p
// //           className="text-2xl md:text-3xl mb-16 text-gray-200 font-light tracking-wider"
// //           initial={{ opacity: 0 }}
// //           animate={{ opacity: 1 }}
// //           transition={{ delay: 1, duration: 2 }}
// //         >
// //           Robotic precision meets decentralized power.<br />
// //           Secure transactions. Lightning speed. AI-driven flux.
// //         </motion.p>

// //         {/* Enhanced Pulsing Neon Button */}
// //         <motion.button
// //           onClick={handleGetStarted}
// //           className="relative px-16 py-3 text-2xl font-bold tracking-widest uppercase bg-transparent border-4 border-orange-500 text-orange-300 rounded-2xl overflow-hidden group"
// //           initial={{ scale: 0.9, opacity: 0 }}
// //           animate={{ scale: 1, opacity: 1 }}
// //           transition={{ delay: 1.5, duration: 1 }}
// //           whileHover={{ scale: 1.15 }}
// //           whileTap={{ scale: 0.95 }}
// //         >
// //           <span className="relative z-10">Get Started</span>
// //           <motion.div
// //             className="absolute inset-0 bg-gradient-to-r from-orange-600 via-orange-700 to-orange-800 opacity-0 group-hover:opacity-100"
// //             animate={{ x: ["-100%", "100%"] }}
// //             transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
// //           />
// //           <motion.div
// //             className="absolute inset-0"
// //             animate={{
// //               boxShadow: [
// //                 "0 0 30px #ff6600",
// //                 "0 0 60px #ff6600",
// //                 "0 0 30px #ff6600",
// //               ],
// //             }}
// //             transition={{ duration: 2, repeat: Infinity }}
// //           />
// //         </motion.button>

// //         {/* Holographic Scan Line */}
// //         <motion.div
// //           className="absolute bottom-0 left-0 right-0 h-2 bg-gradient-to-r from-transparent via-orange-500 to-transparent opacity-70 blur-md"
// //           animate={{ y: [window.innerHeight, -window.innerHeight] }}
// //           transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
// //         />
// //       </div>
// //     </div>
// //   );
// // };

// // export default GetStarted;






// // src/pages/GetStarted.js
// import React from 'react';
// import { motion } from 'framer-motion';
// import { useNavigate } from 'react-router-dom';
// import { MarketOverview } from 'react-ts-tradingview-widgets'; // Install: npm i react-ts-tradingview-widgets

// const cryptoIcons = [
//   { name: 'Bitcoin', color: '#f7931a', symbol: '₿' },
//   { name: 'Ethereum', color: '#627eea', symbol: 'Ξ' },
//   { name: 'Solana', color: '#a100f2', symbol: '◈' },
//   { name: 'BNB', color: '#f0b90b', symbol: 'BNB' },
//   { name: 'Cardano', color: '#0033ad', symbol: 'ADA' },
//   { name: 'Polygon', color: '#8247e5', symbol: 'MATIC' },
// ];

// const Section = ({ id, children, className = '' }) => (
//   <motion.section
//     id={id}
//     initial={{ opacity: 0, y: 60 }}
//     whileInView={{ opacity: 1, y: 0 }}
//     viewport={{ once: true, margin: "-100px" }}
//     transition={{ duration: 0.9 }}
//     className={`py-16 md:py-24 px-6 ${className}`}
//   >
//     {children}
//   </motion.section>
// );

// const GetStarted = () => {
//   const navigate = useNavigate();

//   const handleGetStarted = () => {
//     navigate('/signup');
//   };

//   return (
//     <div className="min-h-screen bg-black text-white overflow-x-hidden relative">
//       {/* Background Layers */}
//       <div className="fixed inset-0 pointer-events-none">
//         {/* Grid Circuit */}
//         <div className="absolute inset-0 bg-[linear-gradient(to_right,#0a0a0a_1px,transparent_1px),linear-gradient(to_bottom,#0a0a0a_1px,transparent_1px)] bg-[size:60px_60px] opacity-50" />

//         {/* Matrix-style falling lines */}
//         {[...Array(18)].map((_, i) => (
//           <motion.div
//             key={`line-${i}`}
//             className="absolute w-px bg-gradient-to-b from-orange-600/40 via-orange-400/20 to-transparent"
//             style={{ left: `${Math.random() * 100}%` }}
//             initial={{ y: -300, opacity: 0.3 }}
//             animate={{ y: '100vh', opacity: [0.3, 0.8, 0.3] }}
//             transition={{
//               duration: 12 + Math.random() * 8,
//               repeat: Infinity,
//               delay: i * 0.4,
//               ease: 'linear',
//             }}
//           />
//         ))}

//         {/* Floating particles */}
//         {[...Array(60)].map((_, i) => (
//           <motion.div
//             key={`p-${i}`}
//             className="absolute w-1.5 h-1.5 bg-orange-400/60 rounded-full blur-sm"
//             style={{
//               top: `${Math.random() * 100}%`,
//               left: `${Math.random() * 100}%`,
//             }}
//             animate={{
//               x: [0, (Math.random() - 0.5) * 180, 0],
//               y: [0, (Math.random() - 0.5) * 180, 0],
//               scale: [1, 1.4, 1],
//             }}
//             transition={{
//               duration: 18 + i * 0.3,
//               repeat: Infinity,
//               ease: 'easeInOut',
//             }}
//           />
//         ))}

//         {/* Floating crypto symbols - less aggressive */}
//         {[...Array(10)].map((_, i) => {
//           const coin = cryptoIcons[i % cryptoIcons.length];
//           return (
//             <motion.div
//               key={`coin-${i}`}
//               className="absolute text-5xl md:text-7xl font-black flex items-center justify-center pointer-events-none select-none"
//               style={{
//                 top: `${20 + Math.random() * 60}%`,
//                 left: `${10 + Math.random() * 80}%`,
//                 color: coin.color,
//                 filter: `drop-shadow(0 0 25px ${coin.color}80)`,
//               }}
//               animate={{
//                 y: [0, -40, 40, 0],
//                 rotate: [0, 12, -12, 0],
//                 scale: [0.9, 1.1, 0.9],
//               }}
//               transition={{
//                 duration: 18 + i * 2,
//                 repeat: Infinity,
//                 ease: 'easeInOut',
//               }}
//             >
//               {coin.symbol}
//             </motion.div>
//           );
//         })}
//       </div>

//       {/* Hero Section */}
//       <Section id="hero" className="min-h-screen flex items-center justify-center relative z-10">
//         <div className="text-center max-w-5xl">
//           <motion.h1
//             className="text-6xl md:text-9xl font-black tracking-tighter mb-6"
//             initial={{ opacity: 0, scale: 0.8 }}
//             animate={{ opacity: 1, scale: 1 }}
//             transition={{ duration: 1.4 }}
//           >
//             <span className="bg-clip-text text-transparent bg-gradient-to-r from-orange-400 via-orange-500 to-orange-600">
//               CREDENCEFLUX
//             </span>
//           </motion.h1>

//           <motion.p
//             className="text-2xl md:text-4xl font-light text-orange-200/90 mb-12 tracking-wide"
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 1 }}
//             transition={{ delay: 0.6, duration: 1.2 }}
//           >
//             Robotic Precision × Decentralized Flux
//           </motion.p>

//           <motion.button
//             onClick={handleGetStarted}
//             className="group relative px-12 py-5 text-xl md:text-2xl font-bold uppercase tracking-widest bg-gradient-to-r from-orange-700 to-orange-500 rounded-xl border-2 border-orange-400/50 overflow-hidden shadow-2xl shadow-orange-900/40"
//             whileHover={{ scale: 1.08 }}
//             whileTap={{ scale: 0.96 }}
//           >
//             <span className="relative z-10">Launch Your Flux</span>
//             <motion.div
//               className="absolute inset-0 bg-gradient-to-r from-orange-600 to-orange-400 opacity-0 group-hover:opacity-80"
//               initial={{ x: '-100%' }}
//               whileHover={{ x: '100%' }}
//               transition={{ duration: 0.6 }}
//             />
//           </motion.button>
//         </div>
//       </Section>

//       {/* Section 2: Core Features */}
//       <Section id="features" className="bg-gradient-to-b from-black via-gray-950 to-black">
//         <div className="max-w-6xl mx-auto text-center">
//           <h2 className="text-5xl font-bold mb-16 bg-clip-text text-transparent bg-gradient-to-r from-orange-400 to-orange-600">
//             Robotic Architecture
//           </h2>
//           <div className="grid md:grid-cols-3 gap-10">
//             {['AI-Driven Execution', 'Quantum-Safe Security', 'Lightning Protocol'].map((title, i) => (
//               <motion.div
//                 key={title}
//                 className="p-8 border border-orange-900/40 rounded-2xl bg-black/40 backdrop-blur-sm"
//                 initial={{ opacity: 0, y: 40 }}
//                 whileInView={{ opacity: 1, y: 0 }}
//                 transition={{ delay: i * 0.2 }}
//               >
//                 <h3 className="text-2xl font-bold text-orange-400 mb-4">{title}</h3>
//                 <p className="text-gray-300">Engineered for speed, precision, and unbreakable trust in the decentralized era.</p>
//               </motion.div>
//             ))}
//           </div>
//         </div>
//       </Section>

//       {/* Section 3: Live Crypto Market Chart */}
//       <Section id="market" className="bg-black">
//         <div className="max-w-7xl mx-auto">
//           <h2 className="text-5xl font-bold text-center mb-12 bg-clip-text text-transparent bg-gradient-to-r from-orange-500 to-orange-300">
//             Live Market Flux
//           </h2>
//           <div className="h-[600px] w-full rounded-2xl overflow-hidden border border-orange-900/50 shadow-2xl shadow-orange-950/40">
//             <MarketOverview
//               colorTheme="dark"
//               height="100%"
//               width="100%"
//               showFloatingTooltip
//               showDateRange
//               locale="en"
//             />
//           </div>
//           <p className="text-center mt-6 text-gray-400 text-lg">
//             Real-time prices, 24h changes & top crypto overview — powered by TradingView
//           </p>
//         </div>
//       </Section>

//       {/* Section 4: How It Works */}
//       <Section id="how" className="bg-gradient-to-b from-black to-gray-950">
//         <div className="max-w-5xl mx-auto text-center">
//           <h2 className="text-5xl font-bold mb-16 text-orange-400">Flux Activation Sequence</h2>
//           <div className="grid md:grid-cols-4 gap-8">
//             {['Connect Wallet', 'Verify Identity', 'Deposit Flux', 'Start Trading'].map((step, i) => (
//               <motion.div
//                 key={step}
//                 className="p-6 border border-orange-800/30 rounded-xl bg-black/50"
//                 whileHover={{ scale: 1.05, borderColor: '#f97316' }}
//               >
//                 <div className="text-4xl font-black text-orange-600 mb-4">{i + 1}</div>
//                 <h4 className="text-xl font-bold">{step}</h4>
//               </motion.div>
//             ))}
//           </div>
//         </div>
//       </Section>

//       {/* Section 5: Security */}
//       <Section id="security" className="bg-black">
//         <div className="max-w-4xl mx-auto text-center">
//           <h2 className="text-5xl font-bold mb-10 text-orange-500">Unbreakable Robotic Shield</h2>
//           <p className="text-2xl text-gray-200 mb-12">
//             End-to-end encryption • Multi-sig vaults • AI anomaly detection • Zero-knowledge proofs
//           </p>
//           <motion.div
//             className="inline-block px-10 py-6 text-xl font-bold border-2 border-orange-600 rounded-full bg-gradient-to-r from-orange-950 to-black"
//             animate={{ boxShadow: ['0 0 20px #ea580c', '0 0 50px #c2410c', '0 0 20px #ea580c'] }}
//             transition={{ duration: 4, repeat: Infinity }}
//           >
//             Security Level: Quantum Resistant
//           </motion.div>
//         </div>
//       </Section>

//       {/* Section 6: Stats / Trust Signals */}
//       <Section id="stats" className="bg-gradient-to-b from-gray-950 to-black">
//         <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-10 text-center">
//           {[
//             { num: '99.99%', label: 'Uptime' },
//             { num: '$2.4B+', label: 'Flux Processed' },
//             { num: '150K+', label: 'Robotic Agents' },
//           ].map((stat, i) => (
//             <motion.div
//               key={stat.label}
//               initial={{ opacity: 0, scale: 0.8 }}
//               whileInView={{ opacity: 1, scale: 1 }}
//               transition={{ delay: i * 0.3 }}
//             >
//               <div className="text-6xl font-black text-orange-400 mb-3">{stat.num}</div>
//               <div className="text-xl text-gray-300">{stat.label}</div>
//             </motion.div>
//           ))}
//         </div>
//       </Section>

//       {/* Section 7: Final CTA */}
//       <Section id="cta" className="min-h-[60vh] flex items-center justify-center bg-black relative z-10">
//         <div className="text-center">
//           <motion.h2
//             className="text-5xl md:text-7xl font-black mb-10 bg-clip-text text-transparent bg-gradient-to-r from-orange-400 to-orange-600"
//             animate={{ textShadow: ['0 0 30px #f97316', '0 0 60px #c2410c'] }}
//             transition={{ duration: 3, repeat: Infinity, repeatType: 'reverse' }}
//           >
//             Ready to Flux?
//           </motion.h2>
//           <motion.button
//             onClick={handleGetStarted}
//             className="px-16 py-6 text-3xl font-bold uppercase bg-gradient-to-r from-orange-600 to-orange-400 rounded-full shadow-2xl shadow-orange-900/60"
//             whileHover={{ scale: 1.1, boxShadow: '0 0 60px #f97316' }}
//             whileTap={{ scale: 0.95 }}
//           >
//             Initialize Now
//           </motion.button>
//         </div>
//       </Section>

//       {/* Global Scan Line Overlay */}
//       <motion.div
//         className="fixed inset-0 pointer-events-none bg-gradient-to-b from-transparent via-orange-500/10 to-transparent blur-md z-20"
//         animate={{ y: ['-100%', '100%'] }}
//         transition={{ duration: 18, repeat: Infinity, ease: 'linear' }}
//       />
//     </div>
//   );
// };

// export default GetStarted;




// // src/pages/GetStarted.js
// // src/pages/GetStarted.js
// import React from 'react';
// import { motion } from 'framer-motion';
// import { useNavigate } from 'react-router-dom';
// import { MarketOverview } from 'react-ts-tradingview-widgets';

// const pairs = [
//   { pair: 'BTC/USDT', change: '+4.82%', color: '#10b981' },
//   { pair: 'ETH/USDT', change: '-1.34%', color: '#ef4444' },
//   { pair: 'SOL/USDT', change: '+12.7%', color: '#10b981' },
//   { pair: 'BNB/USDT', change: '+3.19%', color: '#10b981' },
//   { pair: 'XRP/USDT', change: '-0.89%', color: '#ef4444' },
//   { pair: 'ADA/USDT', change: '+7.41%', color: '#10b981' },
// ];

// const topTraders = [
//   { rank: 1, name: 'NEUROPH4NT0M', profit: '+384.2%', trades: 1247, avatar: '⚡' },
//   { rank: 2, name: 'FLUXSH4D0W', profit: '+312.9%', trades: 891, avatar: '⛓️' },
//   { rank: 3, name: 'QUANTKRAKEN', profit: '+267.8%', trades: 1563, avatar: '🌀' },
//   { rank: 4, name: 'CYBERHAWK', profit: '+219.4%', trades: 732, avatar: '⚙️' },
//   { rank: 5, name: 'VOIDTRADER_X', profit: '+198.7%', trades: 1041, avatar: '⌖' },
// ];

// const recentPayments = [
//   { time: '2m ago', user: '0xA7...9fD2', amount: '12.84 ETH', type: 'Deposit' },
//   { time: '7m ago', user: '0xF3...c81B', amount: '4500 USDT', type: 'Withdrawal' },
//   { time: '14m ago', user: '0x9e...2aD4', amount: '8.21 SOL', type: 'Deposit' },
//   { time: '19m ago', user: '0x4B...e7f9', amount: '1.2 BTC', type: 'Deposit' },
//   { time: '31m ago', user: '0xD1...8bC3', amount: '9800 USDT', type: 'Withdrawal' },
// ];

// const GetStarted = () => {
//   const navigate = useNavigate();
//   const handleGetStarted = () => navigate('/signup');

//   return (
//     <div className="min-h-screen bg-black text-white overflow-x-hidden relative font-mono">
//       {/* Circuit grid background */}
//       <div className="fixed inset-0 pointer-events-none">
//         <div className="absolute inset-0 bg-[linear-gradient(to_right,#0a0a0a_1px,transparent_1px),linear-gradient(to_bottom,#0a0a0a_1px,transparent_1px)] bg-[size:80px_80px] opacity-60" />
//       </div>

//       {/* Holographic scan line */}
//       <motion.div
//         className="fixed inset-0 pointer-events-none bg-gradient-to-b from-transparent via-orange-600/15 to-transparent blur-md z-50"
//         animate={{ y: ['-120%', '120%'] }}
//         transition={{ duration: 16, repeat: Infinity, ease: 'linear' }}
//       />

//       {/* ────────────────────────────────────────────────
//           HERO SECTION – Strong opening statement
//       ──────────────────────────────────────────────── */}
//       <section className="min-h-screen flex items-center justify-center relative z-10 px-6 py-16">
//         <div className="text-center max-w-5xl">
//           <motion.div
//             initial={{ opacity: 0, y: 40 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ duration: 1.1 }}
//           >
//             <motion.h1
//               className="text-6xl sm:text-8xl md:text-9xl lg:text-[10rem] font-black tracking-[-0.06em] mb-6 leading-none"
//               animate={{ textShadow: ['0 0 40px #f97316aa', '0 0 80px #c2410caa', '0 0 40px #f97316aa'] }}
//               transition={{ duration: 6, repeat: Infinity, repeatType: 'reverse' }}
//             >
//               <span className="bg-clip-text text-transparent bg-gradient-to-r from-orange-400 via-orange-500 to-orange-600">
//                 CREDENCE <span className='text-white'>FLUX</span>
//               </span>
//             </motion.h1>

//             <p className="text-xl sm:text-2xl md:text-3xl lg:text-4xl text-orange-200/90 mb-10 tracking-wide font-light">
//               Next-generation crypto execution layer
//               <br className="hidden sm:block" />
//               <span className="text-orange-400/80">— precision-engineered. AI-augmented. Unstoppable.</span>
//             </p>

//             <motion.div
//               className="flex flex-col sm:flex-row gap-6 justify-center items-center"
//               initial={{ opacity: 0, y: 30 }}
//               animate={{ opacity: 1, y: 0 }}
//               transition={{ delay: 0.6, duration: 0.9 }}
//             >
//               <motion.button
//                 onClick={handleGetStarted}
//                 className="px-12 sm:px-16 py-5 sm:py-6 text-xl sm:text-2xl font-black uppercase tracking-widest bg-gradient-to-r from-orange-700 to-orange-500 rounded-xl border-2 border-orange-400/60 shadow-2xl shadow-orange-900/60"
//                 whileHover={{ scale: 1.07, boxShadow: '0 0 60px #f97316cc' }}
//                 whileTap={{ scale: 0.96 }}
//               >
//                 Get Started →
//               </motion.button>

//               <motion.a
//                 href="#market"
//                 className="text-orange-400 hover:text-orange-300 transition-colors text-lg sm:text-xl underline underline-offset-4 decoration-orange-600/40"
//               >
//                 Watch live flux →
//               </motion.a>
//             </motion.div>

//             <p className="mt-12 text-gray-500 text-sm sm:text-base">
//               24/7 • Non-custodial • Quantum-resistant security
//             </p>
//           </motion.div>
//         </div>
//       </section>

//       {/* ────────────────────────────────────────────────
//           ACTIVE PAIRS – Visual heartbeat of the market
//       ──────────────────────────────────────────────── */}
//       <section className="py-20 px-6 relative z-10 bg-gradient-to-b from-black via-gray-950/80 to-black">
//         <div className="max-w-7xl mx-auto">
//           <div className="text-center mb-16">
//             <h2 className="text-4xl sm:text-5xl font-black text-orange-400 tracking-tight mb-4">
//               HIGH-VOLUME FLUX CHANNELS
//             </h2>
//             <p className="text-xl text-gray-400 max-w-3xl mx-auto">
//               Real-time order flow. Deep liquidity. Instant execution.
//               <br />These are the arteries where CredenceFlux thrives.
//             </p>
//           </div>

//           <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 sm:gap-6">
//             {pairs.map((item, i) => (
//               <motion.div
//                 key={item.pair}
//                 className="p-5 sm:p-6 bg-black/60 border border-orange-900/50 rounded-xl text-center backdrop-blur-sm"
//                 initial={{ opacity: 0, y: 40 }}
//                 whileInView={{ opacity: 1, y: 0 }}
//                 viewport={{ once: true }}
//                 transition={{ delay: i * 0.08, duration: 0.6 }}
//                 whileHover={{ scale: 1.06, borderColor: '#f97316' }}
//               >
//                 <div className="text-2xl sm:text-3xl font-black text-orange-300 mb-2">{item.pair}</div>
//                 <div className="text-xl sm:text-2xl font-bold" style={{ color: item.color }}>
//                   {item.change}
//                 </div>
//               </motion.div>
//             ))}
//           </div>
//         </div>
//       </section>

//       {/* ────────────────────────────────────────────────
//           LIVE MARKET CORE – Most important visual block
//       ──────────────────────────────────────────────── */}
//       <section id="market" className="py-20 px-6 bg-black relative z-10">
//         <div className="max-w-7xl mx-auto">
//           <div className="text-center mb-10">
//             <h2 className="text-4xl sm:text-5xl font-black text-orange-500 mb-4">
//               GLOBAL MARKET NEURAL CORE
//             </h2>
//             <p className="text-xl text-gray-400 max-w-3xl mx-auto">
//               Every tick. Every move. Every opportunity — visualized in real time.
//             </p>
//           </div>

//           <div className="flex flex-col items-center gap-4 mb-8">
//             <div className="flex items-center gap-3 text-orange-400/90 text-lg font-medium">
//               <motion.div
//                 className="w-4 h-4 rounded-full bg-green-500 shadow-lg shadow-green-500/60"
//                 animate={{ scale: [1, 1.5, 1] }}
//                 transition={{ duration: 2.2, repeat: Infinity }}
//               />
//               <span>LIVE DATA STREAM ACTIVE</span>
//             </div>
//             <p className="text-gray-500 text-sm">
//               Streaming directly from institutional-grade feeds • Updates every few seconds
//             </p>
//           </div>

//           <div className="h-[500px] sm:h-[640px] rounded-2xl overflow-hidden border border-orange-900/60 shadow-2xl shadow-orange-950/50">
//             <MarketOverview
//               colorTheme="dark"
//               height="100%"
//               width="100%"
//               showFloatingTooltip
//               locale="en"
//             />
//           </div>
//         </div>
//       </section>

//       {/* ────────────────────────────────────────────────
//           ELITE OPERATORS – Social proof & aspiration
//       ──────────────────────────────────────────────── */}
//       <section className="py-20 px-6 bg-gradient-to-b from-gray-950 to-black relative z-10">
//         <div className="max-w-7xl mx-auto">
//           <div className="text-center mb-16">
//             <h2 className="text-4xl sm:text-5xl font-black text-orange-400 mb-4">
//               LEGENDARY FLUX EXECUTORS
//             </h2>
//             <p className="text-xl text-gray-400 max-w-3xl mx-auto">
//               These operators consistently outperform the market using CredenceFlux infrastructure.
//               <br className="hidden sm:block" />
//               Join them. Rewrite your edge.
//             </p>
//           </div>

//           <div className="relative overflow-hidden pb-4">
//             <motion.div
//               className="flex gap-6"
//               animate={{ x: [0, -3200] }}
//               transition={{ duration: 65, repeat: Infinity, ease: 'linear' }}
//             >
//               {[...topTraders, ...topTraders].map((trader, i) => (
//                 <motion.div
//                   key={`${trader.name}-${i}`}
//                   className="min-w-[300px] sm:min-w-[340px] p-6 bg-black/70 border border-orange-900/50 rounded-2xl backdrop-blur-sm"
//                   whileHover={{ scale: 1.05, borderColor: '#f97316', boxShadow: '0 0 40px #f9731660' }}
//                 >
//                   <div className="text-6xl mb-4 text-center drop-shadow-lg">{trader.avatar}</div>
//                   <div className="text-2xl font-black text-orange-300 text-center mb-2">
//                     #{trader.rank} {trader.name}
//                   </div>
//                   <div className="text-center text-lg">
//                     <span className="text-green-400 font-bold text-xl">{trader.profit}</span>
//                     <span className="text-gray-400 block mt-1">({trader.trades} executions)</span>
//                   </div>
//                 </motion.div>
//               ))}
//             </motion.div>
//           </div>
//         </div>
//       </section>

//       {/* ────────────────────────────────────────────────
//           NETWORK TRANSACTIONS – Proof of activity
//       ──────────────────────────────────────────────── */}
//       <section className="py-20 px-6 bg-black relative z-10">
//         <div className="max-w-4xl mx-auto">
//           <div className="text-center mb-16">
//             <h2 className="text-4xl sm:text-5xl font-black text-orange-500 mb-4">
//               RECENT FLUX MOVEMENTS
//             </h2>
//             <p className="text-xl text-gray-400">
//               Live node activity. Real capital in motion. Right now.
//             </p>
//           </div>

//           <div className="space-y-4 sm:space-y-5 max-h-[520px] overflow-hidden relative">
//             <motion.div
//               className="space-y-4 sm:space-y-5"
//               animate={{ y: [0, -640] }}
//               transition={{ duration: 28, repeat: Infinity, ease: 'linear' }}
//             >
//               {[...recentPayments, ...recentPayments].map((tx, i) => (
//                 <motion.div
//                   key={i}
//                   className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 sm:gap-0 p-5 bg-gray-950/70 border border-orange-900/40 rounded-xl"
//                   initial={{ opacity: 0, x: -40 }}
//                   animate={{ opacity: 1, x: 0 }}
//                   transition={{ delay: i * 0.12 }}
//                 >
//                   <div>
//                     <div className="text-orange-300 font-bold text-lg">{tx.user}</div>
//                     <div className="text-gray-500 text-sm mt-1">{tx.time}</div>
//                   </div>
//                   <div className="text-right">
//                     <div className="text-xl font-bold text-orange-200">{tx.amount}</div>
//                     <div className="text-sm text-orange-600/80 mt-1">{tx.type}</div>
//                   </div>
//                 </motion.div>
//               ))}
//             </motion.div>

//             <div className="absolute inset-0 bg-gradient-to-b from-black via-transparent to-black pointer-events-none" />
//           </div>
//         </div>
//       </section>

//       {/* ────────────────────────────────────────────────
//           FINAL CTA – High urgency close
//       ──────────────────────────────────────────────── */}
//       <section className="min-h-[80vh] flex items-center justify-center relative z-10 px-6 py-20 bg-gradient-to-t from-black via-gray-950 to-black">
//         <div className="text-center max-w-4xl">
//           <motion.h2
//             className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black mb-10 bg-clip-text text-transparent bg-gradient-to-r from-orange-400 via-orange-500 to-orange-600"
//             animate={{ textShadow: ['0 0 50px #f97316', '0 0 100px #c2410c', '0 0 50px #f97316'] }}
//             transition={{ duration: 5, repeat: Infinity, repeatType: 'reverse' }}
//           >
//             The Flux Awaits You
//           </motion.h2>

//           <p className="text-xl sm:text-2xl text-gray-300 mb-12 max-w-3xl mx-auto leading-relaxed">
//             Zero excuses. Zero intermediaries. Pure execution power.
//             <br className="hidden sm:block" />
//             <span className="text-orange-400 font-semibold">Take control of your capital today.</span>
//           </p>

//           <motion.button
//             onClick={handleGetStarted}
//             className="px-16 sm:px-24 py-7 sm:py-8 text-2xl sm:text-3xl font-black uppercase bg-gradient-to-r from-orange-700 via-orange-600 to-orange-500 rounded-2xl border-2 border-orange-400/50 shadow-2xl shadow-orange-900/70"
//             whileHover={{ scale: 1.08, boxShadow: '0 0 100px #f97316cc' }}
//             whileTap={{ scale: 0.96 }}
//           >
//             EXECUTE SIGNUP PROTOCOL
//           </motion.button>

//           <p className="mt-10 text-gray-500 text-base sm:text-lg">
//             2-minute onboarding • No KYC for basic access • Start with $10
//           </p>
//         </div>
//       </section>
//     </div>
//   );
// };

// export default GetStarted;




// src/pages/GetStarted.js
import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import {
  MarketOverview,
  MiniChart,
  AdvancedRealTimeChart,
} from 'react-ts-tradingview-widgets';

const pairs = [
  { pair: 'BTC/USDT', change: '+4.82%', color: '#fbbf24' },
  { pair: 'ETH/USDT', change: '-1.34%', color: '#f97316' },
  { pair: 'SOL/USDT', change: '+12.7%', color: '#fbbf24' },
  { pair: 'BNB/USDT', change: '+3.19%', color: '#fbbf24' },
  { pair: 'XRP/USDT', change: '-0.89%', color: '#f97316' },
  { pair: 'ADA/USDT', change: '+7.41%', color: '#fbbf24' },
];

const topTraders = [
  { rank: 1, name: 'NEUROPH4NT0M', profit: '+384.2%', trades: 1247, avatar: '⚡' },
  { rank: 2, name: 'FLUXSH4D0W', profit: '+312.9%', trades: 891, avatar: '⛓️' },
  { rank: 3, name: 'QUANTKRAKEN', profit: '+267.8%', trades: 1563, avatar: '🌀' },
  { rank: 4, name: 'CYBERHAWK', profit: '+219.4%', trades: 732, avatar: '⚙️' },
  { rank: 5, name: 'VOIDTRADER_X', profit: '+198.7%', trades: 1041, avatar: '⌖' },
];

const recentPayments = [
  { time: '2m ago', user: '0xA7...9fD2', amount: '12.84 ETH', type: 'Deposit' },
  { time: '7m ago', user: '0xF3...c81B', amount: '4500 USDT', type: 'Withdrawal' },
  { time: '14m ago', user: '0x9e...2aD4', amount: '8.21 SOL', type: 'Deposit' },
  { time: '19m ago', user: '0x4B...e7f9', amount: '1.2 BTC', type: 'Deposit' },
  { time: '31m ago', user: '0xD1...8bC3', amount: '9800 USDT', type: 'Withdrawal' },
];

const marketCapsMini = [
  { symbol: 'BINANCE:BTCUSDT', name: 'Bitcoin', cap: '$1.88T' },
  { symbol: 'BINANCE:ETHUSDT', name: 'Ethereum', cap: '$367B' },
  { symbol: 'BINANCE:SOLUSDT', name: 'Solana', cap: '~$68B' },
  { symbol: 'BINANCE:XRPUSDT', name: 'XRP', cap: '~$125B' },
  { symbol: 'BINANCE:BNBUSDT', name: 'BNB', cap: '~$130B' },
  { symbol: 'BINANCE:ADAUSDT', name: 'Cardano', cap: '$39B' },
];

const steps = [
  { number: 1, icon: '🔗', title: 'CONNECT WALLET', desc: 'Establish secure link to MetaMask / WalletConnect node.' },
  { number: 2, icon: '🛡️', title: 'VERIFY IDENTITY', desc: 'Optional KYC protocol activation or anonymous flux entry.' },
  { number: 3, icon: '💰', title: 'DEPOSIT ASSETS', desc: 'Inject capital — crypto / fiat on-ramp vectors enabled.' },
  { number: 4, icon: '📊', title: 'SELECT PROTOCOL', desc: 'Configure spot / futures / AI-flux execution mode.' },
  { number: 5, icon: '🚀', title: 'EXECUTE & OBSERVE', desc: 'Deploy commands. Monitor neural feedback loop live.' },
];

const GetStarted = () => {
  const navigate = useNavigate();
  const handleGetStarted = () => navigate('/signup');

  return (
    <div className="min-h-screen bg-black text-white overflow-x-hidden relative font-mono">
      {/* Circuit grid */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#0f0f0f_1px,transparent_1px),linear-gradient(to_bottom,#0f0f0f_1px,transparent_1px)] bg-[size:60px_60px] opacity-70" />
      </div>

      {/* Orange scan line */}
      <motion.div
        className="fixed inset-0 pointer-events-none bg-gradient-to-b from-transparent via-orange-500/30 to-transparent blur-md z-50"
        animate={{ y: ['-150%', '150%'] }}
        transition={{ duration: 12, repeat: Infinity, ease: 'linear' }}
      />

      {/* Hero Section */}
      {/* <section className="min-h-screen flex items-center justify-center relative z-10 px-6 py-16">
        <div className="text-center max-w-6xl">
          <motion.div initial={{ opacity: 0, y: 60 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1.2 }}>
            <motion.h1
              className="text-7xl sm:text-9xl md:text-[10rem] lg:text-[12rem] font-black tracking-[-0.08em] mb-6 leading-none"
              animate={{
                textShadow: [
                  '0 0 30px #f97316, 0 0 60px #f97316aa',
                  '0 0 60px #fb923c, 0 0 120px #fb923caa',
                  '0 0 30px #f97316, 0 0 60px #f97316aa',
                ],
              }}
              transition={{ duration: 8, repeat: Infinity, repeatType: 'reverse' }}
            >
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-orange-400 via-orange-300 to-white">
                CREDENCE <span className='text-white'>FLUX</span>
              </span>
            </motion.h1>

            <p className="text-2xl sm:text-3xl md:text-4xl text-white/90 mb-12 tracking-widest font-light">
              ROBOTIC EXECUTION ENGINE
              <br className="hidden sm:block" />
              <span className="text-orange-400 font-normal">— precision • flux • dominance</span>
            </p>

            <motion.div
              className="flex flex-col sm:flex-row gap-8 justify-center items-center"
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7, duration: 1 }}
            >
              <motion.button
                onClick={handleGetStarted}
                className="px-16 py-6 text-2xl sm:text-3xl font-black uppercase tracking-widest bg-gradient-to-r from-orange-600 to-orange-400 rounded-xl border-2 border-orange-300/60 shadow-2xl shadow-orange-900/80"
                whileHover={{ scale: 1.08, boxShadow: '0 0 80px #f97316, 0 0 120px #fb923c' }}
                whileTap={{ scale: 0.96 }}
              >
                ACTIVATE NODE →
              </motion.button>

              <motion.a
                href="#market"
                className="text-orange-300 hover:text-white transition-colors text-xl underline underline-offset-8 decoration-orange-400/60"
              >
                observe live core →
              </motion.a>
            </motion.div>

            <p className="mt-12 text-orange-200/60 text-base sm:text-lg tracking-wide">
              24/7 UPTIME • NON-CUSTODIAL • QUANTUM SHIELD ACTIVE
            </p>
          </motion.div>
        </div>
      </section> */}

      <section className="min-h-screen flex items-center justify-center relative z-10 px-6 py-16 overflow-hidden">
  {/* Crypto Background Layers */}
  <div className="absolute inset-0 z-0 pointer-events-none">
    {/* Dark base gradient with crypto feel */}
    <div className="absolute inset-0 bg-gradient-to-b from-black via-gray-950 to-black opacity-95" />

    {/* Subtle crypto grid / circuit pattern */}
    <div
      className="absolute inset-0 opacity-30"
      style={{
        backgroundImage: `
          radial-gradient(circle at 10% 20%, rgba(251, 191, 36, 0.08) 0%, transparent 50%),
          radial-gradient(circle at 90% 80%, rgba(249, 115, 22, 0.06) 0%, transparent 50%),
          linear-gradient(to right, #0f0f0f 1px, transparent 1px),
          linear-gradient(to bottom, #0f0f0f 1px, transparent 1px)
        `,
        backgroundSize: '100px 100px, 100px 100px, 40px 40px, 40px 40px',
      }}
    />

    {/* Floating crypto particles / orbs */}
    {[...Array(12)].map((_, i) => (
      <motion.div
        key={i}
        className="absolute w-3 h-3 rounded-full bg-gradient-to-br from-orange-400 to-orange-600 blur-sm opacity-40"
        style={{
          top: `${Math.random() * 100}%`,
          left: `${Math.random() * 100}%`,
        }}
        animate={{
          y: [0, -80, 0],
          x: [0, Math.random() * 60 - 30, 0],
          scale: [1, 1.6, 1],
          opacity: [0.3, 0.7, 0.3],
        }}
        transition={{
          duration: 12 + Math.random() * 10,
          repeat: Infinity,
          delay: i * 0.8,
          ease: "easeInOut",
        }}
      />
    ))}

    {/* Very faint floating crypto symbols */}
    {['₿', 'Ξ', 'S', 'BNB', 'X', 'ADA', 'SOL'].map((symbol, i) => (
      <motion.div
        key={`symbol-${i}`}
        className="absolute text-5xl font-black text-orange-500/20 select-none pointer-events-none"
        style={{
          top: `${10 + Math.random() * 80}%`,
          left: `${5 + Math.random() * 90}%`,
        }}
        animate={{
          y: [0, -40, 40, 0],
          rotate: [0, 10, -10, 0],
          opacity: [0.15, 0.35, 0.15],
        }}
        transition={{
          duration: 20 + i * 3,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      >
        {symbol}
      </motion.div>
    ))}
  </div>

  {/* Main content - raised above background */}
  <div className="relative z-10 text-center max-w-6xl">
    <motion.div initial={{ opacity: 0, y: 60 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1.2 }}>
      <motion.h1
        className="text-7xl sm:text-9xl md:text-[10rem] lg:text-[12rem] font-black tracking-[-0.08em] mb-6 leading-none"
        animate={{
          textShadow: [
            '0 0 30px #f97316, 0 0 60px #f97316aa',
            '0 0 60px #fb923c, 0 0 120px #fb923caa',
            '0 0 30px #f97316, 0 0 60px #f97316aa',
          ],
        }}
        transition={{ duration: 8, repeat: Infinity, repeatType: 'reverse' }}
      >
        <span className="bg-clip-text text-transparent bg-gradient-to-r from-orange-400 via-orange-300 to-white">
          CREDENCE <span className="text-white">FLUX</span>
        </span>
      </motion.h1>

      <p className="text-2xl sm:text-3xl md:text-4xl text-white/90 mb-12 tracking-widest font-light">
        ROBOTIC EXECUTION ENGINE
        <br className="hidden sm:block" />
        <span className="text-orange-400 font-normal">— precision • flux • dominance</span>
      </p>

      <motion.div
        className="flex flex-col sm:flex-row gap-8 justify-center items-center"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.7, duration: 1 }}
      >
        <motion.button
          onClick={handleGetStarted}
          className="px-16 py-6 text-sm sm:text-3xl font-black uppercase tracking-widest bg-gradient-to-r from-orange-600 to-orange-400 rounded-xl border-2 border-orange-300/60 shadow-2xl shadow-orange-900/80"
          whileHover={{ scale: 1.08, boxShadow: '0 0 80px #f97316, 0 0 120px #fb923c' }}
          whileTap={{ scale: 0.96 }}
        >
          ACTIVATE NODE →
        </motion.button>

        <motion.a
          href="#market"
          className="text-orange-300 hover:text-white transition-colors text-xl underline underline-offset-8 decoration-orange-400/60"
        >
          observe live core →
        </motion.a>
      </motion.div>

      <p className="mt-12 text-orange-200/60 text-base sm:text-lg tracking-wide">
        24/7 UPTIME • NON-CUSTODIAL • QUANTUM SHIELD ACTIVE
      </p>
    </motion.div>
  </div>
</section>

      {/* Currency Pairs */}
      <section className="py-24 px-6 relative z-10 bg-gradient-to-b from-black to-gray-950">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-5xl sm:text-6xl font-black text-orange-400 tracking-tighter mb-4">
              ACTIVE FLUX PAIRS
            </h2>
            <p className="text-xl text-white/70 max-w-3xl mx-auto">
              High-frequency channels • Instant liquidity vectors
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-5">
            {pairs.map((item, i) => (
              <motion.div
                key={item.pair}
                className="p-6 bg-black/70 border border-orange-800/50 rounded-xl text-center backdrop-blur-md"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                whileHover={{ borderColor: '#fb923c', boxShadow: '0 0 25px #f9731660' }}
              >
                <div className="text-3xl font-black text-white mb-2">{item.pair}</div>
                <div className="text-2xl font-bold" style={{ color: item.color }}>
                  {item.change}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Market Caps + Moving Charts */}
      <section className="py-24 px-6 bg-black relative z-10">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-5xl sm:text-6xl font-black text-orange-400 tracking-tighter mb-4">
              LIVE MARKET CAP & MOVEMENT CORE
            </h2>
            <p className="text-xl text-white/70 max-w-3xl mx-auto">
              Total crypto flux + real-time price trajectories for dominant protocols
            </p>
          </div>

          {/* Total Market Cap Chart */}
          <div className="mb-16">
            <h3 className="text-3xl font-black text-orange-300 mb-6 text-center">
              TOTAL CRYPTO MARKET CAP (LIVE MOVEMENT)
            </h3>
            <div className="h-[400px] sm:h-[500px] rounded-2xl overflow-hidden border-2 border-orange-800/60 shadow-2xl shadow-orange-950/70">
              <AdvancedRealTimeChart
                symbol="CRYPTOCAP:TOTAL"
                theme="dark"
                locale="en"
                interval="1D"
                timezone="Etc/UTC"
                style="1"
                toolbar_bg="#000000"
                hide_side_toolbar={true}
                allow_symbol_change={false}
                save_image={false}
                details={true}
                hotlist={false}
                calendar={false}
              />
            </div>
            <p className="text-center mt-4 text-orange-200/70 text-sm">
              Global crypto market cap trajectory • Real-time updates
            </p>
          </div>

          {/* Mini Charts Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {marketCapsMini.map((coin, i) => (
              <motion.div
                key={coin.symbol}
                className="bg-black/70 border border-orange-800/50 rounded-2xl overflow-hidden backdrop-blur-md flex flex-col"
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.15 }}
                whileHover={{ borderColor: '#fb923c', boxShadow: '0 0 35px #f9731660' }}
              >
                <div className="p-5 border-b border-orange-800/40">
                  <div className="flex justify-between items-center mb-2">
                    <div className="text-2xl font-black text-orange-400">#{i + 1}</div>
                    <div className="text-3xl text-white">{coin.symbol.split(':')[1]?.replace('USDT', '') || coin.name}</div>
                  </div>
                  <div className="text-xl font-bold text-white">{coin.name}</div>
                  <div className="text-base text-orange-200 mt-1">Market Cap: {coin.cap}</div>
                </div>

                <div className="flex-1 min-h-[220px]">
                  <MiniChart
                    symbol={coin.symbol}
                    colorTheme="dark"
                    locale="en"
                    isTransparent={false}
                    autosize
                    largeChartUrl={false}
                  />
                </div>
              </motion.div>
            ))}
          </div>

          <p className="text-center mt-10 text-orange-200/60 text-base">
            Individual price movement charts • Live updates from exchange feeds
          </p>
        </div>
      </section>

      {/* Market Overview (secondary chart) */}
      <section id="market" className="py-24 px-6 bg-black relative z-10">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-5xl sm:text-6xl font-black text-orange-400 tracking-tighter mb-4">
              DETAILED MARKET NEURAL CORE
            </h2>
            <p className="text-xl text-white/70 max-w-3xl mx-auto">
              Full top coins overview with live flux metrics
            </p>
          </div>

          <div className="flex flex-col items-center gap-6 mb-10">
            <div className="flex items-center gap-4 text-orange-300 text-xl font-medium">
              <motion.div
                className="w-5 h-5 rounded-full bg-green-400 shadow-lg shadow-green-400/60"
                animate={{ scale: [1, 1.6, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              />
              LIVE STREAM PROTOCOL ACTIVE
            </div>
          </div>

          <div className="h-[600px] rounded-2xl overflow-hidden border-2 border-orange-800/60 shadow-2xl shadow-orange-950/70">
            <MarketOverview
              colorTheme="dark"
              height="100%"
              width="100%"
              showFloatingTooltip
              locale="en"
            />
          </div>
        </div>
      </section>

      {/* Steps Carousel */}
      <section className="py-24 px-6 bg-gradient-to-b from-gray-950 to-black relative z-10">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-5xl sm:text-6xl font-black text-orange-400 tracking-tighter mb-4">
              NODE ACTIVATION SEQUENCE
            </h2>
            <p className="text-xl text-white/70 max-w-3xl mx-auto">
              5-phase protocol • Minimal latency onboarding
            </p>
          </div>

          <div className="relative overflow-hidden pb-6">
            <motion.div
              className="flex gap-6"
              animate={{ x: [0, -2200] }}
              transition={{ duration: 55, repeat: Infinity, ease: 'linear' }}
            >
              {[...steps, ...steps].map((step, i) => (
                <motion.div
                  key={i}
                  className="min-w-[340px] p-8 bg-black/75 border border-orange-800/50 rounded-2xl backdrop-blur-md text-center"
                  whileHover={{ scale: 1.05, borderColor: '#fb923c', boxShadow: '0 0 40px #f9731660' }}
                >
                  <div className="text-7xl mb-6 text-orange-400 drop-shadow-lg">{step.icon}</div>
                  <div className="text-4xl font-black text-orange-300 mb-4">
                    PHASE {step.number}
                  </div>
                  <div className="text-2xl font-bold text-white mb-4">{step.title}</div>
                  <p className="text-white/80 text-base leading-relaxed">{step.desc}</p>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* Elite Operators */}
      <section className="py-24 px-6 bg-gradient-to-b from-black to-gray-950 relative z-10">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-5xl sm:text-6xl font-black text-orange-400 tracking-tighter mb-4">
              ELITE EXECUTION UNITS
            </h2>
            <p className="text-xl text-white/70 max-w-3xl mx-auto">
              Top flux operators • Proven performance matrix
            </p>
          </div>

          <div className="relative overflow-hidden pb-6">
            <motion.div
              className="flex gap-6"
              animate={{ x: [0, -3200] }}
              transition={{ duration: 70, repeat: Infinity, ease: 'linear' }}
            >
              {[...topTraders, ...topTraders].map((trader, i) => (
                <motion.div
                  key={`${trader.name}-${i}`}
                  className="min-w-[340px] p-6 bg-black/75 border border-orange-800/50 rounded-2xl backdrop-blur-md"
                  whileHover={{ scale: 1.05, borderColor: '#fb923c', boxShadow: '0 0 40px #f9731660' }}
                >
                  <div className="text-7xl mb-6 text-center text-orange-400 drop-shadow-lg">{trader.avatar}</div>
                  <div className="text-2xl font-black text-white text-center mb-3">
                    UNIT #{trader.rank} • {trader.name}
                  </div>
                  <div className="text-center text-xl">
                    <span className="text-green-400 font-bold">{trader.profit}</span>
                    <span className="text-white/60 block mt-2">({trader.trades} operations)</span>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* Network Transactions */}
      <section className="py-24 px-6 bg-black relative z-10">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-5xl sm:text-6xl font-black text-orange-400 tracking-tighter mb-4">
              LIVE TRANSACTION LOG
            </h2>
            <p className="text-xl text-white/70">
              Real-time flux movements • Node activity stream
            </p>
          </div>

          <div className="space-y-5 max-h-[560px] overflow-hidden relative">
            <motion.div
              className="space-y-5"
              animate={{ y: [0, -700] }}
              transition={{ duration: 32, repeat: Infinity, ease: 'linear' }}
            >
              {[...recentPayments, ...recentPayments].map((tx, i) => (
                <motion.div
                  key={i}
                  className="flex flex-col sm:flex-row justify-between items-start sm:items-center p-6 bg-gray-950/80 border border-orange-800/50 rounded-xl"
                  initial={{ opacity: 0, x: -50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.15 }}
                >
                  <div>
                    <div className="text-orange-300 font-bold text-xl">{tx.user}</div>
                    <div className="text-white/50 text-sm mt-1">{tx.time}</div>
                  </div>
                  <div className="text-right mt-3 sm:mt-0">
                    <div className="text-2xl font-bold text-white">{tx.amount}</div>
                    <div className="text-sm text-orange-400/80 mt-1">{tx.type}</div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
            <div className="absolute inset-0 bg-gradient-to-b from-black via-transparent to-black pointer-events-none" />
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="min-h-[90vh] flex items-center justify-center relative z-10 px-6 py-24 bg-gradient-to-t from-black to-gray-950">
        <div className="text-center max-w-5xl">
          <motion.h2
            className="text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-black mb-12 bg-clip-text text-transparent bg-gradient-to-r from-orange-400 via-orange-300 to-white"
            animate={{
              textShadow: [
                '0 0 60px #f97316, 0 0 120px #fb923c',
                '0 0 100px #f97316, 0 0 180px #fb923c',
                '0 0 60px #f97316, 0 0 120px #fb923c',
              ],
            }}
            transition={{ duration: 6, repeat: Infinity, repeatType: 'reverse' }}
          >
            INITIALIZE FLUX ACCESS
          </motion.h2>

          <p className="text-2xl sm:text-3xl text-white/90 mb-16 max-w-4xl mx-auto leading-relaxed">
            No intermediaries. Pure execution layer.
            <br className="hidden sm:block" />
            <span className="text-orange-400 font-semibold">Deploy your node now.</span>
          </p>

          <motion.button
            onClick={handleGetStarted}
            className="px-20 sm:px-32 py-8 sm:py-10 text-3xl sm:text-4xl font-black uppercase bg-gradient-to-r from-orange-600 via-orange-500 to-orange-400 rounded-2xl border-2 border-orange-300/60 shadow-2xl shadow-orange-900/90"
            whileHover={{ scale: 1.1, boxShadow: '0 0 120px #f97316, 0 0 180px #fb923c' }}
            whileTap={{ scale: 0.95 }}
          >
            EXECUTE → SIGNUP
          </motion.button>

          <p className="mt-12 text-orange-200/70 text-xl tracking-wide">
            90-second bootstrap • Anonymous mode available • Minimum vector: $10
          </p>
        </div>
      </section>
    </div>
  );
};

export default GetStarted;