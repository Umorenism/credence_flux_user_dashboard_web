
// src/pages/Referrals.jsx
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  UsersIcon,
  
  ShareIcon,
  TrophyIcon,
 
  UserGroupIcon,
  
  ClipboardDocumentIcon,
 
} from '@heroicons/react/24/solid';
import QRCode from 'react-qr-code';
import { userService } from '../../api/userApi';
import { useTheme } from '../ui/ThemeContext';

export default function Referrals() {
  const { theme } = useTheme();

  const [copiedCode, setCopiedCode] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);
  const [referralData, setReferralData] = useState({
    code: '',
    link: '',
    totalReferrals: 0,
  });
  const [referredUsers, setReferredUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const tiers = [
    { level: 1, req: 5, reward: '50 USDT Bonus' },
    { level: 2, req: 15, reward: '200 USDT + 5% lifetime commission boost' },
    { level: 3, req: 30, reward: '500 USDT + 10% lifetime commission boost' },
    { level: 4, req: 50, reward: '1500 USDT + VIP access & priority support' },
  ];

  const fetchReferralData = async () => {
    try {
      setLoading(true);
      const res = await userService.getReferrals();
      const data = res.data;

      setReferralData({
        code: data.referralCode || 'XXXXXX',
        link: data.referralLink || `${window.location.origin}/register?ref=${data.referralCode || 'XXXXXX'}`,
        totalReferrals: data.totalReferrals || 0,
      });

      const mappedReferrals = (data.referrals || []).map((user, index) => ({
        id: user.id || user._id || `ref-${index}`,
        username: user.username || user.email?.split('@')[0] || 'Anonymous',
        email: user.email || '',
        joinedAt: user.createdAt || user.joinedAt || null,
        status: user.status || 'pending',
      }));

      setReferredUsers(mappedReferrals);
    } catch (err) {
      console.error(err);
      setError('Failed to load referral information.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReferralData();
  }, []);

  const copyCode = () => {
    navigator.clipboard.writeText(referralData.code);
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2200);
  };

  const copyLink = () => {
    navigator.clipboard.writeText(referralData.link);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2200);
  };

  const currentTier = tiers.reduce(
    (acc, tier) => (referralData.totalReferrals >= tier.req ? tier.level : acc),
    0
  );
  const displayTier = currentTier > 0 ? `Level ${currentTier}` : 'Beginner';

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-950 flex items-center justify-center">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1.2, repeat: Infinity, ease: 'linear' }}
          className="w-12 h-12 border-4 border-orange-500 dark:border-orange-400 border-t-transparent rounded-full"
        />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 text-gray-900 dark:text-gray-100 p-4 sm:p-6 lg:p-8 transition-colors duration-300">
      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-3xl sm:text-4xl font-bold mb-8 text-orange-600 dark:text-orange-400 text-center"
      >
        Referral Program
      </motion.h1>

      {error && (
        <div className="max-w-3xl mx-auto mb-8 p-5 bg-red-50 dark:bg-red-950/40 border border-red-200 dark:border-red-800/60 rounded-2xl text-red-700 dark:text-red-300 text-center shadow-sm">
          {error}
        </div>
      )}

      {/* Stats */}
      <motion.div
        initial={{ opacity: 0, scale: 0.98 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-white dark:bg-gray-900 p-6 sm:p-8 rounded-2xl border border-gray-200 dark:border-gray-800/60 shadow-md dark:shadow-xl grid grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6 text-center mb-10"
      >
        <div>
          <UsersIcon className="w-10 h-10 mx-auto text-orange-600 dark:text-orange-500 mb-3" />
          <p className="text-3xl font-bold">{referralData.totalReferrals}</p>
          <p className="text-gray-600 dark:text-gray-400 text-sm mt-1">Total Referrals</p>
        </div>
        <div>
          <TrophyIcon className="w-10 h-10 mx-auto text-orange-600 dark:text-orange-500 mb-3" />
          <p className="text-3xl font-bold">{displayTier}</p>
          <p className="text-gray-600 dark:text-gray-400 text-sm mt-1">Current Tier</p>
        </div>
        <div>
          <ClipboardDocumentIcon className="w-10 h-10 mx-auto text-orange-600 dark:text-orange-500 mb-3" />
          <p className="text-sm font-medium text-gray-700 dark:text-gray-300 break-all">{referralData.code}</p>
          <p className="text-gray-600 dark:text-gray-400 text-sm mt-1">Your Code</p>
        </div>
        <div>
          <ShareIcon className="w-10 h-10 mx-auto text-orange-600 dark:text-orange-500 mb-3" />
          <p className="text-sm font-medium text-gray-700 dark:text-gray-300 break-all">{referralData.link}</p>
          <p className="text-gray-600 dark:text-gray-400 text-sm mt-1">Referral Link</p>
        </div>
      </motion.div>

      {/* Copy & Share */}
      <div className="max-w-2xl mx-auto flex flex-col sm:flex-row gap-4 justify-center mb-10">
        <button
          onClick={copyCode}
          className={`flex-1 py-3 px-6 rounded-xl font-medium flex items-center justify-center gap-3 transition-all shadow-md ${
            copiedCode
              ? 'bg-green-600 text-white'
              : 'bg-orange-600 hover:bg-orange-700 text-white'
          }`}
        >
          {copiedCode ? 'Code Copied!' : 'Copy Code'}
        </button>
        <button
          onClick={copyLink}
          className={`flex-1 py-3 px-6 rounded-xl font-medium flex items-center justify-center gap-3 transition-all shadow-md ${
            copiedLink
              ? 'bg-green-600 text-white'
              : 'bg-orange-600 hover:bg-orange-700 text-white'
          }`}
        >
          {copiedLink ? 'Link Copied!' : 'Copy Link'}
        </button>
      </div>

      {/* QR Code */}
      <div className="flex justify-center mb-10">
        <div className="bg-white dark:bg-white p-6 rounded-2xl shadow-xl border border-gray-200 dark:border-gray-300">
          <QRCode value={referralData.link} size={200} level="H" fgColor="#ea580c" bgColor="#ffffff" />
        </div>
      </div>

      {/* Referred Users */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="bg-white dark:bg-gray-900 p-6 sm:p-8 rounded-2xl border border-gray-200 dark:border-gray-800/60 shadow-md dark:shadow-xl"
      >
        <h2 className="text-2xl sm:text-3xl font-semibold mb-7 text-orange-600 dark:text-orange-300 flex items-center gap-3">
          <UserGroupIcon className="w-8 h-8" />
          Referred Users ({referredUsers.length})
        </h2>
        {referredUsers.length === 0 ? (
          <div className="text-center py-12 text-gray-500 dark:text-gray-400 bg-gray-50 dark:bg-gray-800/40 rounded-xl border border-dashed border-gray-300 dark:border-gray-700">
            <UsersIcon className="w-12 h-12 mx-auto mb-4 opacity-60" />
            <p className="text-lg font-medium">No referrals yet</p>
            <p className="mt-2">Share your link or code to start earning!</p>
          </div>
        ) : (
          <div className="space-y-4">
           
{referredUsers.length === 0 && (
  <div className="text-center py-12 text-gray-500 dark:text-gray-400 bg-gray-50 dark:bg-gray-800/40 rounded-xl border border-dashed border-gray-300 dark:border-gray-700">
    <UsersIcon className="w-12 h-12 mx-auto mb-4 opacity-60" />
    <p className="text-lg font-medium mb-3">No referrals visible yet</p>
    <p className="text-sm mb-4 max-w-md mx-auto">
      New signups using your code may take 5–30 minutes to appear (or longer if they need to verify email or make a deposit).
    </p>
    <button
      onClick={() => {
        fetchReferralData();
        toast.success("Refreshing...");
      }}
      disabled={loading}
      className="mt-3 px-6 py-2 bg-orange-600 hover:bg-orange-700 text-white rounded-lg text-sm font-medium"
    >
      Refresh List
    </button>
  </div>
)}
          </div>
        )}
      </motion.div>
    </div>
  );
}
