import { randomUUID } from 'node:crypto';
import pool from '../database/connection.js';

/**
 * Store Data Access Repository (mysql2 Implementation)
 * Encapsulates all database operations for Stores.
 */
export class StoreRepository {
  async findById(id, include = {}) {
    if (!id) return null;
    const [stores] = await pool.execute(
      `SELECT s.id, s.name, s.email, s.address, s.ownerId, s.createdAt, s.updatedAt,
              u.id as owner_id, u.name as owner_name, u.email as owner_email
       FROM stores s
       LEFT JOIN users u ON s.ownerId = u.id
       WHERE s.id = ?
       LIMIT 1`,
      [id]
    );

    if (stores.length === 0) return null;
    const s = stores[0];

    const store = {
      id: s.id,
      name: s.name,
      email: s.email,
      address: s.address,
      ownerId: s.ownerId,
      createdAt: s.createdAt,
      updatedAt: s.updatedAt,
      owner: s.owner_id ? { id: s.owner_id, name: s.owner_name, email: s.owner_email } : null,
      ratings: []
    };

    // If ratings are requested
    if (include.ratings) {
      const [ratings] = await pool.execute(
        `SELECT r.id, r.userId, r.rating, r.createdAt,
                u.id as user_id, u.name as user_name
         FROM ratings r
         LEFT JOIN users u ON r.userId = u.id
         WHERE r.storeId = ?
         ORDER BY r.createdAt DESC`,
        [id]
      );

      store.ratings = ratings.map((r) => ({
        id: r.id,
        userId: r.userId,
        rating: Number(r.rating),
        createdAt: r.createdAt,
        user: r.user_id ? { id: r.user_id, name: r.user_name } : null
      }));
    }

    return store;
  }

  async findByEmail(email) {
    if (!email) return null;
    const normalizedEmail = email.trim().toLowerCase();
    const [rows] = await pool.execute(
      `SELECT s.id, s.name, s.email, s.address, s.ownerId, s.createdAt, s.updatedAt,
              u.id as owner_id, u.name as owner_name, u.email as owner_email
       FROM stores s
       LEFT JOIN users u ON s.ownerId = u.id
       WHERE LOWER(s.email) = LOWER(?)
       LIMIT 1`,
      [normalizedEmail]
    );
    if (rows.length === 0) return null;
    const s = rows[0];
    return {
      id: s.id,
      name: s.name,
      email: s.email,
      address: s.address,
      ownerId: s.ownerId,
      createdAt: s.createdAt,
      updatedAt: s.updatedAt,
      owner: s.owner_id ? { id: s.owner_id, name: s.owner_name, email: s.owner_email } : null
    };
  }

  async create(storeData) {
    const id = storeData.id || randomUUID();
    const ownerId = storeData.ownerId || null;
    await pool.execute(
      `INSERT INTO stores (id, name, email, address, ownerId, createdAt, updatedAt)
       VALUES (?, ?, ?, ?, ?, NOW(3), NOW(3))`,
      [id, storeData.name, storeData.email, storeData.address, ownerId]
    );

    return this.findById(id);
  }

  async count(where = {}) {
    if (where.ownerId && where.ownerId.not === null) {
      const [rows] = await pool.execute(
        'SELECT COUNT(*) as count FROM stores WHERE ownerId IS NOT NULL'
      );
      return Number(rows[0]?.count || 0);
    }
    const [rows] = await pool.execute('SELECT COUNT(*) as count FROM stores');
    return Number(rows[0]?.count || 0);
  }

  async findManyWithRatings(where = {}) {
    let sql = `
      SELECT s.id, s.name, s.email, s.address, s.ownerId, s.createdAt, s.updatedAt,
             u.id as owner_id, u.name as owner_name, u.email as owner_email
      FROM stores s
      LEFT JOIN users u ON s.ownerId = u.id
    `;
    const conditions = [];
    const params = [];

    if (where.OR && Array.isArray(where.OR) && where.OR.length > 0) {
      const orClauses = [];
      for (const cond of where.OR) {
        if (cond.name?.contains) {
          orClauses.push('s.name LIKE ?');
          params.push(`%${cond.name.contains}%`);
        }
        if (cond.address?.contains) {
          orClauses.push('s.address LIKE ?');
          params.push(`%${cond.address.contains}%`);
        }
        if (cond.email?.contains) {
          orClauses.push('s.email LIKE ?');
          params.push(`%${cond.email.contains}%`);
        }
      }
      if (orClauses.length > 0) {
        conditions.push(`(${orClauses.join(' OR ')})`);
      }
    }

    if (conditions.length > 0) {
      sql += ' WHERE ' + conditions.join(' AND ');
    }

    sql += ' ORDER BY s.name ASC';

    const [stores] = await pool.execute(sql, params);
    if (stores.length === 0) return [];

    const storeIds = stores.map((s) => s.id);
    const [ratings] = await pool.query(
      `SELECT id, storeId, userId, rating 
       FROM ratings 
       WHERE storeId IN (?)`,
      [storeIds]
    );

    const ratingMap = {};
    for (const r of ratings) {
      if (!ratingMap[r.storeId]) {
        ratingMap[r.storeId] = [];
      }
      ratingMap[r.storeId].push({
        id: r.id,
        userId: r.userId,
        rating: Number(r.rating)
      });
    }

    return stores.map((s) => ({
      id: s.id,
      name: s.name,
      email: s.email,
      address: s.address,
      ownerId: s.ownerId,
      createdAt: s.createdAt,
      updatedAt: s.updatedAt,
      owner: s.owner_id ? { id: s.owner_id, name: s.owner_name, email: s.owner_email } : null,
      ratings: ratingMap[s.id] || []
    }));
  }

  async findByOwnerId(ownerId) {
    if (!ownerId) return null;
    const [stores] = await pool.execute(
      `SELECT s.id, s.name, s.email, s.address, s.ownerId, s.createdAt, s.updatedAt
       FROM stores s
       WHERE s.ownerId = ?
       LIMIT 1`,
      [ownerId]
    );

    if (stores.length === 0) return null;
    const store = stores[0];

    const [ratings] = await pool.execute(
      `SELECT r.id, r.rating, r.createdAt,
              u.id as user_id, u.name as user_name, u.email as user_email, u.address as user_address
       FROM ratings r
       LEFT JOIN users u ON r.userId = u.id
       WHERE r.storeId = ?
       ORDER BY r.createdAt DESC`,
      [store.id]
    );

    store.ratings = ratings.map((r) => ({
      id: r.id,
      rating: Number(r.rating),
      createdAt: r.createdAt,
      user: {
        id: r.user_id,
        name: r.user_name,
        email: r.user_email,
        address: r.user_address
      }
    }));

    return store;
  }
}

export const storeRepository = new StoreRepository();
