import {Injectable, Module} from "@nestjs/common";
import {AbsenceController} from "./absence.controller";
import {AbsenceService} from "./absence.service";
import {PrismaService} from "../../database/prisma.service";
@Module({
    controllers: [AbsenceController],
    providers: [AbsenceService, PrismaService],
    imports: [],
})
export class AbsenceModule {}
