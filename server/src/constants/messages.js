/**
 * Application-wide standard response messages
 */
export const MESSAGES = Object.freeze({
  AUTH: {
    LOGIN_SUCCESS: 'Logged in successfully',
    INVALID_CREDENTIALS: 'Invalid email or password',
    SIGNUP_SUCCESS: 'Account registered successfully',
    EMAIL_EXISTS: 'An account with this email already exists',
    PASSWORD_CHANGED: 'Password updated successfully',
    CURRENT_PASSWORD_INCORRECT: 'Current password is incorrect',
    NEW_PASSWORD_SAME: 'New password must be different from current password',
    USER_NOT_FOUND: 'User account not found',
    UNAUTHORIZED: 'Authentication required to access this resource',
    FORBIDDEN: 'You do not have permission to perform this action'
  },
  STORE: {
    CREATED: 'Store created successfully',
    RETRIEVED: 'Stores retrieved successfully',
    DETAILS: 'Store details retrieved successfully',
    NOT_FOUND: 'Store not found',
    EMAIL_EXISTS: 'A store with this email already exists',
    OWNER_NOT_FOUND: 'Specified store owner user was not found'
  },
  RATING: {
    SAVED: 'Rating saved successfully',
    OWNER_CANNOT_RATE: 'Store owners cannot submit ratings for stores',
    INVALID_RANGE: 'Rating must be an integer between 1 and 5'
  },
  ADMIN: {
    DASHBOARD_METRICS: 'Dashboard metrics retrieved successfully',
    USER_CREATED: 'User created successfully',
    USERS_RETRIEVED: 'Users retrieved successfully'
  },
  OWNER: {
    DASHBOARD_METRICS: 'Store owner dashboard metrics retrieved',
    NO_STORE: 'No store assigned to this owner yet',
    RATINGS_RETRIEVED: 'Owner ratings retrieved successfully'
  }
});
