/**
 * System User Roles for Roxiler Systems Portal
 * Exactly three primary roles supported by business logic.
 */
export const ROLES = Object.freeze({
  ADMIN: 'ADMIN',
  USER: 'USER',
  STORE_OWNER: 'STORE_OWNER'
});

export const ALL_ROLES = Object.freeze(Object.values(ROLES));
