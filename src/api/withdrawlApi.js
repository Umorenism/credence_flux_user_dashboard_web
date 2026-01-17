import { apiClient } from "./apiClient";

/**
 * Create a new withdrawal request
 * POST /api/withdrawals
 */
export const createWithdrawal = async (data) => {
  console.log("Creating withdrawal request:", data);
  try {
    // API expects `amount` not `cryptoAmount`
    const payload = {
      amount: data.amount,              
      cryptocurrency: data.cryptocurrency,
      walletAddress: data.walletAddress,
    };
    console.log("Payload sent to API:", payload);

    const res = await apiClient.post("/api/withdrawals", payload);
    console.log("Withdrawal API response:", res.data);
    return res.data;
  } catch (err) {
    console.error("Withdrawal API error:", err.response?.data || err.message);
    throw err;
  }
};

/**
 * Fetch the current user's withdrawal history
 * GET /api/withdrawals
 */
export const getWithdrawals = async () => {
  try {
    const res = await apiClient.get("/api/withdrawals");
    console.log("Withdrawal history response:", res.data);
    return res.data;
  } catch (err) {
    console.error("Get withdrawals error:", err.response?.data || err.message);
    throw err;
  }
};

/**
 * Get details of a specific withdrawal
 * GET /api/withdrawals/:id
 */
export const getWithdrawalById = (id) => {
  return apiClient.get(`/api/withdrawals/${id}`);
};
