import { PrismaClient } from '@prisma/client'
import { createPlatform, createUser } from './seed.helpers'

const prisma = new PrismaClient()

async function main() {
  const fakerRounds = 10
  console.log('Seeding...')

  /// --------- Users ---------------
  console.log('Seeding users...')
  for (let i = 1; i <= fakerRounds; i++) {
    await createUser(i)
  }

  /// --------- Platforms ---------------
  console.log('Seeding platforms...')

  const platforms = ['Twitch', 'YouTube', 'TikTok', 'Kick', 'Rumble']

  for (let i = 0; i < platforms.length; i++) {
    await createPlatform(platforms[i])
  }
}

main()
  .catch((e) => console.error(e))
  .finally(async () => {
    await prisma.$disconnect()
  })
