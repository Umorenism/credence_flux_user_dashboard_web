
// // import React, { useState } from "react";
// // import { motion } from "framer-motion";
// // import { useNavigate } from "react-router-dom";
// // import { signUpUser, loginUser, verifyEmail } from "../../api/authApi";
// // import toast, { Toaster } from "react-hot-toast";
// // import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/solid";

// // const inputBase =
// //   "w-full px-5 py-4 rounded-xl bg-gray-800 border border-orange-800/50 text-white placeholder-gray-500 focus:border-orange-500 focus:ring-2 focus:ring-orange-500/30 outline-none transition";

// // const buttonPrimary =
// //   "w-full py-4 rounded-xl bg-orange-600 hover:bg-orange-500 text-white font-semibold text-lg shadow-lg hover:shadow-orange-500/40 hover:scale-[1.02] transition-all disabled:opacity-60 disabled:cursor-not-allowed";

// // const CODE_LENGTH = 4;

// // export default function AuthPage() {
// //   const navigate = useNavigate();
// //   const [mode, setMode] = useState("signup"); // "signup" | "login" | "verify"
// //   const [loading, setLoading] = useState(false);
// //   const [showPassword, setShowPassword] = useState(false);

// //   const [form, setForm] = useState({
// //     username: "",
// //     fullName: "",
// //     email: "",
// //     password: "",
// //     phone: "",
// //     country: "",
// //     referralCode: "",
// //     twoFactorCode: "",
// //   });

// //   const [verifyCode, setVerifyCode] = useState(Array(CODE_LENGTH).fill(""));

// //   const handleChange = (e) => {
// //     const { name, value } = e.target;
// //     setForm((prev) => ({ ...prev, [name]: value.trim() })); // trim to avoid spaces issues
// //   };

// //   const handleSignup = async (e) => {
// //     e.preventDefault();

// //     // Basic client-side validation
// //     if (!form.email || !form.username || !form.password || !form.fullName || !form.country) {
// //       toast.error("Please fill all required fields");
// //       return;
// //     }

// //     setLoading(true);

// //     try {
// //       const res = await signUpUser(
// //         form.email,
// //         form.username,
// //         form.password,
// //         form.fullName,
// //         form.phone || undefined,
// //         form.country,
// //         form.referralCode || undefined
// //       );

// //       console.log("Signup response:", res);

// //       toast.success("4-digit verification code sent to your email");
// //       setMode("verify");
// //     } catch (err) {
// //       console.error("Signup error:", err);

// //       const errorMsg =
// //         err?.response?.data?.message ||
// //         err?.message ||
// //         "Registration failed. Please try again.";

// //       toast.error(errorMsg);
// //     } finally {
// //       setLoading(false);
// //     }
// //   };

// //  const handleLogin = async (e) => {
// //   e.preventDefault();

// //   if (!form.email || !form.password) {
// //     toast.error("Email and password are required");
// //     return;
// //   }

// //   setLoading(true);

// //   try {
// //     // clear stale auth (important for multi-device login)
// //     localStorage.removeItem("token");
// //     localStorage.removeItem("refreshToken");
// //     localStorage.removeItem("user");

// //     const res = await loginUser(
// //       form.email.trim().toLowerCase(),
// //       form.password,
// //       form.twoFactorCode || undefined
// //     );

// //     const data = res?.data?.data;

// //     if (!data?.accessToken || !data?.user) {
// //       console.error("Invalid login response:", res);
// //       throw new Error("Invalid login response from server");
// //     }

// //     // ✅ normalize user for UI
// //     const user = {
// //       id: data.user.id,
// //       username: data.user.username,
// //       fullName: data.user.fullName,
// //       email: data.user.email,
// //       isEmailVerified: data.user.isEmailVerified,
// //       avatar: null,
// //     };

// //     // ✅ persist auth
// //     localStorage.setItem("token", data.accessToken);
// //     localStorage.setItem("refreshToken", data.refreshToken);
// //     localStorage.setItem("user", JSON.stringify(user));

// //     toast.success("Login successful");
// //     navigate("/home", { replace: true });

// //   } catch (err) {
// //     console.error("Login error:", err);

// //     const errorMsg =
// //       err?.response?.data?.message ||
// //       err?.message ||
// //       "Login failed. Please check your credentials.";

