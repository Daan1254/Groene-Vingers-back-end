import {ApiProperty} from "@nestjs/swagger";

export class SessionTokenDto {
  @ApiProperty()
  accessToken: string;
}
