/**
 * Gamification: Calculate EcoCoins earned from scan results.
 *
 * Point system:
 * - Organic waste scan: 10 coins (encouraging composting awareness)
 * - Inorganic waste scan: 5 coins (basic recycling awareness)
 * - High confidence bonus (>90%): +3 coins
 * - Streak bonus: +2 coins per consecutive day
 *
 * @param {string} category - 'Organik' or 'Anorganik'
 * @param {number} confidence - Confidence percentage (0-100)
 * @returns {number} EcoCoins earned for this scan
 */
export function calculateCoins(category, confidence) {
  let coins = 0;

  // Base points by category
  if (category === 'Organik') {
    coins = 10;
  } else {
    coins = 5;
  }

  // Confidence bonus
  if (confidence >= 90) {
    coins += 3;
  } else if (confidence >= 75) {
    coins += 1;
  }

  return coins;
}

/**
 * Calculate total coins from an array of scan history entries.
 *
 * @param {Array<{category: string, confidence: number}>} scans
 * @returns {number} Total EcoCoins
 */
export function calculateTotalCoins(scans) {
  if (!scans || scans.length === 0) return 0;
  return scans.reduce((total, scan) => {
    return total + calculateCoins(scan.category, scan.confidence);
  }, 0);
}

/**
 * Get the coin tier/level based on total points.
 *
 * @param {number} totalPoints
 * @returns {{ tier: string, label: string, minPoints: number, nextTier: number }}
 */
export function getCoinTier(totalPoints) {
  if (totalPoints >= 1000) {
    return { tier: 'platinum', label: 'Eco Champion', minPoints: 1000, nextTier: null };
  }
  if (totalPoints >= 500) {
    return { tier: 'gold', label: 'Eco Warrior', minPoints: 500, nextTier: 1000 };
  }
  if (totalPoints >= 200) {
    return { tier: 'silver', label: 'Eco Explorer', minPoints: 200, nextTier: 500 };
  }
  if (totalPoints >= 50) {
    return { tier: 'bronze', label: 'Eco Starter', minPoints: 50, nextTier: 200 };
  }
  return { tier: 'seedling', label: 'Eco Seedling', minPoints: 0, nextTier: 50 };
}
