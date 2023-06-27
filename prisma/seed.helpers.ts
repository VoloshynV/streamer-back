import { PrismaClient } from '@prisma/client'
import { hash } from 'bcrypt'

const prisma = new PrismaClient()
const saltRounds = 10

export const createUser = async (id: number) => {
  const passHash = await hash(`user${id}`, saltRounds)

  await prisma.user.create({
    data: {
      username: `user${id}`,
      password: passHash,
    },
  })
}

export const createPlatform = async (name: string) => {
  await prisma.platform.create({
    data: {
      name,
    },
  })
}
