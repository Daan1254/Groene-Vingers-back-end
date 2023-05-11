import { ApiProperty } from '@nestjs/swagger';
import { ProductDto } from '../../product/dto/product.dto';

export enum OrderStatus {
  PROCESSING = 'processing',
  COMPLETED = 'completed',
}
export class OrderDto {
  @ApiProperty()
  uuid: string;

  @ApiProperty({
    enum: OrderStatus,
  })
  status: OrderStatus;

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
