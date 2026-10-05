import { randomUUID } from 'node:crypto';
import pool from '../database/connection.js';

/**
 * Rating Data Access Repository (mysql2 Implementation)
 * Encapsulates all database operations for Ratings.
 */
export class RatingRepository {
  async count(where = {}) {
    if (where.storeId) {
      const [rows] = await pool.execute(
        'SELECT COUNT(*) as count FROM ratings WHERE storeId = ?',
        [where.storeId]
      );
      return Number(rows[0]?.count || 0);
    }
    const [rows] = await pool.execute('SELECT COUNT(*) as count FROM ratings');
    return Number(rows[0]?.count || 0);
  }

  async findByUserAndStore(userId, storeId) {
    if (!userId || !storeId) return null;
    const [rows] = await pool.execute(
      `SELECT id, userId, storeId, rating, createdAt, updatedAt
       FROM ratings
       WHERE userId = ? AND storeId = ?
       LIMIT 1`,
      [userId, storeId]
    );
    if (rows.length === 0) return null;
    return {
      ...rows[0],
      rating: Number(rows[0].rating)
    };
  }

  async upsert(userId, storeId, ratingValue) {
    const id = randomUUID();
    const rating = parseInt(ratingValue, 10);

    // Atomic MySQL Upsert using the composite unique key (userId, storeId)
    await pool.execute(
      `INSERT INTO ratings (id, userId, storeId, rating, createdAt, updatedAt)
       VALUES (?, ?, ?, ?, NOW(3), NOW(3))
       ON DUPLICATE KEY UPDATE rating = VALUES(rating), updatedAt = NOW(3)`,
      [id, userId, storeId, rating]
    );

    return this.findByUserAndStore(userId, storeId);
  }

  async findRatingsByStoreId(storeId) {
    const [rows] = await pool.execute(
      'SELECT rating FROM ratings WHERE storeId = ?',
      [storeId]
    );
    return rows.map((r) => ({ rating: Number(r.rating) }));
  }

  async findRatingsForStoreWithOwner(storeId) {
    const [rows] = await pool.execute(
      `SELECT r.id, r.userId, r.storeId, r.rating, r.createdAt, r.updatedAt,
              u.id as user_id, u.name as user_name, u.email as user_email, u.address as user_address
       FROM ratings r
       LEFT JOIN users u ON r.userId = u.id
       WHERE r.storeId = ?
       ORDER BY r.createdAt DESC`,
      [storeId]
    );

    return rows.map((r) => ({
      id: r.id,
      userId: r.userId,
      storeId: r.storeId,
      rating: Number(r.rating),
      createdAt: r.createdAt,
      updatedAt: r.updatedAt,
      user: {
        id: r.user_id,
        name: r.user_name,
        email: r.user_email,
        address: r.user_address
      }
    }));
  }
}

export const ratingRepository = new RatingRepository();
