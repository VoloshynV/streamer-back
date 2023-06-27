import { Controller, Post, UseGuards, Request } from '@nestjs/common'
import { AuthService } from './auth.service'
import { Public } from './auth.decorator'
import { LocalAuthGuard } from './local-auth.guard'

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Public()
  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Request() req) {
    return this.authService.login(req.user)
  }
}
