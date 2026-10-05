import { authService } from '../services/auth.service.js';
import { successResponse } from '../utils/response.js';
import { HTTP_STATUS } from '../constants/httpStatus.js';
import { MESSAGES } from '../constants/messages.js';

/**
 * Auth Controller — Handles HTTP requests for Authentication
 */
export const signup = async (req, res, next) => {
  try {
    const { name, email, password, address } = req.body;
    const result = await authService.register({ name, email, password, address });
    return successResponse(
      res,
      result,
      MESSAGES.AUTH.SIGNUP_SUCCESS,
      HTTP_STATUS.CREATED
    );
  } catch (error) {
    next(error);
  }
};

export const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const result = await authService.login({ email, password });
    return successResponse(
      res,
      result,
      MESSAGES.AUTH.LOGIN_SUCCESS,
      HTTP_STATUS.OK
    );
  } catch (error) {
    next(error);
  }
};

export const getMe = async (req, res, next) => {
  try {
    return successResponse(
      res,
      { user: req.user },
      'Current user retrieved',
      HTTP_STATUS.OK
    );
  } catch (error) {
    next(error);
  }
};

export const changePassword = async (req, res, next) => {
  try {
    const { currentPassword, newPassword } = req.body;
    await authService.changePassword(req.user.id, { currentPassword, newPassword });
    return successResponse(
      res,
      null,
      MESSAGES.AUTH.PASSWORD_CHANGED,
      HTTP_STATUS.OK
    );
  } catch (error) {
    next(error);
  }
};
