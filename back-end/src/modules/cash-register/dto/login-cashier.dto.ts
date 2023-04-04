import { ApiProperty } from '@nestjs/swagger';

export class LoginCashierDto {
  @ApiProperty({
    type: String,
    nullable: false,
  })
  pin: string;
}
