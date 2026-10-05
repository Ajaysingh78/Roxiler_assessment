import test from 'node:test';
import assert from 'node:assert/strict';
import http from 'node:http';
import app from '../../src/app.js';
import { checkDatabaseConnection, disconnectDatabase } from '../../src/database/connection.js';

let server;
let baseUrl;

test.before(async () => {
  await checkDatabaseConnection();
  server = http.createServer(app);
  await new Promise((resolve) => {
    server.listen(0, '127.0.0.1', () => {
      const port = server.address().port;
      baseUrl = `http://127.0.0.1:${port}/api`;
      resolve();
    });
  });
});

test.after(async () => {
  await new Promise((resolve) => server.close(resolve));
  await disconnectDatabase();
});

test('GET /api/health returns healthy', async () => {
  const res = await fetch(`${baseUrl}/health`);
  const data = await res.json();
  assert.equal(res.status, 200);
  assert.equal(data.status, 'healthy');
});

test('POST /api/auth/login with valid admin credentials', async () => {
  const res = await fetch(`${baseUrl}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      email: 'admin@roxiler.com',
      password: 'Admin@123'
    })
  });
  const body = await res.json();
  assert.equal(res.status, 200);
  assert.equal(body.success, true);
  assert.equal(body.data.user.role, 'ADMIN');
  assert.ok(body.data.token);
});

test('POST /api/auth/login with invalid credentials fails', async () => {
  const res = await fetch(`${baseUrl}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      email: 'admin@roxiler.com',
      password: 'WrongPassword@123'
    })
  });
  const body = await res.json();
  assert.equal(res.status, 401);
  assert.equal(body.success, false);
});

test('POST /api/auth/signup validation enforces name (20-60 chars) and password rules', async () => {
  // Name too short (<20)
  const resShort = await fetch(`${baseUrl}/auth/signup`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      name: 'Short Name',
      email: 'short.name@example.com',
      password: 'Password@123',
      address: '123 Main Street, Cityville'
    })
  });
  const bodyShort = await resShort.json();
  assert.equal(resShort.status, 400);
  assert.ok(bodyShort.errors.name);

  // Password missing special character
  const resPass = await fetch(`${baseUrl}/auth/signup`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      name: 'Jonathan Bartholomew Edwardson',
      email: 'jonathan.b@example.com',
      password: 'Password123',
      address: '123 Main Street, Cityville'
    })
  });
  const bodyPass = await resPass.json();
  assert.equal(resPass.status, 400);
  assert.ok(bodyPass.errors.password);
});

test('POST /api/auth/signup successful registration', async () => {
  const uniqueEmail = `test.user.${Date.now()}@example.com`;
  const res = await fetch(`${baseUrl}/auth/signup`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      name: 'Samantha Jacqueline Abernathy', // 30 chars
      email: uniqueEmail,
      password: 'ValidPass@123',
      address: '742 Evergreen Terrace, Springfield Sector 4'
    })
  });
  const body = await res.json();
  assert.equal(res.status, 201);
  assert.equal(body.success, true);
  assert.equal(body.data.user.role, 'USER');
  assert.ok(body.data.token);
});

test('GET /api/stores lists stores with average ratings', async () => {
  const res = await fetch(`${baseUrl}/stores`);
  const body = await res.json();
  assert.equal(res.status, 200);
  assert.equal(body.success, true);
  assert.ok(Array.isArray(body.data));
  assert.ok(body.data.length >= 5);
  const firstStore = body.data[0];
  assert.ok('overallRating' in firstStore);
  assert.ok('totalRatings' in firstStore);
});

test('Store rating submission & upsert modification', async () => {
  // 1. Login as normal user
  const loginRes = await fetch(`${baseUrl}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      email: 'alexandra.turner@example.com',
      password: 'User@123'
    })
  });
  const loginData = await loginRes.json();
  const token = loginData.data.token;

  // 2. Get stores
  const storesRes = await fetch(`${baseUrl}/stores`);
  const storesData = await storesRes.json();
  const store = storesData.data[0];

  // 3. Submit a rating of 4
  const rateRes = await fetch(`${baseUrl}/stores/${store.id}/ratings`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`
    },
    body: JSON.stringify({ rating: 4 })
  });
  const rateData = await rateRes.json();
  assert.equal(rateRes.status, 200);
  assert.equal(rateData.success, true);
  assert.equal(rateData.data.rating.rating, 4);

  // 4. Update rating to 5 (Upsert modification)
  const updateRes = await fetch(`${baseUrl}/stores/${store.id}/ratings`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`
    },
    body: JSON.stringify({ rating: 5 })
  });
  const updateData = await updateRes.json();
  assert.equal(updateRes.status, 200);
  assert.equal(updateData.data.rating.rating, 5);
});

test('GET /api/admin/dashboard metrics requires ADMIN role', async () => {
  // Try without token
  const noAuthRes = await fetch(`${baseUrl}/admin/dashboard`);
  assert.equal(noAuthRes.status, 401);

  // Try with USER token
  const userLogin = await fetch(`${baseUrl}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      email: 'alexandra.turner@example.com',
      password: 'User@123'
    })
  });
  const userToken = (await userLogin.json()).data.token;

  const forbiddenRes = await fetch(`${baseUrl}/admin/dashboard`, {
    headers: { Authorization: `Bearer ${userToken}` }
  });
  assert.equal(forbiddenRes.status, 403);

  // Try with ADMIN token
  const adminLogin = await fetch(`${baseUrl}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      email: 'admin@roxiler.com',
      password: 'Admin@123'
    })
  });
  const adminToken = (await adminLogin.json()).data.token;

  const adminRes = await fetch(`${baseUrl}/admin/dashboard`, {
    headers: { Authorization: `Bearer ${adminToken}` }
  });
  const adminData = await adminRes.json();
  assert.equal(adminRes.status, 200);
  assert.ok(adminData.data.totalUsers > 0);
  assert.ok(adminData.data.totalStores > 0);
  assert.ok(adminData.data.totalRatings > 0);
});

test('GET /api/owner/dashboard returns store stats for store owner', async () => {
  const ownerLogin = await fetch(`${baseUrl}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      email: 'owner.john@freshmart.com',
      password: 'Owner@123'
    })
  });
  const ownerToken = (await ownerLogin.json()).data.token;

  const ownerRes = await fetch(`${baseUrl}/owner/dashboard`, {
    headers: { Authorization: `Bearer ${ownerToken}` }
  });
  const ownerData = await ownerRes.json();
  assert.equal(ownerRes.status, 200);
  assert.equal(ownerData.data.hasStore, true);
  assert.ok(ownerData.data.averageRating > 0);
  assert.ok(Array.isArray(ownerData.data.ratings));
});
