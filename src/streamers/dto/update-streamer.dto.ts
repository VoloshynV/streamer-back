import { IsBoolean } from 'class-validator'

export class UpdateStreamerDto {
  @IsBoolean()
  vote: boolean
}
