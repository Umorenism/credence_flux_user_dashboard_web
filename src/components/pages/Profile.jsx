// src/pages/Profile.jsx
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  UserCircleIcon,
  EnvelopeIcon,
  KeyIcon,
  ShieldCheckIcon,
  PhoneIcon,
  MapPinIcon,
  CheckCircleIcon
} from '@heroicons/react/24/solid';
import { userService } from '../../api/userApi';

export default function Profile() {
  const [profile, setProfile] = useState({
    fullName: '',
    email: '',
    phone: '',
    country: '',
    avatar: '',
    joined: '',
    kycStatus: 'Not Verified',
  });

  const [editMode, setEditMode] = useState(false);
  const [form, setForm] = useState({
    fullName: '',
    phone: '',
    country: '',
    avatar: '',
  });

  const [passwordForm, setPasswordForm] = useState({
    currentPassword: '',
    newPassword: '',
  });

  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState('');

  // Load profile on mount
  useEffect(() => {
    const loadProfile = async () => {
      try {
        const data = await userService.getProfile();
        setProfile({
          fullName: data.fullName || 'User',
          email: data.email || '',
          phone: data.phone || '',
          country: data.country || '',
          avatar: data.avatar || '',
          joined: data.createdAt ? new Date(data.createdAt).toLocaleDateString() : '',
          kycStatus: data.kycVerified ? 'Verified' : 'Not Verified',
        });
        setForm({
          fullName: data.fullName || '',
          phone: data.phone || '',
          country: data.country || '',
          avatar: data.avatar || '',
        });
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    loadProfile();
  }, []);

  const handleSaveProfile = async () => {
    try {
      const updateData = { ...form };
      await userService.updateProfile(updateData);

      // Update local state
      setProfile(prev => ({ ...prev, ...updateData }));
      setEditMode(false);
      setMessage('Profile updated successfully');
      setTimeout(() => setMessage(''), 4000);
    } catch (err) {
      setMessage(err.response?.data?.message || 'Failed to update profile');
    }
  };

  const handleChangePassword = async () => {
    if (!passwordForm.currentPassword || !passwordForm.newPassword) {
      setMessage('Please fill in both password fields');
      return;
    }
    try {
      const res = await userService.changePassword(passwordForm);
      if (res.success) {
        setPasswordForm({ currentPassword: '', newPassword: '' });
        setMessage('Password changed successfully');
      } else {
        setMessage(res.message || 'Failed to change password');
      }
    } catch (err) {
      setMessage(err.response?.data?.message || 'Failed to change password');
    }
    setTimeout(() => setMessage(''), 4000);
  };

  if (loading) {
    return (
      <div className="min-h-screen dark:bg-gray-950 bg-white flex items-center justify-center">
        <div className="w-12 h-12 border-4 border-orange-600 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen dark:bg-gray-950 bg-white text-white p-4 sm:p-6 lg:p-8">
      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-3xl md:text-4xl font-bold mb-10 text-orange-400 text-center"
      >
        My Profile
      </motion.h1>

      <div className="max-w-3xl mx-auto space-y-10">
        {/* Profile Card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          className="dark:bg-gray-950 bg-white p-6 sm:p-8 rounded-2xl border border-orange-900/50"
        >
          <div className="flex flex-col md:flex-row items-center gap-6 md:gap-8 mb-8">
            {profile.avatar ? (
              <img
                src={profile.avatar}
                alt="Profile"
                className="w-28 h-28 rounded-full object-cover border-4 border-orange-500/30"
              />
            ) : (
              <UserCircleIcon className="w-28 h-28 text-orange-500" />
            )}
            <div className="text-center md:text-left">
              <h2 className="text-3xl font-bold text-orange-300">{profile.fullName}</h2>
              <p className="text-gray-300 mt-1 flex items-center gap-2 justify-center md:justify-start">
                <EnvelopeIcon className="w-5 h-5" />
                {profile.email}
              </p>
              {profile.phone && (
                <p className="text-gray-300 mt-1 flex items-center gap-2 justify-center md:justify-start">
                  <PhoneIcon className="w-5 h-5" />
                  {profile.phone}
                </p>
              )}
              {profile.country && (
                <p className="text-gray-300 mt-1 flex items-center gap-2 justify-center md:justify-start">
                  <MapPinIcon className="w-5 h-5" />
                  {profile.country}
                </p>
              )}
              <p className="text-sm text-gray-500 mt-2">Member since {profile.joined}</p>
            </div>
          </div>

          {/* Status Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div className="bg-gray-100 dark:bg-gray-800 p-5 rounded-xl">
              <h3 className="text-lg font-semibold text-orange-300 mb-2">KYC Status</h3>
              <p className={`font-medium ${profile.kycStatus === 'Verified' ? 'text-green-400' : 'text-orange-400'}`}>
                {profile.kycStatus}
              </p>
            </div>
            <div className="bg-gray-100 dark:bg-gray-800 p-5 rounded-xl">
              <h3 className="text-lg font-semibold text-orange-300 mb-2">Security</h3>
              <p className="text-green-400 font-medium flex items-center gap-2">
                <ShieldCheckIcon className="w-5 h-5" /> 2FA Enabled
              </p>
            </div>
          </div>

          {/* Edit Profile */}
          {!editMode ? (
            <button
              onClick={() => setEditMode(true)}
              className="w-full py-3 bg-orange-700 hover:bg-orange-600 rounded-xl font-medium transition"
            >
              Edit Profile
            </button>
          ) : (
            <div className="space-y-4">
              <input
                type="text"
                value={form.fullName}
                onChange={e => setForm({ ...form, fullName: e.target.value })}
                placeholder="Full Name"
                className="w-full p-4 dark:bg-gray-950 bg-white border border-orange-800 rounded-xl focus:border-orange-500 outline-none"
              />
              <input
                type="tel"
                value={form.phone}
                onChange={e => setForm({ ...form, phone: e.target.value })}
                placeholder="Phone Number"
                className="w-full p-4 dark:bg-gray-950 bg-white border border-orange-800 rounded-xl focus:border-orange-500 outline-none"
              />
              <input
                type="text"
                value={form.country}
                onChange={e => setForm({ ...form, country: e.target.value })}
                placeholder="Country"
                className="w-full p-4 dark:bg-gray-950 bg-white border border-orange-800 rounded-xl focus:border-orange-500 outline-none"
              />
              <input
                type="url"
                value={form.avatar}
                onChange={e => setForm({ ...form, avatar: e.target.value })}
                placeholder="Avatar URL (optional)"
                className="w-full p-4 dark:bg-gray-950 bg-white border border-orange-800 rounded-xl focus:border-orange-500 outline-none"
              />

              <div className="flex gap-4">
                <button
                  onClick={handleSaveProfile}
                  className="flex-1 py-3 bg-orange-600 hover:bg-orange-500 rounded-xl font-medium"
                >
                  Save Changes
                </button>
                <button
                  onClick={() => setEditMode(false)}
                  className="flex-1 py-3 bg-gray-800 hover:bg-gray-700 rounded-xl font-medium"
                >
                  Cancel
                </button>
              </div>
            </div>
          )}
        </motion.div>

        {/* Change Password */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="bg-white dark:bg-gray-950 p-6 sm:p-8 rounded-2xl border border-orange-900/50"
        >
          <h2 className="text-2xl font-semibold mb-4 text-orange-300 flex items-center gap-3">
            <KeyIcon className="w-6 h-6" /> Change Password
          </h2>
          <div className="space-y-4">
            <input
              type="password"
              placeholder="Current Password"
              value={passwordForm.currentPassword}
              onChange={e => setPasswordForm({ ...passwordForm, currentPassword: e.target.value })}
              className="w-full p-4 dark:bg-gray-950 bg-white border border-orange-800 rounded-xl focus:border-orange-500 outline-none"
            />
            <input
              type="password"
              placeholder="New Password"
              value={passwordForm.newPassword}
              onChange={e => setPasswordForm({ ...passwordForm, newPassword: e.target.value })}
              className="w-full p-4 dark:bg-gray-950 bg-white border border-orange-800 rounded-xl focus:border-orange-500 outline-none"
            />
            <button
              onClick={handleChangePassword}
              className="w-full py-3 bg-orange-600 hover:bg-orange-500 rounded-xl font-medium mt-2"
            >
              Update Password
            </button>
          </div>
        </motion.div>

        {message && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className={`text-center mt-4 font-medium ${message.includes('success') ? 'text-green-400' : 'text-red-400'}`}
          >
            {message}
          </motion.p>
        )}
      </div>
    </div>
  );
}