// //     toast.error(errorMsg);
// //   } finally {
// //     setLoading(false);
// //   }
// // };





// //   const handleVerify = async () => {
// //     const code = verifyCode.join("").trim();

// //     if (code.length !== CODE_LENGTH || !/^\d{4}$/.test(code)) {
// //       toast.error("Please enter a valid 4-digit code");
// //       return;
// //     }

// //     setLoading(true);

// //     try {
// //       const res = await verifyEmail(form.email, code);
// //       console.log("Verification response:", res);

// //       toast.success("Email verified successfully! Please sign in.");
// //       setMode("login");
// //       setVerifyCode(Array(CODE_LENGTH).fill("")); // reset code
// //     } catch (err) {
// //       console.error("Verification error:", err);

// //       const errorMsg =
// //         err?.response?.data?.message ||
// //         err?.message ||
// //         "Verification failed. Code may be invalid or expired.";

// //       toast.error(errorMsg);
// //     } finally {
// //       setLoading(false);
// //     }
// //   };

// //   const handleCodeChange = (index, value) => {
// //     if (value !== "" && !/^\d$/.test(value)) return; // only allow digits

// //     const newCode = [...verifyCode];
// //     newCode[index] = value;
// //     setVerifyCode(newCode);

// //     if (value && index < CODE_LENGTH - 1) {
// //       document.getElementById(`code-${index + 1}`)?.focus();
// //     }
// //   };

// //   return (
// //     <div className="min-h-screen bg-gray-950 flex items-center justify-center px-4">
// //       <Toaster position="top-center" />

// //       <motion.div
// //         initial={{ opacity: 0, y: 40 }}
// //         animate={{ opacity: 1, y: 0 }}
// //         className="w-full max-w-2xl bg-gray-900/80 border border-orange-900/50 rounded-3xl p-8 shadow-2xl"
// //       >
// //         <h1 className="text-center text-4xl font-black text-orange-400 mb-2">
// //           CREDENCEFLUX
// //         </h1>
// //         <p className="text-center text-gray-400 mb-8">
// //           Secure Crypto Investment Platform
// //         </p>

// //         {mode !== "verify" && (
// //           <div className="flex mb-8 rounded-xl overflow-hidden bg-gray-800">
// //             {["signup", "login"].map((m) => (
// //               <button
// //                 key={m}
// //                 onClick={() => setMode(m)}
// //                 className={`flex-1 py-4 font-semibold ${
// //                   mode === m
// //                     ? "bg-orange-600 text-white"
// //                     : "text-orange-300 hover:bg-gray-700"
// //                 }`}
// //               >
// //                 {m === "signup" ? "Create Account" : "Sign In"}
// //               </button>
// //             ))}
// //           </div>
// //         )}

// //         {mode === "signup" && (
// //           <form onSubmit={handleSignup} className="grid md:grid-cols-2 gap-5">
// //             <input
// //               className={inputBase}
// //               name="username"
// //               placeholder="Username"
// //               value={form.username}
// //               onChange={handleChange}
// //               required
// //             />
// //             <input
// //               className={inputBase}
// //               name="fullName"
// //               placeholder="Full Name"
// //               value={form.fullName}
// //               onChange={handleChange}
// //               required
// //             />
// //             <input
// //               className={`${inputBase} md:col-span-2`}
// //               name="email"
// //               type="email"
// //               placeholder="Email"
// //               value={form.email}
// //               onChange={handleChange}
// //               required
// //             />
// //             <div className="relative md:col-span-2">
// //               <input
// //                 className={`${inputBase} pr-14`}
// //                 name="password"
// //                 type={showPassword ? "text" : "password"}
// //                 placeholder="Password"
// //                 value={form.password}
// //                 onChange={handleChange}
// //                 required
// //               />
// //               <button
// //                 type="button"
// //                 onClick={() => setShowPassword(!showPassword)}
// //                 className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-orange-400 transition"
// //               >
// //                 {showPassword ? <EyeSlashIcon className="w-6 h-6" /> : <EyeIcon className="w-6 h-6" />}
// //               </button>
// //             </div>
// //             <input
// //               className={inputBase}
// //               name="phone"
// //               placeholder="Phone (optional)"
// //               value={form.phone}
// //               onChange={handleChange}
// //             />
// //             <input
// //               className={inputBase}
// //               name="country"
// //               placeholder="Country"
// //               value={form.country}
// //               onChange={handleChange}
// //               required
// //             />
// //             <input
// //               className={`${inputBase} md:col-span-2`}
// //               name="referralCode"
// //               placeholder="Referral Code (optional)"
// //               value={form.referralCode}
// //               onChange={handleChange}
// //             />
// //             <button
// //               type="submit"
// //               className={`${buttonPrimary} md:col-span-2`}
// //               disabled={loading}
// //             >
// //               {loading ? "Creating..." : "Create Account"}
// //             </button>
// //           </form>
// //         )}

