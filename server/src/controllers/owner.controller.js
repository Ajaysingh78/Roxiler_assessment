import { ownerService } from '../services/owner.service.js';
import { successResponse } from '../utils/response.js';
import { HTTP_STATUS } from '../constants/httpStatus.js';
import { MESSAGES } from '../constants/messages.js';

/**
 * Owner Controller — Handles store owner dashboard and ratings ledger
 */
export const getOwnerDashboard = async (req, res, next) => {
  try {
    const ownerId = req.user.id;
    const data = await ownerService.getDashboardData(ownerId);
    return successResponse(
      res,
      data,
      data.hasStore ? MESSAGES.OWNER.DASHBOARD_METRICS : MESSAGES.OWNER.NO_STORE,
      HTTP_STATUS.OK
    );
  } catch (error) {
    next(error);
  }
};

export const getOwnerRatings = async (req, res, next) => {
  try {
    const ownerId = req.user.id;
    const { sortBy, order, search } = req.query;
    const ratings = await ownerService.getRatingsLedger(ownerId, { sortBy, order, search });
    return successResponse(res, ratings, MESSAGES.OWNER.RATINGS_RETRIEVED, HTTP_STATUS.OK);
  } catch (error) {
    next(error);
  }
};
