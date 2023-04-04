import { ApiProperty } from "@nestjs/swagger"
import { UserDto } from "src/modules/auth/dto/user.dto"

export class CashierDto {
    @ApiProperty({
        type: String,
        nullable: false
    })
    uuid: string 

    @ApiProperty({
        type: UserDto,
        nullable: false
    })
    user: UserDto
}