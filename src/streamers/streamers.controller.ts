import { Controller, Get, Post, Body, Param, Put } from '@nestjs/common'
import { StreamersService } from './streamers.service'
import { CreateStreamerDto } from './dto/create-streamer.dto'
import { UpdateStreamerDto } from './dto/update-streamer.dto'
import { CurrentUser } from 'src/users/user.decorator'
import { User } from 'src/users/users.service'
import { Public } from 'src/auth/auth.decorator'

@Controller('streamers')
export class StreamersController {
  constructor(private readonly streamersService: StreamersService) {}

  @Post()
  create(@Body() createStreamerDto: CreateStreamerDto) {
    return this.streamersService.create(createStreamerDto)
  }

  @Get()
  @Public()
  findAll() {
    return this.streamersService.findAll()
  }

  @Get(':id')
  @Public()
  findOne(@Param('id') id: string) {
    return this.streamersService.findOne(+id)
  }

  @Put(':id/vote')
  update(
    @Param('id') id: string,
    @Body() updateStreamerDto: UpdateStreamerDto,
    @CurrentUser() user: User
  ) {
    return this.streamersService.update(+id, updateStreamerDto, user.userId)
  }
}
