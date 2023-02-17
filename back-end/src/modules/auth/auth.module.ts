import {Module} from "@nestjs/common";
import {PrismaService} from "../../database/prisma.service";
import {AuthController} from "./auth.controller";
import {AuthService} from "./auth.service";
import {UserModule} from "../user/user.module";

@Module({
    imports: [UserModule],
    controllers: [AuthController],
    providers: [PrismaService, AuthService],
    exports: []
})
export class AuthModule {}
