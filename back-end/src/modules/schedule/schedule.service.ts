import { Injectable, Logger } from "@nestjs/common";
import { PrismaService } from "src/database/prisma.service";
import { UserDto } from "../auth/dto/user.dto";

@Injectable()
export class ScheduleService {
    constructor(private readonly prisma: PrismaService) {}


    async getSchedule(user: UserDto) {
        try {

           return await this.prisma.appointment.findMany({
                where: {
                    userId: user.uuid
                },
                include: {
                    user: true,
                }
            })
        } catch (e) {
            Logger.error(e)
        }
    }
}