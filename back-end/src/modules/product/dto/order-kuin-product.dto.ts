import {ApiProperty} from "@nestjs/swagger";

export class OrderKuinProductDto {
    @ApiProperty()
    id: number;
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
