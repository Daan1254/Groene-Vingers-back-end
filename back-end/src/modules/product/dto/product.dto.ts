import { ApiProperty } from '@nestjs/swagger';
import { StockDto } from './stock-dto';

export class ProductDto {
  @ApiProperty()
  uuid: string;

  @ApiProperty()
  name: string;

  @ApiProperty()
  price: string;

  @ApiProperty()
  description: string;

  @ApiProperty()
  imageUrl: string;

  @ApiProperty({
    nullable: true,
  })
  kuinId?: number;

  @ApiProperty({
    type: StockDto,
  })
  stock: StockDto;
}
