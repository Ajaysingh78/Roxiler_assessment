import { randomUUID } from 'node:crypto';
import pool from '../database/connection.js';

/**
 * User Data Access Repository (mysql2 Implementation)
 * Encapsulates all database operations for Users.
 */
export class UserRepository {
  async findById(id) {
    if (!id) return null;
    const [rows] = await pool.execute(
      'SELECT id, name, email, password, address, role, createdAt, updatedAt FROM users WHERE id = ? LIMIT 1',
      [id]
    );
    return rows[0] || null;
  }

  async findByEmail(email) {
    if (!email) return null;
    const normalizedEmail = email.trim().toLowerCase();
    const [rows] = await pool.execute(
      'SELECT id, name, email, password, address, role, createdAt, updatedAt FROM users WHERE LOWER(email) = LOWER(?) LIMIT 1',
      [normalizedEmail]
    );
    return rows[0] || null;
  }

  async create(userData) {
    const id = userData.id || randomUUID();
    const role = userData.role || 'USER';
    await pool.execute(
      `INSERT INTO users (id, name, email, password, address, role, createdAt, updatedAt)
       VALUES (?, ?, ?, ?, ?, ?, NOW(3), NOW(3))`,
      [id, userData.name, userData.email, userData.password, userData.address, role]
    );

    const [rows] = await pool.execute(
      'SELECT id, name, email, address, role, createdAt FROM users WHERE id = ? LIMIT 1',
      [id]
    );
    return rows[0];
  }

  async updatePassword(id, hashedPassword) {
    await pool.execute(
      'UPDATE users SET password = ?, updatedAt = NOW(3) WHERE id = ?',
      [hashedPassword, id]
    );
    return this.findById(id);
  }

  async count(where = {}) {
    if (where.role) {
      const [rows] = await pool.execute(
        'SELECT COUNT(*) as count FROM users WHERE role = ?',
        [where.role]
      );
      return Number(rows[0]?.count || 0);
    }
    const [rows] = await pool.execute('SELECT COUNT(*) as count FROM users');
    return Number(rows[0]?.count || 0);
  }

  async countByRoles() {
    const [rows] = await pool.execute(
      'SELECT role, COUNT(*) as count FROM users GROUP BY role'
    );
    return rows.map((r) => ({
      role: r.role,
      count: Number(r.count),
      _count: { _all: Number(r.count) }
    }));
  }

  async findManyWithStores(where = {}) {
    let sql = 'SELECT id, name, email, address, role, createdAt FROM users';
    const conditions = [];
    const params = [];

    if (where.role) {
      conditions.push('role = ?');
      params.push(where.role);
    }

    if (where.OR && Array.isArray(where.OR) && where.OR.length > 0) {
      const orClauses = [];
      for (const cond of where.OR) {
        if (cond.name?.contains) {
          orClauses.push('name LIKE ?');
          params.push(`%${cond.name.contains}%`);
        }
        if (cond.email?.contains) {
          orClauses.push('email LIKE ?');
          params.push(`%${cond.email.contains}%`);
        }
        if (cond.address?.contains) {
          orClauses.push('address LIKE ?');
          params.push(`%${cond.address.contains}%`);
        }
      }
      if (orClauses.length > 0) {
        conditions.push(`(${orClauses.join(' OR ')})`);
      }
    }

    if (conditions.length > 0) {
      sql += ' WHERE ' + conditions.join(' AND ');
    }

    sql += ' ORDER BY createdAt DESC';

    const [users] = await pool.execute(sql, params);
    if (users.length === 0) return [];

    const userIds = users.map((u) => u.id);
    const [stores] = await pool.query(
      `SELECT s.id, s.name, s.ownerId, r.rating 
       FROM stores s 
       LEFT JOIN ratings r ON s.id = r.storeId 
       WHERE s.ownerId IN (?)`,
      [userIds]
    );

    const storeMap = {};
    for (const row of stores) {
      if (!storeMap[row.ownerId]) {
        storeMap[row.ownerId] = {};
      }
      if (!storeMap[row.ownerId][row.id]) {
        storeMap[row.ownerId][row.id] = {
          id: row.id,
          name: row.name,
          ratings: []
        };
      }
      if (row.rating !== null && row.rating !== undefined) {
        storeMap[row.ownerId][row.id].ratings.push({ rating: Number(row.rating) });
      }
    }

    return users.map((u) => {
      const owned = storeMap[u.id] ? Object.values(storeMap[u.id]) : [];
      return {
        id: u.id,
        name: u.name,
        email: u.email,
        address: u.address,
        role: u.role,
        createdAt: u.createdAt,
        ownedStores: owned
      };
    });
  }
}

export const userRepository = new UserRepository();
