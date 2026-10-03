import prisma from '../config/prisma.js';
import { successResponse, errorResponse } from '../utils/response.js';
import { validateRating } from '../utils/validators.js';

export const getStores = async (req, res, next) => {
  try {
    const { search = '', sortBy = 'name', order = 'asc' } = req.query;
    const currentUserId = req.user ? req.user.id : null;

    const where = {};
    if (search && search.trim()) {
      const term = search.trim();
      where.OR = [
        { name: { contains: term } },
        { address: { contains: term } }
      ];
    }

    const stores = await prisma.store.findMany({
      where,
      include: {
        ratings: {
          select: {
            id: true,
            userId: true,
            rating: true
          }
        }
      }
    });

    const formattedStores = stores.map((store) => {
      const totalRatings = store.ratings.length;
      let overallRating = 0;
      if (totalRatings > 0) {
        const sum = store.ratings.reduce((acc, curr) => acc + curr.rating, 0);
        overallRating = parseFloat((sum / totalRatings).toFixed(1));
      }

      // Check if the requesting user has already submitted a rating for this store
      let userSubmittedRating = null;
      let userRatingId = null;
      if (currentUserId) {
        const userRatingObj = store.ratings.find((r) => r.userId === currentUserId);
        if (userRatingObj) {
          userSubmittedRating = userRatingObj.rating;
          userRatingId = userRatingObj.id;
        }
      }

      return {
        id: store.id,
        name: store.name,
        email: store.email,
        address: store.address,
        overallRating,
        totalRatings,
        userSubmittedRating,
        userRatingId,
        createdAt: store.createdAt
      };
    });

    // Sorting
    formattedStores.sort((a, b) => {
      let valA = a[sortBy];
      let valB = b[sortBy];

      if (sortBy === 'rating' || sortBy === 'overallRating') {
        valA = a.overallRating;
        valB = b.overallRating;
      }

      if (valA == null) return order === 'asc' ? 1 : -1;
      if (valB == null) return order === 'asc' ? -1 : 1;

      if (typeof valA === 'string') {
        return order === 'asc'
          ? valA.localeCompare(valB)
          : valB.localeCompare(valA);
      }

      return order === 'asc' ? valA - valB : valB - valA;
    });

    return successResponse(res, formattedStores, 'Stores retrieved successfully');
  } catch (error) {
    next(error);
  }
};

export const getStoreById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const currentUserId = req.user ? req.user.id : null;

    const store = await prisma.store.findUnique({
      where: { id },
      include: {
        ratings: {
          select: {
            id: true,
            userId: true,
            rating: true,
            createdAt: true,
            user: {
              select: { id: true, name: true }
            }
          }
        },
        owner: {
          select: { id: true, name: true, email: true }
        }
      }
    });

    if (!store) {
      return errorResponse(res, 'Store not found', 404);
    }

    const totalRatings = store.ratings.length;
    let overallRating = 0;
    const breakdown = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 };

    if (totalRatings > 0) {
      const sum = store.ratings.reduce((acc, curr) => {
        breakdown[curr.rating] = (breakdown[curr.rating] || 0) + 1;
        return acc + curr.rating;
      }, 0);
      overallRating = parseFloat((sum / totalRatings).toFixed(1));
    }

    let userSubmittedRating = null;
    let userRatingId = null;
    if (currentUserId) {
      const userRating = store.ratings.find((r) => r.userId === currentUserId);
      if (userRating) {
        userSubmittedRating = userRating.rating;
        userRatingId = userRating.id;
      }
    }

    return successResponse(
      res,
      {
        id: store.id,
        name: store.name,
        email: store.email,
        address: store.address,
        owner: store.owner,
        overallRating,
        totalRatings,
        breakdown,
        userSubmittedRating,
        userRatingId,
        createdAt: store.createdAt
      },
      'Store details retrieved successfully'
    );
  } catch (error) {
    next(error);
  }
};

export const submitOrUpdateRating = async (req, res, next) => {
  try {
    const { id: storeId } = req.params;
    const { rating } = req.body;
    const userId = req.user.id;

    // Normal users only can rate (or admin if testing)
    if (req.user.role === 'STORE_OWNER') {
      return errorResponse(res, 'Store owners cannot submit ratings for stores', 403);
    }

    const ratingErr = validateRating(rating);
    if (ratingErr) {
      return errorResponse(res, ratingErr, 400, { rating: ratingErr });
    }

    const ratingVal = parseInt(rating, 10);

    // Verify store exists
    const store = await prisma.store.findUnique({
      where: { id: storeId }
    });

    if (!store) {
      return errorResponse(res, 'Store not found', 404);
    }

    // Atomic Upsert using the unique constraint (userId, storeId)
    const savedRating = await prisma.rating.upsert({
      where: {
        userId_storeId: {
          userId,
          storeId
        }
      },
      update: {
        rating: ratingVal
      },
      create: {
        userId,
        storeId,
        rating: ratingVal
      }
    });

    // Recompute overall rating for store
    const allRatings = await prisma.rating.findMany({
      where: { storeId },
      select: { rating: true }
    });

    const sum = allRatings.reduce((acc, curr) => acc + curr.rating, 0);
    const overallRating = parseFloat((sum / allRatings.length).toFixed(1));

    return successResponse(
      res,
      {
        rating: savedRating,
        storeOverallRating: overallRating,
        totalRatings: allRatings.length
      },
      'Rating saved successfully'
    );
  } catch (error) {
    next(error);
  }
};
