import { storeRepository } from '../repositories/store.repository.js';
import { MESSAGES } from '../constants/messages.js';

export class StoreService {
  async getStores({ search = '', sortBy = 'name', order = 'asc' }, currentUserId = null) {
    const where = {};
    if (search && search.trim()) {
      const term = search.trim();
      where.OR = [
        { name: { contains: term } },
        { address: { contains: term } }
      ];
    }

    const stores = await storeRepository.findManyWithRatings(where);

    const formattedStores = stores.map((store) => {
      const totalRatings = store.ratings.length;
      let overallRating = 0;
      if (totalRatings > 0) {
        const sum = store.ratings.reduce((acc, curr) => acc + curr.rating, 0);
        overallRating = parseFloat((sum / totalRatings).toFixed(1));
      }

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

    return formattedStores;
  }

  async getStoreById(storeId, currentUserId = null) {
    const store = await storeRepository.findById(storeId, {
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
    });

    if (!store) {
      const err = new Error(MESSAGES.STORE.NOT_FOUND);
      err.statusCode = 404;
      throw err;
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

    return {
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
    };
  }
}

export const storeService = new StoreService();
