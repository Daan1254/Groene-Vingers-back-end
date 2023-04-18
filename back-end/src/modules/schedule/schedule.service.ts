import {BadRequestException, Injectable, Logger} from "@nestjs/common";
import { PrismaService } from "src/database/prisma.service";
import { UserDto } from "../auth/dto/user.dto";
import {CreateAppointmentDto} from "./dto/create-appointment.dto";

@Injectable()
export class ScheduleService {
    constructor(private readonly prisma: PrismaService) {}


    async getSchedule(user: UserDto) {
        try {

           return await this.prisma.appointment.findMany({
                where: {
                    user
                },
                include: {
                    user: true,
                }
            })
        } catch (e) {
            Logger.error(e)
        }
    }


    async createAppointment(body: CreateAppointmentDto, user: UserDto) {
        try {
            return await this.prisma.appointment.create({
                data: {
                    ...body,
                    userUuid: user.uuid,
                    date: new Date(Date.parse(body.date))
                },
                include: {
                    user: true
                }
            })
        } catch (e) {
            Logger.error(e)
        }
    }
}
