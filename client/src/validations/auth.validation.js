/**
 * Client-Side Validation Rules matching Roxiler assessment specs
 */

export const validateName = (name) => {
  if (!name || !name.trim()) return 'Name is required';
  const len = name.trim().length;
  if (len < 20) return 'Name must be at least 20 characters long';
  if (len > 60) return 'Name must not exceed 60 characters';
  return null;
};

export const validateEmail = (email) => {
  if (!email || !email.trim()) return 'Email is required';
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  if (!emailRegex.test(email.trim())) return 'Please provide a valid email address';
  return null;
};

export const validatePassword = (password) => {
  if (!password) return 'Password is required';
  if (password.length < 8 || password.length > 16) {
    return 'Password must be between 8 and 16 characters long';
  }
  if (!/[A-Z]/.test(password)) {
    return 'Password must include at least one uppercase letter';
  }
  if (!/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
    return 'Password must include at least one special character';
  }
  return null;
};

export const validateAddress = (address) => {
  if (!address || !address.trim()) return 'Address is required';
  if (address.trim().length > 400) return 'Address must not exceed 400 characters';
  return null;
};
