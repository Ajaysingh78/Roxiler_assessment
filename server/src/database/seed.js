import bcrypt from 'bcryptjs';
import { randomUUID } from 'node:crypto';
import { pool, disconnectDatabase } from './connection.js';

/**
 * Roxiler Systems Store Rating Platform
 * Comprehensive, Realistic, Idempotent Demo & Development Seed Script (mysql2 Implementation)
 */
async function seed() {
  console.log('=====================================================');
  console.log('🌱 ROXILER SEED: Starting Comprehensive Data Seeding');
  console.log('Database Engine: MySQL (via mysql2 pool)');
  console.log('=====================================================');

  const stats = {
    adminsCreated: 0,
    ownersCreated: 0,
    usersCreated: 0,
    storesCreated: 0,
    ratingsCreated: 0,
    existingSkipped: 0
  };

  const salt = await bcrypt.genSalt(10);
  const adminPassword = await bcrypt.hash('Admin@123', salt);
  const ownerPassword = await bcrypt.hash('Owner@123', salt);
  const userPassword = await bcrypt.hash('User@123', salt);

  // --------------------------------------------------------------------------
  // 1. ADMIN USERS (3 Admins)
  // --------------------------------------------------------------------------
  const adminDefs = [
    {
      name: 'System Administrator Roxiler', // 28 chars
      email: 'admin@roxiler.com',
      password: adminPassword,
      address: '742 Evergreen Terrace, Springfield Sector 4, Enterprise City',
      role: 'ADMIN'
    },
    {
      name: 'Chief Technology Administrator', // 32 chars
      email: 'admin.demo@example.com',
      password: adminPassword,
      address: 'Plot 104, IT Park, Bhopal, Madhya Pradesh 462023',
      role: 'ADMIN'
    },
    {
      name: 'Senior Compliance Administrator', // 33 chars
      email: 'admin.super@example.com',
      password: adminPassword,
      address: 'Level 14, Tower B, Cyber City, Gurugram, Haryana 122002',
      role: 'ADMIN'
    }
  ];

  for (const adm of adminDefs) {
    const [existing] = await pool.execute('SELECT id FROM users WHERE email = ? LIMIT 1', [adm.email]);
    if (existing.length === 0) {
      const id = randomUUID();
      await pool.execute(
        `INSERT INTO users (id, name, email, password, address, role, createdAt, updatedAt)
         VALUES (?, ?, ?, ?, ?, ?, NOW(3), NOW(3))`,
        [id, adm.name, adm.email, adm.password, adm.address, adm.role]
      );
      stats.adminsCreated++;
    } else {
      stats.existingSkipped++;
    }
  }

  // --------------------------------------------------------------------------
  // 2. STORE OWNERS (11 Store Owners)
  // --------------------------------------------------------------------------
  const ownerDefs = [
    {
      name: 'Jonathan Edward Masterson', // 25 chars
      email: 'owner.john@freshmart.com',
      password: ownerPassword,
      address: '100 Market Boulevard, Suite 400, New York, NY 10001',
      role: 'STORE_OWNER'
    },
    {
      name: 'Victoria Elizabeth Sterling', // 27 chars
      email: 'owner.victoria@techhub.com',
      password: ownerPassword,
      address: '450 Technology Parkway, Innovation District, San Jose, CA 95110',
      role: 'STORE_OWNER'
    },
    {
      name: 'Rajeshwar Prasad Srivastava', // 28 chars
      email: 'owner.rajesh@technova.com',
      password: ownerPassword,
      address: 'Zone 1, Maharana Pratap Nagar, Bhopal, Madhya Pradesh 462011',
      role: 'STORE_OWNER'
    },
    {
      name: 'Meenakshi Sundaram Pillai', // 25 chars
      email: 'owner.meenakshi@quickbite.com',
      password: ownerPassword,
      address: '45 Usman Road, T Nagar, Chennai, Tamil Nadu 600017',
      role: 'STORE_OWNER'
    },
    {
      name: 'Devendra Singh Rathore Bhopal', // 30 chars
      email: 'owner.devendra@artisanbakery.com',
      password: ownerPassword,
      address: 'Arera Colony, E-3 Sector, Bhopal, Madhya Pradesh 462016',
      role: 'STORE_OWNER'
    },
    {
      name: 'Pooja Suryavanshi Hyderabad', // 27 chars (Owner of empty state store)
      email: 'owner.empty@example.com',
      password: ownerPassword,
      address: 'Road No 36, Jubilee Hills, Hyderabad, Telangana 500033',
      role: 'STORE_OWNER'
    },
    {
      name: 'Anuradha Vikramaditya Joshi', // 27 chars
      email: 'owner.anuradha@heritagebooks.com',
      password: ownerPassword,
      address: 'Fergusson College Road, Shivajinagar, Pune, Maharashtra 411004',
      role: 'STORE_OWNER'
    },
    {
      name: 'Harshavardhan Kalyanrao Patil', // 30 chars
      email: 'owner.harsh@apexathletic.com',
      password: ownerPassword,
      address: 'Linking Road, Bandra West, Mumbai, Maharashtra 400050',
      role: 'STORE_OWNER'
    },
    {
      name: 'Deepak Ranganathan Bengaluru', // 28 chars
      email: 'owner.deepak@phonecare.com',
      password: ownerPassword,
      address: '100 Feet Road, Indiranagar, Bengaluru, Karnataka 560038',
      role: 'STORE_OWNER'
    },
    {
      name: 'Sunil Kumar Chakraborty Kolkata', // 32 chars
      email: 'owner.sunil@comfortzone.com',
      password: ownerPassword,
      address: 'Sector 5, Salt Lake City, Bidhannagar, Kolkata, West Bengal 700091',
      role: 'STORE_OWNER'
    },
    {
      name: 'Roxiler Demo Store Owner Account', // 34 chars
      email: 'owner.demo@example.com',
      password: ownerPassword,
      address: 'Shop 102, Commercial Arcade, MP Nagar Zone 2, Bhopal, MP 462011',
      role: 'STORE_OWNER'
    }
  ];

  const ownerMap = {};
  for (const o of ownerDefs) {
    const [existing] = await pool.execute('SELECT id, name, email FROM users WHERE email = ? LIMIT 1', [o.email]);
    let owner;
    if (existing.length === 0) {
      const id = randomUUID();
      await pool.execute(
        `INSERT INTO users (id, name, email, password, address, role, createdAt, updatedAt)
         VALUES (?, ?, ?, ?, ?, ?, NOW(3), NOW(3))`,
        [id, o.name, o.email, o.password, o.address, o.role]
      );
      owner = { id, name: o.name, email: o.email };
      stats.ownersCreated++;
    } else {
      owner = existing[0];
      stats.existingSkipped++;
    }
    ownerMap[o.email] = owner;
  }

  // --------------------------------------------------------------------------
  // 3. STORES (12 Diverse Stores across India / Categories)
  // --------------------------------------------------------------------------
  const storeDefs = [
    {
      name: 'FreshHarvest Organic Supermart', // 30 chars - High count ratings
      email: 'contact@freshharvestsupermart.com',
      address: 'Shop 12-15, DB City Mall, MP Nagar, Bhopal, Madhya Pradesh 462011',
      ownerEmail: 'owner.john@freshmart.com'
    },
    {
      name: 'Silicon Valley Tech Superstore', // 30 chars - Electronics
      email: 'support@techhubdevices.com',
      address: '450 Technology Parkway, Innovation District, San Jose, CA 95110',
      ownerEmail: 'owner.victoria@techhub.com'
    },
    {
      name: 'TechNova Digital Electronics Hub', // 32 chars - Case 2: Medium (3.0-4.0)
      email: 'care@technovadigital.in',
      address: 'Opposite Jyoti Cinema, Zone 2, MP Nagar, Bhopal, Madhya Pradesh 462011',
      ownerEmail: 'owner.rajesh@technova.com'
    },
    {
      name: 'QuickBite Daily Essentials Mart', // 31 chars - Case 3: Poorly rated (<3.0)
      email: 'service@quickbitemart.in',
      address: '12 South Boag Road, T Nagar, Chennai, Tamil Nadu 600017',
      ownerEmail: 'owner.meenakshi@quickbite.com'
    },
    {
      name: 'Artisan Bakery & Coffee Roasters', // 32 chars - Case 1: Highly rated (4.5+)
      email: 'hello@artisanbakerycoffee.com',
      address: '14 Bittan Market Commercial Complex, E-5 Arera Colony, Bhopal, MP 462016',
      ownerEmail: 'owner.devendra@artisanbakery.com'
    },
    {
      name: 'UrbanNest Living & Furniture Studio', // 35 chars - Case 4: ZERO RATINGS (Empty State)
      email: 'support@urbannestfurniture.in',
      address: 'Plot 48, Road No 36, Jubilee Hills, Hyderabad, Telangana 500033',
      ownerEmail: 'owner.empty@example.com'
    },
    {
      name: 'Heritage Books & Literary Lounge', // 32 chars - Books
      email: 'curator@heritagebookstore.com',
      address: 'Shop 4, Deccan Gymkhana, FC Road, Pune, Maharashtra 411004',
      ownerEmail: 'owner.anuradha@heritagebooks.com'
    },
    {
      name: 'Apex Athletic Apparel & Gear', // 28 chars - Sports
      email: 'orders@apexathleticgear.com',
      address: '350 Olympic Plaza, Suite 12, Bandra West, Mumbai, Maharashtra 400050',
      ownerEmail: 'owner.harsh@apexathletic.com'
    },
    {
      name: 'PhoneCare Gadgets & Accessories', // 32 chars - Mobile accessories
      email: 'support@phonecaregadgets.in',
      address: '567 CMH Road, 2nd Stage, Indiranagar, Bengaluru, Karnataka 560038',
      ownerEmail: 'owner.deepak@phonecare.com'
    },
    {
      name: 'ComfortZone Home Appliances Depot', // 34 chars - Home appliances
      email: 'help@comfortzoneappliances.in',
      address: 'Block EP & GP, Sector 5, Salt Lake City, Kolkata, West Bengal 700091',
      ownerEmail: 'owner.sunil@comfortzone.com'
    },
    {
      name: 'RoyalElegance Ethnic Fashion Boutique', // 37 chars - Fashion
      email: 'boutique@royalelegancefashion.in',
      address: 'MGF Metropolitan Mall, Ground Floor, MI Road, Jaipur, Rajasthan 302001',
      ownerEmail: 'owner.demo@example.com'
    },
    {
      name: 'MetroMart Departmental Supercenter', // 34 chars - General retail
      email: 'service@metromartsupercenter.in',
      address: 'Vibhuti Khand, Gomti Nagar, Lucknow, Uttar Pradesh 226010',
      ownerEmail: null // Unassigned
    }
  ];

  const storeMap = {};
  for (const s of storeDefs) {
    const [existing] = await pool.execute('SELECT id, name, email, ownerId FROM stores WHERE email = ? LIMIT 1', [s.email]);
    const ownerId = s.ownerEmail && ownerMap[s.ownerEmail] ? ownerMap[s.ownerEmail].id : null;
    let store;

    if (existing.length === 0) {
      const id = randomUUID();
      await pool.execute(
        `INSERT INTO stores (id, name, email, address, ownerId, createdAt, updatedAt)
         VALUES (?, ?, ?, ?, ?, NOW(3), NOW(3))`,
        [id, s.name, s.email, s.address, ownerId]
      );
      store = { id, name: s.name, email: s.email, ownerId };
      stats.storesCreated++;
    } else {
      store = existing[0];
      if (ownerId && store.ownerId !== ownerId) {
        await pool.execute('UPDATE stores SET ownerId = ?, updatedAt = NOW(3) WHERE id = ?', [ownerId, store.id]);
        store.ownerId = ownerId;
      }
      stats.existingSkipped++;
    }
    storeMap[s.email] = store;
  }

  // --------------------------------------------------------------------------
  // 4. NORMAL USERS (32 Normal Users)
  // --------------------------------------------------------------------------
  const userDefs = [
    {
      name: 'Primary Demo Customer User', // 26 chars - PRIMARY DEMO ACCOUNT
      email: 'user.demo@example.com',
      password: userPassword,
      address: 'Flat 402, Royal Palms Residency, MP Nagar, Bhopal, MP 462011',
      role: 'USER'
    },
    {
      name: 'Alexandra Turner Montgomery', // 27 chars
      email: 'alexandra.turner@example.com',
      password: userPassword,
      address: '124 Elm Street, Apt 3B, Boston, MA 02108',
      role: 'USER'
    },
    {
      name: 'Christopher Benjamin Hayes', // 26 chars
      email: 'christopher.hayes@example.com',
      password: userPassword,
      address: '884 Pinehurst Avenue, Austin, TX 78701',
      role: 'USER'
    },
    {
      name: 'Genevieve Katherine Campbell', // 28 chars
      email: 'genevieve.campbell@example.com',
      password: userPassword,
      address: '512 Oakwood Boulevard, Seattle, WA 98101',
      role: 'USER'
    },
    {
      name: 'Zachary Nathaniel Kensington', // 28 chars
      email: 'zachary.kensington@example.com',
      password: userPassword,
      address: '920 Sunset Terrace, Denver, CO 80202',
      role: 'USER'
    },
    {
      name: 'Priya Darshini Venkatesh', // 24 chars
      email: 'priya.venkatesh@example.com',
      password: userPassword,
      address: '32 Alagesan Road, Saibaba Colony, Coimbatore, Tamil Nadu 641011',
      role: 'USER'
    },
    {
      name: 'Aditya Narayan Deshmukh', // 23 chars
      email: 'aditya.deshmukh@example.com',
      password: userPassword,
      address: 'B-12 Woodland Heights, Kothrud, Pune, Maharashtra 411038',
      role: 'USER'
    },
    {
      name: 'Sneha Parameshwaran Nair', // 24 chars
      email: 'sneha.nair@example.com',
      password: userPassword,
      address: 'Flat 5B, Skyline Towers, Panampilly Nagar, Kochi, Kerala 682036',
      role: 'USER'
    },
    {
      name: 'Manish Chandrashekhar Rao', // 25 chars
      email: 'manish.rao@example.com',
      password: userPassword,
      address: 'House 89, Banjara Hills Road No 12, Hyderabad, Telangana 500034',
      role: 'USER'
    },
    {
      name: 'Kavita Rajendran Nambiar', // 24 chars
      email: 'kavita.nambiar@example.com',
      password: userPassword,
      address: 'Block D, Green Glen Layout, Bellandur, Bengaluru, Karnataka 560103',
      role: 'USER'
    },
    {
      name: 'Vikramaditya Hemant Joshi', // 25 chars
      email: 'vikram.joshi@example.com',
      password: userPassword,
      address: '15 Civil Lines, Near Raj Bhavan, Bhopal, Madhya Pradesh 462002',
      role: 'USER'
    },
    {
      name: 'Shweta Raghunath Kulkarni', // 25 chars
      email: 'shweta.kulkarni@example.com',
      password: userPassword,
      address: '77 Prabhat Road, Lane 11, Deccan Gymkhana, Pune, Maharashtra 411004',
      role: 'USER'
    },
    {
      name: 'Abhishek Ramanathan Iyer', // 24 chars
      email: 'abhishek.iyer@example.com',
      password: userPassword,
      address: 'Plot 42, 4th Cross, Gandhi Nagar, Adyar, Chennai, Tamil Nadu 600020',
      role: 'USER'
    },
    {
      name: 'Neha Suryakant Chaurasia', // 24 chars
      email: 'neha.chaurasia@example.com',
      password: userPassword,
      address: 'Sector B, Aliganj Housing Scheme, Lucknow, Uttar Pradesh 226024',
      role: 'USER'
    },
    {
      name: 'Gaurav Birendra Shekhawat', // 26 chars
      email: 'gaurav.shekhawat@example.com',
      password: userPassword,
      address: 'C-28 Malviya Nagar, Near Calgiri Hospital, Jaipur, Rajasthan 302017',
      role: 'USER'
    },
    {
      name: 'Divya Priyadarshini Menon', // 25 chars
      email: 'divya.menon@example.com',
      password: userPassword,
      address: '18 Jawahar Nagar, Kadavanthra, Ernakulam, Kerala 682020',
      role: 'USER'
    },
    {
      name: 'Rahul Ravindranath Tiwari', // 25 chars
      email: 'rahul.tiwari@example.com',
      password: userPassword,
      address: '42 Tagore Town, Near Colonelganj, Prayagraj, Uttar Pradesh 211002',
      role: 'USER'
    },
    {
      name: 'Anjali Shashikant Kulkarni', // 26 chars
      email: 'anjali.kulkarni@example.com',
      password: userPassword,
      address: 'Flat 304, Swapnapurti Enclave, Aundh, Pune, Maharashtra 411007',
      role: 'USER'
    },
    {
      name: 'Suresh Satyanarayan Gupta', // 25 chars
      email: 'suresh.gupta@example.com',
      password: userPassword,
      address: '88 Saket Nagar, Near AIIMS Campus, Bhopal, Madhya Pradesh 462020',
      role: 'USER'
    },
    {
      name: 'Pooja Chandrakant Mahajan', // 25 chars
      email: 'pooja.mahajan@example.com',
      password: userPassword,
      address: 'Plot 18, Sindhi Society, Chembur East, Mumbai, Maharashtra 400071',
      role: 'USER'
    },
    {
      name: 'Kunal Harishchandra Jadhav', // 27 chars
      email: 'kunal.jadhav@example.com',
      password: userPassword,
      address: '56 Ramdas Peth, Central Avenue Road, Nagpur, Maharashtra 440010',
      role: 'USER'
    },
    {
      name: 'Ritika Devenbhai Vaghela', // 24 chars
      email: 'ritika.vaghela@example.com',
      password: userPassword,
      address: '102 Shivalik Western, University Road, Ahmedabad, Gujarat 380009',
      role: 'USER'
    },
    {
      name: 'Siddharth Vijayaraghavan', // 24 chars
      email: 'siddharth.v@example.com',
      password: userPassword,
      address: 'Flat 12A, Brigade Gateway, Malleshwaram, Bengaluru, Karnataka 560055',
      role: 'USER'
    },
    {
      name: 'Meera Ramakrishnan Pillai', // 25 chars
      email: 'meera.pillai@example.com',
      password: userPassword,
      address: '22 Poes Garden, Cathedral Road, Chennai, Tamil Nadu 600086',
      role: 'USER'
    },
    {
      name: 'Naveen Gangadharan Namboodiri', // 29 chars
      email: 'naveen.namboodiri@example.com',
      password: userPassword,
      address: 'House 4, Sasthamangalam Junction, Thiruvananthapuram, Kerala 695010',
      role: 'USER'
    },
    {
      name: 'Tanvi Shailendra Bandekar', // 25 chars
      email: 'tanvi.bandekar@example.com',
      password: userPassword,
      address: 'B-701 Lake Homes, Powai Vihar Complex, Mumbai, Maharashtra 400076',
      role: 'USER'
    },
    {
      name: 'Rohan Dattatraya Kulkarni', // 25 chars
      email: 'rohan.kulkarni@example.com',
      password: userPassword,
      address: '34 Tilak Road, Near SP College, Sadashiv Peth, Pune, Maharashtra 411030',
      role: 'USER'
    },
    {
      name: 'Pallavi Sachidanand Hegde', // 25 chars
      email: 'pallavi.hegde@example.com',
      password: userPassword,
      address: '14 Temple Trees Apartment, Sadashivanagar, Bengaluru, Karnataka 560080',
      role: 'USER'
    },
    {
      name: 'Arjun Chandrasekhar Varma', // 25 chars
      email: 'arjun.varma@example.com',
      password: userPassword,
      address: 'Villa 19, Whisper Valley, Jubilee Hills, Hyderabad, Telangana 500033',
      role: 'USER'
    },
    {
      name: 'Swati Ramchandra Bharadwaj', // 26 chars
      email: 'swati.bharadwaj@example.com',
      password: userPassword,
      address: 'Flat 202, Surya Enclave, Shahpura Sector C, Bhopal, MP 462039',
      role: 'USER'
    },
    {
      name: 'Karthik Soundararajan Mani', // 26 chars
      email: 'karthik.mani@example.com',
      password: userPassword,
      address: '77 Luz Church Road, Mylapore, Chennai, Tamil Nadu 600004',
      role: 'USER'
    },
    {
      name: 'Aishwarya Ravindra Bhat', // 23 chars
      email: 'aishwarya.bhat@example.com',
      password: userPassword,
      address: 'Flat 603, Manipal Heights, Light House Hill, Mangaluru, Karnataka 575001',
      role: 'USER'
    }
  ];

  const userMap = {};
  for (const u of userDefs) {
    const [existing] = await pool.execute('SELECT id, name, email FROM users WHERE email = ? LIMIT 1', [u.email]);
    let user;
    if (existing.length === 0) {
      const id = randomUUID();
      await pool.execute(
        `INSERT INTO users (id, name, email, password, address, role, createdAt, updatedAt)
         VALUES (?, ?, ?, ?, ?, ?, NOW(3), NOW(3))`,
        [id, u.name, u.email, u.password, u.address, u.role]
      );
      user = { id, name: u.name, email: u.email };
      stats.usersCreated++;
    } else {
      user = existing[0];
      stats.existingSkipped++;
    }
    userMap[u.email] = user;
  }

  // --------------------------------------------------------------------------
  // 5. RATINGS (Realistic & Varied Distribution, >80 unique ratings)
  // --------------------------------------------------------------------------
  const allUsersList = Object.values(userMap);
  const uDemo = userMap['user.demo@example.com'];

  // Helper function to safely upsert rating via mysql2
  const safeUpsertRating = async (userObj, storeObj, val) => {
    if (!userObj || !storeObj) return;
    try {
      const [existing] = await pool.execute(
        'SELECT id FROM ratings WHERE userId = ? AND storeId = ? LIMIT 1',
        [userObj.id, storeObj.id]
      );

      if (existing.length === 0) {
        const id = randomUUID();
        await pool.execute(
          `INSERT INTO ratings (id, userId, storeId, rating, createdAt, updatedAt)
           VALUES (?, ?, ?, ?, NOW(3), NOW(3))`,
          [id, userObj.id, storeObj.id, val]
        );
        stats.ratingsCreated++;
      } else {
        stats.existingSkipped++;
      }
    } catch (e) {
      // Ignore concurrent collision
    }
  };

  // STORE 1: FreshHarvest Organic Supermart (High count, highly rated ~4.7)
  const s1 = storeMap['contact@freshharvestsupermart.com'];
  const s1Ratings = [5, 5, 4, 5, 4, 5, 5, 4, 5, 4, 5, 5, 4, 5, 4, 5, 5, 5];
  for (let i = 0; i < s1Ratings.length && i < allUsersList.length; i++) {
    await safeUpsertRating(allUsersList[i], s1, s1Ratings[i]);
  }

  // STORE 2: Silicon Valley Tech Superstore (Solid ~4.1)
  const s2 = storeMap['support@techhubdevices.com'];
  const s2Ratings = [4, 4, 3, 5, 4, 3, 4, 5, 4];
  for (let i = 0; i < s2Ratings.length; i++) {
    const user = allUsersList[(i + 3) % allUsersList.length];
    await safeUpsertRating(user, s2, s2Ratings[i]);
  }

  // STORE 3: TechNova Digital Electronics Hub (Case 2: Medium ~3.5)
  const s3 = storeMap['care@technovadigital.in'];
  const s3Ratings = [3, 4, 3, 4, 4, 3, 4, 3];
  for (let i = 0; i < s3Ratings.length; i++) {
    const user = allUsersList[(i + 7) % allUsersList.length];
    await safeUpsertRating(user, s3, s3Ratings[i]);
  }

  // STORE 4: QuickBite Daily Essentials Mart (Case 3: Poorly Rated ~1.9)
  const s4 = storeMap['service@quickbitemart.in'];
  const s4Ratings = [1, 2, 2, 3, 2, 1, 2, 2];
  for (let i = 0; i < s4Ratings.length; i++) {
    const user = allUsersList[(i + 12) % allUsersList.length];
    await safeUpsertRating(user, s4, s4Ratings[i]);
  }

  // STORE 5: Artisan Bakery & Coffee Roasters (Case 1: Highly Rated ~4.8)
  const s5 = storeMap['hello@artisanbakerycoffee.com'];
  const s5Ratings = [5, 5, 5, 4, 5, 5, 5, 4, 5, 5];
  for (let i = 0; i < s5Ratings.length; i++) {
    const user = allUsersList[(i + 15) % allUsersList.length];
    await safeUpsertRating(user, s5, s5Ratings[i]);
  }

  // STORE 6: UrbanNest Living & Furniture Studio (Case 4: ZERO RATINGS)
  // Intentionally NO ratings added! Owner: owner.empty@example.com

  // STORE 7: Heritage Books & Literary Lounge (~4.3)
  const s7 = storeMap['curator@heritagebookstore.com'];
  const s7Ratings = [4, 4, 5, 4, 5, 4];
  for (let i = 0; i < s7Ratings.length; i++) {
    const user = allUsersList[(i + 20) % allUsersList.length];
    await safeUpsertRating(user, s7, s7Ratings[i]);
  }

  // STORE 8: Apex Athletic Apparel & Gear (~4.25)
  const s8 = storeMap['orders@apexathleticgear.com'];
  const s8Ratings = [4, 5, 4, 4, 5, 3, 4, 5];
  for (let i = 0; i < s8Ratings.length; i++) {
    const user = allUsersList[(i + 2) % allUsersList.length];
    await safeUpsertRating(user, s8, s8Ratings[i]);
  }

  // STORE 9: PhoneCare Gadgets & Accessories (~3.8)
  const s9 = storeMap['support@phonecaregadgets.in'];
  const s9Ratings = [4, 3, 4, 3, 5, 4];
  for (let i = 0; i < s9Ratings.length; i++) {
    const user = allUsersList[(i + 6) % allUsersList.length];
    await safeUpsertRating(user, s9, s9Ratings[i]);
  }

  // STORE 10: ComfortZone Home Appliances Depot (~3.8)
  const s10 = storeMap['help@comfortzoneappliances.in'];
  const s10Ratings = [4, 4, 3, 4, 4];
  for (let i = 0; i < s10Ratings.length; i++) {
    const user = allUsersList[(i + 10) % allUsersList.length];
    await safeUpsertRating(user, s10, s10Ratings[i]);
  }

  // STORE 11: RoyalElegance Ethnic Fashion Boutique (~4.7)
  const s11 = storeMap['boutique@royalelegancefashion.in'];
  const s11Ratings = [5, 5, 4, 5, 4, 5, 5];
  for (let i = 0; i < s11Ratings.length; i++) {
    const user = allUsersList[(i + 14) % allUsersList.length];
    await safeUpsertRating(user, s11, s11Ratings[i]);
  }

  // STORE 12: MetroMart Departmental Supercenter (~3.3)
  const s12 = storeMap['service@metromartsupercenter.in'];
  const s12Ratings = [3, 4, 3, 4, 2, 3, 4];
  for (let i = 0; i < s12Ratings.length; i++) {
    const user = allUsersList[(i + 18) % allUsersList.length];
    await safeUpsertRating(user, s12, s12Ratings[i]);
  }

  // Ensure Primary Demo User has an explicit balanced mix:
  if (uDemo) {
    if (s1) await safeUpsertRating(uDemo, s1, 5); // Rated 5
    if (s3) await safeUpsertRating(uDemo, s3, 4); // Rated 4
    if (s4) await safeUpsertRating(uDemo, s4, 2); // Rated 2
    if (s8) await safeUpsertRating(uDemo, s8, 5); // Rated 5
  }

  console.log('\n=====================================================');
  console.log('✅ SEED COMPLETED SUCCESSFULLY (mysql2)');
  console.log('=====================================================');
  console.log(`Admins created:         ${stats.adminsCreated}`);
  console.log(`Store owners created:   ${stats.ownersCreated}`);
  console.log(`Normal users created:   ${stats.usersCreated}`);
  console.log(`Stores created:         ${stats.storesCreated}`);
  console.log(`Ratings created:        ${stats.ratingsCreated}`);
  console.log(`Existing records kept:  ${stats.existingSkipped}`);
  console.log('=====================================================\n');
}

seed()
  .catch((e) => {
    console.error('Seeding error:', e);
    process.exit(1);
  })
  .finally(async () => {
    await disconnectDatabase();
  });
