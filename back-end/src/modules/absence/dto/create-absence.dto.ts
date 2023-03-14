import {ApiProperty} from "@nestjs/swagger";
export enum AbsenceType {
    SICK = 'SICK',
    VACATION = 'VACATION',
    OTHER = 'OTHER'
}
export class CreateAbsenceDto {
    @ApiProperty({
        type: Date,
        format: 'date',
        nullable: false
    })
    date: Date

    @ApiProperty({
        type: String,
        enum: AbsenceType,
        nullable: false
    })
    type: AbsenceType
}
