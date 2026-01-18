import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { resetPassword } from "../../api/authApi";
import toast, { Toaster } from "react-hot-toast";

export default function ResetPassword() {
  const { token } = useParams();
  const navigate = useNavigate();

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!token) {
      toast.error("Invalid or missing reset token");
      navigate("/forgot-password");
    }
  }, [token, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password.length < 6) return toast.error("Password must be at least 6 characters");
    if (password !== confirmPassword) return toast.error("Passwords do not match");

    setLoading(true);
    try {
      await resetPassword(token, password); // pass token & password
      toast.success("Password reset successful!");

      setTimeout(() => navigate("/signup?mode=login"), 2000);
    } catch (err) {
      toast.error(
        err?.response?.data?.message || "Reset link invalid or expired"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-950 px-4">
      <Toaster position="top-center" />
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md bg-gray-900/80 p-8 rounded-3xl border border-orange-800/50 shadow-2xl"
      >
        <h2 className="text-3xl font-bold text-orange-400 mb-6 text-center">
          Reset Password
        </h2>
        <input
          type="password"
          placeholder="New Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full mb-4 px-5 py-4 rounded-xl bg-gray-800 border border-gray-700 text-white focus:ring-2 focus:ring-orange-500/30 outline-none"
          required
        />
        <input
          type="password"
          placeholder="Confirm Password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          className="w-full mb-4 px-5 py-4 rounded-xl bg-gray-800 border border-gray-700 text-white focus:ring-2 focus:ring-orange-500/30 outline-none"
          required
        />
        <button
          type="submit"
          disabled={loading}
          className="w-full py-4 bg-orange-600 hover:bg-orange-500 text-white font-bold rounded-xl disabled:opacity-50"
        >
          {loading ? "Resetting…" : "Reset Password"}
        </button>
      </form>
    </div>
  );
}
