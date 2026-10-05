import { storeRepository } from '../repositories/store.repository.js';
import { ratingRepository } from '../repositories/rating.repository.js';
import { MESSAGES } from '../constants/messages.js';

export class OwnerService {
  async getDashboardData(ownerId) {
    const store = await storeRepository.findByOwnerId(ownerId);

    if (!store) {
      return {
        hasStore: false,
        store: null,
        averageRating: 0,
        totalRatings: 0,
        breakdown: { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 },
        ratings: []
      };
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

    return {
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
    };
  }

  async getRatingsLedger(ownerId, { sortBy = 'createdAt', order = 'desc', search = '' }) {
    const store = await storeRepository.findByOwnerId(ownerId);

    if (!store) {
      return [];
    }

    const ratings = await ratingRepository.findRatingsForStoreWithOwner(store.id);

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
          : valB.localeCompare(valA);
      }

      return order === 'asc' ? valA - valB : valB - valA;
    });

    return list;
  }
}

export const ownerService = new OwnerService();
