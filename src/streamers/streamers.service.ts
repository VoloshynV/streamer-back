import { Injectable } from '@nestjs/common'
import { CreateStreamerDto } from './dto/create-streamer.dto'
import { UpdateStreamerDto } from './dto/update-streamer.dto'
import { PrismaService } from 'src/prisma.service'

@Injectable()
export class StreamersService {
  constructor(private prisma: PrismaService) {}

  create(createStreamerDto: CreateStreamerDto) {
    return 'This action adds a new streamer'
  }

  findAll() {
    return `This action returns all streamers`
  }

  findOne(id: number) {
    return `This action returns a #${id} streamer`
  }

  update(id: number, updateStreamerDto: UpdateStreamerDto) {
    return `This action updates a #${id} streamer`
  }
}
