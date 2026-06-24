const { PrismaClient } = require('./src/generated/prisma/index.js');
const bcrypt = require('bcryptjs');

const prisma = new PrismaClient();

async function main() {
  try {
    const hashedPassword = await bcrypt.hash('admin123', 10);
    const user = await prisma.user.create({
      data: {
        email: 'admin@magang.com',
        password: hashedPassword,
        name: 'Admin Magang'
      }
    });
    console.log('Seed completed', user);
  } catch (e) {
    if (e.code === 'P2002') console.log('Admin already exists');
    else console.error(e);
  }
}

main().then(() => process.exit(0)).catch(() => process.exit(1));
