import bcrypt from 'bcryptjs';
import prisma from '../src/config/prisma.js';

async function seed() {
  console.log('--- Starting Database Seeding ---');

  // Clean existing data
  await prisma.rating.deleteMany();
  await prisma.store.deleteMany();
  await prisma.user.deleteMany();

  const salt = await bcrypt.genSalt(10);
  const adminPassword = await bcrypt.hash('Admin@123', salt);
  const ownerPassword = await bcrypt.hash('Owner@123', salt);
  const userPassword = await bcrypt.hash('User@123', salt);

  // 1. Create Administrator
  const admin = await prisma.user.create({
    data: {
      name: 'System Administrator Roxiler', // 28 chars (valid: 20-60)
      email: 'admin@roxiler.com',
      password: adminPassword,
      address: '742 Evergreen Terrace, Springfield Sector 4, Enterprise City',
      role: 'ADMIN'
    }
  });
  console.log('Created Admin:', admin.email);

  // 2. Create Store Owners
  const owner1 = await prisma.user.create({
    data: {
      name: 'Jonathan Edward Masterson', // 25 chars
      email: 'owner.john@freshmart.com',
      password: ownerPassword,
      address: '100 Market Boulevard, Suite 400, New York, NY 10001',
      role: 'STORE_OWNER'
    }
  });

  const owner2 = await prisma.user.create({
    data: {
      name: 'Victoria Elizabeth Sterling', // 27 chars
      email: 'owner.victoria@techhub.com',
      password: ownerPassword,
      address: '450 Technology Parkway, Innovation District, San Jose, CA 95110',
      role: 'STORE_OWNER'
    }
  });
  console.log('Created Store Owners:', owner1.email, owner2.email);

  // 3. Create Normal Users
  const user1 = await prisma.user.create({
    data: {
      name: 'Alexandra Turner Montgomery', // 27 chars
      email: 'alexandra.turner@example.com',
      password: userPassword,
      address: '124 Elm Street, Apt 3B, Boston, MA 02108',
      role: 'USER'
    }
  });

  const user2 = await prisma.user.create({
    data: {
      name: 'Christopher Benjamin Hayes', // 26 chars
      email: 'christopher.hayes@example.com',
      password: userPassword,
      address: '884 Pinehurst Avenue, Austin, TX 78701',
      role: 'USER'
    }
  });

  const user3 = await prisma.user.create({
    data: {
      name: 'Genevieve Katherine Campbell', // 28 chars
      email: 'genevieve.campbell@example.com',
      password: userPassword,
      address: '512 Oakwood Boulevard, Seattle, WA 98101',
      role: 'USER'
    }
  });

  const user4 = await prisma.user.create({
    data: {
      name: 'Zachary Nathaniel Kensington', // 28 chars
      email: 'zachary.kensington@example.com',
      password: userPassword,
      address: '920 Sunset Terrace, Denver, CO 80202',
      role: 'USER'
    }
  });
  console.log('Created Normal Users:', user1.email, user2.email, user3.email, user4.email);

  // 4. Create Stores
  const store1 = await prisma.store.create({
    data: {
      name: 'Fresh Organic Market & Deli', // 27 chars
      email: 'contact@freshmartorganic.com',
      address: '100 Market Boulevard, Suite 400, New York, NY 10001',
      ownerId: owner1.id
    }
  });

  const store2 = await prisma.store.create({
    data: {
      name: 'Silicon Valley Tech Superstore', // 30 chars
      email: 'support@techhubdevices.com',
      address: '450 Technology Parkway, Innovation District, San Jose, CA 95110',
      ownerId: owner2.id
    }
  });

  const store3 = await prisma.store.create({
    data: {
      name: 'Artisan Bakery & Coffee Roasters', // 32 chars
      email: 'hello@artisanbakerycoffee.com',
      address: '240 Maple Leaf Avenue, Portland, OR 97201',
      ownerId: null
    }
  });

  const store4 = await prisma.store.create({
    data: {
      name: 'Heritage Books & Literary Lounge', // 32 chars
      email: 'curator@heritagebookstore.com',
      address: '77 Heritage Row, Philadelphia, PA 19106',
      ownerId: null
    }
  });

  const store5 = await prisma.store.create({
    data: {
      name: 'Apex Athletic Apparel & Gear', // 28 chars
      email: 'orders@apexathleticgear.com',
      address: '350 Olympic Plaza, Suite 12, Chicago, IL 60601',
      ownerId: null
    }
  });
  console.log('Created 5 Stores');

  // 5. Create Ratings
  // Ratings for Fresh Organic Market (store1)
  await prisma.rating.createMany({
    data: [
      { userId: user1.id, storeId: store1.id, rating: 5 },
      { userId: user2.id, storeId: store1.id, rating: 4 },
      { userId: user3.id, storeId: store1.id, rating: 5 },
      { userId: user4.id, storeId: store1.id, rating: 4 }
    ]
  });

  // Ratings for Silicon Valley Tech (store2)
  await prisma.rating.createMany({
    data: [
      { userId: user1.id, storeId: store2.id, rating: 4 },
      { userId: user2.id, storeId: store2.id, rating: 3 },
      { userId: user3.id, storeId: store2.id, rating: 5 }
    ]
  });

  // Ratings for Artisan Bakery (store3)
  await prisma.rating.createMany({
    data: [
      { userId: user2.id, storeId: store3.id, rating: 5 },
      { userId: user4.id, storeId: store3.id, rating: 5 }
    ]
  });

  // Ratings for Heritage Books (store4)
  await prisma.rating.createMany({
    data: [
      { userId: user1.id, storeId: store4.id, rating: 4 },
      { userId: user3.id, storeId: store4.id, rating: 4 }
    ]
  });

  console.log('Seeded Ratings successfully.');
  console.log('--- Database Seeding Complete ---');
}

seed()
  .catch((e) => {
    console.error('Seeding error:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
