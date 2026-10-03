import jwt from 'jsonwebtoken';
import prisma from '../config/prisma.js';
import { errorResponse } from '../utils/response.js';

export const authenticate = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return errorResponse(res, 'Authentication token missing or invalid', 401);
    }

    const token = authHeader.split(' ')[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'roxiler_super_secret_jwt_key_2026_evaluation_token');

    const user = await prisma.user.findUnique({
      where: { id: decoded.id },
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        address: true,
        createdAt: true
      }
    });

    if (!user) {
      return errorResponse(res, 'User account no longer exists', 401);
    }

    req.user = user;
    next();
  } catch (error) {
    if (error.name === 'TokenExpiredError') {
      return errorResponse(res, 'Session token has expired. Please log in again.', 401);
    }
    return errorResponse(res, 'Invalid or malformed authentication token', 401);
  }
};
