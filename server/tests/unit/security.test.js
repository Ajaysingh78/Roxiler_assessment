import { test } from 'node:test';
import assert from 'node:assert/strict';
import { hashPassword, comparePassword } from '../../src/utils/password.js';
import { generateToken, verifyToken } from '../../src/utils/jwt.js';

test('Password utility: properly hashes and compares passwords', async () => {
  const plain = 'SecurePassword@123';
  const hashed = await hashPassword(plain);

  assert.notEqual(hashed, plain);
  assert.ok(hashed.startsWith('$2')); // bcrypt prefix

  const match = await comparePassword(plain, hashed);
  assert.equal(match, true);

  const wrongMatch = await comparePassword('WrongPassword@123', hashed);
  assert.equal(wrongMatch, false);
});

test('JWT utility: creates valid tokens and decodes payload', () => {
  const payload = { id: 'usr-123', email: 'test@example.com', role: 'ADMIN' };
  const token = generateToken(payload);

  assert.ok(typeof token === 'string');
  assert.equal(token.split('.').length, 3); // standard header.payload.signature

  const decoded = verifyToken(token);
  assert.equal(decoded.id, payload.id);
  assert.equal(decoded.email, payload.email);
  assert.equal(decoded.role, payload.role);
});
