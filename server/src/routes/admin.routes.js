import express from 'express';
import {
  getDashboardStats,
  addUser,
  getUsers,
  addStore,
  getStores
} from '../controllers/admin.controller.js';
import { authenticate } from '../middleware/auth.js';
import { requireRole } from '../middleware/roles.js';

const router = express.Router();

// All admin routes require ADMIN role
router.use(authenticate, requireRole('ADMIN'));

router.get('/dashboard', getDashboardStats);
router.get('/users', getUsers);
router.post('/users', addUser);
router.get('/stores', getStores);
router.post('/stores', addStore);

export default router;
