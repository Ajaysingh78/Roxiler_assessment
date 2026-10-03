import express from 'express';
import {
  getOwnerDashboard,
  getOwnerRatings
} from '../controllers/owner.controller.js';
import { authenticate } from '../middleware/auth.js';
import { requireRole } from '../middleware/roles.js';

const router = express.Router();

// Owner routes require authentication and STORE_OWNER (or ADMIN) role
router.use(authenticate, requireRole('STORE_OWNER', 'ADMIN'));

router.get('/dashboard', getOwnerDashboard);
router.get('/ratings', getOwnerRatings);

export default router;
