import { errorResponse } from '../utils/response.js';

export const notFoundHandler = (req, res) => {
  return errorResponse(res, `API route not found: ${req.method} ${req.originalUrl}`, 404);
};

export const globalErrorHandler = (err, req, res, next) => {
  console.error('[Error Details]:', err);

  if (err.name === 'ValidationError') {
    return errorResponse(res, err.message, 400);
  }

  // Prisma unique constraint violation code P2002
  if (err.code === 'P2002') {
    const target = err.meta?.target ? ` (${err.meta.target.join(', ')})` : '';
    return errorResponse(res, `A record with this unique value already exists${target}`, 409);
  }

  // Prisma foreign key constraint violation
  if (err.code === 'P2003') {
    return errorResponse(res, 'Referenced record does not exist or relation is invalid', 400);
  }

  const statusCode = err.statusCode || 500;
  const message = err.message || 'Internal Server Error';

  return errorResponse(res, message, statusCode);
};
