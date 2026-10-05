import { userRepository } from '../repositories/user.repository.js';
import { storeRepository } from '../repositories/store.repository.js';
import { ratingRepository } from '../repositories/rating.repository.js';
import { hashPassword } from '../utils/password.js';
import {
  validateName,
  validateEmail,
  validatePassword,
  validateAddress
} from '../validators/auth.validator.js';
import { MESSAGES } from '../constants/messages.js';

export class AdminService {
  async getDashboardStats() {
    const [totalUsers, totalStores, totalRatings, roleBreakdown] = await Promise.all([
      userRepository.count(),
      storeRepository.count(),
      ratingRepository.count(),
      userRepository.countByRoles()
    ]);

    const roles = {
      ADMIN: 0,
      USER: 0,
      STORE_OWNER: 0
    };
    roleBreakdown.forEach((r) => {
      roles[r.role] = r._count._all;
    });

    return {
      totalUsers,
      totalStores,
      totalRatings,
      roles
    };
  }

  async addUser({ name, email, password, address, role }) {
    const errors = {};
    const nameErr = validateName(name);
    if (nameErr) errors.name = nameErr;

    const emailErr = validateEmail(email);
    if (emailErr) errors.email = emailErr;

    const passErr = validatePassword(password);
    if (passErr) errors.password = passErr;

    const addrErr = validateAddress(address);
    if (addrErr) errors.address = addrErr;

    const validRoles = ['ADMIN', 'USER', 'STORE_OWNER'];
    const assignedRole = role ? role.toUpperCase() : 'USER';
    if (!validRoles.includes(assignedRole)) {
      errors.role = `Role must be one of: ${validRoles.join(', ')}`;
    }

    if (Object.keys(errors).length > 0) {
      const err = new Error('Validation failed');
      err.statusCode = 400;
      err.errors = errors;
      throw err;
    }

    const normalizedEmail = email.trim().toLowerCase();
    const existing = await userRepository.findByEmail(normalizedEmail);
    if (existing) {
      const err = new Error(MESSAGES.AUTH.EMAIL_EXISTS);
      err.statusCode = 409;
      err.errors = { email: 'Email is already in use' };
      throw err;
    }

    const hashedPassword = await hashPassword(password);
    return userRepository.create({
      name: name.trim(),
      email: normalizedEmail,
      password: hashedPassword,
      address: address.trim(),
      role: assignedRole
    });
  }

  async getUsers({ search = '', role = '', sortBy = 'createdAt', order = 'desc' }) {
    const where = {};
    if (role && role !== 'ALL') {
      where.role = role.toUpperCase();
    }

    if (search && search.trim()) {
      const term = search.trim();
      where.OR = [
        { name: { contains: term } },
        { email: { contains: term } },
        { address: { contains: term } }
      ];
    }

    const users = await userRepository.findManyWithStores(where);

    // Compute store owner ratings if role is STORE_OWNER
    const enhancedUsers = users.map((user) => {
      let storeRating = null;
      let storeName = null;

      if (user.role === 'STORE_OWNER' && user.ownedStores && user.ownedStores.length > 0) {
        const store = user.ownedStores[0];
        storeName = store.name;
        if (store.ratings.length > 0) {
          const sum = store.ratings.reduce((acc, curr) => acc + curr.rating, 0);
          storeRating = parseFloat((sum / store.ratings.length).toFixed(1));
        } else {
          storeRating = 0;
        }
      }

      return {
        id: user.id,
        name: user.name,
        email: user.email,
        address: user.address,
        role: user.role,
        createdAt: user.createdAt,
        storeName,
        storeRating
      };
    });

    enhancedUsers.sort((a, b) => {
      let valA = a[sortBy];
      let valB = b[sortBy];

      if (sortBy === 'rating' || sortBy === 'storeRating') {
        valA = a.storeRating !== null ? a.storeRating : -1;
        valB = b.storeRating !== null ? b.storeRating : -1;
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

    return enhancedUsers;
  }

  async addStore({ name, email, address, ownerId }) {
    const errors = {};
    const nameErr = validateName(name);
    if (nameErr) errors.name = nameErr;

    const emailErr = validateEmail(email);
    if (emailErr) errors.email = emailErr;

    const addrErr = validateAddress(address);
    if (addrErr) errors.address = addrErr;

    if (Object.keys(errors).length > 0) {
      const err = new Error('Validation failed');
      err.statusCode = 400;
      err.errors = errors;
      throw err;
    }

    const normalizedEmail = email.trim().toLowerCase();
    const existing = await storeRepository.findByEmail(normalizedEmail);
    if (existing) {
      const err = new Error(MESSAGES.STORE.EMAIL_EXISTS);
      err.statusCode = 409;
      err.errors = { email: 'Store email is already in use' };
      throw err;
    }

    let validOwnerId = null;
    if (ownerId && ownerId.trim()) {
      const owner = await userRepository.findById(ownerId.trim());
      if (!owner) {
        const err = new Error(MESSAGES.STORE.OWNER_NOT_FOUND);
        err.statusCode = 404;
        throw err;
      }
      validOwnerId = owner.id;
    }

    return storeRepository.create({
      name: name.trim(),
      email: normalizedEmail,
      address: address.trim(),
      ownerId: validOwnerId
    });
  }

  async getStores({ search = '', sortBy = 'name', order = 'asc' }) {
    const where = {};
    if (search && search.trim()) {
      const term = search.trim();
      where.OR = [
        { name: { contains: term } },
        { email: { contains: term } },
        { address: { contains: term } }
      ];
    }

    const stores = await storeRepository.findManyWithRatings(where);

    const enhanced = stores.map((s) => {
      const totalRatings = s.ratings.length;
      let rating = 0;
      if (totalRatings > 0) {
        const sum = s.ratings.reduce((acc, curr) => acc + curr.rating, 0);
        rating = parseFloat((sum / totalRatings).toFixed(1));
      }

      return {
        id: s.id,
        name: s.name,
        email: s.email,
        address: s.address,
        owner: s.owner,
        rating,
        totalRatings,
        createdAt: s.createdAt
      };
    });

    enhanced.sort((a, b) => {
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

    return enhanced;
  }
}

export const adminService = new AdminService();
