import {
  Body,
  Controller,
  Get,
  Param,
  ParseUUIDPipe,
  Post,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { ApiBody, ApiHeaders, ApiParam, ApiTags } from '@nestjs/swagger';

@ApiTags('User')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get(':uuid')
  @ApiParam({ name: 'uuid', description: 'User UUID' })
  public async getUser(@Param('uuid', ParseUUIDPipe) uuid: string) {
    return this.userService.getUser(uuid);
  }

  @Post()
  @ApiHeaders([{ name: 'auth-token', description: 'Groene vingers API token' }])
  @ApiBody({ type: CreateUserDto })
  public async createUser(@Body() userDto: CreateUserDto) {
    return this.userService.createUser(userDto);
  }
}
