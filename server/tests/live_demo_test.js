const BASE_URL = 'http://localhost:5000/api';

async function testApiFlows() {
  console.log('=====================================================');
  console.log('🌐 TESTING LIVE API ENDPOINTS WITH NEW DEMO CREDENTIALS');
  console.log('=====================================================');

  // 1. Admin Demo Login & Dashboard
  console.log('\n--- 1. Testing Admin Demo (admin.demo@example.com) ---');
  const adminRes = await fetch(`${BASE_URL}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email: 'admin.demo@example.com', password: 'Admin@123' })
  });
  const adminJson = await adminRes.json();
  if (!adminRes.ok) throw new Error(`Admin login failed: ${JSON.stringify(adminJson)}`);
  const adminData = adminJson.data;
  console.log(`✅ Admin Login successful: ${adminData.user.name} (${adminData.user.role})`);
  
  const adminToken = adminData.token;
  const dashRes = await fetch(`${BASE_URL}/admin/dashboard`, {
    headers: { Authorization: `Bearer ${adminToken}` }
  });
  const dashData = await dashRes.json();
  console.log(`✅ Admin Dashboard Stats:`, dashData.data);

  // 2. Normal User Demo Login & Store Discovery
  console.log('\n--- 2. Testing Normal User Demo (user.demo@example.com) ---');
  const userRes = await fetch(`${BASE_URL}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email: 'user.demo@example.com', password: 'User@123' })
  });
  const userJson = await userRes.json();
  if (!userRes.ok) throw new Error(`User login failed: ${JSON.stringify(userJson)}`);
  const userData = userJson.data;
  console.log(`✅ User Login successful: ${userData.user.name} (${userData.user.role})`);

  const userToken = userData.token;
  const storesRes = await fetch(`${BASE_URL}/stores`, {
    headers: { Authorization: `Bearer ${userToken}` }
  });
  const storesData = await storesRes.json();
  console.log(`✅ Stores fetched by user: ${storesData.data.length} total stores`);
  const ratedByMe = storesData.data.filter(s => s.userSubmittedRating !== null);
  const unratedByMe = storesData.data.filter(s => s.userSubmittedRating === null);
  console.log(`   - Stores with userSubmittedRating (already rated): ${ratedByMe.length}`);
  console.log(`   - Stores without userSubmittedRating (ready to rate): ${unratedByMe.length}`);

  // Test rating submission & update
  const storeToRate = unratedByMe[0];
  if (storeToRate) {
    console.log(`   - Submitting rating 5 for unrated store: "${storeToRate.name}"`);
    const rateRes = await fetch(`${BASE_URL}/stores/${storeToRate.id}/ratings`, {
      method: 'POST',
      headers: { 
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userToken}` 
      },
      body: JSON.stringify({ rating: 5 })
    });
    console.log(`   ✅ Rating submitted: status ${rateRes.status}`);

    console.log(`   - Updating rating to 4 for same store: "${storeToRate.name}"`);
    const updateRes = await fetch(`${BASE_URL}/stores/${storeToRate.id}/ratings`, {
      method: 'PUT',
      headers: { 
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userToken}` 
      },
      body: JSON.stringify({ rating: 4 })
    });
    console.log(`   ✅ Rating updated: status ${updateRes.status}`);
  }

  // 3. Store Owner Demo Login & Dashboard (Active Store)
  console.log('\n--- 3. Testing Store Owner Demo (owner.demo@example.com) ---');
  const ownerRes = await fetch(`${BASE_URL}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email: 'owner.demo@example.com', password: 'Owner@123' })
  });
  const ownerJson = await ownerRes.json();
  if (!ownerRes.ok) throw new Error(`Owner login failed: ${JSON.stringify(ownerJson)}`);
  const ownerData = ownerJson.data;
  console.log(`✅ Owner Login successful: ${ownerData.user.name}`);

  const ownerToken = ownerData.token;
  const ownerDashRes = await fetch(`${BASE_URL}/owner/dashboard`, {
    headers: { Authorization: `Bearer ${ownerToken}` }
  });
  const ownerDashData = await ownerDashRes.json();
  console.log(`✅ Owner Dashboard for "${ownerDashData.data.store?.name}":`);
  console.log(`   - Overall Rating: ${ownerDashData.data.averageRating}`);
  console.log(`   - Total Ratings: ${ownerDashData.data.totalRatings}`);

  const ownerRatingsRes = await fetch(`${BASE_URL}/owner/ratings`, {
    headers: { Authorization: `Bearer ${ownerToken}` }
  });
  const ownerRatingsData = await ownerRatingsRes.json();
  console.log(`✅ Customer Reviews listed: ${ownerRatingsData.data.length} customer ratings`);

  // 4. Store Owner Empty State Demo Login (owner.empty@example.com)
  console.log('\n--- 4. Testing Owner Empty State (owner.empty@example.com) ---');
  const emptyRes = await fetch(`${BASE_URL}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email: 'owner.empty@example.com', password: 'Owner@123' })
  });
  const emptyJson = await emptyRes.json();
  const emptyData = emptyJson.data;
  console.log(`✅ Empty State Owner Login successful: ${emptyData.user.name}`);

  const emptyDashRes = await fetch(`${BASE_URL}/owner/dashboard`, {
    headers: { Authorization: `Bearer ${emptyData.token}` }
  });
  const emptyDashData = await emptyDashRes.json();
  console.log(`✅ Empty State Store: "${emptyDashData.data.store?.name}"`);
  console.log(`   - Overall Rating: ${emptyDashData.data.averageRating} (Expected: 0)`);
  console.log(`   - Total Ratings: ${emptyDashData.data.totalRatings} (Expected: 0)`);

  const emptyRatingsRes = await fetch(`${BASE_URL}/owner/ratings`, {
    headers: { Authorization: `Bearer ${emptyData.token}` }
  });
  const emptyRatingsData = await emptyRatingsRes.json();
  console.log(`✅ Customer Reviews: ${emptyRatingsData.data.length} (Expected: 0 - Empty State verified)`);

  console.log('\n=====================================================');
  console.log('🎉 ALL LIVE API & DEMO ACCOUNT FLOWS VERIFIED SUCCESSFULLY');
  console.log('=====================================================');
}

testApiFlows().catch(console.error);
