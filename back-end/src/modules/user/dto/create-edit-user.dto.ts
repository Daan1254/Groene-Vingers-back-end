import { ApiProperty } from '@nestjs/swagger';
import { Role } from '@prisma/client';

export class CreateEditUserDto {
  @ApiProperty({
    nullable: true,
  })
  uuid?: string;

  @ApiProperty()
  email: string;

  @ApiProperty()
  username: string;

  @ApiProperty()
  password: string;

  @ApiProperty()
  indisposed: boolean;

  @ApiProperty()
  admin: boolean;

  @ApiProperty({
    enum: Role,
  })
  role: Role;
}
