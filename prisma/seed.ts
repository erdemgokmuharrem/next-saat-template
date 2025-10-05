import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

async function main() {
  // Create admin user
  const hashedPassword = await bcrypt.hash('admin123', 12)
  
  const adminUser = await prisma.user.upsert({
    where: { email: 'admin@nextsaas.com' },
    update: {},
    create: {
      email: 'admin@nextsaas.com',
      name: 'Admin User',
      password: hashedPassword,
      subscription: 'pro',
    },
  })

  // Create sample user
  const sampleUser = await prisma.user.upsert({
    where: { email: 'user@nextsaas.com' },
    update: {},
    create: {
      email: 'user@nextsaas.com',
      name: 'Sample User',
      password: hashedPassword,
      subscription: 'free',
    },
  })

  // Create sample projects
  const projects = [
    {
      name: 'E-ticaret Platformu',
      description: 'Modern e-ticaret sitesi geliştirme projesi',
      status: 'active',
      userId: adminUser.id,
    },
    {
      name: 'Mobil Uygulama',
      description: 'React Native ile mobil uygulama geliştirme',
      status: 'active',
      userId: adminUser.id,
    },
    {
      name: 'API Geliştirme',
      description: 'RESTful API servisi oluşturma',
      status: 'completed',
      userId: adminUser.id,
    },
    {
      name: 'Web Sitesi Tasarımı',
      description: 'Kurumsal web sitesi tasarım projesi',
      status: 'active',
      userId: sampleUser.id,
    },
  ]

  for (const project of projects) {
    await prisma.project.upsert({
      where: { 
        id: `${project.name.toLowerCase().replace(/\s+/g, '-')}-${project.userId}`
      },
      update: {},
      create: {
        id: `${project.name.toLowerCase().replace(/\s+/g, '-')}-${project.userId}`,
        ...project,
      },
    })
  }

  console.log('Seed data created successfully!')
  console.log('Admin user: admin@nextsaas.com / admin123')
  console.log('Sample user: user@nextsaas.com / admin123')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
