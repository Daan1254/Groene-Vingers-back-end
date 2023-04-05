import { Controller, Get, Req, UseGuards } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { AuthGuard, RequestWithAuth } from "../auth/auth.guard";
import { ScheduleService } from "./schedule.service";

@ApiTags('Schedule')
@Controller('schedule')
export class ScheduleController {

    constructor(private readonly scheduleService: ScheduleService) {}



    @Get('')
    @UseGuards(AuthGuard)
    async getSchedule(@Req() request: RequestWithAuth) {
        return await this.scheduleService.getSchedule(request.user);
    }
}

