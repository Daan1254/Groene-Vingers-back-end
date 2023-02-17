import {Body, Controller, Get, Headers, Post} from "@nestjs/common";
import {AuthService} from "./auth.service";
import {LoginDto} from "./dto/login.dto";

@Controller('auth')
export class AuthController {

    constructor(private readonly authService: AuthService) {
    }

    @Post('login')
    public async login(@Body() loginDto: LoginDto) {
        return this.authService.login(loginDto)
    }

    @Post('register')
    public async register(@Body() loginDto: LoginDto) {
        return this.authService.register(loginDto)
    }


    @Get('validate')
    public async validateToken(@Headers('auth-token') token: string) {
        return this.authService.validateToken(token)
    }
}
