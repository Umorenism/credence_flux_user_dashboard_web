// src/api/userApi.js
import { apiClient } from "./apiClient";

export const userService = {
  // GET /api/users/profile
  getProfile: async () => {
    const res = await apiClient.get("/api/users/profile");
    console.log("getProfile response:", res.data);
    return res.data;
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
