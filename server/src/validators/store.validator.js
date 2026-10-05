import { validateName, validateEmail, validateAddress } from './auth.validator.js';

export const validateStoreInput = ({ name, email, address }) => {
  const errors = {};
  const nameErr = validateName(name);
  if (nameErr) errors.name = nameErr;

  const emailErr = validateEmail(email);
  if (emailErr) errors.email = emailErr;

  const addrErr = validateAddress(address);
  if (addrErr) errors.address = addrErr;

  return errors;
};
