import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { StreamersModule } from './streamers/streamers.module';
import configuration from 'config/configuration'

@Module({
  imports: [StreamersModule]
})
export class AppModule {}
