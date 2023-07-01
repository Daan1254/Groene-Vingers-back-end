import { ApiProperty } from '@nestjs/swagger';

export class CreateEditCategoryDto {
  @ApiProperty({
    nullable: true,
  })
  uuid: string | null;

  @ApiProperty()
  name: string;

  @ApiProperty()
  description: string;

  @ApiProperty()
  thumbnailUrl: string;

  @ApiProperty()
  products: string[];
}
