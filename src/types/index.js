/**
 * @typedef {Object} Profile
 * @property {string} id - UUID, same as auth.users.id
 * @property {string} email - User's email
 * @property {string|null} full_name - Display name
 * @property {number} total_points - Accumulated EcoCoins
 * @property {string} created_at - ISO 8601 timestamp
 */

/**
 * @typedef {Object} ScanResult
 * @property {string} id - UUID
 * @property {string} user_id - FK to profiles.id
 * @property {string} class_name - Predicted waste class (e.g., 'plastic', 'biological')
 * @property {string} category - 'Organik' or 'Anorganik'
 * @property {number} confidence - Confidence percentage (0-100)
 * @property {string} created_at - ISO 8601 timestamp
 */

/**
 * @typedef {Object} PredictionResponse
 * @property {'success'|'error'} status
 * @property {string} [class] - Predicted class name
 * @property {string} [category] - 'Organik' or 'Anorganik'
 * @property {number} [confidence] - Confidence percentage (0-100)
 * @property {string} [message] - Error message (when status is 'error')
 */

/**
 * @typedef {Object} DashboardStats
 * @property {number} totalScans
 * @property {number} organicCount
 * @property {number} inorganicCount
 * @property {number} ecoCoins
 */

export {};
