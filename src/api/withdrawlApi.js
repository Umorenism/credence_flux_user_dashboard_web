// import { apiClient } from "./apiClient";

// /**
//  * Create a new withdrawal request
//  * POST /api/withdrawals
//  */
// export const createWithdrawal = async (data) => {
//   console.log("Creating withdrawal request:", data);
//   try {
//     // API expects `amount` not `cryptoAmount`
//     const payload = {
//       amount: data.amount,              
//       cryptocurrency: data.cryptocurrency,
//       walletAddress: data.walletAddress,
//     };
//     console.log("Payload sent to API:", payload);

//     const res = await apiClient.post("/api/withdrawals", payload);
//     console.log("Withdrawal API response:", res.data);
//     return res.data;
//   } catch (err) {
//     console.error("Withdrawal API error:", err.response?.data || err.message);
//     throw err;
//   }
// };

// /**
//  * Fetch the current user's withdrawal history
//  * GET /api/withdrawals
//  */
// export const getWithdrawals = async () => {
//   try {
//     const res = await apiClient.get("/api/withdrawals");
//     console.log("Withdrawal history response:", res.data);
//     return res.data;
//   } catch (err) {
//     console.error("Get withdrawals error:", err.response?.data || err.message);
//     throw err;
//   }
// };

// /**
//  * Get details of a specific withdrawal
//  * GET /api/withdrawals/:id
//  */
// export const getWithdrawalById = (id) => {
//   return apiClient.get(`/api/withdrawals/${id}`);
// };





import { apiClient } from "./apiClient";

/**
 * Create a new withdrawal request
 * POST /api/withdrawal/request
 * body: { amount, cryptocurrency, network, userWalletAddress }
 */
export const createWithdrawalRequest = async (data) => {
  try {
    const payload = {
      amount: Number(data.amount),
      cryptocurrency: data.cryptocurrency,
      network: data.network || "BSC",
      userWalletAddress: data.userWalletAddress.trim(),
    };

    console.log("Creating withdrawal → payload:", payload);

    const res = await apiClient.post("/api/withdrawal/request", payload);
    console.log("Withdrawal request response:", res.data);

    return res.data;
  } catch (err) {
    console.error("Withdrawal request failed:", err.response?.data || err.message);
    throw err;
  }
};

/**
 * Get withdrawal history
 * GET /api/withdrawal?status=...&limit=...&skip=...
 */
export const getWithdrawalHistory = async ({ status = "", limit = 20, skip = 0 } = {}) => {
  try {
    const params = { limit, skip };
    if (status) params.status = status;

    const res = await apiClient.get("/api/withdrawal", { params });
    console.log("Withdrawal history response:", res.data);
    return res.data;
  } catch (err) {
    console.error("Get withdrawal history error:", err.response?.data || err);
    throw err;
  }
};

/**
 * Get single withdrawal details
 * GET /api/withdrawal/{withdrawalId}
 */
export const getWithdrawalById = async (withdrawalId) => {
  try {
    const res = await apiClient.get(`/api/withdrawal/${withdrawalId}`);
    return res.data;
  } catch (err) {
    console.error(`Get withdrawal ${withdrawalId} error:`, err);
    throw err;
  }
};

/**
 * Cancel a withdrawal request
 * POST /api/withdrawal/{withdrawalId}/cancel
 */
export const cancelWithdrawal = async (withdrawalId) => {
  try {
    const res = await apiClient.post(`/api/withdrawal/${withdrawalId}/cancel`);
    console.log("Cancel withdrawal response:", res.data);
    return res.data;
  } catch (err) {
    console.error("Cancel withdrawal failed:", err.response?.data || err);
    throw err;
  }
};