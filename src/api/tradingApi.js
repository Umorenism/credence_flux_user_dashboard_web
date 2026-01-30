
import { apiClient } from "./apiClient";

export const tradingService = {
  /* ------------------- PAIRS ------------------- */
  getPairs() {
    return apiClient.get("/api/trading/pairs").then(response => {
      console.log('getPairs response:', response.data);
      return response;
    });
  },

  /* ------------------- MARKET TRADE ------------------- */
  executeTrade(payload) {
    return apiClient.post("/api/trading/trade", payload).then(response => {
      console.log('executeTrade response:', response.data);
      return response;
    });
  },

  /* ------------------- LIMIT ORDER ------------------- */
  createOrder(payload) {
    return apiClient.post("/api/trading/orders", payload).then(response => {
      console.log('createOrder response:', response.data);
      return response;
    });
  },

  getOrders(params = {}) {
    return apiClient.get("/api/trading/orders", { params }).then(response => {
      console.log('getOrders response:', response.data);
      return response;
    });
  },

  cancelOrder(orderId) {
    return apiClient.put(`/api/trading/orders/${orderId}/cancel`).then(response => {
      console.log('cancelOrder response:', response.data);
      return response;
    });
  },

  /* ------------------- TRADES ------------------- */
  getTrades(params = {}) {
    return apiClient.get("/api/trading/trades", { params }).then(response => {
      console.log('getTrades response:', response.data);
      return response;
    });
  },

  getTradeById(tradeId) {
    return apiClient.get(`/api/trading/trades/${tradeId}`).then(response => {
      console.log('getTradeById response:', response.data);
      return response;
    });
  },

  /* ------------------- PORTFOLIO ------------------- */
  getPortfolio() {
    return apiClient.get("/api/trading/portfolio").then(response => {
      console.log('getPortfolio response:', response.data);
      return response;
    });
  },

  getStats() {
    return apiClient.get("/api/trading/stats").then(response => {
      console.log('getStats response:', response.data);
      return response;
    });
  },

  /* ------------------- DEPOSIT ------------------- */
  uploadReceipt(formData) {
    return apiClient.post(
      "/api/trading/deposit/upload-receipt",
      formData,
      {
        headers: { "Content-Type": "multipart/form-data" },
      }
    ).then(response => {
      console.log('uploadReceipt response:', response.data);
      return response;
    });
  },
};