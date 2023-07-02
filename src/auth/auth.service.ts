import { Injectable } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { compare } from 'bcrypt'
import { User, UsersService } from '../users/users.service'

@Injectable()
export class AuthService {
  constructor(private usersService: UsersService, private jwtService: JwtService) {}

  async validateUser(username: string, pass: string): Promise<any> {
    const user = await this.usersService.findOne(username)

    if (!user) {
      return null
    }

    const match = await compare(pass, user.password)

    if (match) {
      const { password, ...result } = user
      return result
    }
    return null
  }

  async login(user: User) {
    const payload = { username: user.username, sub: user.userId }
    return {
      id: user.userId,
      name: user.username,
      access_token: this.jwtService.sign(payload),
    }
  }
}
