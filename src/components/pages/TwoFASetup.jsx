import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import QRCode from 'react-qr-code'; // npm install react-qr-code
import { useNavigate } from 'react-router-dom';
// Assume these endpoints exist based on your API doc
import axios from 'axios';
import { apiClient } from '../../api/apiClient';

export default function TwoFASetup() {
  const [qrCode, setQrCode] = useState('');
  const [secret, setSecret] = useState('');
  const [code, setCode] = useState(['', '', '', '', '']); // 6-digit
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch QR code on mount
    const fetch2FASetup = async () => {
      try {
        const res = await apiClient.post('/api/auth/2fa/setup');
        setQrCode(res.data.qrCode);
        setSecret(res.data.secret);
      } catch (err) {
        setError('Failed to load 2FA setup');
      }
    };
    fetch2FASetup();
  }, []);

  const handleCodeChange = (index, value) => {
    if (!/^\d?$/.test(value)) return;
    const newCode = [...code];
    newCode[index] = value;
    setCode(newCode);
    if (value && index < 5) {
      document.getElementById(`code-${index + 1}`)?.focus();
    }
  };

  const handleVerify = async (e) => {
    e.preventDefault();
    const token = code.join('');
    if (token.length !== 6) return;

    setLoading(true);
    setError('');
    setSuccess('');

    try {
      await apiClient.post('/api/auth/2fa/verify', { token });
      setSuccess('2FA enabled successfully!');
      setTimeout(() => navigate('/dashboard'), 2000);
    } catch (err) {
      setError(err.response?.data?.message || 'Invalid code');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-black flex items-center justify-center px-4 py-12">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-500 rounded-full blur-3xl opacity-20 animate-pulse" />
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-cyan-500 rounded-full blur-3xl opacity-20 animate-pulse" />
      </div>

      <motion.div
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="relative w-full max-w-md bg-gray-900/80 backdrop-blur-xl rounded-3xl shadow-2xl border border-gray-800 p-8"
      >
        <h2 className="text-3xl font-bold text-white text-center mb-6">
          Enable Two-Factor Authentication
        </h2>

        <p className="text-gray-300 text-center mb-8">
          Scan the QR code with your authenticator app (Google Authenticator, Authy, etc.)
        </p>

        {qrCode ? (
          <div className="flex justify-center mb-8">
            <div className="p-4 bg-white rounded-xl">
              <QRCode value={qrCode} size={100} />
            </div>
          </div>
        ) : (
          <div className="h-64 flex items-center justify-center">
            <p className="text-gray-400">Loading QR code...</p>
          </div>
        )}

        <p className="text-sm text-gray-400 text-center mb-6">
          Or manually enter: <strong>{secret}</strong>
        </p>

        {error && (
          <div className="mb-4 p-3 bg-red-500/20 border border-red-500/50 rounded-lg text-red-300 text-center text-sm">
            {error}
          </div>
        )}

        {success && (
          <div className="mb-4 p-3 bg-green-500/20 border border-green-500/50 rounded-lg text-green-300 text-center text-sm">
            {success}
          </div>
        )}

        <form onSubmit={handleVerify} className="space-y-4">
          <div className="flex justify-center gap-3 p-2">
            {[0,1,2,3,4,5].map((i) => (
              <input
                key={i}
                id={`code-${i}`}
                type="text"
                maxLength={1}
                value={code[i]}
                onChange={(e) => handleCodeChange(i, e.target.value)}
                className="w-10 h-10 text-2xl text-center bg-gray-800/50 border border-gray-700 rounded-xl text-white focus:border-cyan-500"
                required
              />
            ))}
          </div>

          <motion.button
            whileHover={{ scale: loading ? 1 : 1.03 }}
            disabled={loading}
            className="w-full py-4 bg-gradient-to-r from-cyan-500 to-purple-600 text-white font-bold rounded-xl shadow-lg"
          >
            {loading ? 'Verifying...' : 'Enable 2FA'}
          </motion.button>
        </form>
      </motion.div>
    </div>
  );
}