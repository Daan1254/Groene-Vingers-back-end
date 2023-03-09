import {ApiProperty} from "@nestjs/swagger";

export class ProductDto {
    @ApiProperty()
    uuid: string

    @ApiProperty()
    name: string

    @ApiProperty()
    price: string

    @ApiProperty()
    soldOut: boolean

    @ApiProperty()
    active: boolean
}
