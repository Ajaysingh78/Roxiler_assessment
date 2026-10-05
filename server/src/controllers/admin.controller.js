import { adminService } from '../services/admin.service.js';
import { successResponse } from '../utils/response.js';
import { HTTP_STATUS } from '../constants/httpStatus.js';
import { MESSAGES } from '../constants/messages.js';

/**
 * Admin Controller — Handles administrative operations
 */
export const getDashboardStats = async (req, res, next) => {
  try {
    const stats = await adminService.getDashboardStats();
    return successResponse(res, stats, MESSAGES.ADMIN.DASHBOARD_METRICS, HTTP_STATUS.OK);
  } catch (error) {
    next(error);
  }
};

export const addUser = async (req, res, next) => {
  try {
    const { name, email, password, address, role } = req.body;
    const user = await adminService.addUser({ name, email, password, address, role });
    return successResponse(res, user, MESSAGES.ADMIN.USER_CREATED, HTTP_STATUS.CREATED);
  } catch (error) {
    next(error);
  }
};

export const getUsers = async (req, res, next) => {
  try {
    const { search, role, sortBy, order } = req.query;
    const users = await adminService.getUsers({ search, role, sortBy, order });
    return successResponse(res, users, MESSAGES.ADMIN.USERS_RETRIEVED, HTTP_STATUS.OK);
  } catch (error) {
    next(error);
  }
};

export const addStore = async (req, res, next) => {
  try {
    const { name, email, address, ownerId } = req.body;
    const store = await adminService.addStore({ name, email, address, ownerId });
    return successResponse(res, store, MESSAGES.STORE.CREATED, HTTP_STATUS.CREATED);
  } catch (error) {
    next(error);
  }
};

export const getStores = async (req, res, next) => {
  try {
    const { search, sortBy, order } = req.query;
    const stores = await adminService.getStores({ search, sortBy, order });
    return successResponse(res, stores, MESSAGES.STORE.RETRIEVED, HTTP_STATUS.OK);
  } catch (error) {
    next(error);
  }
};
