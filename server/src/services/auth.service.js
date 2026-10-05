import { userRepository } from '../repositories/user.repository.js';
import { hashPassword, comparePassword } from '../utils/password.js';
import { generateToken } from '../utils/jwt.js';
import { validateSignupInput, validatePassword } from '../validators/auth.validator.js';
import { MESSAGES } from '../constants/messages.js';

export class AuthService {
  async register({ name, email, password, address }) {
    const errors = validateSignupInput({ name, email, password, address });
    if (Object.keys(errors).length > 0) {
      const err = new Error('Validation failed');
      err.statusCode = 400;
      err.errors = errors;
      throw err;
    }

    const normalizedEmail = email.trim().toLowerCase();
    const existingUser = await userRepository.findByEmail(normalizedEmail);
    if (existingUser) {
      const err = new Error(MESSAGES.AUTH.EMAIL_EXISTS);
      err.statusCode = 409;
      err.errors = { email: 'Email is already registered' };
      throw err;
    }

    const hashedPassword = await hashPassword(password);
    const user = await userRepository.create({
      name: name.trim(),
      email: normalizedEmail,
      password: hashedPassword,
      address: address.trim(),
      role: 'USER'
    });

    const token = generateToken({
      id: user.id,
      email: user.email,
      role: user.role
    });

    return { user, token };
  }

  async login({ email, password }) {
    if (!email || !password) {
      const err = new Error('Email and password are required');
      err.statusCode = 400;
      throw err;
    }

    const normalizedEmail = email.trim().toLowerCase();
    const user = await userRepository.findByEmail(normalizedEmail);
    if (!user) {
      const err = new Error(MESSAGES.AUTH.INVALID_CREDENTIALS);
      err.statusCode = 401;
      throw err;
    }

    const isMatch = await comparePassword(password, user.password);
    if (!isMatch) {
      const err = new Error(MESSAGES.AUTH.INVALID_CREDENTIALS);
      err.statusCode = 401;
      throw err;
    }

    const token = generateToken({
      id: user.id,
      email: user.email,
      role: user.role
    });

    const safeUser = {
      id: user.id,
      name: user.name,
      email: user.email,
      address: user.address,
      role: user.role,
      createdAt: user.createdAt
    };

    return { user: safeUser, token };
  }

  async changePassword(userId, { currentPassword, newPassword }) {
    if (!currentPassword) {
      const err = new Error('Current password is required');
      err.statusCode = 400;
      err.errors = { currentPassword: 'Current password is required' };
      throw err;
    }

    const passErr = validatePassword(newPassword);
    if (passErr) {
      const err = new Error('Validation failed');
      err.statusCode = 400;
      err.errors = { newPassword: passErr };
      throw err;
    }

    const user = await userRepository.findById(userId);
    if (!user) {
      const err = new Error(MESSAGES.AUTH.USER_NOT_FOUND);
      err.statusCode = 404;
      throw err;
    }

    const isMatch = await comparePassword(currentPassword, user.password);
    if (!isMatch) {
      const err = new Error(MESSAGES.AUTH.CURRENT_PASSWORD_INCORRECT);
      err.statusCode = 400;
      err.errors = { currentPassword: 'Incorrect current password' };
      throw err;
    }

    const isSamePassword = await comparePassword(newPassword, user.password);
    if (isSamePassword) {
      const err = new Error(MESSAGES.AUTH.NEW_PASSWORD_SAME);
      err.statusCode = 400;
      err.errors = { newPassword: 'New password must be different from current password' };
      throw err;
    }

    const hashedPassword = await hashPassword(newPassword);
    await userRepository.updatePassword(user.id, hashedPassword);
    return true;
  }
}

export const authService = new AuthService();
