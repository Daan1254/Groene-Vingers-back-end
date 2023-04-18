import { ApiProperty } from "@nestjs/swagger";

export class CreateAppointmentDto {
  @ApiProperty()
  date: string;
  @ApiProperty()
  title: string;
  @ApiProperty({
    nullable: true
  })
  description: string;
}
