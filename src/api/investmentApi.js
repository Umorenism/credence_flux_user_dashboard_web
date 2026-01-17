// src/api/investmentApi.js
import { apiClient } from "./apiClient";

export const investmentService = {
  // Get all investments history
  getInvestments: async () => {
    const response = await apiClient.get("/api/investments");
    return response.data;
  },

  // Get single investment details
  getInvestmentById: async (id) => {
    const response = await apiClient.get(`/api/investments/${id}`);
    return response.data;
  },

  // Get earnings history for a specific investment
  getEarningsByInvestment: async (id) => {
    const response = await apiClient.get(`/api/investments/${id}/earnings`);
    return response.data;
  },

  // Get all earnings from all investments
  getAllEarnings: async () => {
    const response = await apiClient.get("/api/investments/earnings/all");
    return response.data;
  },

  // Get today's earnings breakdown
  getTodayEarnings: async () => {
    const response = await apiClient.get("/api/investments/earnings/today");
    return response.data;
  },

  // Get earnings dashboard stats
  getEarningsStats: async () => {
    const response = await apiClient.get("/api/investments/earnings/stats");
    return response.data;
  },
};