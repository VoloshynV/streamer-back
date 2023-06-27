import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

const fakeUser = (id: number) => ({
  username: `user${id}`,
  password: `user${id}`,
})

async function main() {
  const fakerRounds = 10
  console.log('Seeding...')

  /// --------- Users ---------------
  console.log('Seeding users...')
  for (let i = 1; i <= fakerRounds; i++) {
    await prisma.user.create({ data: fakeUser(i) })
  }

  /// --------- Platforms ---------------
  console.log('Seeding platforms...')

  const platforms = ['Twitch', 'YouTube', 'TikTok', 'Kick', 'Rumble']

  for (let i = 0; i < platforms.length; i++) {
    await prisma.platform.create({
      data: {
        name: platforms[i],
      },
    })
  }
}

main()
  .catch((e) => console.error(e))
  .finally(async () => {
    await prisma.$disconnect()
  })
