// import React, { useState } from 'react';
// import { motion } from 'framer-motion';
// import { useNavigate, useParams } from 'react-router-dom';
// import { resetPassword } from '../../api/authApi';

// export default function ResetPassword() {
//   const { token } = useParams<{ token}>('token');
//   const [password, setPassword] = useState('');
//   const [confirmPassword, setConfirmPassword] = useState('');
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState('');
//   const [success, setSuccess] = useState('');
//   const navigate = useNavigate();

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (password !== confirmPassword) {
//       setError('Passwords do not match');
//       return;
//     }

//     setLoading(true);
//     setError('');
//     setSuccess('');

//     try {
//       await resetPassword({ token, password });
//       setSuccess('Password reset successful! Redirecting to login...');
//       setTimeout(() => navigate('/auth'), 3000);
//     } catch (err) {
//       setError(err.response?.data?.message || 'Failed to reset password.');
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-black flex items-center justify-center px-4 py-12">
//       <div className="absolute inset-0 overflow-hidden">
//         <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-500 rounded-full blur-3xl opacity-20 animate-pulse" />
//         <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-cyan-500 rounded-full blur-3xl opacity-20 animate-pulse" />
//       </div>

//       <motion.div
//         initial={{ y: 50, opacity: 0 }}
//         animate={{ y: 0, opacity: 1 }}
//         transition={{ duration: 0.8 }}
//         className="relative w-full max-w-md bg-gray-900/80 backdrop-blur-xl rounded-3xl shadow-2xl border border-gray-800 p-8"
//       >
//         <h2 className="text-3xl font-bold text-white text-center mb-8">
//           Reset Password
//         </h2>

//         {error && (
//           <div className="mb-4 p-3 bg-red-500/20 border border-red-500/50 rounded-lg text-red-300 text-center text-sm">
//             {error}
//           </div>
//         )}

//         {success && (
//           <div className="mb-4 p-3 bg-green-500/20 border border-green-500/50 rounded-lg text-green-300 text-center text-sm">
//             {success}
//           </div>
//         )}

//         <form onSubmit={handleSubmit} className="space-y-6">
//           <motion.input
//             type="password"
//             placeholder="New Password"
//             value={password}
//             onChange={(e) => setPassword(e.target.value)}
//             required
//             minLength={6}
//             className="input"
//           />

//           <motion.input
//             type="password"
//             placeholder="Confirm New Password"
//             value={confirmPassword}
//             onChange={(e) => setConfirmPassword(e.target.value)}
//             required
//             className="input"
//           />

//           <motion.button
//             whileHover={{ scale: loading ? 1 : 1.03 }}
//             whileTap={{ scale: loading ? 1 : 0.98 }}
//             disabled={loading}
//             className="w-full py-4 bg-gradient-to-r from-cyan-500 to-purple-600 text-white font-bold rounded-xl shadow-lg"
//           >
//             {loading ? 'Resetting...' : 'Reset Password'}
//           </motion.button>
//         </form>

//         <div className="mt-6 text-center">
//           <button
//             onClick={() => navigate('/auth')}
//             className="text-cyan-400 text-sm underline hover:text-cyan-300"
//           >
//             Back to Sign In
//           </button>
//         </div>
//       </motion.div>

//       <style jsx>{`
//         .input {
//           width: 100%;
//           padding: 1rem 1.25rem;
//           background: rgba(31,41,55,0.5);
//           border: 1px solid #374151;
//           border-radius: 0.75rem;
//           color: white;
//         }
//         .input::placeholder { color: #9ca3af; }
//         .input:focus {
//           outline: none;
//           border-color: #22d3ee;
//           box-shadow: 0 0 0 2px rgba(34,211,238,0.3);
//         }
//       `}</style>
//     </div>
//   );
// }






// import React, { useState } from 'react';
// import { motion } from 'framer-motion';
// import { useNavigate, useParams } from 'react-router-dom';
// import { resetPassword } from '../../api/authApi';

// export default function ResetPassword() {
//   // Correctly extract token from URL: /reset-password/:token
//   const { token } = useParams();
//   const navigate = useNavigate();

//   const [password, setPassword] = useState('');
//   const [confirmPassword, setConfirmPassword] = useState('');
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState('');
//   const [success, setSuccess] = useState('');

//   // If no token is present in the URL
//   if (!token) {
//     return (
//       <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-black flex items-center justify-center px-4 py-12">
//         <div className="text-center">
//           <motion.div
//             initial={{ scale: 0.9, opacity: 0 }}
//             animate={{ scale: 1, opacity: 1 }}
//             className="bg-gray-900/80 backdrop-blur-xl rounded-3xl shadow-2xl border border-gray-800 p-10 max-w-md"
//           >
//             <h2 className="text-3xl font-bold text-white mb-6">
//               Invalid Reset Link
//             </h2>
//             <p className="text-gray-300 mb-8">
//               The password reset link is invalid or has expired.
//             </p>
//             <button
//               onClick={() => navigate('/forgot-password')}
//               className="px-8 py-4 bg-gradient-to-r from-cyan-500 to-purple-600 text-white font-bold rounded-xl shadow-lg hover:shadow-cyan-500/50 transition"
//             >
//               Request New Link
//             </button>
//             <div className="mt-6">
//               <button
//                 onClick={() => navigate('/signup')}
//                 className="text-cyan-400 text-sm underline hover:text-cyan-300"
//               >
//                 Back to Sign In
//               </button>
//             </div>
//           </motion.div>
//         </div>
//       </div>
//     );
//   }

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     if (password.length < 6) {
//       setError('Password must be at least 6 characters long');
//       return;
//     }

//     if (password !== confirmPassword) {
//       setError('Passwords do not match');
//       return;
//     }

//     setLoading(true);
//     setError('');
//     setSuccess('');

//     try {
//       await resetPassword({ token, password });
//       setSuccess('Password successfully reset! Redirecting to login...');
//       setTimeout(() => navigate('/signup'), 3000);
//     } catch (err) {
//       setError(
//         err.response?.data?.message ||
//         'Failed to reset password. The link may have expired or been used already.'
//       );
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-black flex items-center justify-center px-4 py-12">
//       {/* Background Effects */}
//       <div className="absolute inset-0 overflow-hidden">
//         <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-500 rounded-full blur-3xl opacity-20 animate-pulse" />
//         <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-cyan-500 rounded-full blur-3xl opacity-20 animate-pulse" />
//       </div>

//       <motion.div
//         initial={{ y: 50, opacity: 0 }}
//         animate={{ y: 0, opacity: 1 }}
//         transition={{ duration: 0.8 }}
//         className="relative w-full max-w-md bg-gray-900/80 backdrop-blur-xl rounded-3xl shadow-2xl border border-gray-800 p-8"
//       >
//         <h2 className="text-3xl font-bold text-white text-center mb-8">
//           Reset Your Password
//         </h2>

//         {error && (
//           <div className="mb-6 p-4 bg-red-500/20 border border-red-500/50 rounded-lg text-red-300 text-center text-sm">
//             {error}
//           </div>
//         )}

//         {success && (
//           <div className="mb-6 p-4 bg-green-500/20 border border-green-500/50 rounded-lg text-green-300 text-center text-sm">
//             {success}
//           </div>
//         )}

//         <form onSubmit={handleSubmit} className="space-y-6">
//           <motion.input
//             type="password"
//             placeholder="New Password"
//             value={password}
//             onChange={(e) => setPassword(e.target.value)}
//             required
//             minLength={6}
//             className="input"
//             initial={{ opacity: 0, y: 20 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ delay: 0.1 }}
//           />

//           <motion.input
//             type="password"
//             placeholder="Confirm New Password"
//             value={confirmPassword}
//             onChange={(e) => setConfirmPassword(e.target.value)}
//             required
//             className="input"
//             initial={{ opacity: 0, y: 20 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ delay: 0.2 }}
//           />

//           <motion.button
//             type="submit"
//             whileHover={{ scale: loading ? 1 : 1.03 }}
//             whileTap={{ scale: loading ? 1 : 0.98 }}
//             disabled={loading}
//             className="w-full py-4 bg-gradient-to-r from-cyan-500 to-purple-600 text-white font-bold rounded-xl shadow-lg hover:shadow-cyan-500/50 transition disabled:opacity-70"
//           >
//             {loading ? 'Resetting...' : 'Reset Password'}
//           </motion.button>
//         </form>

//         <div className="mt-8 text-center">
//           <button
//             onClick={() => navigate('/signup')}
//             className="text-cyan-400 text-sm underline hover:text-cyan-300 transition"
//           >
//             Back to Sign In
//           </button>
//         </div>
//       </motion.div>

//       {/* Reusable Input Styles */}
//       <style jsx>{`
//         .input {
//           width: 100%;
//           padding: 1rem 1.25rem;
//           background: rgba(31, 41, 55, 0.5);
//           border: 1px solid #374151;
//           border-radius: 0.75rem;
//           color: white;
//           font-size: 1rem;
//           transition: all 0.3s ease;
//         }
//         .input::placeholder {
//           color: #9ca3af;
//         }
//         .input:focus {
//           outline: none;
//           border-color: #22d3ee;
//           box-shadow: 0 0 0 2px rgba(34, 211, 238, 0.3);
//         }
//       `}</style>
//     </div>
//   );
// }





import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate, useParams } from 'react-router-dom';
import { EyeIcon, EyeSlashIcon } from '@heroicons/react/24/outline';
import { resetPassword } from '../../api/authApi';
import toast, { Toaster } from 'react-hot-toast';

export default function ResetPassword() {
  const { token } = useParams();
  const navigate = useNavigate();

  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPass, setShowPass] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [loading, setLoading] = useState(false);

  if (!token) {
    navigate('/forgot-password');
    return null;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password.length < 6)
      return toast.error('Password must be at least 6 characters');

    if (password !== confirmPassword)
      return toast.error('Passwords do not match');

    setLoading(true);
    try {
      await resetPassword({ token, password });
      toast.success('Password reset successful');
      setTimeout(() => navigate('/signup'), 2500);
    } catch (err) {
      toast.error(
        err.response?.data?.message ||
          'Reset link expired or invalid'
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-black flex items-center justify-center px-4 relative">
      <Toaster position="top-center" />

      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative w-full max-w-md bg-gray-900/80 backdrop-blur-xl rounded-3xl border border-gray-800 shadow-2xl p-8"
      >
        <h2 className="text-3xl font-bold text-white text-center mb-8">
          Reset Password
        </h2>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Password */}
          <div className="relative">
            <input
              type={showPass ? 'text' : 'password'}
              placeholder="New password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-5 py-4 bg-gray-800 border border-gray-700 rounded-xl text-white focus:ring-2 focus:ring-cyan-500/30 outline-none"
            />
            <button
              type="button"
              onClick={() => setShowPass(!showPass)}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400"
            >
              {showPass ? (
                <EyeSlashIcon className="w-5 h-5" />
              ) : (
                <EyeIcon className="w-5 h-5" />
              )}
            </button>
          </div>

          {/* Confirm Password */}
          <div className="relative">
            <input
              type={showConfirm ? 'text' : 'password'}
              placeholder="Confirm password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full px-5 py-4 bg-gray-800 border border-gray-700 rounded-xl text-white focus:ring-2 focus:ring-cyan-500/30 outline-none"
            />
            <button
              type="button"
              onClick={() => setShowConfirm(!showConfirm)}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400"
            >
              {showConfirm ? (
                <EyeSlashIcon className="w-5 h-5" />
              ) : (
                <EyeIcon className="w-5 h-5" />
              )}
            </button>
          </div>

          <motion.button
            whileHover={{ scale: loading ? 1 : 1.03 }}
            whileTap={{ scale: loading ? 1 : 0.97 }}
            disabled={loading}
            type="submit"
            className="w-full py-4 bg-gradient-to-r from-cyan-500 to-purple-600 text-white font-bold rounded-xl shadow-lg disabled:opacity-60"
          >
            {loading ? 'Resetting…' : 'Reset Password'}
          </motion.button>
        </form>

        <div className="mt-6 text-center">
          <button
            onClick={() => navigate('/signup')}
            className="text-cyan-400 text-sm underline hover:text-cyan-300"
          >
            Back to Sign In
          </button>
        </div>
      </motion.div>
    </div>
  );
}
