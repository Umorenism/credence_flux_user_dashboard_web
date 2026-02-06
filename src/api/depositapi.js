// import { apiClient } from "./apiClient";

// /**
//  * Create a new deposit payment request
//  * POST /api/deposits
//  * body: { amount: number }
//  */
// export const createDeposit = async (amount) => {
//   const res = await apiClient.post("/api/deposits", { amount });
//   console.log("createDeposit response:", res.data);
//   return res.data;
// };

// /**
//  * Get deposit history of the current user
//  * GET /api/deposits
//  */
// export const getDepositHistory = async () => {
//   const res = await apiClient.get("/api/deposits");
//   console.log("getDepositHistory response:", res.data);
//   return res.data;
// };

// /**
//  * Check status of a specific deposit payment
//  * GET /api/deposits/check/:paymentId
//  */
// export const checkDepositStatus = async (paymentId) => {
//   const res = await apiClient.get(`/api/deposits/check/${paymentId}`);
//   console.log(`checkDepositStatus (${paymentId}) response:`, res.data);
//   return res.data;
// };

// /**
//  * Get details of a single deposit
//  * GET /api/deposits/:id
//  */
// export const getDepositById = async (id) => {
//   const res = await apiClient.get(`/api/deposits/${id}`);
//   console.log(`getDepositById (${id}) response:`, res.data);
//   return res.data;
// };



import { apiClient } from "./apiClient";

/**
 * Create a new deposit payment request
 * POST /api/deposits
 * body: { amount: number }
 */
export const createDeposit = async (amount) => {
  const res = await apiClient.post("/api/deposits", { amount });
  console.log("createDeposit response:", res.data);
  return res.data;
};

/**
 * Get deposit history of the current user
 * GET /api/deposits
 */
export const getDepositHistory = async () => {
  const res = await apiClient.get("/api/deposits");
  console.log("getDepositHistory response:", res.data);
  return res.data;
};

/**
 * Check status of a specific deposit payment
 * GET /api/deposits/check/:paymentId
 */
export const checkDepositStatus = async (paymentId) => {
  const res = await apiClient.get(`/api/deposits/check/${paymentId}`);
  console.log(`checkDepositStatus (${paymentId}) response:`, res.data);
  return res.data;
};

/**
 * Get details of a single deposit
 * GET /api/deposits/:id
 */
export const getDepositById = async (id) => {
  const res = await apiClient.get(`/api/deposits/${id}`);
  console.log(`getDepositById (${id}) response:`, res.data);
  return res.data;
};

// tradingApi.js or depositapi.js — keep this version
export const uploadReceipt = async (formData) => {
  try {
    const response = await apiClient.post(
      "/api/trading/deposit/upload-receipt",
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );

    console.log("uploadReceipt response:", response.data);
    return response.data;
  } catch (err) {
    console.error("uploadReceipt failed:", {
      status: err.response?.status,
      data: err.response?.data,
      message: err.message,
    });
    throw err.response?.data || { message: "Upload failed", error: err };
  }
};