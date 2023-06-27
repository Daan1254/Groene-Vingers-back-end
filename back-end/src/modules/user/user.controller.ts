import {
  Body,
  Controller,
  Get,
  Param,
  ParseUUIDPipe,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ApiBody, ApiHeaders, ApiParam, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '../auth/auth.guard';

@ApiTags('User')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get(':uuid')
  @ApiParam({ name: 'uuid', description: 'User UUID' })
  public async getUser(@Param('uuid', ParseUUIDPipe) uuid: string) {
    return this.userService.getUser(uuid);
  }

  @Get('roles/get')
  @UseGuards(AuthGuard)
  @ApiHeaders([{ name: 'auth-token', description: 'Groene vingers API token' }])
  public async getRoles() {
    return this.userService.getRoles();
  }

  @Post()
  @ApiHeaders([{ name: 'auth-token', description: 'Groene vingers API token' }])
  @ApiBody({ type: CreateUserDto })
  public async createUser(@Body() userDto: CreateUserDto) {
    return this.userService.createUser(userDto);
  }

  @Put(':uuid')
  @ApiHeaders([{ name: 'auth-token', description: 'Groene vingers API token' }])
  @ApiBody({ type: UpdateUserDto })
  public async updateUser(
    @Body() userDto: UpdateUserDto,
    @Param('uuid') uuid: string,
  ) {
    return this.userService.updateUser(userDto, uuid);
  }
}
