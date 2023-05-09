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

  @ApiProperty()
  kuinId: number;

  @ApiProperty()
  height_cm: number;

  @ApiProperty()
  width_cm: number;

  @ApiProperty()
  depth_cm: number;

  @ApiProperty()
  weight_gr: number;

  @ApiProperty({
    type: StockDto,
  })
  stock: StockDto;

  @ApiProperty()
  categoryUuid: string;

  @ApiProperty()
  barcode: string;
}
