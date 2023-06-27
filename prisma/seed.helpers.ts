import { hash } from 'bcrypt'
import { prisma } from './seed'

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