// //         {mode === "login" && (
// //           <form onSubmit={handleLogin} className="space-y-5">
// //             <input
// //               className={inputBase}
// //               name="email"
// //               type="email"
// //               placeholder="Email"
// //               value={form.email}
// //               onChange={handleChange}
// //               required
// //             />
// //             <div className="relative">
// //               <input
// //                 className={`${inputBase} pr-14`}
// //                 name="password"
// //                 type={showPassword ? "text" : "password"}
// //                 placeholder="Password"
// //                 value={form.password}
// //                 onChange={handleChange}
// //                 required
// //               />
// //               <button
// //                 type="button"
// //                 onClick={() => setShowPassword(!showPassword)}
// //                 className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-orange-400 transition"
// //               >
// //                 {showPassword ? <EyeSlashIcon className="w-6 h-6" /> : <EyeIcon className="w-6 h-6" />}
// //               </button>
// //             </div>

// //             <input
// //               className={inputBase}
// //               name="twoFactorCode"
// //               placeholder="2FA Code (optional)"
// //               value={form.twoFactorCode}
// //               onChange={handleChange}
// //             />

// //             <button className={buttonPrimary} disabled={loading}>
// //               {loading ? "Signing in..." : "Sign In"}
// //             </button>

// //             <div className="text-right mt-2">
// //               <button
// //                 type="button"
// //                 onClick={() => navigate("/forgot-password")}
// //                 className="text-orange-400 hover:text-orange-300 text-sm underline transition"
// //               >
// //                 Forgot password?
// //               </button>
// //             </div>
// //           </form>
// //         )}

// //         {mode === "verify" && (
// //           <div className="text-center">
// //             <p className="mb-6 text-gray-300">
// //               Enter the 4-digit code sent to{" "}
// //               <span className="text-orange-400 font-medium">{form.email || "your email"}</span>
// //             </p>

// //             <div className="flex justify-center gap-3 mb-8">
// //               {verifyCode.map((digit, index) => (
// //                 <input
// //                   key={index}
// //                   id={`code-${index}`}
// //                   type="text"
// //                   inputMode="numeric"
// //                   maxLength={1}
// //                   value={digit}
// //                   onChange={(e) => handleCodeChange(index, e.target.value)}
// //                   className="w-14 h-16 text-2xl text-center bg-gray-800 border border-orange-700 rounded-xl focus:border-orange-500 outline-none"
// //                 />
// //               ))}
// //             </div>

// //             <button
// //               onClick={handleVerify}
// //               className={buttonPrimary}
// //               disabled={loading || verifyCode.join("").length !== CODE_LENGTH}
// //             >
// //               {loading ? "Verifying..." : "Verify Email"}
// //             </button>
// //           </div>
// //         )}
// //       </motion.div>
// //     </div>
// //   );
// // }





// import React, { useState } from "react";
// import { motion } from "framer-motion";
// import { useNavigate } from "react-router-dom";
// import { signUpUser, loginUser, verifyEmail } from "../../api/authApi";
// import toast, { Toaster } from "react-hot-toast";
// import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/solid";

// const inputBase =
//   "w-full px-5 py-4 rounded-xl bg-gray-800 border border-orange-800/50 text-white placeholder-gray-500 focus:border-orange-500 focus:ring-2 focus:ring-orange-500/30 outline-none transition";

// const buttonPrimary =
//   "w-full py-4 rounded-xl bg-orange-600 hover:bg-orange-500 text-white font-semibold text-lg shadow-lg hover:shadow-orange-500/40 hover:scale-[1.02] transition-all disabled:opacity-60 disabled:cursor-not-allowed";

// const CODE_LENGTH = 4;

