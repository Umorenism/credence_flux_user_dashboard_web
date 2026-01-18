

// src/api/apiClient.js
import axios from "axios";

const base_url = "https://cryptoinvestment-y1aa.onrender.com";

export const apiClient = axios.create({
  baseURL: base_url,
  headers: {
    "Content-Type": "application/json",
  },
});

/* ----------------------------------
   REQUEST INTERCEPTOR
----------------------------------- */
apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token"); // ✅ single source of truth
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

/* ----------------------------------
   RESPONSE INTERCEPTOR
----------------------------------- */
apiClient.interceptors.response.use(
  res => res,
  err => {
    if (err.response?.status === 401) {
      localStorage.clear();

      if (!window.location.pathname.includes("/get-started")) {
        window.location.replace("/get-started");
      }
    }
    return Promise.reject(err);
  }
);




