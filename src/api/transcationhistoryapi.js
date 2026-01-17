// src/api/walletApi.js
import { apiClient } from "./apiClient";

// Create a withdrawal
export const createWithdrawal = async (data) => {
  console.log("Creating withdrawal with data:", data);
  try {
    const response = await apiClient.post("/api/withdrawals", {
      amount: data.amount,
      cryptocurrency: data.cryptocurrency,
      walletAddress: data.walletAddress,
    });
    console.log("Create withdrawal response:", response.data);
    return response;
  } catch (err) {
    console.error("Error creating withdrawal:", err.response?.data || err.message);
    throw err;
  }
};

// Get all withdrawals
export const getWithdrawals = async () => {
  console.log("Fetching all withdrawals...");
  try {
    const response = await apiClient.get("/api/withdrawals");
    console.log("Get withdrawals response:", response.data);
    return response;
  } catch (err) {
    console.error("Error fetching withdrawals:", err.response?.data || err.message);
    throw err;
  }
};

// Get a single withdrawal by ID
export const getWithdrawalById = async (id) => {
  console.log(`Fetching withdrawal with ID: ${id}`);
  try {
    const response = await apiClient.get(`/api/withdrawals/${id}`);
    console.log("Get withdrawal by ID response:", response.data);
    return response;
  } catch (err) {
    console.error(`Error fetching withdrawal ${id}:`, err.response?.data || err.message);
    throw err;
  }
};

// Cancel a withdrawal
export const cancelWithdrawal = async (id) => {
  console.log(`Cancelling withdrawal with ID: ${id}`);
  try {
    const response = await apiClient.post(`/api/withdrawals/${id}/cancel`);
    console.log("Cancel withdrawal response:", response.data);
    return response;
  } catch (err) {
    console.error(`Error cancelling withdrawal ${id}:`, err.response?.data || err.message);
    throw err;
  }
};
