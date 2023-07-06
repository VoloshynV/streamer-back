import { IsNotEmpty, IsString } from 'class-validator'

export class CreateStreamerDto {
  @IsString()
  @IsNotEmpty()
  name: string

  @IsString()
  @IsNotEmpty()
  nickname: string

  @IsString()
  @IsNotEmpty()
  description: string

  @IsString()
  @IsNotEmpty()
  platform: string

  @IsString()
  @IsNotEmpty()
  image: string
}
