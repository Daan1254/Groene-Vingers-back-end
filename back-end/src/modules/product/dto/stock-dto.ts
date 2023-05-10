import { ApiProperty } from '@nestjs/swagger';

export class StockDto {
  @ApiProperty()
  uuid: string;

  @ApiProperty()
  quantity: number;

  @ApiProperty()
  productUuid: string;
}
