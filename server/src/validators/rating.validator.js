/**
 * Validate store rating input (strictly integer 1 to 5)
 */
export const validateRating = (rating) => {
  const num = Number(rating);
  if (isNaN(num) || !Number.isInteger(num) || num < 1 || num > 5) {
    return 'Rating must be an integer between 1 and 5';
  }
  return null;
};
