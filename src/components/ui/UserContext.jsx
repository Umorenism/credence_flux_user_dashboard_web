// src/context/UserContext.jsx
import React, { createContext, useContext, useState, useEffect } from 'react';
import { userService } from '../../api/userApi';

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Load user profile once on app mount
  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const data = await userService.getProfile();
        setUser({
          fullName: data.fullName || 'User',
          avatar: data.avatar || '',
          email: data.email || '',
          phone: data.phone || '',
          country: data.country || '',
          // add any other fields you want available globally
        });
      } catch (err) {
        console.error('Failed to load user profile:', err);
        // Optional: handle token expiration → redirect to login
      } finally {
        setLoading(false);
      }
    };

    // Only fetch if we have a token (user is logged in)
    if (localStorage.getItem('token')) {
      fetchUserProfile();
    } else {
      setLoading(false);
    }
  }, []);

  // Function to update user state after profile edit
  const updateUserProfile = (updatedData) => {
    setUser(prev => ({
      ...prev,
      ...updatedData,
    }));
  };

  return (
    <UserContext.Provider value={{ user, loading, updateUserProfile }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};