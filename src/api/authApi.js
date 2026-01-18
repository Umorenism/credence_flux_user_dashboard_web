// // src/api/authApi.js
// import { apiClient } from "../api/apiClient";  // or "./apiServices" 
// export const signUpUser = (email,username,password,fullName,phone,country,referralCode) => {
//   return apiClient.post("/api/auth/register", { email,username,password,fullName,phone,country,referralCode });
  
// };

// export const loginUser = (email, password, twoFactorCode) => {
//   return apiClient.post("/auth/login", {
//     email,
//     password,
//     ...(twoFactorCode ? { twoFactorCode } : {}),
//   });
// };
// export const verifyEmail = (email, code) => {
//   return apiClient.post("/api/auth/verify-email", { email, code });
  
// };
// export const forgetPassword = (email) => {
//   return apiClient.post("/api/auth/forgot-password", { email });
// };

// export const resetPassword = (password) => {
//   return apiClient.post("/api/auth/reset-password/{token}", { password });
  
// };





// src/api/authApi.js
import { apiClient } from "../api/apiClient";

/* ---------------- REGISTER ---------------- */
export const signUpUser = (
  email,
  username,
  password,
  fullName,
  phone,
  country,
  referralCode
) => {
  return apiClient.post("/api/auth/register", {
    email,
    username,
    password,
    fullName,
    phone,
    country,
    referralCode,
  });
};

/* ---------------- LOGIN (FIXED) ---------------- */
export const loginUser = (email, password, twoFactorCode) => {
  return apiClient.post("/api/auth/login", {
    email,
    password,
    ...(twoFactorCode ? { twoFactorCode } : {}),
  });
};

/* ---------------- VERIFY EMAIL ---------------- */
export const verifyEmail = (email, code) => {
  return apiClient.post("/api/auth/verify-email", {
    email,
    code,
  });
};

/* ---------------- FORGOT PASSWORD ---------------- */
export const forgetPassword = (email) => {
  return apiClient.post("/api/auth/forgot-password", {
    email,
  });
};

/* ---------------- RESET PASSWORD (FIXED) ---------------- */
export const resetPassword = (token, password) => {
  return apiClient.post(`/api/auth/reset-password/${token}`, {
    password,
  });
};
