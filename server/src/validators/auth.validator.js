/**
 * Strict authentication and user registration validators
 */

export const validateName = (name) => {
  if (!name || typeof name !== 'string') {
    return 'Name is required';
  }
  const trimmed = name.trim();
  if (trimmed.length < 20) {
    return 'Name must be at least 20 characters long';
  }
  if (trimmed.length > 60) {
    return 'Name must not exceed 60 characters';
  }
  return null;
};

export const validateEmail = (email) => {
  if (!email || typeof email !== 'string') {
    return 'Email is required';
  }
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  if (!emailRegex.test(email.trim())) {
    return 'Please provide a valid email address';
  }
  return null;
};

export const validatePassword = (password) => {
  if (!password || typeof password !== 'string') {
    return 'Password is required';
  }
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
  if (!address || typeof address !== 'string') {
    return 'Address is required';
  }
  const trimmed = address.trim();
  if (trimmed.length === 0) {
    return 'Address cannot be empty';
  }
  if (trimmed.length > 400) {
    return 'Address must not exceed 400 characters';
  }
  return null;
};

export const validateSignupInput = ({ name, email, password, address }) => {
  const errors = {};
  const nameErr = validateName(name);
  if (nameErr) errors.name = nameErr;

  const emailErr = validateEmail(email);
  if (emailErr) errors.email = emailErr;

  const passErr = validatePassword(password);
  if (passErr) errors.password = passErr;

  const addrErr = validateAddress(address);
  if (addrErr) errors.address = addrErr;

  return errors;
};