// export default function AuthPage() {
//   const navigate = useNavigate();
//   const [mode, setMode] = useState("signup"); // "signup" | "login" | "verify"
//   const [loading, setLoading] = useState(false);
//   const [showPassword, setShowPassword] = useState(false);

//   const [form, setForm] = useState({
//     username: "",
//     fullName: "",
//     email: "",
//     password: "",
//     phone: "",
//     country: "",
//     referralCode: "",
//     twoFactorCode: "",
//   });

//   const [verifyCode, setVerifyCode] = useState(Array(CODE_LENGTH).fill(""));

//   const handleChange = (e) => {
//     const { name, value } = e.target;

//     // Allow spaces in fullName and username
//     // Only trim and lowercase email (standard practice)
//     if (name === "email") {
//       setForm((prev) => ({ ...prev, [name]: value.trim().toLowerCase() }));
//     } else {
//       // Keep spaces and original casing for names, phone, country, etc.
//       setForm((prev) => ({ ...prev, [name]: value }));
//     }
//   };

//   const handleSignup = async (e) => {
//     e.preventDefault();

//     const trimmedFullName = form.fullName.trim();

//     // Better validation messages
//     if (!form.email.trim()) {
//       toast.error("Email is required");
//       return;
//     }
//     if (!form.username.trim()) {
//       toast.error("Username is required");
//       return;
//     }
//     if (!trimmedFullName) {
//       toast.error("Full name is required");
//       return;
//     }
//     // Optional: warn if full name seems incomplete (only one word)
//     if (trimmedFullName.split(/\s+/).length < 2) {
//       toast("Tip: Full name usually includes first + last name", {
//         icon: "ℹ️",
//         style: { background: "#1f2937", color: "#fbbf24" },
//       });
//       // You can still proceed — or make it required by adding return;
//     }
//     if (!form.password) {
//       toast.error("Password is required");
//       return;
//     }
//     if (!form.country.trim()) {
//       toast.error("Country is required");
//       return;
//     }

//     setLoading(true);

//     try {
//       const res = await signUpUser(
//         form.email.trim(),
//         form.username.trim(),
//         form.password,
//         trimmedFullName,           // send cleaned version to backend
//         form.phone?.trim() || undefined,
//         form.country.trim(),
//         form.referralCode?.trim() || undefined
//       );

//       console.log("Signup response:", res);

//       toast.success("4-digit verification code sent to your email");
//       setMode("verify");
//     } catch (err) {
//       console.error("Signup error:", err);

//       const errorMsg =
//         err?.response?.data?.message ||
//         err?.message ||
//         "Registration failed. Please try again.";

//       toast.error(errorMsg);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleLogin = async (e) => {
//     e.preventDefault();

//     if (!form.email.trim() || !form.password) {
//       toast.error("Email and password are required");
//       return;
//     }

//     setLoading(true);

//     try {
//       // Clear any stale auth data
//       localStorage.removeItem("token");
//       localStorage.removeItem("refreshToken");
//       localStorage.removeItem("user");

//       const res = await loginUser(
//         form.email.trim().toLowerCase(),
//         form.password,
//         form.twoFactorCode?.trim() || undefined
//       );

//       const data = res?.data?.data;

//       if (!data?.accessToken || !data?.user) {
//         throw new Error("Invalid login response from server");
//       }

//       // Normalize user object for consistent storage
//       const user = {
//         id: data.user.id || data.user._id,
//         username: data.user.username,
//         fullName: data.user.fullName,
//         email: data.user.email,
//         isEmailVerified: data.user.isEmailVerified,
//         avatar: null,
//       };

//       localStorage.setItem("token", data.accessToken);
//       localStorage.setItem("refreshToken", data.refreshToken || "");
//       localStorage.setItem("user", JSON.stringify(user));

//       toast.success("Login successful");
//       navigate("/home", { replace: true });
//     } catch (err) {
//       console.error("Login error:", err);

//       const errorMsg =
//         err?.response?.data?.message ||
//         err?.message ||
//         "Login failed. Please check your credentials.";

//       toast.error(errorMsg);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleVerify = async () => {
//     const code = verifyCode.join("").trim();

//     if (code.length !== CODE_LENGTH || !/^\d{4}$/.test(code)) {
//       toast.error("Please enter a valid 4-digit code");
//       return;
//     }

