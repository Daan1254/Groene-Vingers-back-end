import {Injectable, Module} from "@nestjs/common";
import {AbsenceController} from "./absence.controller";
import {AbsenceService} from "./absence.service";
import {PrismaService} from "../../database/prisma.service";
import {UserModule} from "../user/user.module";
@Module({
    controllers: [AbsenceController],
    providers: [AbsenceService, PrismaService],
    imports: [UserModule],
})
export class AbsenceModule {}
