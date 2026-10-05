import assert from 'node:assert/strict';

const BASE_URL = 'http://localhost:5000/api';

async function request(path, options = {}) {
  const url = `${BASE_URL}${path}`;
  const res = await fetch(url, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...options.headers
    }
  });
  const data = await res.json().catch(() => ({}));
  return { status: res.status, ok: res.ok, data };
}

async function runAudit() {
  console.log('====================================================');
  console.log('🚀 RUNNING EXHAUSTIVE PRE-SUBMISSION AUDIT SUITE');
  console.log('====================================================');

  let passed = 0;
  let failed = 0;

  async function test(name, fn) {
    try {
      await fn();
      console.log(`  ✅ PASS: ${name}`);
      passed++;
    } catch (err) {
      console.error(`  ❌ FAIL: ${name}`);
      console.error(`     Reason: ${err.message}`);
      failed++;
    }
  }

  // ----------------------------------------------------
  // TEST SECTION 1: Health & Base
  // ----------------------------------------------------
  console.log('\n--- Section 1: Health Check ---');
  await test('GET /api/health returns healthy', async () => {
    const res = await request('/health');
    assert.equal(res.status, 200);
    assert.equal(res.data.status, 'healthy');
  });

  // ----------------------------------------------------
  // TEST SECTION 2: Authentication & Password Security
  // ----------------------------------------------------
  console.log('\n--- Section 2: Authentication & Security ---');
  let adminToken = '';
  let ownerToken = '';
  let userToken = '';

  await test('POST /api/auth/login with Admin credentials', async () => {
    const res = await request('/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email: 'admin@roxiler.com', password: 'Admin@123' })
    });
    assert.equal(res.status, 200);
    assert.equal(res.data.success, true);
    assert.equal(res.data.data.user.role, 'ADMIN');
    assert.equal(res.data.data.user.password, undefined, 'Password must not be returned');
    adminToken = res.data.data.token;
    assert.ok(adminToken);
  });

  await test('POST /api/auth/login with Store Owner credentials', async () => {
    const res = await request('/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email: 'owner.demo@example.com', password: 'Owner@123' })
    });
    assert.equal(res.status, 200);
    assert.equal(res.data.success, true);
    assert.equal(res.data.data.user.role, 'STORE_OWNER');
    assert.equal(res.data.data.user.password, undefined, 'Password must not be returned');
    ownerToken = res.data.data.token;
    assert.ok(ownerToken);
  });

  await test('POST /api/auth/login with Normal User credentials', async () => {
    const res = await request('/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email: 'user.demo@example.com', password: 'User@123' })
    });
    assert.equal(res.status, 200);
    assert.equal(res.data.success, true);
    assert.equal(res.data.data.user.role, 'USER');
    assert.equal(res.data.data.user.password, undefined, 'Password must not be returned');
    userToken = res.data.data.token;
    assert.ok(userToken);
  });

  await test('GET /api/auth/me ensures NO password field is returned', async () => {
    const res = await request('/auth/me', {
      headers: { Authorization: `Bearer ${userToken}` }
    });
    assert.equal(res.status, 200);
    assert.equal(res.data.data.user.password, undefined, 'Password must NOT be in /me response');
    assert.ok(res.data.data.user.email);
  });

  await test('POST /api/auth/login rejects invalid password', async () => {
    const res = await request('/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email: 'user.demo@example.com', password: 'WrongPassword@123' })
    });
    assert.equal(res.status, 401);
  });

  // ----------------------------------------------------
  // TEST SECTION 3: Validation Constraints (20-60 chars, 8-16 pwd, etc.)
  // ----------------------------------------------------
  console.log('\n--- Section 3: Input Validation Rules ---');
  await test('Signup rejects name < 20 chars', async () => {
    const res = await request('/auth/signup', {
      method: 'POST',
      body: JSON.stringify({
        name: 'Short Name',
        email: 'short.name@example.com',
        password: 'ValidPassword@123',
        address: '123 Valid Address Road'
      })
    });
    assert.equal(res.status, 400);
    assert.ok(res.data.errors?.name);
  });

  await test('Signup rejects name > 60 chars', async () => {
    const res = await request('/auth/signup', {
      method: 'POST',
      body: JSON.stringify({
        name: 'A'.repeat(61),
        email: 'long.name@example.com',
        password: 'ValidPassword@123',
        address: '123 Valid Address Road'
      })
    });
    assert.equal(res.status, 400);
    assert.ok(res.data.errors?.name);
  });

  await test('Signup rejects password without uppercase', async () => {
    const res = await request('/auth/signup', {
      method: 'POST',
      body: JSON.stringify({
        name: 'Valid Length User Name Required',
        email: 'valid.user.no.upper@example.com',
        password: 'validpassword@123',
        address: '123 Valid Address Road'
      })
    });
    assert.equal(res.status, 400);
    assert.ok(res.data.errors?.password);
  });

  await test('Signup rejects password without special char', async () => {
    const res = await request('/auth/signup', {
      method: 'POST',
      body: JSON.stringify({
        name: 'Valid Length User Name Required',
        email: 'valid.user.no.special@example.com',
        password: 'ValidPassword1234',
        address: '123 Valid Address Road'
      })
    });
    assert.equal(res.status, 400);
    assert.ok(res.data.errors?.password);
  });

  await test('Signup rejects address > 400 chars', async () => {
    const res = await request('/auth/signup', {
      method: 'POST',
      body: JSON.stringify({
        name: 'Valid Length User Name Required',
        email: 'valid.user.long.addr@example.com',
        password: 'ValidPassword@123',
        address: 'X'.repeat(401)
      })
    });
    assert.equal(res.status, 400);
    assert.ok(res.data.errors?.address);
  });

  // ----------------------------------------------------
  // TEST SECTION 4: Role-Based Authorization
  // ----------------------------------------------------
  console.log('\n--- Section 4: Role Authorization Security ---');
  await test('Normal User CANNOT access /api/admin/dashboard (403 Forbidden)', async () => {
    const res = await request('/admin/dashboard', {
      headers: { Authorization: `Bearer ${userToken}` }
    });
    assert.equal(res.status, 403);
  });

  await test('Normal User CANNOT access /api/owner/dashboard (403 Forbidden)', async () => {
    const res = await request('/owner/dashboard', {
      headers: { Authorization: `Bearer ${userToken}` }
    });
    assert.equal(res.status, 403);
  });

  await test('Store Owner CANNOT access /api/admin/dashboard (403 Forbidden)', async () => {
    const res = await request('/admin/dashboard', {
      headers: { Authorization: `Bearer ${ownerToken}` }
    });
    assert.equal(res.status, 403);
  });

  await test('Unauthenticated request to protected endpoint fails (401 Unauthorized)', async () => {
    const res = await request('/admin/dashboard');
    assert.equal(res.status, 401);
  });

  // ----------------------------------------------------
  // TEST SECTION 5: Admin Operations
  // ----------------------------------------------------
  console.log('\n--- Section 5: Admin Dashboard & Management ---');
  await test('Admin dashboard returns valid stats structure', async () => {
    const res = await request('/admin/dashboard', {
      headers: { Authorization: `Bearer ${adminToken}` }
    });
    assert.equal(res.status, 200);
    assert.ok(res.data.data.totalUsers >= 3);
    assert.ok(res.data.data.totalStores >= 1);
    assert.ok(typeof res.data.data.totalRatings === 'number');
    assert.ok(res.data.data.roles);
  });

  await test('Admin get users with search, role filter, sorting', async () => {
    const res = await request('/admin/users?role=STORE_OWNER&sortBy=name&order=asc', {
      headers: { Authorization: `Bearer ${adminToken}` }
    });
    assert.equal(res.status, 200);
    assert.ok(Array.isArray(res.data.data));
    for (const u of res.data.data) {
      assert.equal(u.role, 'STORE_OWNER');
      assert.equal(u.password, undefined);
    }
  });

  await test('Admin get stores list', async () => {
    const res = await request('/admin/stores', {
      headers: { Authorization: `Bearer ${adminToken}` }
    });
    assert.equal(res.status, 200);
    assert.ok(Array.isArray(res.data.data));
    assert.ok(res.data.data.length > 0);
  });

  // ----------------------------------------------------
  // TEST SECTION 6: Rating System & Integrity
  // ----------------------------------------------------
  console.log('\n--- Section 6: Rating System & Upsert Integrity ---');
  let testStoreId = '';
  await test('Fetch public stores and locate a store', async () => {
    const res = await request('/stores');
    assert.equal(res.status, 200);
    assert.ok(res.data.data.length > 0);
    testStoreId = res.data.data[0].id;
    assert.ok(testStoreId);
  });

  await test('Store owner is FORBIDDEN from rating stores (403)', async () => {
    const res = await request(`/stores/${testStoreId}/ratings`, {
      method: 'POST',
      headers: { Authorization: `Bearer ${ownerToken}` },
      body: JSON.stringify({ rating: 5 })
    });
    assert.equal(res.status, 403);
  });

  await test('Rating must reject invalid values (0, 6, decimal, string)', async () => {
    for (const invalid of [0, 6, 3.5, -1, 'invalid']) {
      const res = await request(`/stores/${testStoreId}/ratings`, {
        method: 'POST',
        headers: { Authorization: `Bearer ${userToken}` },
        body: JSON.stringify({ rating: invalid })
      });
      assert.equal(res.status, 400, `Rating ${invalid} should be rejected with 400`);
    }
  });

  await test('Normal user can submit rating (e.g. 4 stars)', async () => {
    const res = await request(`/stores/${testStoreId}/ratings`, {
      method: 'POST',
      headers: { Authorization: `Bearer ${userToken}` },
      body: JSON.stringify({ rating: 4 })
    });
    assert.equal(res.status, 200);
    assert.equal(res.data.data.rating.rating, 4);
  });

  await test('Normal user updating rating does NOT create duplicate record (Upsert integrity)', async () => {
    const res = await request(`/stores/${testStoreId}/ratings`, {
      method: 'POST',
      headers: { Authorization: `Bearer ${userToken}` },
      body: JSON.stringify({ rating: 5 })
    });
    assert.equal(res.status, 200);
    assert.equal(res.data.data.rating.rating, 5);

    // Verify via GET stores with token that userSubmittedRating is 5
    const storeRes = await request(`/stores`, {
      headers: { Authorization: `Bearer ${userToken}` }
    });
    assert.equal(storeRes.status, 200);
    const store = storeRes.data.data.find(s => s.id === testStoreId);
    assert.ok(store);
    assert.equal(store.userSubmittedRating, 5);
  });

  // ----------------------------------------------------
  // TEST SECTION 7: Store Owner Dashboard
  // ----------------------------------------------------
  console.log('\n--- Section 7: Store Owner Dashboard ---');
  await test('Store owner dashboard returns their store stats & rating distribution', async () => {
    const res = await request('/owner/dashboard', {
      headers: { Authorization: `Bearer ${ownerToken}` }
    });
    assert.equal(res.status, 200);
    assert.equal(res.data.success, true);
    assert.ok(typeof res.data.data.averageRating === 'number');
    assert.ok(typeof res.data.data.totalRatings === 'number');
    assert.ok(res.data.data.breakdown);
  });

  await test('Store owner ratings ledger returns list of customers who reviewed store', async () => {
    const res = await request('/owner/ratings', {
      headers: { Authorization: `Bearer ${ownerToken}` }
    });
    assert.equal(res.status, 200);
    assert.ok(Array.isArray(res.data.data));
  });

  // ----------------------------------------------------
  // SUMMARY
  // ----------------------------------------------------
  console.log('\n====================================================');
  console.log(`📊 AUDIT COMPLETED: ${passed} PASSED, ${failed} FAILED`);
  console.log('====================================================');

  if (failed > 0) {
    process.exit(1);
  } else {
    process.exit(0);
  }
}

runAudit().catch(err => {
  console.error('Audit suite crashed:', err);
  process.exit(1);
});
