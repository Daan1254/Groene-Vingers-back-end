import {Controller, Get, Param} from "@nestjs/common";
import {AbsenceService} from "./absence.service";

@Controller('absence')
export class AbsenceController {
    constructor(private readonly absenceService: AbsenceService) {}


    @Get(':uuid')
    public async getAbsence(@Param('uuid') uuid: string) {
        return await this.absenceService.getAbsence(uuid)
    }

    @Get('user/:uuid')
    public async getAllUserAbsences(@Param('uuid') uuid: string) {
        return await this.absenceService.getAllUserAbsences(uuid)
    }
}