//     setLoading(true);

//     try {
//       const res = await verifyEmail(form.email.trim(), code);
//       console.log("Verification response:", res);

//       toast.success("Email verified successfully! Please sign in.");
//       setMode("login");
//       setVerifyCode(Array(CODE_LENGTH).fill(""));
//     } catch (err) {
//       console.error("Verification error:", err);

//       const errorMsg =
//         err?.response?.data?.message ||
//         err?.message ||
//         "Verification failed. Code may be invalid or expired.";

//       toast.error(errorMsg);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleCodeChange = (index, value) => {
//     if (value !== "" && !/^\d$/.test(value)) return; // only digits

//     const newCode = [...verifyCode];
//     newCode[index] = value;
//     setVerifyCode(newCode);

//     // Auto-focus next input
//     if (value && index < CODE_LENGTH - 1) {
//       document.getElementById(`code-${index + 1}`)?.focus();
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gray-950 flex items-center justify-center px-4">
//       <Toaster position="top-center" />

//       <motion.div
//         initial={{ opacity: 0, y: 40 }}
//         animate={{ opacity: 1, y: 0 }}
//         className="w-full max-w-2xl bg-gray-900/80 border border-orange-900/50 rounded-3xl p-8 shadow-2xl"
//       >
//         <h1 className="text-center text-4xl font-black text-orange-400 mb-2">
//           CREDENCEFLUX
//         </h1>
//         <p className="text-center text-gray-400 mb-8">
//           Secure Crypto Investment Platform
//         </p>

//         {mode !== "verify" && (
//           <div className="flex mb-8 rounded-xl overflow-hidden bg-gray-800">
//             {["signup", "login"].map((m) => (
//               <button
//                 key={m}
//                 onClick={() => setMode(m)}
//                 className={`flex-1 py-4 font-semibold ${
//                   mode === m
//                     ? "bg-orange-600 text-white"
//                     : "text-orange-300 hover:bg-gray-700"
//                 } transition-colors`}
//               >
//                 {m === "signup" ? "Create Account" : "Sign In"}
//               </button>
//             ))}
//           </div>
//         )}

//         {mode === "signup" && (
//           <form onSubmit={handleSignup} className="grid md:grid-cols-2 gap-5">
//             <input
//               className={inputBase}
//               name="username"
//               placeholder="Username"
//               value={form.username}
//               onChange={handleChange}
//               required
//             />
//             <input
//               className={inputBase}
//               name="fullName"
//               placeholder="Full Name (e.g. john doe)"
//               value={form.fullName}
//               onChange={handleChange}
//               required
//             />
//             <input
//               className={`${inputBase} md:col-span-2`}
//               name="email"
//               type="email"
//               placeholder="Email"
//               value={form.email}
//               onChange={handleChange}
//               required
//             />
//             <div className="relative md:col-span-2">
//               <input
//                 className={`${inputBase} pr-14`}
//                 name="password"
//                 type={showPassword ? "text" : "password"}
//                 placeholder="Password"
//                 value={form.password}
//                 onChange={handleChange}
//                 required
//               />
//               <button
//                 type="button"
//                 onClick={() => setShowPassword(!showPassword)}
//                 className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-orange-400 transition"
//               >
//                 {showPassword ? (
//                   <EyeSlashIcon className="w-6 h-6" />
//                 ) : (
//                   <EyeIcon className="w-6 h-6" />
//                 )}
//               </button>
//             </div>
//             <input
//               className={inputBase}
//               name="phone"
//               placeholder="Phone (optional)"
//               value={form.phone}
//               onChange={handleChange}
//             />
//             <input
//               className={inputBase}
//               name="country"
//               placeholder="Country"
//               value={form.country}
//               onChange={handleChange}
//               required
//             />
//             <input
//               className={`${inputBase} md:col-span-2`}
//               name="referralCode"
//               placeholder="Referral Code (optional)"
//               value={form.referralCode}
//               onChange={handleChange}
//             />
//             <button
//               type="submit"
//               className={`${buttonPrimary} md:col-span-2`}
//               disabled={loading}
//             >
//               {loading ? "Creating Account..." : "Create Account"}
//             </button>
//           </form>
//         )}

