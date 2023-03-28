import {Body, Controller, Get, Param, Post, Req, UseGuards} from "@nestjs/common";
import {AbsenceService} from "./absence.service";
import {AuthGuard, RequestWithAuth} from "../auth/auth.guard";
import {CreateAbsenceDto} from "./dto/create-absence.dto";
import {ApiBody, ApiHeaders, ApiTags} from "@nestjs/swagger";

@ApiTags('Absence')
@Controller('absence')

export class AbsenceController {
    constructor(private readonly absenceService: AbsenceService) {}


    @Get(':uuid')
    @ApiHeaders([{name: 'auth-token', description: 'Groene vingers API token'}])
    @UseGuards(AuthGuard)
    public async getAbsence(@Param('uuid') uuid: string, @Req() req: RequestWithAuth) {
        return await this.absenceService.getAbsence(uuid, req.user.uuid)
    }

    @Get('user')
    @ApiHeaders([{name: 'auth-token', description: 'Groene vingers API token'}])
    @UseGuards(AuthGuard)
    public async getAllUserAbsences(@Req() request: RequestWithAuth) {
        return await this.absenceService.getAllUserAbsences(request.user.uuid)
    }

    @Post('')
    @UseGuards(AuthGuard)
    @ApiBody({type: CreateAbsenceDto})
    @ApiHeaders([{name: 'auth-token', description: 'Groene vingers API token'}])
    createAbsence(@Req() req: RequestWithAuth, @Body() body: CreateAbsenceDto) {
        return this.absenceService.createAbsence(body, req.user.uuid)
    }
}
