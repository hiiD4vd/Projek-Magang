import { PrismaClient } from '../src/generated/prisma'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

async function main() {
  const hashedPassword = await bcrypt.hash('admin123', 10)
  
  const user = await prisma.user.upsert({
    where: { email: 'admin@magang.com' },
    update: {},
    create: {
      email: 'admin@magang.com',
      password: hashedPassword,
      name: 'Admin Magang'
    },
  })
  
  console.log('Seed completed: Admin user created!', user)
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })
