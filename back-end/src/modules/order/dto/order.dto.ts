import { ApiProperty } from '@nestjs/swagger';
import { ProductDto } from '../../product/dto/product.dto';
import { Status } from '@prisma/client';

export enum OrderStatus {
  PROCESSING = 'processing',
  COMPLETED = 'completed',
  CANCELED = 'canceled',
}

export class OrderDto {
  @ApiProperty()
  uuid: string;

  @ApiProperty({
    enum: Status,
  })
  status: Status;

  @ApiProperty({
    nullable: true,
  })
  product?: ProductDto;

  @ApiProperty({
    nullable: true,
  })
  kuinId?: number;

  @ApiProperty()
  quantity: number;

  @ApiProperty()
  createdAt: Date;
}
