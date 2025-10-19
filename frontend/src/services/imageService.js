// src/services/imageService.js

/**
 * Get the correct URL for a product image
 * @param {string} imagePath - The image path from the API
 * @returns {string} - The correct URL for the image
 */
/**
 * For public folder images, just return the path as-is.
 * If the path does not start with '/', add it.
 */
export const getProductImage = (imagePath) => {
  if (!imagePath) return '';
  if (imagePath.startsWith('http://') || imagePath.startsWith('https://')) return imagePath;
  return imagePath.startsWith('/') ? imagePath : `/${imagePath}`;
};