//         {mode === "login" && (
//           <form onSubmit={handleLogin} className="space-y-5">
//             <input
//               className={inputBase}
//               name="email"
//               type="email"
//               placeholder="Email"
//               value={form.email}
//               onChange={handleChange}
//               required
//             />
//             <div className="relative">
//               <input
//                 className={`${inputBase} pr-14`}
//                 name="password"
//                 type={showPassword ? "text" : "password"}
//                 placeholder="Password"
//                 value={form.password}
//                 onChange={handleChange}
//                 required
//               />
//               <button
//                 type="button"
//                 onClick={() => setShowPassword(!showPassword)}
//                 className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-orange-400 transition"
//               >
//                 {showPassword ? (
//                   <EyeSlashIcon className="w-6 h-6" />
//                 ) : (
//                   <EyeIcon className="w-6 h-6" />
//                 )}
//               </button>
//             </div>

//             <input
//               className={inputBase}
//               name="twoFactorCode"
//               placeholder="2FA Code (optional)"
//               value={form.twoFactorCode}
//               onChange={handleChange}
//             />

//             <button className={buttonPrimary} disabled={loading}>
//               {loading ? "Signing in..." : "Sign In"}
//             </button>

//             <div className="text-right mt-2">
//               <button
//                 type="button"
//                 onClick={() => navigate("/forgot-password")}
//                 className="text-orange-400 hover:text-orange-300 text-sm underline transition"
//               >
//                 Forgot password?
//               </button>
//             </div>
//           </form>
//         )}

//         {mode === "verify" && (
//           <div className="text-center">
//             <p className="mb-6 text-gray-300">
//               Enter the 4-digit code sent to{" "}
//               <span className="text-orange-400 font-medium">
//                 {form.email || "your email"}
//               </span>
//             </p>

//             <div className="flex justify-center gap-3 mb-8">
//               {verifyCode.map((digit, index) => (
//                 <input
//                   key={index}
//                   id={`code-${index}`}
//                   type="text"
//                   inputMode="numeric"
//                   maxLength={1}
//                   value={digit}
//                   onChange={(e) => handleCodeChange(index, e.target.value)}
//                   className="w-14 h-16 text-2xl text-center bg-gray-800 border border-orange-700 rounded-xl focus:border-orange-500 outline-none transition"
//                 />
//               ))}
//             </div>

//             <button
//               onClick={handleVerify}
//               className={buttonPrimary}
//               disabled={loading || verifyCode.join("").length !== CODE_LENGTH}
//             >
//               {loading ? "Verifying..." : "Verify Email"}
//             </button>
//           </div>
//         )}
//       </motion.div>
//     </div>
//   );
// }




import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { signUpUser, loginUser, verifyEmail } from "../../api/authApi";
import toast, { Toaster } from "react-hot-toast";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/solid";

const inputBase =
  "w-full px-5 py-4 rounded-xl bg-gray-800 border border-orange-800/50 text-white placeholder-gray-500 focus:border-orange-500 focus:ring-2 focus:ring-orange-500/30 outline-none transition";

const buttonPrimary =
  "w-full py-4 rounded-xl bg-orange-600 hover:bg-orange-500 text-white font-semibold text-lg shadow-lg hover:shadow-orange-500/40 hover:scale-[1.02] transition-all disabled:opacity-60 disabled:cursor-not-allowed";

const CODE_LENGTH = 4;

