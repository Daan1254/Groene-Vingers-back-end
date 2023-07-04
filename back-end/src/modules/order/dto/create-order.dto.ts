import { ApiProperty } from '@nestjs/swagger';

export class CreateOrderDto {
  @ApiProperty({
    nullable: true,
  })
  uuid?: string;
  @ApiProperty({
    nullable: true,
  })
  productUuid?: string;

  @ApiProperty({
    nullable: true,
  })
  kuinId?: number;

  @ApiProperty({
    nullable: true,
  })
  orderId?: number;

  @ApiProperty({
    nullable: false,
  })
  pricePerUnit: number;

  @ApiProperty()
  quantity: number;
}
