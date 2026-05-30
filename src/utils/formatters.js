/**
 * Formats a raw numeric parameter into a clean, localized currency string.
 * @param {number|string} amount - Raw numeric value sequence.
 * @returns {string} - Cleanly formatted currency layout payload (e.g., "45,500.00 ETB").
 */
export const formatCurrency = (amount) => {
  const numericValue = parseFloat(amount);
  if (isNaN(numericValue)) return '0.00 ETB';
  
  return new Intl.NumberFormat('en-US', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  }).format(numericValue) + ' ETB';
};

/**
 * Parses raw system database ISO timestamps into highly scannable tracking expressions.
 * @param {string} isoString - Raw database date payload.
 * @returns {string} - Formatted human-readable output (e.g., "May 25, 2026").
 */
export const formatDate = (isoString) => {
  if (!isoString) return '---';
  const dateObj = new Date(isoString);
  
  return dateObj.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  });
};

/**
 * Generates an truncated sequence for long technical asset ID strings or hash parameters.
 * @param {string} hashString - Target alphanumeric string tracking index.
 * @param {number} boundary - Characters to preserve at ends.
 * @returns {string} - Truncated format layout blueprint (e.g., "65d2...fa4e").
 */
export const truncateHash = (hashString, boundary = 4) => {
  if (!hashString || hashString.length <= boundary * 2) return hashString;
  return `${hashString.slice(0, boundary)}...${hashString.slice(-boundary)}`;
};