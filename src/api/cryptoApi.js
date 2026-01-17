import { apiClient } from './apiClient';

/**
 * Fetch crypto chart data for a specific coin
 * GET /api/crypto/:cryptoId/chart
 */
export const getCryptoChart = async (cryptoId) => {
  try {
    const res = await apiClient.get(`/api/crypto/${cryptoId}/chart`);
    console.log('getCryptoChart response:', res);
    return res;
  } catch (err) {
    console.error('getCryptoChart error:', err);
    throw err;
  }
};

/**
 * Fetch current prices for all supported cryptocurrencies
 * GET /api/crypto/prices
 */
export const getCryptoPrices = async () => {
  try {
    const res = await apiClient.get('/api/crypto/prices');
    console.log('getCryptoPrices response:', res);
    return res;
  } catch (err) {
    console.error('getCryptoPrices error:', err);
    throw err;
  }
};

/**
 * Convert USD amount to a specific crypto
 * POST /api/crypto/convert
 */
export const convertUsdToCrypto = async ({ amount, cryptoId }) => {
  try {
    const res = await apiClient.post('/api/crypto/convert', {
      amount,
      cryptoId,
      direction: 'usdToCrypto',
    });
    console.log('convertUsdToCrypto response:', res);
    return res;
  } catch (err) {
    console.error('convertUsdToCrypto error:', err);
    throw err;
  }
};
