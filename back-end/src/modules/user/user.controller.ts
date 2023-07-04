import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseUUIDPipe,
  Post,
  Put,
  Req,
  UseGuards,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateEditUserDto } from './dto/create-edit-user.dto';
import { ApiBody, ApiHeaders, ApiParam, ApiTags } from '@nestjs/swagger';
import { AuthGuard, RequestWithAuth } from '../auth/auth.guard';

@ApiTags('User')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  @UseGuards(AuthGuard)
  @ApiHeaders([{ name: 'auth-token', description: 'Groene vingers API token' }])
  async getAllUsers(@Req() request: RequestWithAuth) {
    return this.userService.getAllUsers(request.user);
  }

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
  @UseGuards(AuthGuard)
  @ApiBody({ type: CreateEditUserDto })
  public async createUser(
    @Body() userDto: CreateEditUserDto,
    @Req() req: RequestWithAuth,
  ) {
    return this.userService.createUser(userDto, req.user);
  }

  @Put()
  @ApiHeaders([{ name: 'auth-token', description: 'Groene vingers API token' }])
  @UseGuards(AuthGuard)
  @ApiBody({ type: CreateEditUserDto })
  public async updateUser(
    @Body() body: CreateEditUserDto,
    @Req() request: RequestWithAuth,
  ) {
    return this.userService.updateUser(body, request.user);
  }

  @Delete(':uuid')
  @UseGuards(AuthGuard)
  @ApiHeaders([{ name: 'auth-token', description: 'Groene vingers API token' }])
  async deleteUser(
    @Req() request: RequestWithAuth,
    @Param('uuid') uuid: string,
  ) {
    return this.userService.deleteUser(uuid, request.user);
  }
}
