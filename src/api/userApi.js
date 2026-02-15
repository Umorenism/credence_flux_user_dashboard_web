// src/api/userApi.js
import { apiClient } from "./apiClient";

export const userService = {
  // GET /api/users/profile
  getProfile: async () => {
    const res = await apiClient.get("/api/users/profile");
    console.log("getProfile response:", res.data);
    return res.data;


  },


  generateReferralCode: async () => {
    try {
      const res = await apiClient.post("/api/users/referral/generate-code");
      console.log("generateReferralCode response:", res.data);
      return res.data;
    } catch (err) {
      console.error("generateReferralCode error:", err);
      throw err;
    }
  },

  getReferralStats: async () => {
    try {
      const res = await apiClient.get("/api/users/referral/stats");
      console.log("getReferralStats response:", res.data);
      return res.data;
    } catch (err) {
      console.error("getReferralStats error:", err);
      throw err;
    }
  },

  getReferralHistory: async (params = { limit: 20, skip: 0 }) => {
    try {
      const res = await apiClient.get("/api/users/referral/history", { params });
      console.log("getReferralHistory response:", res.data);
      return res.data;
    } catch (err) {
      console.error("getReferralHistory error:", err);
      throw err;
    }
  },


  

  // GET /api/users/dashboard
  getDashboard: async () => {
    const res = await apiClient.get("/api/users/dashboard");
    console.log("getDashboard response:", res.data);
    return res.data;
  },

  // PUT /api/users/profile
  updateProfile: async (data) => {
    const res = await apiClient.put("/api/users/profile", data);
    console.log("updateProfile response:", res.data);
    return res.data;
  },

  // PUT /api/users/change-password
  changePassword: async ({ currentPassword, newPassword }) => {
    const res = await apiClient.put("/api/users/change-password", {
      currentPassword,
      newPassword,
    });
    console.log("changePassword response:", res.data);
    return res.data;
  },

  // GET /api/users/dashboard → dashboard summary
  getDashboardSummary: async () => {
    const res = await apiClient.get("/api/users/dashboard");
    console.log("getDashboardSummary response:", res.data);
    return res.data;
  },

  // GET /api/users/transactions → transaction history
  getTransactions: async () => {
    const res = await apiClient.get("/api/users/transactions");
    console.log("getTransactions response:", res.data);
    return res.data;
  },

  // GET /api/users/referrals → referral stats & list
  getReferrals: async () => {
    const res = await apiClient.get("/api/users/referrals");
    console.log("getReferrals response:", res.data);
    return res.data;
  },
};
