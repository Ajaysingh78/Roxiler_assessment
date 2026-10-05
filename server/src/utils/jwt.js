import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'roxiler_super_secret_jwt_key_2026_evaluation_token';
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || '24h';

/**
 * Generate a signed JWT token
 */
export const generateToken = (payload) => {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN });
};

/**
 * Verify a JWT token
 */
export const verifyToken = (token) => {
  return jwt.verify(token, JWT_SECRET);
};
