import {Injectable} from "@nestjs/common";
import {PrismaService} from "../../database/prisma.service";

@Injectable()
export class AbsenceService {
    constructor(private readonly prisma: PrismaService) {}

    async getAbsence(uuid: string) {
        try {
            return await this.prisma.absenceReports.findUnique({
                where: {
                    uuid
                },
                include: {
                    user: true
                }
            })
        } catch(e) {
            console.error(e)
        }
    }


    async getAllUserAbsences(uuid: string) {
        try {
            return await this.prisma.absenceReports.findMany({
                where: {
                    userUuid: uuid
                },
                include: {
                    user: true
                }
            })
        } catch(e) {
            console.error(e)
        }
    }
}
