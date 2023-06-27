import { Module } from '@nestjs/common'
import { StreamersModule } from './streamers/streamers.module'
import { AuthModule } from './auth/auth.module'
import { UsersModule } from './users/users.module'

@Module({
  imports: [StreamersModule, AuthModule, UsersModule],
})
export class AppModule {}
