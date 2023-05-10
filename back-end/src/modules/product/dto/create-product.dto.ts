import { ApiProperty } from '@nestjs/swagger';
import { StockDto } from './stock-dto';

export class CreateProductDto {
  @ApiProperty()
  name: string;
  @ApiProperty()
  description: string;
  @ApiProperty()
  price: string;
  @ApiProperty()
  image: string;
  @ApiProperty()
  color: string;
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
  @ApiProperty()
  quantity: number;
  @ApiProperty()
  created_at: Date;
  @ApiProperty()
  updated_at: Date;
}
