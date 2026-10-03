import bcrypt from 'bcryptjs';
import prisma from '../config/prisma.js';
import { successResponse, errorResponse } from '../utils/response.js';
import {
  validateName,
  validateEmail,
  validatePassword,
  validateAddress
} from '../utils/validators.js';

export const getDashboardStats = async (req, res, next) => {
  try {
    const [totalUsers, totalStores, totalRatings, roleBreakdown] = await Promise.all([
      prisma.user.count(),
      prisma.store.count(),
      prisma.rating.count(),
      prisma.user.groupBy({
        by: ['role'],
        _count: { _all: true }
      })
    ]);

    const roles = {
      ADMIN: 0,
      USER: 0,
      STORE_OWNER: 0
    };
    roleBreakdown.forEach((r) => {
      roles[r.role] = r._count._all;
    });

    return successResponse(
      res,
      {
        totalUsers,
        totalStores,
        totalRatings,
        roles
      },
      'Dashboard metrics retrieved successfully'
    );
  } catch (error) {
    next(error);
  }
};

export const addUser = async (req, res, next) => {
  try {
    const { name, email, password, address, role } = req.body;

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
      return errorResponse(res, 'Validation failed', 400, errors);
    }

    const normalizedEmail = email.trim().toLowerCase();
    const existing = await prisma.user.findUnique({
      where: { email: normalizedEmail }
    });

    if (existing) {
      return errorResponse(res, 'An account with this email already exists', 409, {
        email: 'Email is already in use'
      });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = await prisma.user.create({
      data: {
        name: name.trim(),
        email: normalizedEmail,
        password: hashedPassword,
        address: address.trim(),
        role: assignedRole
      },
      select: {
        id: true,
        name: true,
        email: true,
        address: true,
        role: true,
        createdAt: true
      }
    });

    return successResponse(res, newUser, 'User created successfully', 201);
  } catch (error) {
    next(error);
  }
};

export const getUsers = async (req, res, next) => {
  try {
    const { search = '', role = '', sortBy = 'createdAt', order = 'desc' } = req.query;

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

    const users = await prisma.user.findMany({
      where,
      select: {
        id: true,
        name: true,
        email: true,
        address: true,
        role: true,
        createdAt: true,
        ownedStores: {
          select: {
            id: true,
            name: true,
            ratings: {
              select: { rating: true }
            }
          }
        }
      }
    });

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

    // Client/query sorting
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

    return successResponse(res, enhancedUsers, 'Users retrieved successfully');
  } catch (error) {
    next(error);
  }
};

export const addStore = async (req, res, next) => {
  try {
    const { name, email, address, ownerId } = req.body;

    const errors = {};
    const nameErr = validateName(name);
    if (nameErr) errors.name = nameErr;

    const emailErr = validateEmail(email);
    if (emailErr) errors.email = emailErr;

    const addrErr = validateAddress(address);
    if (addrErr) errors.address = addrErr;

    if (Object.keys(errors).length > 0) {
      return errorResponse(res, 'Validation failed', 400, errors);
    }

    const normalizedEmail = email.trim().toLowerCase();
    const existing = await prisma.store.findUnique({
      where: { email: normalizedEmail }
    });

    if (existing) {
      return errorResponse(res, 'A store with this email already exists', 409, {
        email: 'Store email is already in use'
      });
    }

    // Verify owner exists and has STORE_OWNER role if provided
    let validOwnerId = null;
    if (ownerId && ownerId.trim()) {
      const owner = await prisma.user.findUnique({
        where: { id: ownerId.trim() }
      });
      if (!owner) {
        return errorResponse(res, 'Specified store owner user was not found', 404);
      }
      validOwnerId = owner.id;
    }

    const store = await prisma.store.create({
      data: {
        name: name.trim(),
        email: normalizedEmail,
        address: address.trim(),
        ownerId: validOwnerId
      },
      include: {
        owner: {
          select: { id: true, name: true, email: true }
        }
      }
    });

    return successResponse(res, store, 'Store created successfully', 201);
  } catch (error) {
    next(error);
  }
};

export const getStores = async (req, res, next) => {
  try {
    const { search = '', sortBy = 'name', order = 'asc' } = req.query;

    const where = {};
    if (search && search.trim()) {
      const term = search.trim();
      where.OR = [
        { name: { contains: term } },
        { email: { contains: term } },
        { address: { contains: term } }
      ];
    }

    const stores = await prisma.store.findMany({
      where,
      include: {
        owner: {
          select: { id: true, name: true, email: true }
        },
        ratings: {
          select: { rating: true }
        }
      }
    });

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

    return successResponse(res, enhanced, 'Stores retrieved successfully');
  } catch (error) {
    next(error);
  }
};
