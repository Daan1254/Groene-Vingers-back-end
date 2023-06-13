import {ApiProperty} from "@nestjs/swagger";

export class KuinProductDto {
    @ApiProperty()
    id: string

    @ApiProperty()
    name: string

    @ApiProperty()
    price: string

    @ApiProperty()
    soldOut: boolean

    @ApiProperty()
    active: boolean
}
