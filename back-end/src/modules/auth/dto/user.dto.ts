import { ApiProperty } from '@nestjs/swagger';
import { Role } from '@prisma/client';

export class UserDto {
  @ApiProperty()
  uuid: string;

  @ApiProperty()
  email: string;

  @ApiProperty()
  username: string;

  @ApiProperty()
  admin: boolean;

  @ApiProperty({
    enum: Role,
  })
  role: Role;
}
