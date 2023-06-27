import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common'
import { CreateStreamerDto } from './dto/create-streamer.dto'
import { UpdateStreamerDto } from './dto/update-streamer.dto'
import { PrismaService } from 'src/prisma/prisma.service'
import { User } from 'src/users/users.service'

@Injectable()
export class StreamersService {
  constructor(private prisma: PrismaService) {}

  async create(createStreamerDto: CreateStreamerDto) {
    const streamer = await this.prisma.streamer.findUnique({
      where: { nickname: createStreamerDto.nickname },
    })

    if (!streamer) {
      return this.prisma.streamer.create({ data: createStreamerDto })
    } else {
      throw new ConflictException('Streamer already exists')
    }
  }

  async findAll() {
    const streamers = await this.prisma.streamer.findMany({
      select: {
        id: true,
        name: true,
        nickname: true,
        votes: true,
        platform: {
          select: {
            name: true,
          },
        },
      },
    })

    const streamersWithVotes = streamers.map((streamer) => {
      const upvotes = streamer.votes.filter((vote) => vote.vote).length
      const downvotes = streamer.votes.filter((vote) => !vote.vote).length

      const { votes, ...streamerWithoutVotes } = streamer

      return {
        ...streamerWithoutVotes,
        upvotes,
        downvotes,
      }
    })

    return streamersWithVotes
  }

  async findOne(id: number) {
    const streamer = await this.prisma.streamer.findUnique({
      where: { id },
    })

    if (!streamer) {
      throw new NotFoundException('Streamer not found')
    }

    return streamer
  }

  async update(streamerId: number, { vote }: UpdateStreamerDto, userId: User['userId']) {
    try {
      return await this.prisma.vote.upsert({
        where: { streamerId_userId: { streamerId, userId } },
        update: { vote },
        create: { vote, streamerId: streamerId, userId },
        select: {
          streamer: {
            select: {
              name: true,
              nickname: true,
            },
          },
          vote: true,
        },
      })
    } catch (error) {
      throw new BadRequestException()
    }
  }
}
