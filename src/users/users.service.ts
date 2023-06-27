import { Injectable } from '@nestjs/common'
import { PrismaService } from 'src/prisma/prisma.service'

export type User = {
  userId: number
  username: string
  password: string
}

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  async findOne(username: string): Promise<User | undefined> {
    const user = await this.prisma.user.findUnique({
      where: { username },
    })

    return user || undefined
  }
}
