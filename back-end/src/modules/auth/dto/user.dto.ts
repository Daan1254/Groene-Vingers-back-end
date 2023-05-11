import { ApiProperty } from '@nestjs/swagger';

export class UserDto {
  @ApiProperty()
  uuid: string;

  @ApiProperty()
  email: string;

  @ApiProperty()
  username: string;
}
