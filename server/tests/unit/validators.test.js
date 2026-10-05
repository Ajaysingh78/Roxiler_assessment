import { test } from 'node:test';
import assert from 'node:assert/strict';
import {
  validateName,
  validateEmail,
  validatePassword,
  validateAddress
} from '../../src/validators/auth.validator.js';
import { validateRating } from '../../src/validators/rating.validator.js';

test('validateName: enforces 20 to 60 characters range', () => {
  assert.ok(validateName(''));
  assert.ok(validateName(null));
  assert.ok(validateName('Short Name')); // 10 chars
  assert.ok(validateName('A'.repeat(19))); // 19 chars
  assert.equal(validateName('A'.repeat(20)), null); // 20 chars - valid minimum
  assert.equal(validateName('Jonathan Bartholomew Edwardson'), null); // 31 chars - valid
  assert.equal(validateName('A'.repeat(60)), null); // 60 chars - valid maximum
  assert.ok(validateName('A'.repeat(61))); // 61 chars - exceeds max
});

test('validateEmail: enforces standard RFC format', () => {
  assert.ok(validateEmail(''));
  assert.ok(validateEmail('invalid-email'));
  assert.ok(validateEmail('@domain.com'));
  assert.ok(validateEmail('user@'));
  assert.ok(validateEmail('user@domain'));
  assert.equal(validateEmail('user@example.com'), null);
  assert.equal(validateEmail('admin.super@roxiler-system.org'), null);
});

test('validatePassword: enforces 8-16 chars with uppercase and special characters', () => {
  assert.ok(validatePassword(''));
  assert.ok(validatePassword('Pass@1')); // 6 chars (too short)
  assert.ok(validatePassword('PasswordIsWayTooLong123@#$')); // > 16 chars (too long)
  assert.ok(validatePassword('password@123')); // missing uppercase
  assert.ok(validatePassword('Password123')); // missing special char
  assert.equal(validatePassword('PASSWORD@123'), null); // valid uppercase + special
  assert.equal(validatePassword('Password@123'), null); // 12 chars, uppercase + special
  assert.equal(validatePassword('Admin@123'), null); // 9 chars, uppercase + special
});

test('validateAddress: enforces max 400 characters', () => {
  assert.ok(validateAddress(''));
  assert.ok(validateAddress('   '));
  assert.equal(validateAddress('124 Elm Street, Apt 3B, Boston, MA 02108'), null);
  assert.equal(validateAddress('A'.repeat(400)), null); // valid max
  assert.ok(validateAddress('A'.repeat(401))); // exceeds max
});

test('validateRating: enforces integer strictly between 1 and 5', () => {
  assert.ok(validateRating(0));
  assert.ok(validateRating(6));
  assert.ok(validateRating(-1));
  assert.ok(validateRating(3.5)); // non-integer
  assert.ok(validateRating('invalid'));
  assert.equal(validateRating(1), null);
  assert.equal(validateRating(2), null);
  assert.equal(validateRating(3), null);
  assert.equal(validateRating(4), null);
  assert.equal(validateRating(5), null);
});
