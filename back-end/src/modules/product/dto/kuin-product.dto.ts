import { ApiProperty } from '@nestjs/swagger';

export class KuinProductDto {
  @ApiProperty()
  uuid: string;

  @ApiProperty()
  name: string;

  @ApiProperty()
  price: string;

  @ApiProperty()
  description: string;

  @ApiProperty()
  image: string;

  @ApiProperty({
    nullable: true,
  })
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
  categoryUuid: string;

  @ApiProperty()
  barcode: string;
}