export default function AuthPage() {
  const navigate = useNavigate();
  const [mode, setMode] = useState("signup"); // "signup" | "login" | "verify"
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const [form, setForm] = useState({
    username: "",
    fullName: "",
    email: "",
    password: "",
    phone: "",
    country: "",
    referralCode: "",
    twoFactorCode: "",
  });

  const [verifyCode, setVerifyCode] = useState(Array(CODE_LENGTH).fill(""));
  const [verifyMessage, setVerifyMessage] = useState("");
  const [verifyError, setVerifyError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "email") {
      setForm((prev) => ({ ...prev, [name]: value.trim().toLowerCase() }));
    } else {
      setForm((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSignup = async (e) => {
    e.preventDefault();

    const trimmedFullName = form.fullName.trim();

    if (!form.email.trim() || !form.username.trim() || !trimmedFullName || !form.password || !form.country.trim()) {
      toast.error("Please fill all required fields");
      return;
    }

    setLoading(true);

    try {
      const res = await signUpUser(
        form.email.trim(),
        form.username.trim(),
        form.password,
        trimmedFullName,
        form.phone?.trim() || undefined,
        form.country.trim(),
        form.referralCode?.trim() || undefined
      );

      toast.success("4-digit verification code sent to your email");
      setMode("verify");
      setVerifyMessage("");
      setVerifyError("");
      setVerifyCode(Array(CODE_LENGTH).fill(""));
    } catch (err) {
      const errorMsg = err?.response?.data?.message || "Registration failed";
      toast.error(errorMsg);
    } finally {
      setLoading(false);
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!form.email.trim() || !form.password) {
      toast.error("Email and password are required");
      return;
    }

    setLoading(true);

    try {
      localStorage.removeItem("token");
      localStorage.removeItem("refreshToken");
      localStorage.removeItem("user");

      const res = await loginUser(
        form.email.trim().toLowerCase(),
        form.password,
        form.twoFactorCode?.trim() || undefined
      );

      const data = res?.data?.data;

      if (!data?.accessToken || !data?.user) {
        throw new Error("Invalid login response");
      }

      const user = {
        id: data.user.id || data.user._id,
        username: data.user.username,
        fullName: data.user.fullName,
        email: data.user.email,
        isEmailVerified: data.user.isEmailVerified,
        avatar: null,
      };

      localStorage.setItem("token", data.accessToken);
      localStorage.setItem("refreshToken", data.refreshToken || "");
      localStorage.setItem("user", JSON.stringify(user));

      toast.success("Login successful");
      navigate("/home", { replace: true });
    } catch (err) {
      const errorMsg = err?.response?.data?.message || "Login failed";
      toast.error(errorMsg);
    } finally {
      setLoading(false);
    }
  };

  // Auto-verify when 4 digits are entered
  useEffect(() => {
    const code = verifyCode.join("").trim();

    if (code.length === CODE_LENGTH && mode === "verify" && !loading) {
      // Quick validation - only digits
      if (/^\d{4}$/.test(code)) {
        handleAutoVerify(code);
      }
    }
  }, [verifyCode]);

  const handleAutoVerify = async (code) => {
    setLoading(true);
    setVerifyMessage("Verifying your code...");
    setVerifyError("");

    try {
      await verifyEmail(form.email.trim(), code);

      setVerifyMessage("Email verified successfully! Redirecting to login...");
      toast.success("Email verified! You can now sign in.");

      // Small delay so user sees success message
      setTimeout(() => {
        setMode("login");
        setVerifyCode(Array(CODE_LENGTH).fill(""));
        setVerifyMessage("");
        setVerifyError("");
      }, 1200);
    } catch (err) {
      const errorMsg =
        err?.response?.data?.message ||
        err?.message ||
        "Invalid or expired code. Please try again.";

      setVerifyError(errorMsg);
      setVerifyMessage("");
      toast.error(errorMsg);

      // Optional: do NOT clear code so user can fix it
      // setVerifyCode(Array(CODE_LENGTH).fill(""));
    } finally {
      setLoading(false);
    }
  };

  const handleCodeChange = (index, value) => {
    if (value !== "" && !/^\d$/.test(value)) return;

    const newCode = [...verifyCode];
    newCode[index] = value;
    setVerifyCode(newCode);

    if (value && index < CODE_LENGTH - 1) {
      document.getElementById(`code-${index + 1}`)?.focus();
    }
  };

  return (
    <div className="min-h-screen bg-gray-950 flex items-center justify-center px-4">
      <Toaster position="top-center" />

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-2xl bg-gray-900/80 border border-orange-900/50 rounded-3xl p-8 shadow-2xl"
      >
        <h1 className="text-center text-4xl font-black text-orange-400 mb-2">
          CREDENCEFLUX
        </h1>
        <p className="text-center text-gray-400 mb-8">
          Secure Crypto Investment Platform
        </p>

        {mode !== "verify" && (
          <div className="flex mb-8 rounded-xl overflow-hidden bg-gray-800">
            {["signup", "login"].map((m) => (
              <button
                key={m}
                onClick={() => setMode(m)}
                className={`flex-1 py-4 font-semibold ${
                  mode === m ? "bg-orange-600 text-white" : "text-orange-300 hover:bg-gray-700"
                } transition-colors`}
              >
                {m === "signup" ? "Create Account" : "Sign In"}
              </button>
            ))}
          </div>
        )}

        {mode === "signup" && (
          <form onSubmit={handleSignup} className="grid md:grid-cols-2 gap-5">
            <input
              className={inputBase}
              name="username"
              placeholder="Username"
              value={form.username}
              onChange={handleChange}
              required
            />
            <input
              className={inputBase}
              name="fullName"
              placeholder="Full Name (e.g. john doe)"
              value={form.fullName}
              onChange={handleChange}
              required
            />
            <input
              className={`${inputBase} md:col-span-2`}
              name="email"
              type="email"
              placeholder="Email"
              value={form.email}
              onChange={handleChange}
              required
            />
            <div className="relative md:col-span-2">
              <input
                className={`${inputBase} pr-14`}
                name="password"
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                value={form.password}
                onChange={handleChange}
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-orange-400 transition"
              >
                {showPassword ? <EyeSlashIcon className="w-6 h-6" /> : <EyeIcon className="w-6 h-6" />}
              </button>
            </div>
            <input
              className={inputBase}
              name="phone"
              placeholder="Phone (optional)"
              value={form.phone}
              onChange={handleChange}
            />
            <input
              className={inputBase}
              name="country"
              placeholder="Country"
              value={form.country}
              onChange={handleChange}
              required
            />
            <input
              className={`${inputBase} md:col-span-2`}
              name="referralCode"
              placeholder="Referral Code (optional)"
              value={form.referralCode}
              onChange={handleChange}
            />
            <button
              type="submit"
              className={`${buttonPrimary} md:col-span-2`}
              disabled={loading}
            >
              {loading ? "Creating..." : "Create Account"}
            </button>
          </form>
        )}

        {mode === "login" && (
          <form onSubmit={handleLogin} className="space-y-5">
            <input
              className={inputBase}
              name="email"
              type="email"
              placeholder="Email"
              value={form.email}
              onChange={handleChange}
              required
            />
            <div className="relative">
              <input
                className={`${inputBase} pr-14`}
                name="password"
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                value={form.password}
                onChange={handleChange}
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-orange-400 transition"
              >
                {showPassword ? <EyeSlashIcon className="w-6 h-6" /> : <EyeIcon className="w-6 h-6" />}
              </button>
            </div>

            <input
              className={inputBase}
              name="twoFactorCode"
              placeholder="2FA Code (optional)"
              value={form.twoFactorCode}
              onChange={handleChange}
            />

            <button className={buttonPrimary} disabled={loading}>
              {loading ? "Signing in..." : "Sign In"}
            </button>

            <div className="text-right mt-2">
              <button
                type="button"
                onClick={() => navigate("/forgot-password")}
                className="text-orange-400 hover:text-orange-300 text-sm underline transition"
              >
                Forgot password?
              </button>
            </div>
          </form>
        )}

        {mode === "verify" && (
          <div className="text-center">
            <p className="mb-6 text-gray-300">
              Enter the 4-digit code sent to{" "}
              <span className="text-orange-400 font-medium">
                {form.email || "your email"}
              </span>
            </p>

            <div className="flex justify-center gap-3 mb-8">
              {verifyCode.map((digit, index) => (
                <input
                  key={index}
                  id={`code-${index}`}
                  type="text"
                  inputMode="numeric"
                  maxLength={1}
                  value={digit}
                  onChange={(e) => handleCodeChange(index, e.target.value)}
                  disabled={loading}
                  className={`w-14 h-16 text-2xl text-center bg-gray-800 border rounded-xl outline-none transition ${
                    loading
                      ? "opacity-60 cursor-wait border-orange-600"
                      : "border-orange-700 focus:border-orange-500"
                  }`}
                />
              ))}
            </div>

            {loading && (
              <div className="text-orange-400 text-lg font-medium mb-4">
                Verifying your code...
              </div>
            )}

            {verifyMessage && !loading && (
              <div className="text-green-400 text-lg font-medium mb-4">
                {verifyMessage}
              </div>
            )}

            {verifyError && (
              <div className="text-red-400 text-sm mb-4">
                {verifyError}
              </div>
            )}
          </div>
        )}
      </motion.div>
    </div>
  );
}