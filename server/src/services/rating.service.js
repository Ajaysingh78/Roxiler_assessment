import { ratingRepository } from '../repositories/rating.repository.js';
import { storeRepository } from '../repositories/store.repository.js';
import { validateRating } from '../validators/rating.validator.js';
import { MESSAGES } from '../constants/messages.js';

export class RatingService {
  async submitOrUpdateRating(userId, userRole, storeId, ratingValue) {
    if (userRole === 'STORE_OWNER') {
      const err = new Error(MESSAGES.RATING.OWNER_CANNOT_RATE);
      err.statusCode = 403;
      throw err;
    }

    const ratingErr = validateRating(ratingValue);
    if (ratingErr) {
      const err = new Error(ratingErr);
      err.statusCode = 400;
      err.errors = { rating: ratingErr };
      throw err;
    }

    const ratingVal = parseInt(ratingValue, 10);

    const store = await storeRepository.findById(storeId);
    if (!store) {
      const err = new Error(MESSAGES.STORE.NOT_FOUND);
      err.statusCode = 404;
      throw err;
    }

    // Atomic Upsert using the unique constraint (userId, storeId)
    const savedRating = await ratingRepository.upsert(userId, storeId, ratingVal);

    // Recompute overall rating for store
    const allRatings = await ratingRepository.findRatingsByStoreId(storeId);
    const sum = allRatings.reduce((acc, curr) => acc + curr.rating, 0);
    const overallRating = parseFloat((sum / allRatings.length).toFixed(1));

    return {
      rating: savedRating,
      storeOverallRating: overallRating,
      totalRatings: allRatings.length
    };
  }
}

export const ratingService = new RatingService();
