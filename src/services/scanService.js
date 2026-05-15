import apiClient from '@/lib/apiClient';

/**
 * Scan service — handles AI prediction via FastAPI.
 */
const scanService = {
  /**
   * Send an image to the AI model for waste classification.
   *
   * @param {File|Blob} imageFile - The image to classify
   * @returns {Promise<import('@/types').PredictionResponse>} Prediction result
   */
  async predictImage(imageFile) {
    const formData = new FormData();
    formData.append('file', imageFile);

    const result = await apiClient.post('/predict', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });

    if (result.status === 'error') {
      throw new Error(result.message || 'Prediction failed');
    }

    return result;
  },

  /**
   * Check if the AI API is online.
   * @returns {Promise<boolean>}
   */
  async healthCheck() {
    try {
      const result = await apiClient.get('/');
      return result.status === 'ok';
    } catch {
      return false;
    }
  },
};

export default scanService;
