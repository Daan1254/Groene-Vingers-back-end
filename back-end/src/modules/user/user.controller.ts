import {Body, Controller, Get, Param, ParseUUIDPipe, Post} from "@nestjs/common";
import {UserService} from "./user.service";
import {CreateUserDto} from "./dto/create-user.dto";

@Controller('user')
export class UserController {
    constructor(private readonly userService: UserService) {
    }

    @Get(':uuid')
    public async getUser(@Param('uuid', ParseUUIDPipe) uuid: string) {
        return this.userService.getUser(uuid)
    }

    // @Post('')
    // public async createUser(@Body() userDto: CreateUserDto) {
    //     return this.userService.createUser(userDto)
    // }
}
