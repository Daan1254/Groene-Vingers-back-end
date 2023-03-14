import {BadRequestException, Injectable, Logger, NotFoundException, UnauthorizedException} from "@nestjs/common";
import {PrismaService} from "../../database/prisma.service";
import {CreateAbsenceDto} from "./dto/create-absence.dto";
import {UserService} from "../user/user.service";

@Injectable()
export class AbsenceService {
    constructor(private readonly prisma: PrismaService, private readonly userService: UserService) {}

    async getAbsence(uuid: string, userUuid: string) {
        try {
            const absence = await this.prisma.absenceReports.findUnique({
                where: {
                    uuid
                },
                include: {
                    user: true
                }
            })

            if (!absence) {
                throw new NotFoundException('je hebt geen afwezigheden op je naam')
            }

            if (absence.user.uuid !== userUuid) {
                throw new UnauthorizedException('U bent niet bevoegd om deze afwezigheid te bekijken.')
            }

            return absence
        } catch(e) {
            console.error(e)

            if (e.status === 401) {
                throw new UnauthorizedException(e.message)
            } else if (e.status === 404) {
                throw new NotFoundException(e.message)
            }
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

    async createAbsence(body: CreateAbsenceDto, userUuid: string) {
        try {

            const user = await this.userService.getUser(userUuid)

            if (user.indisposed) {
                throw new BadRequestException('U bent al afwezig.')
            }

            return await this.prisma.user.update({
                where: {
                    uuid: userUuid
                },
                data: {
                    indisposed: true,
                    absenceReports: {
                        create: {
                            ...body,
                        }
                    }
                },
                include: {
                    absenceReports: true
                }
            })
        } catch(e) {
            Logger.error(e.message)
            throw new BadRequestException(e.message)
        }
    }
}
