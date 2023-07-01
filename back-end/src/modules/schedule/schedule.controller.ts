import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { ApiHeaders, ApiResponse, ApiTags } from '@nestjs/swagger';
import { AuthGuard, RequestWithAuth } from '../auth/auth.guard';
import { ScheduleService } from './schedule.service';
import { AppointmentDto } from './dto/appointment.dto';
import { CreateAppointmentDto } from './dto/create-appointment.dto';

@ApiTags('Schedule')
@Controller('schedule')
export class ScheduleController {
  constructor(private readonly scheduleService: ScheduleService) {}

  @Get('')
  @UseGuards(AuthGuard)
  @ApiHeaders([{ name: 'auth-token', description: 'Groene vingers API token' }])
  @ApiResponse({ status: 200, type: AppointmentDto, isArray: true })
  async getSchedule(@Req() request: RequestWithAuth) {
    return await this.scheduleService.getSchedule(request.user);
  }

  @Post('')
  @UseGuards(AuthGuard)
  @ApiHeaders([{ name: 'auth-token', description: 'Groene vingers API token' }])
  @ApiResponse({ status: 200, type: AppointmentDto, isArray: false })
  async createAppointment(
    @Req() request: RequestWithAuth,
    @Body() body: CreateAppointmentDto,
  ) {
    return await this.scheduleService.createAppointment(body, request.user);
  }
}
