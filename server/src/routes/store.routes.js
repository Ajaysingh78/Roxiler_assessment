import express from 'express';
import jwt from 'jsonwebtoken';
import { userRepository } from '../repositories/user.repository.js';
import {
  getStores,
  getStoreById,
  submitOrUpdateRating
} from '../controllers/store.controller.js';
import { authenticate } from '../middleware/auth.js';

const router = express.Router();

// Optional authentication middleware to attach user if token present
const optionalAuth = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    if (authHeader && authHeader.startsWith('Bearer ')) {
      const token = authHeader.split(' ')[1];
      const decoded = jwt.verify(
        token,
        process.env.JWT_SECRET || 'roxiler_super_secret_jwt_key_2026_evaluation_token'
      );
      const user = await userRepository.findById(decoded.id);
      if (user) {
        req.user = user;
      }
    }
  } catch (err) {
    // Ignore invalid token on public routes
  }
  next();
};

router.get('/', optionalAuth, getStores);
router.get('/:id', optionalAuth, getStoreById);
router.post('/:id/ratings', authenticate, submitOrUpdateRating);
router.put('/:id/ratings', authenticate, submitOrUpdateRating);

export default router;
