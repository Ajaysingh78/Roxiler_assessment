import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import prisma from '../config/prisma.js';
import { successResponse, errorResponse } from '../utils/response.js';
import {
  validateName,
  validateEmail,
  validatePassword,
  validateAddress
} from '../utils/validators.js';

const JWT_SECRET = process.env.JWT_SECRET || 'roxiler_super_secret_jwt_key_2026_evaluation_token';
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || '24h';

const generateToken = (user) => {
  return jwt.sign(
    {
      id: user.id,
      email: user.email,
      role: user.role
    },
    JWT_SECRET,
    { expiresIn: JWT_EXPIRES_IN }
  );
};

export const signup = async (req, res, next) => {
  try {
    const { name, email, password, address } = req.body;

    const errors = {};
    const nameErr = validateName(name);
    if (nameErr) errors.name = nameErr;

    const emailErr = validateEmail(email);
    if (emailErr) errors.email = emailErr;

    const passErr = validatePassword(password);
    if (passErr) errors.password = passErr;

    const addrErr = validateAddress(address);
    if (addrErr) errors.address = addrErr;

    if (Object.keys(errors).length > 0) {
      return errorResponse(res, 'Validation failed', 400, errors);
    }

    // Check if email already exists
    const normalizedEmail = email.trim().toLowerCase();
    const existingUser = await prisma.user.findUnique({
      where: { email: normalizedEmail }
    });

    if (existingUser) {
      return errorResponse(res, 'An account with this email already exists', 409, {
        email: 'Email is already registered'
      });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = await prisma.user.create({
      data: {
        name: name.trim(),
        email: normalizedEmail,
        password: hashedPassword,
        address: address.trim(),
        role: 'USER'
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

    const token = generateToken(user);

    return successResponse(
      res,
      { user, token },
      'Account registered successfully',
      201
    );
  } catch (error) {
    next(error);
  }
};

export const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return errorResponse(res, 'Email and password are required', 400);
    }

    const normalizedEmail = email.trim().toLowerCase();
    const user = await prisma.user.findUnique({
      where: { email: normalizedEmail }
    });

    if (!user) {
      return errorResponse(res, 'Invalid email or password', 401);
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return errorResponse(res, 'Invalid email or password', 401);
    }

    const token = generateToken(user);

    const safeUser = {
      id: user.id,
      name: user.name,
      email: user.email,
      address: user.address,
      role: user.role,
      createdAt: user.createdAt
    };

    return successResponse(res, { user: safeUser, token }, 'Logged in successfully');
  } catch (error) {
    next(error);
  }
};

export const getMe = async (req, res, next) => {
  try {
    return successResponse(res, { user: req.user }, 'Current user retrieved');
  } catch (error) {
    next(error);
  }
};

export const changePassword = async (req, res, next) => {
  try {
    const { currentPassword, newPassword } = req.body;

    if (!currentPassword) {
      return errorResponse(res, 'Current password is required', 400, {
        currentPassword: 'Current password is required'
      });
    }

    const passErr = validatePassword(newPassword);
    if (passErr) {
      return errorResponse(res, 'Validation failed', 400, { newPassword: passErr });
    }

    const user = await prisma.user.findUnique({
      where: { id: req.user.id }
    });

    if (!user) {
      return errorResponse(res, 'User account not found', 404);
    }

    const isMatch = await bcrypt.compare(currentPassword, user.password);
    if (!isMatch) {
      return errorResponse(res, 'Current password is incorrect', 400, {
        currentPassword: 'Incorrect current password'
      });
    }

    const isSamePassword = await bcrypt.compare(newPassword, user.password);
    if (isSamePassword) {
      return errorResponse(res, 'New password cannot be the same as current password', 400, {
        newPassword: 'New password must be different from current password'
      });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(newPassword, salt);

    await prisma.user.update({
      where: { id: user.id },
      data: { password: hashedPassword }
    });

    return successResponse(res, null, 'Password updated successfully');
  } catch (error) {
    next(error);
  }
};
