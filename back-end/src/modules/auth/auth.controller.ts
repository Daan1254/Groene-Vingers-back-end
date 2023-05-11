import {
  Body,
  Controller,
  Get,
  Post,
  Req,
  UnauthorizedException,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { AuthGuard, RequestWithAuth } from './auth.guard';
import { ApiHeaders, ApiTags } from '@nestjs/swagger';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  public async login(@Body() loginDto: LoginDto) {
    return this.authService.login(loginDto);
  }

  @Post('register')
  public async register(@Body() loginDto: LoginDto) {
    return this.authService.register(loginDto);
  }

  @Get('validate')
  @UseGuards(AuthGuard)
  @ApiHeaders([{ name: 'auth-token', description: 'Groene vingers API token' }])
  public async validateToken(@Req() req: RequestWithAuth) {
    if (!req.user) {
      throw new UnauthorizedException('User not found');
    }
    return req.user;
  }
}
