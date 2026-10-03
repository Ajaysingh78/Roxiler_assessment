import prisma from '../config/prisma.js';
import { successResponse, errorResponse } from '../utils/response.js';

export const getOwnerDashboard = async (req, res, next) => {
  try {
    const ownerId = req.user.id;

    // Find the store owned by this user
    const store = await prisma.store.findFirst({
      where: { ownerId },
      include: {
        ratings: {
          include: {
            user: {
              select: {
                id: true,
                name: true,
                email: true,
                address: true
              }
            }
          }
        }
      }
    });

    if (!store) {
      return successResponse(
        res,
        {
          hasStore: false,
          store: null,
          averageRating: 0,
          totalRatings: 0,
          breakdown: { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 },
          ratings: []
        },
        'No store assigned to this owner yet'
      );
    }

    const totalRatings = store.ratings.length;
    let averageRating = 0;
    const breakdown = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 };

    if (totalRatings > 0) {
      const sum = store.ratings.reduce((acc, curr) => {
        breakdown[curr.rating] = (breakdown[curr.rating] || 0) + 1;
        return acc + curr.rating;
      }, 0);
      averageRating = parseFloat((sum / totalRatings).toFixed(1));
    }

    const ratingsList = store.ratings.map((r) => ({
      id: r.id,
      rating: r.rating,
      createdAt: r.createdAt,
      user: {
        id: r.user.id,
        name: r.user.name,
        email: r.user.email,
        address: r.user.address
      }
    }));

    return successResponse(
      res,
      {
        hasStore: true,
        store: {
          id: store.id,
          name: store.name,
          email: store.email,
          address: store.address
        },
        averageRating,
        totalRatings,
        breakdown,
        ratings: ratingsList
      },
      'Store owner dashboard metrics retrieved'
    );
  } catch (error) {
    next(error);
  }
};

export const getOwnerRatings = async (req, res, next) => {
  try {
    const ownerId = req.user.id;
    const { sortBy = 'createdAt', order = 'desc', search = '' } = req.query;

    const store = await prisma.store.findFirst({
      where: { ownerId }
    });

    if (!store) {
      return successResponse(res, [], 'No store assigned');
    }

    const ratings = await prisma.rating.findMany({
      where: { storeId: store.id },
      include: {
        user: {
          select: {
            id: true,
            name: true,
            email: true,
            address: true
          }
        }
      }
    });

    let list = ratings.map((r) => ({
      id: r.id,
      rating: r.rating,
      createdAt: r.createdAt,
      userName: r.user.name,
      userEmail: r.user.email,
      userAddress: r.user.address
    }));

    if (search && search.trim()) {
      const term = search.trim().toLowerCase();
      list = list.filter(
        (r) =>
          r.userName.toLowerCase().includes(term) ||
          r.userEmail.toLowerCase().includes(term)
      );
    }

    list.sort((a, b) => {
      let valA = a[sortBy];
      let valB = b[sortBy];

      if (valA == null) return order === 'asc' ? 1 : -1;
      if (valB == null) return order === 'asc' ? -1 : 1;

      if (typeof valA === 'string') {
        return order === 'asc'
          ? valA.localeCompare(valB)
          : valB.localeCompare(a);
      }

      return order === 'asc' ? valA - valB : valB - valA;
    });

    return successResponse(res, list, 'Owner ratings retrieved successfully');
  } catch (error) {
    next(error);
  }
};
