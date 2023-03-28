import { ApiProperty } from "@nestjs/swagger";
export enum AbsenceType {
    SICK = 'SICK',
    VACATION = 'VACATION',
    OTHER = 'OTHER'
}
export class CreateAbsenceDto {
    @ApiProperty({
        type: String,
        nullable: false
    })
    date: string

    @ApiProperty({
        type: String,
        enum: AbsenceType,
        nullable: false
    })
    type: AbsenceType
}
