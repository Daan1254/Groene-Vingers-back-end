import {ApiProperty} from "@nestjs/swagger";

export class KuinOrderDto {
    @ApiProperty()
    order_id: number;
    @ApiProperty()
    product_id: number;
    @ApiProperty()
    quantity: number;
    @ApiProperty()
    updated_at: Date;
    @ApiProperty()
    created_at: Date;
    @ApiProperty()
    id: number;
}
