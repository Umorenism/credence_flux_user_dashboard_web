// src/api/authApi.js
import { apiClient } from "../api/apiClient";  // or "./apiServices" 
export const signUpUser = (email,username,password,fullName,phone,country,referralCode) => {
  return apiClient.post("/api/auth/register", { email,username,password,fullName,phone,country,referralCode });
  
};

export const loginUser = (email, password,twoFactorCode) => {
  return apiClient.post("/api/auth/login", { email, password, twoFactorCode });
  
};
export const verifyEmail = (email, code) => {
  return apiClient.post("/api/auth/verify-email", { email, code });
  
};
export const forgetPassword = (email) => {
  return apiClient.post("/api/auth/forget-password", { email });
  
};
export const resetPassword = (password) => {
  return apiClient.post("/api/auth/reset-password/{token}", { password });
  
};


