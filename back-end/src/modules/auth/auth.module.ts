import {Global, Module} from "@nestjs/common";
import {AuthService} from "./auth.service";
import {AuthController} from "./auth.controller";
import {UserService} from "../user/user.service";
import {UserModule} from "../user/user.module";
import {TypeOrmModule} from "@nestjs/typeorm";
import {AccessToken} from "./access-token.entity";
import {User} from "../user/user.entity";
@Module({
    imports: [UserModule, TypeOrmModule.forFeature([AccessToken, User])],
    controllers: [AuthController],
    providers: [AuthService, UserService],
})
export class AuthModule {}
