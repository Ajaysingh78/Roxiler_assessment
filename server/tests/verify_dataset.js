import bcrypt from 'bcryptjs';
import { pool, disconnectDatabase } from '../src/database/connection.js';

async function verify() {
  console.log('=====================================================');
  console.log('🔍 ROXILER DATABASE SEED AUDIT & VERIFICATION (mysql2)');
  console.log('=====================================================');

  // 1. User Counts by Role
  const [[{ count: totalUsers }]] = await pool.query('SELECT COUNT(*) as count FROM users');
  const [[{ count: adminCount }]] = await pool.query("SELECT COUNT(*) as count FROM users WHERE role = 'ADMIN'");
  const [[{ count: ownerCount }]] = await pool.query("SELECT COUNT(*) as count FROM users WHERE role = 'STORE_OWNER'");
  const [[{ count: normalCount }]] = await pool.query("SELECT COUNT(*) as count FROM users WHERE role = 'USER'");

  console.log(`\n📊 USERS BREAKDOWN:`);
  console.log(`Total Users:        ${totalUsers}`);
  console.log(`Admin Users:        ${adminCount} (Target: 2-3)`);
  console.log(`Store Owners:       ${ownerCount} (Target: 8-12)`);
  console.log(`Normal Users:       ${normalCount} (Target: 25-40)`);

  // 2. Stores Breakdown
  const [[{ count: totalStores }]] = await pool.query('SELECT COUNT(*) as count FROM stores');
  const [[{ count: storesWithOwner }]] = await pool.query('SELECT COUNT(*) as count FROM stores WHERE ownerId IS NOT NULL');
  console.log(`\n🏪 STORES BREAKDOWN:`);
  console.log(`Total Stores:       ${totalStores} (Target: 10-15)`);
  console.log(`Stores with Owner:  ${storesWithOwner}`);

  // 3. Ratings Breakdown
  const [[{ count: totalRatings }]] = await pool.query('SELECT COUNT(*) as count FROM ratings');
  console.log(`\n⭐ RATINGS BREAKDOWN:`);
  console.log(`Total Ratings:      ${totalRatings} (Target: 60-100+)`);

  // 4. Duplicate Check
  const [duplicates] = await pool.query(`
    SELECT userId, storeId, COUNT(*) as cnt 
    FROM ratings 
    GROUP BY userId, storeId 
    HAVING cnt > 1
  `);
  console.log(`Duplicate (User, Store) pairs: ${duplicates.length} (Expected: 0)`);

  // 5. Orphan Checks
  const [orphanRatingsStore] = await pool.query(`
    SELECT r.id FROM ratings r LEFT JOIN stores s ON r.storeId = s.id WHERE s.id IS NULL
  `);
  const [orphanRatingsUser] = await pool.query(`
    SELECT r.id FROM ratings r LEFT JOIN users u ON r.userId = u.id WHERE u.id IS NULL
  `);
  console.log(`Orphan Ratings (invalid store): ${orphanRatingsStore.length} (Expected: 0)`);
  console.log(`Orphan Ratings (invalid user):  ${orphanRatingsUser.length} (Expected: 0)`);

  // 6. Store Rating Distribution & Test Cases
  console.log(`\n📈 STORE RATING DISTRIBUTIONS & TEST SCENARIOS:`);
  const [stores] = await pool.query(`
    SELECT s.id, s.name, s.email, u.email as owner_email
    FROM stores s
    LEFT JOIN users u ON s.ownerId = u.id
    ORDER BY s.name ASC
  `);

  let case1High = 0;
  let case2Medium = 0;
  let case3Low = 0;
  let case4Empty = 0;
  let case5HighVol = 0;

  for (const s of stores) {
    const [ratings] = await pool.query('SELECT rating FROM ratings WHERE storeId = ?', [s.id]);
    const count = ratings.length;
    const avg = count > 0 
      ? (ratings.reduce((acc, r) => acc + Number(r.rating), 0) / count).toFixed(2)
      : 'No ratings';
    
    if (count === 0) case4Empty++;
    else if (parseFloat(avg) >= 4.5) case1High++;
    else if (parseFloat(avg) >= 3.0 && parseFloat(avg) < 4.0) case2Medium++;
    else if (parseFloat(avg) < 3.0) case3Low++;

    if (count >= 15) case5HighVol++;

    console.log(`- [${s.name.substring(0, 32).padEnd(32)}] | Ratings: ${String(count).padStart(2)} | Avg: ${String(avg).padStart(10)} | Owner: ${s.owner_email || 'None'}`);
  }

  console.log(`\n🎯 TARGET TEST SCENARIOS VERIFICATION:`);
  console.log(`Case 1: Highly rated stores (>= 4.5):      ${case1High} stores`);
  console.log(`Case 2: Medium rated stores (3.0 - 4.0):    ${case2Medium} stores`);
  console.log(`Case 3: Poorly rated stores (< 3.0):       ${case3Low} stores`);
  console.log(`Case 4: Stores with NO ratings (empty):     ${case4Empty} stores`);
  console.log(`Case 5: High-volume rating store (>= 15):   ${case5HighVol} stores`);

  // 7. Password Verification on Key Demo Accounts
  console.log(`\n🔐 CREDENTIALS VERIFICATION:`);
  const testAccounts = [
    { email: 'admin.demo@example.com', pass: 'Admin@123', role: 'ADMIN' },
    { email: 'admin@roxiler.com', pass: 'Admin@123', role: 'ADMIN' },
    { email: 'user.demo@example.com', pass: 'User@123', role: 'USER' },
    { email: 'owner.demo@example.com', pass: 'Owner@123', role: 'STORE_OWNER' },
    { email: 'owner.empty@example.com', pass: 'Owner@123', role: 'STORE_OWNER' }
  ];

  for (const acc of testAccounts) {
    const [rows] = await pool.execute('SELECT * FROM users WHERE email = ? LIMIT 1', [acc.email]);
    const user = rows[0];
    if (!user) {
      console.log(`❌ Account ${acc.email} NOT FOUND!`);
    } else {
      const match = await bcrypt.compare(acc.pass, user.password);
      console.log(`✅ ${acc.role.padEnd(12)} [${acc.email}] - Login password valid: ${match}`);
    }
  }

  // 8. Primary Demo User Rating Profile
  const [demoUserRows] = await pool.execute('SELECT * FROM users WHERE email = ? LIMIT 1', ['user.demo@example.com']);
  const demoUser = demoUserRows[0];

  if (demoUser) {
    const [userRatings] = await pool.query(`
      SELECT r.rating, s.name as store_name
      FROM ratings r
      JOIN stores s ON r.storeId = s.id
      WHERE r.userId = ?
    `, [demoUser.id]);

    console.log(`\n👤 PRIMARY DEMO USER PROFILE (user.demo@example.com):`);
    console.log(`Stores Rated by user.demo: ${userRatings.length} out of ${totalStores}`);
    for (const r of userRatings) {
      console.log(`  -> Rated "${r.store_name}": ${r.rating} ⭐`);
    }
    console.log(`Stores NOT Rated yet:      ${totalStores - userRatings.length}`);
  }

  console.log('\n=====================================================');
  console.log('🏁 AUDIT COMPLETE (mysql2)');
  console.log('=====================================================');
}

verify()
  .catch(console.error)
  .finally(async () => {
    await disconnectDatabase();
  });
