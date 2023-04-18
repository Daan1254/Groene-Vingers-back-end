import {UserDto} from "../../auth/dto/user.dto";
import {ApiProperty} from "@nestjs/swagger";

export class AppointmentDto {
  @ApiProperty()
  uuid: string;
  @ApiProperty()
  date: Date;
  @ApiProperty()
  title: string;
  @ApiProperty()
  description: string;
  @ApiProperty()
  userUuid: string;
  @ApiProperty()
  user: UserDto;
}
