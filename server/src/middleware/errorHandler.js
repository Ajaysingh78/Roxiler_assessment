import { errorResponse } from '../utils/response.js';

export const notFoundHandler = (req, res) => {
  return errorResponse(res, `API route not found: ${req.method} ${req.originalUrl}`, 404);
};

export const globalErrorHandler = (err, req, res, next) => {
  if (process.env.NODE_ENV !== 'test') {
    console.error('[Error Details]:', err);
  }

  if (err.name === 'ValidationError') {
    return errorResponse(res, err.message, 400, err.errors || null);
  }

  // MySQL unique constraint violation (ER_DUP_ENTRY / 1062)
  if (err.code === 'ER_DUP_ENTRY' || err.errno === 1062) {
    return errorResponse(res, 'A record with this unique value already exists', 409);
  }

  // MySQL foreign key constraint violation (ER_NO_REFERENCED_ROW_2 / 1452)
  if (err.code === 'ER_NO_REFERENCED_ROW_2' || err.errno === 1452) {
    return errorResponse(res, 'Referenced record does not exist or relation is invalid', 400);
  }

  const statusCode = err.statusCode || 500;
  const message = err.message || 'Internal Server Error';

  return errorResponse(res, message, statusCode, err.errors || null);
};
