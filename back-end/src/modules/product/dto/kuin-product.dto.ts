import {ApiProperty} from "@nestjs/swagger";

export class KuinProductDto {
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
