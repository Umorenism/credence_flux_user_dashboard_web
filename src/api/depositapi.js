// // import { apiClient } from "./apiClient";

// // /**
// //  * Create a new deposit payment request
// //  * POST /api/deposits
// //  * body: { amount: number }
// //  */
// // export const createDeposit = async (amount) => {
// //   const res = await apiClient.post("/api/deposits", { amount });
// //   console.log("createDeposit response:", res.data);
// //   return res.data;
// // };

// // /**
// //  * Get deposit history of the current user
// //  * GET /api/deposits
// //  */
// // export const getDepositHistory = async () => {
// //   const res = await apiClient.get("/api/deposits");
// //   console.log("getDepositHistory response:", res.data);
// //   return res.data;
// // };

// // /**
// //  * Check status of a specific deposit payment
// //  * GET /api/deposits/check/:paymentId
// //  */
// // export const checkDepositStatus = async (paymentId) => {
// //   const res = await apiClient.get(`/api/deposits/check/${paymentId}`);
// //   console.log(`checkDepositStatus (${paymentId}) response:`, res.data);
// //   return res.data;
// // };

// // /**
// //  * Get details of a single deposit
// //  * GET /api/deposits/:id
// //  */
// // export const getDepositById = async (id) => {
// //   const res = await apiClient.get(`/api/deposits/${id}`);
// //   console.log(`getDepositById (${id}) response:`, res.data);
// //   return res.data;
// // };



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

// // tradingApi.js or depositapi.js — keep this version
// // api/depositapi.js
// export const uploadReceipt = async (depositId, file) => {
//   const formData = new FormData();
//   formData.append('receipt', file);   // ← MUST match backend's upload.single('receipt')

//   try {
//     const response = await axios.post(
//       `/api/deposits/upload-receipt/${depositId}`,   // adjust endpoint if needed
//       formData,
//       {
//         headers: {
//           'Content-Type': 'multipart/form-data',
//         },
//       }
//     );
//     return response.data;
//   } catch (error) {
//     console.error('Upload error:', error.response?.data || error);
//     throw error;
//   }
// };





// api/depositapi.js
import { apiClient } from "./apiClient";   // assuming this is axios instance with auth etc.
import axios from "axios";                 // if you need raw axios for FormData

// api/depositapi.js


export const initiateDeposit = async (amount) => {
  return apiClient.post("/api/deposits/initiate", {
    amount,
    cryptocurrency: "USDT",
  }).then(res => res.data);
};

export const getDepositHistory = async (status = "", limit = 50, skip = 0) => {
  return apiClient.get("/api/deposits/history", {
    params: { status, limit, skip }
  }).then(res => res.data);
};

export const uploadReceipt = async (depositId, file) => {
  const formData = new FormData();
  formData.append("receipt", file);

  // If backend expects depositId in body (some do, some use URL param)
  // formData.append("depositId", depositId);   // ← uncomment only if needed

  const response = await apiClient.post(
    `/api/deposits/upload-receipt/${depositId}`,
    formData,
    {
      headers: { "Content-Type": "multipart/form-data" },
    }
  );

  return response.data;
};