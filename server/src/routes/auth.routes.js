import express from 'express';
import {
  signup,
  login,
  getMe,
  changePassword
} from '../controllers/auth.controller.js';
import { authenticate } from '../middleware/auth.js';
import { authLimiter } from '../middleware/rateLimiter.js';

const router = express.Router();

router.post('/signup', authLimiter, signup);
router.post('/login', authLimiter, login);
router.get('/me', authenticate, getMe);
router.put('/change-password', authenticate, changePassword);

export default router;
