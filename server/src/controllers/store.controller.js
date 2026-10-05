import { storeService } from '../services/store.service.js';
import { ratingService } from '../services/rating.service.js';
import { successResponse } from '../utils/response.js';
import { HTTP_STATUS } from '../constants/httpStatus.js';
import { MESSAGES } from '../constants/messages.js';

/**
 * Store Controller — Handles HTTP requests for Stores & Ratings
 */
export const getStores = async (req, res, next) => {
  try {
    const { search, sortBy, order } = req.query;
    const currentUserId = req.user ? req.user.id : null;
    const stores = await storeService.getStores({ search, sortBy, order }, currentUserId);
    return successResponse(res, stores, MESSAGES.STORE.RETRIEVED, HTTP_STATUS.OK);
  } catch (error) {
    next(error);
  }
};

export const getStoreById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const currentUserId = req.user ? req.user.id : null;
    const store = await storeService.getStoreById(id, currentUserId);
    return successResponse(res, store, MESSAGES.STORE.DETAILS, HTTP_STATUS.OK);
  } catch (error) {
    next(error);
  }
};

export const submitOrUpdateRating = async (req, res, next) => {
  try {
    const { id: storeId } = req.params;
    const { rating } = req.body;
    const userId = req.user.id;
    const userRole = req.user.role;

    const result = await ratingService.submitOrUpdateRating(userId, userRole, storeId, rating);
    return successResponse(res, result, MESSAGES.RATING.SAVED, HTTP_STATUS.OK);
  } catch (error) {
    next(error);
  }
};
