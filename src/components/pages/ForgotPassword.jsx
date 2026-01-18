
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { forgetPassword } from '../../api/authApi';
import toast, { Toaster } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

export default function ForgotPassword() {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

 const handleSubmit = async (e) => {
  e.preventDefault();

  if (!email.trim()) {
    toast.error("Please enter your email");
    return;
  }

  setLoading(true);
  try {
    const res = await forgetPassword(email.trim()); // ✅ FIX HERE

    toast.success(
      res?.data?.message || "Check your email for the reset link"
    );
  } catch (err) {
    console.error("Forgot password error:", err);
    toast.error(
      err?.response?.data?.message ||
        "Unable to process request. Please try again."
    );
  } finally {
    setLoading(false);
  }
};


  return (
    <div className="min-h-screen bg-gray-950 flex items-center justify-center px-4 relative overflow-hidden">
      <Toaster position="top-center" />

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative w-full max-w-md bg-gray-900/70 backdrop-blur-xl p-8 rounded-3xl border border-orange-800/50 shadow-2xl"
      >
        <h2 className="text-3xl font-bold text-orange-400 text-center mb-2">
          Forgot Password
        </h2>
        <p className="text-gray-400 text-center mb-8">
          Enter your email address and we’ll send you a reset link
        </p>

        <form onSubmit={handleSubmit} className="space-y-6">
          <input
            type="email"
            required
            placeholder="Email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            disabled={loading}
            className="w-full px-5 py-4 bg-gray-800 border border-orange-800/50 rounded-xl text-white placeholder-gray-500 focus:ring-2 focus:ring-orange-500/30 outline-none"
          />

          <motion.button
            whileHover={{ scale: loading ? 1 : 1.03 }}
            whileTap={{ scale: loading ? 1 : 0.97 }}
            disabled={loading}
            type="submit"
            className="w-full py-4 bg-orange-600 hover:bg-orange-500 text-white font-bold rounded-xl disabled:opacity-50"
          >
            {loading ? 'Sending…' : 'Send Reset Link'}
          </motion.button>
        </form>
        <div className="mt-6 text-center">
           <button
             onClick={() => navigate('/signup')}
            className="text-orange-400 hover:text-orange-300 text-sm"           >
            ← Back to Sign In
           </button>
        </div>
      </motion.div>
    </div>
  );
}
