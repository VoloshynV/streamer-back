import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common'
import { Public } from 'src/auth/auth.decorator'
import { CurrentUser } from 'src/users/user.decorator'
import { CreateStreamerDto } from './dto/create-streamer.dto'
import { UpdateStreamerDto } from './dto/update-streamer.dto'
import { StreamersService } from './streamers.service'
import { User } from '@prisma/client'

@Controller('streamers')
export class StreamersController {
  constructor(private readonly streamersService: StreamersService) {}

  @Post()
  @Public()
  @UsePipes(new ValidationPipe())
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
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.streamersService.findOne(id)
  }

  @Put(':id/vote')
  @UsePipes(new ValidationPipe())
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateStreamerDto: UpdateStreamerDto,
    @CurrentUser() user: User
  ) {
    return this.streamersService.update(id, updateStreamerDto, user.userId)
  }
}
