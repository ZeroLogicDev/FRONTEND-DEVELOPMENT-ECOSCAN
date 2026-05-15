/**
 * Format a confidence value as a display-friendly percentage string.
 *
 * @param {number} confidence - Confidence value (0-100)
 * @param {number} [decimals=1] - Number of decimal places
 * @returns {string} Formatted string (e.g., "92.5%")
 */
export function formatConfidence(confidence, decimals = 1) {
  if (confidence == null || isNaN(confidence)) return '-';
  return `${Number(confidence).toFixed(decimals)}%`;
}

/**
 * Get a semantic color class based on confidence level.
 *
 * @param {number} confidence - Confidence value (0-100)
 * @returns {string} Tailwind color class
 */
export function getConfidenceColor(confidence) {
  if (confidence >= 85) return 'text-green-500';
  if (confidence >= 65) return 'text-yellow-500';
  return 'text-red-500';
}
